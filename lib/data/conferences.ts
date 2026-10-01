import type { Conference, Person } from "@/lib/types";
import { RECRUITERS } from "./people";

// Speaker photos: Pexels 10816007 (Adil) and 32064778 (Yassine), cropped to 256px.
const ADIL: Person = { id: "adil-mansour", name: "Adil Mansour", avatar: "/avatars/adil-mansour.jpg" };
const YASSINE: Person = { id: "yassine-berrada", name: "Yassine Berrada", avatar: "/avatars/yassine-berrada.jpg" };

/** First two cards mirror design/04; the rest vary the placeholder titles so the grid reads as real content. */
export const CONFERENCES: Conference[] = [
  { id: "ai-job-applications", title: "How to use AI in job applications", speaker: ADIL, banner: "spotlight" },
  { id: "recruitment-workshop", title: "Recruitment Workshop", speaker: YASSINE, banner: "workshop" },
  { id: "first-interview", title: "Acing your first interview", speaker: RECRUITERS.lina, banner: "spotlight" },
  { id: "cv-recruiters-read", title: "Writing a CV recruiters actually read", speaker: ADIL, banner: "spotlight" },
  { id: "negotiating-offer", title: "Negotiating your first job offer", speaker: YASSINE, banner: "spotlight" },
  { id: "virtual-job-fair", title: "Standing out at a virtual job fair", speaker: RECRUITERS.lina, banner: "spotlight" },
];
