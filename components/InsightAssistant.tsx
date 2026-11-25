"use client";

import { useMemo, useState } from "react";
import { RiskBadge } from "@/components/RiskBadge";
import { students } from "@/lib/data";
import { assessStudent } from "@/lib/risk";

const PRESETS = [
  { id: "g9-science", label: "Which Class 9 students are slipping?" },
  { id: "high", label: "Who is high risk this week?" },
  { id: "attendance", label: "Who has attendance below 70%?" },
] as const;

export function InsightAssistant() {
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];

  const results = useMemo(() => {
    return students
      .map((s) => ({ student: s, risk: assessStudent(s) }))
      .filter(({ student, risk }) => {
        if (preset.id === "g9-science") return student.grade === 9 && risk.band !== "Low";
        if (preset.id === "high") return risk.band === "High";
        return student.attendanceRate < 0.7;
      })
      .sort((a, b) => b.risk.score - a.risk.score);
  }, [preset]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-900">Insight assistant</h2>
      <p className="text-xs text-slate-500">Natural-language style queries over school data</p>
      <select
        className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        value={presetId}
        onChange={(e) => setPresetId(e.target.value)}
        aria-label="Insight query"
      >
        {PRESETS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
      <ul
        className={`mt-3 space-y-2 ${
          results.length > 4 ? "max-h-52 overflow-y-auto pr-1" : ""
        }`}
      >
        {results.length === 0 ? (
          <li className="text-sm text-slate-500">No students match this query.</li>
        ) : (
          results.map(({ student, risk }) => (
            <li
              key={student.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
            >
              <span>
                {student.name}{" "}
                <span className="text-slate-500">
                  (G{student.grade}-{student.section})
                </span>
              </span>
              <RiskBadge band={risk.band} score={risk.score} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}