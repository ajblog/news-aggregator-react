// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "..";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <></>;
  if (currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
