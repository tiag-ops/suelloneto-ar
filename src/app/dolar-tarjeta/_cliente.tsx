"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { dolarTarjeta } from "@/lib/finanzas";
import { formatARS2 } from "@/lib/format";

export default function DolarTarjetaCliente() {
  const [oficial, setOficial] = useState("");
  const [p1, setP1] = useState("30");
  const [p2, setP2] = useState("45");
  const [res, setRes] = useState<ReturnType<typeof dolarTarjeta> | null>(null);

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold">¿Cómo se calcula?</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Al dólar oficial se le suman las percepciones/impostos vigentes sobre gastos en el
          exterior y compras en moneda extranjera. Actualizá los porcentajes según la normativa
          del día.
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(
            dolarTarjeta(
              Number(oficial.replace(",", ".")) || 0,
              [Number(p1) || 0, Number(p2) || 0],
            ),
          );
        }}
      >
        <div>
          <label htmlFor="oficial" className="block text-sm font-medium mb-1">
            Dólar oficial ($)
          </label>
          <input
            id="oficial"
            inputMode="decimal"
            required
            value={oficial}
            onChange={(e) => setOficial(e.target.value)}
            placeholder="Ej: 1450"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="p1" className="block text-sm font-medium mb-1">
            Percepción 1 (%)
          </label>
          <input
            id="p1"
            type="number"
            min={0}
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="p2" className="block text-sm font-medium mb-1">
            Percepción 2 (%)
          </label>
          <input
            id="p2"
            type="number"
            min={0}
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5"
        >
          Calcular dólar tarjeta
        </button>
      </form>

      {res && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dólar tarjeta (recargo total {res.percepcionesAplicadas}%)
          </p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {formatARS2(res.dolarTarjeta)}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            Una compra de USD 100 te cuesta {formatARS2(res.dolarTarjeta * 100)}
          </p>
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="dolar-tarjeta" />
    </>
  );
}
