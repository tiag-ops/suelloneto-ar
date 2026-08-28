import {
  APORTES,
  type DatosGanancias,
  type DesgloseSueldo,
  type EntradaSueldo,
  type EscalaTramo,
} from "./types";
import datosJson from "@/data/ganancias-2026S2.json";

const datos = datosJson as DatosGanancias;

/**
 * Impuesto según la escala del art. 94 (tramos sobre GNI acumulada del período).
 * impuesto = fijo del tramo + alícuota * (base - desde)
 */
export function impuestoPorEscala(base: number, escala: EscalaTramo[]): number {
  if (base <= 0) return 0;
  for (const tramo of escala) {
    const dentro =
      base >= tramo.desde && (tramo.hasta === null || base <= tramo.hasta);
    if (dentro) {
      return tramo.fijo + ((base - tramo.desde) * tramo.porcentaje) / 100;
    }
  }
  const ultimo = escala[escala.length - 1];
  return ultimo.fijo + ((base - ultimo.desde) * ultimo.porcentaje) / 100;
}

/**
 * Retención mensual de Ganancias 4ª cat. — método "doceava" (RG 4003 art. 7 inc. b),
 * aplicable a haberes percibidos de julio a diciembre 2026.
 *
 * El empleador liquida la GNI ACUMULADA del año y consulta la escala ACUMULADA del mes;
 * la retención del mes es la diferencia contra el mes anterior (por eso la escala
 * "Pagarán" de diciembre ya es la anual: 13 retenciones, julio tiene el SAC aparte).
 *
 * Aproximación mensual equivalente usada aquí (calibrada a la tabla de diciembre):
 *   GNI acumulada n = n * (neto * factorDoceava − deduccionesAnuales/12)
 * donde factorDoceava = 13/12 compensa el doceavo adicional del SAC (el neto de un mes
 * con aguinaldo queda exento por las deducciones del método doceava).
 */
export function calcularSueldo(entrada: EntradaSueldo): DesgloseSueldo {
  const { sueldoBruto, conyuge, hijos, hijosDiscapacidad } = entrada;

  const aporteJubilacion = sueldoBruto * APORTES.jubilacion;
  const obraSocial = sueldoBruto * APORTES.obraSocial;
  const pami = sueldoBruto * APORTES.pami;
  const totalAportes = aporteJubilacion + obraSocial + pami;
  const netoPreGanancias = sueldoBruto - totalAportes;

  const d = datos.deduccionesAnuales;
  const deduccionesAnuales =
    d.gananciaNoImponible +
    d.especialEmpleados +
    (conyuge ? d.conyuge : 0) +
    hijos * d.hijo +
    hijosDiscapacidad * d.hijoDiscapacidad;

  const factorDoceava = datos.factorDoceava ?? 13 / 12;
  // "Excedente" mensual: por cada mes trabajado se acumula esto de GNI
  const excedenteMensual = netoPreGanancias * factorDoceava - deduccionesAnuales / 12;
  const gniAcumuladaDiciembre = 12 * Math.max(excedenteMensual, 0);

  // Impuesto del mes 12 según escala acumulada de diciembre (annualizada = período completo)
  const impuestoAnual = impuestoPorEscala(gniAcumuladaDiciembre, datos.escalaAnual);
  // La retención por mes del semestre es ~ impuesto del período / 6 de jul a dic,
  // pero para "cuánto me descuentan por mes" mostramos el promedio mensual del año:
  const impuestoGananciasMensual = impuestoAnual / 12;

  return {
    bruto: sueldoBruto,
    aporteJubilacion,
    obraSocial,
    pami,
    totalAportes,
    netoPreGanancias,
    deduccionesAnuales,
    factorDoceava,
    gniAcumuladaDiciembre,
    impuestoGananciasAnual: impuestoAnual,
    impuestoGananciasMensual,
    alcanzaGanancias: excedenteMensual > 0,
    neto: netoPreGanancias - impuestoGananciasMensual,
    vigenciaDesde: datos.vigenciaDesde,
    fuente: datos.fuente,
    urlFuente: datos.urlFuente,
  };
}
