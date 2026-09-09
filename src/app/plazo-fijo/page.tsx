import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";
import CuentaRecomendada from "@/components/cuenta-recomendada";

const META = CALCULADORAS.find((c) => c.slug === "plazo-fijo")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/plazo-fijo/" });

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
        <p className="text-base text-neutral-600 dark:text-neutral-400">El interés del plazo fijo en pesos se liquidan con TNA (tasa nominal anual). Con renovación automática mes a mes ganás interés compuesto. La TEA es lo que realmente aplica tu dinero en un año.</p>
      </header>
      <Pagina />
      <JsonLd data={WEB_APP} />
      <CuentaRecomendada titulo="¿Te sobra todos los meses? Hacelo rendir" />
    </div>
  );
}
