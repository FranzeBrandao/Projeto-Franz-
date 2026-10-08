"use client";

import { MessageCircle } from "lucide-react";
import { categorias } from "@/content/categorias";
import { linkPedidoGeral } from "@/content/pedidos";
import { produtosDaCategoria, produtosEmOferta } from "@/lib/produtos";
import { CarregandoProdutos } from "@/components/dados/EstadoProdutos";
import { useProdutos } from "@/components/dados/ProdutosProvider";
import { CardProduto } from "@/components/produto/CardProduto";
import { ItemPrateleira, ItemVerTodos, Prateleira } from "@/components/produto/Prateleira";
import { AvisoMedicamentos } from "@/components/produto/AvisoMedicamentos";
import { IconeCategoria } from "@/components/produto/IconeCategoria";

/** Quantos produtos entram em "Ofertas da semana" (o resto fica nas categorias). */
const MAX_OFERTAS = 12;

/** Quantos produtos cada prateleira de categoria mostra na página inicial. */
const MAX_POR_PRATELEIRA = 12;

/**
 * Vitrine da página inicial: "Ofertas da semana" (só produtos em promoção)
 * e uma prateleira para cada categoria que já tem produtos. Tudo vem de
 * /catalogo/produtos.json.
 */
export function Vitrine() {
  const { status, visiveis } = useProdutos();

  // Se os produtos não carregarem, a página inicial continua inteira; a
  // mensagem de erro aparece nas categorias e na busca.
  if (status === "erro") return null;

  if (status === "carregando") {
    return (
      <div className="container-page py-8" id="ofertas">
        <CarregandoProdutos quantidade={4} />
      </div>
    );
  }

  const ofertas = produtosEmOferta(visiveis).slice(0, MAX_OFERTAS);

  return (
    <div className="pt-4">
      {ofertas.length > 0 ? (
        <Prateleira id="ofertas" rotulo="Preço de farmácia de bairro" titulo="Ofertas da semana">
          {ofertas.map((p, i) => (
            <ItemPrateleira key={p.ean} indice={i}>
              <CardProduto produto={p} prioridade={i < 2} />
            </ItemPrateleira>
          ))}
        </Prateleira>
      ) : (
        <section id="ofertas" aria-labelledby="ofertas-titulo" className="container-page py-8">
          <div className="rounded-2xl border border-dashed border-linha bg-cartao px-6 py-10 text-center">
            <h2 id="ofertas-titulo" className="font-display text-[24px] font-bold">
              Ofertas da semana
            </h2>
            <p className="mx-auto mt-2 max-w-md text-texto-suave">
              Estamos preparando as novas ofertas. Pergunte pelo WhatsApp: a gente confere o preço na hora.
            </p>
            <a href={linkPedidoGeral()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </section>
      )}

      {categorias.map((categoria) => {
        const lista = produtosDaCategoria(visiveis, categoria.slug);
        if (lista.length === 0) return null;
        return (
          <Prateleira
            key={categoria.slug}
            id={`prateleira-${categoria.slug}`}
            rotulo="Categoria"
            titulo={categoria.nome}
            verTodos={{ href: `/categoria/${categoria.slug}/`, texto: "Ver todos" }}
            aviso={categoria.slug === "medicamentos" ? <AvisoMedicamentos /> : undefined}
          >
            {lista.slice(0, MAX_POR_PRATELEIRA).map((p, i) => (
              <ItemPrateleira key={p.ean} indice={i}>
                <CardProduto produto={p} />
              </ItemPrateleira>
            ))}
            <ItemVerTodos
              href={`/categoria/${categoria.slug}/`}
              nome={categoria.nome}
              icone={<IconeCategoria slug={categoria.slug} className="h-7 w-7" />}
            />
          </Prateleira>
        );
      })}
    </div>
  );
}
