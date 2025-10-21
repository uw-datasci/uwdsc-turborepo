import { GENERAL_FAQ } from "@/constants/home";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@uwdsc/ui/index";

export default function FAQ() {
  return (
    // emulate mx-container with padding instead bc of w-full
    <section className="px-7 sm:px-9 md:px-12 xl:max-w-[1200px] mb-24 lg:mb-52 gap-8 md:gap-14 grid lg:grid-cols-[4fr_5fr] w-full">
      <h2 className="text-4xl font-bold text-white md:text-5xl">
        Frequently Asked Questions
      </h2>
      <Accordion type="multiple" className="!w-full">
        {GENERAL_FAQ.map((faq, i) => {
          const lines = faq.answer.split("\n").map((line, i) => (
            <p
              className={`leading-[1.75] text-[var(--grey1)] text-sm md:text-base`}
              key={i}
            >
              {line}
            </p>
          ));
          return (
            <AccordionItem
              value={`item-${i}`}
              key={faq.id}
              className="!border-[var(--grey3)]"
            >
              <AccordionTrigger
                className={`hover:no-underline hover:cursor-pointer font-bold text-lg ${i !== 0 ? "py-5 lg:py-7" : "pb-5 pt-0 lg:pb-7"} `}
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
