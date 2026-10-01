"use client";

import { CONFERENCES } from "@/lib/data/conferences";
import { useAppStore } from "@/lib/store";
import { ConferenceCard } from "./ConferenceCard";

export function ConferenceGrid() {
  const { state, dispatch } = useAppStore();

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {CONFERENCES.map((conference) => (
        <ConferenceCard
          key={conference.id}
          conference={conference}
          reserved={state.reservedConferenceIds.includes(conference.id)}
          onToggle={() => dispatch({ type: "toggleConference", id: conference.id })}
        />
      ))}
    </div>
  );
}
