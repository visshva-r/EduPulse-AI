"use client";

import { useState } from "react";
import { RiskBadge } from "@/components/RiskBadge";
import { useInterventions } from "@/context/InterventionProvider";
import { students } from "@/lib/data";
import { assessStudent, flaggedStudents } from "@/lib/risk";

export function TeacherInbox() {
  const { drafts, approve, dismiss } = useInterventions();
  const flagged = flaggedStudents(students, "Medium");
  const [selectedId, setSelectedId] = useState(flagged[0]?.student.id ?? "");

  const selected = flagged.find((f) => f.student.id === selectedId) ?? flagged[0];
  const draft = selected ? drafts[selected.student.id] : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold">Flagged students</h2>
          <p className="text-xs text-slate-500">Sorted by risk score</p>
        </div>
        <ul className="max-h-[28rem] divide-y divide-slate-100 overflow-y-auto">
          {flagged.map(({ student, risk }) => (
            <li key={student.id}>
              <button
                type="button"
                onClick={() => setSelectedId(student.id)}
                className={`flex w-full items-center justify-between gap-2 border-l-4 px-4 py-3 text-left transition hover:bg-slate-50 ${
                  selectedId === student.id
                    ? "border-[#2f5bea] bg-[#dbe4fd]"
                    : "border-transparent"
                }`}
              >
                <div>
                  <p className="font-medium text-slate-900">{student.name}</p>
                  <p className="text-xs text-slate-500">
                    Class {student.grade}-{student.section}
                  </p>
                </div>
                <RiskBadge band={risk.band} score={risk.score} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && draft ? (
        <div className="space-y-4">
          <ExplainCard studentName={selected.student.name} risk={selected.risk} />

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Intervention Copilot · action card
              </h2>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  draft.status === "approved"
                    ? "bg-emerald-100 text-emerald-800"
                    : draft.status === "dismissed"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-amber-100 text-amber-900"
                }`}
              >
                {draft.status}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-800">{draft.action}</p>
            <p className="mt-2 text-xs text-slate-500">Duration: {draft.duration}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
              {draft.resources.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Parent preview (on approve)</p>
              <p className="mt-1">{draft.parentMessageEn}</p>
            </div>

            {draft.status === "draft" ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => approve(selected.student.id)}
                  className="rounded-lg bg-[#2f5bea] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2549c4]"
                >
                  Approve &amp; notify parent
                </button>
                <button
                  type="button"
                  onClick={() => dismiss(selected.student.id)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Dismiss
                </button>
              </div>
            ) : draft.status === "approved" ? (
              <p className="mt-4 text-sm text-emerald-700">
                Approved — parent alert is available in the Parent portal.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ExplainCard({
  studentName,
  risk,
}: {
  studentName: string;
  risk: ReturnType<typeof assessStudent>;
}) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5">
      <h2 className="text-sm font-semibold text-slate-900">Explainable risk · {studentName}</h2>
      <ScoreRow band={risk.band} score={risk.score} />
      <ul className="mt-3 space-y-2">
        {risk.reasons.map((reason) => (
          <li
            key={reason}
            className="rounded-lg border border-violet-100 bg-white px-3 py-2 text-sm text-slate-700"
          >
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScoreRow({ band, score }: { band: string; score: number }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <RiskBadge band={band as "Low" | "Medium" | "High"} score={score} />
      <span className="text-xs text-slate-500">Updated weekly from ERP signals</span>
    </div>
  );
}