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
    case 5: // CxC App
      return (
        values.cxc_gain?.trim().length > 0 &&
        values.silly_q?.trim().length > 0 &&
        !errors.cxc_gain &&
        !errors.silly_q
      );
    case 2: // Education
      const universityName = form.watch("university_name");
      const program = form.watch("program");
      const universityNameOther = form.watch("university_name_other");
      const programOther = form.watch("program_other");

      const isUniversityValid =
        !errors.university_name &&
        !!universityName &&
        (universityName !== "Other" || !!universityNameOther);

      const isProgramValid =
        !errors.program && !!program && (program !== "Other" || !!programOther);

      const isYearValid =
        !errors.year_of_study && !!form.watch("year_of_study");

      return isUniversityValid && isProgramValid && isYearValid;
    default:
      return true;
  }
};
