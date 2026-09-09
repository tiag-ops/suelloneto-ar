import type { ReactNode } from "react";

/**
 * Helpers JSON-LD centralizados (SEO FASE A, plan 2026-09-09).
 * Todos devuelven objetos planos; el componente <JsonLd> los serializa.
 */

const BASE = "https://sueldoneto.com.ar";

/** Componente único para emitir cualquier bloque JSON-LD. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}


/** WebSite nivel sitio (home). Sin SearchAction: la home no tiene buscador real. */
export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SueldoNeto.ar",
    url: BASE,
    inLanguage: "es-AR",
    publisher: { "@type": "Organization", name: "SueldoNeto.ar", url: BASE },
  };
}

/** Organization a nivel sitio (layout). Autor de todos los artículos. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SueldoNeto.ar",
    url: BASE,
    logo: `${BASE}/icon.svg`,
    description:
      "Calculadoras de sueldo, impuestos y trabajo para Argentina con valores oficiales ARCA y fecha de vigencia.",
    inLanguage: "es-AR",
  };
}

/** BreadcrumbList genérico. `items`: [nombre, url] en orden (url absoluta u opcional). */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      ...(url ? { item: url.startsWith("http") ? url : `${BASE}${url}` } : {}),
    })),
  };
}

/** WebApplication para calculadoras/simuladores gratuitos. */
export function webAppLd(opts: { name: string; description: string; path?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.path ? `${BASE}${opts.path}` : BASE,
    inLanguage: "es-AR",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: 0, priceCurrency: "ARS" },
    publisher: { "@type": "Organization", name: "SueldoNeto.ar", url: BASE },
  };
}

/** Pregunta/respuesta en texto plano (para JSON-LD desde secciones FAQ visibles). */
export interface Faq {
  q: string;
  a: string;
}

/** FAQPage a partir de pares {q, a} en texto plano. */
export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Article con dates + author Organization. */
export function articleLd(opts: {
  headline: string;
  datePublished: string;
  dateModified: string;
  description?: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage: "es-AR",
    author: { "@type": "Organization", name: "SueldoNeto.ar", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "SueldoNeto.ar",
      logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}${opts.path ?? "/"}` },
  };
}

/** ItemList de montos para el hub /sueldo/. */
export function itemListLd(published: { monto: number }[], netoDe?: (m: number) => string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sueldos netos por monto bruto",
    numberOfItems: published.length,
    itemListElement: published.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/sueldo/${p.monto}/`,
      name: netoDe ? `Sueldo neto de ${netoDe(p.monto)}` : `Sueldo bruto de ${p.monto}`,
    })),
  };
}

/** Wrapper que agrupa varios bloques en un solo <script> (@graph). */
export function graphLd(parts: object[]): object {
  return { "@context": "https://schema.org", "@graph": parts };
}

export type { ReactNode };
