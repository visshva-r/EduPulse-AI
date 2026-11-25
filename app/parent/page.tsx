import { SiteHeader } from "@/components/SiteHeader";
import { ParentAlerts } from "@/components/ParentAlerts";

export default function ParentPage() {
  return (
    <>
      <SiteHeader
        title="Parent connect"
        subtitle="Clear, calm alerts after teacher approval — English and Hindi"
        active="/parent"
      />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8">
        <ParentAlerts />
      </main>
    </>
  );
}