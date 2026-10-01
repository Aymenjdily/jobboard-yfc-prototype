import type { ScheduledInterview } from "@/lib/types";
import { QUEUE_AVATARS } from "./people";

/** Interviews already in the candidate's queue (design/05 "My schedule"). */
export const SEED_SCHEDULE: ScheduledInterview[] = [
  { id: "seed-boa", companyId: "bank-of-africa", etaMinutes: 45, candidatesAhead: 3, aheadAvatars: QUEUE_AVATARS },
  { id: "seed-deloitte", companyId: "deloitte", etaMinutes: 60, candidatesAhead: 3, aheadAvatars: QUEUE_AVATARS },
];
