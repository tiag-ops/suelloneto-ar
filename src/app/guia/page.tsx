import type { Metadata } from "next";
import Link from "next/link";
import { GUIAS } from "@/lib/calculadoras";
import { JsonLd, breadcrumbLd, graphLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guías de sueldo, aguinaldo, Ganancias y monotributo | SueldoNeto.ar",
  description:
    "Todas las guías de SueldoNeto.ar en un lugar: aguinaldo (SAC), Ganancias, monotributo, vacaciones, indemnización, dólar tarjeta y feriados, con ejemplos calculados.",
  alternates: { canonical: "/guia/" },
};

/** Agrupación temática del hub. Todo slug_de GUIAS debe estar acá exactamente una vez. */
const GRUPOS: { titulo: string; descripcion: string; slugs: string[] }[] = [
  {
    titulo: "Sueldos y Ganancias",
    descripcion: "De bruto a neto, desde cuánto se paga y la escala del impuesto.",
    slugs: ["sueldo-bruto-a-neto", "ganancias-desde-cuanto", "escala-ganancias-2026"],
  },
  {
    titulo: "Aguinaldo (SAC)",
    descripcion: "Qué es, cuándo se cobra y cómo convive con Ganancias y la liquidación final.",
    slugs: [
      "que-es-el-sac",
      "aguinaldo-junio-2026",
      "aguinaldo-y-ganancias",
      "aguinaldo-despido",
    ],
  },
  {
    titulo: "Monotributo",
    descripcion: "Cuánto pagás por categoría y qué pasa si te excedés de facturación.",
    slugs: ["monotributo-cuanto-pago"],
  },
  {
    titulo: "Trabajo: vacaciones, horas extras y despido",
    descripcion: "Días según antigüedad, recargos del 50% y 100%, y la indemnización.",
    slugs: [
      "vacaciones-dias-pago",
      "horas-extras-cuanto-cobran",
      "indemnizacion-despido-2026",
    ],
  },
  {
    titulo: "Dólar tarjeta y feriados",
    descripcion: "El costo real de comprar dólares con tarjeta y el calendario 2027.",
    slugs: ["dolar-tarjeta-como-se-calcula", "feriados-2027"],
  },
];

/** Falla el build si una guía queda fuera del hub o un slug no existe en el registro. */
function validarCobertura() {
  const enGrupos = GRUPOS.flatMap((g) => g.slugs);
  const repetidos = enGrupos.filter((s, i) => enGrupos.indexOf(s) !== i);
  if (repetidos.length > 0) {
    throw new Error(`Hub /guia: slugs repetidos en GRUPOS: ${repetidos.join(", ")}`);
  }
  const inexistentes = enGrupos.filter((s) => !GUIAS.some((g) => g.slug === s));
  if (inexistentes.length > 0) {
    throw new Error(
      `Hub /guia: slugs sin registro en GUIAS (src/lib/calculadoras.ts): ${inexistentes.join(", ")}`,
    );
  }
  const sinGrupo = GUIAS.filter((g) => !enGrupos.includes(g.slug));
  if (sinGrupo.length > 0) {
    throw new Error(
      `Hub /guia: guías registradas sin grupo asignado: ${sinGrupo.map((g) => g.slug).join(", ")}`,
    );
  }
}

validarCobertura();

export default function HubGuias() {
  return (
    <article className="space-y-8 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Guías y explicaciones
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Todas las guías</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Explicaciones con números reales: de bruto a neto, aguinaldo, Ganancias, monotributo,
          vacaciones, indemnización, dólar tarjeta y feriados. Cada guía enlaza a su calculadora
          para hacer el cálculo con tus propios valores.
        </p>
      </header>

      {GRUPOS.map((grupo) => (
        <section key={grupo.titulo} className="space-y-3">
          <h2 className="text-lg font-semibold">{grupo.titulo}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{grupo.descripcion}</p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {grupo.slugs.map((slug) => {
              const guia = GUIAS.find((g) => g.slug === slug);
              if (!guia) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/guia/${slug}/`}
                    className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 block hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
                  >
                    <span className="text-sm font-semibold leading-snug block">
                      📖 {guia.titulo}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <JsonLd
        data={graphLd([
          breadcrumbLd([["Inicio", "/"], ["Guías", ""]]),
          {
            "@type": "CollectionPage",
            "@id": "https://sueldoneto.com.ar/guia/",
            url: "https://sueldoneto.com.ar/guia/",
            name: "Guías y explicaciones",
            inLanguage: "es-AR",
            isPartOf: { "@type": "WebSite", name: "SueldoNeto.ar", url: "https://sueldoneto.com.ar" },
          },
        ])}
      />
    </article>
  );
}
