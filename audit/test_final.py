"""Pasada final: el patrón del diagnóstico es claro — el clic en 'Calcular' solo
dispara el cálculo si el FORM hace submit (Enter) o si el botón es type=submit.
En la home funcionó (screenshot muestra desglose). En las demás el click puede
no estar disparando la acción si el botón está fuera del form o usa onSubmit.
Pruebo presionando Enter en el input (submit del form) en vez de click.
"""
import json, re, sys
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
results = []
def check(pagina, nombre, ok, detalle=""):
    results.append({"pagina": pagina, "test": nombre, "ok": ok, "detalle": detalle})
    print(("PASS" if ok else "FAIL"), "|", pagina, "|", nombre, "|", detalle)

def probar(page, ruta, valores, esperados, extra_check=None):
    page.goto(f"{BASE}/{ruta}/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, valores):
        el.fill(v)
    # submit con Enter (forma real del usuario)
    ins[0].press("Enter")
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = re.findall(r"\$[\d.,]+", txt)
    ok = len(ms) >= 2 and all(e in txt for e in esperados)
    check(ruta, f"calcula y muestra {esperados}", ok, f"montos: {ms[:8]}")

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    page = browser.new_context(viewport={"width": 1280, "height": 900}, locale="es-AR").new_page()

    # vac-no-gozadas: 4M, 6 meses => (4M/24)*6 + SAC prop... motor dice: meses/12 * (sueldo*days/24)?
    page.goto(f"{BASE}/vacaciones-no-gozadas/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["4000000", "6"]): el.fill(v)
    ins[0].press("Enter")
    page.wait_for_timeout(700)
    ms = re.findall(r"\$[\d.,]+", page.inner_text("body"))
    check("vacaciones-no-gozadas", "calcula", len(ms) >= 2, f"{ms[:6]}")

    # horas-extras
    page.goto(f"{BASE}/horas-extras/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["4000000", "10"]): el.fill(v)
    ins[0].press("Enter")
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = re.findall(r"\$[\d.,]+", txt)
    # hora simple: 4M/200 = 20.000; extra 50% = 30.000; extra 100% = 40.000
    check("horas-extras", "hs extra 50% = 30.000 (4M/200*1.5)", "30.000" in txt, f"{ms[:8]}")

    # plazo-fijo: usar TNA que muestra el label (tercer input es plazo)
    page.goto(f"{BASE}/plazo-fijo/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1500)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    print("plazo-fijo inputs:", len(ins))
    for el, v in zip(ins, ["1000000", "30"]):
        el.fill(v)
    # puede haber un TNA default; no lo toco
    page.locator("input").first.press("Enter")
    page.wait_for_timeout(700)
    ms = re.findall(r"\$[\d.,]+", page.inner_text("body"))
    check("plazo-fijo", "calcula interés + TEA", len(ms) >= 2 and "TEA" in page.inner_text("body"), f"{ms[:8]}")

    # credito
    page.goto(f"{BASE}/credito/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["5000000", "12", "80"][:len(ins)]):
        el.fill(v)
    ins[0].press("Enter")
    page.wait_for_timeout(700)
    ms = re.findall(r"\$[\d.,]+", page.inner_text("body"))
    check("credito", "cuota sistema francés", len(ms) >= 3, f"{ms[:8]}")

    # dolar-tarjeta
    page.goto(f"{BASE}/dolar-tarjeta/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    for el, v in zip(ins, ["1050", "45", "0"]):
        if el == ins[0]: el.fill(v)
    # llenar solo el primero (dólar oficial), percepciones tienen defaults
    ins[0].fill("1050")
    ins[0].press("Enter")
    page.wait_for_timeout(700)
    ms = re.findall(r"\$[\d.,]+", page.inner_text("body"))
    check("dolar-tarjeta", "calcula total con percepciones", len(ms) >= 2, f"{ms[:8]}")

    browser.close()

ok = sum(1 for r in results if r["ok"])
print(f"\nRESUMEN pasada 3b: {ok}/{len(results)} PASS")
with open("C:/Users/tiago/suelloneto-ar/audit/funcionales_final.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
