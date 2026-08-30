// Post-build (se corre después de `next build`):
// 1) Copia los payloads RSC anidados del export a su ruta PLANA, que es la que
//    pide el router cliente (convención de Vercel: /ruta/__next.seg.$var.__PAGE__.txt).
//    Sin esto, cada prefetch/navegación SPA da 404 en consola con CF Pages.
// 2) Genera out/_redirects con 301 de toda URL sin barra final hacia su versión con barra.
import { readdirSync, statSync, existsSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join, relative, dirname, sep } from "node:path";

const OUT = new URL("../out", import.meta.url).pathname.replace(/^\/([A-Za-z]):/, "$1:");

const reglas301 = [];
let copiados = 0;

function aplanarArchivo(dir, nombreDir) {
  // copia <dir>/<nombreDir>/[<sub>/]__PAGE__.txt a <dir>/__next.<x>.<sub>.__PAGE__.txt
  const sub = join(dir, nombreDir);
  for (const f of readdirSync(sub)) {
    const p = join(sub, f);
    if (statSync(p).isDirectory()) {
      for (const g of readdirSync(p)) {
        if (g === "__PAGE__.txt") {
          const destino = join(dir, `__next.${nombreDir.slice("__next.".length)}.${f}.__PAGE__.txt`);
          copyFileSync(join(p, g), destino);
          copiados++;
        }
      }
    } else if (f === "__PAGE__.txt") {
      const destino = join(dir, `__next.${nombreDir.slice("__next.".length)}.__PAGE__.txt`);
      copyFileSync(p, destino);
      copiados++;
    }
  }
}

function scan(dir) {
  const archivos = readdirSync(dir);
  if (archivos.includes("index.html")) {
    const rel = relative(OUT, dir).split(sep).join("/");
    for (const a of archivos) {
      if (a.startsWith("__next.") && statSync(join(dir, a)).isDirectory()) {
        aplanarArchivo(dir, a);
      }
    }
    if (rel) reglas301.push(`/${rel} /${rel}/ 301`);
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
  reglas301.push("/sueldo /sueldo/ 301");
  writeFileSync(
    join(OUT, "_redirects"),
    `# Generado por scripts/gen-redirects.mjs — no editar a mano\n${reglas301.join("\n")}\n`,
  );
  console.log(`post-build: ${copiados} payloads RSC aplanados + ${reglas301.length} reglas 301`);
} else {
  console.error("ERROR: out/ no existe — correr next build primero");
  process.exit(1);
}
