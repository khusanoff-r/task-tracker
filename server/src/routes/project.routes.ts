import { Router } from "express";

import {
  getProjects,
  getProject,
  postProject,
  putProject,
  removeProject,
} from "../controllers/project.controller";

import { validateProject } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", validateProject, postProject);
router.put("/:id", validateProject, putProject);
router.delete("/:id", removeProject);

export default router;
