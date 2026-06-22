import { motion } from "framer-motion";

export function TestimonialsV2() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "College Student",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      text: "NowScripts helped me understand ServiceNow before I even graduated. The projects I built gave me a massive advantage in my first technical interview."
    },
    {
      name: "Michael Chen",
      role: "System Administrator",
      avatar: "https://i.pravatar.cc/150?u=michael",
      text: "I was stuck in a generic IT support role. The CAD roadmap on NowScripts gave me the exact scripting knowledge I needed to transition into a full-time ServiceNow Developer."
    },
    {
      name: "David Rodriguez",
      role: "Fresher / Junior Dev",
      avatar: "https://i.pravatar.cc/150?u=david",
      text: "The interview prep section is gold. I faced the exact same GlideRecord scenario questions in my interview. Landed my first job thanks to this platform!"
    },
    {
      name: "Emma Watson",
      role: "ServiceNow Developer",
      avatar: "https://i.pravatar.cc/150?u=emma",
      text: "Even as an experienced developer, I use NowScripts to review advanced integrations and Service Portal widget design. The architecture tracks are incredibly detailed."
    }
  ];

  return (
    <section className="py-24 bg-now-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Trusted By Learners
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of students and professionals advancing their careers on NowScripts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0f172a]/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={test.avatar} alt={test.name} className="w-14 h-14 rounded-full border border-gray-700" />
                <div>
                  <h4 className="font-bold text-white text-lg">{test.name}</h4>
                  <span className="text-sm text-now-primary">{test.role}</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed italic">
                "{test.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
