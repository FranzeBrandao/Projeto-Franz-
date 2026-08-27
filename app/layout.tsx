import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { empresa } from "@/content/empresa";
import { siteUrl } from "@/content/site";
import { WhatsappFloat } from "@/components/whatsapp-float/WhatsappFloat";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${empresa.nome} | Farmácia em Sobral - CE`,
    template: `%s | ${empresa.nome}`,
  },
  description:
    "Farmácia Bem Estar em Sobral - CE: atendimento farmacêutico, produtos de saúde e bem-estar com confiança e proximidade.",
  openGraph: {
    title: empresa.nome,
    description:
      "Farmácia Bem Estar em Sobral - CE: atendimento farmacêutico, produtos de saúde e bem-estar com confiança e proximidade.",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
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
        {children}
        <WhatsappFloat />
      </body>
    </html>
  );
}
