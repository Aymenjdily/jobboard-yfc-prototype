"use client";

import { MultiSelect } from "@/components/ui/MultiSelect";
import { INDUSTRIES } from "@/lib/data/industries";
import { MAX_CRITERIA, REGIONS } from "@/lib/data/regions";
import { useAppStore } from "@/lib/store";
import type { CandidateProfile } from "@/lib/types";

export function isCriteriaValid(profile: CandidateProfile) {
  return profile.regions.length > 0 && profile.industries.length > 0;
}

export function CriteriaPanel() {
  const { state, dispatch } = useAppStore();
  const { regions, industries } = state.profile;

  return (
    <div className="animate-fade-in-up motion-reduce:animate-none">
      <h2 className="text-xl font-semibold text-fg">Criteria</h2>
      <div className="mt-[22px] flex flex-col gap-[23px]">
        <MultiSelect
          label="Regions"
          placeholder={`Choose up to ${MAX_CRITERIA} regions`}
          options={REGIONS}
          value={regions}
          onChange={(next) => dispatch({ type: "setRegions", regions: next })}
          max={MAX_CRITERIA}
        />
        <MultiSelect
          label="Industry"
          placeholder={`Choose up to ${MAX_CRITERIA} industries`}
          options={INDUSTRIES}
          value={industries}
          onChange={(next) => dispatch({ type: "setIndustries", industries: next })}
          max={MAX_CRITERIA}
        />
      </div>
    </div>
  );
}
