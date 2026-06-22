import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsCounters() {
  const stats = [
    { label: "Learning Modules", value: 33, suffix: "+" },
    { label: "Notes", value: 1000, suffix: "+" },
    { label: "Interview Questions", value: 100, suffix: "+" },
    { label: "Projects", value: 50, suffix: "+" },
    { label: "Certification Tracks", value: 5, suffix: "+" },
  ];

  return (
    <section className="py-20 bg-now-primary text-black relative z-10 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-black rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Helping Future ServiceNow Professionals
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl md:text-6xl font-black mb-2 tracking-tighter">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-widest opacity-80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
