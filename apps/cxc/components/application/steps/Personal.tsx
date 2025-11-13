"use client";

import {
  Form,
  FormField,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderTextField, renderSelectField } from "@/components/FormHelpers";
import {
  DIETARY_OPTIONS,
  PERSONAL_INFO_FIELDS,
  TSHIRT_OPTIONS,
} from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";
import { useEffect } from "react";

interface PersonalInfoProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function PersonalInfo({ form }: PersonalInfoProps) {
  const dietaryRestriction = form.watch("dietary_restrictions");

  useEffect(() => {
    if (dietaryRestriction !== "Other") {
      form.setValue("dietary_restrictions_other", "");
    }
  }, [dietaryRestriction, form]);
  return (
    <div className="space-y-6">
      <Form {...form}>
        <Card className="border-white/20 bg-slate-800">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.email}
              render={renderTextField("Email", {
                label: "Email",
                required: true,
                inputProps: { type: "email" },
                variant: "application",
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.phone}
              render={renderTextField("Phone Number", {
                label: "Phone Number",
                required: true,
                inputProps: { type: "tel" },
                variant: "application",
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.discord}
              render={renderTextField("Discord", {
                label: "Discord",
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
                  label: "Select any dietary restriction",
                  required: true,
                  variant: "application",
                }
              )}
            />

            {dietaryRestriction === "Other" && (
              <FormField
                control={form.control}
                name="dietary_restrictions_other"
                render={renderTextField("Other Dietary Restriction", {
                  label: "Enter custom restriction",
                  variant: "application",
                })}
              />
            )}
            <FormField
              control={form.control}
              name="tshirt_size"
              render={renderSelectField("T-Shirt Size", TSHIRT_OPTIONS, {
                label: "Select your T-shirt size...",
                required: true,
                variant: "application",
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.gender}
              render={renderSelectField(
                "Select Gender",
                ["Male", "Female", "Non-binary", "Other", "Prefer not to say"],
                { label: "Gender", required: true, variant: "application" }
              )}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.ethnicity}
              render={renderSelectField(
                "Select Ethnicity",
                [
                  "Asian",
                  "Black or African",
                  "Hispanic or Latino",
                  "White",
                  "Indigenous",
                  "Middle Eastern",
                  "Pacific Islander",
                  "Other",
                ],
                { label: "Ethnicity", required: true, variant: "application" }
              )}
            />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
