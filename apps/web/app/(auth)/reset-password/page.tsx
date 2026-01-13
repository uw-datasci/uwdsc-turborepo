"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Button, FormField } from "@uwdsc/ui";
import { Typing } from "@/components/login/Typing";
import Link from "next/link";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { renderTextField } from "@/components/FormHelpers";
import { motion, AnimatePresence } from "framer-motion";
import { resetPassword } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@uwdsc/server/core/database/client";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Your password needs to be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isProcessingHash, setIsProcessingHash] = useState(true);
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, mutate } = useAuth();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  // Handle hash fragments or check if already authenticated from Supabase password reset email
  useEffect(() => {
    const processHash = async () => {
      if (typeof window === "undefined") {
        setIsProcessingHash(false);
        return;
      }

      // Check for hash fragments (direct redirect from email)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");

      // If we have a recovery token in the hash, process it
      if (accessToken && type === "recovery") {
        try {
          const supabase = createSupabaseBrowserClient();
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get("refresh_token") || "",
          });

          if (error) {
            console.error("Error setting session:", error);
            router.push("/login?error=Invalid or expired reset link");
            return;
          }

          // Clear hash from URL
          window.history.replaceState(null, "", window.location.pathname);
          
          // Wait a bit for session to be established, then refresh auth state
          await new Promise(resolve => setTimeout(resolve, 100));
          await mutate();
          
          // Give auth context time to update
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error("Error processing hash:", error);
          router.push("/login?error=Failed to process reset link");
          return;
        }
      }

      setIsProcessingHash(false);
    };

    processHash();
  }, [router, mutate]);

  // Redirect if not authenticated after processing (with delay to allow session to establish)
  useEffect(() => {
    if (!isProcessingHash && !isAuthLoading) {
      // Give extra time for session to be established after hash processing
      const timeoutId = setTimeout(() => {
        if (!isAuthenticated) {
          router.push("/login?error=Please use the password reset link from your email");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, isAuthLoading, isProcessingHash, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);
    try {
      const isValid = await form.trigger();
      if (isValid) {
        const formData = form.getValues();

        await resetPassword({ password: formData.password });

        setIsPasswordReset(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login?message=Password reset successfully. Please sign in.");
        }, 2000);
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

  // Show loading while checking auth or processing hash
  if (isAuthLoading || isProcessingHash) {
    return (
      <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center px-12 py-8">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  // Don't render form if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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
          {isPasswordReset ? (
            <motion.div
              key="password-reset-success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-md flex flex-col items-center justify-center text-center text-white absolute"
            >
              {/* Animated Check Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse" />
                <CheckCircle
                  className="w-24 h-24 text-green-500"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold mb-4">Password reset!</h2>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Your password has been successfully reset. Redirecting to login...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="reset-password-form"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Reset your password
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Enter your new password below.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={renderTextField(
                        "New password",
                        {
                          variant: "auth",
                          inputProps: {
                            type: "password",
                            autoComplete: "new-password",
                          },
                        },
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={renderTextField("Confirm new password", {
                        variant: "auth",
                        inputProps: {
                          type: "password",
                          autoComplete: "new-password",
                        },
                      })}
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
                            Resetting...
                          </>
                        ) : (
                          <>
                            Reset password
                            <ArrowRight className="w-5 h-5 ml-2 inline" />
                          </>
                        )}
                      </Button>

                      <Button
                        variant="link"
                        asChild
                        className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium"
                      >
                        <Link href="/login">Back to login</Link>
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
