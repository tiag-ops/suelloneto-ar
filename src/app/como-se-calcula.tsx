import Link from "@/components/link";
import { calcularSueldo } from "@/lib/ganancias";
import { formatARS } from "@/lib/format";

/**
 * Bloque "¿Cómo se calcula el sueldo neto?" — texto indexable para respuesta directa
 * de Google (featured snippet) sobre la keyword "como se calcula el sueldo neto".
 * Los montos del ejemplo los genera el motor en build-time: nunca desactualiza.
 */
export default function ComoSeCalcula() {
  const r = calcularSueldo({ sueldoBruto: 4_500_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });

  return (
    <section className="space-y-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-sm leading-relaxed">
      <h2 className="text-lg font-semibold">¿Cómo se calcula el sueldo neto en Argentina?</h2>
      <p>
        En dos pasos. <strong>Primero</strong>, al sueldo bruto se le descuentan los aportes
        personales: <strong>11% de jubilación, 3% de obra social y 3% de PAMI</strong> (17% en
        total). Con un bruto de {formatARS(4_500_000)}, los aportes son {formatARS(r.totalAportes)}{" "}
        y queda un neto de {formatARS(r.netoPreGanancias)}.
      </p>
      <p>
        <strong>Segundo</strong>, si tu ganancia neta supera las deducciones del Impuesto a las
        Ganancias (ganancia no imponible + deducción especial + cargas de familia), se retiene el
        impuesto con la <strong>escala del artículo 94</strong>. Con el{" "}
        <strong>método doceava</strong> de la Resolución General 4003 de ARCA, el empleador
        proyecta tu ganancia neta acumulada del año y consulta la escala acumulada del mes; la
        retención de cada mes es la diferencia contra el anterior. Con los valores vigentes, un
        soltero sin hijos empieza a pagarlo cerca de los $3,5 millones brutos.
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Ejemplo con bruto {formatARS(r.bruto)} → neto {formatARS(r.neto)}{" "}
        {r.alcanzaGanancias ? "(incluye Ganancias)" : "(sin Ganancias)"}, calculado
        automáticamente con las tablas vigentes. Más detalle en{" "}
        <Link href="/guia/sueldo-bruto-a-neto/" className="underline hover:text-emerald-700">
          nuestra guía de bruto a neto
        </Link>
        .
      </p>
    </section>
  );
}
