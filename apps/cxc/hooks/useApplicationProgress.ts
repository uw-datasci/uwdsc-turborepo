import { useEffect } from "react";
import { useApplicationProgress as useProgressContext } from "@/contexts/AppProgressContext";

/**
 * Hook to sync current step with progress bar and scroll behavior
 */
export function useApplicationProgressSync(currentStep: number) {
  const { setProgressValue } = useProgressContext();

  useEffect(() => {
    // Step 0 (Intro) shows no progress, other steps show their step number
    setProgressValue(currentStep === 0 ? -1 : currentStep);
  }, [currentStep, setProgressValue]);
}
