(function () {
  var ROUTES = ["home", "tappe", "riflessioni"];
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
})();
