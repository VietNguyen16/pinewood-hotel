(() => {
  const ROOM_IMAGES = [
    ['/assets/images/pinewood-room-amenities-card.webp', 'Tiện nghi phòng tại Pinewood Hotel Dalat', 'Room amenities at Pinewood Hotel Dalat'],
    ['/assets/images/pinewood-room-stay-card.webp', 'Không gian phòng tại Pinewood Hotel Dalat', 'Room atmosphere at Pinewood Hotel Dalat'],
    ['/assets/images/pinewood-room-bathroom-card.webp', 'Phòng tắm tại Pinewood Hotel Dalat', 'Bathroom at Pinewood Hotel Dalat']
  ];
  const BREAKFAST_IMAGE = '/assets/images/pinewood-breakfast-card.webp';

  const isEn = () => document.documentElement.lang === 'en' || location.pathname.startsWith('/en');
  const langKey = () => isEn() ? 'en' : 'vi';

  function injectStyle() {
    if (document.getElementById('pinewood-site-fixes-css')) return;
    const style = document.createElement('style');
    style.id = 'pinewood-site-fixes-css';
    style.textContent = `
      .pinewood-fixed-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.9fr);gap:24px;align-items:start;max-width:1120px;margin:0 auto}
      .pinewood-fixed-card{overflow:hidden;border:1px solid rgba(178,142,105,.28);border-radius:26px;background:rgba(255,255,255,.96);box-shadow:0 20px 54px rgba(22,37,29,.08)}
      .pinewood-fixed-card a{color:inherit;text-decoration:none}.pinewood-fixed-copy{padding:20px 22px 24px;background:#fff}.pinewood-fixed-copy strong{display:block;margin:0 0 8px;color:var(--pine-green);font-size:clamp(20px,2vw,24px);line-height:1.22}.pinewood-fixed-copy span{display:block;color:var(--muted);line-height:1.65;font-size:16px}.pinewood-card-link{display:inline-flex;align-items:center;margin-top:14px;color:var(--pine-green);font-weight:700}.pinewood-card-link::after{content:'›';margin-left:8px;font-size:20px;line-height:1}
      .pinewood-room-slider{position:relative;padding:14px;background:linear-gradient(135deg,#f7f4ee,#eee9df)}
      .pinewood-room-slider-viewport{position:relative;overflow:hidden;border-radius:20px;background:#eee9df;aspect-ratio:4/3}.pinewood-room-slider-track{display:flex;height:100%;transition:transform .35s ease;will-change:transform}.pinewood-room-slide{flex:0 0 100%;height:100%;margin:0;display:grid;place-items:center;background:#eee9df}.pinewood-room-slide img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#eee9df;border-radius:20px}
      .pinewood-room-slider-controls{position:absolute;inset:14px;pointer-events:none;z-index:2}.pinewood-room-slider-button,.pinewood-room-slider-dot{pointer-events:auto}.pinewood-room-slider-button{position:absolute;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:42px;height:42px;border-radius:999px;border:1px solid rgba(178,142,105,.36);background:rgba(255,255,255,.94);color:var(--pine-green);font-size:28px;line-height:1;cursor:pointer;box-shadow:0 8px 20px rgba(22,37,29,.12)}.pinewood-room-slider-button[data-slider-prev]{left:10px}.pinewood-room-slider-button[data-slider-next]{right:10px}.pinewood-room-slider-button:focus-visible,.pinewood-room-slider-dot:focus-visible{outline:3px solid rgba(17,65,46,.22);outline-offset:3px}
      .pinewood-room-slider-dots{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;gap:8px;padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.88);box-shadow:0 8px 20px rgba(22,37,29,.10)}.pinewood-room-slider-dot{width:9px;height:9px;padding:0;border:0;border-radius:999px;background:rgba(17,65,46,.22);cursor:pointer}.pinewood-room-slider-dot.is-active{width:26px;background:var(--pine-green)}
      .pinewood-breakfast-media{padding:14px;background:linear-gradient(135deg,#f7f4ee,#eee9df)}.pinewood-breakfast-media img{display:block;width:100%;aspect-ratio:863/452;height:auto;object-fit:cover;object-position:center;border-radius:20px;background:#eee9df}.pinewood-breakfast-link{display:block}
      .marketing-photo-feature .pinewood-fixed-grid{grid-template-columns:minmax(0,820px);justify-content:center}.marketing-photo-feature .pinewood-fixed-card{width:100%;max-width:820px;margin:0 auto}
      @media(max-width:1024px){.pinewood-fixed-grid{grid-template-columns:1fr;max-width:760px}.pinewood-breakfast-media img{aspect-ratio:863/452;object-fit:cover}}
      @media(max-width:720px){.pinewood-fixed-grid{gap:18px}.pinewood-room-slider,.pinewood-breakfast-media{padding:12px}.pinewood-room-slider-viewport{aspect-ratio:4/3}.pinewood-room-slide img,.pinewood-breakfast-media img{border-radius:16px}.pinewood-fixed-copy{padding:18px}.pinewood-fixed-copy span{font-size:15px}.pinewood-room-slider-controls{inset:12px}.pinewood-room-slider-button{width:38px;height:38px}.pinewood-room-slider-button[data-slider-prev]{left:6px}.pinewood-room-slider-button[data-slider-next]{right:6px}.pinewood-room-slider-dots{bottom:8px}.pinewood-breakfast-media img{aspect-ratio:863/452;object-fit:cover}}
    `;
    document.head.appendChild(style);
  }

  function roomSliderMarkup() {
    const en = isEn();
    const dots = ROOM_IMAGES.map((_, i) => `<button type="button" class="pinewood-room-slider-dot${i === 0 ? ' is-active' : ''}" data-slider-dot aria-label="${en ? 'Show room photo' : 'Xem ảnh phòng'} ${i + 1}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`).join('');
    const slides = ROOM_IMAGES.map((img, i) => `<figure class="pinewood-room-slide${i === 0 ? ' is-active' : ''}" data-slider-slide><img src="${img[0]}" alt="${en ? img[2] : img[1]}" loading="lazy" decoding="async" width="960" height="960"></figure>`).join('');
    return `<div class="pinewood-room-slider" data-room-slider data-index="0"><div class="pinewood-room-slider-viewport"><div class="pinewood-room-slider-track" data-slider-track>${slides}</div></div><div class="pinewood-room-slider-controls"><button type="button" class="pinewood-room-slider-button" data-slider-prev aria-label="${en ? 'Previous room photo' : 'Ảnh phòng trước'}">‹</button><div class="pinewood-room-slider-dots">${dots}</div><button type="button" class="pinewood-room-slider-button" data-slider-next aria-label="${en ? 'Next room photo' : 'Ảnh phòng tiếp theo'}">›</button></div></div>`;
  }

  function breakfastMarkup() {
    const en = isEn();
    return `<a class="pinewood-breakfast-link" href="${en ? '/en/breakfast/' : '/bua-sang/'}"><div class="pinewood-breakfast-media"><img src="${BREAKFAST_IMAGE}" alt="${en ? 'Breakfast buffet at Pinewood Hotel Dalat' : 'Buffet sáng tại Pinewood Hotel Dalat'}" loading="lazy" decoding="async" width="863" height="452"></div><figcaption class="pinewood-fixed-copy"><strong>${en ? 'Breakfast at Pinewood' : 'Bữa sáng tại Pinewood'}</strong><span>${en ? 'A bright breakfast preview for a calm morning in Da Lat.' : 'Góc nhìn ấm áp về bữa sáng để bắt đầu ngày mới nhẹ nhàng tại Đà Lạt.'}</span><span class="pinewood-card-link">${en ? 'View breakfast' : 'Xem bữa sáng'}</span></figcaption></a>`;
  }

  function fixHomeGallery() {
    const section = document.querySelector('#seo-home-marketing .hotel-photo-section');
    if (!section) return;
    const lang = langKey();
    if (section.dataset.pinewoodFixedLang === lang) return;
    section.dataset.pinewoodFixedLang = lang;
    const en = isEn();
    section.innerHTML = `<header class="hotel-photo-head"><p class="eyebrow">${en ? 'PINEWOOD IMAGES' : 'HÌNH ẢNH PINEWOOD'}</p><h2 id="pinewood-photo-title">${en ? 'Rooms and breakfast at Pinewood' : 'Không gian phòng nghỉ & bữa sáng Pinewood'}</h2><p>${en ? 'A balanced preview of guest rooms, amenities and breakfast before your stay.' : 'Một góc nhìn gọn gàng, cân đối về phòng nghỉ, tiện nghi và bữa sáng trước khi lưu trú.'}</p></header><div class="pinewood-fixed-grid"><figure class="pinewood-fixed-card"><div>${roomSliderMarkup()}</div><figcaption class="pinewood-fixed-copy"><strong>${en ? 'Warm, airy rooms' : 'Phòng nghỉ ấm áp'}</strong><span>${en ? 'A calm look at the room details prepared for an easy Da Lat stay.' : 'Những góc phòng sáng sủa, ấm áp và được chuẩn bị chỉn chu cho kỳ nghỉ tại Đà Lạt.'}</span><a class="pinewood-card-link" href="${en ? '/en/rooms/' : '/phong/'}">${en ? 'View rooms' : 'Xem phòng nghỉ'}</a></figcaption></figure><figure class="pinewood-fixed-card">${breakfastMarkup()}</figure></div>`;
  }

  function fixRoomsPage() {
    if (!/^(\/phong|\/en\/rooms)\/?$/.test(location.pathname)) return;
    const feature = document.querySelector('.marketing-photo-feature');
    if (!feature) return;
    const lang = langKey();
    if (feature.dataset.pinewoodFixedLang === lang) return;
    feature.dataset.pinewoodFixedLang = lang;
    const en = isEn();
    feature.innerHTML = `<div class="shell"><div class="pinewood-fixed-grid"><figure class="pinewood-fixed-card"><div>${roomSliderMarkup()}</div><figcaption class="pinewood-fixed-copy"><strong>${en ? 'Guest room spaces' : 'Không gian phòng nghỉ'}</strong><span>${en ? 'Warm room details and thoughtful amenities prepared for a comfortable Pinewood stay.' : 'Những góc phòng ấm áp và đầy đủ tiện nghi cho kỳ lưu trú tại Pinewood.'}</span></figcaption></figure></div></div>`;
  }

  function fixServiceAndBreakfastImages() {
    document.querySelectorAll('#seo-service-photo img, .breakfast-showcase-media img').forEach(img => {
      if (img.getAttribute('src') === BREAKFAST_IMAGE) return;
      img.src = BREAKFAST_IMAGE;
      img.removeAttribute('srcset');
      img.alt = isEn() ? 'Breakfast buffet at Pinewood Hotel Dalat' : 'Buffet sáng tại Pinewood Hotel Dalat';
    });
  }

  function updateSlider(slider, index) {
    const track = slider.querySelector('[data-slider-track]');
    const slides = [...slider.querySelectorAll('[data-slider-slide]')];
    const dots = [...slider.querySelectorAll('[data-slider-dot]')];
    if (!track || !slides.length) return;
    const next = ((index % slides.length) + slides.length) % slides.length;
    slider.dataset.index = String(next);
    track.style.transform = `translateX(-${next * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === next));
    dots.forEach((d, i) => { d.classList.toggle('is-active', i === next); d.setAttribute('aria-current', i === next ? 'true' : 'false'); });
  }

  function bindSliders() {
    document.querySelectorAll('[data-room-slider]').forEach(slider => {
      if (slider.dataset.bound === 'true') return;
      slider.dataset.bound = 'true';
      updateSlider(slider, Number(slider.dataset.index || 0));
      slider.querySelector('[data-slider-prev]')?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); updateSlider(slider, Number(slider.dataset.index || 0) - 1); });
      slider.querySelector('[data-slider-next]')?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); updateSlider(slider, Number(slider.dataset.index || 0) + 1); });
      slider.querySelectorAll('[data-slider-dot]').forEach((dot, i) => dot.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); updateSlider(slider, i); }));
    });
  }

  function run() { injectStyle(); fixHomeGallery(); fixRoomsPage(); fixServiceAndBreakfastImages(); bindSliders(); }
  const schedule = () => requestAnimationFrame(run);
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();
})();