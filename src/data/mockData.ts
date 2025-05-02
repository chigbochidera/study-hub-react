
import { Course, Enrollment, Chapter, Comment, Certificate } from "@/types";

// Mock courses data
export const mockCourses: Course[] = [
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
];

// Mock chapters data
export const mockChapters: { [key: string]: Chapter[] } = {
  "1": [
    {
      id: "1-1",
      courseId: "1",
      title: "Introduction to HTML",
      description: "Learn the basics of HTML and how to structure a web page.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: 35,
      order: 1,
    },
    {
      id: "1-2",
      courseId: "1",
      title: "CSS Fundamentals",
      description: "Style your HTML with CSS and make it look beautiful.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      duration: 42,
      order: 2,
    },
    {
      id: "1-3",
      courseId: "1",
      title: "JavaScript Basics",
      description: "Add interactivity to your websites with JavaScript.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: 38,
      order: 3,
    },
    {
      id: "1-4",
      courseId: "1",
      title: "Responsive Design",
      description: "Make your websites work on mobile devices with responsive design.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      duration: 45,
      order: 4,
    },
  ],
};

// Mock enrollments data
export const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    userId: "1",
    courseId: "1",
    progress: 25,
    completedChapters: ["1-1"],
    enrolledAt: "2023-07-15T00:00:00Z",
    lastAccessedAt: "2023-07-20T00:00:00Z",
    isCompleted: false,
  },
  {
    id: "2",
    userId: "1",
    courseId: "2",
    progress: 0,
    completedChapters: [],
    enrolledAt: "2023-07-18T00:00:00Z",
    lastAccessedAt: "2023-07-18T00:00:00Z",
    isCompleted: false,
  },
  {
    id: "3",
    userId: "1",
    courseId: "4",
    progress: 75,
    completedChapters: ["4-1", "4-2", "4-3"],
    enrolledAt: "2023-06-10T00:00:00Z",
    lastAccessedAt: "2023-07-22T00:00:00Z",
    isCompleted: false,
  },
  {
    id: "4",
    userId: "1",
    courseId: "6",
    progress: 100,
    completedChapters: ["6-1", "6-2", "6-3", "6-4", "6-5"],
    enrolledAt: "2023-05-05T00:00:00Z",
    lastAccessedAt: "2023-06-15T00:00:00Z",
    isCompleted: true,
  },
];

// Mock comments data
export const mockComments: { [key: string]: Comment[] } = {
  "1-1": [
    {
      id: "comment-1",
      userId: "2",
      chapterId: "1-1",
      content: "This was a great introduction to HTML! I finally understand how to properly structure a webpage.",
      createdAt: "2023-07-18T10:23:15Z",
      updatedAt: "2023-07-18T10:23:15Z",
      user: {
        id: "2",
        name: "Jane Smith",
        avatar: "/placeholder.svg",
      },
      replies: [
        {
          id: "reply-1",
          userId: "3",
          chapterId: "1-1",
          content: "I agree! The explanation of semantic HTML was particularly helpful for me.",
          createdAt: "2023-07-18T11:05:22Z",
          updatedAt: "2023-07-18T11:05:22Z",
          user: {
            id: "3",
            name: "Alex Johnson",
            avatar: "/placeholder.svg",
          },
        },
      ],
    },
    {
      id: "comment-2",
      userId: "4",
      chapterId: "1-1",
      content: "Could you explain more about the difference between divs and spans? I'm still a bit confused.",
      createdAt: "2023-07-19T09:14:36Z",
      updatedAt: "2023-07-19T09:14:36Z",
      user: {
        id: "4",
        name: "Michael Brown",
        avatar: "/placeholder.svg",
      },
      replies: [
        {
          id: "reply-2",
          userId: "1",
          chapterId: "1-1",
          content: "Divs are block-level elements, while spans are inline elements. Divs create a new line and take up the full width available, while spans only take up as much width as they need and don't create a new line. Hope that helps!",
          createdAt: "2023-07-19T10:02:17Z",
          updatedAt: "2023-07-19T10:02:17Z",
          user: {
            id: "1",
            name: "John Smith",
            avatar: "/placeholder.svg",
          },
        },
      ],
    },
  ],
};

// Mock certificates data
export const mockCertificates: Certificate[] = [
  {
    id: "1",
    userId: "1",
    courseId: "6",
    issueDate: "2023-06-15T00:00:00Z",
    courseTitle: "JavaScript Algorithms and Data Structures",
    userName: "John Doe",
  },
];

// Helper function to get course by ID
export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

// Helper function to get chapters by course ID
export const getChaptersByCourseId = (courseId: string): Chapter[] => {
  return mockChapters[courseId] || [];
};

// Helper function to get chapter by ID
export const getChapterById = (courseId: string, chapterId: string): Chapter | undefined => {
  const chapters = getChaptersByCourseId(courseId);
  return chapters.find(chapter => chapter.id === chapterId);
};

// Helper function to get user enrollments
export const getUserEnrollments = (userId: string): Enrollment[] => {
  return mockEnrollments.filter(enrollment => enrollment.userId === userId);
};

// Helper function to get comments by chapter ID
export const getCommentsByChapterId = (chapterId: string): Comment[] => {
  return mockComments[chapterId] || [];
};

// Helper function to get certificate by course and user
export const getCertificateByCourseAndUser = (courseId: string, userId: string): Certificate | undefined => {
  return mockCertificates.find(cert => cert.courseId === courseId && cert.userId === userId);
};
