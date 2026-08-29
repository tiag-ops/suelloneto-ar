"""¿El submit con Enter dispara algo? Dump de estado tras Enter en horas-extras
+ comparación con la home que SÍ funciona. Foco: ¿el resultado aparece pero en
un contenedor que inner_text no ve, o realmente no calcula?"""
import re
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    page = browser.new_context(viewport={"width": 1280, "height": 900}, locale="es-AR").new_page()

    page.goto(f"{BASE}/horas-extras/", wait_until="domcontentloaded")
    page.wait_for_timeout(1500)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["4000000", "10"]):
        el.fill(v)
    print("valores puestos:", [i.input_value() for i in ins])
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/horas_extras_antes.png")
    # click en el botón REAL (por rol y texto exacto)
    btn = page.get_by_role("button", name=re.compile("Calcular"))
    print("botones Calcular:", btn.count())
    btn.first.click()
    page.wait_for_timeout(1000)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/horas_extras_tras_calcular.png", full_page=True)
    txt = page.inner_text("body")
    # dump de la parte de resultados
    print("=== body tras click (1500 chars desde 'Resultado') ===")
    i = txt.lower().find("resultado")
    print(txt[i:i+1500] if i >= 0 else txt[500:2000])
    browser.close()
