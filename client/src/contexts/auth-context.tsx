import { createContext, useContext, type ReactNode } from "react";

import { useCurrentUserQuery } from "@/libs/react-query";
import type { AuthUser } from "@/libs/actions";

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isLoading, refetch } = useCurrentUserQuery();

  const user = data?.data?.user ?? null;

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    refetchUser: () => {
      void refetch();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
