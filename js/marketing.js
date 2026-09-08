(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const config = window.HOTEL_CONFIG || {};
  const instagram = config.social?.instagram || '';
  const tiktok = config.social?.tiktok || '';
  const googleReviews = config.reviews?.googleMaps || '';
  const bookingReviews = config.reviews?.booking || '';
  const servicePhoto = '/assets/images/pinewood-services-room.jpg?v=1';
  const HOME_STYLES = '/css/home-reference.css?v=20260908h1';
  const HOME_ROOMS_ENDPOINT = '/home-rooms.json';
  let homeRoomsPromise = null;

  const homeIcon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[ch]));

  function ensureHomeStyles() {
    if (document.querySelector('link[data-home-reference-styles]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = HOME_STYLES;
    link.dataset.homeReferenceStyles = 'true';
    document.head.appendChild(link);
  }

  function bookingTarget(lang) {
    const enabled = config.booking?.enabled === true;
    const url = typeof config.booking?.url === 'string' ? config.booking.url.trim() : '';
    if (enabled && url) return { href: url, route: false };
    return { href: lang === 'en' ? '/en/contact' : '/lien-he', route: true };
  }

  function syncHomeHeader(lang) {
    document.body.classList.add('home-reference-page');
    const target = bookingTarget(lang);
    const actions = document.querySelector('.header-actions');
    if (actions && !actions.querySelector('[data-home-header-booking]')) {
      const link = document.createElement('a');
      link.className = 'home-header-booking';
      link.dataset.homeHeaderBooking = 'true';
      link.href = target.href;
      if (target.route) link.dataset.route = '';
      link.textContent = lang === 'en' ? 'Book now' : 'Đặt phòng';
      link.setAttribute('aria-label', lang === 'en' ? 'Contact Pinewood to book a room' : 'Liên hệ Pinewood để đặt phòng');
      actions.insertBefore(link, actions.querySelector('.menu-button'));
    }

    const mobile = document.getElementById('mobile-nav');
    if (mobile && !mobile.querySelector('[data-home-mobile-booking]')) {
      const link = document.createElement('a');
      link.className = 'home-mobile-booking';
      link.dataset.homeMobileBooking = 'true';
      link.href = target.href;
      if (target.route) link.dataset.route = '';
      link.textContent = lang === 'en' ? 'Book now' : 'Đặt phòng';
      mobile.appendChild(link);
    }
  }

  function cleanupHome() {
    document.body.classList.remove('home-reference-page');
    document.querySelectorAll('[data-home-header-booking], [data-home-mobile-booking]').forEach(node => node.remove());
  }

  function getHomeRooms() {
    if (!homeRoomsPromise) {
      homeRoomsPromise = fetch(HOME_ROOMS_ENDPOINT, { credentials: 'same-origin' })
        .then(response => {
          if (!response.ok) throw new Error(`Homepage room data request failed: ${response.status}`);
          return response.json();
        })
        .then(items => Array.isArray(items) ? items : [])
        .catch(() => []);
    }
    return homeRoomsPromise;
  }

  function selectHomeRooms(items) {
    const enabled = items.filter(room => room?.enabled !== false && room?.image);
    const preferred = [
      'deluxe-double-or-twin-room',
      'junior-suite-garden-view',
      'family-suite-balcony'
    ];
    const ordered = [];
    preferred.forEach(slug => {
      const room = enabled.find(item => item.slug === slug);
      if (room) ordered.push(room);
    });
    enabled.forEach(room => {
      if (!ordered.some(item => item.slug === room.slug)) ordered.push(room);
    });
    return ordered.slice(0, 3);
  }

  function roomCard(room, lang) {
    const en = lang === 'en';
    const name = en ? room.name_en : room.name_vi;
    const bed = en ? room.bed_en : room.bed_vi;
    const summary = en ? room.summary_en : room.summary_vi;
    const guests = `${room.guest_count} ${en ? (Number(room.guest_count) === 1 ? 'guest' : 'guests') : 'người'}`;
    const detail = `${en ? '/en/rooms/' : '/phong/'}#room-${encodeURIComponent(room.slug)}`;
    const alt = en ? `${name} at Pinewood Hotel Dalat` : `${name} tại Pinewood Hotel Dalat`;
    return `
      <article class="home-reference-room-card">
        <a class="home-reference-room-media" href="${detail}" aria-label="${esc(en ? `View ${name}` : `Xem ${name}`)}">
          <img src="${esc(room.image)}" width="960" height="720" loading="lazy" decoding="async" alt="${esc(alt)}" style="object-position:${esc(room.object_position || '50% 50%')}">
        </a>
        <div class="home-reference-room-copy">
          <h3>${esc(name)}</h3>
          <div class="home-reference-room-facts" aria-label="${esc(en ? 'Room facts' : 'Thông tin phòng')}">
            <span>${esc(room.size_m2)} m²</span>
            <span>${esc(bed)}</span>
            <span>${esc(guests)}</span>
          </div>
          <p class="home-reference-room-summary">${esc(summary)}</p>
          <a class="home-reference-room-link" href="${detail}">${esc(en ? 'View details' : 'Xem chi tiết')} <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
  }

  function homeReferenceMarkup(lang, rooms) {
    const en = lang === 'en';
    const target = bookingTarget(lang);
    const routeAttr = target.route ? ' data-route' : '';
    const roomCards = rooms.length
      ? rooms.map(room => roomCard(room, lang)).join('')
      : `<p class="home-reference-room-empty">${esc(en ? 'Room photography is being prepared for this preview.' : 'Hình ảnh hạng phòng đang được chuẩn bị cho khu vực xem nhanh này.')}</p>`;

    const heroTitle = en
      ? 'Sleep Well · Stay Warm<span>Feel Dalat</span>'
      : 'Ngủ ngon · Ấm áp<span>Đậm chất Đà Lạt</span>';
    const heroIntro = en
      ? 'Pinewood Hotel Dalat offers 50 spacious rooms and suites with generous layouts, natural light and a convenient location for discovering Da Lat.'
      : 'Pinewood Hotel Dalat có 50 phòng nghỉ và suite rộng rãi, nhiều ánh sáng tự nhiên cùng vị trí thuận tiện để Quý khách nghỉ ngơi và khám phá Đà Lạt.';

    return `
      <div class="home-reference">
        <section class="home-reference-hero" aria-labelledby="home-reference-title">
          <figure class="home-reference-hero-media">
            <img src="/assets/images/home/pinewood-hotel-dalat-hero.avif" width="1080" height="810" fetchpriority="high" decoding="async" alt="${esc(en ? 'Guest room at Pinewood Hotel Dalat' : 'Không gian phòng nghỉ tại Pinewood Hotel Dalat')}">
          </figure>
          <div class="home-reference-hero-overlay" aria-hidden="true"></div>
          <div class="home-reference-hero-content">
            <div class="home-reference-hero-copy">
              <p class="eyebrow">PINEWOOD HOTEL DALAT</p>
              <h1 id="home-reference-title">${heroTitle}</h1>
              <p class="home-reference-hero-intro">${esc(heroIntro)}</p>
            </div>
          </div>
          <div class="home-reference-contact-bar" aria-label="${esc(en ? 'Stay information and booking contact' : 'Thông tin lưu trú và liên hệ đặt phòng')}">
            <div class="home-reference-contact-fact"><span>${esc(en ? 'Check-in' : 'Nhận phòng')}</span><strong>${esc(config.checkIn || '14:00')}</strong></div>
            <div class="home-reference-contact-fact"><span>${esc(en ? 'Check-out' : 'Trả phòng')}</span><strong>${esc(config.checkOut || '12:00')}</strong></div>
            <div class="home-reference-contact-fact"><span>${esc(en ? 'Reception' : 'Lễ tân')}</span><strong>${esc(config.phoneDisplay || '0785 098 686')}</strong></div>
            <a class="home-reference-contact-cta" href="${esc(target.href)}"${routeAttr}>${esc(en ? 'Contact to book' : 'Liên hệ đặt phòng')} <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section class="home-reference-section home-reference-rooms" aria-labelledby="home-room-preview-title">
          <div class="shell">
            <header class="home-reference-section-head">
              <div>
                <p class="eyebrow">${esc(en ? 'ROOM TYPES' : 'CÁC HẠNG PHÒNG')}</p>
                <h2 id="home-room-preview-title">${esc(en ? 'Find the space that feels right for your stay' : 'Lựa chọn không gian phù hợp cho kỳ nghỉ của bạn')}</h2>
              </div>
              <a class="home-reference-section-link" href="${en ? '/en/rooms/' : '/phong/'}">${esc(en ? 'View all room types' : 'Xem tất cả hạng phòng')} <span aria-hidden="true">→</span></a>
            </header>
            <div class="home-reference-room-grid">${roomCards}</div>
          </div>
        </section>

        <section class="home-reference-amenities" aria-labelledby="home-amenities-title">
          <div class="shell home-reference-amenities-panel">
            <div class="home-reference-amenities-copy">
              <p class="eyebrow">${esc(en ? 'FEATURED AMENITIES' : 'TIỆN NGHI NỔI BẬT')}</p>
              <h2 id="home-amenities-title">${esc(en ? 'Thoughtful essentials for your Pinewood stay' : 'Những tiện nghi đồng hành cùng kỳ nghỉ')}</h2>
            </div>
            <div class="home-reference-amenity-grid">
              <div class="home-reference-amenity">${homeIcon('coffee')}<strong>${esc(en ? 'Breakfast' : 'Bữa sáng')}</strong><span>06:30 — 09:00</span></div>
              <div class="home-reference-amenity">${homeIcon('wifi')}<strong>${esc(en ? 'Complimentary Wi-Fi' : 'Wi-Fi miễn phí')}</strong><span>${esc(en ? 'Rooms & public areas' : 'Trong phòng & khu vực công cộng')}</span></div>
              <div class="home-reference-amenity">${homeIcon('bed')}<strong>${esc(en ? 'Housekeeping support' : 'Hỗ trợ buồng phòng')}</strong><span>${esc(en ? 'Contact Reception when needed' : 'Liên hệ Lễ tân khi cần')}</span></div>
              <div class="home-reference-amenity">${homeIcon('phone')}<strong>${esc(en ? 'Reception support' : 'Hỗ trợ Lễ tân')}</strong><span>${esc(config.phoneDisplay || '0785 098 686')}</span></div>
              <div class="home-reference-amenity">${homeIcon('shield')}<strong>${esc(en ? 'Safety information' : 'Thông tin an toàn')}</strong><span>${esc(en ? 'Emergency guidance available' : 'Có hướng dẫn khẩn cấp')}</span></div>
            </div>
          </div>
        </section>

        <section class="home-reference-location" aria-labelledby="home-location-title">
          <div class="shell">
            <div class="home-reference-location-copy">
              <p class="eyebrow">${esc(en ? 'LOCATION' : 'VỊ TRÍ')}</p>
              <h2 id="home-location-title">${esc(en ? 'Begin your Da Lat journey at Pinewood' : 'Bắt đầu hành trình Đà Lạt từ Pinewood')}</h2>
              <p>${esc(en ? 'From Pinewood, guests can easily move around the city and discover Da Lat at your own pace.' : 'Từ Pinewood, Quý khách có thể dễ dàng lên kế hoạch để nghỉ ngơi, di chuyển và khám phá thành phố theo nhịp riêng của Quý khách.')}</p>
              <a class="home-reference-location-cta" href="${en ? '/en/location' : '/vi-tri'}" data-route>${esc(en ? 'Explore location' : 'Xem vị trí')} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section class="home-reference-reviews" aria-labelledby="home-reviews-title">
          <div class="shell home-reference-review-layout">
            <div class="home-reference-reviews-copy">
              <p class="eyebrow">${esc(en ? 'GUEST REVIEWS' : 'KHÁCH HÀNG NÓI VỀ CHÚNG TÔI')}</p>
              <h2 id="home-reviews-title">${esc(en ? 'Guest feedback from trusted sources' : 'Những đánh giá thực tế từ khách lưu trú')}</h2>
            </div>
            <div class="home-reference-review-links">
              <a class="home-reference-review-link" href="${esc(bookingReviews)}" target="_blank" rel="noopener noreferrer"><strong>Booking.com</strong><span>${esc(en ? 'View guest reviews' : 'Xem đánh giá khách')} →</span></a>
              <a class="home-reference-review-link" href="${esc(googleReviews)}" target="_blank" rel="noopener noreferrer"><strong>Google</strong><span>${esc(en ? 'View Google reviews' : 'Xem đánh giá Google')} →</span></a>
            </div>
          </div>
        </section>
      </div>`;
  }

  async function renderHomeReference(lang, main) {
    ensureHomeStyles();
    syncHomeHeader(lang);
    const expectedPath = normalize(location.pathname);
    const items = await getHomeRooms();
    if (normalize(location.pathname) !== expectedPath || (expectedPath !== '/' && expectedPath !== '/en')) return;
    const rooms = selectHomeRooms(items);
    main.innerHTML = homeReferenceMarkup(lang, rooms);
  }

  function servicePhotoMarkup(lang) {
    const en = lang === 'en';
    return `<section class="service-photo-band" id="seo-service-photo"><div class="shell"><figure class="hotel-photo-card"><a href="${en ? '/en/rooms/' : '/phong/'}"><img src="${servicePhoto}" width="1200" height="675" loading="lazy" decoding="async" alt="${en ? 'Pinewood Hotel Dalat room interior, beds and bathroom amenities' : 'Không gian phòng nghỉ, giường và tiện nghi phòng tắm tại Pinewood Hotel Dalat'}"><figcaption><strong>${en ? 'Comfort prepared for your stay' : 'Tiện nghi được chuẩn bị cho kỳ nghỉ'}</strong>${en ? 'Thoughtful in-room amenities, comfortable beds and a well-equipped bathroom help make each stay at Pinewood feel easy and restful.' : 'Không gian phòng nghỉ, giường ngủ thoải mái và phòng tắm đầy đủ tiện nghi giúp kỳ lưu trú tại Pinewood trở nên dễ chịu và thư thái hơn.'}</figcaption></a></figure></div></section>`;
  }

  function contactFaqMarkup(lang) {
    const en = lang === 'en';
    return `
      <section class="page-section" id="contact-faq" aria-labelledby="contact-faq-title">
        <div class="shell">
          <div class="seo-faq">
            <h2 id="contact-faq-title">${en ? 'Frequently asked before contacting us' : 'Câu hỏi thường gặp trước khi liên hệ'}</h2>
            <details><summary>${en ? 'Where is Pinewood Hotel Dalat located?' : 'Pinewood Hotel Dalat ở đâu?'}</summary><p>${en ? 'The hotel is at 54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam.' : 'Khách sạn nằm tại 54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam.'}</p></details>
            <details><summary>${en ? 'What time are check-in and check-out?' : 'Giờ nhận và trả phòng là khi nào?'}</summary><p>${en ? 'Standard check-in is 14:00 and standard check-out is 12:00. Contact Reception if you need support with a different schedule.' : 'Giờ nhận phòng tiêu chuẩn là 14:00 và giờ trả phòng là 12:00. Nếu cần lịch khác, Quý khách vui lòng liên hệ Lễ tân để kiểm tra khả năng hỗ trợ.'}</p></details>
            <details><summary>${en ? 'When is breakfast served?' : 'Bữa sáng được phục vụ lúc nào?'}</summary><p>${en ? 'Breakfast is served daily at the hotel restaurant from 06:30 to 09:00.' : 'Bữa sáng được phục vụ hằng ngày tại nhà hàng của khách sạn từ 06:30 đến 09:00.'}</p></details>
            <details><summary>${en ? 'Where can I read guest reviews?' : 'Xem đánh giá của khách ở đâu?'}</summary><p>${en ? 'You can open Pinewood Hotel Dalat on Google Maps to read recent guest reviews and ratings.' : 'Quý khách có thể mở Pinewood Hotel Dalat trên Google Maps để xem các đánh giá và nhận xét mới nhất của khách hàng.'}</p></details>
          </div>
          <div class="seo-social-strip" aria-label="${en ? 'Reviews and official social links' : 'Đánh giá và mạng xã hội chính thức'}">
            <a href="${googleReviews}" target="_blank" rel="noopener noreferrer">${en ? 'View Google Maps reviews' : 'Xem đánh giá trên Google Maps'}</a>
            <a href="${instagram}" target="_blank" rel="me noopener noreferrer">Instagram</a>
            <a href="${tiktok}" target="_blank" rel="me noopener noreferrer">TikTok</a>
            <a href="${bookingReviews}" target="_blank" rel="noopener noreferrer">${en ? 'View guest reviews on Booking.com' : 'Xem đánh giá khách trên Booking.com'}</a>
          </div>
        </div>
      </section>`;
  }

  function injectContactFaqSchema(lang) {
    const en = lang === 'en';
    let node = document.getElementById('seo-contact-faq-schema');
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = 'seo-contact-faq-schema';
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: en ? 'Where is Pinewood Hotel Dalat located?' : 'Pinewood Hotel Dalat ở đâu?', acceptedAnswer: { '@type': 'Answer', text: en ? '54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam.' : '54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam.' } },
        { '@type': 'Question', name: en ? 'What time are check-in and check-out?' : 'Giờ nhận và trả phòng là khi nào?', acceptedAnswer: { '@type': 'Answer', text: en ? 'Standard check-in is 14:00 and standard check-out is 12:00.' : 'Giờ nhận phòng tiêu chuẩn là 14:00 và giờ trả phòng là 12:00.' } },
        { '@type': 'Question', name: en ? 'When is breakfast served?' : 'Bữa sáng được phục vụ lúc nào?', acceptedAnswer: { '@type': 'Answer', text: en ? 'Breakfast is served daily from 06:30 to 09:00.' : 'Bữa sáng được phục vụ hằng ngày từ 06:30 đến 09:00.' } },
        { '@type': 'Question', name: en ? 'Where can I read guest reviews?' : 'Xem đánh giá của khách ở đâu?', acceptedAnswer: { '@type': 'Answer', text: en ? 'Open Pinewood Hotel Dalat on Google Maps to read recent guest reviews and ratings.' : 'Mở Pinewood Hotel Dalat trên Google Maps để xem đánh giá và nhận xét mới nhất của khách hàng.' } }
      ]
    });
  }

  function clearFaqSchemas() {
    document.getElementById('seo-home-faq-schema')?.remove();
    document.getElementById('seo-contact-faq-schema')?.remove();
  }

  function enhance() {
    const path = normalize(location.pathname);
    const main = document.getElementById('main-content');
    if (!main) return;

    const isHome = path === '/' || path === '/en';
    const isContact = path === '/lien-he' || path === '/en/contact';

    if (isHome) {
      const lang = path === '/en' ? 'en' : 'vi';
      clearFaqSchemas();
      renderHomeReference(lang, main);
      return;
    }

    cleanupHome();

    if (path === '/dich-vu' && !document.getElementById('seo-service-photo')) {
      main.insertAdjacentHTML('beforeend', servicePhotoMarkup('vi'));
    } else if (path === '/en/services' && !document.getElementById('seo-service-photo')) {
      main.insertAdjacentHTML('beforeend', servicePhotoMarkup('en'));
    }

    if (isContact) {
      const lang = path === '/en/contact' ? 'en' : 'vi';
      if (!document.getElementById('contact-faq')) main.insertAdjacentHTML('beforeend', contactFaqMarkup(lang));
      injectContactFaqSchema(lang);
    } else {
      document.getElementById('seo-contact-faq-schema')?.remove();
    }
    document.getElementById('seo-home-faq-schema')?.remove();
  }

  const schedule = () => window.requestAnimationFrame(enhance);
  ['pushState', 'replaceState'].forEach(name => {
    const original = history[name];
    history[name] = function (...args) {
      const result = original.apply(this, args);
      schedule();
      return result;
    };
  });
  addEventListener('popstate', schedule);
  addEventListener('DOMContentLoaded', schedule, { once: true });
  schedule();
})();
