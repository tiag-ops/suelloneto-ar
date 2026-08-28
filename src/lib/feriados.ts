// Feriados nacionales de Argentina 2026 (Ley 27.399 + disposiciones ARCA/Anses).
// Fuente: calendario oficial publicado a fin de 2025.
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

export function esFeriado(iso: string): boolean {
  return FERIADOS_2026.some((f) => f.fecha === iso);
}
