"use client";

import { PackageSearch, SearchX } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import type { ProductListItem } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProductGrid({ query = "" }: { query?: string }) {
  const { status, data, error, refetch } =
    useFetch<ProductListItem[]>("/api/products");

  if (status === "loading") {
    return (
      <div className="grid grid-cols-2 gap-3 px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square w-full rounded-card" />
            <Skeleton className="h-3.5 w-3/4 rounded-full" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <ErrorState description={error} onRetry={refetch} />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch size={32} strokeWidth={1.8} />}
        eyebrow="Nothing here yet"
        title="No products available"
        description="Check back soon for new arrivals."
      />
    );
  }

  const filtered = query.trim()
    ? data.filter((p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : data;

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={<SearchX size={32} strokeWidth={1.8} />}
        title="No matching products"
        description={`We couldn't find anything for "${query}".`}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
