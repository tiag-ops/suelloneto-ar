import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SueldoNeto.ar — Calculadora de sueldo neto y monotributo 2026",
  description:
    "Calculá tu sueldo neto con aportes e Impuesto a las Ganancias, y encontrá tu categoría de monotributo. Valores oficiales ARCA con fecha de vigencia. Gratis, sin registro.",
  keywords: [
    "calculadora sueldo neto",
    "sueldo neto argentina",
    "ganancias 2026",
    "monotributo categorias",
    "monotributo 2026",
    "calculadora monotributo",
  ],
  openGraph: {
    title: "SueldoNeto.ar — Calculadora de sueldo neto y monotributo",
    description:
      "Tu sueldo neto con aportes y Ganancias, y tu categoría de monotributo. Valores ARCA vigentes.",
    locale: "es_AR",
    type: "website",
    siteName: "SueldoNeto.ar",
  },
};

const DISCLAIMER =
  "Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal; verificá con un contador.";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">
              Sueldo<span className="text-emerald-600 dark:text-emerald-400">Neto</span>.ar
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                Sueldo neto
              </Link>
              <Link
                href="/monotributo/"
                className="hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Monotributo
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 py-6 text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
            <p>{DISCLAIMER}</p>
            <p>
              SueldoNeto.ar · {new Date().getFullYear()} · Sin cookies · Sin registro
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
