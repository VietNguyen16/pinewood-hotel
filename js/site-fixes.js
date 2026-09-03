(() => {
  const ROOM_IMAGES = [
    ['/assets/images/pinewood-room-amenities-card.webp', 'Tiện nghi phòng tại Pinewood Hotel Dalat', 'Room amenities at Pinewood Hotel Dalat'],
    ['/assets/images/pinewood-room-stay-card.webp', 'Không gian phòng tại Pinewood Hotel Dalat', 'Room atmosphere at Pinewood Hotel Dalat'],
    ['/assets/images/pinewood-room-bathroom-card.webp', 'Phòng tắm tại Pinewood Hotel Dalat', 'Bathroom at Pinewood Hotel Dalat']
  ];
  const BREAKFAST_IMAGE = '/assets/images/pinewood-breakfast-card.webp';

  const en = () => document.documentElement.lang === 'en' || location.pathname.startsWith('/en');

  function injectStyle() {
    if (document.getElementById('pinewood-site-fixes-css')) return;
    const style = document.createElement('style');
    style.id = 'pinewood-site-fixes-css';
    style.textContent = `
      .pinewood-fixed-grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,.9fr);gap:24px;align-items:stretch}
      .pinewood-fixed-card{overflow:hidden;border:1px solid rgba(178,142,105,.26);border-radius:24px;background:#fff;box-shadow:var(--shadow-soft)}
      .pinewood-fixed-card>a{display:block;color:inherit;text-decoration:none}.pinewood-fixed-copy{padding:20px 22px 24px}.pinewood-fixed-copy strong{display:block;margin:0 0 8px;color:var(--pine-green);font-size:22px}.pinewood-fixed-copy span{color:var(--muted);line-height:1.7}.pinewood-room-slider{padding:16px;background:#f6f4ef}.pinewood-room-slider-viewport{overflow:hidden;border-radius:18px}.pinewood-room-slider-track{display:flex;transition:transform .35s ease;will-change:transform}.pinewood-room-slide{flex:0 0 100%;margin:0}.pinewood-room-slide img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover}.pinewood-room-slider-controls{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:14px}.pinewood-room-slider-button{width:44px;height:44px;border-radius:999px;border:1px solid rgba(178,142,105,.36);background:#fff;color:var(--pine-green);font-size:28px;line-height:1;cursor:pointer}.pinewood-room-slider-dots{display:flex;align-items:center;justify-content:center;gap:8px;flex:1}.pinewood-room-slider-dot{width:10px;height:10px;border:0;border-radius:999px;background:rgba(17,65,46,.22);cursor:pointer}.pinewood-room-slider-dot.is-active{width:26px;background:var(--pine-green)}.pinewood-breakfast-media{padding:16px;background:#f6f4ef}.pinewood-breakfast-media img{display:block;width:100%;height:100%;min-height:420px;object-fit:cover;border-radius:18px}.marketing-photo-feature .pinewood-fixed-grid{grid-template-columns:1fr}.marketing-photo-feature .pinewood-fixed-card{max-width:880px;margin:0 auto}@media(max-width:1024px){.pinewood-fixed-grid{grid-template-columns:1fr}}@media(max-width:720px){.pinewood-room-slider,.pinewood-breakfast-media{padding:12px}.pinewood-breakfast-media img{min-height:260px}.pinewood-fixed-copy{padding:18px}}
    `;
    document.head.appendChild(style);
  }

  function roomSliderMarkup() {
    const isEn = en();
    const dots = ROOM_IMAGES.map((_, i) => `<button type="button" class="pinewood-room-slider-dot${i === 0 ? ' is-active' : ''}" data-slider-dot aria-label="${isEn ? 'Go to image' : 'Đến hình'} ${i + 1}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`).join('');
    const slides = ROOM_IMAGES.map((img, i) => `<figure class="pinewood-room-slide${i === 0 ? ' is-active' : ''}" data-slider-slide><img src="${img[0]}" alt="${isEn ? img[2] : img[1]}" loading="lazy" decoding="async" width="1200" height="1200"></figure>`).join('');
    return `<div class="pinewood-room-slider" data-room-slider data-index="0"><div class="pinewood-room-slider-viewport"><div class="pinewood-room-slider-track" data-slider-track>${slides}</div></div><div class="pinewood-room-slider-controls"><button type="button" class="pinewood-room-slider-button" data-slider-prev aria-label="${isEn ? 'Previous image' : 'Hình trước'}">‹</button><div class="pinewood-room-slider-dots">${dots}</div><button type="button" class="pinewood-room-slider-button" data-slider-next aria-label="${isEn ? 'Next image' : 'Hình sau'}">›</button></div></div>`;
  }

  function breakfastMarkup() {
    const isEn = en();
    return `<a href="${isEn ? '/en/breakfast/' : '/bua-sang/'}"><div class="pinewood-breakfast-media"><img src="${BREAKFAST_IMAGE}" alt="${isEn ? 'Breakfast buffet at Pinewood Hotel Dalat' : 'Buffet sáng tại Pinewood Hotel Dalat'}" loading="lazy" decoding="async" width="900" height="1200"></div><figcaption class="pinewood-fixed-copy"><strong>${isEn ? 'Breakfast buffet' : 'Buffet sáng'}</strong><span>${isEn ? 'A clearer look at the morning buffet experience during your Pinewood stay.' : 'Hình buffet sáng rõ ràng hơn cho khách xem trước trải nghiệm bữa sáng tại Pinewood.'}</span></figcaption></a>`;
  }

  function fixHomeGallery() {
    const section = document.querySelector('#seo-home-marketing .hotel-photo-section');
    if (!section || section.dataset.pinewoodFixed === 'true') return;
    section.dataset.pinewoodFixed = 'true';
    const isEn = en();
    section.innerHTML = `<header class="hotel-photo-head"><p class="eyebrow">${isEn ? 'PINEWOOD IMAGES' : 'HÌNH ẢNH PINEWOOD'}</p><h2 id="pinewood-photo-title">${isEn ? 'Room slider and breakfast buffet' : 'Slider hình phòng & buffet sáng'}</h2><p>${isEn ? 'Browse room images with the buttons and view the breakfast buffet photo.' : 'Xem hình phòng bằng nút chuyển qua lại và xem ảnh buffet sáng.'}</p></header><div class="pinewood-fixed-grid"><figure class="pinewood-fixed-card"><a href="${isEn ? '/en/rooms/' : '/phong/'}"><div>${roomSliderMarkup()}</div><figcaption class="pinewood-fixed-copy"><strong>${isEn ? 'Rooms & suites' : 'Phòng nghỉ & suite'}</strong><span>${isEn ? 'Swipe or use the buttons to preview the room visuals.' : 'Bấm nút để xem lần lượt các hình phòng.'}</span></figcaption></a></figure><figure class="pinewood-fixed-card">${breakfastMarkup()}</figure></div>`;
  }

  function fixRoomsPage() {
    if (!/^(\/phong|\/en\/rooms)\/?$/.test(location.pathname)) return;
    const feature = document.querySelector('.marketing-photo-feature');
    if (!feature || feature.dataset.pinewoodFixed === 'true') return;
    feature.dataset.pinewoodFixed = 'true';
    const isEn = en();
    feature.innerHTML = `<div class="shell"><div class="pinewood-fixed-grid"><figure class="pinewood-fixed-card"><div>${roomSliderMarkup()}</div><figcaption class="pinewood-fixed-copy"><strong>${isEn ? 'Room image slider' : 'Hình phòng dạng slide ngang'}</strong><span>${isEn ? 'Use the controls to browse the provided room visuals.' : 'Dùng nút bấm để xem lần lượt các hình phòng bạn cung cấp.'}</span></figcaption></figure></div></div>`;
  }

  function fixServiceAndBreakfastImages() {
    document.querySelectorAll('#seo-service-photo img, .breakfast-showcase-media img').forEach(img => {
      img.src = BREAKFAST_IMAGE;
      img.removeAttribute('srcset');
      img.alt = en() ? 'Breakfast buffet at Pinewood Hotel Dalat' : 'Buffet sáng tại Pinewood Hotel Dalat';
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
