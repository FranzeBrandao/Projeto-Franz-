"use client";

import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { linkPedidoGeral } from "@/content/pedidos";
import { produtosDaCategoria } from "@/lib/produtos";
import { CarregandoProdutos, ErroProdutos } from "@/components/dados/EstadoProdutos";
import { useProdutos } from "@/components/dados/ProdutosProvider";
import { Catalogo, CatalogoComUrl } from "./Catalogo";

/**
 * Conteúdo da página de categoria: lê os produtos do catálogo no navegador.
 * Categoria sem produtos mostra "Em breve" (igual ao catálogo).
 */
export function ListaCategoria({ slug, nome }: { slug: string; nome: string }) {
  const { status, visiveis } = useProdutos();

  if (status === "carregando") return <CarregandoProdutos />;
  if (status === "erro") return <ErroProdutos />;

  const lista = produtosDaCategoria(visiveis, slug);
  if (lista.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-linha bg-cartao px-6 py-14 text-center">
        <p className="font-display text-xl font-bold text-texto">Em breve</p>
        <p className="mx-auto mt-2 max-w-md text-texto-suave">
          Estamos preparando os produtos de <strong>{nome}</strong> para o site. Enquanto isso, pergunte pelo
          WhatsApp: a gente confere na hora.
        </p>
        <a href={linkPedidoGeral()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Perguntar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <Suspense fallback={<Catalogo produtos={lista} />}>
      <CatalogoComUrl produtos={lista} />
    </Suspense>
  );
}
