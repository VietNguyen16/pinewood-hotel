(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const BREAKFAST_IMG = '/assets/images/pinewood-breakfast-card.webp?v=20260904e';
  const ROOM_IMG = '/assets/images/pinewood-experience.webp?v=20260904e';
  const routeData = {
    '/': ['vi', true, 'Pinewood Hotel Dalat | Khách sạn tại Đà Lạt', 'Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt với 50 phòng và suite, bữa sáng, Wi-Fi và hỗ trợ trực tiếp.'],
    '/en': ['en', true, 'Pinewood Hotel Dalat | Hotel in Da Lat, Vietnam', 'Official website of Pinewood Hotel Dalat with rooms, breakfast, Wi-Fi and direct hotel support.'],
    '/dich-vu': ['vi', true, 'Dịch vụ khách sạn tại Đà Lạt | Pinewood Hotel Dalat', 'Dịch vụ tại Pinewood Hotel Dalat: Wi-Fi miễn phí, bữa sáng, nhà hàng, café, buồng phòng và hỗ trợ Lễ tân.'],
    '/en/services': ['en', true, 'Hotel Services in Da Lat | Pinewood Hotel Dalat', 'Services at Pinewood Hotel Dalat including complimentary Wi-Fi, breakfast, restaurant and café service, housekeeping and Reception support.'],
    '/bua-sang': ['vi', false, 'Bữa sáng | Pinewood Hotel Dalat', 'Thông tin bữa sáng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.'],
    '/en/breakfast': ['en', false, 'Breakfast | Pinewood Hotel Dalat', 'Breakfast information for guests currently staying at Pinewood Hotel Dalat.'],
    '/wifi': ['vi', false, 'Wi-Fi | Pinewood Hotel Dalat', 'Thông tin Wi-Fi dành cho khách đang lưu trú tại Pinewood Hotel Dalat.'],
    '/en/wifi': ['en', false, 'Wi-Fi | Pinewood Hotel Dalat', 'Wi-Fi information for guests currently staying at Pinewood Hotel Dalat.']
  };
  const normalize = p => (p || '/').replace(/\/+$/, '') || '/';
  function current() {
    const key = normalize(location.pathname);
    const data = routeData[key] || [key.startsWith('/en') ? 'en' : 'vi', !key.includes('/wifi') && !key.includes('/breakfast') && !key.includes('/bua-sang'), 'Pinewood Hotel Dalat', key.startsWith('/en') ? 'Guest information from Pinewood Hotel Dalat.' : 'Thông tin dành cho khách của Pinewood Hotel Dalat.'];
    return { key, lang:data[0], index:data[1], title:data[2], description:data[3] };
  }
  function upsertMeta(selector, attr, name, content) {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attr, name); document.head.appendChild(node); }
    node.setAttribute('content', content);
  }
  function applySeo() {
    const r = current();
    document.documentElement.lang = r.lang;
    document.title = r.title;
    upsertMeta('meta[name="description"]', 'name', 'description', r.description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', r.index ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow');
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', r.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', r.description);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', `${BASE}${ROOM_IMG.replace(/^\//,'')}`);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `${BASE}${ROOM_IMG.replace(/^\//,'')}`);
  }
  function injectStyle() {
    if (document.getElementById('pinewood-image-fix-style')) return;
    const style = document.createElement('style');
    style.id = 'pinewood-image-fix-style';
    style.textContent = `
      .pinewood-image-fix-section{margin-top:34px}.pinewood-image-fix-head{text-align:center;max-width:860px;margin:0 auto 24px}.pinewood-image-fix-head h2{margin:0;color:var(--pine-green);font-size:clamp(30px,4vw,48px);font-weight:500;line-height:1.15}.pinewood-image-fix-head p{color:var(--muted);line-height:1.7}.pinewood-image-fix-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,.95fr);gap:24px;align-items:start}.pinewood-image-fix-card{overflow:hidden;border:1px solid var(--line);border-radius:var(--radius-xl);background:#fff;box-shadow:var(--shadow-soft)}.pinewood-image-fix-card.full{grid-column:1/-1}.pinewood-image-fix-media{background:#f5f2eb;padding:16px}.pinewood-image-fix-media img{display:block;width:100%;height:100%;object-fit:contain;border-radius:18px}.pinewood-image-fix-media.room{aspect-ratio:16/10}.pinewood-image-fix-media.breakfast{aspect-ratio:863/452}.pinewood-image-fix-copy{padding:22px 24px 26px}.pinewood-image-fix-copy h3{margin:0;color:var(--pine-green);font-size:clamp(22px,2.2vw,32px)}.pinewood-image-fix-copy p{margin:12px 0 0;color:var(--muted);line-height:1.7}.pinewood-image-fix-copy a{display:inline-block;margin-top:14px;color:var(--pine-green);font-weight:700;text-decoration:none}.pinewood-breakfast-page-visual{margin-top:24px}.pinewood-breakfast-page-visual .pinewood-image-fix-media{padding:18px}@media(max-width:900px){.pinewood-image-fix-grid{grid-template-columns:1fr}.pinewood-image-fix-media{padding:12px}.pinewood-image-fix-card.full{grid-column:auto}}`;
    document.head.appendChild(style);
  }
  function img(src, alt, cls='') { return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" class="${cls}">`; }
  function homeVisual(lang) {
    const en = lang === 'en';
    return `<header class="pinewood-image-fix-head"><p class="eyebrow">PINEWOOD IMAGES</p><h2>${en ? 'Rooms and breakfast at Pinewood' : 'Phòng nghỉ và bữa sáng tại Pinewood'}</h2><p>${en ? 'A cleaner visual preview with working images for the room atmosphere and breakfast experience.' : 'Bố cục hình ảnh gọn hơn, bảo đảm ảnh phòng và ảnh bữa sáng hiển thị đúng trên website.'}</p></header><div class="pinewood-image-fix-grid"><article class="pinewood-image-fix-card"><div class="pinewood-image-fix-media room">${img(ROOM_IMG, en ? 'Pinewood Hotel Dalat room and stay experience' : 'Không gian phòng nghỉ Pinewood Hotel Dalat')}</div><div class="pinewood-image-fix-copy"><h3>${en ? 'Rooms & stay' : 'Không gian lưu trú'}</h3><p>${en ? 'A balanced preview of the stay experience at Pinewood Hotel Dalat.' : 'Góc nhìn tổng quan về trải nghiệm lưu trú tại Pinewood Hotel Dalat.'}</p><a href="${en ? '/en/rooms/' : '/phong/'}">${en ? 'View rooms' : 'Xem phòng'}</a></div></article><article class="pinewood-image-fix-card"><div class="pinewood-image-fix-media breakfast">${img(BREAKFAST_IMG, en ? 'Breakfast at Pinewood Hotel Dalat' : 'Bữa sáng tại Pinewood Hotel Dalat')}</div><div class="pinewood-image-fix-copy"><h3>${en ? 'Breakfast at Pinewood' : 'Bữa sáng tại Pinewood'}</h3><p>${en ? 'The breakfast poster is now shown correctly instead of a blank or broken image area.' : 'Ảnh bữa sáng đã được hiển thị đúng thay cho khung ảnh bị lỗi.'}</p><a href="${en ? '/en/breakfast/' : '/bua-sang/'}">${en ? 'View breakfast' : 'Xem bữa sáng'}</a></div></article></div>`;
  }
  function patchHome(r) {
    const target = document.querySelector('#seo-home-marketing .hotel-photo-section, .static-seo-fallback .hotel-photo-section, #seo-home-marketing .pinewood-gallery');
    if (!target || target.dataset.imageFixed === 'true') return;
    target.className = 'hotel-photo-section pinewood-image-fix-section';
    target.dataset.imageFixed = 'true';
    target.innerHTML = homeVisual(r.lang);
  }
  function patchServices(r) {
    const target = document.getElementById('seo-service-photo') || document.querySelector('.service-photo-card, .hotel-photo-section');
    if (!target || target.dataset.imageFixed === 'true') return;
    target.dataset.imageFixed = 'true';
    target.innerHTML = `<div class="pinewood-image-fix-media breakfast">${img(BREAKFAST_IMG, r.lang === 'en' ? 'Breakfast and café service at Pinewood Hotel Dalat' : 'Dịch vụ bữa sáng và café tại Pinewood Hotel Dalat')}</div><div class="pinewood-image-fix-copy"><h3>${r.lang === 'en' ? 'Breakfast & café' : 'Bữa sáng & café'}</h3><p>${r.lang === 'en' ? 'A real breakfast visual is shown here so the service page no longer has a blank image.' : 'Ảnh bữa sáng được hiển thị tại đây để trang dịch vụ không còn khung ảnh lỗi.'}</p></div>`;
    target.classList.add('pinewood-image-fix-card');
  }
  function patchBreakfastPage(r) {
    if (!/^(\/en\/breakfast|\/bua-sang)$/.test(r.key)) return;
    if (document.getElementById('pinewood-breakfast-page-visual')) return;
    const after = document.querySelector('.breakfast-info-feature') || document.querySelector('.page-section .shell');
    if (!after) return;
    const wrap = document.createElement('div');
    wrap.className = 'shell pinewood-breakfast-page-visual';
    wrap.id = 'pinewood-breakfast-page-visual';
    wrap.innerHTML = `<article class="pinewood-image-fix-card full"><div class="pinewood-image-fix-media breakfast">${img(BREAKFAST_IMG, r.lang === 'en' ? 'Breakfast poster at Pinewood Hotel Dalat' : 'Hình ảnh bữa sáng tại Pinewood Hotel Dalat')}</div><div class="pinewood-image-fix-copy"><h3>${r.lang === 'en' ? 'Breakfast at Pinewood' : 'Bữa sáng tại Pinewood'}</h3><p>${r.lang === 'en' ? 'This page now shows the breakfast image requested for Pinewood Hotel Dalat.' : 'Trang này đã hiển thị đúng hình ảnh bữa sáng theo yêu cầu.'}</p></div></article>`;
    after.insertAdjacentElement('afterend', wrap);
  }
  function replaceBrokenImages() {
    document.querySelectorAll('img[src*="pinewood-cafe.svg"],img[src*="pinewood-breakfast-buffet"],img[src*="pinewood-breakfast-card"],img[src*="pinewood-room.svg"]').forEach(el => {
      const isRoom = /pinewood-room\.svg/.test(el.getAttribute('src') || '');
      el.src = isRoom ? ROOM_IMG : BREAKFAST_IMG;
      el.style.objectFit = 'contain';
      el.style.background = '#f5f2eb';
    });
  }
  function run() {
    injectStyle();
    applySeo();
    const r = current();
    if (r.key === '/' || r.key === '/en') patchHome(r);
    if (r.key === '/dich-vu' || r.key === '/en/services') patchServices(r);
    patchBreakfastPage(r);
    replaceBrokenImages();
  }
  const schedule = () => requestAnimationFrame(run);
  ['pushState','replaceState'].forEach(name => { const original = history[name]; history[name] = function(...args){ const out = original.apply(this,args); schedule(); return out; }; });
  addEventListener('popstate', schedule);
  addEventListener('DOMContentLoaded', schedule, { once:true });
  new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true });
  schedule();
})();
