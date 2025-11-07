"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Checkbox,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
} from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";
import { renderTextField, renderCheckboxGroupField, renderFileUploadField, renderSelectField } from "@/components/FormHelpers";

interface PortfolioProps {
    readonly form: UseFormReturn<AppFormValues>;
}

type PriorHackathonExperience = AppFormValues["prior_hackathon_experience"][number];

const options: PriorHackathonExperience[] = ["None", "Hacker", "Judge", "Mentor", "Organizer"];

export function Portfolio({ form }: PortfolioProps) {

    return (
    <div className="space-y-6">
        <div className="mb-5 flex flex-col gap-3 px-4">
            <div className="flex items-center">
            <h2 className="text-xl font-semibold text-white">
                Portfolio
            </h2>
            </div>
            <p className="mb-2 block text-base text-white">
                Answer questions regarding your hackathon experience, upload your resume, and provide links to your Github, Linkedin, etc.
            </p>
        </div>
        <Form {...form}>
            <Card className="border-white/20 bg-slate-800">
                <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                        Give us information about your prior hackathon experience (select all that apply)
                        <span className="ml-1 text-red-500">*</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                    control={form.control}
                    name="prior_hackathon_experience"
                    render={renderCheckboxGroupField("Prior Hackathon Experience", options)}
                    />
                    <FormField
                    control={form.control}
                    name="hackathons_attended"
                    render={renderSelectField("Number of Hackathons Attended", ["0", "1", "2", "3", "4+"], {label: "Number of Hackathons Attended", required: true})}
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
                    render={renderFileUploadField("Upload your resume (pdf or word document)", ".pdf,.doc,.docx")}
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
                    render={renderTextField(
                        "https://github.com/...",
                        { label: "GitHub Profile" }
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="linkedin"
                    render={renderTextField(
                        "https://linkedin.com/in/...",
                        { label: "LinkedIn Profile" }
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="other_link"
                    render={renderTextField(
                        "https://",
                        { label: "Other Link (Portfolio, Personal Website, etc.)" }
                    )}
                    />
                </CardContent>
            </Card>
        </Form>
    </div>
    );
}