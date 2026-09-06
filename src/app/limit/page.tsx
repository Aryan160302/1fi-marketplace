import { Plus, Pencil, History } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const QUICK_ACTIONS = [
  { icon: Plus, label: "Pledge More" },
  { icon: Pencil, label: "Remove Pledge" },
  { icon: History, label: "Pledge History" },
];

export default function LimitPage() {
  return (
    <div className="flex flex-col gap-4 pt-4 pb-6">
      <div className="mx-4 overflow-hidden rounded-card bg-gradient-to-br from-banner-via to-banner-to p-5 shadow-banner">
        <p className="text-[11px] font-bold tracking-wide text-white/70 uppercase">
          Remaining Limit
        </p>
        <p className="mt-1 text-3xl font-extrabold text-white">₹119</p>
        <p className="text-[12px] text-white/70">Available to spend</p>

        <div className="mt-5 flex items-center justify-between text-[11px] font-bold tracking-wide text-white/70 uppercase">
          <span>Utilized</span>
          <span>0%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/25">
          <div className="h-full w-0 rounded-full bg-white" />
        </div>
      </div>

      <div className="mx-4 grid grid-cols-2 gap-3">
        <div className="rounded-card bg-surface-card p-4 shadow-card">
          <p className="text-[10.5px] font-bold tracking-wide text-gray-400 uppercase">
            Sanctioned Limit
          </p>
          <p className="mt-1 text-lg font-extrabold text-gray-900">₹119</p>
        </div>
        <div className="rounded-card bg-surface-card p-4 shadow-card">
          <p className="text-[10.5px] font-bold tracking-wide text-gray-400 uppercase">
            Outstanding
          </p>
          <p className="mt-1 text-lg font-extrabold text-gray-900">₹0</p>
        </div>
      </div>

      <div className="mx-4 rounded-card bg-surface-card p-5 shadow-card">
        <p className="text-[10.5px] font-bold tracking-wide text-gray-400 uppercase">
          Quick Actions
        </p>
        <div className="mt-4 flex items-center justify-between">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                className="flex flex-1 flex-col items-center gap-2 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <p className="text-[11px] font-bold text-gray-900">
                  {action.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <SectionHeader>Pledged Mutual Funds</SectionHeader>
      <p className="-mt-2 px-4 text-[12px] text-gray-500">
        Pledge a fund to unlock your spending limit.
      </p>
    </div>
  );
}
