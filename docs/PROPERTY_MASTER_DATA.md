# Pinewood Hotel Dalat — Property Master Data

**Purpose:** operations/integration reference only. This file does not change production behavior and does not connect any third-party service.

**Repository source snapshot:** `main` at `b064d91992e8d6f83a6e8322a0593aedc5f3afe1`.

**Business verification baseline:** confirmed during the Pinewood Hotel Dalat business-data verification session on 2026-09-11. Where a business-confirmed value differs from the current website state, the business-confirmed value is the PMS/integration baseline until the website is separately updated through an approved production change.

## Source-of-truth rule

The repository remains authoritative for the **current website state**. Business-confirmed values in this document are authoritative for the **PMS-readiness baseline**. OTA, marketplace, map, social, review, or other third-party listing data must not replace hotel-approved master data.

Where business confirmation is still required, use exactly:

`NEEDS BUSINESS VERIFICATION`

## Property identity and contact data

| Field | Current website value | PMS/business baseline | Status |
| --- | --- | --- | --- |
| Hotel name | Pinewood Hotel Dalat | Pinewood Hotel Dalat | Current website identity |
| Production website | `https://pinewoodhotel.vn` | `https://pinewoodhotel.vn` | Current website identity |
| Address VI | 54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam | Same as current website | Current website state |
| Address EN | 54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam | Same as current website | Current website state |
| Phone display | `0785 098 686` | `0785 098 686` | **CONFIRMED** |
| Phone E.164 | `+84785098686` | `+84785098686` | **CONFIRMED** |
| `tel:` target | `tel:+84785098686` | `tel:+84785098686` | **CONFIRMED** |
| Email | `info@pinewoodhotel.vn` | `info@pinewoodhotel.vn` | **CONFIRMED** |
| Latitude | `11.9611181` | Same as current website | Current website state |
| Longitude | `108.4512011` | Same as current website | Current website state |
| Standard check-in | `14:00` | `14:00` | **CONFIRMED** |
| Standard check-out | `12:00` | `12:00` | **CONFIRMED** |
| Breakfast | `06:30–09:00` | `06:30–09:30` | **CONFIRMED — WEBSITE UPDATE REQUIRED SEPARATELY** |
| Wi-Fi SSID | `Pinewood Hotel Dalat` | Same as current website | Current website state |
| Reception extension / in-room dial | `0` | Same as current website | Current website state |
| Official slogan VI | `Ngủ ngon · Ấm áp · Đậm chất Đà Lạt` | Same as current website | Current website state |
| Official slogan EN | `Sleep Well · Stay Warm · Feel Dalat` | Same as current website | Current website state |
| Official star classification | Not currently published in structured data | **3 stars / 3 sao** | **CONFIRMED by business** |

### Credential and privacy boundary

Do not store API keys, passwords, payment secrets, access tokens, PMS credentials, door/access codes, guest data, staff personal data, exact confidential blocking reasons, or other private operational secrets in this repository.

Exact physical room numbers for permanently blocked rooms are intentionally excluded from public documentation. If a future PMS requires room-level mapping, keep those identifiers in:

`KEEP IN PRIVATE PMS INVENTORY MAPPING`

## Current room types and confirmed room data

The current room catalog is ordered by `_data/room_order.yml`. The following eight room types are enabled in the current YAML source. Area, bed configuration, and guest capacity were business-confirmed during the verification session.

| Internal slug | VI name | EN name | Area | Bed configuration | Guest capacity | View | Status |
| --- | --- | --- | ---: | --- | ---: | --- | --- |
| `deluxe-double-or-twin-room` | Phòng Deluxe Double hướng thành phố | Deluxe Double City View | 25 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng thành phố / EN: City view | **CONFIRMED** |
| `twin-room-city-view` | Phòng Deluxe Twin hướng thành phố | Deluxe Twin City View | 25 m² | VI: 2 giường đơn, mỗi giường 1m2 / EN: 2 single beds, 1.2 m each | 2 | VI: Hướng thành phố / EN: City view | **CONFIRMED** |
| `double-room-garden-view` | Phòng Deluxe Double hướng vườn | Deluxe Double Garden View | 25 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng vườn / EN: Garden view | **CONFIRMED** |
| `twin-room-garden-view` | Phòng Deluxe Twin hướng vườn | Deluxe Twin Garden View | 25 m² | VI: 2 giường đơn, mỗi giường 1m2 / EN: 2 single beds, 1.2 m each | 2 | VI: Hướng vườn / EN: Garden view | **CONFIRMED** |
| `junior-suite-garden-view` | Junior Suite hướng thành phố | Junior Suite City View | 30 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng thành phố / EN: City view | **CONFIRMED** |
| `king-suite-balcony` | Pinewood Suite hướng thành phố | Pinewood Suite City View | 78 m² | VI: 1 giường lớn 1m8 / EN: 1 large bed (1.8 m) | 2 | VI: Hướng thành phố / EN: City view | **CONFIRMED** |
| `triple-room-balcony` | Triple Suite hướng vườn | Triple Suite Garden View | 45 m² | VI: 1 giường lớn 1m8 + 1 giường 1m2 / EN: 1 large bed (1.8 m) + 1 single bed (1.2 m) | 3 | VI: Hướng vườn / EN: Garden view | **CONFIRMED** |
| `family-suite-balcony` | Family Suite hướng thành phố | Family Suite City View | 45 m² | VI: 2 giường lớn 1m8 / EN: 2 large beds (1.8 m each) | 4 | VI: Hướng thành phố / EN: City view | **CONFIRMED** |

