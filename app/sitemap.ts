import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.farmaciabemestar.com.br";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/politica-privacidade`, lastModified: new Date() },
    { url: `${baseUrl}/termos-de-uso`, lastModified: new Date() },
  ];
}
