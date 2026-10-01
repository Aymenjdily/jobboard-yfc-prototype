import type { Industry, TagColor } from "@/lib/types";

export const INDUSTRIES: Industry[] = [
  "Banking",
  "Audit",
  "Finance",
  "Consulting",
  "Fintech",
  "Marketing",
  "Technology",
  "Telecom",
];

export const INDUSTRY_COLORS: Record<Industry, TagColor> = {
  Banking: "blue",
  Audit: "green",
  Finance: "red",
  Consulting: "amber",
  Fintech: "amber",
  Marketing: "amber",
  Technology: "amber",
  Telecom: "amber",
};
