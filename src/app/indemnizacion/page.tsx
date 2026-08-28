import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Calculadora de Indemnización por despido | SueldoNeto.ar",
  description: "Indemnización por despido sin causa (art. 245 LCT): un sueldo por año + SAC proporcional. Estimación gratis.",
  keywords: ["calculadora indemnizacion", "indemnizacion por despido argentina", "cuanto me corresponde de indemnizacion"],
  alternates: { canonical: "/indemnizacion/" },
};

export default function PaginaIndemnizacion() {
  return <Pagina />;
}
