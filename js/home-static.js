(() => {
  if (window.__PINEWOOD_STATIC_HOME_READY__) return;
  window.__PINEWOOD_STATIC_HOME_READY__ = true;

  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const isHome = () => {
    const path = normalize(window.location.pathname);
    return path === '/' || path === '/en';
  };
  if (!isHome()) return;

  document.body.classList.add('home-reference-page');

  const lang = normalize(window.location.pathname) === '/en' ? 'en' : 'vi';
  const form = document.getElementById('home-booking-estimator');
  const track = document.querySelector('.home-reference-room-grid[data-home-room-track="true"]');

  const pad = value => String(value).padStart(2, '0');
  const toIsoLocal = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const hotelToday = date => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date).reduce((values, part) => {
      if (part.type !== 'literal') values[part.type] = part.value;
      return values;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}`;
  };
  const addDays = (iso, days) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!match) return '';
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    date.setDate(date.getDate() + days);
    return toIsoLocal(date);
  };
  const isoToDisplay = value => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    return match ? `${match[3]}/${match[2]}/${match[1]}` : '';
  };
  const displayToIso = value => {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || '').trim());
    if (!match) return '';
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return '';
    return `${year}-${pad(month)}-${pad(day)}`;
  };
  const formatTyping = value => {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };
  const nightCount = (checkIn, checkOut) => {
    const start = Date.parse(`${checkIn}T00:00:00Z`);
    const end = Date.parse(`${checkOut}T00:00:00Z`);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0;
    return Math.round((end - start) / 86400000);
  };

  function initDateField(name) {
    if (!form) return null;
    const native = form.querySelector(`input[type="date"][name="${name}"]`);
    const display = form.querySelector(`[data-date-display="${name}"]`);
    const picker = form.querySelector(`[data-date-picker="${name}"]`);
    if (!native || !display || !picker) return null;

    const sync = () => {
      display.value = isoToDisplay(native.value);
      display.removeAttribute('aria-invalid');
    };
    const commit = () => {
      const iso = displayToIso(display.value);
      if (!iso || (native.min && iso < native.min) || (native.max && iso > native.max)) {
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
      display.value = formatTyping(display.value);
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
    picker.addEventListener('click', () => {
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
    native.addEventListener('input', sync);
    return { native, display, sync };
  }

  function buildBookingHref() {
    if (!form) return;
    const checkIn = form.querySelector('[name="checkin"]');
    const checkOut = form.querySelector('[name="checkout"]');
    const roomSelect = form.querySelector('[name="room"]');
    const guests = form.querySelector('[name="guests"]');
    const link = form.querySelector('[data-booking-contact]');
    if (!checkIn || !checkOut || !roomSelect || !guests || !link) return;

    const selected = roomSelect.selectedOptions[0];
    const roomName = selected?.dataset.roomName || selected?.textContent?.split(' · ')[0] || '';
    const target = new URL(lang === 'en' ? '/en/contact/' : '/lien-he/', window.location.origin);
    target.searchParams.set('source', 'homepage-estimator');
    if (roomSelect.value) target.searchParams.set('room', roomSelect.value);
    if (roomName) target.searchParams.set('room_name', roomName);
    if (checkIn.value) target.searchParams.set('checkin', checkIn.value);
    if (checkOut.value) target.searchParams.set('checkout', checkOut.value);
    if (guests.value) target.searchParams.set('guests', guests.value);
    const nights = nightCount(checkIn.value, checkOut.value);
    if (nights > 0) target.searchParams.set('nights', String(nights));
    target.hash = 'booking-request';
    link.href = `${target.pathname}${target.search}${target.hash}`;
    return link.href;
  }

  function initBooking() {
    if (!form) return;
    form.dataset.dateFormatEnhanced = 'true';
    form.dataset.roomQueryApplied = 'true';

    const checkInField = initDateField('checkin');
    const checkOutField = initDateField('checkout');
    if (!checkInField || !checkOutField) return;

    const today = hotelToday(new Date());
    checkInField.native.min = today;
    if (!checkInField.native.value) checkInField.native.value = addDays(today, 1);
    checkOutField.native.min = addDays(checkInField.native.value, 1);
    if (!checkOutField.native.value || checkOutField.native.value <= checkInField.native.value) {
      checkOutField.native.value = addDays(checkInField.native.value, 1);
    }

    const roomSelect = form.querySelector('[name="room"]');
    const requestedRoom = new URLSearchParams(window.location.search).get('room');
    if (requestedRoom && roomSelect && Array.from(roomSelect.options).some(option => option.value === requestedRoom)) {
      roomSelect.value = requestedRoom;
    }

    const syncDates = () => {
      checkOutField.native.min = addDays(checkInField.native.value, 1);
      if (!checkOutField.native.value || checkOutField.native.value <= checkInField.native.value) {
        checkOutField.native.value = addDays(checkInField.native.value, 1);
      }
      checkInField.sync();
      checkOutField.sync();
      buildBookingHref();
    };

    ['input', 'change'].forEach(type => form.addEventListener(type, () => window.requestAnimationFrame(syncDates)));

    const validation = form.querySelector('[data-booking-validation]');
    const bookingLink = form.querySelector('[data-booking-contact]');
    const clearValidation = () => {
      checkInField.display.removeAttribute('aria-invalid');
      checkOutField.display.removeAttribute('aria-invalid');
      if (validation) {
        validation.hidden = true;
        validation.textContent = '';
      }
    };
    const showValidation = (message, invalidFields) => {
      invalidFields.forEach(field => field.display.setAttribute('aria-invalid', 'true'));
      if (validation) {
        validation.textContent = message;
        validation.hidden = false;
      }
      invalidFields[0]?.display.focus();
    };
    const validateCurrentDates = () => {
      const checkIn = displayToIso(checkInField.display.value);
      const checkOut = displayToIso(checkOutField.display.value);
      const invalidFields = [];

      if (!checkIn || checkIn < today) invalidFields.push(checkInField);
      if (!checkOut) invalidFields.push(checkOutField);
      if (invalidFields.length) {
        return {
          valid: false,
          invalidFields,
          message: lang === 'en'
            ? 'Enter valid check-in and check-out dates in dd/mm/yyyy format.'
            : 'Vui lòng nhập ngày nhận và trả phòng hợp lệ theo định dạng dd/mm/yyyy.'
        };
      }
      if (checkOut <= checkIn) {
        return {
          valid: false,
          invalidFields: [checkOutField],
          message: lang === 'en'
            ? 'Check-out must be after check-in.'
            : 'Ngày trả phòng phải sau ngày nhận phòng.'
        };
      }
      return { valid: true, checkIn, checkOut };
    };
    const navigateWithCurrentDates = event => {
      event.preventDefault();
      clearValidation();
      const result = validateCurrentDates();
      if (!result.valid) {
        showValidation(result.message, result.invalidFields);
        return;
      }

      checkInField.native.value = result.checkIn;
      checkOutField.native.value = result.checkOut;
      checkOutField.native.min = addDays(result.checkIn, 1);
      checkInField.sync();
      checkOutField.sync();
      const destination = buildBookingHref();
      if (destination) window.location.assign(destination);
    };

    bookingLink?.addEventListener('click', navigateWithCurrentDates);
    form.addEventListener('input', event => {
      if (event.target.matches('.homepage-date-display')) clearValidation();
    });
    syncDates();

    if (window.location.hash === '#home-booking-estimator') {
      form.dataset.hashScrolled = 'true';
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.requestAnimationFrame(() => form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }));
    }
  }

  function initCarousel() {
    if (!track || track.dataset.staticCarouselBound === 'true') return;
    track.dataset.staticCarouselBound = 'true';
    const section = track.closest('.home-reference-rooms');
    const prev = section?.querySelector('[data-home-room-prev]');
    const next = section?.querySelector('[data-home-room-next]');
    if (!prev || !next) return;

    const scrollOne = direction => {
      const card = track.querySelector('.home-reference-room-card');
      if (!card) return;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
      const amount = card.getBoundingClientRect().width + gap;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollBy({ left: direction * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const update = () => {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      prev.disabled = track.scrollLeft <= 3;
      next.disabled = track.scrollLeft >= max - 3;
    };

    prev.addEventListener('click', () => scrollOne(-1));
    next.addEventListener('click', () => scrollOne(1));
    track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollOne(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollOne(1);
      }
    });
    window.addEventListener('resize', () => window.requestAnimationFrame(update), { passive: true });
    window.requestAnimationFrame(update);
  }

  initBooking();
  initCarousel();
})();
