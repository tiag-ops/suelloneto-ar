"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { calcularHorasExtras } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

export default function HorasExtrasPage() {
  const [sueldo, setSueldo] = useState("");
  const [h50, setH50] = useState("0");
  const [h100, setH100] = useState("0");
  const [res, setRes] = useState<ReturnType<typeof calcularHorasExtras> | null>(null);

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">⏰ Calculadora de Horas Extras</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Las horas extras se liquidan sobre el valor hora (sueldo mensual ÷ 200): +50% en días
          hábiles; +100% los sábados desde las 13h, domingos y feriados (art. 201 LCT).
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(
            calcularHorasExtras(
              Number(sueldo.replace(/\D/g, "")) || 0,
              Number(h50) || 0,
              Number(h100) || 0,
            ),
          );
        }}
      >
        <div className="sm:col-span-3">
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
        <div>
          <label htmlFor="h50" className="block text-sm font-medium mb-1">
            Horas extras al 50%
          </label>
          <input
            id="h50"
            type="number"
            min={0}
            value={h50}
            onChange={(e) => setH50(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="h100" className="block text-sm font-medium mb-1">
            Horas extras al 100%
          </label>
          <input
            id="h100"
            type="number"
            min={0}
            value={h100}
            onChange={(e) => setH100(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
          >
            Calcular
          </button>
        </div>
      </form>

      {res && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="flex justify-between text-sm py-1">
            <span>Valor de tu hora</span>
            <span className="font-medium">{formatARS2(res.valorHora)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Horas al 50%</span>
            <span className="font-medium">{formatARS2(res.pago50)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Horas al 100%</span>
            <span className="font-medium">{formatARS2(res.pago100)}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="font-semibold">Total extras del mes</span>
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatARS2(res.total)}
            </span>
          </div>
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="horas-extras" />
    </>
  );
}
