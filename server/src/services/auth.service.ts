import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../config/database";
import { AppError } from "../utils/app-error";
import type { RegisterInput, LoginInput, AuthUser } from "../types/auth.types";

interface AuthResult {
  user: AuthUser;
  token: string;
}

interface UserWithPassword extends AuthUser {
  password_hash: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
};

const generateToken = (userId: number): string => {
  return jwt.sign({ sub: String(userId) }, getJwtSecret(), { expiresIn: "1d" });
};

export const registerUser = async (
  data: RegisterInput,
): Promise<AuthResult> => {
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();

  const passwordHash = await bcrypt.hash(data.password, 12);

  try {
    const result = await pool.query<AuthUser>(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, passwordHash],
    );

    const user = result.rows[0];

    return {
      user,
      token: generateToken(user.id),
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      throw new AppError("Email is already registered", 409);
    }

    throw error;
  }
};

export const loginUser = async (data: LoginInput): Promise<AuthResult> => {
  const email = data.email.trim().toLowerCase();

  const result = await pool.query<UserWithPassword>(
    `SELECT id, name, email, password_hash
     FROM users
     WHERE LOWER(email) = $1`,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordIsValid = await bcrypt.compare(
    data.password,
    user.password_hash,
  );

  if (!passwordIsValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const publicUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return {
    user: publicUser,
    token: generateToken(user.id),
  };
};

export const getUserById = async (
  userId: number,
): Promise<AuthUser | undefined> => {
  const result = await pool.query<AuthUser>(
    `SELECT id, name, email
     FROM users
     WHERE id = $1`,
    [userId],
  );

  return result.rows[0];
};
