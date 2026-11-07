# -*- coding: utf-8 -*-
from pathlib import Path
js = Path(__file__).resolve().parents[1].joinpath("vendor/arco/arco-vue.min.js").read_text(encoding="utf-8", errors="ignore")
i = js.find('name: "MessageList"')
# search back 50kb for ",le=" or "le=" patterns that define slot normalizer
chunk = js[max(0,i-80000):i]
# find candidates: le=( something => 
import re
cands = re.findall(r'([,;{])le=([^,;]{5,80})', chunk)
print('cands', len(cands))
for sep, body in cands[-10:]:
    print(sep, body[:80])
# also le=e.
cands2 = re.findall(r'le=([a-zA-Z_$][\w$]*)', chunk)
print('le=ident', set(cands2))
# show last 20 lines before MessageList with short names
print('---tail before MessageList---')
print(chunk[-1500:])
