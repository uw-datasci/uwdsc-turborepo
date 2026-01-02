"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, FormField, Input, FormItem, FormLabel, FormControl, FormMessage, cn } from "@uwdsc/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { renderTextField } from "@/components/FormHelpers";
import { register } from "@/lib/api";
import AppSection from "@/components/application/AppSection";
import {
  registrationSchema,
  registrationDefaultValues,
  RegistrationFormValues,
} from "@/lib/schemas/register";
import { isRegistrationFormValid } from "@/lib/utils/register";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useAuth();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationDefaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setAuthError("");
    setIsLoading(true);
    try {
      await register({
        email: data.email,
        password: data.password,
        metadata: { first_name: data.first_name, last_name: data.last_name },
      });

      // Navigate back to previous route or use callbackUrl if provided
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.back();
      }
      await mutate();
    } catch (error: unknown) {
      console.error("Registration error:", error);

      // Handle API errors with proper error message
      if (error && typeof error === "object" && "error" in error) {
        setAuthError(error.error as string);
      } else if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("An unexpected error occurred. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-6xl lg:text-7xl mb-12">Create your account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex flex-col gap-10 mb-10">
            <div className="flex flex-col gap-4">
              {/* Details Section */}
              <AppSection label="Your details">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* First name */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={renderTextField("First Name", {
                        variant: "application",
                        inputProps: { type: "text" },
                      })}
                    />
                  </div>
                  {/* Last name */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={renderTextField("Last Name", {
                        variant: "application",
                        inputProps: { type: "text" },
                      })}
                    />
                  </div>
                </div>
              </AppSection>
            </div>
            <div className="flex flex-col gap-4">
              <AppSection
                label="Your account"
                description="We'll send you an email to confirm your account."
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                  {/* Email */}
                  <div className="flex flex-col h-full">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-normal mb-1">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Email"
                              value={field.value ?? ""}
                              className={cn(
                                "!h-auto !border-0 !px-4.5 !py-4 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none transition-colors",
                                !fieldState.error &&
                                  "focus-visible:ring-white/30 focus-visible:border-white",
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Password */}
                  <div className="flex flex-col h-full">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-normal mb-1">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Password"
                                value={field.value ?? ""}
                                className={cn(
                                  "!h-auto !border-0 !px-4.5 !py-4 !pr-12 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none transition-colors",
                                  !fieldState.error &&
                                    "focus-visible:ring-white/30 focus-visible:border-white",
                                )}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Confirm password */}
                  <div className="lg:col-start-2 flex flex-col h-full">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="font-normal mb-1">Confirm your password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                value={field.value ?? ""}
                                className={cn(
                                  "!h-auto !border-0 !px-4.5 !py-4 !pr-12 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none transition-colors",
                                  !fieldState.error &&
                                    "focus-visible:ring-white/30 focus-visible:border-white",
                                )}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </AppSection>
            </div>
          </div>

          {authError && (
            <div className="text-destructive text-base mb-4">{authError}</div>
          )}

          <div className="flex flex-col gap-4 font-normal">
            <Button
              disabled={!isRegistrationFormValid(form) || isLoading}
              type="submit"
              className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white w-fit font-normal"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                  Creating...
                </>
              ) : (
                <>
                  Create Account <span className="ml-8 font-sans">→</span>
                </>
              )}
            </Button>
            <Button
              variant="link"
              asChild
              className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
            >
              <Link href="/login">Already have an account? Sign in here.</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
