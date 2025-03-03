// src/router/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, ProtectedRoute, SearchProvider } from "./components";
import { useEffect } from "react";
import { initDB } from "./services";
import { Home, SignInPage, SignUpPage } from "./pages";

export default () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      const success = await initDB();
      if (!success) {
        console.error("Failed to initialize database");
      }
    };
    initializeDatabase();
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SearchProvider>
                <Home />
              </SearchProvider>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute>
                <SignInPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <SignUpPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
