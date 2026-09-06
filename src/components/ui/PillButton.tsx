import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";

export function pillButtonClasses(variant: Variant = "primary", disabled = false) {
  return clsx(
    "flex h-14 items-center justify-center rounded-pill px-6 text-[15px] font-bold transition active:scale-[0.98]",
    variant === "primary" &&
      (disabled
        ? "bg-gray-200 text-gray-400"
        : "bg-brand-700 text-white shadow-pill"),
    variant === "secondary" &&
      (disabled
        ? "border border-gray-200 text-gray-400"
        : "border border-brand-600 bg-white text-brand-700")
  );
}

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function PillButton({
  variant = "primary",
  className,
  disabled,
  ...props
}: PillButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(pillButtonClasses(variant, disabled), className)}
      {...props}
    />
  );
}
