"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { MAX_CRITERIA } from "@/lib/data/regions";
import type {
  AppState,
  CandidateProfile,
  Industry,
  Note,
  OnboardingStep,
  ScheduledInterview,
} from "@/lib/types";

const STORAGE_KEY = "yfc-state-v1";

const EMPTY_PROFILE: CandidateProfile = {
  cvFileName: null,
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  regions: [],
  industries: [],
};

export const INITIAL_STATE: AppState = {
  onboardingStep: 1,
  profileComplete: false,
  profile: EMPTY_PROFILE,
  reservedConferenceIds: [],
  schedule: [],
  notes: [],
};

export type Action =
  | { type: "hydrate"; state: AppState }
  | { type: "setStep"; step: OnboardingStep }
  | { type: "updateProfile"; profile: Partial<CandidateProfile> }
  | { type: "setRegions"; regions: string[] }
  | { type: "setIndustries"; industries: Industry[] }
  | { type: "completeProfile" }
  | { type: "toggleConference"; id: string }
  | { type: "addSchedule"; interview: ScheduledInterview }
  | { type: "addNote"; note: Note }
  | { type: "reset" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setStep":
      return { ...state, onboardingStep: action.step };
    case "updateProfile":
      return { ...state, profile: { ...state.profile, ...action.profile } };
    case "setRegions":
      return {
        ...state,
        profile: { ...state.profile, regions: action.regions.slice(0, MAX_CRITERIA) },
      };
    case "setIndustries":
      return {
        ...state,
        profile: { ...state.profile, industries: action.industries.slice(0, MAX_CRITERIA) },
      };
    case "completeProfile":
      return { ...state, profileComplete: true };
    case "toggleConference": {
      const reserved = state.reservedConferenceIds.includes(action.id);
      return {
        ...state,
        reservedConferenceIds: reserved
          ? state.reservedConferenceIds.filter((id) => id !== action.id)
          : [...state.reservedConferenceIds, action.id],
      };
    }
    case "addSchedule":
      return { ...state, schedule: [...state.schedule, action.interview] };
    case "addNote":
      return { ...state, notes: [...state.notes, action.note] };
    case "reset":
      return INITIAL_STATE;
  }
}

function readStoredState(): AppState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...INITIAL_STATE,
      ...parsed,
      profile: { ...EMPTY_PROFILE, ...parsed.profile },
    };
  } catch {
    return null;
  }
}

interface StoreValue {
  state: AppState;
  dispatch: Dispatch<Action>;
  /** False until localStorage has been read; render defaults until then. */
  hydrated: boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

interface InternalState {
  app: AppState;
  hydrated: boolean;
}

function internalReducer(state: InternalState, action: Action): InternalState {
  if (action.type === "hydrate") return { app: action.state, hydrated: true };
  return { ...state, app: reducer(state.app, action) };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [{ app, hydrated }, dispatch] = useReducer(internalReducer, {
    app: INITIAL_STATE,
    hydrated: false,
  });

  // Read persisted state after mount to avoid hydration mismatches.
  useEffect(() => {
    dispatch({ type: "hydrate", state: readStoredState() ?? INITIAL_STATE });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
    } catch {
      // Storage unavailable (private mode / quota) — state stays in memory.
    }
  }, [app, hydrated]);

  return (
    <StoreContext.Provider value={{ state: app, dispatch, hydrated }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useAppStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useAppStore must be used inside <StoreProvider>");
  return value;
}
