import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
  { href: "/teacher", label: "Teacher" },
  { href: "/parent", label: "Parent" },
  { href: "/student", label: "Student" },
];

export function PortalNav({ active }: { active?: string }) {
  return (
    <div className="w-full min-w-0 sm:w-auto">
      <p className="mb-1 text-right text-[10px] text-slate-400 sm:hidden">
        Swipe roles →
      </p>
      <nav
        className="flex max-w-full gap-2 overflow-x-auto scroll-smooth pb-1 pr-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pr-0 [&::-webkit-scrollbar]:hidden"
        aria-label="Role portals"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active === l.href
                ? "bg-[#2f5bea] text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}