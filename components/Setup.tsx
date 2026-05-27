"use client";

import { motion } from "framer-motion";
import { Cpu, Monitor, Keyboard, Layers, Terminal } from "lucide-react";

const GEAR_ITEMS = [
  {
    icon: Cpu,
    category: "Processor & Graphics",
    name: "Ryzen 5 + RTX 3060",
    desc: "A perfect balance of computing power and VRAM for local development, compiling Next.js files, and AAA gaming.",
  },
  {
    icon: Layers,
    category: "Memory & Storage",
    name: "32GB RAM + 1TB NVMe SSD",
    desc: "High-speed multi-tasking capacity to run development servers, containers, and hundreds of browser tabs simultaneously.",
  },
  {
    icon: Keyboard,
    category: "Peripherals",
    name: "75% Custom Mechanical Keyboard",
    desc: "Equipped with smooth linear switches for satisfying, silent coding sprints and late-night keystroke comfort.",
  },
  {
    icon: Monitor,
    category: "Display Setup",
    name: "24\" 144Hz IPS Monitor",
    desc: "Color-accurate screen real estate to review layout structures, typography pairings, and responsive UI scaling.",
  },
  {
    icon: Terminal,
    category: "Vibe Stack",
    name: "VS Code + Gemini Co-Pilot",
    desc: "My primary software setup: writing clean prompts, letting AI generate syntax, and compiling code inside a terminal.",
  },
];

export default function Setup() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="setup" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Hardware & Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-4">
            The Coding Station
          </h2>
          <p className="max-w-2xl text-secondary-light dark:text-secondary-dark text-[0.98rem] leading-relaxed">
            Since I love PC building and hardware configuration, I custom-tailored my development rig. 
            Here is the equipment and software suite that powers my daily learning runs, coding sprints, and gaming sessions.
          </p>
        </div>

        {/* Gear Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GEAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="p-6 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hover:border-accent-light dark:hover:border-accent-dark transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 border rounded-lg border-border-light dark:border-border-dark text-accent-light dark:text-accent-dark">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.75rem] font-heading font-medium text-tertiary-light dark:text-tertiary-dark uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-primary-light dark:text-primary-dark leading-tight mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                </div>
                <p className="text-secondary-light dark:text-secondary-dark text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
