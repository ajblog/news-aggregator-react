import { X } from "lucide-react";
import { cn } from "../../../utils";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  onDismiss?: () => void;
}

const Toast = ({
  title,
  description,
  variant = "default",
  onDismiss,
}: ToastProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm items-center justify-between space-x-4 p-4 rounded-lg shadow-lg",
        variant === "destructive"
          ? "bg-red-600 text-white"
          : "bg-gray-800 text-white"
      )}
    >
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      <button onClick={onDismiss} className="ml-2 text-white hover:opacity-75">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export { Toast };
