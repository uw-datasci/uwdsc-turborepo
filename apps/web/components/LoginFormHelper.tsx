import { LoginFormValues } from "@/lib/schemas/login";
import { Input, FormItem, FormControl, FormMessage } from "@uwdsc/ui";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const renderLoginTextField = (
  placeholder: string,
  inputProps?: Partial<ComponentProps<typeof Input>>
) => {
  return ({
    field,
  }: {
    field: ControllerRenderProps<LoginFormValues, any>;
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
