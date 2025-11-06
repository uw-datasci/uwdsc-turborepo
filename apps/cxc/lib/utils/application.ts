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
  const values = form.getValues();
  const { errors } = form.formState;

  switch (currentStep) {
    // TODO: Implement validation for each steps
    case 1: // Personal Details
      return true;
    case 5: // CxC App
      return (
        values.cxc_gain?.trim().length > 0 &&
        values.silly_q?.trim().length > 0 &&
        !errors.cxc_gain &&
        !errors.silly_q
      );
    default:
      return true;
  }
};
