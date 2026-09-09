import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";

const META = CALCULADORAS.find((c) => c.slug === "vacaciones")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/vacaciones/" });

export const metadata: Metadata = {
  title: "Calculadora de Vacaciones: días y pago | SueldoNeto.ar",
  description: "Días de vacaciones según antigüedad (arts. 150/156 LCT) y cuánto cobrás por ellos. Calculadora gratuita.",
  keywords: ["calculadora vacaciones", "dias de vacaciones argentina", "cuanto me pagan de vacaciones"],
  alternates: { canonical: "/vacaciones/" },
};

export default function PaginaVacaciones() {
  return (
    <>
      <Pagina />
      <JsonLd data={WEB_APP} />
    </>
  );
}
