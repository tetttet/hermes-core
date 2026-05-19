"use client";

import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const foundersGrotesk = localFont({
  src: "../../../public/main-hero/FoundersGrotesk.woff",
  weight: "600",
  display: "swap",
});

const neueMontreal = localFont({
  src: "../../../public/main-hero/NeueMontreal.woff",
  weight: "400",
  display: "swap",
});

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
    "m-0 text-base leading-6 min-[1025px]:text-lg min-[1025px]:leading-[26px]";

  return (
    <section className="w-full min-h-svh bg-[#f1f1f1] text-[#212121] max-[768px]:-mb-2.5">
      <div className="flex min-h-svh flex-col justify-between">
        <div aria-hidden="true" />

        <div className="flex min-h-[75vh] flex-col justify-between max-[768px]:min-h-[85vh]">
          <div className="flex justify-between gap-5 pl-5 min-[769px]:pl-7.5 min-[1025px]:pl-12.5">
            <div>
              <h1
                className={`${foundersGrotesk.className} m-0 text-[64px] leading-11.25 font-semibold uppercase tracking-[-1.3px] min-[401px]:text-[74px] min-[401px]:leading-[50px] min-[769px]:text-[100px] min-[769px]:leading-[75px] min-[1025px]:text-[130px] min-[1025px]:leading-[98px] min-[1491px]:text-[150px] min-[1491px]:leading-[100px]`}
              >
                we create
                <br />
                <span className="flex items-center gap-[5px]">
                  <span
                    className="inline-flex shrink-0 overflow-hidden leading-[130px] transition-[width] delay-[200ms] duration-800 ease-[cubic-bezier(0.86,0,0.07,0.995)]"
                    style={{ width: isImageRevealed ? `${revealedImageWidth}px` : "0px" }}
                  >
                    <span ref={imageFrameRef} className="inline-flex shrink-0">
                      <Image
                        src="/icon.png"
                        alt="Hermes hero preview"
                        width={120}
                        height={120}
                        priority
                        className="mt-[10px] h-10 w-auto rounded-[10px] object-cover min-[401px]:h-[45px] min-[769px]:h-[63px] min-[1025px]:h-[50px] min-[1491px]:mt-[15px] min-[1491px]:h-[95px]"
                      />
                    </span>
                  </span>
                  <span>open-source</span>
                </span>
                hermes model
              </h1>
            </div>
          </div>

          <div className="flex min-h-[22vh] flex-col gap-[30px] border-t border-t-[#212121]/30 py-5 max-[768px]:mb-20">
            <div
              className={`${neueMontreal.className} flex flex-col items-start gap-5 px-5 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between min-[769px]:px-[30px] min-[1025px]:px-[50px]`}
            >
              <div className="w-full min-[769px]:w-1/2">
                <p className={copyTextClasses}>
                  Building the future of AI, together with the community
                </p>
              </div>

              <div className="flex w-full flex-col items-start gap-5 min-[769px]:w-1/2 min-[769px]:flex-row min-[769px]:justify-between">
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
                    className="hidden h-8.25 w-8.25 items-center justify-center rounded-full border border-[#212121]/60 text-[#212121] transition-colors duration-300 group-hover:border-[#212121] group-hover:bg-[#212121] group-hover:text-[#f1f1f1] min-[769px]:flex"
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
