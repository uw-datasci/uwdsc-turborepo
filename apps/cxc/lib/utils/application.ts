import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

/**
 * Checks if the current step in the application form is valid for Desktop
 * @param form - The react-hook-form instance
 * @param currentStep - The current step number (0-2)
 * @returns boolean indicating if the step is valid
 */
export const isDesktopStepValid = (
  form: UseFormReturn<AppFormValues>,
  currentStep: number,
): boolean => {
  const { errors } = form.formState;

  switch (currentStep) {
    case 0: {
      // Personal Details
      const phone = form.watch("phone");
      const discord = form.watch("discord");
      const dietary_restrictions = form.watch("dietary_restrictions");
      const dietary_restrictions_other = form.watch(
        "dietary_restrictions_other",
      );
      const tshirt_size = form.watch("tshirt_size");
      const age = form.watch("age");
      const country_of_residence = form.watch("country_of_residence");
      const country_of_residence_other = form.watch(
        "country_of_residence_other",
      );

      const validAboutYou =
        !errors.dietary_restrictions &&
        dietary_restrictions !== undefined &&
        !errors.tshirt_size &&
        tshirt_size !== undefined &&
        !errors.dietary_restrictions_other &&
        (dietary_restrictions !== "Other" ||
          (dietary_restrictions_other?.trim().length ?? 0) > 0) &&
        !errors.age &&
        age !== undefined &&
        !errors.country_of_residence &&
        country_of_residence !== undefined &&
        (country_of_residence !== "Other" ||
          (country_of_residence_other?.trim().length ?? 0) > 0) &&
        !errors.gender &&
        !errors.ethnicity;

      const validContactInfo =
        !errors.email &&
        !errors.phone &&
        !!phone &&
        !errors.discord &&
        !!discord;

      return validAboutYou && validContactInfo;
    }
    case 1: {
      // Experience
      const universityName = form.watch("university_name");
      const program = form.watch("program");
      const universityNameOther = form.watch("university_name_other");
      const programOther = form.watch("program_other");

      const prior_hackathon_experience = form.watch(
        "prior_hackathon_experience",
      );
      const hackathons_attended = form.watch("hackathons_attended");
      const year = form.watch("year_of_study");

      const isUniversityValid =
        !errors.university_name &&
        !!universityName &&
        (universityName !== "Other" || !!universityNameOther);

      const isProgramValid =
        !errors.program && !!program && (program !== "Other" || !!programOther);

      const isYearValid = !errors.year_of_study && !!year;

      const validHackExp =
        !errors.prior_hackathon_experience &&
        !errors.resume &&
        !errors.github &&
        !errors.linkedin &&
        !errors.other_link &&
        !errors.hackathons_attended &&
        prior_hackathon_experience.length > 0 &&
        hackathons_attended !== undefined;

      return isUniversityValid && isProgramValid && isYearValid && validHackExp;
    }
    case 2: {
      // CxC App
      const CxcQ1 = form.watch("cxc_q1");
      const CxcQ2 = form.watch("cxc_q2");
      return !errors.cxc_q1 && !!CxcQ1 && !errors.cxc_q2 && !!CxcQ2;
    }
    case 3: {
      // Teams (optional, no validation needed)
      return true;
    }
    case 4: {
      // MLH
      const mlh_agreed_code_of_conduct = form.watch(
        "mlh_agreed_code_of_conduct",
      );
      const mlh_authorize_info_sharing = form.watch(
        "mlh_authorize_info_sharing",
      );
      return (
        mlh_agreed_code_of_conduct === true &&
        mlh_authorize_info_sharing === true
      );
    }
    default:
      return true;
  }
};

/**
 * Checks if the current step in the application form is valid for Mobile
 * @param form - The react-hook-form instance
 * @param currentStep - The current step number (0-6)
 * @returns boolean indicating if the step is valid
 */
export const isMobileStepValid = (
  form: UseFormReturn<AppFormValues>,
  currentStep: number,
): boolean => {
  const { errors } = form.formState;

  switch (currentStep) {
    case 0: {
      // Contact Info
      const email = form.watch("email");
      const phone = form.watch("phone");
      const discord = form.watch("discord");

      const validContactInfo =
        !errors.email &&
        !!email &&
        !errors.phone &&
        !!phone &&
        !!discord &&
        !errors.discord;
      return validContactInfo;
    }
    case 1: {
      // About You
      const dietary_restrictions = form.watch("dietary_restrictions");
      const dietary_restrictions_other = form.watch(
        "dietary_restrictions_other",
      );
      const tshirt_size = form.watch("tshirt_size");
      const age = form.watch("age");
      const country_of_residence = form.watch("country_of_residence");
      const country_of_residence_other = form.watch(
        "country_of_residence_other",
      );

      const validAboutYou =
        !errors.dietary_restrictions &&
        dietary_restrictions !== undefined &&
        !errors.tshirt_size &&
        tshirt_size !== undefined &&
        !errors.dietary_restrictions_other &&
        (dietary_restrictions !== "Other" ||
          (dietary_restrictions_other?.trim().length ?? 0) > 0) &&
        !errors.age &&
        age !== undefined &&
        !errors.country_of_residence &&
        country_of_residence !== undefined &&
        (country_of_residence !== "Other" ||
          (country_of_residence_other?.trim().length ?? 0) > 0);

      return validAboutYou;
    }
    case 2: {
      const validOptional = !errors.gender && !errors.ethnicity;
      return validOptional;
    }
    case 3: {
      // Education
      const universityName = form.watch("university_name");
      const program = form.watch("program");
      const universityNameOther = form.watch("university_name_other");
      const programOther = form.watch("program_other");
      const year = form.watch("year_of_study");

      const isUniversityValid =
        !errors.university_name &&
        !!universityName &&
        (universityName !== "Other" || !!universityNameOther);

      const isProgramValid =
        !errors.program && !!program && (program !== "Other" || !!programOther);

      const isYearValid = !errors.year_of_study && !!year;

      return isUniversityValid && isProgramValid && isYearValid;
    }
    case 4: {
      // Hackathon Experience
      const hackathons_attended = form.watch("hackathons_attended");
      const prior_hackathon_experience = form.watch(
        "prior_hackathon_experience",
      );
      const validHackExp =
        !errors.prior_hackathon_experience &&
        !errors.hackathons_attended &&
        prior_hackathon_experience.length > 0 &&
        hackathons_attended !== undefined;
      return validHackExp;
    }
    case 5: // Links & Documents
      return (
        !errors.github &&
        !errors.linkedin &&
        !errors.website_url &&
        !errors.other_link &&
        !errors.resume
      );
    case 6: {
      // CxC Q1
      const cxcQ1 = form.watch("cxc_q1");
      return !errors.cxc_q1 && !!cxcQ1;
    }
    case 7: {
      // CxC Q2
      const cxcQ2 = form.watch("cxc_q2");
      return !errors.cxc_q2 && !!cxcQ2;
    }
    case 8: {
      // Teams (optional, no validation needed)
      return true;
    }
    case 9: {
      // MLH
      const mlh_agreed_code_of_conduct = form.watch(
        "mlh_agreed_code_of_conduct",
      );
      const mlh_authorize_info_sharing = form.watch(
        "mlh_authorize_info_sharing",
      );
      return (
        mlh_agreed_code_of_conduct === true &&
        mlh_authorize_info_sharing === true
      );
    }
    default:
      return true;
  }
};
