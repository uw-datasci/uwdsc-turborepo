"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Form,
  FormField,
  Input,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { getUserEmails } from "@/lib/api";
import { useFormFieldPersistence } from "@/hooks/useFormFieldPersistence";

interface TeamsProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function Teams({ form }: TeamsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmails, setUserEmails] = useState<
    Array<{ id: string; email: string; display_name: string | null }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Watch team_members to trigger re-renders when it changes
  const watchedTeamMembers = form.watch("team_members");
  const teamMembers = useMemo(
    () => watchedTeamMembers || [],
    [watchedTeamMembers],
  );

  // Debug: Log whenever teamMembers changes
  useEffect(() => {
    console.log("[Teams] teamMembers changed:", teamMembers);
    console.log(
      "[Teams] Form value from getValues:",
      form.getValues("team_members"),
    );
  }, [teamMembers, form]);

  // Persist team_members to localStorage
  useFormFieldPersistence(form, "team_members");

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDropdown = dropdownRef.current?.contains(target);
      const clickedInput = inputRef.current?.contains(target);

      console.log("[Teams] Click outside handler:", {
        clickedDropdown,
        clickedInput,
        target: (target as Element)?.tagName,
        targetClass: (target as Element)?.className,
      });

      // Don't close if clicking on a button inside the dropdown or the X button
      const isButton = (target as Element)?.tagName === "BUTTON";
      if (isButton && clickedDropdown) {
        console.log("[Teams] Clicked button inside dropdown - not closing");
        return;
      }

      if (!clickedDropdown && !clickedInput) {
        console.log("[Teams] Closing dropdown - clicked outside");
        setIsOpen(false);
      }
    };

    // Use a small delay to avoid closing immediately when opening
    const timer = setTimeout(() => {
      // Use capture phase but check for buttons
      document.addEventListener("click", handleClickOutside, true);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen]);

  // Fetch user emails on mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const result = await getUserEmails();
        console.log(
          "Fetched user emails:",
          result.emails.length,
          "First user:",
          result.emails[0],
        );
        setUserEmails(result.emails);
      } catch (error) {
        console.error("Failed to fetch user emails:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  // Filter emails based on search query
  const filteredEmails = useMemo(() => {
    const currentUserEmail = form.getValues("email");

    if (!searchQuery.trim()) {
      return userEmails.filter(
        (user) =>
          !teamMembers.includes(user.email) && user.email !== currentUserEmail,
      );
    }

    const query = searchQuery.toLowerCase();
    return userEmails.filter(
      (user) =>
        !teamMembers.includes(user.email) &&
        user.email !== currentUserEmail &&
        (user.email.toLowerCase().includes(query) ||
          user.display_name?.toLowerCase().includes(query)),
    );
  }, [searchQuery, userEmails, teamMembers, form]);

  const handleAddEmail = (email: string) => {
    console.log("[Teams] handleAddEmail called with:", email);
    const current = form.getValues("team_members") || [];
    const currentUserEmail = form.getValues("email");
    console.log(
      "[Teams] Current team members:",
      current,
      "Current user email:",
      currentUserEmail,
    );

    if (current.length >= 4) {
      console.log("[Teams] Already at max limit (4)");
      return;
    }
    if (email === currentUserEmail) {
      console.log("[Teams] Cannot add own email");
      return;
    }
    if (current.includes(email)) {
      console.log("[Teams] Email already in team members");
    } else {
      const newMembers = [...current, email];
      console.log("[Teams] Adding email, new members:", newMembers);
      form.setValue("team_members", newMembers, { shouldDirty: true });
      console.log(
        "[Teams] After setValue, form value:",
        form.getValues("team_members"),
      );
    }
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleRemoveEmail = (email: string) => {
    console.log("[Teams] handleRemoveEmail called with:", email);
    const current = form.getValues("team_members") || [];
    console.log("[Teams] Current team members before remove:", current);
    const newMembers = current.filter((e) => e !== email);
    console.log("[Teams] New team members after remove:", newMembers);
    form.setValue("team_members", newMembers, { shouldDirty: true });
    console.log(
      "[Teams] After setValue, form value:",
      form.getValues("team_members"),
    );
  };

  // Helper to format user display name
  const formatUserName = (user: {
    email: string;
    display_name: string | null;
  }) => {
    return user.display_name
      ? `${user.display_name} (${user.email})`
      : user.email;
  };

  return (
    <Form {...form}>
      <AppSection
        label="Team Members (optional)"
        description="Search and add team members by email (max 3). Only users who have already created an account will appear in the list."
      >
        <div className="flex flex-col gap-4">
          {/* Selected team members */}
          {teamMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((email) => {
                const user = userEmails.find((u) => u.email === email);
                const displayName = user ? formatUserName(user) : email;
                return (
                  <div
                    key={email}
                    className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg"
                  >
                    <span className="text-foreground">{displayName}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        console.log("[Teams] X button clicked for:", email);
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveEmail(email);
                      }}
                      onMouseDown={(e) => {
                        console.log("[Teams] X button mousedown for:", email);
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex-shrink-0"
                      aria-label={`Remove ${email}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Search input and dropdown */}
          <FormField
            control={form.control}
            name="team_members"
            render={() => (
              <FormItem>
                <FormLabel className="font-normal mb-1">
                  Search Team Members
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                      }}
                      onFocus={() => setIsOpen(true)}
                      placeholder={
                        teamMembers.length >= 3
                          ? "Maximum 3 team members reached"
                          : "Search by name or email..."
                      }
                      disabled={teamMembers.length >= 3}
                      className="!h-auto !border-0 !px-4.5 !py-4 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    {/* Dropdown */}
                    {isOpen && !isLoading && teamMembers.length < 4 && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {filteredEmails.length === 0 ? (
                          <div className="px-4 py-2 text-sm text-muted-foreground">
                            {searchQuery.trim()
                              ? "No matching users found"
                              : "Start typing to search for team members"}
                          </div>
                        ) : (
                          filteredEmails.slice(0, 10).map((user) => (
                            <button
                              key={user.id}
                              type="button"
                              onClick={(e) => {
                                console.log(
                                  "[Teams] Dropdown item clicked:",
                                  user.email,
                                );
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddEmail(user.email);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors text-sm cursor-pointer"
                            >
                              {formatUserName(user)}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </AppSection>
    </Form>
  );
}
