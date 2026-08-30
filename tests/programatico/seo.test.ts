import { describe, expect, it } from "vitest";
import { calcularSueldo } from "@/lib/ganancias";
import { PUBLICADAS } from "@/lib/programatico/montos";
import {
  tituloDe,
  h1De,
  descripcionDe,
  parrafoIntro,
  type ContextoVariante,
} from "@/lib/programatico/variantes";

function contextoDe(monto: number): ContextoVariante {
  const desglose = calcularSueldo({ sueldoBruto: monto, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
  return { monto, desglose, vecinos: [] };
}

describe("helpers SEO de la serie /sueldo/[monto]", () => {
  it("título y H1 contienen el monto formateado", () => {
    const t = tituloDe(350_000);
    const h = h1De(350_000);
    expect(t).toContain("350.000");
    expect(t).toMatch(/SueldoNeto\.ar$/);
    expect(h).toContain("350.000");
    expect(h.startsWith("Sueldo neto de")).toBe(true);
  });

  it("la descripción cita el neto exacto de la calculadora (no hardcoded)", () => {
    for (const monto of [150_000, 350_000, 645_000]) {
      const ctx = contextoDe(monto);
      const netoStr = ctx.desglose.neto.toLocaleString("es-AR");
      expect(descripcionDe(ctx)).toContain(netoStr);
    }
  });

  it("el párrafo intro embedde el neto calculado por la lib (Task 1.1 Step 1)", () => {
    for (const entry of PUBLICADAS.slice(0, 5)) {
      const ctx = contextoDe(entry.monto);
      const netoStr = ctx.desglose.neto.toLocaleString("es-AR");
      expect(parrafoIntro(ctx)).toContain(netoStr);
    }
  });
});
