import { type ReactNode } from "react";
import { ToggleTheme } from "../../widgets";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 py-12">
      <ToggleTheme />
      {children}
    </div>
  );
}
