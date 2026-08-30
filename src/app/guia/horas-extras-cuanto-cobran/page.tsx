import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { tablaHoras, formatARS2 } from "./_datos";

export const metadata: Metadata = {
  title: "Horas extras: cuánto se cobra al 50% y 100% | SueldoNeto.ar",
  description: "Cuánto se cobra una hora extra en Argentina: +50% días hábiles, +100% sábados después de 13h, domingos y feriados. Ejemplos calculados 2026.",
  keywords: ["cuanto se cobra una hora extra", "horas extras 50 100", "valor hora extra argentina"],
  alternates: { canonical: "/guia/horas-extras-cuanto-cobran/" },
};

export default function Articulo() {
  const filas = tablaHoras();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Laboral</p>
        <h1 className="text-2xl font-bold tracking-tight">⏰ Horas extras: cuánto cobrás según el día</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Art. 201 LCT. Con la <Link href="/horas-extras/" className="underline hover:text-emerald-700">calculadora de horas extras</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Los recargos legales</h2>
        <p>Las horas que exceden la jornada legal se pagan con recargo sobre tu <strong>valor hora</strong> (sueldo mensual ÷ 200): <strong>+50%</strong> en días hábiles; <strong>+100%</strong> los sábados después de las 13h, domingos y feriados. Si tu convenio fija recargos mayores, aplican los del convenio.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Ejemplos calculados</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm bg-white dark:bg-zinc-900">
            <thead>
              <tr className="text-left text-xs text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-3 py-2">Sueldo mensual</th>
                <th className="px-3 py-2">Valor hora</th>
                <th className="px-3 py-2">10 hs extra al 50%</th>
                <th className="px-3 py-2">4 hs al 100%</th>
                <th className="px-3 py-2">Total del mes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium">{formatARS2(f.sueldo)}</td>
                  <td className="px-3 py-2">{formatARS2(f.valorHora)}</td>
                  <td className="px-3 py-2">{formatARS2(f.diezHoras50)}</td>
                  <td className="px-3 py-2">{formatARS2(f.cuatroHoras100)}</td>
                  <td className="px-3 py-2 font-semibold">{formatARS2(f.totalMes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Tu caso exacto, con tus horas reales: <Link href="/horas-extras/" className="underline hover:text-emerald-700">calculadora</Link>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Son obligatorias las horas extras?</h3><p>No podés ser forzado a hacerlas de forma permanente; la jornada máxima es de 8 horas diarias y 48 semanales (más 2 extras como máximo por día, solo por casos excepcionales).</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Las extras computan para el SAC y las vacaciones?</h3><p>Las extras <strong>habituales</strong> sí integran la remuneración y elevan el mejor sueldo del semestre (base del SAC) y las vacaciones. Las ocasionales, solo influyen si elevaron ese mes.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Jornada nocturna cambia el recargo?</h3><p>Las horas entre 21h y 6h ya se computan con un factor 1,2 por su duración (art. 200). Si además es una hora extra, se suma el recargo del 50% sobre ese valor.</p></div>
      </section>

      <footer className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        Estimación informativa; los convenios colectivos pueden mejorar estos mínimos.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Horas extras: cuánto se cobra al 50% y 100%",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="horas-extras-cuanto-cobran" />
    </article>
  );
}
