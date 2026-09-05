from pathlib import Path
import re

warm = Path('css/warm-theme.css')
s = warm.read_text()
for old, new in {
    '#F7F3EA': '#FBF9F4',
    '#FBF8F2': '#FDFCFA',
    '#FCF9F2': '#FFFCF7',
    '#F2ECE1': '#F7F2EA',
    '#FCFAF5': '#FDFBF8',
    '#F2EADF': '#F8F4ED',
    'rgba(252, 249, 242, .96)': 'rgba(253, 251, 248, .97)',
    '#FEFBF5': '#FFFDFA',
    '#F5EFE4': '#F9F5EE',
    '#F4EEE3': '#FAF6EF',
    '#FAF7F1': '#FCFAF6',
    '#F1E8D8': '#F6F0E7',
    '#F8F3E9': '#FBF8F2',
}.items():
    s = s.replace(old, new)
warm.write_text(s)

forest = Path('assets/images/forest-hero.svg')
s = forest.read_text()
for old, new in {
    '#F7F3EA': '#FBF9F4',
    '#FCF9F2': '#FFFCF7',
    '#F5EFE4': '#F9F5EE',
}.items():
    s = s.replace(old, new)
forest.write_text(s)

main = Path('js/main.js')
s = main.read_text()
restored_wifi = r'''  function renderWifi(c) {
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

'''
pattern = re.compile(r'  function renderWifi\(c\) \{.*?\n  function renderBreakfast\(c\) \{', re.S)
if not pattern.search(s):
    raise SystemExit('renderWifi block not found')
s = pattern.sub(restored_wifi + '  function renderBreakfast(c) {', s, count=1)
main.write_text(s)

Path('css/wifi-layout-fix.css').write_text(r'''/* Pinewood Wi-Fi logo/layout refinement.
   Loaded globally so first SPA navigation and direct reload render identically.
   The original green left panel and overall split composition are intentionally preserved. */

@media (min-width: 821px) {
  .wifi-option2-access .wifi-credentials {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
    gap: 26px !important;
    align-items: stretch !important;
  }
  .wifi-option2-access .wifi-credentials::before {
    content: none !important;
    display: none !important;
    background: none !important;
  }
  .wifi-option2-access .wifi-credential-card:first-child { grid-column: 1 !important; grid-row: 1 !important; }
  .wifi-option2-access .wifi-credential-card:last-child { grid-column: 2 !important; grid-row: 1 !important; }
  .wifi-option2-access .wifi-credential-card { width: 100% !important; min-width: 0 !important; height: 100% !important; }
  .wifi-option2-access .wifi-premium-qr-card { margin-top: 40px !important; padding: 52px 28px 28px !important; }
  .wifi-option2-access .wifi-logo-medallion {
    position: absolute !important;
    top: 0 !important;
    left: 50% !important;
    width: 72px !important;
    height: 72px !important;
    padding: 10px !important;
    display: grid !important;
    place-items: center !important;
    transform: translate(-50%, -50%) !important;
    border: 1px solid rgba(178,142,105,.36) !important;
    border-radius: 50% !important;
    background: #FFFCF7 !important;
    box-shadow: 0 8px 18px rgba(12,53,34,.07) !important;
    z-index: 2 !important;
  }
  .wifi-option2-access .wifi-logo-medallion img { width: 52px !important; height: 52px !important; object-fit: contain !important; }
}

@media (max-width: 820px) {
  .wifi-option2-access .wifi-credentials { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 12px !important; align-items: stretch !important; }
  .wifi-option2-access .wifi-credential-card:first-child { grid-column: 1 !important; grid-row: 1 !important; }
  .wifi-option2-access .wifi-credentials::before {
    content: '' !important;
    display: block !important;
    grid-column: 1 !important;
    grid-row: 2 !important;
    justify-self: center !important;
    width: 72px !important;
    height: 72px !important;
    margin: 10px 0 !important;
    border: 1px solid rgba(178,142,105,.36) !important;
    border-radius: 50% !important;
    background: #FFFCF7 url('/assets/logo/pinewood-logo.svg') center / 52px auto no-repeat !important;
    box-shadow: 0 8px 18px rgba(12,53,34,.07) !important;
  }
  .wifi-option2-access .wifi-credential-card:last-child { grid-column: 1 !important; grid-row: 3 !important; }
  .wifi-option2-access .wifi-logo-medallion { display: none !important; }
  .wifi-option2-access .wifi-premium-qr-card { margin-top: 18px !important; padding: 22px 16px 20px !important; }
}
''')

layout = Path('_layouts/app.html')
s = layout.read_text()
s = re.sub(r'/css/warm-theme\.css\?v=[^\"\']+', '/css/warm-theme.css?v=20260905warm4', s)
s = re.sub(r'/css/wifi-layout-fix\.css\?v=[^\"\']+', '/css/wifi-layout-fix.css?v=20260905wifi4', s)
s = re.sub(r'/js/main\.js\?v=[^\"\']+', '/js/main.js?v=20260905wifi4', s)
s = s.replace('<meta name="theme-color" content="#F7F3EA">', '<meta name="theme-color" content="#FBF9F4">')
layout.write_text(s)
