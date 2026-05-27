"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export default function About() {
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Intro details */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollRevealVariants}
          className="flex flex-col items-start"
        >
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Introduction
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-8">
            An eager learner ready to build and adapt.
          </h2>

          <div className="border-l-2 border-accent-light dark:border-accent-dark pl-6 italic text-lg text-primary-light dark:text-primary-dark font-medium mb-6">
            "I am excited about everything that there is to learn."
          </div>

          <div className="text-secondary-light dark:text-secondary-dark flex flex-col gap-6 text-[0.98rem] leading-relaxed">
            <p>
              As a student developer at Jose Maria College Foundation Inc., my primary objective is to absorb knowledge, master technical skills, and apply structured programming to real-world applications.
            </p>
            <p>
              I thrive on solving logic puzzles, constructing interactive interfaces, and understanding how modern systems communicate. When I am not coding, you can find me gaming, building custom PCs, or configuring tech hardware systems.
            </p>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollRevealVariants}
          className="flex flex-col items-start"
        >
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Academic Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-8">
            Education & Milestones
          </h2>

          {/* Timeline Wrapper */}
          <div className="flex flex-col gap-10 relative pl-6 border-l border-border-light dark:border-border-dark ml-2">
            
            {/* Timeline Item 1 */}
            <div className="relative group">
              {/* Animated Dot */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-bg-light dark:border-bg-dark bg-accent-light dark:bg-accent-dark z-10 transition-transform duration-300 group-hover:scale-125 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
              
              <div className="flex items-center gap-2 text-xs font-heading font-semibold text-tertiary-light dark:text-tertiary-dark mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                Present • Student
              </div>
              <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark mb-1">
                Information Technology / Computer Studies
              </h3>
              <div className="text-sm font-heading font-medium text-secondary-light dark:text-secondary-dark mb-3">
                Jose Maria College Foundation Inc.
              </div>
              <p className="text-secondary-light dark:text-secondary-dark text-[0.92rem] leading-relaxed">
                Developing core competencies in programming logic, algorithms, databases, and responsive web systems. Currently seeking an internship opportunity to transition theoretical knowledge into practical engineering scenarios.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              {/* Animated Dot */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-bg-light dark:border-bg-dark bg-accent-light dark:bg-accent-dark z-10 transition-transform duration-300 group-hover:scale-125 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>

              <div className="flex items-center gap-2 text-xs font-heading font-semibold text-tertiary-light dark:text-tertiary-dark mb-1">
                <Award className="w-3.5 h-3.5" />
                Continuous Exploration
              </div>
              <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark mb-1">
                Self-Guided Technical Sandbox
              </h3>
              <div className="text-sm font-heading font-medium text-secondary-light dark:text-secondary-dark mb-3">
                Digital Autodidactism
              </div>
              <p className="text-secondary-light dark:text-secondary-dark text-[0.92rem] leading-relaxed">
                Building structural templates, learning the ins and outs of ES6 JavaScript, experimenting with CSS responsive grids, and analyzing efficient codebase architectures.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
