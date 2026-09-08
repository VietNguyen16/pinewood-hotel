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

const pinewoodPath = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
if (pinewoodPath === '/' || pinewoodPath === '/en') {
  document.body.classList.add('homepage-render-pending');
  if (!document.getElementById('pinewood-home-render-guard')) {
    const guard = document.createElement('style');
    guard.id = 'pinewood-home-render-guard';
    guard.textContent = 'body.homepage-render-pending #main-content{visibility:hidden!important}body.home-reference-ready #main-content{visibility:visible!important}';
    document.head.appendChild(guard);
  }
}

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
