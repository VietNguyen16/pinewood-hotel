from pathlib import Path
import re

ROOT = Path('.')
BREAKFAST = '/assets/images/pinewood-breakfast-original.webp'
ROOM = '/assets/images/pinewood-room-home.webp'
VERSION = '20260904h'


def read(path):
    return (ROOT / path).read_text(encoding='utf-8')


def write(path, text):
    (ROOT / path).write_text(text, encoding='utf-8')


def replace_required(path, old, new, minimum=1):
    text = read(path)
    count = text.count(old)
    if count < minimum:
        raise SystemExit(f'{path}: expected at least {minimum} occurrence(s) of {old!r}, found {count}')
    write(path, text.replace(old, new))
    print(f'{path}: replaced {count} occurrence(s)')


# Direct source rendering: breakfast image must be part of main.js, not injected by a hotfix.
main_path = 'js/main.js'
main = read(main_path)
old_return = "return pageHero(state.lang === 'vi' ? 'BỮA SÁNG' : 'BREAKFAST', intro) + `<section class=\"page-section\"><div class=\"shell info-feature breakfast-info-feature\"><div class=\"feature-panel accent\">${icon('coffee')}<h2>${esc(c.ui.restaurant)}</h2><p>${esc(venueText)}</p></div><div class=\"feature-panel breakfast-time-panel\"><p class=\"eyebrow\">${esc(c.ui.daily)}</p><div class=\"big-time breakfast-time\">${CONFIG.breakfast.from} — ${CONFIG.breakfast.to}</div><p class=\"breakfast-time-note\">${esc(timeNote)}</p></div></div></section>`;"
new_return = "return pageHero(state.lang === 'vi' ? 'BỮA SÁNG' : 'BREAKFAST', intro) + `<section class=\"page-section\"><div class=\"shell breakfast-layout\"><figure class=\"breakfast-showcase\"><img src=\"/assets/images/pinewood-breakfast-original.webp\" width=\"1600\" height=\"900\" fetchpriority=\"high\" decoding=\"async\" alt=\"${esc(state.lang === 'vi' ? 'Buffet sáng tại Pinewood Hotel Dalat, Đà Lạt' : 'Breakfast buffet at Pinewood Hotel Dalat in Da Lat')}\"><figcaption>${esc(state.lang === 'vi' ? 'Buffet sáng tại nhà hàng Pinewood Hotel Dalat' : 'Breakfast buffet at Pinewood Hotel Dalat restaurant')}</figcaption></figure><div class=\"info-feature breakfast-info-feature\"><div class=\"feature-panel accent\">${icon('coffee')}<h2>${esc(c.ui.restaurant)}</h2><p>${esc(venueText)}</p></div><div class=\"feature-panel breakfast-time-panel\"><p class=\"eyebrow\">${esc(c.ui.daily)}</p><div class=\"big-time breakfast-time\">${CONFIG.breakfast.from} — ${CONFIG.breakfast.to}</div><p class=\"breakfast-time-note\">${esc(timeNote)}</p></div></div></div></section>`;"
if old_return not in main:
    raise SystemExit('js/main.js: breakfast render block not found')
main = main.replace(old_return, new_return, 1)
write(main_path, main)
print('js/main.js: breakfast render now includes production image')

# Marketing/static SEO sources use real photography directly.
replace_required('js/marketing.js', "const roomPhoto = '/assets/images/seo/pinewood-room.svg';", f"const roomPhoto = '{ROOM}';")
replace_required('js/marketing.js', "const cafePhoto = '/assets/images/seo/pinewood-cafe.svg';", f"const cafePhoto = '{BREAKFAST}';")

for path in ['index.html', 'en/index.html']:
    replace_required(path, '/assets/images/seo/pinewood-room.svg', ROOM)
    replace_required(path, '/assets/images/seo/pinewood-cafe.svg', BREAKFAST)

for path in ['dich-vu/index.html', 'en/services/index.html']:
    replace_required(path, '/assets/images/seo/pinewood-cafe.svg', BREAKFAST)

for path in ['phong/index.html', 'en/rooms/index.html']:
    replace_required(path, '/assets/images/pinewood-room-stay-card.webp', ROOM)
    text = read(path)
    text = re.sub(r'\n?<script src="/js/site-fixes\.js\?v=[^"]+" defer></script>', '', text)
    write(path, text)

# Layout metadata/schema use the real room photo; version core scripts to avoid stale CDN/browser cache.
layout = read('_layouts/app.html')
layout = layout.replace('https://pinewoodhotel.vn/assets/images/pinewood-experience.webp', 'https://pinewoodhotel.vn/assets/images/pinewood-room-home.webp')
layout = layout.replace('<script src="/js/qr.js" defer></script>', f'<script src="/js/qr.js?v={VERSION}" defer></script>')
layout = layout.replace('<script src="/js/main.js" defer></script>', f'<script src="/js/main.js?v={VERSION}" defer></script>')
layout = layout.replace('<script src="/js/marketing.js" defer></script>', f'<script src="/js/marketing.js?v={VERSION}" defer></script>')
write('_layouts/app.html', layout)

# Standalone guest pages also need a cache-busted main.js.
for path in ROOT.rglob('index.html'):
    rel = str(path.relative_to(ROOT))
    text = path.read_text(encoding='utf-8')
    if '/js/main.js"' in text:
        text = text.replace('/js/main.js"', f'/js/main.js?v={VERSION}"')
        path.write_text(text, encoding='utf-8')
        print(f'{rel}: cache-busted main.js')

# qr.js must no longer dynamically load site-fixes.js.
qr = read('js/qr.js')
qr = re.sub(r"\n\(\(\) => \{\n  const loadSiteFixes = \(\) => \{.*?\n\}\)\(\);\s*$", '\n', qr, flags=re.S)
if 'site-fixes.js' in qr:
    raise SystemExit('js/qr.js: failed to remove site-fixes loader')
