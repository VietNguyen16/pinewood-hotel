from pathlib import Path
import re

main = Path('js/main.js')
s = main.read_text(encoding='utf-8')

replacement = '''  function renderWifi(c) {
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

  function renderBreakfast(c) {'''

pattern = r"  function renderWifi\(c\) \{.*?\n  function renderBreakfast\(c\) \{"
updated, count = re.subn(pattern, replacement, s, count=1, flags=re.S)
if count != 1:
    raise SystemExit('Could not replace renderWifi block')
main.write_text(updated, encoding='utf-8')

css = Path('css/style.css')
c = css.read_text(encoding='utf-8')
start = '/* === Pinewood Wi-Fi Option 2 === */'
end = '/* === End Pinewood Wi-Fi Option 2 === */'
block = r'''
/* === Pinewood Wi-Fi Option 2 === */
.wifi-page-section { padding-top: 44px; }
.wifi-showcase { display:grid; grid-template-columns:minmax(330px,.82fr) minmax(0,1.18fr); gap:22px; align-items:stretch; }
.wifi-showcase > .feature-panel { min-width:0; }
.wifi-intro-panel { position:relative; overflow:hidden; min-height:590px; padding:clamp(38px,4.4vw,58px); display:flex; flex-direction:column; justify-content:center; background:radial-gradient(circle at 17% 13%,rgba(178,142,105,.17),transparent 24%),radial-gradient(circle at 92% 85%,rgba(162,184,115,.12),transparent 32%),linear-gradient(145deg,#0c3522 0%,#09301f 60%,#08291b 100%) !important; border-color:rgba(178,142,105,.42) !important; box-shadow:0 20px 50px rgba(12,53,34,.15); }
.wifi-intro-panel::after { content:''; position:absolute; width:300px; height:300px; right:-150px; bottom:-145px; border:1px solid rgba(178,142,105,.18); border-radius:50%; box-shadow:0 0 0 34px rgba(178,142,105,.035),0 0 0 70px rgba(178,142,105,.025); pointer-events:none; }
.wifi-intro-icon { width:66px; height:66px; display:grid; place-items:center; margin-bottom:24px; border:1px solid rgba(255,255,255,.13); border-radius:50%; background:rgba(255,255,255,.07); color:var(--pine-brown); }
.wifi-intro-icon .icon { width:34px; height:34px; }
.wifi-intro-eyebrow { color:rgba(255,255,255,.58); margin-bottom:10px; }
.wifi-intro-panel h2 { margin:0; color:#fff !important; font-size:clamp(32px,3.4vw,46px); line-height:1.12; font-weight:500; }
.wifi-intro-rule { width:54px; height:2px; margin:22px 0 20px; background:var(--pine-brown); }
.wifi-intro-copy { max-width:520px; margin:0 !important; color:rgba(255,255,255,.84) !important; font-size:15px; line-height:1.85 !important; }
.wifi-feature-list { display:grid; gap:11px; margin-top:32px; }
.wifi-feature-item { position:relative; z-index:1; display:flex; align-items:center; gap:14px; min-height:54px; padding:10px 14px; border:1px solid rgba(255,255,255,.12); border-radius:15px; background:rgba(255,255,255,.055); backdrop-filter:blur(5px); }
.wifi-feature-icon { width:34px; height:34px; flex:0 0 34px; display:grid; place-items:center; color:var(--pine-brown); }
.wifi-feature-icon .icon { width:24px; height:24px; }
.wifi-feature-item strong { color:#fff; font-size:13px; font-weight:600; letter-spacing:.01em; }
.wifi-option2-access { padding:clamp(34px,4vw,52px); background:linear-gradient(180deg,#fff 0%,#fdfcf9 100%); border-color:rgba(178,142,105,.36); }
.wifi-access-heading { text-align:center; margin-bottom:26px; }
.wifi-access-heading .eyebrow { margin-bottom:10px; }
.wifi-access-heading h2 { margin:0; color:var(--pine-green); font-size:clamp(30px,3vw,42px); line-height:1.15; font-weight:500; }
.wifi-credentials { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr); gap:13px; }
.wifi-credential-card { min-height:118px; display:flex; align-items:center; gap:15px; padding:20px; border:1px solid rgba(178,142,105,.27); border-radius:18px; background:#f7f6f2; }
.wifi-credential-icon { width:46px; height:46px; flex:0 0 46px; display:grid; place-items:center; border:1px solid rgba(178,142,105,.28); border-radius:50%; color:var(--pine-brown); background:rgba(255,255,255,.78); }
.wifi-credential-icon .icon { width:23px; height:23px; }
.wifi-credential-card > div { min-width:0; }
.wifi-credential-card span:not(.wifi-credential-icon) { display:block; color:var(--muted); font-size:10px; line-height:1.35; text-transform:uppercase; letter-spacing:.12em; }
.wifi-credential-card strong { display:block; margin-top:9px; color:var(--pine-green); font-size:clamp(17px,1.7vw,22px); line-height:1.25; overflow-wrap:anywhere; }
.wifi-premium-qr-card { position:relative; margin-top:22px; padding:46px 28px 28px; text-align:center; border:1px solid rgba(178,142,105,.43); border-radius:22px; background:radial-gradient(circle at 50% 0%,rgba(178,142,105,.07),transparent 30%),#fff; box-shadow:0 12px 30px rgba(12,53,34,.055); }
.wifi-logo-medallion { position:absolute; top:0; left:50%; width:58px; height:58px; padding:8px; display:grid; place-items:center; transform:translate(-50%,-50%); border:1px solid rgba(178,142,105,.42); border-radius:50%; background:#fff; box-shadow:0 8px 18px rgba(12,53,34,.09); }
.wifi-logo-medallion img { width:40px; height:40px; object-fit:contain; }
.wifi-page-qr { width:min(280px,75%); height:auto; margin:4px auto 18px; padding:10px; border-radius:14px; background:#fff; }
.wifi-qr-divider { display:flex; align-items:center; justify-content:center; gap:8px; margin:2px auto 14px; }
.wifi-qr-divider::before,.wifi-qr-divider::after { content:''; width:34px; height:1px; background:rgba(178,142,105,.5); }
.wifi-qr-divider span { width:6px; height:6px; border:1px solid var(--pine-brown); transform:rotate(45deg); }
.wifi-premium-qr-card > strong { display:block; color:var(--pine-green); font-size:17px; }
.wifi-premium-qr-card > p { max-width:430px; margin:9px auto 0; color:var(--muted); font-size:12px; line-height:1.65; }
@media (max-width:820px) {
  .wifi-page-section { padding-top:30px; }
  .wifi-showcase { grid-template-columns:1fr; gap:14px; }
  .wifi-intro-panel { min-height:auto; padding:30px 24px; border-radius:20px; }
  .wifi-intro-icon { width:54px; height:54px; margin-bottom:18px; }
  .wifi-intro-icon .icon { width:28px; height:28px; }
  .wifi-intro-panel h2 { font-size:30px; }
  .wifi-intro-rule { margin:16px 0; }
  .wifi-intro-copy { font-size:14px; line-height:1.7 !important; }
  .wifi-feature-list { margin-top:22px; gap:8px; }
  .wifi-feature-item { min-height:48px; padding:8px 12px; border-radius:13px; }
  .wifi-feature-icon { width:30px; height:30px; flex-basis:30px; }
  .wifi-feature-icon .icon { width:21px; height:21px; }
  .wifi-option2-access { padding:28px 20px 24px; border-radius:20px; }
  .wifi-access-heading { margin-bottom:20px; }
  .wifi-access-heading h2 { font-size:29px; }
  .wifi-credentials { grid-template-columns:1fr; gap:9px; }
  .wifi-credential-card { min-height:88px; padding:15px; }
  .wifi-credential-icon { width:40px; height:40px; flex-basis:40px; }
  .wifi-credential-card strong { font-size:17px; }
  .wifi-premium-qr-card { margin-top:30px; padding:38px 16px 20px; border-radius:18px; }
  .wifi-logo-medallion { width:50px; height:50px; padding:7px; }
  .wifi-logo-medallion img { width:34px; height:34px; }
  .wifi-page-qr { width:min(230px,82%); margin-bottom:12px; }
}
/* === End Pinewood Wi-Fi Option 2 === */
'''

if start in c and end in c:
    c = re.sub(re.escape(start) + r'.*?' + re.escape(end), block.strip(), c, flags=re.S)
else:
    c = c.rstrip() + '\n\n' + block.strip() + '\n'
css.write_text(c, encoding='utf-8')
