import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso",
};

export default function TermosDeUsoPage() {
  return (
    <>
      <Header />
      <main className="container-page py-16">
        <h1 className="text-3xl font-bold text-foreground">Termos de Uso</h1>
        <p className="mt-6 max-w-2xl text-foreground/70">
          [ TEXTO JURÍDICO PENDENTE — este documento é um placeholder estrutural para os
          futuros Termos de Uso. O conteúdo definitivo deve ser redigido/revisado por
          profissional competente antes da publicação. ]
        </p>
      </main>
      <Footer />
    </>
  );
}
