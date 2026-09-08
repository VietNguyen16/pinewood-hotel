(() => {
  if (window.__PINEWOOD_SITE_RUNTIME_FIXES_20260908__) return;
  window.__PINEWOOD_SITE_RUNTIME_FIXES_20260908__ = true;

  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const isHome = () => {
    const path = normalize(window.location.pathname);
    return path === '/' || path === '/en';
  };
  const pageLang = () => normalize(window.location.pathname).startsWith('/en') ? 'en' : 'vi';
  const homeBookingHref = lang => `${lang === 'en' ? '/en/' : '/'}#home-booking-estimator`;

  function ensureSafetyStyles() {
    if (document.getElementById('pinewood-runtime-fix-styles')) return;
    const style = document.createElement('style');
    style.id = 'pinewood-runtime-fix-styles';
    style.textContent = `
      .home-reference-booking-summary,
      .rooms-card-rate,
      .room-rate-card { display: none !important; }
    `;
    document.head.appendChild(style);
  }

  function addBookingCtas() {
    if (isHome()) {
      document.querySelectorAll('[data-subpage-booking]').forEach(node => node.remove());
      return;
    }

    const lang = pageLang();
    const label = lang === 'en' ? 'Book now' : 'Đặt phòng';
    const href = homeBookingHref(lang);

    const staticNav = document.querySelector('.marketing-static-nav');
    if (staticNav && !staticNav.querySelector('[data-subpage-booking]')) {
      const link = document.createElement('a');
      link.className = 'subpage-booking-link';
      link.dataset.subpageBooking = 'true';
      link.href = href;
      link.textContent = label;
      link.setAttribute('aria-label', lang === 'en' ? 'Choose stay dates on the homepage' : 'Chọn ngày lưu trú tại trang chủ');
      const langLink = staticNav.querySelector('.marketing-lang-link');
      if (langLink) staticNav.insertBefore(link, langLink);
      else staticNav.appendChild(link);
    }

    const actions = document.querySelector('.header-actions');
    if (actions && !actions.querySelector('[data-subpage-booking]')) {
      const link = document.createElement('a');
      link.className = 'subpage-booking-link';
      link.dataset.subpageBooking = 'true';
      link.href = href;
      link.textContent = label;
      link.setAttribute('aria-label', lang === 'en' ? 'Choose stay dates on the homepage' : 'Chọn ngày lưu trú tại trang chủ');
      actions.insertBefore(link, actions.querySelector('.menu-button'));
    }

    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav && !mobileNav.querySelector('[data-subpage-booking]')) {
      const link = document.createElement('a');
      link.className = 'subpage-booking-link subpage-booking-mobile';
      link.dataset.subpageBooking = 'true';
      link.href = href;
      link.textContent = label;
      mobileNav.appendChild(link);
    }
  }

  function disableSpaRoutingOnNewHome() {
    if (!isHome() || !document.querySelector('.home-reference')) return false;
    document.querySelectorAll('a[data-route]').forEach(link => link.removeAttribute('data-route'));
    return true;
  }

  function stripEstimateFromBookingLink(anchor) {
    if (!anchor) return;
    try {
      const url = new URL(anchor.href, window.location.origin);
      url.searchParams.delete('estimate');
      anchor.href = `${url.pathname}${url.search}${url.hash}`;
    } catch (error) {
      // Keep the original href if the browser cannot parse it.
    }
  }

  function formatIsoDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    if (!match) return value || '';
    return `${match[3]}/${match[2]}/${match[1]}`;
  }

  function bookingRequestFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('source') !== 'homepage-estimator') return null;
    const lang = pageLang();
    const roomName = params.get('room_name') || (lang === 'en' ? 'Room type to be confirmed' : 'Hạng phòng cần xác nhận');
    const checkIn = params.get('checkin') || '';
    const checkOut = params.get('checkout') || '';
    const guests = Number(params.get('guests') || 0);
    const nights = Number(params.get('nights') || 0);
    if (!checkIn || !checkOut) return null;

    const lines = lang === 'en'
      ? [
          'Hello Pinewood Hotel Dalat,',
          '',
          'I would like to request a room booking with the following details:',
          `- Room type: ${roomName}`,
          `- Check-in: ${formatIsoDate(checkIn)}`,
          `- Check-out: ${formatIsoDate(checkOut)}`,
          nights ? `- Nights: ${nights}` : null,
          guests ? `- Guests: ${guests}` : null,
          '',
          'Please check room availability and help confirm this booking request. Thank you.'
        ]
      : [
          'Xin chào Pinewood Hotel Dalat,',
          '',
          'Tôi muốn hỏi đặt phòng với thông tin sau:',
          `- Hạng phòng: ${roomName}`,
          `- Nhận phòng: ${formatIsoDate(checkIn)}`,
          `- Trả phòng: ${formatIsoDate(checkOut)}`,
          nights ? `- Số đêm: ${nights}` : null,
          guests ? `- Số khách: ${guests}` : null,
          '',
          'Nhờ Pinewood kiểm tra tình trạng phòng và hỗ trợ xác nhận yêu cầu đặt phòng này. Cảm ơn!'
        ];

    return { lang, roomName, message: lines.filter(Boolean).join('\n') };
  }

  function sanitizeBookingRequest() {
    const request = bookingRequestFromUrl();
    if (!request) return false;
    const section = document.getElementById('booking-request');
    if (!section) return false;

    const textarea = section.querySelector('[data-booking-message]');
    if (textarea) {
      textarea.value = request.message;
      textarea.textContent = request.message;
    }

    const intro = section.querySelector('.booking-request-prefill > p:not(.eyebrow):not(.booking-copy-status)');
    if (intro) {
      intro.textContent = request.lang === 'en'
        ? 'This is a booking request, not a confirmed reservation. Pinewood will confirm room availability after receiving it.'
        : 'Đây là yêu cầu đặt phòng, chưa phải xác nhận đặt phòng. Pinewood sẽ kiểm tra và xác nhận tình trạng phòng sau khi nhận yêu cầu.';
    }

    const email = section.querySelector('.booking-request-actions a[href^="mailto:"]');
    if (email) {
      const subject = request.lang === 'en'
        ? `Room booking request - ${request.roomName}`
        : `Yêu cầu đặt phòng - ${request.roomName}`;
      email.href = `mailto:info@pinewoodhotel.vn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(request.message)}`;
    }

    section.dataset.bookingPriceSanitized = 'true';
    return true;
  }

  async function copySanitizedBooking(button) {
    const section = button.closest('#booking-request');
    const textarea = section?.querySelector('[data-booking-message]');
    const status = section?.querySelector('[data-copy-status]');
    if (!textarea) return;

    let copied = false;
    try {
      await navigator.clipboard.writeText(textarea.value);
      copied = true;
    } catch (error) {
      textarea.focus();
      textarea.select();
      try { copied = document.execCommand('copy'); } catch (copyError) { copied = false; }
    }
    if (status) {
      status.textContent = copied
        ? (pageLang() === 'en' ? 'Booking request copied.' : 'Đã sao chép nội dung yêu cầu.')
        : (pageLang() === 'en' ? 'Select the message and copy it manually.' : 'Hãy chọn nội dung và sao chép thủ công.');
    }
  }

  function markNewHomeReady() {
    if (!isHome()) return false;
    if (!document.querySelector('.home-reference')) return false;

    disableSpaRoutingOnNewHome();
    document.querySelectorAll('[data-booking-contact]').forEach(stripEstimateFromBookingLink);

    const bookingSection = document.querySelector('.home-reference-booking-section');
    if (bookingSection) {
      bookingSection.setAttribute(
        'aria-label',
        pageLang() === 'en' ? 'Choose stay dates and prepare a booking request' : 'Chọn ngày lưu trú và chuẩn bị yêu cầu đặt phòng'
      );
    }
    document.querySelector('.home-reference-booking-summary')?.remove();

    document.getElementById('homepage-inline-render-guard')?.remove();
    document.body.classList.remove('homepage-render-pending');
    document.body.classList.add('home-reference-ready');
    return true;
  }

  function enhance() {
    ensureSafetyStyles();
    addBookingCtas();
    if (isHome()) markNewHomeReady();
    else sanitizeBookingRequest();
  }

  function settle() {
    let attempts = 0;
    const tick = () => {
      enhance();
      const homeDone = !isHome() || document.querySelector('.home-reference');
      const requestNeeded = new URLSearchParams(window.location.search).get('source') === 'homepage-estimator';
      const requestDone = !requestNeeded || document.getElementById('booking-request');
      if (homeDone && requestDone) return;
      attempts += 1;
      if (attempts < 120) window.setTimeout(tick, 50);
    };
    tick();
  }

  document.addEventListener('click', event => {
    const langButton = event.target.closest('[data-lang]');
    if (langButton && isHome()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const lang = langButton.dataset.lang === 'en' ? 'en' : 'vi';
      try { localStorage.setItem('pinewood-language', lang); } catch (error) {}
      window.location.assign(lang === 'en' ? '/en/' : '/');
      return;
    }

    const bookingLink = event.target.closest('[data-booking-contact]');
    if (bookingLink) stripEstimateFromBookingLink(bookingLink);

    const copyButton = event.target.closest('[data-copy-booking]');
    if (copyButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      sanitizeBookingRequest();
      copySanitizedBooking(copyButton);
    }
  }, true);

  document.addEventListener('input', event => {
    if (event.target.closest('#home-booking-estimator')) {
      window.requestAnimationFrame(() => document.querySelectorAll('[data-booking-contact]').forEach(stripEstimateFromBookingLink));
    }
  });
  document.addEventListener('change', event => {
    if (event.target.closest('#home-booking-estimator')) {
      window.requestAnimationFrame(() => document.querySelectorAll('[data-booking-contact]').forEach(stripEstimateFromBookingLink));
    }
  });

  window.addEventListener('pageshow', settle);
  window.addEventListener('popstate', settle);
  window.addEventListener('hashchange', settle);
  document.addEventListener('DOMContentLoaded', settle, { once: true });
  settle();
})();
