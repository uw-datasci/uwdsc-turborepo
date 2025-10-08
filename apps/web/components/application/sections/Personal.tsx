"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uwdsc/ui";
import { UseFormReturn, ControllerRenderProps } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";
import { ComponentProps } from "react";
import { GraduationCap, User } from "lucide-react";

interface PersonalProps {
  readonly form: UseFormReturn<AppFormValues>;
}
const locationOptions = [
  "Study Term",
  "Co-op Term in Waterloo",
  "Co-op Term but can commute to Waterloo",
  "Co-op term not in Waterloo",
];

const terms = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

// Helper function to render form fields
const renderTextField = (
  label: string,
  placeholder: string,
  inputProps?: Partial<ComponentProps<typeof Input>>
) => {
  return ({ field }: { field: ControllerRenderProps<AppFormValues, any> }) => (
    <FormItem>
      <FormLabel className="mb-1">
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...inputProps} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

// Helper function to render select fields
const renderSelectField = (
  label: string,
  placeholder: string,
  options: string[]
) => {
  return ({ field }: { field: ControllerRenderProps<AppFormValues, any> }) => (
    <FormItem>
      <FormLabel className="mb-1">
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent className="bg-slate-700">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="text-slate-200 focus:bg-slate-600 focus:text-white hover:bg-slate-600 hover:text-white transition-colors"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

// Helper function to render radio group fields for boolean values
const renderRadioField = (label: string) => {
  return ({ field }: { field: ControllerRenderProps<AppFormValues, any> }) => (
    <FormItem className="space-y-3">
      <FormLabel>
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => field.onChange(value === "true")}
          value={field.value === undefined ? undefined : String(field.value)}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="true" />
            </FormControl>
            <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="false" />
            </FormControl>
            <FormLabel className="font-normal cursor-pointer">No</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export function Personal({ form }: PersonalProps) {
  return (
    <div className="space-y-6">
      <Form {...form}>
        {/* Two Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Basic Information */}
          <Card className="border-white/20 bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="mr-2 h-5 w-5 text-blue-300" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="full_name"
                render={renderTextField("Full Name", "Enter your full name")}
              />

              {/* Personal Email */}
              <FormField
                control={form.control}
                name="personal_email"
                render={renderTextField(
                  "Personal Email Address",
                  "johndoe@gmail.com",
                  { type: "email" }
                )}
              />

              {/* UWaterloo Email */}
              <FormField
                control={form.control}
                name="waterloo_email"
                render={renderTextField(
                  "UW Email Address",
                  "jdoe@uwaterloo.ca",
                  { type: "email" }
                )}
              />
            </CardContent>
          </Card>

          {/* Right Column: Academic Information */}
          <Card className="border-white/20 bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <GraduationCap className="mr-2 h-5 w-5 text-blue-300" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Program */}
              <FormField
                control={form.control}
                name="program"
                render={renderTextField("Program", "Computer Science")}
              />

              {/* Academic Term */}
              <FormField
                control={form.control}
                name="academic_term"
                render={renderSelectField(
                  "Academic Term (Current or Most Recent)",
                  "Select your academic term",
                  terms
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={renderSelectField(
                  "Location Next Term",
                  "Select where you will be next term",
                  locationOptions
                )}
              />
            </CardContent>
          </Card>

          {/* Bottom: Club Experience Information */}
          <Card className="md:col-span-2 border-white/20 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl">Club Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="club_experience"
                render={renderRadioField(
                  "Have you been a member of UW Data Science Club before?"
                )}
              />
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  );
}
