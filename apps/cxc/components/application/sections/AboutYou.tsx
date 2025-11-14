"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderSelectField, renderTextField } from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { useEffect } from "react";
import { DIETARY_OPTIONS, TSHIRT_OPTIONS } from "@/constants/application";

interface AboutYouProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function AboutYou({ form }: AboutYouProps) {
  const dietaryRestriction = form.watch("dietary_restrictions");

  useEffect(() => {
    if (dietaryRestriction !== "Other") {
      form.setValue("dietary_restrictions_other", "");
    }
  }, [dietaryRestriction, form]);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <AppSection label="About you">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            <FormField
              control={form.control}
              name="tshirt_size"
              render={renderSelectField("T-Shirt Size", TSHIRT_OPTIONS, {
                required: true,
                variant: "application",
              })}
            />
            <FormField
              control={form.control}
              name="dietary_restrictions"
              render={renderSelectField(
                "Dietary Restrictions",
                DIETARY_OPTIONS,
                {
                  required: true,
                  variant: "application",
                }
              )}
            />

            {dietaryRestriction === "Other" && (
              <div className="md:col-start-2">
                <FormField
                  control={form.control}
                  name="dietary_restrictions_other"
                  render={renderTextField("Other Dietary Restriction", {
                    variant: "application",
                  })}
                />
              </div>
            )}
          </div>
        </AppSection>
      </Form>
    </div>
  );
}
