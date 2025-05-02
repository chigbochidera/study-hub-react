
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <AuthForm mode="register" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
