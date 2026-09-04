(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const ROOM_IMAGE = `${BASE}/assets/images/pinewood-room-home.webp`;
  const BREAKFAST_IMAGE = `${BASE}/assets/images/pinewood-breakfast-buffet-1600.webp`;
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const routes = {
    '/': ['vi', true, 'Pinewood Hotel Dalat | Khách sạn tại Đà Lạt', 'Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt với 50 phòng và suite. Xem ảnh phòng thực tế, bữa sáng, dịch vụ, vị trí và liên hệ trực tiếp.', ROOM_IMAGE],
    '/en': ['en', true, 'Pinewood Hotel Dalat | Hotel in Da Lat, Vietnam', 'Official website of Pinewood Hotel Dalat with 50 rooms and suites, real room photos, breakfast, services, location and direct contact.', ROOM_IMAGE],
    '/dich-vu': ['vi', true, 'Dịch vụ khách sạn tại Đà Lạt | Pinewood Hotel Dalat', 'Dịch vụ tại Pinewood Hotel Dalat: Wi-Fi miễn phí, bữa sáng 06:30–09:00, nhà hàng, buồng phòng và hỗ trợ Lễ tân.', BREAKFAST_IMAGE],
    '/en/services': ['en', true, 'Hotel Services in Da Lat | Pinewood Hotel Dalat', 'Services at Pinewood Hotel Dalat including complimentary Wi-Fi, breakfast 06:30–09:00, restaurant, housekeeping and Reception support.', BREAKFAST_IMAGE],
    '/bua-sang': ['vi', false, 'Bữa sáng | Pinewood Hotel Dalat', 'Thông tin bữa sáng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', BREAKFAST_IMAGE],
    '/en/breakfast': ['en', false, 'Breakfast | Pinewood Hotel Dalat', 'Breakfast information for guests currently staying at Pinewood Hotel Dalat.', BREAKFAST_IMAGE]
  };
  function upsert(selector, attr, name, content) {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attr, name); document.head.appendChild(node); }
    node.setAttribute('content', content);
  }
  function apply() {
    const key = normalize(location.pathname);
    const data = routes[key];
    if (!data) return;
    const [lang, indexable, title, description, image] = data;
    document.documentElement.lang = lang;
    document.title = title;
    upsert('meta[name="description"]', 'name', 'description', description);
    upsert('meta[name="robots"]', 'name', 'robots', indexable ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow');
    upsert('meta[property="og:title"]', 'property', 'og:title', title);
    upsert('meta[property="og:description"]', 'property', 'og:description', description);
    upsert('meta[property="og:image"]', 'property', 'og:image', image);
    upsert('meta[name="twitter:image"]', 'name', 'twitter:image', image);
  }
  addEventListener('popstate', apply);
  addEventListener('DOMContentLoaded', apply, { once: true });
  apply();
})();
