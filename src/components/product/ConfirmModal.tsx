"use client";

import { CircleCheck, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import type { EmiPlan } from "@/lib/types";

export function ConfirmModal({
  productName,
  plan,
  onClose,
}: {
  productName: string;
  plan: EmiPlan;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="w-full max-w-[430px] rounded-t-card bg-surface-card p-6 pb-8 sm:rounded-card">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success-dark">
            <CircleCheck size={34} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-[17px] font-extrabold text-gray-900">
              Plan selected!
            </p>
            <p className="mt-1 text-[13px] text-gray-500">
              {productName} · {plan.tenureMonths} months at ₹
              {plan.monthlyAmount.toLocaleString("en-IN")}/mo
            </p>
          </div>
        </div>

        <PillButton className="mt-6 w-full" onClick={onClose}>
          Done
        </PillButton>
      </div>
    </div>
  );
}
