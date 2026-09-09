import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";

const META = CALCULADORAS.find((c) => c.slug === "dias-habiles")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/dias-habiles/" });

export const metadata: Metadata = {
  title: "Calculadora de días hábiles entre fechas | SueldoNeto.ar",
  description: "Días hábiles entre dos fechas: descuenta fines de semana y feriados nacionales 2026 de Argentina.",
  keywords: ["calculadora dias habiles", "dias habiles entre dos fechas", "dias corridos"],
  alternates: { canonical: "/dias-habiles/" },
};

export default function PaginaDiasHabiles() {
  return (
    <>
      <Pagina />
      <JsonLd data={WEB_APP} />
    </>
  );
}
