import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { tablaBrutoNeto, formatARS } from "./_datos";

export const metadata: Metadata = {
  title: "Sueldo bruto a neto: cómo hacer la conversión | SueldoNeto.ar",
  description: "Cómo pasar de sueldo bruto a neto en Argentina: aportes 17% y Ganancias con método doceava. Tabla de conversión 2026 y calculadora.",
  keywords: ["sueldo bruto a neto", "pasar de bruto a neto", "cuanto es bruto en neto"],
  alternates: { canonical: "/guia/sueldo-bruto-a-neto/" },
};

export default function Articulo() {
  const filas = tablaBrutoNeto();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Sueldos</p>
        <h1 className="text-2xl font-bold tracking-tight">💵 De sueldo bruto a neto: la conversión exacta</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Lo que figura en tu recibo vs. lo que te depositan. Con la <Link href="/" className="underline hover:text-emerald-700">calculadora completa</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Los dos pasos de la conversión</h2>
        <p><strong>Paso 1 — Aportes (17%):</strong> al bruto se le descuentan jubilación (11%), obra social (3%) y PAMI (3%). Eso te da el neto &laquo;antes de Ganancias&raquo;.</p>
        <p><strong>Paso 2 — Ganancias:</strong> si tu ganancia neta supera las deducciones de la ley, se retiene el impuesto con la escala del art. 94. Con los valores vigentes, un soltero sin hijos empieza a pagarlo cerca de los $3,5 millones brutos.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tabla de conversión 2026 (soltero sin hijos)</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Bruto</th>
                <th className="px-3 py-2">Neto</th>
                <th className="px-3 py-2">Ganancias/mes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium">{formatARS(f.bruto)}</td>
                  <td className="px-3 py-2 font-semibold">{formatARS(f.neto)}</td>
                  <td className="px-3 py-2">{f.alcanza ? `−${formatARS(f.impuesto)}` : "no paga"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Con cónyuge e hijos el neto es mayor (más deducciones). Tu caso exacto: <Link href="/" className="underline hover:text-emerald-700">calculadora bruto→neto</Link>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿El convenio modifica la conversión?</h3><p>Los aportes legales son iguales para todos, pero muchos convenios suman aportes sindicales (1-3%) sobre el bruto. Esos descuentos son adicionales a los que calculamos acá.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Los no remunerativos cuentan?</h3><p>No: conceptos no remunerativos (como algunos presentismos según convenio) no suman al bruto imponible ni generan aportes. Ojo: si superan el 20% del total, se reconvierten en remunerativos.</p></div>
      </section>

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal; verificá con un contador.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Sueldo bruto a neto: cómo hacer la conversión",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="sueldo-bruto-a-neto" />
    </article>
  );
}
