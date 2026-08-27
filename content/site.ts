/**
 * Configuração do site.
 *
 * ATENÇÃO — `siteUrl` ainda NÃO foi confirmado pelo cliente.
 * O valor abaixo é um palpite provisório e afeta o sitemap.xml, o
 * robots.txt e as tags Open Graph (compartilhamento em redes sociais).
 *
 * Antes de publicar na Hostinger, troque pelo domínio real que for
 * registrado/apontado — ou defina a variável de ambiente
 * NEXT_PUBLIC_SITE_URL no build, que ela tem prioridade.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.farmaciabemestar.com.br";
