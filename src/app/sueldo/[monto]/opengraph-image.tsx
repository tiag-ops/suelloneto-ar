import { ImageResponse } from "next/og";
import { calcularSueldo } from "@/lib/ganancias";
import { formatARS } from "@/lib/format";
import { PUBLICADAS } from "@/lib/programatico/montos";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sueldo neto calculado con SueldoNeto.ar";
// Requerido por output: "export" (igual que sitemap.ts / robots.ts)
export const dynamic = "force-static";
export const dynamicParams = false;

// En Next 16 los params de la página no se propagan a la ruta de imagen:
// necesita sus propios paths.
export function generateStaticParams() {
  return PUBLICADAS.map((m) => ({ monto: String(m.monto) }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ monto: string }>;
}) {
  const { monto } = await params;
  const n = Number(monto);
  const desglose = calcularSueldo({ sueldoBruto: n, conyuge: false, hijos: 0, hijosDiscapacidad: 0 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, opacity: 0.85 }}>SueldoNeto.ar</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginTop: 24 }}>
          Bruto {formatARS(n)}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginTop: 8, color: "#a7f3d0" }}>
          Neto {formatARS(desglose.neto)}
        </div>
        <div style={{ display: "flex", fontSize: 32, opacity: 0.85, marginTop: 32 }}>
          Aportes y Ganancias con valores ARCA vigentes
        </div>
      </div>
    ),
    { ...size },
  );
}
