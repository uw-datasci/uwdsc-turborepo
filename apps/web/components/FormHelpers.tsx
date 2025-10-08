import { AppFormValues } from "@/lib/schemas/application";
import {
  Input,
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
} from "@uwdsc/ui";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

/**
 * Helper function to render form fields
 */
export const renderTextField = (
  label: string,
  placeholder: string,
  inputProps?: Partial<ComponentProps<typeof Input>>
) => {
  return ({ field }: { field: ControllerRenderProps<AppFormValues, any> }) => (
    <FormItem>
      <FormLabel className="mb-1">
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...inputProps} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

/**
 * Helper function to render select fields
 */
export const renderSelectField = (
  label: string,
  placeholder: string,
  options: string[]
) => {
  return ({ field }: { field: ControllerRenderProps<AppFormValues, any> }) => (
    <FormItem>
      <FormLabel className="mb-1">
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent className="bg-slate-700">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="text-slate-200 focus:bg-slate-600 focus:text-white hover:bg-slate-600 hover:text-white transition-colors"
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
 * Helper function to render radio group fields for boolean values
 */
export const renderRadioField = (label: string) => {
  return ({ field }: { field: ControllerRenderProps<AppFormValues, any> }) => (
    <FormItem className="space-y-3">
      <FormLabel>
        {label} <span className="text-red-500">*</span>
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
