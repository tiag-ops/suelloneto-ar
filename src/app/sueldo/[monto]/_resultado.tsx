"use client";

// Calculadora precargada con el monto de la URL (serie programática /sueldo/[monto]).
// Mismo motor que la calculadora madre (@/lib/ganancias) — nada hardcodeado.
import { useMemo, useState } from "react";
import { calcularSueldo } from "@/lib/ganancias";
import { formatARS } from "@/lib/format";
import type { DesgloseSueldo } from "@/lib/types";

function parseMonto(s: string): number {
  return Number(s.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", ".")) || 0;
}

export default function ResultadoSueldo({ montoInicial }: { montoInicial: number }) {
  const [bruto, setBruto] = useState(String(montoInicial));
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");
  const [hijosDisc, setHijosDisc] = useState("0");

  const resultado: DesgloseSueldo = useMemo(
    () =>
      calcularSueldo({
        sueldoBruto: parseMonto(bruto),
        conyuge,
        hijos: Number(hijos) || 0,
        hijosDiscapacidad: Number(hijosDisc) || 0,
      }),
    [bruto, conyuge, hijos, hijosDisc],
  );

  return (
    <section className="space-y-4" aria-label="Calculadora de sueldo neto">
      <form
        className="grid gap-4 sm:grid-cols-2 bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900 rounded-xl p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="sm:col-span-2">
          <label htmlFor="bruto-programatico" className="block text-sm font-medium mb-1">
            💵 Sueldo bruto mensual ($) — editá el valor y recalcula al instante
          </label>
          <input
            id="bruto-programatico"
            inputMode="numeric"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={conyuge}
            onChange={(e) => setConyuge(e.target.checked)}
            className="h-4 w-4 accent-emerald-600"
          />
          Casado/a (cónyuge a cargo)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="hijos-programatico" className="block text-[13px] font-medium mb-1">
              Hijos
            </label>
            <input
              id="hijos-programatico"
              type="number"
              min={0}
              max={15}
              value={hijos}
              onChange={(e) => setHijos(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="hijos-disc-programatico" className="block text-[13px] font-medium mb-1">
              Con discapacidad
            </label>
            <input
              id="hijos-disc-programatico"
              type="number"
              min={0}
              max={15}
              value={hijosDisc}
              onChange={(e) => setHijosDisc(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
            />
          </div>
        </div>
      </form>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-3">
        <h2 className="font-semibold">Desglose mensual</h2>
        <dl className="text-sm divide-y divide-neutral-100 dark:divide-neutral-800">
          <Row label="Sueldo bruto" value={resultado.bruto} />
          <Row label="− Aporte jubilación (11%)" value={-resultado.aporteJubilacion} />
          <Row label="− Obra social (3%)" value={-resultado.obraSocial} />
          <Row label="− PAMI (3%)" value={-resultado.pami} />
          <Row label="= Neto antes de Ganancias" value={resultado.netoPreGanancias} strong />
          {resultado.alcanzaGanancias ? (
            <Row label="− Impuesto a las Ganancias (prom. mensual)" value={-resultado.impuestoGananciasMensual} />
          ) : (
            <p className="text-base rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-2">
              ✅ No alcanzado por el Impuesto a las Ganancias
            </p>
          )}
        </dl>
        <div className="flex items-baseline justify-between border-t border-neutral-200 dark:border-neutral-800 pt-3">
          <span className="font-semibold">Tu sueldo neto</span>
          <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {formatARS(resultado.neto)}
          </span>
        </div>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Valores vigentes desde {resultado.vigenciaDesde} ·{" "}
          <a
            href={resultado.urlFuente}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-700"
          >
            Fuente: ARCA
          </a>
        </p>
      </div>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={`flex justify-between py-1.5 ${strong ? "font-semibold" : ""}`}>
      <dt className={value < 0 ? "text-neutral-600 dark:text-neutral-400" : ""}>{label}</dt>
      <dd className={value < 0 ? "text-neutral-600 dark:text-neutral-400" : ""}>{formatARS(value)}</dd>
    </div>
  );
}
