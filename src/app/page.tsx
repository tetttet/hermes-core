import AiCards from "@/components/sections/ai-cards";
import MainFaqs from "@/components/sections/main-faqs";
import MainHero from "@/components/sections/main-hero";
import SubHero from "@/components/sections/sub-hero";
import UseCasesBlock from "@/components/sections/use-cases-block";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex-1">
      <MainHero />
      <SubHero />
      <AiCards />
      <UseCasesBlock />
      <MainFaqs />
    </div>
  );
};

export default HomePage;
