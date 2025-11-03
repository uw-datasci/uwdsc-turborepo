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
                    render={({ field }) => (
                        <fieldset className="space-y-4">
                            <legend className="sr-only">
                                Prior Hackathon Experience
                            </legend>
                            {options.map((option) => (
                                <FormItem key={option} className="flex items-center space-x-3">
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value?.includes(option)}
                                        onCheckedChange={(checked) => {
                                            const isChecked = checked === true;
                                            const newValue = Array.isArray(field.value) ? [...field.value] : [];
                                            if (isChecked) {
                                                newValue.push(option);
                                            } else {
                                                const index = newValue.indexOf(option);
                                                if (index > -1) {
                                                    newValue.splice(index, 1);
                                                }
                                            }
                                            field.onChange(newValue);
                                        }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {option}
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        </fieldset>
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
                    render={({ field: {value, onChange, ...fieldProps} }) => (
                        <FormItem>
                            <FormLabel>Upload your resume</FormLabel>
                            <FormControl>
                                <Input
                                type="file"
                                className="h-auto py-2 file:cursor-pointer"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    onChange(file);
                                }}
                                {...fieldProps}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload your resume (PDF or Word document)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GitHub</FormLabel>
                            <FormControl>
                            <Input
                                type="url"
                                placeholder="https://github.com/..."
                                {...field}
                            />
                            </FormControl>
                            <FormDescription>
                            Link to your GitHub profile
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Linkedin</FormLabel>
                            <FormControl>
                            <Input
                                type="url"
                                placeholder="https://linkedin.com/in/..."
                                {...field}
                            />
                            </FormControl>
                            <FormDescription>
                            Link to your LinkedIn profile
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="other_link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Other link (website, Devpost, etc.)</FormLabel>
                            <FormControl>
                            <Input
                                type="url"
                                placeholder="https://..."
                                {...field}
                            />
                            </FormControl>
                            <FormDescription>
                            Link to your other profiles or projects
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>
        </Form>
    </div>
    );
}