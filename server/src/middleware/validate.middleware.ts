import type { Request, Response, NextFunction } from "express";

import { isValidTask } from "../validators/task.validator";
import {
  isValidRegisterData,
  isValidLoginData,
} from "../validators/auth.validator";

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isValidTask(req.body)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid task data",
    });
  }

  next();
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isValidRegisterData(req.body)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid registration data",
    });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isValidLoginData(req.body)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid login data",
    });
  }

  next();
};
