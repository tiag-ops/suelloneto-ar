import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Simulador de Crédito: cuota fija | SueldoNeto.ar",
  description: "Calculá la cuota de tu préstamo con sistema francés (cuota fija): monto, TNA y plazo. Total de intereses incluido. Gratis y sin registro.",
  keywords: ["simulador credito", "calculadora prestamo cuota", "sistema frances cuota fija"],
  alternates: { canonical: "/credito/" },
};

export default function PaginaCredito() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">🏦 Simulador de Crédito / Préstamo</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">La cuota fija del sistema francés es constante todo el préstamo: al principio pagás más intereses y al final más capital. No incluye seguros ni gastos administrativos.</p>
      </header>
      <Pagina />
    </div>
  );
}
