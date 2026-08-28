import { calcularHorasExtras } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

/** Datos generados por el motor en build-time. NO editar a mano. */
export function tablaHoras() {
  const sueldos = [3_500_000, 4_500_000, 6_000_000];
  return sueldos.map((s) => {
    const r = calcularHorasExtras(s, 10, 4);
    return {
      sueldo: s,
      valorHora: r.valorHora,
      diezHoras50: r.pago50,
      cuatroHoras100: r.pago100,
      totalMes: r.total,
    };
  });
}

export { formatARS2 };
