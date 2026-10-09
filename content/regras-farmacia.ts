/**
 * Regras de farmácia aplicadas na hora de mostrar produtos.
 * VALIDAR COM A RESPONSÁVEL TÉCNICA antes de liberar qualquer medicamento.
 *
 * Medicamento de venda sob prescrição (tarja vermelha ou preta) e
 * controlados não podem ter selo de oferta, "% OFF" nem destaque
 * promocional, e o site não pode ter fluxo de compra para eles.
 *
 * Como o banco ainda não diz qual medicamento é de prescrição, a regra
 * segura é: TODO produto do departamento "medicamentos" fica RESTRITO
 * (sem promoção, fora das "Ofertas", e com o botão "Consultar pelo
 * WhatsApp" no lugar de "Comprar") até a responsável técnica liberar
 * o código de barras (EAN) na lista abaixo — só medicamentos isentos
 * de prescrição ("venda livre").
 */
export const DEPARTAMENTO_MEDICAMENTOS = "medicamentos";

/** EANs de medicamentos isentos de prescrição liberados pela responsável técnica. */
export const MEDICAMENTOS_LIBERADOS: readonly string[] = [];

export function ehRestrito(departamento: string, ean: string): boolean {
  return departamento === DEPARTAMENTO_MEDICAMENTOS && !MEDICAMENTOS_LIBERADOS.includes(ean);
}
