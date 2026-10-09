"use client";

import { useState } from "react";
import type { Produto } from "@/lib/produtos";
import { CardProduto } from "@/components/produto/CardProduto";

/** Quantos produtos aparecem de cada vez ("Mostrar mais" libera o resto). */
const POR_PAGINA = 24;

/**
 * Grade de produtos em "gôndola": cada fileira pousa numa régua vermelha
 * (a linha é desenhada por .item-gondola no globals.css). Usada nas
 * páginas de categoria e de busca. Carrega aos poucos para continuar
 * rápida mesmo com milhares de produtos.
 */
export function GradeProdutos({ produtos, colunasLargas = false }: { produtos: Produto[]; colunasLargas?: boolean }) {
  const [limite, setLimite] = useState(POR_PAGINA);
  // Lista nova (outro filtro ou busca): volta para a primeira página
  const [listaAnterior, setListaAnterior] = useState(produtos);
  if (listaAnterior !== produtos) {
    setListaAnterior(produtos);
    setLimite(POR_PAGINA);
  }

  const mostrados = produtos.slice(0, limite);
  const restantes = produtos.length - mostrados.length;

  return (
    <>
      {/* Título só para leitores de tela: mantém a ordem h1 → h2 → h3 (nome do produto) */}
      <h2 className="sr-only">Lista de produtos</h2>
      <ul
        className={`grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 ${
          colunasLargas ? "lg:grid-cols-4 xl:grid-cols-5" : "lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {mostrados.map((p, i) => (
          <li key={p.ean} className="item-gondola" data-revelar="pousar" style={{ ["--atraso" as string]: `${(i % 4) * 50}ms` }}>
            <CardProduto produto={p} prioridade={i < 2} />
          </li>
        ))}
      </ul>
      {restantes > 0 && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setLimite((l) => l + POR_PAGINA)} className="btn btn-contorno">
            Mostrar mais produtos ({restantes} {restantes === 1 ? "restante" : "restantes"})
          </button>
        </div>
      )}
    </>
  );
}
