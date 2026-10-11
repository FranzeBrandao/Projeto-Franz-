import { emReais } from "@/lib/produtos";

/**
 * Configuração dos pedidos pelo WhatsApp.
 *
 * WHATSAPP_PEDIDOS é o ÚNICO número de WhatsApp do site (contato "Pedido
 * Farmácia Bem Estar", WhatsApp Business). Vale para os botões de compra,
 * o botão flutuante, o topo, o contato e o rodapé. O telefone de ligações
 * fica separado, em `content/empresa.ts` → telefone.
 *
 * Para trocar o número no futuro, altere só a linha abaixo (formato:
 * 55 + DDD + número, apenas dígitos) e gere o build de novo.
 */
export const WHATSAPP_PEDIDOS = "5588997269402";

/** Nome do contato, usado em textos de apoio ("Seu pedido vai para..."). */
export const NOME_CONTATO_PEDIDOS = "Pedido Farmácia Bem Estar";

/** Link de clique-para-conversar (wa.me). Sem API e sem custo por mensagem. */
function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_PEDIDOS}?text=${encodeURIComponent(mensagem)}`;
}

/** Dados do produto que entram nas mensagens. */
export interface ItemPedido {
  nome: string;
  marca: string;
  ean: string;
  preco: number;
  /** Só quando há promoção válida (menor que o preço normal). */
  precoPromocional?: number | null;
  /** Promoção Leve X Pague Y, quando houver. */
  leve?: number | null;
  pague?: number | null;
}

/** "R$ 10,99" ou, em promoção, "de R$ 10,99 por R$ 8,99". */
function textoPreco(item: ItemPedido): string {
  const promo = item.precoPromocional;
  if (promo != null && promo < item.preco) {
    return `de R$ ${emReais(item.preco)} por R$ ${emReais(promo)}`;
  }
  return `R$ ${emReais(item.preco)}`;
}

/**
 * Mensagem pronta do produto:
 * "Olá! Quero pedir: Fralda X (Marca) - R$ 10,99. Código: 789..."
 * (em promoção: "- de R$ 10,99 por R$ 8,99."; no Leve/Pague: "- R$ 8,00
 * (promoção Leve 3 Pague 2)."). Com mais de 1 unidade, acrescenta
 * " Quantidade: N." e, se informado, " Total: R$ X.".
 */
export function linkPedidoWhatsapp(item: ItemPedido & { quantidade?: number; total?: number }): string {
  const marca = item.marca ? ` (${item.marca})` : "";
  const levePague =
    item.leve && item.pague && item.leve > item.pague ? ` (promoção Leve ${item.leve} Pague ${item.pague})` : "";
  const varias = item.quantidade && item.quantidade > 1;
  const quantidade = varias ? ` Quantidade: ${item.quantidade}.` : "";
  const total = varias && item.total != null ? ` Total: R$ ${emReais(item.total)}.` : "";
  return linkWhatsapp(
    `Olá! Quero pedir: ${item.nome}${marca} - ${textoPreco(item)}${levePague}. Código: ${item.ean}.${quantidade}${total}`,
  );
}

/** Produto sem estoque: o cliente pede para ser avisado quando chegar. */
export function linkAviseMeWhatsapp(item: Pick<ItemPedido, "nome" | "marca" | "ean">): string {
  const marca = item.marca ? ` (${item.marca})` : "";
  return linkWhatsapp(
    `Olá! O produto ${item.nome}${marca} está indisponível no site. Pode me avisar quando chegar? Código: ${item.ean}.`,
  );
}

/** Medicamento ainda não liberado para compra no site: só consulta. */
export function linkConsultaWhatsapp(item: Pick<ItemPedido, "nome" | "marca" | "ean">): string {
  const marca = item.marca ? ` (${item.marca})` : "";
  return linkWhatsapp(
    `Olá! Gostaria de informações sobre: ${item.nome}${marca}. Código: ${item.ean}.`,
  );
}

/** Link geral de pedidos (botão "Fazer pedido" do topo e botão flutuante). */
export function linkPedidoGeral(): string {
  return linkWhatsapp("Olá! Gostaria de fazer um pedido.");
}

/** Número de pedidos formatado para exibir: (88) 99726-9402 */
export const WHATSAPP_PEDIDOS_EXIBICAO = `(${WHATSAPP_PEDIDOS.slice(2, 4)}) ${WHATSAPP_PEDIDOS.slice(4, 9)}-${WHATSAPP_PEDIDOS.slice(9)}`;
