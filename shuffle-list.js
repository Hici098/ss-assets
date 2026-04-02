(function() {
  function tpShuffle(el) {
    const items = Array.from(el.children);
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      el.appendChild(items[j]);
    }
    el.classList.add("tp-shuffled");
  }

  function init() {
    const containers = document.querySelectorAll(".user-items-list-item-container:not(.tp-shuffled)");
    containers.forEach(tpShuffle);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  new MutationObserver(() => {
    if (document.querySelectorAll(".user-items-list-item-container:not(.tp-shuffled)").length) {
      init();
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
