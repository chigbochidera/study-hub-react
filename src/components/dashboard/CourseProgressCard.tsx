
import { Link } from "react-router-dom";
import { Course, Enrollment } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ProgressRing from "@/components/ui/progress-ring";
import { Button } from "@/components/ui/button";

interface CourseProgressCardProps {
  course: Course;
  enrollment: Enrollment;
  className?: string;
}

const CourseProgressCard = ({
  course,
  enrollment,
  className,
}: CourseProgressCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="flex p-4 space-x-4">
        <div className="relative w-24 h-20 flex-shrink-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold line-clamp-1 mb-1">
            <Link
              to={`/courses/${course.id}`}
              className="hover:text-primary transition-colors"
            >
              {course.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {course.instructorName}
          </p>
        </div>
      </div>
      <CardContent className="px-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1">Your progress</p>
            <p className="text-xs text-muted-foreground">
              {enrollment.completedChapters.length} of {course.totalLessons} chapters
            </p>
          </div>
          <ProgressRing progress={enrollment.progress} size={56} />
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-center">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/courses/${course.id}`}>
            {enrollment.progress === 0
              ? "Start Learning"
              : enrollment.progress === 100
              ? "Review Course"
              : "Continue Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseProgressCard;
