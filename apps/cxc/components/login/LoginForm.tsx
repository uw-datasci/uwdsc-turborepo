"use client";
import { FormField, Button, Form } from "@uwdsc/ui";
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
import { Loader2 } from "lucide-react";
import { VerifyEmailModal } from "./VerifyEmailModal";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import AppSection from "../application/AppSection";

export function LoginForm() {
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
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
          // Email verified, redirect to landing
          router.push("/");
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
      console.error("An unexpected error occurred:", error);
      setAuthError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again"
      );
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
                      render={renderTextField("Password", {
                        variant: "application",
                        inputProps: { type: "password", autoComplete: "off" },
                      })}
                    />
                  </div>
                </div>
                {/* Show Authentication error */}
                {authError && (
                  <div className="text-destructive text-base mb-4">
                    {authError}
                  </div>
                )}
              </AppSection>
            </div>
          </div>

          <div className="flex flex-col gap-4 font-normal">
            <Button
              disabled={isLoading}
              type="submit"
              className="!bg-white !text-black text-lg rounded-none !h-auto px-4 py-2 hover:!scale-105 hover:!bg-white w-fit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span className="ml-8 font-sans">→</span>
                </>
              )}
            </Button>

            <div className="flex flex-col sm:flex-row justify-between">
              <Button
                variant="link"
                onClick={() => {}} // TODO: implement logic for forgot password
                className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                type="button"
              >
                Forgot password?
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  router.push("/register");
                }}
                className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0 w-fit"
                type="button"
              >
                Don&apos;t have an account yet? Sign up here.
              </Button>
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
