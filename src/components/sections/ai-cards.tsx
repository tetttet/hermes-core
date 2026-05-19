import Link from "next/link";
import React from "react";

type ReleaseCard = {
  title: string;
  description: string;
  date: string;
  status: string;
  link?: string;
  buttonText: string;
};

const releases: ReleaseCard[] = [
  {
    title: "Hermes",
    description:
      "Hermes is our most powerful model yet, designed to handle complex reasoning tasks with ease. It can process and generate text, code, video, and images, making it a versatile tool for a wide range of applications.",
    date: "February 19, 2026",
    status: "Access with API",
    link: "#",
    buttonText: "Reach Hermes",
  },
  {
    title: "Cyller",
    description:
      "Cyller is our latest AI model, designed to help to control AI systems. Main job is to monitor and manage the behavior of other AI models, ensuring they operate within safe and ethical boundaries.",
    date: "February 19, 2026",
    status: "Access with API",
    link: "#",
    buttonText: "Try Cyller",
  },
  {
    title: "Atlas",
    description:
      "The Atlas model is designed to excel at understanding and generating human language. It can process and generate text, making it ideal for tasks such as content creation, summarization, and language translation.",
    date: "February 19, 2026",
    status: "Try in Playground",
    link: "#",
    buttonText: "Read the story",
  },
];

const AiCards = () => {
  return (
    <section className="w-full bg-[#f4f2eb] px-6 pb-12 pt-0 md:px-10 lg:px-0 pt-24">
      <div className="mx-auto max-w-340">
        <h2 className="mb-8 text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#111111]">
          Latest releases <span className="underline">AI Models</span>
        </h2>

        <div className="grid grid-cols-1 gap-[37px] md:grid-cols-2 xl:grid-cols-3">
          {releases.map((item) => (
            <article
              key={item.title}
              className="flex min-h-120 flex-col rounded-[18px] bg-[#e8dece] px-[38px] pb-[38px] pt-[31px]"
            >
              <div>
                <h3 className="mb-[9px] text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#111111]">
                  {item.title}
                </h3>

                <p className="max-w-[390px] font-serif text-[18px] leading-[1.25] tracking-[-0.025em] text-[#111111]">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="border-y border-[#d3c9ba]">
                  <div className="flex items-center justify-between border-b border-[#d3c9ba] py-[18px]">
                    <span className="text-[16px] font-semibold uppercase tracking-[0.08em] text-[#111111]">
                      Date
                    </span>
                    <span className="text-[16px] font-normal text-[#111111]">
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-[18px]">
                    <span className="text-[16px] font-semibold uppercase tracking-[0.08em] text-[#111111]">
                      Status
                    </span>
                    <Link href={item.link || "#"}>
                      <span className="hover:underline text-[16px] font-normal text-[#111111]">
                        {item.status}
                      </span>
                    </Link>
                  </div>
                </div>

                <a
                  href="#"
                  className="mt-[38px] inline-flex h-[43px] items-center gap-[13px] rounded-[8px] bg-[#111111] px-[20px] text-[16px] font-normal leading-none text-white transition-opacity hover:opacity-85"
                >
                  {item.buttonText}
                  <span className="text-[24px] leading-none">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiCards;
