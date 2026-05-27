"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Terminal, Eye } from "lucide-react";

const SANDBOX_CARDS = [
  {
    icon: Code2,
    title: "Structural Templates",
    desc: "Mastering semantic HTML5 and clean page architecture to ensure outstanding search engine optimization (SEO), quick render performance, and clear page hierarchy.",
    tags: ["HTML5", "SEO", "Semantic Web"],
  },
  {
    icon: Layout,
    title: "Responsive UI Systems",
    desc: "Exploring fluid grids, flexible flexbox layouts, media queries, and sophisticated CSS custom properties to build visually harmonious light/dark interfaces.",
    tags: ["CSS3", "Flexbox & Grid", "Themes"],
  },
  {
    icon: Terminal,
    title: "Vanilla Logic Lab",
    desc: "Writing clean, procedural, and functional ES6+ JavaScript. Experimenting with DOM manipulations, standard data structures, and custom event tracking.",
    tags: ["JavaScript", "ES6+", "DOM API"],
  },
  {
    icon: Eye,
    title: "Accessibility & Usability",
    desc: "Designing user flows with keyboard navigation support, high-contrast screen reading friendliness, and intuitive layout interactions.",
    tags: ["Accessibility", "UX Design", "Contrast"],
  },
];

export default function Sandbox() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="sandbox" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start">
            <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
              Explorations
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight">
              The Learning Sandbox
            </h2>
          </div>
          <p className="max-w-md text-secondary-light dark:text-secondary-dark text-[0.95rem] leading-relaxed">
            Since I am early in my engineering career, my main project is a digital playground. Here are the core conceptual focuses where I spend time practicing, building, and exploring code patterns.
          </p>
        </div>

        {/* Sandbox Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {SANDBOX_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
                className="group relative flex flex-col items-start p-8 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark overflow-hidden transition-all duration-300"
              >
                {/* Glowing border top on hover */}
                <span className="absolute top-0 left-0 w-full h-[3px] bg-accent-light dark:bg-accent-dark origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>

                {/* Icon */}
                <div className="p-3 border rounded-lg border-border-light dark:border-border-dark text-accent-light dark:text-accent-dark mb-6 group-hover:bg-accent-light/5 dark:group-hover:bg-accent-dark/5 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark mb-3 group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-secondary-light dark:text-secondary-dark text-sm leading-relaxed mb-6 flex-grow">
                  {card.desc}
                </p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.75rem] font-heading font-medium px-2.5 py-1 border rounded border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
