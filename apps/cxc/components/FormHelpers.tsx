/* eslint-disable @typescript-eslint/no-explicit-any */
import { ETHNICITY_OTHER_LABEL } from "@/constants/application";
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
  cn,
  Checkbox,
  FileTextIcon,
  UploadSimpleIcon,
  FormDescription,
} from "@uwdsc/ui";
import type { ComboboxOption } from "@uwdsc/ui";
import { ComponentProps, ReactNode, useEffect, useState } from "react";
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

interface FileUploadFieldOptions {
  label?: string;
  required?: boolean;
  existingFileName?: string;
  onFileChange?: (fileName: string) => void;
  onFileSelect?: (file: File | null) => void;
}

interface CheckboxGroupFieldOptions {
  label?: string;
  required?: boolean;
}

interface CheckboxFieldOptions {
  label: ReactNode;
  required?: boolean;
  description?: string;
}

// ============================================================================
// Styling Variants
// ============================================================================

const inputStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "!h-auto !text-base border-gray-100/80 !bg-black px-4.5 py-3.5 placeholder:text-gray-100/80 rounded-lg xl:px-6 xl:py-4.5",
  application:
    "!h-auto !border-0 !px-4.5 !py-4 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none transition-colors",
};

const selectTriggerStyles: Record<FormFieldVariant, string> = {
  default: "w-full",
  auth: "w-full !bg-black !h-auto !px-4.5 !py-3.5 !rounded-lg xl:px-6 xl:py-4.5 border border-gray-100/75 text-base",
  application:
    "w-full !h-auto !px-4.5 !py-4 !text-base !border-0 !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none",
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
    "!text-gray-200 focus:!bg-zinc-700 focus:!text-white hover:!bg-zinc-700 hover:!text-white transition-colors p-2",
};

const textareaStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "min-h-[6rem] max-h-[10rem] border-gray-100/80 bg-black px-4.5 py-3.5 placeholder:text-gray-100/80 rounded-lg xl:px-6 xl:py-4.5 !text-base",
  application:
    "!h-auto min-h-[15rem] sm:min-h-[8rem] !border-0 !border-b !rounded-none !px-3 !shadow-none !bg-cxc-input-bg transition-colors !text-base",
};

