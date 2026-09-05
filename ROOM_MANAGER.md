# Pinewood Room Manager

Room types are managed with Pages CMS using `.pages.yml`.

1. Open https://app.pagescms.org and sign in with GitHub.
2. Open `VietNguyen16/pinewood-hotel` on branch `main`.
3. Choose **Hạng phòng** and select the room type.
4. Drag photos into **Hình ảnh - kéo thả, ảnh đầu tiên là ảnh chính**.
5. Save. Pages CMS commits the data and images directly to GitHub; GitHub Pages then redeploys the website.

Each room type stores images in its own repository folder under `assets/images/rooms/<room-slug>/`.

The first image is treated as the lead image in the editor ordering. The Rooms page shows all uploaded images in a horizontal strip and opens them in the existing lightbox.

Do not add room dimensions, views, bed types, occupancy, or other claims unless verified by Pinewood Hotel.
