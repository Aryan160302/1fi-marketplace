"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Receipt, TrendingUp, User } from "lucide-react";
import type { ComponentType } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/emi-dues", label: "EMI Dues", icon: Receipt },
  { href: "/limit", label: "Limit", icon: TrendingUp },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex shrink-0 items-stretch justify-around border-t border-black/5 bg-surface-card px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-1 flex-col items-center gap-1 py-1"
          >
            {active && (
              <span className="absolute -top-2 h-1 w-8 rounded-full bg-brand-600" />
            )}
            <Icon
              size={22}
              strokeWidth={active ? 2.3 : 1.8}
              className={active ? "text-brand-600" : "text-gray-400"}
            />
            <span
              className={`text-[11px] leading-none ${
                active ? "font-semibold text-brand-600" : "font-medium text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
