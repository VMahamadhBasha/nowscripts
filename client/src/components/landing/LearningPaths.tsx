import { SectionWrapper, SectionHeader, AnimatedCard, PrimaryButton } from "./Shared";

export const LearningPaths = () => {
  const paths = [
    { title: "CSA Certification", steps: "Beginner → Admin → CSA", difficulty: "Beginner", duration: "4 Weeks", modules: 12 },
    { title: "CAD Certification", steps: "JavaScript → Glide APIs → CAD", difficulty: "Intermediate", duration: "6 Weeks", modules: 15 },
    { title: "ITSM Specialist", steps: "Incident → Problem → Change", difficulty: "Intermediate", duration: "5 Weeks", modules: 10 },
    { title: "Service Portal Developer", steps: "Widgets → Catalog → Portal", difficulty: "Advanced", duration: "8 Weeks", modules: 14 },
    { title: "Architect Path", steps: "CSA → CAD → ITSM → Architect", difficulty: "Expert", duration: "12 Weeks", modules: 25 },
  ];

  return (
    <SectionWrapper className="bg-[#080d1e]">
      <SectionHeader headline="Choose Your Learning Path" subheadline="Structured roadmaps designed to take you from absolute beginner to certified expert." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="flex flex-col h-full">
            <div className="mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                path.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                path.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                path.difficulty === 'Advanced' ? 'bg-orange-500/10 text-orange-400' :
                'bg-red-500/10 text-red-400'
              }`}>{path.difficulty}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{path.title}</h3>
            <p className="text-now-primary text-sm font-semibold mb-6 flex-1">{path.steps}</p>
            
            <div className="flex items-center justify-between text-sm text-now-muted border-t border-gray-800 pt-4 mb-6">
              <span>⏱ {path.duration}</span>
              <span>📚 {path.modules} Modules</span>
            </div>
            <PrimaryButton text="Explore Path" to="/learn" />
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
