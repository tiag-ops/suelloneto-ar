"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { diasHabiles } from "@/lib/laboral";
import { FERIADOS } from "@/lib/feriados";

export default function DiasHabilesPage() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [res, setRes] = useState<{ habiles: number; corridos: number } | null>(null);

  const feriadosSet = new Set(FERIADOS.map((f) => f.fecha));

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">📆 Calculadora de días hábiles</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Días hábiles entre dos fechas en Argentina: descuenta sábados, domingos y feriados
          nacionales 2026.
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (!desde || !hasta) return;
          const corridos = Math.round(
            (new Date(hasta + "T12:00:00Z").getTime() - new Date(desde + "T12:00:00Z").getTime()) /
              86_400_000,
          ) + 1;
          setRes({
            habiles: diasHabiles(desde, hasta, feriadosSet),
            corridos: Math.max(corridos, 0),
          });
        }}
      >
        <div>
          <label htmlFor="desde" className="block text-sm font-medium mb-1">
            Desde
          </label>
          <input
            id="desde"
            type="date"
            required
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="hasta" className="block text-sm font-medium mb-1">
            Hasta
          </label>
          <input
            id="hasta"
            type="date"
            required
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5"
        >
          Calcular
        </button>
      </form>

      {res && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Días hábiles</p>
            <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
              {res.habiles}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Días corridos</p>
            <p className="text-3xl font-bold">{res.corridos}</p>
          </div>
        </div>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="dias-habiles" />
    </>
  );
}
