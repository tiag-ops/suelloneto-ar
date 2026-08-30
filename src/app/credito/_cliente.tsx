"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { calcularCredito } from "@/lib/finanzas";
import { formatARS2 } from "@/lib/format";

export default function CreditoCliente() {
  const [monto, setMonto] = useState("");
  const [tna, setTna] = useState("60");
  const [meses, setMeses] = useState("24");
  const [res, setRes] = useState<ReturnType<typeof calcularCredito> | null>(null);

  return (
    <>
    <div className="space-y-6">
      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(
            calcularCredito(
              Number(monto.replace(/\D/g, "")) || 0,
              Number(tna) || 0,
              Number(meses) || 0,
            ),
          );
        }}
      >
        <div className="sm:col-span-3">
          <label htmlFor="monto" className="block text-sm font-medium mb-1">
            Monto del préstamo ($)
          </label>
          <input
            id="monto"
            inputMode="numeric"
            required
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ej: 5000000"
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="tna" className="block text-sm font-medium mb-1">
            TNA (%)
          </label>
          <input
            id="tna"
            type="number"
            step="0.5"
            min={0}
            required
            value={tna}
            onChange={(e) => setTna(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="meses" className="block text-sm font-medium mb-1">
            Plazo (meses)
          </label>
          <input
            id="meses"
            type="number"
            min={1}
            max={360}
            required
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5"
        >
          Calcular cuota
        </button>
      </form>

      {res && (
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Cuota fija mensual (sistema francés)</p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {formatARS2(res.cuotaMensual)}
          </p>
          <div className="flex justify-between text-sm py-1">
            <span>Total pagado al finalizar</span>
            <span className="font-medium">{formatARS2(res.totalPagado)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Intereses totales</span>
            <span className="font-medium">{formatARS2(res.totalInteres)}</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No incluye seguros ni cargos administrativos que el banco pueda agregar.
          </p>
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="credito" />
    </>
  );
}
