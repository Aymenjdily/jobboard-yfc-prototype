export type Industry =
  | "Banking"
  | "Audit"
  | "Finance"
  | "Consulting"
  | "Fintech"
  | "Marketing"
  | "Technology"
  | "Telecom";

export type TagColor = "blue" | "green" | "red" | "amber";

export interface Person {
  id: string;
  name: string;
  avatar: string;
  /** Wide "webcam" photo for the interview video tile (falls back to the avatar). */
  video?: string;
  role?: "interviewer" | "interviewee";
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  tags: Industry[];
}

/** A lounge table: the candidate sits at the top, the company's interviewer at the bottom. */
export interface Table {
  id: string;
  interviewer: Person | null;
  candidate: Person | null;
}

export interface InterviewRoom {
  id: string;
  companyId: string;
  tables: Table[];
  waitingCount: number;
  /** People in the room's call (participants pill). */
  participantCount: number;
}

export interface TimeSlot {
  id: string;
  /** ISO date, e.g. "2026-10-05" */
  date: string;
  /** 24h time, e.g. "13:00" */
  time: string;
}

export interface ScheduledInterview {
  id: string;
  companyId: string;
  /** Set when the candidate reserved a specific slot in the timeframe modal. */
  slot?: TimeSlot;
  /** Mock queue estimate ("Will start approximately in N minutes"). */
  etaMinutes?: number;
  candidatesAhead: number;
  aheadAvatars: string[];
}

/** "spotlight" = red lineup banner, "workshop" = typographic workshop banner (both in design/04). */
export type ConferenceBanner = "spotlight" | "workshop";

export interface Conference {
  id: string;
  title: string;
  speaker: Person;
  banner: ConferenceBanner;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | null;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface CandidateProfile {
  cvFileName: string | null;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  /** Max 3, from lib/data/regions.ts */
  regions: string[];
  /** Max 3 */
  industries: Industry[];
}

/** What /api/cv/parse extracts from an uploaded CV. */
export type ParsedCv = Pick<
  CandidateProfile,
  "fullName" | "title" | "email" | "phone" | "location" | "summary" | "experiences" | "education" | "skills"
>;

export interface Note {
  id: string;
  roomId: string;
  text: string;
  createdAt: string;
}

export type OnboardingStep = 1 | 2 | 3;

export interface AppState {
  onboardingStep: OnboardingStep;
  profileComplete: boolean;
  profile: CandidateProfile;
  reservedConferenceIds: string[];
  schedule: ScheduledInterview[];
  notes: Note[];
}
