
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CoursesPage from "./pages/courses/CoursesPage";
import CourseDetails from "./pages/courses/CourseDetails";
import ChapterView from "./pages/courses/ChapterView";
import Dashboard from "./pages/dashboard/Dashboard";
import CertificatePage from "./pages/certificates/CertificatePage";
import Profile from "./pages/profile/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminUsers from "./pages/admin/AdminUsers";
import CreateEditCourse from "./pages/admin/CreateEditCourse";
import CourseChapters from "./pages/admin/CourseChapters";
import CommentModeration from "./pages/admin/CommentModeration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/courses/:courseId/chapters/:chapterId" element={<ChapterView />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/certificates/:courseId" element={<CertificatePage />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/courses/create" element={<CreateEditCourse />} />
              <Route path="/admin/courses/edit/:id" element={<CreateEditCourse />} />
              <Route path="/admin/courses/:courseId/chapters" element={<CourseChapters />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/comments" element={<CommentModeration />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
