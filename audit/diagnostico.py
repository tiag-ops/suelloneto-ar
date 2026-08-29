"""Diagnóstico visual: screenshots + dump del estado tras calcular."""
import re
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    page = browser.new_context(viewport={"width": 1280, "height": 900}, locale="es-AR").new_page()

    # HOME a fondo
    page.goto(f"{BASE}/", wait_until="domcontentloaded")
    page.wait_for_timeout(1500)
    page.locator("input").first.fill("4500000")
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(1000)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/home_tras_calcular.png", full_page=True)
    # Extraer la sección de resultados
    res = page.locator("section, div").filter(has_text="Neto").all()
    print("=== HOME: texto visible tras calcular (primeros 1200 chars) ===")
    txt = page.inner_text("body")
    i = txt.find("Neto")
    print(txt[max(0,i-200):i+600] if i>=0 else txt[:800])

    # CUIL a fondo
    page.goto(f"{BASE}/cuil/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    print("\n=== CUIL: HTML del formulario ===")
    html = page.evaluate("() => document.querySelector('main')?.innerHTML?.slice(0, 2500) || document.body.innerHTML.slice(0,2500)")
    print(html[:1500])
    page.locator("input").first.fill("12345678")
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(800)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/cuil_tras_calcular.png")
    print("\n=== CUIL tras calcular ===")
    print(page.inner_text("body")[:600])

    browser.close()
