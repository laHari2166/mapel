
export type Role = 'Student' | 'Guru' | 'Creator';

export interface User {
  id: string;
  username: string;
  password?: string;
  role: Role;
  avatar: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  completedQuizzes: string[];
  completedLessons: string[];
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  lessonId: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  youtubeId: string;
  notes: string;
  quizId: string;
  pyqs?: string[];
  importantQuestions?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  thumbnail: string;
  category: 'Board Exam' | 'Competitive Exam';
}

export interface CareerPath {
    id: string;
    title: string;
    description: string;
    trending: boolean;
    exams: string[];
    courses: string[];
    skills: string[];
}

export interface StudyRoom {
  id: string;
  name: string;
  creatorId: string;
  members: string[];
  messages: { userId: string; username: string, message: string; timestamp: number }[];
  sharedGoals: { text: string; completed: boolean }[];
  followedMentorId?: string;
}

export interface UpcomingExam {
  id: string;
  name: string;
  registrationDate: string;
  eligibility: string;
  applyLink: string;
  resourcesLink: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  content: {
    type: 'video' | 'note';
    title: string;
    url: string;
  }[];
}

export interface LiveClass {
    id: string;
    title: string;
    description: string;
    youtubeId?: string;
    startTime: string;
    isLive: boolean;
    host: string;
}
