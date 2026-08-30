import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { tablaMono } from "./_datos";

export const metadata: Metadata = {
  title: "Monotributo 2026: cuánto pago por mes según mi categoría | SueldoNeto.ar",
  description: "Cuánto se paga de monotributo en 2026: cuotas de todas las categorías desde el 01/08/2026, desglose de impuesto integrado, SIPA y obra social.",
  keywords: ["cuanto se paga monotributo 2026", "monotributo cuota mensual", "cuanto sale el monotributo"],
  alternates: { canonical: "/guia/monotributo-cuanto-pago/" },
};

export default function Articulo() {
  const { cats, formatARS, formatARS2 } = tablaMono();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Monotributo</p>
        <h1 className="text-2xl font-bold tracking-tight">🧾 Monotributo 2026: cuánto pagás por mes según tu categoría</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Valores oficiales de ARCA con aplicación desde el 01/08/2026. <Link href="/monotributo/" className="underline hover:text-emerald-700">¿No sabés tu categoría? Calculala acá</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">De qué está hecha la cuota</h2>
        <p>La cuota mensual del monotributo suma tres componentes: el <strong>impuesto integrado</strong> (que reemplaza IVA y Ganancias por tu actividad), el <strong>aporte al SIPA</strong> (jubilación) y el <strong>aporte obra social</strong>. En las categorías A y B la cuota es igual para servicios y venta de cosas; desde la C el impuesto integrado difiere.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cuotas por categoría (desde 01/08/2026)</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm bg-white dark:bg-zinc-900">
            <thead>
              <tr className="text-left text-xs text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-3 py-2">Cat.</th>
                <th className="px-3 py-2">Tope facturación anual</th>
                <th className="px-3 py-2">Cuota servicios</th>
                <th className="px-3 py-2">Cuota bienes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {cats.map((c) => (
                <tr key={c.categoria}>
                  <td className="px-3 py-2 font-bold">{c.categoria}</td>
                  <td className="px-3 py-2">{formatARS(c.topeIngresosAnual)}</td>
                  <td className="px-3 py-2 font-semibold">{formatARS2(c.cuotaServicios)}</td>
                  <td className="px-3 py-2">{formatARS2(c.cuotaBienes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Desglose completo de cada categoría (SIPA y obra social por separado) en la <Link href="/monotributo/" className="underline hover:text-emerald-700">tabla completa de monotributo</Link>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Cuándo se recategoriza el monotributo?</h3><p>ARCA habilita la recategorización dos veces por año, en enero y julio (y también puede recategorizar de oficio si tu facturación lo justifica). Si superaste el tope de tu categoría, tenés que pasar a la que corresponda; si superás el tope de la K, salís del régimen.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Puedo pagar menos si facturé poco?</h3><p>No hay proporcionalidad: la cuota de tu categoría se paga completa cada mes, factures o no. Por eso conviene proyectar bien tu categoría al inscribirte.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿La cuota incluye la jubilación?</h3><p>Sí: el aporte SIPA está incluido en la cuota y te suma años de aportes para la jubilación. La obra social también: elegís una obra social del NUSH y ella recibe ese componente.</p></div>
      </section>

      <footer className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal; verificá con un contador.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Monotributo 2026: cuánto pago por mes según mi categoría",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="monotributo-cuanto-pago" />
    </article>
  );
}
