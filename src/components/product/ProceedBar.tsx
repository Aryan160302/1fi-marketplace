import { PillButton } from "@/components/ui/PillButton";

export function ProceedBar({
  disabled,
  onProceed,
}: {
  disabled: boolean;
  onProceed: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-black/5 bg-surface-card px-4 pt-3 pb-4">
      <PillButton
        className="w-full"
        disabled={disabled}
        onClick={onProceed}
      >
        Proceed
      </PillButton>
    </div>
  );
}
