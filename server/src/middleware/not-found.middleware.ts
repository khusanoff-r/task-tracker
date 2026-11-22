import type { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};
