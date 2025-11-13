"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Form,
  FormField,
} from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";
import { MessageSquare } from "lucide-react";
import { renderTextAreaField } from "@/components/FormHelpers";
import { GeneralTip } from "../banners/GeneralTip";
import { questions } from "@/constants/application";

interface CxCAppProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function CxCApp({ form }: CxCAppProps) {
  return (
    <div className="space-y-6">
      <GeneralTip />

      <Form {...form}>
        <Card className="border-white/20 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-300" />
              General Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q) => (
              <FormField
                key={q.name}
                control={form.control}
                name={q.name}
                render={renderTextAreaField(q.placeholder, {
                  label: q.question,
                  required: true,
                  variant: "application",
                })}
              />
            ))}
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
