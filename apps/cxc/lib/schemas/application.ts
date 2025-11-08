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
 
  dietary_restrictions: z.enum(["None","Vegetarian", "Vegan","Gluten-Free", "Halal", "Kosher", "Other", ]),
  dietary_restrictions_other: z.string().optional(),
  tshirt_size: z.enum(["XS", "S", "M", "L", "XL", "XXL"])
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
  
  dietary_restrictions: undefined,
  dietary_restrictions_other: "",
  tshirt_size: undefined,
};
