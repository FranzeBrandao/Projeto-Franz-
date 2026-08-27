import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="container-page py-16">
        <h1 className="text-3xl font-bold text-foreground">Política de Privacidade</h1>
        <p className="mt-6 max-w-2xl text-foreground/70">
          [ TEXTO JURÍDICO PENDENTE — este documento é um placeholder estrutural para a
          futura Política de Privacidade, em conformidade com a LGPD. O conteúdo
          definitivo deve ser redigido/revisado por profissional competente antes da
          publicação. ]
        </p>
      </main>
      <Footer />
    </>
  );
}
