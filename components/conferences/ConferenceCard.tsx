import { Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Conference } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SpotlightBanner, WorkshopBanner } from "./Banners";

interface ConferenceCardProps {
  conference: Conference;
  reserved: boolean;
  onToggle: () => void;
}

export function ConferenceCard({ conference, reserved, onToggle }: ConferenceCardProps) {
  const { id, title, speaker, banner } = conference;

  return (
    <article aria-labelledby={`conf-${id}`} className="overflow-hidden rounded-lg border border-border bg-surface-2">
      <div className="@container">{banner === "workshop" ? <WorkshopBanner /> : <SpotlightBanner />}</div>

      <div className="flex gap-4 px-4 pt-[10px] pb-[14px]">
        <Image
          src={speaker.avatar}
          alt={speaker.name}
          title={speaker.name}
          width={74}
          height={74}
          className="mt-[7px] size-[74px] shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0">
          <h2 id={`conf-${id}`} className="line-clamp-2 text-lg leading-6 font-medium text-fg md:truncate md:text-[22px] md:leading-7">
            {title}
          </h2>
          <p className="sr-only">with {speaker.name}</p>
          <Button
            aria-pressed={reserved}
            onClick={onToggle}
            className={cn("mt-[11px] h-[45px] w-36", reserved && "gap-1.5 text-fg-secondary")}
          >
            {reserved ? (
              <>
                <Check size={16} className="animate-pop-in text-live motion-reduce:animate-none" aria-hidden="true" /> Seat reserved
              </>
            ) : (
              "Reserve a seat"
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
