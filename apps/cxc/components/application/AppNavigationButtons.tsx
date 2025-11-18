import { Button } from "@uwdsc/ui/index";
import { ArrowLeftIcon, Loader2 } from "lucide-react";

interface AppNavigationButtonsProps {
  readonly isFirstStep: boolean;
  readonly isLastStep: boolean;
  readonly isNextDisabled: boolean;
  readonly isLoading: boolean;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
}

export function AppNavigationButtons({
  isFirstStep,
  isLastStep,
  isNextDisabled,
  isLoading,
  onPrevious,
  onNext,
}: AppNavigationButtonsProps) {
  return (
    <div className="flex justify-between pt-4">
      <Button
        size="lg"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="rounded-none bg-black !h-auto !px-4.5 !py-4 text-white border border-white hover:scale-105 hover:bg-black/50"
      >
        <ArrowLeftIcon size={24} className="!w-6 !h-6" />
      </Button>

      <Button
        size="lg"
        onClick={onNext}
        disabled={isNextDisabled}
        className="rounded-none bg-white text-black !h-auto px-4.5 py-4 font-normal text-xl hover:bg-white/80 hover:scale-105"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {isLastStep ? "Submitting..." : "Saving..."}
          </>
        ) : (
          <>
            {isLastStep ? "Submit" : "Continue"}
            <span className="ml-8 font-sans">→</span>
          </>
        )}
      </Button>
    </div>
  );
}

