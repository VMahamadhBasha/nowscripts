import { SectionWrapper, SectionHeader, AnimatedCard } from "./Shared";
import { CheckCircle2 } from "lucide-react";

export const WhatYouWillLearn = () => {
  const topics = [
    "ITIL", "Incident Management", "Service Catalog", "Workflow", 
    "ACL", "CMDB", "Discovery", "Integrations", 
    "Flow Designer", "Service Portal", "Knowledge Management", "Reporting"
  ];

  return (
    <SectionWrapper className="bg-now-background border-y border-gray-800/50">
      <SectionHeader headline="Everything You Need to Master ServiceNow" subheadline="Comprehensive coverage of all major Now Platform capabilities and modules." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map((topic, i) => (
          <AnimatedCard key={i} delay={i * 0.05} className="flex items-center gap-3 p-4">
            <CheckCircle2 className="w-5 h-5 text-now-primary flex-shrink-0" />
            <span className="font-semibold text-gray-200">{topic}</span>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
