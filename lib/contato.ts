import { empresa } from "@/content/empresa";

/**
 * Link do WhatsApp da farmácia.
 *
 * Usa `empresa.whatsapp` — o número novo, cadastrado na API do WhatsApp
 * Business. O número antigo (`empresa.telefone`) foi banido e serve só
 * para ligações e mensagens, nunca para links de WhatsApp.
 *
 * `null` quando não há número confirmado, para o botão cair na seção de
 * contato em vez de abrir um link quebrado.
 */
export const whatsappHref: string | null = empresa.whatsapp.e164
  ? `https://wa.me/${empresa.whatsapp.e164.replace("+", "")}`
  : null;
