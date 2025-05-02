
import { ReactNode } from "react";
import MainNav from "./MainNav";
import Footer from "./Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();
  
  // Check if user is admin (in a real app, this would come from the backend)
  // For demo purposes, we'll assume the user with ID 1 is an admin
  const isAdmin = user?.id === "1" || user?.role === "admin";
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      {isAdmin && (
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 py-2 px-4 text-center">
          <div className="container flex justify-between items-center">
            <span className="text-sm font-medium">Admin Mode</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-amber-200 hover:bg-amber-300 dark:bg-amber-800 dark:hover:bg-amber-700 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300"
              asChild
            >
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
