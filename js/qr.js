window.PINEWOOD_ZALO_QR = '/assets/qr/zalo-pinewood.svg';

(() => {
  const applyHomepageSlogan = () => {
    const heroCopies = document.querySelectorAll('.hero .hero-copy');
    if (!heroCopies.length) return;

    const isEnglish = document.documentElement.lang === 'en';
    heroCopies[0].textContent = isEnglish
      ? 'Sleep Well · Stay Warm · Feel Dalat'
      : 'Ngủ ngon · Ấm áp · Đậm chất Đà Lạt';
  };

  const main = document.getElementById('main-content');
  if (!main) return;

  const observer = new MutationObserver(applyHomepageSlogan);
  observer.observe(main, { childList: true, subtree: true });
  applyHomepageSlogan();
})();
