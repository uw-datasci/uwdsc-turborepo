"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import {
  renderSelectField,
  renderCheckboxGroupField,
  renderTextField,
} from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { useEffect } from "react";
import {
  ETHNICITIES,
  ETHNICITY_OTHER_LABEL,
  GENDERS,
  OPTIONAL_ABOUT_YOU_FIELDS,
} from "@/constants/application";
import { useFormFieldPersistence } from "@/hooks/useFormFieldPersistence";

interface OptionalAboutYouProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function OptionalAboutYou({ form }: OptionalAboutYouProps) {
  // Persist form fields to localStorage
  useFormFieldPersistence(form, "gender");
  useFormFieldPersistence(form, "ethnicity");
  useFormFieldPersistence(form, "ethnicity_other");
  const dietaryRestriction = form.watch("dietary_restrictions");
  const ethnicity = form.watch("ethnicity");

  useEffect(() => {
    if (dietaryRestriction !== "Other") {
      form.setValue("dietary_restrictions_other", "");
    }
  }, [dietaryRestriction, form]);

  useEffect(() => {
    if (!ethnicity?.includes(ETHNICITY_OTHER_LABEL)) {
      form.setValue("ethnicity_other", "");
    }
  }, [ethnicity, form]);

  return (
    <Form {...form}>
      <AppSection
        label="Optional"
        description="These are used for analytical purposes only."
      >
        <div className="grid grid-cols-1 gap-8 items-start">
          <FormField
            control={form.control}
            name={OPTIONAL_ABOUT_YOU_FIELDS.gender}
            render={renderSelectField("Select Gender", GENDERS, {
              label: "Select your gender",
              variant: "application",
            })}
          />

          <FormField
            control={form.control}
            name={OPTIONAL_ABOUT_YOU_FIELDS.ethnicity}
            render={renderCheckboxGroupField(ETHNICITIES, {
              label: "Select your ethnicity",
            })}
          />

          {ethnicity?.includes(ETHNICITY_OTHER_LABEL) && (
            <FormField
              control={form.control}
              name={OPTIONAL_ABOUT_YOU_FIELDS.ethnicity_other}
              render={renderTextField("Other Ethnicity", {
                label: "Please specify your ethnicity",
                required: true,
                variant: "application",
              })}
            />
          )}
        </div>
      </AppSection>
    </Form>
  );
}
