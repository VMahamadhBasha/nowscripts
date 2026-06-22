import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const SectionWrapper = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => {
  return (
    <section id={id} className={`py-20 lg:py-32 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader = ({ headline, subheadline }: { headline: string, subheadline?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{headline}</h2>
      {subheadline && <p className="text-lg text-now-muted max-w-2xl mx-auto">{subheadline}</p>}
    </motion.div>
  );
};

export const AnimatedCard = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={`bg-now-card border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,192,139,0.15)] hover:border-now-primary/50 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const PrimaryButton = ({ text, to }: { text: string, to: string }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-now-background bg-now-primary hover:bg-now-accent transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(0,192,139,0.3)] hover:shadow-[0_0_20px_rgba(0,192,139,0.5)]"
    >
      {text}
    </Link>
  );
};
