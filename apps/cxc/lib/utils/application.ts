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
    case 2: 
      return true;
    case 3:
      const dietary_restrictions = form.watch("dietary_restrictions");
      const tshirt_size = form.watch("tshirt_size");
      return (
        (!errors.dietary_restrictions && dietary_restrictions !== undefined) &&
        (!errors.tshirt_size && tshirt_size !== undefined)
      );
    default:
      return true;
  }
};