const comboboxStyles: Record<FormFieldVariant, string> = {
  default: "",
  auth: "!h-auto !text-base border-gray-100/80 !bg-black px-4.5 py-3.5 rounded-lg xl:px-6 xl:py-4.5",
  application:
    "!h-auto !border-0 !border-b-[2px] !rounded-none !px-4.5 !py-4 !shadow-none !bg-cxc-input-bg text-base font-normal",
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
  options: TextFieldOptions = {},
) => {
  const { label, required = false, variant = "default", inputProps } = options;

  const TextFieldComponent = ({
    field,
    fieldState,
  }: {
    field: ControllerRenderProps<T, any>;
    fieldState: { error?: { message?: string } };
  }) => (
    <FormItem>
      {label && (
        <FormLabel className={`font-normal mb-1`}>
          {label} {required && <span className="text-destructive">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Input
          {...field}
          {...inputProps}
          placeholder={placeholder}
          value={field.value ?? ""}
          className={cn(
            inputStyles[variant],
            variant === "application" &&
              !fieldState.error &&
              "focus-visible:ring-white/30 focus-visible:border-white",
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );

  TextFieldComponent.displayName = `TextField(${placeholder})`;

  return TextFieldComponent;
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
  fieldOptions: SelectFieldOptions = {},
) => {
  const { label, required = false, variant = "default" } = fieldOptions;

  const SelectFieldComponent = ({
    field,
  }: {
    field: ControllerRenderProps<T, any>;
  }) => (
    <FormItem>
      {label && (
        <FormLabel className={`font-normal mb-1`}>
          {label} {required && <span className="text-destructive">*</span>}
        </FormLabel>
      )}
      <Select 
        onValueChange={field.onChange} 
        value={field.value === undefined ? "" : field.value}
      >
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

  SelectFieldComponent.displayName = `SelectField(${placeholder})`;

  return SelectFieldComponent;
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
  options: TextAreaFieldOptions = {},
) => {
  const {
    label,
    required = false,
    variant = "default",
    textareaProps,
  } = options;

  const TextAreaFieldComponent = ({
    field,
  }: {
    field: ControllerRenderProps<T, any>;
  }) => {
    const maxLength = textareaProps?.maxLength;
    return (
      <>
        <FormItem>
          {label && (
            <FormLabel className={`font-normal mb-1 leading-relaxed text-base`}>
              {label} {required && <span className="text-destructive">*</span>}
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
          {maxLength && (
            <FormDescription className="text-sm text-muted-foreground text-right">
              {field.value?.length ?? 0} / {maxLength}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      </>
    );
  };

  TextAreaFieldComponent.displayName = `TextAreaField(${placeholder})`;

  return TextAreaFieldComponent;
};

/**
 * Render a radio group field for boolean values (Yes/No)
 *
 * @example
 * renderRadioField("Are you a UW student?", { required: true })
 */
export const renderRadioField = <T extends Record<string, any>>(
  label: string,
  options: RadioFieldOptions = {},
) => {
  const { required = true } = options;

  const RadioFieldComponent = ({
    field,
  }: {
    field: ControllerRenderProps<T, any>;
  }) => (
    <FormItem className="space-y-3">
      <FormLabel className="font-normal">
        {label} {required && <span className="text-destructive">*</span>}
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

  RadioFieldComponent.displayName = `RadioField(${label})`;

  return RadioFieldComponent;
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
  fieldOptions: ComboboxFieldOptions = {},
) => {
  const {
    label,
    required = false,
    variant = "default",
    searchPlaceholder = "Search...",
    emptyMessage = "No option found.",
  } = fieldOptions;

  const ComboboxFieldComponent = ({
    field,
  }: {
    field: ControllerRenderProps<T, any>;
  }) => (
    <FormItem>
      {label && (
        <FormLabel className={`font-normal mb-1`}>
          {label} {required && <span className="text-destructive">*</span>}
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

  ComboboxFieldComponent.displayName = `ComboboxField(${placeholder})`;

  return ComboboxFieldComponent;
};

/**
 * Render file upload field (for resumes, etc.)
 *
 * @example
 * renderFileUploadField("Upload your resume")
 */
export const renderFileUploadField = <T extends Record<string, any>>(
  accept: string,
  fieldOptions: FileUploadFieldOptions = {},
) => {
  const { label, required = false, existingFileName, onFileChange, onFileSelect } = fieldOptions;

  const FileUploadFieldComponent = ({
    field: { value, onChange, ...fieldProps },
  }: {
    field: ControllerRenderProps<T, any>;
  }) => {
    const [fileName, setFileName] = useState<string>(() => {
      if (value && typeof value === "object" && "name" in value) return value.name;
      if (typeof value === "string") return value;
      if (existingFileName) return existingFileName;
      return "";
    });

    useEffect(() => {
      if (value && typeof value === "object" && "name" in value) {
        setFileName(value.name);
        if (onFileChange) onFileChange(value.name);
      } else if (typeof value === "string") {
        setFileName(value);
        if (onFileChange) onFileChange(value);
      } else if (existingFileName) {
        setFileName(existingFileName);
      } else {
        setFileName("");
        if (onFileChange) onFileChange("");
      }
    }, [value]);

    return (
      <FormItem>
        {label && (
          <FormLabel className="font-normal">
            {" "}
            {label}{" "}
            {required && <span className="text-destructive">*</span>}{" "}
          </FormLabel>
        )}

        <FormControl>
          <div className="relative w-fit">
            <Input
              type="file"
              id={`file-upload-${fieldProps.name}`}
              className="hidden"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file) {
                  onChange(file);
                  setFileName(file.name);
                  if (onFileChange) onFileChange(file.name);
                  if (onFileSelect) onFileSelect(file);
                } else {
                  e.target.value = "";
                  onChange(undefined);
                  setFileName("");
                  if (onFileChange) onFileChange("");
                  if (onFileSelect) onFileSelect(null);
                }
              }}
              {...fieldProps}
            />
            <label
              htmlFor={`file-upload-${fieldProps.name}`}
              className={`flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer w-fit duration-50 mt-2 border border-white/50${fileName ? "" : " border-dashed "}`}
            >
              {fileName ? (
                <>
                  <FileTextIcon size={24} />
                  <span className="text-white">{fileName}</span>
                </>
              ) : (
                <div className="flex flex-row gap-3">
                  <UploadSimpleIcon size={24} />
                  Resume
                </div>
              )}
            </label>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  };

  FileUploadFieldComponent.displayName = `FileUploadField(${accept})`;

  return FileUploadFieldComponent;
};

/**
 * Render a single checkbox field for boolean values
 *
 * @example
 * renderCheckboxField({
 *   label: "I agree to the terms and conditions",
 *   required: true,
 *   description: "You must agree to continue"
 * })
 */
export const renderCheckboxField = <T extends Record<string, any>>(
  options: CheckboxFieldOptions,
) => {
  const { label, required = false, description } = options;

  const CheckboxFieldComponent = ({
    field,
  }: {
    field: ControllerRenderProps<T, any>;
  }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true}
          onCheckedChange={(checked) => {
            field.onChange(checked === true);
          }}
          className="!bg-transparent rounded-xs border-white data-[state=checked]:border-white w-4 h-4 hover:cursor-pointer mt-1"
        />
      </FormControl>

      <div className="space-y-1 leading-none">
        <FormLabel className="font-normal text-base hover:cursor-pointer">
          {label} {required && <span className="text-destructive">*</span>}
        </FormLabel>

        {description && (
          <FormDescription className="text-sm text-muted-foreground">
            {description}
          </FormDescription>
        )}
      </div>
    </FormItem>
  );

  CheckboxFieldComponent.displayName = `CheckboxField(${label})`;

  return CheckboxFieldComponent;
};

/**
 * Render multi-select checkbox group field
 *
 * @example
 * renderCheckboxGroupField("Prior Hackathon Experience", [
 *   "None", "Hacker", "Judge", "Mentor", "Organizer"
 * ])
 */
export const renderCheckboxGroupField = <T extends Record<string, any>>(
  options: string[],
  fieldOptions: CheckboxGroupFieldOptions = {},
) => {
  const { label, required = false } = fieldOptions;

  const CheckboxGroupFieldComponent = ({
    field,
  }: {
    field: ControllerRenderProps<T, any>;
  }) => (
    <FormItem>
      {label && (
        <FormLabel className="font-normal mb-2">
          {label} {required && <span className="text-destructive">*</span>}
        </FormLabel>
      )}

      <fieldset className="flex flex-col gap-3">
        {options.map((option) => (
          <FormItem key={option} className="flex items-center space-x-3 mb-0">
            <FormControl>
              <Checkbox
                checked={field.value?.includes(option)}
                onCheckedChange={(checked) => {
                  const isChecked = checked === true;
                  const newValue = Array.isArray(field.value)
                    ? [...field.value]
                    : [];
                  // Special handling for "Other \ None" option in checkbox groups
                  if (
                    option === "None" ||
                    option === ETHNICITY_OTHER_LABEL ||
                    option === "Prefer Not to Answer"
                  ) {
                    if (isChecked) {
                      // If checked, clear all other selections and only keep clicked one
                      field.onChange([option]);
                    } else {
                      // If unchecked, just remove it
                      const index = newValue.indexOf(option);
                      if (index > -1) {
                        newValue.splice(index, 1);
                      }
                      field.onChange(newValue);
                    }
                  } else {
                    // For non-Other/None options
                    if (isChecked) {
                      // Remove if it exists before adding new option
                      const otherIndex = newValue.findIndex(
                        (v) =>
                          v === "None" ||
                          v === ETHNICITY_OTHER_LABEL ||
                          v === "Prefer Not to Answer",
                      );
                      if (otherIndex > -1) {
                        newValue.splice(otherIndex, 1);
                      }
                      newValue.push(option);
                    } else {
                      const index = newValue.indexOf(option);
                      if (index > -1) {
                        newValue.splice(index, 1);
                      }
                    }
                    field.onChange(newValue);
                  }
                }}
                className="!bg-transparent rounded-xs border-white data-[state=checked]:border-white w-4 h-4 hover:cursor-pointer"
              />
            </FormControl>
            <FormLabel className="font-normal text-base hover:cursor-pointer">
              {option}
            </FormLabel>
          </FormItem>
        ))}
      </fieldset>
      <FormMessage />
    </FormItem>
  );

  CheckboxGroupFieldComponent.displayName = `CheckboxGroupField(${label || "CheckboxGroup"})`;

  return CheckboxGroupFieldComponent;
};
