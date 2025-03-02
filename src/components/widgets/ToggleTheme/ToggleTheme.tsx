import { Sun, Moon } from "lucide-react";
import { Button } from "../../UI";
import { useTheme } from "../../../hooks";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
      <Button variant="ghost" onClick={toggleTheme} className="p-2">
        {theme === "light" ? (
          <Moon className="w-6 h-6" />
        ) : (
          <Sun className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
