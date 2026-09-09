import type { Metadata } from "next";
import Link from "next/link";
import { BloqueArticulos } from "../../enlaces";
import { JsonLd, graphLd, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { calendario2027 } from "./_datos";

export const metadata: Metadata = {
  title: "Feriados 2027 en Argentina: calendario completo y fechas | SueldoNeto.ar",
  description:
    "Calendario completo de los feriados 2027 en Argentina: fechas, días de la semana, trasladables y puentes. según la Ley 27.399, con tabla generada automáticamente.",
  keywords: [
    "feriados 2027",
    "feriados 2027 argentina",
    "calendario feriados 2027",
    "feriados trasladables 2027",
  ],
  alternates: { canonical: "/guia/feriados-2027/" },
};

const FAQs = [
  {
    q: "¿Cuál es el primer feriado de 2027?",
    a: "Año Nuevo, el viernes 1 de enero de 2027. Le siguen los Carnavales, los lunes 8 y 9 de febrero.",
  },
  {
    q: "¿Cuántos feriados hay en 2027?",
    a: "El calendario nacional tiene 16 feriados: 10 inamovibles, 5 trasladables según la Ley 27.399 y los fines de semana Santa incluidos en el conteo (Viernes Santo).",
  },
  {
    q: "¿Cómo sé qué día cae cada feriado?",
    a: "En la tabla de arriba: la fecha y el día de la semana se calculan automáticamente del calendario oficial. Los trasladables que caen martes o miércoles se corren al lunes anterior, y si caen jueves o viernes, al lunes siguiente.",
  },
];

export default function Articulo() {
  const filas = calendario2027();
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Guía · Feriados
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          📅 Feriados 2027 en Argentina: calendario completo
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Primera respuesta: el primer feriado 2027 es Año Nuevo, el{" "}
          <strong>viernes 1 de enero</strong>. La tabla completa, con día de la semana y tipo,
          sale del motor de feriados del sitio (Ley 27.399) — la misma que alimenta la{" "}
          <Link
            href="/proximo-feriado/"
            className="underline hover:text-emerald-700"
          >
            calculadora de próximo feriado
          </Link>
          .
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Calendario completo 2027</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Día</th>
                <th className="px-3 py-2">Feriado</th>
                <th className="px-3 py-2">Tipo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filas.map((f) => (
                <tr key={f.fecha}>
                  <td className="px-3 py-2 font-medium">{f.fechaLarga}</td>
                  <td className="px-3 py-2 capitalize">{f.diaSemana}</td>
                  <td className="px-3 py-2">{f.nombre}</td>
                  <td className="px-3 py-2 capitalize text-neutral-600 dark:text-neutral-400">
                    {f.tipo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cómo se trasladan los feriados 2027</h2>
        <p>
          La Ley 27.399 (art. 6) manda: los feriados que caen <strong>martes o miércoles</strong>{" "}
          se pasan al lunes anterior; los que caen <strong>jueves o viernes</strong>, al lunes
          siguiente; los que caen sábado o domingo se observan ese mismo día. En 2027, Güemes
          (jueves 17 de junio) se corre al <strong>lunes 21 de junio</strong>; San Martín
          (lunes 16 de agosto) y Diversidad Cultural (lunes 11 de octubre) ya caen lunes, y
          Soberanía Nacional cae sábado (20 de noviembre), así que no se mueve.
        </p>
        <p>
          Los feriados puente los declara el Gobierno con decreto, generalmente a fin del año
          anterior. Todavía no hay decreto de puentes 2027: cuando se publique, la tabla se
          actualiza con el deploy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Feriados 2027 y días de pago</h2>
        <p>
          Si un día de pago de sueldo o aguinaldo cae feriado, la habilitación bancaria se corre
          al primer día hábil siguiente. Para calcular vencimientos y plazos laborales usá la{" "}
          <Link href="/dias-habiles/" className="underline hover:text-emerald-700">
            calculadora de días hábiles
          </Link>
          , que ya conoce el calendario de feriados 2027 completo.
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
        Herramienta informativa. Los feriados provienen de la Ley 27.399 y disposiciones
        oficiales, con verificación (detalle en el código del motor). No constituye
        asesoramiento laboral.
      </footer>

      <JsonLd
        data={graphLd([
          articleLd({
            headline: "Feriados 2027 en Argentina: calendario completo",
            datePublished: "2026-09-09",
            dateModified: "2026-09-09",
            description:
              "Calendario completo de los feriados 2027 en Argentina: fechas, días de la semana y trasladables según Ley 27.399.",
            path: "/guia/feriados-2027/",
          }),
          breadcrumbLd([["Inicio", "/"], ["Guías", "/guia/"], ["Feriados 2027", ""]]),
          faqLd(FAQs),
        ])}
      />

      <BloqueArticulos slugActual="feriados-2027" />
    </article>
  );
}
