import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { datosEscala } from "./_datos";

export const metadata: Metadata = {
  title: "Escala Ganancias 2026: tabla del artículo 94 (S2) | SueldoNeto.ar",
  description: "Escala progresiva del art. 94 vigente julio-diciembre 2026: tramos, montos fijos y alícuotas. Con ejemplos calculados.",
  keywords: ["escala ganancias 2026", "tabla ganancias 2026", "articulo 94 escala", "tramos ganancias"],
  alternates: { canonical: "/guia/escala-ganancias-2026/" },
};

export default function Articulo() {
  const { tramos, ejemplos, formatARS, formatARS2 } = datosEscala();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Ganancias</p>
        <h1 className="text-2xl font-bold tracking-tight">📊 Escala del Impuesto a las Ganancias 2026 (art. 94)</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Tabla vigente para haberes percibidos de julio a diciembre de 2026 (RG 4003). Fuente: ARCA.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cómo leer la escala</h2>
        <p>Ganancias es <strong>progresivo</strong>: no se aplica una única alícuota a todo tu ingreso, sino que la ganancia neta se divide en tramos y cada tramo paga su tasa. El &laquo;monto fijo&raquo; es lo acumulado por los tramos anteriores.</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Ganancia neta acumulada desde</th>
                <th className="px-3 py-2">Hasta</th>
                <th className="px-3 py-2">Monto fijo</th>
                <th className="px-3 py-2">Más % sobre el excedente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {tramos.map((t, i) => (
                <tr key={i}>
                  <td className="px-3 py-2">{formatARS2(t.desde)}</td>
                  <td className="px-3 py-2">{t.hasta === null ? "en adelante" : formatARS2(t.hasta)}</td>
                  <td className="px-3 py-2">{formatARS2(t.fijo)}</td>
                  <td className="px-3 py-2 font-semibold">{t.porcentaje}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Ejemplos liquidados con esta escala</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Empleados solteros sin hijos, con el método doceava de la RG 4003:</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Sueldo bruto</th>
                <th className="px-3 py-2">GNI proyectada dic.</th>
                <th className="px-3 py-2">Impuesto del período</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ejemplos.map((e, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium">{formatARS(e.bruto)}</td>
                  <td className="px-3 py-2">{formatARS(e.gni)}</td>
                  <td className="px-3 py-2 font-semibold">{formatARS(e.impuesto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Calculado con nuestra <Link href="/" className="underline hover:text-emerald-700">calculadora de sueldo neto</Link>. Con cónyuge e hijos las deducciones aumentan y el impuesto baja.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Cada cuánto se actualiza la escala?</h3><p>Por ley, dos veces por año: en enero y en julio, según la inflación (IPC) del semestre previo. ARCA publica las tablas oficiales y los empleadores deben aplicarlas desde el mes de entrada en vigencia.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Por qué la escala es &laquo;anual&raquo; si me retienen por mes?</h3><p>Porque el método de retención (doceava) proyecta tu ganancia neta acumulada del año y consulta la escala acumulada del mes. La retención de cada mes es la diferencia contra el mes anterior. En diciembre, la escala acumulada coincide con la anual.</p></div>
      </section>

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal; verificá con un contador.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Escala del Impuesto a las Ganancias 2026 (art. 94)",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="escala-ganancias-2026" />
    </article>
  );
}
