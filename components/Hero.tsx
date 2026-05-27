"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        {/* Hero Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Pulsing Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded-full border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-[0.85rem] font-medium text-secondary-light dark:text-secondary-dark mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 relative">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
            </span>
            Seeking Development Internships
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-primary-light dark:text-primary-dark mb-6"
          >
            <span className="block text-[0.75em] text-tertiary-light dark:text-tertiary-dark font-normal mb-1">
              Hello, I am
            </span>
            Randelf Amper.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-secondary-light dark:text-secondary-dark leading-relaxed max-w-xl mb-8"
          >
            A student developer studying at{" "}
            <strong className="text-primary-light dark:text-primary-dark font-semibold">
              Jose Maria College Foundation Inc.
            </strong>
            . I am still learning, and I come clean in{" "}
            <strong className="text-primary-light dark:text-primary-dark font-semibold">
              vibe-coding
            </strong>{" "}
            to build, understand, and prototype software with speed.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark font-medium shadow-md hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              Let's Connect
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-6 py-3 border border-border-light dark:border-border-dark rounded-lg bg-transparent text-primary-light dark:text-primary-dark font-medium hover:bg-input-light dark:hover:bg-input-dark active:scale-[0.98] transition-all duration-200"
            >
              Explore My Journey
            </a>
          </motion.div>
        </motion.div>

        {/* Dynamic Abstract Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: 2 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-border-light dark:border-border-dark bg-gradient-to-br from-border-light/40 to-card-light dark:from-border-dark/40 dark:to-card-dark shadow-xl flex items-center justify-center overflow-hidden cursor-pointer group"
          >
            {/* Spinning decorative background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-accent-light/10 dark:from-accent-dark/10 to-transparent opacity-40"
            ></motion.div>

            {/* Geometric SVG Art */}
            <svg
              className="w-4/5 h-4/5 text-primary-light dark:text-primary-dark z-10 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                className="stroke-border-light dark:stroke-border-dark"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <circle
                cx="100"
                cy="100"
                r="65"
                className="stroke-tertiary-light dark:stroke-tertiary-dark"
                strokeWidth="0.5"
                opacity="0.3"
              />

              {/* Glowing Brackets */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                d="M75 80 L60 100 L75 120"
                className="stroke-accent-light dark:stroke-accent-dark"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                d="M125 80 L140 100 L125 120"
                className="stroke-accent-light dark:stroke-accent-dark"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                d="M110 75 L90 125"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Details dots */}
              <circle cx="50" cy="60" r="4" fill="currentColor" />
              <circle
                cx="155"
                cy="140"
                r="5"
                className="fill-accent-light dark:fill-accent-dark"
                opacity="0.8"
              />
              <circle cx="145" cy="65" r="3" className="fill-secondary-light dark:fill-secondary-dark" />
              <rect
                x="42"
                y="125"
                width="8"
                height="8"
                rx="2"
                transform="rotate(45 42 125)"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
