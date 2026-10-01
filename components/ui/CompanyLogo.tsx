import Image from "next/image";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

/** 38px company logo; monogram fallback when the company has no logo file. */
export function CompanyLogo({ company, className }: { company: Company; className?: string }) {
  if (!company.logo) {
    return (
      <span
        aria-hidden="true"
        className={cn("flex size-[38px] shrink-0 items-center justify-center rounded-sm bg-surface-2 text-xs font-semibold text-fg", className)}
      >
        {company.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <Image
      src={company.logo}
      alt=""
      width={38}
      height={38}
      className={cn("size-[38px] shrink-0 rounded-sm object-cover", className)}
    />
  );
}
