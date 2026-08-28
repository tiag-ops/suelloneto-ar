import type { DatosMonotributo, ResultadoMonotributo } from "./types";
import datosJson from "@/data/monotributo-2026S2.json";

const datos = datosJson as DatosMonotributo;

/**
 * Dada la facturación anual bruta proyectada y el tipo de actividad,
 * devuelve la categoría que corresponde (o excedido si supera la K).
 */
export function calcularCategoria(
  facturacionAnual: number,
  tipo: "servicios" | "bienes",
): ResultadoMonotributo {
  const cat = datos.categorias.find(
    (c) => facturacionAnual <= c.topeIngresosAnual,
  );

  if (!cat) {
    const k = datos.categorias[datos.categorias.length - 1];
    return {
      categoria: k.categoria,
      topeIngresosAnual: k.topeIngresosAnual,
      cuotaMensual: tipo === "servicios" ? k.cuotaServicios : k.cuotaBienes,
      desglose: {
        impuestoIntegrado:
          tipo === "servicios" ? k.impuestoIntegradoServicios : k.impuestoIntegradoBienes,
        aporteSIPA: k.aporteSIPA,
        aporteObraSocial: k.aporteObraSocial,
      },
      excedido: true,
    };
  }

  return {
    categoria: cat.categoria,
    topeIngresosAnual: cat.topeIngresosAnual,
    cuotaMensual: tipo === "servicios" ? cat.cuotaServicios : cat.cuotaBienes,
    desglose: {
      impuestoIntegrado:
        tipo === "servicios" ? cat.impuestoIntegradoServicios : cat.impuestoIntegradoBienes,
      aporteSIPA: cat.aporteSIPA,
      aporteObraSocial: cat.aporteObraSocial,
    },
    excedido: false,
  };
}

export function datosMonotributo(): DatosMonotributo {
  return datos;
}
