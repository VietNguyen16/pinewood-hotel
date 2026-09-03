(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const instagram = 'https://www.instagram.com/pinewooddalat/';
  const tiktok = 'https://www.tiktok.com/@dalat.pinewood';

  function homeMarkup(lang) {
    const en = lang === 'en';
    return `
      <section class="seo-marketing-section" id="seo-home-marketing" aria-labelledby="seo-home-title">
        <div class="shell">
          <header class="seo-marketing-head">
            <p class="eyebrow">PINEWOOD HOTEL DALAT</p>
            <h2 id="seo-home-title">${en ? 'A comfortable Da Lat stay with direct hotel support' : 'Lưu trú thoải mái tại Đà Lạt, kết nối trực tiếp với khách sạn'}</h2>
            <p>${en
              ? 'Pinewood Hotel Dalat offers 50 rooms and suites with natural light and a modern design language, together with practical guest services and convenient access to Da Lat.'
              : 'Pinewood Hotel Dalat có 50 phòng nghỉ và suite rộng rãi, nhiều ánh sáng tự nhiên, ngôn ngữ kiến trúc hiện đại cùng hệ thống dịch vụ thiết thực cho kỳ nghỉ tại Đà Lạt.'}</p>
          </header>

          <div class="seo-marketing-grid">
            <article class="seo-marketing-card">
              <p class="eyebrow">${en ? 'ROOMS & SUITES' : 'PHÒNG & SUITE'}</p>
              <h3>${en ? 'Explore your stay' : 'Khám phá không gian lưu trú'}</h3>
              <p>${en ? 'Learn about Pinewood’s 50-room and suite accommodation concept, check-in information and direct contact options for availability.' : 'Tìm hiểu không gian 50 phòng nghỉ và suite của Pinewood, giờ nhận phòng và cách liên hệ trực tiếp để kiểm tra tình trạng phòng.'}</p>
              <a href="${en ? '/en/rooms/' : '/phong/'}">${en ? 'View rooms →' : 'Xem phòng nghỉ →'}</a>
            </article>
            <article class="seo-marketing-card">
              <p class="eyebrow">${en ? 'LOCATION' : 'VỊ TRÍ'}</p>
              <h3>${en ? 'Stay connected to Da Lat' : 'Thuận tiện khám phá Đà Lạt'}</h3>
              <p>${en ? 'Find Pinewood Hotel Dalat at 54 Vo Truong Toan Street and plan your route to the hotel and nearby Da Lat landmarks.' : 'Pinewood Hotel Dalat tọa lạc tại 54 Võ Trường Toản. Xem thông tin vị trí, chỉ đường và các địa điểm nổi bật quanh khu vực.'}</p>
              <a href="${en ? '/en/location/' : '/vi-tri/'}">${en ? 'Explore location →' : 'Xem vị trí →'}</a>
            </article>
            <article class="seo-marketing-card">
              <p class="eyebrow">${en ? 'DIRECT CONTACT' : 'LIÊN HỆ TRỰC TIẾP'}</p>
              <h3>${en ? 'Talk to Pinewood Hotel' : 'Kết nối với Pinewood Hotel'}</h3>
              <p>${en ? 'Contact the hotel directly by phone, email or Zalo for stay information and assistance.' : 'Liên hệ trực tiếp với khách sạn qua điện thoại, email hoặc Zalo để được hỗ trợ thông tin lưu trú.'}</p>
              <a href="${en ? '/en/contact/' : '/lien-he/'}">${en ? 'Contact Pinewood →' : 'Liên hệ Pinewood →'}</a>
            </article>
          </div>

          <div class="hotel-facts" aria-label="${en ? 'Hotel quick facts' : 'Thông tin nhanh'}">
            <div class="hotel-fact"><strong>50</strong><span>${en ? 'Rooms & suites' : 'Phòng & suite'}</span></div>
            <div class="hotel-fact"><strong>14:00</strong><span>${en ? 'Check-in' : 'Nhận phòng'}</span></div>
            <div class="hotel-fact"><strong>12:00</strong><span>${en ? 'Check-out' : 'Trả phòng'}</span></div>
            <div class="hotel-fact"><strong>06:30–09:00</strong><span>${en ? 'Breakfast' : 'Bữa sáng'}</span></div>
          </div>

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
    const isHome = path === '/' || path === '/en';
    const main = document.getElementById('main-content');
    if (isHome && main && !document.getElementById('seo-home-marketing')) {
      const lang = path === '/en' ? 'en' : 'vi';
      main.insertAdjacentHTML('beforeend', homeMarkup(lang));
      injectFaqSchema(lang);
    } else if (!isHome) {
      document.getElementById('seo-home-faq-schema')?.remove();
    }
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
