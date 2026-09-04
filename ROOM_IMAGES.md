# Thay / thêm ảnh phòng

Ảnh phòng nguồn nằm trong:

`assets/uploads/rooms/`

## Thay 3 ảnh phòng hiện tại

Mở thư mục:

`assets/uploads/rooms/pinewood-room/`

Giữ nguyên tên file và thay ảnh mới:

- `01-bedroom.jpg`
- `02-amenities.jpg`
- `03-bathroom.jpg`

Kéo thả ảnh vào GitHub và commit. Workflow **Optimize room gallery images** sẽ tự tạo WebP chất lượng cao và GitHub Pages sẽ deploy lại.

## Thêm hạng phòng mới

Tạo một thư mục mới dưới `assets/uploads/rooms/`, ví dụ:

`assets/uploads/rooms/deluxe-twin/`

Sau đó kéo thả bao nhiêu ảnh phòng tùy ý vào thư mục đó, ví dụ:

- `01-bedroom.jpg`
- `02-view.jpg`
- `03-bathroom.jpg`
- `04-amenities.jpg`

Website sẽ tự tạo thêm một nhóm ảnh cho hạng phòng đó. Tên thư mục được dùng làm tên hạng phòng mặc định (`deluxe-twin` → `Deluxe Twin`).

Nếu cần tên / mô tả VI-EN riêng, có thể thêm file `_room.json` trong thư mục hạng phòng. File này là tùy chọn; thay hoặc thêm ảnh thông thường không cần sửa code.
