/**
 * Dashed Orbit Rings — from Magic UI OrbitingCircles (Vetra hero).
 * Source: https://github.com/Shreyas-29/vetra (hero.tsx + orbiting-circles.tsx)
 * Demo defaults match live: radii 300/400/500, speeds 0.5/0.25/0.1, duration base 20.
 */
(function (global) {
  "use strict";

  var CIRCLE1 =
    '<svg class="do-dot-lg" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21ZM1.00838 21C1.00838 32.0411 9.95893 40.9916 21 40.9916C32.0411 40.9916 40.9916 32.0411 40.9916 21C40.9916 9.95893 32.0411 1.00838 21 1.00838C9.95893 1.00838 1.00838 9.95893 1.00838 21Z" fill="currentColor"/><circle cx="21" cy="21" r="10" fill="currentColor"/></svg>';
  var CIRCLE2 =
    '<svg class="do-dot-sm" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="currentColor"/></svg>';

  var DEFAULT_RINGS = [
    {
      speed: 0.5,
      radius: 300,
      items: [
        { kind: "circle1", opacity: 0.7, size: 16 },
        { kind: "circle2", opacity: 0.8, size: 4 },
      ],
    },
    {
      speed: 0.25,
      radius: 400,
      items: [
        { kind: "circle2", opacity: 0.5, size: 4 },
        { kind: "circle1", opacity: 0.6, size: 16 },
        { kind: "circle2", opacity: 0.9, size: 4 },
      ],
    },
    {
      speed: 0.1,
      radius: 500,
      items: [
        { kind: "circle2", opacity: 0.5, size: 4 },
        { kind: "circle2", opacity: 0.9, size: 4 },
        { kind: "circle1", opacity: 0.6, size: 16 },
        { kind: "circle2", opacity: 0.9, size: 4 },
      ],
    },
  ];

  var DEFAULTS = {
    duration: 20,
    iconSize: 30,
    showCopy: true,
    showGlow: true,
    badgeNew: "NEW",
    badgeText: "Explore the 2024 recap",
    title: "Transform your marketing with AI Precision",
    subtitle:
      "AI-powered automation and insights to maximize your campaigns and grow your brand.",
    ctaText: "Start Free Trial",
    rings: null,
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildRing(ring, durationBase, iconSize) {
    var frag = document.createDocumentFragment();
    var pathSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    pathSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    pathSvg.setAttribute("version", "1.1");
    pathSvg.setAttribute("class", "do-path");
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", String(ring.radius));
    circle.setAttribute("stroke-dasharray", "5 5");
    pathSvg.appendChild(circle);
    frag.appendChild(pathSvg);

    var items = ring.items || [];
    var n = items.length || 1;
    var calcDuration = durationBase / (ring.speed || 1);
    items.forEach(function (item, index) {
      var el = document.createElement("div");
      el.className = "do-orbit-item";
      el.style.setProperty("--duration", String(calcDuration));
      el.style.setProperty("--radius", String(ring.radius));
      el.style.setProperty("--angle", String((360 / n) * index));
      el.style.setProperty("--icon-size", iconSize + "px");
      el.style.color = "rgba(255,255,255," + (item.opacity != null ? item.opacity : 0.7) + ")";
      var svg = item.kind === "circle1" ? CIRCLE1 : CIRCLE2;
      el.innerHTML = svg;
      var svgEl = el.querySelector("svg");
      if (svgEl && item.size) {
        svgEl.style.width = item.size + "px";
        svgEl.style.height = item.size + "px";
      }
      frag.appendChild(el);
    });
    return frag;
  }

  function mount(container, options) {
    if (!container) throw new Error("DashedOrbit.mount: container required");
    var opts = Object.assign({}, DEFAULTS, options || {});
    var rings = opts.rings || DEFAULT_RINGS;

    var root = document.createElement("div");
    root.className = "do-root";
    root.setAttribute("data-animation", "dashed-orbit");

    if (opts.showGlow !== false) {
      var glows = document.createElement("div");
      glows.setAttribute("aria-hidden", "true");
      glows.innerHTML =
        '<div class="do-glow do-glow-top"></div>' +
        '<div class="do-glow do-glow-core"></div>' +
        '<div class="do-glow do-glow-mid"></div>' +
        '<div class="do-glow do-glow-horizon"></div>';
      root.appendChild(glows);
    }

    var orbits = document.createElement("div");
    orbits.className = "do-orbits";
    orbits.setAttribute("aria-hidden", "true");
    rings.forEach(function (ring) {
      orbits.appendChild(buildRing(ring, opts.duration, opts.iconSize));
    });
    root.appendChild(orbits);

    if (opts.showCopy !== false) {
      var content = document.createElement("div");
      content.className = "do-content";
      content.innerHTML =
        '<button type="button" class="do-badge" tabindex="-1">' +
        "<span>" +
        '<span class="do-badge-spark" aria-hidden="true"></span>' +
        "</span>" +
        '<span class="do-badge-backdrop" aria-hidden="true"></span>' +
        '<span class="do-badge-label"><span class="do-badge-new">' +
        esc(opts.badgeNew) +
        "</span>" +
        esc(opts.badgeText) +
        "</span></button>" +
        "<h1 class=\"do-title\">" +
        esc(opts.title) +
        "</h1>" +
        '<p class="do-sub">' +
        esc(opts.subtitle) +
        "</p>" +
        '<a class="do-cta" href="#">' +
        esc(opts.ctaText) +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>';
      root.appendChild(content);
    }

    container.appendChild(root);

    return {
      root: root,
      destroy: function () {
        if (root.parentNode) root.parentNode.removeChild(root);
      },
      setOptions: function (next) {
        this.destroy();
        return mount(container, Object.assign({}, opts, next || {}));
      },
    };
  }

  global.DashedOrbit = { mount: mount, DEFAULTS: DEFAULTS };
})(typeof window !== "undefined" ? window : this);
