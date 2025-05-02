
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CourseProgressCard from "@/components/dashboard/CourseProgressCard";
import { Button } from "@/components/ui/button";
import { Course, Enrollment, Certificate } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getUserEnrollments, getCourseById, mockCertificates } from "@/data/mockData";
import { ChevronRight, Award } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<
    { course: Course; enrollment: Enrollment }[]
  >([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = () => {
      setIsLoading(true);
      try {
        // Get user enrollments
        const enrollments = getUserEnrollments(user.id);
        
        // Get course details for each enrollment
        const coursesWithProgress = enrollments.map((enrollment) => {
          const course = getCourseById(enrollment.courseId);
          return {
            course: course!,
            enrollment,
          };
        });
        
        // Sort by last accessed (most recent first)
        coursesWithProgress.sort((a, b) => {
          return new Date(b.enrollment.lastAccessedAt).getTime() - 
                 new Date(a.enrollment.lastAccessedAt).getTime();
        });
        
        setEnrolledCourses(coursesWithProgress);
        
        // Get user certificates
        const userCertificates = mockCertificates.filter(
          (cert) => cert.userId === user.id
        );
        setCertificates(userCertificates);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Separate courses in progress from completed courses
  const inProgressCourses = enrolledCourses.filter(
    ({ enrollment }) => !enrollment.isCompleted
  );
  const completedCourses = enrolledCourses.filter(
    ({ enrollment }) => enrollment.isCompleted
  );

  return (
    <MainLayout>
      <div className="container py-12">
        {/* Dashboard header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "Student"}
          </h1>
          <p className="text-muted-foreground">
            Track your progress and continue your learning journey.
          </p>
        </div>

        {/* Skeleton loading state */}
        {isLoading && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-7 w-48 bg-muted/50 animate-pulse rounded"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-muted/50 animate-pulse rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-7 w-48 bg-muted/50 animate-pulse rounded"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="h-48 bg-muted/50 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* In progress courses */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">In Progress</h2>
                {inProgressCourses.length > 0 && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/courses">
                      Explore more courses <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                )}
              </div>

              {inProgressCourses.length === 0 ? (
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <h3 className="font-semibold mb-2">No courses in progress</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't started any courses yet. Browse our catalog to find a course that interests you.
                  </p>
                  <Button asChild>
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {inProgressCourses.map(({ course, enrollment }) => (
                    <CourseProgressCard
                      key={course.id}
                      course={course}
                      enrollment={enrollment}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Completed courses */}
            {completedCourses.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Completed Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {completedCourses.map(({ course, enrollment }) => (
                    <CourseProgressCard
                      key={course.id}
                      course={course}
                      enrollment={enrollment}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Certificates</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {certificates.map((certificate) => (
                    <Link
                      to={`/certificates/${certificate.courseId}`}
                      key={certificate.id}
                      className="bg-card border rounded-lg p-6 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Award size={32} className="text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(certificate.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{certificate.courseTitle}</h3>
                      <p className="text-muted-foreground text-sm">Certificate of Completion</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
