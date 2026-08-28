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

export function porCategoria(): Record<string, CalculadoraMeta[]> {
  const map: Record<string, CalculadoraMeta[]> = {};
  for (const c of CALCULADORAS) {
    (map[c.categoria] ??= []).push(c);
  }
  return map;
}
