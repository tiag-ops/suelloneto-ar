"use client";

import { useState } from "react";
import { indemnizacionDespido, vacacionesNoGozadas } from "@/lib/laboral";
import { formatARS2 } from "@/lib/format";

export default function IndemnizacionPage() {
  const [sueldo, setSueldo] = useState("");
  const [anios, setAnios] = useState("");
  const [meses, setMeses] = useState("0");
  const [res, setRes] = useState<ReturnType<typeof indemnizacionDespido> | null>(null);
  const [vac, setVac] = useState<ReturnType<typeof vacacionesNoGozadas> | null>(null);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">💼 Calculadora de Indemnización por despido</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Despido sin causa (art. 245 LCT): una mejor remuneración mensual por año de servicio o
          fracción mayor a 3 meses, más el SAC proporcional del semestre en curso. No incluye
          preaviso ni integración del mes de despido (se agregan aparte si corresponden).
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          const s = Number(sueldo.replace(/\D/g, "")) || 0;
          const a = Number(anios) || 0;
          const m = Number(meses) || 0;
          setRes(indemnizacionDespido(s, a + m / 12, m));
          setVac(vacacionesNoGozadas(s, a, m));
        }}
      >
        <div className="sm:col-span-3">
          <label htmlFor="sueldo" className="block text-sm font-medium mb-1">
            Mejor remuneración mensual, bruta ($)
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
          <label htmlFor="anios" className="block text-sm font-medium mb-1">
            Años de antigüedad
          </label>
          <input
            id="anios"
            type="number"
            min={0}
            max={50}
            required
            value={anios}
            onChange={(e) => setAnios(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="meses" className="block text-sm font-medium mb-1">
            Meses adicionales
          </label>
          <input
            id="meses"
            type="number"
            min={0}
            max={11}
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
        >
          Calcular
        </button>
      </form>

      {res && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="flex justify-between text-sm py-1">
            <span>
              Antigüedad reconocida ({res.aniosReconocidos} {res.aniosReconocidos === 1 ? "año" : "años"})
            </span>
            <span className="font-medium">{formatARS2(res.base)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>SAC proporcional del semestre</span>
            <span className="font-medium">{formatARS2(res.sacProporcional)}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="font-semibold">Indemnización total</span>
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatARS2(res.total)}
            </span>
          </div>
          {vac && vac.diasProporcionales > 0 && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              + Vacaciones no gozadas proporcionales: {vac.diasProporcionales.toFixed(1)} días ≈{" "}
              {formatARS2(vac.pago)}
            </p>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Montos brutos estimativos. Tu liquidación final puede incluir preaviso, integración
            del mes, horas extras y otras sumas. Consultá con un laboralista.
          </p>
        </section>
      )}
    </div>
  );
}
