"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import {
  renderComboboxField,
  renderSelectField,
  renderTextField,
} from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { useEffect } from "react";
import {
  COUNTRY_OPTIONS,
  DIETARY_OPTIONS,
  OPTIONAL_ABOUT_YOU_FIELDS,
  TSHIRT_OPTIONS,
} from "@/constants/application";

interface AboutYouProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function AboutYou({ form }: AboutYouProps) {
  const dietaryRestriction = form.watch("dietary_restrictions");
  const countryOfResidence = form.watch("country_of_residence");

  useEffect(() => {
    if (dietaryRestriction !== "Other") {
      form.setValue("dietary_restrictions_other", "");
    }
  }, [dietaryRestriction, form]);

  useEffect(() => {
    if (countryOfResidence !== "Other") {
      form.setValue("country_of_residence_other", "");
    }
  }, [countryOfResidence, form]);

  return (
    <Form {...form}>
      <AppSection label="About you">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name={OPTIONAL_ABOUT_YOU_FIELDS.tshirt_size}
            render={renderSelectField("T-Shirt Size", TSHIRT_OPTIONS, {
              label: "Select your T-shirt size",
              required: true,
              variant: "application",
            })}
          />
          <FormField
            control={form.control}
            name={OPTIONAL_ABOUT_YOU_FIELDS.dietary_restrictions}
            render={renderSelectField("Dietary Restrictions", DIETARY_OPTIONS, {
              label: "Select any dietary restrictions",
              required: true,
              variant: "application",
            })}
          />

          {dietaryRestriction === "Other" && (
            <div className="md:col-start-2">
              <FormField
                control={form.control}
                name={OPTIONAL_ABOUT_YOU_FIELDS.dietary_restrictions_other}
                render={renderTextField("Other Dietary Restriction", {
                  label: "Please specify dietary restrictions",
                  required: true,
                  variant: "application",
                })}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start mt-4">
          <FormField
            control={form.control}
            name={OPTIONAL_ABOUT_YOU_FIELDS.age}
            render={({ field, fieldState }) => {
              return renderTextField("Age", {
                label: "Enter your age",
                required: true,
                variant: "application",
                inputProps: {
                  type: "number",
                  min: 1,
                  max: 150,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  },
                },
              })({
                field: {
                  ...field,
                  value: field.value ?? "",
                },
                fieldState,
              });
            }}
          />
          <FormField
            control={form.control}
            name={OPTIONAL_ABOUT_YOU_FIELDS.country_of_residence}
            render={renderComboboxField(
              "Country of Residence",
              COUNTRY_OPTIONS,
              {
                label: "Select your country of residence",
                required: true,
                variant: "application",
              },
            )}
          />

          {countryOfResidence === "Other" && (
            <div className="md:col-start-2">
              <FormField
                control={form.control}
                name={OPTIONAL_ABOUT_YOU_FIELDS.country_of_residence_other}
                render={renderTextField("Other Country", {
                  label: "Please specify your country of residence",
                  required: true,
                  variant: "application",
                })}
              />
            </div>
          )}
        </div>
      </AppSection>
    </Form>
  );
}
