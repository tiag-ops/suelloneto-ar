import { FERIADOS_2027, type Feriado } from "@/lib/feriados";

/** Datos generados por el motor en build-time. NO editar a mano. */
export function calendario2027(): (Feriado & { fechaLarga: string; diaSemana: string })[] {
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return FERIADOS_2027.map((f) => {
    // Normalizo al mediodía UTC para evitar el corrimiento de zona (UTC-3).
    const d = new Date(`${f.fecha}T12:00:00Z`);
    return {
      ...f,
      fechaLarga: `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`,
      diaSemana: DIAS[d.getUTCDay()],
    };
  });
}

export function proximosPuentes(): string {
  return "";
}
