"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Form,
  FormField,
} from "@uwdsc/ui";

import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";
import {
  renderTextFieldWithLabel as renderTextField,
  renderSelectField,
} from "@/components/FormHelpers";

import { Shirt } from "lucide-react"; 

import { useEffect } from "react";

interface PreferencesProps {
  readonly form: UseFormReturn<AppFormValues>;
}

// Preferences options
const DIETARY_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Other",
];

const TSHIRT_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

export function Preferences({ form }: PreferencesProps) {
  const dietaryRestriction = form.watch("dietary_restrictions");
  const tShirtSize = form.watch("tshirt_size");

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
            <CardTitle className="flex items-center text-xl">
              <Shirt className="mr-2 h-5 w-5 text-blue-300" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Dietary Restrictions */}
            <FormField
              control={form.control}
              name="dietary_restrictions"
              render={renderSelectField(
                "Dietary Restrictions",
                 DIETARY_OPTIONS,
                {label: "Select any dietary restriction", required: true},
              )}
            />

            {dietaryRestriction === "Other" && (
              <FormField
                control={form.control}
                name="dietary_restrictions_other"
                render={renderTextField(
                  "Other Dietary Restriction",
                  "Enter custom restriction"
                )}
              />
            )}

            <FormField
              control={form.control}
              name="tshirt_size"
              render={renderSelectField(
                "T-Shirt Size",
                TSHIRT_OPTIONS,
                {label: "Select your T-shirt size...", required:true},
              )}
            />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