### Internal identifier rule

The internal slugs are integration keys, not customer-facing descriptions. Some legacy slugs no longer describe the current room name/view literally. Future integrations must map from the slug to the approved external room ID explicitly; do not infer room meaning from the slug text and do not rename slugs without a migration plan.

## Confirmed PMS inventory baseline

The website room YAML physical counts remain 12, 4, 16, 4, 4, 2, 3, and 5. Business verification confirmed 50 physical rooms, 48 sellable rooms, and 2 permanently blocked rooms. The blocked category mapping is one Deluxe Double Garden View and one Family Suite City View.

| Room category | Physical count | Sellable count | Permanently blocked count | Status |
| --- | ---: | ---: | ---: | --- |
| Deluxe Double City View | 12 | 12 | 0 | **CONFIRMED BASELINE** |
| Deluxe Twin City View | 4 | 4 | 0 | **CONFIRMED BASELINE** |
| Deluxe Double Garden View | 16 | 15 | 1 | **CONFIRMED BASELINE** |
| Deluxe Twin Garden View | 4 | 4 | 0 | **CONFIRMED BASELINE** |
| Junior Suite City View | 4 | 4 | 0 | **CONFIRMED BASELINE** |
| Pinewood Suite City View | 2 | 2 | 0 | **CONFIRMED BASELINE** |
| Triple Suite Garden View | 3 | 3 | 0 | **CONFIRMED BASELINE** |
| Family Suite City View | 5 | 4 | 1 | **CONFIRMED BASELINE** |
| **TOTAL** | **50** | **48** | **2** | **RECONCILED** |

Do not publish exact blocked room numbers or blocking reasons. Room-level PMS identifiers belong only in the private PMS inventory mapping when a real provider is selected.

## Confirmed amenity baseline

The `Commercial / scope status` column uses only the explicit PMS-relevant statuses requested for this baseline. A dash means no additional pricing/scope label is required for the confirmed availability statement.

| Amenity / service | Availability | Commercial / scope status | Verification |
| --- | --- | --- | --- |
| Breakfast | Yes | **FREE — included as standard** | **CONFIRMED** |
| Parking | Yes | **FREE** | **CONFIRMED** |
| Restaurant | Yes | — | **CONFIRMED** |
| 24-hour reception | Yes | — | **CONFIRMED** |
| Wi-Fi | Yes | **FREE** | **CONFIRMED** |
| Elevator | Yes | — | **CONFIRMED** |
| Luggage storage | Yes | — | **CONFIRMED** |
| Housekeeping | Yes | — | **CONFIRMED** |
| Laundry | Yes | **PAID** | **CONFIRMED** |
| Airport transfer | Yes | **PAID** | **CONFIRMED** |
| Motorbike/car rental | No | **NOT APPLICABLE** | **CONFIRMED** |
| Minibar | Yes | **PAID** | **CONFIRMED** |
| Kettle | Yes | — | **CONFIRMED** |
| Hair dryer | Yes | — | **CONFIRMED** |
| TV | Yes | — | **CONFIRMED** |
| In-room safe / két sắt | No | **NOT APPLICABLE** | **CONFIRMED** |
| Balcony | Yes where offered | **ROOM-SPECIFIC** | **CONFIRMED** |
| Garden | Yes | — | **CONFIRMED** |
| Other verified hotel services | None declared in this verification session | **NOT APPLICABLE** | **CONFIRMED** |

## PMS baseline status

`CORE PMS DATA VERIFIED`

This baseline is ready for provider/vendor evaluation. Vendor room type IDs remain unassigned until a real PMS/booking provider is selected and verified.

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
