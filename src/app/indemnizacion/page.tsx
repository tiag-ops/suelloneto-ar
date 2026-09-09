import type { Metadata } from "next";
import Pagina from "./_cliente";
import { CALCULADORAS } from "@/lib/calculadoras";
import { JsonLd, webAppLd } from "@/lib/seo";

const META = CALCULADORAS.find((c) => c.slug === "indemnizacion")!
const WEB_APP = webAppLd({ name: META.titulo, description: META.descripcion, path: "/indemnizacion/" });

export const metadata: Metadata = {
  title: "Calculadora de Indemnización por despido | SueldoNeto.ar",
  description: "Indemnización por despido sin causa (art. 245 LCT): un sueldo por año + SAC proporcional. Estimación gratis.",
  keywords: ["calculadora indemnizacion", "indemnizacion por despido argentina", "cuanto me corresponde de indemnizacion"],
  alternates: { canonical: "/indemnizacion/" },
};

export default function PaginaIndemnizacion() {
  return (
    <>
      <Pagina />
      <JsonLd data={WEB_APP} />
    </>
  );
}
