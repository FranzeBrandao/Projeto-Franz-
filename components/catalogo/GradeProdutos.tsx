import type { Produto } from "@/lib/produtos";
import { CardProduto } from "@/components/produto/CardProduto";

/**
 * Grade de produtos em "gôndola": cada fileira pousa numa régua vermelha
 * (a linha é desenhada por .item-gondola no globals.css). Usada nas
 * páginas de categoria e de busca.
 */
export function GradeProdutos({ produtos, colunasLargas = false }: { produtos: Produto[]; colunasLargas?: boolean }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 ${
        colunasLargas ? "lg:grid-cols-4 xl:grid-cols-5" : "lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {produtos.map((p, i) => (
        <li key={p.ean} className="item-gondola" data-revelar="pousar" style={{ ["--atraso" as string]: `${(i % 4) * 50}ms` }}>
          <CardProduto produto={p} prioridade={i < 2} />
        </li>
      ))}
    </ul>
  );
}
