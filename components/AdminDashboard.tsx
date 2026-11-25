"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { students, SCHOOL } from "@/lib/data";
import { assessStudent } from "@/lib/risk";
import { InsightAssistant } from "@/components/InsightAssistant";
import { RiskChartTooltip } from "@/components/RiskChartTooltip";
import { useInterventions } from "@/context/InterventionProvider";

function cohortStats() {
  const keys = new Map<string, { label: string; scores: number[]; high: number }>();
  for (const s of students) {
    const label = `G${s.grade}-${s.section}`;
    const risk = assessStudent(s);
    const row = keys.get(label) ?? { label, scores: [], high: 0 };
    row.scores.push(risk.score);
    if (risk.band === "High") row.high += 1;
    keys.set(label, row);
  }
  return [...keys.values()].map((r) => ({
    name: r.label,
    avgRisk: Math.round(r.scores.reduce((a, b) => a + b, 0) / r.scores.length),
    highCount: r.high,
    students: r.scores.length,
  }));
}

const barColor = (avg: number) => {
  if (avg >= 70) return "#dc2626";
  if (avg >= 45) return "#d97706";
  return "#059669";
};

export function AdminDashboard() {
  const data = cohortStats();
  const { drafts } = useInterventions();
  const approved = Object.values(drafts).filter((d) => d.status === "approved").length;
  const pending = Object.values(drafts).filter((d) => d.status === "draft").length;
  const flagged = students.filter((s) => {
    const b = assessStudent(s).band;
    return b === "High" || b === "Medium";
  }).length;
  const coverage = flagged ? Math.round((approved / flagged) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">School</p>
          <p className="font-semibold text-slate-900">{SCHOOL.name}</p>
          <p className="text-xs text-slate-500">{SCHOOL.board} · {SCHOOL.weekLabel}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">At-risk (Med+High)</p>
          <p className="text-2xl font-bold text-slate-900">{flagged}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Interventions approved</p>
          <p className="text-2xl font-bold text-[#2f5bea]">{approved}</p>
          <p className="text-xs text-slate-500">{pending} pending teacher review</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Coverage rate</p>
          <p className="text-2xl font-bold text-emerald-700">{coverage}%</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Risk heatmap by class</h2>
        <p className="text-xs text-slate-500">Average weekly risk score (0–100)</p>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip content={<RiskChartTooltip />} />
              <Bar dataKey="avgRisk" radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={barColor(entry.avgRisk)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-slate-500">
              <th className="py-2">Cohort</th>
              <th>Students</th>
              <th>High risk</th>
              <th>Avg score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name} className="border-b border-slate-100">
                <td className="py-2 font-medium">{row.name}</td>
                <td>{row.students}</td>
                <td
                  className={
                    row.highCount > 0 ? "font-medium text-red-700" : "text-slate-400"
                  }
                >
                  {row.highCount}
                </td>
                <td>{row.avgRisk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightAssistant />
    </div>
  );
}