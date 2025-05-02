
import { Link } from "react-router-dom";
import { Course } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard = ({ course, className }: CourseCardProps) => {
  const getDifficultyColor = () => {
    switch (course.difficulty) {
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

  return (
    <Link to={`/courses/${course.id}`}>
      <Card className={`overflow-hidden card-hover ${className}`}>
        <div className="relative aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={getDifficultyColor()}>
              {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg line-clamp-2 mb-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {course.instructorName}
          </p>
          <p className="text-sm line-clamp-2 text-muted-foreground">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">
              {course.rating.toFixed(1)} ({course.totalStudents} students)
            </span>
          </div>
          <div className="font-bold">
            {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
