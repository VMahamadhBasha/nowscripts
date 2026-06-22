import { motion } from "framer-motion";
import { BookOpen, Map, Target, Users, PlaySquare, Code } from "lucide-react";

export function WhyUsBento() {
  return (
    <section className="py-24 bg-[#020617] relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why Students Prefer NowScripts
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to succeed, all in one connected ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 auto-rows-[200px]">
          
          {/* Card 1: Modules (Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-now-primary/20 to-[#0f172a] border border-now-primary/30 rounded-3xl p-8 relative overflow-hidden group hover:border-now-primary/60 transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
              <PlaySquare className="w-48 h-48 text-now-primary" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="mb-4">
                <span className="text-6xl font-black text-white">50+</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Learning Modules</h3>
              <p className="text-gray-300 text-lg max-w-sm">From ServiceNow basics to advanced development and architecture.</p>
            </div>
          </motion.div>

          {/* Card 2: Career Paths */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-[#0f172a] border border-gray-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4 z-10">
              <div className="w-12 h-12 bg-now-accent/20 rounded-xl flex items-center justify-center">
                <Map className="w-6 h-6 text-now-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white">5 Certification Paths</h3>
            </div>
            <p className="text-gray-400 z-10">CSA, CAD, CIS-ITSM, and Developer pathways clearly mapped out.</p>
          </motion.div>

          {/* Card 3: Real Projects */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 flex flex-col justify-center hover:border-gray-600 transition-colors"
          >
            <Code className="w-8 h-8 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real Projects</h3>
            <p className="text-gray-400 text-sm">Build portfolio-ready applications.</p>
          </motion.div>

          {/* Card 4: Interview Prep */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 flex flex-col justify-center hover:border-gray-600 transition-colors"
          >
            <Target className="w-8 h-8 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Interview Prep</h3>
            <p className="text-gray-400 text-sm">100+ scenario-based Q&A.</p>
          </motion.div>

          {/* Card 5: Notes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-[#0f172a] border border-gray-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between z-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">1000+ Notes</h3>
                </div>
                <p className="text-gray-400">Comprehensive documentation and quick references.</p>
              </div>
              <div className="text-5xl font-black text-gray-800 hidden sm:block">📝</div>
            </div>
          </motion.div>

          {/* Card 6: Community */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 bg-[#0f172a] border border-gray-800 rounded-3xl p-8 flex flex-col justify-center hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Community Driven Learning</h3>
            </div>
            <p className="text-gray-400">Learn together with thousands of other ServiceNow enthusiasts.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
