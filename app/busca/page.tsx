import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ResultadoBusca } from "@/components/catalogo/ResultadoBusca";
import { produtos } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Buscar produtos",
  // Página de resultados não deve aparecer no Google
  robots: { index: false, follow: true },
};

export default function BuscaPage() {
  return (
    <>
      <Header />
      <main className="container-page min-h-[60vh] py-8 sm:py-10">
        <Suspense fallback={<p className="text-texto-suave">Carregando a busca…</p>}>
          <ResultadoBusca produtos={produtos} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
