import { SectionWrapper, SectionHeader, AnimatedCard } from "./Shared";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    { name: "Sarah J.", role: "ServiceNow Developer", text: "NowScripts took me from zero knowledge to passing my CSA in just 4 weeks. The roadmap is incredibly well structured." },
    { name: "Michael T.", role: "ITSM Architect", text: "The interview prep section is a goldmine. I encountered 5 exact scenario questions in my recent interview and nailed it." },
    { name: "Priya R.", role: "Fresher", text: "Building the real-world projects gave me the confidence to apply for jobs. The community here is incredibly supportive!" },
  ];

  return (
    <SectionWrapper className="bg-now-background border-y border-gray-800/50">
      <SectionHeader headline="Success Stories" subheadline="See how NowScripts is helping developers accelerate their ServiceNow careers." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="flex flex-col">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-gray-300 italic mb-6 flex-1">"{test.text}"</p>
            <div>
              <h4 className="text-white font-bold">{test.name}</h4>
              <p className="text-xs text-now-primary uppercase tracking-wider">{test.role}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
