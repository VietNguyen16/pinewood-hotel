window.PINEWOOD_ZALO_QR = '/assets/qr/zalo-pinewood.svg';

(() => {
  const applyHomepageSlogan = () => {
    const heroCopies = document.querySelectorAll('.hero .hero-copy');
    if (!heroCopies.length) return;

    const target = document.documentElement.lang === 'en'
      ? 'Sleep Well · Stay Warm · Feel Dalat'
      : 'Ngủ ngon · Ấm áp · Đậm chất Đà Lạt';

    if (heroCopies[0].textContent !== target) {
      heroCopies[0].textContent = target;
    }
  };

  const main = document.getElementById('main-content');
  if (!main) return;

  const observer = new MutationObserver(applyHomepageSlogan);
  observer.observe(main, { childList: true, subtree: true });
  applyHomepageSlogan();
})();

(() => {
  const loadSiteFixes = () => {
    if (document.querySelector('script[data-pinewood-site-fixes]')) return;
    const script = document.createElement('script');
    script.src = '/js/site-fixes.js?v=20260904';
    script.defer = true;
    script.dataset.pinewoodSiteFixes = 'true';
    document.head.appendChild(script);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSiteFixes, { once: true });
  } else {
    loadSiteFixes();
  }
})();
