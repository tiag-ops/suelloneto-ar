import { describe, expect, it } from "vitest";
import {
  calcularAguinaldo,
  calcularHorasExtras,
  diasHabiles,
  diasVacaciones,
  descomponerSueldo,
  indemnizacionDespido,
  pagoVacaciones,
  valorHora,
  vacacionesNoGozadas,
  proximoFeriado,
} from "@/lib/laboral";

describe("aguinaldo (SAC, art. 121 LCT)", () => {
  it("6 meses trabajados = 50% del mejor sueldo completo", () => {
    expect(calcularAguinaldo(1_000_000, 6).sac).toBeCloseTo(500_000, 2);
  });

  it("3 meses = 25% del mejor sueldo", () => {
    expect(calcularAguinaldo(1_000_000, 3).sac).toBeCloseTo(250_000, 2);
  });

  it("más de 6 meses se limita al semestre", () => {
    expect(calcularAguinaldo(1_000_000, 9).sac).toBeCloseTo(500_000, 2);
  });

  it("datos en 0 → SAC 0", () => {
    expect(calcularAguinaldo(0, 6).sac).toBe(0);
    expect(calcularAguinaldo(1_000_000, 0).sac).toBe(0);
  });
});

describe("vacaciones (art. 150 LCT)", () => {
  it("escalas por antigüedad: 14/21/28/30 días", () => {
    expect(diasVacaciones(0)).toBe(14);
    expect(diasVacaciones(5)).toBe(14);
    expect(diasVacaciones(6)).toBe(21);
    expect(diasVacaciones(10)).toBe(21);
    expect(diasVacaciones(11)).toBe(28);
    expect(diasVacaciones(20)).toBe(28);
    expect(diasVacaciones(21)).toBe(30);
  });

  it("pago = mensual/25 × días corridos", () => {
    // 2.500.000/25 = 100.000 por día × 14 días
    expect(pagoVacaciones(2_500_000, 14)).toBeCloseTo(1_400_000, 2);
  });

  it("vacaciones no gozadas: proporcional 1/12 por mes", () => {
    const r = vacacionesNoGozadas(2_500_000, 3, 6);
    expect(r.diasProporcionales).toBeCloseTo(7, 2); // 14/12*6
    expect(r.pago).toBeCloseTo(700_000, 2); // 100.000 × 7
  });
});

describe("horas extras (art. 201 LCT)", () => {
  it("valor hora = mensual/200", () => {
    expect(valorHora(2_000_000)).toBeCloseTo(10_000, 2);
  });

  it("extras al 50% y 100%", () => {
    const r = calcularHorasExtras(2_000_000, 10, 5);
    expect(r.pago50).toBeCloseTo(150_000, 2); // 10.000*1.5*10
    expect(r.pago100).toBeCloseTo(100_000, 2); // 10.000*2*5
    expect(r.total).toBeCloseTo(250_000, 2);
  });

  it("descomposición día/hora", () => {
    const d = descomponerSueldo(2_500_000);
    expect(d.porDia).toBeCloseTo(100_000, 2);
    expect(d.porHora).toBeCloseTo(12_500, 2);
  });
});

describe("días hábiles", () => {
  const feriados = new Set(["2026-08-17"]); // feriado nacional AR

  it("semana completa lunes a viernes = 5", () => {
    // 2026-08-10 es lunes (verificado con getUTCDay)
    const n = diasHabiles("2026-08-10", "2026-08-14", new Set());
    expect(n).toBe(5);
  });

  it("descuenta feriado", () => {
    // semana 10-14/08/2026 con feriado el miércoles 12 → 4 hábiles
    const n = diasHabiles("2026-08-10", "2026-08-14", new Set(["2026-08-12"]));
    expect(n).toBe(4);
  });

  it("descuenta fines de semana (rango que los incluye)", () => {
    // lunes 10 a lunes 17 = 8 días → 6 hábiles
    expect(diasHabiles("2026-08-10", "2026-08-17", new Set())).toBe(6);
  });

  it("rango de un solo día hábil", () => {
    expect(diasHabiles("2026-08-11", "2026-08-11", new Set())).toBe(1);
  });

  it("rango invertido → 0", () => {
    expect(diasHabiles("2026-08-14", "2026-08-10", new Set())).toBe(0);
  });
});

describe("próximo feriado", () => {
  const feriados = [
    { fecha: "2026-10-12", nombre: "Día del Respeto a la Diversidad Cultural" },
    { fecha: "2026-11-23", nombre: "Día de la Soberanía Nacional" },
    { fecha: "2026-12-25", nombre: "Navidad" },
  ];

  it("encuentra el próximo feriado futuro con días restantes", () => {
    const r = proximoFeriado(new Date("2026-09-01T12:00:00Z"), feriados);
    expect(r?.fecha).toBe("2026-10-12");
    expect(r?.diasRestantes).toBe(41);
  });

  it("sin feriados futuros → null", () => {
    expect(proximoFeriado(new Date("2026-12-26"), feriados)).toBeNull();
  });
});

describe("indemnización por despido (art. 245 LCT)", () => {
  it("4 años exactos: 4 sueldos + SAC proporcional", () => {
    const r = indemnizacionDespido(2_000_000, 4, 4);
    expect(r.base).toBeCloseTo(8_000_000, 2);
    expect(r.sacProporcional).toBeCloseTo(2_000_000 * 4 / 12, 2);
    expect(r.total).toBeCloseTo(8_666_666.67, 1);
  });

  it("fracción mayor a 3 meses cuenta como año (4 años y 4 meses → 5)", () => {
    const r = indemnizacionDespido(2_000_000, 4 + 4 / 12, 0);
    expect(r.aniosReconocidos).toBe(5);
  });

  it("fracción menor a 3 meses no cuenta (4 años y 2 meses → 4)", () => {
    const r = indemnizacionDespido(2_000_000, 4 + 2 / 12, 0);
    expect(r.aniosReconocidos).toBe(4);
  });
});
