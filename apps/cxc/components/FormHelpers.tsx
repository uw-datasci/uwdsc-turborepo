import {
  Input,
  Textarea,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  RadioGroup,
  RadioGroupItem,
  Combobox,
} from "@uwdsc/ui";
import type { ComboboxOption } from "@uwdsc/ui";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

/**
 * Generic Form Helpers
 *
 * These helpers provide flexible, reusable form field renderers that work with any form type.
 * They support different styling variants for different contexts (auth, registration, application forms).
 */

// ============================================================================
// Types
// ============================================================================

type FormFieldVariant = "default" | "auth" | "application";

interface TextFieldOptions {
  label?: string;
  required?: boolean;
  variant?: FormFieldVariant;
  inputProps?: Partial<ComponentProps<typeof Input>>;
}

interface SelectFieldOptions {
  label?: string;
  required?: boolean;
  variant?: FormFieldVariant;
}

interface TextAreaFieldOptions {
  label?: string;
  required?: boolean;
  variant?: FormFieldVariant;
  textareaProps?: Partial<ComponentProps<typeof Textarea>>;
}

interface RadioFieldOptions {
  required?: boolean;
}

interface ComboboxFieldOptions {
  label?: string;
  required?: boolean;
  variant?: FormFieldVariant;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

// ============================================================================
// Styling Variants
// ============================================================================

const inputStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "!h-auto !text-base border-gray-100/80 !bg-black px-4.5 py-3.5 placeholder:text-gray-100/80 rounded-lg xl:px-6 xl:py-4.5",
  application:
    "!border-0 !border-b !rounded-none !px-3 !shadow-none !bg-white/5 hover:!bg-white/10 focus:!bg-white/10 transition-colors",
};

const selectTriggerStyles: Record<FormFieldVariant, string> = {
  default: "w-full",
  auth: "w-full !bg-black !h-auto !px-4.5 !py-3.5 !rounded-lg xl:px-6 xl:py-4.5 border border-gray-100/75 text-base",
  application:
    "w-full !border-0 !border-b !rounded-none !px-3 !shadow-none !bg-white/5 hover:!bg-white/10",
};

const selectContentStyles: Record<FormFieldVariant, string> = {
  default: "bg-slate-700",
  auth: "bg-black !max-h-64 !overflow-y-auto border-gray-100/75",
  application: "!bg-zinc-900 !rounded-none !border-0 !shadow-lg",
};

const selectItemStyles: Record<FormFieldVariant, string> = {
  default:
    "text-slate-200 focus:bg-slate-600 focus:text-white hover:bg-slate-600 hover:text-white transition-colors",
  auth: "text-slate-200 focus:text-white hover:!bg-slate-600/50 hover:text-white rounded-sm px-3 py-3.5 hover:bg-grey4 xl:px-4 xl:py-4 text-base",
  application:
    "!text-gray-200 focus:!bg-zinc-700 focus:!text-white hover:!bg-zinc-700 hover:!text-white transition-colors",
};

const textareaStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "min-h-[6rem] max-h-[10rem] border-gray-100/80 bg-black px-4.5 py-3.5 placeholder:text-gray-100/80 rounded-lg xl:px-6 xl:py-4.5 !text-base",
  application:
    "!border-0 !border-b !rounded-none !px-3 !shadow-none !bg-white/5 hover:!bg-white/10 focus:!bg-white/10 transition-colors",
};

const comboboxStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "!h-auto !text-base border-gray-100/80 !bg-black px-4.5 py-3.5 rounded-lg xl:px-6 xl:py-4.5",
  application:
    "!border-0 !border-b !rounded-none !px-3 !shadow-none !bg-white/5 hover:!bg-white/10",
};

const comboboxContentStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "",
  application: "!rounded-none !border-0 !shadow-lg",
};

// ============================================================================
// Generic Form Field Renderers
// ============================================================================

/**
 * Render a text input field
 *
 * @example
 * // Auth form (no label, dark styling)
 * renderTextField("Email", { variant: "auth", inputProps: { type: "email" } })
 *
 * // Application form (with label and required indicator)
 * renderTextField("First Name", { label: "First Name", required: true })
 */
