import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Derivadas da logo real da Farmácia Bem Estar (cruz branca sobre azul,
        // wordmark "Bem Estar" em vermelho) — substitui a paleta provisória
        // inspirada na Pague Menos.
        primary: {
          DEFAULT: "#D71920",
          hover: "#AD1319",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#153FC7",
          hover: "#102FA0",
          foreground: "#FFFFFF",
        },
        // Cor própria do WhatsApp — usada só no botão flutuante, para manter
        // o reconhecimento imediato do ícone independente da marca do site.
        whatsapp: {
          DEFAULT: "#25D366",
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
