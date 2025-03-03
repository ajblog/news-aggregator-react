import { createContext, useContext, useState } from "react";
import { Toast, ToastProps } from "./Toast";

interface ToastContextType {
  toast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, { ...props }]);

    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000); // Auto-dismiss after 3s
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        {toasts.map((t, index) => (
          <Toast
            key={index}
            {...t}
            onDismiss={() =>
              setToasts((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
