import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { JsonLd, graphLd, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { tablaAguinaldo, formatARS2 } from "./_datos";
import FaqAcordeon from "../../faq-acordeon";

export const metadata: Metadata = {
  title: "Aguinaldo 2026: fechas de cobro de junio y diciembre (SAC) | SueldoNeto.ar",
  description: "Fechas de cobro del aguinaldo 2026 (30 de junio y 18 de diciembre) y cálculo exacto del SAC: 50% del mejor sueldo del semestre, proporcional por meses. Calculadora incluida.",
  keywords: ["aguinaldo junio 2026", "aguinaldo diciembre 2026", "cuando cobro el aguinaldo", "fechas aguinaldo 2026", "como se calcula el aguinaldo"],
  alternates: { canonical: "/guia/aguinaldo-junio-2026/" },
};

export default function Articulo() {
  const filas = tablaAguinaldo();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Aguinaldo</p>
        <h1 className="text-2xl font-bold tracking-tight">🎁 Aguinaldo 2026: fechas de cobro (junio y diciembre) y cómo se calcula</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">El aguinaldo 2026 se paga en dos fechas: el SAC del primer semestre, hasta el 30 de junio, y el del segundo semestre, hasta el 18 de diciembre. Todos los montos están calculados con nuestra <Link href="/aguinaldo/" className="underline hover:text-emerald-700">calculadora de aguinaldo</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Las fechas límite de 2026</h2>
        <p>El artículo 123 de la Ley de Contrato de Trabajo es claro: el aguinaldo del primer semestre se paga <strong>como máximo el 30 de junio</strong>, y el del segundo semestre, <strong>el 18 de diciembre</strong>. Algunas convenciones colectivas adelantan el pago (bancos y comercio suelen pagar en la segunda quincena de junio y a mediados de diciembre), pero nunca pueden atrasarse de esas fechas.</p>
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 text-sm">
          <p><strong>Aguinaldo diciembre 2026:</strong> se calcula sobre tu mejor sueldo de julio a diciembre y se abona como máximo el 18/12/2026. Si en diciembre cobrís el sueldo + el SAC y te despiden después, los dos ya fueron devengados: el proporcional de diciembre entra en la liquidación final.</p>
        </div>
        <p>Si tu empleador no paga en término, genera intereses automáticamente y podés reclamarlo; el SAC tiene las mismas garantías de cobro que el salario.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cómo se calcula</h2>
        <p>El aguinaldo es el <strong>50% de la mejor remuneración mensual</strong> del semestre (enero–junio para el SAC de junio). Si trabajaste el semestre completo, cobrás exactamente medio sueldo. Si no, se prorratea: <strong>un doceavo (1/12) por cada mes trabajado</strong>, y las fracciones de más de 10 días cuentan como mes completo.</p>
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 text-sm">
          <p><strong>Ejemplo:</strong> tu mejor sueldo del semestre fue de $4.000.000 y trabajaste los 6 meses → aguinaldo = $2.000.000. Si solo trabajaste 3 meses → $1.000.000.</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tabla: cuánto cobrás según tu sueldo</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Mejor sueldo del semestre</th>
                <th className="px-3 py-2">6 meses trabajados</th>
                <th className="px-3 py-2">3 meses trabajados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium">{formatARS2(f.sueldo)}</td>
                  <td className="px-3 py-2 font-semibold">{formatARS2(f.semestreCompleto)}</td>
                  <td className="px-3 py-2">{formatARS2(f.tresMeses)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-neutral-600 dark:text-neutral-400">Cálculo: 50% del mejor sueldo × meses/6. Para tu caso exacto usá la <Link href="/aguinaldo/" className="underline hover:text-emerald-700">calculadora de aguinaldo</Link>.</p>
      </section>

      <FaqAcordeon
        items={[
            {
              q: "¿Sobre qué sueldo se calcula si tuve horas extras?",
              a: (
                <>
                  Por la <strong>mejor</strong> remuneración del semestre: si un mes con horas extras o comisiones superó tu sueldo normal, ese es la base. Incluye todos los conceptos remunerativos habituales.
                </>
              ),
            },
            {
              q: "Si me despidieron en junio, ¿cobre el SAC?",
              a: (
                <>
                  Sí, proporcional: te corresponde el SAC por los meses trabajados del semestre, pagado junto con la liquidación final. <Link href="/guia/aguinaldo-despido/" className="underline hover:text-emerald-700">Ver detalle en la guía de liquidación final</Link>.
                </>
              ),
            },
            {
              q: "¿El aguinaldo paga Ganancias?",
              a: (
                <>
                  Con el método doceava, el SAC queda exento en la mayoría de los casos porque se lo considera comprendido dentro de las deducciones acumuladas. En sueldos muy altos puede haber retención.
                </>
              ),
            },
        ]}
        primeraAbierta
      />

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal ni laboral; verificá con un contador.
      </footer>
    
      <JsonLd
        data={graphLd([
          articleLd({ headline: "Aguinaldo junio 2026: cuándo cobran y cómo se calcula", datePublished: "2026-08-28", dateModified: "2026-08-30", description: "Fechas de cobro del aguinaldo 2026 (30 de junio y 18 de diciembre) y cálculo exacto del SAC: 50% del mejor sueldo del semestre, proporcional por meses. Calculadora incluida.", path: "/guia/aguinaldo-junio-2026/" }),
          breadcrumbLd([["Inicio", "/"], ["Guías", "/guia/"], ["Aguinaldo junio 2026", ""]]),
          faqLd([
          { q: "¿Sobre qué sueldo se calcula si tuve horas extras?", a: "Por la mejor remuneración del semestre: si un mes con horas extras o comisiones superó tu sueldo normal, ese es la base. Incluye todos los conceptos remunerativos habituales." },
          { q: "Si me despidieron en junio, ¿cobré el SAC?", a: "Sí, proporcional: te corresponde el SAC por los meses trabajados del semestre, pagado junto con la liquidación final." },
          { q: "¿El aguinaldo paga Ganancias?", a: "Con el método doceava, el SAC queda exento en la mayoría de los casos porque se lo considera comprendido dentro de las deducciones acumuladas. En sueldos muy altos puede haber retención." },
          ]),
        ])}
      />
      <BloqueArticulos slugActual="aguinaldo-junio-2026" />
    </article>
  );
}
