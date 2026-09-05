(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const ROOM_IMAGE = `${BASE}/assets/images/pinewood-room-home.webp`;
  const BREAKFAST_IMAGE = `${BASE}/assets/images/pinewood-breakfast-buffet-1600.webp`;
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const routes = {
    '/': ['vi', true, 'Pinewood Hotel Dalat | Khách sạn Đà Lạt', 'Pinewood Hotel Dalat mang đến không gian nghỉ dưỡng ấm áp, phòng nghỉ tiện nghi và vị trí thuận tiện tại Đà Lạt. Xem phòng, dịch vụ và chỉ đường.', ROOM_IMAGE],
    '/en': ['en', true, 'Pinewood Hotel Dalat | Hotel in Da Lat', 'Discover Pinewood Hotel Dalat with comfortable rooms, warm hospitality and a convenient Da Lat location. Explore rooms, services and directions.', ROOM_IMAGE],
    '/dich-vu': ['vi', true, 'Dịch vụ khách sạn tại Đà Lạt | Pinewood Hotel Dalat', 'Khám phá dịch vụ tại Pinewood Hotel Dalat: Wi-Fi miễn phí, bữa sáng 06:30–09:00, nhà hàng, café, buồng phòng và hỗ trợ Lễ tân.', BREAKFAST_IMAGE],
    '/en/services': ['en', true, 'Hotel Services in Da Lat | Pinewood Hotel Dalat', 'Explore services at Pinewood Hotel Dalat including complimentary Wi-Fi, breakfast 06:30–09:00, restaurant and café service, housekeeping and Reception support.', BREAKFAST_IMAGE],
    '/lien-he': ['vi', true, 'Liên hệ & Chỉ đường | Pinewood Hotel Dalat', 'Liên hệ Pinewood Hotel Dalat qua điện thoại, email, Zalo hoặc Google Maps. Xem địa chỉ và mở chỉ đường tới khách sạn.', ROOM_IMAGE],
    '/en/contact': ['en', true, 'Contact & Directions | Pinewood Hotel Dalat', 'Contact Pinewood Hotel Dalat by phone, email, Zalo or Google Maps. View the hotel address and open directions.', ROOM_IMAGE],
    '/bua-sang': ['vi', false, 'Bữa sáng | Pinewood Hotel Dalat', 'Thông tin bữa sáng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', BREAKFAST_IMAGE],
    '/en/breakfast': ['en', false, 'Breakfast | Pinewood Hotel Dalat', 'Breakfast information for guests currently staying at Pinewood Hotel Dalat.', BREAKFAST_IMAGE]
  };

  function upsert(selector, attr, name, content) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attr, name);
      document.head.appendChild(node);
    }
    node.setAttribute('content', content);
  }

  function apply() {
    const data = routes[normalize(location.pathname)];
    if (!data) return;
    const [lang, indexable, title, description, image] = data;
    document.documentElement.lang = lang;
    document.title = title;
    upsert('meta[name="description"]', 'name', 'description', description);
    upsert('meta[name="robots"]', 'name', 'robots', indexable ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow');
    upsert('meta[property="og:title"]', 'property', 'og:title', title);
    upsert('meta[property="og:description"]', 'property', 'og:description', description);
    upsert('meta[property="og:image"]', 'property', 'og:image', image);
    upsert('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsert('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsert('meta[name="twitter:image"]', 'name', 'twitter:image', image);
  }

  const schedule = () => window.requestAnimationFrame(apply);
  window.addEventListener('popstate', schedule);
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
})();
