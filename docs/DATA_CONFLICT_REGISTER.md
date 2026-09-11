# Pinewood Hotel Dalat — Data Conflict Register

**Purpose:** record property facts that must be reconciled before they are synchronized to a PMS, booking engine, channel manager, CRM, payment platform, analytics property, or external listing.

**Repository source snapshot:** `main` at `b064d91992e8d6f83a6e8322a0593aedc5f3afe1`.

**Business verification baseline:** confirmed during the Pinewood Hotel Dalat business-data verification session on 2026-09-11.

## Authority rule

The repository is authoritative for the **current website state**. Business-confirmed values in this register are authoritative for the **PMS-readiness baseline**. OTA, marketplace, map, social, review, or other third-party data must never be treated as authoritative merely because it is published externally.

Where a business fact is not confirmed, use exactly:

`NEEDS BUSINESS VERIFICATION`

Do not place guest data, staff personal data, passwords, access codes, private room operational notes, exact confidential blocking reasons, PMS credentials, API secrets, payment credentials, or exact blocked physical room numbers in this public repository.

## Register

| FIELD | CURRENT WEBSITE STATE | BUSINESS-CONFIRMED BASELINE | STATUS | ACTION |
| --- | --- | --- | --- | --- |
| Phone | Display: `0785 098 686`; E.164/tel target: `+84785098686` | `0785 098 686`; `+84785098686` | **CONFIRMED** | Use this as the public/reception contact baseline for future PMS/vendor onboarding. |
| Email | `info@pinewoodhotel.vn` | `info@pinewoodhotel.vn` | **CONFIRMED** | Use this as the guest-facing email baseline for future PMS/CRM/vendor onboarding. |
| Total room count / PMS inventory | Website schema/copy/YAML represent 50 physical rooms. | **50 physical / 48 sellable / 2 permanently blocked** | **CONFIRMED** | Use 48 as the sellable PMS baseline. Do not treat the website total of 50 as sellable inventory. Exact blocked room numbers remain private. |
| Blocked room category mapping | Not represented as a public website inventory distinction. | **Deluxe Double Garden View: 1 blocked; Family Suite City View: 1 blocked; all other categories: 0** | **CONFIRMED** | Public docs may store category counts only. Exact room identifiers, if required for import, must be kept in `KEEP IN PRIVATE PMS INVENTORY MAPPING`. |
| Breakfast time | `06:30–09:00` | **`06:30–09:30`** | **CONFIRMED** | Website differs from the confirmed business value. Correct the website only through a separate approved production change; this docs PR does not modify production. |
| Check-in / check-out | `14:00` / `12:00` | **`14:00` / `12:00`** | **CONFIRMED** | Use as the PMS/vendor baseline. |
| Room areas | 25, 25, 25, 25, 30, 78, 45, 45 m² for the eight current categories. | Same values | **CONFIRMED** | Use the category values in `PROPERTY_MASTER_DATA.md`; do not replace from OTA data. |
| Bed configurations | Current YAML defines the eight current configurations. | Same configurations as current YAML and `PROPERTY_MASTER_DATA.md` | **CONFIRMED** | Use the confirmed category-level bed configurations for vendor mapping. |
| Guest capacities | Current YAML: 2, 2, 2, 2, 2, 2, 3, 4. | Same values | **CONFIRMED** | Use the confirmed category capacities for vendor mapping; vendor occupancy policy still requires provider-specific configuration. |
| Amenities | Website and room YAML contain property/room amenity claims. | Confirmed baseline: breakfast YES/FREE; parking YES/FREE; restaurant YES; 24-hour reception YES; Wi-Fi YES/FREE; elevator YES; luggage storage YES; housekeeping YES; laundry YES/PAID; airport transfer YES/PAID; motorbike/car rental NO/NOT APPLICABLE; minibar YES/PAID; kettle YES; hair dryer YES; TV YES; safe NO/NOT APPLICABLE; balcony ROOM-SPECIFIC; garden YES; no other service declared in this verification session. | **CONFIRMED** | Use the explicit baseline; do not bulk-copy OTA amenities. Room-specific publication/mapping must preserve category scope. |
| Star classification | Current website does not publish `starRating` or `AggregateRating` in structured data. | **Official classification: 3 stars / 3 sao** | **CONFIRMED by business** | Treat 3 stars as the business baseline. Any future website/schema publication remains a separate approved production decision. Never convert review scores into star classification. |

## Reconciled PMS inventory by category

| Current EN room category | Physical | Sellable | Permanently blocked |
| --- | ---: | ---: | ---: |
| Deluxe Double City View | 12 | 12 | 0 |
| Deluxe Twin City View | 4 | 4 | 0 |
| Deluxe Double Garden View | 16 | 15 | 1 |
| Deluxe Twin Garden View | 4 | 4 | 0 |
| Junior Suite City View | 4 | 4 | 0 |
| Pinewood Suite City View | 2 | 2 | 0 |
| Triple Suite Garden View | 3 | 3 | 0 |
| Family Suite City View | 5 | 4 | 1 |
| **TOTAL** | **50** | **48** | **2** |

## Integration-specific mapping caution

Several stable internal room slugs are legacy identifiers and do not literally match the current customer-facing room name/view. Examples include:

- `junior-suite-garden-view` → current **Junior Suite City View**
- `king-suite-balcony` → current **Pinewood Suite City View**
- `triple-room-balcony` → current **Triple Suite Garden View**
- `family-suite-balcony` → current **Family Suite City View**

This is not permission to rename the slugs. Future vendor mappings must explicitly map each current Pinewood slug to the verified vendor room type ID. Vendor IDs remain `UNASSIGNED` until a real provider is selected.

## Privacy boundary for room inventory

The public repository may contain category-level physical/sellable/blocked counts because they are part of this approved baseline. It must not contain exact blocked room numbers, access codes, private blocking reasons, or other room-level operational notes.

If a future PMS import requires exact room identifiers, store them only in:

`KEEP IN PRIVATE PMS INVENTORY MAPPING`

## PMS baseline status

`CORE PMS DATA VERIFIED`

The material baseline needed for vendor evaluation is reconciled. Vendor-specific room IDs, rates, live availability, credentials, and private room-level mappings are intentionally outside this baseline and must not be invented.

## Conflict-resolution procedure

1. Record any future conflicting value and its source/date without declaring an external listing authoritative.
2. Compare it with current website state and hotel-controlled operational records.
3. Obtain Pinewood Hotel Dalat business approval for a new canonical value.
4. Change a confirmed baseline only through an explicit business-verification update.
5. If a website change is required, use a dedicated branch + PR and normal production QA.
6. If an external provider/listing change is required, update that provider through its approved operational process.
7. Do not silently make systems “match” without knowing which value is correct.
