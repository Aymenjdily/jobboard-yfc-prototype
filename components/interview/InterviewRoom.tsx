"use client";

import { FileUser, UsersRound, Volume1 } from "lucide-react";
import { useRef, useState } from "react";
import { CURRENT_USER, CURRENT_USER_PORTRAIT } from "@/lib/data/people";
import { SAMPLE_RESUME } from "@/lib/data/sample-resume";
import { useAppStore } from "@/lib/store";
import type { Person } from "@/lib/types";
import { CallControls } from "./CallControls";
import { NotesPanel } from "./NotesPanel";
import { SharedResume } from "./SharedResume";
import { VideoTile } from "./VideoTile";

interface InterviewRoomProps {
  roomId: string;
  companyName: string;
  participantCount: number;
  interviewer: Person;
}

/** Interview call screen (design/07 + design/08). Everything is local — no real call. */
export function InterviewRoom({ roomId, companyName, participantCount, interviewer }: InterviewRoomProps) {
  const { state, hydrated } = useAppStore();
  const [muted, setMuted] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const notesButtonRef = useRef<HTMLButtonElement>(null);

  // The shared document is the candidate's scanned CV; fall back to the sample until they've done Reception.
  const cv = hydrated && state.profile.fullName ? state.profile : SAMPLE_RESUME;

  function closeNotes() {
    setNotesOpen(false);
    notesButtonRef.current?.focus();
  }

  // Desktop: exactly one screen tall (below the 53px nav) so the controls stay in view.
  return (
    <main className="flex flex-1 flex-col px-4 pb-[23px] sm:px-[23px] lg:h-[calc(100dvh-53px)] lg:min-h-[640px] lg:flex-none">
      <div className="flex h-[68px] shrink-0 items-center justify-between gap-4">
        <h1 className="flex items-center gap-2.5 pl-[5px] text-base text-fg">
          <Volume1 size={20} strokeWidth={1.75} aria-hidden="true" />
          Lounge: {companyName}
        </h1>
        <button
          type="button"
          aria-label={`${participantCount} participants`}
          className="flex h-[46px] items-center gap-3 rounded-lg border border-divider px-4 text-base text-fg transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <UsersRound size={22} strokeWidth={1.75} aria-hidden="true" />
          {participantCount}
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-[23px] lg:flex-row">
        {/* Stage: the candidate's resume, shared on screen */}
        <section aria-label="Shared screen" className="relative h-[70vh] min-h-0 overflow-hidden rounded-xl bg-white lg:h-auto lg:flex-1">
          <div className="@container size-full overflow-y-auto">
            <SharedResume cv={cv} photo={CURRENT_USER_PORTRAIT} />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-60% to-bg/95" />
          <p className="absolute bottom-2 left-2 flex h-[27px] items-center gap-1.5 rounded-md bg-black/90 px-2 text-[13px] text-white">
            <FileUser size={16} className="text-live" aria-hidden="true" />
            Interviewee&apos;s Resume
          </p>
        </section>

        {/* Participants */}
        <div className="grid shrink-0 grid-cols-2 gap-3 lg:flex lg:w-[296px] lg:flex-col lg:gap-[17px]">
          <VideoTile person={interviewer} label="Interviewer" active />
          <VideoTile person={CURRENT_USER} label="Interviewee" cameraOff={!cameraOn} />
        </div>

        {notesOpen && (
          <NotesPanel
            roomId={roomId}
            onClose={closeNotes}
            className="absolute inset-x-0 top-8 bottom-0 z-30 lg:inset-x-auto lg:right-0 lg:-bottom-[31px] lg:w-[416px]"
          />
        )}
      </div>

      <div className="mt-[23px] shrink-0 lg:mt-[46px]">
        <CallControls
          muted={muted}
          cameraOn={cameraOn}
          notesOpen={notesOpen}
          onToggleMic={() => setMuted((m) => !m)}
          onToggleCamera={() => setCameraOn((c) => !c)}
          onToggleNotes={() => (notesOpen ? closeNotes() : setNotesOpen(true))}
          notesButtonRef={notesButtonRef}
        />
      </div>
    </main>
  );
}
