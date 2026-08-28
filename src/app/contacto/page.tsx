import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | SueldoNeto.ar",
  description:
    "Contactá al equipo de SueldoNeto.ar: reportar errores de cálculo, sugerir calculadoras o consultas sobre el sitio.",
  alternates: { canonical: "/contacto/" },
};

export default function ContactoPage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed max-w-2xl">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Contacto</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Leemos todo, aunque no podemos responder a todos.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Errores de cálculo o datos desactualizados</h2>
        <p>
          Si detectás un resultado que no coincide con tu liquidación oficial o con los valores
          publicados por ARCA, es lo que más nos interesa. Escribinos a{" "}
          <a href="mailto:errores@sueldoneto.com.ar" className="underline hover:text-emerald-600">
            errores@sueldoneto.com.ar
          </a>{" "}
          con: el monto que ingresaste, el resultado que te dio el sitio y el resultado oficial
          que esperabas. Los reportes verificables se corrigen en horas.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Sugerencias de calculadoras</h2>
        <p>
          ¿Falta una calculadora que usarías? Sugerencias a{" "}
          <a href="mailto:ideas@sueldoneto.com.ar" className="underline hover:text-emerald-600">
            ideas@sueldoneto.com.ar
          </a>
          . Priorizamos por demanda y viabilidad con datos oficiales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Publicidad y prensa</h2>
        <p>
          Consultas comerciales:{" "}
          <a href="mailto:hola@sueldoneto.com.ar" className="underline hover:text-emerald-600">
            hola@sueldoneto.com.ar
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Lo que NO podemos responder</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Consultas fiscales o laborales personalizadas</strong> (&quot;cuánto me
            corresponde en mi caso&quot;, &quot;mi empleador no me paga&quot;): no brindamos
            asesoramiento — para eso, un contador o laboralista matriculado.
          </li>
          <li>
            <strong>Trámites ante ARCA, Anses o tu empleador</strong>: no tenemos relación con
            organismos oficiales ni acceso a tus datos.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Sin formularios con tus datos</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Coherente con nuestra{" "}
          <a href="/privacidad/" className="underline hover:text-emerald-600">
            política de privacidad
          </a>
          : preferimos un email directo a un formulario que almacene tus datos.
        </p>
      </section>
    </article>
  );
}
