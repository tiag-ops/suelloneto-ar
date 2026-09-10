import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { JsonLd, graphLd, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { tablaIndemnizacion, formatARS2 } from "./_datos";
import FaqAcordeon from "../../faq-acordeon";

export const metadata: Metadata = {
  title: "Indemnización por despido 2026: cómo se calcula | SueldoNeto.ar",
  description: "Cómo se calcula la indemnización por despido sin causa: un sueldo por año, SAC proporcional, preaviso y vacaciones no gozadas. Ejemplos 2026.",
  keywords: ["indemnizacion despido 2026", "como se calcula la indemnizacion", "cuanto me corresponde despido"],
  alternates: { canonical: "/guia/indemnizacion-despido-2026/" },
};

export default function Articulo() {
  const filas = tablaIndemnizacion();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Laboral</p>
        <h1 className="text-2xl font-bold tracking-tight">💼 Indemnización por despido 2026: cómo se calcula</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Art. 245 LCT. Con <Link href="/indemnizacion/" className="underline hover:text-emerald-700">nuestra calculadora de indemnización</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Los componentes de la liquidación final</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Indemnización por antigüedad</strong> (art. 245): una mejor remuneración mensual por cada año de servicio o fracción mayor a 3 meses.</li>
          <li><strong>SAC proporcional</strong>: el aguinaldo del semestre en curso, a razón de 1/12 por mes.</li>
          <li><strong>Vacaciones no gozadas</strong> (art. 156): proporcional por el año de trabajo.</li>
          <li><strong>Indemnización sustitutiva de preaviso</strong> (si no te lo dieron): 1 o 2 meses de sueldo según antigüedad.</li>
          <li><strong>Salario del mes</strong> y días trabajados pendientes de pago.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tabla: indemnización según antigüedad</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Con una mejor remuneración de $4.000.000, 4 meses del semestre en curso e incluyendo vacaciones no gozadas proporcionales (6 meses):</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Antigüedad</th>
                <th className="px-3 py-2">Por antigüedad</th>
                <th className="px-3 py-2">SAC prop.</th>
                <th className="px-3 py-2">Vac. no gozadas</th>
                <th className="px-3 py-2">Total aprox.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium">{f.anios} años</td>
                  <td className="px-3 py-2">{formatARS2(f.base)}</td>
                  <td className="px-3 py-2">{formatARS2(f.sac)}</td>
                  <td className="px-3 py-2">{formatARS2(f.vacNoGozadas)}</td>
                  <td className="px-3 py-2 font-semibold">{formatARS2(f.total + f.vacNoGozadas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-neutral-600 dark:text-neutral-400">No incluye preaviso ni integración del mes. Calculá tu caso con tu sueldo real en la <Link href="/indemnizacion/" className="underline hover:text-emerald-700">calculadora de indemnización</Link>.</p>
      </section>

      <FaqAcordeon
        items={[
            {
              q: "¿Sobre qué sueldo se calcula?",
              a: (
                <>
                  Sobre la <strong>mejor remuneración mensual, normal y habitual</strong> del último año (incluye comisiones, horas extras habituales y premios), no necesariamente el último sueldo.
                </>
              ),
            },
            {
              q: "¿Qué es el «tope CCT»?",
              a: (
                <>
                  La mejor remuneración no puede superar el promedio de las 12 mejores del convenio: si ganás más que el tope de tu convenio, la indemnización se calcula con el tope. Es un punto de reclamo frecuente.
                </>
              ),
            },
            {
              q: "Si me despiden por causa justificada, ¿cobro algo?",
              a: (
                <>
                  Cobrás el salario adeudado, SAC proporcional y vacaciones no gozadas, pero <strong>no</strong> la indemnización por antigüedad ni el preaviso. El despido discriminatorio o incausado tiene protecciones adicionales.
                </>
              ),
            },
        ]}
        primeraAbierta
      />

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Estimación informativa. Tu liquidación final puede incluir otros conceptos; consultá con un laboralista.
      </footer>
    
      <JsonLd
        data={graphLd([
          articleLd({ headline: "Indemnización por despido 2026: cómo se calcula", datePublished: "2026-08-28", dateModified: "2026-08-30", description: "Cómo se calcula la indemnización por despido sin causa: un sueldo por año, SAC proporcional, preaviso y vacaciones no gozadas. Ejemplos 2026.", path: "/guia/indemnizacion-despido-2026/" }),
          breadcrumbLd([["Inicio", "/"], ["Guías", "/guia/"], ["Indemnización por despido 2026", ""]]),
          faqLd([
          { q: "¿Sobre qué sueldo se calcula?", a: "Sobre la mejor remuneración mensual, normal y habitual del último año (incluye comisiones, horas extras habituales y premios), no necesariamente el último sueldo." },
          { q: "¿Qué es el tope CCT?", a: "La mejor remuneración no puede superar el promedio de las 12 mejores del convenio: si ganás más que el tope de tu convenio, la indemnización se calcula con el tope. Es un punto de reclamo frecuente." },
          { q: "Si me despiden por causa justificada, ¿cobro algo?", a: "Cobrás el salario adeudado, SAC proporcional y vacaciones no gozadas, pero no la indemnización por antigüedad ni el preaviso. El despido discriminatorio o incausado tiene protecciones adicionales." },
          ]),
        ])}
      />
      <BloqueArticulos slugActual="indemnizacion-despido-2026" />
    </article>
  );
}
