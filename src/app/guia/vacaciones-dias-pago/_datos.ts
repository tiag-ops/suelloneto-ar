import { diasVacaciones, pagoVacaciones } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

/** Datos generados por el motor en build-time. NO editar a mano. */
export function tablaVacas() {
  const sueldo = 4_000_000;
  return [0, 5, 6, 10, 11, 20, 21].map((a) => {
    const dias = diasVacaciones(a);
    return { antiguedad: a, dias, pago: pagoVacaciones(sueldo, dias), sueldo };
  });
}

export { formatARS2 };
