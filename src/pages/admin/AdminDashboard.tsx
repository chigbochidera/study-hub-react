
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAuth } from "@/context/AuthContext";
import { Users, BookOpen, Award } from "lucide-react";

// Mock data for admin stats
const statsData = {
  totalUsers: 1342,
  newUsers: 48,
  totalCourses: 24,
  totalEnrollments: 3218,
  completionRate: 68,
  revenue: "$12,450",
};

// Mock data for charts
const enrollmentData = [
  { name: "Jan", enrollments: 120 },
  { name: "Feb", enrollments: 152 },
  { name: "Mar", enrollments: 189 },
  { name: "Apr", enrollments: 204 },
  { name: "May", enrollments: 236 },
  { name: "Jun", enrollments: 248 },
  { name: "Jul", enrollments: 262 },
];

const completionData = [
  { name: "Web Dev", completed: 78, inProgress: 22 },
  { name: "Python", completed: 65, inProgress: 35 },
  { name: "AI", completed: 45, inProgress: 55 },
  { name: "UI/UX", completed: 82, inProgress: 18 },
  { name: "Mobile", completed: 58, inProgress: 42 },
];

// Mock recent enrollments data
const recentEnrollments = [
  { id: 1, student: "John Doe", course: "Complete Web Development Bootcamp", date: "2025-05-01" },
  { id: 2, student: "Sarah Johnson", course: "Machine Learning A-Z", date: "2025-05-01" },
  { id: 3, student: "Michael Chen", course: "iOS App Development with Swift", date: "2025-04-30" },
  { id: 4, student: "Emily Rodriguez", course: "UI/UX Design Masterclass", date: "2025-04-30" },
  { id: 5, student: "Alex Thompson", course: "JavaScript Algorithms and Data Structures", date: "2025-04-29" },
];

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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{statsData.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{statsData.newUsers} this month
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Enrollments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{statsData.totalEnrollments}</div>
                  <p className="text-xs text-muted-foreground">
                    {statsData.totalCourses} active courses
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{statsData.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Overall course completion
                  </p>
                </div>
                <Award className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  enrollments: {
                    label: "Enrollments",
                    color: "#8B5CF6",
                  },
                }}
                className="aspect-[4/3]"
              >
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelKey="enrollments"
                      />
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: {
                    label: "Completed",
                    color: "#10B981",
                  },
                  inProgress: {
                    label: "In Progress",
                    color: "#F59E0B",
                  },
                }}
                className="aspect-[4/3]"
              >
                <BarChart
                  data={completionData}
                  barCategoryGap={12}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent indicator="bar" />
                    }
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#10B981" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="inProgress" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>{enrollment.student}</TableCell>
                    <TableCell>{enrollment.course}</TableCell>
                    <TableCell>{new Date(enrollment.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
