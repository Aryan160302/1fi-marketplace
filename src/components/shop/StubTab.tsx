import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";

export function StubTab({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <EmptyState
      icon={icon}
      eyebrow="Coming soon"
      title={title}
      description="We're working on bringing this to you."
    />
  );
}
