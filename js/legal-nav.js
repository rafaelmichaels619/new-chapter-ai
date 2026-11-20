/* Mobile menu for the privacy and terms pages. */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (!nav || !toggle || !links) return;

  var mobileQuery = window.matchMedia("(max-width: 820px)");

  function setOpen(open) {
    if (!mobileQuery.matches) open = false;
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (mobileQuery.matches) links.setAttribute("aria-hidden", open ? "false" : "true");
    else links.removeAttribute("aria-hidden");
    document.body.classList.toggle("lock", open);
  }

  setOpen(false);
  toggle.addEventListener("click", function () {
    setOpen(!links.classList.contains("open"));
  });
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });
  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", function () {
      setOpen(false);
    });
  }
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });
})();
