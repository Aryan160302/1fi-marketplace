import clsx from "clsx";
import { CircleCheck } from "lucide-react";
import type { EmiPlan } from "@/lib/types";

export function EmiPlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: EmiPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  const isZeroInterest = plan.interestRate === 0;

  return (
    <button
      onClick={onSelect}
      className={clsx(
        "flex w-full items-center justify-between gap-3 rounded-card border-2 p-4 text-left transition",
        selected
          ? "border-brand-600 bg-brand-50/60"
          : "border-transparent bg-surface-card shadow-card"
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-extrabold text-gray-900">
          {plan.tenureMonths} months
        </p>
        <p
          className={clsx(
            "text-[12px] font-semibold",
            isZeroInterest ? "text-success-dark" : "text-gray-500"
          )}
        >
          {isZeroInterest ? "0% interest" : `${plan.interestRate}% interest`}
        </p>
        {plan.cashbackAmount !== null && (
          <span className="mt-0.5 inline-flex w-fit items-center rounded-pill bg-success/10 px-2 py-0.5 text-[10.5px] font-bold text-success-dark">
            ₹{plan.cashbackAmount.toLocaleString("en-IN")} cashback
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[16px] font-extrabold text-gray-900">
            ₹{plan.monthlyAmount.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-gray-400">per month</p>
        </div>
        <CircleCheck
          size={22}
          strokeWidth={1.8}
          className={clsx(
            "shrink-0",
            selected ? "text-brand-600" : "text-gray-200"
          )}
        />
      </div>
    </button>
  );
}
