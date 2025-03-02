// Input.tsx
import * as React from "react";
import { cn } from "../../../utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onClick, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full  border-input  px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-sm sm:text-lg rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-indigo-500 bg-white dark:bg-gray-500 text-gray-900 dark:text-white shadow-md",
          className
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
