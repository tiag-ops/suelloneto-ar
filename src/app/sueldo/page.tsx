import type { Metadata } from "next";
import Link from "next/link";
import { PUBLICADAS, bandaDe, type Banda } from "@/lib/programatico/montos";
import { formatARS } from "@/lib/format";

export const metadata: Metadata = {
  title: "Sueldo neto por monto bruto: de $150.000 en adelante | SueldoNeto.ar",
  description:
    "Elegí tu sueldo bruto y mirá el neto exacto, el desglose de aportes y Ganancias, y la comparativa con brutos vecinos. Calculado con la escala ARCA vigente.",
  alternates: { canonical: "/sueldo/" },
};

const BANDAS: { id: Banda; titulo: string }[] = [
  { id: "baja", titulo: "Hasta $500.000" },
  { id: "media", titulo: "De $500.000 a $1.500.000" },
  { id: "alta", titulo: "Más de $1.500.000" },
];

export default function HubSueldos() {
  const porBanda = new Map<Banda, number[]>();
  for (const m of PUBLICADAS) {
    const lista = porBanda.get(m.banda) ?? [];
    lista.push(m.monto);
    porBanda.set(m.banda, lista);
  }

  return (
    <article className="space-y-8 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
          Serie sueldos por monto
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Sueldo neto por monto bruto</h1>
        <p>
          Cada monto tiene su página con el neto exacto, el desglose de aportes y Ganancias, la
          comparativa con brutos cercanos y preguntas frecuentes. Todos los cálculos salen de la
          misma <Link href="/" className="underline hover:text-emerald-700">calculadora de sueldo bruto a neto</Link> con
          los valores ARCA vigentes.
        </p>
      </header>

      {BANDAS.filter((b) => (porBanda.get(b.id)?.length ?? 0) > 0).map((b) => (
        <section key={b.id} className="space-y-3">
          <h2 className="text-lg font-semibold">{b.titulo}</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1.5">
            {(porBanda.get(b.id) ?? []).map((monto) => (
              <li key={monto}>
                <Link
                  href={`/sueldo/${monto}/`}
                  className="underline decoration-neutral-300 hover:decoration-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {formatARS(monto)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="text-base text-neutral-600 dark:text-neutral-400">
        ¿Tu bruto exacto no está en la lista? Usá la{" "}
        <Link href="/" className="underline hover:text-emerald-700">
          calculadora completa
        </Link>{" "}
        con cualquier valor.
      </p>
    </article>
  );
}
