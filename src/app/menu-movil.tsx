"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CALCULADORAS, GUIAS, urlDe } from "@/lib/calculadoras";

/** Menú hamburguesa con sidebar desplegable (solo mobile: sm:hidden).
 *  A11y: aria-expanded/controls, foco al primer link, Escape cierra, bloquea scroll,
 *  overlay cierra, foco vuelve al botón. */
export default function MenuMovil() {
  const [abierto, setAbierto] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const panel = document.getElementById("panel-menu-movil");
    panel?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      btnRef.current?.focus();
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setAbierto(true)}
        aria-label="Abrir menú"
        aria-expanded={abierto}
        aria-controls="panel-menu-movil"
        className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:hidden"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {abierto && (
        <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAbierto(false)}
            aria-hidden="true"
          />
          <div
            id="panel-menu-movil"
            className="absolute right-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto border-l border-neutral-200 bg-white p-5 shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="caption font-semibold uppercase tracking-wide">Menú</span>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar menú"
                className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Navegación móvil" className="space-y-5">
              <section>
                <p className="caption mb-2 font-semibold uppercase tracking-wide">Sitio</p>
                <ul className="space-y-1">
                  {[
                    { href: "/", titulo: "Inicio" },
                    { href: "/monotributo/", titulo: "Monotributo 2026" },
                    { href: "/guia/sueldo-bruto-a-neto/", titulo: "Guías" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setAbierto(false)}
                        className="block rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
                      >
                        {l.titulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="caption mb-2 font-semibold uppercase tracking-wide">Calculadoras</p>
                <ul className="space-y-1">
                  {CALCULADORAS.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={urlDe(c.slug)}
                        onClick={() => setAbierto(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                      >
                        <span aria-hidden>{c.icono}</span>
                        <span>{c.titulo}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="caption mb-2 font-semibold uppercase tracking-wide">Guías</p>
                <ul className="space-y-1">
                  {GUIAS.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guia/${g.slug}/`}
                        onClick={() => setAbierto(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-emerald-700 hover:bg-neutral-100 hover:underline dark:text-emerald-300 dark:hover:bg-neutral-900"
                      >
                        📖 {g.titulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <p className="caption border-t border-neutral-200 pt-3 dark:border-neutral-800">
                <Link href="/privacidad/" onClick={() => setAbierto(false)} className="underline hover:text-emerald-700 dark:hover:text-emerald-300">
                  Privacidad
                </Link>
                {" · "}
                <Link href="/terminos/" onClick={() => setAbierto(false)} className="underline hover:text-emerald-700 dark:hover:text-emerald-300">
                  Términos
                </Link>
                {" · "}
                <Link href="/contacto/" onClick={() => setAbierto(false)} className="underline hover:text-emerald-700 dark:hover:text-emerald-300">
                  Contacto
                </Link>
              </p>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
