// components/auth/LoginForm.tsx
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
import { renderLoginTextField } from "../LoginFormHelper";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Check if this is a successful login with unverified email
        if (responseData.error === "email_not_verified") {
          router.push("/verify-email");
        } else if (responseData.session && responseData.user) {
          if (responseData.user.email_confirmed_at) {
            // Email verified, redirect to dashboard
            router.push("/me");
          } else {
            // Email not verified, redirect to verify email page
            router.push("/verify-email");
          }
        } else {
          // Fallback: refresh and let middleware handle
          router.refresh();
        }
      } else {
        // Handle error response
        setAuthError(
          responseData.error || responseData.message || "Login failed"
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={renderLoginTextField("Email (ex. slchow@uwaterloo.ca)", {
            type: "email",
          })}
        />

        <FormField
          control={form.control}
          name="password"
          render={renderLoginTextField("Password", {
            type: "password",
          })}
        />

        {/* Show Authentication error */}
        {authError && <div className="text-red-400 text-base">{authError}</div>}
        <div>
          <Button
            size="lg"
            disabled={isLoading}
            type="submit"
            className="w-full rounded-md xl:rounded-lg bg-gradient-purple text-lg font-bold !h-auto py-2.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                Signing in
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-start mt-1">
            <Button
              variant="link"
              size="sm"
              onClick={() => {}} // TODO: implement logic for forgot password
              className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0"
              type="button"
            >
              Forgot password?
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                router.push("/register");
              }}
              className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0"
              type="button"
            >
              Not a member yet? Join here.
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
