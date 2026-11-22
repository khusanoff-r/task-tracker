import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error("Server error:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
