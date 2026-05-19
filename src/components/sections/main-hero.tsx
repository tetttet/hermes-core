"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MainHero = () => {
  const [isImageRevealed, setIsImageRevealed] = useState(false);
  const [revealedImageWidth, setRevealedImageWidth] = useState(0);
  const imageFrameRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const imageFrame = imageFrameRef.current;

    if (!imageFrame) {
      return;
    }

    const updateImageWidth = () => {
      setRevealedImageWidth(imageFrame.getBoundingClientRect().width);
    };

    updateImageWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateImageWidth();
    });

    resizeObserver.observe(imageFrame);

    const revealFrame = window.requestAnimationFrame(() => {
      setIsImageRevealed(true);
    });

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(revealFrame);
    };
  }, []);

  const copyTextClasses =
    "m-0 text-sm leading-5 md:text-base md:leading-6 lg:text-base lg:leading-6";

  return (
    <section className="w-full bg-[#f4f2eb] text-[#212121] max-md:-mb-2.5">
      <div className="flex min-h-[90svh] flex-col justify-between">
        <div aria-hidden="true" />

        <div className="flex min-h-[65vh] flex-col justify-between max-md:min-h-[65vh]">
          <div className="flex justify-between gap-5 pl-5 md:pl-7 lg:pl-12">
            <div>
              <h1
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                className="m-0 text-[40px] leading-[0.9] font-semibold uppercase tracking-[-1.4px] sm:text-[50px] md:text-[66px] lg:text-[88px] 2xl:text-[106px]"
              >
                we create
                <br />
                <span className="flex items-center gap-[0.08em]">
                  <span
                    className="inline-flex shrink-0 overflow-hidden align-middle transition-[width] delay-[200ms] duration-800 ease-[cubic-bezier(0.86,0,0.07,0.995)]"
                    style={{
                      width: isImageRevealed
                        ? `${revealedImageWidth}px`
                        : "0px",
                    }}
                  >
                    <span
                      ref={imageFrameRef}
                      className="inline-flex shrink-0 items-center"
                    >
                      <Image
                        src="/icon.png"
                        alt="Hermes hero preview"
                        width={120}
                        height={120}
                        priority
                        className="h-[0.72em] w-auto translate-y-[0.02em] rounded-[0.12em] object-cover"
                      />
                    </span>
                  </span>

                  <span>open-source</span>
                </span>
                hermes model
              </h1>
            </div>
          </div>

          <div className="flex flex-col border-t border-t-[#212121]/30 py-5">
            <div
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="flex flex-col items-start gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-[30px] lg:px-[50px]"
            >
              <div className="w-full md:w-1/2">
                <p className={copyTextClasses}>
                  Building the future of AI, together with the community
                </p>
              </div>

              <div className="flex w-full flex-col items-start gap-5 md:w-1/2 md:flex-row md:justify-between">
                <div>
                  <p className={copyTextClasses}>
                    Create several models with{" "}
                    <span className="font-bold">one</span> core
                  </p>
                </div>

                <div className="group flex items-center gap-1.25">
                  <Link
                    href="/contact"
                    className={`${copyTextClasses} inline-flex items-center justify-center rounded-full border border-[#212121]/60 px-3 py-[3px] uppercase text-[#212121] no-underline transition-colors duration-300 group-hover:border-[#212121] group-hover:bg-[#212121] group-hover:text-[#f1f1f1]`}
                  >
                    Try Hermes
                  </Link>

                  <span
                    className="hidden h-8.25 w-8.25 items-center justify-center rounded-full border border-[#212121]/60 text-[#212121] transition-colors duration-300 group-hover:border-[#212121] group-hover:bg-[#212121] group-hover:text-[#f1f1f1] md:flex"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-none stroke-current [stroke-width:1.25]"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
