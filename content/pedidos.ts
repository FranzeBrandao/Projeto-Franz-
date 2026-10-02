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

/** Formata um valor em reais no padrão brasileiro: 19.9 → "19,90". */
function emReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

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
