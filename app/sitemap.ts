import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { categorias } from "@/content/categorias";
import { produtos, slugProduto } from "@/lib/produtos";

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
    ...produtos.map((p) => ({
      url: `${siteUrl}/produto/${slugProduto(p)}/`,
      lastModified: agora,
      priority: 0.6,
    })),
    { url: `${siteUrl}/politica-privacidade/`, lastModified: agora },
    { url: `${siteUrl}/termos-de-uso/`, lastModified: agora },
  ];
}
