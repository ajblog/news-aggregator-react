// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "..";
import { JSX } from "react";

export const ProtectedRoute = ({
  children,
  forUsers,
}: {
  children: JSX.Element;
  forUsers: boolean;
}) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <></>;
  else if (forUsers && currentUser) return children;
  else if (!forUsers && !currentUser) return children;
  return <Navigate to="/" state={{ from: location }} replace />;
};
