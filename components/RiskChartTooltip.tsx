type ChartTooltipProps = {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
};

export function RiskChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-slate-800">Cohort {label}</p>
      <p className="mt-0.5 text-slate-600">
        Avg risk: <span className="font-medium text-slate-900">{value}</span>
      </p>
    </div>
  );
}