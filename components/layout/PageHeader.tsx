import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-fg">{title}</h1>
        {subtitle && <p className="mt-1.5 text-base text-fg-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2 sm:pt-1.5">{actions}</div>}
    </div>
  );
}
