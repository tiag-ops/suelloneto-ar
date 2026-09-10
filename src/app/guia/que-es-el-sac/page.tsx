import type { Metadata } from "next";
import Link from "next/link";
import { BloqueArticulos } from "../../enlaces";
import FaqAcordeon from "../../faq-acordeon";
import { JsonLd, graphLd, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { formatARS } from "@/lib/format";

export const metadata: Metadata = {
  title: "¿Qué es el SAC (Sueldo Anual Complementario)? Aguinaldo simple | SueldoNeto.ar",
  description:
    "SAC significa Sueldo Anual Complementario: el aguinaldo que cobrás en dos mitades (junio y diciembre). Cómo se calcula, quién lo cobra y ejemplos con montos reales.",
  keywords: [
    "que es el sac",
    "que significa sac en el recibo",
    "sueldo anual complementario",
    "aguinaldo que es",
  ],
  alternates: { canonical: "/guia/que-es-el-sac/" },
};

const FAQs = [
  {
    q: "¿El SAC es lo mismo que el aguinaldo?",
    a: "Sí. 'Aguinaldo' es el nombre popular y SAC (Sueldo Anual Complementario) el nombre legal: la Ley 23.041 lo creó en 1987 y el artículo 121 de la LCT lo regula hoy. Son la misma plata.",
  },
  {
    q: "¿Quién cobra el SAC?",
    a: "Todos los trabajadores en relación de dependencia, públicas o privadas: empleados mensualizados, jornalizados (proporcional por día) y domésticos registeredos (también cobran proporcional). Los monotributistas y autónomos NO lo cobran, porque no tienen empleador.",
  },
  {
    q: "¿Por qué en el recibo figura 'SAC' y no 'aguinaldo'?",
    a: "Porque así lo llama la ley: es el 'sueldo anual complementario' que la ley manda dividir en dos cuotas. Algunos liquidadores lo rotulan 'SAC', otros 'Sueldo Anual Complementario': es el mismo concepto remunerativo.",
  },
];

export default function Articulo() {
  // Ejemplos computados con el motor real + calculadoras del sitio (sin hardcodear montos).
  const ejemplos = [500_000, 900_000, 1_400_000].map((bruto) => {
    const sac = Math.round(bruto / 2);
    return { bruto, sac, sacFormateado: formatARS(sac) };
  });

  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Guía · Conceptos
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          💰 ¿Qué es el SAC? El aguinaldo explicado simple
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          <strong>SAC significa Sueldo Anual Complementario</strong>: es el aguinaldo. Un sueldo
          extra que se cobra en dos mitades al año — la primera hasta el 30 de junio y la segunda
          hasta el 18 de diciembre (fechas del{" "}
          <Link href="/guia/aguinaldo-junio-2026/" className="underline hover:text-emerald-700">
            calendario de aguinaldo 2026
          </Link>
          ).
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cómo se calcula el SAC</h2>
        <p>
          La fórmula legal es simple: <strong>la mitad del mejor sueldo mensual del semestre</strong>.
          Los dos datos importan:
        </p>
        <ul>
          <li>
            <strong>La mitad:</strong> el SAC es siempre el 50% de un sueldo, no un sueldo entero.
          </li>
          <li>
            <strong>El mejor sueldo del semestre:</strong> si un mes cobraste horas extras o
            comisiones, ese mes reemplaza al sueldo base si es más alto.
          </li>
        </ul>
        <p>
          Si trabajaste el semestre completo: SAC = mejor sueldo ÷ 2. Si empezaste a trabajar hace
          4 meses: SAC = (mejor sueldo ÷ 12) × 4. La{" "}
          <Link href="/aguinaldo/" className="underline hover:text-emerald-700">
            calculadora de aguinaldo
          </Link>{" "}
          hace esta cuenta con los dos datos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Ejemplos con montos</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Mejor sueldo del semestre (bruto)</th>
                <th className="px-3 py-2">SAC a cobrar (semestre completo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ejemplos.map((e) => (
                <tr key={e.bruto}>
                  <td className="px-3 py-2 font-medium">{formatARS(e.bruto)}</td>
                  <td className="px-3 py-2">{e.sacFormateado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Montos brutos: el SAC que ves en el recibo es sobre el bruto — el neto que llega al
          banco puede ser menor por los aportes ya explicados en la{" "}
          <Link href="/guia/sueldo-bruto-a-neto/" className="underline hover:text-emerald-700">
            guía de bruto a neto
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">¿Cuándo se paga?</h2>
        <p>
          Dos cuotas iguales (si trabajaste todo el año): la primera del 1 de enero al{" "}
          <strong>30 de junio</strong>, la segunda del 1 de julio al{" "}
          <strong>18 de diciembre</strong>. Ojo: la cuota de junio se calcula con tu mejor sueldo
          de enero a junio; la de diciembre, de julio a diciembre. Los convenios pueden adelantar
          las fechas, nunca atrasarlas (verificado en el{" "}
          <Link
            href="/guia/aguinaldo-junio-2026/"
            className="underline hover:text-emerald-700"
          >
            artículo 123 LCT
          </Link>
          ).
        </p>
      </section>

      <FaqAcordeon items={FAQs} primeraAbierta />

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. Cálculos según la Ley de Contrato de Trabajo (arts. 121-123).
        No constituye asesoramiento laboral.
      </footer>

      <JsonLd
        data={graphLd([
          articleLd({
            headline: "¿Qué es el SAC? El aguinaldo explicado simple",
            datePublished: "2026-09-09",
            dateModified: "2026-09-09",
            description:
              "SAC significa Sueldo Anual Complementario: el aguinaldo en dos cuotas. Cálculo, ejemplos con montos y fechas de pago.",
            path: "/guia/que-es-el-sac/",
          }),
          breadcrumbLd([["Inicio", "/"], ["Guías", "/guia/"], ["¿Qué es el SAC?", ""]]),
          faqLd(FAQs),
        ])}
      />

      <BloqueArticulos slugActual="que-es-el-sac" />
    </article>
  );
}
