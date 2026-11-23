import type { Request, Response, NextFunction } from "express";

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

const parseId = (value: string | string[]): number | null => {
  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projects = await getAllProjects(req.user!.id);

    return res.status(200).json({
      status: "success",
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = parseId(req.params.id);

    if (projectId === null) {
      return res.status(400).json({
        status: "error",
        message: "Invalid project ID",
      });
    }

    const project = await getProjectById(projectId, req.user!.id);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

export const postProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await createProject(req.body, req.user!.id);

    return res.status(201).json({
      status: "success",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

export const putProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = parseId(req.params.id);

    if (projectId === null) {
      return res.status(400).json({
        status: "error",
        message: "Invalid project ID",
      });
    }

    const project = await updateProject(projectId, req.user!.id, req.body);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

export const removeProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = parseId(req.params.id);

    if (projectId === null) {
      return res.status(400).json({
        status: "error",
        message: "Invalid project ID",
      });
    }

    const deleted = await deleteProject(projectId, req.user!.id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
