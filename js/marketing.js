(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const instagram = 'https://www.instagram.com/pinewooddalat/';
  const tiktok = 'https://www.tiktok.com/@dalat.pinewood';
  const roomPhoto = '/assets/images/seo/pinewood-room-balcony.jpg';
  const breakfastPhoto = '/assets/images/seo/pinewood-breakfast-buffet.jpg';
  const facadePhoto = '/assets/images/seo/pinewood-hotel-facade.jpg';

  function photoGallery(lang) {
    const en = lang === 'en';
    return `
      <section class="hotel-photo-section" aria-labelledby="pinewood-photo-title">
        <header class="hotel-photo-head">
          <p class="eyebrow">${en ? 'PINEWOOD HOTEL DALAT' : 'HÌNH ẢNH PINEWOOD'}</p>
          <h2 id="pinewood-photo-title">${en ? 'A closer look at your stay in Da Lat' : 'Không gian thật tại Pinewood Hotel Dalat'}</h2>
          <p>${en ? 'Explore real hotel spaces before your stay: bright rooms, breakfast moments and the Pinewood facade in Da Lat.' : 'Khám phá hình ảnh thực tế của khách sạn tại Đà Lạt: phòng nghỉ thoáng sáng, bữa sáng và mặt tiền Pinewood.'}</p>
        </header>
        <div class="hotel-photo-grid hotel-photo-grid-3">
          <figure class="hotel-photo-card hotel-photo-card-wide">
            <a href="${en ? '/en/rooms/' : '/phong/'}">
              <img src="${roomPhoto}" width="1360" height="899" decoding="async" alt="${en ? 'Bright guest room with balcony at Pinewood Hotel Dalat in Da Lat' : 'Phòng nghỉ có ban công và ánh sáng tự nhiên tại Pinewood Hotel Dalat, Đà Lạt'}">
              <figcaption><strong>${en ? 'Rooms & suites' : 'Phòng nghỉ & suite'}</strong>${en ? 'Bright, spacious accommodation with a warm modern interior.' : 'Không gian rộng rãi, nhiều ánh sáng và nội thất ấm áp.'}</figcaption>
            </a>
          </figure>
          <figure class="hotel-photo-card">
            <a href="${en ? '/en/services/' : '/dich-vu/'}">
              <img src="${breakfastPhoto}" width="765" height="1020" loading="lazy" decoding="async" alt="${en ? 'Breakfast buffet at Pinewood Hotel Dalat in Da Lat' : 'Buffet sáng tại Pinewood Hotel Dalat ở Đà Lạt'}">
              <figcaption><strong>${en ? 'Breakfast' : 'Bữa sáng'}</strong>${en ? 'A fresh breakfast buffet served at the hotel restaurant.' : 'Buffet sáng được phục vụ tại nhà hàng của khách sạn.'}</figcaption>
            </a>
          </figure>
          <figure class="hotel-photo-card">
            <a href="${en ? '/en/location/' : '/vi-tri/'}">
              <img src="${facadePhoto}" width="900" height="1200" loading="lazy" decoding="async" alt="${en ? 'Pinewood Hotel Dalat facade at 54 Vo Truong Toan Street, Da Lat' : 'Mặt tiền Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt'}">
              <figcaption><strong>${en ? 'Hotel exterior' : 'Mặt tiền khách sạn'}</strong>${en ? 'Find Pinewood Hotel Dalat at 54 Vo Truong Toan Street.' : 'Pinewood Hotel Dalat tại 54 Võ Trường Toản.'}</figcaption>
            </a>
          </figure>
        </div>
      </section>`;
  }

  function homeMarkup(lang) {
    const en = lang === 'en';
    return `
      <section class="seo-marketing-section" id="seo-home-marketing" aria-labelledby="seo-home-title">
        <div class="shell">
          <header class="seo-marketing-head">
            <p class="eyebrow">PINEWOOD HOTEL DALAT</p>
            <h2 id="seo-home-title">${en ? 'A comfortable hotel stay in Da Lat with direct support' : 'Khách sạn tại Đà Lạt cho kỳ nghỉ thoải mái và thuận tiện'}</h2>
            <p>${en
              ? 'Pinewood Hotel Dalat at 54 Vo Truong Toan Street offers 50 spacious rooms and suites with natural light, practical guest services and direct hotel support for your Da Lat stay.'
              : 'Pinewood Hotel Dalat tại 54 Võ Trường Toản có 50 phòng nghỉ và suite rộng rãi, nhiều ánh sáng tự nhiên, dịch vụ thiết thực và hỗ trợ trực tiếp cho hành trình khám phá Đà Lạt.'}</p>
          </header>

          <div class="seo-marketing-grid">
            <article class="seo-marketing-card">
              <p class="eyebrow">${en ? 'ROOMS & SUITES' : 'PHÒNG & SUITE'}</p>
              <h3>${en ? 'Explore your stay' : 'Khám phá không gian lưu trú'}</h3>
              <p>${en ? 'See Pinewood’s accommodation, check-in information and direct contact options for current room availability.' : 'Xem không gian phòng nghỉ của Pinewood, giờ nhận phòng và cách liên hệ trực tiếp để kiểm tra tình trạng phòng.'}</p>
              <a href="${en ? '/en/rooms/' : '/phong/'}">${en ? 'View rooms →' : 'Xem phòng nghỉ →'}</a>
            </article>
            <article class="seo-marketing-card">
              <p class="eyebrow">${en ? 'LOCATION' : 'VỊ TRÍ'}</p>
              <h3>${en ? 'Stay connected to Da Lat' : 'Thuận tiện khám phá Đà Lạt'}</h3>
              <p>${en ? 'Find Pinewood at 54 Vo Truong Toan Street and plan routes to Da Lat University, Xuan Huong Lake and central Da Lat.' : 'Pinewood nằm tại 54 Võ Trường Toản, thuận tiện lên kế hoạch đến Đại học Đà Lạt, Hồ Xuân Hương và khu trung tâm.'}</p>
              <a href="${en ? '/en/location/' : '/vi-tri/'}">${en ? 'Explore location →' : 'Xem vị trí →'}</a>
            </article>
            <article class="seo-marketing-card">
              <p class="eyebrow">${en ? 'DIRECT CONTACT' : 'LIÊN HỆ TRỰC TIẾP'}</p>
              <h3>${en ? 'Talk to Pinewood Hotel' : 'Kết nối với Pinewood Hotel'}</h3>
              <p>${en ? 'Contact the hotel directly by phone, email or Zalo for room information and stay assistance.' : 'Liên hệ trực tiếp qua điện thoại, email hoặc Zalo để được hỗ trợ thông tin phòng và kỳ nghỉ.'}</p>
              <a href="${en ? '/en/contact/' : '/lien-he/'}">${en ? 'Contact Pinewood →' : 'Liên hệ Pinewood →'}</a>
            </article>
          </div>

          <div class="hotel-facts" aria-label="${en ? 'Hotel quick facts' : 'Thông tin nhanh'}">
            <div class="hotel-fact"><strong>50</strong><span>${en ? 'Rooms & suites' : 'Phòng & suite'}</span></div>
            <div class="hotel-fact"><strong>14:00</strong><span>${en ? 'Check-in' : 'Nhận phòng'}</span></div>
            <div class="hotel-fact"><strong>12:00</strong><span>${en ? 'Check-out' : 'Trả phòng'}</span></div>
            <div class="hotel-fact"><strong>06:30–09:00</strong><span>${en ? 'Breakfast' : 'Bữa sáng'}</span></div>
          </div>

          ${photoGallery(lang)}

          <div class="seo-social-strip" aria-label="${en ? 'Official Pinewood social profiles' : 'Mạng xã hội chính thức của Pinewood'}">
            <a href="${instagram}" target="_blank" rel="me noopener noreferrer">Instagram · @pinewooddalat</a>
            <a href="${tiktok}" target="_blank" rel="me noopener noreferrer">TikTok · @dalat.pinewood</a>
          </div>

          <section class="seo-faq" aria-labelledby="seo-faq-title">
            <h2 id="seo-faq-title">${en ? 'Frequently asked questions' : 'Câu hỏi thường gặp'}</h2>
            <details><summary>${en ? 'Where is Pinewood Hotel Dalat located?' : 'Pinewood Hotel Dalat ở đâu?'}</summary><p>${en ? 'The hotel is at 54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam.' : 'Khách sạn nằm tại 54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam.'}</p></details>
            <details><summary>${en ? 'What time are check-in and check-out?' : 'Giờ nhận và trả phòng là khi nào?'}</summary><p>${en ? 'Standard check-in is 14:00 and standard check-out is 12:00. Contact Reception if you need assistance with a different schedule.' : 'Giờ nhận phòng tiêu chuẩn là 14:00 và giờ trả phòng là 12:00. Nếu cần lịch khác, Quý khách vui lòng liên hệ Lễ tân để kiểm tra khả năng hỗ trợ.'}</p></details>
            <details><summary>${en ? 'Does Pinewood provide Wi-Fi?' : 'Pinewood có Wi-Fi không?'}</summary><p>${en ? 'Complimentary Wi-Fi is provided in guest rooms and public areas of the hotel.' : 'Wi-Fi miễn phí được cung cấp trong phòng và tại các khu vực công cộng của khách sạn.'}</p></details>
            <details><summary>${en ? 'When is breakfast served?' : 'Bữa sáng được phục vụ lúc nào?'}</summary><p>${en ? 'Breakfast is served daily at the hotel restaurant from 06:30 to 09:00.' : 'Bữa sáng được phục vụ hằng ngày tại nhà hàng của khách sạn từ 06:30 đến 09:00.'}</p></details>
          </section>
        </div>
      </section>`;
  }

  function servicePhotoMarkup(lang) {
    const en = lang === 'en';
    return `<section class="service-photo-band" id="seo-service-photo"><div class="shell"><figure class="hotel-photo-card"><a href="${en ? '/en/services/' : '/dich-vu/'}"><img src="${breakfastPhoto}" width="765" height="1020" loading="lazy" decoding="async" alt="${en ? 'Breakfast buffet and fresh dishes at Pinewood Hotel Dalat in Da Lat' : 'Buffet sáng và món ăn tươi tại Pinewood Hotel Dalat ở Đà Lạt'}"><figcaption><strong>${en ? 'Breakfast at Pinewood' : 'Bữa sáng tại Pinewood'}</strong>${en ? 'A real look at the hotel breakfast experience before your stay.' : 'Hình ảnh thực tế về trải nghiệm bữa sáng tại khách sạn.'}</figcaption></a></figure></div></section>`;
  }

  function injectFaqSchema(lang) {
    const en = lang === 'en';
    let node = document.getElementById('seo-home-faq-schema');
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = 'seo-home-faq-schema';
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: en ? 'Where is Pinewood Hotel Dalat located?' : 'Pinewood Hotel Dalat ở đâu?', acceptedAnswer: { '@type': 'Answer', text: en ? '54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam.' : '54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam.' } },
        { '@type': 'Question', name: en ? 'What time are check-in and check-out?' : 'Giờ nhận và trả phòng là khi nào?', acceptedAnswer: { '@type': 'Answer', text: en ? 'Standard check-in is 14:00 and standard check-out is 12:00.' : 'Giờ nhận phòng tiêu chuẩn là 14:00 và giờ trả phòng là 12:00.' } },
        { '@type': 'Question', name: en ? 'Does Pinewood provide Wi-Fi?' : 'Pinewood có Wi-Fi không?', acceptedAnswer: { '@type': 'Answer', text: en ? 'Complimentary Wi-Fi is available in guest rooms and public areas.' : 'Wi-Fi miễn phí được cung cấp trong phòng và tại các khu vực công cộng.' } },
        { '@type': 'Question', name: en ? 'When is breakfast served?' : 'Bữa sáng được phục vụ lúc nào?', acceptedAnswer: { '@type': 'Answer', text: en ? 'Breakfast is served daily from 06:30 to 09:00.' : 'Bữa sáng được phục vụ hằng ngày từ 06:30 đến 09:00.' } }
      ]
    });
  }

  function enhance() {
    const path = normalize(location.pathname);
    const main = document.getElementById('main-content');
    if (!main) return;

    const isHome = path === '/' || path === '/en';
    if (isHome && !document.getElementById('seo-home-marketing')) {
      const lang = path === '/en' ? 'en' : 'vi';
      main.insertAdjacentHTML('beforeend', homeMarkup(lang));
      injectFaqSchema(lang);
      return;
    }

    if (path === '/dich-vu' && !document.getElementById('seo-service-photo')) {
      main.insertAdjacentHTML('beforeend', servicePhotoMarkup('vi'));
    } else if (path === '/en/services' && !document.getElementById('seo-service-photo')) {
      main.insertAdjacentHTML('beforeend', servicePhotoMarkup('en'));
    }

    if (!isHome) document.getElementById('seo-home-faq-schema')?.remove();
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
