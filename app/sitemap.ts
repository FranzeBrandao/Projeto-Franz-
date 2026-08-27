import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Necessário para o export estático (output: "export").
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/politica-privacidade`, lastModified: new Date() },
    { url: `${siteUrl}/termos-de-uso`, lastModified: new Date() },
  ];
}
