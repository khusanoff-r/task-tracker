import type { Request, Response, NextFunction } from "express";

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task.service";

const parseId = (value: string | string[]): number | null => {
  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await getAllTasks(req.user!.id);

    return res.status(200).json({
      status: "success",
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskId = parseId(req.params.id);

    if (taskId === null) {
      return res.status(400).json({
        status: "error",
        message: "Invalid task ID",
      });
    }

    const task = await getTaskById(taskId, req.user!.id);

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const postTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await createTask(req.body, req.user!.id);

    return res.status(201).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const putTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskId = parseId(req.params.id);

    if (taskId === null) {
      return res.status(400).json({
        status: "error",
        message: "Invalid task ID",
      });
    }

    const task = await updateTask(taskId, req.user!.id, req.body);

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const removeTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskId = parseId(req.params.id);

    if (taskId === null) {
      return res.status(400).json({
        status: "error",
        message: "Invalid task ID",
      });
    }

    const deleted = await deleteTask(taskId, req.user!.id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
