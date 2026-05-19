"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SubHero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 25%"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.42]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 30px 90px rgba(0, 0, 0, 0.14)", "0 0 0 rgba(0, 0, 0, 0)"],
  );

  return (
    <section ref={sectionRef} className="relative bg-[#f4f2eb]">
      <div className="flex min-h-svh items-center justify-center overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="relative h-[min(78svh,760px)] min-h-[620px] w-full max-w-340">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden bg-[#121212]"
            style={{
              scale: bgScale,
              borderRadius,
              boxShadow,
              transformOrigin: "center center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 24%), radial-gradient(circle at 68% 72%, rgba(255,255,255,0.06), transparent 22%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%)",
                opacity: 0.95,
              }}
            />

            <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-position:center] [background-size:48px_48px]" />

            <div className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-white/6 bg-[#171717] lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_70%_78%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_55%)]" />
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-position:center] [background-size:48px_48px]" />
            </div>
          </motion.div>

          <div className="relative z-10 grid h-full items-stretch lg:grid-cols-[1.18fr_0.82fr]">
            <div className="flex items-center justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="max-w-[560px] text-center">
                <h2
                  className="text-[64px] leading-[0.9] tracking-[-0.05em] text-[#f8f5ef] sm:text-[84px]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Core
                  <br />
                  Hermes
                </h2>

                <p
                  className="mx-auto mt-6 max-w-120 text-[22px] leading-[1.25] text-[#ebe6de] sm:mt-7 sm:text-[28px]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Core Hermes is a powerful AI model designed to excel in
                  natural language processing tasks.
                </p>

                <button
                  type="button"
                  className="mt-8 inline-flex items-center justify-center rounded-[10px] bg-white px-6 py-3 text-base leading-none font-medium text-[#1d1d1d] transition-colors hover:bg-[#f0f0f0] sm:mt-10"
                >
                  Continue reading
                </button>
              </div>
            </div>

            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;