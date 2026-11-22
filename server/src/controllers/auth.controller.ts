import type { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerUser(req.body);

    res.cookie("token", result.token, cookieOptions);

    return res.status(201).json({
      status: "success",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginUser(req.body);

    res.cookie("token", result.token, cookieOptions);

    return res.status(200).json({
      status: "success",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const getMe = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};
