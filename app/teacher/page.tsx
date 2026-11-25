import { SiteHeader } from "@/components/SiteHeader";
import { TeacherInbox } from "@/components/TeacherInbox";

export default function TeacherPage() {
  return (
    <>
      <SiteHeader
        title="Teacher action inbox"
        subtitle="Review explainable risk and approve interventions before parents are notified"
        active="/teacher"
      />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8">
        <TeacherInbox />
      </main>
    </>
  );
}