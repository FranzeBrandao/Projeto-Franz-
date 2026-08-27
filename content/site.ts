/**
 * Configuração do site.
 *
 * `siteUrl` afeta o sitemap.xml, o robots.txt e as tags Open Graph
 * (compartilhamento em redes sociais).
 *
 * Domínio definido pelo cliente: farmaciabemestarsobral.com — o mesmo
 * nome já usado no Instagram e no Facebook (farmaciabemestar_sobral /
 * farmaciabemestarsobral), pois farmaciabemestar.com já estava
 * registrado por terceiros. Antes de publicar de verdade na Hostinger,
 * confirme que a compra foi concluída e o domínio aponta para lá. Sem
 * "www." por padrão — se o DNS tiver um registro para "www",
 * acrescente aqui.
 *
 * Pode ser sobrescrito no build com a variável de ambiente
 * NEXT_PUBLIC_SITE_URL, que tem prioridade sobre o valor abaixo.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farmaciabemestarsobral.com";
