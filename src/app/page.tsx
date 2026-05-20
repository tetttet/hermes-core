import AiCards from "@/components/sections/ai-cards";
import CompaniesSection from "@/components/sections/companies-section";
import MainCta from "@/components/sections/main-cta";
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
      <CompaniesSection />
      <MainFaqs />
      <MainCta />
    </div>
  );
};

export default HomePage;
