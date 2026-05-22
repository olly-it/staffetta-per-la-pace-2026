(function () {
  var ROUTES = ["home", "tappe", "riflessioni", "share"];
  var DEFAULT_ROUTE = "home";

  var sections = {};
  var navLinks = {};

  ROUTES.forEach(function (name) {
    sections[name] = document.querySelector('section[data-route="' + name + '"]');
    navLinks[name] = document.querySelector('a[data-route="' + name + '"]');
  });

  function currentRoute() {
    var hash = window.location.hash.replace(/^#/, "");
    return ROUTES.indexOf(hash) >= 0 ? hash : DEFAULT_ROUTE;
  }

  function showRoute(name) {
    ROUTES.forEach(function (route) {
      var section = sections[route];
      var link = navLinks[route];
      if (!section) return;
      if (route === name) {
        section.hidden = false;
        if (link) link.classList.add("is-active");
      } else {
        section.hidden = true;
        if (link) link.classList.remove("is-active");
      }
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function onHashChange() {
    showRoute(currentRoute());
    closeMobileNav();
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeMobileNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMobileNav();
    });
  }

  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  // Share section: show home URL and wire up copy / native share
  var shareUrlEl = document.getElementById("share-url");
  if (shareUrlEl) {
    var homeUrl = new URL("./", window.location.href).href;
    shareUrlEl.href = homeUrl;
    shareUrlEl.textContent = homeUrl;

    var copyBtn = document.getElementById("share-copy");
    if (copyBtn && navigator.clipboard) {
      copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(homeUrl).then(function () {
          var original = copyBtn.textContent;
          copyBtn.textContent = "Copiato!";
          setTimeout(function () { copyBtn.textContent = original; }, 1800);
        });
      });
    } else if (copyBtn) {
      copyBtn.hidden = true;
    }

    var nativeBtn = document.getElementById("share-native");
    if (nativeBtn && navigator.share) {
      nativeBtn.hidden = false;
      nativeBtn.addEventListener("click", function () {
        navigator.share({
          title: "Agesci Liguria – Costruttori di Pace",
          text: "Da Ventimiglia a Sarzana, 22–23–24 maggio 2026",
          url: homeUrl
        }).catch(function () { /* user dismissed */ });
      });
    }
  }
})();
