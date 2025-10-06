"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

interface PersonalProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function Personal({ form }: PersonalProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Personal Details</h2>
        <p className="text-muted-foreground">
          Please provide your basic information
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Personal Email */}
          <FormField
            control={form.control}
            name="personal_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your primary contact email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* UWaterloo Email */}
          <FormField
            control={form.control}
            name="waterloo_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UWaterloo Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jdoe@uwaterloo.ca"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Must be a valid @uwaterloo.ca or @edu.uwaterloo.ca email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Program */}
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program *</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormDescription>
                  Your academic program at UWaterloo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Academic Term */}
          <FormField
            control={form.control}
            name="academic_term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Term *</FormLabel>
                <FormControl>
                  <Input placeholder="3A" {...field} />
                </FormControl>
                <FormDescription>
                  Your current academic term (e.g., 1A, 2B, 3A)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
}
