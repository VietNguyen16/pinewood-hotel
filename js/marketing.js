(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const config = window.HOTEL_CONFIG || {};
  const instagram = config.social?.instagram || '';
  const tiktok = config.social?.tiktok || '';
  const googleReviews = config.reviews?.googleMaps || '';
  const bookingReviews = config.reviews?.booking || '';
  const roomPhoto = '/assets/images/pinewood-room-home.webp';
  const cafePhoto = '/assets/images/pinewood-breakfast-buffet-1600.webp';
  const servicePhoto = '/assets/images/pinewood-services-room.jpg?v=1';

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
              <img src="${roomPhoto}" srcset="/assets/images/pinewood-room-home-540.webp 540w, /assets/images/pinewood-room-home.webp 1080w" sizes="(max-width: 720px) 92vw, 600px" width="600" height="450" loading="lazy" decoding="async" alt="${en ? 'Spacious room at Pinewood Hotel Dalat in Da Lat' : 'Phòng nghỉ rộng rãi tại Pinewood Hotel Dalat, Đà Lạt'}">
              <figcaption><strong>${en ? 'Rooms & suites' : 'Phòng nghỉ & suite'}</strong>${en ? 'Bright, spacious accommodation with a warm modern interior.' : 'Không gian rộng rãi, nhiều ánh sáng và nội thất ấm áp.'}</figcaption>
            </a>
          </figure>
          <figure class="hotel-photo-card">
            <a href="${en ? '/en/breakfast/' : '/bua-sang/'}">
              <img src="${cafePhoto}" srcset="/assets/images/pinewood-breakfast-buffet-800.webp 800w, /assets/images/pinewood-breakfast-buffet-1600.webp 1600w" sizes="(max-width: 720px) 92vw, 600px" width="1600" height="900" loading="lazy" decoding="async" alt="${en ? 'Breakfast and cafe at Pinewood Hotel Dalat in Da Lat' : 'Bữa sáng và café tại Pinewood Hotel Dalat ở Đà Lạt'}">
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
            <a href="${bookingReviews}" target="_blank" rel="noopener noreferrer">${en ? 'Booking.com guest reviews' : 'Đánh giá khách trên Booking.com'}</a>
          </div>
        </div>
      </section>`;
  }

  function enhanceHomeLocationLink(lang) {
    const address = document.querySelector('.home-directory .hotel-address');
    if (!address || address.querySelector('.hotel-location-link')) return;
    const link = document.createElement('a');
    link.className = 'hotel-directions-link hotel-location-link';
    link.href = lang === 'en' ? '/en/location/' : '/vi-tri/';
    link.textContent = lang === 'en' ? 'Explore location & nearby places' : 'Xem vị trí & khu vực xung quanh';
    address.appendChild(link);
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
            <a href="${bookingReviews}" target="_blank" rel="noopener noreferrer">${en ? 'View guest reviews on Booking.com' : 'Xem đánh giá khách trên Booking.com'}</a>
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

    if (isHome) {
      const lang = path === '/en' ? 'en' : 'vi';
      if (!document.getElementById('seo-home-marketing')) main.insertAdjacentHTML('beforeend', homeMarkup(lang));
      enhanceHomeLocationLink(lang);
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
