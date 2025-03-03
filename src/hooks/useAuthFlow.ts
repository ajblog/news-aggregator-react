// src/hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { useAuth } from "../components";

export const useAuthFlow = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await AuthService.loginUser(username, password);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      const success = await AuthService.registerUser(username, password);
      if (success) {
        // Auto-login after successful registration
        await handleLogin(username, password);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
    localStorage.removeItem("currentUser");
  };

  return { handleLogin, handleRegister, handleLogout };
};
