/**
 * Configuração do site.
 *
 * `siteUrl` afeta o sitemap.xml, o robots.txt e as tags Open Graph
 * (compartilhamento em redes sociais).
 *
 * ATENÇÃO — domínio AINDA NÃO COMPRADO. O cliente pretende registrar
 * farmaciabemestar.sale.com, mas confirmou (27/08) que ainda não
 * adquiriu — o e-mail informado é do Gmail, sem relação com esse
 * domínio. Antes de publicar de verdade na Hostinger, confirme que o
 * domínio foi comprado e aponta para lá; se o nome final for outro,
 * troque o valor abaixo. Sem "www." por padrão — se o DNS tiver um
 * registro para "www", acrescente aqui.
 *
 * Pode ser sobrescrito no build com a variável de ambiente
 * NEXT_PUBLIC_SITE_URL, que tem prioridade sobre o valor abaixo.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farmaciabemestar.sale.com";
