// Contrato compartido entre datos (src/data) y UI. NO cambiar sin actualizar tests.
export interface EscalaTramo {
  /** Mínimo de ganancia neta imponible ANUAL (inclusive) */
  desde: number;
  /** Máximo ANUAL (inclusive). null = sin techo (último tramo) */
  hasta: number | null;
  /** Impuesto fijo acumulado ANUAL del tramo anterior */
  fijo: number;
  /** Alícuota % sobre el excedente de "desde" */
  porcentaje: number;
}

export interface DeduccionesGanancias {
  gananciaNoImponible: number;
  conyuge: number;
  hijo: number;
  hijoDiscapacidad: number;
  /** Deducción especial art. 30 c) ap. 2 — empleados en relación de dependencia */
  especialEmpleados: number;
}

export interface DatosGanancias {
  vigenciaDesde: string; // YYYY-MM-DD
  vigenciaHasta: string; // YYYY-MM-DD
  fuente: string;
  urlFuente: string;
  actualizadoEl: string; // YYYY-MM-DD
  /** Factor del método doceava (13/12 = 1.08333...) — RG 4003 art. 7 inc. b */
  factorDoceava?: number;
  deduccionesAnuales: DeduccionesGanancias;
  /** Escala art. 94 ANUAL del semestre (los tramos mensuales son escala/12) */
  escalaAnual: EscalaTramo[];
}

export interface CategoriaMonotributo {
  categoria: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";
  /** Tope anual de ingresos brutos (inclusive) */
  topeIngresosAnual: number;
  cuotaServicios: number;
  cuotaBienes: number;
  impuestoIntegradoServicios: number;
  impuestoIntegradoBienes: number;
  aporteSIPA: number;
  aporteObraSocial: number;
}

export interface DatosMonotributo {
  vigenciaDesde: string;
  fuente: string;
  urlFuente: string;
  actualizadoEl: string;
  categorias: CategoriaMonotributo[];
}

export interface EntradaSueldo {
  sueldoBruto: number;
  conyuge: boolean;
  hijos: number;
  hijosDiscapacidad: number;
}

export interface DesgloseSueldo {
  bruto: number;
  aporteJubilacion: number; // 11%
  obraSocial: number; // 3%
  pami: number; // 3%
  totalAportes: number;
  netoPreGanancias: number;
  /** Deducciones anuales (GNI + especial + cargas) */
  deduccionesAnuales: number;
  /** Factor doceava (13/12) usado en el método de retención RG 4003 */
  factorDoceava: number;
  /** GNI acumulada proyectada a diciembre (base de la escala anual) */
  gniAcumuladaDiciembre: number;
  /** Impuesto Ganancias del período (escala acumulada de diciembre) */
  impuestoGananciasAnual: number;
  /** Promedio mensual del impuesto del período */
  impuestoGananciasMensual: number;
  alcanzaGanancias: boolean;
  neto: number;
  vigenciaDesde: string;
  fuente: string;
  urlFuente: string;
}

export interface ResultadoMonotributo {
  categoria: CategoriaMonotributo["categoria"];
  topeIngresosAnual: number;
  cuotaMensual: number;
  desglose: { impuestoIntegrado: number; aporteSIPA: number; aporteObraSocial: number };
  /** true si la facturación proyectada supera el tope de la cat. K */
  excedido: boolean;
}

export const APORTES = { jubilacion: 0.11, obraSocial: 0.03, pami: 0.03 } as const;
