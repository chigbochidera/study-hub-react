
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;
  totalStudents: number;
  totalLessons: number;
  totalDuration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedChapters: string[];
  enrolledAt: string;
  lastAccessedAt: string;
  isCompleted: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  chapterId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  replies?: Comment[];
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issueDate: string;
  courseTitle: string;
  userName: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
