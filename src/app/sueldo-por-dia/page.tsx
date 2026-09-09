import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";

const META = CALCULADORAS.find((c) => c.slug === "sueldo-por-dia")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/sueldo-por-dia/" });

export const metadata: Metadata = {
  title: "Sueldo por día y por hora | SueldoNeto.ar",
  description: "Descomponé tu sueldo mensual en valor diario (÷25) y valor hora (÷200). Convención de liquidación argentina.",
  keywords: ["sueldo por dia", "cuanto es mi hora de trabajo", "valor dia trabajo argentina"],
  alternates: { canonical: "/sueldo-por-dia/" },
};

export default function PaginaSueldoPorDia() {
  return (
    <>
      <Pagina />
      <JsonLd data={WEB_APP} />
    </>
  );
}
