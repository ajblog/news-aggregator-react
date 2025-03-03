import { type ReactNode } from "react";
import { Header } from "../../widgets";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto flex-1 flex-col items-center justify-center min-h-[calc(100vh-128px)] p-6 py-12">
        {children}
      </main>
    </div>
  );
}
