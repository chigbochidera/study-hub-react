
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Course, Chapter } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getCourseById, getChaptersByCourseId, getUserEnrollments } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Book,
  ChevronRight,
  Play,
  Check,
  Star,
  FileCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchCourseData = () => {
      setIsLoading(true);
      try {
        // Get course by ID
        const foundCourse = getCourseById(id);
        if (!foundCourse) {
          toast({
            title: "Course not found",
            description: "The course you're looking for does not exist.",
            variant: "destructive",
          });
          navigate("/courses");
          return;
        }
        setCourse(foundCourse);

        // Get chapters
        const courseChapters = getChaptersByCourseId(id);
        setChapters(courseChapters);

        // Check if user is enrolled
        if (isAuthenticated && user) {
          const enrollments = getUserEnrollments(user.id);
          const enrollment = enrollments.find(
            (e) => e.courseId === id
          );
          
          if (enrollment) {
            setIsEnrolled(true);
            setCompletedChapters(enrollment.completedChapters);
            setProgress(enrollment.progress);
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast({
          title: "Error loading course",
          description: "There was an error loading the course details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id, isAuthenticated, user, navigate, toast]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to log in to enroll in this course.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      // Simulate enrollment API call
      setIsEnrolled(true);
      setProgress(0);
      setCompletedChapters([]);
      
      toast({
        title: "Enrollment successful",
        description: `You've successfully enrolled in "${course?.title}". Start learning now!`,
      });
      
      // Navigate to first chapter
      if (chapters.length > 0) {
        navigate(`/courses/${id}/chapters/${chapters[0].id}`);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Enrollment failed",
        description: "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-300";
      case "intermediate":
        return "bg-blue-500/20 text-blue-700 dark:bg-blue-500/30 dark:text-blue-300";
      case "advanced":
        return "bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-300";
      default:
        return "bg-gray-500/20 text-gray-700 dark:bg-gray-500/30 dark:text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="flex flex-col space-y-4">
            <div className="h-8 bg-muted/50 animate-pulse rounded w-1/2"></div>
            <div className="h-4 bg-muted/50 animate-pulse rounded w-3/4"></div>
            <div className="h-72 bg-muted/50 animate-pulse rounded w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <div className="h-6 bg-muted/50 animate-pulse rounded w-1/4"></div>
                <div className="h-4 bg-muted/50 animate-pulse rounded w-full"></div>
                <div className="h-4 bg-muted/50 animate-pulse rounded w-full"></div>
                <div className="h-4 bg-muted/50 animate-pulse rounded w-3/4"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-muted/50 animate-pulse rounded w-1/4"></div>
                <div className="h-20 bg-muted/50 animate-pulse rounded w-full"></div>
                <div className="h-20 bg-muted/50 animate-pulse rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) return null;

  return (
    <MainLayout>
      <div className="container py-12">
        {/* Course header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
              {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
          <div className="flex flex-wrap gap-6 items-center text-sm">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{course.totalStudents} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Book size={16} />
              <span>{course.totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{course.totalDuration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span>{course.rating.toFixed(1)} rating</span>
            </div>
            <div className="flex items-center gap-1">
              <FileCheck size={16} />
              <span>Last updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Course content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* Course image */}
            <div className="rounded-lg overflow-hidden mb-8">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Course information */}
            <div className="space-y-8">
              {/* About this course */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About this course</h2>
                <p className="text-muted-foreground">
                  {course.description}
                </p>
              </div>

              {/* What you'll learn */}
              <div>
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5" />
                    <span>Build real-world projects using modern techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5" />
                    <span>Learn from industry experts with years of experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5" />
                    <span>Gain practical skills that can be applied immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5" />
                    <span>Access comprehensive course materials and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5" />
                    <span>Join a community of learners and share experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-0.5" />
                    <span>Earn a certificate upon completion of the course</span>
                  </li>
                </ul>
              </div>

              {/* Course content */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Course content</h2>
                <div className="border rounded-md">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="section-1">
                      <AccordionTrigger className="px-4">
                        Course Overview ({chapters.length} chapters)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-4 pb-4 space-y-2">
                          {chapters.map((chapter) => (
                            <div key={chapter.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-3">
                                {isEnrolled ? (
                                  completedChapters.includes(chapter.id) ? (
                                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                      <Check size={14} className="text-success" />
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center">
                                      <Play size={12} />
                                    </div>
                                  )
                                ) : (
                                  <div className="w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center">
                                    <Play size={12} />
                                  </div>
                                )}
                                <span>{chapter.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {Math.floor(chapter.duration / 60)}:{(chapter.duration % 60).toString().padStart(2, "0")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg shadow overflow-hidden sticky top-24">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
                  </span>
                </div>

                {isEnrolled ? (
                  <Button className="w-full" asChild>
                    <Link to={`/courses/${id}/chapters/${chapters[0]?.id}`}>
                      {progress > 0 ? "Continue Learning" : "Start Course"}
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                )}

                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <Clock size={16} className="mt-0.5" />
                      <span>{course.totalDuration} of on-demand video</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Book size={16} className="mt-0.5" />
                      <span>{course.totalLessons} lessons</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <FileCheck size={16} className="mt-0.5" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Users size={16} className="mt-0.5" />
                      <span>Community discussion access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetails;
