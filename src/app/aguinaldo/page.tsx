import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";

const META = CALCULADORAS.find((c) => c.slug === "aguinaldo")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/aguinaldo/" });

export const metadata: Metadata = {
  title: "Calculadora de Aguinaldo (SAC) 2026 | SueldoNeto.ar",
  description: "Calculá tu aguinaldo semestral o proporcional según tu mejor sueldo y meses trabajados. Fórmula art. 121 LCT, gratis y sin registro.",
  keywords: ["calculadora aguinaldo", "aguinaldo 2026", "cuanto cobro de aguinaldo", "SAC"],
  alternates: { canonical: "/aguinaldo/" },
};

export default function PaginaAguinaldo() {
  return (
    <>
      <Pagina />
      <JsonLd data={WEB_APP} />
    </>
  );
}
