import Link from "next/link";
import { CALCULADORAS, GUIAS, relacionadas, otrasGuias, guiasDeCalculadora, urlDe, type CalculadoraMeta } from "@/lib/calculadoras";

/** Bloque "Calculadoras relacionadas" — insertar al final de cada calculadora */
export function BloqueCalculadorasRelacionadas({ slug }: { slug: string }) {
  const items = relacionadas(slug, 4);
  if (items.length === 0) return null;
  return (
    <nav aria-label="Calculadoras relacionadas" className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">
        Calculadoras relacionadas
      </h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {items.map((c: CalculadoraMeta) => (
          <li key={c.slug}>
            <Link
              href={urlDe(c.slug)}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
            >
              <span aria-hidden>{c.icono}</span>
              <span className="font-medium">{c.titulo}</span>
            </Link>
          </li>
        ))}
      </ul>
      {(() => {
        const guias = guiasDeCalculadora(slug, 3);
        const destacadas = GUIAS.filter((g) => ["ganancias-desde-cuanto", "sueldo-bruto-a-neto", "aguinaldo-junio-2026"].includes(g.slug));
        const lista = guias.length > 0 ? guias : destacadas.slice(0, 3);
        if (lista.length === 0) return null;
        return (
          <>
            <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-5 mb-3">
              Guías que te pueden servir
            </h2>
            <ul className="space-y-1.5">
              {lista.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guia/${g.slug}/`}
                    className="text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    📖 {g.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        );
      })()}
    </nav>
  );
}

/** Bloque "Seguí leyendo" — insertar al final de cada artículo */
export function BloqueArticulos({ slugActual }: { slugActual: string }) {
  const otras = otrasGuias(slugActual, 4);
  const guiaActual = GUIAS.find((g) => g.slug === slugActual);
  const calculadorasLinked = (guiaActual?.calculadoras ?? [])
    .map((s) => CALCULADORAS.find((c) => c.slug === s))
    .filter(Boolean) as CalculadoraMeta[];

  return (
    <nav aria-label="Artículos relacionados" className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-5">
      {calculadorasLinked.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">
            Poné los números en tu caso
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {calculadorasLinked.map((c) => (
              <li key={c.slug}>
                <Link
                  href={urlDe(c.slug)}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
                >
                  <span aria-hidden>{c.icono}</span>
                  <span className="font-medium">{c.titulo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">
          Seguí leyendo
        </h2>
        <ul className="space-y-1.5">
          {otras.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guia/${g.slug}/`}
                className="text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                📖 {g.titulo}
              </Link>
              <span className="text-sm text-neutral-600 dark:text-neutral-400"> — {g.descripcion}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
