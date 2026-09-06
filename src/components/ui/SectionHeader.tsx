export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-4">
      <span className="h-3.5 w-1 rounded-full bg-brand-600" />
      <h2 className="text-xs font-bold tracking-[0.12em] text-brand-700 uppercase">
        {children}
      </h2>
    </div>
  );
}
