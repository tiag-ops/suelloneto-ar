import type { ReactNode } from "react";

export interface FaqItem {
  /** Pregunta: acepta string o JSX (con <Link>, <strong>, etc.). */
  q?: ReactNode;
  /** Pregunta alternativa (formato FrecuenciaFaq {pregunta, respuesta}). */
  pregunta?: ReactNode;
  /** Respuesta: acepta string o JSX. */
  a?: ReactNode;
  /** Respuesta alternativa (formato FrecuenciaFaq). */
  respuesta?: ReactNode;
}

/**
 * Sección FAQ reutilizable: acordeón con <details>/<summary> nativo.
 * Sin JS cliente: funciona sin hidratación, accesible por defecto y el
 * contenido queda en el HTML para crawlers (el JSON-LD FAQPage no cambia).
 * Items con respuesta en JSX soportados (Link, strong, etc.).
 * Acepta {q, a} o {pregunta, respuesta} (FrecuenciaFaq de variantes.ts).
 */
export default function FaqAcordeon({
  titulo = "Preguntas frecuentes",
  items,
  primeraAbierta = false,
}: {
  titulo?: string;
  items: FaqItem[];
  /** Abre el primer ítem por defecto (útil si hay 3 o menos). */
  primeraAbierta?: boolean;
}) {
  return (
    <section className="space-y-3" id="faq">
      <h2 className="text-lg font-semibold">{titulo}</h2>
      <div className="space-y-2">
        {items.map((item, i) => {
          const q = item.q ?? item.pregunta ?? item.respuesta;
          const a = item.a ?? (item.respuesta !== q ? item.respuesta : undefined);
          return (
          <details
            key={i}
            open={primeraAbierta && i === 0}
            className="faq-item group rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[0.95rem] font-semibold text-neutral-900 outline-none [&::-webkit-details-marker]:hidden dark:text-neutral-100">
              {q}
              <span
                aria-hidden="true"
                className="chevron shrink-0 text-neutral-400 transition-transform group-open:rotate-180 dark:text-neutral-500"
              >
                ▾
              </span>
            </summary>
            <div className="px-4 pb-4 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {a}
            </div>
          </details>
          );
        })}
      </div>
    </section>
  );
}
