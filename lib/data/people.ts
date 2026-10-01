import type { Person } from "@/lib/types";

/** The signed-in candidate (mock). Photo: Unsplash ZOPIJ2m7cPY (also the interviewee video tile). */
export const CURRENT_USER: Person = {
  id: "khalil-el-kabiri",
  name: "Khalil El Kabiri",
  avatar: "/avatars/khalil-el-kabiri.jpg",
  video: "/video/khalil-el-kabiri.jpg",
  role: "interviewee",
};

/** Portrait-format photo for the candidate's shared resume. */
export const CURRENT_USER_PORTRAIT = "/avatars/khalil-el-kabiri-portrait.jpg";

// Portraits: 128×128 mock photos (randomuser.me / UI Faces "authorized" set), stored locally.
const person = (id: string, name: string, role: Person["role"]): Person => ({
  id,
  name,
  avatar: `/avatars/${id}.jpg`,
  role,
});

export const RECRUITERS = {
  // Photo: Pexels 8101312 (avatar + video tile cropped from the same photo).
  lina: { ...person("lina-chen", "Lina Chen", "interviewer"), video: "/video/lina-chen.jpg" },
  youssef: person("youssef-amrani", "Youssef Amrani", "interviewer"),
  nadia: person("nadia-el-idrissi", "Nadia El Idrissi", "interviewer"),
  karim: person("karim-benjelloun", "Karim Benjelloun", "interviewer"),
  leila: person("leila-haddad", "Leila Haddad", "interviewer"),
  mehdi: person("mehdi-alaoui", "Mehdi Alaoui", "interviewer"),
  sara: person("sara-lahlou", "Sara Lahlou", "interviewer"),
  amine: person("amine-chraibi", "Amine Chraibi", "interviewer"),
};

export const CANDIDATES = {
  salma: person("salma-bennani", "Salma Bennani", "interviewee"),
  omar: person("omar-tazi", "Omar Tazi", "interviewee"),
  ines: person("ines-berrada", "Ines Berrada", "interviewee"),
  hamza: person("hamza-ouazzani", "Hamza Ouazzani", "interviewee"),
  rania: person("rania-fassi", "Rania Fassi", "interviewee"),
  adam: person("adam-kettani", "Adam Kettani", "interviewee"),
  yasmine: person("yasmine-sabri", "Yasmine Sabri", "interviewee"),
  ilyas: person("ilyas-mansouri", "Ilyas Mansouri", "interviewee"),
};

/** Small round faces used for "N candidates ahead of you". */
export const QUEUE_AVATARS = [CANDIDATES.hamza.avatar, CANDIDATES.ines.avatar, CANDIDATES.adam.avatar];
