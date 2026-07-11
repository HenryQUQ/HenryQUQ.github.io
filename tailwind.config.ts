import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper-rgb) / <alpha-value>)",
        stone: "rgb(var(--color-stone-rgb) / <alpha-value>)",
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        panel: "rgb(var(--color-panel-rgb) / <alpha-value>)",
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        line: "var(--color-line)",
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        signal: "rgb(var(--color-signal-rgb) / <alpha-value>)",
        "signal-soft": "rgb(var(--color-signal-soft-rgb) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(12, 15, 18, 0.12)",
        lift: "0 28px 90px rgba(8, 12, 18, 0.18)"
      },
      maxWidth: {
        reading: "68ch"
      },
      opacity: {
        2: "0.02",
        4: "0.04",
        9: "0.09",
        12: "0.12",
        14: "0.14",
        15: "0.15",
        16: "0.16",
        18: "0.18",
        22: "0.22",
        26: "0.26",
        28: "0.28",
        32: "0.32",
        36: "0.36",
        42: "0.42",
        46: "0.46",
        48: "0.48",
        52: "0.52",
        54: "0.54",
        58: "0.58",
        62: "0.62",
        65: "0.65",
        68: "0.68",
        72: "0.72",
        76: "0.76",
        78: "0.78",
        82: "0.82",
        84: "0.84",
        88: "0.88",
        92: "0.92",
        94: "0.94",
        96: "0.96"
      }
    }
  },
  plugins: []
};

export default config;
