import type { SVGProps } from "react";

// Custom icons for the Reception landing cards — no lucide equivalent matches the reference.
// Same conventions as lucide: 24×24 viewBox, currentColor stroke.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Framed portrait between two rules — "Upload your CV". */
export function ProfileFrameIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3h11" />
      <path d="M6.5 21h11" />
      <rect x="3.5" y="6" width="17" height="12" rx="1" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M7.5 18a4.5 3.25 0 0 1 9 0" />
    </Svg>
  );
}

/** Head profile with a cog — "Set preferences". */
export function HeadCogIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 21v-3.2C5.6 16.4 4 13.9 4 11a8 8 0 0 1 15.2-3.5l.6 1.4 1.4 2.8a.6.6 0 0 1-.5.9H19v2.6a2 2 0 0 1-2 2h-2v3.8" />
      <circle cx="11.5" cy="10.5" r="1.4" />
      <path d="M11.5 7.6v.9M11.5 12.5v.9M8.6 10.5h.9M13.5 10.5h.9M9.45 8.45l.64.64M12.91 11.91l.64.64M9.45 12.55l.64-.64M12.91 9.09l.64-.64" />
    </Svg>
  );
}

/** Cast screen with a graduation cap — "Attend workshops". */
export function CastCapIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
      <path d="M3 12a8 8 0 0 1 8 8" />
      <path d="M3 16a4 4 0 0 1 4 4" />
      <path d="M3 20h.01" />
      <path d="m12.5 9.25 3.5-1.75 3.5 1.75L16 11z" />
      <path d="M14 10.25v1.9c0 .5.9 1.1 2 1.1s2-.6 2-1.1v-1.9" />
    </Svg>
  );
}
