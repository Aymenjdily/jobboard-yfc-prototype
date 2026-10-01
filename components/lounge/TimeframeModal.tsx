"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatTime, getSlotDays } from "@/lib/data/timeslots";
import type { TimeSlot } from "@/lib/types";
import { cn } from "@/lib/utils";

const DAYS = getSlotDays();

const ARROW =
  "rounded-md p-1 text-fg-muted/70 transition-colors hover:text-fg disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

interface TimeframeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (slot: TimeSlot) => void;
}

export function TimeframeModal({ open, onClose, onConfirm }: TimeframeModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Choose the timeframe"
      description="Prepare your profile for interviews"
      className="px-6 pt-[34px] pb-[35px]"
    >
      <Picker onClose={onClose} onConfirm={onConfirm} />
    </Modal>
  );
}

/** Mounted only while the modal is open, so every opening starts fresh. */
function Picker({ onClose, onConfirm }: Omit<TimeframeModalProps, "open">) {
  const [dayIndex, setDayIndex] = useState(0);
  const [selected, setSelected] = useState<TimeSlot | null>(null);
  const [needSlot, setNeedSlot] = useState(false);
  const day = DAYS[dayIndex];

  const changeDay = (delta: number) => {
    setDayIndex((i) => i + delta);
    setSelected(null);
  };

  return (
    <>
      <div className="mt-[47px] flex items-center justify-center gap-[91px]">
        <button type="button" aria-label="Previous day" disabled={dayIndex === 0} onClick={() => changeDay(-1)} className={ARROW}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div
          key={day.date}
          role="status"
          aria-label={`${day.weekday} ${day.day}`}
          className="flex size-[50px] animate-pop-in flex-col items-center justify-center rounded-full bg-primary text-primary-fg motion-reduce:animate-none"
        >
          <span className="text-[10px] leading-none font-medium">{day.weekday}</span>
          <span className="mt-0.5 text-xl leading-none font-semibold">{day.day}</span>
        </div>
        <button
          type="button"
          aria-label="Next day"
          disabled={dayIndex === DAYS.length - 1}
          onClick={() => changeDay(1)}
          className={ARROW}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div key={day.date} className="mt-[14px] flex min-h-[202px] flex-col items-center">
        {day.slots.length === 0 ? (
          <p className="flex flex-1 animate-fade-in items-center text-sm text-fg-muted">No interview slots on this day.</p>
        ) : (
          <div role="radiogroup" aria-label={`Time slots for ${day.weekday} ${day.day}`} className="flex flex-col gap-2">
            {day.slots.map((slot, index) => {
              const active = selected?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setSelected(slot);
                    setNeedSlot(false);
                  }}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className={cn(
                    "h-[34px] w-32 animate-fade-in-up rounded-md border text-sm transition-colors motion-reduce:animate-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    active
                      ? "border-primary bg-primary font-medium text-primary-fg"
                      : "border-white/[0.04] text-primary-text/75 hover:border-primary/40 hover:text-primary-text",
                  )}
                >
                  {formatTime(slot.time)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Next stays red as in design/06; without a slot it explains instead of acting. */}
      <div className="relative mt-[52px] flex justify-center gap-2">
        {needSlot && (
          <p role="alert" className="absolute inset-x-0 -top-8 animate-fade-in text-center text-xs text-danger">
            Choose a time slot to continue.
          </p>
        )}
        <Button onClick={onClose} className="w-36">
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => (selected ? onConfirm(selected) : setNeedSlot(true))}
          className="w-36"
        >
          Next
        </Button>
      </div>
    </>
  );
}
