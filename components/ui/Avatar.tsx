import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function Avatar({ name, src, size = 20, className }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-sm object-cover", className)}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      style={{ width: size, height: size, fontSize: Math.max(8, Math.round(size * 0.42)) }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm bg-primary font-semibold leading-none text-primary-fg",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
