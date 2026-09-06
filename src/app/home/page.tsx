import Link from "next/link";
import { CreditCard, Sparkles, ScanFace, Lock, ShoppingBag } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pillButtonClasses } from "@/components/ui/PillButton";

const STEPS = [
  { icon: ScanFace, label: "Connect your portfolio" },
  { icon: Lock, label: "Unlock your limit" },
  { icon: ShoppingBag, label: "Shop & pay later" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5 pt-4 pb-6">
      <div className="relative mx-4 overflow-hidden rounded-card bg-gradient-to-br from-banner-from via-banner-via to-banner-to px-5 py-5 shadow-banner">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-success px-3 py-1 text-[11px] font-bold text-white">
          <CreditCard size={12} />
          LIMIT AVAILABLE
        </span>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-extrabold text-white">₹119</p>
            <p className="mt-1 text-[12px] font-semibold tracking-wide text-white/70 uppercase">
              Remaining to spend
            </p>
            <Link
              href="/shop"
              className={`${pillButtonClasses("secondary")} mt-3 h-10 !border-0 !bg-white !text-brand-700 px-5 text-[13px]`}
            >
              Shop now
            </Link>
          </div>
          <div className="relative flex h-16 w-16 items-center justify-center">
            <Sparkles size={40} className="text-white/90" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionHeader>How 1Fi Works</SectionHeader>
        <div className="mx-4 flex items-start justify-between rounded-card bg-surface-card p-5 shadow-card">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="flex flex-1 flex-col items-center gap-2 text-center"
              >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-600">
                  <Icon size={20} className="text-white" strokeWidth={1.8} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[9px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <p className="text-[10.5px] leading-tight font-bold tracking-wide text-gray-500 uppercase">
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-4 rounded-card bg-gradient-to-br from-banner-via to-banner-to p-5 shadow-banner">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-success px-3 py-1 text-[11px] font-bold text-white">
          Invite
        </span>
        <p className="mt-3 text-[16px] font-bold text-white">
          Get upto ₹1000 for every friend.
        </p>
        <p className="mt-1 text-[12px] text-white/70">
          Plus they&apos;ll also get rewards.
        </p>
      </div>
    </div>
  );
}
