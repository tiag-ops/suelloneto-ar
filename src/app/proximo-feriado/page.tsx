import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Próximo feriado en Argentina 2026 | SueldoNeto.ar",
  description: "Cuánto falta para el próximo feriado nacional: calendario completo 2026 con fechas y tipos.",
  keywords: ["proximo feriado", "feriados 2026 argentina", "calendario feriados"],
  alternates: { canonical: "/proximo-feriado/" },
};

export default function PaginaProximoFeriado() {
  return <Pagina />;
}
