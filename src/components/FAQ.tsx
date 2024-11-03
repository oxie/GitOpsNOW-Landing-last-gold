import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does GitOps improve deployment reliability?",
      answer: "GitOps uses Git as the single source of truth for declarative infrastructure and applications. This ensures consistent, repeatable deployments with automated drift detection and reconciliation, resulting in 99.99% deployment reliability."
    },
    {
      question: "What security measures are implemented?",
      answer: "We implement a comprehensive security framework including zero-trust architecture, automated RBAC, encrypted GitOps workflows, and continuous security scanning. All changes are version-controlled and audit-logged."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timeline varies based on your infrastructure complexity. Typically, initial setup takes 2-4 weeks, with full enterprise transformation completed within 2-3 months, ensuring minimal disruption to operations."
    },
    {
      question: "What cloud platforms do you support?",
      answer: "We support all major cloud providers (AWS, Azure, GCP) and can implement hybrid or multi-cloud solutions. Our platform-agnostic approach ensures consistent operations across any infrastructure."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.15 }
      }
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.15, delay: 0.15 }
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.15
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        delay: 0.15
      }
    }
  };

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.1) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get answers to common questions about our GitOps solutions and implementation process.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <motion.div
                    className="relative p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-all duration-300"
                    animate={{
                      borderColor: openIndex === index ? 'rgba(250, 189, 0, 0.5)' : 'rgba(51, 65, 85, 0.5)'
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Terminal className="h-5 w-5 text-gold-400" />
                        <span className="font-semibold">{faq.question}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <ChevronDown className="h-5 w-5 text-gold-400" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="overflow-hidden"
                        >
                          <motion.div
                            variants={textVariants}
                            className="mt-4 text-slate-300 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}