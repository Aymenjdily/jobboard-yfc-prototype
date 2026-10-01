"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button, buttonClasses } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";
import type { OnboardingStep } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CriteriaPanel, isCriteriaValid } from "./CriteriaPanel";
import { isResultsValid, ScanResultsPanel } from "./ScanResultsPanel";
import { StepList } from "./StepList";
import { UploadCvPanel } from "./UploadCvPanel";

export function ProfileWizard({ step }: { step: OnboardingStep }) {
  const router = useRouter();
  const { state, dispatch, hydrated } = useAppStore();
  const [scanning, setScanning] = useState(false);

  const hasCv = state.profile.cvFileName !== null;
  const resultsValid = isResultsValid(state.profile);
  const maxReachable: OnboardingStep = !hasCv || scanning ? 1 : resultsValid ? 3 : 2;

  // Deep links to a step the candidate hasn't unlocked go back to the furthest allowed one.
  useEffect(() => {
    if (hydrated && step > maxReachable && !scanning) {
      router.replace(`/reception/profile?step=${maxReachable}`);
    }
  }, [hydrated, step, maxReachable, scanning, router]);

  useEffect(() => {
    if (hydrated && step > state.onboardingStep) dispatch({ type: "setStep", step });
  }, [hydrated, step, state.onboardingStep, dispatch]);

  const goTo = (next: OnboardingStep) => router.push(`/reception/profile?step=${next}`);
  const canContinue = step === 1 ? hasCv && !scanning : step === 2 ? resultsValid : false;
  const canStart = hydrated && hasCv && resultsValid && isCriteriaValid(state.profile);

  function start() {
    dispatch({ type: "completeProfile" });
    router.push("/lounge");
  }

  return (
    <main className="flex flex-1 flex-col gap-[23px] px-4 pt-6 pb-6 sm:px-6">
      <PageHeader
        title="Reception"
        subtitle="Prepare your profile for interviews"
        actions={
          <>
            <Link href="/reception" className={buttonClasses("neutral", "w-full sm:w-36")}>
              Cancel
            </Link>
            {step < 3 ? (
              <Button
                variant="primary"
                disabled={!canContinue}
                onClick={() => goTo((step + 1) as OnboardingStep)}
                className="w-full sm:w-36"
              >
                Next
              </Button>
            ) : (
              <Button variant="primary" disabled={!canStart} onClick={start} className="w-full sm:w-36">
                Start
              </Button>
            )}
          </>
        }
      />

      <div className="flex flex-1 flex-col gap-5 lg:flex-row">
        <StepList current={step} maxReachable={maxReachable} />

        <section
          aria-label="Step content"
          className={cn(
            "flex min-w-0 flex-1 flex-col rounded-lg border border-border bg-surface p-4 lg:p-[22px]",
            step === 3 && "lg:self-start", // design/03: the Criteria panel hugs its content
          )}
        >
          {step === 1 && <UploadCvPanel onScanningChange={setScanning} />}
          {step === 2 && hydrated && hasCv && <ScanResultsPanel />}
          {step === 3 && hydrated && <CriteriaPanel />}
        </section>
      </div>
    </main>
  );
}
