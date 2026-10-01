import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-md border border-border bg-surface px-4 text-sm text-fg placeholder:text-fg-muted transition-colors " +
  "focus:border-primary focus:outline-none aria-[invalid=true]:border-danger";

interface FieldShellProps {
  label: string;
  required?: boolean;
  error?: string | null;
  className?: string;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => ReactNode;
}

function FieldShell({ label, required, error, className, children }: FieldShellProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required && <span className="text-primary-text"> *</span>}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  error?: string | null;
}

export function TextField({ label, error, required, className, ...props }: TextFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} className={className}>
      {(a11y) => <input {...a11y} {...props} required={required} className={cn(CONTROL, "h-[54px]")} />}
    </FieldShell>
  );
}

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label: string;
  error?: string | null;
}

export function TextAreaField({ label, error, required, className, rows = 3, ...props }: TextAreaFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} className={className}>
      {(a11y) => (
        <textarea {...a11y} {...props} rows={rows} required={required} className={cn(CONTROL, "resize-y py-3")} />
      )}
    </FieldShell>
  );
}
