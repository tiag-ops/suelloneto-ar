import type { MetadataRoute } from "next";

// En static export, Next genera esto como out/sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sueldoneto.ar";
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/monotributo/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];
}
