"use client";

import { UseFormReturn, Controller } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

interface PersonalInfoProps {
  form: UseFormReturn<AppFormValues>;
}

export function PersonalInfo({ form }: PersonalInfoProps) {
  return (
    <div className="space-y-6 max-w-lg">
      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="mb-1 font-medium">
          First Name <span className="text-red-500">*</span>
        </label>
        <Controller
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <input
              id="firstName"
              {...field}
              placeholder="John"
              className="border rounded px-3 py-2"
            />
          )}
        />
        {form.formState.errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="mb-1 font-medium">
          Last Name <span className="text-red-500">*</span>
        </label>
        <Controller
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <input
              id="lastName"
              {...field}
              placeholder="Doe"
              className="border rounded px-3 py-2"
            />
          )}
        />
        {form.formState.errors.lastName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <input
              id="email"
              type="email"
              {...field}
              placeholder="you@example.com"
              className="border rounded px-3 py-2"
            />
          )}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1 font-medium">
          Phone Number
        </label>
        <Controller
          control={form.control}
          name="phone"
          render={({ field }) => (
            <input
              id="phone"
              {...field}
              placeholder="(123) 456-7890"
              className="border rounded px-3 py-2"
            />
          )}
        />
      </div>

      {/* Discord */}
      <div className="flex flex-col">
        <label htmlFor="discord" className="mb-1 font-medium">
          Discord
        </label>
        <Controller
          control={form.control}
          name="discord"
          render={({ field }) => (
            <input
              id="discord"
              {...field}
              placeholder="Your Discord Username"
              className="border rounded px-3 py-2"
            />
          )}
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <label htmlFor="gender" className="mb-1 font-medium">
          Gender
        </label>
        <Controller
          control={form.control}
          name="gender"
          render={({ field }) => (
            <select id="gender" {...field} className="border rounded px-3 py-2">
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
      </div>

      {/* Ethnicity */}
      <div className="flex flex-col">
        <label htmlFor="ethnicity" className="mb-1 font-medium">
          Ethnicity
        </label>
        <Controller
          control={form.control}
          name="ethnicity"
          render={({ field }) => (
            <select
              id="ethnicity"
              {...field}
              multiple
              className="border rounded px-3 py-2"
            >
              <option value="asian">Asian</option>
              <option value="black">Black</option>
              <option value="latino">Latino</option>
              <option value="white">White</option>
              <option value="other">Other</option>
            </select>
          )}
        />
      </div>
    </div>
  );
}
