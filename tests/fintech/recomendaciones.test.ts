import { describe, expect, it } from "vitest";
import { FINTECH, esElegible, recomendacionesActivas, type RecomendacionFintech } from "@/lib/programatico/fintech";

describe("fintech.json y recomendaciones con disclosure (FASE 2)", () => {
  it("toda entrada tiene el schema completo", () => {
    for (const r of FINTECH) {
      expect(r.slug).toMatch(/^[a-z-]+$/);
      expect(r.nombre.length).toBeGreaterThan(0);
      expect(["broker", "wallet", "banco"]).toContain(r.tipo);
      expect(r.producto.length).toBeGreaterThan(0);
      expect(typeof r.activo).toBe("boolean");
    }
  });

  it("estado vacío: ninguna entrada sin verificar ToS es elegible (no renderiza nada)", () => {
    for (const r of FINTECH) {
      if (!r.terminosVerificadosEl || !r.urlReferido || !r.activo) {
        expect(esElegible(r)).toBe(false);
      }
    }
    expect(recomendacionesActivas().length).toBe(0);
  });

  it("elegibilidad exige ToS verificados con fecha ISO + link + activo", () => {
    const base: RecomendacionFintech = {
      slug: "test",
      nombre: "Test",
      tipo: "broker",
      producto: "test",
      urlReferido: "https://example.com/ref",
      comisionConocida: "",
      terminosVerificadosEl: "2026-08-30",
      activo: true,
    };
    expect(esElegible(base)).toBe(true);
    expect(esElegible({ ...base, activo: false })).toBe(false);
    expect(esElegible({ ...base, urlReferido: "" })).toBe(false);
    expect(esElegible({ ...base, terminosVerificadosEl: null })).toBe(false);
    expect(esElegible({ ...base, terminosVerificadosEl: "agosto 2026" })).toBe(false);
  });
});
