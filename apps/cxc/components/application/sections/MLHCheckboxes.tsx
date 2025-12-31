import { MLH_FIELDS } from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";
import { Form, FormField } from "@uwdsc/ui/index";
import AppSection from "../AppSection";
import { renderCheckboxField } from "@/components/FormHelpers";
import { UseFormReturn } from "react-hook-form";
import { useFormFieldPersistence } from "@/hooks/useFormFieldPersistence";

interface PriorHackExpProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export default function MLHCheckboxes({ form }: PriorHackExpProps) {
  // Persist MLH checkbox fields to localStorage
  useFormFieldPersistence(form, "mlh_agreed_code_of_conduct");
  useFormFieldPersistence(form, "mlh_authorize_info_sharing");
  useFormFieldPersistence(form, "mlh_email_opt_in");

  return (
    <Form {...form}>
      <AppSection
        label="MLH Checkboxes"
        description="We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared."
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name={MLH_FIELDS.mlh_agreed_code_of_conduct}
            render={renderCheckboxField({
              label: (
                <span>
                  I have read and agree to the{" "}
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    MLH Code of Conduct
                  </a>
                </span>
              ),
              required: true,
            })}
          />
          <FormField
            control={form.control}
            name={MLH_FIELDS.mlh_authorize_info_sharing}
            render={renderCheckboxField({
              label: (
                <span>
                  I authorize you to share my application/registration
                  information with Major League Hacking for event
                  administration, ranking, and MLH administration in-line with
                  the{" "}
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    MLH Privacy Policy
                  </a>
                  . I further agree to the terms of both the{" "}
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    MLH Contest Terms and Conditions
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    MLH Privacy Policy
                  </a>
                  .
                </span>
              ),
              required: true,
            })}
          />
          <FormField
            control={form.control}
            name={MLH_FIELDS.mlh_email_opt_in}
            render={renderCheckboxField({
              label:
                "I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.",
              required: false,
            })}
          />
        </div>
      </AppSection>
    </Form>
  );
}
