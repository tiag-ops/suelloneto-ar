// Motor de cálculo laboral (LCT). Puro, sin DOM ni fetch.
// Convención estándar de liquidación AR: valor día = mensual/25, valor hora = mensual/200.

export interface CalculoAguinaldo {
  mejorSueldo: number;
  mesesTrabajados: number;
  diasDelSemestreTrabajados?: number;
  sac: number;
  detalle: string;
}

/**
 * SAC (art. 121 LCT): 50% de la mayor remuneración mensual del semestre,
 * prorrateada por el tiempo trabajado en el semestre.
 */
export function calcularAguinaldo(mejorSueldo: number, mesesTrabajados: number): CalculoAguinaldo {
  if (mejorSueldo <= 0 || mesesTrabajados <= 0) {
    return { mejorSueldo, mesesTrabajados, sac: 0, detalle: "Sin datos suficientes" };
  }
  // Fracción > 3 días de trabajo cuenta como mes completo (costumbre consolidada;
  // el criterio estricto es por días, usamos meses con 1 decimal)
  const meses = Math.min(mesesTrabajados, 6);
  const sac = (mejorSueldo / 2) * (meses / 6);
  return {
    mejorSueldo,
    mesesTrabajados: meses,
    sac,
    detalle: `50% de ${mejorSueldo} × ${meses}/6 meses del semestre`,
  };
}

/** Días de vacaciones corridas según antigüedad (art. 150 LCT) */
export function diasVacaciones(antiguedadAnios: number): number {
  if (antiguedadAnios <= 5) return 14;
  if (antiguedadAnios <= 10) return 21;
  if (antiguedadAnios <= 20) return 28;
  return 30;
}

/** Pago de vacaciones: días corridos pagados a valor día (mensual/25) */
export function pagoVacaciones(sueldoMensual: number, dias: number): number {
  return (sueldoMensual / 25) * dias;
}

/** Indemnización por vacaciones no gozadas (art. 156 LCT, proporcional al tiempo trabajado) */
export function vacacionesNoGozadas(
  sueldoMensual: number,
  antiguedadAnios: number,
  mesesTrabajadosDesdeVacaciones: number,
): { diasProporcionales: number; pago: number } {
  const diasAnuales = diasVacaciones(antiguedadAnios);
  const diasProporcionales = (diasAnuales / 12) * Math.min(mesesTrabajadosDesdeVacaciones, 12);
  const pago = (sueldoMensual / 25) * diasProporcionales;
  return { diasProporcionales, pago };
}

/** Valor de la hora: mensual/200 (jornada 8h, 25 días) */
export function valorHora(sueldoMensual: number): number {
  return sueldoMensual / 200;
}

/** Horas extras (art. 201 LCT): 50% días hábiles; 100% sábado después de 13h, domingo y feriados */
export function calcularHorasExtras(sueldoMensual: number, horas50: number, horas100: number) {
  const vh = valorHora(sueldoMensual);
  return {
    valorHora: vh,
    pago50: vh * 1.5 * horas50,
    pago100: vh * 2 * horas100,
    total: vh * 1.5 * horas50 + vh * 2 * horas100,
  };
}

/** Valor día y valor hora de un sueldo mensual */
export function descomponerSueldo(sueldoMensual: number) {
  return { porDia: sueldoMensual / 25, porHora: sueldoMensual / 200 };
}

/** Días hábiles entre dos fechas (inclusive), descontando fines de semana y feriados.
 * Trabaja en UTC puro para que "2026-08-10" sea SIEMPRE el 10 de agosto,
 * independiente de la zona horaria del navegador (bug clásico de Date). */
export function diasHabiles(desdeISO: string, hastaISO: string, feriadosISO: Set<string>): number {
  // normaliza a mediodía UTC: inmuniza contra DST y zonas
  const t = (iso: string) => new Date(iso + "T12:00:00Z").getTime();
  let ms = t(desdeISO);
  const fin = t(hastaISO);
  if (fin < ms) return 0;
  let count = 0;
  while (ms <= fin) {
    const d = new Date(ms);
    const dow = d.getUTCDay();
    const iso = d.toISOString().slice(0, 10);
    if (dow !== 0 && dow !== 6 && !feriadosISO.has(iso)) count++;
    ms += 86_400_000;
  }
  return count;
}

/** Próximo feriado a partir de una fecha */
export function proximoFeriado(
  fecha: Date,
  feriados: { fecha: string; nombre: string }[],
): { fecha: string; nombre: string; diasRestantes: number } | null {
  const isoHoy = fecha.toISOString().slice(0, 10);
  const futuro = feriados
    .filter((f) => f.fecha > isoHoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];
  if (!futuro) return null;
  const diasRestantes = Math.round(
    (new Date(futuro.fecha + "T12:00:00Z").getTime() - new Date(isoHoy + "T12:00:00Z").getTime()) /
      86_400_000,
  );
  return { ...futuro, diasRestantes };
}

/**
 * Indemnización por despido sin causa (art. 245 LCT):
 * 1 mejor remuneración por año de servicio o fracción > 3 meses
 * + SAC proporcional del semestre en curso.
 */
export function indemnizacionDespido(
  mejorRemuneracionMensual: number,
  anios: number,
  mesesUltimoAnio: number,
): { aniosReconocidos: number; base: number; sacProporcional: number; total: number } {
  if (mejorRemuneracionMensual <= 0) {
    return { aniosReconocidos: 0, base: 0, sacProporcional: 0, total: 0 };
  }
  const aniosReconocidos = Math.floor(anios) + (anios % 1 >= 0.25 ? 1 : 0);
  const base = mejorRemuneracionMensual * aniosReconocidos;
  const sacProporcional = (mejorRemuneracionMensual / 12) * Math.min(mesesUltimoAnio, 6);
  return { aniosReconocidos, base, sacProporcional, total: base + sacProporcional };
}
