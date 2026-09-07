(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const imageSrc = '/assets/images/pinewood-room-comfort-1200.webp?v=20260907b';

  function patchServicePhoto() {
    const path = normalize(window.location.pathname);
    if (path !== '/dich-vu' && path !== '/en/services') return;

    const band = document.getElementById('seo-service-photo');
    if (!band) return;

    const en = path === '/en/services';
    const image = band.querySelector('img');
    if (!image || image.dataset.pinewoodServicePhoto === 'room-comfort') return;

    image.dataset.pinewoodServicePhoto = 'room-comfort';
    image.src = imageSrc;
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    image.width = 1200;
    image.height = 675;
    image.alt = en
      ? 'Pinewood Hotel Dalat room interior, beds and bathroom amenities'
      : 'Không gian phòng nghỉ, giường và tiện nghi phòng tắm tại Pinewood Hotel Dalat';

    const link = band.querySelector('figure > a');
    if (link) link.href = en ? '/en/rooms/' : '/phong/';

    const caption = band.querySelector('figcaption');
    if (caption) {
      caption.innerHTML = en
        ? '<strong>Comfort prepared for your stay</strong>Thoughtful in-room amenities, comfortable beds and a well-equipped bathroom help make each stay at Pinewood feel easy and restful.'
        : '<strong>Tiện nghi được chuẩn bị cho kỳ nghỉ</strong>Không gian phòng nghỉ, giường ngủ thoải mái và phòng tắm đầy đủ tiện nghi giúp kỳ lưu trú tại Pinewood trở nên dễ chịu và thư thái hơn.';
    }
  }

  function start() {
    const main = document.getElementById('main-content');
    if (!main) return;

    patchServicePhoto();
    const observer = new MutationObserver(() => patchServicePhoto());
    observer.observe(main, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  window.addEventListener('popstate', () => requestAnimationFrame(patchServicePhoto));
})();
