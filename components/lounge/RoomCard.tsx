import Link from "next/link";
import { Check } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { Tag } from "@/components/ui/Tag";
import { hasFreeSeat } from "@/lib/data/rooms";
import type { Company, InterviewRoom } from "@/lib/types";
import { InterviewTable } from "./InterviewTable";

interface RoomCardProps {
  room: InterviewRoom;
  company: Company;
  reserved: boolean;
  onReserve: () => void;
}

const ACTION = "h-11 w-[145px] shrink-0";

export function RoomCard({ room, company, reserved, onReserve }: RoomCardProps) {
  const free = hasFreeSeat(room);

  return (
    <article aria-labelledby={`room-${room.id}`} className="flex h-[302px] flex-col rounded-lg border border-border bg-surface px-3 pt-[11px] pb-[11px]">
      <header className="flex items-start gap-3">
        <CompanyLogo company={company} />
        <div className="-mt-1 flex min-w-0 flex-col gap-2">
          <h2 id={`room-${room.id}`} className="truncate text-sm text-fg">
            {company.name}
          </h2>
          <div className="flex flex-wrap gap-1">
            {company.tags.map((tag) => (
              <Tag key={tag} industry={tag} />
            ))}
          </div>
        </div>
      </header>

      <ul aria-label="Tables" className="mt-[15px] flex justify-center gap-3">
        {room.tables.map((table) => (
          <InterviewTable key={table.id} table={table} />
        ))}
      </ul>

      <footer className="mt-auto flex items-end justify-between gap-3">
        <div className="pb-[3px] pl-px">
          <p className="text-[13px] text-fg-secondary">Waiting</p>
          <p className="mt-0.5 text-base text-fg">{room.waitingCount} Applicants</p>
        </div>
        {free ? (
          <Link href={`/lounge/${room.id}`} className={buttonClasses("neutral", ACTION)}>
            Take a seat
          </Link>
        ) : reserved ? (
          <span className={buttonClasses("neutral", `${ACTION} pointer-events-none animate-fade-in gap-1.5 text-fg-secondary`)}>
            <Check size={16} className="text-live" aria-hidden="true" /> Seat reserved
          </span>
        ) : (
          <Button onClick={onReserve} className={ACTION}>
            Reserve a seat
          </Button>
        )}
      </footer>
    </article>
  );
}
