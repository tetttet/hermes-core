"use client";

import React, { useId, useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "What is AI safety?",
    answer:
      "AI safety is the work of making advanced AI systems reliable, controllable, and beneficial for people.",
  },
  {
    question: "How does your AI help businesses?",
    answer:
      "It can automate workflows, answer customer questions, analyze data, and help teams work faster.",
  },
  {
    question: "Can I customize the AI for my company?",
    answer:
      "Yes. You can adapt the assistant to your company’s tone, documents, processes, and product data.",
  },
  {
    question: "Is my data protected?",
    answer:
      "Security and privacy are core parts of the system. Access control and safe data handling can be built in.",
  },
  {
    question: "How do I get started?",
    answer:
      "You can start by defining your main use case, uploading company knowledge, and connecting the assistant to your tools.",
  },
];

const MainFaqs = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqId = useId();

  return (
    <section className="w-full bg-[#f4f2eb] px-6 py-[58px] md:px-10 lg:px-0">
      <div className="mx-auto grid max-w-340 grid-cols-1 gap-12 lg:grid-cols-[350px_1fr] lg:gap-[86px]">
        <div>
          <h2 className="max-w-[330px] text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#111111] md:text-[24px]">
            At Hermes, we build AI to serve humanity’s long-term well-being.
          </h2>
        </div>

        <div className="pt-[12px]">
          {faqs.map((item, index) => (
            <div
              key={item.question}
              className="border-b border-[#d3d0c8] first:border-t"
            >
              <h3>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-8 py-[16px] text-left text-[16px] font-medium leading-none tracking-[-0.025em] text-[#111111]"
                  aria-expanded={openIndex === index}
                  aria-controls={`${faqId}-panel-${index}`}
                  onClick={() =>
                    setOpenIndex((currentIndex) =>
                      currentIndex === index ? -1 : index,
                    )
                  }
                >
                  <span>{item.question}</span>

                  <span
                    aria-hidden="true"
                    className="relative block h-5 w-5 shrink-0 text-[#6f6d68]"
                  >
                    <span className="absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    <span
                      className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 ease-out ${
                        openIndex === index ? "rotate-0" : "rotate-90"
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={`${faqId}-panel-${index}`}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-[760px] pb-[20px] pr-12">
                    <p className="font-serif text-[18px] leading-[1.35] tracking-[-0.02em] text-[#5f5c56]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainFaqs;
