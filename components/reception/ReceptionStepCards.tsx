"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { CastCapIcon, HeadCogIcon, ProfileFrameIcon } from "@/components/icons/ReceptionIcons";
import { buttonClasses } from "@/components/ui/Button";
import { useAppStore } from "@/lib/store";

interface StepCard {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  /** Locked until the candidate finishes their profile. */
  requiresProfile: boolean;
}

const CARDS: StepCard[] = [
  {
    title: "Upload your CV",
    description: "First step description",
    action: "Start",
    href: "/reception/profile?step=1",
    icon: ProfileFrameIcon,
    requiresProfile: false,
  },
  {
    title: "Set preferences",
    description: "First step description",
    action: "Set preferences",
    href: "/reception/profile?step=3",
    icon: HeadCogIcon,
    requiresProfile: true,
  },
  {
    title: "Attend workshops",
    description: "First step description",
    action: "Go to workshops",
    href: "/conferences",
    icon: CastCapIcon,
    requiresProfile: true,
  },
];

export function ReceptionStepCards() {
  const { state } = useAppStore();

  return (
    <ul className="grid w-full max-w-[993px] grid-cols-1 gap-3 sm:grid-cols-3">
      {CARDS.map(({ title, description, action, href, icon: Icon, requiresProfile }) => {
        const enabled = !requiresProfile || state.profileComplete;
        return (
          <li
            key={title}
            className="flex flex-col items-center rounded-lg border border-border bg-surface px-[22px] pt-12 pb-[22px] text-center sm:h-[300px]"
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-surface-3 text-fg">
              <Icon size={40} />
            </span>
            <h2 className="mt-5 text-base font-semibold text-fg">{title}</h2>
            <p className="mt-2 text-base text-fg-secondary">{description}</p>
            {enabled ? (
              <Link href={href} className={buttonClasses("neutral", "mt-7 w-full")}>
                {action}
              </Link>
            ) : (
              <button type="button" disabled className={buttonClasses("neutral", "mt-7 w-full")}>
                {action}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
