"""Cambia text-sm -> text-base SOLO en <p> con contenido largo (prosa, >=40 chars visibles).
Micro-labels cortos quedan igual. Reporta cambios por archivo."""
import re, glob

MIN_CHARS = 40
changed, skipped_long = [], []
tag_re = re.compile(
    r'<p\b([^>]*?className=(?:"([^"]*)"|\{`([^`]*)`\})[^>]*>)(.*?</p>)',
    re.S,
)

def strip_tags(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", s).replace("&nbsp;", " ").strip()

for f in glob.glob("src/**/*.tsx", recursive=True):
    src = open(f, encoding="utf-8").read()
    out, pos, file_changed = [], 0, False
    for m in tag_re.finditer(src):
        cls = m.group(2) if m.group(2) is not None else m.group(3)
        if not cls or "text-sm" not in cls.split() and "text-sm " not in cls and not cls.endswith("text-sm"):
            # token exacto: evita text-sm/2 etc (Tailwind no tiene, pero por prolijidad)
            if not re.search(r"(?<![\w-])text-sm(?![\w/-])", cls):
                continue
        visible = strip_tags(m.group(4))
        if len(visible) >= MIN_CHARS:
            new_cls = re.sub(r"(?<![\w-])text-sm(?![\w/-])", "text-base", cls)
            if new_cls != cls:
                line = src[:m.start()].count("\n") + 1
                old_frag = f'className="{cls}"' if m.group(2) is not None else f"className={{`{cls}`}}"
                new_frag = f'className="{new_cls}"' if m.group(2) is not None else f"className={{`{new_cls}`}}"
                seg = src[pos:m.start()]
                out.append(seg)
                out.append(m.group(0).replace(old_frag, new_frag, 1))
                pos = m.end()
                file_changed = True
                changed.append(f"{f}:{line}")
            else:
                skipped_long.append(f"{f}:sin-cambio")
    if file_changed:
        out.append(src[pos:])
        open(f, "w", encoding="utf-8", newline="\n").write("".join(out))

print(f"PARRAFOS actualizados: {len(changed)}")
for c in changed:
    print(" ", c)
