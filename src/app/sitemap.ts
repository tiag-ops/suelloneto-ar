import type { MetadataRoute } from "next";
import { CALCULADORAS } from "@/lib/calculadoras";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sueldoneto.com.ar";
  const lastModified = new Date();

  const paginas: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/monotributo/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
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
    "aguinaldo-despido",
    "sueldo-bruto-a-neto",
    "horas-extras-cuanto-cobran",
  ].map((slug) => ({
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
