import type { ReactNode } from "react";

type AuthLoaderProps = {
  children: ReactNode;
};

export const AuthLoader = ({ children }: AuthLoaderProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-gray-500">Checking authentication...</p>

        {children}
      </div>
    </div>
  );
};
