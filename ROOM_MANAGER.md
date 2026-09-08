# Pinewood Room Manager

Room types are managed with Pages CMS using `.pages.yml`.

1. Open https://app.pagescms.org and sign in with GitHub.
2. Open `VietNguyen16/pinewood-hotel` on the branch you intend to edit.
3. Choose **Hạng phòng** and select the room type.
4. Edit verified room data, including room count, guest count, size, bed configuration, view, summaries, amenities and the current retail-rate fields.
5. Drag photos into **Hình ảnh - kéo thả, ảnh đầu tiên là ảnh chính**.
6. Save. Pages CMS commits the data and images directly to GitHub; GitHub Pages redeploys after changes reach `main`.

## Current room types

1. Deluxe City View Double
2. Deluxe City View Twin
3. Deluxe Garden View Double
4. Deluxe Garden View Twin
5. Junior Suite City View
6. Pinewood Suite City View
7. Triple Suite Garden View
8. Family Suite City View

The current inventory totals 50 rooms: 12 + 4 + 16 + 4 + 4 + 2 + 3 + 5.

## Current rate fields

- Low season: September, October, November
- December 2026
- January + February 2027
- Holiday / Tet: 01-02/01/2027 and 05-14/02/2027

Rates are stored as VND display values in each room data file and are shown on the room listing/detail pages. Confirm the applicable rate and room status with the hotel for the requested stay dates; the website does not claim live availability.

## Shared photo mapping

Per hotel confirmation, the two Deluxe Double view variants can use the same verified photo set, and the two Deluxe Twin view variants can use the same verified photo set.

- Deluxe City View Double + Deluxe Garden View Double → `assets/images/rooms/deluxe-double-views/`
- Deluxe City View Twin + Deluxe Garden View Twin → `assets/images/rooms/deluxe-twin-views/`
- Junior Suite City View → `assets/images/rooms/junior-suite-city-view/`
- Pinewood Suite City View → `assets/images/rooms/pinewood-suite-city-view/`
- Triple Suite Garden View → `assets/images/rooms/triple-suite-garden-view/`
- Family Suite City View → `assets/images/rooms/family-suite-city-view/`

The first selected image is used as the lead image on the room card and as the first image in the room-detail gallery. Additional images are available through previous/next gallery controls and the lightbox.

If a room has no images yet, the website does not render a broken image or a fake placeholder. Text and rate information remain usable until verified Pinewood photography is uploaded.

Keep claims aligned with hotel-approved sources. Do not invent live availability, ratings or unsupported room features.
