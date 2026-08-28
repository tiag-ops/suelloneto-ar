import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Calculadora de Vacaciones: días y pago | SueldoNeto.ar",
  description: "Días de vacaciones según antigüedad (arts. 150/156 LCT) y cuánto cobrás por ellos. Calculadora gratuita.",
  keywords: ["calculadora vacaciones", "dias de vacaciones argentina", "cuanto me pagan de vacaciones"],
  alternates: { canonical: "/vacaciones/" },
};

export default function PaginaVacaciones() {
  return <Pagina />;
}
