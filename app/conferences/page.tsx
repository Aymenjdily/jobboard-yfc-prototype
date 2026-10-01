import type { Metadata } from "next";
import { ConferenceGrid } from "@/components/conferences/ConferenceGrid";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Conferences",
  description: "Learn from recruiting experts — reserve a seat at talks and workshops on CVs, interviews and AI in job applications.",
};

export default function ConferencesPage() {
  return (
    <main className="flex-1 px-4 pt-6 pb-6 sm:px-[23px]">
      <PageHeader title="Conferences" subtitle="Learn from recruiting experts" />
      <div className="mt-[23px]">
        <ConferenceGrid />
      </div>
    </main>
  );
}
