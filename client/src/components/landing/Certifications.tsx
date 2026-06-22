import { SectionWrapper, SectionHeader, AnimatedCard } from "./Shared";

export const Certifications = () => {
  const certs = ["CSA", "CAD", "CIS-ITSM", "CIS-CSM", "CIS-HR"];

  return (
    <SectionWrapper className="bg-gradient-to-b from-now-background to-[#080d1e] border-t border-gray-800/50">
      <SectionHeader headline="Get Certified" subheadline="Follow our specialized tracks to ace your ServiceNow certifications on the first try." />
      <div className="flex flex-wrap justify-center gap-6">
        {certs.map((cert, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="flex flex-col items-center justify-center w-48 h-48 cursor-pointer group">
            <div className="w-20 h-20 rounded-full border-4 border-gray-800 flex items-center justify-center mb-4 group-hover:border-now-primary transition-colors">
              <span className="text-xl font-black text-white group-hover:text-now-primary transition-colors">{cert}</span>
            </div>
            <span className="text-sm font-semibold text-now-muted group-hover:text-white transition-colors">View Track</span>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
