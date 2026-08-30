import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso | SueldoNeto.ar",
  description:
    "Términos y condiciones de uso de SueldoNeto.ar: herramienta informativa gratuita de cálculo fiscal y laboral, sin garantías y sin constituir asesoramiento profesional.",
  alternates: { canonical: "/terminos/" },
};

export default function TerminosPage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Términos y Condiciones de Uso</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Última actualización: febrero 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. Aceptación</h2>
        <p>
          Al acceder y usar SueldoNeto.ar (&quot;el Sitio&quot;) aceptás estos Términos y
          Condiciones. Si no estás de acuerdo, no utilices el Sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. Qué es el Sitio</h2>
        <p>
          SueldoNeto.ar es una herramienta informática gratuita de cálculo fiscal y laboral para
          Argentina. Ofrece calculadoras (sueldo neto, Ganancias, monotributo, aguinaldo,
          vacaciones, indemnizaciones, inversiones) y contenido informativo, basados en valores
          públicos publicados por ARCA y en la legislación vigente (Ley de Contrato de Trabajo,
          Ley del Impuesto a las Ganancias, Resolución General 4003).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. Naturaleza informativa — sin asesoramiento</h2>
        <p className="rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3">
          <strong>Los resultados del Sitio son estimaciones informativas</strong> y no
          constituyen asesoramiento fiscal, contable, laboral, previsional ni legal. No crean
          relación profesional-cliente. Para decisiones reales (liquidaciones, presentaciones
          ante ARCA, juicios laborales, inversiones) consultá con un contador, abogado
          laboralista o asesor matriculado.
        </p>
        <p>
          Los valores fiscales cambian periódicamente (ARCA actualiza deducciones y escalas dos
          veces por año; los convenios colectivos pactan aumentos). Aunque actualizamos los
          datos con fuente y fecha de vigencia visibles, puede haber demoras, errores de
          transcripción o interpretaciones del método de cálculo que difieran de la liquidación
          oficial de tu empleador o de ARCA.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. Sin garantías</h2>
        <p>
          El Sitio se ofrece &quot;tal cual&quot; (&quot;as is&quot;) y &quot;según
          disponibilidad&quot;, sin garantías de exactitud, integridad, disponibilidad continua
          o aptitud para un propósito particular. No garantizamos que los cálculos coincidan con
          tu liquidación real, ni que el Sitio esté libre de interrupciones o errores.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. Limitación de responsabilidad</h2>
        <p>
          En la máxima medida permitida por la ley, SueldoNeto.ar y sus operadores no serán
          responsables por daños directos, indirectos, incidentales o consecuentes derivados del
          uso del Sitio o de decisiones tomadas con base en sus resultados (incluyendo, a título
          de ejemplo, decisiones laborales, fiscales o de inversión). Si decidís usar los
          resultados, es bajo tu propio criterio y responsabilidad.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">6. Uso aceptable</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>No uses el Sitio para actividades ilícitas ni para intentar comprometer su
            funcionamiento (scraping masivo, ataques, abuso de recursos).</li>
          <li>Podés citar y enlazar el contenido libremente, con atribución y enlace al Sitio.</li>
          <li>La reproducción total del contenido con fines comerciales requiere autorización
            previa por escrito.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">7. Propiedad intelectual</h2>
        <p>
          El nombre, diseño, código y contenido original del Sitio pertenecen a sus operadores.
          Los valores fiscales, escalas y tablas provienen de fuentes públicas oficiales (ARCA,
          BCRA, INDEC, Leyes de la Nación) que no son propiedad del Sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">8. Publicidad y enlaces de terceros</h2>
        <p>
          El Sitio puede mostrar publicidad (por ejemplo, Google AdSense) y contener enlaces a
          sitios de terceros. No controlamos ni respondemos por el contenido, políticas o
          prácticas de esos terceros. Tu interacción con ellos se rige por sus propios
          términos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">9. Modificaciones</h2>
        <p>
          Podemos modificar estos Términos, el contenido o las funciones del Sitio en cualquier
          momento. Los cambios se publican en esta página con nueva fecha de actualización. El
          uso continuado del Sitio después de un cambio implica su aceptación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">10. Ley aplicable</h2>
        <p>
          Estos Términos se rigen por las leyes de la República Argentina. Cualquier controversia
          se somete a los tribunales ordinarios competentes de la Ciudad Autónoma de Buenos
          Aires, renunciando las partes a cualquier otro fuero.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold">11. Contacto</h2>
        <p>
          Consultas sobre estos términos: sección{" "}
          <a href="/contacto/" className="underline hover:text-emerald-700">
            Contacto
          </a>
          .
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Términos y Condiciones — SueldoNeto.ar",
            inLanguage: "es-AR",
          }),
        }}
      />
    </article>
  );
}
