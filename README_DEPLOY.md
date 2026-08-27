# Pinewood Hotel Dalat — Deployment

## Project
Static, mobile-first Digital Guest Directory for `https://pinewoodhotel.vn/`.

## Content and brand sources
- Vietnamese guest information: `Nội dung website bằng tiếng việt.pdf`.
- English content: translated directly from that Vietnamese source.
- Logo: vector-exported from the supplied official `Pinewood LOGO copy.pdf` without redrawing or recoloring.
- Zalo QR: the supplied original JPEG bytes are embedded unchanged as a data URL in `js/qr.js`.
- Brand colors: `#A2B873`, `#0C3522`, `#ECEDE9`, `#B28E69`, `#53524E`.
- Typeface: Lora, as specified in the Brand Guideline.

## Important configurable values
Edit `js/config.js` for frequently changing operational data.

`wifi.ssid` and `wifi.password` remain `[TO BE ADDED]` because they are not present in the Vietnamese source document.

The reception number `0785 098 686` comes from the supplied project prompt/support-popup specification, not from the Vietnamese guest-information PDF.

Online booking is prepared as a future configuration item and is currently disabled.

## GitHub Pages
This repository is prepared for GitHub Pages using static hash routes so page refreshes work without server-side rewrites.

1. GitHub → repository → **Settings** → **Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Branch: `main`; folder: `/ (root)`.
4. Save and wait for the Pages deployment to finish.
5. The included `CNAME` targets `pinewoodhotel.vn`.
6. Only after the Pages URL works, update DNS at Mắt Bão.

## Optional future Nginx deployment
If the project later moves to a VPS/Nginx server, use `nginx/pinewoodhotel.vn.conf` as a starting point. Because the current front end uses hash routing, server rewrite rules are not required for guest-directory navigation.

## Pre-launch checks
- Replace `[TO BE ADDED]` Wi-Fi credentials when officially supplied.
- Verify the reception telephone number before production launch.
- Confirm DNS and HTTPS.
- Test 320, 360, 375, 390, 414, 768, 1024 and 1440 px widths.
- Test VI/EN switching and persistence.
- Test support-popup session behavior.
- Test phone call link and the original Zalo QR.
