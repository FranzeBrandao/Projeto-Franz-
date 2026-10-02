import { emReais } from "@/lib/produtos";

/**
 * Configuração dos pedidos pelo WhatsApp.
 *
 * WHATSAPP_PEDIDOS é o número EXCLUSIVO para pedidos de produtos do site
 * (contato "Pedido Farmácia Bem Estar"). Ele não substitui os telefones de
 * contato de `content/empresa.ts` — esses continuam valendo para ligações
 * e para o botão flutuante do WhatsApp.
 *
 * Para trocar o número no futuro, altere só a linha abaixo (formato:
 * 55 + DDD + número, apenas dígitos) e gere o build de novo.
 */
export const WHATSAPP_PEDIDOS = "5588997269402";

/** Nome do contato, usado em textos de apoio ("Seu pedido vai para..."). */
export const NOME_CONTATO_PEDIDOS = "Pedido Farmácia Bem Estar";

/**
 * Monta o link do WhatsApp com a mensagem pronta do pedido.
 * Ex.: "Olá! Vi no site e quero comprar: Dipirona 500mg - Caixa com
 * 10 comprimidos - R$ 9,90. Quantidade: 2."
 */
export function linkPedidoWhatsapp(item: {
  nome: string;
  apresentacao: string;
  preco: number;
  quantidade: number;
}): string {
  const mensagem =
    `Olá! Vi no site e quero comprar: ${item.nome} - ${item.apresentacao}` +
    ` - R$ ${emReais(item.preco)}. Quantidade: ${item.quantidade}.`;
  return `https://wa.me/${WHATSAPP_PEDIDOS}?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Link para produto sem estoque: o cliente pede para ser avisado quando
 * o produto chegar.
 */
export function linkAviseMeWhatsapp(item: { nome: string; apresentacao: string }): string {
  const mensagem =
    `Olá! Vi no site que o produto ${item.nome} - ${item.apresentacao} está indisponível.` +
    ` Pode me avisar quando chegar?`;
  return `https://wa.me/${WHATSAPP_PEDIDOS}?text=${encodeURIComponent(mensagem)}`;
}

/** Link geral de pedidos (botão do topo): conversa aberta, sem produto. */
export function linkPedidoGeral(): string {
  const mensagem = "Olá! Vim pelo site e quero fazer um pedido.";
  return `https://wa.me/${WHATSAPP_PEDIDOS}?text=${encodeURIComponent(mensagem)}`;
}

/** Número de pedidos formatado para exibir: (88) 99726-9402 */
export const WHATSAPP_PEDIDOS_EXIBICAO = `(${WHATSAPP_PEDIDOS.slice(2, 4)}) ${WHATSAPP_PEDIDOS.slice(4, 9)}-${WHATSAPP_PEDIDOS.slice(9)}`;
