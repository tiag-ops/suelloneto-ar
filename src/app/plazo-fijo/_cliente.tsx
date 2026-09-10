"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BloqueCalculadorasRelacionadas } from "../enlaces";
import { calcularPlazoFijo, calcularPlazoFijoDias } from "@/lib/finanzas";
import { formatARS, formatARS2 } from "@/lib/format";

/** Filas de la franja de escenarios: mismo capital y TNA, distintos plazos. */
const ESCENARIOS_DIAS = [30, 60, 90, 180] as const;
const DIAS_POR_MES = 30; // aproximación de mercado para proyectar meses a días

/** Montos precargados para no arrancar de cero */
const PRESETS_CAPITAL = [500000, 1000000, 5000000] as const;

/** Escenario compartible por URL: /?c=1000000&t=40&d=90 (d en días; meses se consolidan a d×30) */
function escenarioDesdeURL(): { c: string; t: string; d: number } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const c = p.get("c");
  const t = p.get("t");
  const d = p.get("d");
  const dias = Math.round(Number(d) || 0);
  if ((!c && !t) || !(dias >= 30)) return null;
  return {
    c: c ? String(Number(c.replace(/\D/g, "")) || 0) : "",
    t: t ? String(Number(t) || 0) : "",
    d: dias,
  };
}

