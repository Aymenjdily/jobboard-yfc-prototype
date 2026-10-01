"use client";

import { CircleCheck, CircleAlert, Upload } from "lucide-react";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { Button } from "@/components/ui/Button";
import { CV_ACCEPT, validateCvFile } from "@/lib/cv-upload";
import { useAppStore } from "@/lib/store";
import type { ParsedCv } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScanningOverlay, ScanSuccessOverlay } from "./ScanningOverlay";

type Status = "idle" | "scanning" | "success" | "done" | "error";

/** How long the "CV scanned" confirmation stays before fading out. */
const SUCCESS_HOLD_MS = 1100;
const SUCCESS_FADE_MS = 350;

interface Preview {
  file: File;
  url: string;
}

interface UploadCvPanelProps {
  onScanningChange: (scanning: boolean) => void;
}

export function UploadCvPanel({ onScanningChange }: UploadCvPanelProps) {
  const { state, dispatch } = useAppStore();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const urlRef = useRef<string | null>(null);
  const timersRef = useRef<number[]>([]);

  function clearTimers() {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }

  // Cancel any in-flight scan and free the preview when leaving the step.
  useEffect(
    () => () => {
      abortRef.current?.abort();
      clearTimers();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  async function scan(file: File) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    clearTimers();
    setLeaving(false);

    setStatus("scanning");
    setError(null);
    onScanningChange(true);

    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/cv/parse", { method: "POST", body, signal: controller.signal });
      const data = (await res.json().catch(() => null)) as { cv?: ParsedCv; error?: string } | null;
      if (!res.ok || !data?.cv) throw new Error(data?.error ?? "We couldn't scan your CV right now. Please try again.");

      dispatch({ type: "updateProfile", profile: { ...data.cv, cvFileName: file.name } });
      setStatus("success");
      timersRef.current.push(
        window.setTimeout(() => setLeaving(true), SUCCESS_HOLD_MS),
        window.setTimeout(() => {
          setStatus("done");
          setLeaving(false);
        }, SUCCESS_HOLD_MS + SUCCESS_FADE_MS),
      );
    } catch (err) {
      if (controller.signal.aborted) return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      if (!controller.signal.aborted) onScanningChange(false);
    }
  }

  function selectFile(file: File | undefined) {
    if (!file) return;
    const invalid = validateCvFile(file);
    if (invalid) {
      setError(invalid);
      if (!preview) setStatus("idle");
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;
    setPreview({ file, url });
    void scan(file);
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={CV_ACCEPT}
      className="sr-only"
      tabIndex={-1}
      aria-hidden="true"
      onChange={(event) => {
        selectFile(event.target.files?.[0]);
        event.target.value = "";
      }}
    />
  );

  // No file picked in this visit.
  if (!preview) {
    const scannedBefore = state.profile.cvFileName;
    return (
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={onDrop}
        className={cn(
          "flex min-h-[420px] flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed px-6 py-12 text-center transition-colors",
          dragging ? "border-primary bg-primary-soft" : "border-fg-muted/60",
        )}
      >
        {fileInput}
        <span
          className={cn(
            "flex size-20 items-center justify-center rounded-full bg-surface-3 text-fg transition-colors",
            dragging && "animate-float bg-primary-soft text-primary-text motion-reduce:animate-none",
          )}
        >
          {scannedBefore ? <CircleCheck size={36} strokeWidth={1.5} /> : <Upload size={32} strokeWidth={1.5} />}
        </span>
        {scannedBefore ? (
          <div>
            <p className="text-base font-semibold text-fg">{scannedBefore}</p>
            <p className="mt-2 text-sm text-fg-secondary">
              Your CV has been scanned. Continue to review the results, or upload a different file.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-base font-semibold text-fg">Drag and drop your CV here</p>
            <p className="mt-2 text-sm text-fg-secondary">PDF, PNG or JPG, up to 5 MB</p>
          </div>
        )}
        <Button onClick={openPicker} className="w-full max-w-[277px]">
          {scannedBefore ? "Upload another CV" : "Browse files"}
        </Button>
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }

  const isPdf = preview.file.type === "application/pdf";

  return (
    <div className="relative flex h-[70vh] min-h-[480px] overflow-hidden rounded-xl border border-dashed border-fg-muted/60 lg:h-[760px]">
      {fileInput}
      {isPdf ? (
        <iframe
          src={`${preview.url}#toolbar=0&navpanes=0&view=FitH`}
          title={`Preview of ${preview.file.name}`}
          className="h-full w-full flex-1 bg-white"
        />
      ) : (
        <div className="flex-1 overflow-auto bg-white">
          {/* Blob URLs can't go through next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview.url} alt={`Preview of ${preview.file.name}`} className="w-full" />
        </div>
      )}

      {status === "scanning" && <ScanningOverlay />}
      {status === "success" && <ScanSuccessOverlay leaving={leaving} />}

      {status === "error" && (
        <div role="alert" className="absolute inset-0 flex animate-fade-in flex-col items-center justify-center gap-4 bg-bg/80 px-6 text-center">
          <CircleAlert size={36} strokeWidth={1.5} className="text-danger" aria-hidden="true" />
          <p className="max-w-sm text-base font-semibold text-fg">{error}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={() => void scan(preview.file)}>Try again</Button>
            <Button onClick={openPicker}>Choose another file</Button>
          </div>
        </div>
      )}

      {status === "done" && (
        <div className="absolute top-3 right-3 flex animate-fade-in-up items-center gap-2 rounded-md bg-bg/85 py-1.5 pr-1.5 pl-3 text-sm text-fg motion-reduce:animate-none">
          <CircleCheck size={16} className="text-live" aria-hidden="true" />
          <span className="max-w-[200px] truncate">{preview.file.name}</span>
          <Button onClick={openPicker} className="h-8 px-3 text-xs">
            Replace
          </Button>
        </div>
      )}

      {status === "done" && error && (
        <p role="alert" className="absolute inset-x-3 bottom-3 rounded-md bg-bg/90 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
