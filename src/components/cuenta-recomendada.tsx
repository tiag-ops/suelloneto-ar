import { recomendacionesActivas } from "@/lib/programatico/fintech";

/**
 * Card de recomendación fintech con disclosure (FASE 2, Task 2.1).
 * Estado vacío = no renderiza nada: sin links verificados en fintech.json
 * no hay bloque (nada de CTAs muertos ni placeholders visibles).
 */
export default function CuentaRecomendada({ titulo }: { titulo?: string }) {
  const recs = recomendacionesActivas();
  if (recs.length === 0) return null;

  return (
    <aside className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 p-5 space-y-3 text-[15px] leading-relaxed">
      <h2 className="text-lg font-semibold">{titulo ?? "¿Querés que ese excedente rinda?"}</h2>
      <p>
        Tu sueldo pasa unos días por tu cuenta cada mes. Dejarlo trabajar en una cuenta
        remunerada o un money market es automático y podés retirarlo cuando quieras.
      </p>
      <ul className="space-y-2">
        {recs.map((r) => (
          <li key={r.slug}>
            <a
              href={r.urlReferido}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 font-medium"
            >
              Ver {r.nombre} →
            </a>
            {r.comisionConocida ? (
              <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">{r.comisionConocida}</span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Transparencia: si te registrás desde estos links podemos recibir una comisión del
        proveedor, sin costo extra para vos. Es lo que mantiene las calculadoras gratis.
      </p>
    </aside>
  );
}
