# -*- coding: utf-8 -*-
from pathlib import Path
import re
for label, p in [
    ("web", Path(r"D:\VibePM\agent\pack\vibepm-demo-agent\frame\web\vendor\vue\vue.global.prod.js")),
    ("admin", Path(r"D:\VibePM\agent\pack\vibepm-demo-agent\frame\admin\vendor\vue\vue.global.prod.js")),
]:
    t = p.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r'version\s*=\s*"([0-9.]+)"', t[:8000])
    print(label, "size", p.stat().st_size, "ver", m.group(1) if m else "?")
