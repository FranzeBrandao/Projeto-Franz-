/**
 * Configuração do site.
 *
 * `siteUrl` afeta o sitemap.xml, o robots.txt e as tags Open Graph
 * (compartilhamento em redes sociais).
 *
 * Domínio informado pelo cliente: o mesmo do e-mail da farmácia
 * (farmaciabemestar.sale.com). Sem "www." por padrão — se o DNS tiver
 * um registro para "www", basta acrescentar aqui.
 *
 * Pode ser sobrescrito no build com a variável de ambiente
 * NEXT_PUBLIC_SITE_URL, que tem prioridade sobre o valor abaixo.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farmaciabemestar.sale.com";
