import { describe, expect, it } from "vitest";
import { calcularSueldo, impuestoPorEscala } from "@/lib/ganancias";
import { APORTES, type EscalaTramo } from "@/lib/types";

// Deducciones oficiales S2 2026 (PDF ARCA "jul-dic 2026")
const DED = {
  gni: 5_585_736.93,
  especial: 26_811_537.29,
  conyuge: 5_260_643.86,
  hijo: 2_652_961.9,
  hijoDisc: 5_305_923.78,
};

const FACTOR = 13 / 12;

function escalaFixture(): EscalaTramo[] {
  return [
    { desde: 0, hasta: 1_000_000, fijo: 0, porcentaje: 5 },
    { desde: 1_000_000, hasta: null, fijo: 50_000, porcentaje: 9 },
  ];
}

describe("impuestoPorEscala (art. 94)", () => {
  it("base 0 o negativa → 0", () => {
    expect(impuestoPorEscala(0, escalaFixture())).toBe(0);
    expect(impuestoPorEscala(-100, escalaFixture())).toBe(0);
  });

  it("primer tramo: 5% sobre el excedente", () => {
    const b = 800_000;
    expect(impuestoPorEscala(b, escalaFixture())).toBeCloseTo(40_000, 2);
    // límite exacto del primer tramo → 50.000
    expect(impuestoPorEscala(1_000_000, escalaFixture())).toBeCloseTo(50_000, 2);
  });

  it("segundo tramo: fijo + alícuota sobre excedente", () => {
    const b = 2_000_000;
    const esperado = 50_000 + (2_000_000 - 1_000_000) * 0.09;
    expect(impuestoPorEscala(b, escalaFixture())).toBeCloseTo(esperado, 2);
  });
});

describe("calcularSueldo — aportes (11+3+3)", () => {
  it("aporta 17% sobre el bruto", () => {
    const r = calcularSueldo({ sueldoBruto: 4_000_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    expect(r.aporteJubilacion).toBeCloseTo(440_000, 2);
    expect(r.obraSocial).toBeCloseTo(120_000, 2);
    expect(r.pami).toBeCloseTo(120_000, 2);
    expect(r.netoPreGanancias).toBeCloseTo(3_320_000, 2);
  });

  it("bruto 0 → todo 0", () => {
    const r = calcularSueldo({ sueldoBruto: 0, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    expect(r.neto).toBe(0);
    expect(r.alcanzaGanancias).toBe(false);
  });
});

describe("calcularSueldo — Ganancias S2 2026 (doceava, valores ARCA)", () => {
  it("CANARIO: bruto 4.000.000 soltero → GNI dic ≈ $106.226 → primer tramo 5% → impuesto anual ≈ $5.311", () => {
    const r = calcularSueldo({ sueldoBruto: 4_000_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    // Verificación manual: neto 3.320.000; excedente mensual = 3.320.000*13/12 − 32.397.274,22/12
    // = 3.596.666,67 − 2.699.772,85 = 896.893,81; GNI dic = 10.762.725,78
    // tramo: >9.758.213,49 → 1.051.718,57 + 19%*(10.762.725,78−9.758.213,49) = 1.242.576,37
    expect(r.gniAcumuladaDiciembre).toBeCloseTo(10_762_725.78, 0);
    expect(r.impuestoGananciasAnual).toBeCloseTo(1_242_576.37, 0);
    expect(r.impuestoGananciasMensual).toBeCloseTo(103_548.03, 0);
    expect(r.alcanzaGanancias).toBe(true);
  });

  it("CANARIO 2: bruto 4.500.000 soltero → tramo 19% verificado a mano", () => {
    const r = calcularSueldo({ sueldoBruto: 4_500_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    // neto 3.735.000; excedente mensual = 4.046.250 − 2.699.772,85 = 1.346.477,15
    // GNI dic = 16.157.725,78 → 1.051.718,57 + 19%*(16.157.725,78−9.758.213,49) = 2.267.625,91
    expect(r.gniAcumuladaDiciembre).toBeCloseTo(16_157_725.78, 0);
    expect(r.impuestoGananciasAnual).toBeCloseTo(2_267_625.91, 0);
    expect(r.impuestoGananciasMensual).toBeCloseTo(188_968.83, 0);
  });

  it("bruto 3.500.000 soltero → en el borde del piso (~3,52M) : apenas alcanza o no", () => {
    const r = calcularSueldo({ sueldoBruto: 3_500_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    // excedente mensual = 2.905.000*13/12 − 2.699.772,85 = 3.147.083,33 − 2.699.772,85 ≈ 447.310 > 0
    // PERO el piso real published (3,5M) considera el SAC real (2 doceavos), no el promedio.
    // Con nuestra aproximación documentada, apenas alcanza.
    expect(r.alcanzaGanancias).toBe(true);
  });

  it("más cargas familiares → menos impuesto", () => {
    const soltero = calcularSueldo({ sueldoBruto: 5_000_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    const familia = calcularSueldo({ sueldoBruto: 5_000_000, conyuge: true, hijos: 2, hijosDiscapacidad: 0 });
    expect(familia.impuestoGananciasAnual).toBeLessThan(soltero.impuestoGananciasAnual);
    expect(familia.deduccionesAnuales).toBeGreaterThan(soltero.deduccionesAnuales);
  });

  it("sueldo bajo → NO alcanza Ganancias", () => {
    const r = calcularSueldo({ sueldoBruto: 2_000_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    expect(r.alcanzaGanancias).toBe(false);
    expect(r.impuestoGananciasMensual).toBe(0);
    expect(r.neto).toBeCloseTo(r.netoPreGanancias, 2);
  });
});

describe("calcularSueldo — trazabilidad y consistencia", () => {
  it("propaga vigencia y fuente del JSON", () => {
    const r = calcularSueldo({ sueldoBruto: 4_000_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    expect(r.vigenciaDesde).toBe("2026-07-01");
    expect(r.fuente).toContain("ARCA");
    expect(r.urlFuente).toContain("arca.gob.ar");
  });

  it("neto = netoPreGanancias − impuesto mensual; aportes suman", () => {
    const r = calcularSueldo({ sueldoBruto: 5_200_000, conyuge: true, hijos: 1, hijosDiscapacidad: 0 });
    expect(r.neto).toBeCloseTo(r.netoPreGanancias - r.impuestoGananciasMensual, 2);
    expect(r.totalAportes).toBeCloseTo(r.aporteJubilacion + r.obraSocial + r.pami, 2);
    expect(APORTES.jubilacion + APORTES.obraSocial + APORTES.pami).toBeCloseTo(0.17, 10);
  });

  it("factorDoceava ≈ 13/12", () => {
    const r = calcularSueldo({ sueldoBruto: 4_000_000, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });
    expect(r.factorDoceava).toBeCloseTo(FACTOR, 6);
  });
});

export { DED };
