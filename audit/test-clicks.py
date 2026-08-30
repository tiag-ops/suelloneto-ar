# Reproduce el flujo del usuario tras el fix: clics SPA y verificación de URL final + contenido.
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    page = browser.new_page()
    errores = []
    page.on("response", lambda r: errores.append((r.status, r.url)) if r.status >= 400 else None)

    def estado(etiqueta):
        h1 = ""
        try:
            h1 = page.locator("h1").first.inner_text(timeout=3000)
        except Exception:
            h1 = "<sin h1>"
        ok = "✅" if "<sin h1" not in h1 else "❌"
        print(f"{ok} {etiqueta}")
        print(f"     URL: {page.url}")
        print(f"     H1 : {h1[:60]}")

    page.goto(BASE + "/", wait_until="load")
    estado("home cargada")

    page.click("a[href='/sueldo/']", timeout=10000)
    page.wait_for_timeout(2500)
    estado("clic en 'Ver todos los montos'")

    n = page.locator("a[href^='/sueldo/']").count()
    print(f"     links a montos visibles: {n}")

    href = page.locator("a[href^='/sueldo/']").first.get_attribute("href", timeout=5000)
    page.click(f"a[href='{href}']", timeout=10000)
    page.wait_for_timeout(2500)
    estado(f"clic en el monto {href}")

    # F5 sobre lo que quedó en la barra
    page.reload(wait_until="load")
    estado("F5 sobre esa URL")

    browser.close()

print()
if errores:
    print("RESPUESTAS >=400 durante la sesión:")
    for s, u in errores[:10]:
        print(f"  {s} {u}")
else:
    print("✅ CERO respuestas 4xx/5xx en toda la sesión de clics")
