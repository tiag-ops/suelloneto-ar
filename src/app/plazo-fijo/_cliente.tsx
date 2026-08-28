"use client";

import { useState } from "react";
import { calcularPlazoFijo, calcularPlazoFijoDias } from "@/lib/finanzas";
import { formatARS2 } from "@/lib/format";

export default function PlazoFijoCliente() {
  const [capital, setCapital] = useState("");
  const [tna, setTna] = useState("40");
  const [dias, setDias] = useState("30");
  const [renovar, setRenovar] = useState(false);
  const [modo, setModo] = useState<"dias" | "meses">("dias");
  const [meses, setMeses] = useState("12");
  const [res, setRes] = useState<ReturnType<typeof calcularPlazoFijo> | null>(null);

  return (
    <div className="space-y-6">
      <form
        className="grid gap-4 sm:grid-cols-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
        onSubmit={(e) => {
          e.preventDefault();
          const c = Number(capital.replace(/\D/g, "")) || 0;
          const t = Number(tna) || 0;
          setRes(
            modo === "dias"
              ? calcularPlazoFijoDias(c, t, Number(dias) || 0)
              : calcularPlazoFijo(c, t, Number(meses) || 0, renovar),
          );
        }}
      >
        <div className="sm:col-span-2">
          <label htmlFor="capital" className="block text-sm font-medium mb-1">
            Capital a invertir ($)
          </label>
          <input
            id="capital"
            inputMode="numeric"
            required
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Ej: 1000000"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="tna" className="block text-sm font-medium mb-1">
            TNA anual (%)
          </label>
          <input
            id="tna"
            type="number"
            step="0.5"
            min={0}
            required
            value={tna}
            onChange={(e) => setTna(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="modo" className="block text-sm font-medium mb-1">
            Plazo
          </label>
          <div className="flex gap-2">
            <select
              id="modo"
              value={modo}
              onChange={(e) => setModo(e.target.value as "dias" | "meses")}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 py-2"
            >
              <option value="dias">Días</option>
              <option value="meses">Meses</option>
            </select>
            {modo === "dias" ? (
              <input
                aria-label="Cantidad de días"
                type="number"
                min={30}
                required
                value={dias}
                onChange={(e) => setDias(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
              />
            ) : (
              <input
                aria-label="Cantidad de meses"
                type="number"
                min={1}
                required
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
              />
            )}
          </div>
        </div>
        {modo === "meses" && (
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={renovar}
              onChange={(e) => setRenovar(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Renuevo mes a mes (interés compuesto)
          </label>
        )}
        <button
          type="submit"
          className="sm:col-span-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
        >
          Calcular plazo fijo
        </button>
      </form>

      {res && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="flex justify-between text-sm py-1">
            <span>Capital</span>
            <span className="font-medium">{formatARS2(res.capital)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Interés ganado</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              +{formatARS2(res.interes)}
            </span>
          </div>
          <div className="flex items-baseline justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="font-semibold">Recibís al vencimiento</span>
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatARS2(res.montoFinal)}
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            TNA {tna}% · TEA equivalente {res.tea.toFixed(2)}%
          </p>
        </section>
      )}
    </div>
  );
}
