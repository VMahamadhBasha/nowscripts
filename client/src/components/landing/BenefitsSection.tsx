import { motion } from "framer-motion";
import { BookOpen, Award, Briefcase } from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    {
      title: "Structured Learning",
      description: "Follow a step-by-step ServiceNow roadmap from beginner to architect.",
      icon: <BookOpen className="w-8 h-8 text-now-primary" />,
    },
    {
      title: "Certification Focused",
      description: "Prepare for CSA, CAD, CIS and advanced mainline certifications.",
      icon: <Award className="w-8 h-8 text-now-accent" />,
    },
    {
      title: "Career Ready",
      description: "Hands-on projects, interview preparation, and real-world scenarios.",
      icon: <Briefcase className="w-8 h-8 text-now-primary" />,
    },
  ];

  return (
    <section className="py-24 bg-now-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why Learn With NowScripts
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The most comprehensive platform to accelerate your ServiceNow career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#0f172a]/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 hover:border-gray-600 transition-colors shadow-2xl"
            >
              <div className="bg-now-background border border-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
