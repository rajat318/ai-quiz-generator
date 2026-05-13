export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'HOTS';
  topic: string;
  type: 'MCQ' | 'True/False' | 'Fill in the blanks' | 'Short Answer' | 'Match the Following';
}

export interface QuizConfig {
  subject: string;
  topic: string;
  count: number;
  difficulty: string;
  language: string;
  examType: string;
  timeLimit: number; // minutes
  typeRatio: Record<string, number>; // e.g. { MCQ: 70, TF: 30 }
  contextText?: string;
  isCustomAmount?: boolean;
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: Question[];
  answers: Record<string, string>;
  bookmarks: string[];
  startTime: number;
  endTime?: number;
  score: number;
}

export interface AnalyticsRecord {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  topicPerformance: Record<string, { correct: number; total: number }>;
  history: QuizSession[];
}
