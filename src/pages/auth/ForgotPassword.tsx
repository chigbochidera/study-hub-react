
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const ForgotPassword = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <AuthForm mode="forgot" />
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
