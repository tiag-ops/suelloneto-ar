import { PUBLICADAS } from "@/lib/programatico/montos";

// Sitemap segmentado de la serie /sueldo/[monto] — para monitorear la
// indexación de la serie de forma aislada en Search Console (Task 1.3).
export const dynamic = "force-static";

export function GET() {
  const base = "https://sueldoneto.com.ar";
  const lastModified = new Date().toISOString();

  const urls = PUBLICADAS.map(
    (m) =>
      `  <url><loc>${base}/sueldo/${m.monto}/</loc><lastmod>${lastModified}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
