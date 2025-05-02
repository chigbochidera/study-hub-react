
import MainLayout from "@/components/layout/MainLayout";
import CourseList from "@/components/courses/CourseList";

const CoursesPage = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover thousands of courses spanning technology, business, design, and more. 
            Start your learning journey today with expert-led courses.
          </p>
        </div>
        <CourseList />
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
