"use client";

import { useState } from "react";
import { calcularCuilCompleto } from "@/lib/finanzas";

export default function CuilCliente() {
  const [dni, setDni] = useState("");
  const [sexo, setSexo] = useState<"m" | "f">("m");
  const [res, setRes] = useState<ReturnType<typeof calcularCuilCompleto> | null>(null);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold">¿Cómo se calcula el CUIL?</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Prefijo (20 varón / 27 mujer) + DNI con 8 dígitos + dígito verificador módulo 11
          (algoritmo AFIP). Si el cálculo da resto 1, se usa el prefijo especial 23.
        </p>
      </header>

      <form
        className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setRes(calcularCuilCompleto(Number(dni.replace(/\D/g, "")) || 0, sexo === "f"));
        }}
      >
        <div>
          <label htmlFor="dni" className="block text-sm font-medium mb-1">
            DNI (sin puntos)
          </label>
          <input
            id="dni"
            inputMode="numeric"
            required
            maxLength={8}
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ej: 30123456"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium mb-1">
            Género (según registro)
          </label>
          <select
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value as "m" | "f")}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="m">Masculino (prefijo 20)</option>
            <option value="f">Femenino (prefijo 27)</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
        >
          Calcular CUIL
        </button>
      </form>

      {res && (
        <section className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-xl p-5 text-center">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">Tu CUIL sería</p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 tracking-wider">
            {res.cuil}
          </p>
          <p className="text-xs text-emerald-800/70 dark:text-emerald-200/70 mt-2">
            Cálculo matemático según algoritmo AFIP. El CUIL real se asigna al inscribirte en
            ARCA/Anses.
          </p>
        </section>
      )}
    </div>
  );
}
