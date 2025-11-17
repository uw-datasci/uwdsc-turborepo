"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, FormField } from "@uwdsc/ui";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import { renderTextField } from "@/components/FormHelpers";
import { motion, AnimatePresence } from "framer-motion";
import { register, resendVerificationEmail } from "@/lib/api";
import AppSection from "@/components/application/AppSection";
import {
  registrationSchema,
  registrationDefaultValues,
  RegistrationFormValues,
} from "@/lib/schemas/register";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const router = useRouter();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationDefaultValues,
    mode: "onTouched",
  });

  // Check if form is valid
  const isFormValid = () => {
    const { errors } = form.formState;
    const firstName = form.watch("first_name");
    const lastName = form.watch("last_name");
    const email = form.watch("email");
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    return (
      !errors.first_name &&
      !errors.last_name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      !!firstName &&
      !!lastName &&
      !!email &&
      !!password &&
      !!confirmPassword &&
      password === confirmPassword
    );
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    setAuthError("");
    setIsLoading(true);
    try {
      await register({
        email: data.email,
        password: data.password,
        metadata: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      });

      // Show verify email screen with animation
      setRegisteredEmail(data.email);
      setIsRegistered(true);
    } catch (error: any) {
      console.error(error);
      setAuthError(
        error?.error ||
          error?.message ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const [resendStatus, setResendStatus] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleResendVerificationEmail = async () => {
    if (!registeredEmail) {
      setResendStatus("Email not found.");
      return;
    }

    setIsResending(true);
    setResendStatus("");

    try {
      await resendVerificationEmail({ email: registeredEmail });
      setResendStatus("Verification email resent successfully.");
    } catch (error: any) {
      setResendStatus(
        error?.error || error?.message || "Failed to resend verification email."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isRegistered ? (
        <motion.div
          key="verify-email"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex flex-col text-white items-center"
        >
          {/* Animated Mail Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-pulse" />
            <Mail
              className="w-24 h-24 text-purple-500 animate-bounce"
              strokeWidth={1.5}
            />
          </div>

          {/* Title */}
          <h1 className="text-6xl lg:text-7xl font-medium mb-8">
            Verify Email
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-gray-300 mb-12">
            We've sent a verification link to your email address.
            <br />
            Please check your inbox and click the link to verify your account.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => router.push("/login")}
                className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white font-normal"
              >
                Go to Login
                <span className="ml-8 font-sans">→</span>
              </Button>
              <Button
                onClick={handleResendVerificationEmail}
                disabled={isResending}
                className="!bg-transparent !text-white border border-white/50 text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white/10 font-normal"
              >
                {isResending ? "Sending..." : "Resend Email"}
              </Button>
            </div>
            {/* Resend status message */}
            {resendStatus && (
              <p
                className={`text-sm ${
                  resendStatus.includes("successfully")
                    ? "text-green-400"
                    : "text-destructive"
                }`}
              >
                {resendStatus}
              </p>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="registration-form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full"
        >
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
                          render={renderTextField("Email", {
                            variant: "application",
                            inputProps: { type: "email" },
                          })}
                        />
                      </div>
                      {/* Password */}
                      <div className="flex flex-col h-full">
                        <FormField
                          control={form.control}
                          name="password"
                          render={renderTextField(
                            "Password (at least 8 characters)",
                            {
                              variant: "application",
                              inputProps: {
                                type: "password",
                                autoComplete: "new-password",
                              },
                            }
                          )}
                        />
                      </div>
                      {/* Confirm password */}
                      <div className="lg:col-start-2 flex flex-col h-full">
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={renderTextField("Confirm your password", {
                            variant: "application",
                            inputProps: {
                              type: "password",
                              autoComplete: "new-password",
                            },
                          })}
                        />
                      </div>
                    </div>
                  </AppSection>
                </div>
              </div>

              {authError && (
                <div className="text-destructive text-base mb-4">
                  {authError}
                </div>
              )}

              <div className="flex flex-col gap-4 font-normal">
                <Button
                  disabled={!isFormValid() || isLoading}
                  type="submit"
                  className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white w-fit"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        className="w-5 h-5 animate-spin"
                        strokeWidth={3}
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="ml-8 font-sans">→</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="link"
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                  type="button"
                >
                  Already have an account? Sign in here.
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
