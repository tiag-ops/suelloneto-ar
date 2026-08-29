"""Segunda pasada: páginas restantes + diagnóstico de los 3 FAIL."""
import json, sys, re
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
results = []

def check(pagina, nombre, ok, detalle=""):
    results.append({"pagina": pagina, "test": nombre, "ok": ok, "detalle": detalle})
    print(("PASS" if ok else "FAIL"), "|", pagina, "|", nombre, "|", detalle)

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 900}, locale="es-AR")
    page = ctx.new_page()
    js_errors = []
    page.on("pageerror", lambda e: js_errors.append(str(e)))
    page.on("console", lambda m: js_errors.append(m.text) if m.type == "error" else None)

    # ---- Diagnóstico HOME: ¿por qué no aparece 2.267.625? ----
    page.goto(f"{BASE}/", wait_until="domcontentloaded")
    page.wait_for_timeout(1500)
    ins = page.locator("input").all()
    print("HOME inputs:", len(ins))
    for i, el in enumerate(ins):
        try:
            print(f"  input[{i}] type={el.evaluate('e=>e.type')} ph={el.evaluate('e=>e.placeholder')}")
        except Exception:
            pass
    # llenar el primero
    ins[0].fill("4500000")
    btns = page.locator("button").all()
    print("HOME botones:", [b.inner_text()[:25] for b in btns])
    for b in btns:
        if "alcular" in b.inner_text():
            b.click()
            break
    page.wait_for_timeout(800)
    b = page.inner_text("body")
    nums = re.findall(r"\$[\d.,]+", b)
    print("HOME montos tras calcular:", nums[:12])
    check("home", "neto 4.5M ≈ 2.267.625 (motor)", any("2.267.62" in n for n in nums), f"montos: {nums[:8]}")

    # ---- Diagnóstico vac-no-gozadas y horas-extras ----
    for ruta, campos in [("vacaciones-no-gozadas", ["4000000", "6"]), ("horas-extras", ["4000000", "10"])]:
        page.goto(f"{BASE}/{ruta}/", wait_until="domcontentloaded")
        page.wait_for_timeout(1200)
        ins = page.locator("input").all()
        tipos = []
        for i, el in enumerate(ins):
            t = el.evaluate("e=>e.type")
            tipos.append(t)
        print(f"{ruta}: inputs={tipos}")
        # llenar solo number/text
        idx = 0
        for el in ins:
            t = el.evaluate("e=>e.type")
            if t in ("number", "text", "tel") and idx < len(campos):
                el.fill(campos[idx]); idx += 1
        for b2 in page.locator("button").all():
            if "alcular" in b2.inner_text():
                b2.click(); break
        page.wait_for_timeout(600)
        body = page.inner_text("body")
        montos = re.findall(r"\$[\d.,]{6,}", body)
        check(ruta, "calcula monto", len(montos) > 0, f"montos: {montos[:5]}")

    # ---- plazo-fijo (timeout antes: reintentar con domcontentloaded) ----
    page.goto(f"{BASE}/plazo-fijo/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1500)
    ins = page.locator("input").all()
    print("plazo-fijo inputs:", len(ins))
    idx = 0
    vals = ["1000000", "30"]
    for el in ins:
        t = el.evaluate("e=>e.type")
        if t in ("number", "text", "tel") and idx < len(vals):
            el.fill(vals[idx]); idx += 1
    for b2 in page.locator("button").all():
        if "alcular" in b2.inner_text():
            b2.click(); break
    page.wait_for_timeout(600)
    b = page.inner_text("body")
    check("plazo-fijo", "muestra TEA", "TEA" in b, "")
    montos = re.findall(r"\$[\d.,]{6,}", b)
    check("plazo-fijo", "calcula interés", len(montos) > 0, f"montos: {montos[:5]}")

    # ---- crédito ----
    page.goto(f"{BASE}/credito/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1200)
    ins = page.locator("input").all()
    vals = ["5000000", "12", "80"]
    idx = 0
    for el in ins:
        t = el.evaluate("e=>e.type")
        if t in ("number", "text", "tel") and idx < len(vals):
            el.fill(vals[idx]); idx += 1
    for b2 in page.locator("button").all():
        if "alcular" in b2.inner_text():
            b2.click(); break
    page.wait_for_timeout(600)
    b = page.inner_text("body")
    montos = re.findall(r"\$[\d.,]{6,}", b)
    check("credito", "cuota + intereses", len(montos) >= 2 and "inter" in b.lower(), f"montos: {montos[:5]}")

    # ---- dolar-tarjeta ----
    page.goto(f"{BASE}/dolar-tarjeta/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1200)
    ins = page.locator("input").all()
    idx = 0
    vals = ["100"]
    for el in ins:
        t = el.evaluate("e=>e.type")
        if t in ("number", "text", "tel") and idx < len(vals):
            el.fill(vals[idx]); idx += 1
    for b2 in page.locator("button").all():
        if "alcular" in b2.inner_text():
            b2.click(); break
    page.wait_for_timeout(600)
    b = page.inner_text("body")
    montos = re.findall(r"\$[\d.,]{4,}", b)
    check("dolar-tarjeta", "USD 100 => total ARS", len(montos) > 0, f"montos: {montos[:6]}")

    # ---- cuil ----
    page.goto(f"{BASE}/cuil/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(1200)
    ins = page.locator("input").all()
    ins[0].fill("12345678")
    sel = page.locator("select").first
    if sel.count():
        sel.select_option(index=1)
    for b2 in page.locator("button").all():
        if "alcular" in b2.inner_text():
            b2.click(); break
    page.wait_for_timeout(600)
    b = page.inner_text("body")
    m = re.search(r"20[\s.-]?12345678[\s.-]?(\d)", b)
    check("cuil", "DNI 12345678 varón => dv calculado", m is not None, f"dv={m.group(1) if m else '?'} (esperado 4)")

    # ---- 404 ----
    r = page.goto(f"{BASE}/pagina-inexistente-xyz/", wait_until="domcontentloaded")
    check("404", "404 real", r.status == 404, f"status={r.status}")

    errores = [e for e in js_errors if "favicon" not in e.lower()]
    print("\nJS_ERRORS:", json.dumps(errores, ensure_ascii=False) if errores else "ninguno")
    browser.close()

ok = sum(1 for r in results if r["ok"])
print(f"\nRESUMEN pasada 2: {ok}/{len(results)} PASS")
sys.exit(0)
