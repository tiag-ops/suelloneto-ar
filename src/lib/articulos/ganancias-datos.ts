import { calcularSueldo } from "@/lib/ganancias";
import { calcularAguinaldo } from "@/lib/laboral";
import { formatARS } from "@/lib/format";

/**
 * Datos de ejemplo generados por los motores de cálculo en BUILD TIME.
 * Nada hardcodeado: cuando ARCA actualice valores, este contenido se actualiza
 * solo en el próximo deploy. NO editar a mano.
 */
export function datosArticuloGanancias() {
  const casos = [
    { bruto: 3_500_000, conyuge: false, hijos: 0 },
    { bruto: 4_000_000, conyuge: false, hijos: 0 },
    { bruto: 4_500_000, conyuge: false, hijos: 0 },
    { bruto: 5_000_000, conyuge: false, hijos: 0 },
    { bruto: 5_000_000, conyuge: true, hijos: 2 },
    { bruto: 6_000_000, conyuge: false, hijos: 0 },
    { bruto: 8_000_000, conyuge: false, hijos: 0 },
    { bruto: 10_000_000, conyuge: false, hijos: 0 },
  ];

  return casos.map((c) => {
    const r = calcularSueldo({ sueldoBruto: c.bruto, conyuge: c.conyuge, hijos: c.hijos, hijosDiscapacidad: 0 });
    return {
      bruto: c.bruto,
      conyuge: c.conyuge,
      hijos: c.hijos,
      netoPreGanancias: r.netoPreGanancias,
      alcanza: r.alcanzaGanancias,
      impuesto: r.impuestoGananciasMensual,
      neto: r.neto,
    };
  });
}

export { formatARS };
