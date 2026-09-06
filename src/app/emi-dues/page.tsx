import Link from "next/link";
import { Receipt } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { pillButtonClasses } from "@/components/ui/PillButton";

export default function EmiDuesPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        icon={<Receipt size={32} strokeWidth={1.8} />}
        eyebrow="Nothing due yet"
        title="Looks like you haven't shopped yet with 1Fi"
        action={
          <Link href="/shop" className={pillButtonClasses("primary")}>
            Shop Now
          </Link>
        }
      />
    </div>
  );
}
