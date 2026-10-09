import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { categorias } from "@/content/categorias";

// Necessário para o export estático (output: "export").
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: agora, priority: 1 },
    ...categorias.map((c) => ({
      url: `${siteUrl}/categoria/${c.slug}/`,
      lastModified: agora,
      priority: 0.8,
    })),
    // Os produtos são lidos no navegador (/catalogo/produtos.json), então não
    // têm página própria no sitemap. Páginas por produto: Etapa 4 (SEO avançado).
    { url: `${siteUrl}/como-pedir-e-entregar/`, lastModified: agora, priority: 0.5 },
    { url: `${siteUrl}/trocas-e-devolucoes/`, lastModified: agora, priority: 0.5 },
    { url: `${siteUrl}/politica-privacidade/`, lastModified: agora },
    { url: `${siteUrl}/termos-de-uso/`, lastModified: agora },
  ];
}
