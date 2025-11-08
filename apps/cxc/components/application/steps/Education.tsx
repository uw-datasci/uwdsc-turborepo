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
import { GraduationCap } from "lucide-react";
import {
  renderTextFieldWithLabel as renderTextField,
  renderComboboxFieldWithLabel as renderComboboxField,
  renderSelectFieldWithLabel as renderSelectField,
} from "@/components/FormHelpers";
import {
  graduationYears,
  universityOptions,
  programOptions,
} from "@/constants/application";
import { useEffect } from "react";

interface EducationProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function Education({ form }: EducationProps) {
  const universityName = form.watch("university_name");
  const programName = form.watch("program");

  useEffect(() => {
    if (universityName !== "Other") {
      form.setValue("university_name_other", "");
    }
  }, [universityName, form]);

  useEffect(() => {
    if (programName !== "Other") {
      form.setValue("program_other", "");
    }
  }, [programName, form]);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <Card className="border-white/20 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <GraduationCap className="mr-2 h-5 w-5 text-blue-300" />
              Education Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* University Name */}
            <FormField
              control={form.control}
              name="university_name"
              render={renderComboboxField(
                "University Name",
                "Select your university...",
                universityOptions,
                true,
                "Search universities...",
                "No university found."
              )}
            />

            {universityName === "Other" && (
              <FormField
                control={form.control}
                name="university_name_other"
                render={renderTextField(
                  "Please specify your university name",
                  "Enter your university name"
                )}
              />
            )}

            {/* Program of Study */}
            <FormField
              control={form.control}
              name="program"
              render={renderComboboxField(
                "Program of Study",
                "Select your program...",
                programOptions,
                true,
                "Search programs...",
                "No program found."
              )}
            />

            {programName === "Other" && (
              <FormField
                control={form.control}
                name="program_other"
                render={renderTextField(
                  "Please specify your program of study",
                  "Enter your program of study"
                )}
              />
            )}

            {/* Year of Study */}
            <FormField
              control={form.control}
              name="year_of_study"
              render={renderSelectField(
                "Year of Study",
                "Select your year of study",
                graduationYears
              )}
            />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
