"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { diasVacaciones, pagoVacaciones } from "@/lib/laboral";
import { formatARS, formatARS2 } from "@/lib/format";

export default function VacacionesPage() {
  const [sueldo, setSueldo] = useState("");
  const [antiguedad, setAntiguedad] = useState("1");
  const [res, setRes] = useState<{ dias: number; pago: number; porDia: number } | null>(null);

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">🏖️ Calculadora de Vacaciones</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Días de vacaciones corridas según antigüedad (art. 150 LCT) y cuánto cobrás por ellas:
          se pagan a valor día (sueldo mensual ÷ 25) por día corrido.
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5"
        onSubmit={(e) => {
          e.preventDefault();
          const s = Number(sueldo.replace(/\D/g, "")) || 0;
          const a = Number(antiguedad) || 0;
          const dias = diasVacaciones(a);
          setRes({ dias, pago: pagoVacaciones(s, dias), porDia: s / 25 });
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
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="antiguedad" className="block text-sm font-medium mb-1">
            Antigüedad (años)
          </label>
          <input
            id="antiguedad"
            type="number"
            min={0}
            max={50}
            value={antiguedad}
            onChange={(e) => setAntiguedad(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5"
        >
          Calcular vacaciones
        </button>
      </form>

      <div className="grid grid-cols-3 gap-3 text-sm">
        {[
          { max: 5, dias: 14 },
          { max: 10, dias: 21 },
          { max: 20, dias: 28 },
        ].map((t, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 text-center bg-white dark:bg-neutral-900"
          >
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {i === 0 ? "Hasta 5 años" : i === 1 ? "6 a 10 años" : "11 a 20 años"}
            </p>
            <p className="text-lg font-bold">{t.dias} días</p>
          </div>
        ))}
        <div className="rounded-lg border border-emerald-300 dark:border-emerald-800 p-3 text-center bg-emerald-50 dark:bg-emerald-950">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">Más de 20 años</p>
          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">30 días</p>
        </div>
      </div>

      {res && (
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Con {res.dias} días de vacaciones:
          </p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {formatARS2(res.pago)}
          </p>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mt-2">
            {res.dias} días × {formatARS2(res.porDia)}/día (mensual ÷ 25)
          </p>
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="vacaciones" />
    </>
  );
}
