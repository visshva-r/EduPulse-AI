import type { RiskBand } from "@/lib/types";

const styles: Record<RiskBand, string> = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-amber-100 text-amber-900 border-amber-200",
  Low: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export function RiskBadge({ band, score }: { band: RiskBand; score?: number }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[band]}`}
    >
      {band}
      {score !== undefined ? ` · ${score}` : null}
    </span>
  );
}