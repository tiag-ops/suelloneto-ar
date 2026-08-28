// Registro central de calculadoras — fuente de la home indexable y del sitemap.
export interface CalculadoraMeta {
  slug: string; // ruta sin "/" inicial, ej "aguinaldo"
  titulo: string; // H1 y title
  descripcion: string; // meta description
  keyword: string; // keyword principal
  categoria: "laboral" | "monetarias" | "inversiones" | "impuestos" | "utilidades";
  icono: string; // emoji
}

export const CALCULADORAS: CalculadoraMeta[] = [
  // ── Laboral ──
  { slug: "aguinaldo", titulo: "Calculadora de Aguinaldo (SAC) 2026", descripcion: "Calculá tu aguinaldo semestral o proporcional según tu mejor sueldo y los meses trabajados. Fórmula del art. 121 LCT.", keyword: "calculadora aguinaldo", categoria: "laboral", icono: "🎁" },
  { slug: "vacaciones", titulo: "Calculadora de Vacaciones: días y pago", descripcion: "Días de vacaciones que te corresponden según tu antigüedad y cuánto cobrás por ellas. Arts. 150 y 156 LCT.", keyword: "calculadora vacaciones", categoria: "laboral", icono: "🏖️" },
  { slug: "vacaciones-no-gozadas", titulo: "Vacaciones no gozadas: indemnización", descripcion: "Indemnización por vacaciones no gozadas al momento del despido, proporcional por mes trabajado (art. 156 LCT).", keyword: "vacaciones no gozadas calculadora", categoria: "laboral", icono: "⚖️" },
  { slug: "horas-extras", titulo: "Calculadora de Horas Extras 50% y 100%", descripcion: "Cuánto cobrás por horas extras al 50% (días hábiles) y al 100% (sábados después de 13h, domingos y feriados). Art. 201 LCT.", keyword: "calculadora horas extras", categoria: "laboral", icono: "⏰" },
  { slug: "sueldo-por-dia", titulo: "Sueldo por día y por hora", descripcion: "Descomponé tu sueldo mensual: valor de tu jornada diaria (÷25) y de tu hora de trabajo (÷200).", keyword: "sueldo por dia", categoria: "laboral", icono: "📅" },
  { slug: "dias-habiles", titulo: "Calculadora de días hábiles entre fechas", descripcion: "Días hábiles entre dos fechas en Argentina: descuenta fines de semana y feriados nacionales.", keyword: "calculadora dias habiles", categoria: "laboral", icono: "📆" },
  { slug: "proximo-feriado", titulo: "Próximo feriado en Argentina", descripcion: "Cuánto falta para el próximo feriado nacional: fecha, nombre y días restantes.", keyword: "proximo feriado", categoria: "laboral", icono: "🇦🇷" },
  { slug: "indemnizacion", titulo: "Calculadora de Indemnización por despido", descripcion: "Indemnización por despido sin causa (art. 245 LCT): un sueldo por año o fracción mayor a 3 meses, más SAC proporcional.", keyword: "calculadora indemnizacion despido", categoria: "laboral", icono: "💼" },
  // ── Impuestos (ya existentes) ──
  { slug: "", titulo: "Calculadora de Sueldo Neto 2026", descripcion: "Tu sueldo neto con aportes e Impuesto a las Ganancias (método doceava, valores ARCA vigentes).", keyword: "calculadora sueldo neto", categoria: "impuestos", icono: "💵" },
  { slug: "monotributo", titulo: "Monotributo 2026: categorías y cuotas", descripcion: "Tabla completa de categorías y cuotas del monotributo desde el 01/08/2026, con buscador por facturación.", keyword: "monotributo categorias 2026", categoria: "impuestos", icono: "🧾" },
  // ── Financieras ──
  { slug: "plazo-fijo", titulo: "Simulador de Plazo Fijo 2026", descripcion: "Interés ganado por días o meses, con o sin renovación, y la TEA equivalente de cualquier TNA.", keyword: "simulador plazo fijo", categoria: "inversiones", icono: "📈" },
  { slug: "credito", titulo: "Simulador de Crédito: cuota fija", descripcion: "Cuota mensual de tu préstamo con sistema francés, total de intereses y pagado.", keyword: "simulador credito", categoria: "inversiones", icono: "🏦" },
  { slug: "dolar-tarjeta", titulo: "Dólar tarjeta: calculadora con percepciones", descripcion: "Cuánto pagás realmente el dólar tarjeta: oficial + percepciones vigentes, con ejemplos.", keyword: "dolar tarjeta hoy", categoria: "monetarias", icono: "💳" },
  { slug: "cuil", titulo: "Calculadora de CUIL por DNI", descripcion: "Tu CUIL según DNI y género con el algoritmo oficial AFIP (módulo 11), caso especial 23 incluido.", keyword: "calculadora cuil", categoria: "utilidades", icono: "🆔" },
];

