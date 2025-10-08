import { z } from "zod";

/**
 * Application form validation schema
 */
export const applicationSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  personal_email: z.string().email("Personal email is required"),
  waterloo_email: z
    .string()
    .email("UWaterloo email is required")
    .regex(
      /@uwaterloo\.ca$/,
      "Must be a valid UWaterloo email (@uwaterloo.ca)"
    ),
  program: z.string().min(1, "Program is required"),
  academic_term: z.string().min(1, "Academic term is required"),
  location: z.string().min(1, "Location is required"),
  club_experience: z.boolean({
    required_error: "Please select whether you have past exec experience",
  }),
  resumeUrl: z.string().url("Must be a valid URL"),
});

/**
 * TypeScript type inferred from the schema
 */
export type AppFormValues = z.infer<typeof applicationSchema>;

/**
 * Default values for the form
 */
export const applicationDefaultValues: Partial<AppFormValues> = {
  full_name: "",
  personal_email: "",
  waterloo_email: "",
  program: "",
  academic_term: "",
  location: "",
  club_experience: undefined,
  resumeUrl: "",
};
