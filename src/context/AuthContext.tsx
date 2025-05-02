
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "user",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    avatar: "/placeholder.svg",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user data
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword as User);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      if (mockUsers.some((u) => u.email === email)) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user" as const,
      };

      // Store user data
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user exists
      const userExists = mockUsers.some((u) => u.email === email);
      if (!userExists) {
        throw new Error("No user found with this email");
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password.",
      });
    } catch (error) {
      toast({
        title: "Request failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password.",
      });
    } catch (error) {
      toast({
        title: "Reset failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) throw new Error("Not authenticated");

      const updatedUser = { ...user, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
