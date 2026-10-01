"use client";

import Image from "next/image";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { getCompany } from "@/lib/data/companies";
import { SEED_SCHEDULE } from "@/lib/data/schedule";
import { formatDate, formatTime } from "@/lib/data/timeslots";
import { useAppStore } from "@/lib/store";
import type { ScheduledInterview } from "@/lib/types";
import { cn } from "@/lib/utils";

function when(item: ScheduledInterview) {
  if (item.slot) return `Scheduled for ${formatDate(item.slot.date)} at ${formatTime(item.slot.time)}`;
  return `Will start approximately in ${item.etaMinutes} minutes`;
}

function ScheduleCard({ item, isNew }: { item: ScheduledInterview; isNew: boolean }) {
  const company = getCompany(item.companyId);
  if (!company) return null;
  return (
    <li className={cn("rounded-lg border border-border bg-surface px-3 pt-[11px] pb-[9px]", isNew && "animate-fade-in-up motion-reduce:animate-none")}>
      <div className="flex items-start gap-3">
        <CompanyLogo company={company} />
        <div className="min-w-0">
          <p className="truncate text-sm text-fg">{company.name}</p>
          <p className="text-[13px] leading-[18px] text-fg-secondary">{when(item)}</p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-[7px] pl-px">
        <div className="flex -space-x-0.5">
          {item.aheadAvatars.map((src) => (
            <Image key={src} src={src} alt="" width={16} height={16} className="size-4 rounded-full ring-1 ring-surface" />
          ))}
        </div>
        <p className="text-[11px] text-fg-muted">
          {item.candidatesAhead} {item.candidatesAhead === 1 ? "candidate" : "candidates"} ahead of you
        </p>
      </div>
    </li>
  );
}

export function MySchedule() {
  const { state } = useAppStore();
  const items = [...SEED_SCHEDULE, ...state.schedule];

  return (
    <aside
      aria-labelledby="my-schedule"
      className="border-t border-divider px-4 pt-6 pb-6 sm:px-[22px] lg:w-[346px] lg:shrink-0 lg:border-t-0 lg:border-l"
    >
      <h2 id="my-schedule" className="text-xl font-semibold text-fg">
        My schedule
      </h2>
      <p className="mt-1.5 text-base text-fg-secondary">List of my next interviews</p>
      <ul aria-live="polite" className="mt-[19px] flex flex-col gap-3">
        {items.map((item) => (
          <ScheduleCard key={item.id} item={item} isNew={!item.id.startsWith("seed-")} />
        ))}
      </ul>
    </aside>
  );
}
