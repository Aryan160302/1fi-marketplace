"use client";

import { useState } from "react";
import { Building2, MapPin } from "lucide-react";
import { ShopBanner } from "./ShopBanner";
import { SegmentedToggle } from "./SegmentedToggle";
import { SearchBar } from "./SearchBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductGrid } from "./ProductGrid";
import { StubTab } from "./StubTab";

type ShopTab = "topBrands" | "nearbyStores" | "marketplace";

const TABS: { value: ShopTab; label: string }[] = [
  { value: "topBrands", label: "Top Brands" },
  { value: "nearbyStores", label: "Nearby Stores" },
  { value: "marketplace", label: "1Fi Marketplace" },
];

export function ShopScreen() {
  const [tab, setTab] = useState<ShopTab>("marketplace");
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col pb-6">
      <ShopBanner />

      <div className="px-4 pt-4">
        <SegmentedToggle options={TABS} value={tab} onChange={setTab} />
      </div>

      {tab === "marketplace" && (
        <div className="flex flex-col gap-4 pt-4">
          <div className="px-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search products..."
            />
          </div>
          <SectionHeader>1Fi Marketplace</SectionHeader>
          <ProductGrid query={query} />
        </div>
      )}

      {tab === "topBrands" && (
        <div className="flex flex-1 flex-col pt-4">
          <div className="px-4">
            <SearchBar placeholder="Search online stores..." />
          </div>
          <StubTab
            icon={<Building2 size={32} strokeWidth={1.8} />}
            title="Top Brands"
          />
        </div>
      )}

      {tab === "nearbyStores" && (
        <div className="flex flex-1 flex-col pt-4">
          <StubTab
            icon={<MapPin size={32} strokeWidth={1.8} />}
            title="Nearby Stores"
          />
        </div>
      )}
    </div>
  );
}
