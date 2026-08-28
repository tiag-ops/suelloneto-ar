// OG image 1200x630 con texto real "SueldoNeto.ar" (fuente bitmap 5x7 dibujada a mano)
const zlib = require("zlib");
const fs = require("fs");

const W = 1200, H = 630;

// fuente 5x7 mínima para los caracteres necesarios
const FONT = {
  S: ["01110","10001","10000","01110","00001","10001","01110"],
  u: ["00000","00000","01110","00001","00001","10001","01110"],
  e: ["00000","00000","01110","10001","11111","10000","01110"],
  l: ["00100","00100","00100","00100","00100","00100","00100"],
  d: ["00001","00001","01101","10011","10001","10001","01101"],
  o: ["00000","00000","01110","10001","10001","10001","01110"],
  N: ["10001","11001","10101","10011","10001","10001","10001"],
  t: ["00100","00100","01110","00100","00100","00100","00110"],
  ".": ["00000","00000","00000","00000","00000","00110","00110"],
  a: ["00000","00000","01110","00001","01111","10001","01111"],
  r: ["00000","00000","10110","11001","10000","10000","10000"],
};

function drawText(img, text, ox, oy, scale, color) {
  let cx = ox;
  for (const ch of text) {
    const glyph = FONT[ch];
    if (!glyph) { cx += 6 * scale; continue; }
    for (let gy = 0; gy < 7; gy++) {
      for (let gx = 0; gx < 5; gx++) {
        if (glyph[gy][gx] === "1") {
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const px = cx + gx * scale + sx;
              const py = oy + gy * scale + sy;
              if (px >= 0 && px < W && py >= 0 && py < H) {
                const i = (py * W + px) * 3;
                img[i] = color[0]; img[i+1] = color[1]; img[i+2] = color[2];
              }
            }
          }
        }
      }
    }
    cx += 6 * scale;
  }
}

// construir imagen base (mismo diseño que antes)
const img = new Uint8Array(W * H * 3);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const t = y / H;
    let r = 10 + Math.round(8 * t), g = 10 + Math.round(14 * t), b = 10 + Math.round(12 * t);
    if (y > H - 90) { r = 16; g = 185; b = 129; }
    if (140 < x && x < W-140 && 120 < y && y < H-220) { r = 24; g = 24; b = 27; }
    if (200 < x && x < W-200 && 180 < y && y < 200) { r = 235; g = 235; b = 235; }
    if (200 < x && x < W-320 && 230 < y && y < 250) { r = 80; g = 80; b = 88; }
    if (200 < x && x < W-500 && 280 < y && y < 300) { r = 80; g = 80; b = 88; }
    if (200 < x && x < 480 && 360 < y && y < 420) { r = 5; g = 150; b = 105; }
    img[i] = r; img[i+1] = g; img[i+2] = b;
  }
}

// texto: "SueldoNeto.ar" en blanco, escala 10 (70px de alto), centrado arriba de la tarjeta
const texto = "SueldoNeto.ar";
const scale = 10;
const ancho = texto.length * 6 * scale;
drawText(img, texto, Math.round((W - ancho) / 2), 30, scale, [255, 255, 255]);

// "Cálculos fiscales gratis" en verde, abajo dentro de la tarjeta

// PNG encode
const rows = [];
for (let y = 0; y < H; y++) {
  const row = Buffer.alloc(W * 3 + 1);
  row[0] = 0;
  Buffer.from(img.buffer, y * W * 3, W * 3).copy(row, 1);
  rows.push(row);
}
const raw = Buffer.concat(rows);
function chunk(typ, data) {
  const c = Buffer.concat([Buffer.from(typ), data]);
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32 ? zlib.crc32(c) : crc32(c));
  return Buffer.concat([len, c, crc]);
}
function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", (() => { const b = Buffer.alloc(13); b.writeUInt32BE(W,0); b.writeUInt32BE(H,4); b[8]=8; b[9]=2; return b; })()),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);
fs.writeFileSync("public/og-image.png", png);
console.log("og-image.png regenerada con texto:", Math.round(png.length/1024), "KB");
