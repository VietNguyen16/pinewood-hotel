(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const config = window.HOTEL_CONFIG || {};
  const instagram = config.social?.instagram || '';
  const tiktok = config.social?.tiktok || '';
  const googleReviews = config.reviews?.googleMaps || '';
  const bookingReviews = config.reviews?.booking || '';
  const servicePhoto = '/assets/images/pinewood-services-room.jpg?v=1';
  const HOME_STYLES = '/css/home-reference.css?v=20260908h2';
  const HOME_ROOMS_ENDPOINT = '/home-rooms.json';
  const BOOKING_SOURCE = 'homepage-estimator';
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

  function contactPath(lang) {
    return lang === 'en' ? '/en/contact/' : '/lien-he/';
  }

  function syncHomeHeader(lang) {
    document.body.classList.add('home-reference-page');
    const actions = document.querySelector('.header-actions');
    if (actions && !actions.querySelector('[data-home-header-booking]')) {
      const link = document.createElement('a');
      link.className = 'home-header-booking';
      link.dataset.homeHeaderBooking = 'true';
      link.href = '#home-booking-estimator';
      link.textContent = lang === 'en' ? 'Book now' : 'Đặt phòng';
      link.setAttribute('aria-label', lang === 'en' ? 'Choose stay dates and prepare a booking request' : 'Chọn ngày lưu trú và chuẩn bị yêu cầu đặt phòng');
      actions.insertBefore(link, actions.querySelector('.menu-button'));
    }

    const mobile = document.getElementById('mobile-nav');
    if (mobile && !mobile.querySelector('[data-home-mobile-booking]')) {
      const link = document.createElement('a');
      link.className = 'home-mobile-booking';
      link.dataset.homeMobileBooking = 'true';
      link.href = '#home-booking-estimator';
      link.textContent = lang === 'en' ? 'Book now' : 'Đặt phòng';
      link.addEventListener('click', () => {
        const menuButton = document.getElementById('menu-button');
        if (menuButton?.getAttribute('aria-expanded') === 'true') menuButton.click();
      });
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
    const enabled = items.filter(room => room?.enabled !== false);
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
    const view = en ? room.view_en : room.view_vi;
    const guests = `${room.guest_count} ${en ? (Number(room.guest_count) === 1 ? 'guest' : 'guests') : 'người'}`;
    const detail = `${en ? '/en/rooms/' : '/phong/'}#room-${encodeURIComponent(room.slug)}`;
    const alt = en ? `${name} at Pinewood Hotel Dalat` : `${name} tại Pinewood Hotel Dalat`;
    const media = room.image ? `
        <a class="home-reference-room-media" href="${detail}" aria-label="${esc(en ? `View ${name}` : `Xem ${name}`)}">
          <img src="${esc(room.image)}" width="960" height="720" loading="lazy" decoding="async" alt="${esc(alt)}" style="object-position:${esc(room.object_position || '50% 50%')}">
        </a>` : '';
    return `
      <article class="home-reference-room-card${room.image ? '' : ' no-image'}">
        ${media}
        <div class="home-reference-room-copy">
          <h3>${esc(name)}</h3>
          <div class="home-reference-room-facts" aria-label="${esc(en ? 'Room facts' : 'Thông tin phòng')}">
            <span>${esc(room.size_m2)} m²</span>
            <span>${esc(bed)}</span>
            <span>${esc(guests)}</span>
            <span>${esc(view)}</span>
          </div>
          <p class="home-reference-room-summary">${esc(summary)}</p>
          <a class="home-reference-room-link" href="${detail}">${esc(en ? 'View details' : 'Xem chi tiết')} <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
  }

  function bookingRoomOptions(items, lang) {
    const en = lang === 'en';
    const enabled = items.filter(room => room?.enabled !== false);
    if (!enabled.length) return `<option value="">${esc(en ? 'Contact Pinewood for room advice' : 'Liên hệ Pinewood để được tư vấn phòng')}</option>`;
    return enabled.map(room => {
      const name = en ? room.name_en : room.name_vi;
      const capacity = Number(room.guest_count) || 0;
      const capacityText = capacity ? ` · ${capacity} ${en ? (capacity === 1 ? 'guest' : 'guests') : 'khách'}` : '';
      return `<option value="${esc(room.slug)}">${esc(name + capacityText)}</option>`;
    }).join('');
  }

  function parseVnd(value) {
    const digits = String(value ?? '').replace(/\D/g, '');
    return digits ? Number(digits) : null;
  }

  function isoToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function isoUtcDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function addIsoDays(value, days) {
    const date = isoUtcDate(value);
    if (!date) return '';
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function rateForNight(room, date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    if (year === 2027 && month === 1 && (day === 1 || day === 2)) return parseVnd(room.rate_holiday_tet_vnd);
    if (year === 2027 && month === 2 && day >= 5 && day <= 14) return parseVnd(room.rate_holiday_tet_vnd);
    if (year === 2026 && [9, 10, 11].includes(month)) return parseVnd(room.rate_low_vnd);
    if (year === 2026 && month === 12) return parseVnd(room.rate_dec_2026_vnd);
    if (year === 2027 && [1, 2].includes(month)) return parseVnd(room.rate_jan_feb_2027_vnd);
    return null;
  }

  function estimateStay(room, checkIn, checkOut) {
    const start = isoUtcDate(checkIn);
    const end = isoUtcDate(checkOut);
    if (!room || !start || !end || end <= start) return { valid: false, nights: 0, total: null, unknown: false, mixed: false };

    const nights = Math.round((end - start) / 86400000);
    if (nights < 1 || nights > 60) return { valid: false, nights, total: null, unknown: false, mixed: false };

    let total = 0;
    const nightlyRates = [];
    const cursor = new Date(start.getTime());
    while (cursor < end) {
      const rate = rateForNight(room, cursor);
      if (!rate) return { valid: true, nights, total: null, unknown: true, mixed: false };
      nightlyRates.push(rate);
      total += rate;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return { valid: true, nights, total, unknown: false, mixed: new Set(nightlyRates).size > 1 };
  }

  function formatMoney(amount, lang) {
    if (!Number.isFinite(amount)) return '';
    if (lang === 'en') return `${new Intl.NumberFormat('en-US').format(amount)} VND`;
    return `${new Intl.NumberFormat('vi-VN').format(amount)} ₫`;
  }

  function formatDate(value, lang) {
    const date = isoUtcDate(value);
    if (!date) return value || '';
    return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'vi-VN', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  function bookingContactHref(lang, room, values, estimate) {
    const url = new URL(contactPath(lang), location.origin);
    url.searchParams.set('source', BOOKING_SOURCE);
    if (room) {
      url.searchParams.set('room', room.slug || '');
      url.searchParams.set('room_name', lang === 'en' ? room.name_en : room.name_vi);
    }
    if (values.checkIn) url.searchParams.set('checkin', values.checkIn);
    if (values.checkOut) url.searchParams.set('checkout', values.checkOut);
    if (values.guests) url.searchParams.set('guests', values.guests);
    if (estimate?.valid) url.searchParams.set('nights', String(estimate.nights));
    if (Number.isFinite(estimate?.total)) url.searchParams.set('estimate', String(estimate.total));
    url.hash = 'booking-request';
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function bindHomeBookingEstimator(lang, items) {
    const form = document.getElementById('home-booking-estimator');
    if (!form) return;

    const checkIn = form.querySelector('[name="checkin"]');
    const checkOut = form.querySelector('[name="checkout"]');
    const roomSelect = form.querySelector('[name="room"]');
    const guestSelect = form.querySelector('[name="guests"]');
    const estimateValue = form.querySelector('[data-booking-estimate]');
    const estimateNote = form.querySelector('[data-booking-estimate-note]');
    const contactLink = form.querySelector('[data-booking-contact]');
    const today = isoToday();

    checkIn.min = today;
    if (!checkIn.value) checkIn.value = addIsoDays(today, 1);
    checkOut.min = addIsoDays(checkIn.value, 1);
    if (!checkOut.value || checkOut.value <= checkIn.value) checkOut.value = addIsoDays(checkIn.value, 1);

    const update = () => {
      if (checkIn.value) {
        checkOut.min = addIsoDays(checkIn.value, 1);
        if (!checkOut.value || checkOut.value <= checkIn.value) checkOut.value = addIsoDays(checkIn.value, 1);
      }

      const room = items.find(item => item.slug === roomSelect.value) || items.find(item => item?.enabled !== false) || null;
      const guests = Number(guestSelect.value || 0);
      const capacity = Number(room?.guest_count || 0);
      const estimate = estimateStay(room, checkIn.value, checkOut.value);
      const overCapacity = capacity > 0 && guests > capacity;

      let title;
      let note;
      if (!estimate.valid) {
        title = lang === 'en' ? 'Choose valid stay dates' : 'Chọn ngày lưu trú hợp lệ';
        note = lang === 'en' ? 'The estimate is for one room and does not confirm availability.' : 'Tạm tính áp dụng cho 1 phòng và không xác nhận tình trạng phòng.';
      } else if (overCapacity) {
        title = lang === 'en' ? 'Contact Pinewood for the right room setup' : 'Liên hệ Pinewood để tư vấn hạng phòng phù hợp';
        note = lang === 'en' ? `This room is currently listed for up to ${capacity} guests.` : `Hạng phòng này hiện được ghi nhận tối đa ${capacity} khách.`;
      } else if (estimate.unknown) {
        title = lang === 'en' ? 'Rate confirmation required' : 'Cần xác nhận giá với Pinewood';
        note = lang === 'en' ? 'The supplied rate table does not cover every selected night.' : 'Bảng giá hiện tại chưa bao phủ toàn bộ các đêm bạn đã chọn.';
      } else {
        title = formatMoney(estimate.total, lang);
        note = lang === 'en'
          ? `${estimate.nights} ${estimate.nights === 1 ? 'night' : 'nights'} · estimated room charge for 1 room${estimate.mixed ? ' · nightly rates vary by date' : ''}`
          : `${estimate.nights} đêm · tạm tính tiền phòng cho 1 phòng${estimate.mixed ? ' · có nhiều mức giá theo ngày' : ''}`;
      }

      estimateValue.textContent = title;
      estimateNote.textContent = note;
      contactLink.href = bookingContactHref(lang, room, { checkIn: checkIn.value, checkOut: checkOut.value, guests: guestSelect.value }, overCapacity ? { ...estimate, total: null } : estimate);
    };

    ['change', 'input'].forEach(type => form.addEventListener(type, update));
    update();
  }

  function homeReferenceMarkup(lang, rooms, catalog) {
    const en = lang === 'en';
    const roomCards = rooms.length
      ? rooms.map(room => roomCard(room, lang)).join('')
      : `<p class="home-reference-room-empty">${esc(en ? 'Room photography is being prepared for this preview.' : 'Hình ảnh hạng phòng đang được chuẩn bị cho khu vực xem nhanh này.')}</p>`;

    const heroTitle = en
      ? 'Sleep Well · Stay Warm<em>Feel Dalat</em>'
      : 'Ngủ ngon · Ấm áp<em>Đậm chất Đà Lạt</em>';
    const heroIntro = en
      ? 'Pinewood Hotel Dalat offers 50 rooms across eight room types, with clear room information and a convenient base for discovering Da Lat.'
      : 'Pinewood Hotel Dalat có 50 phòng thuộc 8 hạng phòng, với thông tin rõ ràng và vị trí thuận tiện để Quý khách nghỉ ngơi, khám phá Đà Lạt.';

    return `
      <div class="home-reference">
        <section class="home-reference-hero" aria-labelledby="home-reference-title">
          <figure class="home-reference-hero-media">
            <picture>
              <source media="(max-width: 720px)" srcset="/assets/images/home/pinewood-hotel-dalat-hero-720.avif">
              <img src="/assets/images/home/pinewood-hotel-dalat-hero.avif" width="1080" height="810" fetchpriority="high" decoding="async" alt="${esc(en ? 'Guest room at Pinewood Hotel Dalat' : 'Không gian phòng nghỉ tại Pinewood Hotel Dalat')}">
            </picture>
          </figure>
          <div class="home-reference-hero-overlay" aria-hidden="true"></div>
          <div class="home-reference-hero-content">
            <div class="home-reference-hero-copy">
              <p class="eyebrow">PINEWOOD HOTEL DALAT</p>
              <h1 id="home-reference-title">${heroTitle}</h1>
              <p class="home-reference-hero-intro">${esc(heroIntro)}</p>
            </div>
          </div>
        </section>

        <section class="home-reference-booking-section" aria-label="${esc(en ? 'Stay date and price estimator' : 'Chọn ngày lưu trú và tạm tính giá')}">
          <div class="shell">
            <form class="home-reference-booking-bar" id="home-booking-estimator" novalidate>
              <div class="home-reference-booking-grid">
                <label class="home-reference-booking-field">
                  <span>${esc(en ? 'Check-in' : 'Nhận phòng')}</span>
                  <input type="date" name="checkin" required>
                </label>
                <label class="home-reference-booking-field">
                  <span>${esc(en ? 'Check-out' : 'Trả phòng')}</span>
                  <input type="date" name="checkout" required>
                </label>
                <label class="home-reference-booking-field home-reference-booking-room">
                  <span>${esc(en ? 'Room type' : 'Hạng phòng')}</span>
                  <select name="room">${bookingRoomOptions(catalog, lang)}</select>
                </label>
                <label class="home-reference-booking-field">
                  <span>${esc(en ? 'Guests' : 'Số khách')}</span>
                  <select name="guests">
                    ${Array.from({ length: 8 }, (_, index) => `<option value="${index + 1}"${index === 1 ? ' selected' : ''}>${index + 1}</option>`).join('')}
                  </select>
                </label>
                <a class="home-reference-booking-submit" data-booking-contact href="${contactPath(lang)}">${esc(en ? 'BOOK NOW' : 'ĐẶT PHÒNG')} <span aria-hidden="true">→</span></a>
              </div>
              <div class="home-reference-booking-summary" aria-live="polite">
                <div><span>${esc(en ? 'Estimated total' : 'Tạm tính')}</span><strong data-booking-estimate>${esc(en ? 'Choose stay dates' : 'Chọn ngày lưu trú')}</strong></div>
                <p data-booking-estimate-note>${esc(en ? 'Estimate only. Pinewood confirms final price and availability.' : 'Chỉ là tạm tính. Pinewood sẽ xác nhận giá cuối cùng và tình trạng phòng.')}</p>
              </div>
            </form>
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
    main.innerHTML = homeReferenceMarkup(lang, rooms, items);
    bindHomeBookingEstimator(lang, items);
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

  function bookingRequestFromUrl(lang) {
    const params = new URLSearchParams(location.search);
    if (params.get('source') !== BOOKING_SOURCE) return null;

    const roomName = params.get('room_name') || (lang === 'en' ? 'Room type to be confirmed' : 'Hạng phòng cần xác nhận');
    const checkIn = params.get('checkin') || '';
    const checkOut = params.get('checkout') || '';
    const guests = Number(params.get('guests') || 0);
    const nights = Number(params.get('nights') || 0);
    const estimate = Number(params.get('estimate') || 0);

    if (!checkIn || !checkOut) return null;

    const lines = lang === 'en'
      ? [
          'Hello Pinewood Hotel Dalat,',
          '',
          'I would like to request a room booking with the following details:',
          `- Room type: ${roomName}`,
          `- Check-in: ${formatDate(checkIn, lang)}`,
          `- Check-out: ${formatDate(checkOut, lang)}`,
          nights ? `- Nights: ${nights}` : null,
          guests ? `- Guests: ${guests}` : null,
          estimate ? `- Estimated room charge from the published rate table: ${formatMoney(estimate, lang)}` : '- Estimated room charge: Please confirm with Pinewood',
          '',
          'Please check room availability and confirm the final rate for these dates. Thank you.'
        ]
      : [
          'Xin chào Pinewood Hotel Dalat,',
          '',
          'Tôi muốn hỏi đặt phòng với thông tin sau:',
          `- Hạng phòng: ${roomName}`,
          `- Nhận phòng: ${formatDate(checkIn, lang)}`,
          `- Trả phòng: ${formatDate(checkOut, lang)}`,
          nights ? `- Số đêm: ${nights}` : null,
          guests ? `- Số khách: ${guests}` : null,
          estimate ? `- Tạm tính tiền phòng theo bảng giá hiện tại: ${formatMoney(estimate, lang)}` : '- Tạm tính tiền phòng: Nhờ Pinewood xác nhận',
          '',
          'Nhờ Pinewood kiểm tra tình trạng phòng và xác nhận giá cuối cùng cho các ngày trên. Cảm ơn!'
        ];

    return {
      roomName,
      checkIn,
      checkOut,
      guests,
      nights,
      estimate,
      message: lines.filter(Boolean).join('\n')
    };
  }

  function bookingRequestMarkup(lang, request) {
    const en = lang === 'en';
    const subject = en ? `Room booking request - ${request.roomName}` : `Yêu cầu đặt phòng - ${request.roomName}`;
    const emailHref = `mailto:${config.email || 'info@pinewoodhotel.vn'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(request.message)}`;
    return `
      <section class="page-section booking-request-section" id="booking-request" aria-labelledby="booking-request-title">
        <div class="shell">
          <article class="content-card booking-request-prefill">
            <p class="eyebrow">${esc(en ? 'BOOKING REQUEST' : 'YÊU CẦU ĐẶT PHÒNG')}</p>
            <h2 id="booking-request-title">${esc(en ? 'Your stay details are ready to send' : 'Nội dung yêu cầu đã được soạn sẵn')}</h2>
            <p>${esc(en ? 'This is a booking request, not a confirmed reservation. Pinewood will confirm availability and the final rate.' : 'Đây là yêu cầu đặt phòng, chưa phải xác nhận đặt phòng. Pinewood sẽ kiểm tra tình trạng phòng và xác nhận giá cuối cùng.')}</p>
            <textarea class="booking-request-message" data-booking-message readonly>${esc(request.message)}</textarea>
            <div class="booking-request-actions">
              <a class="button button-primary" href="${esc(emailHref)}">${esc(en ? 'Send by email' : 'Gửi qua email')}</a>
              <button class="button booking-copy-button" type="button" data-copy-booking>${esc(en ? 'Copy message' : 'Sao chép nội dung')}</button>
            </div>
            <p class="booking-copy-status" data-copy-status aria-live="polite"></p>
          </article>
        </div>
      </section>`;
  }

  function bindBookingCopy(section, lang, message) {
    const button = section?.querySelector('[data-copy-booking]');
    const status = section?.querySelector('[data-copy-status]');
    if (!button || !status) return;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message);
        status.textContent = lang === 'en' ? 'Booking request copied.' : 'Đã sao chép nội dung yêu cầu.';
      } catch (error) {
        const textarea = section.querySelector('[data-booking-message]');
        textarea.focus();
        textarea.select();
        const copied = document.execCommand('copy');
        status.textContent = copied
          ? (lang === 'en' ? 'Booking request copied.' : 'Đã sao chép nội dung yêu cầu.')
          : (lang === 'en' ? 'Select the message and copy it manually.' : 'Hãy chọn nội dung và sao chép thủ công.');
      }
    });
  }

  function injectBookingRequest(lang, main) {
    const request = bookingRequestFromUrl(lang);
    if (!request) {
      document.getElementById('booking-request')?.remove();
      return;
    }
    ensureHomeStyles();
    let section = document.getElementById('booking-request');
    if (!section) {
      const hero = main.querySelector('.page-hero');
      if (hero) hero.insertAdjacentHTML('afterend', bookingRequestMarkup(lang, request));
      else main.insertAdjacentHTML('afterbegin', bookingRequestMarkup(lang, request));
      section = document.getElementById('booking-request');
      bindBookingCopy(section, lang, request.message);
      window.requestAnimationFrame(() => section?.scrollIntoView({ block: 'start' }));
    }
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
      injectBookingRequest(lang, main);
      if (!document.getElementById('contact-faq')) main.insertAdjacentHTML('beforeend', contactFaqMarkup(lang));
      injectContactFaqSchema(lang);
    } else {
      document.getElementById('seo-contact-faq-schema')?.remove();
      document.getElementById('booking-request')?.remove();
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
