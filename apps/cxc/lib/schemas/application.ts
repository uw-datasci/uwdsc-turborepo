import { z } from "zod";

/**
 * Application form validation schema
 */
export const applicationSchema = z.object({
  // personal info
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  discord: z.string().min(1, "Discord handle is required"),

  tshirt_size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  dietary_restrictions: z.enum([
    "None",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Halal",
    "Kosher",
    "Other",
  ]),
  dietary_restrictions_other: z.string().optional(),

  gender: z.string().optional(),
  ethnicity: z.string().optional(),

  // experience
  university_name: z.string().min(1, "University name is required"),
  university_name_other: z.string().optional(),
  program_other: z.string().optional(),
  program: z.string().min(1, "Program is required"),
  year_of_study: z.string().min(1, "Year of study is required"),

  prior_hackathon_experience: z
    .array(z.enum(["None", "Hacker", "Judge", "Mentor", "Organizer"]))
    .min(1, "Please select at least one option"),
  // TODO: change to number input instead of dropdown later
  hackathons_attended: z.enum(["0", "1", "2", "3", "4+"]),

  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  // TODO: add one more for twitter like figma
  other_link: z.string().url().optional().or(z.literal("")),
  resume: z.instanceof(File).optional(),

  // application questions
  cxc_gain: z
    .string()
    .min(1, "This question is required")
    .max(500, "Your response is too long. Maximum length is 500 characters."),

  silly_q: z
    .string()
    .min(1, "This question is required")
    .max(200, "Your response is too long. Maximum length is 200 characters."),
});

/**
 * TypeScript type inferred from the schema
 */
export type AppFormValues = z.infer<typeof applicationSchema>;

/**
 * Default values for the form
 */
export const applicationDefaultValues: Partial<AppFormValues> = {
  // TODO: Add more fields to match schema
  email: "",

  dietary_restrictions: undefined,
  dietary_restrictions_other: "",
  tshirt_size: undefined,
  phone: "",
  discord: "",
  gender: undefined,
  ethnicity: undefined,
  prior_hackathon_experience: [],
  hackathons_attended: undefined,
  resume: undefined,
  github: "",
  linkedin: "",
  other_link: "",
  cxc_gain: "",
  silly_q: "",
  program: "",
  year_of_study: "",
  university_name: "",
  university_name_other: "",
  program_other: "",
};
