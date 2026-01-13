"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  Button,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  cn,
  Input,
} from "@uwdsc/ui";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { renderTextField } from "@/components/FormHelpers";
import { forgotPassword } from "@/lib/api";
import AppSection from "@/components/application/AppSection";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setAuthError("");
    setIsLoading(true);
    try {
      await forgotPassword({ email: data.email });
      setSentEmail(data.email);
      setIsEmailSent(true);
    } catch (error: unknown) {
      console.error("Forgot password error:", error);

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
      <AnimatePresence mode="wait">
        {isEmailSent ? (
          <motion.div
            key="email-sent"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col items-center justify-center text-center"
          >
            {/* Animated Mail Icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse" />
              <Mail
                className="w-24 h-24 text-white animate-bounce"
                strokeWidth={1.5}
              />
            </div>

            {/* Title */}
            <h1 className="text-6xl lg:text-7xl mb-6">Check your email</h1>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-semibold text-white">{sentEmail}</span>
            </p>

            <p className="text-base text-gray-400 mb-8 leading-relaxed">
              Click the link in the email to reset your password. If you
              don&apos;t see it, check your spam folder.
            </p>

            {/* Back to Login */}
            <Button
              variant="link"
              asChild
              className="text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              <Link href="/login">
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Back to login
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="forgot-password-form"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <h1 className="text-6xl lg:text-7xl mb-12">
              Forgot password?
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full"
              >
                <div className="flex flex flex-col gap-10 mb-8">
                  <div className="flex flex-col gap-4">
                    <AppSection label="Your email">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                        <div className="flex flex-col h-full">
                          <FormField
                            control={form.control}
                            name="email"
                            render={renderTextField("Email", {
                              label: "Email",
                              variant: "application",
                              inputProps: { type: "email" },
                            })}
                          />
                        </div>
                      </div>
                    </AppSection>
                    {/* Show Authentication error */}
                    {authError && (
                      <div className="text-destructive text-base mt-2">
                        {authError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 font-normal">
                  <p className="text-base text-gray-300 mb-4">
                    No worries! Enter your email address and we&apos;ll send you
                    a link to reset your password.
                  </p>

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white w-fit font-normal"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                        Sending...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>

                  <Button
                    variant="link"
                    asChild
                    className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                  >
                    <Link href="/login">
                      <ArrowLeft className="w-4 h-4 mr-2 inline" />
                      Back to login
                    </Link>
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
