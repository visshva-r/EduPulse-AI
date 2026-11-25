import { PortalNav } from "./PortalNav";

export function SiteHeader({
  title,
  subtitle,
  active,
}: {
  title: string;
  subtitle?: string;
  active?: string;
}) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2f5bea]">
            EduPulse AI · School ERP intelligence
          </p>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        <PortalNav active={active} />
      </div>
    </header>
  );
}