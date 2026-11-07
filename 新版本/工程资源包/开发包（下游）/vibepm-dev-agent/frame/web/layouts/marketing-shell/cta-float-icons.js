/* Icon landing: CTA float icons */
/* —— CTA 虚线框漂浮图标（对齐 Cloudflare Build CTA 形态；本页主色 + FA solid） —— */
  (function ctaFloatIcons() {
    var panel = document.querySelector("[data-cta-panel]");
    var floats = panel && panel.querySelectorAll("[data-cta-floats] .wa-cta__float");
    if (!panel || !floats || !floats.length) return;

    /* 更靠两侧、纵向拉开；避开居中文案与按钮 */
    var FLOAT_POS = [
      { x: -380, y: -78, r: -12 },
      { x: -440, y: 4, r: 10 },
      { x: -360, y: 86, r: -8 },
      { x: 380, y: -70, r: 8 },
      { x: 440, y: 12, r: -22 },
      { x: 360, y: 92, r: 18 },
    ];
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nodes = Array.prototype.slice.call(floats, 0, 6);
    var raf = 0;
    var started = false;
    var phase = [];

    function scale() {
      var w = panel.clientWidth || 720;
      return Math.max(0.52, Math.min(1.08, w / 980));
    }

    function applyPose(list, withTransition) {
      var s = scale();
      nodes.forEach(function (node, i) {
        var p = list[i] || list[0];
        node.style.transition = withTransition
          ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease"
          : "none";
        node.style.opacity = "1";
        node.style.transform =
          "translate3d(" +
          p.x * s +
          "px," +
          p.y * s +
          "px,0) rotate(" +
          p.r +
          "deg)";
      });
    }

    function stopDrift() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function drift() {
      if (reduced) return;
      var s = scale();
      var t = performance.now() * 0.001;
      nodes.forEach(function (node, i) {
        var base = FLOAT_POS[i] || FLOAT_POS[0];
        var ph = phase[i] || { ax: 5, ay: 8, sp: 0.7, d: 0 };
        var x = base.x * s + Math.sin(t * ph.sp + ph.d) * ph.ax;
        var y = base.y * s + Math.cos(t * ph.sp * 0.9 + ph.d) * ph.ay;
        node.style.transition = "none";
        node.style.transform =
          "translate3d(" + x + "px," + y + "px,0) rotate(" + base.r + "deg)";
      });
      raf = requestAnimationFrame(drift);
    }

    function enter() {
      if (started) return;
      started = true;
      phase = nodes.map(function () {
        return {
          ax: 3 + Math.random() * 5,
          ay: 6 + Math.random() * 6,
          sp: 0.55 + Math.random() * 0.45,
          d: Math.random() * Math.PI * 2,
        };
      });
      if (reduced) {
        applyPose(FLOAT_POS, false);
        return;
      }
      var s = scale();
      nodes.forEach(function (node) {
        node.style.opacity = "0";
        node.style.transform = "translate3d(0,-120px,0) scale(0.75)";
      });
      requestAnimationFrame(function () {
        nodes.forEach(function (node, i) {
          var p = FLOAT_POS[i] || FLOAT_POS[0];
          var delay = i * 100;
          setTimeout(function () {
            node.style.transition =
              "transform 0.9s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.45s ease";
            node.style.opacity = "1";
            node.style.transform =
              "translate3d(" +
              p.x * s +
              "px," +
              p.y * s +
              "px,0) rotate(" +
              p.r +
              "deg)";
          }, delay);
        });
        setTimeout(function () {
          drift();
        }, 900 + nodes.length * 100);
      });
    }

    if (typeof IntersectionObserver !== "undefined") {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              enter();
              io.disconnect();
            }
          });
        },
        { threshold: 0.05, rootMargin: "120px 0px" }
      );
      io.observe(panel);
      // 首屏已带 #cta 时，部分浏览器首帧未回调，补一次可见性检查
      requestAnimationFrame(function () {
        var rect = panel.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight + 120) enter();
      });
    } else {
      enter();
    }

    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!started) return;
        applyPose(FLOAT_POS, false);
        if (!reduced) {
          stopDrift();
          drift();
        }
      }, 120);
    });
  })();

