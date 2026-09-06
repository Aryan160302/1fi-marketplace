import clsx from "clsx";
import type { Variant, VariantType } from "@/lib/types";

const TYPE_LABEL: Record<VariantType, string> = {
  storage: "Storage",
  color: "Color",
};

export function VariantSelector({
  variants,
  selected,
  onSelect,
}: {
  variants: Variant[];
  selected: Record<string, string>;
  onSelect: (type: VariantType, variantId: string) => void;
}) {
  const groups = variants.reduce<Record<string, Variant[]>>((acc, v) => {
    (acc[v.type] ??= []).push(v);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groups).map(([type, options]) => (
        <div key={type} className="flex flex-col gap-2">
          <p className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase">
            {TYPE_LABEL[type as VariantType] ?? type}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((variant) => {
              const active = selected[type] === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => onSelect(variant.type, variant.id)}
                  className={clsx(
                    "rounded-pill border px-4 py-2 text-[13px] font-semibold transition",
                    active
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-gray-200 bg-white text-gray-700"
                  )}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
