import type { Metadata } from "next";
import { Barlow_Condensed, Figtree, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { empresa } from "@/content/empresa";
import { siteUrl } from "@/content/site";
import { asset } from "@/lib/asset";
import { WhatsappFloat } from "@/components/whatsapp-float/WhatsappFloat";
import { DadosEstruturados } from "@/components/dados-estruturados/DadosEstruturados";
import { Efeitos } from "@/components/efeitos/Efeitos";
import { ProdutosProvider } from "@/components/dados/ProdutosProvider";

// Fontes do DESIGN.md §3 — baixadas no build e servidas pelo próprio site
// (não dependem do Google na hora de abrir a página).
const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: "700",
  variable: "--fonte-display",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: "600",
  variable: "--fonte-rotulo",
  display: "swap",
});

// Figtree é uma fonte variável: um arquivo só cobre todos os pesos
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--fonte-texto",
  display: "swap",
});

const DESCRICAO =
  "Farmácia Bem Estar em Sobral - CE: atendimento farmacêutico, produtos de saúde e bem-estar com confiança e proximidade. Aberta de segunda a sábado, das 07h às 22h.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${empresa.nome} | Farmácia em Sobral - CE`,
    template: `%s | ${empresa.nome}`,
  },
  description: DESCRICAO,
  openGraph: {
    title: `${empresa.nome} | Farmácia em Sobral - CE`,
    description: DESCRICAO,
    locale: "pt_BR",
    type: "website",
    siteName: empresa.nome,
    // Imagem que aparece quando o link é compartilhado no WhatsApp,
    // no Facebook e no Instagram.
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `Fachada da ${empresa.nome}, em Sobral - CE`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${empresa.nome} | Farmácia em Sobral - CE`,
    description: DESCRICAO,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: asset("/favicon.png"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${zillaSlab.variable} ${barlowCondensed.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca que o JavaScript está ativo: só então as animações de
            "aparecer ao rolar" escondem os elementos antes de mostrá-los. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />

        {/* ===== ESPAÇO RESERVADO: WIDGET DA DIGISAC =====
            Cole aqui o código do widget de atendimento da Digisac, como
            <Script> do next/script com strategy="lazyOnload" (carrega depois
            da página, sem atrasar a abertura). Exemplo:
              <Script id="digisac" src="URL-DO-WIDGET" strategy="lazyOnload" />
            ================================================ */}
      </head>
      <body>
        <DadosEstruturados />
        <ProdutosProvider>{children}</ProdutosProvider>
        <WhatsappFloat />
        <Efeitos />
      </body>
    </html>
  );
}
