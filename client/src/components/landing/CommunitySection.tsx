import { SectionWrapper, SectionHeader } from "./Shared";
import Explore from "../Explore";

export const CommunitySection = () => {
  return (
    <SectionWrapper className="bg-[#080d1e] !pt-12" id="community">
      <SectionHeader 
        headline="Developers Connect Together" 
        subheadline="Join the discussion. Share knowledge, read blogs from top architects, and post your own success stories." 
      />
      
      {/* Wrapper to handle the Explore component styling to match dark theme */}
      <div className="w-full bg-now-background border border-gray-800 rounded-3xl overflow-hidden p-4 md:p-8 shadow-2xl">
        <Explore />
      </div>
    </SectionWrapper>
  );
};
