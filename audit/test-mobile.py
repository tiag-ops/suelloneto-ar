"""Chequeo mobile (390x844) de sueldoneto.com.ar: overflow-x, nav hamburguesa,
tamaño de fuente de párrafos, errores 4xx/5xx y consola. Screenshots en audit/screenshots/mobile/."""
import json, os, re
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
PAGES = ["/", "/sueldo/", "/sueldo/450000/", "/plazo-fijo/", "/monotributo/"]
os.makedirs("audit/screenshots/mobile", exist_ok=True)

with sync_playwright() as p:
    b = p.firefox.launch(headless=True)
    ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, locale="es-AR")
    pg = ctx.new_page()
    console_errs, bad = [], []
    pg.on("console", lambda m: console_errs.append(m.text[:160]) if m.type == "error" else None)
    pg.on("response", lambda r: bad.append((r.status, r.url)) if r.status >= 400 else None)

    out = []
    for i, path in enumerate(PAGES):
        console_errs.clear(); bad.clear()
        r = pg.goto(BASE + path, wait_until="load", timeout=45000)
        pg.wait_for_timeout(1200)
        m = pg.evaluate("""() => ({
            scrollW: document.documentElement.scrollWidth,
            clientW: document.documentElement.clientWidth,
        })""")
        btns = pg.evaluate("""() => {
            const cands = [...document.querySelectorAll('header button, nav button, button[aria-label], [class*=hamburger], [class*=menu]')];
            return cands.slice(0, 6).map(b => ({
                tag: b.tagName, aria: b.getAttribute('aria-label'),
                txt: (b.textContent || '').trim().slice(0, 24),
                visible: !!(b.offsetWidth || b.offsetHeight)
            }));
        }""")
        fs = pg.evaluate("""() => {
            const p = document.querySelector('main p, article p');
            return p ? getComputedStyle(p).fontSize : null;
        }""")
        f = f"audit/screenshots/mobile/{i:02d}" + re.sub(r"[^a-z0-9]+", "_", path.lower()) + ".png"
        pg.screenshot(path=f)
        out.append({"path": path, "status": r.status if r else None,
                    "overflow_x": m["scrollW"] > m["clientW"],
                    "scrollW": m["scrollW"], "clientW": m["clientW"],
                    "botones_header": btns, "p_font_size": fs,
                    "http_bad": list(bad), "console_errs": list(console_errs), "shot": f})
    b.close()

print(json.dumps(out, indent=1, ensure_ascii=False))
