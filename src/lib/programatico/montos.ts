import montosRaw from "@/data/programatico/montos-sueldo.json";

export type Banda = "baja" | "media" | "alta";
export type EstadoTanda = "publicada" | "borrador";

export interface MontoEntry {
  monto: number;
  banda: Banda;
  orden: number;
  estado: EstadoTanda;
}

export const MONTOS: MontoEntry[] = (montosRaw as MontoEntry[]).slice().sort((a, b) => a.orden - b.orden);

/** Solo las páginas habilitadas para publicar (tandas de 100 — Task 1.3). */
export const PUBLICADAS: MontoEntry[] = MONTOS.filter((m) => m.estado === "publicada");

export function esPublicada(monto: number): boolean {
  return PUBLICADAS.some((m) => m.monto === monto);
}

export function entradaDe(monto: number): MontoEntry | undefined {
  return MONTOS.find((m) => m.monto === monto);
}

export function bandaDe(monto: number): Banda {
  return monto < 500_000 ? "baja" : monto < 1_500_000 ? "media" : "alta";
}

/**
 * Los n montos canónicos más cercanos al dado (para la tabla comparativa).
 * Si el monto no está en el dataset, se posiciona por inserción.
 */
export function montosVecinos(monto: number, n = 3): MontoEntry[] {
  let i = 0;
  while (i < MONTOS.length && MONTOS[i].monto < monto) i++;
  const candidatos: MontoEntry[] = [
    ...MONTOS.slice(Math.max(0, i - n), i),
    ...MONTOS.slice(i, i + n),
  ];
  return candidatos
    .filter((m) => m.monto !== monto)
    .sort((a, b) => Math.abs(a.monto - monto) - Math.abs(b.monto - monto))
    .slice(0, n)
    .sort((a, b) => a.monto - b.monto);
}

/**
 * Página anterior y siguiente del clúster — solo entre PUBLICADAS,
 * para que ningún link interno apunte a una URL inexistente.
 */
export function enlacesVecinos(monto: number): { anterior?: number; siguiente?: number } {
  const idx = PUBLICADAS.findIndex((m) => m.monto === monto);
  if (idx === -1) return {};
  return {
    anterior: idx > 0 ? PUBLICADAS[idx - 1].monto : undefined,
    siguiente: idx < PUBLICADAS.length - 1 ? PUBLICADAS[idx + 1].monto : undefined,
  };
}
