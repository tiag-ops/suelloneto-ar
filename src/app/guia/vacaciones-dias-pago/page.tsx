import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { tablaVacas, formatARS2 } from "./_datos";

export const metadata: Metadata = {
  title: "Vacaciones: cuántos días te corresponden y cuánto cobrás | SueldoNeto.ar",
  description: "Días de vacaciones según antigüedad (14, 21, 28 o 30) y cálculo del pago por día corrido. Ejemplos con montos reales 2026.",
  keywords: ["cuantos dias de vacaciones me corresponden", "vacaciones calculo pago", "vacaciones argentina antiguedad"],
  alternates: { canonical: "/guia/vacaciones-dias-pago/" },
};

export default function Articulo() {
  const filas = tablaVacas();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400 font-semibold">Guía · Vacaciones</p>
        <h1 className="text-2xl font-bold tracking-tight">🏖️ Vacaciones: días según antigüedad y cuánto cobrás</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Art. 150 de la Ley de Contrato de Trabajo. <Link href="/vacaciones/" className="underline hover:text-emerald-600">Calculá tus vacaciones acá</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Los días según tu antigüedad</h2>
        <p>Las vacaciones en Argentina son <strong>días corridos</strong> (incluyen fines de semana y feriados que caigan dentro) y se escalonan por antigüedad: <strong>14 días</strong> hasta 5 años, <strong>21</strong> de 6 a 10, <strong>28</strong> de 11 a 20 y <strong>30</strong> desde los 21 años de antigüedad.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cuánto cobrás: el pago por día corrido</h2>
        <p>Las vacaciones se pagan a <strong>valor día</strong>: tu sueldo mensual dividido 25, por cada día corrido de vacaciones. Ejemplos con un sueldo de $4.000.000:</p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm bg-white dark:bg-zinc-900">
            <thead>
              <tr className="text-left text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-3 py-2">Antigüedad</th>
                <th className="px-3 py-2">Días corridos</th>
                <th className="px-3 py-2">Pago total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2">{f.antiguedad} años</td>
                  <td className="px-3 py-2 font-semibold">{f.dias}</td>
                  <td className="px-3 py-2">{formatARS2(f.pago)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">Valor día de $4.000.000 = $160.000. Con tu sueldo real: <Link href="/vacaciones/" className="underline hover:text-emerald-600">calculadora de vacaciones</Link>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Se cobra la remuneración habitual durante las vacaciones?</h3><p>Sí, más el pago proporcional de los días corridos extra: el sistema remunera las vacaciones con el valor día (mensual/25) por día corrido, lo que compensa los fines de semana incluidos.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Puedo fraccionar las vacaciones?</h3><p>Solo por acuerdo entre las partes: una fracción mínima de 14 días y el resto en bloques no menores a 7 días. La época la fija el empleador considerando tu convenio, con una antelación mínima de 45 días.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Qué pasa si no las tomé?</h3><p>Se convierten en indemnización: <Link href="/vacaciones-no-gozadas/" className="underline hover:text-emerald-600">vacaciones no gozadas</Link>, proporcional por mes trabajado.</p></div>
      </section>

      <footer className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-xs text-zinc-500">
        Herramienta informativa. No constituye asesoramiento laboral; verificá con un profesional.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Vacaciones: cuántos días te corresponden y cuánto cobrás",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="vacaciones-dias-pago" />
    </article>
  );
}
