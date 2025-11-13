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
import { PERSONAL_INFO_FIELDS } from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";

interface PersonalInfoProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function PersonalInfo({ form }: PersonalInfoProps) {
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
              name={PERSONAL_INFO_FIELDS.firstName}
              render={renderTextField("First Name", {
                label: "First Name",
                required: true,
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.lastName}
              render={renderTextField("Last Name", {
                label: "Last Name",
                required: true,
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.email}
              render={renderTextField("Email", {
                label: "Email",
                required: true,
                inputProps: { type: "email" },
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.phone}
              render={renderTextField("Phone Number", {
                label: "Phone Number",
                required: true,
                inputProps: { type: "tel" },
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.discord}
              render={renderTextField("Discord", {
                label: "Discord",
                required: true,
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.gender}
              render={renderSelectField(
                "Select Gender",
                ["Male", "Female", "Non-binary", "Other", "Prefer not to say"],
                { label: "Gender", required: true }
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
                { label: "Ethnicity", required: true }
              )}
            />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
