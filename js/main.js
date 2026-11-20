/* New Chapter AI — render the grids, the hero film, and the contact form. */
(function () {
  "use strict";

  function normalizePath(src) {
    var value = String(src || "").trim();
    if (!value) return "";
    if (/^[a-z]+:/i.test(value)) return value;
    return value.replace(/^\/+/, "");
  }

  function parseMedia(input) {
    var url = String(input || "").trim();
    if (!url) return { type: "empty" };

    var yt =
      url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
      url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/) ||
      url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/) ||
      url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
    if (yt && /youtu\.?be/.test(url)) return { type: "youtube", id: yt[1] };

    var vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return { type: "vimeo", id: vimeo[1] };

    return { type: "file", src: normalizePath(url) };
  }

  function youtubeThumb(id) {
    return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function thumbFor(item) {
    var explicit = normalizePath(item.thumbnail || "");
    if (explicit) return explicit;
    var media = parseMedia(item.file);
    if (media.type === "youtube") return youtubeThumb(media.id);
    return "";
  }

  function endpointReady(value) {
    var endpoint = String(value || "").trim();
    if (!endpoint) return false;
    if (/TODO|example\.com|your-id|xxxxxxxx/i.test(endpoint)) return false;
    return /^https:\/\/[^ ]+$/i.test(endpoint);
  }

  function emailReady(value) {
    var email = String(value || "").trim();
    if (!email) return false;
    if (/example\.com|TODO|you@email/i.test(email)) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (typeof document === "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = {
        parseMedia: parseMedia,
        normalizePath: normalizePath,
        youtubeThumb: youtubeThumb,
        endpointReady: endpointReady,
        emailReady: emailReady
      };
    }
    return;
  }

  var state = { kind: "video", items: [], index: 0 };

  function init() {
    if (typeof SITE === "undefined") {
      var missing = document.createElement("p");
      missing.className = "noscript";
      missing.textContent = "data/media.js did not load, so the films and stills cannot be shown.";
      document.body.prepend(missing);
      return;
    }

    mountHero();
    renderVideos();
    renderImages();
    renderSocials();
    applyEmail();
    applyFormNote();
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    bindCards();
    bindLightbox();
    bindNav();
    bindReveal();
    bindForm();
  }

  function mountHero() {
    var slot = document.getElementById("hero-media");
    var hero = SITE.hero || {};
    if (!slot) return;
    var media = parseMedia(hero.video);
    if (media.type === "empty") {
      var still = normalizePath(hero.image || "");
      if (!still) return;
      var img = document.createElement("img");
      img.className = "hero-still";
      img.src = still;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.addEventListener("error", function () {
        img.remove();
        slot.classList.remove("has-still");
      });
      slot.appendChild(img);
      slot.classList.add("has-still");
      return;
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion && media.type !== "file") return;

    var node;
    if (media.type === "youtube") {
      node = iframe(
        "https://www.youtube.com/embed/" + media.id +
          "?autoplay=1&mute=1&controls=0&loop=1&playlist=" + media.id +
          "&playsinline=1&rel=0&modestbranding=1",
        "Background film"
      );
    } else if (media.type === "vimeo") {
      node = iframe(
        "https://player.vimeo.com/video/" + media.id + "?background=1&autoplay=1&loop=1&muted=1",
        "Background film"
      );
    } else {
      node = document.createElement("video");
      node.src = media.src;
      node.muted = true;
      node.setAttribute("muted", "");
      node.setAttribute("playsinline", "");
      node.playsInline = true;
      node.loop = !reduceMotion;
      node.autoplay = !reduceMotion;
      if (hero.thumbnail) node.poster = normalizePath(hero.thumbnail);
      node.setAttribute("aria-hidden", "true");
      node.addEventListener("error", function () {
        node.remove();
        slot.classList.remove("has-video");
      });
    }
    node.tabIndex = -1;
    slot.appendChild(node);
    slot.classList.add("has-video");
  }

  function iframe(src, title) {
    var frame = document.createElement("iframe");
    frame.src = src;
    frame.title = title || "Film";
    frame.allow = "autoplay; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    return frame;
  }

  function renderVideos() {
    var grid = document.getElementById("video-grid");
    var items = SITE.videos || [];
    if (!items.length) {
      grid.innerHTML = '<p class="empty">No films yet. Add some in data/media.js.</p>';
      return;
    }
    grid.innerHTML = items.map(function (item, index) {
      var media = parseMedia(item.file);
      var thumb = thumbFor(item);
      var placeholder = media.type === "empty";
      return (
        '<button type="button" class="video-card' + (index === 0 ? " featured" : "") + ' reveal" data-kind="video" data-index="' + index + '">' +
          '<span class="thumb tone-' + (index % 6) + (thumb ? " has-image" : "") + '">' +
            (thumb ? '<img src="' + esc(thumb) + '" alt="" ' + (index === 0 ? 'loading="eager"' : 'loading="lazy"') + '>' : "") +
            (placeholder ? '<span class="badge">Placeholder</span>' : "") +
            '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor"></path></svg></span>' +
            '<span class="card-title">' + esc(item.title || "Untitled") + "</span>" +
          "</span>" +
          '<span class="card-desc">' + esc(item.description || "") + "</span>" +
        "</button>"
      );
    }).join("");
    watchImages(grid);
  }

  function renderImages() {
    var grid = document.getElementById("image-grid");
    var items = SITE.images || [];
    if (!items.length) {
      grid.innerHTML = '<p class="empty">No stills yet. Add some in data/media.js.</p>';
      return;
    }
    grid.innerHTML = items.map(function (item, index) {
      var media = parseMedia(item.file);
      var thumb = normalizePath(item.thumbnail || "") || (media.type === "file" ? media.src : "");
      var placeholder = media.type === "empty";
      return (
        '<button type="button" class="still reveal' + (item.frame === "tall" ? " frame-tall" : "") + '" data-kind="image" data-index="' + index + '">' +
          '<span class="thumb tone-' + (index % 6) + (thumb ? " has-image" : "") + '">' +
            (thumb ? '<img src="' + esc(thumb) + '" alt="" loading="lazy">' : "") +
            (placeholder ? '<span class="badge">Placeholder</span>' : "") +
            '<span class="expand">View</span>' +
          "</span>" +
          '<span class="card-title">' + esc(item.title || "Untitled") + "</span>" +
        "</button>"
      );
    }).join("");
    watchImages(grid);
  }

  function watchImages(root) {
    root.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        var thumb = img.closest(".thumb");
        img.remove();
        if (thumb) thumb.classList.remove("has-image");
      });
    });
  }

  function renderSocials() {
    var list = document.getElementById("social-list");
    if (!list) return;
    var items = SITE.socials || [];
    list.innerHTML = items.map(function (item) {
      var href = String(item.href || "").trim();
      if (!href) {
        return '<li><span class="social pending">' + esc(item.label) + " <em>link soon</em></span></li>";
      }
      var external = /^https?:/i.test(href);
      return (
        "<li><a class=\"social\" href=\"" + esc(href) + "\"" +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
        ">" + esc(item.label) + "</a></li>"
      );
    }).join("");
  }

  function applyEmail() {
    var email = String(SITE.email || "").trim();
    document.querySelectorAll("[data-email]").forEach(function (el) {
      el.textContent = email || "Add an email in data/media.js";
      if (el.tagName === "A") el.href = email ? "mailto:" + email : "#contact";
    });
    var note = document.getElementById("email-note");
    if (!note) return;
    note.textContent = emailReady(email)
      ? ""
      : "Placeholder address. Replace email in data/media.js.";
  }

  function applyFormNote() {
    var note = document.getElementById("form-note");
    if (!note) return;
    if (endpointReady(SITE.formEndpoint)) {
      note.textContent = "The form sends straight to the studio. No email app required.";
      return;
    }
    note.textContent = "TODO: this form opens an email draft until you paste a Formspree endpoint into formEndpoint in data/media.js.";
  }

  function bindCards() {
    document.querySelector("main").addEventListener("click", function (event) {
      var card = event.target.closest("[data-kind]");
      if (!card) return;
      openLightbox(card.dataset.kind, Number(card.dataset.index));
    });
  }

  function bindLightbox() {
    var dialog = document.getElementById("lightbox");
    document.getElementById("lb-close").addEventListener("click", function () {
      dialog.close();
    });
    document.getElementById("lb-prev").addEventListener("click", function () {
      step(-1);
    });
    document.getElementById("lb-next").addEventListener("click", function () {
      step(1);
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      document.getElementById("lb-stage").replaceChildren();
      if (!document.getElementById("nav-links").classList.contains("open")) {
        document.body.classList.remove("lock");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (!dialog.open) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        step(event.key === "ArrowRight" ? 1 : -1);
      }
    });
  }

  function openLightbox(kind, index) {
    var items = kind === "image" ? SITE.images || [] : SITE.videos || [];
    if (!items.length) return;
    state.kind = kind;
    state.items = items;
    state.index = index;
    paintLightbox();
    var dialog = document.getElementById("lightbox");
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("lock");
  }

  function step(delta) {
    var count = state.items.length;
    state.index = (state.index + delta + count) % count;
    paintLightbox();
  }

  function paintLightbox() {
    var item = state.items[state.index] || {};
    var stage = document.getElementById("lb-stage");
    var media = parseMedia(item.file);
    stage.replaceChildren();
    document.getElementById("lb-title").textContent = item.title || "Untitled";
    document.getElementById("lb-desc").textContent = item.description || "";
    document.getElementById("lb-count").textContent =
      (state.index + 1) + " / " + state.items.length;
    var single = state.items.length < 2;
    document.getElementById("lb-prev").hidden = single;
    document.getElementById("lb-next").hidden = single;

    if (media.type === "empty") {
      stage.appendChild(emptyPanel(state.kind));
      return;
    }

    if (state.kind === "image") {
      var img = document.createElement("img");
      img.src = media.type === "file" ? media.src : thumbFor(item);
      img.alt = item.title || "";
      img.addEventListener("error", function () {
        stage.replaceChildren(emptyPanel(state.kind, "This image did not load. Check the file path in data/media.js."));
      });
      stage.appendChild(img);
      return;
    }

    if (media.type === "youtube") {
      stage.appendChild(iframe(
        "https://www.youtube.com/embed/" + media.id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1",
        item.title
      ));
      return;
    }
    if (media.type === "vimeo") {
      stage.appendChild(iframe(
        "https://player.vimeo.com/video/" + media.id + "?autoplay=1",
        item.title
      ));
      return;
    }

    var video = document.createElement("video");
    video.controls = true;
    video.setAttribute("controls", "");
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.muted = false;
    video.removeAttribute("muted");
    video.preload = "auto";
    video.src = media.src;
    if (item.thumbnail) video.poster = normalizePath(item.thumbnail);
    video.addEventListener("error", function () {
      stage.replaceChildren(emptyPanel(
        state.kind,
        "This video did not load. Check the path in data/media.js. Use an mp4 or webm, or paste a YouTube or Vimeo link."
      ));
    });
    stage.appendChild(video);
    // The click that opened the lightbox is a user gesture, so playback
    // can start with sound. Controls stay if the browser blocks it.
    var started = video.play();
    if (started && typeof started.catch === "function") started.catch(function () {});
  }

  function emptyPanel(kind, message) {
    var div = document.createElement("div");
    div.className = "lb-empty";
    var strong = document.createElement("strong");
    strong.textContent = "Placeholder";
    var p = document.createElement("p");
    p.textContent = message || (kind === "image"
      ? "No image yet. Put a file in assets/images and set file in data/media.js."
      : "No film yet. Put a file in assets/videos, or paste a YouTube or Vimeo link, in data/media.js.");
    div.append(strong, p);
    return div;
  }

  function bindNav() {
    var nav = document.getElementById("nav");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");

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
      mobileQuery.addEventListener("change", function () { setOpen(false); });
    }

    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    var anchors = Array.prototype.slice.call(links.querySelectorAll("a"));
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          anchors.forEach(function (anchor) {
            anchor.classList.toggle("active", anchor.getAttribute("href") === id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (section) { spy.observe(section); });
    }
  }

  function bindReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (node) { node.classList.add("in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  function bindForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.dataset.state = "";
      status.textContent = "";

      if (!form.checkValidity()) {
        form.reportValidity();
        status.dataset.state = "err";
        status.textContent = "Add your name, a real email, and a short message.";
        return;
      }

      var data = new FormData(form);
      if (String(data.get("_gotcha") || "").trim()) return;

      var payload = {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        brand: String(data.get("brand") || "").trim(),
        project: String(data.get("project") || "").trim(),
        message: String(data.get("message") || "").trim()
      };

      if (endpointReady(SITE.formEndpoint)) {
        sendEndpoint(form, status, payload);
        return;
      }

      var to = String(SITE.email || "").trim();
      var subject = "Project inquiry from " + payload.name + (payload.brand ? " — " + payload.brand : "");
      var body = [
        "Name: " + payload.name,
        "Email: " + payload.email,
        "Brand: " + (payload.brand || "—"),
        "Project: " + payload.project,
        "",
        payload.message
      ].join("\n");
      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      status.dataset.state = "ok";
      status.textContent = emailReady(to)
        ? "Your email app should open with this message. If it does not, write to " + to + "."
        : "Your email app should open a draft. The address is still a placeholder — set email in data/media.js before you rely on it.";
    });
  }

  function sendEndpoint(form, status, payload) {
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = "Sending…";
    fetch(String(SITE.formEndpoint).trim(), {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      status.dataset.state = "ok";
      status.textContent = "Sent. I'll read it and write back.";
    }).catch(function () {
      status.dataset.state = "err";
      var fallback = String(SITE.email || "").trim();
      status.textContent = "That did not send. Write directly" +
        (emailReady(fallback) ? " to " + fallback : "") +
        ", and check formEndpoint in data/media.js.";
    }).then(function () {
      button.disabled = false;
    });
  }

  try {
    init();
  } catch (err) {
    console.error(err);
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("in");
    });
  }
})();
