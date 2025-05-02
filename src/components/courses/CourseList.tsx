
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import CourseFilter from "./CourseFilter";
import CourseSearch from "./CourseSearch";
import { Course, Category } from "@/types";

// Mock data
const mockCategories: Category[] = [
  { id: "1", name: "Web Development", count: 15 },
  { id: "2", name: "Data Science", count: 12 },
  { id: "3", name: "Mobile Development", count: 8 },
  { id: "4", name: "DevOps", count: 6 },
  { id: "5", name: "Design", count: 9 },
  { id: "6", name: "Business", count: 7 },
];

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node, MongoDB and more. Build real projects and get hired as a web developer.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    instructorId: "1",
    instructorName: "John Smith",
    category: "Web Development",
    difficulty: "beginner",
    price: 89.99,
    rating: 4.8,
    totalStudents: 12540,
    totalLessons: 182,
    totalDuration: "65h 30m",
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-06-22T00:00:00Z",
  },
  {
    id: "2",
    title: "Machine Learning A-Z: Hands-On Python & R",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    instructorId: "2",
    instructorName: "Sarah Johnson",
    category: "Data Science",
    difficulty: "intermediate",
    price: 129.99,
    rating: 4.6,
    totalStudents: 9870,
    totalLessons: 156,
    totalDuration: "44h 15m",
    createdAt: "2022-11-05T00:00:00Z",
    updatedAt: "2023-07-10T00:00:00Z",
  },
  {
    id: "3",
    title: "iOS App Development with Swift",
    description: "Learn iOS app development from the ground up. Build 20+ apps and games using Swift and UIKit.",
    thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    instructorId: "3",
    instructorName: "Michael Chen",
    category: "Mobile Development",
    difficulty: "advanced",
    price: 99.99,
    rating: 4.7,
    totalStudents: 6420,
    totalLessons: 205,
    totalDuration: "76h 45m",
    createdAt: "2023-02-28T00:00:00Z",
    updatedAt: "2023-08-01T00:00:00Z",
  },
  {
    id: "4",
    title: "Docker and Kubernetes: The Complete Guide",
    description: "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows.",
    thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1206&q=80",
    instructorId: "4",
    instructorName: "David Wilson",
    category: "DevOps",
    difficulty: "intermediate",
    price: 119.99,
    rating: 4.9,
    totalStudents: 8320,
    totalLessons: 132,
    totalDuration: "38h 10m",
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-07-25T00:00:00Z",
  },
  {
    id: "5",
    title: "UI/UX Design Masterclass",
    description: "Learn UI/UX design from scratch. Create beautiful designs using Figma and build a professional portfolio.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
    instructorId: "5",
    instructorName: "Emily Rodriguez",
    category: "Design",
    difficulty: "beginner",
    price: 79.99,
    rating: 4.5,
    totalStudents: 7650,
    totalLessons: 98,
    totalDuration: "28h 45m",
    createdAt: "2023-04-05T00:00:00Z",
    updatedAt: "2023-06-30T00:00:00Z",
  },
  {
    id: "6",
    title: "JavaScript Algorithms and Data Structures",
    description: "Master the fundamentals of JavaScript and prepare for coding interviews with challenging algorithm problems.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    instructorId: "6",
    instructorName: "Alex Thompson",
    category: "Web Development",
    difficulty: "advanced",
    price: 94.99,
    rating: 4.9,
    totalStudents: 10230,
    totalLessons: 145,
    totalDuration: "34h 20m",
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-07-18T00:00:00Z",
  },
  {
    id: "7",
    title: "Digital Marketing Essentials",
    description: "Learn digital marketing strategy, social media advertising, SEO, YouTube, email, Facebook, Google Ads, and more!",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    instructorId: "7",
    instructorName: "Olivia Martinez",
    category: "Business",
    difficulty: "beginner",
    price: 84.99,
    rating: 4.6,
    totalStudents: 9870,
    totalLessons: 112,
    totalDuration: "23h 15m",
    createdAt: "2023-03-22T00:00:00Z",
    updatedAt: "2023-08-05T00:00:00Z",
  },
  {
    id: "8",
    title: "Flutter & Dart: The Complete Guide",
    description: "A comprehensive guide to building beautiful native apps for iOS and Android with Flutter and Dart.",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    instructorId: "8",
    instructorName: "James Lee",
    category: "Mobile Development",
    difficulty: "intermediate",
    price: 99.99,
    rating: 4.8,
    totalStudents: 7320,
    totalLessons: 178,
    totalDuration: "48h 30m",
    createdAt: "2023-01-30T00:00:00Z",
    updatedAt: "2023-07-12T00:00:00Z",
  },
];

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredCourses(courses);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.description.toLowerCase().includes(lowerCaseQuery) ||
        course.instructorName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCourses(filtered);
  };

  const handleFilterChange = (filters: { category: string; difficulty: string }) => {
    let filtered = [...courses];

    if (filters.category !== "All") {
      filtered = filtered.filter(
        (course) => course.category === filters.category
      );
    }

    if (filters.difficulty !== "All") {
      filtered = filtered.filter(
        (course) =>
          course.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-72 md:w-96">
          <CourseSearch onSearch={handleSearch} />
        </div>
        <CourseFilter categories={mockCategories} onFilterChange={handleFilterChange} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-secondary/50 animate-pulse rounded-lg h-[320px]"
            />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
