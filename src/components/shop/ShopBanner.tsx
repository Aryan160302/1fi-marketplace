import { Sparkles, ShoppingBag } from "lucide-react";

export function ShopBanner() {
  return (
    <div className="relative mx-4 mt-4 overflow-hidden rounded-card bg-gradient-to-br from-banner-from via-banner-via to-banner-to px-5 pt-5 pb-8 shadow-banner">
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-wide text-white">
        <Sparkles size={12} />
        NO-COST EMIs
      </span>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="max-w-[62%]">
          <p className="text-[22px] leading-[1.15] font-extrabold text-white">
            Shop today,
            <br />
            <span className="font-medium text-white/80 italic">
              Pay later using
            </span>
            <br />
            Mutual funds.
          </p>
          <p className="mt-2 text-[12px] leading-snug text-white/70">
            No credit score required. No interest. Backed by your
            investments.
          </p>
        </div>

        <div className="relative mt-1 flex h-24 w-24 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 shadow-lg backdrop-blur-sm">
            <ShoppingBag size={30} className="text-white" strokeWidth={1.8} />
          </div>
          <Sparkles
            size={16}
            className="absolute top-0 right-1 text-yellow-300"
          />
          <Sparkles
            size={12}
            className="absolute bottom-2 left-0 text-yellow-300/80"
          />
        </div>
      </div>
    </div>
  );
}
