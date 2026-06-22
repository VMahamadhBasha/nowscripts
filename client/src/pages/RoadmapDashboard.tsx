import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { mockRoadmaps } from "../mockRoadmapData";

export default function RoadmapDashboard() {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner": return "bg-green-500/10 text-green-400";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400";
      case "Advanced": return "bg-orange-500/10 text-orange-400";
      case "Expert": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-8 h-8 text-white opacity-80" /> : <LucideIcons.BookOpen className="w-8 h-8 text-white opacity-80" />;
  };

  return (
    <div className="bg-now-background min-h-screen text-white font-sans selection:bg-now-primary selection:text-black pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">ServiceNow Learning Roadmaps</h1>
          <p className="text-xl text-now-muted max-w-3xl">The complete ServiceNow curriculum from Platform Fundamentals to Mainline Certifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRoadmaps.map((roadmap, i) => {
            const progress = i === 0 ? 100 : i === 1 ? 50 : 0;
            
            return (
              <Link to={roadmap.slug === "certification-path" ? "/certifications" : `/roadmaps/${roadmap.slug}`} key={roadmap.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-now-card border border-gray-800 rounded-3xl overflow-hidden h-full flex flex-col hover:border-gray-500 transition-all cursor-pointer shadow-lg"
                >
                  {/* Dynamic Gradient Banner */}
                  <div className={`h-32 bg-gradient-to-br ${roadmap.color} p-6 flex flex-col justify-between relative`}>
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      {getIcon(roadmap.iconName || "BookOpen")}
                    </div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                         {getIcon(roadmap.iconName || "BookOpen")}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-black/40 text-white backdrop-blur-sm`}>
                        {roadmap.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-white">{roadmap.title}</h3>
                    <p className="text-sm text-now-muted flex-1 mb-6">{roadmap.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 font-semibold bg-gray-800/50 p-3 rounded-xl mb-6">
                      <div className="flex flex-col">
                        <span className="text-gray-400">Modules</span>
                        <span className="text-white">{roadmap.modules.length}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white">{roadmap.estimatedDuration}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className={progress === 100 ? "text-now-primary" : "text-white"}>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${progress === 100 ? "bg-now-primary" : roadmap.color.split(' ')[0].replace('from-', 'bg-')}`} 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
