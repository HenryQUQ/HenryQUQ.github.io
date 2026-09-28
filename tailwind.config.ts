import type { Config } from "tailwindcss";

// Styling lives in app/globals.css; Tailwind supplies the preflight reset and a
// few utilities. Colours bridge to the CSS tokens defined on :root.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper-rgb) / <alpha-value>)",
        stone: "rgb(var(--color-stone-rgb) / <alpha-value>)",
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        line: "var(--color-line)",
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)"
      },
      borderColor: {
        DEFAULT: "var(--line)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      maxWidth: {
        reading: "68ch"
      }
    }
  },
  plugins: []
};

export default config;
