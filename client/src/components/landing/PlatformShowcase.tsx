import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function PlatformShowcase() {
  const features = [
    "Interactive Roadmaps",
    "Learning Modules",
    "Certification Tracking",
    "Project Based Learning",
    "Interview Preparation"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-now-background to-[#050a15] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Realistic UI Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-3/5"
          >
            <div className="relative rounded-xl border border-gray-800 bg-[#080c17] shadow-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10]">
              {/* Window Header */}
              <div className="h-8 border-b border-gray-800 bg-[#0f1423] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              
              {/* UI Content (LMS Simulation) */}
              <div className="p-6 flex h-[calc(100%-2rem)]">
                {/* Sidebar */}
                <div className="w-48 border-r border-gray-800 pr-4 hidden md:block">
                  <div className="h-4 w-24 bg-gray-800 rounded mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-8 rounded flex items-center px-3 ${i === 1 ? 'bg-now-primary/10 border-l-2 border-now-primary' : ''}`}>
                        <div className={`h-2 w-full rounded ${i === 1 ? 'bg-now-primary/50' : 'bg-gray-800'}`}></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main Content Area */}
                <div className="flex-1 md:pl-6 flex flex-col">
                  <div className="h-8 w-1/3 bg-gray-800 rounded mb-4"></div>
                  <div className="h-4 w-2/3 bg-gray-800/50 rounded mb-8"></div>
                  
                  {/* Video/Content block */}
                  <div className="flex-1 bg-[#151b2b] rounded-lg border border-gray-800 flex items-center justify-center relative overflow-hidden group">
                    <div className="w-16 h-16 rounded-full bg-now-primary/20 flex items-center justify-center border border-now-primary/30 group-hover:scale-110 transition-transform cursor-pointer">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-now-primary border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glowing gradient effect behind mockup */}
              <div className="absolute -inset-10 bg-gradient-to-r from-now-primary/20 to-now-accent/20 blur-3xl -z-10 opacity-50 rounded-full"></div>
            </div>
          </motion.div>

          {/* Right: Feature Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/5"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Everything You Need To Master ServiceNow
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Stop hunting for tutorials. NowScripts provides a comprehensive, modern dashboard equipped with all the tools you need to succeed.
            </p>
            
            <div className="space-y-5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-now-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-now-primary" />
                  </div>
                  <span className="text-lg font-medium text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-12 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg">
              Explore Dashboard
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
