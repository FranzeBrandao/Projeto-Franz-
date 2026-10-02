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
      <main className="container-page min-h-screen py-8 sm:py-10">
        {/* min-h-screen + este espaço reservado evitam que o rodapé "pule"
            enquanto os resultados aparecem */}
        <Suspense fallback={<h1 className="text-[28px] font-bold leading-tight sm:text-[36px]">Buscar produtos</h1>}>
          <ResultadoBusca produtos={produtos} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
