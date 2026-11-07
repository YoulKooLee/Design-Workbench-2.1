# -*- coding: utf-8 -*-
from pathlib import Path
js = Path(__file__).resolve().parents[1].joinpath("vendor/arco/arco-vue.min.js").read_text(encoding="utf-8", errors="ignore")
# UMD export end
print("Message" in js, "Notification" in js, "Modal" in js)
# look at end of file for exports
print(js[-800:])
