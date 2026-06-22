import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader, AnimatedCard } from "./Shared";
import { BookOpen, Map, Users, Target, Briefcase } from "lucide-react";

export const TrustSection = () => {
  const stats = [
    { icon: <BookOpen className="w-6 h-6 text-now-primary" />, value: "1000+", label: "Learning Notes" },
    { icon: <Map className="w-6 h-6 text-now-primary" />, value: "33+", label: "Structured Modules" },
    { icon: <Target className="w-6 h-6 text-now-primary" />, value: "100+", label: "Interview Questions" },
    { icon: <Briefcase className="w-6 h-6 text-now-primary" />, value: "50+", label: "Real Projects" },
    { icon: <Users className="w-6 h-6 text-now-primary" />, value: "10k+", label: "Growing Community" },
  ];

  return (
    <SectionWrapper className="bg-gradient-to-b from-now-background to-[#080d1e] border-y border-gray-800/50">
      <SectionHeader headline="Trusted by Future ServiceNow Professionals" subheadline="Join thousands of developers mastering the Now Platform every day." />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <AnimatedCard key={i} delay={i * 0.1} className="flex flex-col items-center justify-center text-center py-8">
            <div className="mb-4 p-3 bg-now-primary/10 rounded-full">{stat.icon}</div>
            <h4 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h4>
            <p className="text-sm text-now-muted uppercase tracking-wider font-semibold">{stat.label}</p>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
