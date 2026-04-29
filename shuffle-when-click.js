(function() {
  function tpShuffle(el) {
    const items = Array.from(el.children);
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      el.appendChild(items[j]);
    }
  }

  function setupClickShuffle() {
    const containers = document.querySelectorAll(".user-items-list-item-container");
    containers.forEach(container => {
      if (!container.dataset.shuffleInitialized) {
        container.addEventListener("click", function(e) {
          tpShuffle(this);
        });
        container.dataset.shuffleInitialized = "true";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupClickShuffle);
  } else {
    setupClickShuffle();
  }

  new MutationObserver(() => {
    setupClickShuffle();
  }).observe(document.body, { childList: true, subtree: true });
})();
