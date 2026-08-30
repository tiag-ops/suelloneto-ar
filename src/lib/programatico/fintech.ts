import fintechRaw from "@/data/fintech.json";

// FASE 2 (Task 2.1): recomendación con disclosure, sin hardcodear links.
// Una recomendación solo se muestra si TODO esto es verdad:
//   1. activo === true
//   2. urlReferido no vacía (el link del referido va por env o edición manual del JSON)
//   3. terminosVerificadosEl con fecha ISO (los ToS de referidos cambian; cron semestral los re-chequea)
// Con cero recomendaciones elegibles el componente NO renderiza nada (estado vacío probado en tests).

export interface RecomendacionFintech {
  slug: string;
  nombre: string;
  tipo: string;
  producto: string;
  urlReferido: string;
  comisionConocida: string;
  terminosVerificadosEl: string | null;
  activo: boolean;
}

export const FINTECH: RecomendacionFintech[] = fintechRaw as RecomendacionFintech[];

export function esElegible(r: RecomendacionFintech): boolean {
  return (
    r.activo === true &&
    typeof r.urlReferido === "string" &&
    r.urlReferido.trim().length > 0 &&
    typeof r.terminosVerificadosEl === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(r.terminosVerificadosEl)
  );
}

export function recomendacionesActivas(): RecomendacionFintech[] {
  return FINTECH.filter(esElegible);
}
