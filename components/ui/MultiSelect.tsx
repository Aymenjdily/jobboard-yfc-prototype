"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Chip } from "./Chip";

interface MultiSelectProps<T extends string> {
  label: string;
  placeholder: string;
  options: readonly T[];
  value: T[];
  onChange: (value: T[]) => void;
  max: number;
}

/** Searchable multi-select (ARIA combobox + listbox) with removable chips underneath. */
export function MultiSelect<T extends string>({ label, placeholder, options, value, onChange, max }: MultiSelectProps<T>) {
  const id = useId();
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const full = value.length >= max;
  const filtered = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));

  // Close when clicking anywhere outside the field.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function toggle(option: T) {
    if (value.includes(option)) onChange(value.filter((v) => v !== option));
    else if (!full) onChange([...value, option]);
    setQuery("");
  }

  function openList() {
    setOpen(true);
    setActive(0);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (open && filtered[active]) {
          event.preventDefault();
          toggle(filtered[active]);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Backspace":
        if (!query && value.length) onChange(value.slice(0, -1));
        break;
    }
  }

  return (
    <div ref={rootRef} className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>

      <div className="relative mt-[3px]">
        <input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && filtered[active] ? `${id}-opt-${active}` : undefined}
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={openList}
          onClick={() => !open && openList()}
          onKeyDown={onKeyDown}
          className="h-[54px] w-full rounded-md border border-border bg-surface pr-12 pl-4 text-sm text-fg transition-colors placeholder:text-fg-secondary focus:border-primary focus:outline-none"
        />
        <ChevronDown
          size={22}
          strokeWidth={1.5}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-multiselectable="true"
            aria-label={label}
            className="absolute inset-x-0 top-full z-20 mt-1 max-h-64 animate-fade-in overflow-auto rounded-md border border-border bg-surface-raised py-1 shadow-xl shadow-black/40 motion-reduce:animate-none"
          >
            {full && (
              <li role="presentation" className="px-4 py-2 text-xs text-fg-muted">
                You can choose up to {max}. Remove one to pick another.
              </li>
            )}
            {filtered.length === 0 && (
              <li role="presentation" className="px-4 py-3 text-sm text-fg-muted">
                No matches for &ldquo;{query}&rdquo;
              </li>
            )}
            {filtered.map((option, index) => {
              const selected = value.includes(option);
              const disabled = full && !selected;
              return (
                <li
                  key={option}
                  id={`${id}-opt-${index}`}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={disabled}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => !disabled && toggle(option)}
                  onPointerMove={() => setActive(index)}
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-between gap-3 px-4 text-sm",
                    selected ? "text-primary-text" : "text-fg",
                    index === active && !disabled && "bg-surface-2",
                    disabled && "cursor-not-allowed opacity-40",
                  )}
                >
                  {option}
                  {selected && <Check size={16} aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {value.length > 0 && (
        <div className="mt-[17px] flex flex-wrap gap-2">
          {value.map((option) => (
            <Chip
              key={option}
              label={option}
              onRemove={() => onChange(value.filter((v) => v !== option))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