export const renderTextField = <T extends Record<string, any>>(
  placeholder: string,
  options: TextFieldOptions = {}
) => {
  const { label, required = false, variant = "default", inputProps } = options;

  return ({ field }: { field: ControllerRenderProps<T, any> }) => (
    <FormItem>
      {label && (
        <FormLabel className={variant === "application" ? "mb-2" : "mb-1"}>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Input
          {...field}
          {...inputProps}
          placeholder={placeholder}
          className={inputStyles[variant]}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

/**
 * Render a select dropdown field
 *
 * @example
 * // Auth form
 * renderSelectField("Select your faculty", ["Math", "Engineering"], { variant: "auth" })
 *
 * // Application form with label
 * renderSelectField("Select position", positions, { label: "Position", required: true })
 */
export const renderSelectField = <T extends Record<string, any>>(
  placeholder: string,
  options: string[],
  fieldOptions: SelectFieldOptions = {}
) => {
  const { label, required = false, variant = "default" } = fieldOptions;

  return ({ field }: { field: ControllerRenderProps<T, any> }) => (
    <FormItem>
      {label && (
        <FormLabel className={variant === "application" ? "mb-2" : "mb-1"}>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger className={selectTriggerStyles[variant]}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent className={selectContentStyles[variant]}>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className={selectItemStyles[variant]}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

/**
 * Render a textarea field
 *
 * @example
 * // Auth form
 * renderTextAreaField("Tell us about yourself", { variant: "auth" })
 *
 * // Application form with label
 * renderTextAreaField("Why do you want to join?", { label: "Motivation", required: true })
 */
export const renderTextAreaField = <T extends Record<string, any>>(
  placeholder: string,
  options: TextAreaFieldOptions = {}
) => {
  const {
    label,
    required = false,
    variant = "default",
    textareaProps,
  } = options;

  return ({ field }: { field: ControllerRenderProps<T, any> }) => (
    <FormItem>
      {label && (
        <FormLabel
          className={
            variant === "application"
              ? "mb-2 leading-relaxed"
              : "mb-1 leading-relaxed"
          }
        >
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Textarea
          placeholder={placeholder}
          {...textareaProps}
          {...field}
          className={textareaStyles[variant]}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

/**
 * Render a radio group field for boolean values (Yes/No)
 *
 * @example
 * renderRadioField("Are you a UW student?", { required: true })
 */
export const renderRadioField = <T extends Record<string, any>>(
  label: string,
  options: RadioFieldOptions = {}
) => {
  const { required = true } = options;

  return ({ field }: { field: ControllerRenderProps<T, any> }) => (
    <FormItem className="space-y-3">
      <FormLabel>
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => field.onChange(value === "true")}
          value={field.value === undefined ? undefined : String(field.value)}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="true" />
            </FormControl>
            <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="false" />
            </FormControl>
            <FormLabel className="font-normal cursor-pointer">No</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

/**
 * Render a combobox field with searchable dropdown
 *
 * @example
 * // Auth form
 * renderComboboxField("Select your program", programOptions, { variant: "auth" })
 *
 * // Application form with label
 * renderComboboxField("Select position", positionOptions, { label: "Position", required: true })
 */
export const renderComboboxField = <T extends Record<string, any>>(
  placeholder: string,
  options: ComboboxOption[],
  fieldOptions: ComboboxFieldOptions = {}
) => {
  const {
    label,
    required = false,
    variant = "default",
    searchPlaceholder = "Search...",
    emptyMessage = "No option found.",
  } = fieldOptions;

  return ({ field }: { field: ControllerRenderProps<T, any> }) => (
    <FormItem>
      {label && (
        <FormLabel className={variant === "application" ? "mb-2" : "mb-1"}>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Combobox
          options={options}
          value={field.value}
          onValueChange={field.onChange}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          emptyMessage={emptyMessage}
          className={comboboxStyles[variant]}
          contentClassName={comboboxContentStyles[variant]}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

// ============================================================================
// Named exports for compatibility with old usage patterns
// These work alongside the generic functions above
// ============================================================================

/**
 * Render text field for application forms (with label)
 */
export function renderTextFieldWithLabel<T extends Record<string, any>>(
  label: string,
  placeholder: string,
  inputProps?: Partial<ComponentProps<typeof Input>>
) {
  return renderTextField<T>(placeholder, {
    label,
    required: true,
    variant: "default",
    inputProps,
  });
}

/**
 * Render select field for application forms (with label)
 */
export function renderSelectFieldWithLabel<T extends Record<string, any>>(
  label: string,
  placeholder: string,
  options: string[],
  required: boolean = true
) {
  return renderSelectField<T>(placeholder, options, {
    label,
    required,
    variant: "application",
  });
}

/**
 * Render textarea field for application forms (with label)
 */
export function renderTextAreaFieldWithLabel<T extends Record<string, any>>(
  label: string,
  placeholder: string,
  textareaProps?: Partial<ComponentProps<typeof Textarea>>,
  required: boolean = true
) {
  return renderTextAreaField<T>(placeholder, {
    label,
    required,
    variant: "default",
    textareaProps,
  });
}

/**
 * Render radio field for application forms
 */
export function renderRadioFieldWithLabel<T extends Record<string, any>>(
  label: string
) {
  return renderRadioField<T>(label, { required: true });
}

/**
 * Render combobox field for application forms (with label)
 */
export function renderComboboxFieldWithLabel<T extends Record<string, any>>(
  label: string,
  placeholder: string,
  options: ComboboxOption[],
  required: boolean = true,
  searchPlaceholder?: string,
  emptyMessage?: string
) {
  return renderComboboxField<T>(placeholder, options, {
    label,
    required,
    variant: "application",
    searchPlaceholder,
    emptyMessage,
  });
}
