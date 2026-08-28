# Pinewood Hotel Dalat — Project Handoff

> Production handoff for future maintainers / ChatGPT sessions.
> Last updated: 2026-08-28.
>
> **Important:** this is a live production website. Always read the current source before editing. The repository is the source of truth if this document and the implementation ever differ.

## 1. Project identity

- Hotel: **Pinewood Hotel Dalat**
- Production website: `https://pinewoodhotel.vn`
- GitHub repository: `VietNguyen16/pinewood-hotel`
- Production branch: `main`
- Hosting: **GitHub Pages**
- Custom domain: `pinewoodhotel.vn`
- Website is bilingual: **Vietnamese + English**
- Responsive targets: desktop, tablet, mobile

This is an existing production project. **Do not rebuild it from scratch unless the owner explicitly asks.**

## 2. Brand direction

Style: premium, elegant, minimal, warm, boutique-hotel, Da Lat / pine-forest feeling.

Use the official Pinewood logo already stored in the repository. Do not redraw, reinterpret, or replace it with a mockup.

Primary visual language:

- Pine green
- Pinewood brown / warm gold
- Off-white / cream
- Charcoal
- Soft rounded corners
- Generous whitespace
- Elegant serif-led typography

Official slogan to display consistently:

- VI: **Ngủ ngon · Ấm áp · Đậm chất Đà Lạt**
- EN: **Sleep Well · Stay Warm · Feel Dalat**

Do not replace this slogan without an explicit request.

## 3. Hotel contact information

- Phone / Reception: **0785 098 686**
- Telephone URI: `+84785098686`
- Email: **info@pinewoodhotel.vn**
- Website: `https://pinewoodhotel.vn`
- Address VI: **54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam**
- Address EN: **54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam**
- Room phone reception dial: **0**

### Zalo

- Hotel Zalo phone: **0785098686**
- Zalo URL: `https://zalo.me/0785098686`
- QR asset: `assets/qr/zalo-pinewood.svg`

Preferred QR caption:

- VI: **Quét mã QR hoặc chạm vào mã để kết nối Zalo với Pinewood Hotel Dalat.**
- EN: **Scan the QR code or tap it to connect with Pinewood Hotel Dalat on Zalo.**

When Zalo information changes, update both the clickable target and QR payload and verify the QR actually resolves to the intended hotel account.

## 4. Wi-Fi

Current SSID:

`Pinewood Hotel Dalat`

Current source currently contains password placeholder:

`***`

**Never guess the real Wi-Fi password. Ask the owner for the new/current password when required.**

When SSID or password changes, update all of the following together:

1. `js/config.js`
2. Wi-Fi text shown on both VI and EN pages
3. `assets/qr/wifi-pinewood.svg`
4. Verify the QR payload matches the new SSID/password
5. Test desktop and mobile
6. Deploy through GitHub Pages

The Wi-Fi page should display SSID, password and QR. The owner previously requested removing fake/extra “connect now” and password-copy controls.

## 5. Current source structure

Important files include:

- `index.html`
- `css/style.css`
- `js/config.js`
- `js/content.js`
- `js/main.js`
- `js/qr.js`
- `assets/logo/`
- `assets/qr/wifi-pinewood.svg`
- `assets/qr/zalo-pinewood.svg`

Always fetch/read the live current versions before editing. Do not assume this handoff contains every later change.

### Current configuration snapshot

At the time of this handoff, `js/config.js` contains:

- domain: `https://pinewoodhotel.vn/`
- email: `info@pinewoodhotel.vn`
- Zalo URL: `https://zalo.me/0785098686`
- phone display: `0785 098 686`
- SSID: `Pinewood Hotel Dalat`
- Wi-Fi password placeholder: `***`
- breakfast: `06:30` to `09:00`
- check-in: `14:00`
- check-out: `12:00`
- booking enabled: `false`

## 6. Language behavior

Language must be sticky by route and must **not change unless the guest explicitly chooses VI or EN**.

Rules:

- User on VI + clicks logo → VI home `/`
- User on EN + clicks logo → EN home `/en`
- Ordinary navigation must preserve current language
- Only the VI / EN language control changes language

Do not reintroduce the bug where clicking the logo from English returned the user to Vietnamese.

## 7. Routing / deep links

The website uses clean URLs and must support direct entry, bookmarks, refresh and QR deep links on GitHub Pages.

### Vietnamese

- `/`
- `/thu-chao-mung`
- `/noi-quy`
- `/wifi`
- `/bua-sang`
- `/dich-vu`
- `/an-toan`
- `/lien-he`
- `/moi-truong`
- `/thong-tin`

### English

- `/en`
- `/en/welcome`
- `/en/hotel-rules`
- `/en/wifi`
- `/en/breakfast`
- `/en/services`
- `/en/safety`
- `/en/contact`
- `/en/environment`
- `/en/hotel-information`

Do not break deep-link entry pages. A visitor must be able to type `/wifi` or `/en/wifi` directly without a GitHub Pages 404.

## 8. Homepage

Hero brand title:

- `PINEWOOD HOTEL`
- `DALAT`

Below it use the official slogan:

- VI: **Ngủ ngon · Ấm áp · Đậm chất Đà Lạt**
- EN: **Sleep Well · Stay Warm · Feel Dalat**

Then:

- VI: **Thông tin dành cho khách lưu trú**
- EN: **Guest Information**

Do not restore the duplicate line “Chào mừng Quý khách đến với Pinewood Hotel Dalat / Welcome to Pinewood Hotel Dalat” in the slogan position.

## 9. Mobile UX

The mobile hamburger menu must:

- open on hamburger tap
- close when a menu item is selected
- close when tapping outside the menu
- close on Esc where applicable
- not cover/break page content

