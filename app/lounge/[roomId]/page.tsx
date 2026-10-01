import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InterviewRoom } from "@/components/interview/InterviewRoom";
import { getCompany } from "@/lib/data/companies";
import { getInterviewer, getRoom, ROOMS } from "@/lib/data/rooms";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ roomId: room.id }));
}

export async function generateMetadata({ params }: PageProps<"/lounge/[roomId]">): Promise<Metadata> {
  const { roomId } = await params;
  const company = getCompany(getRoom(roomId)?.companyId ?? "");
  if (!company) return { title: "Lounge" };
  return {
    title: `Lounge: ${company.name}`,
    description: `Live interview with ${company.name} at the Youth for Challenge virtual job fair.`,
  };
}

export default async function InterviewRoomPage({ params }: PageProps<"/lounge/[roomId]">) {
  const { roomId } = await params;
  const room = getRoom(roomId);
  const company = room && getCompany(room.companyId);
  const interviewer = room && getInterviewer(room);
  if (!room || !company || !interviewer) notFound();

  return (
    <InterviewRoom
      roomId={room.id}
      companyName={company.name}
      participantCount={room.participantCount}
      interviewer={interviewer}
    />
  );
}
