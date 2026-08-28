"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { calcularAguinaldo } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

export default function AguinaldoPage() {
  const [sueldo, setSueldo] = useState("");
  const [meses, setMeses] = useState("6");
  const [res, setRes] = useState<ReturnType<typeof calcularAguinaldo> | null>(null);

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">🎁 Calculadora de Aguinaldo (SAC) 2026</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          El Sueldo Anual Complementario es el 50% de tu mejor remuneración mensual del semestre,
          proporcional a los meses trabajados (art. 121 LCT). Se cobra en junio y en diciembre.
        </p>
      </header>

      <form
        className="grid gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(calcularAguinaldo(Number(sueldo.replace(/\D/g, "")) || 0, Number(meses) || 0));
        }}
      >
        <div>
          <label htmlFor="sueldo" className="block text-sm font-medium mb-1">
            Mejor sueldo bruto del semestre ($)
          </label>
          <input
            id="sueldo"
            inputMode="numeric"
            required
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            placeholder="Ej: 4500000"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="meses" className="block text-sm font-medium mb-1">
            Meses trabajados en el semestre (0 a 6)
          </label>
          <input
            id="meses"
            type="number"
            min={0}
            max={6}
            step="0.5"
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
        >
          Calcular aguinaldo
        </button>
      </form>

      {res && res.sac > 0 && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tu aguinaldo</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatARS2(res.sac)}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            Cálculo: 50% de {formatARS2(res.mejorSueldo)} × {res.mesesTrabajados}/6 del semestre
          </p>
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="aguinaldo" />
    </>
  );
}
