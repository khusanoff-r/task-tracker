import { Footer, Header, Sidebar } from "@/modules";
import type { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FD]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 xl:px-14">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};
