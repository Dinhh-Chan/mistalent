export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  applications: number;
  status: string;
}

export interface StageData {
  status: string;
  date: string | null;
  feedback: string | null;
  scores?: { code: number; personality: number };
  score?: number;
}

export interface Application {
  id: number;
  position: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: "hired" | "rejected" | "in-progress" | "pending";
  stages: {
    cv: StageData;
    test: StageData;
    interview: StageData;
    final: StageData;
  };
}

export interface MainDashboardProps {
  onLogout: () => void;
  onGoHome?: () => void;
  onApplyJob?: (job: Job) => void;
}

export interface MatchingResult {
  score: number;
  skills: string[];
  feedback: string;
  recommendation: string;
}

export interface TestResults {
  coding: number;
  personality: number;
}

export interface InterviewResults {
  score: number;
  feedback: string;
}

export interface CodingQuestion {
  id: number;
  title: string;
  description: string;
  code: string;
  testCases: { input: string; expected: string }[];
  timeLimit: number;
}

export interface PersonalityQuestion {
  id: number;
  question: string;
  options: { value: string; text: string }[];
}

export interface InterviewQuestion {
  id: number;
  type: string;
  question: string;
  timeLimit: number;
} 