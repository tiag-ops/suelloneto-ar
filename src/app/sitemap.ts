import type { MetadataRoute } from "next";
import { CALCULADORAS } from "@/lib/calculadoras";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sueldoneto.ar";
  const lastModified = new Date();

  const paginas: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/monotributo/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];

  const calculadoras: MetadataRoute.Sitemap = CALCULADORAS.filter((c) => c.slug).map((c) => ({
    url: `${base}/${c.slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...paginas, ...calculadoras];
}
