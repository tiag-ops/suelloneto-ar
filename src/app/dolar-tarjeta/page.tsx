import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Dólar tarjeta hoy: calculadora con percepciones | SueldoNeto.ar",
  description: "Cuánto pagás realmente el dólar tarjeta: dólar oficial + percepciones vigentes. Incluye ejemplo con USD 100. Gratis, actualizable.",
  keywords: ["dolar tarjeta", "dolar tarjeta hoy", "cuanto esta el dolar tarjeta", "impuesto dolar"],
  alternates: { canonical: "/dolar-tarjeta/" },
};

export default function PaginaDolarTarjeta() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">💳 Calculadora de Dólar Tarjeta</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">El dólar tarjeta aplica sobre el oficial las percepciones a compras en el exterior (Bienes Personales + Impuesto a los Gastos). Configurá los porcentajes vigentes del día.</p>
      </header>
      <Pagina />
    </div>
  );
}
