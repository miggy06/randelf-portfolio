import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          light: "#f7f7f5",
          dark: "#0b0b0d",
        },
        card: {
          light: "#ffffff",
          dark: "#131316",
        },
        primary: {
          light: "#121212",
          dark: "#f8fafc",
        },
        secondary: {
          light: "#565656",
          dark: "#94a3b8",
        },
        tertiary: {
          light: "#8e8e8e",
          dark: "#64748b",
        },
        accent: {
          light: "#3b82f6", // Electric Blue
          dark: "#60a5fa", // Bright Cyan/Blue
          hover: {
            light: "#1d4ed8",
            dark: "#93c5fd",
          }
        },
        border: {
          light: "#e4e4e2",
          dark: "#222226",
        },
        input: {
          light: "#f0f0ee",
          dark: "#1a1a1f",
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
};
export default config;
