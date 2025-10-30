"use client";
import { GENERAL_FAQ } from "../../constants/home";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@uwdsc/ui/index";

export function Faq () {
      return (
    // emulate mx-container with padding instead bc of w-full
    <section className="container mx-auto px-16 flex flex-col md:flex-row items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-20">
      <h2 className="text-4xl font-light text-white md:text-5xl">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <Accordion type="multiple" className="!w-full">
        {GENERAL_FAQ.map((faq, i) => {
          const lines = faq.answer.split("\n").map((line, i) => (
            <p
              className={`leading-[1.75] font-light text-white text-sm md:text-base`}
              key={i}
            >
              {line}
            </p>
          ));
          return (
            <AccordionItem
              value={`item-${i}`}
              key={faq.id}
              className="!border-black !mb-4"
            >
              <AccordionTrigger
                className={`text-[#7CA3DE] items-center py-1 px-1 hover:no-underline hover:cursor-pointer font-light text-lg [&>svg]:text-[#7CA3DE] [&>svg]:size-10 [&>svg]:stroke-[1] [&[data-state=open]>svg]:text-black data-[state=open]:bg-[#A6C3EA] data-[state=open]:text-black`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {lines}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}