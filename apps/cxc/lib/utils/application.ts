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
      return true;
    case 4:
      const prior_hackathon_experience = form.watch("prior_hackathon_experience");
      const hackathons_attended = form.watch("hackathons_attended");
      return (
        !errors.prior_hackathon_experience &&
        !errors.resume &&
        !errors.github &&
        !errors.linkedin &&
        !errors.other_link &&
        !errors.hackathons_attended &&
        prior_hackathon_experience.length > 0 &&
        hackathons_attended !== undefined
      );
    default:
      return true;
  }
};
