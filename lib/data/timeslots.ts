import type { TimeSlot } from "@/lib/types";

/** Fixed mock start (a Monday) so dates render the same on server and client. */
export const SLOT_START_DATE = "2026-10-05";
export const SLOT_DAYS = 7;
const TIMES = ["13:00", "14:00", "15:00", "16:00", "17:00"];

export interface SlotDay {
  date: string;
  weekday: string;
  day: number;
  slots: TimeSlot[];
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** Weekdays have 1–5pm slots; weekends have none. */
export function getSlotDays(): SlotDay[] {
  return Array.from({ length: SLOT_DAYS }, (_, i) => {
    const d = addDays(SLOT_START_DATE, i);
    const date = d.toISOString().slice(0, 10);
    const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
    return {
      date,
      weekday: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).toUpperCase(),
      day: d.getUTCDate(),
      slots: weekend ? [] : TIMES.map((time) => ({ id: `${date}-${time}`, date, time })),
    };
  });
}

/** "13:00" → "1:00pm" (design format). */
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
}

/** "2026-10-05" → "Mon, Oct 5". */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
