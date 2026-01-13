"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { renderTextField } from "@/components/FormHelpers";
import { resetPassword } from "@/lib/api";
import AppSection from "@/components/application/AppSection";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setAuthError("");
    setIsLoading(true);
    try {
      await resetPassword({ password: data.password });
      setIsPasswordReset(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login?message=Password reset successfully. Please sign in.");
      }, 2000);
    } catch (error: unknown) {
      console.error("Reset password error:", error);

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

  // Show loading while checking auth or processing hash
  if (isAuthLoading || isProcessingHash) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  // Don't render form if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isPasswordReset ? (
          <motion.div
            key="password-reset-success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col items-center justify-center text-center"
          >
            {/* Animated Check Icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse" />
              <CheckCircle
                className="w-24 h-24 text-white"
                strokeWidth={1.5}
              />
            </div>

            {/* Title */}
            <h1 className="text-6xl lg:text-7xl mb-6">Password reset!</h1>

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
            className="w-full"
          >
            <h1 className="text-6xl lg:text-7xl mb-12">
              Reset your password
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex flex-col gap-10 mb-8">
                  <div className="flex flex-col gap-4">
                    <AppSection label="New password">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                        {/* Password */}
                        <div className="flex flex-col h-full">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel className="font-normal mb-1">
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      autoComplete="new-password"
                                      placeholder="New password"
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
                        {/* Confirm Password */}
                        <div className="flex flex-col h-full">
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel className="font-normal mb-1">
                                  Confirm Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showConfirmPassword ? "text" : "password"}
                                      autoComplete="new-password"
                                      placeholder="Confirm new password"
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
                    {/* Show Authentication error */}
                    {authError && (
                      <div className="text-destructive text-base mt-2">
                        {authError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 font-normal">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white w-fit font-normal"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                        Resetting...
                      </>
                    ) : (
                      "Reset password"
                    )}
                  </Button>

                  <Button
                    variant="link"
                    asChild
                    className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                  >
                    <Link href="/login">Back to login</Link>
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
