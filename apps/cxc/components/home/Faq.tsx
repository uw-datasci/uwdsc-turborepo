"use client";
import { GENERAL_FAQ } from "../../constants/home";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@uwdsc/ui/index";

export function Faq() {
  return (
    // emulate mx-container with padding instead bc of w-full
    <section className="container mx-auto px-8 lg:px-16 flex flex-col md:flex-row md:items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-20 mb-10 md:mb-20">
      <div className="flex flex-col gap-12">
        <h2 className="text-4xl font-light text-white md:text-5xl">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="hidden md:block">
          <b>Have more questions?</b> Feel free to reach out to us at{" "}
          <a
            href="mailto:contact@uwdatascience.ca"
            rel="noopener noreferrer"
            className="underline text-[#7CA3DE]"
          >
            contact@uwdatascience.ca
          </a>{" "}
          or in the discord with any questions.{" "}
        </p>
      </div>

      <Accordion type="multiple" className="!w-full !m-0">
        {GENERAL_FAQ.map((faq, i) => {
          const lines = faq.answer.split("\n").map((line, i) => (
            <p
              className={`leading-[1.75] font-light text-white text-sm md:text-base ${i === 0 ? "pt-5" : ""}`}
              key={i}
            >
              {line}
            </p>
          ));
          return (
            <AccordionItem
              value={`item-${i}`}
              key={faq.id}
              className="!border-none !mb-4"
            >
              <AccordionTrigger
                className={`text-cxc-faq-text items-center py-1 px-2 hover:no-underline hover:cursor-pointer font-light text-lg [&>svg]:text-cxc-faq-text [&>svg]:size-10 [&>svg]:stroke-[1] [&[data-state=open]>svg]:text-black data-[state=open]:bg-cxc-faq-bg data-[state=open]:text-black`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pl-2">
                {lines}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <p className="block md:hidden ml-2">
        <b>Have more questions?</b> Feel free to reach out to us at{" "}
        <a
          href="mailto:contact@uwdatascience.ca"
          rel="noopener noreferrer"
          className="underline text-[#7CA3DE]"
        >
          contact@uwdatascience.ca
        </a>{" "}
        or in the discord with any questions.{" "}
      </p>
    </section>
  );
}
