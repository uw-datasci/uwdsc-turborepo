import { z } from "zod";

/**
 * Application form validation schema
 */
export const applicationSchema = z.object({
  // TODO: Add more fields as necessary
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  discord: z.string().min(1, "Discord handle is required"),
  gender: z.string().min(1, "Gender is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  prior_hackathon_experience: z
    .array(z.enum(["None", "Hacker", "Judge", "Mentor", "Organizer"]))
    .min(1, "Please select at least one option"),
  hackathons_attended: z.enum(["0", "1", "2", "3", "4+"]),
  resume: z.instanceof(File).optional(),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  other_link: z.string().url().optional().or(z.literal("")),
  cxc_gain: z.string().max(500),
  silly_q: z.string().max(200),
  program: z.string().min(1, "Program is required"),
  year_of_study: z.string().min(1, "Year of study is required"),
  university_name: z.string().min(1, "University name is required"),
  university_name_other: z.string().optional(),
  program_other: z.string().optional(),
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
  first_name: "",
  last_name: "",
  dob: "",
  email: "",
  phone: "",
  discord: "",
  gender: "",
  ethnicity: "",
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

//personal
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone Number is required"),
  discord: z.string().min(1, "Discord handle is required"),
  gender: z.string().min(1, "Please select a gender"),
  ethnicity: z.string().min(1, "Please select an ethnicity"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
