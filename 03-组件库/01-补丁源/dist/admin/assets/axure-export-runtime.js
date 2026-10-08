var ao = new Int32Array(1);
new Float32Array(ao.buffer);
function ze(e) {
  let t = e.length;
  for (; --t >= 0; )
    e[t] = 0;
}
const lo = 3, so = 258, an = 29, co = 256, uo = co + 1 + an, ln = 30, fo = 512, ho = new Array((uo + 2) * 2);
ze(ho);
const mo = new Array(ln * 2);
ze(mo);
const go = new Array(fo);
ze(go);
const po = new Array(so - lo + 1);
ze(po);
const yo = new Array(an);
ze(yo);
const bo = new Array(ln);
ze(bo);
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
}
const _t = new Uint8Array(256);
for (let e = 0; e < 256; e++)
  _t[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
_t[254] = _t[254] = 1;
var wo = {
  alignmentBaseline: "baseline",
  clip: "auto",
  clipPath: "none",
  clipRule: "nonzero",
  color: "rgb(0, 0, 0)",
  colorInterpolation: "sRGB",
  colorRendering: "auto",
  cursor: "auto",
  direction: "ltr",
  display: "inline",
  dominantBaseline: "auto",
  fill: "rgb(0, 0, 0)",
  fillOpacity: "1",
  fillRule: "nonzero",
  filter: "none",
  floodColor: "rgb(0, 0, 0)",
  floodOpacity: "1",
  imageRendering: "auto",
  letterSpacing: "normal",
  lightingColor: "rgb(255, 255, 255)",
  lineHeight: "normal",
  markerEnd: "none",
  markerMid: "none",
  markerStart: "none",
  mask: "none",
  opacity: "1",
  overflow: "visible",
  paintOrder: "normal",
  shapeRendering: "auto",
  stopColor: "rgb(0, 0, 0)",
  stopOpacity: "1",
  stroke: "none",
  strokeDasharray: "none",
  strokeDashoffset: "0px",
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
  strokeMiterlimit: "4",
  strokeOpacity: "1",
  strokeWidth: "1px",
  textAnchor: "start",
  textDecoration: "none solid rgb(0, 0, 0)",
  textRendering: "auto",
  unicodeBidi: "normal",
  vectorEffect: "none",
  visibility: "visible",
  whiteSpace: "normal",
  writingMode: "horizontal-tb"
};
Object.fromEntries(
  Object.keys(wo).map((e) => [
    e,
    e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
  ])
);
var xo = async () => await Promise.resolve().then(() => qi), So = async (e = "body", t) => (await xo()).htmlToAxure(e, t);
function Os(e = "body", t) {
  return So(e, t);
}
function vo(e, t, r) {
  let n = (e + 16) / 116, i = t / 500 + n, o = n - r / 200;
  const a = (s) => s > 0.206897 ? Math.pow(s, 3) : (s - 16 / 116) / 7.787;
  i = a(i) * 95.047, n = a(n) * 100, o = a(o) * 108.883, i = i / 100, n = n / 100, o = o / 100;
  let l = i * 3.2406 + n * -1.5372 + o * -0.4986, c = i * -0.9689 + n * 1.8758 + o * 0.0415, u = i * 0.0557 + n * -0.204 + o * 1.057;
  const f = (s) => s > 31308e-7 ? 1.055 * Math.pow(s, 1 / 2.4) - 0.055 : 12.92 * s;
  return l = f(l), c = f(c), u = f(u), l = Math.max(0, Math.min(1, l)), c = Math.max(0, Math.min(1, c)), u = Math.max(0, Math.min(1, u)), { r: l, g: c, b: u };
}
var Qe = (e) => Math.max(0, Math.min(1, e)), Je = (e, t = null) => {
  if (typeof e != "string")
    return null;
  const n = e.trim().match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%)?$/i);
  if (!n)
    return null;
  let i = parseFloat(n[1]);
  if (!Number.isFinite(i))
    return null;
  if (n[2]) {
    if (t === null)
      return null;
    i = i / 100 * t;
  }
  return i;
}, Co = (e) => {
  if (e == null || e === "")
    return 1;
  const t = Je(e, 1);
  return t === null ? null : Qe(t);
}, sn = (e) => {
  if (typeof e != "string")
    return null;
  const t = e.trim(), r = t.endsWith("%"), n = Je(t, 1);
  return n === null || !r && (n < 0 || n > 1) ? null : Qe(n);
}, Ao = (e) => {
  if (typeof e != "string")
    return null;
  const r = e.trim().toLowerCase().match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(deg|rad|grad|turn)?$/);
  if (!r)
    return null;
  let n = parseFloat(r[1]);
  if (!Number.isFinite(n))
    return null;
  const i = r[2] || "deg";
  return i === "rad" ? n = n * 180 / Math.PI : i === "grad" ? n = n * 0.9 : i === "turn" && (n = n * 360), (n % 360 + 360) % 360;
}, cn = (e) => {
  const t = e.split("/");
  if (t.length > 2)
    return null;
  const r = t[0].trim().split(/[\s,]+/).filter(Boolean);
  if (r.length !== 3)
    return null;
  const n = Co(t[1] ? t[1].trim() : void 0);
  return n === null ? null : { channels: r, alpha: n };
};
function ko(e, t, r) {
  const n = r * Math.PI / 180;
  return {
    L: e,
    a: t * Math.cos(n),
    b: t * Math.sin(n)
  };
}
function Mo(e, t, r) {
  const n = e + 0.3963377774 * t + 0.2158037573 * r, i = e - 0.1055613458 * t - 0.0638541728 * r, o = e - 0.0894841775 * t - 1.291485548 * r, a = n * n * n, l = i * i * i, c = o * o * o;
  return {
    r: 4.0767416621 * a - 3.3077115913 * l + 0.2309699292 * c,
    g: -1.2684380046 * a + 2.6097574011 * l - 0.3413193965 * c,
    b: -0.0041960863 * a - 0.7034186147 * l + 1.707614701 * c
  };
}
function Ft(e) {
  return e <= 31308e-7 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055;
}
function un(e, t, r) {
  const n = Mo(e, t, r);
  return {
    r: Qe(Ft(n.r)),
    g: Qe(Ft(n.g)),
    b: Qe(Ft(n.b))
  };
}
function Eo(e, t, r) {
  const n = ko(e, t, r);
  return un(n.L, n.a, n.b);
}
var $o = (e) => {
  const t = e.match(/^oklab\(\s*([^)]+)\s*\)$/i);
  if (!t)
    return null;
  const r = cn(t[1]);
  if (!r)
    return null;
  const n = sn(r.channels[0]), i = Je(r.channels[1], 1), o = Je(r.channels[2], 1);
  if (n === null || i === null || o === null)
    return null;
  const a = un(n, i, o);
  return {
    r: a.r,
    g: a.g,
    b: a.b,
    a: r.alpha
  };
}, To = (e) => {
  const t = e.match(/^oklch\(\s*([^)]+)\s*\)$/i);
  if (!t)
    return null;
  const r = cn(t[1]);
  if (!r)
    return null;
  const n = sn(r.channels[0]), i = Je(r.channels[1], 1), o = Ao(r.channels[2]);
  if (n === null || i === null || o === null)
    return null;
  const a = Eo(n, i, o);
  return {
    r: a.r,
    g: a.g,
    b: a.b,
    a: r.alpha
  };
};
function Fo(e) {
  if (!e)
    return null;
  const t = e.trim();
  if (t.toLowerCase() === "transparent")
    return { r: 0, g: 0, b: 0, a: 0 };
  const r = To(t);
  if (r)
    return r;
  const n = $o(t);
  if (n)
    return n;
  const i = t.match(
    /^lab\(\s*([0-9.]+%?)\s+([+-]?[0-9.]+)\s+([+-]?[0-9.]+)(?:\s*\/\s*([0-9.]+%?))?\s*\)$/i
  );
  if (i) {
    const l = parseFloat(i[1]), c = parseFloat(i[2]), u = parseFloat(i[3]);
    let f = 1;
    if (i[4]) {
      const d = parseFloat(i[4]);
      f = i[4].includes("%") ? d / 100 : d;
    }
    const s = vo(l, c, u);
    return {
      r: s.r,
      g: s.g,
      b: s.b,
      a: f
    };
  }
  const o = t.match(
    /rgba?\(([\d\.]+),\s*([\d\.]+),\s*([\d\.]+)(?:,\s*([\d\.]+))?\)/
  );
  if (o) {
    const [l, c, u, f, s] = o;
    if (c && u && f)
      return {
        r: parseInt(c) / 255,
        g: parseInt(u) / 255,
        b: parseInt(f) / 255,
        a: s ? parseFloat(s) : 1
      };
  }
  const a = t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (a) {
    let l = a[1];
    return l.length === 3 && (l = l.split("").map((c) => c + c).join("")), {
      r: parseInt(l.slice(0, 2), 16) / 255,
      g: parseInt(l.slice(2, 4), 16) / 255,
      b: parseInt(l.slice(4, 6), 16) / 255,
      a: 1
    };
  }
  return null;
}
async function dn(e) {
  try {
    const r = await (await fetch(e, {
      method: "GET",
      mode: "cors"
    })).blob(), n = r.type;
    return n !== "image/png" && n !== "image/jpeg" ? await tr(await br(r), n) : `data:${n};base64,${await br(r)}`;
  } catch (t) {
    return console.error("Failed to load image as base64:", t), null;
  }
}
var er = (e) => typeof e == "string" && e.startsWith("data:"), Lo = (e) => {
  try {
    return new URL(e, document.baseURI).href;
  } catch {
    return e;
  }
}, No = async (e) => {
  var r, n, i;
  if (!(typeof globalThis < "u" && ((n = (r = globalThis.chrome) == null ? void 0 : r.runtime) == null ? void 0 : n.sendMessage)))
    return null;
  try {
    const o = await Promise.race([
      globalThis.chrome.runtime.sendMessage({
        type: "getResourceContent",
        src: e
      }),
      new Promise((c) => setTimeout(() => c(null), 8e3))
    ]);
    if (!((i = o == null ? void 0 : o.data) != null && i.content))
      return null;
    const a = o.data.mimeType || "application/octet-stream", l = o.data.content;
    if (o.data.base64Encoded) {
      if (a === "image/webp")
        try {
          return await tr(l, a);
        } catch {
        }
      return `data:${a};base64,${l}`;
    }
    return typeof l == "string" && a.includes("svg") ? `data:${a};utf8,${encodeURIComponent(l)}` : null;
  } catch {
    return null;
  }
}, Po = async (e) => {
  if (!e)
    return e;
  if (er(e))
    return await fn(e);
  const t = Lo(e), r = await No(t);
  return r || await dn(t);
}, Ro = (e) => {
  const t = /^data:([^;,]+)/i.exec(e || "");
  return (t && t[1] ? t[1].toLowerCase() : "").trim();
}, Io = (e) => e === "image/png" || e === "image/jpeg" || e === "image/jpg" || e === "image/gif", Wo = (e) => new Promise((t, r) => {
  const n = new Image(), i = setTimeout(() => r(new Error("Image load timeout")), 1e4);
  n.onload = () => {
    clearTimeout(i);
    try {
      const o = document.createElement("canvas"), a = o.getContext("2d");
      if (!a) {
        r(new Error("Failed to get canvas context"));
        return;
      }
      o.width = n.width, o.height = n.height, a.drawImage(n, 0, 0), t(o.toDataURL("image/png"));
    } catch (o) {
      r(o);
    }
  }, n.onerror = () => {
    clearTimeout(i), r(new Error("Failed to load data URL image"));
  }, n.src = e;
}), fn = async (e) => {
  if (!er(e))
    return e;
  const t = Ro(e);
  if (!t || Io(t) || !t.startsWith("image/"))
    return e;
  try {
    return await Wo(e);
  } catch {
    return e;
  }
}, Ho = (e) => {
  const t = [];
  if (!e || e === "none")
    return t;
  const r = /url\((['"]?)(.*?)\1\)/g;
  let n;
  for (; (n = r.exec(e)) !== null; ) {
    const i = (n[2] || "").trim();
    i && t.push({
      fullMatch: n[0],
      rawUrl: i
    });
  }
  return t;
}, qe = (e) => {
  e.removeAttribute("srcset"), e.removeAttribute("sizes"), e.srcset = "", e.sizes = "", e.parentElement instanceof HTMLPictureElement && e.parentElement.querySelectorAll("source").forEach((r) => {
    r.removeAttribute("srcset"), r.removeAttribute("sizes");
  });
};
async function _o(e) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))];
  for (const r of t) {
    if (!(r instanceof HTMLElement)) continue;
    let n;
    try {
      n = window.getComputedStyle(r);
    } catch {
      continue;
    }
    const i = n.backgroundImage;
    if (!i || i === "none")
      continue;
    const o = Ho(i);
    if (o.length === 0)
      continue;
    let a = i, l = !1;
    for (const c of o) {
      const u = await Po(c.rawUrl);
      if (!u || !er(u))
        continue;
      const f = `url("${u}")`;
      a.includes(c.fullMatch) && (a = a.replace(c.fullMatch, f), l = !0);
    }
    l && r.style.setProperty("background-image", a, "important");
  }
}
function br(e) {
  return new Promise((t, r) => {
    const n = new FileReader();
    n.onload = () => {
      const o = n.result.split(",")[1];
      t(o);
    }, n.onerror = r, n.readAsDataURL(e);
  });
}
function tr(e, t) {
  return new Promise((r, n) => {
    const i = new Image(), o = setTimeout(() => {
      n(new Error("Image load timeout"));
    }, 1e4);
    i.onload = () => {
      clearTimeout(o);
      const l = document.createElement("canvas"), c = l.getContext("2d");
      if (!c) {
        const u = new Error("Failed to get canvas context");
        console.error("❌ [imgToPng]", u), n(u);
        return;
      }
      l.width = i.width, l.height = i.height;
      try {
        c.drawImage(i, 0, 0);
        const u = l.toDataURL("image/png");
        r(u);
      } catch (u) {
        console.error("❌ [imgToPng] Canvas 绘制失败:", u), n(u);
      }
    }, i.onerror = (l) => {
      clearTimeout(o), n(new Error(`Failed to load image: ${l.type || "unknown error"}`));
    };
    const a = `data:${t};base64,${e}`;
    i.src = a;
  });
}
function wr() {
  const e = arguments.length > 0 ? arguments[0] : document, t = arguments.length > 1 ? arguments[1] : void 0, r = t && typeof t.timeoutMs == "number" ? t.timeoutMs : 8e3, n = e && typeof e.querySelectorAll == "function" ? e : document;
  return new Promise((i) => {
    const o = n.querySelectorAll("img");
    if (o.length === 0) {
      i();
      return;
    }
    let a = 0;
    const l = o.length, c = typeof performance < "u" ? performance.now() : Date.now(), u = /* @__PURE__ */ new Set(), f = () => {
      a++, a === l && i();
    };
    o.forEach((s) => {
      u.add(s);
      const d = () => {
        u.has(s) && u.delete(s), f();
      };
      if (s.complete)
        d();
      else {
        const h = () => {
          g(), d();
        }, m = () => {
          g(), d();
        }, g = () => {
          s.removeEventListener("load", h), s.removeEventListener("error", m), clearTimeout(p);
        }, p = setTimeout(() => {
          g(), d();
        }, r);
        s.addEventListener("load", h, { once: !0 }), s.addEventListener("error", m, { once: !0 });
      }
    }), setTimeout(() => {
      if (a !== l) {
        const s = Math.round(
          (typeof performance < "u" ? performance.now() : Date.now()) - c
        );
        console.warn("⚠️ [areAllImagesLoaded] timeout, continue anyway", {
          elapsedMs: s,
          totalImages: l,
          remaining: u.size
        }), i();
      }
    }, r + 50);
  });
}
var Dt = !1, xr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAG0lEQVQImWNgYGD4z8DAwMgABYwMjAxQAKkGBgA66gJx4f4x5QAAAABJRU5ErkJggg==", Do = (e, t, r) => {
  try {
    const n = document.createElement("canvas"), i = Math.max(1, Math.min(32, Math.round(e) || 2)), o = Math.max(1, Math.min(32, Math.round(t) || 2));
    n.width = i, n.height = o;
    const a = n.getContext("2d");
    return a ? (a.fillStyle = r || "#f0f0f0", a.fillRect(0, 0, i, o), n.toDataURL("image/png")) : xr;
  } catch {
    return xr;
  }
};
async function Oo(e) {
  e.querySelectorAll("canvas").forEach((r, n) => {
    try {
      if (r.width === 0 || r.height === 0)
        return;
      const i = window.getComputedStyle(r), o = Do(
        r.width,
        r.height,
        i.backgroundColor
      );
      let a;
      try {
        a = r.toDataURL("image/png");
      } catch {
        const u = document.createElement("img");
        u.src = o, u.style.width = r.style.width || r.width + "px", u.style.height = r.style.height || r.height + "px", u.style.backgroundColor = "#f0f0f0", u.setAttribute("data-canvas-tainted", "true"), u.setAttribute("data-from-canvas", "true"), u.setAttribute("alt", "Canvas (跨域限制)"), u.setAttribute("data-canvas-width", String(r.width || 0)), u.setAttribute("data-canvas-height", String(r.height || 0)), u.style.display = i.display, u.style.position = i.position, u.style.objectFit = "fill", r.parentNode && r.parentNode.replaceChild(u, r);
        return;
      }
      const l = document.createElement("img");
      l.src = a || o, l.style.width = r.style.width || r.width + "px", l.style.height = r.style.height || r.height + "px", l.style.display = i.display, l.style.position = i.position, l.style.top = i.top, l.style.left = i.left, l.style.right = i.right, l.style.bottom = i.bottom, l.style.margin = i.margin, l.style.padding = i.padding, r.className && (l.className = r.className), r.id && (l.id = r.id), l.setAttribute("data-from-canvas", "true"), r.parentNode && r.parentNode.replaceChild(l, r);
    } catch (i) {
      console.error(`❌ [convertCanvasToImage] Canvas ${n + 1} 转换失败:`, i), console.error("❌ [convertCanvasToImage] 错误堆栈:", i.stack);
    }
  });
}
async function Uo(e) {
  try {
    await Oo(e), await _o(e), await wr(e);
    const t = [], r = e.querySelectorAll("img");
    for (let n = 0; n < r.length; n++) {
      const i = r[n], o = i.currentSrc || i.src;
      if (o) {
        if (o.startsWith("data:image/")) {
          const a = (async () => {
            try {
              const l = await fn(o);
              l && l !== o && (i.setAttribute("src", l), qe(i));
            } catch {
            }
            return !0;
          })();
          t.push(a);
          continue;
        }
        if (o && !o.startsWith("data")) {
          const a = (async () => {
            var l, c, u;
            try {
              const f = new URL(o, document.baseURI).href, d = typeof globalThis < "u" && ((c = (l = globalThis.chrome) == null ? void 0 : l.runtime) == null ? void 0 : c.sendMessage) ? await Promise.race([
                globalThis.chrome.runtime.sendMessage({
                  type: "getResourceContent",
                  src: f
                }),
                new Promise((h) => setTimeout(() => h(null), 8e3))
              ]) : null;
              if ((u = d == null ? void 0 : d.data) != null && u.base64Encoded) {
                if (d.data.mimeType !== "image/png" && d.data.mimeType !== "image/jpeg")
                  try {
                    const h = await tr(d.data.content, d.data.mimeType);
                    i.setAttribute("src", h), qe(i);
                  } catch {
                    try {
                      const m = `data:${d.data.mimeType};base64,${d.data.content}`;
                      i.setAttribute("src", m), qe(i);
                    } catch {
                    }
                  }
                else {
                  const h = `data:${d.data.mimeType};base64,${d.data.content}`;
                  i.setAttribute("src", h), qe(i);
                }
                return !0;
              } else {
                try {
                  const h = await dn(f);
                  if (h)
                    return i.setAttribute("src", h), qe(i), !0;
                } catch {
                }
                return !1;
              }
            } catch {
              return !1;
            }
          })();
          t.push(a);
        }
      }
    }
    if (t.length > 0)
      try {
        const n = new Promise((i) => {
          setTimeout(() => {
            i(new Array(t.length).fill(!1));
          }, 3e4);
        });
        await Promise.race([Promise.allSettled(t), n]);
      } catch {
      }
    await wr(e, { timeoutMs: 8e3 });
  } catch {
  }
}
function zo(e) {
  const t = e.backgroundImage, r = e.background;
  if (t && t !== "none" && t.includes("conic-gradient") || r && r !== "none" && r.includes("conic-gradient") || qo(e))
    return !0;
  const n = e.maskImage || e.webkitMaskImage;
  return !!(n && n !== "none" || Bo(e) || Vo(e) || jo(e));
}
function Bo(e) {
  const t = {
    top: e.borderTop,
    right: e.borderRight,
    bottom: e.borderBottom,
    left: e.borderLeft
  };
  if (!Object.values(t).some((a) => a && a !== "none"))
    return !1;
  const n = {};
  for (const [a, l] of Object.entries(t))
    if (l && l !== "none") {
      const c = l.match(/^([\d\.]+)px\s*(\w+)\s*(.*)$/);
      if (c) {
        const [u, f, s, d] = c;
        n[a] = { borderWidth: f, borderType: s, borderColor: d };
      }
    } else
      n[a] = { borderWidth: "0", borderType: "none", borderColor: "transparent" };
  const i = Object.values(n).find((a) => a.borderWidth !== "0");
  return i ? !Object.values(n).every(
    (a) => a.borderWidth === i.borderWidth && a.borderType === i.borderType && a.borderColor === i.borderColor
  ) : !1;
}
function Vo(e) {
  const t = e.clipPath, r = e.webkitClipPath;
  return t && t !== "none" || r && r !== "none";
}
function jo(e) {
  const t = e.backgroundImage;
  if (!t || t === "none")
    return !1;
  const r = e.backgroundAttachment;
  if (r && r === "fixed")
    return !0;
  const n = e.backgroundOrigin;
  if (n && n !== "padding-box")
    return !0;
  const i = e.backgroundRepeat;
  if (i && (i === "repeat-x" || i === "repeat-y"))
    return !0;
  const o = e.backgroundPositionX, a = e.backgroundPositionY;
  if (o && o !== "0%" && o !== "left" && o !== "50%" && o !== "center" || a && a !== "0%" && a !== "top" && a !== "50%" && a !== "center")
    return !0;
  const u = e.backgroundSize;
  return !!(u && u !== "auto" && u !== "cover" && u !== "contain" && u !== "100% 100%" && u !== "100%" && (u.includes("px") || u.includes("%") && !u.startsWith("100%")));
}
function qo(e) {
  const t = e.backgroundImage, r = e.background;
  return !!(t && t !== "none" && (t.includes("repeating-linear-gradient") || t.includes("repeating-radial-gradient")) || r && r !== "none" && (r.includes("repeating-linear-gradient") || r.includes("repeating-radial-gradient")));
}
var Sr = "export-overlay-root", Go = /* @__PURE__ */ new Set(["script", "style", "noscript", "meta", "link", "title"]), Ot = /* @__PURE__ */ new Set(["img", "canvas", "video"]), Yo = /* @__PURE__ */ new Set(["path", "line", "polyline", "polygon", "rect", "circle", "ellipse"]), hn = 0, tt = 1, dt = 3, mn = 0, gn = 1, Xo = 2, Lt = /* @__PURE__ */ new Set(["hidden", "clip", "auto", "scroll"]), W = (e) => Math.round(e * 1e3) / 1e3, D = (e, t = 0) => {
  const r = Number.parseFloat(String(e || ""));
  return Number.isFinite(r) ? r : t;
}, Ko = () => {
  const e = document.documentElement, t = document.body, r = Math.max(
    (e == null ? void 0 : e.scrollWidth) || 0,
    (e == null ? void 0 : e.clientWidth) || 0,
    (t == null ? void 0 : t.scrollWidth) || 0,
    (t == null ? void 0 : t.clientWidth) || 0
  ), n = Math.max(
    (e == null ? void 0 : e.scrollHeight) || 0,
    (e == null ? void 0 : e.clientHeight) || 0,
    (t == null ? void 0 : t.scrollHeight) || 0,
    (t == null ? void 0 : t.clientHeight) || 0
  );
  return {
    width: Math.max(1, W(r)),
    height: Math.max(1, W(n))
  };
}, pn = (e) => {
  if (!e) return !0;
  const t = e.trim().toLowerCase();
  return t === "transparent" || t === "rgba(0, 0, 0, 0)" || t === "rgba(0,0,0,0)";
}, rr = (e) => {
  if (!e) return null;
  const t = e.trim(), r = Fo(t);
  return r ? {
    r: Math.min(1, Math.max(0, Number(r.r) || 0)),
    g: Math.min(1, Math.max(0, Number(r.g) || 0)),
    b: Math.min(1, Math.max(0, Number(r.b) || 0)),
    a: Math.min(1, Math.max(0, Number(r.a) || 0))
  } : null;
}, Qo = (e) => {
  const t = [];
  let r = 0, n = 0;
  for (let o = 0; o < e.length; o += 1) {
    const a = e[o];
    a === "(" && (r += 1), a === ")" && (r = Math.max(0, r - 1)), a === "," && r === 0 && (t.push(e.slice(n, o).trim()), n = o + 1);
  }
  const i = e.slice(n).trim();
  return i && t.push(i), t;
}, Jo = (e) => {
  var r, n, i;
  if (!e) return null;
  const t = ((r = e.match(/rgba?\([^)]*\)/i)) == null ? void 0 : r[0]) || ((n = e.match(/hsla?\([^)]*\)/i)) == null ? void 0 : n[0]) || ((i = e.match(/#[0-9a-f]{3,8}/i)) == null ? void 0 : i[0]) || (/transparent/i.test(e) ? "transparent" : null);
  return t ? rr(t) : null;
}, Nt = (e) => !e || e === "none" ? [] : Qo(e).map((r) => {
  const n = /\binset\b/i.test(r), i = Jo(r) || { r: 0, g: 0, b: 0, a: 1 }, o = r.match(/-?\d*\.?\d+px/gi) || [], a = D(o[0], 0), l = D(o[1], 0), c = Math.max(0, D(o[2], 0)), u = Math.max(0, D(o[3], 0));
  return {
    color: i,
    enabled: !0,
    blur: W(c),
    offset: {
      x: W(a),
      y: W(l)
    },
    type: 1,
    shadowType: n ? 1 : 0,
    spread: W(u)
  };
}).filter((r) => r.color), Ue = (e, t = !0) => {
  const r = rr(e);
  return r ? {
    type: tt,
    enabled: t,
    color: r
  } : null;
}, yn = (e, t = 0) => e ? {
  alignment: t,
  fill: e
} : null, nr = () => ({
  hasFixedLeft: !0,
  hasFixedRight: !1,
  hasFixedTop: !0,
  hasFixedBottom: !1,
  hasFixedWidth: !0,
  hasFixedHeight: !0
}), Zo = () => ({
  hasFixedLeft: !1,
  hasFixedRight: !1,
  hasFixedTop: !1,
  hasFixedBottom: !1,
  hasFixedWidth: !1,
  hasFixedHeight: !1
}), ei = (e) => {
  switch ((e || "").toLowerCase()) {
    case "center":
      return 1;
    case "right":
      return 2;
    case "justify":
      return 3;
    case "left":
    default:
      return 0;
  }
}, vr = (e, t = !1) => {
  switch (String(e || "").toLowerCase().trim()) {
    case "center":
      return "center";
    case "end":
    case "flex-end":
    case "right":
    case "self-end":
      return "end";
    case "space-around":
    case "space-evenly":
      return "center";
    case "space-between":
      return t ? "start" : "center";
    case "baseline":
    case "stretch":
    case "normal":
    case "start":
    case "left":
    case "flex-start":
    default:
      return "start";
  }
}, ti = (e, t = 0) => e === "center" ? 1 : e === "end" ? 2 : e === "start" ? 0 : t, ri = (e) => e === "center" ? "middle" : e === "end" ? "bottom" : "top", ni = (e) => {
  if (!String(e.display || "").toLowerCase().trim().includes("flex")) return null;
  const n = (e.flexDirection || "row").toLowerCase().startsWith("column"), i = vr(e.justifyContent, !0), o = vr(e.alignItems, !1), a = n ? o : i, l = n ? i : o;
  return {
    horizontalTextAlign: ti(a, 0),
    verticalAlign: ri(l)
  };
}, oi = (e) => {
  const t = Math.max(0, D(e.borderTopWidth, 0)), r = Math.max(0, D(e.borderRightWidth, 0)), n = Math.max(0, D(e.borderBottomWidth, 0)), i = Math.max(0, D(e.borderLeftWidth, 0)), o = Math.max(0, D(e.paddingTop, 0)), a = Math.max(0, D(e.paddingRight, 0)), l = Math.max(0, D(e.paddingBottom, 0)), c = Math.max(0, D(e.paddingLeft, 0));
  return {
    borderTop: t,
    borderRight: r,
    borderBottom: n,
    borderLeft: i,
    paddingTop: o,
    paddingRight: a,
    paddingBottom: l,
    paddingLeft: c
  };
}, ii = (e) => {
  const t = (e.verticalAlign || "").toLowerCase();
  return t === "middle" ? "middle" : t === "bottom" || t === "text-bottom" ? "bottom" : "top";
}, ai = /* @__PURE__ */ (() => {
  let e = null;
  return (t, r, n, i) => {
    if (!t) return Math.max(1, W(i));
    try {
      if (e || (e = document.createElement("canvas").getContext("2d")), !e) return Math.max(1, W(i));
      const o = r.fontStyle || "normal", a = r.fontWeight || "400", l = St(r.fontFamily, r);
      e.font = `${o} ${a} ${n}px ${l}`;
      const c = e.measureText(t), u = c.actualBoundingBoxAscent, f = c.actualBoundingBoxDescent, s = u + f;
      if (Number.isFinite(s) && s > 0)
        return Math.max(1, W(s));
    } catch {
      return Math.max(1, W(i));
    }
    return Math.max(1, W(i));
  };
})(), li = /* @__PURE__ */ (() => {
  let e = null;
  return (t, r, n, i = 0) => {
    if (!t) return 0;
    try {
      if (e || (e = document.createElement("canvas").getContext("2d")), !e) return 0;
      const o = r.fontStyle || "normal", a = r.fontWeight || "400", l = St(r.fontFamily, r);
      e.font = `${o} ${a} ${n}px ${l}`;
      const c = e.measureText(t), u = Number.isFinite(c.width) ? c.width : 0, f = Math.max(0, t.length - 1) * Math.max(0, i), s = u + f;
      return Math.max(0, W(s));
    } catch {
      return 0;
    }
  };
})(), si = (e) => {
  const t = e.textDecorationLine || e.getPropertyValue("text-decoration-line") || e.textDecoration || "", r = String(t).toLowerCase(), n = r.includes("underline"), i = r.includes("line-through");
  return { underline: n, strikethrough: i };
}, ci = (e) => e >= 700 ? "Bold" : e >= 600 ? "Semibold" : e >= 500 ? "Medium" : e <= 300 ? "Light" : "Regular", ui = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "-apple-system",
  "blinkmacsystemfont",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "emoji",
  "math",
  "fangsong"
]), di = {
  serif: ["Times New Roman", "Georgia"],
  "sans-serif": ["Arial", "Helvetica Neue", "Helvetica", "Segoe UI", "Roboto", "Tahoma", "Verdana"],
  "system-ui": ["Arial", "Helvetica Neue", "Helvetica", "Segoe UI", "Roboto"],
  "-apple-system": ["Arial", "Helvetica Neue", "Helvetica"],
  blinkmacsystemfont: ["Arial", "Helvetica Neue", "Helvetica"],
  "ui-sans-serif": ["Arial", "Helvetica Neue", "Helvetica", "Segoe UI", "Roboto"],
  "ui-serif": ["Times New Roman", "Georgia"],
  monospace: ["Menlo", "Consolas", "Courier New", "Monaco"],
  "ui-monospace": ["Menlo", "Consolas", "Courier New", "Monaco"]
}, fi = [
  "Arial",
  "Helvetica Neue",
  "Helvetica",
  "Segoe UI",
  "Roboto",
  "Tahoma",
  "Verdana",
  "PingFang SC",
  "Microsoft YaHei",
  "Noto Sans CJK SC",
  "Noto Sans SC"
], hi = (e) => {
  const t = [], r = /(?:"([^"]+)"|'([^']+)'|([^,\s][^,]*))/g;
  let n = null;
  for (; (n = r.exec(String(e || ""))) !== null; ) {
    const i = (n[1] ?? n[2] ?? n[3] ?? "").trim();
    i && t.push(i);
  }
  return t;
}, mi = (e) => {
  const t = String(e || "").trim().toLowerCase();
  return ui.has(t);
}, Cr = (e, t) => {
  const r = new Set(e.map((n) => n.toLowerCase()));
  for (const n of t) {
    const i = String(n || "").trim();
    if (!i) continue;
    const o = i.toLowerCase();
    r.has(o) || (r.add(o), e.push(i));
  }
}, gi = (e) => {
  const t = String(e);
  if (!t.endsWith("%")) return t.toLowerCase();
  const r = parseFloat(t);
  return Number.isFinite(r) ? r <= 50 ? "ultra-condensed" : r <= 62.5 ? "extra-condensed" : r <= 75 ? "condensed" : r <= 87.5 ? "semi-condensed" : r <= 100 ? "normal" : r <= 112.5 ? "semi-expanded" : r <= 125 ? "expanded" : r <= 150 ? "extra-expanded" : "ultra-expanded" : "normal";
}, Ar = /* @__PURE__ */ (() => {
  let e = null;
  const t = /* @__PURE__ */ new Map();
  return (r, n) => {
    if (!r || mi(r)) return !1;
    const i = (n == null ? void 0 : n.fontStretch) || "100%", o = (n == null ? void 0 : n.fontStyle) === "italic" ? "italic" : "normal", a = (n == null ? void 0 : n.fontWeight) || "400", l = `${r}|${i}|${o}|${a}`;
    if (t.has(l)) return t.get(l);
    try {
      if (e || (e = document.createElement("canvas").getContext("2d")), !e)
        return t.set(l, !1), !1;
      const c = "mmmmmmmmmmlli", u = "72px", f = gi(i), s = ["monospace", "sans-serif", "serif"];
      for (const d of s) {
        e.font = `${f} ${o} ${a} ${u} ${d}`;
        const h = e.measureText(c).width;
        e.font = `${f} ${o} ${a} ${u} "${r}", ${d}`;
        const m = e.measureText(c).width;
        if (h !== m)
          return t.set(l, !0), !0;
      }
    } catch {
      return t.set(l, !1), !1;
    }
    return t.set(l, !1), !1;
  };
})(), St = (e, t) => {
  const r = hi(e);
  for (const i of r)
    if (Ar(i, t)) return i;
  const n = [];
  for (const i of r) {
    const o = di[i.toLowerCase()];
    o && Cr(n, o);
  }
  Cr(n, fi);
  for (const i of n)
    if (Ar(i, t)) return i;
  return n[0] || "Roboto";
}, pi = St, bn = (e) => ir(e) || ar(e) ? "" : Array.from(e.childNodes).filter((r) => r.nodeType === Node.TEXT_NODE).map((r) => r.textContent || "").join(" ").replace(/\s+/g, " ").trim(), yi = (e, t, r) => {
  const n = Array.from(e.childNodes).filter(
    (s) => s.nodeType === Node.TEXT_NODE && (s.textContent || "").trim().length > 0
  );
  if (n.length === 0) return null;
  let i = Number.POSITIVE_INFINITY, o = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY, l = Number.NEGATIVE_INFINITY, c = !1, u = 0, f = 0;
  for (const s of n) {
    const d = document.createRange();
    d.selectNodeContents(s);
    const h = d.getClientRects();
    for (const m of h) {
      if (m.width <= 0 || m.height <= 0) continue;
      const g = m.left + window.scrollX, p = m.top + window.scrollY, b = m.right + window.scrollX, x = m.bottom + window.scrollY;
      u += 1, f = Math.max(f, m.width), i = Math.min(i, g), o = Math.min(o, p), a = Math.max(a, b), l = Math.max(l, x), c = !0;
    }
  }
  return c ? {
    x: W(i - t),
    y: W(o - r),
    width: W(Math.max(0, a - i)),
    height: W(Math.max(0, l - o)),
    lineCount: u,
    maxLineWidth: W(Math.max(0, f))
  } : null;
}, or = (e) => e instanceof Element ? !!(e.id === Sr || typeof e.closest == "function" && e.closest(`#${Sr}`)) : !1, bi = /^\/?\$[A-Za-z0-9:!?-]*$/, wi = /\b(measure|measurement|measurer|ruler|sizer|recharts)\b/i, st = 5e3, kr = (e) => {
  if (!(e instanceof Comment)) return !1;
  const t = String(e.textContent || "").trim();
  return t ? bi.test(t) : !1;
}, ir = (e) => {
  if (!(e instanceof HTMLElement)) return !1;
  const t = Array.from(e.childNodes || []);
  if (t.length === 0 || e.children.length > 0 || String(e.textContent || "").trim().length > 0 || !t.some((o) => kr(o)) || !t.every((o) => o.nodeType === Node.TEXT_NODE ? String(o.textContent || "").trim().length === 0 : o.nodeType === Node.COMMENT_NODE ? kr(o) : !1))
    return !1;
  const i = window.getComputedStyle(e);
  return e.hasAttribute("hidden") || i.display === "none" || i.visibility === "hidden" || D(i.opacity, 1) <= 0;
}, wn = (e) => {
  var a;
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.id || "", r = typeof e.className == "string" ? e.className : ((a = e.className) == null ? void 0 : a.baseVal) || "", n = e.getAttribute("data-testid") || "", i = e.getAttribute("data-role") || "", o = `${t} ${r} ${n} ${i}`;
  return wi.test(o);
}, ar = (e) => !(e instanceof HTMLElement) || !(String(e.getAttribute("aria-hidden") || "").toLowerCase() === "true") ? !1 : wn(e), xi = (e) => {
  var n, i;
  if (!e) return !1;
  const t = Math.max(window.innerWidth || 0, ((n = document.documentElement) == null ? void 0 : n.clientWidth) || 0), r = Math.max(window.innerHeight || 0, ((i = document.documentElement) == null ? void 0 : i.clientHeight) || 0);
  return e.right < -st || e.bottom < -st || e.left > t + st || e.top > r + st;
}, Si = (e, t = null, r = null) => {
  if (!(e instanceof HTMLElement) || !(String(e.getAttribute("aria-hidden") || "").toLowerCase() === "true")) return !1;
  const i = t || window.getComputedStyle(e), o = String(i.position || "").toLowerCase();
  if (o !== "absolute" && o !== "fixed") return !1;
  const a = r || e.getBoundingClientRect(), l = xi(a), c = wn(e);
  return l || c;
}, vi = (e) => {
  if (!(e instanceof HTMLElement || e instanceof SVGElement)) return !1;
  const t = e.tagName.toLowerCase();
  if (Go.has(t) || or(e) || ir(e) || ar(e)) return !1;
  const r = window.getComputedStyle(e);
  if (r.display === "none" || r.visibility === "hidden" || D(r.opacity, 1) <= 0) return !1;
  const n = e.getBoundingClientRect();
  return !(n.width <= 0 || n.height <= 0 || Si(e, r, n));
}, vt = (e, t, r) => {
  const n = e.getBoundingClientRect(), i = n.left + window.scrollX, o = n.top + window.scrollY;
  return {
    x: W(i - t),
    y: W(o - r),
    width: W(n.width),
    height: W(n.height)
  };
}, Mr = (e) => {
  const t = e.getAttribute("data-label");
  if (t) return t.slice(0, 40);
  if (e.id) return e.id.slice(0, 40);
  const r = e.getAttribute("aria-label");
  if (r) return r.slice(0, 40);
  const n = bn(e);
  return n ? n.slice(0, 40) : e.tagName.toLowerCase();
}, xn = (e) => {
  const t = e.backgroundImage;
  if (!t || t === "none") return null;
  const r = t.match(/url\((['"]?)(.*?)\1\)/i);
  return !r || !r[2] ? null : r[2];
}, Ci = (e) => {
  const t = [
    e.borderTopStyle,
    e.borderRightStyle,
    e.borderBottomStyle,
    e.borderLeftStyle
  ].map((r) => (r || "").toLowerCase()).filter(Boolean);
  return t.length === 0 ? !1 : t.some((r) => r !== "none" && r !== "solid");
}, Ai = (e) => {
  const t = e.backgroundImage;
  if (!t || t === "none") return !1;
  const r = t.toLowerCase();
  return r.includes("linear-gradient") || r.includes("radial-gradient") || r.includes("conic-gradient") || r.includes("repeating-linear-gradient") || r.includes("repeating-radial-gradient") ? !0 : !r.includes("url(");
}, Sn = (e) => !!(zo(e) || Ai(e) || Ci(e) || (e.borderImageSource || "none") !== "none" || (e.filter || "none") !== "none" || (e.backdropFilter || e.webkitBackdropFilter || "none") !== "none"), ki = async (e, t) => {
  try {
    const r = e.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return null;
    const n = 4096;
    if (r.width > n || r.height > n) return null;
    const { snapdom: i } = await Promise.resolve().then(() => io), o = e.cloneNode(!0);
    if (!(o instanceof HTMLElement || o instanceof SVGElement)) return null;
    if (o instanceof HTMLElement) {
      o.removeAttribute("id");
      for (let l = 0; l < t.length; l += 1) {
        const c = t[l], u = t.getPropertyValue(c);
        u && o.style.setProperty(c, u);
      }
      o.style.width = `${r.width}px`, o.style.height = `${r.height}px`, o.style.boxSizing = "border-box", o.style.margin = "0", o.style.position = "fixed", o.style.top = "0", o.style.left = "0", o.style.zIndex = "99999", o.style.pointerEvents = "none", o.style.visibility = "visible", o.style.opacity = "1", o.style.color = "transparent", o.style.webkitTextFillColor = "transparent", o.style.textShadow = "none";
    }
    Array.from(o.children).forEach((l) => {
      (l instanceof HTMLElement || l instanceof SVGElement) && (l.style.visibility = "hidden");
    }), document.body.appendChild(o);
    const a = await i.toPng(o, {
      fast: !1,
      embedFonts: !0,
      scale: 1,
      dpr: 1,
      width: r.width,
      height: r.height
    });
    return o.remove(), a != null && a.src ? a.src : null;
  } catch (r) {
    return console.warn("[htmlToAxure] captureElementFillImage failed, fallback to style mapping", r), null;
  }
}, Mi = async (e) => {
  try {
    const t = e.getBoundingClientRect();
    if (t.width <= 0 || t.height <= 0) return null;
    const r = 4096;
    if (t.width > r || t.height > r) return null;
    const { snapdom: n } = await Promise.resolve().then(() => io), i = await n.toPng(e, {
      fast: !1,
      embedFonts: !0,
      scale: 1,
      dpr: 1,
      width: t.width,
      height: t.height
    });
    return i != null && i.src ? i.src : null;
  } catch (t) {
    return console.warn("[htmlToAxure] captureSvgAsPngDataUrl failed", t), null;
  }
}, Ei = (e, t) => {
  const r = e.tagName.toLowerCase();
  if (r === "img")
    return e.currentSrc || e.src || null;
  if (r === "video")
    return e.poster || null;
  if (r === "canvas")
    try {
      return e.toDataURL("image/png");
    } catch {
      return null;
    }
  return xn(t);
}, $i = (e) => {
  if (!e) return e;
  const t = e.trim(), r = t.indexOf(";base64,");
  return t.startsWith("data:") && r > 0 ? t.slice(r + 8) : t;
}, Er = (e) => {
  let t = 0;
  for (let n = 0; n < e.length; n += 1)
    t = (t << 5) - t + e.charCodeAt(n), t |= 0;
  const r = (t >>> 0).toString(16).padStart(8, "0");
  return `${r}${r}${r}${r}${r}`.slice(0, 40);
}, Ti = async (e) => {
  var t;
  if ((t = globalThis.crypto) != null && t.subtle)
    try {
      const r = new TextEncoder().encode(e), n = await globalThis.crypto.subtle.digest("SHA-1", r);
      return Array.from(new Uint8Array(n)).map((i) => i.toString(16).padStart(2, "0")).join("");
    } catch {
      return Er(e);
    }
  return Er(e);
}, Te = ({ id: e, name: t, rect: r, opacity: n }) => ({
  itemType: gn,
  flippedHorizontal: !1,
  flippedVertical: !1,
  id: e,
  name: t,
  visible: !0,
  isLocked: !1,
  isNameDynamic: !1,
  rotation: 0,
  rect: {
    location: {
      x: r.x,
      y: r.y
    },
    size: {
      width: r.width,
      height: r.height
    }
  },
  resizingConstraints: nr(),
  opacity: n,
  textAlignment: hn,
  textPadding: [],
  effects: [],
  textShadows: [],
  booleanOperation: 0,
  textRotation: 0,
  isMask: !1
}), vn = (e) => {
  const t = (f, s) => {
    const d = W(Math.max(0, D(f, 0))), h = (s || "").toLowerCase();
    return h === "none" || h === "hidden" ? 0 : d;
  }, r = t(e.borderTopWidth, e.borderTopStyle), n = t(e.borderRightWidth, e.borderRightStyle), i = t(e.borderBottomWidth, e.borderBottomStyle), o = t(e.borderLeftWidth, e.borderLeftStyle), a = [r, n, i, o], l = Math.max(...a), c = l > 0, u = r > 0 && e.borderTopColor || n > 0 && e.borderRightColor || i > 0 && e.borderBottomColor || o > 0 && e.borderLeftColor || e.borderColor;
  return {
    hasBorder: c,
    maxWidth: l,
    strokeColor: u,
    border: a
  };
}, lr = (e) => [
  W(D(e.borderTopLeftRadius, 0)),
  W(D(e.borderTopRightRadius, 0)),
  W(D(e.borderBottomRightRadius, 0)),
  W(D(e.borderBottomLeftRadius, 0))
], sr = (e) => e.some((t) => t > 0.01), Cn = (e) => {
  const t = (e.overflow || "").toLowerCase(), r = (e.overflowX || "").toLowerCase(), n = (e.overflowY || "").toLowerCase();
  return Lt.has(t) || Lt.has(r) || Lt.has(n);
}, Fi = (e, t, r = 6) => Math.abs(e.x - t.x) <= r && Math.abs(e.y - t.y) <= r && Math.abs(e.width - t.width) <= r && Math.abs(e.height - t.height) <= r, ft = (e, t, r, n = {}) => {
  const { includeSelf: i = !1, maxDepth: o = 6 } = n;
  let a = 0, l = i ? e : e.parentElement;
  for (; l && a < o; ) {
    if (or(l)) {
      l = l.parentElement, a += 1;
      continue;
    }
    const c = window.getComputedStyle(l);
    if (Cn(c))
      return {
        element: l,
        rect: vt(l, t, r),
        corners: lr(c)
      };
    l = l.parentElement, a += 1;
  }
  return null;
}, An = (e, t, r, n) => {
  let i = 0, o = e.parentElement;
  for (; o && i < 4; ) {
    const a = ft(o, r, n, {
      includeSelf: !0,
      maxDepth: 1
    });
    if (a && sr(a.corners) && Fi(a.rect, t))
      return {
        rect: a.rect,
        corners: a.corners
      };
    o = o.parentElement, i += 1;
  }
  return null;
}, Li = (e, t, r, n, i) => {
  const o = lr(t);
  if (sr(o))
    return o;
  const a = An(e, r, n, i);
  return a != null && a.corners ? a.corners : o;
}, ct = ({ id: e, name: t, rect: r, corners: n, maskedItems: i }) => ({
  ...Te({
    id: e,
    name: t,
    rect: r,
    opacity: 1
  }),
  type: 0,
  corners: n,
  border: [0, 0, 0, 0],
  backgroundFills: [
    {
      type: tt,
      enabled: !1,
      color: { r: 1, g: 1, b: 1, a: 1 }
    }
  ],
  strokes: [],
  strokePattern: [],
  strokeThickness: 0,
  effects: [],
  isMask: !0,
  maskedScene: {
    items: i
  }
}), Ni = ({ id: e, name: t, rect: r }) => ({
  ...Te({
    id: e,
    name: t,
    rect: r,
    opacity: 1
  }),
  type: 0,
  corners: [0, 0, 0, 0],
  border: [0, 0, 0, 0],
  backgroundFills: [
    {
      type: tt,
      enabled: !1,
      color: { r: 1, g: 1, b: 1, a: 1 }
    }
  ],
  strokes: [],
  strokePattern: [],
  strokeThickness: 0,
  effects: [],
  textShadows: [],
  isMask: !0,
  maskedScene: {
    items: []
  }
}), Pi = ({ id: e, name: t, rect: r }) => ({
  id: e,
  name: t,
  itemType: mn,
  visible: !0,
  isLocked: !1,
  isNameDynamic: !1,
  rotation: 0,
  rect: {
    location: {
      x: r.x,
      y: r.y
    },
    size: {
      width: r.width,
      height: r.height
    }
  },
  resizingConstraints: nr(),
  effects: [],
  isMask: !1,
  flippedHorizontal: !1,
  flippedVertical: !1,
  opacity: 1,
  scene: {
    items: []
  }
}), Pt = (e) => !e || typeof e != "object" ? null : Number(e.itemType) === mn ? ((!e.scene || !Array.isArray(e.scene.items)) && (e.scene = { items: [] }), e.scene.items) : e.maskedScene && Array.isArray(e.maskedScene.items) ? e.maskedScene.items : null, Ri = (e, t) => {
  const r = e.tagName.toLowerCase();
  return r === "svg" ? !1 : !!(Ot.has(r) || !pn(t.backgroundColor) || t.backgroundImage && t.backgroundImage !== "none" || xn(t) || Sn(t) || vn(t).hasBorder);
}, Ii = (e, t, r, n) => ({
  itemType: gn,
  flippedHorizontal: !1,
  flippedVertical: !1,
  id: e,
  name: "Background",
  visible: !0,
  isLocked: !0,
  isNameDynamic: !1,
  rotation: 0,
  rect: {
    location: { x: 0, y: 0 },
    size: { width: t, height: r }
  },
  resizingConstraints: {
    hasFixedLeft: !0,
    hasFixedRight: !0,
    hasFixedTop: !0,
    hasFixedBottom: !0,
    hasFixedWidth: !1,
    hasFixedHeight: !1
  },
  strokes: [],
  strokeThickness: 0,
  strokePattern: [],
  type: 0,
  backgroundFills: [n],
  opacity: 1,
  booleanOperation: 0,
  corners: [0, 0, 0, 0],
  border: [1, 1, 1, 1],
  textAlignment: hn,
  textPadding: [],
  effects: [],
  textShadows: [],
  textRotation: 0,
  isMask: !1
}), Wi = (e) => {
  const t = window.getComputedStyle(e);
  return !(t.display === "none" || t.visibility === "hidden" || D(t.opacity, 1) <= 0);
}, We = (e, t, r) => !Number.isFinite(e) || !Number.isFinite(t) || !Number.isFinite(r) || r <= 0 ? 0 : W((e - t) / r), Hi = (e) => {
  const t = e.ownerSVGElement;
  if (!t || typeof t.createSVGPoint != "function")
    return [];
  const r = e.getTotalLength, n = e.getPointAtLength;
  if (typeof r != "function" || typeof n != "function")
    return [];
  const i = e.getScreenCTM();
  if (!i) return [];
  let o = 0;
  try {
    o = r.call(e);
  } catch {
    return [];
  }
  if (!Number.isFinite(o) || o < 0)
    return [];
  const a = Math.max(2, Math.min(240, Math.ceil(o / 6) + 1)), l = [];
  for (let u = 0; u < a; u += 1) {
    const f = a === 1 ? 0 : u / (a - 1), s = o * f;
    let d = null;
    try {
      d = n.call(e, s);
    } catch {
      d = null;
    }
    if (!d) continue;
    const h = t.createSVGPoint();
    h.x = d.x, h.y = d.y;
    const m = h.matrixTransform(i);
    l.push({
      x: m.x,
      y: m.y
    });
  }
  const c = [];
  for (const u of l) {
    const f = c[c.length - 1];
    (!f || Math.abs(f.x - u.x) > 1e-3 || Math.abs(f.y - u.y) > 1e-3) && c.push(u);
  }
  return c;
}, _i = (e) => {
  const t = [];
  if (!e) return t;
  const r = /([AaCcHhLlMmQqSsTtVvZz])|([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)/g;
  let n = r.exec(e);
  for (; n; ) {
    if (n[1])
      t.push(n[1]);
    else if (n[2]) {
      const i = Number.parseFloat(n[2]);
      Number.isFinite(i) && t.push(i);
    }
    n = r.exec(e);
  }
  return t;
}, $r = (e, t) => ({
  x: 2 * t.x - e.x,
  y: 2 * t.y - e.y
}), Tr = (e, t, r) => ({
  c1: {
    x: e.x + (t.x - e.x) * 2 / 3,
    y: e.y + (t.y - e.y) * 2 / 3
  },
  c2: {
    x: r.x + (t.x - r.x) * 2 / 3,
    y: r.y + (t.y - r.y) * 2 / 3
  }
}), Di = (e) => {
  const t = _i(e), r = [];
  if (t.length === 0) return r;
  let n = 0, i = null, o = { x: 0, y: 0 }, a = { x: 0, y: 0 }, l = null, c = null, u = null, f = !1;
  const s = () => typeof t[n] == "number", d = () => {
    const p = t[n];
    return typeof p != "number" ? null : (n += 1, p);
  }, h = () => (u || (u = {
    closed: !1,
    data: [],
    endDecoration: 1,
    startDecoration: 1
  }, r.push(u)), u), m = (p, b = 2, x, y) => {
    const w = h(), A = {
      type: b,
      to: {
        x: p.x,
        y: p.y
      }
    };
    return x && (A.lowerHandle = { x: x.x, y: x.y }), w.data.push(A), A;
  }, g = (p) => {
    const b = h(), x = b.data[b.data.length - 1];
    x && (x.type = 3, x.higherHandle = {
      x: p.x,
      y: p.y
    });
  };
  for (; n < t.length; ) {
    const p = t[n];
    if (typeof p == "string")
      i = p, n += 1;
    else if (!i) {
      n += 1;
      continue;
    }
    const b = i === i.toLowerCase(), x = i.toUpperCase();
    if (x === "Z") {
      u && (u.closed = !0), o = { x: a.x, y: a.y }, l = null, c = null, i = null;
      continue;
    }
    if (x === "M") {
      const y = d(), w = d();
      if (y === null || w === null) break;
      const A = {
        x: b ? o.x + y : y,
        y: b ? o.y + w : w
      };
      for (u = {
        closed: !1,
        data: [],
        endDecoration: 1,
        startDecoration: 1
      }, r.push(u), m(A, 2), o = A, a = A, l = null, c = null; s(); ) {
        const S = d(), v = d();
        if (S === null || v === null) break;
        const C = {
          x: b ? o.x + S : S,
          y: b ? o.y + v : v
        };
        m(C, 2), o = C;
      }
      continue;
    }
    if (x === "L") {
      for (; s(); ) {
        const y = d(), w = d();
        if (y === null || w === null) break;
        const A = {
          x: b ? o.x + y : y,
          y: b ? o.y + w : w
        };
        m(A, 2), o = A;
      }
      l = null, c = null;
      continue;
    }
    if (x === "H") {
      for (; s(); ) {
        const y = d();
        if (y === null) break;
        const w = {
          x: b ? o.x + y : y,
          y: o.y
        };
        m(w, 2), o = w;
      }
      l = null, c = null;
      continue;
    }
    if (x === "V") {
      for (; s(); ) {
        const y = d();
        if (y === null) break;
        const w = {
          x: o.x,
          y: b ? o.y + y : y
        };
        m(w, 2), o = w;
      }
      l = null, c = null;
      continue;
    }
    if (x === "C") {
      for (; s(); ) {
        const y = d(), w = d(), A = d(), S = d(), v = d(), C = d();
        if ([y, w, A, S, v, C].some((q) => q === null)) break;
        const M = {
          x: b ? o.x + y : y,
          y: b ? o.y + w : w
        }, k = {
          x: b ? o.x + A : A,
          y: b ? o.y + S : S
        }, H = {
          x: b ? o.x + v : v,
          y: b ? o.y + C : C
        };
        g(M), m(H, 3, k), o = H, l = k, c = null;
      }
      continue;
    }
    if (x === "S") {
      for (; s(); ) {
        const y = d(), w = d(), A = d(), S = d();
        if ([y, w, A, S].some((k) => k === null)) break;
        const v = l ? $r(l, o) : o, C = {
          x: b ? o.x + y : y,
          y: b ? o.y + w : w
        }, M = {
          x: b ? o.x + A : A,
          y: b ? o.y + S : S
        };
        g(v), m(M, 3, C), o = M, l = C, c = null;
      }
      continue;
    }
    if (x === "Q") {
      for (; s(); ) {
        const y = d(), w = d(), A = d(), S = d();
        if ([y, w, A, S].some((k) => k === null)) break;
        const v = {
          x: b ? o.x + y : y,
          y: b ? o.y + w : w
        }, C = {
          x: b ? o.x + A : A,
          y: b ? o.y + S : S
        }, M = Tr(o, v, C);
        g(M.c1), m(C, 3, M.c2), o = C, c = v, l = null;
      }
      continue;
    }
    if (x === "T") {
      for (; s(); ) {
        const y = d(), w = d();
        if ([y, w].some((C) => C === null)) break;
        const A = c ? $r(c, o) : o, S = {
          x: b ? o.x + y : y,
          y: b ? o.y + w : w
        }, v = Tr(o, A, S);
        g(v.c1), m(S, 3, v.c2), o = S, c = A, l = null;
      }
      continue;
    }
    if (x === "A") {
      for (f = !0; s(); ) {
        const y = d(), w = d(), A = d(), S = d(), v = d(), C = d(), M = d();
        if ([y, w, A, S, v, C, M].some((H) => H === null)) break;
        const k = {
          x: b ? o.x + C : C,
          y: b ? o.y + M : M
        };
        m(k, 2), o = k;
      }
      l = null, c = null;
      continue;
    }
    i = null;
  }
  return f ? [] : r.filter((p) => Array.isArray(p.data) && p.data.length >= 2);
}, Oi = (e) => {
  if (!e) return [];
  const t = [], r = /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/g;
  let n = r.exec(e);
  for (; n; ) {
    const o = Number.parseFloat(n[0]);
    Number.isFinite(o) && t.push(o), n = r.exec(e);
  }
  const i = [];
  for (let o = 0; o + 1 < t.length; o += 2)
    i.push({
      x: t[o],
      y: t[o + 1]
    });
  return i;
}, Fr = (e, t, r, n) => {
  if (r <= 0 || n <= 0) return [];
  const i = 0.5522847498307936, o = { x: e + r, y: t }, a = { x: e, y: t + n }, l = { x: e - r, y: t }, c = { x: e, y: t - n }, u = { x: e + r, y: t + n * i }, f = { x: e + r * i, y: t + n }, s = { x: e - r * i, y: t + n }, d = { x: e - r, y: t + n * i }, h = { x: e - r, y: t - n * i }, m = { x: e - r * i, y: t - n }, g = { x: e + r * i, y: t - n }, p = { x: e + r, y: t - n * i };
  return [
    {
      closed: !0,
      endDecoration: 1,
      startDecoration: 1,
      data: [
        { type: 3, to: o, higherHandle: u },
        { type: 3, to: a, lowerHandle: f, higherHandle: s },
        { type: 3, to: l, lowerHandle: d, higherHandle: h },
        { type: 3, to: c, lowerHandle: m, higherHandle: g },
        { type: 3, to: o, lowerHandle: p }
      ]
    }
  ];
}, Ui = (e) => {
  const t = e.tagName.toLowerCase();
  if (t === "path") {
    const r = e.getAttribute("d") || "";
    return Di(r);
  }
  if (t === "line") {
    const r = D(e.getAttribute("x1"), 0), n = D(e.getAttribute("y1"), 0), i = D(e.getAttribute("x2"), 0), o = D(e.getAttribute("y2"), 0);
    return [
      {
        closed: !1,
        endDecoration: 1,
        startDecoration: 1,
        data: [
          { type: 2, to: { x: r, y: n } },
          { type: 2, to: { x: i, y: o } }
        ]
      }
    ];
  }
  if (t === "polyline" || t === "polygon") {
    const r = Oi(e.getAttribute("points") || "");
    return r.length < 2 ? [] : [
      {
        closed: t === "polygon",
        endDecoration: 1,
        startDecoration: 1,
        data: r.map((n) => ({ type: 2, to: n }))
      }
    ];
  }
  if (t === "rect") {
    const r = D(e.getAttribute("x"), 0), n = D(e.getAttribute("y"), 0), i = D(e.getAttribute("width"), 0), o = D(e.getAttribute("height"), 0);
    return i <= 0 || o <= 0 ? [] : [
      {
        closed: !0,
        endDecoration: 1,
        startDecoration: 1,
        data: [
          { type: 2, to: { x: r, y: n } },
          { type: 2, to: { x: r + i, y: n } },
          { type: 2, to: { x: r + i, y: n + o } },
          { type: 2, to: { x: r, y: n + o } }
        ]
      }
    ];
  }
  if (t === "circle") {
    const r = D(e.getAttribute("cx"), 0), n = D(e.getAttribute("cy"), 0), i = D(e.getAttribute("r"), 0);
    return Fr(r, n, i, i);
  }
  if (t === "ellipse") {
    const r = D(e.getAttribute("cx"), 0), n = D(e.getAttribute("cy"), 0), i = D(e.getAttribute("rx"), 0), o = D(e.getAttribute("ry"), 0);
    return Fr(r, n, i, o);
  }
  return [];
}, Rt = (e, t, r) => {
  const n = e.createSVGPoint();
  n.x = r.x, n.y = r.y;
  const i = n.matrixTransform(t);
  return {
    x: i.x,
    y: i.y
  };
}, Lr = (e, t) => e.map((r) => {
  const n = {
    type: r.type,
    to: {
      x: We(r.to.x, t.left, t.width),
      y: We(r.to.y, t.top, t.height)
    }
  };
  return r.lowerHandle && (n.lowerHandle = {
    x: We(r.lowerHandle.x, t.left, t.width),
    y: We(r.lowerHandle.y, t.top, t.height)
  }), r.higherHandle && (n.higherHandle = {
    x: We(r.higherHandle.x, t.left, t.width),
    y: We(r.higherHandle.y, t.top, t.height)
  }), n;
}), zi = (e, t, r, n) => {
  const i = e.ownerSVGElement;
  if (!i) return null;
  const o = e.getScreenCTM();
  if (!o) return null;
  const a = e.getBoundingClientRect();
  if (!Number.isFinite(a.left) || !Number.isFinite(a.top) || a.width <= 0 && a.height <= 0) return null;
  const l = window.getComputedStyle(e), c = Ui(e);
  let u = [];
  if (c.length > 0 && (u = c.map((p) => {
    const b = (p.data || []).map((x) => {
      const y = Rt(i, o, x.to), w = {
        type: x.type,
        to: y
      };
      return x.lowerHandle && (w.lowerHandle = Rt(i, o, x.lowerHandle)), x.higherHandle && (w.higherHandle = Rt(i, o, x.higherHandle)), w;
    });
    return b.length < 2 ? null : {
      closed: !!p.closed,
      endDecoration: 1,
      startDecoration: 1,
      data: Lr(b, a)
    };
  }).filter(Boolean)), u.length === 0) {
    const p = Hi(e);
    if (p.length < 2) return null;
    u = [
      {
        closed: !1,
        endDecoration: 1,
        startDecoration: 1,
        data: Lr(
          p.map((b) => ({ type: 2, to: b })),
          a
        )
      }
    ];
  }
  const f = Math.max(0, W(D(l.strokeWidth, 0))), s = Ue(l.stroke, !0), d = l.fill, h = d && d !== "none" ? Ue(d, !0) : null, m = Math.min(1, Math.max(0, D(l.opacity, 1))), g = {
    x: W(a.left + window.scrollX - t),
    y: W(a.top + window.scrollY - r),
    width: W(a.width),
    height: W(a.height)
  };
  return {
    ...Te({
      id: n(),
      name: e.getAttribute("id") || e.getAttribute("data-label") || "Vector",
      rect: g,
      opacity: m
    }),
    resizingConstraints: Zo(),
    type: 2,
    backgroundFills: h ? [h] : [],
    strokes: s && f > 0 ? [yn(s, 1)] : [],
    strokeThickness: s && f > 0 ? f : 0,
    strokePattern: [],
    textAlignment: 1,
    paths: u,
    svgPaths: []
  };
}, Bi = (e, t, r, n) => {
  const i = vt(e, t, r);
  if (i.width <= 0 || i.height <= 0) return null;
  const o = Array.from(Yo).join(","), a = e.querySelectorAll(o), l = typeof SVGGeometryElement < "u", c = [];
  for (const s of a) {
    if (!(s instanceof SVGElement) || s.ownerSVGElement !== e || l && !(s instanceof SVGGeometryElement) || or(s) || !Wi(s)) continue;
    const d = zi(s, t, r, n);
    d && c.push(d);
  }
  if (c.length === 0) return null;
  const u = window.getComputedStyle(e), f = Math.min(1, Math.max(0, D(u.opacity, 1)));
  return {
    ...Te({
      id: n(),
      name: "SVG",
      rect: i,
      opacity: f
    }),
    type: 0,
    corners: [0, 0, 0, 0],
    border: [1, 1, 1, 1],
    backgroundFills: [
      {
        type: tt,
        enabled: !1,
        color: { r: 1, g: 1, b: 1, a: 1 }
      }
    ],
    strokes: [],
    strokePattern: [],
    strokeThickness: 0,
    textAlignment: 1,
    isMask: !0,
    maskedScene: {
      items: c
    }
  };
}, Vi = async (e, t, r, n, i, o) => {
  const a = vt(e, r, n);
  if (a.width <= 0 || a.height <= 0) return null;
  const l = await Mi(e);
  if (!l) return null;
  const c = await o(l);
  if (!c) return null;
  const u = Math.min(1, Math.max(0, D(t.opacity, 1)));
  return {
    ...Te({
      id: i(),
      name: "SVG",
      rect: a,
      opacity: u
    }),
    type: 0,
    corners: [0, 0, 0, 0],
    border: [1, 1, 1, 1],
    backgroundFills: [
      {
        type: dt,
        enabled: !0,
        image: c,
        isHash: !0,
        patternFillType: 4,
        alignment: { horizontal: 1, vertical: 1 }
      }
    ],
    strokes: [],
    strokePattern: [],
    strokeThickness: 0,
    textAlignment: 1
  };
};
async function kn(e = "body", t = {}) {
  const {
    rootName: r = document.title || "Page",
    useCustomSize: n = !1,
    targetWidth: i,
    targetHeight: o,
    preserveHierarchy: a = !1,
    preserveSvgIcons: l = !0
  } = t || {}, c = e instanceof HTMLElement || e instanceof SVGElement ? e : document.querySelector(e || "body");
  if (!c)
    throw new Error("htmlToAxure: target element not found");
  try {
    await Uo(c);
  } catch (L) {
    console.warn("[htmlToAxure] convertImagesInPage failed, continue:", L);
  }
  const u = c.getBoundingClientRect(), f = u.left + window.scrollX, s = u.top + window.scrollY, d = Ko(), h = n && Number.isFinite(i) && i > 0 ? W(i) : d.width, m = n && Number.isFinite(o) && o > 0 ? W(o) : d.height, g = {}, p = [];
  let b = 10;
  const x = () => `1-${b++}`, y = a ? /* @__PURE__ */ new WeakMap() : null, w = async (L) => {
    if (!L) return null;
    let B = L;
    if (!B.startsWith("data:"))
      try {
        B = new URL(B, document.baseURI).href;
      } catch {
        B = L;
      }
    const _ = $i(B), K = await Ti(_);
    return g[K] || (g[K] = _), K;
  }, A = (L, B, _, K) => {
    if (!a || !(L instanceof HTMLElement || L instanceof SVGElement) || L === c)
      return p;
    const re = y == null ? void 0 : y.get(L);
    if (re)
      return Pt(re) || p;
    let T = K;
    if (!T)
      try {
        T = window.getComputedStyle(L);
      } catch {
        T = null;
      }
    const F = ((T ? Cn(T) : !1) ? Ni : Pi)({
      id: x(),
      name: `${_ || Mr(L)}-hierarchy`,
      rect: B
    });
    let P = p;
    const N = L.parentElement;
    if (N && N !== c) {
      const I = y == null ? void 0 : y.get(N), O = Pt(I);
      O && (P = O);
    }
    return P.push(F), y == null || y.set(L, F), Pt(F) || P;
  }, S = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, {
    acceptNode(L) {
      return L instanceof Element ? ir(L) || ar(L) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  let v = c;
  for (; v; ) {
    if (v instanceof SVGElement && v.ownerSVGElement) {
      v = S.nextNode();
      continue;
    }
    if (vi(v)) {
      const L = window.getComputedStyle(v), B = vt(v, f, s);
      if (B.width > 0 && B.height > 0) {
        const _ = Math.min(1, Math.max(0, D(L.opacity, 1))), K = Mr(v), re = v.tagName.toLowerCase(), T = A(v, B, K, L);
        if (re === "svg") {
          let F = null;
          if (l && (F = Bi(v, f, s, x)), F || (F = await Vi(
            v,
            L,
            f,
            s,
            x,
            w
          )), F) {
            const P = a ? ft(v, f, s, {
              includeSelf: !1
            }) : null;
            if (P) {
              const N = ct({
                id: x(),
                name: `${K}-svg-clip-mask`,
                rect: P.rect,
                corners: P.corners,
                maskedItems: [F]
              });
              T.push(N);
            } else
              T.push(F);
          }
          v = S.nextNode();
          continue;
        }
        if (Ri(v, L)) {
          const F = x(), P = vn(L), N = [];
          let I = !1;
          if (Sn(L)) {
            const V = await ki(v, L);
            if (V) {
              const Y = await w(V);
              Y && (N.push({
                type: dt,
                enabled: !0,
                image: Y,
                isHash: !0,
                patternFillType: 4,
                alignment: { horizontal: 1, vertical: 1 }
              }), I = !0);
            }
          }
          if (!I) {
            const V = Ei(v, L);
            if (V) {
              const z = await w(V);
              z && N.push({
                type: dt,
                enabled: !0,
                image: z,
                isHash: !0,
                patternFillType: 4,
                alignment: { horizontal: 1, vertical: 1 }
              });
            }
            const Y = Ue(L.backgroundColor, !0);
            Y && N.push(Y);
          }
          const O = lr(L), j = Ot.has(re) && !sr(O) ? An(v, B, f, s) : null, Q = Ot.has(re) ? Li(v, L, B, f, s) : O, J = {
            ...Te({
              id: F,
              name: K,
              rect: B,
              opacity: _
            }),
            type: 0,
            corners: Q,
            border: P.border,
            backgroundFills: N,
            strokes: [],
            strokePattern: [],
            strokeThickness: I ? 0 : P.hasBorder ? P.maxWidth : 0,
            effects: Nt(L.boxShadow)
          };
          if (!I && P.hasBorder) {
            const V = Ue(P.strokeColor, !0), Y = yn(V, 0);
            Y && (J.strokes = [Y]);
          }
          const ee = a ? ft(v, f, s, {
            includeSelf: !1
          }) : null;
          if (ee) {
            const V = {
              ...J,
              corners: O
            }, Y = ct({
              id: x(),
              name: `${K}-clip-mask`,
              rect: ee.rect,
              corners: ee.corners,
              maskedItems: [V]
            });
            T.push(Y);
          } else if (j && N.some((V) => Number(V == null ? void 0 : V.type) === dt && (V == null ? void 0 : V.enabled) !== !1)) {
            const V = {
              ...J,
              corners: O
            }, Y = ct({
              id: x(),
              name: `${K}-mask`,
              rect: j.rect,
              corners: j.corners,
              maskedItems: [V]
            });
            T.push(Y);
          } else
            T.push(J);
        }
        const E = bn(v);
        if (E) {
          const F = x(), P = yi(v, f, s), N = Math.max(1, D(L.fontSize, 14)), I = L.lineHeight, O = !!(I && I !== "normal"), j = O ? Math.max(0, D(I, N)) : 0, Q = O ? Math.max(N, j) : W(N * 1.4), J = Math.max(100, Math.min(900, D(L.fontWeight, 400))), ee = St(L.fontFamily, L), V = rr(L.color) || {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }, Y = ei(L.textAlign), z = ni(L), oe = z ? z.horizontalTextAlign : Y, { underline: ge, strikethrough: Fe } = si(L), ie = oi(L), ye = B.x + ie.borderLeft + ie.paddingLeft, ce = B.y + ie.borderTop + ie.paddingTop, Mt = Math.max(
            1,
            W(
              B.width - ie.borderLeft - ie.borderRight - ie.paddingLeft - ie.paddingRight
            )
          ), Le = Math.max(
            1,
            W(
              B.height - ie.borderTop - ie.borderBottom - ie.paddingTop - ie.paddingBottom
            )
          ), Ne = O && j > N + 0.5 && Math.abs(j - Le) <= 2, Et = I && I !== "normal" ? Math.max(N, Math.min(Q, N * 1.25)) : Math.max(N, N * 1.2), Pe = ai(
            E,
            L,
            N,
            Et
          ), Ce = Math.min(Le, Math.max(1, Pe, Ne ? j : 1)), Re = z ? z.verticalAlign : ii(L), ot = Re === "middle" || Ne;
          let Ae = ce;
          ot ? Ae = ce + Math.max(0, (Le - Ce) / 2) : Re === "bottom" && (Ae = ce + Math.max(0, Le - Ce)), Ae = W(Ae);
          let Z = {
            x: W(ye),
            y: Ae,
            width: Mt,
            height: Ce
          };
          P && P.width > 0 && P.height > 0 && !Ne && !z && (Z = {
            x: P.x,
            y: P.y,
            width: P.width,
            height: P.height
          });
          const Ve = D(L.letterSpacing, 0), je = li(
            E,
            L,
            N,
            Ve
          ), Ie = String(L.whiteSpace || "").toLowerCase(), it = String(
            L.textWrapMode || L.getPropertyValue("text-wrap-mode") || ""
          ).toLowerCase(), at = Ie === "nowrap" || Ie === "pre" || Ie === "pre-nowrap" || it === "nowrap", lt = ((P == null ? void 0 : P.lineCount) || 0) <= 1 || Z.height <= Math.max(N, Q) * 1.35;
          if (je > Z.width + 0.5 && (at || lt)) {
            const le = Math.max(2, Math.min(12, Math.abs(Ve) * 2)), ke = W(je + le), de = ke - Z.width;
            de > 0 && (oe === 1 ? Z.x = W(Z.x - de / 2) : oe === 2 && (Z.x = W(Z.x - de)), Z.width = ke);
          }
          const te = Math.max(1, Math.ceil(Z.width)), ne = te - Z.width;
          ne > 0 && (oe === 1 ? Z.x = W(Z.x - ne / 2) : oe === 2 && (Z.x = W(Z.x - ne))), Z.width = te;
          const ue = {
            ...Te({
              id: F,
              name: E.slice(0, 40),
              rect: Z,
              opacity: _
            }),
            isNameDynamic: !0,
            type: 0,
            backgroundFills: [],
            strokes: [],
            strokePattern: [],
            strokeThickness: 0,
            textAlignment: oe,
            effects: Nt(L.textShadow),
            textShadows: Nt(L.textShadow),
            text: {
              paragraphs: [
                {
                  horizontalAlignment: oe,
                  lineSpacing: O ? W(j) : 0,
                  inlines: [
                    {
                      type: 0,
                      text: E,
                      family: ee,
                      typeface: `${ee} - ${ci(J)}`,
                      weight: J,
                      size: W(N),
                      textColor: V,
                      style: 0,
                      underline: ge,
                      strikethrough: Fe,
                      characterSpacing: W(Ve)
                    }
                  ]
                }
              ]
            }
          }, ae = a ? ft(v, f, s, {
            includeSelf: !0
          }) : null;
          if (ae) {
            const le = ct({
              id: x(),
              name: `${E.slice(0, 24)}-text-clip-mask`,
              rect: ae.rect,
              corners: ae.corners,
              maskedItems: [ue]
            });
            T.push(le);
          } else
            T.push(ue);
        }
      }
    }
    v = S.nextNode();
  }
  const C = window.getComputedStyle(c).backgroundColor || "rgba(255,255,255,1)", M = Ue(C, !pn(C)) || Ue("rgba(255,255,255,1)", !1), k = x(), H = x(), q = Ii(
    H,
    h,
    m,
    M
  ), U = {
    id: k,
    name: r || "Artboard",
    itemType: Xo,
    resizingConstraints: nr(),
    isNameDynamic: !1,
    rect: {
      location: {
        x: W(f),
        y: W(s)
      },
      size: {
        width: h,
        height: m
      }
    },
    backgroundFill: {
      type: tt,
      enabled: !1,
      color: M.color
    },
    backgroundShape: q,
    scene: {
      items: p
    }
  };
  return {
    masters: {},
    imageMap: g,
    scene: {
      items: [U]
    }
  };
}
var ji = kn;
const qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __resolveAvailableFontFamilyForTests: pi,
  default: ji,
  htmlToAxure: kn
}, Symbol.toStringTag, { value: "Module" }));
var Gi = Object.defineProperty, se = (e, t) => () => (e && (t = e(e = 0)), t), rt = (e, t) => {
  for (var r in t) Gi(e, r, { get: t[r], enumerable: !0 });
};
function Yi(e) {
  if (e === !0) return "soft";
  if (e === !1) return "disabled";
  if (typeof e == "string") {
    let t = e.toLowerCase().trim();
    if (t === "auto") return "auto";
    if (t === "full") return "full";
    if (t === "soft" || t === "disabled") return t;
  }
  return "soft";
}
function Xi(e = "soft") {
  switch ($.session.__counterEpoch = ($.session.__counterEpoch || 0) + 1, e) {
    case "auto": {
      $.session.styleMap = /* @__PURE__ */ new Map(), $.session.nodeMap = /* @__PURE__ */ new Map();
      return;
    }
    case "soft": {
      $.session.styleMap = /* @__PURE__ */ new Map(), $.session.nodeMap = /* @__PURE__ */ new Map(), $.session.styleCache = /* @__PURE__ */ new WeakMap();
      return;
    }
    case "full":
      return;
    case "disabled": {
      $.session.styleMap = /* @__PURE__ */ new Map(), $.session.nodeMap = /* @__PURE__ */ new Map(), $.session.styleCache = /* @__PURE__ */ new WeakMap(), $.computedStyle = /* @__PURE__ */ new WeakMap(), $.measureHints = /* @__PURE__ */ new WeakMap(), $.baseStyle = new fe(50), $.defaultStyle = new fe(30), $.image = new fe(100), $.background = new fe(100), $.resource = new fe(150), $.font = /* @__PURE__ */ new Set();
      return;
    }
    default: {
      $.session.styleMap = /* @__PURE__ */ new Map(), $.session.nodeMap = /* @__PURE__ */ new Map(), $.session.styleCache = /* @__PURE__ */ new WeakMap();
      return;
    }
  }
}
var fe, $, me = se(() => {
  fe = class extends Map {
    constructor(e = 100, ...t) {
      super(...t), this._maxSize = e;
    }
    set(e, t) {
      if (this.size >= this._maxSize && !this.has(e)) {
        let r = this.keys().next().value;
        r !== void 0 && this.delete(r);
      }
      return super.set(e, t);
    }
  }, $ = { image: new fe(100), background: new fe(100), resource: new fe(150), defaultStyle: new fe(30), baseStyle: new fe(50), computedStyle: /* @__PURE__ */ new WeakMap(), measureHints: /* @__PURE__ */ new WeakMap(), font: /* @__PURE__ */ new Set(), session: { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map() } };
});
function cr(e) {
  let t = e.match(/url\((['"]?)(.*?)(\1)\)/);
  if (!t) return null;
  let r = t[2].trim();
  return r.startsWith("#") ? null : r;
}
function Ki(e) {
  if (!e || e === "none") return "";
  let t = e.replace(/translate[XY]?\([^)]*\)/g, "");
  return t = t.replace(/matrix\(([^)]+)\)/g, (r, n) => {
    let i = n.split(",").map((o) => o.trim());
    return i.length !== 6 ? `matrix(${n})` : (i[4] = "0", i[5] = "0", `matrix(${i.join(", ")})`);
  }), t = t.replace(/matrix3d\(([^)]+)\)/g, (r, n) => {
    let i = n.split(",").map((o) => o.trim());
    return i.length !== 16 ? `matrix3d(${n})` : (i[12] = "0", i[13] = "0", `matrix3d(${i.join(", ")})`);
  }), t.trim().replace(/\s{2,}/g, " ");
}
function wt(e) {
  if (/%[0-9A-Fa-f]{2}/.test(e)) return e;
  try {
    return encodeURI(e);
  } catch {
    return e;
  }
}
function Qi(e, t) {
  var r;
  if (!e || /^(data|blob|about|#)/i.test(e.trim())) return e;
  try {
    let n = t || typeof document < "u" && (document.baseURI || ((r = document.location) == null ? void 0 : r.href)) || "http://localhost/";
    return new URL(e, n).href;
  } catch {
    return e;
  }
}
var Ct = se(() => {
});
function Ji(e = "[snapDOM]", { ttlMs: t = 5 * 6e4, maxEntries: r = 12 } = {}) {
  let n = /* @__PURE__ */ new Map(), i = 0;
  function o(a, l, c) {
    if (i >= r) return;
    let u = Date.now();
    (n.get(l) || 0) > u || (n.set(l, u + t), i++, a === "warn" && console && console.warn ? console.warn(`${e} ${c}`) : console && console.error && console.error(`${e} ${c}`));
  }
  return { warnOnce(a, l) {
    o("warn", a, l);
  }, errorOnce(a, l) {
    o("error", a, l);
  }, reset() {
    n.clear(), i = 0;
  } };
}
function Zi(e) {
  return /^data:|^blob:|^about:blank$/i.test(e);
}
function ea(e, t) {
  try {
    let r = typeof location < "u" && location.href ? location.href : "http://localhost/", n = t.includes("{url}") ? t.split("{url}")[0] : t, i = new URL(n || ".", r), o = new URL(e, r);
    if (o.origin === i.origin) return !0;
    let a = o.searchParams;
    if (a && (a.has("url") || a.has("target"))) return !0;
  } catch {
  }
  return !1;
}
function ta(e, t) {
  if (!t || Zi(e) || ea(e, t)) return !1;
  try {
    let r = typeof location < "u" && location.href ? location.href : "http://localhost/", n = new URL(e, r);
    return typeof location < "u" ? n.origin !== location.origin : !0;
  } catch {
    return !!t;
  }
}
function ra(e, t) {
  if (!t) return e;
  if (t.includes("{url}")) return t.replace("{urlRaw}", wt(e)).replace("{url}", encodeURIComponent(e));
  if (/[?&]url=?$/.test(t)) return `${t}${encodeURIComponent(e)}`;
  if (t.endsWith("?")) return `${t}url=${encodeURIComponent(e)}`;
  if (t.endsWith("/")) return `${t}${wt(e)}`;
  let r = t.includes("?") ? "&" : "?";
  return `${t}${r}url=${encodeURIComponent(e)}`;
}
function Nr(e) {
  return new Promise((t, r) => {
    let n = new FileReader();
    n.onload = () => t(String(n.result || "")), n.onerror = () => r(new Error("read_failed")), n.readAsDataURL(e);
  });
}
function na(e, t) {
  return [t.as || "blob", t.timeout ?? 3e3, t.useProxy || "", t.errorTTL ?? 8e3, e].join("|");
}
async function pe(e, t = {}) {
  let r = t.as ?? "blob", n = t.timeout ?? 3e3, i = t.useProxy || "", o = t.errorTTL ?? 8e3, a = t.headers || {}, l = !!t.silent;
  if (/^data:/i.test(e)) try {
    if (r === "text") return { ok: !0, data: String(e), status: 200, url: e, fromCache: !1 };
    if (r === "dataURL") return { ok: !0, data: String(e), status: 200, url: e, fromCache: !1, mime: String(e).slice(5).split(";")[0] || "" };
    let [, p = "", b = ""] = String(e).match(/^data:([^,]*),(.*)$/) || [], x = /;base64/i.test(p) ? atob(b) : decodeURIComponent(b), y = new Uint8Array([...x].map((A) => A.charCodeAt(0))), w = new Blob([y], { type: (p || "").split(";")[0] || "" });
    return { ok: !0, data: w, status: 200, url: e, fromCache: !1, mime: w.type || "" };
  } catch {
    return { ok: !1, data: null, status: 0, url: e, fromCache: !1, reason: "special_url_error" };
  }
  if (/^blob:/i.test(e)) try {
    let p = await fetch(e);
    if (!p.ok) return { ok: !1, data: null, status: p.status, url: e, fromCache: !1, reason: "http_error" };
    let b = await p.blob(), x = b.type || p.headers.get("content-type") || "";
    return r === "dataURL" ? { ok: !0, data: await Nr(b), status: p.status, url: e, fromCache: !1, mime: x } : r === "text" ? { ok: !0, data: await b.text(), status: p.status, url: e, fromCache: !1, mime: x } : { ok: !0, data: b, status: p.status, url: e, fromCache: !1, mime: x };
  } catch {
    return { ok: !1, data: null, status: 0, url: e, fromCache: !1, reason: "network" };
  }
  if (/^about:blank$/i.test(e)) return r === "dataURL" ? { ok: !0, data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==", status: 200, url: e, fromCache: !1, mime: "image/png" } : { ok: !0, data: r === "text" ? "" : new Blob([]), status: 200, url: e, fromCache: !1 };
  let c = na(e, { as: r, timeout: n, useProxy: i, errorTTL: o }), u = Ye.get(c);
  if (u && u.until > Date.now()) return { ...u.result, fromCache: !0 };
  u && Ye.delete(c);
  let f = ht.get(c);
  if (f) return f;
  let s = ta(e, i) ? ra(e, i) : e, d = t.credentials;
  if (!d) try {
    let p = typeof location < "u" && location.href ? location.href : "http://localhost/", b = new URL(e, p);
    d = typeof location < "u" && b.origin === location.origin ? "include" : "omit";
  } catch {
    d = "omit";
  }
  let h = new AbortController(), m = setTimeout(() => h.abort("timeout"), n), g = (async () => {
    try {
      let p = await fetch(s, { signal: h.signal, credentials: d, headers: a });
      if (!p.ok) {
        let y = { ok: !1, data: null, status: p.status, url: s, fromCache: !1, reason: "http_error" };
        if (o > 0 && Ye.set(c, { until: Date.now() + o, result: y }), !l) {
          let w = `${p.status} ${p.statusText || ""}`.trim();
          Ut.warnOnce(`http:${p.status}:${r}:${new URL(e, (location == null ? void 0 : location.href) ?? "http://localhost/").origin}`, `HTTP error ${w} while fetching ${r} ${e}`);
        }
        return t.onError && t.onError(y), y;
      }
      if (r === "text") return { ok: !0, data: await p.text(), status: p.status, url: s, fromCache: !1 };
      let b = await p.blob(), x = b.type || p.headers.get("content-type") || "";
      return r === "dataURL" ? { ok: !0, data: await Nr(b), status: p.status, url: s, fromCache: !1, mime: x } : { ok: !0, data: b, status: p.status, url: s, fromCache: !1, mime: x };
    } catch (p) {
      let b = p && typeof p == "object" && "name" in p && p.name === "AbortError" ? String(p.message || "").includes("timeout") ? "timeout" : "abort" : "network", x = { ok: !1, data: null, status: 0, url: s, fromCache: !1, reason: b };
      if (!/^blob:/i.test(e) && o > 0 && Ye.set(c, { until: Date.now() + o, result: x }), !l) {
        let y = `${b}:${r}:${new URL(e, (location == null ? void 0 : location.href) ?? "http://localhost/").origin}`, w = b === "timeout" ? `Timeout after ${n}ms. Consider increasing timeout or using a proxy for ${e}` : b === "abort" ? `Request aborted while fetching ${r} ${e}` : `Network/CORS issue while fetching ${r} ${e}. A proxy may be required`;
        Ut.errorOnce(y, w);
      }
      return t.onError && t.onError(x), x;
    } finally {
      clearTimeout(m), ht.delete(c);
    }
  })();
  return ht.set(c, g), g;
}
var Ut, ht, Ye, Be = se(() => {
  Ct(), Ut = Ji("[snapDOM]", { ttlMs: 3 * 6e4, maxEntries: 10 }), ht = /* @__PURE__ */ new Map(), Ye = /* @__PURE__ */ new Map();
});
async function Mn(e, t = {}) {
  if (/^((repeating-)?(linear|radial|conic)-gradient)\(/i.test(e) || e.trim() === "none") return e;
  let r = cr(e);
  if (!r) return e;
  let n = Qi(r), i = wt(n), o = (t.useProxy || "") + "|" + i;
  if ($.background.has(o)) {
    let a = $.background.get(o);
    return a ? `url("${a}")` : "none";
  }
  try {
    let a = await pe(i, { as: "dataURL", useProxy: t.useProxy });
    return a.ok ? ($.background.set(o, a.data), `url("${a.data}")`) : ($.background.set(o, null), "none");
  } catch {
    return $.background.set(o, null), "none";
  }
}
var oa = se(() => {
  me(), Ct(), Be();
});
function ia(e) {
  if (e = String(e).toLowerCase(), dr.has(e)) {
    let o = {};
    return $.defaultStyle.set(e, o), o;
  }
  if ($.defaultStyle.has(e)) return $.defaultStyle.get(e);
  let t = document.getElementById("snapdom-sandbox");
  t || (t = document.createElement("div"), t.id = "snapdom-sandbox", t.setAttribute("data-snapdom-sandbox", "true"), t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.left = "-9999px", t.style.top = "-9999px", t.style.width = "0px", t.style.height = "0px", t.style.overflow = "hidden", document.body.appendChild(t));
  let r = document.createElement(e);
  r.style.all = "initial", t.appendChild(r);
  let n = getComputedStyle(r), i = {};
  for (let o of n) {
    if (ur(o)) continue;
    let a = n.getPropertyValue(o);
    i[o] = a;
  }
  return t.removeChild(r), $.defaultStyle.set(e, i), i;
}
function ur(e) {
  let t = String(e).toLowerCase();
  return !!(Fn.has(t) || Tn.test(t) || $n.test(t));
}
function zt(e, t) {
  if (t = String(t || "").toLowerCase(), dr.has(t)) return "";
  let r = [], n = ia(t), i = (e.display || "").toLowerCase() === "inline", o = /* @__PURE__ */ new Set(["span", "small", "em", "strong", "b", "i", "u", "s", "code", "cite", "mark", "sub", "sup"]), a = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr", "td", "th"]), l = i || o.has(t) || a.has(t), c = (u) => u === "width" || u === "min-width" || u === "max-width" || u === "inline-size" || u === "min-inline-size" || u === "max-inline-size";
  for (let [u, f] of Object.entries(e)) {
    if (ur(u) || l && c(u)) continue;
    let s = n[u];
    f && f !== s && r.push(`${u}:${f}`);
  }
  return r.sort(), r.join(";");
}
function aa(e) {
  let t = /* @__PURE__ */ new Set();
  return e.nodeType !== Node.ELEMENT_NODE && e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE ? [] : (e.tagName && t.add(e.tagName.toLowerCase()), typeof e.querySelectorAll == "function" && e.querySelectorAll("*").forEach((r) => t.add(r.tagName.toLowerCase())), Array.from(t));
}
function la(e) {
  let t = /* @__PURE__ */ new Map();
  for (let n of e) {
    let i = $.defaultStyle.get(n);
    if (!i) continue;
    let o = Object.entries(i).map(([a, l]) => `${a}:${l};`).sort().join("");
    o && (t.has(o) || t.set(o, []), t.get(o).push(n));
  }
  let r = "";
  for (let [n, i] of t.entries()) r += `${i.join(",")} { ${n} }
`;
  return r;
}
function sa(e) {
  let t = Array.from(new Set(e.values())).filter(Boolean).sort(), r = /* @__PURE__ */ new Map(), n = 1;
  for (let i of t) r.set(i, `c${n++}`);
  return r;
}
function ca(e) {
  var t;
  try {
    let r = e == null ? void 0 : e.ownerDocument;
    if (!r) return typeof window < "u" ? window : null;
    let n = r.defaultView;
    if (n && typeof n.getComputedStyle == "function") return n;
    if (typeof window < "u" && window.frames) for (let i = 0; i < window.frames.length; i++) try {
      if (((t = window.frames[i]) == null ? void 0 : t.document) === r) return window.frames[i];
    } catch {
    }
  } catch {
  }
  return typeof window < "u" ? window : null;
}
function he(e, t = null) {
  let r = () => {
    let o = { length: 0, getPropertyValue: () => "", item: () => "" };
    return o[Symbol.iterator] = function* () {
    }, o;
  };
  if (!(e instanceof Element)) {
    let o = typeof window < "u" ? window : null;
    if (o && typeof o.getComputedStyle == "function") try {
      return o.getComputedStyle(e, t) || r();
    } catch {
      return r();
    }
    return r();
  }
  let n = $.computedStyle.get(e);
  n || (n = /* @__PURE__ */ new Map(), $.computedStyle.set(e, n));
  let i = n.get(t);
  if (!i) {
    let o = ca(e), a = null;
    try {
      a = o && typeof o.getComputedStyle == "function" ? o.getComputedStyle(e, t) : null;
    } catch {
    }
    if (!a && typeof window < "u" && typeof window.getComputedStyle == "function") try {
      e.ownerDocument === document && (a = window.getComputedStyle(e, t));
    } catch {
    }
    i = a || r(), n.set(t, i);
  }
  return i;
}
function Pr(e) {
  let t = {};
  for (let r of e) t[r] = e.getPropertyValue(r);
  for (let r of Ln) {
    let n = t[`border-${r}-style`], i = t[`border-${r}-width`];
    (n === "none" || n === "hidden" || i === "0px") && (delete t[`border-${r}-style`], delete t[`border-${r}-width`], delete t[`border-${r}-color`]);
  }
  return t;
}
function Bt(e) {
  let t = [], r = 0, n = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    o === "(" && r++, o === ")" && r--, o === "," && r === 0 && (t.push(e.slice(n, i).trim()), n = i + 1);
  }
  return t.push(e.slice(n).trim()), t;
}
var En, dr, $n, Tn, Fn, Ln, fr = se(() => {
  me(), En = /* @__PURE__ */ new Set(["meta", "script", "noscript", "title", "link", "template"]), dr = /* @__PURE__ */ new Set(["meta", "link", "style", "title", "noscript", "script", "template", "g", "defs", "use", "marker", "mask", "clipPath", "pattern", "path", "polygon", "polyline", "line", "circle", "ellipse", "rect", "filter", "lineargradient", "radialgradient", "stop"]), $n = /(?:^|-)(animation|transition)(?:-|$)/i, Tn = /^(--.+|view-timeline|scroll-timeline|animation-trigger|offset-|position-try|app-region|interactivity|overlay|view-transition|-webkit-locale|-webkit-user-(?:drag|modify)|-webkit-tap-highlight-color|-webkit-text-security)$/i, Fn = /* @__PURE__ */ new Set(["cursor", "pointer-events", "touch-action", "user-select", "print-color-adjust", "speak", "reading-flow", "reading-order", "anchor-name", "anchor-scope", "container-name", "container-type", "timeline-scope", "zoom"]), Ln = ["top", "right", "bottom", "left"];
});
function De(e, { fast: t = !1 } = {}) {
  if (t) return e();
  "requestIdleCallback" in window ? requestIdleCallback(e, { timeout: 50 }) : setTimeout(e, 1);
}
function ua() {
  if (typeof navigator > "u") return !1;
  if (navigator.userAgentData) return navigator.userAgentData.platform === "iOS";
  let e = navigator.userAgent || "", t = /iPhone|iPad|iPod/.test(e), r = navigator.maxTouchPoints > 2 && /Macintosh/.test(e);
  return t || r;
}
function ve() {
  if (typeof navigator > "u") return !1;
  let e = navigator.userAgent || "", t = e.toLowerCase(), r = t.includes("safari") && !t.includes("chrome") && !t.includes("crios") && !t.includes("fxios") && !t.includes("android"), n = /applewebkit/i.test(e), i = /mobile/i.test(e), o = !/safari/i.test(e), a = n && i && o, l = /(micromessenger|wxwork|wecom|windowswechat|macwechat)/i.test(e), c = /(baiduboxapp|baidubrowser|baidusearch|baiduboxlite)/i.test(t), u = /ipad|iphone|ipod/.test(t) && n;
  return r || a || l || c || u;
}
function da() {
  if (typeof navigator > "u") return !1;
  let e = (navigator.userAgent || "").toLowerCase();
  return e.includes("firefox") || e.includes("fxios");
}
var nt = se(() => {
});
function G(e, t, r) {
  let n = e && typeof e == "object" && (e.options || e);
  n && n.debug && (r !== void 0 ? console.warn("[snapdom]", t, r) : console.warn("[snapdom]", t));
}
var Nn = se(() => {
}), be = se(() => {
  oa(), fr(), nt(), Ct(), Nn();
}), Pn = {};
rt(Pn, { toCanvas: () => At });
function fa(e) {
  if (!Rn(e)) return e;
  try {
    let t = In(e), r = t.match(/<svg\b[^>]*>/i);
    if (!r) return e;
    let n = r[0], i = parseFloat((n.match(/\bwidth="([\d.]+)/i) || [])[1]), o = parseFloat((n.match(/\bheight="([\d.]+)/i) || [])[1]);
    if (!Number.isFinite(i) || !Number.isFinite(o) || i <= 0 || o <= 0) return e;
    let a = Math.min(1, Ee / i, Ee / o, Math.sqrt(hr / (i * o)));
    if (a >= 1) return e;
    let l = Math.max(1, Math.floor(i * a)), c = Math.max(1, Math.floor(o * a));
    console.warn(`[snapDOM] Capture ${Math.round(i)}×${Math.round(o)}px exceeds the browser image-decode limit (${Ee}px/side); downscaling to ${l}×${c}px. Lower \`scale\` or set \`width\`/\`height\` to control output size.`);
    let u = t.replace(n, n.replace(/(\bwidth=")[\d.]+/i, `$1${l}`).replace(/(\bheight=")[\d.]+/i, `$1${c}`));
    return Wn(u);
  } catch {
    return e;
  }
}
function Rn(e) {
  return typeof e == "string" && /^data:image\/svg\+xml/i.test(e);
}
function In(e) {
  let t = e.indexOf(",");
  return t >= 0 ? decodeURIComponent(e.slice(t + 1)) : "";
}
function Wn(e) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`;
}
function ha(e) {
  let t = [], r = "", n = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    o === "(" && n++, o === ")" && (n = Math.max(0, n - 1)), o === ";" && n === 0 ? (t.push(r), r = "") : r += o;
  }
  return r.trim() && t.push(r), t.map((i) => i.trim()).filter(Boolean);
}
function ma(e) {
  let t = [], r = "", n = 0;
  for (let o = 0; o < e.length; o++) {
    let a = e[o];
    a === "(" && n++, a === ")" && (n = Math.max(0, n - 1)), a === "," && n === 0 ? (t.push(r.trim()), r = "") : r += a;
  }
  r.trim() && t.push(r.trim());
  let i = [];
  for (let o of t) {
    if (/\binset\b/i.test(o)) continue;
    let a = o.match(/-?\d+(?:\.\d+)?px/gi) || [], [l = "0px", c = "0px", u = "0px"] = a, f = o.replace(/-?\d+(?:\.\d+)?px/gi, "").replace(/\binset\b/ig, "").trim().replace(/\s{2,}/g, " "), s = !!f && f !== ",";
    i.push(`drop-shadow(${l} ${c} ${u}${s ? ` ${f}` : ""})`);
  }
  return i.join(" ");
}
function Hn(e) {
  let t = ha(e), r = null, n = null, i = null, o = [];
  for (let l of t) {
    let c = l.indexOf(":");
    if (c < 0) continue;
    let u = l.slice(0, c).trim().toLowerCase(), f = l.slice(c + 1).trim();
    u === "box-shadow" ? i = f : u === "filter" ? r = f : u === "-webkit-filter" ? n = f : o.push([u, f]);
  }
  if (i) {
    let l = ma(i);
    l && (r = r ? `${r} ${l}` : l, n = n ? `${n} ${l}` : l);
  }
  let a = [...o];
  return r && a.push(["filter", r]), n && a.push(["-webkit-filter", n]), a.map(([l, c]) => `${l}:${c}`).join(";");
}
function ga(e) {
  return e.replace(/([^{}]+)\{([^}]*)\}/g, (t, r, n) => `${r}{${Hn(n)}}`);
}
function pa(e) {
  return e = e.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (t, r) => t.replace(r, ga(r))), e = e.replace(/style=(['"])([\s\S]*?)\1/gi, (t, r, n) => `style=${r}${Hn(n)}${r}`), e;
}
function ya(e) {
  if (!ve() || !Rn(e)) return e;
  try {
    let t = In(e), r = pa(t);
    return Wn(r);
  } catch {
    return e;
  }
}
async function At(e, t) {
  let { width: r, height: n, scale: i = 1, dpr: o = 1, meta: a = {}, backgroundColor: l } = t;
  e = ya(e), e = fa(e);
  let c = new Image();
  if (c.loading = "eager", c.decoding = "sync", c.crossOrigin = "anonymous", c.src = e, await c.decode(), ve()) {
    c.style.cssText = "position:fixed;left:-99999px;top:-99999px;pointer-events:none", document.body.appendChild(c);
    try {
      await new Promise((S) => requestAnimationFrame(() => requestAnimationFrame(S)));
    } finally {
      try {
        c.remove();
      } catch {
      }
    }
  }
  let u = c.naturalWidth, f = c.naturalHeight, s = Number.isFinite(a.w0) ? a.w0 : u, d = Number.isFinite(a.h0) ? a.h0 : f, h, m, g = Number.isFinite(r), p = Number.isFinite(n);
  if (g && p) h = Math.max(1, r), m = Math.max(1, n);
  else if (g) {
    let S = r / Math.max(1, s);
    h = r, m = d * S;
  } else if (p) {
    let S = n / Math.max(1, d);
    m = n, h = s * S;
  } else h = u, m = f;
  h = h * i, m = m * i;
  let b = h * o, x = m * o, y = Math.max(b / Ee, x / Ee, Math.sqrt(b * x / hr));
  y > 1 && (console.warn(`[snapDOM] Output ${Math.round(b)}×${Math.round(x)}px exceeds the browser canvas limit (${Ee}px/side); downscaling. Lower \`scale\`/\`dpr\` or set \`width\`/\`height\`.`), h /= y, m /= y);
  let w = document.createElement("canvas");
  w.width = h * o, w.height = m * o, w.style.width = `${h}px`, w.style.height = `${m}px`;
  let A = w.getContext("2d");
  return o !== 1 && A.scale(o, o), l && (A.save(), A.fillStyle = l, A.fillRect(0, 0, h, m), A.restore()), A.drawImage(c, 0, 0, h, m), w;
}
var Ee, hr, kt = se(() => {
  nt(), Ee = 16384, hr = 16384 * 16384;
}), mt = {};
rt(mt, { rasterize: () => _n });
async function _n(e, t) {
  let r = await At(e, t), n = new Image();
  return n.src = r.toDataURL(`image/${t.format}`, t.quality), await n.decode(), n.style.width = `${r.width / t.dpr}px`, n.style.height = `${r.height / t.dpr}px`, n;
}
var gt = se(() => {
  kt();
}), Vt = {};
rt(Vt, { toImg: () => Rr, toSvg: () => Rr });
async function Rr(e, t) {
  let { scale: r = 1, width: n, height: i, meta: o = {} } = t, a = Number.isFinite(n), l = Number.isFinite(i), c = Number.isFinite(r) && r !== 1 || a || l;
  if (ve() && c) return await _n(e, { ...t, format: "png", quality: 1, meta: o });
  let u = new Image();
  if (u.decoding = "sync", u.loading = "eager", u.src = e, await u.decode(), a && l) u.style.width = `${n}px`, u.style.height = `${i}px`;
  else if (a) {
    let f = Number.isFinite(o.w0) ? o.w0 : u.naturalWidth, s = Number.isFinite(o.h0) ? o.h0 : u.naturalHeight, d = n / Math.max(1, f);
    u.style.width = `${n}px`, u.style.height = `${Math.round(s * d)}px`;
  } else if (l) {
    let f = Number.isFinite(o.w0) ? o.w0 : u.naturalWidth, s = Number.isFinite(o.h0) ? o.h0 : u.naturalHeight, d = i / Math.max(1, s);
    u.style.height = `${i}px`, u.style.width = `${Math.round(f * d)}px`;
  } else {
    let f = Math.round(u.naturalWidth * r), s = Math.round(u.naturalHeight * r);
    if (u.style.width = `${f}px`, u.style.height = `${s}px`, typeof e == "string" && e.startsWith("data:image/svg+xml")) try {
      let d = decodeURIComponent(e.split(",")[1]).replace(/width="[^"]*"/, `width="${f}"`).replace(/height="[^"]*"/, `height="${s}"`);
      e = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(d)}`, u.src = e;
    } catch (d) {
      G(t, "SVG width/height patch in toImg failed", d);
    }
  }
  return u;
}
var Ir = se(() => {
  be(), gt();
}), Dn = {};
rt(Dn, { toBlob: () => On });
async function On(e, t) {
  let r = t.type;
  if (r === "svg") {
    let i = decodeURIComponent(e.split(",")[1]);
    return new Blob([i], { type: "image/svg+xml" });
  }
  let n = await At(e, t);
  return new Promise((i) => n.toBlob((o) => i(o), `image/${r}`, t.quality));
}
var Un = se(() => {
  kt();
}), zn = {};
rt(zn, { download: () => ba });
async function Wr(e, t) {
  var n;
  let r = new File([e], t, { type: e.type });
  if (!((n = navigator.canShare) != null && n.call(navigator, { files: [r] }))) return !1;
  try {
    await navigator.share({ files: [r], title: t });
  } catch (i) {
    if (i.name !== "AbortError") return !1;
  }
  return !0;
}
async function ba(e, t) {
  let r = /* @__PURE__ */ new Set(["png", "jpeg", "jpg", "webp", "svg"]), n = ((t == null ? void 0 : t.type) || "").toLowerCase(), i = r.has(n) ? n : "", o = ((t == null ? void 0 : t.format) || i || "").toLowerCase(), a = o === "jpg" ? "jpeg" : o || "png", l = (t == null ? void 0 : t.filename) || `snapdom.${a}`, c = { ...t || {}, format: a, type: a };
  c.dpr = 1;
  let u = ua();
  if (a === "svg") {
    let d = await On(e, { ...c, type: "svg" });
    if (u && await Wr(d, l)) return;
    let h = URL.createObjectURL(d), m = document.createElement("a");
    m.href = h, m.download = l, document.body.appendChild(m), m.click(), URL.revokeObjectURL(h), m.remove();
    return;
  }
  let f = await At(e, c);
  if (u) {
    let d = `image/${a}`, h = await new Promise((m) => f.toBlob(m, d, t == null ? void 0 : t.quality));
    if (h && await Wr(h, l)) return;
  }
  let s = document.createElement("a");
  s.href = f.toDataURL(`image/${a}`, t == null ? void 0 : t.quality), s.download = l, document.body.appendChild(s), s.click(), s.remove();
}
var wa = se(() => {
  Un(), kt(), nt();
});
be();
be();
me();
var Hr = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new Map(), xa = 2e3, jt = 0;
function Xe() {
  jt++, Ze.size > xa && Ze.clear();
}
var _r = !1;
function Sa(e = document.documentElement) {
  var t, r;
  if (!_r) {
    _r = !0;
    try {
      new MutationObserver(() => Xe()).observe(e, { subtree: !0, childList: !0, characterData: !0, attributes: !0 });
    } catch {
    }
    try {
      new MutationObserver(() => Xe()).observe(document.head, { subtree: !0, childList: !0, characterData: !0, attributes: !0 });
    } catch {
    }
    try {
      let n = document.fonts;
      n && ((t = n.addEventListener) == null || t.call(n, "loadingdone", Xe), (r = n.ready) == null || r.then(() => Xe()).catch(() => {
      }));
    } catch {
    }
  }
}
function va(e, t = {}) {
  let r = {}, n = e.getPropertyValue("visibility"), i = t.excludeStyleProps;
  for (let s = 0; s < e.length; s++) {
    let d = e[s];
    if (ur(d) || i && (i instanceof RegExp && i.test(d) || typeof i == "function" && i(d))) continue;
    let h = e.getPropertyValue(d);
    (d === "background-image" || d === "content") && h.includes("url(") && !h.includes("data:") && (h = "none"), r[d] = h;
  }
  let o = ["text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset", "text-decoration-skip-ink"];
  for (let s of o) if (!r[s]) try {
    let d = e.getPropertyValue(s);
    d && (r[s] = d);
  } catch {
  }
  let a = ["-webkit-text-stroke", "-webkit-text-stroke-width", "-webkit-text-stroke-color", "paint-order"];
  for (let s of a) if (!r[s]) try {
    let d = e.getPropertyValue(s);
    d && (r[s] = d);
  } catch {
  }
  if (t.embedFonts) {
    let s = ["font-feature-settings", "font-variation-settings", "font-kerning", "font-variant", "font-variant-ligatures", "font-optical-sizing"];
    for (let d of s) if (!r[d]) try {
      let h = e.getPropertyValue(d);
      h && (r[d] = h);
    } catch {
    }
  }
  n === "hidden" && (r.opacity = "0");
  try {
    (r["content-visibility"] || e.getPropertyValue("content-visibility")) === "hidden" && (r.visibility = "hidden");
  } catch {
  }
  let l = parseFloat(e.getPropertyValue("border-top-width") || 0) || 0, c = parseFloat(e.getPropertyValue("border-right-width") || 0) || 0, u = parseFloat(e.getPropertyValue("border-bottom-width") || 0) || 0, f = parseFloat(e.getPropertyValue("border-left-width") || 0) || 0;
  if (l === 0 && c === 0 && u === 0 && f === 0) {
    let s = (e.getPropertyValue("border-image-source") || "").trim(), d = s && s !== "none", h = ["border", "border-top", "border-right", "border-bottom", "border-left", "border-width", "border-style", "border-color", "border-top-width", "border-top-style", "border-top-color", "border-right-width", "border-right-style", "border-right-color", "border-bottom-width", "border-bottom-style", "border-bottom-color", "border-left-width", "border-left-style", "border-left-color", "border-block", "border-block-width", "border-block-style", "border-block-color", "border-inline", "border-inline-width", "border-inline-style", "border-inline-color"];
    for (let m of h) delete r[m];
    d || (r.border = "none");
  }
  return r;
}
var Dr = /* @__PURE__ */ new WeakMap();
function Ca(e) {
  let t = Dr.get(e);
  return t || (t = Object.entries(e).sort((r, n) => r[0] < n[0] ? -1 : r[0] > n[0] ? 1 : 0).map(([r, n]) => `${r}:${n}`).join(";"), Dr.set(e, t), t);
}
function Aa(e, t = null, r = {}) {
  let n = Hr.get(e), i = !!(r && r.embedFonts), o = r && r.excludeStyleProps || null;
  if (n && n.epoch === jt && n.embedFonts === i && n.excludeStyleProps === o) return n.snapshot;
  let a = t || getComputedStyle(e), l = va(a, r);
  return Fa(e, a, l), Hr.set(e, { epoch: jt, snapshot: l, embedFonts: i, excludeStyleProps: o }), l;
}
function ka(e, t) {
  return e && e.session && e.persist ? e : e && (e.styleMap || e.styleCache || e.nodeMap) ? { session: e, persist: { snapshotKeyCache: Ze, defaultStyle: $.defaultStyle, baseStyle: $.baseStyle, image: $.image, resource: $.resource, background: $.background, font: $.font }, options: t || {} } : { session: $.session, persist: { snapshotKeyCache: Ze, defaultStyle: $.defaultStyle, baseStyle: $.baseStyle, image: $.image, resource: $.resource, background: $.background, font: $.font }, options: e || t || {} };
}
function Ma(e, t, r) {
  if (!(!e.style || e.style.length === 0)) for (let n = 0; n < e.style.length; n++) {
    let i = e.style[n], o = r.getPropertyValue(i);
    o && t.style.setProperty(i, o);
  }
}
async function Me(e, t, r, n) {
  var d, h;
  if (e.tagName === "STYLE") return;
  let i = ka(r, n), o = i.options && i.options.cache || "auto";
  o !== "disabled" && Sa(document.documentElement), o === "disabled" && !i.session.__bumpedForDisabled && (Xe(), Ze.clear(), i.session.__bumpedForDisabled = !0);
  let { session: a, persist: l } = i;
  if (!a.styleCache.has(e)) {
    let m = null;
    try {
      m = getComputedStyle(e);
    } catch {
    }
    a.styleCache.set(e, m || getComputedStyle(document.documentElement));
  }
  let c = a.styleCache.get(e);
  (d = e.getAttribute) != null && d.call(e, "style") && Ma(e, t, c);
  let u = Aa(e, c, i.options);
  if (Bn(e)) {
    let m = c.getPropertyValue("min-width");
    (!m || m === "auto" || m === "0px") && (u["min-width"] = "0px");
  }
  let f = Ca(u), s = l.snapshotKeyCache.get(f);
  if (!s) {
    let m = ((h = e.tagName) == null ? void 0 : h.toLowerCase()) || "div";
    s = zt(u, m), l.snapshotKeyCache.set(f, s);
  }
  a.styleMap.set(t, s);
}
function Ea(e) {
  return e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof HTMLVideoElement || e instanceof HTMLIFrameElement || e instanceof SVGElement || e instanceof HTMLObjectElement || e instanceof HTMLEmbedElement;
}
function $a(e) {
  return e.backgroundImage && e.backgroundImage !== "none" || e.backgroundColor && e.backgroundColor !== "rgba(0, 0, 0, 0)" && e.backgroundColor !== "transparent" || (parseFloat(e.borderTopWidth) || 0) > 0 || (parseFloat(e.borderBottomWidth) || 0) > 0 || (parseFloat(e.paddingTop) || 0) > 0 || (parseFloat(e.paddingBottom) || 0) > 0 ? !0 : (e.overflowBlock || e.overflowY || "visible") !== "visible";
}
function Bn(e) {
  let t = e.parentElement;
  if (!t) return !1;
  let r = he(t).display || "";
  return r.includes("flex") || r.includes("grid");
}
function Ta(e, t) {
  if (e.textContent && /\S/.test(e.textContent)) return !0;
  let r = e.firstElementChild, n = e.lastElementChild;
  if (r && r.tagName === "BR" || n && n.tagName === "BR") return !0;
  let i = e.scrollHeight;
  if (i === 0) return !1;
  let o = parseFloat(t.paddingTop) || 0, a = parseFloat(t.paddingBottom) || 0;
  return i > o + a;
}
function Fa(e, t, r) {
  if (e instanceof HTMLElement && e.style && e.style.height) return;
  let n = e.tagName && e.tagName.toLowerCase();
  if (!n || !["div", "section", "article", "main", "aside", "header", "footer", "nav"].includes(n)) return;
  let i = parseFloat(t.height);
  if (Number.isFinite(i) && e.scrollHeight > 0 && Math.abs(i - e.scrollHeight) > 2 || t.aspectRatio && t.aspectRatio !== "none" && t.aspectRatio !== "auto") return;
  let o = t.display || "";
  if (o.includes("flex") || o.includes("grid") || Ea(e)) return;
  let a = t.position;
  if (a === "absolute" || a === "fixed" || a === "sticky" || t.transform !== "none" || $a(t) || Bn(e)) return;
  let l = t.overflowX || t.overflow || "visible", c = t.overflowY || t.overflow || "visible";
  if (l !== "visible" || c !== "visible") return;
  let u = t.clip;
  u && u !== "auto" && u !== "rect(auto, auto, auto, auto)" || t.visibility === "hidden" || t.opacity === "0" || Ta(e, t) && (delete r.height, delete r["block-size"]);
}
fr();
var Vn = ["fill", "stroke", "color", "background-color", "stop-color"], La = /* @__PURE__ */ new Set(["symbol", "defs", "pattern", "mask", "clipPath", "marker", "linearGradient", "radialGradient", "filter"]);
function qt(e) {
  let t = e;
  for (; t && t.nodeType === 1; ) {
    if (t.namespaceURI === "http://www.w3.org/2000/svg" && La.has(t.localName)) return !0;
    t = t.parentNode;
  }
  return !1;
}
var Or = /* @__PURE__ */ new Map();
function Na(e, t) {
  let r = t + "::" + e.toLowerCase(), n = Or.get(r);
  if (n) return n;
  let i = document, o = t === "http://www.w3.org/2000/svg" ? i.createElementNS(t, e) : i.createElement(e), a = i.createElement("div");
  a.style.cssText = "position:absolute;left:-99999px;top:-99999px;contain:strict;display:block;", a.appendChild(o), i.documentElement.appendChild(a);
  let l = getComputedStyle(o), c = {};
  for (let u of Vn) c[u] = l.getPropertyValue(u) || "";
  return a.remove(), Or.set(r, c), c;
}
function Pa(e, t) {
  var o, a, l;
  if (!(e instanceof Element) || !(t instanceof Element) || qt(e)) return;
  let r = (o = e.getAttribute) == null ? void 0 : o.call(e, "style"), n = !!(r && r.includes("var("));
  if (!n && ((a = e.attributes) != null && a.length)) {
    let c = e.attributes;
    for (let u = 0; u < c.length; u++) {
      let f = c[u];
      if (f && typeof f.value == "string" && f.value.includes("var(")) {
        n = !0;
        break;
      }
    }
  }
  let i = null;
  if (n) try {
    i = getComputedStyle(e);
  } catch {
  }
  if (n) {
    let c = e.style;
    if (c && c.length) {
      let u = /* @__PURE__ */ new Set();
      for (let f = 0; f < c.length; f++) {
        let s = c[f];
        if (u.has(s)) continue;
        u.add(s);
        let d = c.getPropertyValue(s);
        if (!d || !d.includes("var(")) continue;
        let h = i && i.getPropertyValue(s);
        if (h) try {
          t.style.setProperty(s, h.trim(), c.getPropertyPriority(s));
        } catch {
        }
      }
    }
  }
  if (n && ((l = e.attributes) != null && l.length)) {
    let c = e.attributes;
    for (let u = 0; u < c.length; u++) {
      let f = c[u];
      if (!f || typeof f.value != "string" || !f.value.includes("var(")) continue;
      let s = f.name, d = i && i.getPropertyValue(s);
      if (d) try {
        t.style.setProperty(s, d.trim());
      } catch {
      }
    }
  }
  if (!n) {
    if (!i) try {
      i = getComputedStyle(e);
    } catch {
      i = null;
    }
    if (!i) return;
    let c = e.namespaceURI || "html", u = Na(e.tagName, c);
    for (let f of Vn) {
      let s = i.getPropertyValue(f) || "", d = u[f] || "";
      if (s && s !== d) try {
        t.style.setProperty(f, s.trim());
      } catch {
      }
    }
  }
}
be();
be();
me();
Be();
function It(e, t, r) {
  return Promise.all(e.map((n) => new Promise((i) => {
    function o() {
      De((a) => {
        !(a && typeof a.timeRemaining == "function") || a.timeRemaining() > 0 ? t(n, i) : o();
      }, { fast: r });
    }
    o();
  })));
}
function Ra(e) {
  return e = e.trim(), !e || /:not\(\s*\[data-sd-slotted\]\s*\)\s*$/.test(e) ? e : `${e}:not([data-sd-slotted])`;
}
function Ia(e, t, r = !0) {
  return e.split(",").map((n) => n.trim()).filter(Boolean).map((n) => {
    if (n.startsWith(":where(") || n.startsWith("@")) return n;
    let i = r ? Ra(n) : n;
    return `:where(${t} ${i})`;
  }).join(", ");
}
function Wa(e, t) {
  return e ? (e = e.replace(/:host\(([^)]+)\)/g, (r, n) => `:where(${t}:is(${n.trim()}))`), e = e.replace(/:host\b/g, `:where(${t})`), e = e.replace(/:host-context\(([^)]+)\)/g, (r, n) => `:where(:where(${n.trim()}) ${t})`), e = e.replace(/::slotted\(([^)]+)\)/g, (r, n) => `:where(${t} ${n.trim()})`), e = e.replace(/(^|})(\s*)([^@}{]+){/g, (r, n, i, o) => {
    let a = Ia(o, t, !0);
    return `${n}${i}${a}{`;
  }), e) : "";
}
function Ha(e) {
  return e.shadowScopeSeq = (e.shadowScopeSeq || 0) + 1, `s${e.shadowScopeSeq}`;
}
function _a(e) {
  let t = "";
  try {
    e.querySelectorAll("style").forEach((n) => {
      t += (n.textContent || "") + `
`;
    });
    let r = e.adoptedStyleSheets || [];
    for (let n of r) try {
      if (n && n.cssRules) for (let i of n.cssRules) t += i.cssText + `
`;
    } catch {
    }
  } catch {
  }
  return t;
}
function Da(e, t, r) {
  if (!t) return;
  let n = document.createElement("style");
  n.setAttribute("data-sd", r), n.textContent = t, e.insertBefore(n, e.firstChild || null);
}
function Oa(e, t) {
  try {
    let r = e.currentSrc || e.src || "";
    if (!r) return;
    t.setAttribute("src", r), t.removeAttribute("srcset"), t.removeAttribute("sizes"), t.loading = "eager", t.decoding = "sync";
  } catch {
  }
}
function Ua(e) {
  let t = /* @__PURE__ */ new Set();
  if (!e) return t;
  let r = /var\(\s*(--[A-Za-z0-9_-]+)\b/g, n;
  for (; n = r.exec(e); ) t.add(n[1]);
  return t;
}
function za(e, t) {
  try {
    let r = getComputedStyle(e).getPropertyValue(t).trim();
    if (r) return r;
  } catch {
  }
  try {
    let r = getComputedStyle(document.documentElement).getPropertyValue(t).trim();
    if (r) return r;
  } catch {
  }
  return "";
}
function Ba(e, t, r) {
  let n = [];
  for (let i of t) {
    let o = za(e, i);
    o && n.push(`${i}: ${o};`);
  }
  return n.length ? `${r}{${n.join("")}}
` : "";
}
function Va(e) {
  e && (e.nodeType === Node.ELEMENT_NODE && e.setAttribute("data-sd-slotted", ""), e.querySelectorAll && e.querySelectorAll("*").forEach((t) => t.setAttribute("data-sd-slotted", "")));
}
async function ja(e, t = 3) {
  let r = () => {
    var o;
    try {
      return e.contentDocument || ((o = e.contentWindow) == null ? void 0 : o.document) || null;
    } catch {
      return null;
    }
  }, n = r(), i = 0;
  for (; i < t && (!n || !n.body && !n.documentElement); ) await new Promise((o) => setTimeout(o, 0)), n = r(), i++;
  return n && (n.body || n.documentElement) ? n : null;
}
function qa(e) {
  let t = e.getBoundingClientRect(), r = 0, n = 0, i = 0, o = 0;
  try {
    let c = getComputedStyle(e);
    r = parseFloat(c.borderLeftWidth) || 0, n = parseFloat(c.borderRightWidth) || 0, i = parseFloat(c.borderTopWidth) || 0, o = parseFloat(c.borderBottomWidth) || 0;
  } catch {
  }
  let a = Math.max(0, Math.round(t.width - (r + n))), l = Math.max(0, Math.round(t.height - (i + o)));
  return { contentWidth: a, contentHeight: l, rect: t };
}
function xe(e) {
  let t = 0, r = 0;
  if (e.offsetWidth > 0 && (t = e.offsetWidth), e.offsetHeight > 0 && (r = e.offsetHeight), t === 0 || r === 0) try {
    let n = getComputedStyle(e);
    if (t === 0) {
      let i = parseFloat(n.width);
      !isNaN(i) && i > 0 && (t = i);
    }
    if (r === 0) {
      let i = parseFloat(n.height);
      !isNaN(i) && i > 0 && (r = i);
    }
  } catch {
  }
  if (t === 0 || r === 0) try {
    if (t === 0) {
      let n = parseFloat(e.getAttribute("width"));
      !isNaN(n) && n > 0 && (t = n);
    }
    if (r === 0) {
      let n = parseFloat(e.getAttribute("height"));
      !isNaN(n) && n > 0 && (r = n);
    }
  } catch {
  }
  if ((t === 0 || r === 0) && (e.naturalWidth || e.naturalHeight)) try {
    t === 0 && e.naturalWidth > 0 && (t = e.naturalWidth), r === 0 && e.naturalHeight > 0 && (r = e.naturalHeight);
  } catch {
  }
  return { width: t, height: r };
}
function Ga(e, t, r) {
  let n = e.defaultView, i = n ? n.scrollX : 0, o = n ? n.scrollY : 0, a = e.body ? e.body.scrollLeft : 0, l = e.body ? e.body.scrollTop : 0, c = e.documentElement ? e.documentElement.scrollLeft : 0, u = e.documentElement ? e.documentElement.scrollTop : 0, f = e.createElement("style");
  return f.setAttribute("data-sd-iframe-pin", ""), f.textContent = `html, body {margin: 0 !important;padding: 0 !important;width: ${t}px !important;height: ${r}px !important;min-width: ${t}px !important;min-height: ${r}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}`, (e.head || e.documentElement).appendChild(f), () => {
    try {
      f.remove();
    } catch {
    }
    try {
      n && typeof n.scrollTo == "function" && n.scrollTo(i, o), e.body && (e.body.scrollLeft = a, e.body.scrollTop = l), e.documentElement && (e.documentElement.scrollLeft = c, e.documentElement.scrollTop = u);
    } catch {
    }
  };
}
async function Ya(e, t, r) {
  let n = await ja(e, 3);
  if (!n) throw new Error("iframe document not accessible/ready");
  let { contentWidth: i, contentHeight: o, rect: a } = qa(e), l = r == null ? void 0 : r.snap;
  if (!l && typeof window < "u" && window.snapdom && (l = window.snapdom), !l || typeof l.toPng != "function") throw new Error("[snapdom] iframe capture requires snapdom.toPng. Use snapdom(el) or pass options.snap. With ESM, assign window.snapdom = snapdom after import if using iframes.");
  let c = { ...r, scale: 1 }, u = Ga(n, i, o), f;
  try {
    f = await l.toPng(n.documentElement, c);
  } finally {
    u();
  }
  f.style.display = "block", f.style.width = `${i}px`, f.style.height = `${o}px`;
  let s = document.createElement("div");
  return t.nodeMap.set(s, e), Me(e, s, t, r), s.style.overflow = "hidden", s.style.display = "block", s.style.width || (s.style.width = `${Math.round(a.width)}px`), s.style.height || (s.style.height = `${Math.round(a.height)}px`), s.appendChild(f), s;
}
function Xa(e) {
  let { width: t, height: r } = xe(e), n = e.getBoundingClientRect(), i;
  try {
    i = window.getComputedStyle(e);
  } catch {
  }
  let o = i ? parseFloat(i.width) : NaN, a = i ? parseFloat(i.height) : NaN, l = Math.round(t || n.width || 0), c = Math.round(r || n.height || 0), u = Number.isFinite(o) && o > 0 ? Math.round(o) : Math.max(12, l || 16), f = Number.isFinite(a) && a > 0 ? Math.round(a) : Math.max(12, c || 16), s = (e.type || "text").toLowerCase() === "checkbox", d = !!e.checked, h = !!e.indeterminate, m = Math.max(Math.min(u, f), 12), g = "middle";
  try {
    i && i.verticalAlign && (g = i.verticalAlign);
  } catch {
  }
  let p = document.createElement("div");
  p.setAttribute("data-snapdom-input-replacement", e.type || "checkbox"), p.style.cssText = `display:inline-block;width:${m}px;height:${m}px;vertical-align:${g};flex-shrink:0;line-height:0;`;
  let b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  b.setAttribute("width", String(m)), b.setAttribute("height", String(m)), b.setAttribute("viewBox", `0 0 ${m} ${m}`), p.appendChild(b);
  function x() {
    let y = "#0a6ed1";
    try {
      i && (y = i.accentColor || i.color || y);
    } catch {
    }
    let w = 2, A = w / 2, S = m - w;
    if (b.innerHTML = "", s) {
      let v = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      if (v.setAttribute("x", String(A)), v.setAttribute("y", String(A)), v.setAttribute("width", String(S)), v.setAttribute("height", String(S)), v.setAttribute("rx", "2"), v.setAttribute("ry", "2"), v.setAttribute("fill", d ? y : "none"), v.setAttribute("stroke", y), v.setAttribute("stroke-width", String(w)), b.appendChild(v), d) {
        let C = document.createElementNS("http://www.w3.org/2000/svg", "path");
        C.setAttribute("d", `M ${A + 2} ${m / 2} L ${m / 2 - 1} ${m - A - 2} L ${m - A - 2} ${A + 2}`), C.setAttribute("stroke", "white"), C.setAttribute("stroke-width", String(Math.max(1.5, w))), C.setAttribute("fill", "none"), C.setAttribute("stroke-linecap", "round"), C.setAttribute("stroke-linejoin", "round"), b.appendChild(C);
      } else if (h) {
        let C = document.createElementNS("http://www.w3.org/2000/svg", "rect"), M = Math.max(6, S - 4);
        C.setAttribute("x", String((m - M) / 2)), C.setAttribute("y", String((m - w) / 2)), C.setAttribute("width", String(M)), C.setAttribute("height", String(w)), C.setAttribute("fill", y), C.setAttribute("rx", "1"), b.appendChild(C);
      }
    } else {
      let v = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      if (v.setAttribute("cx", String(m / 2)), v.setAttribute("cy", String(m / 2)), v.setAttribute("r", String((m - w) / 2)), v.setAttribute("fill", d ? y : "none"), v.setAttribute("stroke", y), v.setAttribute("stroke-width", String(w)), b.appendChild(v), d) {
        let C = document.createElementNS("http://www.w3.org/2000/svg", "circle"), M = Math.max(2, (m - w * 2) * 0.35);
        C.setAttribute("cx", String(m / 2)), C.setAttribute("cy", String(m / 2)), C.setAttribute("r", String(M)), C.setAttribute("fill", "white"), b.appendChild(C);
      }
    }
    p.style.setProperty("width", `${m}px`, "important"), p.style.setProperty("height", `${m}px`, "important"), p.style.setProperty("min-width", `${m}px`, "important"), p.style.setProperty("min-height", `${m}px`, "important");
  }
  return x(), { el: p, applyVisual: x };
}
var Ge = new fe(80);
async function Ke(e) {
  var r;
  if ((r = $.resource) != null && r.has(e)) return $.resource.get(e);
  if (Ge.has(e)) return Ge.get(e);
  let t = (async () => {
    var i;
    let n = await pe(e, { as: "dataURL", silent: !0 });
    if (!n.ok || typeof n.data != "string") throw new Error(`[snapDOM] Failed to read blob URL: ${e}`);
    return (i = $.resource) == null || i.set(e, n.data), n.data;
  })();
  Ge.set(e, t);
  try {
    let n = await t;
    return Ge.set(e, n), n;
  } catch (n) {
    throw Ge.delete(e), n;
  }
}
var Ka = /\bblob:[^)"'\s]+/g;
async function Ur(e) {
  if (!e || e.indexOf("blob:") === -1) return e;
  let t = Array.from(new Set(e.match(Ka) || []));
  if (t.length === 0) return e;
  let r = e;
  for (let n of t) try {
    let i = await Ke(n);
    r = r.split(n).join(i);
  } catch {
  }
  return r;
}
function ut(e) {
  return typeof e == "string" && e.startsWith("blob:");
}
function Qa(e) {
  return (e || "").split(",").map((t) => t.trim()).filter(Boolean).map((t) => {
    let r = t.match(/^(\S+)(\s+.+)?$/);
    return r ? { url: r[1], desc: r[2] || "" } : null;
  }).filter(Boolean);
}
function Ja(e) {
  return e.map((t) => t.desc ? `${t.url} ${t.desc.trim()}` : t.url).join(", ");
}
async function Za(e, t = null) {
  var c, u;
  if (!e) return;
  let r = t, n = e.querySelectorAll ? e.querySelectorAll("img") : [];
  for (let f of n) try {
    let s = f.getAttribute("src") || f.currentSrc || "";
    if (ut(s)) {
      let h = await Ke(s);
      f.setAttribute("src", h);
    }
    let d = f.getAttribute("srcset");
    if (d && d.includes("blob:")) {
      let h = Qa(d), m = !1;
      for (let g of h) if (ut(g.url)) try {
        g.url = await Ke(g.url), m = !0;
      } catch (p) {
        G(r, "blobUrlToDataUrl for srcset item failed", p);
      }
      m && f.setAttribute("srcset", Ja(h));
    }
  } catch (s) {
    G(r, "resolveBlobUrls for img failed", s);
  }
  let i = e.querySelectorAll ? e.querySelectorAll("image") : [];
  for (let f of i) try {
    let s = "http://www.w3.org/1999/xlink", d = f.getAttribute("href") || ((c = f.getAttributeNS) == null ? void 0 : c.call(f, s, "href"));
    if (ut(d)) {
      let h = await Ke(d);
      f.setAttribute("href", h), (u = f.removeAttributeNS) == null || u.call(f, s, "href");
    }
  } catch (s) {
    G(r, "resolveBlobUrls for SVG image href failed", s);
  }
  let o = e.querySelectorAll ? e.querySelectorAll("[style*='blob:']") : [];
  for (let f of o) try {
    let s = f.getAttribute("style");
    if (s && s.includes("blob:")) {
      let d = await Ur(s);
      f.setAttribute("style", d);
    }
  } catch (s) {
    G(r, "replaceBlobUrls in inline style failed", s);
  }
  let a = e.querySelectorAll ? e.querySelectorAll("style") : [];
  for (let f of a) try {
    let s = f.textContent || "";
    s.includes("blob:") && (f.textContent = await Ur(s));
  } catch (s) {
    G(r, "replaceBlobUrls in style tag failed", s);
  }
  let l = ["poster"];
  for (let f of l) {
    let s = e.querySelectorAll ? e.querySelectorAll(`[${f}^='blob:']`) : [];
    for (let d of s) try {
      let h = d.getAttribute(f);
      ut(h) && d.setAttribute(f, await Ke(h));
    } catch (h) {
      G(r, `resolveBlobUrls for ${f} failed`, h);
    }
  }
}
nt();
function Wt(e) {
  let { width: t, height: r } = xe(e), n = t, i = r;
  if (!n || !i) {
    let a = e.getBoundingClientRect();
    n = n || a.width || 0, i = i || a.height || 0;
  }
  let o = document.createElement("div");
  return o.style.cssText = `display:inline-block;width:${n}px;height:${i}px;visibility:hidden;`, o;
}
async function pt(e, t, r) {
  var f, s, d, h, m, g, p, b, x;
  if (!e) throw new Error("Invalid node");
  let n = /* @__PURE__ */ new Set(), i = null, o = null;
  if (e.nodeType === Node.ELEMENT_NODE) {
    let y = (e.localName || e.tagName || "").toLowerCase();
    if (e.id === "snapdom-sandbox" || e.hasAttribute("data-snapdom-sandbox") || En.has(y)) return null;
    if (y === "foreignobject" && ((s = (f = e.parentElement) == null ? void 0 : f.closest) != null && s.call(f, "foreignObject"))) return G(t, "Nested <foreignObject> skipped (SVG spec limitation — not rendered by browsers)"), null;
  }
  if (e.nodeType === Node.TEXT_NODE || e.nodeType !== Node.ELEMENT_NODE) return e.cloneNode(!0);
  if (e.getAttribute("data-capture") === "exclude") {
    if (r.excludeMode === "hide") return Wt(e);
    if (r.excludeMode === "remove") return null;
  }
  if (r.exclude && Array.isArray(r.exclude)) for (let y of r.exclude) try {
    if ((d = e.matches) != null && d.call(e, y)) {
      if (r.excludeMode === "hide") return Wt(e);
      if (r.excludeMode === "remove") return null;
    }
  } catch (w) {
    console.warn(`Invalid selector in exclude option: ${y}`, w);
  }
  if (typeof r.filter == "function") try {
    if (!r.filter(e)) {
      if (r.filterMode === "hide") return Wt(e);
      if (r.filterMode === "remove") return null;
    }
  } catch (y) {
    console.warn("Error in filter function:", y);
  }
  if (e.tagName === "IFRAME") {
    let y = !1;
    try {
      y = !!(e.contentDocument || (h = e.contentWindow) != null && h.document);
    } catch (w) {
      G(t, "iframe same-origin probe failed", w);
    }
    if (y) try {
      return await Ya(e, t, r);
    } catch (w) {
      console.warn("[SnapDOM] iframe rasterization failed, fallback:", w);
    }
    if (y || console.warn("[snapdom] cross-origin <iframe> skipped (cannot access content). Use options.placeholders to show a placeholder instead.", e), r.placeholders) {
      let { width: w, height: A } = xe(e), S = document.createElement("div");
      return S.style.cssText = `width:${w}px;height:${A}px;background-image:repeating-linear-gradient(45deg,#ddd,#ddd 5px,#f9f9f9 5px,#f9f9f9 10px);display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;border:1px solid #aaa;`, Me(e, S, t, r), S;
    } else {
      let { width: w, height: A } = xe(e), S = document.createElement("div");
      return S.style.cssText = `display:inline-block;width:${w}px;height:${A}px;visibility:hidden;`, Me(e, S, t, r), S;
    }
  }
  if (e.getAttribute("data-capture") === "placeholder") {
    let y = e.cloneNode(!1);
    t.nodeMap.set(y, e), Me(e, y, t, r);
    let w = document.createElement("div");
    return w.textContent = e.getAttribute("data-placeholder-text") || "", w.style.cssText = "color:#666;font-size:12px;text-align:center;line-height:1.4;padding:0.5em;box-sizing:border-box;", y.appendChild(w), y;
  }
  if (e.tagName === "CANVAS") {
    let y = "";
    try {
      let v = e.getContext("2d", { willReadFrequently: !0 });
      try {
        v && v.getImageData(0, 0, 1, 1);
      } catch {
      }
      if (await new Promise((C) => requestAnimationFrame(C)), y = e.toDataURL("image/png"), !y || y === "data:,") {
        try {
          v && v.getImageData(0, 0, 1, 1);
        } catch {
        }
        if (await new Promise((C) => requestAnimationFrame(C)), y = e.toDataURL("image/png"), !y || y === "data:,") {
          let C = document.createElement("canvas");
          C.width = e.width, C.height = e.height;
          let M = C.getContext("2d");
          M && (M.drawImage(e, 0, 0), y = C.toDataURL("image/png"));
        }
      }
    } catch (v) {
      G(t, "Canvas toDataURL failed, using empty/fallback", v);
    }
    let w = document.createElement("img");
    try {
      w.decoding = "sync", w.loading = "eager";
    } catch (v) {
      G(t, "img decoding/loading hints failed", v);
    }
    y && (w.src = y), w.width = e.width, w.height = e.height;
    let { width: A, height: S } = xe(e);
    return A > 0 && (w.style.width = `${A}px`), S > 0 && (w.style.height = `${S}px`), t.nodeMap.set(w, e), Me(e, w, t, r), w;
  }
  if (e.tagName === "VIDEO") {
    let y = "";
    try {
      let v = document.createElement("canvas");
      v.width = e.videoWidth || e.offsetWidth || 320, v.height = e.videoHeight || e.offsetHeight || 240;
      let C = v.getContext("2d");
      C && (C.drawImage(e, 0, 0, v.width, v.height), y = v.toDataURL("image/png"), (!y || y === "data:,") && (y = ""));
    } catch (v) {
      G(t, "Video frame capture failed, using poster fallback", v);
    }
    let w = document.createElement("img");
    try {
      w.decoding = "sync", w.loading = "eager";
    } catch {
    }
    y ? w.src = y : e.poster && (w.src = e.poster), w.width = e.videoWidth || e.offsetWidth || 0, w.height = e.videoHeight || e.offsetHeight || 0;
    let { width: A, height: S } = xe(e);
    return A > 0 && (w.style.width = `${A}px`), S > 0 && (w.style.height = `${S}px`), w.style.objectFit = "contain", t.nodeMap.set(w, e), Me(e, w, t, r), w;
  }
  let a;
  try {
    if (a = e.cloneNode(!1), (m = a.attributes) == null ? void 0 : m.length) try {
      for (let y of a.attributes) /[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFE\uFFFF]/.test(y.value) && a.setAttribute(y.name, y.value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFE\uFFFF]/g, ""));
    } catch {
    }
    if (Pa(e, a), t.nodeMap.set(a, e), e.tagName === "IMG") {
      Oa(e, a);
      try {
        let { width: y, height: w } = xe(e), A = Math.round(y || 0), S = Math.round(w || 0);
        A && (a.dataset.snapdomWidth = String(A)), S && (a.dataset.snapdomHeight = String(S));
      } catch (y) {
        G(t, "getUnscaledDimensions for IMG failed", y);
      }
      try {
        let y = e.getAttribute("style") || "", w = window.getComputedStyle(e), A = (q) => {
          let U = y.match(new RegExp(`${q}\\s*:\\s*([^;]+)`, "i")), L = U ? U[1].trim() : w.getPropertyValue(q);
          return /%|auto/i.test(String(L || ""));
        }, S = parseInt(a.dataset.snapdomWidth || "0", 10), v = parseInt(a.dataset.snapdomHeight || "0", 10), C = A("width") || !S, M = A("height") || !v;
        C && S && (a.style.width = `${S}px`), M && v && (a.style.height = `${v}px`);
        let k = w.getPropertyValue("object-fit"), H = w.getPropertyValue("object-position");
        k && k !== "fill" ? (a.style.objectFit = k, H && (a.style.objectPosition = H)) : (S && (a.style.minWidth = `${S}px`), v && (a.style.minHeight = `${v}px`));
      } catch (y) {
        G(t, "IMG dimension freeze failed", y);
      }
    }
  } catch (y) {
    throw console.error("[Snapdom] Failed to clone node:", e, y), y;
  }
  let l = null;
  if (e instanceof HTMLTextAreaElement) {
    let { width: y, height: w } = xe(e), A = y || e.getBoundingClientRect().width || 0, S = w || e.getBoundingClientRect().height || 0;
    A && (a.style.width = `${A}px`), S && (a.style.height = `${S}px`);
  }
  if (e instanceof HTMLInputElement) {
    let y = (e.type || "text").toLowerCase();
    if ((y === "checkbox" || y === "radio") && da()) {
      let { el: w, applyVisual: A } = Xa(e);
      t.nodeMap.set(w, e), l = A, a = w;
    } else a.value = e.value, a.setAttribute("value", e.value), e.checked !== void 0 && (a.checked = e.checked, e.checked && a.setAttribute("checked", ""), e.indeterminate && (a.indeterminate = e.indeterminate));
  }
  if ((e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) && !e.value && e.placeholder) try {
    let y = window.getComputedStyle(e, "::placeholder"), w = y && y.color;
    if (w && w !== "rgba(0, 0, 0, 0)") {
      let A = "snapdom-ph-" + (Math.random() * 1e6 | 0);
      a.classList.add(A);
      let S = document.createElement("style");
      S.textContent = `.${A}::placeholder{color:${w}!important;opacity:${y.opacity || "1"}!important;-webkit-text-fill-color:${w}!important;}`, a.prepend(S);
    }
  } catch {
  }
  if (e instanceof HTMLSelectElement && (i = e.value), e instanceof HTMLTextAreaElement && (o = e.value), e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement) {
    e.disabled && a.setAttribute("disabled", ""), e.required && a.setAttribute("required", ""), e.readOnly && a.setAttribute("readonly", "");
    let y = e;
    y.min !== void 0 && y.min !== "" && a.setAttribute("min", y.min), y.max !== void 0 && y.max !== "" && a.setAttribute("max", y.max), y.pattern !== void 0 && y.pattern !== "" && a.setAttribute("pattern", y.pattern);
    let w = e.getAttribute("aria-invalid");
    w !== null && a.setAttribute("aria-invalid", w);
  }
  if (qt(e) || Me(e, a, t, r), l && l(), e instanceof SVGElement && !qt(e)) {
    let y = ["fill", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "opacity", "fill-opacity", "stroke-opacity", "fill-rule", "clip-rule", "marker", "marker-start", "marker-mid", "marker-end", "visibility", "display"];
    try {
      let w = window.getComputedStyle(e);
      for (let A of y) {
        let S = w.getPropertyValue(A);
        S && a.style.setProperty(A, S);
      }
    } catch {
    }
  }
  if (e.shadowRoot) {
    let y = function(q, U) {
      if (q.nodeType === Node.ELEMENT_NODE && q.tagName === "STYLE") return U(null);
      pt(q, t, r).then((L) => {
        U(L || null);
      }).catch(() => {
        U(null);
      });
    };
    try {
      let q = e.shadowRoot.querySelectorAll("slot");
      for (let U of q) {
        let L = [];
        try {
          L = ((g = U.assignedNodes) == null ? void 0 : g.call(U, { flatten: !0 })) || ((p = U.assignedNodes) == null ? void 0 : p.call(U)) || [];
        } catch {
          L = ((b = U.assignedNodes) == null ? void 0 : b.call(U)) || [];
        }
        for (let B of L) n.add(B);
      }
    } catch {
    }
    let w = Ha(t), A = `[data-sd="${w}"]`;
    try {
      a.setAttribute("data-sd", w);
    } catch {
    }
    let S = _a(e.shadowRoot), v = Wa(S, A), C = Ua(S), M = Ba(e, C, A);
    Da(a, M + v, w);
    let k = document.createDocumentFragment(), H = await It(Array.from(e.shadowRoot.childNodes), y, r.fast);
    k.append(...H.filter((q) => !!q)), a.appendChild(k);
  }
  if (e.tagName === "SLOT") {
    let y = function(C, M) {
      pt(C, t, r).then((k) => {
        k && Va(k), M(k || null);
      }).catch(() => {
        M(null);
      });
    }, w = ((x = e.assignedNodes) == null ? void 0 : x.call(e, { flatten: !0 })) || [], A = w.length > 0 ? w : Array.from(e.childNodes), S = document.createDocumentFragment(), v = await It(Array.from(A), y, r.fast);
    return S.append(...v.filter((C) => !!C)), S;
  }
  function c(y, w) {
    if (n.has(y)) return w(null);
    pt(y, t, r).then((A) => {
      w(A || null);
    }).catch(() => {
      w(null);
    });
  }
  let u = await It(Array.from(e.childNodes), c, r.fast);
  if (a.append(...u.filter((y) => !!y)), i !== null && a instanceof HTMLSelectElement) {
    a.value = i;
    for (let y of a.options) y.value === i ? y.setAttribute("selected", "") : y.removeAttribute("selected");
  }
  return o !== null && a instanceof HTMLTextAreaElement && (a.textContent = o), a;
}
be();
Ct();
me();
me();
var el = [/font\s*awesome/i, /material\s*icons/i, /ionicons/i, /glyphicons/i, /feather/i, /bootstrap\s*icons/i, /remix\s*icons/i, /heroicons/i, /layui/i, /lucide/i], He = Object.assign({ materialIconsFilled: "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", materialIconsOutlined: "https://fonts.gstatic.com/s/materialiconsoutlined/v110/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2", materialIconsRound: "https://fonts.gstatic.com/s/materialiconsround/v109/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw.woff2", materialIconsSharp: "https://fonts.gstatic.com/s/materialiconssharp/v110/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvRImcycg.woff2" }, typeof window < "u" && window.__SNAPDOM_ICON_FONTS__ || {}), Gt = [];
function tl(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function rl(e) {
  let t = Array.isArray(e) ? e : [e];
  for (let r of t) r instanceof RegExp ? Gt.push(r) : typeof r == "string" ? Gt.push(new RegExp(tl(r), "i")) : console.warn("[snapdom] Ignored invalid iconFont value:", r);
}
function we(e) {
  let t = typeof e == "string" ? e : "", r = [...el, ...Gt];
  for (let n of r) if (n instanceof RegExp && n.test(t)) return !0;
  return !!(/icon/i.test(t) || /glyph/i.test(t) || /symbols/i.test(t) || /feather/i.test(t) || /fontawesome/i.test(t));
}
function nl(e = "") {
  let t = String(e).toLowerCase();
  return /\bmaterial\s*icons\b/.test(t) || /\bmaterial\s*symbols\b/.test(t);
}
var zr = /* @__PURE__ */ new Map();
function ol(e = "") {
  let t = /* @__PURE__ */ Object.create(null), r = String(e || ""), n = /['"]?\s*([A-Za-z]{3,4})\s*['"]?\s*([+-]?\d+(?:\.\d+)?)\s*/g, i;
  for (; i = n.exec(r); ) t[i[1].toUpperCase()] = Number(i[2]);
  return t;
}
async function il(e, t, r) {
  let n = String(e || ""), i = n.toLowerCase(), o = String(t || "").toLowerCase();
  if (/\bmaterial\s*icons\b/.test(i) && !/\bsymbols\b/.test(i)) return { familyForMeasure: n, familyForCanvas: n };
  if (!/\bmaterial\s*symbols\b/.test(i)) return { familyForMeasure: n, familyForCanvas: n };
  let a = r && (r.FILL ?? r.fill), l = "outlined";
  /\brounded\b/.test(o) || /\bround\b/.test(o) ? l = "rounded" : /\bsharp\b/.test(o) ? l = "sharp" : /\boutlined\b/.test(o) && (l = "outlined");
  let c = a === 1, u = null;
  if (c && (l === "outlined" && He.materialIconsFilled ? u = { url: He.materialIconsFilled, alias: "snapdom-mi-filled" } : l === "rounded" && He.materialIconsRound ? u = { url: He.materialIconsRound, alias: "snapdom-mi-round" } : l === "sharp" && He.materialIconsSharp && (u = { url: He.materialIconsSharp, alias: "snapdom-mi-sharp" })), !u) return { familyForMeasure: n, familyForCanvas: n };
  if (!zr.has(u.alias)) try {
    let s = new FontFace(u.alias, `url(${u.url})`, { style: "normal", weight: "400" });
    document.fonts.add(s), await s.load(), zr.set(u.alias, !0);
  } catch {
    return { familyForMeasure: n, familyForCanvas: n };
  }
  let f = `"${u.alias}"`;
  return { familyForMeasure: f, familyForCanvas: f };
}
async function al(e = "Material Icons", t = 24) {
  try {
    await Promise.all([document.fonts.load(`400 ${t}px "${String(e).replace(/["']/g, "")}"`), document.fonts.ready]);
  } catch {
  }
}
function ll(e) {
  var i, o;
  let t = ((i = e.getPropertyValue("-webkit-text-fill-color")) == null ? void 0 : i.trim()) || "", r = /^transparent$/i.test(t) || /rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(t);
  if (t && !r && t.toLowerCase() !== "currentcolor") return t;
  let n = (o = e.color) == null ? void 0 : o.trim();
  return n && n !== "inherit" ? n : "#000";
}
async function sl(e, { family: t = "Material Icons", weight: r = "normal", fontSize: n = 32, color: i = "#000", variation: o = "", className: a = "" } = {}) {
  let l = String(t || "").replace(/^['"]+|['"]+$/g, ""), c = window.devicePixelRatio || 1, u = ol(o), { familyForMeasure: f, familyForCanvas: s } = await il(l, a, u);
  await al(s.replace(/^["']+|["']+$/g, ""), n);
  let d = document.createElement("span");
  d.textContent = e, d.style.position = "absolute", d.style.visibility = "hidden", d.style.left = "-99999px", d.style.whiteSpace = "nowrap", d.style.fontFamily = f, d.style.fontWeight = String(r || "normal"), d.style.fontSize = `${n}px`, d.style.lineHeight = "1", d.style.margin = "0", d.style.padding = "0", d.style.fontFeatureSettings = "'liga' 1", d.style.fontVariantLigatures = "normal", d.style.color = i, document.body.appendChild(d);
  let h = d.getBoundingClientRect(), m = Math.max(1, Math.ceil(h.width)), g = Math.max(1, Math.ceil(h.height));
  document.body.removeChild(d);
  let p = document.createElement("canvas");
  p.width = m * c, p.height = g * c;
  let b = p.getContext("2d");
  b.scale(c, c), b.font = `${r ? `${r} ` : ""}${n}px ${s}`, b.textAlign = "left", b.textBaseline = "top", b.fillStyle = i;
  try {
    b.fontKerning = "normal";
  } catch {
  }
  return b.fillText(e, 0, 0), { dataUrl: p.toDataURL(), width: m, height: g };
}
async function cl(e, t) {
  if (!(e instanceof Element)) return 0;
  let r = '.material-icons, [class*="material-symbols"]', n = Array.from(e.querySelectorAll(r)).filter((l) => l && l.textContent && l.textContent.trim());
  if (n.length === 0) return 0;
  let i = $.session.nodeMap, o = t instanceof Element ? Array.from(t.querySelectorAll(r)).filter((l) => l && l.textContent && l.textContent.trim()) : [], a = 0;
  for (let l = 0; l < n.length; l++) {
    let c = n[l], u = i && i.get(c) || o[l] || null;
    try {
      let f = getComputedStyle(u || c), s = f.fontFamily || "Material Icons";
      if (!nl(s)) continue;
      let d = (u || c).textContent.trim();
      if (!d) continue;
      let h = parseInt(f.fontSize, 10) || 24, m = f.fontWeight && f.fontWeight !== "normal" ? f.fontWeight : "normal", g = ll(f), p = f.fontVariationSettings && f.fontVariationSettings !== "normal" ? f.fontVariationSettings : "", b = (u || c).className || "", { dataUrl: x, width: y, height: w } = await sl(d, { family: s, weight: m, fontSize: h, color: g, variation: p, className: b });
      c.textContent = "";
      let A = c.ownerDocument.createElement("img");
      A.src = x, A.alt = d, A.style.height = `${h}px`, A.style.width = `${Math.max(1, Math.round(y / w * h))}px`, A.style.objectFit = "contain", A.style.verticalAlign = getComputedStyle(c).verticalAlign || "baseline", c.appendChild(A), a++;
    } catch {
    }
  }
  return a;
}
Be();
async function ul(e, t, r, n = 32, i = "#000") {
  t = t.replace(/^['"]+|['"]+$/g, "");
  let o = window.devicePixelRatio || 1;
  try {
    await document.fonts.ready;
  } catch {
  }
  let a = document.createElement("span");
  a.textContent = e, a.style.position = "absolute", a.style.visibility = "hidden", a.style.fontFamily = `"${t}"`, a.style.fontWeight = r || "normal", a.style.fontSize = `${n}px`, a.style.lineHeight = "1", a.style.whiteSpace = "nowrap", a.style.padding = "0", a.style.margin = "0", document.body.appendChild(a);
  let l = a.getBoundingClientRect(), c = Math.ceil(l.width), u = Math.ceil(l.height);
  document.body.removeChild(a);
  let f = document.createElement("canvas");
  f.width = Math.max(1, c * o), f.height = Math.max(1, u * o);
  let s = f.getContext("2d");
  return s.scale(o, o), s.font = r ? `${r} ${n}px "${t}"` : `${n}px "${t}"`, s.textAlign = "left", s.textBaseline = "top", s.fillStyle = i, s.fillText(e, 0, 0), { dataUrl: f.toDataURL(), width: c, height: u };
}
var jn = /* @__PURE__ */ new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "emoji", "math", "fangsong", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded"]), dl = ["katex", "mathjax", "mathml"];
function mr(e) {
  if (!e) return "";
  for (let t of e.split(",")) {
    let r = t.trim().replace(/^['"]+|['"]+$/g, "");
    if (r && !jn.has(r.toLowerCase())) return r;
  }
  return "";
}
function fl(e) {
  if (!e) return [];
  let t = [];
  for (let r of e.split(",")) {
    let n = r.trim().replace(/^['"]+|['"]+$/g, "");
    n && (jn.has(n.toLowerCase()) || t.push(n));
  }
  return t;
}
function yt(e) {
  let t = String(e ?? "400").trim().toLowerCase();
  if (t === "normal") return 400;
  if (t === "bold") return 700;
  let r = parseInt(t, 10);
  return Number.isFinite(r) ? Math.min(900, Math.max(100, r)) : 400;
}
function bt(e) {
  let t = String(e ?? "normal").trim().toLowerCase();
  return t.startsWith("italic") ? "italic" : t.startsWith("oblique") ? "oblique" : "normal";
}
function hl(e) {
  let t = String(e ?? "100%").match(/(\d+(?:\.\d+)?)\s*%/);
  return t ? Math.max(50, Math.min(200, parseFloat(t[1]))) : 100;
}
function ml(e) {
  let t = String(e || "400").trim(), r = t.match(/^(\d{2,3})\s+(\d{2,3})$/);
  if (r) {
    let i = yt(r[1]), o = yt(r[2]);
    return { min: Math.min(i, o), max: Math.max(i, o) };
  }
  let n = yt(t);
  return { min: n, max: n };
}
function gl(e) {
  let t = String(e || "normal").trim().toLowerCase();
  return t === "italic" ? { kind: "italic" } : t.startsWith("oblique") ? { kind: "oblique" } : { kind: "normal" };
}
function pl(e) {
  let t = String(e || "100%").trim(), r = t.match(/(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)\s*%/);
  if (r) {
    let o = parseFloat(r[1]), a = parseFloat(r[2]);
    return { min: Math.min(o, a), max: Math.max(o, a) };
  }
  let n = t.match(/(\d+(?:\.\d+)?)\s*%/), i = n ? parseFloat(n[1]) : 100;
  return { min: i, max: i };
}
function yl(e) {
  return !e || typeof e != "string" ? "" : e.replace(/\s+(variable|vf|v[0-9]+)$/i, "").trim().toLowerCase().replace(/\s+/g, "-");
}
function bl(e, t, r = []) {
  if (!e) return !1;
  try {
    let n = new URL(e, location.href);
    if (n.origin === location.origin) return !0;
    let i = n.host.toLowerCase();
    if (["fonts.googleapis.com", "fonts.gstatic.com", "use.typekit.net", "p.typekit.net", "kit.fontawesome.com", "use.fontawesome.com", "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "esm.sh"].some((a) => i.endsWith(a)) || r.some((a) => i === a.toLowerCase() || i.endsWith("." + a.toLowerCase()))) return !0;
    let o = (n.pathname + n.search).toLowerCase();
    if (/\bfont(s)?\b/.test(o) || /\.woff2?(\b|$)/.test(o) || dl.some((a) => o.includes(a))) return !0;
    for (let a of t) {
      let l = a.toLowerCase().replace(/\s+/g, "+"), c = a.toLowerCase().replace(/\s+/g, "-"), u = yl(a);
      if (o.includes(l) || o.includes(c) || u && o.includes(u)) return !0;
    }
    return !1;
  } catch {
    return !1;
  }
}
function wl(e) {
  var r;
  let t = /* @__PURE__ */ new Set();
  for (let n of e || []) {
    let i = (r = String(n).split("__")[0]) == null ? void 0 : r.trim();
    i && t.add(i);
  }
  return t;
}
function Br(e, t) {
  return e && e.replace(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g, (r, n, i) => {
    let o = (i || "").trim();
    if (!o || /^data:|^blob:|^https?:|^file:|^about:/i.test(o)) return r;
    let a = o;
    try {
      a = new URL(o, t || location.href).href;
    } catch {
    }
    return `url("${a}")`;
  });
}
var Yt = /@import\s+(?:url\(\s*(['"]?)([^)"']+)\1\s*\)|(['"])([^"']+)\3)([^;]*);/g, xt = 4;
async function xl(e, t, r) {
  if (!e) return e;
  let n = /* @__PURE__ */ new Set();
  function i(l, c) {
    try {
      return new URL(l, c || location.href).href;
    } catch {
      return l;
    }
  }
  async function o(l, c, u = 0) {
    if (u > xt) return console.warn(`[snapDOM] @import depth exceeded (${xt}) at ${c}`), l;
    let f = "", s = 0, d;
    for (; d = Yt.exec(l); ) {
      f += l.slice(s, d.index), s = Yt.lastIndex;
      let h = (d[2] || d[4] || "").trim(), m = i(h, c);
      if (n.has(m)) {
        console.warn(`[snapDOM] Skipping circular @import: ${m}`);
        continue;
      }
      n.add(m);
      let g = "";
      try {
        let p = await pe(m, { as: "text", useProxy: r, silent: !0 });
        p.ok && typeof p.data == "string" && (g = p.data);
      } catch {
      }
      g ? (g = Br(g, m), g = await o(g, m, u + 1), f += `
/* inlined: ${m} */
${g}
`) : f += d[0];
    }
    return f += l.slice(s), f;
  }
  let a = Br(e, t || location.href);
  return a = await o(a, t || location.href, 0), a;
}
var qn = /url\((["']?)([^"')]+)\1\)/g, Sl = /@font-face[^{}]*\{[^}]*\}/g;
function Gn(e) {
  if (!e) return [];
  let t = [], r = e.split(",").map((n) => n.trim()).filter(Boolean);
  for (let n of r) {
    let i = n.match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f?]+))?$/);
    if (!i) continue;
    let o = i[1], a = i[2], l = (c) => {
      if (!c.includes("?")) return parseInt(c, 16);
      let u = parseInt(c.replace(/\?/g, "0"), 16), f = parseInt(c.replace(/\?/g, "F"), 16);
      return [u, f];
    };
    if (a) {
      let c = l(o), u = l(a), f = Array.isArray(c) ? c[0] : c, s = Array.isArray(u) ? u[1] : u;
      t.push([Math.min(f, s), Math.max(f, s)]);
    } else {
      let c = l(o);
      Array.isArray(c) ? t.push([c[0], c[1]]) : t.push([c, c]);
    }
  }
  return t;
}
function Yn(e, t) {
  if (!t.length || !e || e.size === 0) return !0;
  for (let r of e) for (let [n, i] of t) if (r >= n && r <= i) return !0;
  return !1;
}
function gr(e, t) {
  let r = [];
  if (!e) return r;
  for (let n of e.matchAll(qn)) {
    let i = (n[2] || "").trim();
    if (!(!i || i.startsWith("data:"))) {
      if (!/^https?:/i.test(i)) try {
        i = new URL(i, t || location.href).href;
      } catch {
      }
      r.push(i);
    }
  }
  return r;
}
async function Xn(e, t, r = "") {
  var i, o, a, l, c;
  let n = e;
  for (let u of e.matchAll(qn)) {
    let f = cr(u[0]);
    if (!f) continue;
    let s = f;
    if (!s.startsWith("http") && !s.startsWith("data:")) try {
      s = new URL(s, t || location.href).href;
    } catch {
    }
    if (!we(s)) {
      if ((i = $.resource) != null && i.has(s)) {
        (o = $.font) == null || o.add(s), n = n.replace(u[0], `url(${$.resource.get(s)})`);
        continue;
      }
      if (!((a = $.font) != null && a.has(s))) try {
        let d = await pe(s, { as: "dataURL", useProxy: r, silent: !0 });
        if (d.ok && typeof d.data == "string") {
          let h = d.data;
          (l = $.resource) == null || l.set(s, h), (c = $.font) == null || c.add(s), n = n.replace(u[0], `url(${h})`);
        }
      } catch {
        console.warn("[snapDOM] Failed to fetch font resource:", s);
      }
    }
  }
  return n;
}
function vl(e) {
  if (!e.length) return null;
  let t = (a, l) => e.some(([c, u]) => !(u < a || c > l)), r = t(0, 255) || t(305, 305), n = t(256, 591) || t(7680, 7935), i = t(880, 1023), o = t(1024, 1279);
  return t(7840, 7929) || t(258, 259) || t(416, 417) || t(431, 432) ? "vietnamese" : o ? "cyrillic" : i ? "greek" : n ? "latin-ext" : r ? "latin" : null;
}
function Vr(e = {}) {
  let t = new Set((e.families || []).map((i) => String(i).toLowerCase())), r = new Set((e.domains || []).map((i) => String(i).toLowerCase())), n = new Set((e.subsets || []).map((i) => String(i).toLowerCase()));
  return (i, o) => {
    if (t.size && t.has(i.family.toLowerCase())) return !0;
    if (r.size) for (let a of i.srcUrls) try {
      if (r.has(new URL(a).host.toLowerCase())) return !0;
    } catch {
    }
    if (n.size) {
      let a = vl(o);
      if (a && n.has(a)) return !0;
    }
    return !1;
  };
}
function Cl(e) {
  var o, a, l, c, u, f;
  if (!e) return e;
  let t = /@font-face[^{}]*\{[^}]*\}/gi, r = /* @__PURE__ */ new Set(), n = [];
  for (let s of e.match(t) || []) {
    let d = ((o = s.match(/font-family:\s*([^;]+);/i)) == null ? void 0 : o[1]) || "", h = mr(d), m = (((a = s.match(/font-weight:\s*([^;]+);/i)) == null ? void 0 : a[1]) || "400").trim(), g = (((l = s.match(/font-style:\s*([^;]+);/i)) == null ? void 0 : l[1]) || "normal").trim(), p = (((c = s.match(/font-stretch:\s*([^;]+);/i)) == null ? void 0 : c[1]) || "100%").trim(), b = (((u = s.match(/unicode-range:\s*([^;]+);/i)) == null ? void 0 : u[1]) || "").trim(), x = (((f = s.match(/src\s*:\s*([^;}]+)[;}]/i)) == null ? void 0 : f[1]) || "").trim(), y = gr(x, location.href), w = y.length ? y.map((S) => String(S).toLowerCase()).sort().join("|") : x.toLowerCase(), A = [String(h || "").toLowerCase(), m, g, p, b.toLowerCase(), w].join("|");
    r.has(A) || (r.add(A), n.push(s));
  }
  if (n.length === 0) return e;
  let i = 0;
  return e.replace(t, () => n[i++] || "");
}
function Al(e, t, r, n, i) {
  let o = Array.from(e || []).sort().join("|"), a = t ? JSON.stringify({ families: (t.families || []).map((f) => String(f).toLowerCase()).sort(), domains: (t.domains || []).map((f) => String(f).toLowerCase()).sort(), subsets: (t.subsets || []).map((f) => String(f).toLowerCase()).sort() }) : "", l = (r || []).map((f) => `${(f.family || "").toLowerCase()}::${f.weight || "normal"}::${f.style || "normal"}::${f.src || ""}`).sort().join("|"), c = n || "", u = (i || []).map((f) => String(f).toLowerCase()).sort().join("|");
  return `fonts-embed-css::req=${o}::ex=${a}::lf=${l}::px=${c}::fd=${u}`;
}
async function Kn(e, t, r, n) {
  let i;
  try {
    i = e.cssRules || [];
  } catch {
    return;
  }
  let o = (a, l) => {
    try {
      return new URL(a, l || location.href).href;
    } catch {
      return a;
    }
  };
  for (let a of i) {
    if (a.type === CSSRule.IMPORT_RULE && a.styleSheet) {
      let l = a.href ? o(a.href, t) : t;
      if (n.depth >= xt) {
        console.warn(`[snapDOM] CSSOM import depth exceeded (${xt}) at ${l}`);
        continue;
      }
      if (l && n.visitedSheets.has(l)) {
        console.warn(`[snapDOM] Skipping circular CSSOM import: ${l}`);
        continue;
      }
      l && n.visitedSheets.add(l);
      let c = { ...n, depth: (n.depth || 0) + 1 };
      await Kn(a.styleSheet, l, r, c);
      continue;
    }
    if (a.type === CSSRule.FONT_FACE_RULE) {
      let l = (a.style.getPropertyValue("font-family") || "").trim(), c = mr(l);
      if (!c || we(c)) continue;
      let u = (a.style.getPropertyValue("font-weight") || "400").trim(), f = (a.style.getPropertyValue("font-style") || "normal").trim(), s = (a.style.getPropertyValue("font-stretch") || "100%").trim(), d = (a.style.getPropertyValue("src") || "").trim(), h = (a.style.getPropertyValue("unicode-range") || "").trim();
      if (!n.faceMatchesRequired(c, f, u, s)) continue;
      let m = Gn(h);
      if (!Yn(n.usedCodepoints, m)) continue;
      let g = { family: c, weightSpec: u, styleSpec: f, stretchSpec: s, unicodeRange: h, srcRaw: d, srcUrls: gr(d, t || location.href), href: t || location.href };
      if (n.simpleExcluder && n.simpleExcluder(g, m)) continue;
      if (/url\(/i.test(d)) {
        let p = await Xn(d, t || location.href, n.useProxy);
        await r(`@font-face{font-family:${c};src:${p};font-style:${f};font-weight:${u};font-stretch:${s};${h ? `unicode-range:${h};` : ""}}`);
      } else await r(`@font-face{font-family:${c};src:${d};font-style:${f};font-weight:${u};font-stretch:${s};${h ? `unicode-range:${h};` : ""}}`);
    }
  }
}
async function kl({ required: e, usedCodepoints: t, exclude: r = void 0, localFonts: n = [], useProxy: i = "", fontStylesheetDomains: o = [] } = {}) {
  var b, x, y, w, A, S, v, C, M, k, H, q, U, L, B, _, K, re;
  e instanceof Set || (e = /* @__PURE__ */ new Set()), t instanceof Set || (t = /* @__PURE__ */ new Set());
  let a = /* @__PURE__ */ new Map();
  for (let T of e) {
    let [E, F, P, N] = String(T).split("__");
    if (!E) continue;
    let I = E.toLowerCase(), O = a.get(I) || [];
    O.push({ w: parseInt(F, 10), s: P, st: parseInt(N, 10) }), a.set(I, O);
  }
  function l(T, E, F, P) {
    let N = String(T).toLowerCase();
    if (!a.has(N)) return !1;
    let I = a.get(N), O = ml(F), j = gl(E), Q = pl(P), J = O.min !== O.max, ee = O.min, V = (z) => j.kind === "normal" && z === "normal" || j.kind !== "normal" && (z === "italic" || z === "oblique"), Y = !1;
    for (let z of I) {
      let oe = J ? z.w >= O.min && z.w <= O.max : z.w === ee, ge = V(bt(z.s)), Fe = z.st >= Q.min && z.st <= Q.max;
      if (oe && ge && Fe) {
        Y = !0;
        break;
      }
    }
    if (Y) return !0;
    if (!J) for (let z of I) {
      let oe = V(bt(z.s)), ge = z.st >= Q.min && z.st <= Q.max;
      if (Math.abs(ee - z.w) <= 300 && oe && ge) return !0;
    }
    if (!J && j.kind === "normal" && I.some((z) => bt(z.s) !== "normal")) for (let z of I) {
      let oe = Math.abs(ee - z.w) <= 300, ge = z.st >= Q.min && z.st <= Q.max;
      if (oe && ge) return !0;
    }
    return !1;
  }
  let c = Vr(r), u = Al(e, r, n, i, o);
  if ((b = $.resource) != null && b.has(u)) return $.resource.get(u);
  let f = wl(e), s = [], d = Yt;
  for (let T of document.querySelectorAll("style")) {
    let E = T.textContent || "";
    for (let F of E.matchAll(d)) {
      let P = (F[2] || F[4] || "").trim();
      !P || we(P) || document.querySelector(`link[rel="stylesheet"][href="${P}"]`) || s.push(P);
    }
  }
  let h = [];
  s.length && await Promise.all(s.map((T) => new Promise((E) => {
    if (document.querySelector(`link[rel="stylesheet"][href="${T}"]`)) return E(null);
    let F = document.createElement("link");
    F.rel = "stylesheet", F.href = T, F.setAttribute("data-snapdom", "injected-import"), F.onload = () => E(F), F.onerror = () => E(null), document.head.appendChild(F), h.push(F);
  })));
  let m = "", g = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((T) => !!T.href);
  for (let T of h) try {
    T.remove();
  } catch {
  }
  for (let T of g) try {
    if (we(T.href)) continue;
    let E = "", F = !1;
    try {
      F = new URL(T.href, location.href).origin === location.origin;
    } catch {
    }
    if (!F) {
      let N = Array.isArray(o) ? o : [];
      if (!bl(T.href, f, N)) continue;
    }
    if (F) {
      let N = Array.from(document.styleSheets).find((I) => I.href === T.href);
      if (N) try {
        let I = N.cssRules || [];
        E = Array.from(I).map((O) => O.cssText).join("");
      } catch {
      }
    }
    if (!E) {
      let N = await pe(T.href, { as: "text", useProxy: i });
      if (N != null && N.ok && typeof N.data == "string" && (E = N.data), we(T.href)) continue;
    }
    E = await xl(E, T.href, i);
    let P = "";
    for (let N of E.match(Sl) || []) {
      let I = (((x = N.match(/font-family:\s*([^;]+);/i)) == null ? void 0 : x[1]) || "").trim(), O = mr(I);
      if (!O || we(O)) continue;
      let j = (((y = N.match(/font-weight:\s*([^;]+);/i)) == null ? void 0 : y[1]) || "400").trim(), Q = (((w = N.match(/font-style:\s*([^;]+);/i)) == null ? void 0 : w[1]) || "normal").trim(), J = (((A = N.match(/font-stretch:\s*([^;]+);/i)) == null ? void 0 : A[1]) || "100%").trim(), ee = (((S = N.match(/unicode-range:\s*([^;]+);/i)) == null ? void 0 : S[1]) || "").trim(), V = (((v = N.match(/src\s*:\s*([^;}]+)[;}]/i)) == null ? void 0 : v[1]) || "").trim(), Y = gr(V, T.href);
      if (!l(O, Q, j, J)) continue;
      let z = Gn(ee);
      if (!Yn(t, z)) continue;
      let oe = { family: O, weightSpec: j, styleSpec: Q, stretchSpec: J, unicodeRange: ee, srcRaw: V, srcUrls: Y, href: T.href };
      if (r && c(oe, z)) continue;
      let ge = /url\(/i.test(V) ? await Xn(N, T.href, i) : N;
      P += ge;
    }
    P.trim() && (m += P);
  } catch {
    console.warn("[snapDOM] Failed to process stylesheet:", T.href);
  }
  let p = { requiredIndex: a, usedCodepoints: t, faceMatchesRequired: l, simpleExcluder: r ? Vr(r) : null, useProxy: i, visitedSheets: /* @__PURE__ */ new Set(), depth: 0 };
  for (let T of document.styleSheets) if (!(T.href && g.some((E) => E.href === T.href))) try {
    let E = T.href || location.origin + "/";
    E && p.visitedSheets.add(E), await Kn(T, E, async (F) => {
      m += F;
    }, p);
  } catch {
  }
  try {
    for (let T of document.fonts || []) {
      if (!T || !T.family || T.status !== "loaded" || !T._snapdomSrc) continue;
      let E = String(T.family).replace(/^['"]+|['"]+$/g, "");
      if (we(E) || !a.has(E.toLowerCase()) || r != null && r.families && r.families.some((P) => String(P).toLowerCase() === E.toLowerCase())) continue;
      let F = T._snapdomSrc;
      if (!String(F).startsWith("data:")) {
        if ((C = $.resource) != null && C.has(T._snapdomSrc)) F = $.resource.get(T._snapdomSrc), (M = $.font) == null || M.add(T._snapdomSrc);
        else if (!((k = $.font) != null && k.has(T._snapdomSrc))) try {
          let P = await pe(T._snapdomSrc, { as: "dataURL", useProxy: i, silent: !0 });
          if (P.ok && typeof P.data == "string") F = P.data, (H = $.resource) == null || H.set(T._snapdomSrc, F), (q = $.font) == null || q.add(T._snapdomSrc);
          else continue;
        } catch {
          console.warn("[snapDOM] Failed to fetch dynamic font src:", T._snapdomSrc);
          continue;
        }
      }
      m += `@font-face{font-family:'${E}';src:url(${F});font-style:${T.style || "normal"};font-weight:${T.weight || "normal"};}`;
    }
  } catch {
  }
  for (let T of n) {
    if (!T || typeof T != "object") continue;
    let E = String(T.family || "").replace(/^['"]+|['"]+$/g, "");
    if (!E || we(E) || !a.has(E.toLowerCase()) || r != null && r.families && r.families.some((j) => String(j).toLowerCase() === E.toLowerCase())) continue;
    let F = T.weight != null ? String(T.weight) : "normal", P = T.style != null ? String(T.style) : "normal", N = T.stretchPct != null ? `${T.stretchPct}%` : "100%", I = String(T.src || ""), O = I;
    if (!O.startsWith("data:")) {
      if ((U = $.resource) != null && U.has(I)) O = $.resource.get(I), (L = $.font) == null || L.add(I);
      else if (!((B = $.font) != null && B.has(I))) try {
        let j = await pe(I, { as: "dataURL", useProxy: i, silent: !0 });
        if (j.ok && typeof j.data == "string") O = j.data, (_ = $.resource) == null || _.set(I, O), (K = $.font) == null || K.add(I);
        else continue;
      } catch {
        console.warn("[snapDOM] Failed to fetch localFonts src:", I);
        continue;
      }
    }
    m += `@font-face{font-family:'${E}';src:url(${O});font-style:${P};font-weight:${F};font-stretch:${N};}`;
  }
  return m && (m = Cl(m), (re = $.resource) == null || re.set(u, m)), m;
}
function Qn(e) {
  let t = /* @__PURE__ */ new Set();
  if (!e) return t;
  let r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null), n = (a) => {
    let l = fl(a.fontFamily);
    if (l.length) for (let c of l) {
      let u = (f, s, d) => `${c}__${yt(f)}__${bt(s)}__${hl(d)}`;
      t.add(u(a.fontWeight, a.fontStyle, a.fontStretch));
    }
  };
  n(getComputedStyle(e));
  let i = getComputedStyle(e, "::before");
  i && i.content && i.content !== "none" && n(i);
  let o = getComputedStyle(e, "::after");
  for (o && o.content && o.content !== "none" && n(o); r.nextNode(); ) {
    let a = r.currentNode, l = getComputedStyle(a);
    n(l);
    let c = getComputedStyle(a, "::before");
    c && c.content && c.content !== "none" && n(c);
    let u = getComputedStyle(a, "::after");
    u && u.content && u.content !== "none" && n(u);
  }
  return t;
}
function Ml(e) {
  var i;
  let t = /* @__PURE__ */ new Set(), r = (o) => {
    if (o) for (let a of o) t.add(a.codePointAt(0));
  }, n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
  for (; n.nextNode(); ) {
    let o = n.currentNode;
    if (o.nodeType === Node.TEXT_NODE) r(o.nodeValue || "");
    else if (o.nodeType === Node.ELEMENT_NODE) {
      let a = o;
      for (let l of ["::before", "::after"]) {
        let c = (i = getComputedStyle(a, l)) == null ? void 0 : i.getPropertyValue("content");
        if (!(!c || c === "none")) if (/^"/.test(c) || /^'/.test(c)) r(c.slice(1, -1));
        else {
          let u = c.match(/\\[0-9A-Fa-f]{1,6}/g);
          if (u) for (let f of u) try {
            t.add(parseInt(f.slice(1), 16));
          } catch {
          }
        }
      }
    }
  }
  return t;
}
async function Jn(e, t = 2) {
  try {
    await document.fonts.ready;
  } catch {
  }
  let r = Array.from(e || []).filter(Boolean);
  if (r.length === 0) return;
  let n = () => {
    let i = document.createElement("div");
    i.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;opacity:0!important;pointer-events:none!important;contain:layout size style;";
    for (let o of r) {
      let a = document.createElement("span");
      a.textContent = "AaBbGg1234ÁÉÍÓÚçñ—∞", a.style.fontFamily = `"${o}"`, a.style.fontWeight = "700", a.style.fontStyle = "italic", a.style.fontSize = "32px", a.style.lineHeight = "1", a.style.whiteSpace = "nowrap", a.style.margin = "0", a.style.padding = "0", i.appendChild(a);
    }
    document.body.appendChild(i), i.offsetWidth, document.body.removeChild(i);
  };
  for (let i = 0; i < Math.max(1, t); i++) n(), await new Promise((o) => requestAnimationFrame(() => requestAnimationFrame(o)));
}
me();
function El(e) {
  return /\bcounter\s*\(|\bcounters\s*\(/.test(e || "");
}
function jr(e, t = !1) {
  let r = "", n = Math.max(1, e);
  for (; n > 0; ) n--, r = String.fromCharCode(97 + n % 26) + r, n = Math.floor(n / 26);
  return t ? r.toUpperCase() : r;
}
function qr(e, t = !0) {
  let r = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]], n = Math.max(1, Math.min(3999, e)), i = "";
  for (let [o, a] of r) for (; n >= o; ) i += a, n -= o;
  return t ? i : i.toLowerCase();
}
function Gr(e, t) {
  switch ((t || "decimal").toLowerCase()) {
    case "decimal":
      return String(e);
    case "decimal-leading-zero": {
      let r = Math.abs(e);
      return (e < 0 ? "-" : "") + (r < 10 ? "0" : "") + String(r);
    }
    case "lower-alpha":
      return jr(e, !1);
    case "upper-alpha":
      return jr(e, !0);
    case "lower-roman":
      return qr(e, !1);
    case "upper-roman":
      return qr(e, !0);
    default:
      return String(e);
  }
}
function $l(e) {
  let t = () => {
    var d;
    return ((d = $ == null ? void 0 : $.session) == null ? void 0 : d.__counterEpoch) ?? 0;
  }, r = t(), n = /* @__PURE__ */ new WeakMap(), i = e instanceof Document ? e.documentElement : e, o = (d) => d && d.tagName === "LI", a = (d) => {
    let h = 0, m = d == null ? void 0 : d.parentElement;
    if (!m) return 0;
    for (let g of m.children) {
      if (g === d) break;
      g.tagName === "LI" && h++;
    }
    return h;
  }, l = (d) => {
    let h = /* @__PURE__ */ new Map();
    for (let [m, g] of d) h.set(m, g.slice());
    return h;
  }, c = (d, h, m) => {
    var y, w, A;
    let g = l(d), p;
    try {
      p = ((y = m.style) == null ? void 0 : y.counterReset) || getComputedStyle(m).counterReset;
    } catch {
    }
    if (p && p !== "none") for (let S of p.split(",")) {
      let v = S.trim().split(/\s+/), C = v[0], M = Number.isFinite(Number(v[1])) ? Number(v[1]) : 0;
      if (!C) continue;
      let k = h.get(C);
      if (k && k.length) {
        let H = k.slice();
        H.push(M), g.set(C, H);
      } else g.set(C, [M]);
    }
    let b;
    try {
      b = ((w = m.style) == null ? void 0 : w.counterSet) || getComputedStyle(m).counterSet;
    } catch {
    }
    if (b && b !== "none") for (let S of b.split(",")) {
      let v = S.trim().split(/\s+/), C = v[0], M = Number.isFinite(Number(v[1])) ? Number(v[1]) : 0;
      if (!C) continue;
      let k = g.get(C) || [];
      k.length === 0 && k.push(0), k[k.length - 1] = M, g.set(C, k);
    }
    let x;
    try {
      x = ((A = m.style) == null ? void 0 : A.counterIncrement) || getComputedStyle(m).counterIncrement;
    } catch {
    }
    if (x && x !== "none") for (let S of x.split(",")) {
      let v = S.trim().split(/\s+/), C = v[0], M = Number.isFinite(Number(v[1])) ? Number(v[1]) : 1;
      if (!C) continue;
      let k = g.get(C) || [];
      k.length === 0 && k.push(0), k[k.length - 1] += M, g.set(C, k);
    }
    try {
      if (getComputedStyle(m).display === "list-item" && o(m)) {
        let S = m.parentElement, v = 1;
        if (S && S.tagName === "OL") {
          let M = S.getAttribute("start"), k = Number.isFinite(Number(M)) ? Number(M) : 1, H = a(m), q = m.getAttribute("value");
          v = Number.isFinite(Number(q)) ? Number(q) : k + H;
        } else v = 1 + a(m);
        let C = g.get("list-item") || [];
        C.length === 0 && C.push(0), C[C.length - 1] = v, g.set("list-item", C);
      }
    } catch {
    }
    return g;
  }, u = (d, h, m) => {
    let g = c(m, h, d);
    n.set(d, g);
    let p = g;
    for (let x of d.children) p = u(x, g, p);
    let b = /* @__PURE__ */ new Map();
    for (let [x, y] of m) {
      let w = y.length, A = p.get(x);
      b.set(x, A && A.length ? A.slice(0, w) : y.slice());
    }
    for (let [x, y] of p) !b.has(x) && y.length && !h.has(x) && b.set(x, y.slice(0, 1));
    return b;
  }, f = /* @__PURE__ */ new Map();
  u(i, f, f);
  function s() {
    let d = t();
    if (d !== r) {
      r = d;
      let h = /* @__PURE__ */ new Map();
      u(i, h, h);
    }
  }
  return { get(d, h) {
    var g;
    s();
    let m = (g = n.get(d)) == null ? void 0 : g.get(h);
    return m && m.length ? m[m.length - 1] : 0;
  }, getStack(d, h) {
    var g;
    s();
    let m = (g = n.get(d)) == null ? void 0 : g.get(h);
    return m ? m.slice() : [];
  } };
}
function Tl(e, t, r) {
  if (!e || e === "none") return e;
  try {
    let n = /\b(counter|counters)\s*\(([^)]+)\)/g;
    return e.replace(n, (i, o, a) => {
      var c, u, f;
      let l = String(a).split(",").map((s) => s.trim());
      if (o === "counter") {
        let s = (c = l[0]) == null ? void 0 : c.replace(/^["']|["']$/g, ""), d = (l[1] || "decimal").toLowerCase(), h = r.get(t, s);
        return Gr(h, d);
      } else {
        let s = (u = l[0]) == null ? void 0 : u.replace(/^["']|["']$/g, ""), d = ((f = l[1]) == null ? void 0 : f.replace(/^["']|["']$/g, "")) ?? "", h = (l[2] || "decimal").toLowerCase(), m = r.getStack(t, s);
        return m.length ? m.map((g) => Gr(g, h)).join(d) : "";
      }
    });
  } catch {
    return "- ";
  }
}
Be();
me();
var _e = /* @__PURE__ */ new WeakMap(), Yr = 1e3;
function Fl(e, t) {
  let r = Zn(e);
  return t ? (t.__pseudoPreflightFp !== r && (t.__pseudoPreflight = Kr(e, r), t.__pseudoPreflightFp = r), !!t.__pseudoPreflight) : Kr(e, r);
}
function Xt(e) {
  try {
    return e && e.cssRules ? e.cssRules : null;
  } catch {
    return null;
  }
}
function Zn(e) {
  let t = e.querySelectorAll('style,link[rel~="stylesheet"]'), r = `n:${t.length}|`, n = 0;
  for (let o = 0; o < t.length; o++) {
    let a = t[o];
    if (a.tagName === "STYLE") {
      let l = a.textContent ? a.textContent.length : 0;
      r += `S${l}|`;
      let c = a.sheet, u = c ? Xt(c) : null;
      u && (n += u.length);
    } else {
      let l = a.getAttribute("href") || "", c = a.getAttribute("media") || "all";
      r += `L${l}|m:${c}|`;
      let u = a.sheet, f = u ? Xt(u) : null;
      f && (n += f.length);
    }
  }
  let i = e.adoptedStyleSheets;
  return r += `ass:${Array.isArray(i) ? i.length : 0}|tr:${n}`, r;
}
function Xr(e, t, r) {
  let n = Xt(e);
  if (!n) return !1;
  for (let i = 0; i < n.length; i++) {
    if (r.budget <= 0) return !1;
    let o = n[i], a = o && o.cssText ? o.cssText : "";
    r.budget--;
    for (let l of t) if (a.includes(l)) return !0;
    if (o && o.cssRules && o.cssRules.length) for (let l = 0; l < o.cssRules.length && r.budget > 0; l++) {
      let c = o.cssRules[l], u = c && c.cssText ? c.cssText : "";
      r.budget--;
      for (let f of t) if (u.includes(f)) return !0;
    }
    if (r.budget <= 0) return !1;
  }
  return !1;
}
function Kr(e = document, t = Zn(e)) {
  let r = _e.get(e);
  if (r && r.fingerprint === t) return r.result;
  let n = ["::before", "::after", "::first-letter", ":before", ":after", ":first-letter", "counter(", "counters(", "counter-increment", "counter-reset"], i = e.querySelectorAll("style");
  for (let a = 0; a < i.length; a++) {
    let l = i[a].textContent || "";
    for (let c of n) if (l.includes(c)) return _e.set(e, { fingerprint: t, result: !0 }), !0;
  }
  let o = e.adoptedStyleSheets;
  if (Array.isArray(o) && o.length) {
    let a = { budget: Yr };
    try {
      for (let l of o) if (Xr(l, n, a)) return _e.set(e, { fingerprint: t, result: !0 }), !0;
    } catch {
    }
  }
  {
    let a = e.querySelectorAll('style,link[rel~="stylesheet"]'), l = { budget: Yr };
    for (let c = 0; c < a.length && l.budget > 0; c++) {
      let u = a[c], f = null;
      if (u.tagName, f = u.sheet || null, f && Xr(f, n, l)) return _e.set(e, { fingerprint: t, result: !0 }), !0;
    }
  }
  return e.querySelector('[style*="counter("], [style*="counters("]') ? (_e.set(e, { fingerprint: t, result: !0 }), !0) : (_e.set(e, { fingerprint: t, result: !1 }), !1);
}
var Oe = /* @__PURE__ */ new WeakMap();
function Qr(e) {
  for (let t of ["Top", "Right", "Bottom", "Left"]) {
    let r = parseFloat(e[`border${t}Width`]) || 0, n = e[`border${t}Style`];
    if (r > 0 && n && n !== "none" && n !== "hidden") return !0;
  }
  return !1;
}
var Jr = -1;
function Ll(e) {
  if (!e) return "";
  let t = [], r = /"([^"]*)"/g, n = 0, i;
  for (; i = r.exec(e); ) {
    let a = e.slice(n, i.index).trim();
    a && t.push(a), t.push(i[1]), n = r.lastIndex;
  }
  let o = e.slice(n).trim();
  return o && t.push(o), t.join("");
}
function Kt(e, t) {
  let r = e.parentElement, n = r ? Oe.get(r) : null;
  return n ? { get(i, o) {
    let a = t.get(i, o), l = n.get(o);
    return typeof l == "number" ? Math.max(a, l) : a;
  }, getStack(i, o) {
    let a = t.getStack(i, o);
    if (!a.length) return a;
    let l = n.get(o);
    if (typeof l == "number") {
      let c = a.slice();
      return c[c.length - 1] = Math.max(c[c.length - 1], l), c;
    }
    return a;
  } } : t;
}
function Qt(e, t, r) {
  let n = /* @__PURE__ */ new Map();
  function i(u) {
    let f = [];
    if (!u || u === "none") return f;
    for (let s of String(u).split(",")) {
      let d = s.trim().split(/\s+/), h = d[0], m = Number.isFinite(Number(d[1])) ? Number(d[1]) : void 0;
      h && f.push({ name: h, num: m });
    }
    return f;
  }
  let o = i(t == null ? void 0 : t.counterReset), a = i(t == null ? void 0 : t.counterSet), l = i(t == null ? void 0 : t.counterIncrement);
  function c(u) {
    if (n.has(u)) return n.get(u).slice();
    let f = r.getStack(e, u);
    f = f.length ? f.slice() : [];
    let s = o.find((m) => m.name === u);
    if (s) {
      let m = Number.isFinite(s.num) ? s.num : 0;
      f = f.length ? [...f, m] : [m];
    }
    let d = a.find((m) => m.name === u);
    if (d) {
      let m = Number.isFinite(d.num) ? d.num : 0;
      f.length === 0 && (f = [0]), f[f.length - 1] = m;
    }
    let h = l.find((m) => m.name === u);
    if (h) {
      let m = Number.isFinite(h.num) ? h.num : 1;
      f.length === 0 && (f = [0]), f[f.length - 1] += m;
    }
    return n.set(u, f.slice()), f;
  }
  return { get(u, f) {
    let s = c(f);
    return s.length ? s[s.length - 1] : 0;
  }, getStack(u, f) {
    return c(f);
  }, __incs: l };
}
function Nl(e, t, r) {
  let n;
  try {
    n = he(e, t);
  } catch {
  }
  let i = n == null ? void 0 : n.content;
  if (!i || i === "none" || i === "normal") return { text: "", incs: [] };
  let o = Kt(e, r), a = Qt(e, n, o), l = El(i) ? Tl(i, e, a) : i;
  return { text: Ll(l), incs: a.__incs || [] };
}
async function Jt(e, t, r, n) {
  var c, u, f;
  if (!(e instanceof Element) || !(t instanceof Element)) return;
  let i = e.ownerDocument || document;
  if (!Fl(i, r)) return;
  let o = ((c = $ == null ? void 0 : $.session) == null ? void 0 : c.__counterEpoch) ?? 0;
  if (Jr !== o && (Oe = /* @__PURE__ */ new WeakMap(), r && (r.__counterCtx = null), Jr = o), !r.__counterCtx) try {
    r.__counterCtx = $l(e.ownerDocument || document);
  } catch (s) {
    G(r, "buildCounterContext failed", s);
  }
  let a = r.__counterCtx;
  for (let s of ["::before", "::after", "::first-letter"]) try {
    let d = he(e, s);
    if (!d || d.content === "none" && d.backgroundImage === "none" && d.backgroundColor === "transparent" && !Qr(d) && (!d.transform || d.transform === "none") && d.display === "inline") continue;
    if (s === "::first-letter") {
      let E = he(e), F = ((E == null ? void 0 : E.display) || "").toLowerCase();
      if (F.includes("flex") || F.includes("grid") || !(d.color !== E.color || d.fontSize !== E.fontSize || d.fontWeight !== E.fontWeight || d.fontFamily !== E.fontFamily || d.fontStyle !== E.fontStyle || d.textTransform !== E.textTransform || d.float !== E.float || d.paddingTop !== E.paddingTop || d.paddingRight !== E.paddingRight || d.paddingBottom !== E.paddingBottom || d.paddingLeft !== E.paddingLeft || d.marginTop !== E.marginTop || d.marginRight !== E.marginRight || d.marginBottom !== E.marginBottom || d.marginLeft !== E.marginLeft)) continue;
      let P = Array.from(t.childNodes).find((V) => {
        var Y;
        return V.nodeType === Node.TEXT_NODE && ((Y = V.textContent) == null ? void 0 : Y.trim().length) > 0;
      });
      if (!P) continue;
      let N = P.textContent, I = (u = N.match(/^([^\p{L}\p{N}\s]*[\p{L}\p{N}](?:['’])?)/u)) == null ? void 0 : u[0], O = N.slice((I == null ? void 0 : I.length) || 0);
      if (!I || /[\uD800-\uDFFF]/.test(I)) continue;
      let j = document.createElement("span");
      j.textContent = I, j.dataset.snapdomPseudo = "::first-letter";
      let Q = Pr(d), J = zt(Q, "span");
      r.styleMap.set(j, J);
      let ee = document.createTextNode(O);
      t.replaceChild(ee, P), t.insertBefore(j, ee);
      continue;
    }
    let h = d.content ?? "", m = h === "" || h === "none" || h === "normal", { text: g, incs: p } = Nl(e, s, a), b = d.backgroundImage, x = d.backgroundColor, y = d.fontFamily, w = parseInt(d.fontSize) || 32, A = parseInt(d.fontWeight) || !1, S = d.color || "#000", v = d.transform, C = we(y), M = !m && g !== "", k = b && b !== "none", H = x && x !== "transparent" && x !== "rgba(0, 0, 0, 0)", q = Qr(d), U = v && v !== "none", L = h !== "none" && h !== "normal" && ((parseFloat(d.width) || 0) > 0 || (parseFloat(d.height) || 0) > 0);
    if (!(M || k || H || q || U || L)) {
      if (p && p.length && e.parentElement) {
        let E = Oe.get(e.parentElement) || /* @__PURE__ */ new Map();
        for (let { name: F } of p) {
          if (!F) continue;
          let P = Kt(e, a), N = Qt(e, he(e, s), P).get(e, F);
          E.set(F, N);
        }
        Oe.set(e.parentElement, E);
      }
      continue;
    }
    let B = !1;
    if (M && !C && g.length > 1 && !g.startsWith("url(")) {
      let E = he(e), F = parseFloat(E.fontSize) || 16, P = parseFloat(E.lineHeight);
      Number.isFinite(P) || (P = F * 1.5), e.getBoundingClientRect().height < P * 1.6 && (t.style.whiteSpace = "nowrap", B = !0);
    }
    let _ = document.createElement("span");
    _.dataset.snapdomPseudo = s, _.style.pointerEvents = "none", B && (_.style.whiteSpace = "nowrap");
    let K = Pr(d), re = zt(K, "span");
    if (r.styleMap.set(_, re), C && g && g.length === 1) {
      let { dataUrl: E, width: F, height: P } = await ul(g, y, A, w, S), N = document.createElement("img");
      N.src = E, N.style = `height:${w}px;width:${F / P * w}px;object-fit:contain;`, _.appendChild(N), t.dataset.snapdomHasIcon = "true";
    } else if (g && g.startsWith("url(")) {
      let E = cr(g);
      if (E != null && E.trim()) try {
        let F = await pe(wt(E), { as: "dataURL", useProxy: n.useProxy });
        if (F != null && F.ok && typeof F.data == "string") {
          let P = document.createElement("img");
          P.src = F.data, P.style = `width:${w}px;height:auto;object-fit:contain;`, _.appendChild(P);
        }
      } catch (F) {
        console.error(`[snapdom] Error in pseudo ${s} for`, e, F);
      }
    } else !C && M && (_.textContent = g);
    _.style.backgroundImage = "none", "maskImage" in _.style && (_.style.maskImage = "none"), "webkitMaskImage" in _.style && (_.style.webkitMaskImage = "none");
    try {
      _.style.backgroundRepeat = d.backgroundRepeat, _.style.backgroundSize = d.backgroundSize, d.backgroundPositionX && d.backgroundPositionY ? (_.style.backgroundPositionX = d.backgroundPositionX, _.style.backgroundPositionY = d.backgroundPositionY) : _.style.backgroundPosition = d.backgroundPosition, _.style.backgroundOrigin = d.backgroundOrigin, _.style.backgroundClip = d.backgroundClip, _.style.backgroundAttachment = d.backgroundAttachment, _.style.backgroundBlendMode = d.backgroundBlendMode;
    } catch {
    }
    if (k) try {
      let E = Bt(b), F = await Promise.all(E.map(Mn));
      _.style.backgroundImage = F.join(", ");
    } catch (E) {
      console.warn(`[snapdom] Failed to inline background-image for ${s}`, E);
    }
    H && (_.style.backgroundColor = x);
    let T = _.childNodes.length > 0 || ((f = _.textContent) == null ? void 0 : f.trim()) !== "" || k || H || q || U || L;
    if (p && p.length && e.parentElement) {
      let E = Oe.get(e.parentElement) || /* @__PURE__ */ new Map(), F = Kt(e, a), P = Qt(e, he(e, s), F);
      for (let { name: N } of p) {
        if (!N) continue;
        let I = P.get(e, N);
        E.set(N, I);
      }
      Oe.set(e.parentElement, E);
    }
    if (!T) continue;
    s === "::before" ? (t.dataset.snapdomHasBefore = "1", t.insertBefore(_, t.firstChild)) : (t.dataset.snapdomHasAfter = "1", t.appendChild(_));
  } catch (d) {
    console.warn(`[snapdom] Failed to capture ${s} for`, e, d);
  }
  let l = Array.from(t.children).filter((s) => !s.dataset.snapdomPseudo);
  if (r.nodeMap) for (let s of l) {
    let d = r.nodeMap.get(s);
    d instanceof Element && await Jt(d, s, r, n);
  }
  else {
    let s = Array.from(e.children);
    for (let d = 0; d < Math.min(s.length, l.length); d++) await Jt(s[d], l[d], r, n);
  }
}
function Pl(e, t) {
  var w, A;
  if (!e || !(e instanceof Element)) return;
  let r = e.ownerDocument || document, n = r, i = e instanceof SVGSVGElement ? [e] : Array.from(e.querySelectorAll("svg"));
  if (i.length === 0) return;
  let o = /url\(\s*#([^)]+)\)/g, a = ["fill", "stroke", "filter", "clip-path", "mask", "marker", "marker-start", "marker-mid", "marker-end"], l = (S) => window.CSS && CSS.escape ? CSS.escape(S) : S.replace(/[^a-zA-Z0-9_-]/g, "\\$&"), c = "http://www.w3.org/1999/xlink", u = (S) => {
    if (!S || !S.getAttribute) return null;
    let v = S.getAttribute("href") || S.getAttribute("xlink:href") || (typeof S.getAttributeNS == "function" ? S.getAttributeNS(c, "href") : null);
    if (v) return v;
    let C = S.attributes;
    if (!C) return null;
    for (let M = 0; M < C.length; M++) {
      let k = C[M];
      if (!k || !k.name) continue;
      if (k.name === "href") return k.value;
      let H = k.name.indexOf(":");
      if (H !== -1 && k.name.slice(H + 1) === "href") return k.value;
    }
    return null;
  }, f = new Set(Array.from(e.querySelectorAll("[id]")).map((S) => S.id)), s = /* @__PURE__ */ new Set(), d = !1, h = (S, v = null) => {
    if (!S) return;
    o.lastIndex = 0;
    let C;
    for (; C = o.exec(S); ) {
      d = !0;
      let M = (C[1] || "").trim();
      M && (f.has(M) || (s.add(M), v && !v.has(M) && v.add(M)));
    }
  }, m = (S) => {
    let v = S.querySelectorAll("use");
    for (let M of v) {
      let k = u(M);
      if (!k || !k.startsWith("#")) continue;
      d = !0;
      let H = k.slice(1).trim();
      H && !f.has(H) && s.add(H);
    }
    let C = S.querySelectorAll('*[style*="url("],*[fill^="url("], *[stroke^="url("],*[filter^="url("],*[clip-path^="url("],*[mask^="url("],*[marker^="url("],*[marker-start^="url("],*[marker-mid^="url("],*[marker-end^="url("]');
    for (let M of C) {
      h(M.getAttribute("style") || "");
      for (let k of a) h(M.getAttribute(k));
    }
  };
  for (let S of i) m(S);
  if (!d) return;
  let g = e.querySelector("svg.inline-defs-container");
  g || (g = r.createElementNS("http://www.w3.org/2000/svg", "svg"), g.classList.add("inline-defs-container"), g.setAttribute("aria-hidden", "true"), g.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden"), e.insertBefore(g, e.firstChild || null));
  let p = g.querySelector("defs") || null, b = (S) => {
    if (!S || f.has(S)) return null;
    let v = l(S), C = (M) => {
      let k = n.querySelector(M);
      return k && !e.contains(k) ? k : null;
    };
    return C(`svg defs > *#${v}`) || C(`svg > symbol#${v}`) || C(`*#${v}`);
  };
  if (!s.size) return;
  let x = new Set(s), y = /* @__PURE__ */ new Set();
  for (; x.size; ) {
    let S = x.values().next().value;
    if (x.delete(S), !S || f.has(S) || y.has(S)) continue;
    let v = b(S);
    if (!v) {
      y.add(S);
      continue;
    }
    p || (p = r.createElementNS("http://www.w3.org/2000/svg", "defs"), g.appendChild(p));
    let C = v.cloneNode(!0);
    C.id || C.setAttribute("id", S), p.appendChild(C), y.add(S), f.add(S);
    let M = [C, ...C.querySelectorAll("*")];
    for (let k of M) {
      let H = u(k);
      if (H && H.startsWith("#")) {
        let U = H.slice(1).trim();
        U && !f.has(U) && !y.has(U) && x.add(U);
      }
      let q = ((w = k.getAttribute) == null ? void 0 : w.call(k, "style")) || "";
      q && h(q, x);
      for (let U of a) {
        let L = (A = k.getAttribute) == null ? void 0 : A.call(k, U);
        L && h(L, x);
      }
    }
  }
}
me();
function Rl(e, t) {
  var l;
  if (!e || !t) return;
  let r = e.scrollTop || 0;
  if (!r) return;
  getComputedStyle(t).position === "static" && (t.style.position = "relative");
  let n = e.getBoundingClientRect(), i = e.clientHeight, o = "data-snap-ph", a = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
  for (; a.nextNode(); ) {
    let c = a.currentNode, u = getComputedStyle(c), f = u.position;
    if (f !== "sticky" && f !== "-webkit-sticky") continue;
    let s = Zr(u.top), d = Zr(u.bottom);
    if (s == null && d == null) continue;
    let h = Il(c, e), m = Wl(t, h, o);
    if (!m) continue;
    let g = c.getBoundingClientRect(), p = g.width, b = g.height, x = g.left - n.left;
    if (!(p > 0 && b > 0) || !Number.isFinite(x)) continue;
    let y = s != null ? s + r : r + (i - b - d);
    if (!Number.isFinite(y)) continue;
    let w = Number.parseInt(u.zIndex, 10), A = Number.isFinite(w), S = A ? Math.max(w, 1) + 1 : 2, v = A ? w - 1 : 0, C = m.cloneNode(!1);
    C.setAttribute(o, "1"), C.style.position = "sticky", C.style.left = `${x}px`, C.style.top = `${y}px`, C.style.width = `${p}px`, C.style.height = `${b}px`, C.style.visibility = "hidden", C.style.zIndex = String(v), C.style.overflow = "hidden", C.style.background = "transparent", C.style.boxShadow = "none", C.style.filter = "none", (l = m.parentElement) == null || l.insertBefore(C, m), m.style.position = "absolute", m.style.left = `${x}px`, m.style.top = `${y}px`, m.style.bottom = "auto", m.style.zIndex = String(S), m.style.pointerEvents = "none";
  }
}
function Zr(e) {
  if (!e || e === "auto") return null;
  let t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : null;
}
function Il(e, t) {
  let r = [];
  for (let n = e; n && n !== t; ) {
    let i = n.parentElement;
    if (!i) break;
    r.push(Array.prototype.indexOf.call(i.children, n)), n = i;
  }
  return r.reverse();
}
function Wl(e, t, r) {
  let n = e;
  for (let i = 0; i < t.length; i++) if (n = Hl(n, r)[t[i]], !n) return null;
  return n instanceof HTMLElement ? n : null;
}
function Hl(e, t) {
  let r = [], n = e.children;
  for (let i = 0; i < n.length; i++) {
    let o = n[i];
    o.hasAttribute(t) || r.push(o);
  }
  return r;
}
function _l(e) {
  let t = getComputedStyle(e), r = t.outlineStyle, n = t.outlineWidth, i = t.borderStyle, o = t.borderWidth, a = r !== "none" && parseFloat(n) > 0, l = i === "none" || parseFloat(o) === 0;
  a && l && (e.style.border = `${n} solid transparent`);
}
function Dl(e) {
  let t = [];
  try {
    let r = e.querySelectorAll("*");
    for (let n of r) {
      if (!(n instanceof HTMLElement)) continue;
      let i = n.style.contentVisibility || "", o = getComputedStyle(n), a = o.contentVisibility || o.getPropertyValue("content-visibility") || "";
      (a === "auto" || a === "hidden") && (t.push({ el: n, original: i }), n.style.contentVisibility = "visible");
    }
    if (e instanceof HTMLElement) {
      let n = getComputedStyle(e), i = n.contentVisibility || n.getPropertyValue("content-visibility") || "";
      (i === "auto" || i === "hidden") && (t.push({ el: e, original: e.style.contentVisibility || "" }), e.style.contentVisibility = "visible");
    }
  } catch {
  }
  return () => {
    for (let { el: r, original: n } of t) try {
      r.style.contentVisibility = n;
    } catch {
    }
  };
}
async function Ol(e, t = {}) {
  var u, f;
  let r = { styleMap: $.session.styleMap, styleCache: $.session.styleCache, nodeMap: $.session.nodeMap, options: t }, n, i = "", o = "";
  _l(e);
  let a = Dl(e);
  try {
    n = await pt(e, r, t);
  } catch (s) {
    throw console.warn("deepClone failed:", s), s;
  } finally {
    a();
  }
  try {
    Pl(n);
  } catch (s) {
    console.warn("inlineExternal defs or symbol failed:", s);
  }
  try {
    await Jt(e, n, r, t);
  } catch (s) {
    console.warn("inlinePseudoElements failed:", s);
  }
  await Za(n, r);
  try {
    let s = n.querySelectorAll("style[data-sd]");
    for (let d of s) o += d.textContent || "", d.remove();
  } catch (s) {
    G(r, "Failed to extract shadow CSS from style[data-sd]", s);
  }
  let l = sa(r.styleMap);
  i = Array.from(l.entries()).map(([s, d]) => `.${d}{${s}}`).join(""), i = o + "[data-snapdom-has-after]::after,[data-snapdom-has-before]::before{content:none!important;display:none!important}" + i;
  for (let [s, d] of r.styleMap.entries()) {
    if (s.tagName === "STYLE") continue;
    if (s.getRootNode && s.getRootNode() instanceof ShadowRoot) {
      s.setAttribute("style", d.replace(/;/g, "; "));
      continue;
    }
    let h = l.get(d);
    h && s.classList.add(h);
    let m = (u = s.style) == null ? void 0 : u.backgroundImage, g = (f = s.dataset) == null ? void 0 : f.snapdomHasIcon;
    m && m !== "none" && (s.style.backgroundImage = m), g && (s.style.verticalAlign = "middle", s.style.display = "inline");
  }
  for (let [s, d] of r.nodeMap.entries()) {
    let h = d.scrollLeft, m = d.scrollTop;
    if ((h || m) && s instanceof HTMLElement) {
      s.style.overflow = "hidden", s.style.scrollbarWidth = "none", s.style.msOverflowStyle = "none";
      try {
        let p = s.querySelectorAll("*");
        for (let b of p) {
          if (!(b instanceof HTMLElement)) continue;
          let x = b.style.position;
          if (x === "fixed" || x === "absolute") {
            let y = parseFloat(b.style.top) || 0, w = parseFloat(b.style.left) || 0;
            b.style.top = `${y + m}px`, b.style.left = `${w + h}px`, x === "fixed" && (b.style.position = "absolute");
          }
        }
      } catch {
      }
      let g = document.createElement("div");
      for (g.style.all = "unset", g.style.transform = `translate(${-h}px, ${-m}px)`, g.style.willChange = "transform", g.style.display = "inline-block", g.style.width = "100%"; s.firstChild; ) g.appendChild(s.firstChild);
      s.appendChild(g);
    }
  }
  let c = n instanceof HTMLElement && n.firstElementChild instanceof HTMLElement ? n.firstElementChild : n;
  if (Rl(e, c), e === r.nodeMap.get(n)) {
    let s = r.styleCache.get(e) || he(e);
    r.styleCache.set(e, s);
    let d = Ki(s.transform);
    n.style.margin = "0", n.style.top = "auto", n.style.left = "auto", n.style.right = "auto", n.style.bottom = "auto", n.style.animation = "none", n.style.transition = "none", n.style.willChange = "auto", n.style.float = "none", n.style.clear = "none", n.style.transform = d || "";
  }
  for (let [s, d] of r.nodeMap.entries()) d.tagName === "PRE" && (s.style.marginTop = "0", s.style.marginBlockStart = "0");
  return { clone: n, classCSS: i, styleCache: r.styleCache };
}
Be();
var eo = "http://www.w3.org/1999/xlink";
function Ul(e) {
  return e.getAttribute("href") || e.getAttribute("xlink:href") || (typeof e.getAttributeNS == "function" ? e.getAttributeNS(eo, "href") : null);
}
function zl(e) {
  var u, f, s, d;
  let t = parseInt(((u = e.dataset) == null ? void 0 : u.snapdomWidth) || "", 10) || 0, r = parseInt(((f = e.dataset) == null ? void 0 : f.snapdomHeight) || "", 10) || 0, n = parseInt(e.getAttribute("width") || "", 10) || 0, i = parseInt(e.getAttribute("height") || "", 10) || 0, o = parseFloat(((s = e.style) == null ? void 0 : s.width) || "") || 0, a = parseFloat(((d = e.style) == null ? void 0 : d.height) || "") || 0, l = t || o || n || e.width || e.naturalWidth || 100, c = r || a || i || e.height || e.naturalHeight || 100;
  return { width: l, height: c };
}
async function Bl(e, t = {}) {
  let r = Array.from(e.querySelectorAll("img")), n = async (l) => {
    if (!l.getAttribute("src")) {
      let h = l.currentSrc || l.src || "";
      h && l.setAttribute("src", h);
    }
    l.removeAttribute("srcset"), l.removeAttribute("sizes");
    let c = l.src || "";
    if (!c) return;
    let u = await pe(c, { as: "dataURL", useProxy: t.useProxy });
    if (u.ok && typeof u.data == "string" && u.data.startsWith("data:")) {
      l.src = u.data, l.width || (l.width = l.naturalWidth || 100), l.height || (l.height = l.naturalHeight || 100);
      return;
    }
    let { width: f, height: s } = zl(l), { fallbackURL: d } = t || {};
    if (d) try {
      let h = typeof d == "function" ? await d({ width: f, height: s, src: c, element: l }) : d;
      if (h) {
        let m = await pe(h, { as: "dataURL", useProxy: t.useProxy });
        if (m != null && m.ok && typeof m.data == "string") {
          l.src = m.data, l.width || (l.width = f), l.height || (l.height = s);
          return;
        }
      }
    } catch {
    }
    if (t.placeholders !== !1) {
      let h = document.createElement("div");
      h.style.cssText = [`width:${f}px`, `height:${s}px`, "background:#ccc", "display:inline-block", "text-align:center", `line-height:${s}px`, "color:#666", "font-size:12px", "overflow:hidden"].join(";"), h.textContent = "img", l.replaceWith(h);
    } else {
      let h = document.createElement("div");
      h.style.cssText = `display:inline-block;width:${f}px;height:${s}px;visibility:hidden;`, l.replaceWith(h);
    }
  }, i = 6;
  for (let l = 0; l < r.length; l += i) {
    let c = r.slice(l, l + i).map(n);
    await Promise.allSettled(c);
  }
  let o = Array.from(e.querySelectorAll("image")), a = async (l) => {
    let c = Ul(l);
    if (!c || c.startsWith("data:") || c.startsWith("blob:")) return;
    let u = await pe(c, { as: "dataURL", useProxy: t.useProxy });
    u.ok && typeof u.data == "string" && u.data.startsWith("data:") && (l.setAttribute("href", u.data), l.removeAttribute("xlink:href"), typeof l.removeAttributeNS == "function" && l.removeAttributeNS(eo, "href"));
  };
  for (let l = 0; l < o.length; l += i) {
    let c = o.slice(l, l + i).map(a);
    await Promise.allSettled(c);
  }
}
be();
async function Vl(e, t, r, n = {}) {
  let i = [[e, t]], o = ["background-image", "mask", "mask-image", "-webkit-mask", "-webkit-mask-image", "mask-source", "mask-box-image-source", "mask-border-source", "-webkit-mask-box-image-source", "border-image", "border-image-source"], a = ["mask-position", "mask-size", "mask-repeat", "mask-mode", "mask-composite", "-webkit-mask-position", "-webkit-mask-size", "-webkit-mask-repeat", "-webkit-mask-composite", "mask-origin", "mask-clip", "-webkit-mask-origin", "-webkit-mask-clip", "-webkit-mask-position-x", "-webkit-mask-position-y"], l = ["background-position", "background-position-x", "background-position-y", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-blend-mode"], c = ["border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat"];
  for (; i.length; ) {
    let [u, f] = i.shift();
    if (!f) continue;
    let s = r.get(u) || he(u);
    r.has(u) || r.set(u, s);
    let d = (() => {
      let b = s.getPropertyValue("border-image"), x = s.getPropertyValue("border-image-source");
      return b && b !== "none" || x && x !== "none";
    })(), h = s.getPropertyValue("background-image"), m = s.getPropertyValue("background-color");
    if (h && h !== "none" || m && m !== "rgba(0, 0, 0, 0)" && m !== "transparent" || /url\s*\(|gradient\s*\(/i.test(s.getPropertyValue("background") || "")) for (let b of l) {
      let x = s.getPropertyValue(b);
      x && f.style.setProperty(b, x);
    }
    for (let b of o) {
      let x = s.getPropertyValue(b);
      if (b === "background-image" && (!x || x === "none")) {
        let A = s.getPropertyValue("background");
        A && /url\s*\(/.test(A) && (x = Bt(A).filter((S) => /url\s*\(/.test(S)).join(", ") || x);
      }
      if (!x || x === "none") continue;
      let y = Bt(x), w = await Promise.all(y.map((A) => Mn(A, n)));
      w.some((A) => A && A !== "none" && !/^url\(undefined/.test(A)) && f.style.setProperty(b, w.join(", "));
    }
    for (let b of a) {
      let x = s.getPropertyValue(b);
      !x || x === "initial" || f.style.setProperty(b, x);
    }
    if (d) for (let b of c) {
      let x = s.getPropertyValue(b);
      !x || x === "initial" || f.style.setProperty(b, x);
    }
    let g = u.shadowRoot ? Array.from(u.shadowRoot.children).filter((b) => b.tagName !== "STYLE") : Array.from(u.children), p = Array.from(f.children).filter((b) => {
      var x, y;
      return !((x = b.dataset) != null && x.snapdomPseudo || b.tagName === "STYLE" && ((y = b.dataset) != null && y.sd));
    });
    for (let b = 0; b < Math.min(g.length, p.length); b++) i.push([g[b], p[b]]);
  }
}
be();
me();
function jl(e) {
  if (!e) return () => {
  };
  let t = [];
  function r(n) {
    let i = ql(n);
    i && t.push(i);
    for (let o of n.children || []) r(o);
  }
  return r(e), () => t.forEach((n) => n());
}
function ql(e) {
  if (!e) return () => {
  };
  let t = Gl(e);
  if (t <= 0) return () => {
  };
  if (!Kl(e)) return () => {
  };
  let r = getComputedStyle(e), n = Math.round(Yl(r) * t + Xl(r)), i = e.textContent ?? "", o = i;
  if (e.scrollHeight <= n + 0.5) return () => {
  };
  let a = 0, l = i.length, c = -1;
  for (; a <= l; ) {
    let u = a + l >> 1;
    e.textContent = i.slice(0, u) + "…", e.scrollHeight <= n + 0.5 ? (c = u, a = u + 1) : l = u - 1;
  }
  return e.textContent = (c >= 0 ? i.slice(0, c) : "") + "…", () => {
    e.textContent = o;
  };
}
function Gl(e) {
  let t = getComputedStyle(e), r = t.getPropertyValue("-webkit-line-clamp") || t.getPropertyValue("line-clamp");
  r = (r || "").trim();
  let n = parseInt(r, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}
function Yl(e) {
  let t = (e.lineHeight || "").trim(), r = parseFloat(e.fontSize) || 16;
  return !t || t === "normal" ? Math.round(r * 1.2) : t.endsWith("px") ? parseFloat(t) : /^\d+(\.\d+)?$/.test(t) ? Math.round(parseFloat(t) * r) : t.endsWith("%") ? Math.round(parseFloat(t) / 100 * r) : Math.round(r * 1.2);
}
function Xl(e) {
  return (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0);
}
function Kl(e) {
  return e.childElementCount > 0 ? !1 : Array.from(e.childNodes).some((t) => t.nodeType === Node.TEXT_NODE);
}
var et = [];
function pr(e) {
  if (!e) return null;
  if (Array.isArray(e)) {
    let [t, r] = e;
    return typeof t == "function" ? t(r) : t;
  }
  if (typeof e == "object" && "plugin" in e) {
    let { plugin: t, options: r } = e;
    return typeof t == "function" ? t(r) : t;
  }
  return typeof e == "function" ? e() : e;
}
function Ql(...e) {
  let t = e.flat();
  for (let r of t) {
    let n = pr(r);
    n && (et.some((i) => i && i.name && n.name && i.name === n.name) || et.push(n));
  }
}
function to(e) {
  return e && Array.isArray(e.plugins) ? e.plugins : et;
}
async function Se(e, t, r) {
  let n = r, i = to(t);
  for (let o of i) {
    let a = o && typeof o[e] == "function" ? o[e] : null;
    if (!a) continue;
    let l = await a(t, n);
    typeof l < "u" && (n = l);
  }
  return n;
}
async function Jl(e, t, r) {
  let n = [], i = to(t);
  for (let o of i) {
    let a = o && typeof o[e] == "function" ? o[e] : null;
    if (!a) continue;
    let l = await a(t, r);
    typeof l < "u" && n.push(l);
  }
  return n;
}
function Zl(e) {
  let t = [];
  if (Array.isArray(e)) for (let r of e) {
    let n = pr(r);
    if (!n || !n.name) continue;
    let i = t.findIndex((o) => o && o.name === n.name);
    i >= 0 && t.splice(i, 1), t.push(n);
  }
  for (let r of et) r && r.name && !t.some((n) => n.name === r.name) && t.push(r);
  return Object.freeze(t);
}
function es(e, t, r = !1) {
  return !e || e.plugins && !r || (e.plugins = Zl(t)), e;
}
function ts() {
  return et.slice();
}
function $e(e) {
  return !!(!e || e.startsWith("data:") || e.startsWith("blob:") || /^data:image\/(gif|png|svg)/.test(e) && e.length < 200);
}
function rs(e, t) {
  return !e || !(e instanceof Element) ? !1 : e.querySelector("picture") ? !0 : t ? !!e.querySelector("img[data-src], img[data-lazy-src], img[data-original], img[data-hi-res-src], img[data-srcset], img[data-lazy-srcset]") : !1;
}
function ns(e, t) {
  let r = e.currentSrc || "";
  if (r && !$e(r)) return r;
  let n = t.querySelectorAll("source[srcset]"), i = null;
  for (let o of n) {
    let a = o.getAttribute("srcset");
    if (!a || $e(a)) continue;
    let l = o.getAttribute("media");
    if (l) try {
      if (window.matchMedia(l).matches) return a.split(",")[0].trim().split(/\s+/)[0];
    } catch {
    }
    i || (i = a.split(",")[0].trim().split(/\s+/)[0]);
  }
  return i;
}
function os(e) {
  let t = [e.getAttribute("data-src"), e.getAttribute("data-lazy-src"), e.getAttribute("data-original"), e.getAttribute("data-hi-res-src")];
  for (let n of t) if (n && !$e(n)) return n;
  let r = e.getAttribute("data-srcset") || e.getAttribute("data-lazy-srcset");
  if (r) {
    let n = r.split(",")[0].trim().split(/\s+/)[0];
    if (n && !$e(n)) return n;
  }
  return null;
}
function is(e = {}) {
  let t = e.pictureResolver && typeof e.pictureResolver == "object" ? e.pictureResolver : {};
  return { timeout: t.timeout ?? 5e3, concurrency: t.concurrency ?? 4, resolveLazySrc: t.resolveLazySrc !== !1, silent: t.silent ?? !1, useProxy: typeof e.useProxy == "string" ? e.useProxy : "" };
}
async function as(e, t = {}) {
  if (!e || !(e instanceof Element) || t.resolvePicturePlaceholders === !1) return null;
  let { timeout: r, concurrency: n, resolveLazySrc: i, silent: o, useProxy: a } = is(t);
  if (!rs(e, i)) return null;
  let l = [], c = [];
  async function u(d) {
    let h = new AbortController(), m = setTimeout(() => h.abort(), r);
    try {
      let g = await fetch(d, { credentials: "include", signal: h.signal });
      if (!g.ok && a) {
        let b = a.includes("{url}") ? a.replace("{url}", encodeURIComponent(d)) : a.endsWith("?") ? `${a}${encodeURIComponent(d)}` : `${a}${a.includes("?") ? "&" : "?"}url=${encodeURIComponent(d)}`;
        g = await fetch(b, { signal: h.signal });
      }
      if (!g.ok) return null;
      let p = await g.blob();
      return await new Promise((b, x) => {
        let y = new FileReader();
        y.onload = () => b(y.result), y.onerror = x, y.readAsDataURL(p);
      });
    } catch {
      return null;
    } finally {
      clearTimeout(m);
    }
  }
  async function f(d) {
    for (let h = 0; h < d.length; h += n) {
      let m = d.slice(h, h + n);
      await Promise.allSettled(m.map((g) => g()));
    }
  }
  let s = e.querySelectorAll("picture");
  for (let d of s) {
    let h = d.querySelector("img");
    if (!h) continue;
    let m = h.getAttribute("src") || "";
    if (!$e(m)) continue;
    let g = ns(h, d);
    g && c.push(async () => {
      let p = await u(g);
      if (!p) {
        o || console.warn(`[snapdom:picture-resolver] Failed to fetch: ${g.slice(0, 60)}`);
        return;
      }
      let b = h.getAttribute("src"), x = h.getAttribute("srcset"), y = h.getAttribute("sizes"), w = [];
      h.src = p, h.setAttribute("src", p), h.removeAttribute("srcset"), h.removeAttribute("sizes");
      let A = d.querySelectorAll("source");
      for (let S of A) w.push({ el: S, parent: S.parentElement, next: S.nextSibling }), S.remove();
      l.push(() => {
        b !== null ? h.setAttribute("src", b) : h.removeAttribute("src"), x !== null && h.setAttribute("srcset", x), y !== null && h.setAttribute("sizes", y);
        for (let { el: S, parent: v, next: C } of w) v && v.insertBefore(S, C);
      });
    });
  }
  if (i) {
    let d = e.querySelectorAll("img");
    for (let h of d) {
      if (h.closest("picture") && $e(h.getAttribute("src") || "")) continue;
      let m = h.getAttribute("src") || "", g = os(h);
      g && $e(m) && c.push(async () => {
        let p = await u(g);
        if (!p) return;
        let b = h.getAttribute("src");
        h.src = p, h.setAttribute("src", p), h.removeAttribute("srcset"), h.removeAttribute("sizes"), l.push(() => {
          b !== null ? h.setAttribute("src", b) : h.removeAttribute("src");
        });
      });
    }
  }
  return c.length === 0 ? null : (await f(c), async function() {
    for (let d of l) try {
      d();
    } catch {
    }
  });
}
be();
function ls(e, t, r = {}) {
  if (!e || !t || !t.style) return;
  let n = getComputedStyle(e);
  try {
    t.style.boxShadow = "none";
  } catch (o) {
    G(r, "stripRootShadows boxShadow", o);
  }
  try {
    t.style.textShadow = "none";
  } catch (o) {
    G(r, "stripRootShadows textShadow", o);
  }
  try {
    t.style.outline = "none";
  } catch (o) {
    G(r, "stripRootShadows outline", o);
  }
  let i = (n.filter || "").replace(/\bblur\([^()]*\)\s*/gi, "").replace(/\bdrop-shadow\([^()]*\)\s*/gi, "").trim().replace(/\s+/g, " ");
  try {
    t.style.filter = i.length ? i : "none";
  } catch (o) {
    G(r, "stripRootShadows filter", o);
  }
}
function en(e) {
  let t = e.display || "";
  if (t.includes("flex") || t.includes("grid") || t.startsWith("table") || t === "inline-block" || t === "flow-root" || e.position === "absolute" || e.position === "fixed" || e.float && e.float !== "none") return !0;
  let r = e.overflowX || e.overflow || "visible", n = e.overflowY || e.overflow || "visible";
  return !!(r !== "visible" || n !== "visible" || e.contain && /\b(layout|content|paint|strict)\b/.test(e.contain));
}
function ss(e, t) {
  let r = Array.from(e.childNodes), n = t === "top" ? r : r.reverse();
  for (let i of n) {
    if (i.nodeType === Node.TEXT_NODE) {
      if (/\S/.test(i.textContent || "")) return null;
      continue;
    }
    if (i.nodeType !== Node.ELEMENT_NODE) continue;
    let o = getComputedStyle(i), a = String(o.display || "");
    if (!(a === "none" || a === "contents") && !(o.position === "absolute" || o.position === "fixed")) return o.float && o.float !== "none" || a.startsWith("inline") ? null : i;
  }
  return null;
}
function cs(e, t) {
  if (!e || !t || !t.style) return;
  let r = getComputedStyle(e);
  if (!en(r)) for (let n of ["top", "bottom"]) {
    let i = n === "top" ? "Top" : "Bottom";
    if ((parseFloat(r[`border${i}Width`]) || 0) > 0 || (parseFloat(r[`padding${i}`]) || 0) > 0) continue;
    let o = e, a = t;
    for (; o && a; ) {
      let l = ss(o, n);
      if (!l) break;
      let c = Array.from(o.children).indexOf(l), u = c >= 0 ? a.children[c] : null, f = getComputedStyle(l), s = parseFloat(f[`margin${i}`]) || 0;
      if (u && u.style && s > 0 && (u.style[`margin${i}`] = "0px"), en(f) || (parseFloat(f[`border${i}Width`]) || 0) > 0 || (parseFloat(f[`padding${i}`]) || 0) > 0) break;
      o = l, a = u;
    }
  }
}
function us(e) {
  let t = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT), r = [];
  for (; t.nextNode(); ) r.push(t.currentNode);
  for (let n of r) n.remove();
}
function ds(e, t = {}) {
  let { stripFrameworkDirectives: r = !0 } = t, n = /* @__PURE__ */ new Set(["xml", "xlink"]), i = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
  for (; i.nextNode(); ) {
    let o = i.currentNode;
    for (let a of Array.from(o.attributes)) {
      let l = a.name;
      if (l.includes("@")) {
        o.removeAttribute(l);
        continue;
      }
      if (l.includes(":")) {
        let c = l.split(":", 1)[0];
        if (!n.has(c)) {
          o.removeAttribute(l);
          continue;
        }
      }
      if (r && (l.startsWith("x-") || l.startsWith("v-") || l.startsWith(":") || l.startsWith("on:") || l.startsWith("bind:") || l.startsWith("let:") || l.startsWith("class:"))) {
        o.removeAttribute(l);
        continue;
      }
    }
  }
}
var tn = /[\x00-\x08\x0B\x0C\x0E-\x1F￾￿]/g;
function fs(e) {
  if (!e) return;
  let t = (i) => {
    if (i.nodeType === Node.ELEMENT_NODE) {
      if (i.attributes) for (let o of Array.from(i.attributes)) {
        let a = o.value.replace(tn, "");
        if (a !== o.value) try {
          i.setAttribute(o.name, a);
        } catch {
        }
      }
    } else if (i.nodeType === Node.TEXT_NODE || i.nodeType === Node.CDATA_SECTION_NODE) {
      let o = i.data.replace(tn, "");
      o !== i.data && (i.data = o);
    }
  };
  t(e);
  let r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT), n;
  for (; n = r.nextNode(); ) t(n);
}
function hs(e, t = {}) {
  e && (ds(e, t), us(e), fs(e));
}
function ms(e) {
  var t;
  try {
    let r = ((t = e.getAttribute) == null ? void 0 : t.call(e, "style")) || "";
    return /\b(height|width|block-size|inline-size)\s*:/.test(r);
  } catch {
    return !1;
  }
}
function gs(e) {
  return e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof HTMLVideoElement || e instanceof HTMLIFrameElement || e instanceof SVGElement || e instanceof HTMLObjectElement || e instanceof HTMLEmbedElement;
}
function ps(e, t) {
  if (!(e instanceof Element) || ms(e) || gs(e)) return !1;
  let r = t.position;
  if (r === "absolute" || r === "fixed" || r === "sticky") return !1;
  let n = t.display || "";
  return !(n.includes("flex") || n.includes("grid") || n.startsWith("table") || t.transform && t.transform !== "none");
}
function ys(e, t, r = /* @__PURE__ */ new Map()) {
  function n(i, o) {
    if (!(i instanceof Element) || !(o instanceof Element)) return;
    let a = i.childElementCount > o.childElementCount, l = r.get(i) || getComputedStyle(i);
    if (r.has(i) || r.set(i, l), a && ps(i, l)) {
      o.style.height || (o.style.height = "auto"), o.style.width || (o.style.width = "auto"), o.style.removeProperty("block-size"), o.style.removeProperty("inline-size"), o.style.minHeight || (o.style.minHeight = "0"), o.style.minWidth || (o.style.minWidth = "0"), o.style.maxHeight || (o.style.maxHeight = "none"), o.style.maxWidth || (o.style.maxWidth = "none");
      let f = l.overflowY || l.overflowBlock || "visible", s = l.overflowX || l.overflowInline || "visible";
      (f !== "visible" || s !== "visible") && (o.style.overflow = "visible");
    }
    let c = Array.from(i.children), u = Array.from(o.children);
    for (let f = 0; f < Math.min(c.length, u.length); f++) n(c[f], u[f]);
  }
  n(e, t);
}
function bs(e) {
  let t = getComputedStyle(e);
  return !(t.display === "none" || t.position === "absolute" || t.position === "fixed");
}
function ws(e, t) {
  if (!(e instanceof Element)) return !1;
  if (e.getAttribute("data-capture") === "exclude" && (t == null ? void 0 : t.excludeMode) === "remove") return !0;
  if (Array.isArray(t == null ? void 0 : t.exclude)) for (let r of t.exclude) try {
    if (e.matches(r)) return t.excludeMode === "remove";
  } catch (n) {
    G(t, "exclude selector match failed", n);
  }
  return !1;
}
function xs(e, t) {
  let r = getComputedStyle(e), n = e.getBoundingClientRect(), i = 1 / 0, o = -1 / 0, a = !1, l = Array.from(e.children);
  for (let h of l) {
    if (ws(h, t) || !bs(h)) continue;
    let m = h.getBoundingClientRect(), g = m.top - n.top, p = m.bottom - n.top;
    p <= g || (g < i && (i = g), p > o && (o = p), a = !0);
  }
  let c = a ? Math.max(0, o - i) : 0, u = parseFloat(r.borderTopWidth) || 0, f = parseFloat(r.borderBottomWidth) || 0, s = parseFloat(r.paddingTop) || 0, d = parseFloat(r.paddingBottom) || 0;
  return u + f + s + d + c;
}
var R = (e, t = 3) => Number.isFinite(e) ? Math.round(e * 10 ** t) / 10 ** t : e, Ss = /::-webkit-scrollbar(-[a-z]+)?\b/i;
function Zt(e, t = /* @__PURE__ */ new Set()) {
  let r = "";
  if (!e) return r;
  for (let n = 0; n < e.length; n++) {
    let i = e[n];
    try {
      if (i.type === CSSRule.IMPORT_RULE && i.styleSheet) {
        r += Zt(i.styleSheet.cssRules, t);
        continue;
      }
      if (i.type === CSSRule.MEDIA_RULE && i.cssRules) {
        let o = Zt(i.cssRules, t);
        o && (r += `@media ${i.conditionText}{${o}}`);
        continue;
      }
      if (i.type === CSSRule.STYLE_RULE) {
        let o = i.selectorText || "";
        if (Ss.test(o)) {
          let a = i.cssText;
          a && !t.has(a) && (t.add(a), r += a);
        }
      }
    } catch {
    }
  }
  return r;
}
function vs(e) {
  if (!e || !e.styleSheets) return "";
  let t = /* @__PURE__ */ new Set(), r = "";
  for (let n of Array.from(e.styleSheets)) try {
    let i = n.cssRules;
    i && (r += Zt(i, t));
  } catch {
  }
  return r;
}
fr();
function Cs(e) {
  var u;
  let t = e.boxShadow || "";
  if (!t || t === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
  let r = [], n = "", i = 0;
  for (let f = 0; f < t.length; f++) {
    let s = t[f];
    s === "(" ? i++ : s === ")" && (i = Math.max(0, i - 1)), s === "," && i === 0 ? (r.push(n), n = "") : n += s;
  }
  n.trim() && r.push(n);
  let o = 0, a = 0, l = 0, c = 0;
  for (let f of r) {
    if (/\binset\b/i.test(f)) continue;
    let s = ((u = f.match(/-?\d+(\.\d+)?px/g)) == null ? void 0 : u.map((x) => parseFloat(x))) || [];
    if (s.length < 2) continue;
    let [d, h, m = 0, g = 0] = s, p = Math.abs(d) + m + g, b = Math.abs(h) + m + g;
    a = Math.max(a, p + Math.max(d, 0)), c = Math.max(c, p + Math.max(-d, 0)), l = Math.max(l, b + Math.max(h, 0)), o = Math.max(o, b + Math.max(-h, 0));
  }
  return { top: Math.ceil(o), right: Math.ceil(a), bottom: Math.ceil(l), left: Math.ceil(c) };
}
function As(e) {
  let t = e.filter && e.filter !== "none" ? e.filter : e.webkitFilter || "", r = /blur\(\s*([0-9.]+)px\s*\)/gi, n = 0, i;
  for (; i = r.exec(t); ) n += parseFloat(i[1]) || 0;
  let o = Math.ceil(n);
  return { top: o, right: o, bottom: o, left: o };
}
function ks(e) {
  if ((e.outlineStyle || "none") === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
  let t = Math.ceil(parseFloat(e.outlineWidth || "0") || 0), r = parseFloat(e.outlineOffset || "0") || 0, n = t + Math.max(0, Math.ceil(r));
  return { top: n, right: n, bottom: n, left: n };
}
function Ms(e) {
  var c;
  let t = `${e.filter || ""} ${e.webkitFilter || ""}`.trim();
  if (!t || t === "none") return { bleed: { top: 0, right: 0, bottom: 0, left: 0 }, has: !1 };
  let r = t.match(/drop-shadow\((?:[^()]|\([^()]*\))*\)/gi) || [], n = 0, i = 0, o = 0, a = 0, l = !1;
  for (let u of r) {
    l = !0;
    let f = ((c = u.match(/-?\d+(?:\.\d+)?px/gi)) == null ? void 0 : c.map((p) => parseFloat(p))) || [], [s = 0, d = 0, h = 0] = f, m = Math.abs(s) + h, g = Math.abs(d) + h;
    i = Math.max(i, m + Math.max(s, 0)), a = Math.max(a, m + Math.max(-s, 0)), o = Math.max(o, g + Math.max(d, 0)), n = Math.max(n, g + Math.max(-d, 0));
  }
  return { bleed: { top: R(n), right: R(i), bottom: R(o), left: R(a) }, has: l };
}
function Es(e, t) {
  if (!e || !t || !t.style) return null;
  let r = getComputedStyle(e);
  try {
    t.style.transformOrigin = "0 0";
  } catch {
  }
  try {
    "translate" in t.style && (t.style.translate = "none"), "rotate" in t.style && (t.style.rotate = "none");
  } catch {
  }
  let n = r.transform || "none";
  if (n === "none") {
    let l = null;
    try {
      l = ro(e).scale;
    } catch {
    }
    try {
      t.style.transform = "none";
    } catch {
    }
    if (!l) return { a: 1, b: 0, c: 0, d: 1 };
    let c = l.trim().split(/\s+/).map(parseFloat), u = Number.isFinite(c[0]) ? c[0] : 1, f = Number.isFinite(c[1]) ? c[1] : u;
    return { a: u, b: 0, c: 0, d: f };
  }
  function i(l, c, u, f) {
    let s = Math.sqrt(l * l + c * c) || 0, d = 0, h = 0;
    if (s > 0) {
      let m = l / s, g = c / s;
      d = m * u + g * f;
      let p = u - m * d, b = f - g * d;
      h = Math.sqrt(p * p + b * b) || 0, h > 0 ? d = d / h : d = 0;
    }
    return { a: s, b: 0, c: d * h, d: h };
  }
  let o = n.match(/^matrix\(\s*([^)]+)\)$/i);
  if (o) {
    let l = o[1].split(",").map((c) => parseFloat(c.trim()));
    if (l.length === 6 && l.every(Number.isFinite)) {
      let [c, u, f, s] = l, d = i(c, u, f, s);
      try {
        t.style.transform = `matrix(${d.a}, ${d.b}, ${d.c}, ${d.d}, 0, 0)`;
      } catch {
      }
      return d;
    }
  }
  let a = n.match(/^matrix3d\(\s*([^)]+)\)$/i);
  if (a) {
    let l = a[1].split(",").map((c) => parseFloat(c.trim()));
    if (l.length === 16 && l.every(Number.isFinite)) {
      let c = l[0], u = l[1], f = l[4], s = l[5], d = i(c, u, f, s);
      try {
        t.style.transform = `matrix(${d.a}, ${d.b}, ${d.c}, ${d.d}, 0, 0)`;
      } catch {
      }
      return d;
    }
  }
  try {
    let l = new DOMMatrix(n), c = i(l.a, l.b, l.c, l.d);
    try {
      t.style.transform = `matrix(${c.a}, ${c.b}, ${c.c}, ${c.d}, 0, 0)`;
    } catch {
    }
    return c;
  } catch {
    return null;
  }
}
function rn(e, t, r, n, i) {
  let o = r.a, a = r.b, l = r.c, c = r.d, u = r.e || 0, f = r.f || 0;
  function s(b, x) {
    let y = b - n, w = x - i, A = o * y + l * w, S = a * y + c * w;
    return A += n + u, S += i + f, [A, S];
  }
  let d = [s(0, 0), s(e, 0), s(0, t), s(e, t)], h = 1 / 0, m = 1 / 0, g = -1 / 0, p = -1 / 0;
  for (let [b, x] of d) b < h && (h = b), x < m && (m = x), b > g && (g = b), x > p && (p = x);
  return { minX: h, minY: m, maxX: g, maxY: p, width: g - h, height: p - m };
}
function $s(e, t, r) {
  let n = (e.transformOrigin || "0 0").trim().split(/\s+/), [i, o] = [n[0] || "0", n[1] || "0"], a = (l, c) => {
    let u = l.toLowerCase();
    return u === "left" || u === "top" ? 0 : u === "center" ? c / 2 : u === "right" || u === "bottom" ? c : u.endsWith("px") ? parseFloat(u) || 0 : u.endsWith("%") ? (parseFloat(u) || 0) * c / 100 : /^-?\d+(\.\d+)?$/.test(u) && parseFloat(u) || 0;
  };
  return { ox: a(i, t), oy: a(o, r) };
}
function ro(e) {
  var i, o, a, l, c, u, f, s;
  let t = { rotate: "0deg", scale: null, translate: null }, r = typeof e.computedStyleMap == "function" ? e.computedStyleMap() : null;
  if (r) {
    let d = (p) => {
      try {
        return typeof r.has == "function" && !r.has(p) || typeof r.get != "function" ? null : r.get(p);
      } catch {
        return null;
      }
    }, h = d("rotate");
    if (h) if (h.angle) {
      let p = h.angle;
      t.rotate = p.unit === "rad" ? p.value * 180 / Math.PI + "deg" : p.value + p.unit;
    } else h.unit ? t.rotate = h.unit === "rad" ? h.value * 180 / Math.PI + "deg" : h.value + h.unit : t.rotate = String(h);
    else {
      let p = getComputedStyle(e);
      t.rotate = p.rotate && p.rotate !== "none" ? p.rotate : "0deg";
    }
    let m = d("scale");
    if (m) {
      let p = "x" in m && ((i = m.x) == null ? void 0 : i.value) != null ? m.x.value : Array.isArray(m) ? (o = m[0]) == null ? void 0 : o.value : Number(m) || 1, b = "y" in m && ((a = m.y) == null ? void 0 : a.value) != null ? m.y.value : Array.isArray(m) ? (l = m[1]) == null ? void 0 : l.value : p;
      t.scale = `${p} ${b}`;
    } else {
      let p = getComputedStyle(e);
      t.scale = p.scale && p.scale !== "none" ? p.scale : null;
    }
    let g = d("translate");
    if (g) {
      let p = "x" in g && "value" in g.x ? g.x.value : Array.isArray(g) ? (c = g[0]) == null ? void 0 : c.value : 0, b = "y" in g && "value" in g.y ? g.y.value : Array.isArray(g) ? (u = g[1]) == null ? void 0 : u.value : 0, x = "x" in g && ((f = g.x) != null && f.unit) ? g.x.unit : "px", y = "y" in g && ((s = g.y) != null && s.unit) ? g.y.unit : "px";
      t.translate = `${p}${x} ${b}${y}`;
    } else {
      let p = getComputedStyle(e);
      t.translate = p.translate && p.translate !== "none" ? p.translate : null;
    }
    return t;
  }
  let n = getComputedStyle(e);
  return t.rotate = n.rotate && n.rotate !== "none" ? n.rotate : "0deg", t.scale = n.scale && n.scale !== "none" ? n.scale : null, t.translate = n.translate && n.translate !== "none" ? n.translate : null, t;
}
var Ht = null;
function Ts() {
  if (Ht) return Ht;
  let e = document.createElement("div");
  return e.id = "snapdom-measure-slot", e.setAttribute("aria-hidden", "true"), Object.assign(e.style, { position: "absolute", left: "-99999px", top: "0px", width: "0px", height: "0px", overflow: "hidden", opacity: "0", pointerEvents: "none", contain: "size layout style" }), document.documentElement.appendChild(e), Ht = e, e;
}
function Fs(e) {
  let t = Ts(), r = document.createElement("div");
  r.style.transformOrigin = "0 0", e.baseTransform && (r.style.transform = e.baseTransform), e.rotate && (r.style.rotate = e.rotate), e.scale && (r.style.scale = e.scale), e.translate && (r.style.translate = e.translate), t.appendChild(r);
  let n = Ns(r);
  return t.removeChild(r), n;
}
function Ls(e) {
  let t = he(e), r = t.transform || "none";
  if (r !== "none" && !/^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/i.test(r)) return !0;
  let n = t.rotate && t.rotate !== "none" && t.rotate !== "0deg", i = t.scale && t.scale !== "none" && t.scale !== "1", o = t.translate && t.translate !== "none" && t.translate !== "0px 0px";
  return !!(n || i || o);
}
function Ns(e) {
  let t = getComputedStyle(e).transform;
  if (!t || t === "none") return new DOMMatrix();
  try {
    return new DOMMatrix(t);
  } catch {
    return new WebKitCSSMatrix(t);
  }
}
function Ps(e) {
  var t;
  if (Array.isArray(e.plugins)) {
    for (let r of e.plugins) if (((t = pr(r)) == null ? void 0 : t.name) === "picture-resolver") return !0;
  }
  return ts().some((r) => (r == null ? void 0 : r.name) === "picture-resolver");
}
async function no(e, t) {
  var w, A;
  if (!e) throw new Error("Element cannot be null or undefined");
  Xi(t.cache);
  let r = t.fast, n = t.outerTransforms !== !1, i = !!t.outerShadows, o = { element: e, options: t, plugins: t.plugins }, a, l, c, u = "", f = "", s, d, h = null;
  await Se("beforeSnap", o);
  let m = null;
  t.resolvePicturePlaceholders !== !1 && !Ps(t) && (m = await as(o.element, o.options)), await Se("beforeClone", o);
  let g = jl(o.element);
  try {
    ({ clone: a, classCSS: l, styleCache: c } = await Ol(o.element, o.options)), !n && a && (h = Es(o.element, a)), !i && a && ls(o.element, a, o.options), a && cs(o.element, a);
  } finally {
    g();
  }
  if (o = { clone: a, classCSS: l, styleCache: c, ...o }, await Se("afterClone", o), m && await m(), hs(o.clone), ((w = o.options) == null ? void 0 : w.excludeMode) === "remove") try {
    ys(o.element, o.clone, o.styleCache);
  } catch (S) {
    console.warn("[snapdom] shrink pass failed:", S);
  }
  try {
    await cl(o.clone, o.element);
  } catch {
  }
  await new Promise((S) => {
    De(async () => {
      await Bl(o.clone, o.options), S();
    }, { fast: r });
  }), await new Promise((S) => {
    De(async () => {
      await Vl(o.element, o.clone, o.styleCache, o.options), S();
    }, { fast: r });
  }), t.embedFonts && await new Promise((S) => {
    De(async () => {
      let v = Qn(o.element), C = Ml(o.element);
      if (ve()) {
        let M = new Set(Array.from(v).map((k) => String(k).split("__")[0]).filter(Boolean));
        await Jn(M, 1);
      }
      u = await kl({ required: v, usedCodepoints: C, exclude: o.options.excludeFonts, localFonts: o.options.localFonts, useProxy: o.options.useProxy, fontStylesheetDomains: o.options.fontStylesheetDomains }), S();
    }, { fast: r });
  });
  let p = aa(o.clone).sort(), b = p.join(",");
  $.baseStyle.has(b) ? f = $.baseStyle.get(b) : await new Promise((S) => {
    De(() => {
      f = la(p), $.baseStyle.set(b, f), S();
    }, { fast: r });
  });
  let x = vs(((A = o.element) == null ? void 0 : A.ownerDocument) || document);
  o = { fontsCSS: u, baseCSS: f, scrollbarCSS: x, ...o }, await Se("beforeRender", o), await new Promise((S) => {
    De(() => {
      var je, Ie, it, at, lt, $t;
      let v = he(o.element), C = o.element.getBoundingClientRect(), M = Math.max(1, R(o.element.offsetWidth || parseFloat(v.width) || C.width || 1)), k = Math.max(1, R(o.element.offsetHeight || parseFloat(v.height) || C.height || 1)), H = o.element.ownerDocument || document;
      if (o.element === H.body || o.element === H.documentElement) {
        let te = Math.max(o.element.scrollHeight || 0, ((je = H.documentElement) == null ? void 0 : je.scrollHeight) || 0, ((Ie = H.body) == null ? void 0 : Ie.scrollHeight) || 0), ne = Math.max(o.element.scrollWidth || 0, ((it = H.documentElement) == null ? void 0 : it.scrollWidth) || 0, ((at = H.body) == null ? void 0 : at.scrollWidth) || 0);
        te > 0 && (k = Math.max(k, R(te))), ne > 0 && (M = Math.max(M, R(ne)));
        try {
          let ue = (o.scrollbarCSS || "").length + (o.baseCSS || "").length + (o.fontsCSS || "").length + (o.classCSS || "").length, ae = $.measureHints.get(o.element);
          if (ae && ae.cssLen === ue && ae.w0 === M) ae.csh > 0 && (k = Math.max(k, R(ae.csh))), ae.csw > 0 && (M = Math.max(M, R(ae.csw)));
          else {
            let le = H.createElement("div");
            le.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:" + M + "px!important;overflow:visible!important;visibility:hidden!important;";
            let ke = H.createElement("style");
            ke.textContent = (o.scrollbarCSS || "") + o.baseCSS + o.fontsCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + o.classCSS, le.appendChild(ke), le.appendChild(o.clone.cloneNode(!0)), H.body.appendChild(le);
            let de = le.scrollHeight, Tt = le.scrollWidth;
            H.body.removeChild(le), $.measureHints.set(o.element, { cssLen: ue, w0: M, csh: de, csw: Tt }), de > 0 && (k = Math.max(k, R(de))), Tt > 0 && (M = Math.max(M, R(Tt)));
          }
        } catch {
        }
      }
      if (((lt = o.options) == null ? void 0 : lt.excludeMode) === "remove") {
        let te = xs(o.element, o.options);
        Number.isFinite(te) && te > 0 && (k = Math.max(1, Math.min(k, R(te + 1))));
      }
      let q = (te, ne = NaN) => {
        let ue = typeof te == "string" ? parseFloat(te) : te;
        return Number.isFinite(ue) ? ue : ne;
      }, U = q(o.options.width), L = q(o.options.height), B = M, _ = k, K = Number.isFinite(U), re = Number.isFinite(L), T = k > 0 ? M / k : 1;
      K && re ? (B = Math.max(1, R(U)), _ = Math.max(1, R(L))) : K ? (B = Math.max(1, R(U)), _ = Math.max(1, R(B / (T || 1)))) : re ? (_ = Math.max(1, R(L)), B = Math.max(1, R(_ * (T || 1)))) : (B = M, _ = k);
      let E = 0, F = 0, P = M, N = k;
      if (!n && h && Number.isFinite(h.a)) {
        let te = { a: h.a, b: h.b || 0, c: h.c || 0, d: h.d || 1, e: 0, f: 0 }, ne = rn(M, k, te, 0, 0);
        E = R(ne.minX), F = R(ne.minY), P = R(ne.maxX), N = R(ne.maxY);
      } else if (n && nn(o.element)) {
        let te = v.transform && v.transform !== "none" ? v.transform : "", ne = ro(o.element), ue = Fs({ baseTransform: te, rotate: ne.rotate || "0deg", scale: ne.scale, translate: ne.translate }), { ox: ae, oy: le } = $s(v, M, k), ke = ue.is2D ? ue : new DOMMatrix(ue.toString()), de = rn(M, k, ke, ae, le);
        E = R(de.minX), F = R(de.minY), P = R(de.maxX), N = R(de.maxY);
      }
      let I = Cs(v), O = As(v), j = ks(v), Q = Ms(v), J = i ? { top: R(I.top + O.top + j.top + Q.bleed.top), right: R(I.right + O.right + j.right + Q.bleed.right), bottom: R(I.bottom + O.bottom + j.bottom + Q.bleed.bottom), left: R(I.left + O.left + j.left + Q.bleed.left) } : { top: 0, right: 0, bottom: 0, left: 0 };
      E = R(E - J.left), F = R(F - J.top), P = R(P + J.right), N = R(N + J.bottom);
      let ee = Math.max(1, R(P - E)), V = Math.max(1, R(N - F)), Y = K || re ? R(B / M) : 1, z = re || K ? R(_ / k) : 1, oe = Math.max(1, R(ee * Y)), ge = Math.max(1, R(V * z)), Fe = "http://www.w3.org/2000/svg", ie = ve() && nn(o.element) ? 1 : 0, ye = R(ie + (n ? 0 : 1)), ce = document.createElementNS(Fe, "foreignObject"), Mt = R(E), Le = R(F);
      ce.setAttribute("x", String(R(-(Mt - ye)))), ce.setAttribute("y", String(R(-(Le - ye)))), ce.setAttribute("width", String(R(M + ye * 2))), ce.setAttribute("height", String(R(k + ye * 2))), ce.style.overflow = "visible";
      let Ne = document.createElement("style"), Et = "svg{overflow:visible;} foreignObject{overflow:visible;} foreignObject>div{-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important;}";
      Ne.textContent = (o.scrollbarCSS || "") + o.baseCSS + o.fontsCSS + Et + o.classCSS, ce.appendChild(Ne);
      let Pe = document.createElement("div");
      Pe.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), Pe.style.cssText = `all:initial;box-sizing:border-box;display:block;overflow:visible;width:${R(M)}px;height:${R(k)}px`, Pe.appendChild(o.clone), ce.appendChild(Pe);
      let yr = new XMLSerializer().serializeToString(ce), Ce = R(ee + ye * 2), Re = R(V + ye * 2), ot = K || re;
      t.meta = { w0: M, h0: k, vbW: Ce, vbH: Re, targetW: B, targetH: _ };
      let Ae = ve() && ot ? Ce : R(oe + ye * 2), Z = ve() && ot ? Re : R(ge + ye * 2), Ve = parseFloat(($t = he(H.documentElement)) == null ? void 0 : $t.fontSize) || 16;
      d = `<svg xmlns="${Fe}" width="${Ae}" height="${Z}" viewBox="0 0 ${Ce} ${Re}" font-size="${Ve}px">` + yr + "</svg>", s = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(d)}`, o = { svgString: d, dataURL: s, ...o }, S();
    }, { fast: r });
  }), await Se("afterRender", o);
  let y = document.getElementById("snapdom-sandbox");
  return y && y.style.position === "absolute" && y.remove(), o.dataURL;
}
function nn(e) {
  return Ls(e);
}
me();
function Rs(e = {}) {
  let t = e.format ?? "png";
  t === "jpg" && (t = "jpeg");
  let r = Yi(e.cache);
  return { debug: e.debug ?? !1, fast: e.fast ?? !0, scale: e.scale ?? 1, exclude: e.exclude ?? [], excludeMode: e.excludeMode ?? "hide", filter: e.filter ?? null, filterMode: e.filterMode ?? "hide", placeholders: e.placeholders !== !1, embedFonts: e.embedFonts ?? !1, iconFonts: Array.isArray(e.iconFonts) ? e.iconFonts : e.iconFonts ? [e.iconFonts] : [], localFonts: Array.isArray(e.localFonts) ? e.localFonts : [], excludeFonts: e.excludeFonts ?? void 0, fontStylesheetDomains: Array.isArray(e.fontStylesheetDomains) ? e.fontStylesheetDomains : [], fallbackURL: e.fallbackURL ?? void 0, cache: r, useProxy: typeof e.useProxy == "string" ? e.useProxy : "", width: e.width ?? null, height: e.height ?? null, format: t, type: e.type ?? "svg", quality: e.quality ?? 0.92, dpr: e.dpr ?? (window.devicePixelRatio || 1), backgroundColor: e.backgroundColor ?? (["jpeg", "webp"].includes(t) ? "#ffffff" : null), filename: e.filename ?? "snapDOM", outerTransforms: e.outerTransforms ?? !0, outerShadows: e.outerShadows ?? !1, safariWarmupAttempts: Math.min(3, Math.max(1, (e.safariWarmupAttempts ?? 3) | 0)), excludeStyleProps: e.excludeStyleProps ?? null, resolvePicturePlaceholders: e.resolvePicturePlaceholders !== !1, pictureResolver: e.pictureResolver && typeof e.pictureResolver == "object" ? e.pictureResolver : {} };
}
nt();
Nn();
be();
Be();
me();
function Is(...e) {
  return Ql(...e), X;
}
var X = Object.assign(Hs, { plugins: Is }), oo = Symbol("snapdom.internal"), Ws = Symbol("snapdom.internal.silent"), on = !1;
async function Hs(e, t) {
  if (!e) throw new Error("Element cannot be null or undefined");
  let r = Rs(t);
  if (es(r, t && t.plugins), ve() && (r.embedFonts === !0 || Ds(e))) {
    if (r.embedFonts) try {
      let i = Qn(e), o = new Set([...i].map((a) => String(a).split("__")[0]).filter(Boolean));
      await Jn(o, 1);
    } catch {
    }
    let n = r.safariWarmupAttempts ?? 3;
    for (let i = 0; i < n; i++) try {
      await _s(e, t);
    } catch {
    }
  }
  return r.iconFonts && r.iconFonts.length > 0 && rl(r.iconFonts), r.snap || (r.snap = { toPng: (n, i) => X.toPng(n, i), toSvg: (n, i) => X.toSvg(n, i) }), X.capture(e, r, oo);
}
X.capture = async (e, t, r) => {
  if (r !== oo) throw new Error("[snapdom.capture] is internal. Use snapdom(...) instead.");
  let n = await no(e, t), i = { img: async (g, p) => {
    let { toImg: b } = await Promise.resolve().then(() => (Ir(), Vt));
    return b(n, { ...g, ...p || {} });
  }, svg: async (g, p) => {
    let { toSvg: b } = await Promise.resolve().then(() => (Ir(), Vt));
    return b(n, { ...g, ...p || {} });
  }, canvas: async (g, p) => {
    let { toCanvas: b } = await Promise.resolve().then(() => (kt(), Pn));
    return b(n, { ...g, ...p || {} });
  }, blob: async (g, p) => {
    let { toBlob: b } = await Promise.resolve().then(() => (Un(), Dn));
    return b(n, { ...g, ...p || {} });
  }, png: async (g, p) => {
    let { rasterize: b } = await Promise.resolve().then(() => (gt(), mt));
    return b(n, { ...g, ...p || {}, format: "png" });
  }, jpeg: async (g, p) => {
    let { rasterize: b } = await Promise.resolve().then(() => (gt(), mt));
    return b(n, { ...g, ...p || {}, format: "jpeg" });
  }, webp: async (g, p) => {
    let { rasterize: b } = await Promise.resolve().then(() => (gt(), mt));
    return b(n, { ...g, ...p || {}, format: "webp" });
  }, download: async (g, p) => {
    let { download: b } = await Promise.resolve().then(() => (wa(), zn));
    return b(n, { ...g, ...p || {} });
  } }, o = {};
  for (let g of ["img", "svg", "canvas", "blob", "png", "jpeg", "webp"]) o[g] = async (p) => i[g](t, { ...p || {}, [Ws]: !0 });
  o.jpg = o.jpeg;
  let a = { ...t, export: { url: n }, exports: o }, l = await Jl("defineExports", a), c = Object.assign({}, ...l.filter((g) => g && typeof g == "object").reverse()), u = { ...i, ...c };
  u.jpeg && !u.jpg && (u.jpg = (g, p) => u.jpeg(g, p));
  function f(g, p) {
    let b = { ...t, ...p || {} }, x = (y) => y === "jpeg" || y === "jpg" || y === "webp";
    return [g, b.format, b.type].map((y) => typeof y == "string" ? y.toLowerCase() : "").find(x) && (b.backgroundColor == null || b.backgroundColor === "transparent") && (b.backgroundColor = "#ffffff"), b;
  }
  let s = !1, d = Promise.resolve();
  async function h(g, p) {
    let b = async () => {
      let x = u[g];
      if (!x) throw new Error(`[snapdom] Unknown export type: ${g}`);
      let y = f(g, p), w = { ...t, export: { type: g, options: y, url: n } };
      await Se("beforeExport", w);
      let A = await x(w, y);
      return await Se("afterExport", w, A), s || (s = !0, await Se("afterSnap", t)), A;
    };
    return d = d.then(b);
  }
  let m = { url: n, toRaw: () => n, to: (g, p) => h(g, p), toImg: (g) => h("img", g), toSvg: (g) => h("svg", g), toCanvas: (g) => h("canvas", g), toBlob: (g) => h("blob", g), toPng: (g) => h("png", g), toJpg: (g) => h("jpg", g), toWebp: (g) => h("webp", g), download: (g) => h("download", g) };
  for (let g of Object.keys(u)) {
    let p = "to" + g.charAt(0).toUpperCase() + g.slice(1);
    m[p] || (m[p] = (b) => h(g, b));
  }
  return m;
};
X.toRaw = (e, t) => X(e, t).then((r) => r.toRaw());
X.toImg = (e, t) => X(e, t).then((r) => r.toImg());
X.toSvg = (e, t) => X(e, t).then((r) => r.toSvg());
X.toCanvas = (e, t) => X(e, t).then((r) => r.toCanvas());
X.toBlob = (e, t) => X(e, t).then((r) => r.toBlob());
X.toPng = (e, t) => X(e, { ...t, format: "png" }).then((r) => r.toPng());
X.toJpg = (e, t) => X(e, { ...t, format: "jpeg" }).then((r) => r.toJpg());
X.toWebp = (e, t) => X(e, { ...t, format: "webp" }).then((r) => r.toWebp());
X.download = (e, t) => X(e, t).then((r) => r.download());
async function _s(e, t) {
  if (on) return;
  let r = { ...t, fast: !0, embedFonts: !0, scale: 0.2 }, n;
  try {
    n = await no(e, r);
  } catch (i) {
    G(t, "safariWarmup pre-capture failed", i);
  }
  await new Promise((i) => requestAnimationFrame(() => requestAnimationFrame(i))), n && await new Promise((i) => {
    let o = new Image();
    try {
      o.decoding = "sync", o.loading = "eager";
    } catch (a) {
      G(t, "safariWarmup img hints failed", a);
    }
    o.style.cssText = "position:fixed;left:0px;top:0px;width:10px;height:10px;opacity:0.01;pointer-events:none;", o.src = n, document.body.appendChild(o), (async () => {
      try {
        typeof o.decode == "function" && await o.decode();
      } catch (l) {
        G(t, "safariWarmup img.decode failed", l);
      }
      let a = performance.now();
      for (; !(o.complete && o.naturalWidth > 0) && performance.now() - a < 900; ) await new Promise((l) => setTimeout(l, 200));
      await new Promise((l) => requestAnimationFrame(l));
      try {
        let l = document.createElement("canvas");
        l.width = Math.max(1, o.naturalWidth || 10), l.height = Math.max(1, o.naturalHeight || 10);
        let c = l.getContext("2d");
        c && c.drawImage(o, 0, 0);
      } catch {
      }
      await new Promise((l) => requestAnimationFrame(l));
      try {
        o.remove();
      } catch (l) {
        G(t, "safariWarmup img.remove failed", l);
      }
      i();
    })();
  }), e.querySelectorAll("canvas").forEach((i) => {
    try {
      let o = i.getContext("2d", { willReadFrequently: !0 });
      o && o.getImageData(0, 0, 1, 1);
    } catch (o) {
      G(t, "safariWarmup canvas poke failed", o);
    }
  }), on = !0;
}
function Ds(e) {
  let t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
  for (; t.nextNode(); ) {
    let r = t.currentNode, n = getComputedStyle(r), i = n.backgroundImage && n.backgroundImage !== "none", o = n.maskImage && n.maskImage !== "none" || n.webkitMaskImage && n.webkitMaskImage !== "none";
    if (i || o || r.tagName === "CANVAS") return !0;
  }
  return !1;
}
const io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  snapdom: X
}, Symbol.toStringTag, { value: "Module" }));
export {
  Os as htmlToAxure
};
