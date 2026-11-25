import type { RiskAssessment, RiskBand, Student } from "./types";

function band(score: number): RiskBand {
  if (score >= 70) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

export function assessStudent(student: Student): RiskAssessment {
  let score = 0;
  const reasons: string[] = [];

  if (student.consecutiveAbsences >= 5) {
    score += 28;
    reasons.push(
      `${student.consecutiveAbsences} consecutive absences. Immediate follow-up needed.`,
    );
  } else if (student.consecutiveAbsences >= 3) {
    score += 15;
    reasons.push(`${student.consecutiveAbsences} consecutive absences this month.`);
  }

  if (student.attendanceTrend <= -0.2) {
    score += 22;
    reasons.push(
      `Attendance down ${Math.round(Math.abs(student.attendanceTrend) * 100)}% over the last 4 weeks (now ${Math.round(student.attendanceRate * 100)}%).`,
    );
  } else if (student.attendanceTrend <= -0.1) {
    score += 12;
    reasons.push(
      `Attendance declining (${Math.round(student.attendanceRate * 100)}% weekly average).`,
    );
  }

  if (student.marksTrend <= -20) {
    score += 25;
    reasons.push(
      `Marks dropped ${Math.abs(student.marksTrend)} points vs personal baseline (avg ${student.avgMarks}%).`,
    );
  } else if (student.marksTrend <= -10) {
    score += 14;
    reasons.push(`Mark trajectory falling (${student.marksTrend} pts vs baseline).`);
  }

  if (student.homeworkRate < 0.4) {
    score += 18;
    reasons.push(
      `Homework completion only ${Math.round(student.homeworkRate * 100)}% — engagement at risk.`,
    );
  } else if (student.homeworkRate < 0.6) {
    score += 8;
    reasons.push(`Homework completion below class average (${Math.round(student.homeworkRate * 100)}%).`);
  }

  if (student.weakSubjects.length >= 2) {
    score += 10;
    reasons.push(`Struggling in ${student.weakSubjects.join(" and ")}.`);
  } else if (student.weakSubjects.length === 1) {
    score += 5;
    reasons.push(`Needs support in ${student.weakSubjects[0]}.`);
  }

  score = Math.min(100, Math.max(0, score));

  if (reasons.length === 0) {
    reasons.push("Stable attendance, marks, and homework — no alert this week.");
  }

  return {
    studentId: student.id,
    score,
    band: band(score),
    reasons: reasons.slice(0, 3),
  };
}

export function assessAll(students: Student[]): RiskAssessment[] {
  return students.map(assessStudent);
}

export function flaggedStudents(
  students: Student[],
  minBand: RiskBand = "Medium",
): { student: Student; risk: RiskAssessment }[] {
  const order = { High: 3, Medium: 2, Low: 1 };
  const min = order[minBand];
  return students
    .map((student) => ({ student, risk: assessStudent(student) }))
    .filter(({ risk }) => order[risk.band] >= min)
    .sort((a, b) => b.risk.score - a.risk.score);
}