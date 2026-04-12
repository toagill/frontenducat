import { apiRequest } from "./client";

export interface Question {
  questionId: string;
  subtest: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  passage?: string;
  question: string;
  options: string[];
  timeRecommended?: number;
}

export interface ExamSession {
  sessionId: string;
  userId: string;
  examType: string;
  subtests: string[];
  status: "active" | "completed" | "abandoned";
  startedAt: number;
  endsAt: number;
  currentSubtest: string;
}

export interface SubtestScore {
  correct: number;
  attempted: number;
  total: number;
  scaled?: number;
  percentile?: number;
  band?: number;
  rawScore: number;
}

export interface ExamResult {
  resultId: string;
  sessionId: string;
  examType: string;
  scores: Record<string, SubtestScore>;
  totalCognitiveScore: number;
  timeStarted: number;
  timeCompleted: number;
  durationMinutes: number;
}

export async function getSubtests() {
  const res = await apiRequest<Record<string, unknown>>("/exam/subtests", { auth: false });
  return res.data;
}

export async function getQuestions(subtest: string, limit?: number): Promise<Question[]> {
  const query = limit ? `?limit=${limit}` : "";
  const res = await apiRequest<{ questions: Question[] }>(`/exam/questions/${subtest}${query}`);
  return res.data.questions;
}

export async function startExamSession(examType = "full"): Promise<ExamSession> {
  const res = await apiRequest<ExamSession>("/exam/session", {
    method: "POST",
    body: { examType },
  });
  return res.data;
}

export async function submitExam(
  sessionId: string,
  answers: Record<string, Record<string, string>>
): Promise<ExamResult> {
  const res = await apiRequest<ExamResult>(`/exam/submit/${sessionId}`, {
    method: "POST",
    body: { answers },
  });
  return res.data;
}

export async function getUserResults(limit = 20): Promise<ExamResult[]> {
  const res = await apiRequest<{ results: ExamResult[] }>(`/exam/results?limit=${limit}`);
  return res.data.results;
}

export async function getLeaderboard(limit = 50) {
  const res = await apiRequest<unknown[]>(`/exam/leaderboard?limit=${limit}`, { auth: false });
  return res.data;
}
