import { Router } from "express";

import {
  getTasks,
  getTask,
  postTask,
  putTask,
  removeTask,
} from "../controllers/task.controller";

import { validateTask } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", validateTask, postTask);
router.put("/:id", validateTask, putTask);
router.delete("/:id", removeTask);

export default router;
