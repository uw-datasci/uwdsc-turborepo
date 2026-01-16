"use client";
import { GENERAL_FAQ } from "../../constants/home";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@uwdsc/ui/index";

// Helper function to parse text and render with links
function parseTextWithLinks(text: string) {
  // Match markdown-style links [text](url) and plain URLs
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // First, handle markdown-style links
  const textWithMarkdown = text.replace(
    markdownLinkRegex,
    (_, linkText, url) => {
      return `__LINK__${url}__TEXT__${linkText}__ENDLINK__`;
    },
  );

  // Split by our placeholder
  const segments = textWithMarkdown.split(
    /(__LINK__[^_]+__TEXT__[^_]+__ENDLINK__)/,
  );

  return segments.map((segment, index) => {
    if (segment.startsWith("__LINK__")) {
      const urlMatch = segment.match(
        /__LINK__([^_]+)__TEXT__([^_]+)__ENDLINK__/,
      );
      if (urlMatch) {
        const [, url, linkText] = urlMatch;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#7CA3DE] hover:text-[#9BB8E5] transition-colors"
          >
            {linkText}
          </a>
        );
      }
    }

    // Handle plain URLs in remaining text
    const urlParts = segment.split(urlRegex);
    return urlParts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={`${index}-${i}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#7CA3DE] hover:text-[#9BB8E5] transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  });
}

export function Faq() {
  return (
    // emulate mx-container with padding instead bc of w-full
    <section className="container mx-auto px-8 lg:px-16 flex flex-col md:flex-row md:items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-20 mb-10 md:mb-20 py-20">
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
              {parseTextWithLinks(line)}
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
