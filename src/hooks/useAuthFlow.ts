// src/hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { useAuth, useToast } from "../components";

export const useAuthFlow = () => {
  const { setCurrentUser } = useAuth();
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Login failed, Either password or username is wrong...",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Registration failed, Try again with different inputs...",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
    localStorage.removeItem("currentUser");
  };

  return { handleLogin, handleRegister, handleLogout };
};
