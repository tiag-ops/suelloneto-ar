import { describe, expect, it } from "vitest";
import {
  brechaCambiaria,
  calcularCredito,
  calcularCuil,
  calcularPlazoFijo,
  calcularPlazoFijoDias,
  dolarTarjeta,
  poderDeCompra,
  verificarCuil,
} from "@/lib/finanzas";

describe("plazo fijo mensual", () => {
  it("sin renovación: interés simple P×TNA×meses/12", () => {
    const r = calcularPlazoFijo(1_000_000, 40, 12, false);
    expect(r.interes).toBeCloseTo(400_000, 2);
    expect(r.montoFinal).toBeCloseTo(1_400_000, 2);
  });

  it("con renovación mensual: interés compuesto", () => {
    const r = calcularPlazoFijo(1_000_000, 40, 12, true);
    // 1.000.000 × (1+0,40/12)^12 = 1.000.000 × 1,48216...
    expect(r.montoFinal).toBeCloseTo(1_000_000 * Math.pow(1 + 0.4 / 12, 12), 2);
    expect(r.montoFinal).toBeGreaterThan(1_400_000); // compuesto > simple
  });

  it("TEA de TNA 40% ≈ 48,2%", () => {
    const r = calcularPlazoFijo(1_000_000, 40, 1, false);
    expect(r.tea).toBeCloseTo((Math.pow(1 + 0.4 / 12, 12) - 1) * 100, 4);
  });
});

describe("plazo fijo por días", () => {
  it("30 días a 40% TNA sobre 1M: 1M × 0,40 × 30/365", () => {
    const r = calcularPlazoFijoDias(1_000_000, 40, 30);
    expect(r.interes).toBeCloseTo(1_000_000 * 0.4 * (30 / 365), 2);
  });

  it("30 días a 40% = TEA ~44,6% (compuesto anualizado)", () => {
    const r = calcularPlazoFijoDias(1_000_000, 40, 30);
    expect(r.tea).toBeGreaterThan(40);
    expect(r.tea).toBeLessThan(50);
  });
});

describe("crédito sistema francés", () => {
  it("cuota conocida: 1M a 60% TNA a 12 meses", () => {
    const r = calcularCredito(1_000_000, 60, 12);
    const i = 0.6 / 12;
    const esperado = (1_000_000 * i) / (1 - Math.pow(1 + i, -12));
    expect(r.cuotaMensual).toBeCloseTo(esperado, 2);
    expect(r.totalInteres).toBeCloseTo(r.cuotaMensual * 12 - 1_000_000, 2);
    expect(r.totalPagado).toBeCloseTo(r.cuotaMensual * 12, 2);
  });

  it("0% interés: cuota = monto/meses", () => {
    const r = calcularCredito(1_200_000, 0, 12);
    expect(r.cuotaMensual).toBeCloseTo(100_000, 2);
    expect(r.totalInteres).toBe(0);
  });
});

describe("CUIL/CUIT", () => {
  it("ejemplo documentado del algoritmo: 20-12345678-6", () => {
    // Ejemplo paso a paso del algoritmo AFIP (suma 148, resto 5, dv 6)
    expect(calcularCuil(12345678, false)).toBe("20-12345678-6");
    expect(verificarCuil("20-12345678-6")).toBe(true);
  });

  it("regla especial resto=1 → prefijo 23 con dv 9 (masc)", () => {
    // DNI 10000005 da resto=1 con prefijo 20 (verificado con node)
    const c = calcularCuil(10_000_005, false);
    expect(c.startsWith("23-")).toBe(true);
    expect(c.endsWith("-9")).toBe(true);
    expect(verificarCuil(c)).toBe(true);
  });

  it("CUILs generados siempre pasan el verificador", () => {
    for (const [dni, mujer] of [
      [30584815, false],
      [26835100, true],
      [12345678, false],
      [40123456, true],
      [9123456, false],
    ] as [number, boolean][]) {
      expect(verificarCuil(calcularCuil(dni, mujer))).toBe(true);
    }
  });

  it("CUIL malo → false", () => {
    expect(verificarCuil("20-30584815-7")).toBe(false);
    expect(verificarCuil("99-12345678-9")).toBe(false);
    expect(verificarCuil("hola")).toBe(false);
  });

  it("prefijos correctos", () => {
    expect(calcularCuil(10_000_005, false).startsWith("23-")).toBe(true); // caso especial resto=1
    expect(calcularCuil(26835100, true).startsWith("27-")).toBe(true);
  });
});

describe("dólar y brecha", () => {
  it("brecha: paralelo 1500, oficial 1200 → 25%", () => {
    expect(brechaCambiaria(1200, 1500)).toBeCloseTo(25, 4);
  });

  it("dólar tarjeta con 30% + 45% = 75% sobre oficial", () => {
    const r = dolarTarjeta(1200, [30, 45]);
    expect(r.percepcionesAplicadas).toBe(75);
    expect(r.dolarTarjeta).toBeCloseTo(2100, 4);
  });

  it("sin percepciones = oficial", () => {
    expect(dolarTarjeta(1200, []).dolarTarjeta).toBe(1200);
  });
});

describe("poder de compra / inflación", () => {
  it("100.000 hoy con 3% mensual en 12 meses necesito 142.576", () => {
    const r = poderDeCompra(100_000, 3, 12);
    expect(r.necesitare).toBeCloseTo(100_000 * Math.pow(1.03, 12), 2);
    expect(r.equivalenteHoy).toBeCloseTo(100_000 / Math.pow(1.03, 12), 2);
  });
});
