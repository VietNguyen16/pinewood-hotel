# Pinewood Room Manager

Room types are managed with Pages CMS using `.pages.yml`.

1. Open https://app.pagescms.org and sign in with GitHub.
2. Open `VietNguyen16/pinewood-hotel` on branch `main`.
3. Choose **Hạng phòng** and select the room type.
4. Edit verified room-specific text or amenity fields when needed.
5. Drag photos into **Hình ảnh - kéo thả, ảnh đầu tiên là ảnh chính**.
6. Save. Pages CMS commits the data and images directly to GitHub; GitHub Pages then redeploys the website.

Each room type stores images in its own repository folder under `assets/images/rooms/<room-slug>/`.

The first uploaded image is used as the lead image on the room card and as the first image in the room-detail gallery. Additional images are available through previous/next gallery controls and the lightbox.

If a room has no images yet, the website does not render a broken image or a fake placeholder. The text content remains usable until verified Pinewood photography is uploaded.

Editable room fields include bilingual names, room size, bed configuration, view, short summary, full description, grouped amenities, image crop position, and the room gallery. Keep claims aligned with the hotel-approved room source; do not add prices, availability, occupancy, ratings, or other unverified claims.
