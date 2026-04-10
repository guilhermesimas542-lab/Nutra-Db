#!/usr/bin/env python3
"""Regenera VTurb-colagem-oferta-garantia-09.html (colagem completa, mesma ideia que /4)."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "VTurb-colagem-oferta-garantia-09.html"

CSS_PATHS = [
    ROOT / "assets/css/01.css",
    ROOT / "assets/css/02.css",
    ROOT / "assets/css/frontend.min.css",
    ROOT / "assets/css/post-5.css",
    ROOT / "assets/css/widget-icon-list.min.css",
    ROOT / "assets/css/widget-image.min.css",
    ROOT / "assets/css/widget-animated-headline.min.css",
    ROOT / "assets/css/bounceIn.min.css",
    ROOT / "assets/css/post-111.css",
    ROOT / "assets/css/css.css",
    ROOT / "assets/css/css(1).css",
    ROOT / "assets/css/css2.css",
    ROOT / "01/assets/css/bootstrap.css",
    ROOT / "01/assets/css/vsl.css",
]


def main():
    for p in CSS_PATHS:
        if not p.exists():
            print("Missing:", p, file=sys.stderr)
            sys.exit(1)

    idx = (ROOT / "09/index.html").read_text(encoding="utf-8")

    m = re.search(
        r'<link href="https://fonts\.googleapis\.com/css2\?family=Lora[^>]+>\s*<style>(.*?)</style>\s*<script src="https://cdnjs\.cloudflare\.com/ajax/libs/jquery',
        idx,
        re.DOTALL,
    )
    if not m:
        print("Could not find main inline style in 09/index.html", file=sys.stderr)
        sys.exit(1)
    inline_main = m.group(1).strip()

    header = f'''<!--
  =============================================================================
  VTURB — PÁGINA /09: COLAGEM COMPLETA (MESMA METODOLOGIA QUE /4)
  =============================================================================
  Template da oferta é diferente da /4 (Bootstrap + vsl vs cards Elementor), mas o
  FICHEIRO segue a mesma lógica: um único <style> com o CSS que a /09 carrega,
  inlinado, + HTML do recorte abaixo da VSL.

  Regenerar: python3 scripts/build-vturb-colagem-09.py

  Como usar: Cmd/Ctrl+A → copiar → HTML customizado do VTurb.

  Embed /09: ab-69d80654f59fe98c9ed6e011

  ClickBank BrainHoney (2brainhone):
  • 2: https://2brainhone.pay.clickbank.net/?cbitems=FE-BHY-02B-C&cbfid=62889&template=2bottles&param=vsl&affiliate=roilabz
  • 3: https://2brainhone.pay.clickbank.net/?cbitems=FE-BHY-03B-C&cbfid=62890&template=3bottles&param=vsl&affiliate=roilabz
  • 6: https://2brainhone.pay.clickbank.net/?cbitems=FE-BHY-06B-C&cbfid=62891&template=6bottles&param=vsl&affiliate=roilabz

  Imagens: ../01/assets/... e ../assets/... relativos à pasta /09 no site.
  =============================================================================
-->

<style>
/* ========== Fontes + Font Awesome ========== */
@import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Open+Sans:wght@400;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

'''

    parts = [header]
    for p in CSS_PATHS:
        parts.append(f"\n/* ========== INÍCIO: {p.relative_to(ROOT)} ========== */\n")
        parts.append(p.read_text(encoding="utf-8", errors="replace"))
        parts.append(f"\n/* ========== FIM: {p.name} ========== */\n")

    parts.append("\n/* ========== INÍCIO: 09/index.html (inline page styles) ========== */\n")
    parts.append(inline_main)
    parts.append("\n/* ========== FIM: 09/index.html inline ========== */\n")

    lazy = re.search(r'<style>\s*(\.e-con\.e-parent:nth-of-type\(n\+4\)[\s\S]*?)</style>\s*<meta name="viewport"', idx)
    if lazy:
        parts.append("\n/* ========== 09/index.html (Elementor lazy placeholders) ========== */\n\t\t\t")
        parts.append(lazy.group(1).strip())
        parts.append("\n")

    parts.append(
        """
/* VTurb: visível no player (na página .esconder fica oculto até o vídeo) */
.vturb-09-colagem-root .esconder { display: block !important; }

body { width: 100%; overflow-x: hidden; margin: 0; }
</style>

<div class="elementor elementor-111 vturb-09-colagem-root">
"""
    )

    m3 = re.search(
        r'(<div id="scrolldown"[\s\S]*?)\s*<div class="elementor-element elementor-element-2dd5d018 bloqueio-direito',
        idx,
    )
    if not m3:
        print("Could not extract scrolldown HTML", file=sys.stderr)
        sys.exit(1)
    fragment = m3.group(1).rstrip()
    fragment = re.sub(r"\besconder\s+", "", fragment)
    fragment = re.sub(r"\s+esconder\b", "", fragment)
    # fechar .smartplayer-scroll-event (markup da /09 omitia um </div> antes de </section>)
    Lfrag = fragment.splitlines()
    for i, line in enumerate(Lfrag):
        if "<!-- 1 Bottles -->" in line and i + 4 < len(Lfrag):
            row_close, cont_close, sect_close = Lfrag[i + 2], Lfrag[i + 3], Lfrag[i + 4]
            if (
                row_close.strip() == "</div>"
                and cont_close.strip() == "</div>"
                and "</section>" in sect_close
            ):
                n_cont = len(cont_close) - len(cont_close.lstrip("\t"))
                smart_close = "\t" * max(0, n_cont - 1) + "</div>"
                Lfrag = Lfrag[: i + 4] + [smart_close] + Lfrag[i + 4 :]
                fragment = "\n".join(Lfrag)
                break

    parts.append(fragment)
    parts.append("\n</div>\n")

    OUT.write_text("".join(parts), encoding="utf-8")
    print("Wrote", OUT, "lines", len(OUT.read_text(encoding="utf-8").splitlines()))


if __name__ == "__main__":
    main()
