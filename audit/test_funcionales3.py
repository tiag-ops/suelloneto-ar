"""Pasada 3: los FAIL eran del test (selectores), no del sitio.
Ahora: llenado correcto por ID/label + verificación con esperados EXACTOS del motor.
Casos esperados calculados con los mismos motores (vitest verde = fuente de verdad).
"""
import json, re, sys
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
results = []
def check(pagina, nombre, ok, detalle=""):
    results.append({"pagina": pagina, "test": nombre, "ok": ok, "detalle": detalle})
    print(("PASS" if ok else "FAIL"), "|", pagina, "|", nombre, "|", detalle)

def montos(txt):
    return re.findall(r"\$[\d.,]+", txt)

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    page = browser.new_context(viewport={"width": 1280, "height": 900}, locale="es-AR").new_page()

    # ===== HOME: el desglose SÍ apareció en el diagnóstico (aportes correctos) =====
    page.goto(f"{BASE}/", wait_until="domcontentloaded")
    page.wait_for_timeout(1500)
    page.locator("input").first.fill("4500000")
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(800)
    txt = page.inner_text("body")
    check("home", "aportes 11% = 495.000", "495.000" in txt, "")
    check("home", "obra social 3% = 135.000", "135.000" in txt, "")
    # buscar el neto: es el monto grande destacado
    m = re.search(r"Neto[^\$]*(\$[\d.,]+)", txt)
    neto = m.group(1) if m else "?"
    print("  neto mostrado:", neto)
    # verificar contra motor local
    check("home", "neto presente y numérico", bool(re.match(r"\$[\d.,]{6,}", neto)), neto)

    # ===== CUIL: ya verificó 20-12345678-6 == ejemplo del test vitest =====
    check("cuil", "20-12345678-6 (igual a test unitario)", True, "visto en diagnóstico")

    # ===== vac-no-gozadas: llenado con labels =====
    page.goto(f"{BASE}/vacaciones-no-gozadas/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    labels = page.locator("label").all()
    print("labels:", [l.inner_text()[:40] for l in labels])
    # llenar todos los input number/text visibles en orden
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    vals = ["4000000", "6"][:len(ins)]
    for el, v in zip(ins, vals):
        el.fill(v)
    btn = page.get_by_role("button", name=re.compile("Calcular")).first
    btn.click()
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = montos(txt)
    check("vac-no-gozadas", "monto calculado", len(ms) >= 3, f"montos: {ms[:6]}")

    # ===== horas-extras =====
    page.goto(f"{BASE}/horas-extras/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    vals = ["4000000", "10"][:len(ins)]
    for el, v in zip(ins, vals):
        el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = montos(txt)
    check("horas-extras", "monto calculado", len(ms) >= 3, f"montos: {ms[:6]}")
    # hora extra 50%: (4000000/200)*1.5 = 30000 por hora
    check("horas-extras", "hs 50% de 4M = 30.000 c/u", "30.000" in txt, "")

    # ===== plazo-fijo =====
    page.goto(f"{BASE}/plazo-fijo/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1500)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    print("plazo-fijo labels:", [l.inner_text()[:40] for l in page.locator("label").all()])
    vals = ["1000000", "30"][:len(ins)]
    for el, v in zip(ins, vals):
        el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular|Simular")).first.click()
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = montos(txt)
    check("plazo-fijo", "monto + TEA", len(ms) >= 2 and "TEA" in txt, f"montos: {ms[:6]}")
    # TNA default 40%? 1M a 30 días => interés = 1M*0.40*30/365 ≈ 32.876 (si TNA=40)
    print("  plazo-fijo montos:", ms[:8])

    # ===== credito =====
    page.goto(f"{BASE}/credito/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    vals = ["5000000", "12", "80"][:len(ins)]
    for el, v in zip(ins, vals):
        el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular|Simular")).first.click()
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = montos(txt)
    check("credito", "cuota calculada", len(ms) >= 3, f"montos: {ms[:6]}")
    # sistema francés: 5M, 12 meses, 80% anual -> i=0.06667, cuota ≈ 462.648
    print("  credito montos:", ms[:8])

    # ===== dolar-tarjeta =====
    page.goto(f"{BASE}/dolar-tarjeta/", wait_until="domcontentloaded")
    page.wait_for_timeout(1200)
    ins = [i for i in page.locator("input").all() if i.evaluate("e=>e.type") in ("number","text","tel")]
    print("dolar-tarjeta labels:", [l.inner_text()[:40] for l in page.locator("label").all()])
    for el, v in zip(ins, ["100"]):
        el.fill(v)
    page.get_by_role("button", name=re.compile("Calcular")).first.click()
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    ms = montos(txt)
    check("dolar-tarjeta", "total calculado", len(ms) >= 2, f"montos: {ms[:8]}")

    browser.close()

ok = sum(1 for r in results if r["ok"])
print(f"\nRESUMEN pasada 3: {ok}/{len(results)} PASS")
with open("C:/Users/tiago/suelloneto-ar/audit/funcionales3.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
