#!/usr/bin/env node
/**
 * Vigilante fiscal de ARCA para SueldoNeto.ar
 *
 * 1. Descarga el HTML oficial de monotributo (arca.gob.ar)
 * 2. Extrae las 11 categorías (tope + cuotas) con regex sobre las <td>
 * 3. Compara contra src/data/monotributo-2026S2.json
 * 4. Si difieren: actualiza el JSON, ajusta vigencia y termina exit 0 (el workflow hace el PR)
 *    Si son iguales: no toca nada, imprime "SIN CAMBIOS" y termina exit 0
 *
 * Sin dependencias: solo Node 18+ (fetch nativo).
 */
const fs = require("fs");
const path = require("path");

const URL_MONO = "https://www.arca.gob.ar/monotributo/categorias.asp";
const DATA_FILE = path.join(__dirname, "..", "src", "data", "monotributo-2026S2.json");
const CATS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

const parseARS = (s) => Number(s.replace(/\./g, "").replace(",", ".").replace(/[^0-9.]/g, ""));

async function main() {
  const hoy = new Date().toISOString().slice(0, 10);
  console.log(`[${hoy}] Vigilando ARCA…`);

  const res = await fetch(URL_MONO, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; sueldoneto-bot/1.0)" },
  });
  if (!res.ok) throw new Error(`ARCA respondió HTTP ${res.status}`);
  const html = await res.text();

  // Extraer por categoría: tope de ingresos brutos y cuota de servicios
  // El HTML de ARCA usa <th id="th_A_t15" scope="row">A</th> y luego <td headers="th_A_t15 th_ing_br_t15">$valor</td>
  const extraidos = {};
  for (const cat of CATS) {
    const mTope = html.match(
      new RegExp(`td\\s+headers="th_${cat}_t15\\s+th_ing_br[^"]*"[^>]*>\\$?([0-9.]+,[0-9]{2})`),
    );
    const mCuota = html.match(
      new RegExp(`td\\s+headers="th_${cat}_t15\\s+th_total_t15\\s+th_total_loc[^"]*"[^>]*>\\$?([0-9.]+,[0-9]{2})`),
    );
    if (!mTope || !mCuota) {
      throw new Error(`No pude extraer categoría ${cat} (¿cambió el HTML de ARCA?)`);
    }
    extraidos[cat] = {
      topeIngresosAnual: parseARS(mTope[1]),
      cuotaServicios: parseARS(mCuota[1]),
    };
  }

  // Comparar con el JSON actual y aplicar cambios sobre el clon (nuevoJson)
  const datos = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const nuevoJson = JSON.parse(JSON.stringify(datos));
  let cambios = 0;

  for (const cat of CATS) {
    const actual = datos.categorias.find((c) => c.categoria === cat);
    const destino = nuevoJson.categorias.find((c) => c.categoria === cat);
    const nuevo = extraidos[cat];
    if (
      Math.abs(actual.topeIngresosAnual - nuevo.topeIngresosAnual) > 0.005 ||
      Math.abs(actual.cuotaServicios - nuevo.cuotaServicios) > 0.005
    ) {
      cambios++;
      console.log(
        `CAMBIO cat ${cat}: tope ${actual.topeIngresosAnual} → ${nuevo.topeIngresosAnual}, ` +
          `cuota ${actual.cuotaServicios} → ${nuevo.cuotaServicios}`,
      );
      destino.topeIngresosAnual = nuevo.topeIngresosAnual;
      destino.cuotaServicios = nuevo.cuotaServicios;
    }
  }

  if (cambios === 0) {
    console.log("SIN CAMBIOS: los valores de ARCA coinciden con el repo.");
    return;
  }

  nuevoJson.actualizadoEl = hoy;
  // vigencia: suponemos nueva a partir del mes siguiente (ARCA suele publicar el 1°)
  const proximoMes = new Date();
  proximoMes.setMonth(proximoMes.getMonth() + 1, 1);
  nuevoJson.vigenciaDesde = proximoMes.toISOString().slice(0, 10);

  fs.writeFileSync(DATA_FILE, JSON.stringify(nuevoJson, null, 2) + "\n", "utf8");
  console.log(`ACTUALIZADO: ${cambios} categorías cambiadas. JSON regenerado.`);
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
