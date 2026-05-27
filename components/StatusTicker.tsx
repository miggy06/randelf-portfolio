"use client";

import { useEffect, useState } from "react";

export default function StatusTicker() {
  const [timeStr, setTimeStr] = useState("");
  const [statusMsg, setStatusMsg] = useState("Vibe-coding alongside AI 🚀");

  useEffect(() => {
    const updateTicker = () => {
      // Calculate local time in Davao City (Asia/Manila)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const now = new Date();
      const localTime = now.toLocaleTimeString("en-US", options);
      setTimeStr(localTime);

      // Determine status based on current Davao City hour (0-23)
      const manilaOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        hour12: false,
      };
      const currentHour = parseInt(now.toLocaleTimeString("en-US", manilaOptions));

      if (currentHour >= 0 && currentHour < 6) {
        setStatusMsg("Sleeping or Vibe-coding 🌙");
      } else if (currentHour >= 6 && currentHour < 8) {
        setStatusMsg("Drinking Coffee & Reading Tech news ☕");
      } else if (currentHour >= 8 && currentHour < 12) {
        setStatusMsg("Attending Class at JMC Foundation 📚");
      } else if (currentHour >= 12 && currentHour < 13) {
        setStatusMsg("Lunch Break & Gaming 🎮");
      } else if (currentHour >= 13 && currentHour < 17) {
        setStatusMsg("In Lectures / Practical Programming Lab 💻");
      } else if (currentHour >= 17 && currentHour < 20) {
        setStatusMsg("Winding down & PC Hardware building 🔧");
      } else {
        setStatusMsg("Vibe-coding alongside AI co-pilots 🚀");
      }
    };

    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-8 p-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light/40 dark:bg-card-dark/40 backdrop-blur-sm max-w-xl">
      <div className="flex items-center gap-2 text-sm font-heading font-medium text-primary-light dark:text-primary-dark">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative flex-shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
        </span>
        Davao City Time: <span className="font-bold tabular-nums min-w-[95px]">{timeStr || "Loading..."}</span>
      </div>
      <div className="hidden sm:block text-border-light dark:text-border-dark">|</div>
      <div className="text-sm font-medium text-secondary-light dark:text-secondary-dark italic">
        Current status: {statusMsg}
      </div>
    </div>
  );
}
