/**
 * Categorias da loja — a ordem aqui é a ordem do menu e dos atalhos.
 *
 * O `slug` é o mesmo valor do campo "categoria" em `content/produtos.json`
 * e vira o endereço da página: /categoria/<slug>/.
 */
export interface Categoria {
  slug: string;
  nome: string;
  /** Frase curta usada na página da categoria e no Google. */
  descricao: string;
}

export const categorias: Categoria[] = [
  {
    slug: "medicamentos",
    nome: "Medicamentos",
    descricao: "Medicamentos isentos de prescrição para dor, febre, alergia e digestão.",
  },
  {
    slug: "perfumaria",
    nome: "Perfumaria",
    descricao: "Desodorantes, colônias, hidratantes e sabonetes para o dia a dia.",
  },
  {
    slug: "fraldas",
    nome: "Fraldas",
    descricao: "Fraldas infantis e geriátricas, lenços umedecidos e cuidados de troca.",
  },
  {
    slug: "absorventes",
    nome: "Absorventes",
    descricao: "Absorventes com abas, noturnos, internos e protetores diários.",
  },
  {
    slug: "higiene-pessoal",
    nome: "Higiene Pessoal",
    descricao: "Saúde bucal, cuidados com os cabelos e itens de higiene diária.",
  },
  {
    slug: "dermocosmeticos",
    nome: "Dermocosméticos",
    descricao: "Proteção solar, limpeza, hidratação e tratamento para a pele.",
  },
  {
    slug: "infantil",
    nome: "Infantil",
    descricao: "Banho, cuidados com a pele e acessórios para bebês e crianças.",
  },
  {
    slug: "vitaminas-e-suplementos",
    nome: "Vitaminas e Suplementos",
    descricao: "Vitaminas, multivitamínicos e suplementos para a rotina.",
  },
];

/** Aviso obrigatório em toda tela que mostra medicamento. */
export const AVISO_MEDICAMENTOS =
  "SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO.";

export function buscarCategoria(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}
