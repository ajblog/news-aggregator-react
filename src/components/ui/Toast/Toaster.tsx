import { ToastProvider } from "./useToast";

const Toaster = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export { Toaster };
