import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MySchedule } from "@/components/lounge/MySchedule";
import { RoomGrid } from "@/components/lounge/RoomGrid";

export const metadata: Metadata = {
  title: "Lounge",
  description: "Take a seat in a company's interviewing room or reserve a time slot, and track your upcoming interviews.",
};

export default function LoungePage() {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <main className="min-w-0 flex-1 px-4 pt-6 pb-6 sm:px-[23px]">
        <PageHeader title="Interviewing rooms" subtitle="Take a Seat to start your interview." />
        <div className="mt-[23px]">
          <RoomGrid />
        </div>
      </main>
      <MySchedule />
    </div>
  );
}
