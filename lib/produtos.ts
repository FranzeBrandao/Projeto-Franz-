import { ehRestrito } from "@/content/regras-farmacia";

/**
 * Produtos da loja.
 *
 * Preço, promoção, estoque e foto NÃO ficam neste repositório: o site lê,
 * no navegador, o arquivo /catalogo/produtos.json, que o robô do catálogo
 * (repositório catalogo-bem-estar) atualiza a partir das planilhas do
 * Infarma. Nada aqui precisa ser editado para mudar preço ou estoque.
 */

/** Um produto como vem de /catalogo/produtos.json. */
export interface ProdutoCatalogo {
  ean: string;
  nome: string;
  marca: string;
  categoria: string;
  /** Departamento do site (slug de content/categorias.ts). */
  categoria_site: string;
  preco: number;
  preco_promocional: number | null;
  em_promocao: boolean;
  desconto_percentual: number;
  estoque: number;
  /** Endereço completo da foto; "" quando não há foto. */
  imagem: string;
  atualizado_em: string;
}

/** O produto como as telas usam. */
export interface Produto {
  ean: string;
  nome: string;
  marca: string;
  /** Departamento (slug). */
  categoria: string;
  subcategoria: string;
  apresentacao: string;
  preco: number;
  preco_promocional: number | null;
  estoque: number;
  imagem: string;
  destaque: boolean;
  /** Medicamento ainda não liberado pela responsável técnica (veja content/regras-farmacia.ts). */
  restrito: boolean;
}

// Palavras que ficam minúsculas no meio do nome
const MINUSCULAS = new Set(["de", "da", "do", "das", "dos", "e", "com", "para", "sem"]);
const UNIDADES = new Set(["UND", "UN", "UNID", "UNI"]);

/**
 * Deixa o nome do Infarma (tudo maiúsculo) mais legível:
 * "FRALDA PAMPERS PANTS XG-14" → "Fralda Pampers Pants XG-14".
 * Siglas e tamanhos sem vogal (P, XG, RN, P&G) e palavras com número
 * continuam em maiúsculas.
 */
export function nomeLegivel(nome: string): string {
  return nome
    .trim()
    .split(/\s+/)
    .map((palavra, i) => {
      if (UNIDADES.has(palavra)) return "un";
      if (/\d/.test(palavra)) return palavra.replace(/(\d)(UND|UN)\b/, "$1 un");
      if (!/[AEIOUÁÉÍÓÚÂÊÔÃÕ]/i.test(palavra)) return palavra;
      const minuscula = palavra.toLocaleLowerCase("pt-BR");
      if (i > 0 && MINUSCULAS.has(minuscula)) return minuscula;
      return minuscula.charAt(0).toLocaleUpperCase("pt-BR") + minuscula.slice(1);
    })
    .join(" ");
}

/**
 * Converte um item do produtos.json no produto das telas. Devolve null
 * para item com dados que não dá para usar (sem código, sem nome ou sem
 * preço), para uma linha ruim nunca derrubar a página.
 */
export function adaptarProduto(item: Partial<ProdutoCatalogo>): Produto | null {
  if (!item || typeof item.ean !== "string" || !item.ean) return null;
  if (typeof item.nome !== "string" || !item.nome.trim()) return null;
  if (typeof item.preco !== "number" || !(item.preco > 0)) return null;

  const departamento = item.categoria_site || "outros";
  const restrito = ehRestrito(departamento, item.ean);
  // Medicamento restrito nunca aparece em promoção
  const promocao =
    !restrito && typeof item.preco_promocional === "number" && item.preco_promocional < item.preco
      ? item.preco_promocional
      : null;

  return {
    ean: item.ean,
    nome: nomeLegivel(item.nome),
    marca: nomeLegivel(item.marca || ""),
    categoria: departamento,
    subcategoria: "",
    apresentacao: "",
    preco: item.preco,
    preco_promocional: promocao,
    estoque: Math.max(0, Math.floor(Number(item.estoque) || 0)),
    imagem: typeof item.imagem === "string" ? item.imagem : "",
    destaque: false,
    restrito,
  };
}

/** Endereço da página do produto. */
export function hrefProduto(p: Pick<Produto, "ean">): string {
  return `/produto/?e=${encodeURIComponent(p.ean)}`;
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

/** Só o que aparece no site: produto sem estoque não é mostrado. */
export function visiveis(todos: Produto[]): Produto[] {
  return todos.filter(disponivel);
}

export function produtosDaCategoria(lista: Produto[], slug: string): Produto[] {
  return lista.filter((p) => p.categoria === slug);
}

/** Ofertas: só produtos em promoção, do maior para o menor desconto. */
export function produtosEmOferta(lista: Produto[]): Produto[] {
  return lista.filter(temPromocao).sort((a, b) => percentualDesconto(b) - percentualDesconto(a));
}
