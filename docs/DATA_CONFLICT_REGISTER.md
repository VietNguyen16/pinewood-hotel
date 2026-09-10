# Pinewood Hotel Dalat — Data Conflict Register

**Purpose:** record property facts that must be reconciled before they are synchronized to a PMS, booking engine, channel manager, CRM, payment platform, analytics property, or external listing.

**Repository source snapshot:** `main` at `54bc749ffda26dcacee82e95b84314ed85c0251d`.

## Authority rule

The current repository is authoritative for the **current website state**. OTA, marketplace, map, social, or other third-party data must never be treated as authoritative merely because it is published externally.

No external provider was queried or connected during creation of this documentation-only pack. Therefore, where an external business fact is not independently established, the register uses:

`NEEDS BUSINESS VERIFICATION`

Every unresolved conflict must remain in that status until Pinewood Hotel Dalat approves the canonical value.

## Register

| FIELD | WEBSITE | EXTERNAL OBSERVATION | STATUS | ACTION |
| --- | --- | --- | --- | --- |
| Phone | Display: `0785 098 686`; E.164/tel target: `+84785098686` | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Confirm the active reservations/reception number with hotel management, then reconcile hotel-owned listings and future vendor setup. Do not change the website based only on an OTA value. |
| Email | `info@pinewoodhotel.vn` | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Confirm that this mailbox is active, monitored, and approved for guest/reservation communication before PMS/CRM/vendor onboarding. |
| Total room count | Current Hotel schema: `50`; current website copy references 50 rooms; current YAML `room_count` values total 50 (`12 + 4 + 16 + 4 + 4 + 2 + 3 + 5`) | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Reconcile against the hotel’s physical inventory and sellable PMS inventory. Confirm out-of-order/non-sellable room treatment before importing inventory. |
| Breakfast time | `06:30–09:00` | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Confirm current operating hours with hotel operations. If approved hours change, update website and future PMS/booking/listing data through controlled changes. |
| Room areas | `deluxe-double-or-twin-room` 25 m²; `twin-room-city-view` 25 m²; `double-room-garden-view` 25 m²; `twin-room-garden-view` 25 m²; `junior-suite-garden-view` 30 m²; `king-suite-balcony` 78 m²; `triple-room-balcony` 45 m²; `family-suite-balcony` 45 m² | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Verify each category against hotel-approved room plans/inventory. Do not overwrite current website values from OTA data without hotel approval. |
| Amenities | Hotel structured data currently advertises Free Wi-Fi, Breakfast, and Restaurant. Services/content and room YAML contain broader hotel/room-level amenity lists. | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Build a business-approved amenity matrix by room type and property level before exporting to a PMS/channel manager/OTA. Resolve differences item-by-item rather than bulk-copying an external listing. |
| Star rating | Current website deliberately has no `starRating` or `AggregateRating`; no authoritative official star classification is stored in the current source. | `NEEDS BUSINESS VERIFICATION` | `NEEDS BUSINESS VERIFICATION` | Verify any official hotel classification from authoritative hotel/business records before publication. Never convert OTA guest review scores into a hotel star rating and never add fake rating schema. |

## Integration-specific mapping caution

Several stable internal room slugs are legacy identifiers and do not literally match the current customer-facing room name/view. Examples include:

- `junior-suite-garden-view` → current **Junior Suite City View**
- `king-suite-balcony` → current **Pinewood Suite City View**
- `triple-room-balcony` → current **Triple Suite Garden View**
- `family-suite-balcony` → current **Family Suite City View**

This is not permission to rename the slugs. Future vendor mappings must explicitly map each current Pinewood slug to the verified vendor room ID. See `BOOKING_INTEGRATION_SPEC.md`.

## Conflict-resolution procedure

1. Record the external value and its source/date without declaring it authoritative.
2. Compare it with current website data and any hotel-controlled operational record.
3. Ask Pinewood Hotel Dalat to approve the canonical business value.
4. Update this register status only after approval.
5. If a website change is required, use a dedicated branch + PR and normal production QA.
6. If an external provider/listing change is required, update that provider through its approved operational process.
7. Do not silently make both sides “match” without knowing which value is correct.

## Resolution record template

When a row is resolved, append a short record:

- Field:
- Previous website value:
- External observed value:
- Approved canonical value:
- Business approver:
- Approval date:
- Website change required: YES / NO
- External listing/vendor change required: YES / NO
- Related PR/ticket/reference:
