import Image from "next/image";
import Link from "next/link";
import { Bell, MessageCircle, Newspaper, UsersRound, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { CURRENT_USER } from "@/lib/data/people";
import { cn } from "@/lib/utils";
import logo from "@/public/logos/youth-for-challenge-white.png";
import logoMark from "@/public/logos/youth-for-challenge-mark-white.png";
import { NavLinks } from "./NavLinks";

interface NavAction {
  label: string;
  icon: LucideIcon;
  unread?: boolean;
  /** Hidden below `sm` so the nav links fit on phones. */
  desktopOnly?: boolean;
  /** Extra strokes drawn inside the icon (e.g. text lines in the chat bubble). */
  lines?: boolean;
}

const ACTIONS: NavAction[] = [
  { label: "News", icon: Newspaper, unread: true, desktopOnly: true },
  { label: "People", icon: UsersRound, desktopOnly: true },
  { label: "Messages", icon: MessageCircle, desktopOnly: true, lines: true },
  { label: "Notifications", icon: Bell, desktopOnly: true },
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-40 h-[53px] shrink-0 border-b border-divider bg-nav">
      <nav aria-label="Main" className="flex h-full items-center gap-5 px-4 sm:gap-7 sm:px-8">
        <Link
          href="/reception"
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image src={logo} alt="Youth for Challenge" priority className="hidden h-8 w-auto sm:block" />
          <Image src={logoMark} alt="Youth for Challenge" priority className="h-7 w-auto sm:hidden" />
        </Link>

        <div className="-mb-px h-full min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
          <NavLinks />
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          {ACTIONS.map(({ label, icon: Icon, unread, desktopOnly, lines }) => (
            <button
              key={label}
              type="button"
              aria-label={unread ? `${label} (unread)` : label}
              className={cn(
                "relative text-fg-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:text-fg focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
                desktopOnly && "hidden sm:block",
              )}
            >
              <Icon size={20} strokeWidth={1.75} aria-hidden="true">
                {lines && (
                  <>
                    <path d="M8.5 10h7" />
                    <path d="M8.5 14h4" />
                  </>
                )}
              </Icon>
              {unread && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 size-2 rounded-full bg-notification"
                />
              )}
            </button>
          ))}
          <Avatar name={CURRENT_USER.name} src={CURRENT_USER.avatar || undefined} size={20} />
        </div>
      </nav>
    </header>
  );
}
