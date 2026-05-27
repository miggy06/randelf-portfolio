"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OFFLINE_TRACKS = [
  {
    title: "Lo-Fi Coffee Code",
    artist: "Chill Coding Sessions",
    genre: "Chillhop",
    frequency: 110,
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

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

export default function Soundtrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  // Spotify Live State
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const defaultTrack = OFFLINE_TRACKS[currentTrackIdx];

  // =========================================
  // Spotify Poll Effect
  // =========================================
  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/now-playing");
        if (response.ok) {
          const data = await response.json();
          setSpotifyData(data);
          
          if (data.isPlaying) {
            // Stop offline synth if Spotify starts playing
            setIsPlaying(false);
          }
        }
      } catch (e) {
        console.warn("Failed to check Spotify now-playing state:", e);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 8000); // Poll every 8s
    return () => clearInterval(interval);
  }, []);

  // =========================================
  // Progress Bar Controller
  // =========================================
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (spotifyData?.isPlaying && spotifyData.progressMs && spotifyData.durationMs) {
      // Direct Spotify Progress calculation & local increment
      let localProgressMs = spotifyData.progressMs;
      const duration = spotifyData.durationMs;

      interval = setInterval(() => {
        localProgressMs = Math.min(localProgressMs + 1000, duration);
        setProgress((localProgressMs / duration) * 100);
      }, 1000);
    } else if (isPlaying) {
      // Offline ambient progress simulation
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.8;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, spotifyData]);

  // =========================================
  // Web Audio Synth Loops
  // =========================================
  useEffect(() => {
    if (isPlaying && !isMuted && !spotifyData?.isPlaying) {
      startSynth();
    } else {
      stopSynth();
    }
    return () => stopSynth();
  }, [isPlaying, currentTrackIdx, isMuted, spotifyData]);

  const startSynth = () => {
    try {
      stopSynth();
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      const playBeat = () => {
        if (!ctx || ctx.state === "closed") return;

        const osc1 = ctx.createOscillator();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(defaultTrack.frequency, ctx.currentTime);
        osc1.connect(gain);
        osc1.start();
        osc1.stop(ctx.currentTime + 1.8);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(defaultTrack.frequency * 1.25, ctx.currentTime);
        osc2.connect(gain);
        osc2.start();
        osc2.stop(ctx.currentTime + 1.8);
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
    if (spotifyData?.isPlaying) return; // Disable play toggle when Spotify handles it
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (spotifyData?.isPlaying) return;
    setProgress(0);
    setCurrentTrackIdx((prev) => (prev + 1) % OFFLINE_TRACKS.length);
  };

  const handlePrev = () => {
    if (spotifyData?.isPlaying) return;
    setProgress(0);
    setCurrentTrackIdx((prev) => (prev - 1 + OFFLINE_TRACKS.length) % OFFLINE_TRACKS.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const isLiveSpotify = !!(spotifyData?.isPlaying);

  return (
    <section id="soundtrack" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        
        {/* Left Information */}
        <div className="flex flex-col items-start">
          <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
            Audio Ambient
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-6">
            {isLiveSpotify ? "Now Playing on Spotify" : "The Coding Soundtrack"}
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark text-[0.98rem] leading-relaxed mb-6">
            {isLiveSpotify ? (
              <>
                The player is currently connected and streaming my live Spotify activity! 
                Whenever I play a track on my Spotify app, it updates this card in real time. 
                Click the player details to listen along with me.
              </>
            ) : (
              <>
                Music is a core part of my software development experience. 
                This player dynamically connects to Spotify to show what I'm listening to. 
                Since I am offline or not playing anything right now, you can trigger my browser's 
                procedural synthesizer to generate lo-fi chillhop tones on-demand!
              </>
            )}
          </p>
          
          {/* Audio Disclaimer Badge */}
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border border-border-light dark:border-border-dark text-tertiary-light dark:text-tertiary-dark bg-input-light/30 dark:bg-input-dark/30">
            {isLiveSpotify ? (
              <>
                <Radio className="w-3.5 h-3.5 text-green-500 animate-pulse" />
                Live Sync Active via Spotify Web API
              </>
            ) : (
              <>
                ⚠️ Synthesized local audio loop is currently active.
              </>
            )}
          </div>
        </div>

        {/* Right Music Player */}
        <div className="flex justify-center w-full">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`w-full max-w-[360px] p-6 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark bg-gradient-to-br transition-all duration-500 shadow-lg ${
              isLiveSpotify 
                ? "from-emerald-500/10 to-zinc-900/40 dark:from-emerald-500/20 dark:to-zinc-950/40" 
                : defaultTrack.color
            }`}
          >
            {/* Spinning Album Art */}
            <div className="flex flex-col items-center justify-center mb-6">
              <motion.div
                animate={(isLiveSpotify || isPlaying) ? { rotate: 360 } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border-4 border-border-light/40 dark:border-border-dark/40 shadow-inner flex items-center justify-center relative overflow-hidden bg-zinc-900"
              >
                {isLiveSpotify && spotifyData.albumImageUrl ? (
                  // Spotify Album Art
                  <img 
                    src={spotifyData.albumImageUrl} 
                    alt="Album Cover" 
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  // Default Vinyl Design
                  <div className="w-36 h-36 rounded-full border border-zinc-800 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-zinc-700 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-zinc-600 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-accent-light dark:bg-accent-dark flex items-center justify-center text-xs font-bold text-bg-light dark:text-bg-dark font-heading">
                          R
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Needle center */}
                <div className="absolute w-3 h-3 bg-zinc-950 rounded-full z-10"></div>
              </motion.div>
            </div>

            {/* Bouncing Audio Visualizer Bars */}
            <div className="flex justify-center items-end gap-1.5 h-8 mb-6">
              {[...Array(9)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={
                    (isLiveSpotify || isPlaying)
                      ? { height: [4, 24, 8, 28, 4][i % 5] }
                      : { height: 4 }
                  }
                  transition={{
                    duration: 0.6 + (i * 0.08),
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className={`w-1.5 rounded-full ${isLiveSpotify ? 'bg-green-500' : 'bg-accent-light dark:bg-accent-dark'}`}
                ></motion.span>
              ))}
            </div>

            {/* Song Meta Details */}
            <div className="text-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLiveSpotify ? spotifyData.title : defaultTrack.title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark tracking-tight truncate max-w-[280px] mx-auto">
                    {isLiveSpotify ? (
                      <a href={spotifyData.songUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                        {spotifyData.title}
                      </a>
                    ) : (
                      defaultTrack.title
                    )}
                  </h3>
                  <p className="text-sm font-heading font-medium text-secondary-light dark:text-secondary-dark mt-1 truncate max-w-[280px] mx-auto">
                    {isLiveSpotify ? spotifyData.artist : defaultTrack.artist} •{" "}
                    <span className={isLiveSpotify ? "text-green-500 font-bold" : "text-accent-light dark:text-accent-dark"}>
                      {isLiveSpotify ? "Spotify" : defaultTrack.genre}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Seekbar */}
            <div className="w-full mb-6">
              <div className="h-1.5 w-full bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isLiveSpotify ? 'bg-green-500' : 'bg-accent-light dark:bg-accent-dark'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between px-4">
              {/* Mute / Spotify Icon Button */}
              {isLiveSpotify ? (
                <a
                  href={spotifyData.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 transition-colors p-2"
                  aria-label="Open on Spotify"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm5.488 17.306c-.215.352-.676.463-1.028.248-2.856-1.745-6.452-2.14-10.686-1.173-.404.092-.812-.162-.904-.567-.092-.404.162-.812.567-.904 4.634-1.06 8.594-.616 11.782 1.332.353.216.463.677.249 1.03zm1.464-3.26c-.27.44-.848.583-1.287.312-3.269-2.008-8.253-2.592-12.115-1.42-.493.15-1.018-.13-1.168-.622-.15-.494.13-1.02.622-1.17 4.417-1.34 9.904-.693 13.636 1.6 0 .44.584.848.312 1.288zm.126-3.41c-3.92-2.327-10.378-2.542-14.126-1.404-.6.18-1.233-.153-1.415-.75-.18-.6.153-1.234.75-1.415 4.306-1.307 11.433-1.054 15.938 1.62.54.32.717 1.013.398 1.554-.32.54-1.013.717-1.554.398z"/>
                  </svg>
                </a>
              ) : (
                <button
                  onClick={toggleMute}
                  className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none p-2"
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              )}

              {/* Prev/Play/Next Buttons Group */}
              <div className="flex items-center gap-6">
                <button
                  onClick={handlePrev}
                  disabled={isLiveSpotify}
                  className={`transition-colors focus:outline-none ${
                    isLiveSpotify 
                      ? "text-secondary-light/20 dark:text-secondary-dark/20 cursor-not-allowed" 
                      : "text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
                  }`}
                  aria-label="Previous track"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                {isLiveSpotify ? (
                  // Live Play Button -> Links directly to Spotify
                  <a
                    href={spotifyData.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-green-500 text-bg-light dark:text-bg-dark flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label="Listen along on Spotify"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5 text-zinc-950" />
                  </a>
                ) : (
                  // Offline Play Button -> Triggers local Web Audio loops
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
                )}

                <button
                  onClick={handleNext}
                  disabled={isLiveSpotify}
                  className={`transition-colors focus:outline-none ${
                    isLiveSpotify 
                      ? "text-secondary-light/20 dark:text-secondary-dark/20 cursor-not-allowed" 
                      : "text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
                  }`}
                  aria-label="Next track"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Spacing alignment */}
              <div className="w-9 h-9"></div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
