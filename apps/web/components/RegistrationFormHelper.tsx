import { RegistrationFormValues } from "@/lib/schemas/register";
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
} from "@uwdsc/ui";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const renderRegistrationTextField = (
  label: string,
  placeholder: string,
  inputProps?: Partial<ComponentProps<typeof Input>>,
  required: boolean = false
) => {
  return ({
    field,
  }: {
    field: ControllerRenderProps<RegistrationFormValues, any>;
  }) => (
    <FormItem>
      <FormLabel className="mb-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </FormLabel>
      <FormControl>
        <input
          {...field}
          {...inputProps}
          placeholder={placeholder}
          className="transition-300 w-full rounded-md border border-gray-100/75  bg-black px-4.5 py-3.5 text-white outline-none placeholder:text-gray-100/80 focus:border-white xl:rounded-lg xl:px-6 xl:py-4.5 undefined"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const renderRegistrationSelectField = (
  label: string,
  placeholder: string,
  options: string[],
  required: boolean = true
) => {
  return ({
    field,
  }: {
    field: ControllerRenderProps<RegistrationFormValues, any>;
  }) => (
    <FormItem>
      <FormLabel className="mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger className="w-full !bg-black !h-auto !px-4.5 !py-3.5 rounded-md xl:!rounded-lg xl:px-6 xl:py-4.5 border border-gray-100/75 text-md">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent className="bg-black !max-h-64 !overflow-y-auto border-gray-100/75">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="text-slate-200 focus:!bg-slate-600/50 focus:text-white hover:!bg-slate-600/50 hover:text-white rounded-sm px-3 py-3.5 hover:bg-grey4 xl:px-4 xl:py-4 text-md"
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
