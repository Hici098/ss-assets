(function() {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --speed: 1.8s;
      --curtain-color: #ffffff;
      --image-max-width: 300px;
      --section-height: 70vh;
    }
    section[id*="reveal-gallery"] {
      position: relative !important;
      overflow: hidden !important;
      cursor: pointer !important;
      background: inherit !important;
    }
    section[id*="reveal-gallery"] .gallery-grid-wrapper {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      min-height: var(--section-height) !important;
      position: relative !important;
    }
    section[id*="reveal-gallery"] .gallery-grid-item {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important; 
      width: 100% !important;
      max-width: var(--image-max-width) !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transition: opacity var(--speed) ease !important;
    }
    section[id*="reveal-gallery"] .gallery-grid-item.active {
      opacity: 1 !important;
      visibility: visible !important;
    }
    .curtain-overlay {
      position: absolute;
      top: 0;
      width: 51%;
      height: 100%;
      background-color: var(--curtain-color) !important;
      z-index: 9999;
      pointer-events: none;
      transition: transform var(--speed) cubic-bezier(0.77, 0, 0.175, 1) !important;
    }
    .curtain-left {
      left: 0;
      transform: translateX(-101%);
    }
    .curtain-right {
      right: 0;
      transform: translateX(101%);
    }
    section[id*="reveal-gallery"].is-animating .curtain-left,
    section[id*="reveal-gallery"].is-animating .curtain-right {
      transform: translateX(0) !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(style);

  function initCurtain() {
    const section = document.querySelector('section[id*="reveal-gallery"]');
    if (!section || section.dataset.done) return;

    const leftC = document.createElement('div');
    leftC.className = 'curtain-overlay curtain-left';
    const rightC = document.createElement('div');
    rightC.className = 'curtain-overlay curtain-right';
    section.appendChild(leftC);
    section.appendChild(rightC);

    const items = section.querySelectorAll('.gallery-grid-item');
    let currentIdx = 0;

    if (items.length > 0) {
      items.forEach(el => el.classList.remove('active'));
      items[0].classList.add('active');
    }

    section.addEventListener('click', function() {
      if (section.classList.contains('is-animating')) return;
      section.classList.add('is-animating');
      setTimeout(() => {
        items[currentIdx].classList.remove('active');
        currentIdx = (currentIdx + 1) % items.length;
        items[currentIdx].classList.add('active');
        setTimeout(() => {
          section.classList.remove('is-animating');
        }, 50); 
      }, 50); 
    });

    section.dataset.done = "true";
  }

  if (document.readyState === 'complete') {
    initCurtain();
  } else {
    window.addEventListener('load', initCurtain);
    document.addEventListener('DOMContentLoaded', initCurtain);
  }
})();
