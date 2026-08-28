import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Calculadora de días hábiles entre fechas | SueldoNeto.ar",
  description: "Días hábiles entre dos fechas: descuenta fines de semana y feriados nacionales 2026 de Argentina.",
  keywords: ["calculadora dias habiles", "dias habiles entre dos fechas", "dias corridos"],
  alternates: { canonical: "/dias-habiles/" },
};

export default function PaginaDiasHabiles() {
  return <Pagina />;
}
