import Image from "next/image";
import type { Person, Table } from "@/lib/types";
import { cn } from "@/lib/utils";

// Geometry measured from design/05 (one table = 72×159px incl. chair arcs).
const SEAT = "absolute left-1/2 size-[30px] -translate-x-1/2 rounded-md";

function Seat({ person, side }: { person: Person | null; side: "top" | "bottom" }) {
  const position = side === "top" ? "top-1" : "top-[124px]";
  if (!person) {
    // Empty chair: grey block tucked under the table edge.
    return <span aria-hidden="true" className={cn(SEAT, position, "z-0 bg-seat-empty")} />;
  }
  return (
    <Image
      src={person.avatar}
      alt={person.name}
      title={person.name}
      width={30}
      height={30}
      className={cn(
        SEAT,
        position,
        "z-10 object-cover shadow-md shadow-black/40 ring-1 ring-white/15 transition-transform duration-200 hover:scale-125 motion-reduce:transition-none",
      )}
    />
  );
}

export function InterviewTable({ table }: { table: Table }) {
  const free = !table.interviewer || !table.candidate;
  return (
    <li
      className="relative h-[159px] w-[72px]"
      aria-label={`Table — ${table.candidate?.name ?? "free seat"} with ${table.interviewer?.name ?? "free seat"}`}
      data-free={free || undefined}
    >
      {/* Chair backs */}
      <span aria-hidden="true" className="absolute top-0 left-1/2 h-1.5 w-[34px] -translate-x-1/2 rounded-t-[50%] border-t-2 border-fg-muted/50" />
      <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-1.5 w-[34px] -translate-x-1/2 rounded-b-[50%] border-b-2 border-primary" />

      <Seat person={table.candidate} side="top" />
      <span aria-hidden="true" className="absolute inset-x-0 top-[22px] z-[5] h-[115px] rounded-xl border border-white/5 bg-seat" />
      <Seat person={table.interviewer} side="bottom" />
    </li>
  );
}
