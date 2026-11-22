import { Router } from "express";

import { register, login, logout, getMe } from "../controllers/auth.controller";

import {
  validateRegister,
  validateLogin,
} from "../middleware/validate.middleware";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

router.get("/me", authMiddleware, getMe);

export default router;
