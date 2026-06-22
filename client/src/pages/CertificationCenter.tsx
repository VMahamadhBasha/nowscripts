import { motion } from "framer-motion";
import { ArrowRight, Award, Search, CheckCircle } from "lucide-react";
export default function CertificationCenter() {
  const certifications = [
    {
      title: "ServiceNow Certified System Administrator",
      abbr: "CSA",
      description: "The baseline certification for all ServiceNow professionals.",
      progress: 45,
      requiredModules: ["Fundamentals", "ITSM Module", "Administration"],
      color: "from-green-500 to-emerald-700"
    },
    {
      title: "Certified Application Developer",
      abbr: "CAD",
      description: "Prove your ability to build applications on the Now Platform.",
      progress: 10,
      requiredModules: ["JavaScript", "Glide APIs", "Advanced Development"],
      color: "from-blue-500 to-indigo-700"
    },
    {
      title: "Certified Implementation Specialist - ITSM",
      abbr: "CIS-ITSM",
      description: "Expertise in implementing IT Service Management applications.",
      progress: 0,
      requiredModules: ["ITSM Module", "CMDB", "Service Portal"],
      color: "from-purple-500 to-fuchsia-700"
    }
  ];

  return (
    <div className="bg-now-background min-h-screen text-white font-sans selection:bg-now-primary selection:text-black pb-20">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Certification Center</h1>
          <p className="text-xl text-now-muted max-w-2xl mx-auto">Track your progress towards official ServiceNow certifications based on your roadmap completion.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-now-card border border-gray-800 rounded-3xl overflow-hidden relative group hover:border-gray-600 transition-colors"
            >
              {/* Header Banner */}
              <div className={`h-32 bg-gradient-to-br ${cert.color} p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <span className="text-6xl font-black">{cert.abbr}</span>
                </div>
                <div className="relative z-10 flex justify-between items-end h-full">
                  <h2 className="text-2xl font-bold text-white w-2/3 leading-tight">{cert.title}</h2>
                  <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                    {cert.progress}%
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-now-muted mb-6">{cert.description}</p>
                
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Required Roadmaps</h4>
                <ul className="space-y-3 mb-8">
                  {cert.requiredModules.map((req, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${cert.progress > (j * 33) ? "bg-now-primary" : "bg-gray-700"}`}></div>
                      <span className={cert.progress > (j * 33) ? "text-gray-200" : "text-gray-500"}>{req}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-full font-bold transition-all ${cert.progress === 100 ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]" : "bg-gray-800 text-gray-400 cursor-not-allowed"}`}>
                  {cert.progress === 100 ? "Claim Badge" : "Complete Requirements"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
