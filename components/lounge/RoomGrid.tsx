"use client";

import { useState } from "react";
import { getCompany } from "@/lib/data/companies";
import { QUEUE_AVATARS } from "@/lib/data/people";
import { ROOMS } from "@/lib/data/rooms";
import { useAppStore } from "@/lib/store";
import type { TimeSlot } from "@/lib/types";
import { RoomCard } from "./RoomCard";
import { TimeframeModal } from "./TimeframeModal";

export function RoomGrid() {
  const { state, dispatch } = useAppStore();
  const [reservingId, setReservingId] = useState<string | null>(null);
  const reserved = new Set(state.schedule.map((item) => item.companyId));

  function confirm(slot: TimeSlot) {
    const room = ROOMS.find((r) => r.id === reservingId);
    if (!room) return;
    dispatch({
      type: "addSchedule",
      interview: {
        id: crypto.randomUUID(),
        companyId: room.companyId,
        slot,
        candidatesAhead: room.waitingCount,
        aheadAvatars: QUEUE_AVATARS,
      },
    });
    setReservingId(null);
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
        {ROOMS.map((room) => {
          const company = getCompany(room.companyId);
          if (!company) return null;
          return (
            <RoomCard
              key={room.id}
              room={room}
              company={company}
              reserved={reserved.has(room.companyId)}
              onReserve={() => setReservingId(room.id)}
            />
          );
        })}
      </div>
      <TimeframeModal open={reservingId !== null} onClose={() => setReservingId(null)} onConfirm={confirm} />
    </>
  );
}
