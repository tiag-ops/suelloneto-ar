// Motor de cálculo financiero. Puro, sin DOM ni fetch.

export interface ResultadoPlazoFijo {
  capital: number;
  interes: number;
  montoFinal: number;
  tea: number; // TEA equivalente a la TNA
}

/** Plazo fijo en pesos: interés simple si no se renueva, compuesto si se renueva. */
export function calcularPlazoFijo(
  capital: number,
  tna: number, // en %, ej 40
  meses: number,
  renovacionMensual: boolean,
): ResultadoPlazoFijo {
  const i = tna / 100;
  if (capital <= 0 || meses <= 0) {
    return { capital, interes: 0, montoFinal: capital, tea: 0 };
  }
  const tea = (Math.pow(1 + i / 12, 12) - 1) * 100;
  const montoFinal = renovacionMensual
    ? capital * Math.pow(1 + i / 12, meses)
    : capital * (1 + (i * meses) / 12);
  return { capital, interes: montoFinal - capital, montoFinal, tea };
}

/** Plazo fijo por días (los bancos liquidan por días reales: interés = P × TNA × días/365) */
export function calcularPlazoFijoDias(
  capital: number,
  tna: number,
  dias: number,
): ResultadoPlazoFijo {
  const i = tna / 100;
  if (capital <= 0 || dias <= 0) {
    return { capital, interes: 0, montoFinal: capital, tea: 0 };
  }
  const montoFinal = capital * (1 + (i * dias) / 365);
  // TEA: anualización compuesta de la tasa efectiva del período
  const tea = (Math.pow(1 + (i * dias) / 365, 365 / dias) - 1) * 100;
  return { capital, interes: montoFinal - capital, montoFinal, tea };
}

export interface CuotaCredito {
  cuotaMensual: number;
  totalPagado: number;
  totalInteres: number;
}

/** Cuota de crédito con sistema francés (cuota fija). */
export function calcularCredito(
  monto: number,
  tna: number, // TNA en %, la banca AR cotiza en TNA
  meses: number,
): CuotaCredito {
  if (monto <= 0 || meses <= 0) {
    return { cuotaMensual: 0, totalPagado: 0, totalInteres: 0 };
  }
  const i = tna / 100 / 12;
  const cuota =
    i === 0 ? monto / meses : (monto * i) / (1 - Math.pow(1 + i, -meses));
  return {
    cuotaMensual: cuota,
    totalPagado: cuota * meses,
    totalInteres: cuota * meses - monto,
  };
}

/** CUIL/CUIT: prefijo (20 varón, 27 mujer) + DNI + dígito verificador módulo 11 (algoritmo AFIP).
 * Caso especial resto=1: se usa prefijo 23 con dv 9 (masculino) o 4 (femenino). */
export interface CuilCompleto {
  cuil: string;
  prefijo: number;
  dv: number;
}

export function calcularCuilCompleto(dni: number, esMujer: boolean): CuilCompleto {
  const base = String(dni).padStart(8, "0");
  const dvPara = (prefijo: number) => {
    const s = `${prefijo}${base}`;
    const pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    for (let k = 0; k < 10; k++) suma += Number(s[k]) * pesos[k];
    const resto = suma % 11;
    return { resto, dv: 11 - resto };
  };

  const prefijoNormal = esMujer ? 27 : 20;
  const { resto, dv } = dvPara(prefijoNormal);

  if (resto === 0) return { cuil: `${prefijoNormal}-${base}-0`, prefijo: prefijoNormal, dv: 0 };
  if (resto === 1) {
    // regla AFIP oficial: prefijo 23, dv 9 (masc) / 4 (fem)
    const dvEspecial = esMujer ? 4 : 9;
    return { cuil: `23-${base}-${dvEspecial}`, prefijo: 23, dv: dvEspecial };
  }
  return { cuil: `${prefijoNormal}-${base}-${dv}`, prefijo: prefijoNormal, dv };
}

export function calcularCuil(dni: number, esMujer: boolean): string {
  return calcularCuilCompleto(dni, esMujer).cuil;
}

/** Verifica un CUIL/CUIT ingresado (formato NN-NNNNNNNN-N) */
export function verificarCuil(cuil: string): boolean {
  const m = cuil.replace(/[\s-]/g, "");
  if (!/^\d{11}$/.test(m)) return false;
  const prefijo = Number(m.slice(0, 2));
  if (![20, 23, 24, 27, 30, 33, 34].includes(prefijo)) return false;
  // recompute con la misma lógica que calcularCuilCompleto (incluye regla 23/9|4)
  const dni = Number(m.slice(2, 10));
  const esMujer = prefijo === 27 || (prefijo === 23 && Number(m[10]) === 4);
  return calcularCuilCompleto(dni, esMujer).cuil === `${prefijo}-${m.slice(2, 10)}-${m[10]}`;
}

/** Brecha cambiaria en % */
export function brechaCambiaria(oficial: number, paralelo: number): number {
  if (oficial <= 0) return 0;
  return ((paralelo - oficial) / oficial) * 100;
}

/** Dólar tarjeta: oficial + percepciones configurables (% cada una) */
export function dolarTarjeta(
  dolarOficial: number,
  percepciones: number[], // en %, ej [30, 45]
): { dolarTarjeta: number; percepcionesAplicadas: number } {
  const total = percepciones.reduce((acc, p) => acc + p, 0);
  return {
    dolarTarjeta: dolarOficial * (1 + total / 100),
    percepcionesAplicadas: total,
  };
}

/** Poder de compra: cuánto hay que tener dentro de N meses para comprar lo que hoy cuesta "monto", con inflación mensual i% */
export function poderDeCompra(
  montoHoy: number,
  inflacionMensual: number, // %
  meses: number,
): { necesitare: number; equivalenteHoy: number } {
  const f = Math.pow(1 + inflacionMensual / 100, meses);
  return {
    necesitare: montoHoy * f,
    equivalenteHoy: f > 0 ? montoHoy / f : montoHoy,
  };
}
