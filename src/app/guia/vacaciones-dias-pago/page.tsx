import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { JsonLd, graphLd, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { tablaVacas, formatARS2 } from "./_datos";
import FaqAcordeon from "../../faq-acordeon";

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
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Vacaciones</p>
        <h1 className="text-2xl font-bold tracking-tight">🏖️ Vacaciones: días según antigüedad y cuánto cobrás</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Art. 150 de la Ley de Contrato de Trabajo. <Link href="/vacaciones/" className="underline hover:text-emerald-700">Calculá tus vacaciones acá</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Los días según tu antigüedad</h2>
        <p>Las vacaciones en Argentina son <strong>días corridos</strong> (incluyen fines de semana y feriados que caigan dentro) y se escalonan por antigüedad: <strong>14 días</strong> hasta 5 años, <strong>21</strong> de 6 a 10, <strong>28</strong> de 11 a 20 y <strong>30</strong> desde los 21 años de antigüedad.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cuánto cobrás: el pago por día corrido</h2>
        <p>Las vacaciones se pagan a <strong>valor día</strong>: tu sueldo mensual dividido 25, por cada día corrido de vacaciones. Ejemplos con un sueldo de $4.000.000:</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Antigüedad</th>
                <th className="px-3 py-2">Días corridos</th>
                <th className="px-3 py-2">Pago total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
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
        <p className="text-base text-neutral-600 dark:text-neutral-400">Valor día de $4.000.000 = $160.000. Con tu sueldo real: <Link href="/vacaciones/" className="underline hover:text-emerald-700">calculadora de vacaciones</Link>.</p>
      </section>

      <FaqAcordeon
        items={[
            {
              q: "¿Se cobra la remuneración habitual durante las vacaciones?",
              a: (
                <>
                  Sí, más el pago proporcional de los días corridos extra: el sistema remunera las vacaciones con el valor día (mensual/25) por día corrido, lo que compensa los fines de semana incluidos.
                </>
              ),
            },
            {
              q: "¿Puedo fraccionar las vacaciones?",
              a: (
                <>
                  Solo por acuerdo entre las partes: una fracción mínima de 14 días y el resto en bloques no menores a 7 días. La época la fija el empleador considerando tu convenio, con una antelación mínima de 45 días.
                </>
              ),
            },
            {
              q: "¿Qué pasa si no las tomé?",
              a: (
                <>
                  Se convierten en indemnización: <Link href="/vacaciones-no-gozadas/" className="underline hover:text-emerald-700">vacaciones no gozadas</Link>, proporcional por mes trabajado.
                </>
              ),
            },
        ]}
        primeraAbierta
      />

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. No constituye asesoramiento laboral; verificá con un profesional.
      </footer>
    
      <JsonLd
        data={graphLd([
          articleLd({ headline: "Vacaciones: cuántos días te corresponden y cuánto cobrás", datePublished: "2026-08-28", dateModified: "2026-08-30", description: "Días de vacaciones según antigüedad (14, 21, 28 o 30) y cálculo del pago por día corrido. Ejemplos con montos reales 2026.", path: "/guia/vacaciones-dias-pago/" }),
          breadcrumbLd([["Inicio", "/"], ["Guías", "/guia/"], ["Vacaciones: días y pago", ""]]),
          faqLd([
          { q: "¿Se cobra la remuneración habitual durante las vacaciones?", a: "Sí, más el pago proporcional de los días corridos extra: el sistema remunera las vacaciones con el valor día (mensual/25) por día corrido, lo que compensa los fines de semana incluidos." },
          { q: "¿Puedo fraccionar las vacaciones?", a: "Solo por acuerdo entre las partes: una fracción mínima de 14 días y el resto en bloques no menores a 7 días. La época la fija el empleador considerando tu convenio, con una antelación mínima de 45 días." },
          { q: "¿Qué pasa si no las tomé?", a: "Se convierten en indemnización: vacaciones no gozadas, proporcional por mes trabajado." },
          ]),
        ])}
      />
      <BloqueArticulos slugActual="vacaciones-dias-pago" />
    </article>
  );
}
