
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Import refactored components
import StatsCard from "@/components/admin/dashboard/StatsCard";
import EnrollmentChart from "@/components/admin/dashboard/EnrollmentChart";
import CourseCompletionChart from "@/components/admin/dashboard/CourseCompletionChart";
import RecentEnrollmentsTable from "@/components/admin/dashboard/RecentEnrollmentsTable";

// Import mock data
import { 
  statsData, 
  enrollmentData, 
  completionData, 
  recentEnrollments 
} from "@/services/adminDashboardData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // This would be replaced with a real admin check when connected to backend
    // For now, we'll just simulate that the logged-in user is an admin
    setIsAdmin(true);
  }, [user]);

  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You don't have permission to access this page.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => navigate("/admin/courses")}>
              Manage Courses
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/users")}>
              Manage Users
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Users"
            value={statsData.totalUsers}
            subtitle={`+${statsData.newUsers} this month`}
            icon={Users}
          />
          <StatsCard 
            title="Total Enrollments"
            value={statsData.totalEnrollments}
            subtitle={`${statsData.totalCourses} active courses`}
            icon={BookOpen}
          />
          <StatsCard 
            title="Completion Rate"
            value={`${statsData.completionRate}%`}
            subtitle="Overall course completion"
            icon={Award}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EnrollmentChart data={enrollmentData} />
          <CourseCompletionChart data={completionData} />
        </div>

        {/* Recent Enrollments */}
        <RecentEnrollmentsTable enrollments={recentEnrollments} />
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
