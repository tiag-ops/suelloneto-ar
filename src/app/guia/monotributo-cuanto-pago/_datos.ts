import { datosMonotributo } from "@/lib/monotributo";
import { formatARS, formatARS2 } from "@/lib/format";

/** Datos del JSON oficial (build-time). NO editar a mano. */
export function tablaMono() {
  return { cats: datosMonotributo().categorias, formatARS, formatARS2 };
}
