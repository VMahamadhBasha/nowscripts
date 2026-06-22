import { SectionWrapper, SectionHeader, AnimatedCard } from "./Shared";
import { Code2 } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    { title: "Incident Management App", difficulty: "Beginner", category: "App Engine" },
    { title: "Leave Management", difficulty: "Beginner", category: "Custom App" },
    { title: "Employee Onboarding", difficulty: "Intermediate", category: "Order Guide" },
    { title: "Asset Management", difficulty: "Intermediate", category: "ITAM" },
    { title: "HR Portal", difficulty: "Advanced", category: "Service Portal" },
    { title: "ITSM Portal", difficulty: "Advanced", category: "Service Portal" },
  ];

  return (
    <SectionWrapper className="bg-now-background border-y border-gray-800/50">
      <SectionHeader headline="Build Real Projects" subheadline="Apply what you learn by building real-world enterprise applications." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="group cursor-pointer flex items-start gap-4">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-now-primary/20 transition-colors">
              <Code2 className="w-6 h-6 text-now-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  proj.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                  proj.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-orange-500/10 text-orange-400'
                }`}>{proj.difficulty}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 uppercase tracking-wider">{proj.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-now-primary transition-colors">{proj.title}</h3>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
