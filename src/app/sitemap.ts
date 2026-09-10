import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { CALCULADORAS } from "@/lib/calculadoras";

// Guías que existen realmente en el filesystem (build-time, force-static).
function guiasExistentes(): Set<string> {
  const dir = join(process.cwd(), "src", "app", "guia");
  try {
    return new Set(readdirSync(dir).filter((e) => !e.includes(".")));
  } catch {
    return new Set();
  }
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sueldoneto.com.ar";
  const hoy = new Date();
  const lastModified = hoy;
  // Guías futuras aún no creadas: se agregan al sitemap al crearlas (chequeo abajo).
  const slugsExistentes = guiasExistentes();

  const paginas: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/sueldo/`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/guia/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacidad/`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terminos/`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/contacto/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guias = [
    "ganancias-desde-cuanto",
    "aguinaldo-junio-2026",
    "monotributo-cuanto-pago",
    "escala-ganancias-2026",
    "vacaciones-dias-pago",
    "dolar-tarjeta-como-se-calcula",
    "indemnizacion-despido-2026",
    "aguinaldo-despido", "aguinaldo-y-ganancias", "aguinaldo-diciembre-2026", "feriados-2027", "que-es-el-sac",
    "sueldo-bruto-a-neto",
    "horas-extras-cuanto-cobran",
  ].filter((slug) => slugsExistentes.has(slug)).map((slug) => ({
    url: `${base}/guia/${slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const calculadoras: MetadataRoute.Sitemap = CALCULADORAS.filter((c) => c.slug).map((c) => ({
    url: `${base}/${c.slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...paginas, ...calculadoras, ...guias];
}
