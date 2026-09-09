import type { Metadata } from "next";
import Link from "next/link";
import { BloqueArticulos } from "../../enlaces";
import { JsonLd, graphLd, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { FERIADOS_2027 } from "@/lib/feriados";

export const metadata: Metadata = {
  title: "Aguinaldo y Ganancias 2026: ¿el SAC paga impuesto? | SueldoNeto.ar",
  description:
    "¿El aguinaldo paga Ganancias en 2026? Cómo lo retiene tu empleador (método doceava, RG 4003), cuándo queda exento y cómo lo devuelve la liquidación anual. Con calculadora.",
  keywords: [
    "aguinaldo paga ganancias",
    "el aguinaldo paga ganancias 2026",
    "sac ganancias",
    "retencion aguinaldo",
  ],
  alternates: { canonical: "/guia/aguinaldo-y-ganancias/" },
};

const FAQs = [
  {
    q: "¿El aguinaldo paga Ganancias en 2026?",
    a: "Depende de tu sueldo. El SAC entra en la base imponible, pero el método del doceavo (RG 4003 de ARCA) lo absorbe con las deducciones acumuladas del año en la mayoría de los casos. Solo con sueldos muy altos aparece retención sobre el aguinaldo.",
  },
  {
    q: "¿Por qué me retuvieron Ganancias con el aguinaldo?",
    a: "Porque tu remuneración anual proyectada supera el tope de deducciones. El empleador liquida el SAC junto con el sueldo del mes y aplica el método del artículo 7: si la ganancia neta proyectada lo excede, retiene. En diciembre lo compensa la liquidación final.",
  },
  {
    q: "¿Cómo hago para que me devuelvan lo retenido?",
    a: "Nada: la liquidación anual de Ganancias que hace tu empleador (art. 26, RG 4003) recalcula el año entero y devuelve automáticamente lo retenido de más en las liquidaciones de mayo-junio siguientes. No necesitás presentar nada si tu único empleador fue ese.",
  },
];

export default function Articulo() {
  const primerFeriado2027 = FERIADOS_2027[0];
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Guía · Impuestos
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          💸 ¿El aguinaldo paga Ganancias? Retención del SAC 2026
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Respuesta corta: <strong>en la mayoría de los casos, no</strong>. El método del doceavo
          de la RG 4003 absorbe el SAC con las deducciones acumuladas del año. Recién con sueldos
          brutos altos aparece retención. Te explico cuándo y por qué, con las fechas de cobro
          del{" "}
          <Link href="/guia/aguinaldo-junio-2026/" className="underline hover:text-emerald-700">
            aguinaldo 2026
          </Link>{" "}
          (segundo semestre: hasta el 18 de diciembre).
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cómo se liquida el SAC con Ganancias</h2>
        <p>
          Tu empleador usa el <strong>método del doceavo</strong> del artículo 7 de la RG 4003:
          divide la ganancia neta acumulada del año por los meses transcurridos y multiplica por
          12 para proyectar el año. El aguinaldo se suma al mes de pago, pero las deducciones
          (GNI, especial, personas a cargo) también se acumulan doceavizadas — el efecto neto es
          que el SAC entra al promedio y casi nunca genera retención propia.
        </p>
        <p>
          Excepción práctica: si cobrás el SAC en diciembre justo con el sueldo anual
          complementario y encima pasaste un tramo de la{" "}
          <Link
            href="/guia/escala-ganancias-2026/"
            className="underline hover:text-emerald-700"
          >
            escala de Ganancias 2026
          </Link>
          , ese mes sí puede retener más. Es la cuesta de diciembre que notan los sueldos
          altos — y que la liquidación anual devuelve si correspondió.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">¿Cuánto me retienen del aguinaldo?</h2>
        <p>
          No hay un porcentaje fijo: depende de tu ganancia neta acumulada al mes del cobro. La
          forma simple de saberlo: anotá tu neto de octubre o noviembre, y compará con el neto
          de diciembre — la diferencia que no explique tu sueldo habitual ES la retención del
          mes (SAC incluido). Para estimar el neto con y sin SAC usá la{" "}
          <Link href="/aguinaldo/" className="underline hover:text-emerald-700">
            calculadora de aguinaldo
          </Link>{" "}
          y la{" "}
          <Link href="/" className="underline hover:text-emerald-700">
            calculadora de sueldo neto
          </Link>
          .
        </p>
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 text-sm">
          <p>
            <strong>Regla práctica 2026:</strong> con sueldo bruto por debajo del tope de
            deducciones vigente, la retención sobre el SAC es $0. Los emisores que sí retienen
            son los que superan el tope — chequeá tu recibo de noviembre: si tu empleador ya
            retenía habitualmente, el aguinaldo también puede tener retención.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Los datos que se acumulan al año</h2>
        <p>
          Ojo con la <strong>liquidación anual</strong> (art. 26 RG 4003): después del cobro del
          SAC de diciembre, tu empleador debe recalcular todo el año. Si retuvo de más en
          algún mes, te lo devuelve en la liquidación de los meses siguientes. Si retuvo de
          menos, no puede descontarlo retroactivo — pierde el empleador, no vos.
        </p>
        <p>
          Este calendario lo enlaza con{" "}
          <strong>{primerFeriado2027.nombre}</strong> ({" "}
          {primerFeriado2027.fecha}), cuando ya tenés el SAC de diciembre cobrado y la
          liquidación anual cerrada — buen momento para revisar tu recibo del año.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
        {FAQs.map((f, i) => (
          <div className="space-y-1" key={i}>
            <h3 className="font-medium">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa con datos de ARCA (RG 4003 vigente). No constituye asesoramiento
        impositivo; para casos particulares consultá a un contador.
      </footer>

      <JsonLd
        data={graphLd([
          articleLd({
            headline: "¿El aguinaldo paga Ganancias? Retención del SAC 2026",
            datePublished: "2026-09-09",
            dateModified: "2026-09-09",
            description:
              "Cómo retiene Ganancias el aguinaldo 2026 (método doceava RG 4003), cuándo queda exento y cómo se devuelve en la liquidación anual.",
            path: "/guia/aguinaldo-y-ganancias/",
          }),
          breadcrumbLd([
            ["Inicio", "/"],
            ["Guías", "/guia/"],
            ["Aguinaldo y Ganancias", ""],
          ]),
          faqLd(FAQs),
        ])}
      />

      <BloqueArticulos slugActual="aguinaldo-y-ganancias" />
    </article>
  );
}
