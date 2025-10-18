"use client";

import { FormField } from "@uwdsc/ui";
import { RegistrationFormValues } from "@/lib/schemas/register";
import { UseFormReturn } from "react-hook-form";
import {
  renderTextField,
  renderSelectField,
  renderTextAreaField,
} from "../../FormHelpers";

interface StepProps {
  form: UseFormReturn<RegistrationFormValues>;
}

const facultyOptions = [
  "Math",
  "Engineering",
  "Science",
  "Arts",
  "Health",
  "Environment",
  "Other/Non-Waterloo",
];
const termOptions = [
  "1A",
  "1B",
  "2A",
  "2B",
  "3A",
  "3B",
  "4A",
  "4B",
  "5A",
  "5B",
];

export function AdditionalInfo({ form }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="faculty"
        render={renderSelectField("Faculty", facultyOptions, {
          variant: "auth",
        })}
      />
      <FormField
        control={form.control}
        name="term"
        render={renderSelectField("Current/Last completed term", termOptions, {
          variant: "auth",
        })}
      />
      <FormField
        control={form.control}
        name="heard_from_where"
        render={renderTextField("Where did you hear about us?", {
          variant: "auth",
        })}
      />
      <FormField
        control={form.control}
        name="member_ideas"
        render={renderTextAreaField(
          "[Optional] Share your ideas for new events or improvements!",
          { variant: "auth" }
        )}
      />
    </div>
  );
}
