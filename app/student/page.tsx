"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { students } from "@/lib/data";

const DEFAULT_ID = "S001";
const TASKS_KEY = "edupulse-student-tasks-v1";

function loadTasks(studentId: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const all = JSON.parse(localStorage.getItem(TASKS_KEY) ?? "{}") as Record<
      string,
      Record<string, boolean>
    >;
    return all[studentId] ?? {};
  } catch {
    return {};
  }
}

function saveTasks(studentId: string, done: Record<string, boolean>) {
  try {
    const all = JSON.parse(localStorage.getItem(TASKS_KEY) ?? "{}") as Record<
      string,
      Record<string, boolean>
    >;
    all[studentId] = done;
    localStorage.setItem(TASKS_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

export default function StudentPage() {
  const [studentId, setStudentId] = useState(DEFAULT_ID);
  const student = students.find((s) => s.id === studentId) ?? students[0];
  const subjects =
    student.weakSubjects.length > 0 ? student.weakSubjects : ["Mathematics", "Science"];
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDone(loadTasks(studentId));
  }, [studentId]);

  useEffect(() => {
    if (Object.keys(done).length > 0) saveTasks(studentId, done);
  }, [done, studentId]);

  const tasks = subjects.flatMap((sub) => [
    { id: `${sub}-1`, subject: sub, title: `15-min review: ${sub} basics (Week 12)` },
    { id: `${sub}-2`, subject: sub, title: `Practice set: 5 questions on ${sub}` },
  ]);

  const completed = tasks.filter((t) => done[t.id]).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <>
      <SiteHeader
        title="Catch-up path"
        subtitle="Daily practice linked to your support plan"
        active="/student"
      />
      <main className="mx-auto max-w-lg flex-1 px-4 py-8">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
          <label className="text-xs text-slate-500" htmlFor="stu">
            Student profile
          </label>
          <select
            id="stu"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <ProgressCard
          name={student.name}
          progress={progress}
          completed={completed}
          total={tasks.length}
        />

        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 has-[:checked]:border-[#2f5bea]/40 has-[:checked]:bg-[#f8faff]">
                <input
                  type="checkbox"
                  checked={!!done[task.id]}
                  onChange={() =>
                    setDone((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                  }
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-[#2f5bea]"
                />
                <span>
                  <span className="block text-xs font-medium text-[#2f5bea]">
                    {task.subject}
                  </span>
                  <span className="block text-sm text-slate-800">{task.title}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

function ProgressCard({
  name,
  progress,
  completed,
  total,
}: {
  name: string;
  progress: number;
  completed: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
      <p className="text-sm font-semibold text-slate-900">Hi {name.split(" ")[0]}</p>
      <p className="mt-1 text-sm text-slate-600">This week&apos;s catch-up progress</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-600">
        {completed} of {total} tasks · {progress}%
      </p>
    </div>
  );
}