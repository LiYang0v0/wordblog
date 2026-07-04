(function () {
  var storageKey = "wordblog-language";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-lang-toggle]");

  function preferredLanguage() {
    var saved = window.localStorage.getItem(storageKey);
    if (saved === "en" || saved === "zh") {
      return saved;
    }
    return "zh";
  }

  function setLanguage(lang) {
    var next = lang === "en" ? "en" : "zh";
    root.dataset.lang = next;
    root.lang = next === "en" ? "en" : "zh-Hans";

    document.querySelectorAll("[data-lang]").forEach(function (node) {
      node.hidden = node.getAttribute("data-lang") !== next;
    });

    document.querySelectorAll("[data-i18n-zh][data-i18n-en]").forEach(function (node) {
      node.textContent = next === "en" ? node.dataset.i18nEn : node.dataset.i18nZh;
    });

    if (toggle) {
      toggle.textContent = next === "en" ? "中文" : "English";
      toggle.setAttribute("aria-label", next === "en" ? "切换到中文" : "Switch to English");
    }

    window.localStorage.setItem(storageKey, next);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setLanguage(root.dataset.lang === "en" ? "zh" : "en");
    });
  }

  setLanguage(preferredLanguage());
})();
