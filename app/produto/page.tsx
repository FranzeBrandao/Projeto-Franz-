import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { CarregandoProdutos } from "@/components/dados/EstadoProdutos";
import { PaginaProduto } from "@/components/produto/PaginaProduto";

export const metadata: Metadata = {
  title: "Produto",
};

/**
 * Página única de produto: o produto vem do endereço (/produto/?e=<código de barras>)
 * e os dados, de /catalogo/produtos.json, lidos no navegador.
 */
export default function ProdutoPage() {
  return (
    <>
      <Header />
      <main className="pb-10">
        <Suspense
          fallback={
            <div className="container-page pt-8">
              <CarregandoProdutos quantidade={1} />
            </div>
          }
        >
          <PaginaProduto />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
