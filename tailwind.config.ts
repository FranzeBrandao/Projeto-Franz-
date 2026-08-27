import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C8102E",
          hover: "#9E0C24",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0F766E",
          foreground: "#FFFFFF",
        },
        background: "#FBFAF8",
        foreground: "#1C1917",
        muted: {
          DEFAULT: "#F1EFEC",
          foreground: "#57534E",
        },
        border: "#E7E4DE",
        card: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-lexend)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
