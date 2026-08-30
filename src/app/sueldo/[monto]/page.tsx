import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResultadoSueldo from "./_resultado";
import { calcularSueldo } from "@/lib/ganancias";
import { formatARS } from "@/lib/format";
import { PUBLICADAS, esPublicada, montosVecinos, enlacesVecinos } from "@/lib/programatico/montos";
import {
  tituloDe,
  h1De,
  descripcionDe,
  parrafoIntro,
  parrafoAportes,
  parrafoGanancias,
  parrafoComparacion,
  parrafoActualizacion,
  parrafoCierre,
  faqItems,
  type ContextoVariante,
} from "@/lib/programatico/variantes";

// Static export: solo existen las páginas publicadas (tandas). dynamicParams=false
// hace que cualquier otro monto dé 404. (El plan pedía 301 de no canónicos;
// output:"export" no soporta redirects — desviación documentada.)
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLICADAS.map((m) => ({ monto: String(m.monto) }));
}

function montoDe(params: { monto: string }): number {
  const n = Number(params.monto);
  return Number.isInteger(n) && n > 0 ? n : 0;
}

function contextoDe(monto: number): ContextoVariante {
  const desglose = calcularSueldo({ sueldoBruto: monto, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
  return {
    monto,
    desglose,
    vecinos: montosVecinos(monto, 3).map((v) => ({
      monto: v.monto,
      neto: calcularSueldo({ sueldoBruto: v.monto, conyuge: false, hijos: 0, hijosDiscapacidad: 0 }).neto,
    })),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ monto: string }>;
}): Promise<Metadata> {
  const { monto } = await params;
  const n = montoDe({ monto });
  if (!n || !esPublicada(n)) return {};
  const ctx = contextoDe(n);
  const title = tituloDe(n);
  const description = descripcionDe(ctx);
  return {
    title,
    description,
    keywords: [
      `sueldo neto de ${formatARS(n)}`,
      `cuanto es el neto de ${n}`,
      `${n} bruto a neto`,
      `calculadora sueldo ${formatARS(n)}`,
    ],
    alternates: { canonical: `/sueldo/${n}/` },
    openGraph: {
      title,
      description,
      url: `/sueldo/${n}/`,
      type: "website",
    },
  };
}

export default async function PaginaSueldo({
  params,
}: {
  params: Promise<{ monto: string }>;
}) {
  const { monto } = await params;
  const n = montoDe({ monto });
  if (!n || !esPublicada(n)) notFound();

  const ctx = contextoDe(n);
  const { desglose } = ctx;
  const faq = faqItems(ctx);
  const vecinos = ctx.vecinos;
  const { anterior, siguiente } = enlacesVecinos(n);
  const base = "https://sueldoneto.com.ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `Calculadora de sueldo neto — bruto ${formatARS(n)}`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: "es-AR",
        url: `${base}/sueldo/${n}/`,
        offers: { "@type": "Offer", price: 0, priceCurrency: "ARS" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Sueldos netos por monto", item: `${base}/sueldo/` },
          { "@type": "ListItem", position: 3, name: `Sueldo neto de ${formatARS(n)}` },
        ],
      },
    ],
  };

  return (
    <article className="space-y-8 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Serie sueldos por monto
        </p>
        <h1 className="text-2xl font-bold tracking-tight">{h1De(n)}</h1>
        <p>{parrafoIntro(ctx)}</p>
      </header>

      <ResultadoSueldo montoInicial={n} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cómo se llega a ese neto</h2>
        <p>{parrafoAportes(ctx)}</p>
        <p>{parrafoGanancias(ctx)}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Comparativa con brutos cercanos</h2>
        <p>{parrafoComparacion(ctx)}</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Bruto</th>
                <th className="px-3 py-2">Neto</th>
                <th className="px-3 py-2">Diferencia con {formatARS(n)}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {vecinos.map((v) => (
                <tr key={v.monto}>
                  <td className="px-3 py-2 font-medium">
                    {esPublicada(v.monto) ? (
                      <Link href={`/sueldo/${v.monto}/`} className="underline hover:text-emerald-700">
                        {formatARS(v.monto)}
                      </Link>
                    ) : (
                      <span>{formatARS(v.monto)}</span>
                    )}
                  </td>
                  <td className="px-3 py-2 font-semibold">{formatARS(v.neto)}</td>
                  <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                    {v.neto - desglose.neto >= 0 ? "+" : ""}
                    {formatARS(v.neto - desglose.neto)} netos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        {faq.map((f, i) => (
          <div className="space-y-1" key={i}>
            <h3 className="font-medium">{f.pregunta}</h3>
            <p>{f.respuesta}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Datos actualizados</h2>
        <p>{parrafoActualizacion(ctx)}</p>
        <p>{parrafoCierre(ctx)}</p>
      </section>

      <nav aria-label="Series vecinas" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        {anterior ? (
          <Link href={`/sueldo/${anterior}/`} className="underline hover:text-emerald-700">
            ← Bruto {formatARS(anterior)}
          </Link>
        ) : null}
        <Link href="/sueldo/" className="underline hover:text-emerald-700">
          Todos los montos
        </Link>
        {siguiente ? (
          <Link href={`/sueldo/${siguiente}/`} className="underline hover:text-emerald-700">
            Bruto {formatARS(siguiente)} →
          </Link>
        ) : null}
      </nav>

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal; verificá con un contador.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
