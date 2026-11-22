(function () {
  window.GILD_BOOTED = true;

  var cfg = window.GILD_CONFIG || {};
  var comingSoon = cfg.comingSoon !== false;

  var base = String(cfg.siteBase || "").replace(/\/$/, "");
  if (base) {
    var page = document.documentElement.getAttribute("data-page") || "";
    var pageUrl = page ? base + "/" + page : base + "/";
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", pageUrl);
    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", pageUrl);
    var image = base + "/assets/og.png";
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(function (el) {
      el.setAttribute("content", image);
    });
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (el) {
      el.textContent = el.textContent.replace(/https:\/\/newchapteraistudio\.com\/gild/g, base);
    });
  }

  function usable(url) {
    if (!url || typeof url !== "string") return false;
    if (!/^https:\/\/(apps\.apple\.com\/|play\.google\.com\/)/.test(url)) return false;
    if (/id0{5,}|example\.|YOUR|TODO|XXXX/i.test(url)) return false;
    return true;
  }

  var stores = {
    appStore: { url: cfg.appStoreUrl, name: "App Store" },
    playStore: { url: cfg.playStoreUrl, name: "Google Play" }
  };

  Object.keys(stores).forEach(function (key) {
    var store = stores[key];
    var live = !comingSoon && usable(store.url);
    document.querySelectorAll('[data-store="' + key + '"]').forEach(function (el) {
      var kicker = el.querySelector(".store-kicker");
      if (live) {
        el.href = store.url;
        el.removeAttribute("aria-disabled");
        el.setAttribute("aria-label", store.name + ", download");
        if (kicker) kicker.textContent = "Download";
      } else {
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("aria-label", store.name + ", coming soon");
        if (kicker) kicker.textContent = "Coming soon";
      }
    });
  });

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-links");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (node) { node.classList.add("in"); });
    return;
  }
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      watcher.unobserve(entry.target);
    });
  }, { threshold: 0.01, rootMargin: "0px 0px -4% 0px" });
  nodes.forEach(function (node) { watcher.observe(node); });
})();
