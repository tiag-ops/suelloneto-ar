import { describe, expect, it } from "vitest";
import { calcularSueldo } from "@/lib/ganancias";
import { MONTOS, PUBLICADAS, montosVecinos, type MontoEntry } from "@/lib/programatico/montos";
import {
  faqItems,
  oracionesDePagina,
  parrafoGanancias,
  type ContextoVariante,
} from "@/lib/programatico/variantes";

function contextoDe(entry: MontoEntry): ContextoVariante {
  const desglose = calcularSueldo({
    sueldoBruto: entry.monto,
    conyuge: false,
    hijos: 0,
    hijosDiscapacidad: 0,
  });
  return {
    monto: entry.monto,
    desglose,
    vecinos: montosVecinos(entry.monto, 3).map((v) => ({
      monto: v.monto,
      neto: calcularSueldo({ sueldoBruto: v.monto, conyuge: false, hijos: 0, hijosDiscapacidad: 0 }).neto,
    })),
  };
}

function contarRepeticiones(paginas: ContextoVariante[]): Map<string, number> {
  const contador = new Map<string, number>();
  for (const c of paginas) {
    for (const oracion of oracionesDePagina(c)) {
      contador.set(oracion, (contador.get(oracion) ?? 0) + 1);
    }
  }
  return contador;
}

describe("compositor de variantes anti-duplicación", () => {
  it("20 páginas consecutivas no comparten NI UNA oración textual", () => {
    const veinte = PUBLICADAS.slice(0, 20).map(contextoDe);
    const repes = contarRepeticiones(veinte);
    const duplicadas = [...repes.entries()].filter(([, n]) => n > 1);
    expect(duplicadas).toEqual([]);
  });

  it("las 100 páginas de la tanda 1 son textualmente únicas oración por oración", () => {
    const tanda = PUBLICADAS.map(contextoDe);
    const repes = contarRepeticiones(tanda);
    const duplicadas = [...repes.entries()].filter(([, n]) => n > 1);
    expect(duplicadas).toEqual([]);
  });

  it("todas las oraciones interpolan al menos un valor calculado (anti plantilla)", () => {
    const muestras = [MONTOS[0], MONTOS[50], MONTOS[250], MONTOS[MONTOS.length - 1]].map(contextoDe);
    for (const c of muestras) {
      for (const oracion of oracionesDePagina(c)) {
        expect(oracion).toMatch(/\d/);
      }
    }
  });

  it("es determinista: mismo monto → mismo texto (build SSG reproducible)", () => {
    const entry = PUBLICADAS[10];
    const a = oracionesDePagina(contextoDe(entry));
    const b = oracionesDePagina(contextoDe(entry));
    expect(a).toEqual(b);
  });

  it("FAQ: 5 preguntas, y variantes distintas entre páginas vecinas", () => {
    const [a, b] = PUBLICADAS.slice(0, 2).map(contextoDe);
    const faqA = faqItems(a);
    const faqB = faqItems(b);
    expect(faqA).toHaveLength(5);
    for (let i = 0; i < 5; i++) {
      expect(faqA[i].pregunta).not.toBe(faqB[i].pregunta);
      expect(faqA[i].respuesta).not.toBe(faqB[i].respuesta);
    }
  });

  it("parrafoGanancias refleja si alcanza o no el mínimo imponible", () => {
    const bajo = contextoDe(PUBLICADAS[0]); // 150.000: no alcanza
    if (!bajo.desglose.alcanzaGanancias) {
      expect(parrafoGanancias(bajo)).toMatch(/no lleg|No corresponde|no te alcanza|debajo del umbral|no sufren/i);
    }
    const altoEntry = MONTOS.find((m) => {
      const d = contextoDe(m).desglose;
      return d.alcanzaGanancias && d.impuestoGananciasMensual > 0;
    });
    if (altoEntry) {
      const alto = contextoDe(altoEntry);
      expect(parrafoGanancias(alto)).toMatch(/Ganancias/);
      expect(parrafoGanancias(alto)).toMatch(/\d/);
    }
  });

  it("cada página compone >300 palabras de contenido único", () => {
    for (const entry of PUBLICADAS.slice(0, 10)) {
      const texto = oracionesDePagina(contextoDe(entry)).join(" ");
      const palabras = texto.trim().split(/\s+/).length;
      expect(palabras).toBeGreaterThan(300);
    }
  });
});
