"use client";

export function DemoReset() {
  function reset() {
    localStorage.removeItem("edupulse-interventions-v1");
    localStorage.removeItem("edupulse-student-tasks-v1");
    window.location.href = "/";
  }

  return (
    <button
      type="button"
      onClick={reset}
      className="text-xs text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline"
    >
      Reset demo data
    </button>
  );
}