import { SectionWrapper, SectionHeader, AnimatedCard, PrimaryButton } from "./Shared";
import { MessageSquare, HelpCircle, Video, FileCheck } from "lucide-react";

export const InterviewPrep = () => {
  const items = [
    { icon: <HelpCircle className="w-8 h-8 text-now-primary mb-4" />, title: "100+ Questions", desc: "Curated questions from real ServiceNow interviews." },
    { icon: <MessageSquare className="w-8 h-8 text-now-accent mb-4" />, title: "Scenario Based", desc: "Complex scenario-based questions to test your practical knowledge." },
    { icon: <Video className="w-8 h-8 text-blue-400 mb-4" />, title: "Mock Interviews", desc: "Practice with peer-to-peer mock interview sessions." },
    { icon: <FileCheck className="w-8 h-8 text-purple-400 mb-4" />, title: "Real Time Use Cases", desc: "Break down real enterprise requirements and solutions." },
  ];

  return (
    <SectionWrapper className="bg-[#080d1e]">
      <SectionHeader headline="Crack Your Next ServiceNow Interview" subheadline="Stop memorizing answers. Start understanding the core concepts and real-world scenarios." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {items.map((item, i) => (
          <AnimatedCard key={i} delay={i * 0.1}>
            {item.icon}
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-now-muted">{item.desc}</p>
          </AnimatedCard>
        ))}
      </div>
      <div className="text-center">
        <PrimaryButton text="Start Interview Prep" to="/interview-prep" />
      </div>
    </SectionWrapper>
  );
};
