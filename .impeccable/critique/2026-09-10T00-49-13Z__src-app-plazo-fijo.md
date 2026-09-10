---
target: /calculadora-plazo-fijo (src/app/plazo-fijo, /plazo-fijo/)
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-09-10T00-49-13Z
slug: src-app-plazo-fijo
---
⚠️ DEGRADED: single-context (backend de subagentes devolvió HTTP 403 "Access to model denied" en los dos spawns; Assessment A y B corrieron inline y en secuencia, con evidencia de navegador en vivo aparte)

Method: degraded — A (design review inline) · B (detector inline, exit 0)

# Design Health Score

| # | Heurística | Score | Hallazgo clave |
|---|-----------|-------|----------------|
| 1 | Visibilidad del estado | 2 | Resultado aparece sin anuncio (sin aria-live, sin H2 propio); TNA 0 devuelve $0,00 en silencio |
| 2 | Sistema / mundo real | 3 | es-AR impecable ($ 1.032.876,71), pero la misma tarjeta imprime TEA como "48.23%" con punto decimal |
| 3 | Control y libertad | 3 | Recorrido libre, sin modals; falta botón "empezar de nuevo" |
| 4 | Consistencia | 2 | Ignora los tokens propios (.input/.card/.btn/.verdict/.caption) y va con clases inline distintas |
| 5 | Prevención de errores | 2 | min=30 en días (mínimo legal, bien), pero TNA 0 y capital trivial pasan sin aviso |
| 6 | Reconocimiento > recall | 3 | Labels visibles, TNA 40 precargada, "renovar" solo aparece en modo meses |
| 7 | Flexibilidad y eficiencia | 2 | Sin presets de monto, sin chips 30/60/90, sin escenario compartible por URL |
| 8 | Estética minimalista | 3 | Limpio y focused; emoji en H1 y tarjetas-emoji de relacionadas leen template |
| 9 | Recuperación de errores | 1 | No existe un solo mensaje de error propio: inputs degradados producen resultados silenciosos |
| 10 | Ayuda y documentación | 3 | Intro explica TNA/TEA + guías ligadas; falta benchmark de tasa en la decisión |
| **Total** | | **24/40** | **Acceptable** |

# Veredicto de especificidad de diseño

**LLM**: La página es funcionalmente correcta pero visualmente intercambiable: cualquier sitio de calculadoras podría usarla sin cambiar un carácter. El único rasgo propio (Source Serif 4 editorial en headings, herencia documentada del sistema portado) aparece en el H1 y desaparece exactamente en el momento que importa: el resultado usa un text-3xl genérico sin la fuente editorial, sin tabular-nums, sin el bloque .verdict que el proyecto ya tiene diseñado y medido. El detector confirma la lectura: cero findings de slop — el problema no es exceso sino ausencia de autoría en el pico de la página.

**Scan determinista**: exit 0, 0 findings sobre page.tsx, _cliente.tsx y cuenta-recomendada.tsx. Nada que marcar como falso positivo (no hubo hits). Overlay visual omitido: no hay findings que visualizar y el navegador del sandbox no tiene canal visible al usuario; no se reclama overlay.

**Evidencia de navegador (en vivo, pages.dev/plazo-fijo/)**: happy path verificado ($1.000.000, TNA 40, 30 días → +$32.876,71, TEA 48,23% — matemática correcta), sin overflow horizontal en 390px, base 18px, dark mode con aria-label dinámico, lang es-AR.

# Impresión general

Lo que funciona: el motor, la honestidad del copy y la ligereza. Lo que no: la página trata el resultado —lo único que el visitante vino a buscar— como un recibo más. La mayor oportunidad: convertir el resultado en un momento (jerarquía, anclaje comparativo, anuncio accesible) en la página que gana el tráfico.

# Qué está funcionando

1. **Motor de cálculo sólido**: finanzas.ts puro y bien tipado; TEA anualizada de verdad (pow(1+i·d/365, 365/d)), interés simple vs compuesto según modo. Verificado en vivo contra el cálculo manual.
2. **Higiene de confianza sobre el estándar de la categoría**: disclosure de comisión con rel="sponsored" y texto transparente, disclaimer, "Sin cookies · Sin registro". En una página donde la gente decide dónde poner plata, esto pesa.
3. **Ligereza real**: estático, resultado instantáneo client-side, 18px base, cero overflow en 390px, labels en todos los campos, metadata + JSON-LD completos.

# Issues prioritarios

1. **[P1] El resultado no es un momento.** Tarjeta blanca genérica, cifra text-3xl sin serif editorial ni tabular-nums, sin H2, sin aria-live, sin ningún ancla ("¿es buen interés?"). El pico del journey está subdiseñado y el cierre es un link externo (Redito, deliberado, pero igual es el último CTA).
   **Fix**: usar .verdict + .numero-resultado (ya medidos con contraste AA en globals.css), H2 propio, aria-live="polite", y una línea ancla comparativa: "A 90 días con la misma TNA: $X".
   **Comando**: /impeccable layout (o polish)

