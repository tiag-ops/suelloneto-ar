import type { Metadata } from "next";
import Link from "next/link";
import { tablaAguinaldo, formatARS2 } from "./_datos";

export const metadata: Metadata = {
  title: "Aguinaldo junio 2026: cuándo cobran y cómo se calcula | SueldoNeto.ar",
  description: "Fechas de cobro del aguinaldo junio 2026 y cálculo exacto: 50% del mejor sueldo del semestre, proporcional por meses trabajados. Calculadora incluida.",
  keywords: ["aguinaldo junio 2026", "cuando cobro el aguinaldo", "fechas aguinaldo 2026", "como se calcula el aguinaldo"],
  alternates: { canonical: "/guia/aguinaldo-junio-2026/" },
};

export default function Articulo() {
  const filas = tablaAguinaldo();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400 font-semibold">Guía · Aguinaldo</p>
        <h1 className="text-2xl font-bold tracking-tight">🎁 Aguinaldo junio 2026: fechas de cobro y cómo se calcula</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">El SAC del primer semestre se paga hasta el 30 de junio. Todos los montos están calculados con nuestra <Link href="/aguinaldo/" className="underline hover:text-emerald-600">calculadora de aguinaldo</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">La fecha límite</h2>
        <p>El artículo 123 de la Ley de Contrato de Trabajo es claro: el aguinaldo del primer semestre se paga <strong>como máximo el 30 de junio</strong>, y el del segundo semestre, el 18 de diciembre. Algunas convenciones colectivas adelantan el pago (muchos bancos y comercio pagan en la segunda quincena de junio), pero nunca pueden atrasarse de esas fechas.</p>
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
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm bg-white dark:bg-zinc-900">
            <thead>
              <tr className="text-left text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-3 py-2">Mejor sueldo del semestre</th>
                <th className="px-3 py-2">6 meses trabajados</th>
                <th className="px-3 py-2">3 meses trabajados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
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
        <p className="text-xs text-zinc-500">Cálculo: 50% del mejor sueldo × meses/6. Para tu caso exacto usá la <Link href="/aguinaldo/" className="underline hover:text-emerald-600">calculadora de aguinaldo</Link>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Sobre qué sueldo se calcula si tuve horas extras?</h3><p>Por la <strong>mejor</strong> remuneración del semestre: si un mes con horas extras o comisiones superó tu sueldo normal, ese es la base. Incluye todos los conceptos remunerativos habituales.</p></div>
        <div className="space-y-1"><h3 className="font-medium">Si me despidieron en junio, ¿cobre el SAC?</h3><p>Sí, proporcional: te corresponde el SAC por los meses trabajados del semestre, pagado junto con la liquidación final. <Link href="/aguinaldo-despido/" className="underline hover:text-emerald-600">Ver detalle en la guía de liquidación final</Link>.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿El aguinaldo paga Ganancias?</h3><p>Con el método doceava, el SAC queda exento en la mayoría de los casos porque se lo considera comprendido dentro de las deducciones acumuladas. En sueldos muy altos puede haber retención.</p></div>
      </section>

      <footer className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-xs text-zinc-500">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal ni laboral; verificá con un contador.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Aguinaldo junio 2026: cuándo cobran y cómo se calcula",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    </article>
  );
}
