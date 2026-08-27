# Source notes

## Vietnamese content
All guest-facing Vietnamese policy, service, hotel-rule and environmental text is taken from `Nội dung website bằng tiếng việt.pdf`.

## English content
The English version in `js/content.js` is translated from that Vietnamese source, preserving the same hours, quantities, fees, restrictions and service conditions.

## Operational values not present in the Vietnamese PDF
- Wi-Fi SSID: not supplied; set to `[TO BE ADDED]`.
- Wi-Fi password: not supplied; set to `[TO BE ADDED]`.
- Reception phone `0785 098 686`: used from the supplied project prompt/support-popup requirement. Verify before launch.
- In-room reception dial `0`: supported by the Vietnamese guest-information PDF.

## Brand assets
- `assets/logo/pinewood-logo.svg` is vector-exported from the supplied official `Pinewood LOGO copy.pdf`; the logo artwork is not redrawn or recolored.
- `js/qr.js` contains the supplied Zalo QR JPEG encoded byte-for-byte as a data URL; no QR is regenerated or altered.
- UI colors follow the Brand Guideline palette.
- Lora is requested through Google Fonts with serif fallback.
