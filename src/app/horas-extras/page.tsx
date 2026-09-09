import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";

const META = CALCULADORAS.find((c) => c.slug === "horas-extras")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/horas-extras/" });

export const metadata: Metadata = {
  title: "Calculadora de Horas Extras 50% y 100% | SueldoNeto.ar",
  description: "Cuánto cobrás por horas extras al 50% y 100% según art. 201 LCT. Valor hora = mensual/200.",
  keywords: ["calculadora horas extras", "horas extras 50 100 argentina", "valor hora extras"],
  alternates: { canonical: "/horas-extras/" },
};

export default function PaginaHorasExtras() {
  return (
    <>
      <Pagina />
      <JsonLd data={WEB_APP} />
    </>
  );
}
