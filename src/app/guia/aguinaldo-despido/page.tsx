import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";
import { calcularAguinaldo } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

export const metadata: Metadata = {
  title: "Me despidieron: ¿me corresponde aguinaldo y vacaciones? | SueldoNeto.ar",
  description: "Qué te deben pagar en una liquidación final: aguinaldo proporcional, vacaciones no gozadas, preaviso e indemnización. Con ejemplos.",
  keywords: ["aguinaldo proporcional despido", "liquidacion final despido", "me despidieron que me corresponde"],
  alternates: { canonical: "/guia/aguinaldo-despido/" },
};

export default function Articulo() {
  const ejemplos = [2, 4, 6].map((meses) => ({
    meses,
    sac: calcularAguinaldo(4_000_000, meses).sac,
  }));
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Laboral</p>
        <h1 className="text-2xl font-bold tracking-tight">⚖️ Me despidieron: todo lo que te deben pagar</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">La liquidación final tiene más conceptos que la sola indemnización. <Link href="/indemnizacion/" className="underline hover:text-emerald-700">Calculá tu liquidación completa</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">El aguinaldo proporcional</h2>
        <p>El SAC <strong>no se pierde con el despido</strong>: cobrás la parte proporcional del semestre en curso a razón de 1/12 por mes trabajado (art. 123 LCT). Con un mejor sueldo de $4.000.000:</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Meses trabajados del semestre</th>
                <th className="px-3 py-2">SAC proporcional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ejemplos.map((e, i) => (
                <tr key={i}>
                  <td className="px-3 py-2">{e.meses} meses</td>
                  <td className="px-3 py-2 font-semibold">{formatARS2(e.sac)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Checklist completo de tu liquidación final</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Salario por los días trabajados del mes del despido.</li>
          <li><strong>SAC proporcional</strong> del semestre en curso.</li>
          <li><strong>Vacaciones no gozadas</strong> proporcionales (art. 156).</li>
          <li><strong>Indemnización por antigüedad</strong> si el despido fue sin causa (art. 245).</li>
          <li><strong>Preaviso</strong> o su sustitutiva indemnizatoria (1 o 2 meses).</li>
          <li>Certificado de trabajo y cobertura de obra social por 12 meses más (Ley 26.171).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Los fracciones de mes cuentan para el SAC?</h3><p>Sí: los días trabajados en el mes del despido cuentan como fracción del doceavo, prorrateados por días.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Y si me despiden en diciembre?</h3><p>Cobrás el SAC proporcional del segundo semestre junto con la liquidación (más el del primero si correspondiera por pactos). El pago del 18/12 solo aplica si seguís trabajando.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Qué hago si no me pagan en término?</h3><p>La liquidación final genera intereses desde el despido. Podés enviar un telegrama laboral (Carta Documento) reclamando las sumas y luego hacer el reclamo ante el SECLO o la justicia laboral, con honorarios a cargo del empleador si ganás.</p></div>
      </section>

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Estimación informativa; consultá con un laboralista tu caso concreto.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Me despidieron: ¿me corresponde aguinaldo y vacaciones?",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="aguinaldo-despido" />
    </article>
  );
}
