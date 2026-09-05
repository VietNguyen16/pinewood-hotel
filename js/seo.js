(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const ROOM_IMAGE = `${BASE}/assets/images/pinewood-room-home.webp`;
  const BREAKFAST_IMAGE = `${BASE}/assets/images/pinewood-breakfast-buffet-1600.webp`;
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const routes = {
    '/': { lang:'vi', indexable:true, title:'Pinewood Hotel Dalat | Khách sạn Đà Lạt', description:'Pinewood Hotel Dalat mang đến không gian nghỉ dưỡng ấm áp, phòng nghỉ tiện nghi và vị trí thuận tiện tại Đà Lạt. Xem phòng, dịch vụ và chỉ đường.', image:ROOM_IMAGE, canonical:'/', vi:'/', en:'/en/' },
    '/en': { lang:'en', indexable:true, title:'Pinewood Hotel Dalat | Hotel in Da Lat', description:'Discover Pinewood Hotel Dalat with comfortable rooms, warm hospitality and a convenient Da Lat location. Explore rooms, services and directions.', image:ROOM_IMAGE, canonical:'/en/', vi:'/', en:'/en/' },
    '/dich-vu': { lang:'vi', indexable:true, title:'Dịch vụ khách sạn tại Đà Lạt | Pinewood Hotel Dalat', description:'Khám phá dịch vụ tại Pinewood Hotel Dalat: Wi-Fi miễn phí, bữa sáng 06:30–09:00, nhà hàng, café, buồng phòng và hỗ trợ Lễ tân.', image:BREAKFAST_IMAGE, canonical:'/dich-vu/', vi:'/dich-vu/', en:'/en/services/' },
    '/en/services': { lang:'en', indexable:true, title:'Hotel Services in Da Lat | Pinewood Hotel Dalat', description:'Explore services at Pinewood Hotel Dalat including complimentary Wi-Fi, breakfast 06:30–09:00, restaurant and café service, housekeeping and Reception support.', image:BREAKFAST_IMAGE, canonical:'/en/services/', vi:'/dich-vu/', en:'/en/services/' },
    '/lien-he': { lang:'vi', indexable:true, title:'Liên hệ & Chỉ đường | Pinewood Hotel Dalat', description:'Liên hệ Pinewood Hotel Dalat qua điện thoại, email, Zalo hoặc Google Maps. Xem địa chỉ và mở chỉ đường tới khách sạn.', image:ROOM_IMAGE, canonical:'/lien-he/', vi:'/lien-he/', en:'/en/contact/' },
    '/en/contact': { lang:'en', indexable:true, title:'Contact & Directions | Pinewood Hotel Dalat', description:'Contact Pinewood Hotel Dalat by phone, email, Zalo or Google Maps. View the hotel address and open directions.', image:ROOM_IMAGE, canonical:'/en/contact/', vi:'/lien-he/', en:'/en/contact/' },
    '/moi-truong': { lang:'vi', indexable:true, title:'Lưu trú có trách nhiệm | Pinewood Hotel Dalat', description:'Tìm hiểu các hướng dẫn sử dụng tài nguyên có trách nhiệm và bảo vệ môi trường dành cho khách tại Pinewood Hotel Dalat, Đà Lạt.', image:ROOM_IMAGE, canonical:'/moi-truong/', vi:'/moi-truong/', en:'/en/environment/' },
    '/en/environment': { lang:'en', indexable:true, title:'Responsible Stay | Pinewood Hotel Dalat', description:'Read practical guidance for responsible resource use and environmental care during your stay at Pinewood Hotel Dalat in Da Lat.', image:ROOM_IMAGE, canonical:'/en/environment/', vi:'/moi-truong/', en:'/en/environment/' },
    '/bua-sang': { lang:'vi', indexable:false, title:'Bữa sáng | Pinewood Hotel Dalat', description:'Thông tin bữa sáng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', image:BREAKFAST_IMAGE, canonical:'/bua-sang/', vi:'/bua-sang/', en:'/en/breakfast/' },
    '/en/breakfast': { lang:'en', indexable:false, title:'Breakfast | Pinewood Hotel Dalat', description:'Breakfast information for guests currently staying at Pinewood Hotel Dalat.', image:BREAKFAST_IMAGE, canonical:'/en/breakfast/', vi:'/bua-sang/', en:'/en/breakfast/' },
    '/wifi': { lang:'vi', indexable:false, title:'Wi-Fi | Pinewood Hotel Dalat', description:'Thông tin Wi-Fi dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/wifi/', vi:'/wifi/', en:'/en/wifi/' },
    '/en/wifi': { lang:'en', indexable:false, title:'Wi-Fi | Pinewood Hotel Dalat', description:'Wi-Fi information for guests currently staying at Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/en/wifi/', vi:'/wifi/', en:'/en/wifi/' },
    '/noi-quy': { lang:'vi', indexable:false, title:'Quy định khách sạn | Pinewood Hotel Dalat', description:'Quy định và thông tin dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/noi-quy/', vi:'/noi-quy/', en:'/en/hotel-rules/' },
    '/en/hotel-rules': { lang:'en', indexable:false, title:'Hotel Rules | Pinewood Hotel Dalat', description:'Hotel rules and guest information for visitors currently staying at Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/en/hotel-rules/', vi:'/noi-quy/', en:'/en/hotel-rules/' },
    '/an-toan': { lang:'vi', indexable:false, title:'An toàn & khẩn cấp | Pinewood Hotel Dalat', description:'Thông tin an toàn và hướng dẫn khẩn cấp dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/an-toan/', vi:'/an-toan/', en:'/en/safety/' },
    '/en/safety': { lang:'en', indexable:false, title:'Safety & Emergency | Pinewood Hotel Dalat', description:'Safety and emergency information for guests currently staying at Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/en/safety/', vi:'/an-toan/', en:'/en/safety/' },
    '/thu-chao-mung': { lang:'vi', indexable:false, title:'Thư chào mừng | Pinewood Hotel Dalat', description:'Thư chào mừng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/thu-chao-mung/', vi:'/thu-chao-mung/', en:'/en/welcome/' },
    '/en/welcome': { lang:'en', indexable:false, title:'Welcome | Pinewood Hotel Dalat', description:'Welcome information for guests currently staying at Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/en/welcome/', vi:'/thu-chao-mung/', en:'/en/welcome/' },
    '/thong-tin': { lang:'vi', indexable:false, title:'Thông tin khách sạn | Pinewood Hotel Dalat', description:'Thông tin tổng hợp dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/thong-tin/', vi:'/thong-tin/', en:'/en/hotel-information/' },
    '/en/hotel-information': { lang:'en', indexable:false, title:'Hotel Information | Pinewood Hotel Dalat', description:'Complete guest information for visitors currently staying at Pinewood Hotel Dalat.', image:ROOM_IMAGE, canonical:'/en/hotel-information/', vi:'/thong-tin/', en:'/en/hotel-information/' }
  };

  function upsertMeta(selector, attr, name, content) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attr, name);
      document.head.appendChild(node);
    }
    node.setAttribute('content', content);
  }

  function upsertLink(selector, rel, href, hreflang) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('link');
      node.rel = rel;
      if (hreflang) node.hreflang = hreflang;
      document.head.appendChild(node);
    }
    node.href = href;
  }

  function absolute(path) { return new URL(path, BASE).href; }

  function apply(pathname = location.pathname) {
    const data = routes[normalize(pathname)];
    if (!data) return;
    const canonical = absolute(data.canonical);
    document.documentElement.lang = data.lang;
    document.title = data.title;
    upsertMeta('meta[name="description"]', 'name', 'description', data.description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', data.indexable ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow');
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', data.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', data.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', data.image);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', data.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', data.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', data.image);
    upsertLink('link[rel="canonical"]', 'canonical', canonical);
    upsertLink('link[rel="alternate"][hreflang="vi"]', 'alternate', absolute(data.vi), 'vi');
    upsertLink('link[rel="alternate"][hreflang="en"]', 'alternate', absolute(data.en), 'en');
    upsertLink('link[rel="alternate"][hreflang="x-default"]', 'alternate', `${BASE}/`, 'x-default');
  }

  window.PINEWOOD_APPLY_SEO = apply;
  document.addEventListener('DOMContentLoaded', () => apply(), { once:true });
  window.addEventListener('popstate', () => apply());
})();
