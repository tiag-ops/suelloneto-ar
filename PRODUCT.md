# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

*(inferido del repo y del brief de sesión — confirmar en próxima revisión)*
Asalariado en relación de dependencia y público general de Argentina que googlea una duda puntual ("cuánto me queda", "cuánto gana un plazo fijo de $1.000.000") y quiere una cifra confiable ya, sin registro. Ingreso mayoritario por búsqueda orgánica.

## Product Purpose

SueldoNeto.ar es una suite de ~15 calculadoras financieras, laborales y de impuestos para Argentina (sueldo neto con Ganancias método doceava, aguinaldo, vacaciones, horas extras, indemnización, monotributo, plazo fijo, crédito, dólar tarjeta, CUIL, feriados). Éxito medible: posiciones en Google y tráfico orgánico a las calculadoras; cada página es también un punto de entrada cruzado al resto del sitio.

## Positioning

*(inferido)* Cálculo local y actualizado: valores oficiales ARCA/AFIP con fecha de vigencia, es-AR rioplatense,gratis y sin cookies ni registro, con disclosure transparente de afiliados. Frente a portales financieros genéricos o bancas, la promesa es la cifra exacta y la referencia legal (art. LCT citado) que nadie más muestra tan directo.

## Operating Context

- Deploy: Cloudflare Pages (repo github.com/tiag-ops/suelloneto-ar → suelloneto-ar.pages.dev; dominio propio sueldoneto.com.ar).
- Next.js static (output export), build verificado con `npm run lint` + `npm run build`.
- Contenido sujeto a valores oficiales que cambian por período (ARCA, monotributo 01/08/2026, Ley 27.399 feriados): cada cambio normativo es un refresh de datos.

## Capabilities and Constraints

- Español rioplatense (lang es-AR, voseo) obligatorio; el formato monetario es es-AR ($ 1.032.876,71) y debe ser consistente dentro de cada tarjeta.
- Token a11y del design system en globals.css (.card/.input/.btn/.verdict/.caption/.badge/.warning/.numero-resultado) con contrastes AA documentados; base 18px; dark mode por clase con script anti-flash; prefers-reduced-motion respetado.
- Monetización: afiliados fintech con rel="sponsored" y disclosure ("es lo que mantiene las calculadoras gratis") + donación Mercado Pago. Sin cookies, sin registro.
- Cross-linking editorial: bloque "Calculadoras relacionadas" + "Guías" al pie de cada calculadora;	link externo de autor a Redito.ar (mismo autor) es deliberado, no eliminar sin consultar.
- Terminología no negociable: TNA/TEA explicadas en lenguaje llano, arts. LCT citados cuando aplica.

## Brand Commitments

- Tipo: Inter (UI) + Source Serif 4 editorial (headings y cifras grandes), sistema portado de Maternidad.ar.
- Acento emerald; fondos neutrales; sobriedad sobre decoración.
- Emoji solo como icono de categoría en listados (📈🎁🏖️), no en copy de resultado.

## Evidence on Hand

- Copy y disclosures reales en src/app/layout.tsx (disclaimer ARCA, link MP), src/components/cuenta-recomendada.tsx (disclosure de comisión).
- Snippets SEO: JSON-LD WebApplication/Article+FAQ/Breadcrumb/ItemList/WebSite (commit 17429ec), sitemap con fechas reales.
- No hay testimonials, benchmarks de terceros ni claims de audiencia medidos: no inventar.

## Product Principles

1. La cifra es el héroe: toda página existe para entregar un número confiable en el menor número de pasos.
2. Confianza por transparencia: fuentes citadas, vigencia visible, afiliados declarados.
3. Liviano y accesible: estático, AA de base, funciona en el phone de la mano.
4. es-AR impecable: voseo, formatos numéricos y terminología financiera argentina sin mezclas.

## Accessibility & Inclusion

*(estándar del sistema portado)* WCAG 2.1 AA como piso: contraste documentado por token, focus-visible global, labels en todos los inputs, targets táctiles de 44px mínimo, base 18px. Resultados dinámicos deben anunciarse (aria-live) para lectores de pantalla.
