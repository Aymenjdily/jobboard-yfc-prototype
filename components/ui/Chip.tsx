import { X } from "lucide-react";

interface ChipProps {
  label: string;
  onRemove: () => void;
}

/** Selected value with a remove button (Criteria chips, skills). */
export function Chip({ label, onRemove }: ChipProps) {
  return (
    <span className="inline-flex h-[31px] animate-fade-in-up items-center gap-2 rounded-md border border-primary/70 bg-chip-bg pr-1 pl-3 text-sm text-primary-text motion-reduce:animate-none">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="rounded-sm p-0.5 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <X size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </span>
  );
}
