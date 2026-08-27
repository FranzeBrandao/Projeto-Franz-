/**
 * Configuração do site.
 *
 * `siteUrl` afeta o sitemap.xml, o robots.txt e as tags Open Graph
 * (compartilhamento em redes sociais).
 *
 * Domínio confirmado pelo cliente: farmaciabemestarsobral.com — o mesmo
 * nome já usado no Instagram e no Facebook (farmaciabemestar_sobral /
 * farmaciabemestarsobral), pois farmaciabemestar.com já estava
 * registrado por terceiros. Sem "www." por padrão — se o site passar a
 * responder em "www", troque aqui e gere o build de novo, senão o
 * sitemap e as tags de compartilhamento apontam para o endereço errado.
 *
 * Pode ser sobrescrito no build com a variável de ambiente
 * NEXT_PUBLIC_SITE_URL, que tem prioridade sobre o valor abaixo.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farmaciabemestarsobral.com";
