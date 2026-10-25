import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#060708",
          900: "#0b0d10",
          800: "#11141a",
          700: "#181c23",
          600: "#232832",
        },
        accent: "rgb(var(--accent) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
        muted: "#a3aab8",
        dim: "#7b8494",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        mono: [
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        spin360: { to: { transform: "rotate(360deg)" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        eq: {
          "0%,100%": { transform: "scaleY(0.25)" },
          "50%": { transform: "scaleY(1)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        orbit: "spin360 90s linear infinite",
        marquee: "marquee 45s linear infinite",
        eq: "eq 1.4s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        pulseRing: "pulseRing 2.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
