# SueldoNeto.ar — Estrategia SEO master (2026-09-09)

Objetivo: #1 en Homepage + todas las calculadoras y guías. Horizonte realista: 6–12 meses para head terms, 90 días para long-tail.

## 0. Diagnóstico (auditado hoy, evidencia real)

Lo que YA está bien (no tocar, es ventaja vs. competencia):
- Infra técnica impecable: static export en CF Pages (velocidad nativa), canonicals correctos y únicos en todos los URLs auditados (/, /sueldo/, /aguinaldo/, guías, montos), titles con marca, robots.ts con 2 sitemaps, meta-tag GSC.
- Home ya indexado (11 días de vida) y rankeando para la marca.
- Datos oficiales con fecha de vigencia = diferenciador estructural (los competidores editan a mano y quedan viejos).

Gaps encontrados (auditados con curl sobre producción):
1. **Calculadoras sin JSON-LD** (/aguinaldo/ y el resto de CALCULADORAS): falta `WebApplication` + `BreadcrumbList`.
2. **Guías con JSON-LD incompleto**: tienen `Article`+`Organization` pero sin `FAQPage` (teniendo FAQs en el contenido), sin `BreadcrumbList`, sin `datePublished`/`dateModified` ni `author` → pierden elegibilidad de resultados enriquecidos y señal E-E-A-T.
3. **Hub /sueldo/ sin ItemList** de los 100 montos.
4. **Guía estacional vencida**: "Aguinaldo junio 2026" ya pasó; diciembre 2026 es la próxima ola de búsqueda (picos ~15 días antes del pago).
5. Solo el home indexado hasta ahora (normal a 11 días, pero hay que acelerar vía GSC).

Contexto competitivo (SERP "calculadora sueldo neto"): BBVA, fiscal.com.ar, calcularsueldo.com.ar, indicadores.ar, cuantocobras, yo-facturo, fincalcapp, impuestometro. Head term saturado: pelearlo de frente toma 6–12 meses de autoridad. **El wedge son las páginas /sueldo/[monto] (competencia ~cero) + la frescura oficial de los datos.**

## 1. Principios que guían cada decisión

- One keyword = one page (el registry único ya lo garantiza).
- YMYL: fuente oficial + fecha de vigencia visible en TODO resultado, autor Organization, disclaimers. Ya existe; amplificarlo con JSON-LD.
- Answer-first: "Respuesta corta" en el primer viewport de cada guía (featured-snippet bait). Auditar que TODAS las guías lo tengan.
- Nunca cambiar un slug (static export no soporta redirects → 404). Refresh in-place siempre.
- Interlinking en la misma wave: calculadora ↔ guía ↔ hub, sin páginas huérfanas.

## 2. Plan por fases

### FASE A — Técnico on-page (esta semana, ~2h de build)
1. JSON-LD centralizado (helper nuevo `src/lib/seo.ts`):
   - Todas las calculadoras: `WebApplication` (offers price 0, es-AR) + `BreadcrumbList`.
   - Todas las guías (articulo-view.tsx): agregar `FAQPage` desde las `faqs[]` existentes, `BreadcrumbList`, `datePublished`/`dateModified` estáticos en el registro, `author` → Organization.
   - Hub /sueldo/: `ItemList` con los 100 montos publicados + `BreadcrumbList`.
2. Titles/descriptions orientados a CTR (revisar 1×1): año + beneficio + diferencial ("valores ARCA vigentes"). Las de montos ya lo hacen bien.
3. Refresh estacional in-place (el slug NO se toca):
   - `aguinaldo-junio-2026` → cubrir junio Y diciembre 2026 (fechas de pago de cada semestre).
   - Verificar que escala-ganancias/monotributo digan "2do semestre 2026" (los JSON ya son 2026S2 — OK).
4. Gate de siempre (lint + tsc + vitest + build) + audit de hrefs de out/ antes de push.

### FASE B — Indexación y expansión (semanas 1–4)
1. GSC: submit de sitemap.xml + sitemap-sueldo.xml; solicitud de indexación para home, /sueldo/, 5 calculadoras top, 10 guías y 10 montos (en ambas propiedades si existen).
2. Bing Webmaster Tools: importar desde GSC.
3. Wave de guías nuevas (8–10, sistema block-based, cada una linkeando 2–4 calculadoras):
   - "Aguinaldo diciembre 2026: fechas y cómo se calcula" (publicar YA para indexar antes del pico de noviembre).
   - "Feriados 2027 en Argentina: calendario completo" (el motor de feriados ya calcula 2027 → tabla generada en build).
   - "Sueldo empleado de comercio 2026: escala y neto" (solo con fuente primaria).
   - Minar People Also Ask de la SERP real y convertir cada pregunta en guía o FAQ.
4. Mantener `lastModified` al día en próximo-feriado y días-habiles (consultas recurrentes mensuales).

### FASE C — Autoridad y escala (meses 1–3)
1. Tanda 2 de /sueldo/[monto] SOLO si el gate de 90 días da ≥60% indexadas. Si da menos: arreglar indexación antes de publicar más.
2. Enlaces (YMYL exige autoridad, sin spam):
   - Directorios .ar y comunidades de RRHH/contadores (el público exacto).
   - Data-PR: las tablas del motor son citables; pitch a 2–3 newsletters de RRHH/economía AR.
   - Reddit r/argentina: responder hilos de sueldos con la calculadora como herramienta, con disclosure.
3. Guías por convenio ("sueldo [convenio] 2026") — escalar solo con fuente primaria scrapeable.
4. AI-SEO (AI Overviews/ChatGPT): cubierta por answer-first + JSON-LD limpio; FAQs con respuesta directa de 2 líneas + fuente.

### FASE D — Mantenimiento (ya existe, verificarlo vivo)
- ARCA-watcher mensual (auto-PR): confirmar que el Action corre y que se mergean los PRs.
- Mensual en GSC: queries con impresiones altas y posición 5–15 → esas son las próximas guías/reoptimizaciones.
- Cambio de semestre (feb/ago): títulos "2026"→"2027" y regenerar; los motores actualizan las tablas solos.

## 3. KPIs y metas realistas

| Momento | Meta |
|---|---|
| +30 días | 100% de las ~24 URLs núcleo indexadas |
| +90 días | ≥60% de las 100 páginas /sueldo/ indexadas (gate de tanda 2) |
| +6 meses | Top 10 en 5+ guías long-tail; top 20 en "calculadora aguinaldo" |
| +12 meses | Top 5 en "calculadora sueldo neto" (vs BBVA/fiscal) |

Regla anti-vanidad: si a 90 días el % de indexación no da, NO se escala contenido.

## 4. Orden de ejecución

Hoy: FASE A completa → push → submit en GSC.
Semana 2: wave de guías (FASE B.3).
Mes 2 en adelante: FASE C según gates.
