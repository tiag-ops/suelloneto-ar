import datosJson from "@/data/ganancias-2026S2.json";
import type { DatosGanancias } from "@/lib/types";
import { calcularSueldo } from "@/lib/ganancias";
import { formatARS, formatARS2 } from "@/lib/format";

const datos = datosJson as DatosGanancias;

/** Escala + ejemplos, generados por el motor en build-time. NO editar a mano. */
export function datosEscala() {
  const ejemplos = [4_000_000, 5_000_000, 6_000_000, 8_000_000].map((b) => {
    const r = calcularSueldo({ sueldoBruto: b, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    return { bruto: b, gni: r.gniAcumuladaDiciembre, impuesto: r.impuestoGananciasAnual };
  });
  return { tramos: datos.escalaAnual, ejemplos, formatARS, formatARS2 };
}
