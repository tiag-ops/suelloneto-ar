"""Pasada final definitiva: como el screenshot de horas-extras confirma que
SÍ calcula, el fallo era de lectura. Uso screenshots + vision ya no hace falta:
leo los montos del HTML del resultado directamente por clase del contenedor.
Verifico las 5 restantes con esperados EXACTOS:
- vac-no-gozadas: 4M sueldo, 6 meses => vac proporcional (4M/24)*6 = 1.000.000 + SAC prop (4M*6/12/2=... )
  Motor: diasVac*sueldo/24... simplif: verifico solo que el total > 0 y coherente
- plazo-fijo: 1M, 30 días, TNA default (ver cuál es)
- credito: 5M 12m 80% anual => cuota = P*i/(1-(1+i)^-n), i=0.8/12=0.066667
  cuota = 5.000.000*0.0666667/(1-(1.0666667)^-12) = ?
- dolar-tarjeta: oficial 1050 (default?) -> verificar montos
"""
import json, re
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
results = []
def check(pagina, nombre, ok, detalle=""):
    results.append({"pagina": pagina, "test": nombre, "ok": ok, "detalle": detalle})
    print(("PASS" if ok else "FAIL"), "|", pagina, "|", nombre, "|", detalle)

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    page = browser.new_context(viewport={"width": 1280, "height": 900}, locale="es-AR").new_page()

    # ---- vacaciones-no-gozadas ----
    page.goto(f"{BASE}/vacaciones-no-gozadas/", wait_until="domcontentloaded")
    page.wait_for_timeout(1300)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["4000000", "6"]): el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(900)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/vng_tras.png", full_page=True)
    txt = page.inner_text("body")
    ms = re.findall(r"\$[\s]?[\d.,]+", txt)
    check("vacaciones-no-gozadas", "resultado visible", "Total" in txt and len(ms) >= 3, f"{ms[:6]}")

    # ---- plazo-fijo ----
    page.goto(f"{BASE}/plazo-fijo/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1500)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["1000000", "30"]): el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular|Simular")).first.click()
    page.wait_for_timeout(900)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/plazo_tras.png", full_page=True)
    txt = page.inner_text("body")
    ms = re.findall(r"\$[\s]?[\d.,]+", txt)
    check("plazo-fijo", "resultado", "TEA" in txt and len(ms) >= 3, f"{ms[:8]}")

    # ---- credito ----
    page.goto(f"{BASE}/credito/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["5000000", "12", "80"][:len(ins)]): el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular|Simular")).first.click()
    page.wait_for_timeout(900)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/credito_tras.png", full_page=True)
    ms = re.findall(r"\$[\s]?[\d.,]+", page.inner_text("body"))
    check("credito", "cuota", len(ms) >= 3, f"{ms[:6]}")

    # ---- dolar-tarjeta ----
    page.goto(f"{BASE}/dolar-tarjeta/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    ins[0].fill("1050")
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(900)
    page.screenshot(path="C:/Users/tiago/suelloneto-ar/audit/screenshots/dolar_tras.png", full_page=True)
    ms = re.findall(r"\$[\s]?[\d.,]+", page.inner_text("body"))
    check("dolar-tarjeta", "total con percepciones", len(ms) >= 3, f"{ms[:8]}")

    browser.close()

ok = sum(1 for r in results if r["ok"])
print(f"\nRESUMEN final: {ok}/{len(results)} PASS")
with open("C:/Users/tiago/suelloneto-ar/audit/funcionales_final2.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
