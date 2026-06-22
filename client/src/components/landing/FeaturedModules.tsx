import { SectionWrapper, SectionHeader, AnimatedCard, PrimaryButton } from "./Shared";

export const FeaturedModules = () => {
  const modules = [
    { title: "Cloud Computing Basics", level: "Beginner", duration: "45 mins", progress: 0 },
    { title: "ITIL Foundation", level: "Beginner", duration: "60 mins", progress: 0 },
    { title: "ServiceNow Introduction", level: "Beginner", duration: "30 mins", progress: 0 },
    { title: "User Administration", level: "Beginner", duration: "90 mins", progress: 0 },
    { title: "Service Catalog", level: "Intermediate", duration: "120 mins", progress: 0 },
    { title: "Workflow", level: "Advanced", duration: "180 mins", progress: 0 },
    { title: "ACL", level: "Advanced", duration: "90 mins", progress: 0 },
    { title: "Knowledge Management", level: "Intermediate", duration: "60 mins", progress: 0 },
  ];

  return (
    <SectionWrapper className="bg-gradient-to-b from-[#080d1e] to-now-background">
      <SectionHeader headline="Featured Learning Modules" subheadline="Jump straight into our most popular, hands-on training modules." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {modules.map((mod, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="flex flex-col h-full cursor-pointer hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-now-muted uppercase tracking-wider">{mod.level}</span>
              <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-2 py-1 rounded-md">⏱ {mod.duration}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4 flex-1">{mod.title}</h3>
            
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-2">
              <div className="bg-now-primary h-1.5 rounded-full" style={{ width: `${mod.progress}%` }}></div>
            </div>
            <p className="text-xs text-now-muted font-medium text-right">{mod.progress}% Complete</p>
          </AnimatedCard>
        ))}
      </div>
      <div className="text-center">
        <PrimaryButton text="View All Modules" to="/learn" />
      </div>
    </SectionWrapper>
  );
};
