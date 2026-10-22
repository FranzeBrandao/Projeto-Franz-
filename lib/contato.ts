import { empresa } from "@/content/empresa";

/**
 * Link do WhatsApp da farmácia.
 *
 * Usa `empresa.whatsapp`, que é o número de pedidos (WHATSAPP_PEDIDOS em
 * `content/pedidos.ts`). O número da API (`empresa.whatsappApi`) aparece
 * só como texto no rodapé, nunca em links, porque cobra por mensagem.
 *
 * `null` quando não há número confirmado, para o botão cair na seção de
 * contato em vez de abrir um link quebrado.
 */
export const whatsappHref: string | null = empresa.whatsapp.e164
  ? `https://wa.me/${empresa.whatsapp.e164.replace("+", "")}`
  : null;
