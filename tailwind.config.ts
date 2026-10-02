import type { Config } from "tailwindcss";

/**
 * Cores do site — os valores ficam em `app/globals.css` (variáveis CSS),
 * definidos no DESIGN.md. Aqui só ligamos cada nome à variável, no formato
 * que deixa o Tailwind aplicar transparência (ex.: `bg-azul/10`).
 */
const cor = (nome: string) => `rgb(var(--${nome}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Marca (medidas da logo oficial)
        "azul-logo": cor("azul-logo"),
        azul: { DEFAULT: cor("azul"), hover: cor("azul-hover") },
        vermelho: { DEFAULT: cor("vermelho"), hover: cor("vermelho-hover") },
        // Azul-noite da fachada: a cor escura da marca
        noite: { DEFAULT: cor("noite"), 2: cor("noite-2") },
        // Superfícies e texto
        fundo: cor("fundo"),
        cartao: cor("cartao"),
        gelo: cor("gelo"),
        linha: cor("linha"),
        texto: { DEFAULT: cor("texto"), suave: cor("texto-suave") },
        // Funcionais
        whatsapp: { DEFAULT: cor("whatsapp"), hover: cor("whatsapp-hover") },
        indisponivel: cor("indisponivel"),
        aviso: { DEFAULT: cor("aviso"), borda: cor("aviso-borda") },

        // Apelidos usados pelas páginas de texto (Política, Termos)
        background: cor("fundo"),
        foreground: cor("texto"),
      },
      fontFamily: {
        display: ["var(--fonte-display)", "Georgia", "serif"],
        rotulo: ["var(--fonte-rotulo)", "Arial Narrow", "sans-serif"],
        texto: ["var(--fonte-texto)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        1: "var(--sombra-1)",
        2: "var(--sombra-2)",
        3: "var(--sombra-3)",
        4: "var(--sombra-4)",
      },
      transitionTimingFunction: {
        curva: "cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
