import { useEffect, useRef, useCallback } from "react";
import { UseFormReturn, FieldPath } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

/**
 * Hook to persist form field values to localStorage
 * Automatically saves on change and restores on mount
 *
 * @param form - React Hook Form instance
 * @param fieldName - Name of the field to persist
 * @param storageKey - localStorage key (defaults to field name)
 */
export function useFormFieldPersistence<T extends FieldPath<AppFormValues>>(
  form: UseFormReturn<AppFormValues>,
  fieldName: T,
  storageKey?: string,
) {
  const fieldValue = form.watch(fieldName);
  const canPersistRef = useRef(false);
  const wasClearedByUserRef = useRef(false);
  const previousValueRef = useRef<unknown>(undefined);
  const key = storageKey || `cxc_form_${fieldName}`;

  // Helper function to restore from localStorage
  const restoreFromStorage = useCallback(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        const currentValue = form.getValues(fieldName);

        // Debug logging for hackathons_attended and team_members
        if (
          fieldName === "hackathons_attended" ||
          fieldName === "team_members"
        ) {
          console.log(`[${fieldName}] Restore attempt:`, {
            savedValue,
            currentValue,
            key,
          });
        }

        // Only restore if localStorage has a value and form field is empty
        // Check for null, undefined, empty string, or empty array
        const isEmpty =
          currentValue == null ||
          currentValue === "" ||
          currentValue === undefined ||
          (Array.isArray(currentValue) && currentValue.length === 0);

        if (isEmpty) {
          // For string enum fields like hackathons_attended, don't parse as JSON
          // JSON.parse("1") would return number 1, but we need string "1" to match Select options
          const isStringEnumField =
            fieldName === "hackathons_attended" ||
            fieldName === "year_of_study" ||
            fieldName === "tshirt_size" ||
            fieldName === "dietary_restrictions" ||
            fieldName === "gender" ||
            fieldName === "country_of_residence";

          if (isStringEnumField) {
            if (fieldName === "hackathons_attended") {
              console.log(
                `[${fieldName}] Restoring string value (no JSON parse):`,
                savedValue,
              );
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form.setValue(fieldName, savedValue as any, {
              shouldDirty: false,
              shouldValidate: false,
            });
          } else {
            try {
              // Try to parse as JSON for complex types (arrays, objects)
              const parsed = JSON.parse(savedValue);
              if (
                fieldName === "hackathons_attended" ||
                fieldName === "team_members"
              ) {
                console.log(`[${fieldName}] Restoring parsed value:`, parsed);
              }
              form.setValue(fieldName, parsed, {
                shouldDirty: false,
                shouldValidate: false,
              });
            } catch {
              // If not JSON, use as string
              if (fieldName === "hackathons_attended") {
                console.log(
                  `[${fieldName}] Restoring string value:`,
                  savedValue,
                );
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              form.setValue(fieldName, savedValue as any, {
                shouldDirty: false,
                shouldValidate: false,
              });
            }
          }

          // Verify the value was set
          const afterValue = form.getValues(fieldName);
          if (
            fieldName === "hackathons_attended" ||
            fieldName === "team_members"
          ) {
            console.log(`[${fieldName}] Value after restore:`, afterValue);
          }
        } else {
          if (
            fieldName === "hackathons_attended" ||
            fieldName === "team_members"
          ) {
            console.log(
              `[${fieldName}] Skipping restore - field not empty:`,
              currentValue,
            );
          }
        }
      } else {
        if (
          fieldName === "hackathons_attended" ||
          fieldName === "team_members"
        ) {
          console.log(
            `[${fieldName}] No saved value in localStorage for key:`,
            key,
          );
        }
      }
    } catch (error) {
      console.error(`Error restoring ${fieldName} from localStorage:`, error);
    }
  }, [form, fieldName, key]);

  // Restore from localStorage ONLY on mount (page refresh)
  // This should happen exactly once, not while user is typing
  useEffect(() => {
    // Use a longer timeout to ensure form.reset() has completed
    const timer = setTimeout(() => {
      restoreFromStorage();
      canPersistRef.current = true;
      // Initialize previous value after restore
      previousValueRef.current = form.getValues(fieldName);
    }, 500); // Increased timeout to allow form.reset() to complete

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  // Track when user explicitly clears a field
  useEffect(() => {
    if (!canPersistRef.current) return;

    const currentValue = form.getValues(fieldName);
    const previousValue = previousValueRef.current;

    // If field had a value and now it's empty, user cleared it
    const wasCleared =
      previousValue !== undefined &&
      previousValue !== null &&
      previousValue !== "" &&
      (currentValue === "" ||
        currentValue === null ||
        currentValue === undefined);

    if (wasCleared) {
      wasClearedByUserRef.current = true;
      localStorage.removeItem(key);
    }

    previousValueRef.current = currentValue;
  }, [fieldValue, form, fieldName, key]);

  // Save to localStorage on change (only if field is valid)
  useEffect(() => {
    if (!canPersistRef.current) return;
    // Allow saving even if value is undefined initially (will be handled by shouldSave check)

    try {
      // Check if field has validation errors before saving
      const fieldState = form.getFieldState(fieldName);

      // Don't save invalid values to localStorage
      if (fieldState.error) {
        return;
      }

      // Check if value should be saved (not null, not empty string, not empty array)
      // Note: "0" is a valid value for enum fields, so we need to check for it explicitly
      // Exception: team_members can be empty array (0 team members is valid)
      const shouldSave =
        fieldValue !== null &&
        fieldValue !== "" &&
        fieldValue !== undefined &&
        !(
          Array.isArray(fieldValue) &&
          fieldValue.length === 0 &&
          fieldName !== "team_members"
        );

      if (shouldSave) {
        // Save as JSON for complex types (arrays, objects), string for simple types
        const valueToSave =
          typeof fieldValue === "object" && fieldValue !== null
            ? JSON.stringify(fieldValue)
            : String(fieldValue);

        // Debug logging for hackathons_attended and team_members
        if (
          fieldName === "hackathons_attended" ||
          fieldName === "team_members"
        ) {
          console.log(`[${fieldName}] Saving to localStorage:`, {
            fieldValue,
            valueToSave,
            key,
          });
        }

        localStorage.setItem(key, valueToSave);
      } else {
        // For team_members, allow empty arrays - remove from localStorage
        if (
          fieldName === "team_members" &&
          Array.isArray(fieldValue) &&
          fieldValue.length === 0
        ) {
          localStorage.removeItem(key);
          return;
        }

        // Only remove if user actually interacted (field is dirty)
        const isDirty = !!fieldState.isDirty;
        if (isDirty) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(`Error saving ${fieldName} to localStorage:`, error);
    }
  }, [fieldValue, form, fieldName, key]);
}
