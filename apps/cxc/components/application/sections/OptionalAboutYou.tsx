"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderSelectField } from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { useEffect } from "react";
import {
  ETHNICITIES,
  GENDERS,
  PERSONAL_INFO_FIELDS,
} from "@/constants/application";

interface OptionalAboutYouProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function OptionalAboutYou({ form }: OptionalAboutYouProps) {
  const dietaryRestriction = form.watch("dietary_restrictions");

  useEffect(() => {
    if (dietaryRestriction !== "Other") {
      form.setValue("dietary_restrictions_other", "");
    }
  }, [dietaryRestriction, form]);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <AppSection
          label="Optional"
          description="These are used for analytical purposes only."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.gender}
              render={renderSelectField("Select Gender", GENDERS, {
                variant: "application",
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.ethnicity}
              render={renderSelectField("Select Ethnicity", ETHNICITIES, {
                variant: "application",
              })}
            />
          </div>
        </AppSection>
      </Form>
    </div>
  );
}
