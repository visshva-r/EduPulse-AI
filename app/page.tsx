import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SCHOOL } from "@/lib/data";
import { assessAll, flaggedStudents } from "@/lib/risk";
import { students } from "@/lib/data";

export default function HomePage() {
  const risks = assessAll(students);
  const high = risks.filter((r) => r.band === "High").length;
  const medium = risks.filter((r) => r.band === "Medium").length;
  const flagged = flaggedStudents(students, "Medium").length;

  const portals = [
    {
      href: "/admin",
      title: "Admin dashboard",
      desc: "Cohort risk heatmap, KPIs, intervention coverage",
      color: "ring-[#2f5bea]/30 hover:bg-[#eef2fd]",
    },
    {
      href: "/teacher",
      title: "Teacher inbox",
      desc: "Explainable scores, AI action cards, approve before parent alert",
      color: "ring-violet-300/50 hover:bg-violet-50",
    },
    {
      href: "/parent",
      title: "Parent connect",
      desc: "English + Hindi alerts after teacher approval",
      color: "ring-emerald-300/50 hover:bg-emerald-50",
    },
    {
      href: "/student",
      title: "Catch-up path",
      desc: "Daily practice tasks for weak topics",
      color: "ring-amber-300/50 hover:bg-amber-50",
    },
  ];

  return (
    <>
      <SiteHeader
        title="EduPulse AI"
        subtitle={`${SCHOOL.name} · ${SCHOOL.weekLabel} · ERP plug-in demo`}
        active="/"
      />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Detect → Explain → Act → Track
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Turn attendance, marks, and homework data into explainable risk scores,
            teacher-approved interventions, and clear parent updates.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium text-slate-500">Students</dt>
              <dd className="text-2xl font-bold text-slate-900">{students.length}</dd>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <dt className="text-xs font-medium text-red-700">High risk</dt>
              <dd className="text-2xl font-bold text-red-800">{high}</dd>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <dt className="text-xs font-medium text-amber-800">Medium risk</dt>
              <dd className="text-2xl font-bold text-amber-900">{medium}</dd>
            </div>
            <div className="rounded-xl bg-[#eef2fd] p-4">
              <dt className="text-xs font-medium text-[#2f5bea]">Flagged this week</dt>
              <dd className="text-2xl font-bold text-[#1f3f9e]">{flagged}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {portals.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-2 ring-transparent transition ${p.color}`}
            >
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[#2f5bea]">
                Open portal →
              </span>
            </Link>
          ))}
        </section>

      </main>
    </>
  );
}