import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Simulador de Plazo Fijo 2026: interés y TEA | SueldoNeto.ar",
  description: "Simulá tu plazo fijo en pesos: interés ganado por días o meses, con o sin renovación mensual, y la TEA equivalente de cualquier TNA. Gratis.",
  keywords: ["simulador plazo fijo", "calculadora plazo fijo", "plazo fijo argentina", "TEA TNA"],
  alternates: { canonical: "/plazo-fijo/" },
};

export default function PaginaPlazoFijo() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">📈 Simulador de Plazo Fijo</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">El interés del plazo fijo en pesos se liquidan con TNA (tasa nominal anual). Con renovación automática mes a mes ganás interés compuesto. La TEA es lo que realmente aplica tu dinero en un año.</p>
      </header>
      <Pagina />
    </div>
  );
}
