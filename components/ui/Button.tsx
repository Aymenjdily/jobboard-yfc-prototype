import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "neutral";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary-hover",
  neutral: "bg-btn text-fg hover:bg-btn-hover",
};

/** Shared button look — also used to style `<Link>`s that act as buttons. */
export function buttonClasses(variant: ButtonVariant = "neutral", className?: string) {
  return cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:bg-btn-disabled disabled:text-btn-disabled-fg",
    VARIANTS[variant],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "neutral", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
