"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Button, FormField } from "@uwdsc/ui";
import { Typing } from "@/components/login/Typing";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { renderTextField } from "@/components/FormHelpers";
import { motion, AnimatePresence } from "framer-motion";
import { forgotPassword } from "@/lib/api/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);
    try {
      const isValid = await form.trigger();
      if (isValid) {
        const formData = form.getValues();

        await forgotPassword({ email: formData.email });

        setSentEmail(formData.email);
        setIsEmailSent(true);
      }
    } catch (error: any) {
      console.error(error);
      setAuthError(
        error?.error ||
          error?.message ||
          "An unexpected error occurred. Please try again",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center px-12 py-8 overflow-hidden">
      <div className="w-full mb-8">
        <Typing
          text="UW Data Science Club"
          speed={75}
          caretSize="text-[42px] font-semibold"
          className="text-3xl font-bold text-white"
        />
      </div>
      <div className="flex-1 flex items-center justify-center w-full relative">
        <AnimatePresence mode="wait">
          {isEmailSent ? (
            <motion.div
              key="email-sent"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-md flex flex-col items-center justify-center text-center text-white absolute"
            >
              {/* Animated Mail Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
                <Mail
                  className="w-24 h-24 text-purple-500 animate-bounce"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold mb-4">Check your email</h2>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
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
                className="text-purple-400 hover:text-purple-300 transition-colors text-base font-medium"
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
              className="w-full max-w-md"
            >
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Forgot password?
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    No worries! Enter your email address and we&apos;ll send you
                    a link to reset your password.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={renderTextField(
                        "Email (ex. slchow@uwaterloo.ca)",
                        {
                          variant: "auth",
                          inputProps: { type: "email" },
                        },
                      )}
                    />

                    {/* Show Authentication error */}
                    {authError && (
                      <div className="text-red-400 text-base">{authError}</div>
                    )}

                    <div className="flex flex-col gap-4 mt-4">
                      <Button
                        size="lg"
                        disabled={isLoading}
                        type="submit"
                        className="w-full rounded-md xl:rounded-lg bg-gradient-purple text-lg font-bold !h-auto py-2.5"
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
                        className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium"
                      >
                        <Link href="/login">
                          <ArrowLeft className="w-4 h-4 mr-2 inline" />
                          Back to login
                        </Link>
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
