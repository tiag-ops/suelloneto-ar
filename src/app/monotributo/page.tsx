import type { Metadata } from "next";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import TablaMonotributo from "./tabla";

export const metadata: Metadata = {
  title: "Monotributo 2026: categorías, cuotas y topes (desde 01/08/2026)",
  description:
    "Tabla completa de categorías del monotributo 2026 con cuotas mensuales, topes de facturación y desglose. Calculá qué categoría te corresponde según tu facturación anual.",
  alternates: { canonical: "/monotributo/" },
};

export default function MonotributoPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Monotributo 2026: categorías y cuotas
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Valores oficiales de ARCA con aplicación desde el 01/08/2026. Ingresá tu facturación
          anual proyectada y te decimos qué categoría te corresponde.
        </p>
      </section>

      <TablaMonotributo />

      <BloqueCalculadorasRelacionadas slug="monotributo" />

      <section className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
          Preguntas frecuentes
        </h2>
        <div>
          <p className="font-medium">¿Qué pasa si supero el tope de mi categoría?</p>
          <p>
            Podés recategorizarte de oficio o por tu cuenta (ARCA habilita el período de
            recategorización dos veces al año). Si superás el tope de la categoría K
            ($126.610.839 anuales) salís del monotributo y pasás al Régimen General
            (Responsable Inscripto).
          </p>
        </div>
        <div>
          <p className="font-medium">¿La cuota es igual para servicios y venta de cosas?</p>
          <p>
            En las categorías A y B sí. Desde la C, el impuesto integrado cambia: la venta de
            cosas muebles paga menos que los servicios. El aporte previsional y la obra social
            son los mismos.
          </p>
        </div>
        <div>
          <p className="font-medium">¿Qué incluye la cuota mensual?</p>
          <p>
            Impuesto integrado, aporte al SIPA (jubilación) y obra social. Todos los montos de
            esta página salen de la tabla oficial vigente y se actualizan cuando ARCA publica
            los nuevos valores.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Qué pasa si supero el tope de mi categoría de monotributo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Podés recategorizarte (de oficio o voluntariamente) cuando ARCA habilita el período. Si superás el tope de la categoría K ($126.610.839 anuales), pasás al Régimen General como Responsable Inscripto.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cuánto se paga de monotributo por mes en 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Desde el 01/08/2026 la cuota va de $49.527,18 (categoría A) a $1.614.446,02 (categoría K, servicios). Incluye impuesto integrado, aporte SIPA y obra social.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
