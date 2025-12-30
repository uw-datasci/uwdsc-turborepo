import { useEffect, useRef } from "react";
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
  const key = storageKey || `cxc_form_${fieldName}`;

  // Restore from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedValue = localStorage.getItem(key);
        if (savedValue) {
          const currentValue = form.getValues(fieldName);
          
          // Only restore if localStorage has a value and form field is empty
          if (currentValue == null || currentValue === "" || currentValue === undefined) {
            try {
              // Try to parse as JSON for complex types (arrays, objects)
              const parsed = JSON.parse(savedValue);
              form.setValue(fieldName, parsed, { shouldDirty: false });
            } catch {
              // If not JSON, use as string
              form.setValue(fieldName, savedValue as any, { shouldDirty: false });
            }
          }
        }
      } catch (error) {
        console.error(`Error restoring ${fieldName} from localStorage:`, error);
      }
      
      canPersistRef.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, [form, fieldName, key]);

  // Save to localStorage on change (only if field is valid)
  useEffect(() => {
    if (!canPersistRef.current) return;
    if (fieldValue === undefined) return;

    try {
      // Check if field has validation errors before saving
      const fieldState = form.getFieldState(fieldName);
    
      // Don't save invalid values to localStorage
      if (fieldState.error) {
        return;
      }

      if (fieldValue !== null && fieldValue !== "") {
        // Save as JSON for complex types, string for simple types
        const valueToSave = typeof fieldValue === "object" 
          ? JSON.stringify(fieldValue)
          : String(fieldValue);
        localStorage.setItem(key, valueToSave);
      } else {
        // Only remove if user actually interacted (field is dirty)
        const isDirty = !!(fieldState.isDirty);
        if (isDirty) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(`Error saving ${fieldName} to localStorage:`, error);
    }
  }, [fieldValue, form, fieldName, key]);
}

