import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { themeScript } from "./theme-script";
import ThemeToggle from "./theme-toggle";
import MenuMovil from "./menu-movil";
import icono from "./icon.svg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serifEditorial = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sueldoneto.com.ar"),
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
    url: "https://sueldoneto.com.ar",
    type: "website",
    siteName: "SueldoNeto.ar",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SueldoNeto.ar — calculadoras de sueldo neto y monotributo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SueldoNeto.ar",
    description: "Calculadoras de sueldo neto, monotributo y trabajo. Valores ARCA vigentes.",
    images: ["/og-image.png"],
  },
};

const DISCLAIMER =
  "Herramienta informativa. Los valores provienen de ARCA y se muestran con fecha de vigencia. No constituye asesoramiento fiscal; verificá con un contador.";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`h-full antialiased ${inter.variable} ${serifEditorial.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <Image src={icono} alt="" width={22} height={22} className="rounded-md" />
              <span>Sueldo<span className="acento">Neto</span>.ar</span>
            </Link>
            <div className="flex items-center gap-3">
              <nav className="hidden gap-4 text-sm sm:flex" aria-label="Navegación principal">
                <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-300">
                  Inicio
                </Link>
                <Link
                  href="/monotributo/"
                  className="hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Monotributo
                </Link>
                <Link
                  href="/guia/sueldo-bruto-a-neto/"
                  className="hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Guías
                </Link>
              </nav>
              <ThemeToggle />
              <MenuMovil />
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="caption mx-auto max-w-3xl space-y-1 px-4 py-6">
            <p>{DISCLAIMER}</p>
            <p className="flex flex-wrap gap-x-3 gap-y-1">
              <Link href="/privacidad/" className="underline hover:text-emerald-700 dark:hover:text-emerald-300">
                Privacidad
              </Link>
              <Link href="/terminos/" className="underline hover:text-emerald-700 dark:hover:text-emerald-300">
                Términos
              </Link>
              <Link href="/contacto/" className="underline hover:text-emerald-700 dark:hover:text-emerald-300">
                Contacto
              </Link>
              <span aria-hidden>·</span>
              <span>
                SueldoNeto.ar · {new Date().getFullYear()} · Sin cookies · Sin registro
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
