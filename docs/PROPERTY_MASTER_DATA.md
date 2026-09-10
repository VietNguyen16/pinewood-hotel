# Pinewood Hotel Dalat — Property Master Data

**Purpose:** operations/integration reference only. This file does not change production behavior and does not connect any third-party service.

**Repository source snapshot:** `main` at `54bc749ffda26dcacee82e95b84314ed85c0251d`.

## Source-of-truth rule

The current repository is authoritative for the **website state** captured in this document. Before any PMS, booking engine, channel manager, CRM, payment, GA4, or Zalo integration writes data to an external system, business-critical property facts should be re-confirmed by Pinewood Hotel Dalat. Do not substitute OTA/listing data for hotel-approved master data.

Where the repository does not establish a value, or where business confirmation is still required, use exactly:

`NEEDS BUSINESS VERIFICATION`

## Property identity and contact data

| Field | Current website value |
| --- | --- |
| Hotel name | Pinewood Hotel Dalat |
| Production website | `https://pinewoodhotel.vn` |
| Address VI | 54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam |
| Address EN | 54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam |
| Phone display | `0785 098 686` |
| Phone E.164 | `+84785098686` |
| `tel:` target | `tel:+84785098686` |
| Email | `info@pinewoodhotel.vn` |
| Latitude | `11.9611181` |
| Longitude | `108.4512011` |
| Google Maps place URL | `https://www.google.com/maps/place/Kh%C3%A1ch+s%E1%BA%A1n+Pinewood/@11.9611181,108.4486208,1207m/data=!3m1!1e3!4m11!3m10!1s0x3171130010cadc19:0xdcb299e4322ab577!5m2!4m1!1i2!8m2!3d11.9611181!4d108.4512011!9m1!1b1!16s%2Fg%2F11njdj19vf` |
| Google Maps directions URL | `https://www.google.com/maps/dir/?api=1&destination=Pinewood%20Hotel%20Dalat%2C%2054%20%C4%90%C6%B0%E1%BB%9Dng%20V%C3%B5%20Tr%C6%B0%E1%BB%9Dng%20To%E1%BA%A3n%2C%20%C4%90%C3%A0%20L%E1%BA%A1t%2C%20L%C3%A2m%20%C4%90%E1%BB%93ng%2C%20Vi%E1%BB%87t%20Nam` |
| Zalo number | `0785098686` |
| Zalo URL | `https://zalo.me/0785098686` |
| Standard check-in | `14:00` |
| Standard check-out | `12:00` |
| Breakfast | `06:30–09:00` |
| Wi-Fi SSID | `Pinewood Hotel Dalat` |
| Reception extension / in-room dial | `0` |
| Official slogan VI | `Ngủ ngon · Ấm áp · Đậm chất Đà Lạt` |
| Official slogan EN | `Sleep Well · Stay Warm · Feel Dalat` |

### Credential boundary

The current configuration contains a Wi-Fi password placeholder (`***`). It is **not** a verified credential and is intentionally not copied into this property master. API keys, passwords, payment secrets, access tokens, PMS credentials, and other secrets must never be stored in this public repository.

## Current room types

The current room catalog is ordered by `_data/room_order.yml`. The following eight room types are enabled in the current YAML source.

| Internal slug | VI name | EN name | Area | Bed configuration | Guest capacity | View | Current source file |
| --- | --- | --- | ---: | --- | ---: | --- | --- |
| `deluxe-double-or-twin-room` | Phòng Deluxe Double hướng thành phố | Deluxe Double City View | 25 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng thành phố / EN: City view | `_data/room_types/deluxe-double-or-twin-room.yml` |
| `twin-room-city-view` | Phòng Deluxe Twin hướng thành phố | Deluxe Twin City View | 25 m² | VI: 2 giường đơn, mỗi giường 1m2 / EN: 2 single beds, 1.2 m each | 2 | VI: Hướng thành phố / EN: City view | `_data/room_types/twin-room-city-view.yml` |
| `double-room-garden-view` | Phòng Deluxe Double hướng vườn | Deluxe Double Garden View | 25 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng vườn / EN: Garden view | `_data/room_types/double-room-garden-view.yml` |
| `twin-room-garden-view` | Phòng Deluxe Twin hướng vườn | Deluxe Twin Garden View | 25 m² | VI: 2 giường đơn, mỗi giường 1m2 / EN: 2 single beds, 1.2 m each | 2 | VI: Hướng vườn / EN: Garden view | `_data/room_types/twin-room-garden-view.yml` |
| `junior-suite-garden-view` | Junior Suite hướng thành phố | Junior Suite City View | 30 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng thành phố / EN: City view | `_data/room_types/junior-suite-garden-view.yml` |
| `king-suite-balcony` | Pinewood Suite hướng thành phố | Pinewood Suite City View | 78 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng thành phố / EN: City view | `_data/room_types/king-suite-balcony.yml` |
| `triple-room-balcony` | Triple Suite hướng vườn | Triple Suite Garden View | 45 m² | VI: 1 giường lớn 1m8 + 1 giường 1m2 / EN: 1 large bed (1.8 m) + 1 single bed (1.2 m) | 3 | VI: Hướng vườn / EN: Garden view | `_data/room_types/triple-room-balcony.yml` |
| `family-suite-balcony` | Family Suite hướng thành phố | Family Suite City View | 45 m² | VI: 2 giường lớn 1m8 / EN: 2 large beds (1.8 m each) | 4 | VI: Hướng thành phố / EN: City view | `_data/room_types/family-suite-balcony.yml` |

### Internal identifier rule

The internal slugs are integration keys, not customer-facing descriptions. Some legacy slugs no longer describe the current room name/view literally (for example `junior-suite-garden-view` currently maps to **Junior Suite City View**). Future integrations must map from the slug to the approved external room ID explicitly; do not infer room meaning from the slug text and do not rename slugs without a migration plan.

## Current inventory note

The current room YAML stores `room_count` values of 12, 4, 16, 4, 4, 2, 3, and 5, which total **50 rooms**. The current Hotel structured data also states `numberOfRooms: 50`, and current website copy references 50 rooms. This is internally consistent for the website snapshot, but the physical/sellable inventory must be confirmed before a PMS or channel-manager import:

`NEEDS BUSINESS VERIFICATION`

## Primary repository sources

- `PROJECT_HANDOFF.md`
- `js/config.js`
- `js/content.js`
- `_data/room_order.yml`
- `_data/room_types/*.yml`
- `_layouts/app.html`
- `_includes/home-reference-static.html`
- `phong/index.html`
- `en/rooms/index.html`
- `lien-he/index.html`
- `en/contact/index.html`
