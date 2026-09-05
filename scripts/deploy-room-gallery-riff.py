from pathlib import Path
import re

ROOT = Path('/tmp/main')
VERSION = '20260905hq-riff'

PAGES = {
    'phong/index.html': {
        'eyebrow': 'CHI TIẾT PHÒNG',
        'title': 'Thêm góc nhìn về không gian lưu trú',
        'desc': 'Khám phá khu vực nghỉ ngơi, tiện nghi trong phòng và phòng tắm được chuẩn bị cho một kỳ nghỉ thoải mái tại Đà Lạt.',
        'dialog': 'Trình xem ảnh phòng',
        'close': 'Đóng ảnh lớn',
        'view': 'Xem ảnh lớn:',
        'cards': [
            ('bedroom', 'Không gian nghỉ ngơi', 'Hai giường, nội thất ấm áp và nhiều ánh sáng.', 'Phòng hai giường sáng thoáng tại Pinewood Hotel Dalat'),
            ('amenities', 'Tiện nghi được chuẩn bị', 'Những chi tiết thiết thực cho kỳ lưu trú thuận tiện.', 'Tiện nghi trong phòng tại Pinewood Hotel Dalat'),
            ('bathroom', 'Phòng tắm riêng', 'Không gian sạch sẽ, thoải mái và đầy đủ tiện nghi cơ bản.', 'Phòng tắm tại Pinewood Hotel Dalat'),
        ],
    },
    'en/rooms/index.html': {
        'eyebrow': 'ROOM DETAILS',
        'title': 'More views of the Pinewood stay',
        'desc': 'Explore the sleeping area, in-room amenities and bathroom details prepared for a comfortable stay in Da Lat.',
        'dialog': 'Room photo viewer',
        'close': 'Close full image',
        'view': 'View full image:',
        'cards': [
            ('bedroom', 'Bright sleeping space', 'Twin beds, warm finishes and natural light.', 'Bright twin guest room at Pinewood Hotel Dalat'),
            ('amenities', 'Prepared amenities', 'Useful room details arranged for an easy stay.', 'In-room amenities at Pinewood Hotel Dalat'),
            ('bathroom', 'Private bathroom', 'A clean, comfortable bathroom with essential amenities.', 'Guest bathroom at Pinewood Hotel Dalat'),
        ],
    },
}

for rel, cfg in PAGES.items():
    path = ROOT / rel
    source = path.read_text()
    cards = []
    for key, title, caption, alt in cfg['cards']:
        url = f'/assets/images/pinewood-room-{key}-hq.webp?v={VERSION}'
        cards.append(
            f'<figure class="room-gallery-card">'
            f'<a class="room-gallery-image" href="{url}" data-room-lightbox data-title="{title}" aria-label="{cfg["view"]} {title}">'
            f'<img src="{url}" width="1920" height="1920" loading="lazy" decoding="async" alt="{alt}"></a>'
            f'<figcaption><strong>{title}</strong><span>{caption}</span></figcaption></figure>'
        )
    block = (
        f'<section class="marketing-section room-gallery-section" aria-labelledby="room-gallery-title">'
        f'<div class="shell"><header class="room-gallery-head"><p class="eyebrow">{cfg["eyebrow"]}</p>'
        f'<h2 id="room-gallery-title">{cfg["title"]}</h2><p>{cfg["desc"]}</p></header>'
        f'<div class="room-gallery-grid">{"".join(cards)}</div></div></section>'
        f'<dialog class="room-lightbox" id="room-lightbox" aria-label="{cfg["dialog"]}">'
        f'<button class="room-lightbox-close" id="room-lightbox-close" type="button" aria-label="{cfg["close"]}">×</button>'
        f'<img class="room-lightbox-image" id="room-lightbox-image" alt="">'
        f'<p class="room-lightbox-caption" id="room-lightbox-caption"></p></dialog>'
    )
    pattern = r'<section class="marketing-section room-gallery-section".*?</section>(?:\s*<dialog class="room-lightbox".*?</dialog>)?'
    source, count = re.subn(pattern, block, source, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f'Gallery block not found in {rel}')

    css_tag = f'<link rel="stylesheet" href="/css/room-gallery-hq.css?v={VERSION}">'
    js_tag = f'<script src="/js/room-gallery.js?v={VERSION}" defer></script>'
    if 'room-gallery-hq.css' in source:
        source = re.sub(r'<link[^>]+room-gallery-hq\.css[^>]*>', css_tag, source)
    else:
        source += '\n' + css_tag + '\n'
    if 'room-gallery.js' in source:
        source = re.sub(r'<script[^>]+room-gallery\.js[^>]*></script>', js_tag, source)
    else:
        source += '\n' + js_tag + '\n'

    path.write_text(source)
