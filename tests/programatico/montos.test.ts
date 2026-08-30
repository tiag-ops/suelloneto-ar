import { describe, expect, it } from "vitest";
import montosRaw from "@/data/programatico/montos-sueldo.json";

interface MontoEntry {
  monto: number;
  banda: string;
  orden: number;
}

const montos = montosRaw as MontoEntry[];

describe("dataset programático de montos", () => {
  it("tiene al menos 500 entradas", () => {
    expect(montos.length).toBeGreaterThanOrEqual(500);
  });

  it("montos únicos y ordenados ascendente", () => {
    const valores = montos.map((m) => m.monto);
    const unicos = new Set(valores);
    expect(unicos.size).toBe(valores.length);
    for (let i = 1; i < valores.length; i++) {
      expect(valores[i]).toBeGreaterThan(valores[i - 1]);
    }
  });

  it("rango cubre 150.000 a 10.000.000 ARS", () => {
    expect(montos[0].monto).toBe(150_000);
    expect(montos[montos.length - 1].monto).toBe(10_000_000);
  });

  it("densidad en la zona de sueldos reales (200k–1.5M = ~50%)", () => {
    const calientes = montos.filter((m) => m.monto >= 200_000 && m.monto <= 1_500_000);
    expect(calientes.length).toBeGreaterThan(200);
    expect(calientes.length / montos.length).toBeGreaterThan(0.4);
  });

  it("pasos finos en la zona caliente (≤10.000)", () => {
    for (let i = 1; i < montos.length; i++) {
      const a = montos[i - 1].monto;
      const b = montos[i].monto;
      if (a >= 200_000 && b <= 1_500_000) {
        expect(b - a).toBeLessThanOrEqual(10_000);
      }
    }
  });

  it("cada entrada tiene banda correcta y orden secuencial", () => {
    montos.forEach((m, i) => {
      expect(m.banda).toBe(m.monto < 500_000 ? "baja" : m.monto < 1_500_000 ? "media" : "alta");
      expect(m.orden).toBe(i);
    });
  });

  it("tanda 1: los primeros 100 montos son publicables (150k–700k, zona de búsqueda real)", () => {
    const tanda1 = montos.slice(0, 100);
    expect(tanda1[0].monto).toBe(150_000);
    expect(tanda1[tanda1.length - 1].monto).toBeLessThanOrEqual(700_000);
  });
});
