import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  applicationDefaultValues,
  type ApplicationFormValues,
} from "@/lib/schemas/application";

interface UseApplicationFormOptions {
  onSubmit: (data: ApplicationFormValues) => void | Promise<void>;
  defaultValues?: Partial<ApplicationFormValues>;
}

interface UseApplicationFormReturn {
  form: UseFormReturn<ApplicationFormValues>;
  handleSubmit: (data: ApplicationFormValues) => void | Promise<void>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

/**
 * Custom hook for managing application form state and validation
 *
 * @param options - Configuration options for the form
 * @returns Form instance and helper methods
 *
 * @example
 * ```tsx
 * const { form, handleSubmit, isSubmitting } = useApplicationForm({
 *   onSubmit: async (data) => {
 *     await submitToAPI(data);
 *   }
 * });
 * ```
 */
export function useApplicationForm({
  onSubmit,
  defaultValues,
}: UseApplicationFormOptions): UseApplicationFormReturn {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      ...applicationDefaultValues,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: ApplicationFormValues) => {
    await onSubmit(data);
  };

  return {
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
  };
}
