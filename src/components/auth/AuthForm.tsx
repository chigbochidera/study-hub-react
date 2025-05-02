
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

type FormMode = "login" | "register" | "reset" | "forgot";

interface AuthFormProps {
  mode: FormMode;
  resetToken?: string;
}

// Form schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Get the proper schema for the form mode
const getSchema = (mode: FormMode) => {
  switch (mode) {
    case "login":
      return loginSchema;
    case "register":
      return registerSchema;
    case "forgot":
      return forgotSchema;
    case "reset":
      return resetSchema;
    default:
      return loginSchema;
  }
};

const AuthForm = ({ mode, resetToken }: AuthFormProps) => {
  const { login, register, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get the form title
  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Log in to your account";
      case "register":
        return "Create an account";
      case "forgot":
        return "Forgot your password?";
      case "reset":
        return "Reset your password";
      default:
        return "";
    }
  };

  // Get the form description
  const getDescription = () => {
    switch (mode) {
      case "login":
        return "Enter your credentials to access your account";
      case "register":
        return "Create an account to get started with our platform";
      case "forgot":
        return "Enter your email address and we'll send you a link to reset your password";
      case "reset":
        return "Enter your new password to reset your account";
      default:
        return "";
    }
  };

  // Create the form
  const form = useForm<any>({
    resolver: zodResolver(getSchema(mode)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      switch (mode) {
        case "login":
          await login(data.email, data.password);
          navigate("/dashboard");
          break;
        case "register":
          await register(data.name, data.email, data.password);
          navigate("/dashboard");
          break;
        case "forgot":
          await forgotPassword(data.email);
          navigate("/login");
          break;
        case "reset":
          if (resetToken) {
            await resetPassword(resetToken, data.password);
            navigate("/login");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{getTitle()}</h1>
        <p className="text-muted-foreground mt-2">{getDescription()}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {mode === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode === "login" || mode === "register" || mode === "forgot") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode === "login" || mode === "register" || mode === "reset") && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode === "register" || mode === "reset") && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              <>
                {mode === "login" && "Log in"}
                {mode === "register" && "Sign up"}
                {mode === "forgot" && "Send reset link"}
                {mode === "reset" && "Reset password"}
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        {mode === "login" && (
          <>
            <Link
              to="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Forgot your password?
            </Link>
            <div className="mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </>
        )}
        {mode === "register" && (
          <div>
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </div>
        )}
        {(mode === "forgot" || mode === "reset") && (
          <div>
            Remember your password?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
