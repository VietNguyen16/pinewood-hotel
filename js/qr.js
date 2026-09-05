window.PINEWOOD_ZALO_QR = '/assets/qr/zalo-pinewood.svg';

(() => {
  const applyHomepageSlogan = () => {
    const heroCopies = document.querySelectorAll('.hero .hero-copy');
    if (!heroCopies.length) return;
    const target = document.documentElement.lang === 'en'
      ? 'Sleep Well · Stay Warm · Feel Dalat'
      : 'Ngủ ngon · Ấm áp · Đậm chất Đà Lạt';
    if (heroCopies[0].textContent !== target) heroCopies[0].textContent = target;
  };

  const schedule = () => window.requestAnimationFrame(applyHomepageSlogan);
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('popstate', schedule);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-route], [data-lang]')) schedule();
  });
})();
