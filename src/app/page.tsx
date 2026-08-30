import type { Metadata } from "next";
import Link from "next/link";
import { porCategoria, GUIAS, urlDe } from "@/lib/calculadoras";
import { formatARS } from "@/lib/format";
import CalculadoraSueldoClient from "./calculadora-sueldo";
import ComoSeCalcula from "./como-se-calcula";

export const metadata: Metadata = {
  title: "SueldoNeto.ar — Calculadoras de sueldo, monotributo y trabajo 2026",
  description:
    "Calculadoras gratuitas para Argentina: sueldo neto, Ganancias, monotributo, aguinaldo, vacaciones, horas extras, indemnización y más. Valores oficiales ARCA con fecha de vigencia.",
  alternates: { canonical: "/" },
};

const NOMBRES_CATEGORIA: Record<string, string> = {
  laboral: "Trabajo y liquidación de sueldos",
  impuestos: "Impuestos",
  monetarias: "Dólar y monedas",
  inversiones: "Inversiones",
  utilidades: "Utilidades",
};

export default function Home() {
  const categorias = porCategoria();

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Calculadoras de sueldo e impuestos de Argentina
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Gratis, sin registro y con valores oficiales de ARCA con fecha de vigencia. Todas
          calculan en tu navegador: tus datos nunca salen de tu equipo.
        </p>
      </section>

      <CalculadoraSueldoClient />

      <ComoSeCalcula />

      {/* Serie programática: sueldos por monto exacto */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Sueldos netos por monto exacto</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Cada bruto tiene su página con el neto, el desglose y la comparativa con montos vecinos.
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {[200_000, 300_000, 400_000, 500_000, 600_000].map((monto) => (
            <li key={monto}>
              <Link
                href={`/sueldo/${monto}/`}
                className="inline-block rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
              >
                {formatARS(monto)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/sueldo/"
              className="inline-block rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 font-medium"
            >
              Ver todos los montos →
            </Link>
          </li>
        </ul>
      </section>

      {/* Directorio de calculadoras */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Todas las calculadoras</h2>
        {Object.entries(categorias).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              {NOMBRES_CATEGORIA[cat] ?? cat}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {items.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.slug ? `/${c.slug}/` : "/"}
                    className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
                  >
                    <span aria-hidden className="text-xl">{c.icono}</span>
                    <span>
                      <span className="block text-sm font-medium">{c.titulo}</span>
                      <span className="block text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                        {c.descripcion}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Guías */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Guías y explicaciones</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {GUIAS.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guia/${g.slug}/`}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 block hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
              >
                <span className="block text-sm font-medium">📖 {g.titulo}</span>
                <span className="block text-sm text-neutral-600 dark:text-neutral-400">{g.descripcion}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SueldoNeto.ar",
            inLanguage: "es-AR",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://sueldoneto.com.ar/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
}
