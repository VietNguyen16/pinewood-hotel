(() => {
  const STYLE_URL = '/css/homepage-ux.css?v=20260908ux1';
  const HOME_ROOMS_ENDPOINT = '/home-rooms.json';
  const HOME_HASH = '#home-booking-estimator';
  const HOME_PATHS = new Set(['/', '/en']);
  let roomCatalogPromise = null;
  let homeDecorateToken = 0;

  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[ch]));
  const isEnglishPath = path => normalize(path).startsWith('/en');
  const isHomePath = path => HOME_PATHS.has(normalize(path));
  const homeBookingHref = (lang, roomSlug = '') => {
    const base = lang === 'en' ? '/en/' : '/';
    const query = roomSlug ? `?room=${encodeURIComponent(roomSlug)}` : '';
    return `${base}${query}${HOME_HASH}`;
  };

  function ensureStyles() {
    if (document.querySelector('link[data-homepage-ux-styles]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLE_URL;
    link.dataset.homepageUxStyles = 'true';
    document.head.appendChild(link);
  }

  function syncBookingNavigation(path) {
    const normalized = normalize(path);
    const home = isHomePath(normalized);
    const lang = isEnglishPath(normalized) ? 'en' : 'vi';
    const label = lang === 'en' ? 'Book now' : 'Đặt phòng';
    const href = homeBookingHref(lang);

    document.querySelectorAll('[data-subpage-booking]').forEach(node => {
      if (home || node.dataset.bookingLang !== lang) node.remove();
    });
    if (home) {
      document.querySelectorAll('[data-home-header-booking], [data-home-mobile-booking]').forEach(node => node.remove());
      return;
    }

    const staticNav = document.querySelector('.marketing-static-nav');
    if (staticNav && !staticNav.querySelector('[data-subpage-booking]')) {
      const link = document.createElement('a');
      link.className = 'subpage-booking-link';
      link.dataset.subpageBooking = 'true';
      link.dataset.bookingLang = lang;
      link.href = href;
      link.textContent = label;
      link.setAttribute('aria-label', lang === 'en' ? 'Choose stay dates on the homepage' : 'Chọn ngày lưu trú tại trang chủ');
      staticNav.appendChild(link);
    }

    const actions = document.querySelector('.header-actions');
    if (actions && !actions.querySelector('[data-subpage-booking]')) {
      const link = document.createElement('a');
      link.className = 'subpage-booking-link';
      link.dataset.subpageBooking = 'true';
      link.dataset.bookingLang = lang;
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
      link.dataset.bookingLang = lang;
      link.href = href;
      link.textContent = label;
      link.addEventListener('click', () => {
        const menuButton = document.getElementById('menu-button');
        if (menuButton?.getAttribute('aria-expanded') === 'true') menuButton.click();
      });
      mobileNav.appendChild(link);
    }
  }

  function getRoomCatalog() {
    if (!roomCatalogPromise) {
      roomCatalogPromise = fetch(HOME_ROOMS_ENDPOINT, { credentials: 'same-origin' })
        .then(response => {
          if (!response.ok) throw new Error(`Homepage room data request failed: ${response.status}`);
          return response.json();
        })
        .then(items => Array.isArray(items) ? items.filter(room => room?.enabled !== false) : [])
        .catch(() => []);
    }
    return roomCatalogPromise;
  }

  function roomCard(room, lang) {
    const en = lang === 'en';
    const name = en ? room.name_en : room.name_vi;
    const bed = en ? room.bed_en : room.bed_vi;
    const summary = en ? room.summary_en : room.summary_vi;
    const view = en ? room.view_en : room.view_vi;
    const capacity = Number(room.guest_count) || 0;
    const guests = `${capacity} ${en ? (capacity === 1 ? 'guest' : 'guests') : 'người'}`;
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

  function decorateRoomCarousel(lang, catalog) {
    const track = document.querySelector('.home-reference-room-grid');
    const section = track?.closest('.home-reference-rooms');
    if (!track || !section || track.dataset.homeRoomTrack === 'true') return;

    if (catalog.length) track.innerHTML = catalog.map(room => roomCard(room, lang)).join('');
    track.dataset.homeRoomTrack = 'true';
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', lang === 'en' ? 'Room type carousel' : 'Danh sách hạng phòng dạng trượt ngang');

    const controls = document.createElement('div');
    controls.className = 'home-reference-room-controls';
    controls.innerHTML = `
      <button type="button" class="home-reference-room-control" data-home-room-prev aria-label="${esc(lang === 'en' ? 'Previous room type' : 'Hạng phòng trước')}">←</button>
      <button type="button" class="home-reference-room-control" data-home-room-next aria-label="${esc(lang === 'en' ? 'Next room type' : 'Hạng phòng tiếp theo')}">→</button>`;
    track.before(controls);

    const prev = controls.querySelector('[data-home-room-prev]');
    const next = controls.querySelector('[data-home-room-next]');
    const scrollOne = direction => {
      const card = track.querySelector('.home-reference-room-card');
      if (!card) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
      const amount = card.getBoundingClientRect().width + gap;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollBy({ left: direction * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const updateButtons = () => {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      prev.disabled = track.scrollLeft <= 3;
      next.disabled = track.scrollLeft >= max - 3;
    };

    prev.addEventListener('click', () => scrollOne(-1));
    next.addEventListener('click', () => scrollOne(1));
    track.addEventListener('scroll', () => requestAnimationFrame(updateButtons), { passive: true });
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollOne(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollOne(1);
      }
    });
    requestAnimationFrame(updateButtons);
  }

  function isoToDisplay(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    return match ? `${match[3]}/${match[2]}/${match[1]}` : '';
  }

  function displayToIso(value) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || '').trim());
    if (!match) return '';
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return '';
    return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function formatDateTyping(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  function enhanceDateField(form, name, lang) {
    const native = form.querySelector(`input[type="date"][name="${name}"]`);
    if (!native || native.dataset.displayEnhanced === 'true') return null;
    native.dataset.displayEnhanced = 'true';
    native.classList.add('homepage-native-date');
    native.tabIndex = -1;
    native.setAttribute('aria-hidden', 'true');

    const wrapper = document.createElement('div');
    wrapper.className = 'homepage-date-control';
    const display = document.createElement('input');
    display.type = 'text';
    display.className = 'homepage-date-display';
    display.inputMode = 'numeric';
    display.autocomplete = 'off';
    display.placeholder = 'dd/mm/yyyy';
    display.maxLength = 10;
    display.setAttribute('aria-label', name === 'checkin'
      ? (lang === 'en' ? 'Check-in date in dd/mm/yyyy format' : 'Ngày nhận phòng theo định dạng dd/mm/yyyy')
      : (lang === 'en' ? 'Check-out date in dd/mm/yyyy format' : 'Ngày trả phòng theo định dạng dd/mm/yyyy'));

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'homepage-date-button';
    button.setAttribute('aria-label', name === 'checkin'
      ? (lang === 'en' ? 'Open check-in calendar' : 'Mở lịch chọn ngày nhận phòng')
      : (lang === 'en' ? 'Open check-out calendar' : 'Mở lịch chọn ngày trả phòng'));
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M3 10h18"></path></svg>';

    wrapper.append(display, button);
    native.before(wrapper);

    const sync = () => {
      display.value = isoToDisplay(native.value);
      display.removeAttribute('aria-invalid');
    };
    const commit = () => {
      const iso = displayToIso(display.value);
      const outsideMin = iso && native.min && iso < native.min;
      const outsideMax = iso && native.max && iso > native.max;
      if (!iso || outsideMin || outsideMax) {
        display.setAttribute('aria-invalid', 'true');
        return false;
      }
      display.removeAttribute('aria-invalid');
      if (native.value !== iso) {
        native.value = iso;
        native.dispatchEvent(new Event('input', { bubbles: true }));
        native.dispatchEvent(new Event('change', { bubbles: true }));
      }
      sync();
      return true;
    };

    display.addEventListener('input', event => {
      event.stopPropagation();
      display.value = formatDateTyping(display.value);
      display.removeAttribute('aria-invalid');
    });
    display.addEventListener('change', event => {
      event.stopPropagation();
      commit();
    });
    display.addEventListener('blur', commit);
    display.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (commit()) display.blur();
      }
    });
    button.addEventListener('click', () => {
      try {
        if (typeof native.showPicker === 'function') native.showPicker();
        else {
          native.focus({ preventScroll: true });
          native.click();
        }
      } catch (error) {
        native.focus({ preventScroll: true });
        native.click();
      }
    });
    native.addEventListener('change', sync);
    sync();
    return { native, display, sync };
  }

  function decorateBookingDates(lang) {
    const form = document.getElementById('home-booking-estimator');
    if (!form || form.dataset.dateFormatEnhanced === 'true') return;
    form.dataset.dateFormatEnhanced = 'true';

    const checkIn = enhanceDateField(form, 'checkin', lang);
    const checkOut = enhanceDateField(form, 'checkout', lang);
    const syncAll = () => {
      checkIn?.sync();
      checkOut?.sync();
    };
    form.addEventListener('input', () => requestAnimationFrame(syncAll));
    form.addEventListener('change', () => requestAnimationFrame(syncAll));
    requestAnimationFrame(syncAll);
  }

  function preselectRoomFromQuery() {
    const form = document.getElementById('home-booking-estimator');
    const select = form?.querySelector('[name="room"]');
    if (!form || !select || form.dataset.roomQueryApplied === 'true') return;
    form.dataset.roomQueryApplied = 'true';
    const requested = new URLSearchParams(location.search).get('room');
    if (!requested || !Array.from(select.options).some(option => option.value === requested)) return;
    select.value = requested;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function scrollToEstimatorIfRequested() {
    if (location.hash !== HOME_HASH) return;
    const form = document.getElementById('home-booking-estimator');
    if (!form || form.dataset.hashScrolled === 'true') return;
    form.dataset.hashScrolled = 'true';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }));
  }

  async function decorateHome(lang) {
    const form = document.getElementById('home-booking-estimator');
    const track = document.querySelector('.home-reference-room-grid');
    if (!form || !track) return false;
    decorateBookingDates(lang);
    preselectRoomFromQuery();
    const catalog = await getRoomCatalog();
    if (!isHomePath(location.pathname)) return true;
    decorateRoomCarousel(lang, catalog);
    scrollToEstimatorIfRequested();
    return true;
  }

  function scheduleHomeDecoration(lang) {
    const token = ++homeDecorateToken;
    let attempts = 0;
    const attempt = async () => {
      if (token !== homeDecorateToken || !isHomePath(location.pathname)) return;
      document.querySelectorAll('[data-home-header-booking], [data-home-mobile-booking]').forEach(node => node.remove());
      if (await decorateHome(lang)) return;
      attempts += 1;
      if (attempts < 30) window.setTimeout(attempt, 100);
    };
    attempt();
  }

  function enhance() {
    ensureStyles();
    const path = normalize(location.pathname);
    syncBookingNavigation(path);
    if (isHomePath(path)) {
      scheduleHomeDecoration(isEnglishPath(path) ? 'en' : 'vi');
    } else {
      homeDecorateToken += 1;
    }
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-route], [data-lang], .brand')) {
      requestAnimationFrame(() => requestAnimationFrame(enhance));
    }
  });
  window.addEventListener('popstate', enhance);
  window.addEventListener('hashchange', enhance);
  window.addEventListener('pageshow', enhance);
  document.addEventListener('DOMContentLoaded', enhance, { once: true });
  enhance();
})();
