import { SiteHeader } from "@/components/SiteHeader";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <>
      <SiteHeader
        title="Admin cohort dashboard"
        subtitle="School-wide risk visibility and intervention coverage"
        active="/admin"
      />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8">
        <AdminDashboard />
      </main>
    </>
  );
}