"""Prueba drawer mobile: clickea 'Abrir menú', verifica que abre, navega por un link, sin 4xx."""
import json
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
with sync_playwright() as p:
    b = p.firefox.launch(headless=True)
    ctx = b.new_context(viewport={"width": 390, "height": 844}, locale="es-AR")
    pg = ctx.new_page()
    bad = []
    pg.on("response", lambda r: bad.append((r.status, r.url)) if r.status >= 400 else None)

    pg.goto(BASE + "/", wait_until="load")
    pg.wait_for_timeout(800)

    # párrafos y su tamaño efectivo
    ps = pg.evaluate("""() => [...document.querySelectorAll('main p')].slice(0, 6).map(p => ({
        fs: getComputedStyle(p).fontSize,
        cls: (p.className || '').toString().slice(0, 60),
        txt: (p.textContent || '').trim().slice(0, 50)
    }))""")

    # click hamburguesa
    btn = pg.get_by_role("button", name="Abrir menú")
    btn.click()
    pg.wait_for_timeout(600)
    drawer = pg.evaluate("""() => {
        const navs = [...document.querySelectorAll('nav, [role=dialog], aside')];
        const vis = navs.filter(n => !!(n.offsetWidth || n.offsetHeight));
        return vis.map(n => ({cls: (n.className||'').toString().slice(0,50), links: n.querySelectorAll('a').length}));
    }""")
    pg.screenshot(path="audit/screenshots/mobile/99_drawer.png")

    # click primer link del drawer
    link = pg.locator("nav a:visible, [role=dialog] a:visible, aside a:visible").first
    href = link.get_attribute("href")
    link.click()
    pg.wait_for_load_state("load")
    pg.wait_for_timeout(800)
    url_final = pg.url
    h1 = pg.evaluate("() => document.querySelector('h1')?.textContent?.slice(0,60) || null")

    b.close()

print(json.dumps({"parrafos": ps, "drawer_visible": drawer, "link_href": href,
                  "url_final": url_final, "h1": h1, "http_bad": bad}, indent=1, ensure_ascii=False))
