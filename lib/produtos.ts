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
  /** Promoção Leve X Pague Y (sobre o preço promocional, se houver). */
  leve?: number | null;
  pague?: number | null;
  /** Último dia da promoção ("AAAA-MM-DD"), ou null. */
  promocao_ate?: string | null;
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
  /** Leve X Pague Y; os dois null quando não há. */
  leve: number | null;
  pague: number | null;
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

/** Data de hoje no aparelho, "AAAA-MM-DD". */
export function hojeLocal(agora = new Date()): string {
  const doisDigitos = (n: number) => String(n).padStart(2, "0");
  return `${agora.getFullYear()}-${doisDigitos(agora.getMonth() + 1)}-${doisDigitos(agora.getDate())}`;
}

const inteiro = (v: unknown): number | null => (typeof v === "number" && Number.isInteger(v) ? v : null);

/**
 * Converte um item do produtos.json no produto das telas. Devolve null
 * para item com dados que não dá para usar (sem código, sem nome ou sem
 * preço), para uma linha ruim nunca derrubar a página.
 *
 * A promoção sai depois do último dia (promocao_ate): o robô do catálogo
 * refaz o arquivo 1x por dia, e assim ela some à meia-noite.
 */
export function adaptarProduto(item: Partial<ProdutoCatalogo>, hoje: string = hojeLocal()): Produto | null {
  if (!item || typeof item.ean !== "string" || !item.ean) return null;
  if (typeof item.nome !== "string" || !item.nome.trim()) return null;
  if (typeof item.preco !== "number" || !(item.preco > 0)) return null;

  const departamento = item.categoria_site || "outros";
  const restrito = ehRestrito(departamento, item.ean);
  const vencida = typeof item.promocao_ate === "string" && item.promocao_ate < hoje;
  // Medicamento restrito nunca aparece em promoção
  const valeAPromocao = !restrito && !vencida;
  const promocao =
    valeAPromocao && typeof item.preco_promocional === "number" && item.preco_promocional < item.preco
      ? item.preco_promocional
      : null;
  const leve = inteiro(item.leve);
  const pague = inteiro(item.pague);
  const temLeve = valeAPromocao && leve !== null && pague !== null && leve > pague && pague >= 1;

  return {
    ean: item.ean,
    nome: nomeLegivel(item.nome),
    marca: nomeLegivel(item.marca || ""),
    categoria: departamento,
    subcategoria: "",
    apresentacao: "",
    preco: item.preco,
    preco_promocional: promocao,
    leve: temLeve ? leve : null,
    pague: temLeve ? pague : null,
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

const centavos = (valor: number) => Math.round(valor * 100) / 100;

/** Leve X Pague Y do produto, ou null. */
export function levePague(p: Pick<Produto, "leve" | "pague">): { leve: number; pague: number } | null {
  return p.leve && p.pague && p.leve > p.pague && p.pague >= 1 ? { leve: p.leve, pague: p.pague } : null;
}

/** Tem alguma promoção: De/Por (ou porcentagem) ou Leve/Pague. */
export function emPromocao(p: Produto): boolean {
  return temPromocao(p) || levePague(p) !== null;
}

/** Preço de cada unidade para quem leva a quantidade do Leve/Pague, ou null. */
export function precoNoLeve(p: Produto): number | null {
  const lp = levePague(p);
  return lp ? centavos((precoFinal(p) * lp.pague) / lp.leve) : null;
}

/** Total de `quantidade` unidades: cada grupo completo do Leve/Pague paga só o "pague". */
export function totalDaQuantidade(p: Produto, quantidade: number): number {
  const lp = levePague(p);
  if (!lp) return centavos(precoFinal(p) * quantidade);
  const grupos = Math.floor(quantidade / lp.leve);
  return centavos((grupos * lp.pague + (quantidade % lp.leve)) * precoFinal(p));
}

/** Economia em % do melhor jeito de comprar (para ordenar ofertas). */
export function percentualEconomia(p: Produto): number {
  const noLeve = precoNoLeve(p);
  const melhor = noLeve ?? precoFinal(p);
  return Math.max(0, Math.round((1 - melhor / p.preco) * 100));
}

/** Faixa vermelha do card: "Leve 3 Pague 2", "-35% OFF" ou "". */
export function textoFaixaPromocao(p: Produto): string {
  const lp = levePague(p);
  if (lp) return `Leve ${lp.leve} Pague ${lp.pague}`;
  const desconto = percentualDesconto(p);
  return desconto > 0 ? `-${desconto}% OFF` : "";
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

/** Ofertas: só produtos em promoção, da maior para a menor economia. */
export function produtosEmOferta(lista: Produto[]): Produto[] {
  return lista.filter(emPromocao).sort((a, b) => percentualEconomia(b) - percentualEconomia(a));
}
