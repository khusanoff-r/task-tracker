import { API } from "@/libs/service";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterData = AuthCredentials & {
  name: string;
};

type AuthResponse = {
  status: "success";
  data: {
    user: AuthUser;
  };
};

type LogoutResponse = {
  status: "success";
  message: string;
};

import { ENDPOINTS } from "@/libs/service";

export const registerAction = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  return API.post(
    ENDPOINTS.auth.register,
    data,
  ) as unknown as Promise<AuthResponse>;
};

export const loginAction = async (
  data: AuthCredentials,
): Promise<AuthResponse> => {
  return API.post(
    ENDPOINTS.auth.login,
    data,
  ) as unknown as Promise<AuthResponse>;
};

export const logoutAction = async (): Promise<LogoutResponse> => {
  return API.post(ENDPOINTS.auth.logout) as unknown as Promise<LogoutResponse>;
};

export const getCurrentUserAction = async (): Promise<AuthResponse> => {
  return API.get(ENDPOINTS.auth.me) as unknown as Promise<AuthResponse>;
};
