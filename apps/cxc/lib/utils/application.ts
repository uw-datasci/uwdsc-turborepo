import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

/**
 * Checks if the current step in the application form is valid
 * @param form - The react-hook-form instance
 * @param currentStep - The current step number (0-5)
 * @returns boolean indicating if the step is valid
 */
export const isStepValid = (
  form: UseFormReturn<AppFormValues>,
  currentStep: number
): boolean => {
  const { errors } = form.formState;

  switch (currentStep) {
    // TODO: Implement validation for each steps
    case 1: // Personal Details
      return true;
    default:
      return true;
  }
};
