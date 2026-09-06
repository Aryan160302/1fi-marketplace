import type { ReactNode } from "react";

export function EmptyState({
  icon,
  eyebrow,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-400">
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.12em] text-gray-400 uppercase">
            {eyebrow}
          </p>
        )}
        <p className="text-[15px] font-bold text-gray-900">{title}</p>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
