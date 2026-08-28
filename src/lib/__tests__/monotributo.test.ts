import { describe, expect, it } from "vitest";
import { calcularCategoria, datosMonotributo } from "@/lib/monotributo";

describe("calcularCategoria — servicios", () => {
  it("10M anuales → categoría A (tope 12.009.410,45)", () => {
    const r = calcularCategoria(10_000_000, "servicios");
    expect(r.categoria).toBe("A");
    expect(r.excedido).toBe(false);
    expect(r.cuotaMensual).toBeCloseTo(49_527.18, 2);
    expect(r.desglose.aporteSIPA).toBeCloseTo(18_246.86, 2);
  });

  it("exactamente el tope de A → A (límite inclusive)", () => {
    expect(calcularCategoria(12_009_410.45, "servicios").categoria).toBe("A");
  });

  it("un peso más que el tope de A → B", () => {
    expect(calcularCategoria(12_009_410.46, "servicios").categoria).toBe("B");
  });

  it("30M anuales → D con cuota servicios $84.612,93", () => {
    const r = calcularCategoria(30_000_000, "servicios");
    expect(r.categoria).toBe("D");
    expect(r.cuotaMensual).toBeCloseTo(84_612.93, 2);
    expect(r.desglose.impuestoIntegrado).toBeCloseTo(29_790.79, 2);
  });
});

describe("calcularCategoria — bienes", () => {
  it("24M anuales → C con cuota de bienes $64.530,58 (tope C = 24.670.494,31)", () => {
    const r = calcularCategoria(24_000_000, "bienes");
    expect(r.categoria).toBe("C");
    expect(r.cuotaMensual).toBeCloseTo(64_530.58, 2);
    expect(r.desglose.impuestoIntegrado).toBeCloseTo(16_757.32, 2);
  });

  it("25M anuales → D (supera tope C de 24,67M)", () => {
    expect(calcularCategoria(25_000_000, "bienes").categoria).toBe("D");
  });
});

describe("calcularCategoria — excedidos", () => {
  it("200M anuales → excedido=true (supera K)", () => {
    const r = calcularCategoria(200_000_000, "servicios");
    expect(r.excedido).toBe(true);
    expect(r.categoria).toBe("K");
  });

  it("exactamente tope K → K, no excedido", () => {
    const r = calcularCategoria(126_610_838.75, "servicios");
    expect(r.categoria).toBe("K");
    expect(r.excedido).toBe(false);
  });
});

describe("datosMonotributo", () => {
  it("expone las 11 categorías con vigencia 01/08/2026", () => {
    const d = datosMonotributo();
    expect(d.categorias).toHaveLength(11);
    expect(d.categorias.map((c) => c.categoria)).toEqual([
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
    ]);
    expect(d.vigenciaDesde).toBe("2026-09-01"); // actualizado por el vigilante ARCA (cuota K ,02→,04)
  });
});
