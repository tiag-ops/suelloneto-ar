import { calcularSueldo } from "@/lib/ganancias";
import { formatARS } from "@/lib/format";

/** Conversión bruto→neto generada por el motor en build-time. NO editar a mano. */
export function tablaBrutoNeto() {
  return [3_000_000, 4_000_000, 4_500_000, 5_000_000, 6_000_000, 8_000_000].map((b) => {
    const r = calcularSueldo({ sueldoBruto: b, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    return { bruto: b, neto: r.neto, alcanza: r.alcanzaGanancias, impuesto: r.impuestoGananciasMensual };
  });
}

export { formatARS };
