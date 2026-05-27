"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import StatusTicker from "./StatusTicker";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

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

  // Spotify Live State
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);

  // Load Cached Track on Mount (Client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lastPlayedSpotifyTrack");
      if (saved) {
        setSpotifyData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load last played track from localStorage in Hero:", e);
    }
  }, []);

  // Spotify Poll Effect
  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/now-playing");
        if (response.ok) {
          const data = await response.json();
          if (data.title) {
            setSpotifyData(data);
            try {
              localStorage.setItem("lastPlayedSpotifyTrack", JSON.stringify(data));
            } catch (e) {
              console.warn("Failed to save track to localStorage in Hero:", e);
            }
          } else {
            // Keep the last played track cached but force isPlaying: false.
            setSpotifyData((prev) => {
              if (prev) {
                const pausedPrev = { ...prev, isPlaying: false };
                try {
                  localStorage.setItem("lastPlayedSpotifyTrack", JSON.stringify(pausedPrev));
                } catch (e) {
                  console.warn("Failed to update track in localStorage in Hero:", e);
                }
                return pausedPrev;
              }
              return null;
            });
          }
        }
      } catch (e) {
        console.warn("Failed to check Spotify now-playing state in Hero:", e);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 8000); // Poll every 8s
    return () => clearInterval(interval);
  }, []);

  const isLiveSpotify = spotifyData ? (spotifyData.title !== undefined) : false;
  const isSpotifyPlaying = !!spotifyData?.isPlaying;

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
            , dedicated to mastering software development and excited about everything there is to learn in the tech world.
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

          {/* Dynamic Status Ticker */}
          <motion.div variants={itemVariants}>
            <StatusTicker />
          </motion.div>
        </motion.div>

        {/* Dynamic Abstract Graphic / Spotify Vinyl */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center"
        >
          {isLiveSpotify ? (
            // Live Spotify Vinyl Disc Link
            <a
              href={spotifyData?.songUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-zinc-850 dark:border-zinc-800 bg-zinc-950 shadow-2xl flex items-center justify-center overflow-visible group cursor-pointer"
            >
              {/* Spinning Vinyl Record Disc */}
              <motion.div
                animate={isSpotifyPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-zinc-950 border-4 border-zinc-800 flex items-center justify-center overflow-hidden"
              >
                {/* Grooved rings overlay */}
                <div className="absolute inset-0 rounded-full border-[10px] border-zinc-900/60 opacity-60 pointer-events-none"></div>
                <div className="absolute inset-4 rounded-full border-[16px] border-zinc-800/40 opacity-50 pointer-events-none"></div>
                <div className="absolute inset-10 rounded-full border-[12px] border-zinc-700/30 opacity-40 pointer-events-none"></div>
                <div className="absolute inset-16 rounded-full border-[6px] border-zinc-800/20 opacity-30 pointer-events-none"></div>

                {/* Center Label (Album Art) */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-zinc-800/80 shadow-md flex items-center justify-center relative overflow-hidden bg-zinc-900">
                  {spotifyData?.albumImageUrl ? (
                    <img 
                      src={spotifyData.albumImageUrl} 
                      alt="Album Cover" 
                      className="w-full h-full object-cover opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent-light dark:bg-accent-dark flex items-center justify-center text-xl font-bold text-bg-light dark:text-bg-dark font-heading">
                      R
                    </div>
                  )}
                  {/* Spindle hole */}
                  <div className="absolute w-4 h-4 bg-zinc-950 rounded-full border-2 border-zinc-800 shadow-inner z-10"></div>
                </div>
              </motion.div>

              {/* Hover Floating Glassmorphic Track Badge */}
              <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 bg-zinc-950/90 dark:bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full text-[0.8rem] font-medium text-white shadow-xl flex items-center gap-2 max-w-[110%] whitespace-nowrap z-20 transition-all duration-300 group-hover:scale-105 group-hover:bg-zinc-900 group-hover:border-zinc-700">
                <span className="relative flex h-2 w-2">
                  {isSpotifyPlaying && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isSpotifyPlaying ? "bg-green-500" : "bg-zinc-500"}`}></span>
                </span>
                <span className="truncate max-w-[120px] font-semibold">{spotifyData?.title}</span>
                <span className="text-zinc-400 text-xs truncate max-w-[80px]">{spotifyData?.artist}</span>
              </div>
            </a>
          ) : (
            // Original Decorative Code Symbol bracket SVG
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
