import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FAQSectionV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is ServiceNow?",
      a: "ServiceNow is a cloud-based workflow automation platform that helps enterprises manage digital workflows for enterprise operations. It is widely used for IT Service Management (ITSM), HR, and Customer Service."
    },
    {
      q: "How do I start learning ServiceNow?",
      a: "The best way to start is by following our 'Fundamentals' roadmap. You'll begin by getting a free Personal Developer Instance (PDI) and learning the platform basics before moving to scripting and advanced administration."
    },
    {
      q: "Do I need coding knowledge?",
      a: "No! ServiceNow is a low-code/no-code platform. You can achieve the CSA (System Administrator) certification with zero coding experience. However, JavaScript is required if you wish to pursue the Developer (CAD) track."
    },
    {
      q: "How long does CSA preparation take?",
      a: "On average, a beginner can prepare for the Certified System Administrator (CSA) exam in 4 to 6 weeks by studying 1-2 hours a day using our structured modules and practice projects."
    },
    {
      q: "How do certifications work?",
      a: "ServiceNow certifications are official credentials validating your expertise. You must complete the required prerequisite courses on NowLearning, obtain a voucher, and pass a proctored Webassessor exam."
    },
    {
      q: "Can beginners use NowScripts?",
      a: "Absolutely. NowScripts is designed specifically to take you from absolute zero to career-ready. We break down complex concepts into bite-sized, practical lessons."
    }
  ];

  return (
    <section className="py-24 bg-[#020617] relative z-10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1e293b]/50 transition-colors"
                >
                  <span className="font-bold text-white text-lg">{faq.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
