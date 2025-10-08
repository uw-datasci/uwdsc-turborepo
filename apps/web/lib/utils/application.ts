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
    case 1: // Personal Details
      return (
        !errors.full_name &&
        !errors.personal_email &&
        !errors.waterloo_email &&
        !errors.program &&
        !errors.academic_term &&
        !errors.location &&
        !errors.club_experience &&
        !!form.watch("full_name") &&
        !!form.watch("personal_email") &&
        !!form.watch("waterloo_email") &&
        !!form.watch("program") &&
        !!form.watch("academic_term") &&
        !!form.watch("location") &&
        form.watch("club_experience") !== undefined
      );
    case 2: // General
      return true; // No required fields yet
    case 3: // Positions
      return true; // No required fields yet
    case 4: // Resume
      return !errors.resumeUrl && !!form.watch("resumeUrl");
    default:
      return true;
  }
};
