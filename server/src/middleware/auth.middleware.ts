import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { getUserById } from "../services/auth.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(new Error("JWT_SECRET is not configured"));
  }

  let decoded: string | JwtPayload;

  try {
    decoded = jwt.verify(token, secret);
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }

  if (typeof decoded === "string" || typeof decoded.sub !== "string") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token payload",
    });
  }

  const userId = Number(decoded.sub);

  if (!Number.isSafeInteger(userId) || userId <= 0) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token payload",
    });
  }

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
