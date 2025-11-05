import { z } from "zod";

/**
 * Application form validation schema
 */
export const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  discord: z.string().optional(),
  gender: z.enum(["male", "female", "other", ""]).optional(), // "" for default empty
  ethnicity: z
    .array(z.enum(["asian", "black", "latino", "white", "other"]))
    .optional(),
});

/**
 * TypeScript type inferred from the schema
 */
export type AppFormValues = z.infer<typeof applicationSchema>;

/**
 * Default values for the form
 */
export const applicationDefaultValues: AppFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  discord: "",
  gender: "",
  ethnicity: [],
};
