"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CAPTIONS = [
  "Reading your document",
  "Finding your experience",
  "Picking out your skills",
  "Checking your contact details",
  "Almost there",
];

function Sparkle({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="sparkle-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE7A8" />
          <stop offset="1" stopColor="#F5A63A" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sparkle-gold)"
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
      />
    </svg>
  );
}

/** Rotating progress caption; the last one stays put while we keep waiting. */
function Caption() {
  const [index, setIndex] = useState(0);
  const last = index === CAPTIONS.length - 1;

  useEffect(() => {
    if (last) return;
    const id = window.setTimeout(() => setIndex((i) => i + 1), 1800);
    return () => window.clearTimeout(id);
  }, [index, last]);

  return (
    <p
      key={index}
      className={cn(
        "absolute top-full left-1/2 mt-3 -translate-x-1/2 text-center text-sm whitespace-nowrap text-fg-secondary motion-reduce:animate-none",
        last ? "animate-fade-in" : "animate-caption",
      )}
    >
      {CAPTIONS[index]}…
    </p>
  );
}

/** Dimmed layer over the CV preview while it is being scanned (design/02). */
export function ScanningOverlay() {
  return (
    <div role="status" aria-live="polite" className="absolute inset-0 animate-fade-in overflow-hidden bg-bg/65">
      {/* Sweeping beam: a soft trail ending in a glowing line. */}
      <div aria-hidden="true" className="absolute inset-0 animate-scan-beam motion-reduce:hidden">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-primary/25" />
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-text shadow-[0_0_16px_4px] shadow-primary/70" />
      </div>

      {/* Ambient glints around the frame. */}
      <Sparkle size={10} className="absolute top-[18%] left-[22%] animate-twinkle [animation-delay:300ms] motion-reduce:animate-none" />
      <Sparkle size={12} className="absolute top-[34%] right-[18%] animate-twinkle [animation-delay:900ms] motion-reduce:animate-none" />
      <Sparkle size={8} className="absolute bottom-[22%] left-[30%] animate-twinkle [animation-delay:1500ms] motion-reduce:animate-none" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <Sparkle
            size={16}
            className="absolute bottom-[calc(100%+78px)] left-[calc(50%-8px)] animate-twinkle motion-reduce:animate-none"
          />
          <Sparkle
            size={26}
            className="absolute bottom-[calc(100%+38px)] left-[calc(50%-4px)] animate-twinkle [animation-delay:600ms] motion-reduce:animate-none"
          />
          <p
            className={cn(
              "text-2xl font-semibold text-white",
              "animate-shimmer bg-[linear-gradient(110deg,white_40%,var(--color-primary-text)_50%,white_60%)] bg-[length:200%_100%] bg-clip-text text-transparent",
              "motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-white",
            )}
          >
            Scanning the document
          </p>
          <Caption />
        </div>
      </div>
    </div>
  );
}

/** Brief confirmation shown when the scan succeeds, then fades away. */
export function ScanSuccessOverlay({ leaving }: { leaving: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg/65",
        leaving ? "animate-fade-out" : "animate-fade-in",
      )}
    >
      <span className="flex size-16 animate-pop-in items-center justify-center rounded-full bg-live text-bg shadow-[0_0_32px_4px] shadow-live/40 motion-reduce:animate-none">
        <Check size={34} strokeWidth={3} aria-hidden="true" />
      </span>
      <p className="animate-fade-in-up text-2xl font-semibold text-white [animation-delay:150ms] motion-reduce:animate-none">
        CV scanned
      </p>
    </div>
  );
}
