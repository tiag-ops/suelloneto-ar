"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { vacacionesNoGozadas } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

export default function VacacionesNoGozadasPage() {
  const [sueldo, setSueldo] = useState("");
  const [antiguedad, setAntiguedad] = useState("1");
  const [meses, setMeses] = useState("12");
  const [res, setRes] = useState<ReturnType<typeof vacacionesNoGozadas> | null>(null);

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">⚖️ Vacaciones no gozadas</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Cuando la relación termina sin que hayas tomado tus vacaciones, te las deben pagar
          proporcionalmente: 1/12 de los días que te corresponden por cada mes trabajado desde
          tus últimas vacaciones (art. 156 LCT).
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(
            vacacionesNoGozadas(
              Number(sueldo.replace(/\D/g, "")) || 0,
              Number(antiguedad) || 0,
              Number(meses) || 0,
            ),
          );
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
        <div>
          <label htmlFor="antiguedad" className="block text-sm font-medium mb-1">
            Antigüedad total (años)
          </label>
          <input
            id="antiguedad"
            type="number"
            min={0}
            max={50}
            value={antiguedad}
            onChange={(e) => setAntiguedad(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="meses" className="block text-sm font-medium mb-1">
            Meses desde tus últimas vacaciones
          </label>
          <input
            id="meses"
            type="number"
            min={0}
            max={12}
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5"
        >
          Calcular
        </button>
      </form>

      {res && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Te corresponden {Number.isInteger(res.diasProporcionales) ? res.diasProporcionales : res.diasProporcionales.toFixed(1)} días de vacaciones no gozadas:
          </p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">
            {formatARS2(res.pago)}
          </p>
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="vacaciones-no-gozadas" />
    </>
  );
}
