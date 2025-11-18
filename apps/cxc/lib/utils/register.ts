import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/lib/schemas/register";

/**
 * Checks if the registration form is valid
 * @param form - The react-hook-form instance
 * @returns boolean indicating if the form is valid
 */
export const isRegistrationFormValid = (
    form: UseFormReturn<RegistrationFormValues>,
): boolean => {
    const { errors } = form.formState;

    // Get current field values
    const firstName = form.watch("first_name");
    const lastName = form.watch("last_name");
    const email = form.watch("email");
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    // Validate all fields have no errors and have values
    const validDetails =
        !errors.first_name &&
        !!firstName?.trim() &&
        !errors.last_name &&
        !!lastName?.trim();

    const validAccount =
        !errors.email &&
        !!email?.trim() &&
        !errors.password &&
        !!password &&
        !errors.confirmPassword &&
        !!confirmPassword;

    return validDetails && validAccount;
};

