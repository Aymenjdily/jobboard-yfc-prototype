import { INDUSTRY_COLORS } from "@/lib/data/industries";
import type { Industry, TagColor } from "@/lib/types";
import { cn } from "@/lib/utils";

const COLORS: Record<TagColor, string> = {
  blue: "bg-tag-blue-bg text-tag-blue-fg",
  green: "bg-tag-green-bg text-tag-green-fg",
  red: "bg-tag-red-bg text-tag-red-fg",
  amber: "bg-tag-amber-bg text-tag-amber-fg",
};

/** Industry tag — colour comes from the industry, never from position (AGENTS.md §13.9). */
export function Tag({ industry }: { industry: Industry }) {
  return (
    <span className={cn("inline-flex h-[18px] items-center rounded px-1.5 text-xs leading-none", COLORS[INDUSTRY_COLORS[industry]])}>
      {industry}
    </span>
  );
}
