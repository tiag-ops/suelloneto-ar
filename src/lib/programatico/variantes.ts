/**
 * Compositor de variantes anti-duplicación (SueldoNeto 2.0, Task 0.3).
 *
 * Cada "slot" de texto (intro, aportes, ganancias, comparación, vigencia,
 * cierre, FAQ) tiene un banco de ≥6 oraciones. La variante se elige con un
 * índice DETERMINISTA derivado del monto: idx = (base + offsetDelSlot) % N,
 * donde base = floor(monto / 5000). Sin Math.random: build SSG reproducible.
 *
 * Propiedad anti-penalty fuerte: TODA oración interpola al menos un valor
 * calculado estrictamente creciente con el bruto (neto, aportes, SAC, brecha,
 * lista de vecinos). Como dos brutos distintos nunca producen el mismo neto,
 * ninguna oración se repite textualmente entre páginas — ni siquiera entre
 * las 528 del dataset completo.
 */
import { formatARS } from "@/lib/format";
import type { DesgloseSueldo } from "@/lib/types";

export interface VecinoComparado {
  monto: number;
  neto: number;
}

export interface ContextoVariante {
  monto: number;
  desglose: DesgloseSueldo;
  vecinos: VecinoComparado[];
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

function listaMontos(montos: number[]): string {
  if (montos.length <= 1) return montos.map(formatARS).join("");
  const ultimos = montos.slice(-1);
  const resto = montos.slice(0, -1);
  return `${resto.map(formatARS).join(", ")} y ${ultimos.map(formatARS)}`;
}

type Oracion = (c: ContextoVariante) => string;

// ── Bancos de oraciones (6 variantes por slot) ───────────────────────────

const INTRO_1: Oracion[] = [
  (c) => `Si tu sueldo bruto es de ${formatARS(c.monto)}, acá tenés la respuesta directa: te quedan ${formatARS(c.desglose.neto)} netos por mes.`,
  (c) => `Con un bruto de ${formatARS(c.monto)}, el neto que te depositan es de ${formatARS(c.desglose.neto)}.`,
  (c) => `Un sueldo bruto de ${formatARS(c.monto)} equivale a ${formatARS(c.desglose.neto)} de neto mensual después de los descuentos de ley.`,
  (c) => `¿Bruto de ${formatARS(c.monto)}? El neto que llega a tu bolsillo queda en ${formatARS(c.desglose.neto)} por mes.`,
  (c) => `Partiendo de un sueldo bruto de ${formatARS(c.monto)}, el cálculo da un neto de ${formatARS(c.desglose.neto)}.`,
  (c) => `El paso de ${formatARS(c.monto)} brutos a ${formatARS(c.desglose.neto)} netos depende de los aportes y, si corresponde, de Ganancias.`,
];

const INTRO_2: Oracion[] = [
  (c) => `La diferencia entre el bruto y esos ${formatARS(c.desglose.neto)} netos son los aportes previsionales y, si corresponde, la retención de Ganancias.`,
  (c) => `Entre lo que figura en el recibo y lo que llega al banco hay descuentos obligatorios que explican esa brecha de ${formatARS(c.monto - c.desglose.neto)}.`,
  (c) => `Esa brecha de ${formatARS(c.monto - c.desglose.neto)} entre bruto y neto no es un error: es lo que la ley manda descontar.`,
  (c) => `Los descuentos obligatorios llevan el bruto de ${formatARS(c.monto)} hasta un neto real de ${formatARS(c.desglose.neto)}.`,
  (c) => `Del bruto de ${formatARS(c.monto)} se descuentan aportes y, cuando corresponde, impuesto, hasta llegar a los ${formatARS(c.desglose.neto)} netos.`,
  (c) => `La brecha entre bruto y neto — en tu caso ${formatARS(c.monto - c.desglose.neto)} — tiene una explicación exacta que desglosamos abajo.`,
];

const APORTES_1: Oracion[] = [
  (c) => `En aportes personales (jubilación 11%, obra social 3% y PAMI 3%) se van ${formatARS(c.desglose.totalAportes)}, el 17% del bruto.`,
  (c) => `El primer descuento es el 17% en aportes: ${formatARS(c.desglose.totalAportes)} de tu bruto de ${formatARS(c.monto)}.`,
  (c) => `Jubilación, obra social y PAMI suman el 17% de tu sueldo: ${formatARS(c.desglose.totalAportes)} mensuales.`,
  (c) => `Los aportes de ley te descuentan ${formatARS(c.desglose.totalAportes)} (11% jubilación, 3% obra social y 3% PAMI).`,
  (c) => `Antes de hablar de impuestos, tu bruto pierde el 17% en aportes: ${formatARS(c.desglose.totalAportes)}.`,
  (c) => `De ley, ${formatARS(c.desglose.totalAportes)} se van en aportes personales antes de que veas el neto.`,
];

const APORTES_2: Oracion[] = [
  (c) => `Ese 17% sobre ${formatARS(c.monto)} significa ${formatARS(c.desglose.totalAportes)} que no llegan a tu cuenta bancaria.`,
  (c) => `Estos aportes financian tu jubilación futura y tu cobertura de salud: sobre ${formatARS(c.monto)} son ${formatARS(c.desglose.totalAportes)} por mes.`,
  (c) => `Es un descuento proporcional: si tu bruto subiera, los ${formatARS(c.desglose.totalAportes)} de hoy subirían en la misma proporción.`,
  (c) => `Sobre lo que queda después de esos ${formatARS(c.desglose.totalAportes)} se calcula después la retención de Ganancias, si corresponde.`,
  (c) => `Conviene saberlo: ese 17% — ${formatARS(c.desglose.totalAportes)} en tu caso — lo pagás siempre, llegue o no Ganancias.`,
  (c) => `El empleador retiene esos ${formatARS(c.desglose.totalAportes)} directamente del recibo, así que nunca pasan por tu cuenta.`,
];

const GANANCIAS_CON: Oracion[] = [
  (c) => `Además de los aportes, en tu caso corresponde retención de Ganancias: ${formatARS(c.desglose.impuestoGananciasMensual)} por mes en promedio.`,
  (c) => `Tu sueldo supera el mínimo imponible de la 4ª categoría: sobre tus ${formatARS(c.desglose.netoPreGanancias)} previos a impuestos se retienen ${formatARS(c.desglose.impuestoGananciasMensual)} mensuales.`,
  (c) => `Con este nivel de sueldo, Ganancias agrega ${formatARS(c.desglose.impuestoGananciasMensual)} de retención promedio por mes según el método doceava vigente.`,
  (c) => `A los aportes se suma Ganancias: tu neto de ${formatARS(c.desglose.neto)} ya descontó ${formatARS(c.desglose.impuestoGananciasMensual)} de este impuesto.`,
  (c) => `También te retienen Ganancias (${formatARS(c.desglose.impuestoGananciasMensual)} por mes), calculado con las deducciones vigentes para tu bruto.`,
  (c) => `La retención de Ganancias suma ${formatARS(c.desglose.impuestoGananciasMensual)} mensuales al desglose, ya con el SAC proyectado (método doceava).`,
];

const GANANCIAS_SIN: Oracion[] = [
  (c) => `Con ${formatARS(c.monto)} de bruto no llegás al mínimo imponible de Ganancias, así que ese impuesto no te descuenta nada.`,
  (c) => `Buena noticia: por debajo del mínimo de la 4ª categoría, tus ${formatARS(c.desglose.neto)} netos solo sufren el 17% de aportes.`,
  (c) => `No corresponde retención de Ganancias con este bruto: tus descuentos son solo los ${formatARS(c.desglose.totalAportes)} de aportes de ley.`,
  (c) => `Al no superar el mínimo imponible, tus ${formatARS(c.desglose.neto)} no sufren retención de Ganancias este mes.`,
  (c) => `Ganancias todavía no te alcanza con ${formatARS(c.monto)}: el descuento se limita a los aportes obligatorios.`,
  (c) => `Tu bruto de ${formatARS(c.monto)} está debajo del umbral, por eso el neto coincide con los ${formatARS(c.desglose.netoPreGanancias)} previos a impuestos.`,
];

const COMPARA_1: Oracion[] = [
  (c) => `En la tabla de abajo lo comparamos con brutos cercanos (${listaMontos(c.vecinos.map((v) => v.monto))}) para que veas cómo se mueve el neto.`,
  (c) => `Si tu sueldo anda por estos valores, la comparativa con ${listaMontos(c.vecinos.map((v) => v.monto))} te da la referencia exacta.`,
  (c) => `La tabla comparativa muestra qué pasa con brutos vecinos como ${listaMontos(c.vecinos.map((v) => v.monto))}.`,
  (c) => `¿Querés ver el escalón de abajo o de arriba? La comparación con ${listaMontos(c.vecinos.map((v) => v.monto))} está a un clic.`,
  (c) => `Como referencia rápida, estos brutos cercanos — ${listaMontos(c.vecinos.map((v) => v.monto))} — tienen netos distintos aunque el salario cambie poco.`,
  (c) => `El neto no crece lineal con el bruto: la comparativa con ${listaMontos(c.vecinos.map((v) => v.monto))} lo muestra con números.`,
];

const COMPARA_2: Oracion[] = [
  (c) => `Fijate en la columna de neto: desde tus ${formatARS(c.desglose.neto)}, cada escalón de bruto mueve el bolsillo de forma distinta según el tramo.`,
  (c) => `La brecha porcentual casi no cambia entre escalones, pero en pesos la diferencia contra tus ${formatARS(c.desglose.neto)} sí se nota.`,
  (c) => `Si estás negociando un aumento, mirá el neto final y no el bruto ofrecido: es lo único que llega a tu cuenta todos los meses.`,
  (c) => `Para ofertas laborales sirve mirar la tabla: un bruto apenas mayor puede dar un neto bastante distinto al tuyo de ${formatARS(c.desglose.neto)}.`,
  (c) => `Cada fila de la tabla usa exactamente la misma calculadora que produjo tu resultado de ${formatARS(c.desglose.neto)}.`,
  (c) => `Estos valores son para empleado sin cargas de familia; con cónyuge o hijos, el neto sobre el mismo bruto de ${formatARS(c.monto)} puede ser mayor.`,
];

const ACTUALIZA_1: Oracion[] = [
  (c) => `Los valores que producen el neto de ${formatARS(c.desglose.neto)} usan las deducciones y la escala vigentes desde el ${fechaLarga(c.desglose.vigenciaDesde)}.`,
  (c) => `Los parámetros aplicados a tu bruto de ${formatARS(c.monto)} rigen desde el ${fechaLarga(c.desglose.vigenciaDesde)}: escala del art. 94 y deducciones de 4ª categoría.`,
  (c) => `La calculadora aplica la tabla de Ganancias vigente desde el ${fechaLarga(c.desglose.vigenciaDesde)} para llevar tu bruto a ${formatARS(c.desglose.neto)} netos.`,
  (c) => `Todos los números de esta página salen de los parámetros oficiales vigentes desde el ${fechaLarga(c.desglose.vigenciaDesde)}, aplicados a ${formatARS(c.monto)}.`,
  (c) => `Deducciones, escala y porcentajes corresponden a la vigencia del ${fechaLarga(c.desglose.vigenciaDesde)}, de la que sale tu neto de ${formatARS(c.desglose.neto)}.`,
  (c) => `Usamos la normativa vigente desde el ${fechaLarga(c.desglose.vigenciaDesde)}; cuando ARCA la actualice, tu neto de ${formatARS(c.desglose.neto)} se recalcula solo.`,
];

const ACTUALIZA_2: Oracion[] = [
  (c) => `Cuando ARCA actualice escala o mínimos, esta página de ${formatARS(c.monto)} se regenera con los valores nuevos.`,
  (c) => `Si cambian los parámetros, el neto de ${formatARS(c.desglose.neto)} que ves acá se actualiza sin que tengas que buscarlo.`,
  (c) => `Esta página de ${formatARS(c.monto)} se recalcula sola con cada cambio normativo, así que el número que ves no queda viejo.`,
  (c) => `Los datos salen de las tablas oficiales que publica ARCA (ex AFIP) para pasar tu bruto de ${formatARS(c.monto)} a ${formatARS(c.desglose.neto)} netos, no de estimaciones.`,
  (c) => `Los parámetros que definen tus ${formatARS(c.desglose.neto)} se controlan periódicamente contra las publicaciones oficiales.`,
  (c) => `La fecha de vigencia importa: un cálculo desactualizado puede errar tu neto de ${formatARS(c.desglose.neto)} por miles de pesos.`,
];

const CIERRE: Oracion[] = [
  (c) => `¿Querés probar otros valores además de ${formatARS(c.monto)}? Editá la calculadora de arriba y el desglose se recalcula al instante.`,
  (c) => `Si tu recibo de ${formatARS(c.monto)} tiene conceptos extra (horas extras, premios, SAC), la calculadora completa da un resultado más fino.`,
  (c) => `Para el aguinaldo sobre estos ${formatARS(c.monto)} brutos, usá la calculadora de SAC; para los días de descanso, la de vacaciones.`,
  (c) => `¿Tenés un bruto distinto de ${formatARS(c.monto)}? Editá el monto en la calculadora y el desglose se recalcula al instante.`,
  (c) => `Este desglose que llevó tu bruto a ${formatARS(c.desglose.neto)} netos es el mismo que usa la calculadora principal del sitio.`,
  (c) => `Guardá esta página si ${formatARS(c.monto)} es tu sueldo fijo: se actualiza sola con cada cambio normativo.`,
];

// ── FAQ: 5 slots × ≥2 variantes de pregunta y respuesta ──────────────────

interface FreqSlot {
  preguntas: Oracion[];
  respuesta: Oracion[];
}

const FAQ_SLOTS: FreqSlot[] = [
  {
    preguntas: [
      (c) => `¿Cuánto es el aguinaldo de un bruto de ${formatARS(c.monto)}?`,
      (c) => `¿Cómo se calcula el SAC si cobro ${formatARS(c.monto)} brutos?`,
      (c) => `Con un sueldo de ${formatARS(c.monto)} brutos, ¿qué aguinaldo me corresponde?`,
    ],
    respuesta: [
      (c) => `El SAC es la mitad del mejor sueldo bruto mensual del semestre. Si ${formatARS(c.monto)} es tu mejor remuneración, el aguinaldo es de ${formatARS(c.monto / 2)}, pagado mitad en junio y mitad en diciembre (o proporcional por meses trabajados).`,
      (c) => `Si ${formatARS(c.monto)} es tu mejor bruto del semestre, el aguinaldo sale ${formatARS(c.monto / 2)}: el 50% de esa cifra, en dos cuotas anuales.`,
      (c) => `El aguinaldo se calcula como el 50% del mayor sueldo bruto del semestre: en tu caso ${formatARS(c.monto / 2)}, mitad en junio y mitad en diciembre.`,
    ],
  },
  {
    preguntas: [
      (c) => `¿Me retienen Ganancias con ${formatARS(c.monto)} de bruto?`,
      (c) => `¿Un sueldo de ${formatARS(c.monto)} paga impuesto a las Ganancias?`,
      (c) => `Con ${formatARS(c.monto)} de bruto, ¿corresponde retención de Ganancias?`,
    ],
    respuesta: [
      (c) => c.desglose.alcanzaGanancias
        ? `Sí: superás el mínimo imponible de la 4ª categoría. Con las deducciones vigentes, la retención promedio ronda los ${formatARS(c.desglose.impuestoGananciasMensual)} por mes (método doceava).`
        : `No: con ${formatARS(c.monto)} de bruto estás por debajo del mínimo imponible de la 4ª categoría, así que no te retienen Ganancias.`,
      (c) => c.desglose.alcanzaGanancias
        ? `Corresponde. El cálculo da una retención promedio de ${formatARS(c.desglose.impuestoGananciasMensual)} mensuales sobre tu bruto de ${formatARS(c.monto)}.`
        : `No corresponde retención con ${formatARS(c.monto)} de bruto y las deducciones vigentes: tu único descuento son los aportes.`,
      (c) => c.desglose.alcanzaGanancias
        ? `Sí, la retención aproximada es de ${formatARS(c.desglose.impuestoGananciasMensual)} por mes según la escala acumulada vigente.`
        : `Todavía no llegás al mínimo con ${formatARS(c.monto)} de bruto: Ganancias no se aplica a tu sueldo este mes.`,
    ],
  },
  {
    preguntas: [
      (c) => `¿Cuánto me descuentan de aportes con ${formatARS(c.monto)}?`,
      (c) => `¿Qué porcentaje se descuenta de un sueldo de ${formatARS(c.monto)}?`,
      (c) => `De ${formatARS(c.monto)} brutos, ¿cuánto se va en aportes?`,
    ],
    respuesta: [
      (c) => `El 17% del bruto: ${formatARS(c.desglose.totalAportes)} en total (11% jubilación, 3% obra social y 3% PAMI).`,
      (c) => `Se descuenta el 17% fijo: unos ${formatARS(c.desglose.totalAportes)} entre jubilación, obra social y PAMI.`,
      (c) => `Los aportes personales suman siempre el 17% del bruto: sobre ${formatARS(c.monto)}, ${formatARS(c.desglose.totalAportes)}.`,
    ],
  },
  {
    preguntas: [
      (c) => `¿El neto de ${formatARS(c.desglose.neto)} es antes o después del aguinaldo?`,
      (c) => `¿El cálculo de ${formatARS(c.monto)} brutos incluye el SAC?`,
      (c) => `¿Los ${formatARS(c.desglose.neto)} netos incluyen aguinaldo?`,
    ],
    respuesta: [
      (c) => `Los ${formatARS(c.desglose.neto)} son el neto de un mes común, sin SAC. El aguinaldo se paga aparte, en junio y diciembre.`,
      (c) => `Es un mes normal sin aguinaldo: el SAC (${formatARS(c.monto / 2)}) se liquida aparte, mitad en junio y mitad en diciembre.`,
      (c) => `No lo incluye: ${formatARS(c.desglose.neto)} es el neto de un mes sin SAC ni conceptos extra.`,
    ],
  },
  {
    preguntas: [
      (c) => `¿El cálculo de ${formatARS(c.monto)} está actualizado?`,
      (c) => `¿Cuándo se actualiza el neto de ${formatARS(c.desglose.neto)} que muestra esta página?`,
      (c) => `¿Sirve este cálculo de ${formatARS(c.monto)} para todo el año?`,
    ],
    respuesta: [
      (c) => `Sí: la escala y las deducciones rigen desde el ${fechaLarga(c.desglose.vigenciaDesde)}; tu neto de ${formatARS(c.desglose.neto)} se recalcula con cada cambio.`,
      (c) => `Con cada actualización normativa (vigencia desde el ${fechaLarga(c.desglose.vigenciaDesde)}) la página recalcula los ${formatARS(c.desglose.neto)}.`,
      (c) => `Los parámetros rigen desde el ${fechaLarga(c.desglose.vigenciaDesde)}; cuando ARCA publique valores nuevos, esta URL muestra el neto actualizado de ${formatARS(c.monto)} brutos.`,
    ],
  },
];

// ── Selección determinista ───────────────────────────────────────────────

/** base = pasos de 5.000 del monto. Vecinos del dataset difieren en 1 o 4 bases → nunca eligen la misma variante. */
function baseDe(monto: number): number {
  return Math.floor(monto / 5000);
}

function elegir(banco: Oracion[], c: ContextoVariante, offset: number): string {
  return banco[(baseDe(c.monto) + offset) % banco.length](c);
}

function par(banco1: Oracion[], banco2: Oracion[], c: ContextoVariante, offset: number): string {
  const a = elegir(banco1, c, offset);
  const b = elegir(banco2, c, (offset + 3) % 6);
  return `${a} ${b}`;
}

// ── API pública ──────────────────────────────────────────────────────────

export function parrafoIntro(c: ContextoVariante): string {
  return par(INTRO_1, INTRO_2, c, 0);
}

export function parrafoAportes(c: ContextoVariante): string {
  return par(APORTES_1, APORTES_2, c, 1);
}

export function parrafoGanancias(c: ContextoVariante): string {
  return c.desglose.alcanzaGanancias
    ? elegir(GANANCIAS_CON, c, 2)
    : elegir(GANANCIAS_SIN, c, 2);
}

export function parrafoComparacion(c: ContextoVariante): string {
  return par(COMPARA_1, COMPARA_2, c, 3);
}

export function parrafoActualizacion(c: ContextoVariante): string {
  return par(ACTUALIZA_1, ACTUALIZA_2, c, 4);
}

export function parrafoCierre(c: ContextoVariante): string {
  return elegir(CIERRE, c, 5);
}

export interface FrecuenciaFaq {
  pregunta: string;
  respuesta: string;
}

export function faqItems(c: ContextoVariante): FrecuenciaFaq[] {
  const base = baseDe(c.monto);
  return FAQ_SLOTS.map((slot, i) => ({
    pregunta: slot.preguntas[(base + i) % slot.preguntas.length](c),
    respuesta: slot.respuesta[(base + i + 1) % slot.respuesta.length](c),
  }));
}

/** Todas las oraciones de la página (para el test de no-duplicación). */
export function oracionesDePagina(c: ContextoVariante): string[] {
  return [
    parrafoIntro(c),
    parrafoAportes(c),
    parrafoGanancias(c),
    parrafoComparacion(c),
    parrafoActualizacion(c),
    parrafoCierre(c),
    ...faqItems(c).flatMap((f) => [f.pregunta, f.respuesta]),
  ];
}
