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
import { renderTextAreaFieldWithLabel as renderTextAreaField } from "@/components/FormHelpers";
import { GeneralTip } from "../banners/GeneralTip";

interface GeneralProps {
  readonly form: UseFormReturn<AppFormValues>;
}

const questions = [
  {
    name: "cxc_gain" as const,
    question: "What do you hope to gain from your time at CxC...?",
    placeholder: "Long Answer (500 char limit)",
  },
  {
    name: "silly_q" as const,
    question: "Silly Q Here",
    placeholder: "Long Answer (200 char limit)",
  },
];

export function General({ form }: GeneralProps) {
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
                render={renderTextAreaField(q.question, q.placeholder)}
              />
            ))}
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
