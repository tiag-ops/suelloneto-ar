import { calcularAguinaldo } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

/** Datos generados por el motor en build-time. NO editar a mano. */
export function tablaAguinaldo() {
  const sueldos = [3_000_000, 4_000_000, 5_000_000, 6_000_000, 8_000_000];
  return sueldos.map((s) => ({
    sueldo: s,
    semestreCompleto: calcularAguinaldo(s, 6).sac,
    tresMeses: calcularAguinaldo(s, 3).sac,
  }));
}

export { formatARS2 };
