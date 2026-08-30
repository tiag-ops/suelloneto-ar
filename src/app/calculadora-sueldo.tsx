"use client";

// La calculadora de sueldo neto original, ahora como componente de la home.
import { useState } from "react";
import { calcularSueldo } from "@/lib/ganancias";
import { formatARS } from "@/lib/format";
import type { DesgloseSueldo, EntradaSueldo } from "@/lib/types";

export default function CalculadoraSueldoClient() {
  const [bruto, setBruto] = useState("");
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState("0");
  const [hijosDisc, setHijosDisc] = useState("0");
  const [resultado, setResultado] = useState<DesgloseSueldo | null>(null);

  function calcular(e: React.FormEvent) {
    e.preventDefault();
    const entrada: EntradaSueldo = {
      sueldoBruto: Number(bruto.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", ".")) || 0,
      conyuge,
      hijos: Number(hijos) || 0,
      hijosDiscapacidad: Number(hijosDisc) || 0,
    };
    setResultado(calcularSueldo(entrada));
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={calcular}
        className="grid gap-4 sm:grid-cols-2 bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900 rounded-xl p-5"
      >
        <div className="sm:col-span-2">
          <label htmlFor="bruto" className="block text-sm font-medium mb-1">
            💵 Sueldo bruto mensual ($) — con aportes e Impuesto a las Ganancias
          </label>
          <div className="flex gap-2">
            <input
              id="bruto"
              inputMode="numeric"
              required
              value={bruto}
              onChange={(e) => setBruto(e.target.value)}
              placeholder="Ej: 4500000"
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5"
            >
              Calcular
            </button>
          </div>
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
        <div className="sm:col-span-2 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="hijos" className="block text-[13px] font-medium mb-1">
              Hijos (sin discapacidad)
            </label>
            <input
              id="hijos"
              type="number"
              min={0}
              max={15}
              value={hijos}
              onChange={(e) => setHijos(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="hijosDisc" className="block text-[13px] font-medium mb-1">
              Hijos con discapacidad
            </label>
            <input
              id="hijosDisc"
              type="number"
              min={0}
              max={15}
              value={hijosDisc}
              onChange={(e) => setHijosDisc(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2"
            />
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Se suman aparte: ARCA permite deducir ambos por separado (la deducción por
              discapacidad es el doble).
            </p>
          </div>
        </div>
      </form>

      {resultado && (
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold">Desglose mensual</h2>
          <dl className="text-sm divide-y divide-neutral-100 dark:divide-neutral-800">
            <Row label="Sueldo bruto" value={resultado.bruto} />
            <Row label="− Aporte jubilación (11%)" value={-resultado.aporteJubilacion} />
            <Row label="− Obra social (3%)" value={-resultado.obraSocial} />
            <Row label="− PAMI (3%)" value={-resultado.pami} />
            <Row label="= Neto antes de Ganancias" value={resultado.netoPreGanancias} strong />
            {resultado.alcanzaGanancias ? (
              <>
                <Row
                  label="− Impuesto a las Ganancias (prom. mensual)"
                  value={-resultado.impuestoGananciasMensual}
                />
                <p className="text-sm text-neutral-600 dark:text-neutral-400 pt-2">
                  Ganancia neta imponible anual proyectada:{" "}
                  {formatARS(resultado.gniAcumuladaDiciembre)} · Impuesto del período:{" "}
                  {formatARS(resultado.impuestoGananciasAnual)}
                </p>
              </>
            ) : (
              <p className="text-sm rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-2">
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
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
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
        </section>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className={`flex justify-between py-1.5 ${strong ? "font-semibold" : ""}`}>
      <dt className={value < 0 ? "text-neutral-600 dark:text-neutral-400" : ""}>{label}</dt>
      <dd className={value < 0 ? "text-neutral-600 dark:text-neutral-400" : ""}>{formatARS(value)}</dd>
    </div>
  );
}
