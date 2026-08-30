import type { Metadata } from "next";
import { BloqueArticulos } from "../../enlaces";
import Link from "@/components/link";
import { datosArticuloGanancias, formatARS } from "@/lib/articulos/ganancias-datos";

export const metadata: Metadata = {
  title: "¿Desde cuánto se paga Impuesto a las Ganancias en 2026? (tabla por sueldo)",
  description:
    "Tabla completa: desde qué sueldo bruto se paga Ganancias en 2026 según tu situación familiar, con montos calculados con los valores oficiales de ARCA del segundo semestre.",
  keywords: ["desde cuanto se paga ganancias 2026", "impuesto a las ganancias sueldo", "piso ganancias 2026", "cuanto se descuenta de ganancias"],
  alternates: { canonical: "/guia/ganancias-desde-cuanto/" },
};

export default function ArticuloGanancias() {
  const casos = datosArticuloGanancias();

  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Guía · Ganancias
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          ¿Desde cuánto se paga Impuesto a las Ganancias en 2026?
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Actualizado con los valores oficiales de ARCA del segundo semestre 2026 (haberes
          percibidos desde julio). Todos los montos de esta página se calculan con nuestra{" "}
          <Link href="/" className="underline hover:text-emerald-700">
            calculadora de sueldo neto
          </Link>
          .
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">La respuesta corta</h2>
        <p>
          Con los valores vigentes desde julio de 2026, un trabajador{" "}
          <strong>soltero sin hijos</strong> empieza a pagar Ganancias con un sueldo{" "}
          <strong>bruto de aproximadamente $3,5 millones mensuales</strong>. El piso exacto
          depende de tu situación familiar: el cónyuge y los hijos aumentan las deducciones y
          suben el piso.
        </p>
        <p>
          El impuesto se calcula con el <strong>método doceava</strong> (Resolución General
          4003 de ARCA): el empleador proyecta tu ganancia neta acumulada del año y aplica la
          escala progresiva del artículo 94 de la ley. Por eso la retención crece a medida que
          avanza el año.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tabla: cuánto se descuenta según tu sueldo</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Calculado con las deducciones y la escala vigentes (julio–diciembre 2026). El impuesto
          mostrado es el promedio mensual del período.
        </p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm bg-white dark:bg-neutral-900">
            <thead>
              <tr className="text-left text-[13px] text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-3 py-2">Sueldo bruto</th>
                <th className="px-3 py-2">Neto sin Ganancias</th>
                <th className="px-3 py-2">¿Paga Ganancias?</th>
                <th className="px-3 py-2">Ganancias/mes</th>
                <th className="px-3 py-2">Neto final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {casos.map((c, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium">{formatARS(c.bruto)}</td>
                  <td className="px-3 py-2">{formatARS(c.netoPreGanancias)}</td>
                  <td className="px-3 py-2">
                    {c.alcanza ? (
                      <span className="text-amber-600 dark:text-amber-400">Sí</span>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400">No</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {c.alcanza ? `−${formatARS(c.impuesto)}` : "—"}
                  </td>
                  <td className="px-3 py-2 font-semibold">{formatARS(c.neto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Casos con cónyuge e hijos usan las deducciones correspondientes. Si tenés hijos con
          discapacidad u otras deducciones (alquiler, empleados domésticos, crédito
          hipotecario), el piso sube: usá la{" "}
          <Link href="/" className="underline hover:text-emerald-700">
            calculadora completa
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>

        <div className="space-y-1">
          <h3 className="font-medium">¿El aguinaldo paga Ganancias?</h3>
          <p>
            El SAC queda exento cuando la remuneración total no supera el tope de deducciones
            del método doceava. Con sueldos muy altos sí puede retenerse sobre el aguinaldo —
            tu empleador lo liquida automáticamente con el método del artículo 7 de la RG 4003.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium">¿Por qué me descuentan más en diciembre?</h3>
          <p>
            Porque la retención se calcula sobre la <strong>ganancia neta acumulada del año</strong>:
            a medida que se acumula, caés en tramos más altos de la escala (de 5% hasta 35%).
            Si te retuvieron de más, la liquidación anual te lo devuelve.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium">¿Los monotributistas pagan este impuesto?</h3>
          <p>
            El monotributo reemplaza a Ganancias por la actividad facturada. Si además sos
            empleado en relación de dependencia, la relación con tu monotributo{" "}
            <Link href="/monotributo/" className="underline hover:text-emerald-700">
              según tu categoría
            </Link>{" "}
            puede modificar tus deducciones.
          </p>
        </div>
      </section>

      <footer className="rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-400">
        Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de
        vigencia. No constituye asesoramiento fiscal; verificá con un contador.
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "¿Desde cuánto se paga Impuesto a las Ganancias en 2026?",
            inLanguage: "es-AR",
            author: { "@type": "Organization", name: "SueldoNeto.ar" },
            about: ["Impuesto a las Ganancias", "Sueldo neto", "Argentina"],
          }),
        }}
      />
    
      <BloqueArticulos slugActual="ganancias-desde-cuanto" />
    </article>
  );
}