export default function PlazoFijoCliente() {
  const router = useRouter();
  const inicial = useMemo(() => escenarioDesdeURL(), []);
  const [capital, setCapital] = useState(inicial?.c ?? "");
  const [tna, setTna] = useState(inicial?.t ?? "40");
  const [dias, setDias] = useState(inicial ? String(inicial.d) : "30");
  const [renovar, setRenovar] = useState(false);
  const [modo, setModo] = useState<"dias" | "meses">("dias");
  const [meses, setMeses] = useState("12");
  const [res, setRes] = useState<ReturnType<typeof calcularPlazoFijo> | null>(null);
  const [tnaUsada, setTnaUsada] = useState(inicial?.t ?? "40");
  const [diasUsados, setDiasUsados] = useState(inicial?.d ?? 30);
  const [modoRes, setModoRes] = useState<"dias" | "meses">("dias");
  const [renovarRes, setRenovarRes] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const capitalNum = useMemo(() => Number(capital.replace(/\D/g, "")) || 0, [capital]);
  const tnaNum = useMemo(() => Number(tna) || 0, [tna]);

  /** Primer cálculo automático si la URL trae escenario completo (?c=&t=&d=).
   *  setState durante el render (patrón React "adjusting state when props change"):
   *  React descarta el render en curso y re-renderea ya ajustado — sin effect,
   *  sin cascada de renders. El flag evita re-disparo después de cada cálculo manual. */
  const [arranqueURL, setArranqueURL] = useState(inicial !== null);
  if (arranqueURL && inicial && res === null && Number(inicial.c) > 0 && Number(inicial.t) > 0) {
    setArranqueURL(false);
    setTnaUsada(inicial.t);
    setDiasUsados(inicial.d);
    setRes(calcularPlazoFijoDias(Number(inicial.c), Number(inicial.t), inicial.d));
  }

  /** Franja de escenarios 30/60/90/180 días con el capital y TNA calculados. */
  const escenarios = useMemo(() => {
    if (!res || capitalNum <= 0 || tnaNum <= 0) return [];
    return ESCENARIOS_DIAS.map((d) => {
      const e = calcularPlazoFijoDias(capitalNum, tnaNum, d);
      return { dias: d, interes: e.interes, montoFinal: e.montoFinal };
    });
  }, [res, capitalNum, tnaNum]);

  /** Capital por debajo del rango donde el interés es una decisión real. */
  const capitalTrivial = capitalNum > 0 && capitalNum < 1000;
  const tnaCero = tnaNum === 0;
  const diasInvalidos = modo === "dias" && dias !== "" && Number(dias) < 30;

  /** El cálculo está listo cuando los tres inputs tienen valores válidos. */
  const listo =
    capitalNum >= 1000 &&
    tnaNum > 0 &&
    (modo === "dias" ? Number(dias) >= 30 : Number(meses) >= 1);

  /** Refleja el escenario actual en la URL (?c=&t=&d=): shareable y long-tail */
  function reflejarURL(dConsolidado: number) {
    const p = new URLSearchParams();
    p.set("c", String(capitalNum));
    p.set("t", tna);
    p.set("d", String(dConsolidado));
    router.replace(`?${p.toString()}`, { scroll: false });
  }

  /** Calcular con un plazo consolidado en días (input o chip de escenario) */
  function calcular(dConsolidado: number, desdeMeses = false) {
    setDiasUsados(dConsolidado);
    setTnaUsada(tna);
    setModoRes(desdeMeses ? "meses" : "dias");
    if (desdeMeses) setRenovarRes(renovar);
    setRes(
      desdeMeses
        ? calcularPlazoFijo(capitalNum, tnaNum, Number(meses) || 0, renovar)
        : calcularPlazoFijoDias(capitalNum, tnaNum, dConsolidado),
    );
    reflejarURL(dConsolidado);
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard bloqueado (http no seguro): sin acción, el link sigue en la barra
    }
  }

  return (
    <>
    <div className="space-y-6">
      <form
        className="card grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!listo) {
            setRes(null);
            return;
          }
          if (modo === "dias") {
            calcular(Number(dias) || 0);
          } else {
            calcular(Math.round((Number(meses) || 0) * DIAS_POR_MES), true);
          }
        }}
      >
        <div className="sm:col-span-2">
          <label htmlFor="capital">Capital a invertir ($)</label>
          <input
            id="capital"
            inputMode="numeric"
            required
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Ej: 1000000"
            aria-describedby="ayuda-capital"
            className="input mt-1"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS_CAPITAL.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCapital(String(p))}
                className="badge min-h-[36px] cursor-pointer active:scale-[0.97]"
              >
                ${p.toLocaleString("es-AR")}
              </button>
            ))}
          </div>
          <p id="ayuda-capital" className="caption mt-2">
            Si es tu primera vez: el mínimo típico de los bancos es de $1.000 a $10.000 (30 días de plazo).
          </p>
        </div>
        <div>
          <label htmlFor="tna">TNA anual (%)</label>
          <input
            id="tna"
            type="number"
            step="0.5"
            min={0}
            required
            value={tna}
            onChange={(e) => setTna(e.target.value)}
            aria-describedby={tnaCero ? "error-tna" : undefined}
            className="input mt-1"
          />
          {tnaCero && (
            <p id="error-tna" role="alert" className="mt-1 text-[13px] font-medium text-amber-800 dark:text-amber-200">
              ¿Te olvidaste de la tasa? Con TNA 0 el dinero no rinde: revisá la tasa que te cotiza el banco.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="modo">Plazo</label>
          <div className="flex gap-2 mt-1">
            <select
              id="modo"
              value={modo}
              onChange={(e) => setModo(e.target.value as "dias" | "meses")}
              className="input !w-auto !px-2"
            >
              <option value="dias">Días</option>
              <option value="meses">Meses</option>
            </select>
            {modo === "dias" ? (
              <input
                aria-label="Cantidad de días"
                type="number"
                min={30}
                required
                value={dias}
                onChange={(e) => setDias(e.target.value)}
                aria-describedby={diasInvalidos ? "error-dias" : undefined}
                className="input"
              />
            ) : (
              <input
                aria-label="Cantidad de meses"
                type="number"
                min={1}
                required
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                className="input"
              />
            )}
          </div>
          {diasInvalidos && (
            <p id="error-dias" role="alert" className="mt-1 text-[13px] font-medium text-amber-800 dark:text-amber-200">
              Los bancos no toman plazos menores a 30 días (mínimo legal).
            </p>
          )}
        </div>
        {modo === "meses" && (
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={renovar}
              onChange={(e) => setRenovar(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Renuevo mes a mes (interés compuesto)
          </label>
        )}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={!listo}
            className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Calcular plazo fijo
          </button>
        </div>
      </form>

      {capitalTrivial && (
        <p role="status" className="warning">
          Con menos de $1.000 el interés es cenizo, pero va a modo de prueba: los bancos exigen montos mínimos.
        </p>
      )}

      {res && (
        <section
          aria-labelledby="titulo-resultado"
          aria-live="polite"
          className="verdict space-y-1"
        >
          <h2 id="titulo-resultado" className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            Resultado: {formatARS(capitalNum)} a TNA {tnaUsada}% ·{" "}
            {modoRes === "dias"
              ? `${diasUsados} días`
              : `${Number(meses) || 0} meses${renovarRes ? " renovando" : ""}`}
          </h2>
          <div className="flex justify-between text-sm py-1">
            <span>Capital</span>
            <span className="font-medium">{formatARS2(res.capital)}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Interés ganado</span>
            <span className="font-medium font-semibold text-emerald-800 dark:text-emerald-200">
              +{formatARS2(res.interes)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-emerald-200 dark:border-emerald-900 pt-3">
            <span className="font-semibold">Recibís al vencimiento</span>
            <span className="numero-resultado text-4xl sm:text-5xl text-emerald-900 dark:text-emerald-100">
              {formatARS(res.montoFinal)}
            </span>
          </div>
          <p className="text-[13px] text-emerald-800/80 dark:text-emerald-200/80 flex flex-wrap items-center gap-x-2">
            <span>
              TNA {tnaUsada}% · TEA equivalente{" "}
              {res.tea.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
            </span>
            <button
              type="button"
              onClick={copiarLink}
              className="underline hover:no-underline min-h-[36px]"
            >
              {copiado ? "¡Link copiado!" : "Copiar link del resultado"}
            </button>
          </p>

          {escenarios.length > 0 && (
            <div className="mt-4 border-t border-emerald-200 dark:border-emerald-900 pt-4">
              <h3 className="text-[13px] font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                Con el mismo capital, ¿cuánto rendiría a otros plazos? (misma TNA)
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                {escenarios.map((e) => {
                  const activo = e.dias === diasUsados;
                  return (
                    <li key={e.dias}>
                      <button
                        type="button"
                        onClick={() => calcular(e.dias)}
                        aria-pressed={activo}
                        className={
                          activo
                            ? "w-full min-h-[44px] rounded-lg border border-emerald-500 bg-white/70 dark:bg-emerald-900/40 px-2 py-2 text-left ring-2 ring-emerald-600/30"
                            : "w-full min-h-[44px] rounded-lg border border-emerald-200/70 bg-white/50 dark:border-emerald-900 dark:bg-emerald-900/20 px-2 py-2 text-left hover:border-emerald-400 transition-colors"
                        }
                      >
                        <span className="block text-[12px] text-emerald-800/80 dark:text-emerald-200/80">
                          {activo ? "★ " : ""}{e.dias} días
                        </span>
                        <span className="font-semibold text-emerald-900 dark:text-emerald-100">
                          +{formatARS(e.interes)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>

    <BloqueCalculadorasRelacionadas slug="plazo-fijo" />
    </>
  );
}
