import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/Auth";
import { useAuthModal } from "../contexts/AuthModalContext";

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] bg-now-background overflow-hidden flex items-center">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-now-primary/20 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-now-accent/10 rounded-full blur-[100px] translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-8 max-w-2xl"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-now-primary/10 text-now-primary text-sm font-semibold tracking-wider uppercase border border-now-primary/20">
                The Ultimate ServiceNow Platform
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
            >
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-now-accent">ServiceNow</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-now-muted leading-relaxed max-w-xl"
            >
              Learn ServiceNow from Beginner to Architect with structured roadmaps, notes, projects, certifications, and interview preparation.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/learn");
                } else {
                  openModal('signup');
                }
              }}
              className="px-8 py-4 text-base font-bold text-now-background bg-now-primary hover:bg-now-accent transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(0,192,139,0.3)] hover:shadow-[0_0_30px_rgba(0,192,139,0.5)] text-center hover:-translate-y-1"
            >
              Start Learning
            </button>
            <Link
              to="#"
              className="px-8 py-4 text-base font-bold text-white bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 rounded-full text-center hover:-translate-y-1"
            >
              Explore Roadmaps
            </Link>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-800/60"
          >
            {[
              { value: "33+", label: "Learning Modules" },
              { value: "1000+", label: "Notes" },
              { value: "100+", label: "Interview Qs" },
              { value: "50+", label: "Projects" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs text-now-muted uppercase tracking-wider font-semibold mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex-1 w-full max-w-2xl perspective-1000"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-now-card transform transition-transform hover:scale-[1.02] duration-500">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10"></div>
            <img
              src="/hero-graphic.png"
              alt="NowScripts Learning Dashboard Illustration"
              className="w-full h-auto object-cover relative z-0"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
