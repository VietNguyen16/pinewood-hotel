(() => {
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const config = window.HOTEL_CONFIG || {};

  function addExternalReviewLink(container, href, label) {
    if (!container || !href) return;
    const exists = Array.from(container.querySelectorAll('a')).some(link => link.href === new URL(href, location.origin).href);
    if (exists) return;
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    container.appendChild(link);
  }

  function enhanceHome(path) {
    const en = path === '/en';
    const address = document.querySelector('.home-directory .hotel-address');
    if (address && !address.querySelector('.hotel-location-link')) {
      const locationLink = document.createElement('a');
      locationLink.className = 'hotel-directions-link hotel-location-link';
      locationLink.href = en ? '/en/location/' : '/vi-tri/';
      locationLink.textContent = en ? 'Explore location & nearby places' : 'Xem vị trí & khu vực xung quanh';
      address.appendChild(locationLink);
    }

    const strip = document.querySelector('#seo-home-marketing .seo-social-strip');
    addExternalReviewLink(
      strip,
      config.reviews?.booking,
      en ? 'Booking.com guest reviews' : 'Đánh giá khách trên Booking.com'
    );
  }

  function enhanceContact(path) {
    const en = path === '/en/contact';
    const strip = document.querySelector('#contact-faq .seo-social-strip');
    addExternalReviewLink(
      strip,
      config.reviews?.booking,
      en ? 'View guest reviews on Booking.com' : 'Xem đánh giá khách trên Booking.com'
    );
  }

  function enhance() {
    const path = normalize(location.pathname);
    if (path === '/' || path === '/en') enhanceHome(path);
    if (path === '/lien-he' || path === '/en/contact') enhanceContact(path);
  }

  const schedule = () => requestAnimationFrame(() => requestAnimationFrame(enhance));

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
