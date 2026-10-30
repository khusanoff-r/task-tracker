import type { PropsWithChildren } from "react";

export const BlankLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-screen text-gray-900">{children}</div>;
};
