# Pinewood Hotel Dalat — Analytics Event Specification

**Purpose:** event taxonomy and privacy contract only. This file does not add analytics code or connect GA4.

**Repository source snapshot:** `main` at `54bc749ffda26dcacee82e95b84314ed85c0251d`.

## Implementation status

`BLOCKED — GA4 MEASUREMENT ID REQUIRED`

No Measurement ID is stored or invented here. No analytics script should be added until Pinewood provides the real Measurement ID and explicitly approves implementation.

## Privacy rule

Analytics must never send:

- guest name
- guest phone number
- guest email address
- message text
- booking notes

Also avoid sending raw page URLs/query strings when they may contain booking/enquiry values. Use a normalized `page_path` allowlist instead.

## Common allowed parameters

Use only parameters needed for measurement. Event-specific parameters below are an allowlist, not a suggestion to collect everything available in the browser.

| Parameter | Allowed values / format | Notes |
| --- | --- | --- |
| `language` | `vi`, `en` | Current interface language. |
| `page_path` | Normalized route path such as `/`, `/en/`, `/phong/` | Do not include query strings or fragments containing user-entered data. |
| `source` | Controlled enum such as `header`, `footer`, `home_booking`, `room_card`, `room_detail`, `contact`, `location`, `assistance_dialog` | Do not use free-text values. |
| `room_type` | One of the eight Pinewood room slugs | Optional; no vendor ID required for website analytics. |
| `map_action` | `directions`, `place` | Only for map interaction. |
| `from_language` | `vi`, `en` | Only for language switching. |
| `to_language` | `vi`, `en` | Only for language switching. |

## Event definitions

| Event | Trigger | Route(s) | Allowed parameters | Example values | Conversion status | PII risk |
| --- | --- | --- | --- | --- | --- | --- |
| `click_book` | User intentionally clicks a booking CTA or continues from a booking entry point. | `/`, `/en/`, `/phong/`, `/en/rooms/` and any future approved booking entry route | `language`, `page_path`, `source`, optional `room_type` | `language=en`, `page_path=/en/rooms/`, `source=room_detail`, `room_type=family-suite-balcony` | Candidate **secondary** conversion / booking intent; not configured | Low if allowlist enforced |
| `click_zalo` | User clicks/taps an approved Zalo contact link or QR-linked action. | Contact surfaces and any approved sitewide assistance surface | `language`, `page_path`, `source` | `language=vi`, `page_path=/lien-he/`, `source=contact` | Candidate **secondary** lead conversion; not configured | Low; never send a guest phone number |
| `click_phone` | User clicks a `tel:` link. | Sitewide where phone contact is shown | `language`, `page_path`, `source` | `language=en`, `page_path=/en/contact/`, `source=contact` | Candidate **secondary** lead conversion; not configured | Low; do not include the clicked guest/contact number as a parameter |
| `click_maps` | User opens Google Maps place or directions. | `/vi-tri/`, `/en/location/`, `/lien-he/`, `/en/contact/`, footer | `language`, `page_path`, `source`, `map_action` | `language=vi`, `page_path=/vi-tri/`, `source=location`, `map_action=directions` | Micro-conversion / engagement; not configured | Low |
| `room_view` | A room detail panel is intentionally opened/viewed. | `/phong/`, `/en/rooms/` | `language`, `page_path`, `room_type` | `language=vi`, `page_path=/phong/`, `room_type=junior-suite-garden-view` | Funnel engagement; not a primary conversion | Low |
| `room_select` | User selects a room type in a booking/enquiry control. | `/`, `/en/` and future approved booking UI | `language`, `page_path`, `source`, `room_type` | `language=en`, `page_path=/en/`, `source=home_booking`, `room_type=king-suite-balcony` | Funnel engagement; not a primary conversion | Low |
| `booking_enquiry_start` | First intentional interaction with the booking/enquiry flow in the current page/session. | `/`, `/en/` and future approved booking/enquiry routes | `language`, `page_path`, `source`, optional `room_type` | `language=vi`, `page_path=/`, `source=home_booking`, `room_type=deluxe-double-or-twin-room` | Funnel start; candidate secondary conversion; not configured | Low if exact stay dates/guest details are excluded |
| `booking_enquiry_submit` | Current/future enquiry flow is successfully submitted or successfully hands off to the approved enquiry destination. | Approved booking/enquiry routes | `language`, `page_path`, `source`, optional `room_type` | `language=en`, `page_path=/en/`, `source=home_booking`, `room_type=twin-room-city-view` | Candidate **primary** conversion; not configured | Medium operational context; must remain strictly non-PII |
| `language_switch` | User explicitly changes site language. | Sitewide VI/EN routes | `page_path`, `from_language`, `to_language` | `page_path=/phong/`, `from_language=vi`, `to_language=en` | Not a conversion | Low |

## Event behavior rules

- Fire events only on an intentional user action or a clearly defined view transition; do not create noisy observer loops.
- `room_view` should represent a real room-detail view/open, not every room card rendered in the DOM.
- `booking_enquiry_start` should fire once per logical enquiry session/page flow, not on every keystroke.
- `booking_enquiry_submit` must fire only after a successful handoff/submission condition is known. Do not fire it merely because a form button was clicked if validation or submission failed.
- Do not attach free-form strings from forms to event payloads.
- Do not send exact message text, notes, names, email addresses, phone numbers, or other contact fields.
- Do not pass full external URLs as event values. Use controlled enums such as `map_action` or `source`.
- If a future booking engine has its own analytics, document deduplication before enabling both vendor and Pinewood events.

## Conversion model

Recommended future measurement hierarchy after GA4 is explicitly approved:

- **Primary:** `booking_enquiry_submit` until a real booking engine can provide a verified completed-booking event.
- **Secondary lead intent:** `click_phone`, `click_zalo`, `click_book`.
- **Funnel engagement:** `booking_enquiry_start`, `room_select`, `room_view`.
- **General engagement:** `click_maps`, `language_switch`.

Do not mark any event as an actual GA4 key event until analytics is implemented and validated in the real property.

## Future booking-engine note

When a real booking engine is selected, add a separate specification for provider-confirmed reservation outcomes. Do not call an enquiry click or frontend success screen a completed reservation unless the booking provider/backend confirms it.

## QA before implementation

- Confirm real GA4 Measurement ID with Pinewood.
- Confirm consent/privacy requirements for the target audience and jurisdictions.
- Review every event parameter against this allowlist.
- Verify no PII appears in GA4 DebugView/network payloads.
- Verify VI/EN routes emit the same semantic event names.
- Verify no duplicate events from repeated binding/rerendering.
- Verify analytics failure never blocks booking/contact behavior.
