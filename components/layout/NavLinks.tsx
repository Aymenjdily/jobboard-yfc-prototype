"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/reception", label: "Reception" },
  { href: "/conferences", label: "Conferences" },
  { href: "/lounge", label: "Lounge" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex h-full items-stretch gap-5 sm:gap-8">
      {LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href} className="relative flex">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:text-fg focus-visible:underline",
                active ? "text-fg" : "text-fg-muted hover:text-fg-secondary",
              )}
            >
              {label}
            </Link>
            {active && (
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] rounded-t-sm bg-fg" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