Logo behavior must preserve the current language.

## 10. Standard two-panel layout

For information pages with two feature panels, the agreed format is:

### Desktop

`[ GREEN PANEL ] [ WHITE PANEL ]`

The green panel is always on the **left**.

### Mobile

Green panel first, white panel second.

Green panel structure:

1. Icon
2. Title
3. Main description

Avoid repeating the exact same sentence in the page hero and the panel beneath it.

## 11. Breakfast page

### VI

Title: **BỮA SÁNG**

Hero intro:

**Thời gian và địa điểm phục vụ bữa sáng dành cho khách lưu trú.**

Green panel (left):

- title: **Tại nhà hàng**
- copy: **Bữa sáng được phục vụ tại nhà hàng của khách sạn mỗi ngày.**

White panel (right):

- eyebrow: **HẰNG NGÀY**
- time: **06:30 — 09:00**
- copy: **Bữa sáng được phục vụ tại nhà hàng hằng ngày từ 06:30 đến 09:00.**

Desktop design requirement:

- `06:30 — 09:00` should stay on one line
- the service sentence should also stay on one line when screen width permits

On mobile, allow natural wrapping so content never overflows.

English should express the same meaning without adding new claims.

## 12. Safety & Emergency page

Do not repeat the fire/smoke instruction in the hero and green panel.

### VI

Title: **AN TOÀN & KHẨN CẤP**

Hero intro:

**Thông tin an toàn và hướng dẫn khẩn cấp dành cho khách lưu trú.**

Green panel left:

- icon: shield
- title: **Khi phát hiện cháy hoặc khói**
- detailed fire/smoke/evacuation instruction

White panel right:

- eyebrow: `RECEPTION`
- large text: **NHẤN 0**
- reception instructions
- assistance button

EN equivalent:

- **SAFETY & EMERGENCY**
- **If you detect fire or smoke**
- **DIAL 0**

## 13. Contact page

Navigation/page title:

- VI: **LIÊN HỆ**
- EN: **CONTACT**

Do not rename it back to “LIÊN HỆ LỄ TÂN”.

Contact page should include:

- phone
- email
- Zalo QR
- Google Maps
- hotel address
- directions link/button

The directions destination is Pinewood Hotel Dalat at the address above.

## 14. Footer

Footer should include the hotel identity and useful contact details such as:

- Pinewood Hotel Dalat
- official slogan
- phone
- email
- website
- hotel address

The address can link to Google Maps directions.

The slogan has previously been used as an interaction leading to the Pinewood experience image/section. Before changing/removing that behavior, inspect the current implementation and ask if the requested change is ambiguous.

## 15. Welcome flow

There is a guest welcome-letter experience.

The previously agreed guest flow is:

1. assistance/contact popup first
2. then welcome letter

Do not remove this flow unless explicitly requested.

## 16. Booking roadmap

Booking UI may be added later. Current config has booking disabled.

When booking is requested, first determine whether the owner wants:

- level 1: inquiry / booking request UI
- level 2: room selection + availability UI with manual/admin processing
- level 3: real online booking/payment/PMS/channel-manager integration

Do not enable payments or imply real inventory sync unless the required backend/provider integration actually exists.

## 17. Editing workflow

For every requested change:

1. Read the current source from GitHub.
2. Identify the exact component/function/CSS involved.
3. Change only the requested scope.
4. Check VI and EN.
5. Check desktop and mobile.
6. Check route/deep-link behavior if navigation is involved.
7. Validate QR payloads if QR is changed.
8. Commit to `main` only when the change is ready.
9. Check GitHub Pages build and deployment.
10. Do not claim “deployed successfully” until deployment actually succeeds; if pending or failed, say so clearly.

Avoid creating permanent one-off GitHub Actions workflows just to edit a source file. If a temporary workflow is unavoidable, remove it afterward and verify the final source.

## 18. Important regression warnings

### MutationObserver infinite loop

The project previously experienced a Chrome **Page Unresponsive** failure because a MutationObserver changed content that retriggered the same observer indefinitely.

If using MutationObserver or auto-render logic:

- make updates idempotent
- compare current and desired content before writing
- avoid self-trigger loops

### GitHub Pages deep-link 404

The project previously returned GitHub Pages 404 when directly opening child URLs. Preserve the current deep-link solution / route entry pages.

### Language regression

Do not let logo navigation or ordinary routing silently switch EN to VI or VI to EN.

### QR regression

Use absolute/root asset paths where route depth could otherwise break assets. Verify English routes such as `/en/contact` and `/en/wifi` can still load QR assets.

## 19. What not to do

Do not, unless explicitly requested:

- rebuild the site from scratch
- replace the official logo
- change brand colors arbitrarily
- change the official slogan
- delete `CNAME`
- break GitHub Pages routing
- remove mobile behavior
- guess Wi-Fi credentials
- use an unverified Zalo URL/QR
- repeat identical content in adjacent hero/card areas
- introduce marketing claims not supported by the hotel's supplied content
- silently change Vietnamese source meaning when translating to English

## 20. Handoff instruction for a new ChatGPT account

If this project is opened from a new ChatGPT account, the owner can say:

> Connect to my GitHub, open `VietNguyen16/pinewood-hotel`, read `PROJECT_HANDOFF.md`, then inspect the current source and current GitHub Pages configuration. This is a live production website. Do not edit anything until I give the next instruction.

After reading the handoff and source, respond briefly that the current project has been reviewed and wait for the next request.

## 21. Security note

Never store real passwords, GitHub tokens, API keys, payment secrets, admin credentials or other sensitive secrets in this handoff file or public repository.

If the Wi-Fi password is intentionally public for hotel guests, the owner may choose to publish it on the website, but it should still be provided explicitly rather than guessed.
