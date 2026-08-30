import type { Metadata } from "next";
import Pagina from "./_cliente";

export const metadata: Metadata = {
  title: "Calculadora de CUIL: cuál es mi CUIL por DNI | SueldoNeto.ar",
  description: "Calculá tu CUIL con tu DNI y género: algoritmo oficial AFIP módulo 11, con el caso especial de prefijo 23. Verificador incluido.",
  keywords: ["calculadora cuil", "mi cuil", "como sacar mi cuil", "cuil por dni"],
  alternates: { canonical: "/cuil/" },
};

export default function PaginaCuil() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">🆔 Calculadora de CUIL</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Conocé el número de CUIL que te corresponde según tu DNI. Es el cálculo matemático oficial: el número real se asigna cuando te inscribes en ARCA/Anses.</p>
      </header>
      <Pagina />
    </div>
  );
}
