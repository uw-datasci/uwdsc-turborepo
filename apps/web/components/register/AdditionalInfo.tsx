// StepAcademicInfo.tsx
"use client";
import { FormField } from "@uwdsc/ui";
import { RegistrationFormValues } from "@/lib/schemas/register";
import { UseFormReturn } from "react-hook-form";
import {
  renderRegistrationSelectField,
  renderRegistrationTextField,
} from "../RegistrationFormHelper";

interface StepProps {
  form: UseFormReturn<RegistrationFormValues>;
}

const facultyOptions = [
  "Arts",
  "Engineering",
  "Environment",
  "Health",
  "Mathematics",
  "Science",
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

export function StepAcademicInfo({ form }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="faculty"
        render={renderRegistrationSelectField(
          "Faculty",
          "Select your faculty",
          facultyOptions
        )}
      />
      <FormField
        control={form.control}
        name="term"
        render={renderRegistrationSelectField(
          "Last Completed Term",
          "Select your last completed term",
          termOptions
        )}
      />
      <FormField
        control={form.control}
        name="heard_from"
        render={renderRegistrationTextField(
          "Where did you hear about us?",
          "e.g., Instagram, Friend, Website"
        )}
      />
      <FormField
        control={form.control}
        name="message"
        render={renderRegistrationTextField(
          "Optional Message",
          "Anything else you want us to know"
        )}
      />
    </div>
  );
}
