import React from "react";

const MainCta = () => {
  return (
    <div className="bg-[#f4f2eb] px-6 py-[58px] md:px-10 lg:px-0">
      <div className="mx-auto max-w-340 bg-[#fdfbf6] rounded-lg">
        <div className="flex flex-col items-center gap-6 px-6 py-[58px] md:px-10 lg:px-0">
          <h2 className="text-center max-w-2xl text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#111111] md:text-[44px]">
            Guides and resources for integrating AI into your business
          </h2>

          <a
            href="https://forms.gle/9ZtL7n5sHj3mXoVv6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif rounded-full bg-[#212121] px-6 py-3 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#212121]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2"
          >
            Join our family
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainCta;
