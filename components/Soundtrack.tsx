"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TRACKS = [
  {
    title: "Lo-Fi Coffee Code",
    artist: "Chill Coding Sessions",
    genre: "Chillhop",
    frequency: 110, // Base pitch for synth
    color: "from-amber-500/20 to-orange-600/20",
  },
  {
    title: "Manila Midnight",
    artist: "Synthwave Explorer",
    genre: "Retrowave",
    frequency: 85,
    color: "from-fuchsia-500/20 to-indigo-600/20",
  },
  {
    title: "Key Click Sonata",
    artist: "Cherry Brown ASMR",
    genre: "Ambient",
    frequency: 140,
    color: "from-emerald-500/20 to-teal-600/20",
  },
];

export default function Soundtrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const track = TRACKS[currentTrackIdx];

  // Web Audio synth generation loop
  useEffect(() => {
    if (isPlaying && !isMuted) {
      startSynth();
    } else {
      stopSynth();
    }
    return () => stopSynth();
  }, [isPlaying, currentTrackIdx, isMuted]);

  // Handle Seekbar Progress Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.8; // Simulates roughly 2-minute loops
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIdx]);

  const startSynth = () => {
    try {
      stopSynth();
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master volume controller
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime); // Very quiet, gentle ambient
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      // Create a nice ambient synthesised tone loop (chord progressions)
      const playBeat = () => {
        if (!ctx || ctx.state === "closed") return;

        // Base Note
        const osc1 = ctx.createOscillator();
        osc1.type = "triangle"; // Smooth tone
        osc1.frequency.setValueAtTime(track.frequency, ctx.currentTime);
        osc1.connect(gain);
        osc1.start();
        osc1.stop(ctx.currentTime + 1.8);

        // Third Note (Minor/Major chord feel)
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(track.frequency * 1.25, ctx.currentTime);
        osc2.connect(gain);
        osc2.start();
        osc2.stop(ctx.currentTime + 1.8);

        // Fifth Note
        const osc3 = ctx.createOscillator();
        osc3.type = "sine";
        osc3.frequency.setValueAtTime(track.frequency * 1.5, ctx.currentTime);
        osc3.connect(gain);
        osc3.start();
        osc3.stop(ctx.currentTime + 1.8);
      };

      playBeat();
      playIntervalRef.current = setInterval(playBeat, 2000);
    } catch (e) {
      console.warn("Audio context failed to start:", e);
    }
  };

  const stopSynth = () => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section id="soundtrack" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        
        {/* Left Information */}
        <div className="flex flex-col items-start">
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Audio Ambient
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-6">
            The Coding Soundtrack
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark text-[0.98rem] leading-relaxed mb-6">
            Music is a core part of my software development experience. 
            Here is an interactive soundtrack panel built with Next.js and the **Web Audio API**. 
            Click play to trigger gentle, synthesized lo-fi chords generated natively in your browser while you explore!
          </p>
          
          {/* Audio Disclaimer Badge */}
          <div className="text-xs px-3 py-1.5 rounded-md border border-border-light dark:border-border-dark text-tertiary-light dark:text-tertiary-dark bg-input-light/30 dark:bg-input-dark/30">
            ⚠️ Uses Web Audio API. Synth chords are generated procedurally on-demand.
          </div>
        </div>

        {/* Right Music Player */}
        <div className="flex justify-center w-full">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`w-full max-w-[360px] p-6 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark bg-gradient-to-br transition-all duration-500 shadow-lg ${track.color}`}
          >
            {/* Spinning Album Art */}
            <div className="flex flex-col items-center justify-center mb-6">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border-4 border-border-light/40 dark:border-border-dark/40 shadow-inner flex items-center justify-center relative overflow-hidden bg-zinc-900"
              >
                {/* Vinyl record center lines */}
                <div className="w-36 h-36 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border border-zinc-700 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-zinc-600 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-accent-light dark:bg-accent-dark flex items-center justify-center text-xs font-bold text-bg-light dark:text-bg-dark font-heading">
                        R
                      </div>
                    </div>
                  </div>
                </div>
                {/* Needle pivot shadow */}
                <div className="absolute w-3 h-3 bg-zinc-950 rounded-full z-10"></div>
              </motion.div>
            </div>

            {/* Bouncing Audio Visualizer Bars */}
            <div className="flex justify-center items-end gap-1.5 h-8 mb-6">
              {[...Array(9)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={
                    isPlaying
                      ? { height: [4, 24, 8, 28, 4][i % 5] }
                      : { height: 4 }
                  }
                  transition={{
                    duration: 0.6 + (i * 0.08),
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-1.5 rounded-full bg-accent-light dark:bg-accent-dark"
                ></motion.span>
              ))}
            </div>

            {/* Song Meta Details */}
            <div className="text-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark tracking-tight">
                    {track.title}
                  </h3>
                  <p className="text-sm font-heading font-medium text-secondary-light dark:text-secondary-dark mt-1">
                    {track.artist} • <span className="text-accent-light dark:text-accent-dark">{track.genre}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Seekbar */}
            <div className="w-full mb-6">
              <div className="h-1.5 w-full bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-light dark:bg-accent-dark transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between px-4">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none p-2"
                aria-label="Toggle mute"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Prev/Play/Next Buttons Group */}
              <div className="flex items-center gap-6">
                <button
                  onClick={handlePrev}
                  className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 rounded-full bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none"
                  aria-label="Next track"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Dummy spacing to center */}
              <div className="w-9 h-9"></div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
