import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { empresa } from "@/content/empresa";
import { siteUrl } from "@/content/site";
import { asset } from "@/lib/asset";
import { WhatsappFloat } from "@/components/whatsapp-float/WhatsappFloat";
import { DadosEstruturados } from "@/components/dados-estruturados/DadosEstruturados";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
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
    <html lang="pt-BR" className={`${lexend.variable} ${sourceSans.variable}`}>
      <body>
        <DadosEstruturados />
        {children}
        <WhatsappFloat />
      </body>
    </html>
  );
}
