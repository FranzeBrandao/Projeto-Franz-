import dados from "@/content/produtos.json";

/**
 * Leitura do arquivo único de produtos (`content/produtos.json`).
 *
 * Para atualizar preço, estoque ou foto, edite só o JSON — nenhuma tela
 * precisa ser alterada. Regras de cada campo:
 * - preco_promocional: número, ou null quando não há promoção.
 * - estoque: 0 deixa o produto "Indisponível" e sem botão de compra.
 * - imagem: caminho dentro de public/ (ex.: "/produtos/dipirona.webp"),
 *   ou "" para mostrar a imagem provisória da categoria.
 * - destaque: true coloca o produto na vitrine da página inicial.
 */
export interface Produto {
  ean: string;
  nome: string;
  marca: string;
  categoria: string;
  subcategoria: string;
  apresentacao: string;
  preco: number;
  preco_promocional: number | null;
  estoque: number;
  imagem: string;
  destaque: boolean;
}

export const produtos: Produto[] = dados as Produto[];

/** Endereço do produto: nome sem acentos + EAN (garante que é único). */
export function slugProduto(p: Produto): string {
  const base = p.nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${p.ean.slice(-4)}`;
}

export function disponivel(p: Produto): boolean {
  return p.estoque > 0;
}

/** Só vale promoção quando o preço promocional é menor que o normal. */
export function temPromocao(p: Produto): boolean {
  return p.preco_promocional !== null && p.preco_promocional < p.preco;
}

export function precoFinal(p: Produto): number {
  return temPromocao(p) ? (p.preco_promocional as number) : p.preco;
}

export function percentualDesconto(p: Produto): number {
  return temPromocao(p) ? Math.round((1 - precoFinal(p) / p.preco) * 100) : 0;
}

/** 19.9 → "19,90" */
export function emReais(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function produtosDaCategoria(slug: string): Produto[] {
  return produtos.filter((p) => p.categoria === slug);
}

/** Vitrine da home: destaques e promoções, disponíveis primeiro. */
export function produtosEmOferta(): Produto[] {
  return produtos
    .filter((p) => p.destaque || temPromocao(p))
    .sort((a, b) => Number(disponivel(b)) - Number(disponivel(a)) || percentualDesconto(b) - percentualDesconto(a));
}
