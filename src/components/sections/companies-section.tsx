"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CaseItem = {
  title: string;
  tag: string;
  logo: string;
  href?: string;
  image?: string;
};

const cases: CaseItem[] = [
  {
    title: "HermesAI: Revolutionizing customer support with AI agents",
    tag: "Access with API",
    href: "#",
    logo: "Hermes",
    image: "/icon.png",
  },
  {
    title: "Moving from intent-based bots to proactive AI agents",
    tag: "Access via Atlas platform",
    href: "https://4pupils.vercel.app/ai/homemade/atlas",
    logo: "Atlas",
    image: "/images/case-2.jpg",
  },
  {
    title:
      "Dublios: AI agents for creating personalized video content at scale",
    tag: "Access via Dublios platform",
    href: "#",
    logo: "Dublios",
    image: "/images/ai/dublios.png",
  },
  {
    title: "Data-driven beauty and creativity with HermesAI",
    tag: "Access with API",
    href: "#",
    logo: "Cyller",
    image: "/images/case-4.jpg",
  },
];

const CompaniesSection = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (title: string) => {
    setFailedImages((current) => {
      if (current[title]) {
        return current;
      }

      return {
        ...current,
        [title]: true,
      };
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#f4f2eb] px-6 py-[58px] md:px-10 lg:px-0">
      <div className="mx-auto max-w-340">
        <div className="mb-8 sm:mb-10">
          <h2 className="max-w-[440px] text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#111111]">
            The AI platform behind thousands of companies
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cases.map((item) => {
            const showLogoFallback = !item.image || failedImages[item.title];

            return (
              <article key={item.title} className="group cursor-pointer">
                <div className="relative aspect-[1.04/1] overflow-hidden rounded-[18px] bg-[#e8e2d6] shadow-[0_18px_55px_rgba(20,16,10,0.08)] transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_26px_70px_rgba(20,16,10,0.13)]">
                  {!showLogoFallback && item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        onError={() => handleImageError(item.title)}
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                      <div className="select-none text-center text-[#111111]">
                        <div className="text-[26px] font-semibold leading-none tracking-[-0.04em] sm:text-[30px] lg:text-[32px]">
                          {item.logo}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <h3 className="max-w-[95%] text-[18px] font-medium leading-[1.22] tracking-[-0.025em] text-[#111111]">
                    {item.title}
                  </h3>

                  <Link
                    href={item.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="mt-2 text-[18px] font-medium leading-none tracking-[-0.025em] text-[#5f5c56] hover:underline">
                      {item.tag}
                    </p>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
