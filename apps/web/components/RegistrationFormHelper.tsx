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
  Textarea,
} from "@uwdsc/ui";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const renderRegistrationTextField = (
  placeholder: string,
  inputProps?: Partial<ComponentProps<typeof Input>>
) => {
  return ({
    field,
  }: {
    field: ControllerRenderProps<RegistrationFormValues, any>;
  }) => (
    <FormItem>
      <FormControl>
        <Input
          {...field}
          {...inputProps}
          placeholder={placeholder}
          className="!h-auto !text-base border-gray-100/80 !bg-black px-4.5 py-3.5 placeholder:text-gray-100/80 rounded-lg xl:px-6 xl:py-4.5"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const renderRegistrationSelectField = (
  placeholder: string,
  options: string[]
) => {
  return ({
    field,
  }: {
    field: ControllerRenderProps<RegistrationFormValues, any>;
  }) => (
    <FormItem>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger className="w-full !bg-black !h-auto !px-4.5 !py-3.5 !rounded-lg xl:px-6 xl:py-4.5 border border-gray-100/75 text-base">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent className="bg-black !max-h-64 !overflow-y-auto border-gray-100/75">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="text-slate-200 focus:text-white hover:!bg-slate-600/50 hover:text-white rounded-sm px-3 py-3.5 hover:bg-grey4 xl:px-4 xl:py-4 text-base"
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

export const renderRegistrationTextAreaField = (
  placeholder: string,
  textareaProps?: Partial<ComponentProps<typeof Textarea>>
) => {
  return ({
    field,
  }: {
    field: ControllerRenderProps<RegistrationFormValues, any>;
  }) => (
    <FormItem>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          {...textareaProps}
          {...field}
          className="min-h-[6rem] max-h-[10rem] border-gray-100/80 bg-black px-4.5 py-3.5 placeholder:text-gray-100/80 rounded-lg xl:px-6 xl:py-4.5 !text-base"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
