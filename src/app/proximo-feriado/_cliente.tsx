"use client";

import { useState } from "react";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { proximoFeriado } from "@/lib/laboral";
import { FERIADOS_2026 } from "@/lib/feriados";

export default function ProximoFeriadoPage() {
  const hoy = new Date();
  const proximo = proximoFeriado(hoy, FERIADOS_2026);

  const restantes = FERIADOS_2026.filter(
    (f) => f.fecha > hoy.toISOString().slice(0, 10),
  );

  return (
    <>
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">🇦🇷 Próximo feriado en Argentina</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Calendario de feriados nacionales 2026 (Ley 27.399).
        </p>
      </header>

      {proximo ? (
        <section className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-xl p-6 text-center">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            El próximo feriado es el
          </p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
            {new Date(proximo.fecha + "T12:00:00Z").toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: "UTC",
            })}
          </p>
          <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80 mt-1">
            {proximo.nombre} · faltan <strong>{proximo.diasRestantes}</strong> días
          </p>
        </section>
      ) : (
        <p className="text-sm text-zinc-500">No quedan feriados este año.</p>
      )}

      <section>
        <h2 className="font-semibold mb-3">Calendario completo 2026</h2>
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          {restantes.map((f) => (
            <li key={f.fecha} className="flex justify-between items-center px-4 py-2.5 text-sm">
              <span>
                {new Date(f.fecha + "T12:00:00Z").toLocaleDateString("es-AR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  timeZone: "UTC",
                })}{" "}
                — {f.nombre}
              </span>
              <span className="text-xs text-zinc-400">
                {f.tipo === "puente" ? "puente" : f.tipo}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>

    <BloqueCalculadorasRelacionadas slug="proximo-feriado" />
    </>
  );
}
