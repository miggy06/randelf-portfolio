"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, ShieldCheck } from "lucide-react";

const VIBE_STEPS = [
  {
    icon: Sparkles,
    title: "1. Prompt & Architecture",
    desc: "I define the system goals, visual tokens, and responsive structure. By mapping out layouts and user requirements, I guide the AI on the exact engineering plan.",
  },
  {
    icon: Terminal,
    title: "2. The Vibe-Coding Loop",
    desc: "I co-pilot with AI models to handle boilerplates, TypeScript compilations, and CSS configurations. This allows me to build robust applications with massive speed.",
  },
  {
    icon: ShieldCheck,
    title: "3. Clean Refinements",
    desc: "I manually debug build errors, review generated codes, configure secure variables, and test overall responsive experiences. I control the quality, the AI writes the syntax.",
  },
];

export default function VibeLab() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="vibelab" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Workflow Vibe
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-4">
            Proudly Vibe-Coding
          </h2>
          <p className="max-w-2xl text-secondary-light dark:text-secondary-dark text-[0.98rem] leading-relaxed">
            I believe modern software engineering is shifting from syntax memorization to systemic orchestration. 
            I come clean about co-piloting my code with AI models—using them as interactive tutors and compilers, 
            allowing me to learn faster, prototype rapidly, and focus on clean UX design.
          </p>
        </div>

        {/* Workflow Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {VIBE_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={cardVariants}
                className="p-8 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark flex flex-col items-start"
              >
                <div className="p-3 border rounded-lg border-border-light dark:border-border-dark text-accent-light dark:text-accent-dark mb-6 bg-accent-light/5 dark:bg-accent-dark/5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-primary-light dark:text-primary-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary-light dark:text-secondary-dark text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
