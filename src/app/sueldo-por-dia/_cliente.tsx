"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { descomponerSueldo } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

export default function SueldoPorDiaPage() {
  const [sueldo, setSueldo] = useState("");
  const [res, setRes] = useState<ReturnType<typeof descomponerSueldo> | null>(null);

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">📅 Sueldo por día y por hora</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          La convención de liquidación argentina: el día se calcula dividiendo el sueldo mensual
          por 25 (días hábiles promedio) y la hora por 200 (8 horas × 25 días).
        </p>
      </header>

      <form
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(descomponerSueldo(Number(sueldo.replace(/\D/g, "")) || 0));
        }}
      >
        <div>
          <label htmlFor="sueldo" className="block text-sm font-medium mb-1">
            Sueldo bruto mensual ($)
          </label>
          <input
            id="sueldo"
            inputMode="numeric"
            required
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            placeholder="Ej: 4000000"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
        >
          Calcular
        </button>
      </form>

      {res && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-center">
            <p className="text-sm text-zinc-500">Por día trabajado</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatARS2(res.porDia)}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-center">
            <p className="text-sm text-zinc-500">Por hora trabajada</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatARS2(res.porHora)}
            </p>
          </div>
        </div>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="sueldo-por-dia" />
    </>
  );
}
