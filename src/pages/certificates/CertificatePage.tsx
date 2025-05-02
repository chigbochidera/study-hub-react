
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  getCourseById, 
  getUserEnrollments, 
  getChaptersByCourseId, 
  getCertificateByCourseAndUser 
} from "@/data/mockData";
import { Certificate, Course } from "@/types";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CertificatePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to access certificates.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!courseId) return;

    const loadData = async () => {
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

        // Check if user has completed the course
        const enrollments = getUserEnrollments(user.id);
        const enrollment = enrollments.find((e) => e.courseId === courseId);

        if (!enrollment) {
          toast({
            title: "Not enrolled",
            description: "You're not enrolled in this course.",
            variant: "destructive",
          });
          navigate(`/courses/${courseId}`);
          return;
        }

        if (!enrollment.isCompleted) {
          const chapters = getChaptersByCourseId(courseId);
          
          if (enrollment.completedChapters.length < chapters.length) {
            toast({
              title: "Course not completed",
              description: "You need to complete the entire course to get a certificate.",
              variant: "destructive",
            });
            navigate(`/courses/${courseId}`);
            return;
          }
        }

        // Get or create certificate
        let foundCertificate = getCertificateByCourseAndUser(courseId, user.id);
        
        if (!foundCertificate) {
          // Create new certificate since user completed the course
          foundCertificate = {
            id: `cert-${Date.now()}`,
            userId: user.id,
            courseId,
            issueDate: new Date().toISOString(),
            courseTitle: foundCourse.title,
            userName: user.name,
          };
        }

        setCertificate(foundCertificate);

      } catch (error) {
        console.error("Error loading certificate data:", error);
        toast({
          title: "Error loading certificate",
          description: "There was an error loading your certificate. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [courseId, isAuthenticated, user, navigate, toast]);

  const handleDownload = () => {
    try {
      setIsDownloading(true);
      
      // Simulate PDF generation delay
      setTimeout(() => {
        toast({
          title: "Certificate downloaded",
          description: "Your certificate has been downloaded successfully.",
        });
        setIsDownloading(false);
      }, 1500);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your certificate. Please try again.",
        variant: "destructive",
      });
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-12 flex flex-col items-center">
          <div className="w-full max-w-3xl h-[500px] bg-muted/50 animate-pulse rounded-lg mb-6"></div>
          <div className="h-10 w-36 bg-muted/50 animate-pulse rounded-md"></div>
        </div>
      </MainLayout>
    );
  }

  if (!certificate || !course) return null;

  const issueDate = new Date(certificate.issueDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(issueDate);

  return (
    <MainLayout>
      <div className="container py-12 flex flex-col items-center">
        {/* Certificate */}
        <div className="w-full max-w-3xl mx-auto mb-8 bg-card border rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <div className="border-8 border-primary/10 p-6 md:p-10 rounded-lg bg-gradient-to-br from-background to-muted/20">
              <div className="flex justify-center mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LearnHub
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-3 uppercase tracking-wide">Certificate of Completion</h1>
              <p className="text-muted-foreground mb-8">This is to certify that</p>
              <h2 className="text-xl md:text-3xl font-bold text-primary mb-6">{certificate.userName}</h2>
              <p className="text-muted-foreground mb-6">has successfully completed</p>
              <h3 className="text-lg md:text-2xl font-semibold mb-8">{certificate.courseTitle}</h3>
              <div className="mb-6 flex justify-center">
                <div className="border-t border-muted w-32"></div>
              </div>
              <div className="flex justify-between items-center mt-10">
                <div>
                  <div className="text-sm font-bold text-primary">Certificate ID</div>
                  <div className="text-xs text-muted-foreground">{certificate.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">Issue Date</div>
                  <div className="text-xs text-muted-foreground">{formattedDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <Button onClick={handleDownload} size="lg" disabled={isDownloading} className="flex items-center gap-2">
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Downloading...
            </>
          ) : (
            <>
              <Download size={16} /> Download Certificate
            </>
          )}
        </Button>
      </div>
    </MainLayout>
  );
};

export default CertificatePage;
