
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import VideoPlayer from "@/components/ui/video-player";
import CommentSection from "@/components/courses/CommentSection";
import { Button } from "@/components/ui/button";
import {
  getCourseById,
  getChaptersByCourseId,
  getChapterById,
  getCommentsByChapterId,
  getUserEnrollments,
} from "@/data/mockData";
import { Chapter, Course, Comment } from "@/types";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, Check, ArrowRightToLine, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ChapterView = () => {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!courseId || !chapterId) return;

    const loadData = () => {
      try {
        setIsLoading(true);

        // Load course data
        const foundCourse = getCourseById(courseId);
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

        // Load chapters
        const courseChapters = getChaptersByCourseId(courseId);
        setChapters(courseChapters);

        // Load current chapter
        const foundChapter = getChapterById(courseId, chapterId);
        if (!foundChapter) {
          toast({
            title: "Chapter not found",
            description: "The chapter you're trying to access does not exist.",
            variant: "destructive",
          });
          navigate(`/courses/${courseId}`);
          return;
        }
        setChapter(foundChapter);

        // Load comments
        const chapterComments = getCommentsByChapterId(chapterId);
        setComments(chapterComments || []);

        // Check completed chapters
        if (isAuthenticated && user) {
          const enrollments = getUserEnrollments(user.id);
          const enrollment = enrollments.find((e) => e.courseId === courseId);
          if (enrollment) {
            setCompletedChapters(enrollment.completedChapters);
          }
        }
      } catch (error) {
        console.error("Error loading chapter data:", error);
        toast({
          title: "Error loading content",
          description: "There was an error loading the chapter content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [courseId, chapterId, navigate, toast, isAuthenticated, user]);

  const currentIndex = chapter ? chapters.findIndex((c) => c.id === chapter.id) : -1;
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleChapterComplete = () => {
    if (!isAuthenticated || !user || !chapter) return;

    try {
      // Add chapter to completed list if not already there
      if (!completedChapters.includes(chapter.id)) {
        const updatedCompletedChapters = [...completedChapters, chapter.id];
        setCompletedChapters(updatedCompletedChapters);
        
        toast({
          title: "Progress saved",
          description: "Your progress has been saved.",
        });
      }
    } catch (error) {
      console.error("Error marking chapter as complete:", error);
      toast({
        title: "Error saving progress",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="bg-muted/50 animate-pulse rounded h-96 w-full mb-8"></div>
          <div className="space-y-4">
            <div className="h-8 bg-muted/50 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-muted/50 animate-pulse rounded w-2/3"></div>
            <div className="h-4 bg-muted/50 animate-pulse rounded w-3/4"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course || !chapter) return null;

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Navigation bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/courses/${courseId}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={16} className="mr-1" /> Back to Course
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {prevChapter && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/courses/${courseId}/chapters/${prevChapter.id}`}>
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </Link>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <BookOpen size={16} className="mr-2" /> Chapters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Course Chapters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  {chapters.map((c) => (
                    <Link
                      key={c.id}
                      to={`/courses/${courseId}/chapters/${c.id}`}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md",
                        c.id === chapter.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted transition-colors"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {completedChapters.includes(c.id) ? (
                          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                            <Check size={12} className="text-success" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 text-xs flex items-center justify-center rounded-full border">
                            {c.order}
                          </div>
                        )}
                        <span className="text-sm truncate max-w-[200px]">{c.title}</span>
                      </div>
                      {c.id === chapter.id && (
                        <ArrowRightToLine size={14} />
                      )}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            {nextChapter && (
              <Button variant="default" size="sm" asChild>
                <Link to={`/courses/${courseId}/chapters/${nextChapter.id}`}>
                  Next <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Video player */}
        <div className="mb-8">
          <VideoPlayer
            videoUrl={chapter.videoUrl}
            title={chapter.title}
            onComplete={handleChapterComplete}
            className="w-full aspect-video"
          />
        </div>
        
        {/* Chapter info */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {chapter.title}
          </h1>
          <p className="text-muted-foreground">
            {chapter.description}
          </p>
          
          {/* Mobile navigation buttons */}
          <div className="md:hidden flex items-center justify-between mt-6">
            {prevChapter && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/courses/${courseId}/chapters/${prevChapter.id}`}>
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </Link>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <BookOpen size={16} className="mr-2" /> Chapters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Course Chapters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  {chapters.map((c) => (
                    <Link
                      key={c.id}
                      to={`/courses/${courseId}/chapters/${c.id}`}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md",
                        c.id === chapter.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted transition-colors"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {completedChapters.includes(c.id) ? (
                          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                            <Check size={12} className="text-success" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 text-xs flex items-center justify-center rounded-full border">
                            {c.order}
                          </div>
                        )}
                        <span className="text-sm truncate max-w-[200px]">{c.title}</span>
                      </div>
                      {c.id === chapter.id && (
                        <ArrowRightToLine size={14} />
                      )}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            {nextChapter && (
              <Button variant="default" size="sm" asChild>
                <Link to={`/courses/${courseId}/chapters/${nextChapter.id}`}>
                  Next <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Complete button */}
        <div className="mb-12">
          <div className="flex gap-4">
            <Button
              onClick={handleChapterComplete}
              variant={completedChapters.includes(chapter.id) ? "outline" : "default"}
              className={completedChapters.includes(chapter.id) ? "bg-success/20 text-success hover:bg-success/30 hover:text-success" : ""}
              disabled={!isAuthenticated}
            >
              {completedChapters.includes(chapter.id) ? (
                <>
                  <Check size={16} className="mr-2" /> Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </Button>
            {nextChapter && (
              <Button asChild>
                <Link to={`/courses/${courseId}/chapters/${nextChapter.id}`}>
                  Next Lesson <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
            )}
            {!nextChapter && completedChapters.length === chapters.length && (
              <Button asChild>
                <Link to={`/certificates/${courseId}`}>
                  Get Certificate <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Comments section */}
        <div className="border-t pt-12">
          <CommentSection chapterId={chapter.id} comments={comments} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ChapterView;
