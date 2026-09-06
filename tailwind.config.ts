import type { Config } from "tailwindcss";

// Design tokens derived from the 1Fi app reference screenshots
// (Home, Shop, EMI Dues, Limit, Profile) — see ./ref for the source captures.
const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F4F0FF",
          100: "#EAE0FF",
          200: "#D6C2FF",
          300: "#B894FF",
          400: "#9D6BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#3B0764",
        },
        success: {
          DEFAULT: "#10B981",
          dark: "#059669",
        },
        surface: {
          bg: "#F6F6F6",
          card: "#FFFFFF",
        },
        banner: {
          from: "#2A0E6E",
          via: "#4C10B0",
          to: "#7C3AED",
        },
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(23, 23, 40, 0.06)",
        banner: "0 16px 28px -10px rgba(76, 29, 149, 0.55)",
        pill: "0 6px 16px -6px rgba(124, 58, 237, 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)"],
      },
    },
  },
};

export default config;
