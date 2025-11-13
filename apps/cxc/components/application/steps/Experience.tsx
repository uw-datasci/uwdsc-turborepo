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
  graduationYears,
  universityOptions,
  programOptions,
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
                universityOptions,
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
                })}
              />
            )}

            {/* Program of Study */}
            <FormField
              control={form.control}
              name="program"
              render={renderComboboxField(
                "Select your program...",
                programOptions,
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
                  { label: "Enter your program of study" }
                )}
              />
            )}

            {/* Year of Study */}
            <FormField
              control={form.control}
              name="year_of_study"
              render={renderSelectField("Year of Study", graduationYears, {
                label: "Select your year of study",
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
            <FormField
              control={form.control}
              name="prior_hackathon_experience"
              render={renderCheckboxGroupField(
                "Prior Hackathon Experience",
                HACKER_EXPERIENCE_OPTIONS,
                { required: true }
              )}
            />
            {/* TODO: change to number input instead of dropdown later */}
            <FormField
              control={form.control}
              name="hackathons_attended"
              render={renderSelectField(
                "Number of Hackathons Attended",
                ["0", "1", "2", "3", "4+"],
                { label: "Number of Hackathons Attended", required: true }
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
            <FormField
              control={form.control}
              name="resume"
              render={renderFileUploadField(
                "Upload your resume (pdf or word document)",
                ".pdf,.doc,.docx",
                { required: false }
              )}
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
              })}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={renderTextField("https://linkedin.com/in/...", {
                label: "LinkedIn Profile",
              })}
            />
            <FormField
              control={form.control}
              name="other_link"
              render={renderTextField("https://", {
                label: "Other Link (Portfolio, Personal Website, etc.)",
              })}
            />
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
