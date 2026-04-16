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
        paper: "var(--color-paper)",
        stone: "var(--color-stone)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        accent: "var(--color-accent)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(23, 23, 20, 0.08)"
      },
      maxWidth: {
        "reading": "72ch"
      }
    }
  },
  plugins: []
};

export default config;

