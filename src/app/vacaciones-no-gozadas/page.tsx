import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Vacaciones no gozadas: calculadora de indemnización | SueldoNeto.ar",
  description: "Indemnización por vacaciones no gozadas al terminar la relación laboral, proporcional por mes (art. 156 LCT).",
  keywords: ["vacaciones no gozadas", "indemnizacion vacaciones no gozadas"],
  alternates: { canonical: "/vacaciones-no-gozadas/" },
};

export default function PaginaVacacionesNoGozadas() {
  return <Pagina />;
}
