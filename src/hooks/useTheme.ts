import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Default to light
  });

  useEffect(() => {
    // Remove both classes to prevent conflicts
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    // Add only the current theme
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    // ✅ Force Tailwind to recompute styles
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
