// Feriados nacionales de Argentina (Ley 27.399 + disposiciones ARCA/Anses).
// 2026: calendario oficial publicado a fin de 2025.
// 2027: re-verificado 2026-09-06 (Ley 27.399 art. 6: mar/mié → lunes anterior;
//       jue/vie → lunes siguiente; sáb/dom NO se trasladan — precedente oficial:
//       Soberanía 20/11/2021, sábado, se observó el sábado; cotejado contra
//       calendariosnacionales.com API, 16 feriados, 100% coincidencia salvo la
//       regla de sáb/dom que ese fuente aplica distinto).
// TODO(fin de 2026): revisar el decreto de feriados puente/turísticos 2027 cuando se publique
//       (candidato: lunes 22/11/2027 si se declara puente tras Soberanía en sábado, patrón 2021).
export interface Feriado {
  fecha: string; // ISO YYYY-MM-DD
  nombre: string;
  tipo: "inamovible" | "trasladable" | "puente";
}

export const FERIADOS_2026: Feriado[] = [
  { fecha: "2026-01-01", nombre: "Año Nuevo", tipo: "inamovible" },
  { fecha: "2026-02-16", nombre: "Carnaval", tipo: "inamovible" },
  { fecha: "2026-02-17", nombre: "Carnaval", tipo: "inamovible" },
  { fecha: "2026-03-24", nombre: "Día Nacional de la Memoria por la Verdad y la Justicia", tipo: "inamovible" },
  { fecha: "2026-04-02", nombre: "Día del Veterano y de los Caídos en la Guerra de Malvinas", tipo: "inamovible" },
  { fecha: "2026-04-03", nombre: "Viernes Santo", tipo: "inamovible" },
  { fecha: "2026-05-01", nombre: "Día del Trabajador", tipo: "inamovible" },
  { fecha: "2026-05-25", nombre: "Día de la Revolución de Mayo", tipo: "inamovible" },
  { fecha: "2026-06-15", nombre: "Paso a la Inmortalidad del General Don Martín Miguel de Güemes", tipo: "trasladable" },
  { fecha: "2026-06-20", nombre: "Paso a la Inmortalidad del General Manuel Belgrano", tipo: "inamovible" },
  { fecha: "2026-07-09", nombre: "Día de la Independencia", tipo: "inamovible" },
  { fecha: "2026-08-17", nombre: "Paso a la Inmortalidad del General Don José de San Martín", tipo: "trasladable" },
  { fecha: "2026-10-12", nombre: "Día del Respeto a la Diversidad Cultural", tipo: "trasladable" },
  { fecha: "2026-11-23", nombre: "Día de la Soberanía Nacional", tipo: "trasladable" },
  { fecha: "2026-12-08", nombre: "Inmaculada Concepción de María", tipo: "inamovible" },
  { fecha: "2026-12-25", nombre: "Navidad", tipo: "inamovible" },
];

export const FERIADOS_2027: Feriado[] = [
  { fecha: "2027-01-01", nombre: "Año Nuevo", tipo: "inamovible" },
  { fecha: "2027-02-08", nombre: "Carnaval", tipo: "inamovible" },
  { fecha: "2027-02-09", nombre: "Carnaval", tipo: "inamovible" },
  { fecha: "2027-03-24", nombre: "Día Nacional de la Memoria por la Verdad y la Justicia", tipo: "inamovible" },
  { fecha: "2027-03-26", nombre: "Viernes Santo", tipo: "inamovible" },
  { fecha: "2027-04-02", nombre: "Día del Veterano y de los Caídos en la Guerra de Malvinas", tipo: "inamovible" },
  { fecha: "2027-05-01", nombre: "Día del Trabajador", tipo: "inamovible" },
  { fecha: "2027-05-25", nombre: "Día de la Revolución de Mayo", tipo: "inamovible" },
  { fecha: "2027-06-21", nombre: "Paso a la Inmortalidad del General Martín Miguel de Güemes", tipo: "trasladable" },
  { fecha: "2027-06-20", nombre: "Paso a la Inmortalidad del General Manuel Belgrano", tipo: "inamovible" },
  { fecha: "2027-07-09", nombre: "Día de la Independencia", tipo: "inamovible" },
  { fecha: "2027-08-16", nombre: "Paso a la Inmortalidad del General Don José de San Martín", tipo: "trasladable" },
  { fecha: "2027-10-11", nombre: "Día del Respeto a la Diversidad Cultural", tipo: "trasladable" },
  { fecha: "2027-11-20", nombre: "Día de la Soberanía Nacional", tipo: "trasladable" },
  { fecha: "2027-12-08", nombre: "Inmaculada Concepción de María", tipo: "inamovible" },
  { fecha: "2027-12-25", nombre: "Navidad", tipo: "inamovible" },
];

/** Todos los feriados conocidos, ordenados por fecha. */
export const FERIADOS: Feriado[] = [...FERIADOS_2026, ...FERIADOS_2027].sort((a, b) =>
  a.fecha.localeCompare(b.fecha),
);

export function esFeriado(iso: string): boolean {
  return FERIADOS.some((f) => f.fecha === iso);
}
