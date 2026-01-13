"use client";
import { FormField, Button, Form, ArrowRightIcon } from "@uwdsc/ui";
import {
  LoginFormValues,
  loginSchema,
  loginDefaultValues,
} from "@/lib/schemas/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { renderTextField } from "../FormHelpers";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { VerifyEmailModal } from "./VerifyEmailModal";
import { login } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import AppSection from "../application/AppSection";
import Link from "next/link";
import CxCButton from "../CxCButton";
import { Input } from "@uwdsc/ui";
import { FormItem, FormLabel, FormControl, FormMessage, cn } from "@uwdsc/ui";

export function LoginForm() {
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError("");
    setIsLoading(true);

    try {
      const responseData = await login({
        email: data.email,
        password: data.password,
      });

      // Check if this is a successful login with unverified email
      if (responseData.error === "email_not_verified") {
        setUserEmail(data.email);
        setShowVerifyModal(true);
      } else if (responseData.session && responseData.user) {
        // Update the auth context with the new user data
        await mutate();

        if (responseData.user.email_confirmed_at) {
          // Email verified, redirect to landing with full page reload
          // This ensures cookies are synced and SWR cache is fresh
          window.location.href = "/";
        } else {
          // Email not verified, show modal
          setUserEmail(data.email);
          setShowVerifyModal(true);
        }
      } else {
        // Fallback: refresh and let middleware handle
        router.refresh();
      }
    } catch (error: unknown) {
      console.error("Login error:", error);

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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex flex-col gap-10 mb-8">
            <div className="flex flex-col gap-4">
              <AppSection label="Your credentials">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                  {/* Email */}
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
                                autoComplete="off"
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
            <CxCButton
              disabled={isLoading}
              type="submit"
              className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white w-fit font-normal"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRightIcon className="ml-8 font-sans" />
                </>
              )}
            </CxCButton>

            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="link"
                  asChild
                  className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                >
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
                <Button
                  variant="link"
                  asChild
                  className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                >
                  <Link href="/register">
                    Don&apos;t have an account yet? Sign up here.
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <VerifyEmailModal
        open={showVerifyModal}
        onOpenChange={setShowVerifyModal}
        email={userEmail}
      />
    </>
  );
}
