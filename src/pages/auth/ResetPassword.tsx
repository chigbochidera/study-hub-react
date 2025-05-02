
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid or missing token",
        description: "Please request a new password reset link.",
        variant: "destructive",
      });
      navigate("/forgot-password");
    }
  }, [token, navigate, toast]);

  if (!token) return null;

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <AuthForm mode="reset" resetToken={token} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
