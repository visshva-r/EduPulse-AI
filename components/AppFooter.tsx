import { DemoReset } from "./DemoReset";

export function AppFooter() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-1 border-t border-slate-200 bg-white py-3 text-center text-xs text-slate-500">
      <span>EduPulse AI · early-warning module for school ERPs</span>
      <DemoReset />
    </footer>
  );
}