/** Artículos de la sección /guia — para enlazado interno automático */
export interface GuiaMeta {
  slug: string;
  titulo: string; // título corto para chips/enlaces
  descripcion: string; // 1 línea
  /** slugs de calculadoras relacionadas (link juice hacia las tools) */
  calculadoras: string[];
}

export const GUIAS: GuiaMeta[] = [
  { slug: "ganancias-desde-cuanto", titulo: "¿Desde cuánto se paga Ganancias?", descripcion: "Piso por situación familiar y tabla calculada con valores vigentes.", calculadoras: ["", "monotributo"] },
  { slug: "aguinaldo-junio-2026", titulo: "Aguinaldo junio 2026: fechas", descripcion: "Cuándo cobran y cómo se calcula el SAC, con tabla.", calculadoras: ["aguinaldo"] },
  { slug: "monotributo-cuanto-pago", titulo: "¿Cuánto se paga de monotributo?", descripcion: "Cuota de cada categoría, desglosada en impuesto, SIPA y obra social.", calculadoras: ["monotributo"] },
  { slug: "escala-ganancias-2026", titulo: "Escala del art. 94 (2026)", descripcion: "Tabla completa de tramos con ejemplos liquidados.", calculadoras: ["", "monotributo"] },
  { slug: "vacaciones-dias-pago", titulo: "Vacaciones: días y pago", descripcion: "Cuántos días según antigüedad y cuánto se cobra por día corrido.", calculadoras: ["vacaciones", "vacaciones-no-gozadas"] },
  { slug: "dolar-tarjeta-como-se-calcula", titulo: "Dólar tarjeta paso a paso", descripcion: "Qué percepciones se aplican y cómo estimar el costo real.", calculadoras: ["dolar-tarjeta"] },
  { slug: "indemnizacion-despido-2026", titulo: "Indemnización por despido", descripcion: "Componentes de la liquidación final y tabla por antigüedad.", calculadoras: ["indemnizacion", "vacaciones-no-gozadas", "aguinaldo"] },
  { slug: "aguinaldo-despido", titulo: "Liquidación final: qué te deben", descripcion: "Aguinaldo proporcional, vacaciones y checklist completo.", calculadoras: ["indemnizacion", "aguinaldo", "vacaciones-no-gozadas"] },
  { slug: "sueldo-bruto-a-neto", titulo: "De bruto a neto", descripcion: "La conversión exacta en dos pasos, con tabla por sueldo.", calculadoras: ["", "sueldo-por-dia"] },
  { slug: "horas-extras-cuanto-cobran", titulo: "Horas extras: cuánto se cobra", descripcion: "Recargos del 50% y 100% con ejemplos calculados.", calculadoras: ["horas-extras", "sueldo-por-dia"] },
];

export function porCategoria(): Record<string, CalculadoraMeta[]> {
  const map: Record<string, CalculadoraMeta[]> = {};
  for (const c of CALCULADORAS) {
    (map[c.categoria] ??= []).push(c);
  }
  return map;
}

/** URL de una calculadora por slug ("" = home) */
export function urlDe(slug: string): string {
  return slug === "" ? "/" : `/${slug}/`;
}

/** Calculadoras relacionadas: mismas categorías, excluyéndose a sí misma */
export function relacionadas(slug: string, limite = 4): CalculadoraMeta[] {
  const actual = CALCULADORAS.find((c) => c.slug === slug);
  if (!actual) return CALCULADORAS.filter((c) => c.slug !== slug).slice(0, limite);
  const mismaCat = CALCULADORAS.filter((c) => c.slug !== slug && c.categoria === actual.categoria);
  const otras = CALCULADORAS.filter((c) => c.slug !== slug && c.categoria !== actual.categoria);
  return [...mismaCat, ...otras].slice(0, limite);
}

/** Guías relacionadas con una calculadora (las que la mencionan) */
export function guiasDeCalculadora(slug: string, limite = 3): GuiaMeta[] {
  return GUIAS.filter((g) => g.calculadoras.includes(slug)).slice(0, limite);
}

/** Otras guías (excluyendo una) para el bloque "Seguí leyendo" */
export function otrasGuias(slug: string, limite = 4): GuiaMeta[] {
  return GUIAS.filter((g) => g.slug !== slug).slice(0, limite);
}
