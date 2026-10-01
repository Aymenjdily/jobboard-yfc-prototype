import { EllipsisVertical, MessageSquare, Mic, MicOff, Phone, ScreenShare, Video, VideoOff } from "lucide-react";
import Link from "next/link";
import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

const CONTROL =
  "flex size-[46px] items-center justify-center rounded-lg border border-divider bg-bg text-fg transition-colors hover:bg-surface " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function ControlButton({
  label,
  pressed,
  onClick,
  className,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} title={label} aria-pressed={pressed} onClick={onClick} className={cn(CONTROL, className)}>
      {children}
    </button>
  );
}

interface CallControlsProps {
  muted: boolean;
  cameraOn: boolean;
  notesOpen: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleNotes: () => void;
  notesButtonRef: Ref<HTMLButtonElement>;
}

const ICON = { size: 22, strokeWidth: 1.75, "aria-hidden": true } as const;

export function CallControls({ muted, cameraOn, notesOpen, onToggleMic, onToggleCamera, onToggleNotes, notesButtonRef }: CallControlsProps) {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-[23px] sm:flex-nowrap">
      <div role="toolbar" aria-label="Call controls" className="flex items-center gap-3 sm:gap-[23px]">
        <ControlButton
          label={muted ? "Unmute microphone" : "Mute microphone"}
          pressed={muted}
          onClick={onToggleMic}
          className={cn(muted && "border-transparent bg-ctrl-muted hover:bg-ctrl-muted/80")}
        >
          {muted ? <MicOff {...ICON} /> : <Mic {...ICON} />}
        </ControlButton>
        <ControlButton
          label={cameraOn ? "Turn camera off" : "Turn camera on"}
          pressed={!cameraOn}
          onClick={onToggleCamera}
          className={cn(!cameraOn && "border-transparent bg-ctrl-muted hover:bg-ctrl-muted/80")}
        >
          {cameraOn ? <Video {...ICON} /> : <VideoOff {...ICON} />}
        </ControlButton>
        <ControlButton label="Screen sharing isn't available in this demo">
          <ScreenShare {...ICON} />
        </ControlButton>
        <ControlButton label="More options">
          <EllipsisVertical {...ICON} />
        </ControlButton>

        {/* Leave call: split button, as in design/07 */}
        <div className="flex h-[46px] items-center overflow-hidden rounded-lg bg-primary text-primary-fg">
          <Link
            href="/lounge"
            aria-label="Leave interview"
            title="Leave interview"
            className="flex h-full w-[46px] items-center justify-center transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
          >
            <Phone {...ICON} className="rotate-[135deg]" />
          </Link>
          <span aria-hidden="true" className="h-5 w-px bg-white/25" />
          <button
            type="button"
            aria-label="Leave options"
            title="Leave options"
            className="flex h-full w-[37px] items-center justify-center transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
          >
            <EllipsisVertical size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        ref={notesButtonRef}
        type="button"
        aria-expanded={notesOpen}
        aria-controls="notes-panel"
        onClick={onToggleNotes}
        className={cn(
          CONTROL,
          "w-auto gap-2.5 px-[18px] text-base font-medium sm:absolute sm:right-0",
          notesOpen && "bg-surface",
        )}
      >
        <MessageSquare size={22} strokeWidth={1.75} aria-hidden="true" />
        Notes
      </button>
    </div>
  );
}
