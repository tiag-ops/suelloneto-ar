import { indemnizacionDespido, vacacionesNoGozadas } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

/** Datos generados por el motor en build-time. NO editar a mano. */
export function tablaIndemnizacion() {
  const sueldo = 4_000_000;
  return [1, 3, 5, 10, 15, 20].map((anios) => {
    const r = indemnizacionDespido(sueldo, anios, 4);
    const vac = vacacionesNoGozadas(sueldo, anios, 6);
    return { anios, total: r.total, sac: r.sacProporcional, base: r.base, vacNoGozadas: vac.pago, sueldo };
  });
}

export { formatARS2 };
