"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import type { ProductDetail, VariantType } from "@/lib/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VariantSelector } from "./VariantSelector";
import { EmiPlanCard } from "./EmiPlanCard";
import { ProceedBar } from "./ProceedBar";
import { ConfirmModal } from "./ConfirmModal";

export function ProductDetailScreen({ slug }: { slug: string }) {
  const { status, data, error, refetch } = useFetch<ProductDetail>(
    `/api/products/${slug}`
  );

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Seed the default variant selection (first option per type) as soon as the
  // product loads. Computed during render so it's ready before the next paint.
  const [initializedFor, setInitializedFor] = useState<ProductDetail | null>(
    null
  );
  if (data && data !== initializedFor) {
    setInitializedFor(data);
    const defaults: Record<string, string> = {};
    for (const variant of data.variants) {
      if (!(variant.type in defaults)) defaults[variant.type] = variant.id;
    }
    setSelectedVariants(defaults);
  }

  const currentPrice = useMemo(() => {
    if (!data) return 0;
    const selectedIds = Object.values(selectedVariants);
    const delta = data.variants
      .filter((v) => selectedIds.includes(v.id))
      .reduce((sum, v) => sum + v.priceDelta, 0);
    return data.price + delta;
  }, [data, selectedVariants]);

  const selectedPlan = data?.emiPlans.find((p) => p.id === selectedPlanId) ?? null;

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="aspect-square w-full rounded-card" />
        <Skeleton className="h-5 w-2/3 rounded-full" />
        <Skeleton className="h-4 w-1/3 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-16 rounded-pill" />
          <Skeleton className="h-9 w-16 rounded-pill" />
          <Skeleton className="h-9 w-16 rounded-pill" />
        </div>
        <Skeleton className="h-20 w-full rounded-card" />
        <Skeleton className="h-20 w-full rounded-card" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-full flex-col">
        <TopBar title="Product" />
        <ErrorState description={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title={data.name} />

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex aspect-[4/3] items-center justify-center bg-brand-50/60 p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt={data.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4 px-4 pt-4">
          <div>
            <p className="text-[10.5px] font-bold tracking-[0.1em] text-gray-400 uppercase">
              {data.category}
            </p>
            <h1 className="text-[19px] font-extrabold text-gray-900">
              {data.name}
            </h1>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-[20px] font-extrabold text-gray-900">
                ₹{currentPrice.toLocaleString("en-IN")}
              </span>
              {data.mrp > currentPrice && (
                <span className="text-[14px] text-gray-400 line-through">
                  ₹{data.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          <VariantSelector
            variants={data.variants}
            selected={selectedVariants}
            onSelect={(type: VariantType, id: string) =>
              setSelectedVariants((prev) => ({ ...prev, [type]: id }))
            }
          />

          <div className="flex flex-col gap-3 pt-2">
            <SectionHeader>Choose EMI Plan</SectionHeader>
            <div className="flex flex-col gap-2.5">
              {data.emiPlans.map((plan) => (
                <EmiPlanCard
                  key={plan.id}
                  plan={plan}
                  selected={plan.id === selectedPlanId}
                  onSelect={() => setSelectedPlanId(plan.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProceedBar
        disabled={!selectedPlanId}
        onProceed={() => setShowConfirm(true)}
      />

      {showConfirm && selectedPlan && (
        <ConfirmModal
          productName={data.name}
          plan={selectedPlan}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-black/5 bg-surface-card px-4 py-3.5">
      <Link
        href="/shop"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
      >
        <ChevronLeft size={18} />
      </Link>
      <h1 className="line-clamp-1 text-[15px] font-bold text-gray-900">
        {title}
      </h1>
    </div>
  );
}
