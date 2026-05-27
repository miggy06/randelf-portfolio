"use client";

import { motion } from "framer-motion";
import { Cpu, GitBranch, Compass, Heart } from "lucide-react";

const SKILLS = [
  {
    icon: Cpu,
    category: "Core Technologies",
    items: [
      "HTML5 Semantic Markup",
      "CSS3 Custom Properties",
      "JavaScript (ES6+ Syntax)",
      "Responsive Page Design",
    ],
  },
  {
    icon: GitBranch,
    category: "Technical Concepts",
    items: [
      "Git & GitHub Flow",
      "Algorithms & Data Flow",
      "Mobile-First Development",
      "Developer Console Debugging",
    ],
  },
  {
    icon: Compass,
    category: "Next Horizons",
    items: [
      "React.js & Single Page Apps",
      "Node.js & Server Logic",
      "SQL & Database Structures",
      "Webpack / Build Bundlers",
    ],
  },
  {
    icon: Heart,
    category: "Core Attributes",
    items: [
      "Unbounded Eagerness to Learn",
      "Collaborative Team Player",
      "Creative Problem Solver",
      "Highly Adaptable Thinker",
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="skills" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-start mb-16">
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight">
            Core Competencies & Focus
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                variants={itemVariants}
                className="p-6 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hover:border-accent-light dark:hover:border-accent-dark transition-colors duration-300"
              >
                <h3 className="text-lg font-bold text-primary-light dark:text-primary-dark flex items-center gap-3 mb-6">
                  <Icon className="w-5 h-5 text-accent-light dark:text-accent-dark" />
                  {skill.category}
                </h3>

                <ul className="flex flex-col gap-4 list-none">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-3 text-secondary-light dark:text-secondary-dark text-[0.92rem] hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
                    >
                      {/* Interactive dot */}
                      <span className="w-1.5 h-1.5 rounded-full bg-border-light dark:bg-border-dark group-hover/item:bg-accent-light dark:group-hover/item:bg-accent-dark group-hover/item:scale-125 transition-all duration-200"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
