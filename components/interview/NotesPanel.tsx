"use client";

import { SendHorizontal, Smile, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function timeLabel(iso: string) {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "Now";
  if (minutes < 60) return `${minutes} min ago`;
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface NotesPanelProps {
  roomId: string;
  onClose: () => void;
  className?: string;
}

/** Private notes for this interview (design/08). Saved per room in the local store. */
export function NotesPanel({ roomId, onClose, className }: NotesPanelProps) {
  const { state, dispatch } = useAppStore();
  const notes = state.notes.filter((note) => note.roomId === roomId);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Esc closes the panel wherever focus is (e.g. after the send button disables itself).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Keep the newest note in view.
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ block: "end" });
  }, [notes.length]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    dispatch({ type: "addNote", note: { id: crypto.randomUUID(), roomId, text, createdAt: new Date().toISOString() } });
    setDraft("");
    inputRef.current?.focus();
  }

  return (
    <section
      id="notes-panel"
      role="dialog"
      aria-label="Notes"
      className={cn(
        "flex animate-fade-in-up flex-col rounded-[14px] border border-border bg-surface shadow-2xl shadow-black/50 motion-reduce:animate-none",
        className,
      )}
    >
      <header className="flex items-center justify-between px-[23px] pt-[22px]">
        <h2 className="text-lg font-semibold text-fg">Notes</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notes"
          className="rounded-md p-1 text-fg transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-end overflow-y-auto px-[23px] py-4">
        {notes.length === 0 ? (
          <p className="m-auto max-w-[240px] text-center text-sm text-fg-muted">
            No notes yet. Jot down anything you want to remember from this interview.
          </p>
        ) : (
          <ol ref={listRef} aria-live="polite" className="flex flex-col gap-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="animate-fade-in-up rounded-lg border border-white/[0.04] bg-surface-2 px-3 pt-3 pb-2.5 motion-reduce:animate-none"
              >
                <p className="text-sm leading-snug break-words whitespace-pre-wrap text-fg">{note.text}</p>
                <p className="mt-3 text-[11px] text-fg-muted">{timeLabel(note.createdAt)}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      <form onSubmit={submit} className="mx-[23px] mb-[23px] flex h-[53px] items-center gap-1 rounded-lg bg-input-alt pr-2 pl-4">
        <label htmlFor="note-input" className="sr-only">
          Write a note
        </label>
        <input
          ref={inputRef}
          id="note-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Send a message to everyone"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-muted focus:outline-none"
        />
        <button
          type="button"
          aria-label="Emoji (not available in this demo)"
          title="Emoji (not available in this demo)"
          className="rounded-md p-1.5 text-fg-secondary transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Smile size={20} aria-hidden="true" />
        </button>
        <button
          type="submit"
          aria-label="Add note"
          disabled={!draft.trim()}
          className="rounded-md p-1.5 text-fg-secondary transition-colors hover:text-fg disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <SendHorizontal size={20} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
