/**
 * Como mostrar a disponibilidade (estoque) do produto — um lugar só.
 *
 * Para trocar, mude APENAS a linha de MODO_DISPONIBILIDADE e gere o site
 * de novo:
 *   "quantidade" → "12 unidades em estoque" (e "Últimas unidades" quando restam poucas)
 *   "ultimas"    → só "Últimas unidades", quando restam poucas; senão nada
 *   "nenhum"     → não mostra nada sobre estoque
 */
export type ModoDisponibilidade = "quantidade" | "ultimas" | "nenhum";

export const MODO_DISPONIBILIDADE: ModoDisponibilidade = "quantidade";

/** Estoque de 1 até este número conta como "Últimas unidades". */
export const LIMITE_ULTIMAS_UNIDADES = 3;

/** Texto de disponibilidade do produto, ou null quando nada deve aparecer. */
export function textoDisponibilidade(estoque: number): string | null {
  if (estoque <= 0 || MODO_DISPONIBILIDADE === "nenhum") return null;
  const ultimas = estoque <= LIMITE_ULTIMAS_UNIDADES;
  if (MODO_DISPONIBILIDADE === "ultimas") return ultimas ? "Últimas unidades" : null;
  if (ultimas) return estoque === 1 ? "Última unidade" : `Últimas unidades (${estoque})`;
  return `${estoque} unidades em estoque`;
}
