import { motion } from "framer-motion";
import { 
  BookOpen, Server, Users, Code, Activity, Database, 
  Layers, Braces, Award, Briefcase, ArrowRight, ArrowDown 
} from "lucide-react";

export function RoadmapProcessV2() {
  const steps = [
    { title: "Fundamentals", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "ITSM", icon: Users, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { title: "Administration", icon: Server, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "Development", icon: Code, color: "text-pink-400", bg: "bg-pink-400/10" },
    { title: "Workflow", icon: Activity, color: "text-rose-400", bg: "bg-rose-400/10" },
    { title: "CMDB", icon: Database, color: "text-orange-400", bg: "bg-orange-400/10" },
    { title: "Integrations", icon: Layers, color: "text-amber-400", bg: "bg-amber-400/10" },
    { title: "Adv. Development", icon: Braces, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { title: "Certifications", icon: Award, color: "text-now-primary", bg: "bg-now-primary/10" },
    { title: "Get Hired", icon: Briefcase, color: "text-now-accent", bg: "bg-now-accent/10" },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden z-10 border-t border-b border-gray-800">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Your ServiceNow Journey
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A clear, step-by-step path from absolute beginner to employed professional.
          </p>
        </div>

        {/* Desktop Horizontal Flow */}
        <div className="hidden lg:flex flex-wrap justify-center gap-y-12 items-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="flex items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className={`w-20 h-20 rounded-2xl ${step.bg} border border-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-gray-500 transition-all shadow-lg relative`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 ${step.bg} blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10`}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors text-center w-24">
                    {step.title}
                  </span>
                </motion.div>

                {!isLast && (
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="w-8 xl:w-12 flex justify-center text-gray-700 pb-8"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet Vertical Flow */}
        <div className="flex lg:hidden flex-col items-center gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`w-[200px] p-4 rounded-2xl ${step.bg} border border-gray-800 flex items-center gap-4`}
                >
                  <Icon className={`w-8 h-8 ${step.color}`} />
                  <span className="font-bold text-white text-sm">{step.title}</span>
                </motion.div>
                {!isLast && (
                  <div className="h-8 flex items-center justify-center text-gray-700 py-2">
                    <ArrowDown className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
