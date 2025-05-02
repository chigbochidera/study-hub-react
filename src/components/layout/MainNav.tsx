
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LearnHub
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <span className="max-w-[100px] truncate">{user?.name}</span>
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden bg-background border-b border-border/40",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="container py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard"
                className="block py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile"
                className="block py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              {user?.role === "admin" && (
                <Link 
                  to="/admin"
                  className="block py-2 text-foreground/80 hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
