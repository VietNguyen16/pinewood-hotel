(() => {
  const details = Array.from(document.querySelectorAll('[data-room-detail]'));
  const galleries = new WeakMap();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = document.documentElement.lang === 'en' ? 'en' : 'vi';

  const roomSlugFromHash = () => {
    const value = window.location.hash.replace(/^#room-/, '');
    if (!value || value === window.location.hash.slice(1)) return null;
    return details.some(panel => panel.dataset.roomDetail === value) ? value : null;
  };

  const gallerySources = gallery => Array.from(gallery.querySelectorAll('[data-gallery-src]')).map(node => ({
    src: node.dataset.gallerySrc,
    alt: node.dataset.galleryAlt || gallery.dataset.roomName || ''
  })).filter(item => item.src);

  const setGalleryIndex = (gallery, index) => {
    const state = galleries.get(gallery);
    if (!state || !state.sources.length) return;
    const total = state.sources.length;
    state.index = (index + total) % total;
    const current = state.sources[state.index];
    state.image.src = current.src;
    state.image.alt = current.alt;
    state.link.href = current.src;
    state.counter.textContent = `${state.index + 1} / ${total}`;
  };

  const initGallery = gallery => {
    if (galleries.has(gallery)) return galleries.get(gallery);
    const image = gallery.querySelector('[data-gallery-main-image]');
    const link = gallery.querySelector('[data-gallery-main-link]');
    const counter = gallery.querySelector('[data-gallery-counter]');
    const sources = gallerySources(gallery);
    if (!image || !link || !counter || !sources.length) return null;

    const state = { image, link, counter, sources, index: 0 };
    galleries.set(gallery, state);
    setGalleryIndex(gallery, 0);

    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => setGalleryIndex(gallery, state.index - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => setGalleryIndex(gallery, state.index + 1));
    return state;
  };

  const showRoomFromHash = ({ focus = false } = {}) => {
    const slug = roomSlugFromHash();
    let active = null;
    details.forEach(panel => {
      const selected = panel.dataset.roomDetail === slug;
      panel.hidden = !selected;
      if (selected) active = panel;
    });

    if (!active) return;
    const gallery = active.querySelector('[data-room-gallery]');
    if (gallery) initGallery(gallery);

    requestAnimationFrame(() => {
      active.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (focus) active.focus({ preventScroll: true });
    });
  };

  document.querySelectorAll('[data-room-open]').forEach(link => {
    link.addEventListener('click', () => requestAnimationFrame(() => showRoomFromHash({ focus: true })));
  });
  document.querySelectorAll('[data-room-back]').forEach(link => {
    link.addEventListener('click', () => {
      details.forEach(panel => { panel.hidden = true; });
    });
  });
  window.addEventListener('hashchange', () => showRoomFromHash());

  document.querySelectorAll('[data-amenities-toggle]').forEach(button => {
    const target = document.getElementById(button.getAttribute('aria-controls'));
    if (!target) return;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      target.hidden = expanded;
      const icon = button.querySelector('span');
      if (icon) icon.textContent = expanded ? '+' : '−';
      const label = lang === 'en'
        ? (expanded ? 'View all amenities' : 'Show fewer amenities')
        : (expanded ? 'Xem tất cả tiện nghi' : 'Thu gọn tiện nghi');
      const textNode = Array.from(button.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.nodeValue = `${label} `;
    });
  });

  const booking = window.HOTEL_CONFIG?.booking;
  document.querySelectorAll('[data-room-cta]').forEach(link => {
    const fallback = link.dataset.contactFallback || link.getAttribute('href');
    if (booking?.enabled === true && typeof booking.url === 'string' && booking.url.trim()) {
      link.href = booking.url.trim();
    } else {
      link.href = fallback;
    }
  });

  const languageLink = document.querySelector('.marketing-lang-link');
  if (languageLink) {
    languageLink.addEventListener('click', () => {
      const slug = roomSlugFromHash();
      if (slug) languageLink.href = `${languageLink.pathname}#room-${slug}`;
    });
  }

  const dialog = document.getElementById('room-lightbox');
  const dialogImage = document.getElementById('room-lightbox-image');
  const dialogCaption = document.getElementById('room-lightbox-caption');
  const dialogClose = document.getElementById('room-lightbox-close');
  const dialogPrev = document.getElementById('room-lightbox-prev');
  const dialogNext = document.getElementById('room-lightbox-next');
  let lightboxSources = [];
  let lightboxIndex = 0;

  const setLightboxIndex = index => {
    if (!lightboxSources.length || !dialogImage || !dialogCaption) return;
    lightboxIndex = (index + lightboxSources.length) % lightboxSources.length;
    const current = lightboxSources[lightboxIndex];
    dialogImage.src = current.src;
    dialogImage.alt = current.alt;
    dialogCaption.textContent = lightboxSources.length > 1
      ? `${current.alt} · ${lightboxIndex + 1} / ${lightboxSources.length}`
      : current.alt;
    const hideNav = lightboxSources.length < 2;
    if (dialogPrev) dialogPrev.hidden = hideNav;
    if (dialogNext) dialogNext.hidden = hideNav;
  };

  const openLightbox = anchor => {
    if (!dialog || !dialogImage || typeof dialog.showModal !== 'function') return false;
    const gallery = anchor.closest('[data-room-gallery]');
    if (gallery) {
      const state = initGallery(gallery);
      if (!state) return false;
      lightboxSources = state.sources;
      lightboxIndex = state.index;
    } else {
      const img = anchor.querySelector('img');
      lightboxSources = [{ src: anchor.href, alt: img?.alt || anchor.dataset.title || '' }];
      lightboxIndex = 0;
    }
    setLightboxIndex(lightboxIndex);
    dialog.showModal();
    return true;
  };

  document.addEventListener('click', event => {
    const anchor = event.target.closest('[data-room-lightbox]');
    if (!anchor) return;
    if (openLightbox(anchor)) event.preventDefault();
  });

  dialogClose?.addEventListener('click', () => { if (dialog?.open) dialog.close(); });
  dialogPrev?.addEventListener('click', () => setLightboxIndex(lightboxIndex - 1));
  dialogNext?.addEventListener('click', () => setLightboxIndex(lightboxIndex + 1));
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => {
    dialogImage?.removeAttribute('src');
    if (dialogCaption) dialogCaption.textContent = '';
    lightboxSources = [];
  });
  document.addEventListener('keydown', event => {
    if (!dialog?.open || lightboxSources.length < 2) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setLightboxIndex(lightboxIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setLightboxIndex(lightboxIndex + 1);
    }
  });

  showRoomFromHash();
})();
