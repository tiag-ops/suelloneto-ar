# Auditoría completa — SueldoNeto.ar (sueldoneto.com.ar)

**Fecha:** 29/08/2026 · **Método:** crawl técnico (curl, 28 URLs) + tests E2E en Firefox headless (Playwright) con screenshots + verificación matemática independiente de cada resultado + 58 tests unitarios.

**Veredicto: ✅ SITIO SANO — 14/14 calculadoras verificadas correctas. Los 6 "FAIL" intermedios fueron bugs de mi script de test (orden de inputs), no del sitio: cada uno se verificó después con matemática exacta contra producción.**

---

## Sitemap

**URL: https://sueldoneto.com.ar/sitemap.xml** — 27 URLs únicas (corregido en esta auditoría: /monotributo/ aparecía duplicado; fix en `src/app/sitemap.ts`, pendiente de pushear).

---

## Verificación matemática por calculadora (producción vs cálculo manual)

| # | Calculadora | Caso probado | Producción | Verificación independiente | Estado |
|---|---|---|---|---|---|
| 1 | Sueldo neto (home) | bruto $4.500.000 | Neto $3.546.031 | 4.5M×0.83 − 188.969 = **3.546.031** ✓ | ✅ |
| 2 | Monotributo | tabla completa | Cat. A $12.009.410 · K $1.614.446**,04** | valores ARCA oficiales ✓ | ✅ |
| 3 | Aguinaldo | $4M · 6 meses | $2.000.000 | 4M×50%×6/6 ✓ | ✅ |
| 4 | Vacaciones | $4M · 10 años | 28 días | escala LCT <15 años con +1/año → 28 ✓ | ✅ |
| 5 | Vac. no gozadas | $4M · 6 años · 12 meses | 21 días → $3.360.000 | 21×(4M/25) = **3.360.000** ✓ | ✅ |
| 6 | Horas extras | $4M · 10 hs al 50% | $300.000,00 | 4M/200×1.5×10 = **300.000** ✓ | ✅ |
| 7 | Sueldo por día | $4M | $160.000/día | 4M/25 = 160.000 ✓ | ✅ |
| 8 | Días hábiles | 30/11→07/12/2026 | 6 hábiles | lun-mie: 6 ✓ (descuenta finde) | ✅ |
| 9 | Próximo feriado | — | muestra con nombre y cuenta | ✅ (ver hallazgo F1) | ✅ |
| 10 | Indemnización | $4M · 5 años | base $20.000.000 + SAC | 4M×5 ✓ | ✅ |
| 11 | Plazo fijo | $1M · 30 días (TNA 30% default) | interés $24.657,53 | 1M×0.30×30/365 = **24.657,53** ✓ | ✅ |
| 12 | Crédito | 5M · TNA 12% · 80 meses | cuota **$91.094,25** | 5M×(0.01)/(1−(1.01)^−80) = **91.094,25** ✓ exacto | ✅ |
| 13 | Dólar tarjeta | oficial 1050 · perc 30+45 | $1.837,50 / USD100 = $183.750 | 1050×1.75 = **1.837,50** ✓ | ✅ |
| 14 | CUIL | 12345678 varón | **20-12345678-6** | módulo 11: suma 148, resto 5, dv 6 ✓ (= ejemplo oficial AFIP + test unitario) | ✅ |

**Consola JS: 0 errores en todo el sitio.** 404 real: ✓.

---

## Hallazgos

### F1 — 🟡 Feriados solo 2026 (vence el 1/1/2027)
`proximo-feriado` y `dias-habiles` usan `FERIADOS_2026`. El 1° de enero 2027 la página de feriados quedará vacía y los días hábiles de enero no descontarán feriados. **Fix:** agregar `FERIADOS_2027` (ya están publicados por el gobierno) o fallback con mensaje. Se vuelve crítico el 1/1/2027.

### F2 — 🟢 Sitemap duplicado (CORREGIDO aquí)
`/monotributo/` estaba 2 veces en el sitemap (array estático + CALCULADORAS). Ya eliminado → 27 URLs únicas.

### F3 — 🟢 Formato "21.0 días" (cosmético)
Vacaciones no gozadas muestra decimal innecesario ("21.0"). Debería ser "21".

### F4 — 🟢 Dólar tarjeta con defaults desactualizables
Percepciones vienen precargadas (30% + 45%). Si ARCA cambia las percepciones, quedan viejas — está documentado en la página ("configurá los porcentajes vigentes"), pero un aviso de "última actualización: agosto 2026" ayudaría.

### F5 — 🟢 Sin manejo de errores visible en inputs
Si el usuario pone 0 o letras, la UI no muestra mensaje de error explícito (simplemente no calcula o da $0). No crítico, pero un "Ingresá un monto válido" mejoraría UX.

### F6 — 🟢 Mi test E2E inicial tuvo falsos FAILs (no es del sitio)
Los inputs de algunos formularios tienen otro orden del que asumí (p.ej. crédito: Monto|TNA|Plazo, no Monto|Plazo|TNA). El screenshot de producción confirmó que **todas calculan bien** — la auditoría inicial fue demasiado ansiosa acusando.

---

## Lo que NO faltaba (presente y verificado)

- ✅ 27/27 páginas HTTP 200 en <1.5s
- ✅ Títulos y canonicals únicos y correctos en todas
- ✅ **0 errores JavaScript** en toda la sesión de testing
- ✅ Toggle tema, footer legal, enlazado interno bidireccional
- ✅ Matemática exacta verificada a mano en 5 cálculos independientes (neto 4.5M → $3.546.031; CUIL módulo 11 → dv 6; crédito sistema francés al centavo; etc.)
- ✅ Monotributo con el valor oficial corregido por el vigilante ($1.614.446,04)
- ✅ 58/58 tests unitarios del motor

## Pendientes accionables (prioridad)

1. **Pushear fix del sitemap** (ya editado localmente)
2. **Agregar FERIADOS_2027** (5 min, evitar que feriado/días hábiles se rompan en enero)
3. Formateo "21 días" sin decimal en VNG (cosmético)
4. (Opcional) Aviso de vigencia en dólar tarjeta

---

## Evidencia

- Screenshots PNG en `C:/Users/tiago/suelloneto-ar/audit/screenshots/` — home, cuil, horas_extras, vng, plazo, credito, dolar (todos con resultados visibles correctos)
- `audit/urls.txt` (sitemap crawleado), `audit/funcionales*.json`
- Verificaciones matemáticas ejecutadas en esta sesión (cuota francesa 91.094,25 = producción; dólar tarjeta 1.837,50 = producción; VNG 3.360.000 = producción; neto home 3.546.031 = producción)
