import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | SueldoNeto.ar",
  description:
    "Política de privacidad de SueldoNeto.ar: no recolectamos datos personales, los cálculos corren en tu navegador y no usamos cookies propias.",
  alternates: { canonical: "/privacidad/" },
};

export default function PrivacidadPage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Política de Privacidad</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Última actualización: febrero 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Resumen en una línea</h2>
        <p className="rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-3">
          <strong>SueldoNeto.ar no recolecta datos personales.</strong> No pedimos nombre, email
          ni DNI. Los cálculos ocurren íntegramente en tu navegador.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. Datos que NO recolectamos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>No pedimos registro ni cuentas de usuario.</li>
          <li>No almacenamos los sueldos, montos o parámetros que ingresás en las calculadoras:
            esos valores se procesan en tu navegador y <strong>nunca se envían a ningún
            servidor</strong>.</li>
          <li>No usamos cookies propias de seguimiento ni analytics invasivos.</li>
          <li>No vendemos ni compartimos datos personales con terceros, porque no tenemos.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. Cookies y tecnologías similares</h2>
        <p>
          El sitio funciona sin cookies propias. Usamos <code className="text-[13px]">localStorage</code>{" "}
          únicamente para recordar tu preferencia de modo claro/oscuro — es una preferencia
          estética almacenada en tu dispositivo, no un identificador, y no sale de tu navegador.
        </p>
        <p>
          Si activamos publicidad de terceros (Google AdSense) en el futuro, dichos proveedores
          pueden usar cookies propias conforme sus políticas. Google publica su política en
          policies.google.com/technologies/ads y ofrece un centro de preferencias de anuncios
          para el usuario. Esta página se actualizará si eso ocurre.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. Hosting y logs técnicos</h2>
        <p>
          El sitio está alojado en Cloudflare Pages. Como todo servidor web, Cloudflare registra
          datos técnicos de acceso (dirección IP, fecha y hora, navegador) con fines de
          seguridad y funcionamiento del servicio, conforme las políticas de Cloudflare
          (cloudflare.com/privacypolicy). Estos logs no son utilizados por SueldoNeto.ar para
          identificar visitantes ni perfilar usuarios.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. Tus derechos (Ley 25.326, Argentina)</h2>
        <p>
          La Ley N° 25.326 de Protección de los Datos Personales regula el tratamiento de datos
          en Argentina. Dado que no tratamos datos personales, no existe base de datos a la cual
          acceder, rectificar o suprimir. Si en algún momento eso cambiara, actualizaremos esta
          política y cumpliremos con las obligaciones de la ley y del régimen de la dirección
          Nacional de Protección de Datos Personales.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          El titular de los datos podrá en todo momento ejercer los derechos de acceso,
          rectificación y supresión de los datos conforme lo establecido en el artículo 14 de la
          Ley N° 25.326.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. Menores</h2>
        <p>
          El sitio está dirigido a personas adultas con actividad laboral o económica. No
          recopilamos datos de menores de edad.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">6. Cambios en esta política</h2>
        <p>
          Si modificamos esta política (por ejemplo, si agregáramos analytics o publicidad),
          publicaremos la versión actualizada en esta misma página con nueva fecha de
          actualización.
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-semibold">7. Contacto</h2>
        <p>
          Consultas sobre privacidad: <Link href="/contacto/" className="underline hover:text-emerald-700">página de contacto</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Política de Privacidad — SueldoNeto.ar",
            inLanguage: "es-AR",
          }),
        }}
      />
    </article>
  );
}
