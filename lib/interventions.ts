import type { InterventionDraft, Student } from "./types";
import type { RiskAssessment } from "./types";

export function draftIntervention(
  student: Student,
  risk: RiskAssessment,
): InterventionDraft {
  const subject = student.weakSubjects[0] ?? "core subjects";
  const peer =
    student.grade >= 9 ? "Pair with class mentor student" : "Buddy from Section A";

  const subjectHi: Record<string, string> = {
    Mathematics: "गणित",
    Science: "विज्ञान",
    English: "अंग्रेज़ी",
    Hindi: "हिंदी",
    Physics: "भौतिकी",
    Chemistry: "रसायन",
    "Social Studies": "सामाजिक अध्ययन",
  };
  const subjectLabelHi = subjectHi[subject] ?? subject;

  const action = `Run a 2-week remedial plan for ${subject}: 20-min daily practice + one peer session.`;
  const rationale = risk.reasons.join(" ");

  const parentMessageEn = `Dear ${student.parentName}, ${student.name} needs gentle support in ${subject}. Please ensure 20 minutes of daily practice and regular school attendance. Your class teacher has shared a plan. Reach out if you need help.`;
  const parentMessageHi = `प्रिय अभिभावक, ${student.name} को ${subjectLabelHi} में सहायता की ज़रूरत है। कृपया रोज़ 20 मिनट अभ्यास और नियमित उपस्थिति सुनिश्चित करें। शिक्षक ने योजना साझा की है। संपर्क करें।`;

  return {
    studentId: student.id,
    action,
    rationale,
    duration: "14 days",
    resources: [
      `Remedial worksheet: ${subject} (Week 12)`,
      `${peer}`,
      "Counsellor check-in if no improvement by Day 10",
    ],
    parentMessageEn,
    parentMessageHi,
    status: "draft",
  };
}