2. **[P1] Cero guardias de entrada.** TNA=0 → "+$0,00" presentado como resultado serio; capital=$30 → "$0,99" idéntico a un cálculo real. La gente copia estas cifras para decidir. Verificado por tipeo real en el navegador.
   **Fix**: aviso inline cuando TNA=0 ("¿Te olvidaste de la tasa?") y cuando capital < ~$1.000 ("los bancos exigen mínimos"); nota del mínimo legal de 30 días.
   **Comando**: /impeccable harden

3. **[P2] Drift del design system propio.** globals.css define .input/.card/.btn/.verdict/.caption con contrastes documentados — la página va con clases inline crudas (input bg-transparent vs token bg-neutral-800 en dark, botón py-2.5 vs .btn). Inconsistencia frente a las 14 páginas hermanas + riesgo de mantenimiento.
   **Fix**: migrar _cliente.tsx a los tokens existentes.
   **Comando**: /impeccable polish

4. **[P2] Convención numérica rota en la misma tarjeta.** "TNA 40% · TEA equivalente 48.23%" usa punto decimal mientras el dinero usa coma es-AR. Además el número grande muestra centavos ($ 32.876,71) que restan lectura. En la página insignia, la gramática y el formato numérico SON diseño ("El interés ... se liquidan" → "se liquida").
   **Fix**: TEA con toLocaleString("es-AR") ("48,23%"), cifra grande sin centavos, concordancia corregida.
   **Comando**: /impeccable clarify

5. **[P2] Targets táctiles en mobile.** Chips de guías a 19px de alto (mínimo 44px). El resto (inputs 47px, botón 50px) está bien.
   **Fix**: padding en los chips, no solo texto.
   **Comando**: /impeccable adapt

# Red flags por persona

**Sam (accesibilidad)**: el resultado no se anuncia — sin aria-live, al enviar el form un lector de pantalla no dice nada salvo que tabee a la card. Sin skip-link. Sam no puede distinguir un resultado válido de un $0,00 por TNA 0. A favor: labels correctos, focus-visible definido globalmente, dark con aria-label dinámico.

**Casey (mobile, una mano)**: chips de guías de 19px de alto — target imposible para el pulgar. Resultado en y=672 dentro de un viewport de 844: visible ✓. Inputs de 47px ✓. Sin overflow a 390px ✓. Si la interrumpe una notificación y vuelve, no perdió nada (cálculo estático) ✓.

**Riley (stress test)**: TNA 0 pasa min=0 → resultado sin sentido mostrado con la misma confianza que uno real. Capital "1e10" → el sanitize (\D) lo convierte en "110" → $110 silenciosos. A favor: "1.500.000" pegado se parsea bien a 1500000 (los puntos de miles se manejan). Nada degenera el UI, todo degenera en silencio.

# Carga cognitiva

1 falla clara (jerarquía visual: el elemento más importante de la página compite de igual a igual con las tarjetas de links) + 1 borderline (memoria de trabajo: TEA se explica en la intro, lejos de la tarjeta donde aparece) → carga baja a moderada. Sin wall of options, chunking correcto, progressive disclosure real (checkbox renovar solo en meses).

# Journey emocional

Pico plano: la cifra que el visitante vino a buscar aparece con el mismo peso visual que un descargo. Cero reassurance en la decisión de plata: ningún benchmark de tasa, ninguna comparación. Peak-end con final externo (Redito). No hay valles — no hay nada molesto, simplemente no hay cima.

# Observaciones menores

- 📈 en el H1 + 🏦🎁🏖️⚖️ en las cards de relacionadas: patrón template; el resto de la identidad es más sobria.
- Sin escenario en la URL (?c=&t=&d=): ni shareable ni capturable para long-tail SEO.
- El toggle de tema está bien hecho (aria-label "Cambiar a modo oscuro" dinámico).
- El bloque CuentaRecomendada tiene disclosure impecable; hoy no renderiza (sin recomendaciones activas) — el estado vacío funciona.

# Preguntas para considerar

- ¿Y si el resultado fuera el héroe: una franja de escenarios 30/60/90/180 días con el mismo capital, recalculada al toque, tipo mini-Bloomberg de plazos?
- ¿Y si la TNA viniera precargada con la tasa real de mercado del mes (la misma que publicás en las tablas de Redito) en vez de un 40 hardcodeado? Frescura de dato = confianza.
- ¿Qué cambiaría si esta página tuviera que convencer a alguien de depositar $1.000.000 mañana?
