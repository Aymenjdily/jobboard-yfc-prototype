import type { InterviewRoom, Person, Table } from "@/lib/types";
import { CANDIDATES as C, RECRUITERS as R } from "./people";

const table = (id: string, interviewer: Person | null, candidate: Person | null): Table => ({ id, interviewer, candidate });

const room = (id: string, tables: Table[], waitingCount = 12): InterviewRoom => ({
  id,
  companyId: id,
  tables,
  waitingCount,
  participantCount: 5,
});

// Mirrors design/05: only Bank of Africa has a free (candidate) seat right now.
export const ROOMS: InterviewRoom[] = [
  room("bank-of-africa", [table("t1", R.lina, null), table("t2", R.youssef, C.omar)]),
  room("deloitte", [table("t1", R.nadia, C.hamza)], 4),
  room("apple", [table("t1", R.karim, C.ines), table("t2", R.leila, C.adam)]),
  room("dell", [table("t1", R.mehdi, C.rania), table("t2", R.sara, C.ilyas)]),
  room("microsoft", [table("t1", R.amine, C.yasmine), table("t2", R.nadia, C.omar), table("t3", R.youssef, C.salma)]),
  room("salesforce", [table("t1", R.leila, C.hamza), table("t2", R.karim, C.rania)]),
  room("canon", [table("t1", R.sara, C.adam), table("t2", R.mehdi, C.ines)]),
  room("ent", [table("t1", R.youssef, C.ilyas), table("t2", R.amine, C.yasmine)]),
  room("deloitte-digital", [table("t1", R.nadia, C.salma), table("t2", R.leila, C.omar)]),
];

export function getRoom(id: string): InterviewRoom | undefined {
  return ROOMS.find((r) => r.id === id);
}

export function hasFreeSeat(r: InterviewRoom): boolean {
  return r.tables.some((t) => !t.interviewer || !t.candidate);
}

/** The recruiter the candidate meets: the one at the free table, else the first table's. */
export function getInterviewer(r: InterviewRoom): Person | null {
  const free = r.tables.find((t) => !t.candidate && t.interviewer);
  return free?.interviewer ?? r.tables[0]?.interviewer ?? null;
}
