window.HOTEL_CONFIG = Object.freeze({
  name: "Pinewood Hotel Dalat",
  shortName: "Pinewood Hotel",
  domain: "https://pinewoodhotel.vn/",
  websiteLabel: "pinewoodhotel.vn",
  email: "info@pinewoodhotel.vn",
  zaloUrl: "https://zalo.me/0785098686",
  social: Object.freeze({
    instagram: "https://www.instagram.com/pinewooddalat/",
    tiktok: "https://www.tiktok.com/@dalat.pinewood"
  }),
  reviews: Object.freeze({
    googleMaps: "https://www.google.com/maps/place/Kh%C3%A1ch+s%E1%BA%A1n+Pinewood/@11.9611181,108.4486208,1207m/data=!3m1!1e3!4m11!3m10!1s0x3171130010cadc19:0xdcb299e4322ab577!5m2!4m1!1i2!8m2!3d11.9611181!4d108.4512011!9m1!1b1!16s%2Fg%2F11njdj19vf",
    booking: "https://www.booking.com/hotel/vn/pinewood-dalat.html"
  }),
  geo: Object.freeze({
    latitude: 11.9611181,
    longitude: 108.4512011
  }),
  slogan: {
    vi: "Ngủ ngon - Ấm áp - Đậm chất Đà Lạt",
    en: "Sleep Well - Stay Warm - Feel Dalat"
  },
  experienceImage: "assets/images/pinewood-experience.webp",
  phoneDisplay: "0785 098 686",
  phoneTel: "+84785098686",
  roomDial: "0",
  address: {
    vi: "54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam",
    en: "54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam"
  },
  wifi: {
    ssid: "Pinewood Hotel Dalat",
    password: "***"
  },
  breakfast: {
    from: "06:30",
    to: "09:00"
  },
  checkIn: "14:00",
  checkOut: "12:00",
  booking: {
    enabled: false,
    url: ""
  }
});

const pinewoodNormalizePath = value => (value || '/').replace(/\/+$/, '') || '/';
const pinewoodIsHomePath = value => {
  const path = pinewoodNormalizePath(value);
  return path === '/' || path === '/en';
};

const pinewoodInitialPath = pinewoodNormalizePath(window.location.pathname);
if (pinewoodInitialPath === '/') {
  try {
    if (localStorage.getItem('pinewood-language') === 'en') {
      window.location.replace('/en/');
    }
  } catch (error) {
    // Continue with the Vietnamese homepage when storage is unavailable.
  }
}

const pinewoodMain = document.getElementById('main-content');
if (pinewoodIsHomePath(window.location.pathname) && pinewoodMain?.querySelector('.home-reference')) {
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  if (descriptor?.get && descriptor?.set && !pinewoodMain.__pinewoodStaticHomeProtected) {
    Object.defineProperty(pinewoodMain, '__pinewoodStaticHomeProtected', { value: true });
    Object.defineProperty(pinewoodMain, 'innerHTML', {
      configurable: true,
      get() {
        return descriptor.get.call(this);
      },
      set(value) {
        if (pinewoodIsHomePath(window.location.pathname)) return;
        descriptor.set.call(this, value);
      }
    });
  }
}

document.addEventListener('click', event => {
  const currentIsHome = pinewoodIsHomePath(window.location.pathname);
  const langButton = event.target.closest?.('[data-lang]');
  if (currentIsHome && langButton) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const lang = langButton.dataset.lang === 'en' ? 'en' : 'vi';
    try { localStorage.setItem('pinewood-language', lang); } catch (error) {}
    window.location.assign(lang === 'en' ? '/en/' : '/');
    return;
  }

  const route = event.target.closest?.('a[data-route]');
  if (!route) return;
  try {
    const url = new URL(route.href, window.location.origin);
    if (url.origin === window.location.origin && pinewoodIsHomePath(url.pathname)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(`${url.pathname}${url.search}${url.hash}`);
    }
  } catch (error) {
    // Leave malformed links to the browser.
  }
}, true);

window.addEventListener('popstate', event => {
  if (!pinewoodIsHomePath(window.location.pathname)) return;
  if (document.querySelector('.home-reference')) return;
  event.stopImmediatePropagation();
  window.location.reload();
}, true);

if (!document.querySelector('script[data-homepage-ux-loader]')) {
  const homepageUx = document.createElement('script');
  homepageUx.src = '/js/homepage-ux.js?v=20260908ux1';
  homepageUx.dataset.homepageUxLoader = 'true';
  homepageUx.async = false;
  document.head.appendChild(homepageUx);
}

if (!document.querySelector('script[data-site-runtime-fixes-loader]')) {
  const runtimeFixes = document.createElement('script');
  runtimeFixes.src = '/js/site-runtime-fixes.js?v=20260908fix1';
  runtimeFixes.dataset.siteRuntimeFixesLoader = 'true';
  runtimeFixes.async = false;
  document.head.appendChild(runtimeFixes);
}
