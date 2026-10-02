import { empresa } from "@/content/empresa";

/**
 * Link do WhatsApp da farmácia.
 *
 * Usa `empresa.whatsapp`, que é o número de pedidos (WHATSAPP_PEDIDOS em
 * `content/pedidos.ts`). O número antigo (`empresa.telefone`) foi banido
 * do WhatsApp e serve só para ligações, nunca para links de WhatsApp.
 *
 * `null` quando não há número confirmado, para o botão cair na seção de
 * contato em vez de abrir um link quebrado.
 */
export const whatsappHref: string | null = empresa.whatsapp.e164
  ? `https://wa.me/${empresa.whatsapp.e164.replace("+", "")}`
  : null;
