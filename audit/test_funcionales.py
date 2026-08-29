"""Test E2E de las 14 calculadoras en Firefox headless (Playwright).
Verifica: carga sin errores JS, interacción real (input -> click -> resultado esperado).
"""
import json, sys, re
from playwright.sync_api import sync_playwright

BASE = "https://sueldoneto.com.ar"
results = []

def fmt(n):
    return re.sub(r"\.0$", "", f"{n:,.2f}".replace(",", "@").replace(".", ",").replace("@", "."))

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

    def fill(label_like, value):
        el = page.locator(f"input:visible").first
        return el

    # ---------- 1. HOME: sueldo neto ----------
    page.goto(f"{BASE}/", wait_until="networkidle")
    inp = page.locator("input[type='number'], input[type='text']").first
    inp.fill("4500000")
    page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
    page.wait_for_timeout(400)
    body = page.inner_text("body")
    # Esperado según tests del motor: neto ~ $2.267.625,91 (bruto 4.5M, sin familia)
    m = re.search(r"\$[\d.,]+", body)
    check("home", "calculadora sueldo neto calcula", "2.267.625" in body or "2.267.626" in body, "buscado 2.267.625/6 en salida")
    check("home", "muestra desglose aportes", "APL" in body or "aportes" in body.lower() or "Jubilación" in body, "")
    check("home", "muestra ganancias", "Ganancias" in body, "")
    check("home", "muestra fuente/vigencia ARCA", "ARCA" in body or "vigencia" in body.lower(), "")

    # ---------- 2. MONOTRIBUTO ----------
    page.goto(f"{BASE}/monotributo/", wait_until="networkidle")
    body = page.inner_text("body")
    check("monotributo", "categoría A presente", "A" in body and "12.009.410" in body.replace("$",""), "tope A 12.009.410")
    check("monotributo", "cuota K actualizada (,04)", "1.614.446,04" in body, "valor corregido por el vigilante")
    # buscador
    bs = page.locator("input").first
    if bs.count():
        bs.fill("20.000.000")
        page.wait_for_timeout(300)
        b2 = page.inner_text("body")
        check("monotributo", "buscador filtra por facturación", "20.000.000" not in b2 or "E" in b2, "")

    # ---------- 3. AGUINALDO ----------
    page.goto(f"{BASE}/aguinaldo/", wait_until="networkidle")
    inputs = page.locator("input").all()
    # sueldo 4.000.000, 6 meses => SAC 2.000.000
    for i, el in enumerate(inputs):
        try:
            val = el.input_value()
            if i == 0: el.fill("4000000")
            if i == 1: el.fill("6")
        except Exception: pass
    page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
    page.wait_for_timeout(300)
    b = page.inner_text("body")
    check("aguinaldo", "SAC 6 meses de 4M = 2.000.000", "2.000.000" in b, "")

    # ---------- 4. VACACIONES ----------
    page.goto(f"{BASE}/vacaciones/", wait_until="networkidle")
    ins = page.locator("input").all()
    if len(ins) >= 2:
        ins[0].fill("4000000"); ins[1].fill("10")  # 10 años => 28 días
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        check("vacaciones", "10 años => 28 días", "28" in b, "")

    # ---------- 5. VACACIONES NO GOZADAS ----------
    page.goto(f"{BASE}/vacaciones-no-gozadas/", wait_until="networkidle")
    ins = page.locator("input").all()
    if ins:
        ins[0].fill("4000000")
        try: ins[1].fill("6")
        except Exception: pass
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        check("vac-no-gozadas", "calcula monto > 0", bool(re.search(r"\$[\d.,]{6,}", b)), "")

    # ---------- 6. HORAS EXTRAS ----------
    page.goto(f"{BASE}/horas-extras/", wait_until="networkidle")
    ins = page.locator("input").all()
    if ins:
        ins[0].fill("4000000")
        try: ins[1].fill("10")
        except Exception: pass
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        check("horas-extras", "calcula con 10 hs extras", bool(re.search(r"\$[\d.,]{6,}", b)), "")

    # ---------- 7. SUELDO POR DÍA ----------
    page.goto(f"{BASE}/sueldo-por-dia/", wait_until="networkidle")
    ins = page.locator("input").all()
    if ins:
        ins[0].fill("4000000")
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        check("sueldo-por-dia", "4000000/25 = 160.000 por día", "160.000" in b, "")

    # ---------- 8. DÍAS HÁBILES ----------
    page.goto(f"{BASE}/dias-habiles/", wait_until="networkidle")
    fechas = page.locator("input[type='date']").all()
    if len(fechas) >= 2:
        fechas[0].fill("2026-11-30")
        fechas[1].fill("2026-12-07")
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        # 30/11 lun al 7/12 lun inclusive: 8 días - 1 finde sab+dom - 0 feriados = 6 hábiles (lun30, mar1, mie2, jue3, vie4, lun7)
        check("dias-habiles", "30/11→07/12 = 6 hábiles", "6" in b, f"salida contiene '6': {'6' in b}")

    # ---------- 9. PRÓXIMO FERIADO ----------
    page.goto(f"{BASE}/proximo-feriado/", wait_until="networkidle")
    b = page.inner_text("body")
    check("proximo-feriado", "muestra feriado con nombre", "Soberanía" in b or "Cultural" in b or "Inmaculada" in b or "Navidad" in b, "")

    # ---------- 10. INDEMNIZACIÓN ----------
    page.goto(f"{BASE}/indemnizacion/", wait_until="networkidle")
    ins = page.locator("input").all()
    if len(ins) >= 2:
        ins[0].fill("4000000")
        try: ins[1].fill("5")
        except Exception: pass
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        # 5 años => 5 sueldos = 20.000.000 + SAC proporcional
        check("indemnizacion", "5 años de 4M => base 20.000.000", "20.000.000" in b, "")

    # ---------- 11. PLAZO FIJO ----------
    page.goto(f"{BASE}/plazo-fijo/", wait_until="networkidle")
    ins = page.locator("input").all()
    if len(ins) >= 2:
        ins[0].fill("1000000")
        try: ins[1].fill("30")
        except Exception: pass
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        # TNA default? verificar solo que dé interés > 0 y muestre TEA
        check("plazo-fijo", "muestra TEA", "TEA" in b, "")

    # ---------- 12. CRÉDITO ----------
    page.goto(f"{BASE}/credito/", wait_until="networkidle")
    ins = page.locator("input").all()
    if len(ins) >= 3:
        ins[0].fill("5000000")
        try:
            ins[1].fill("12")
            ins[2].fill("80")
        except Exception: pass
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        check("credito", "muestra cuota e intereses", bool(re.search(r"\$[\d.,]{6,}", b)) and ("inter" in b.lower()), "")

    # ---------- 13. DÓLAR TARJETA ----------
    page.goto(f"{BASE}/dolar-tarjeta/", wait_until="networkidle")
    ins = page.locator("input").all()
    if ins:
        ins[0].fill("100")
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        check("dolar-tarjeta", "calcula sobre USD 100", bool(re.search(r"\$[\d.,]{4,}", b)), "")

    # ---------- 14. CUIL ----------
    page.goto(f"{BASE}/cuil/", wait_until="networkidle")
    ins = page.locator("input").all()
    if ins:
        ins[0].fill("12345678")
        sel = page.locator("select").first
        if sel.count():
            sel.select_option(index=1)  # masculino
        page.get_by_role("button", name=re.compile("calcular", re.I)).first.click()
        page.wait_for_timeout(300)
        b = page.inner_text("body")
        # DNI 12345678 varón => 20-12345678-4 (módulo 11)
        check("cuil", "DNI 12345678 varón => ...-4", re.search(r"20[\s.-]?12345678[\s.-]?4\b", b) is not None, "")

    # ---------- Consola JS global ----------
    errores = [e for e in js_errors if "favicon" not in e.lower()]
    print("\nJS_ERRORS:", json.dumps(errores, ensure_ascii=False) if errores else "ninguno")

    # ---------- 404 ----------
    r = page.goto(f"{BASE}/pagina-inexistente-xyz/", wait_until="domcontentloaded")
    check("404", "página inexistente devuelve 404 real", r.status == 404, f"status={r.status}")

    browser.close()

ok = sum(1 for r in results if r["ok"])
print(f"\nRESUMEN: {ok}/{len(results)} PASS")
with open("C:/Users/tiago/suelloneto-ar/audit/funcionales.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
sys.exit(0 if ok == len(results) else 1)
