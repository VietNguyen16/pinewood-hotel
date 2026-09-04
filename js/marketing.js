(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const instagram = 'https://www.instagram.com/pinewooddalat/';
  const tiktok = 'https://www.tiktok.com/@dalat.pinewood';
  const googleReviews = 'https://www.google.com/maps/place/Kh%C3%A1ch+s%E1%BA%A1n+Pinewood/@11.9611181,108.4486208,1207m/data=!3m1!1e3!4m11!3m10!1s0x3171130010cadc19:0xdcb299e4322ab577!5m2!4m1!1i2!8m2!3d11.9611181!4d108.4512011!9m1!1b1!16s%2Fg%2F11njdj19vf?entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D';
  const roomPhoto = '/assets/images/pinewood-room-home.webp';
  const cafePhoto = '/assets/images/pinewood-breakfast-buffet-1600.webp';

  function photoGallery(lang) {
    const en = lang === 'en';
    return `
      <section class="hotel-photo-section" aria-labelledby="pinewood-photo-title">
        <header class="hotel-photo-head">
          <p class="eyebrow">${en ? 'PINEWOOD IMAGES' : 'HÌNH ẢNH PINEWOOD'}</p>
          <h2 id="pinewood-photo-title">${en ? 'A quick look before your stay' : 'Một thoáng Pinewood trước kỳ nghỉ'}</h2>
          <p>${en ? 'A compact preview of the rooms and breakfast experience.' : 'Xem nhanh không gian phòng nghỉ và bữa sáng, không kéo dài trang chủ.'}</p>
        </header>
        <div class="hotel-photo-grid">
          <figure class="hotel-photo-card">
            <a href="${en ? '/en/rooms/' : '/phong/'}">
              <img src="${roomPhoto}" width="600" height="450" loading="lazy" decoding="async" alt="${en ? 'Spacious room at Pinewood Hotel Dalat in Da Lat' : 'Phòng nghỉ rộng rãi tại Pinewood Hotel Dalat, Đà Lạt'}">
              <figcaption><strong>${en ? 'Rooms & suites' : 'Phòng nghỉ & suite'}</strong>${en ? 'Bright, spacious accommodation with a warm modern interior.' : 'Không gian rộng rãi, nhiều ánh sáng và nội thất ấm áp.'}</figcaption>
            </a>
          </figure>
          <figure class="hotel-photo-card">
            <a href="${en ? '/en/breakfast/' : '/bua-sang/'}">
              <img src="${cafePhoto}" width="600" height="314" loading="lazy" decoding="async" alt="${en ? 'Breakfast and cafe at Pinewood Hotel Dalat in Da Lat' : 'Bữa sáng và café tại Pinewood Hotel Dalat ở Đà Lạt'}">
              <figcaption><strong>${en ? 'Breakfast & café' : 'Bữa sáng & café'}</strong>${en ? 'A relaxed morning experience during your Pinewood stay.' : 'Một trải nghiệm buổi sáng thư giãn trong kỳ lưu trú tại Pinewood.'}</figcaption>
            </a>
          </figure>
        </div>
      </section>`;
  }

  function homeMarkup(lang) {
    const en = lang === 'en';
    return `
      <section class="seo-marketing-section" id="seo-home-marketing" aria-label="${en ? 'Pinewood Hotel photos and official social links' : 'Hình ảnh và mạng xã hội chính thức của Pinewood Hotel'}">
        <div class="shell">
          ${photoGallery(lang)}
          <div class="seo-social-strip" aria-label="${en ? 'Official Pinewood social profiles and guest reviews' : 'Mạng xã hội chính thức và đánh giá khách hàng của Pinewood'}">
            <a href="${instagram}" target="_blank" rel="me noopener noreferrer">Instagram · @pinewooddalat</a>
            <a href="${tiktok}" target="_blank" rel="me noopener noreferrer">TikTok · @dalat.pinewood</a>
            <a href="${googleReviews}" target="_blank" rel="noopener noreferrer">${en ? 'Google Maps reviews' : 'Đánh giá Google Maps'}</a>
          </div>
        </div>
      </section>`;
  }

  function servicePhotoMarkup(lang) {
    const en = lang === 'en';
    return `<section class="service-photo-band" id="seo-service-photo"><div class="shell"><figure class="hotel-photo-card"><a href="${en ? '/en/rooms/' : '/phong/'}"><img src="${cafePhoto}" width="600" height="314" loading="lazy" decoding="async" alt="${en ? 'Coffee, breakfast and fresh pastries at Pinewood Hotel Dalat in Da Lat' : 'Cà phê, bữa sáng và bánh tươi tại Pinewood Hotel Dalat ở Đà Lạt'}"><figcaption><strong>${en ? 'A relaxed part of your Pinewood stay' : 'Một khoảng nghỉ thư giãn tại Pinewood'}</strong>${en ? 'Discover hotel services, breakfast and the café experience, then explore the rooms for your stay.' : 'Khám phá dịch vụ, bữa sáng và trải nghiệm café, sau đó xem không gian phòng nghỉ cho kỳ lưu trú.'}</figcaption></a></figure></div></section>`;
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

    if (isHome && !document.getElementById('seo-home-marketing')) {
      const lang = path === '/en' ? 'en' : 'vi';
      main.insertAdjacentHTML('beforeend', homeMarkup(lang));
      clearFaqSchemas();
      return;
    }

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