write('js/qr.js', qr)

# Keep a tiny compatibility file so stale cached HTML never gets a 404, but it performs no DOM overrides.
write('js/site-fixes.js', "// Deprecated compatibility shim. Image rendering now lives in main.js and marketing.js.\n")

# Clean SEO runtime: metadata only, no image DOM mutation / MutationObserver.
seo_js = r'''(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const ROOM_IMAGE = `${BASE}/assets/images/pinewood-room-home.webp`;
  const BREAKFAST_IMAGE = `${BASE}/assets/images/pinewood-breakfast-original.webp`;
  const normalize = value => (value || '/').replace(/\/+$/, '') || '/';
  const routes = {
    '/': ['vi', true, 'Pinewood Hotel Dalat | Khách sạn tại Đà Lạt', 'Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt với 50 phòng và suite. Xem ảnh phòng thực tế, bữa sáng, dịch vụ, vị trí và liên hệ trực tiếp.', ROOM_IMAGE],
    '/en': ['en', true, 'Pinewood Hotel Dalat | Hotel in Da Lat, Vietnam', 'Official website of Pinewood Hotel Dalat with 50 rooms and suites, real room photos, breakfast, services, location and direct contact.', ROOM_IMAGE],
    '/dich-vu': ['vi', true, 'Dịch vụ khách sạn tại Đà Lạt | Pinewood Hotel Dalat', 'Dịch vụ tại Pinewood Hotel Dalat: Wi-Fi miễn phí, bữa sáng 06:30–09:00, nhà hàng, buồng phòng và hỗ trợ Lễ tân.', BREAKFAST_IMAGE],
    '/en/services': ['en', true, 'Hotel Services in Da Lat | Pinewood Hotel Dalat', 'Services at Pinewood Hotel Dalat including complimentary Wi-Fi, breakfast 06:30–09:00, restaurant, housekeeping and Reception support.', BREAKFAST_IMAGE],
    '/bua-sang': ['vi', false, 'Bữa sáng | Pinewood Hotel Dalat', 'Thông tin bữa sáng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', BREAKFAST_IMAGE],
    '/en/breakfast': ['en', false, 'Breakfast | Pinewood Hotel Dalat', 'Breakfast information for guests currently staying at Pinewood Hotel Dalat.', BREAKFAST_IMAGE]
  };
  function upsert(selector, attr, name, content) {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attr, name); document.head.appendChild(node); }
    node.setAttribute('content', content);
  }
  function apply() {
    const key = normalize(location.pathname);
    const data = routes[key];
    if (!data) return;
    const [lang, indexable, title, description, image] = data;
    document.documentElement.lang = lang;
    document.title = title;
    upsert('meta[name="description"]', 'name', 'description', description);
    upsert('meta[name="robots"]', 'name', 'robots', indexable ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow');
    upsert('meta[property="og:title"]', 'property', 'og:title', title);
    upsert('meta[property="og:description"]', 'property', 'og:description', description);
    upsert('meta[property="og:image"]', 'property', 'og:image', image);
    upsert('meta[name="twitter:image"]', 'name', 'twitter:image', image);
  }
  addEventListener('popstate', apply);
  addEventListener('DOMContentLoaded', apply, { once: true });
  apply();
})();
'''
write('js/seo.js', seo_js)

# Responsive breakfast image styling lives in the main stylesheet so standalone pages receive it.
style_path = 'css/style.css'
style = read(style_path)
marker = '/* Production breakfast photography */'
if marker not in style:
    style += '''\n\n/* Production breakfast photography */\n.breakfast-layout{display:grid;gap:24px}.breakfast-showcase{margin:0;overflow:hidden;border:1px solid var(--line);border-radius:24px;background:#fff;box-shadow:var(--shadow-soft)}.breakfast-showcase img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;object-position:center}.breakfast-showcase figcaption{padding:12px 16px;color:var(--muted);font-size:13px;line-height:1.5}.breakfast-layout .breakfast-info-feature{margin-top:0}@media(max-width:720px){.breakfast-layout{gap:18px}.breakfast-showcase{border-radius:18px}.breakfast-showcase figcaption{padding:10px 12px;font-size:12px}}\n'''
write(style_path, style)

# Sitemap must reference indexable real image files.
sitemap = read('sitemap.xml')
sitemap = sitemap.replace('https://pinewoodhotel.vn/assets/images/seo/pinewood-room.svg', 'https://pinewoodhotel.vn/assets/images/pinewood-room-home.webp')
sitemap = sitemap.replace('https://pinewoodhotel.vn/assets/images/seo/pinewood-cafe.svg', 'https://pinewoodhotel.vn/assets/images/pinewood-breakfast-original.webp')
sitemap = re.sub(r'<lastmod>2026-09-03</lastmod>', '<lastmod>2026-09-04</lastmod>', sitemap)
write('sitemap.xml', sitemap)

# Global source check: no production render path should point to known placeholders/broken breakfast asset.
forbidden = [
    '/assets/images/seo/pinewood-room.svg',
    '/assets/images/seo/pinewood-cafe.svg',
    '/assets/images/seo/pinewood-breakfast-buffet.jpg'
]
scan_ext = {'.html', '.js', '.xml'}
violations = []
for path in ROOT.rglob('*'):
    if path.is_file() and path.suffix in scan_ext and '.git' not in path.parts and '.asset-upload' not in path.parts:
        text = path.read_text(encoding='utf-8', errors='ignore')
        for token in forbidden:
            if token in text:
                violations.append(f'{path}: {token}')
if violations:
    raise SystemExit('Forbidden image references remain:\n' + '\n'.join(violations))

print('Source patch complete.')
