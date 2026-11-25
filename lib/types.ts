export type RiskBand = "Low" | "Medium" | "High";

export interface Student {
  id: string;
  name: string;
  grade: number;
  section: string;
  parentName: string;
  language: "en" | "hi";
  attendanceRate: number;
  attendanceTrend: number;
  avgMarks: number;
  marksTrend: number;
  homeworkRate: number;
  consecutiveAbsences: number;
  weakSubjects: string[];
}

export interface RiskAssessment {
  studentId: string;
  score: number;
  band: RiskBand;
  reasons: string[];
}

export interface InterventionDraft {
  studentId: string;
  action: string;
  rationale: string;
  duration: string;
  resources: string[];
  parentMessageEn: string;
  parentMessageHi: string;
  status: "draft" | "approved" | "dismissed";
  approvedAt?: string;
}