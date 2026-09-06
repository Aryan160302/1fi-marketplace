"use client";

import clsx from "clsx";

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex w-full gap-1 rounded-pill bg-brand-50/90 p-1.5 backdrop-blur-sm">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              "relative flex-1 whitespace-nowrap rounded-pill px-2 py-2.5 text-[12.5px] font-bold transition-colors",
              active ? "bg-white text-brand-700 shadow-sm" : "text-gray-500"
            )}
          >
            {opt.label}
            {active && (
              <span className="absolute bottom-1 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-brand-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}
