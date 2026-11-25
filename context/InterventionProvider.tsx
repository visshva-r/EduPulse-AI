"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { students } from "@/lib/data";
import { draftIntervention } from "@/lib/interventions";
import { assessStudent } from "@/lib/risk";
import type { InterventionDraft } from "@/lib/types";

const STORAGE_KEY = "edupulse-interventions-v1";

type Ctx = {
  drafts: Record<string, InterventionDraft>;
  approve: (studentId: string) => void;
  dismiss: (studentId: string) => void;
  reset: (studentId: string) => void;
};

const InterventionContext = createContext<Ctx | null>(null);

function initialDrafts(): Record<string, InterventionDraft> {
  const map: Record<string, InterventionDraft> = {};
  for (const student of students) {
    const risk = assessStudent(student);
    if (risk.band === "High" || risk.band === "Medium") {
      map[student.id] = draftIntervention(student, risk);
    }
  }
  return map;
}

export function InterventionProvider({ children }: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<Record<string, InterventionDraft>>({});

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setDrafts(JSON.parse(raw) as Record<string, InterventionDraft>);
        return;
      } catch {
        /* fall through */
      }
    }
    setDrafts(initialDrafts());
  }, []);

  useEffect(() => {
    if (Object.keys(drafts).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    }
  }, [drafts]);

  const approve = useCallback((studentId: string) => {
    setDrafts((prev) => {
      const d = prev[studentId];
      if (!d) return prev;
      return {
        ...prev,
        [studentId]: {
          ...d,
          status: "approved",
          approvedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const dismiss = useCallback((studentId: string) => {
    setDrafts((prev) => {
      const d = prev[studentId];
      if (!d) return prev;
      return { ...prev, [studentId]: { ...d, status: "dismissed" } };
    });
  }, []);

  const reset = useCallback((studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const risk = assessStudent(student);
    setDrafts((prev) => ({
      ...prev,
      [studentId]: draftIntervention(student, risk),
    }));
  }, []);

  const value = useMemo(
    () => ({ drafts, approve, dismiss, reset }),
    [drafts, approve, dismiss, reset],
  );

  return (
    <InterventionContext.Provider value={value}>
      {children}
    </InterventionContext.Provider>
  );
}

export function useInterventions() {
  const ctx = useContext(InterventionContext);
  if (!ctx) throw new Error("useInterventions outside provider");
  return ctx;
}