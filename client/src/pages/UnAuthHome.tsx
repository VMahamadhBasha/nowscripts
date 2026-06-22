import { useEffect } from "react";
import { useAppContext } from "../App";
import Hero from "../components/Hero";
import { BenefitsSection } from "../components/landing/BenefitsSection";
import { PlatformShowcase } from "../components/landing/PlatformShowcase";
import { WhyUsBento } from "../components/landing/WhyUsBento";
import { RoadmapProcessV2 } from "../components/landing/RoadmapProcessV2";
import { StatsCounters } from "../components/landing/StatsCounters";
import { LearningPathsV2 } from "../components/landing/LearningPathsV2";
import { ProjectsShowcaseV2 } from "../components/landing/ProjectsShowcaseV2";
import { TestimonialsV2 } from "../components/landing/TestimonialsV2";
import { FAQSectionV2 } from "../components/landing/FAQSectionV2";
import { FinalCTA } from "../components/landing/FinalCTA";
import { FooterV2 } from "../components/landing/FooterV2";

export default function UnAuthHome() {
  const { hideNavbar } = useAppContext();
  useEffect(() => {
    hideNavbar(true);
    document.title = "NowScripts - ServiceNow Learning";
    return () => hideNavbar(false);
  }, []);
  return (
    <div className="bg-now-background min-h-screen text-white font-sans selection:bg-now-primary selection:text-black">
      <Hero />
      <BenefitsSection />
      <PlatformShowcase />
      <WhyUsBento />
      <RoadmapProcessV2 />
      <StatsCounters />
      <LearningPathsV2 />
      <ProjectsShowcaseV2 />
      <TestimonialsV2 />
      <FAQSectionV2 />
      <FinalCTA />
      <FooterV2 />
    </div>
  );
}
