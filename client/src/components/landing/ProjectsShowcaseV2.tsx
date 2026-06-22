import { motion } from "framer-motion";
import { Clock, PlayCircle } from "lucide-react";

export function ProjectsShowcaseV2() {
  const projects = [
    {
      title: "Incident Management App",
      desc: "Build a custom scoped application for handling IT incidents.",
      diff: "Beginner",
      diffColor: "bg-green-500/20 text-green-400",
      time: "2 Hours",
      tags: ["Tables", "Forms", "UI Policies"]
    },
    {
      title: "Employee Onboarding",
      desc: "Automate the new hire process with Order Guides and Workflows.",
      diff: "Intermediate",
      diffColor: "bg-yellow-500/20 text-yellow-400",
      time: "4 Hours",
      tags: ["Flow Designer", "Catalog"]
    },
    {
      title: "Asset Management Tracker",
      desc: "Track hardware lifecycle stages and assignments.",
      diff: "Intermediate",
      diffColor: "bg-yellow-500/20 text-yellow-400",
      time: "3 Hours",
      tags: ["CMDB", "Business Rules"]
    },
    {
      title: "HR Service Portal",
      desc: "Create a stunning portal for HR requests using custom widgets.",
      diff: "Advanced",
      diffColor: "bg-orange-500/20 text-orange-400",
      time: "6 Hours",
      tags: ["Service Portal", "AngularJS"]
    },
    {
      title: "Service Catalog Matrix",
      desc: "Complex catalog items with multi-variable sets and scripting.",
      diff: "Advanced",
      diffColor: "bg-orange-500/20 text-orange-400",
      time: "5 Hours",
      tags: ["Client Scripts", "Catalog"]
    },
    {
      title: "CMDB Implementation",
      desc: "Setup Discovery schedules and map application services.",
      diff: "Expert",
      diffColor: "bg-red-500/20 text-red-400",
      time: "8 Hours",
      tags: ["Discovery", "Service Mapping"]
    }
  ];

  return (
    <section className="py-24 bg-[#020617] relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Build Real ServiceNow Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Stop watching. Start building. Add these enterprise-grade projects to your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 hover:border-gray-600 transition-all flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${proj.diffColor}`}>
                  {proj.diff}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                  <Clock className="w-4 h-4" /> {proj.time}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-now-primary transition-colors">
                {proj.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6 flex-1">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map(tag => (
                  <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <PlayCircle className="w-4 h-4" /> Preview Project
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
