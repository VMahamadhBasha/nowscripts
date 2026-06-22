import { motion } from "framer-motion";
import { Clock, BarChart, Book, Award, ArrowRight } from "lucide-react";

export function LearningPathsV2() {
  const paths = [
    {
      title: "CSA Track",
      desc: "Certified System Administrator",
      duration: "4 Weeks",
      difficulty: "Beginner",
      modules: 12,
      cert: "CSA",
      color: "from-blue-500/20 to-blue-900/20",
      border: "border-blue-500/30 hover:border-blue-500/80"
    },
    {
      title: "CAD Track",
      desc: "Certified Application Developer",
      duration: "6 Weeks",
      difficulty: "Intermediate",
      modules: 15,
      cert: "CAD",
      color: "from-green-500/20 to-green-900/20",
      border: "border-green-500/30 hover:border-green-500/80"
    },
    {
      title: "ITSM Track",
      desc: "IT Service Management Professional",
      duration: "5 Weeks",
      difficulty: "Intermediate",
      modules: 10,
      cert: "CIS-ITSM",
      color: "from-purple-500/20 to-purple-900/20",
      border: "border-purple-500/30 hover:border-purple-500/80"
    },
    {
      title: "Developer Track",
      desc: "Advanced Platform Development",
      duration: "8 Weeks",
      difficulty: "Advanced",
      modules: 18,
      cert: "Advanced Developer",
      color: "from-orange-500/20 to-orange-900/20",
      border: "border-orange-500/30 hover:border-orange-500/80"
    },
    {
      title: "Architect Track",
      desc: "Master Architecture & Design",
      duration: "10 Weeks",
      difficulty: "Expert",
      modules: 20,
      cert: "CMA / CTA",
      color: "from-red-500/20 to-red-900/20",
      border: "border-red-500/30 hover:border-red-500/80"
    }
  ];

  return (
    <section className="py-24 bg-now-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Targeted curriculums designed to get you certified and hired faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {paths.map((path, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-[#080c17] bg-gradient-to-br ${path.color} border ${path.border} rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] group`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">{path.title}</h3>
                <p className="text-sm text-gray-400">{path.desc}</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{path.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <BarChart className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{path.difficulty}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Book className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{path.modules} Modules</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Goal: {path.cert}</span>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-white/10 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black transition-colors">
                Start Path <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
