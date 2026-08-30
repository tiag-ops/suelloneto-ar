import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dólar tarjeta: cómo se calcula y qué percepciones tiene | SueldoNeto.ar",
  description: "Cómo sale el dólar tarjeta: dólar oficial más percepciones de Bienes Personales e Impuesto a los Gastos. Ejemplo paso a paso con USD 100.",
  keywords: ["dolar tarjeta como se calcula", "percepciones dolar tarjeta", "dolar exterior impuestos"],
  alternates: { canonical: "/guia/dolar-tarjeta-como-se-calcula/" },
};

export default function Articulo() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">Guía · Dólar</p>
        <h1 className="text-2xl font-bold tracking-tight">💳 Dólar tarjeta: cómo se calcula paso a paso</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Lo que realmente pagás cuando comprás en el exterior o contrataste un servicio en dólares. Con la <Link href="/dolar-tarjeta/" className="underline hover:text-emerald-700">calculadora de dólar tarjeta</Link>.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">La fórmula</h2>
        <p>El dólar tarjeta no es una cotización: es el <strong>dólar oficial más las percepciones</strong> que se aplican a consumos en moneda extranjera con tarjetas. Históricamente se compuso de un impuesto a los gastos en el exterior (Ley de Solidaridad), la percepción de Bienes Personales y la percepción de Ganancias. Los porcentajes cambian con cada modificación normativa — configurá los vigentes del día en la calculadora.</p>
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 text-sm">
          <p><strong>Ejemplo con 75% de recargo total:</strong> oficial $1.200 → $1.200 × 1,75 = <strong>$2.100 por dólar</strong>. Una suscripción de USD 10 te cuesta $21.000.</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Qué consumos lo aplican</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Compras con tarjeta en el exterior (tiendas y servicios).</li>
          <li>Suscripciones digitales: Netflix, Spotify, iCloud, ChatGPT, etc.</li>
          <li>Servicios de streaming, hosting y SaaS contratados desde Argentina.</li>
          <li>Compras en sitios del exterior con envío al país.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-1"><h3 className="font-medium">¿Qué cotización toma el banco?</h3><p>El dólar oficial vendedor del día en que el banco procesa el consumo, que puede diferir unos días de la fecha de compra. Por eso el importe final a veces no coincide con tu estimación.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Las percepciones se pueden recuperar?</h3><p>La percepción de Bienes Personales se puede computar como pago a cuenta del impuesto si presentás la DDJJ (o pedir su devolución si no alcanzás el mínimo imponible). La de Ganancias funciona igual para quienes lo liquidan. Requiere trámite en ARCA.</p></div>
        <div className="space-y-1"><h3 className="font-medium">¿Hay un impuesto específico para streaming?</h3><p>Los porcentajes cambiaron varias veces en los últimos años. La estructura vigente al día la ves resumida en la <Link href="/dolar-tarjeta/" className="underline hover:text-emerald-700">calculadora</Link>; antes de una compra grande, verificá los porcentajes en la página oficial de ARCA.</p></div>
      </section>

      <footer className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        Herramienta informativa. Verificá las percepciones vigentes en ARCA antes de operar; no constituye asesoramiento fiscal.
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Dólar tarjeta: cómo se calcula y qué percepciones tiene",
        inLanguage: "es-AR",
        author: { "@type": "Organization", name: "SueldoNeto.ar" },
      }) }} />
    
      <BloqueArticulos slugActual="dolar-tarjeta-como-se-calcula" />
    </article>
  );
}
