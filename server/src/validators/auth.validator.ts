import type { RegisterInput, LoginInput } from "../types/auth.types";

const isObject = (data: unknown): data is Record<string, unknown> => {
  return typeof data === "object" && data !== null && !Array.isArray(data);
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidRegisterData = (data: unknown): data is RegisterInput => {
  if (!isObject(data)) return false;

  return (
    typeof data.name === "string" &&
    data.name.trim().length >= 2 &&
    data.name.trim().length <= 100 &&
    typeof data.email === "string" &&
    isValidEmail(data.email) &&
    typeof data.password === "string" &&
    data.password.length >= 8 &&
    Buffer.byteLength(data.password, "utf8") <= 72
  );
};

export const isValidLoginData = (data: unknown): data is LoginInput => {
  if (!isObject(data)) return false;

  return (
    typeof data.email === "string" &&
    isValidEmail(data.email) &&
    typeof data.password === "string" &&
    data.password.length > 0
  );
};
