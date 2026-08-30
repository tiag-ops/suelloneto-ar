// Genera out/_redirects con una regla 301 por cada página estática exportada,
// para que las URLs SIN barra final (tipeadas, pegadas o indexadas así)
// redirijan a la versión con barra (trailingSlash: true del sitio).
// Se ejecuta DESPUÉS de `next build`; escanea out/ buscando index.html.
import { readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out", import.meta.url).pathname.replace(/^\/([A-Za-z]):/, "$1:");

const reglas = [];

function scan(dir) {
  const archivos = readdirSync(dir);
  if (archivos.includes("index.html")) {
    const rel = relative(OUT, dir).split(sep).join("/");
    if (rel && rel !== "") {
      reglas.push(`/${rel} /${rel}/ 301`);
    }
  }
  for (const a of archivos) {
    const p = join(dir, a);
    if (statSync(p).isDirectory() && !a.startsWith("_next") && !a.startsWith("__next")) {
      scan(p);
    }
  }
}

if (existsSync(OUT)) {
  scan(OUT);
  reglas.push("/sueldo /sueldo/ 301");
  const contenido = `# Generado por scripts/gen-redirects.mjs — no editar a mano\n${reglas.join("\n")}\n`;
  writeFileSync(join(OUT, "_redirects"), contenido);
  console.log(`_redirects: ${reglas.length} reglas 301 generadas`);
} else {
  console.error("ERROR: out/ no existe — correr next build primero");
  process.exit(1);
}
