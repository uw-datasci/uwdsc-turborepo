"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { getUserEmails } from "@/lib/api/users";
import { useFormFieldPersistence } from "@/hooks/useFormFieldPersistence";

interface TeamsProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function Teams({ form }: TeamsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmails, setUserEmails] = useState<Array<{ id: string; email: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const teamMembers = form.watch("team_members") || [];

  // Persist team_members to localStorage
  useFormFieldPersistence(form, "team_members");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user emails on mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const result = await getUserEmails();
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
    if (!searchQuery.trim()) {
      return userEmails.filter((user) => !teamMembers.includes(user.email));
    }

    const query = searchQuery.toLowerCase();
    return userEmails.filter(
      (user) =>
        !teamMembers.includes(user.email) &&
        user.email.toLowerCase().includes(query),
    );
  }, [searchQuery, userEmails, teamMembers]);

  const handleAddEmail = (email: string) => {
    const current = form.getValues("team_members") || [];
    const currentUserEmail = form.getValues("email");
    if (current.length >= 3) {
      // Already at max limit
      return;
    }
    if (email === currentUserEmail) {
      return;
    }
    if (!current.includes(email)) {
      form.setValue("team_members", [...current, email], { shouldDirty: true });
    }
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleRemoveEmail = (email: string) => {
    const current = form.getValues("team_members") || [];
    form.setValue(
      "team_members",
      current.filter((e) => e !== email),
      { shouldDirty: true },
    );
  };

  return (
    <Form {...form}>
      <AppSection
        label="Team Members"
        description={`Search and add team members by email (optional, max ${teamMembers.length}/4)`}
      >
        <div className="flex flex-col gap-4">
          {/* Selected team members */}
          {teamMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20"
                >
                  <span className="text-sm text-foreground">{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search input and dropdown */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={
                teamMembers.length >= 4
                  ? "Maximum 4 team members reached"
                  : "Search for team members by email..."
              }
              disabled={teamMembers.length >= 4}
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
                      ? "No matching emails found"
                      : "Start typing to search for team members"}
                  </div>
                ) : (
                  filteredEmails.slice(0, 10).map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleAddEmail(user.email)}
                      className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                    >
                      {user.email}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hidden form field for validation */}
        <FormField
          control={form.control}
          name="team_members"
          render={() => null}
        />
      </AppSection>
    </Form>
  );
}

