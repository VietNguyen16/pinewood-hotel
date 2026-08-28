(() => {
  const CONFIG = window.HOTEL_CONFIG;
  const CONTENT = window.PINEWOOD_CONTENT;
  const ZALO_QR = window.PINEWOOD_ZALO_QR || '/assets/qr/zalo-pinewood.svg';
  const main = document.getElementById('main-content');
  const dialog = document.getElementById('assistance-dialog');
  const welcomeDialog = document.getElementById('welcome-dialog');
  let welcomePendingAfterAssistance = false;
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  const pathTable = {
    vi: {
      home: '/', welcome: '/thu-chao-mung', rules: '/noi-quy', wifi: '/wifi', breakfast: '/bua-sang',
      services: '/dich-vu', safety: '/an-toan', contact: '/lien-he', environment: '/moi-truong', fullInfo: '/thong-tin'
    },
    en: {
      home: '/en', welcome: '/en/welcome', rules: '/en/hotel-rules', wifi: '/en/wifi', breakfast: '/en/breakfast',
      services: '/en/services', safety: '/en/safety', contact: '/en/contact', environment: '/en/environment', fullInfo: '/en/hotel-information'
    }
  };

  const routeByPath = {};
  Object.entries(pathTable).forEach(([lang, routes]) => {
    Object.entries(routes).forEach(([key, path]) => routeByPath[path] = { lang, key });
  });

  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const esc = (value) => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));

  function getStoredLanguage() {
    const stored = localStorage.getItem('pinewood-language');
    return stored === 'en' || stored === 'vi' ? stored : null;
  }

  function detectRoute() {
    const normalized = window.location.pathname.replace(/\/+$/, '') || '/';
    if (routeByPath[normalized]) return routeByPath[normalized];
    if (normalized.startsWith('/en')) return { lang: 'en', key: 'home' };
    return { lang: getStoredLanguage() || 'vi', key: 'home' };
  }

  let state = detectRoute();

  function setLanguage(lang, navigate = true) {
    const currentKey = state.key;
    localStorage.setItem('pinewood-language', lang);
    state = { lang, key: currentKey };
    if (navigate) navigateTo(pathTable[lang][currentKey] || pathTable[lang].home);
    else render();
  }

  function navigateTo(path, replace = false) {
    const normalized = path.replace(/\/+$/, '') || '/';
    if (replace) history.replaceState({}, '', normalized);
    else history.pushState({}, '', normalized);
    state = routeByPath[normalized] || detectRoute();
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
    closeMenu();
  }

  function navItems(lang) {
    const t = CONTENT[lang].ui;
    const p = pathTable[lang];
    return [
      ['home', t.home, p.home], ['rules', t.rules, p.rules], ['wifi', t.wifi, p.wifi], ['breakfast', t.breakfast, p.breakfast],
      ['services', t.services, p.services], ['safety', t.safety, p.safety], ['contact', t.contact, p.contact]
    ];
  }

  function renderNav() {
    const items = navItems(state.lang);
    const navMarkup = items.map(([key,label,path]) => `<a href="${path}" data-route ${state.key === key ? 'aria-current="page"' : ''}>${esc(label)}</a>`).join('');
    document.getElementById('desktop-nav').innerHTML = navMarkup;
    document.getElementById('mobile-nav').innerHTML = navMarkup +
      `<a href="${pathTable[state.lang].environment}" data-route>${esc(CONTENT[state.lang].ui.environment)}</a>` +
      `<a href="${pathTable[state.lang].fullInfo}" data-route>${esc(CONTENT[state.lang].ui.fullInfo)}</a>`;
  }

  function pageHero(title, intro = '', eyebrow = '') {
    return `<section class="page-hero"><div class="page-hero-inner shell">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h1>${esc(title)}</h1>${intro ? `<p>${esc(intro)}</p>` : ''}<div class="ornament"><span></span></div></div></section>`;
  }

  function renderHome(c) {
    const addressLabel = state.lang === 'vi' ? 'ĐỊA CHỈ KHÁCH SẠN' : 'HOTEL ADDRESS';
    const address = state.lang === 'vi' ? CONFIG.address.vi : CONFIG.address.en;

    return `
      <section class="hero">
        <div class="hero-inner shell">
          <div>
            <p class="eyebrow">${esc(c.ui.welcomeTo)}</p>
            <h1>PINEWOOD HOTEL<span>DALAT</span></h1>
            <div class="ornament"><span></span></div>
            <p class="hero-copy">${esc(state.lang === 'vi' ? 'Chào mừng Quý khách đến với Pinewood Hotel Dalat' : 'Welcome to Pinewood Hotel Dalat')}</p>
            <p class="hero-copy">${esc(c.ui.guestInformation)}</p>
          </div>
        </div>
      </section>
      <section class="home-directory">
        <div class="shell directory-panel">
          <div class="directory-grid">
            ${c.homeCards.map(card => `<a class="directory-card" href="${card.route}" data-route>${icon(card.icon)}<h2>${esc(card.title)}</h2><p>${esc(card.subtitle)}</p><span class="card-arrow" aria-hidden="true">→</span></a>`).join('')}
          </div>
          <div class="hotel-address">
            <strong>${esc(addressLabel)}</strong>
            <address>${esc(address)}</address>
            <a class="hotel-directions-link" href="https://www.google.com/maps/dir/?api=1&destination=Pinewood%20Hotel%20Dalat%2C%2054%20%C4%90%C6%B0%E1%BB%9Dng%20V%C3%B5%20Tr%C6%B0%E1%BB%9Dng%20To%E1%BA%A3n%2C%20%C4%90%C3%A0%20L%E1%BA%A1t%2C%20L%C3%A2m%20%C4%90%E1%BB%93ng%2C%20Vi%E1%BB%87t%20Nam" target="_blank" rel="noopener noreferrer">${esc(state.lang === 'vi' ? 'Chỉ đường trên Google Maps' : 'Get directions on Google Maps')}</a>
          </div>
        </div>
      </section>`;
  }

  function renderWelcome(c) {
    const w = c.welcome;
    return pageHero(w.title, c.ui.sourceNotice) + `<section class="page-section"><div class="shell"><article class="content-card prose"><p class="greeting">${esc(w.greeting)}</p>${w.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}<p class="closing">${esc(w.closing)}</p><p class="signature">${esc(w.signature)}</p></article></div></section>`;
  }

  function renderRules(c) {
    return pageHero(state.lang === 'vi' ? 'QUY ĐỊNH KHÁCH SẠN' : 'HOTEL RULES', c.rulesIntro) + `<section class="page-section"><div class="shell rule-list">${c.rules.map((r,i) => `<article class="rule-card"><div class="rule-number">${String(i+1).padStart(2,'0')}</div><h2>${esc(r.title)}</h2><p>${esc(r.text)}</p></article>`).join('')}</div></section>`;
  }

  function renderServices(c) {
    const items = c.serviceGroups[0].items;
    return pageHero(c.serviceGroups[0].title, state.lang === 'vi' ? 'Thông tin dịch vụ và tiện nghi dành cho khách lưu trú.' : 'Services and amenities for staying guests.') + `<section class="page-section"><div class="shell service-grid">${items.map(item => `<article class="service-card">${icon(item.icon)}<h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></article>`).join('')}</div></section>`;
  }

  function renderWifi(c) {
    const wifiService = c.serviceGroups[0].items.find(i => i.icon === 'wifi');
    const isVi = state.lang === 'vi';
    const freeTitle = isVi ? 'Wi-Fi miễn phí' : 'Complimentary Wi-Fi';
    const inRoom = isVi ? 'Trong phòng' : 'In-room access';
    const publicArea = isVi ? 'Khu vực công cộng' : 'Public areas';
    const qrAccess = isVi ? 'Kết nối bằng QR' : 'Connect with QR';
    const qrHint = isVi
      ? 'Quét mã QR bằng camera điện thoại để kết nối Wi-Fi Pinewood Hotel Dalat.'
      : 'Scan the QR code with your phone camera to connect to Pinewood Hotel Dalat Wi-Fi.';

    return pageHero('WI-FI', wifiService.text) + `
      <section class="page-section wifi-page-section">
        <div class="shell wifi-showcase">
          <article class="feature-panel accent wifi-intro-panel">
            <div class="wifi-intro-icon">${icon('wifi')}</div>
            <p class="eyebrow wifi-intro-eyebrow">PINEWOOD HOTEL DALAT</p>
            <h2>${esc(freeTitle)}</h2>
            <div class="wifi-intro-rule" aria-hidden="true"></div>
            <p class="wifi-intro-copy">${esc(wifiService.text)}</p>
            <div class="wifi-feature-list">
              <div class="wifi-feature-item"><span class="wifi-feature-icon">${icon('bed')}</span><strong>${esc(inRoom)}</strong></div>
              <div class="wifi-feature-item"><span class="wifi-feature-icon">${icon('globe')}</span><strong>${esc(publicArea)}</strong></div>
              <div class="wifi-feature-item"><span class="wifi-feature-icon">${icon('wifi')}</span><strong>${esc(qrAccess)}</strong></div>
            </div>
          </article>
          <article class="feature-panel wifi-access-panel wifi-option2-access">
            <header class="wifi-access-heading">
              <p class="eyebrow">FREE WI-FI</p>
              <h2>${esc(c.ui.quickAccess)}</h2>
            </header>
            <div class="wifi-credentials">
              <div class="wifi-credential-card">
                <span class="wifi-credential-icon">${icon('wifi')}</span>
                <div><span>${esc(c.ui.network)}</span><strong>${esc(CONFIG.wifi.ssid)}</strong></div>
              </div>
              <div class="wifi-credential-card">
                <span class="wifi-credential-icon">${icon('shield')}</span>
                <div><span>${esc(c.ui.password)}</span><strong>${esc(CONFIG.wifi.password)}</strong></div>
              </div>
            </div>
            <div class="wifi-premium-qr-card">
              <div class="wifi-logo-medallion" aria-hidden="true"><img src="/assets/logo/pinewood-logo.svg" alt=""></div>
              <img class="wifi-page-qr" src="/assets/qr/wifi-pinewood.svg" alt="Wi-Fi QR - Pinewood Hotel Dalat">
              <div class="wifi-qr-divider" aria-hidden="true"><span></span></div>
              <strong>Pinewood Hotel Dalat</strong>
              <p>${esc(qrHint)}</p>
            </div>
          </article>
        </div>
      </section>`;
  }

  function renderBreakfast(c) {
  const intro = state.lang === 'vi'
    ? 'Thời gian và địa điểm phục vụ bữa sáng dành cho khách lưu trú.'
    : 'Breakfast service hours and location for staying guests.';
  const venueText = state.lang === 'vi'
    ? 'Bữa sáng được phục vụ tại nhà hàng của khách sạn mỗi ngày.'
    : 'Breakfast is served daily at the hotel restaurant.';
  const timeNote = state.lang === 'vi' ? 'Phục vụ hằng ngày' : 'Served daily';
  return pageHero(state.lang === 'vi' ? 'BỮA SÁNG' : 'BREAKFAST', intro) + `<section class="page-section"><div class="shell info-feature"><div class="feature-panel accent">${icon('coffee')}<h2>${esc(c.ui.restaurant)}</h2><p>${esc(venueText)}</p></div><div class="feature-panel"><p class="eyebrow">${esc(c.ui.daily)}</p><div class="big-time">${CONFIG.breakfast.from} — ${CONFIG.breakfast.to}</div><p>${esc(timeNote)}</p></div></div></section>`;
}

  function renderSafety(c) {
  const emergency = c.serviceGroups[0].items.find(i => i.title.includes(state.lang === 'vi' ? 'CHÁY' : 'FIRE'));
  const intro = state.lang === 'vi'
    ? 'Thông tin an toàn và hướng dẫn khẩn cấp dành cho khách lưu trú.'
    : 'Safety information and emergency guidance for staying guests.';
  return pageHero(state.lang === 'vi' ? 'AN TOÀN & KHẨN CẤP' : 'SAFETY & EMERGENCY', intro) + `<section class="page-section"><div class="shell info-feature"><div class="feature-panel accent">${icon('shield')}<h2>${esc(state.lang === 'vi' ? 'Khi phát hiện cháy hoặc khói' : 'If you detect fire or smoke')}</h2><p>${esc(emergency.text)}</p></div><div class="feature-panel"><p class="eyebrow">RECEPTION</p><div class="big-time">${esc(state.lang === 'vi' ? 'NHẤN 0' : 'DIAL 0')}</div><p>${esc(c.ui.receptionDial)}</p><button class="button button-primary" type="button" data-open-support>${esc(c.ui.needAssistance)}</button></div></div></section>`;
}

  function renderContact(c) {
    const address = state.lang === 'vi' ? CONFIG.address.vi : CONFIG.address.en;
    const locationTitle = state.lang === 'vi' ? 'VỊ TRÍ KHÁCH SẠN' : 'HOTEL LOCATION';
    const directionsLabel = state.lang === 'vi' ? 'Chỉ đường' : 'Get Directions';
    const locationIntro = state.lang === 'vi' ? 'Mở Google Maps để được hướng dẫn đường đi trực tiếp đến Pinewood Hotel Dalat.' : 'Open Google Maps for turn-by-turn directions to Pinewood Hotel Dalat.';
    return pageHero(state.lang === 'vi' ? 'LIÊN HỆ' : 'CONTACT', c.ui.assistanceText) + `
      <section class="page-section">
        <div class="shell">
          <div class="contact-grid">
            <div class="contact-panel">${icon('phone')}<h2>${esc(c.ui.callReception)}</h2><p>${esc(c.ui.receptionDial)}</p><a class="phone-number" href="tel:${CONFIG.phoneTel}">${esc(CONFIG.phoneDisplay)}</a><a class="contact-email" href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a><a class="button button-primary" href="tel:${CONFIG.phoneTel}">${esc(c.ui.callReception)}</a></div>
            <div class="contact-panel"><h2>ZALO</h2><img class="zalo-qr" alt="QR Zalo Pinewood Hotel Dalat"><p>${esc(c.ui.scanZalo)}</p></div>
          </div>
          <section class="contact-location" aria-label="${esc(locationTitle)}">
            <div class="contact-map-wrap">
              <iframe class="contact-map" src="https://www.google.com/maps?q=Pinewood%20Hotel%20Dalat%2C%2054%20%C4%90%C6%B0%E1%BB%9Dng%20V%C3%B5%20Tr%C6%B0%E1%BB%9Dng%20To%E1%BA%A3n%2C%20%C4%90%C3%A0%20L%E1%BA%A1t%2C%20L%C3%A2m%20%C4%90%E1%BB%93ng%2C%20Vi%E1%BB%87t%20Nam&output=embed" title="Google Maps - Pinewood Hotel Dalat" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="contact-location-copy">
              <p class="eyebrow">GOOGLE MAPS</p>
              <h2>${esc(locationTitle)}</h2>
              <address>${esc(address)}</address>
              <p>${esc(locationIntro)}</p>
              <a class="button button-primary directions-button" href="https://www.google.com/maps/dir/?api=1&destination=Pinewood%20Hotel%20Dalat%2C%2054%20%C4%90%C6%B0%E1%BB%9Dng%20V%C3%B5%20Tr%C6%B0%E1%BB%9Dng%20To%E1%BA%A3n%2C%20%C4%90%C3%A0%20L%E1%BA%A1t%2C%20L%C3%A2m%20%C4%90%E1%BB%93ng%2C%20Vi%E1%BB%87t%20Nam" target="_blank" rel="noopener noreferrer">${esc(directionsLabel)} →</a>
            </div>
          </section>
        </div>
      </section>`;
  }

  function renderEnvironment(c) {
    const e = c.environment;
    const list = items => `<ol class="number-list">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ol>`;
    return pageHero(e.title, state.lang === 'vi' ? 'Cùng Pinewood Hotel Dalat sử dụng tài nguyên có trách nhiệm và gìn giữ môi trường.' : 'Help Pinewood Hotel Dalat use resources responsibly and protect the environment.') + `<section class="page-section"><div class="shell environment-grid"><div class="content-card"><h2>${esc(e.guestTitle)}</h2>${list(e.guestItems)}</div><div class="content-card"><h2>${esc(e.hotelTitle)}</h2>${list(e.hotelItems)}</div></div></section>`;
  }

  function renderFullInfo(c) {
    const w = c.welcome;
    return pageHero(state.lang === 'vi' ? 'THÔNG TIN KHÁCH SẠN' : 'HOTEL INFORMATION', c.ui.sourceNotice) + `<section class="page-section full-info"><div class="shell"><details open><summary>${esc(w.title)}</summary><div class="detail-body prose"><p class="greeting">${esc(w.greeting)}</p>${w.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="closing">${esc(w.closing)}</p><p class="signature">${esc(w.signature)}</p></div></details><details><summary>${esc(c.serviceGroups[0].title)}</summary><div class="detail-body service-grid">${c.serviceGroups[0].items.map(item=>`<article class="service-card">${icon(item.icon)}<h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></article>`).join('')}</div></details><details><summary>${esc(state.lang === 'vi' ? 'QUY ĐỊNH KHÁCH SẠN' : 'HOTEL RULES')}</summary><div class="detail-body rule-list">${c.rules.map((r,i)=>`<article class="rule-card"><div class="rule-number">${String(i+1).padStart(2,'0')}</div><h2>${esc(r.title)}</h2><p>${esc(r.text)}</p></article>`).join('')}</div></details><details><summary>${esc(c.environment.title)}</summary><div class="detail-body environment-grid"><div><h2>${esc(c.environment.guestTitle)}</h2><ol class="number-list">${c.environment.guestItems.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div><div><h2>${esc(c.environment.hotelTitle)}</h2><ol class="number-list">${c.environment.hotelItems.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div></div></details></div></section>`;
  }

  function renderWelcomeLetterDialog(c) {
    const w = c.welcome;
    document.getElementById('welcome-dialog-title').textContent = w.title;
    document.getElementById('welcome-dialog-greeting').textContent = w.greeting;
    document.getElementById('welcome-dialog-body').innerHTML = w.paragraphs.map(p => `<p>${esc(p)}</p>`).join('');
    document.getElementById('welcome-dialog-closing').textContent = w.closing;
    document.getElementById('welcome-dialog-signature').textContent = w.signature;
    document.getElementById('welcome-dialog-contact').textContent = state.lang === 'vi' ? 'Liên hệ' : 'Contact';
    document.getElementById('welcome-dialog-close').setAttribute('aria-label', c.ui.close);
  }

  function openWelcomeLetter() {
    if (typeof welcomeDialog.showModal === 'function' && !welcomeDialog.open) welcomeDialog.showModal();
  }

  function render() {
    const c = CONTENT[state.lang];
    document.documentElement.lang = state.lang;
    document.title = `${CONFIG.name} · ${state.key === 'home' ? c.ui.guestInformation : c.ui[state.key] || CONFIG.name}`;
    document.querySelector('meta[name="description"]').setAttribute('content', c.metaDescription);
    renderNav();
    const brandLink = document.querySelector('.brand');
    if (brandLink) brandLink.setAttribute('href', pathTable[state.lang].home);
    document.querySelectorAll('[data-lang]').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === state.lang));
    document.getElementById('footer-line').textContent = CONFIG.slogan[state.lang];
    document.getElementById('footer-address').textContent = CONFIG.address[state.lang];
    document.getElementById('footer-line').setAttribute('aria-label', state.lang === 'vi' ? 'Xem trải nghiệm Ngủ ngon - Ấm áp - Đậm chất Đà Lạt' : 'View Sleep Well - Stay Warm - Feel Dalat experience');
    document.getElementById('footer-support').textContent = c.ui.needAssistance;
    document.getElementById('assistance-title').textContent = c.ui.needAssistance;
    document.getElementById('assistance-text').textContent = c.ui.assistanceText;
    document.getElementById('call-reception').textContent = c.ui.callReception;
    document.getElementById('scan-zalo').textContent = c.ui.scanZalo;
    menuButton.setAttribute('aria-label', c.ui.menu);
    document.getElementById('dialog-close').setAttribute('aria-label', c.ui.close);
    renderWelcomeLetterDialog(c);

    const renderer = {
      home: renderHome, welcome: renderWelcome, rules: renderRules, wifi: renderWifi, breakfast: renderBreakfast,
      services: renderServices, safety: renderSafety, contact: renderContact, environment: renderEnvironment, fullInfo: renderFullInfo
    }[state.key] || renderHome;
    main.innerHTML = renderer(c);
    setQrSources();
    bindDynamicActions();
  }

  function setQrSources() {
    document.querySelectorAll('.zalo-qr').forEach(img => {
      img.src = ZALO_QR;
      img.setAttribute('role', 'link');
      img.setAttribute('tabindex', '0');
      img.setAttribute('aria-label', state.lang === 'vi' ? 'Mở Zalo Pinewood Hotel Dalat' : 'Open Pinewood Hotel Dalat on Zalo');
      img.setAttribute('title', state.lang === 'vi' ? 'Chạm để mở Zalo' : 'Tap to open Zalo');
    });
  }

  function bindDynamicActions() {
  document.querySelectorAll('[data-open-support]').forEach(btn => btn.addEventListener('click', openSupport));
}

  function openSupport() {
    if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  }

  function closeMenu() {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileMenu.hidden = open;
    document.body.classList.toggle('menu-open', !open);
  });

  document.addEventListener('click', event => {
    const zaloQr = event.target.closest('.zalo-qr');
    if (zaloQr) {
      event.preventDefault();
      window.open(CONFIG.zaloUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const route = event.target.closest('[data-route]');
    if (route) {
      const url = new URL(route.href, window.location.origin);
      if (url.origin === window.location.origin) {
        event.preventDefault();
        navigateTo(url.pathname);
      }
    }
    const langButton = event.target.closest('[data-lang]');
    if (langButton) setLanguage(langButton.dataset.lang);
    if (!mobileMenu.hidden && !event.target.closest('#mobile-menu') && !event.target.closest('#menu-button')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('zalo-qr')) {
      event.preventDefault();
      window.open(CONFIG.zaloUrl, '_blank', 'noopener,noreferrer');
    }
    if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu();
  });

  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  document.getElementById('welcome-dialog-close').addEventListener('click', () => welcomeDialog.close());
  document.getElementById('welcome-dialog-contact').addEventListener('click', () => {
    welcomeDialog.close();
    window.setTimeout(openSupport, 120);
  });
  welcomeDialog.addEventListener('click', event => {
    const rect = welcomeDialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) welcomeDialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!welcomePendingAfterAssistance) return;
    welcomePendingAfterAssistance = false;
    window.setTimeout(openWelcomeLetter, 220);
  });
  document.getElementById('footer-support').addEventListener('click', openSupport);
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
  window.addEventListener('popstate', () => { state = detectRoute(); render(); window.scrollTo(0,0); });

  const stored = getStoredLanguage();
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  if (stored && state.key === 'home' && currentPath === '/' && stored === 'en') {
    state = { lang: 'en', key: 'home' };
    history.replaceState({}, '', '/en');
  }

  render();

  if (!sessionStorage.getItem('pinewood-intro-sequence-v1')) {
    sessionStorage.setItem('pinewood-intro-sequence-v1', '1');
    sessionStorage.setItem('pinewood-assistance-seen', '1');
    welcomePendingAfterAssistance = true;
    window.setTimeout(openSupport, 700);
  }
})();
