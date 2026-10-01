import { VideoOff, Wifi } from "lucide-react";
import Image from "next/image";
import type { Person } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VideoTileProps {
  person: Person;
  label: string;
  active?: boolean;
  cameraOff?: boolean;
}

/** Static "video" tile (no real call — AGENTS.md §2). 296×179 at the reference size. */
export function VideoTile({ person, label, active, cameraOff }: VideoTileProps) {
  const src = person.video ?? person.avatar;

  return (
    <figure
      aria-label={`${label}: ${person.name}${cameraOff ? " (camera off)" : ""}`}
      className="relative aspect-[296/179] w-full overflow-hidden rounded-lg bg-surface-2"
    >
      {cameraOff ? (
        <div className="flex size-full animate-fade-in flex-col items-center justify-center gap-2 motion-reduce:animate-none">
          <Image src={person.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
          <span className="flex items-center gap-1.5 text-xs text-fg-muted">
            <VideoOff size={14} aria-hidden="true" /> Camera off
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 296px, 50vw"
          className={cn("object-cover", !person.video && "scale-110 blur-[1px]")}
        />
      )}
      {/* Active speaker outline drawn above the image. */}
      {active && <span aria-hidden="true" className="absolute inset-0 rounded-lg ring-2 ring-tile-active ring-inset" />}
      <figcaption className="absolute bottom-1.5 left-1.5 flex h-[27px] items-center gap-1.5 rounded-md bg-black/80 px-2 text-[13px] text-white">
        {label}
        <Wifi size={14} strokeWidth={2.25} className="text-live" aria-hidden="true" />
      </figcaption>
    </figure>
  );
}
