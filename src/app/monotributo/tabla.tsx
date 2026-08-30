"use client";

import { useMemo, useState } from "react";
import { calcularCategoria, datosMonotributo } from "@/lib/monotributo";
import { formatARS, formatARS2 } from "@/lib/format";

const datos = datosMonotributo();

export default function TablaMonotributo() {
  const [facturacion, setFacturacion] = useState("");
  const [tipo, setTipo] = useState<"servicios" | "bienes">("servicios");

  const resultado = useMemo(() => {
    const f = Number(facturacion.replace(/[^\d]/g, "")) || 0;
    if (f <= 0) return null;
    return calcularCategoria(f, tipo);
  }, [facturacion, tipo]);

  return (
    <div className="space-y-6">
      <form className="grid gap-4 sm:grid-cols-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 items-end">
        <div className="sm:col-span-2">
          <label htmlFor="facturacion" className="block text-sm font-medium mb-1">
            Facturación anual bruta ($)
          </label>
          <input
            id="facturacion"
            inputMode="numeric"
            value={facturacion}
            onChange={(e) => setFacturacion(e.target.value)}
            placeholder="Ej: 15000000"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium mb-1">
            Actividad
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "servicios" | "bienes")}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="servicios">Servicios</option>
            <option value="bienes">Venta de cosas muebles</option>
          </select>
        </div>
      </form>

      {resultado && (
        <section
          className={`rounded-xl p-5 border ${
            resultado.excedido
              ? "bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-800"
              : "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800"
          }`}
        >
          {resultado.excedido ? (
            <>
              <h2 className="font-semibold text-amber-800 dark:text-amber-200">
                ⚠️ Superás el tope de la categoría K
              </h2>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                Con {formatARS(resultado.topeIngresosAnual)}+ de facturación anual salís del
                monotributo: tenés que inscribirte en el Régimen General (Responsable
                Inscripto).
              </p>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-emerald-800 dark:text-emerald-200">
                Tu categoría: {resultado.categoria}
              </h2>
              <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                {formatARS2(resultado.cuotaMensual)}
                <span className="text-sm font-normal text-emerald-700/70 dark:text-emerald-300/70">
                  {" "}
                  /mes
                </span>
              </p>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80 mt-2">
                Impuesto integrado {formatARS2(resultado.desglose.impuestoIntegrado)} · SIPA{" "}
                {formatARS2(resultado.desglose.aporteSIPA)} · Obra social{" "}
                {formatARS2(resultado.desglose.aporteObraSocial)} · Tope anual{" "}
                {formatARS(resultado.topeIngresosAnual)}
              </p>
            </>
          )}
        </section>
      )}

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm bg-white dark:bg-zinc-900">
          <thead>
            <tr className="text-left text-xs text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-3 py-2">Cat.</th>
              <th className="px-3 py-2">Tope anual</th>
              <th className="px-3 py-2">Cuota servicios</th>
              <th className="px-3 py-2">Cuota bienes</th>
              <th className="px-3 py-2">SIPA</th>
              <th className="px-3 py-2">Obra social</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {datos.categorias.map((c) => {
              const esLaMia = resultado && !resultado.excedido && resultado.categoria === c.categoria;
              return (
                <tr
                  key={c.categoria}
                  className={
                    esLaMia
                      ? "bg-emerald-50 dark:bg-emerald-950 font-semibold"
                      : ""
                  }
                >
                  <td className="px-3 py-2 font-bold">
                    {c.categoria}
                    {esLaMia && (
                      <span className="ml-2 text-xs text-emerald-700 dark:text-emerald-400">
                        ← la tuya
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">{formatARS(c.topeIngresosAnual)}</td>
                  <td className="px-3 py-2">{formatARS2(c.cuotaServicios)}</td>
                  <td className="px-3 py-2">{formatARS2(c.cuotaBienes)}</td>
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">
                    {formatARS2(c.aporteSIPA)}
                  </td>
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">
                    {formatARS2(c.aporteObraSocial)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Valores vigentes desde {datos.vigenciaDesde} · Fuente:{" "}
        <a
          href={datos.urlFuente}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-emerald-700"
        >
          {datos.fuente}
        </a>
      </p>
    </div>
  );
}
