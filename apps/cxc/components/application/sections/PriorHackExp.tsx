"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import {
  renderCheckboxGroupField,
  renderTextField,
} from "@/components/FormHelpers";
import { HACKER_EXPERIENCE_OPTIONS } from "@/constants/application";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";

interface PriorHackExpProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function PriorHackExp({ form }: PriorHackExpProps) {
  return (
    <div className="space-y-6">
      <Form {...form}>
        <AppSection label="Prior hackathon experience">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <FormField
              control={form.control}
              name="prior_hackathon_experience"
              render={renderCheckboxGroupField(HACKER_EXPERIENCE_OPTIONS, {
                label: "Past Roles",
                required: true,
              })}
            />

            <div className="row-start-2">
              <FormField
                control={form.control}
                name={"hackathons_attended"}
                render={renderTextField("Hackathons Attended", {
                  label: "Number of Hackathons Attended",
                  required: true,
                  inputProps: { type: "number" },
                  variant: "application",
                })}
              />
            </div>
          </div>
        </AppSection>
      </Form>
    </div>
  );
}
