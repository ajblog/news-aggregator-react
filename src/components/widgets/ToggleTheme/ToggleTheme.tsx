import { Sun, Moon } from "lucide-react";
import { Button } from "../../ui";
import { useTheme } from "../../../hooks";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" onClick={toggleTheme} className="p-0">
      {theme === "light" ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </Button>
  );
}
