import { TriangleAlert } from "lucide-react";

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-400">
        <TriangleAlert size={32} strokeWidth={1.8} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[15px] font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-pill bg-brand-700 px-6 py-3 text-[15px] font-bold text-white shadow-pill active:scale-[0.98]"
        >
          Try again
        </button>
      )}
    </div>
  );
}
