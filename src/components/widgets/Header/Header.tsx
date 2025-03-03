import { motion } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  LayoutDashboardIcon,
  LogInIcon,
} from "lucide-react";
import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui";
import { ToggleTheme } from "../../widgets";
import { useAuthFlow } from "../../../hooks";
import { useAuth } from "../../wrappers";
import { Link } from "react-router-dom";

export function Header() {
  const { currentUser } = useAuth();
  const { handleLogout } = useAuthFlow();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full border-b bg-white dark:bg-gray-800 flex content-between items-center  px-4"
    >
      <div className="container mx-auto py-3 md:py-4">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex items-center justify-between w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="flex items-center gap-4 md:gap-8"
            >
              <NavigationMenuItem>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm md:text-base"
                >
                  <LayoutDashboardIcon className="h-3 w-3 md:h-4 md:w-4" />
                  Home
                </Link>
              </NavigationMenuItem>
              {currentUser && (
                <>
                  <NavigationMenuItem>
                    <Link
                      to="/preferences"
                      className="flex items-center gap-2 text-sm md:text-base"
                    >
                      <Settings className="h-3 w-3 md:h-4 md:w-4" />
                      Preferences
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm md:text-base px-0"
                    >
                      <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                      Logout
                    </Button>
                  </NavigationMenuItem>
                </>
              )}
              {!currentUser && (
                <>
                  <NavigationMenuItem>
                    <Link
                      to="/signin"
                      className="flex items-center gap-2 text-sm md:text-base"
                    >
                      <LogInIcon className="h-3 w-3 md:h-4 md:w-4" />
                      Sign In
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 text-sm md:text-base"
                    >
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                      Sign Up
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </motion.div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
      >
        <ToggleTheme />
      </motion.div>
    </motion.header>
  );
}
