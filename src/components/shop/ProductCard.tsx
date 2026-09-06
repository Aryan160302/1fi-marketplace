import Link from "next/link";
import type { ProductListItem } from "@/lib/types";

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-card bg-surface-card shadow-card active:scale-[0.98]"
    >
      <div className="relative flex aspect-square items-center justify-center bg-brand-50/60 p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-0.5 p-3">
        <p className="line-clamp-1 text-[13.5px] font-bold text-gray-900">
          {product.name}
        </p>
        <p className="text-[12px] text-gray-500">
          From{" "}
          <span className="font-bold text-brand-700">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    </Link>
  );
}
