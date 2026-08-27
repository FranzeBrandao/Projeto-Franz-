/**
 * Configuração do site.
 *
 * `siteUrl` afeta o sitemap.xml, o robots.txt e as tags Open Graph
 * (compartilhamento em redes sociais).
 *
 * ATENÇÃO — domínio AINDA NÃO COMPRADO. Cliente decidiu por
 * farmaciabemestar.com.br (.com.br é o padrão mais confiável para
 * negócio local no Brasil, e exige CNPJ para registrar — que a
 * farmácia já tem). Antes de publicar de verdade na Hostinger,
 * confirme que o domínio foi comprado e aponta para lá; se o nome
 * final mudar, troque o valor abaixo. Sem "www." por padrão — se o
 * DNS tiver um registro para "www", acrescente aqui.
 *
 * Pode ser sobrescrito no build com a variável de ambiente
 * NEXT_PUBLIC_SITE_URL, que tem prioridade sobre o valor abaixo.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farmaciabemestar.com.br";
