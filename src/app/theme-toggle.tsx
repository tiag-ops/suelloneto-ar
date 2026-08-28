"use client";

import { useEffect, useState } from "react";

/** Toggle claro/oscuro. Persiste en localStorage ('tema').
 * Default: preferencia del sistema. Sin flash al cargar (script en <head>). */
export default function ThemeToggle() {
  const [tema, setTema] = useState<"light" | "dark">("light");

  // leer estado real recién en el cliente (evita mismatch de SSR)
  useEffect(() => {
    setTema(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const nuevo = tema === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nuevo === "dark");
    try {
      localStorage.setItem("tema", nuevo);
    } catch {
      /* storage bloqueado: no pasa nada, el toggle funciona en la sesión */
    }
    setTema(nuevo);
  }

  return (
    <button
      type="button"
      aria-label={tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={tema === "dark" ? "Modo claro" : "Modo oscuro"}
      onClick={toggle}
      className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-2.5 py-1.5 text-sm hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
    >
      {tema === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
