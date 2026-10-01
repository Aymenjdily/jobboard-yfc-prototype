import Link from "next/link";
import type { OnboardingStep } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS: { step: OnboardingStep; title: string; description: string }[] = [
  { step: 1, title: "Upload CV", description: "Upload your cv" },
  { step: 2, title: "Scanning results", description: "Fill in the necessary information" },
  { step: 3, title: "Criteria", description: "Fill out your criteria" },
];

interface StepListProps {
  current: OnboardingStep;
  /** Highest step the candidate may open. */
  maxReachable: OnboardingStep;
}

export function StepList({ current, maxReachable }: StepListProps) {
  return (
    <nav
      aria-label="Profile steps"
      className="rounded-lg border border-border bg-surface p-4 lg:w-[398px] lg:shrink-0 lg:self-start lg:p-[22px]"
    >
      <ol className="flex justify-between gap-2 lg:flex-col lg:gap-[13px]">
        {STEPS.map(({ step, title, description }) => {
          const active = step === current;
          const reachable = step <= maxReachable;
          const content = (
            <>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-base lg:size-12 lg:text-xl",
                  active ? "bg-primary font-semibold text-primary-fg" : "border border-fg-secondary text-fg-secondary",
                )}
              >
                {step}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span
                  className={cn(
                    "text-sm whitespace-nowrap lg:text-base",
                    active ? "font-semibold text-fg" : "hidden font-medium text-fg-secondary sm:inline",
                  )}
                >
                  {title}
                </span>
                <span className={cn("hidden text-xs lg:block", active ? "text-fg-secondary" : "text-fg-muted")}>
                  {description}
                </span>
              </span>
            </>
          );
          const rowClass = "flex items-center gap-2 rounded-md lg:gap-4";

          return (
            <li key={step} className="min-w-0">
              {reachable && !active ? (
                <Link
                  href={`/reception/profile?step=${step}`}
                  className={cn(rowClass, "transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary")}
                >
                  {content}
                </Link>
              ) : (
                <div aria-current={active ? "step" : undefined} className={rowClass}>
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
