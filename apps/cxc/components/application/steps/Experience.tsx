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
  renderTextField,
  renderComboboxField,
  renderSelectField,
  renderCheckboxGroupField,
  renderFileUploadField,
} from "@/components/FormHelpers";
import {
  GRADUATION_YEARS,
  UNIVERSITY_OPTIONS,
  PROGRAM_OPTIONS,
  HACKER_EXPERIENCE_OPTIONS,
} from "@/constants/application";
import { useEffect } from "react";

interface ExperienceProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function Experience({ form }: ExperienceProps) {
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
                "Select your university...",
                UNIVERSITY_OPTIONS,
                {
                  label: "University Name",
                  required: true,
                  searchPlaceholder: "Search universities...",
                  emptyMessage: "No university found.",
                  variant: "application",
                }
              )}
            />

            {universityName === "Other" && (
              <FormField
                control={form.control}
                name="university_name_other"
                render={renderTextField("Please specify your university name", {
                  label: "Enter your university name",
                  variant: "application",
                })}
              />
            )}

            {/* Program of Study */}
            <FormField
              control={form.control}
              name="program"
              render={renderComboboxField(
                "Select your program...",
                PROGRAM_OPTIONS,
                {
                  label: "Program of Study",
                  required: true,
                  searchPlaceholder: "Search programs...",
                  emptyMessage: "No program found.",
                  variant: "application",
                }
              )}
            />

            {programName === "Other" && (
              <FormField
                control={form.control}
                name="program_other"
                render={renderTextField(
                  "Please specify your program of study",
                  {
                    label: "Enter your program of study",
                    variant: "application",
                  }
                )}
              />
            )}

            {/* Year of Study */}
            <FormField
              control={form.control}
              name="year_of_study"
              render={renderSelectField("Year of Study", GRADUATION_YEARS, {
                label: "Select your year of study",
                variant: "application",
              })}
            />
          </CardContent>
        </Card>
        <Card className="border-white/20 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              Give us information about your prior hackathon experience (select
              all that apply)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* TODO: Add variant applciatn for checkbox group */}
            <FormField
              control={form.control}
              name="prior_hackathon_experience"
              render={renderCheckboxGroupField(HACKER_EXPERIENCE_OPTIONS, {
                label: "Prior Hackathon Experience",
                required: true,
              })}
            />
            {/* TODO: change to number input instead of dropdown later */}
            <FormField
              control={form.control}
              name="hackathons_attended"
              render={renderSelectField(
                "Number of Hackathons Attended",
                ["0", "1", "2", "3", "4+"],
                {
                  label: "Number of Hackathons Attended",
                  required: true,
                  variant: "application",
                }
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-white/20 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              Resume Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* TODO: add applicaiton variatn for resume upload */}
            <FormField
              control={form.control}
              name="resume"
              render={renderFileUploadField(".pdf,.doc,.docx", {
                label: "Upload your resume (PDF or Word document)",
                required: false,
              })}
            />
          </CardContent>
        </Card>

        <Card className="border-white/20 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              Portfolio Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="github"
              render={renderTextField("https://github.com/...", {
                label: "GitHub Profile",
                variant: "application",
              })}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={renderTextField("https://linkedin.com/in/...", {
                label: "LinkedIn Profile",
                variant: "application",
              })}
            />
            <FormField
              control={form.control}
              name="other_link"
              render={renderTextField("https://", {
                label: "Other Link (Portfolio, Personal Website, etc.)",
                variant: "application",
              })}
            />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
