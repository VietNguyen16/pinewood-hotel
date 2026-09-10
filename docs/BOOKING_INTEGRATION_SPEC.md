# Pinewood Hotel Dalat — Booking Integration Specification

**Purpose:** provider-neutral architecture for a future PMS / booking engine / channel manager integration. Documentation only; no provider is connected by this document.

**Repository source snapshot:** `main` at `54bc749ffda26dcacee82e95b84314ed85c0251d`.

## Current state

- Hosting/frontend: static GitHub Pages.
- `js/config.js` currently has `booking.enabled: false` and an empty booking URL.
- The current homepage has an enquiry-oriented booking UI with check-in, check-out, room, and guest inputs, plus a contact fallback.
- Room pages use the current Pinewood room slugs as stable internal identifiers.
- There is no real-time inventory sync, vendor API, payment gateway, or PMS connection in the current website.

This specification must not be interpreted as evidence that availability, rates, or reservations are currently synchronized.

## Integration principles

1. Keep Pinewood room slugs as the website-side canonical room identifiers.
2. Maintain an explicit mapping from Pinewood slug to vendor room ID; never infer vendor IDs.
3. Never place API secrets, private tokens, webhook signing secrets, payment secrets, PMS credentials, or privileged keys in GitHub Pages HTML/JS/configuration.
4. Keep Phone, Zalo, and Contact enquiry available as operational fallbacks.
5. Treat current repository rate fields as website data, not as a future live rate source unless the hotel explicitly approves that role.
6. Treat vendor/PMS availability and reservation state as authoritative only after a verified integration is live.
7. Any future implementation must use a separate branch and PR and must pass the production QA checklist.

## Supported future integration modes

### A. External booking URL

Architecture:

```text
Pinewood GitHub Pages
        |
        | public booking parameters only
        v
Vendor-hosted booking URL
```

Use when the vendor provides a hosted booking engine URL. The site may construct a vendor URL using only documented public query parameters. No private token or secret may be embedded in the URL or frontend.

Expected characteristics:

- Lowest integration complexity.
- Vendor owns booking UI, payment, availability, rate display, confirmation, modification, and cancellation flow.
- Pinewood should preserve a fallback to Phone, Zalo, and Contact enquiry if the external URL is unavailable.

### B. Vendor booking widget

Architecture:

```text
Pinewood GitHub Pages
        |
        | approved public widget configuration
        v
Vendor widget/script
        |
        v
Vendor booking platform
```

Use when a vendor supplies an embeddable booking widget. Before implementation, verify accessibility, VI/EN behavior, mobile UX, loading impact, CSP requirements, cookie/tracking behavior, privacy implications, and graceful failure.

Only vendor values explicitly documented as public browser-side identifiers may appear in the frontend. Secrets remain prohibited.

### C. Secure backend API integration

Architecture:

```text
Pinewood GitHub Pages
        |
        | HTTPS, non-secret client request
        v
Pinewood-controlled secure backend / BFF
        |
        | server-side credentials
        v
PMS / booking engine / channel manager API
```

Use when Pinewood requires first-party availability, rates, reservation creation, modification, cancellation, or webhook processing.

The backend must own:

- API credentials and secret rotation.
- Vendor authentication.
- Input validation.
- Rate limiting and abuse protection.
- Idempotency for reservation creation/modification.
- Webhook signature verification.
- Structured error handling and audit logging.
- PII retention/deletion controls.
- Payment-token handling only if the selected payment architecture requires it.

GitHub Pages must never be used as the secret-bearing API layer.

## Canonical booking parameters

These parameters form the provider-neutral Pinewood contract. A vendor adapter may translate names/formats as required.

| Parameter | Type | Required | Rule |
| --- | --- | --- | --- |
| `checkin` | date string | Yes | ISO `YYYY-MM-DD`; must be a valid arrival date. |
| `checkout` | date string | Yes | ISO `YYYY-MM-DD`; must be strictly later than `checkin`. |
| `adults` | integer | Yes | `>= 1`; validate against selected room/product capacity. |
| `children` | integer | Yes | `>= 0`; child-age rules are vendor/business-policy dependent and require explicit definition before launch. |
| `rooms` | integer | Yes | `>= 1`; must not exceed vendor-supported request limits. |
| `room_type` | string | No | Pinewood room slug when a specific room is selected; otherwise omit or use an adapter-defined “any room” state. |

### Current UI compatibility note

The current homepage uses a single `guests` field. Do **not** silently reinterpret that value as `adults`, `children`, or their sum. A future integration must explicitly define the migration from the current guest selector to the canonical party model.

## Future room mapping

Vendor IDs are intentionally unassigned until a real provider is selected and the mapping is verified in that provider’s inventory.

| Pinewood room slug | Vendor room ID |
| --- | --- |
| `deluxe-double-or-twin-room` | `UNASSIGNED` |
| `twin-room-city-view` | `UNASSIGNED` |
| `double-room-garden-view` | `UNASSIGNED` |
| `twin-room-garden-view` | `UNASSIGNED` |
| `junior-suite-garden-view` | `UNASSIGNED` |
| `king-suite-balcony` | `UNASSIGNED` |
| `triple-room-balcony` | `UNASSIGNED` |
| `family-suite-balcony` | `UNASSIGNED` |

Mapping rules:

- Match by business-approved room identity, not by similar-looking text alone.
- Legacy Pinewood slugs must not be renamed merely to resemble vendor names.
- Record vendor room ID, vendor room name, mapping approval date, and approver during implementation.
- A missing/ambiguous mapping must block automated booking for that room and fall back to direct contact.

## Availability flow

1. Validate `checkin`, `checkout`, `adults`, `children`, `rooms`, and optional `room_type`.
2. If a specific `room_type` is provided, resolve it through the approved room mapping.
3. Mode A: redirect to the vendor booking URL with supported public parameters.
4. Mode B: initialize/update the vendor widget with supported public parameters.
5. Mode C: send the validated request to the Pinewood backend; the backend queries vendor availability.
6. Return only normalized availability needed by the UI.
7. If vendor response is unavailable, invalid, timed out, or unmapped, do not invent availability. Present fallback contact channels.

## Rate flow

1. Rates displayed as live bookable prices must come from the approved live booking source after integration.
2. Normalize currency and mandatory taxes/fees before display; disclose what is included/excluded.
3. Never infer a live price from stale HTML/YAML values when the vendor is intended to own live rates.
4. If a rate cannot be confirmed, label it as unavailable for online confirmation and use fallback contact.
5. Final charge shown at booking creation must match the provider/backend response used for the reservation request.

## Booking creation

For Mode C:

1. Re-check availability/rate immediately before creation where the provider supports it.
2. Validate required guest/contact fields server-side.
3. Generate/use an idempotency key to prevent duplicate reservations.
4. Create the reservation through the provider API.
5. Persist only the minimum operational data required by Pinewood’s approved data policy.
6. Return the provider/Pinewood confirmation reference and clear next steps.
7. Analytics must receive only the approved non-PII event payload defined in `ANALYTICS_EVENT_SPEC.md`.

Modes A/B may leave creation entirely inside the vendor platform.

## Booking modification

Preferred order:

1. Vendor-hosted manage-booking URL, if available and appropriate.
2. Secure Pinewood backend calling a verified modify API.
3. Manual handling via Phone, Zalo, or Contact enquiry when self-service modification is unavailable.

Modification must never be simulated client-side without provider confirmation.

## Booking cancellation

Preferred order:

1. Vendor-hosted cancellation/manage-booking flow, or
2. Secure backend using a verified cancellation API, or
3. Manual Pinewood contact fallback.

Cancellation policy, deadlines, penalties, refund rules, and payment consequences must come from the approved business/vendor configuration. Do not hardcode unverified policy text.

## Failure fallback

Every integration mode must retain these paths:

- **Phone:** `0785 098 686` (`tel:+84785098686`)
- **Zalo:** `https://zalo.me/0785098686`
- **Contact enquiry VI:** `/lien-he/`
- **Contact enquiry EN:** `/en/contact/`

Fallback conditions include, at minimum:

- Vendor outage or timeout.
- Widget/script load failure.
- Invalid or missing room mapping.
- Availability/rate API error.
- Reservation creation error.
- Payment/provider error.
- Unsupported modification/cancellation request.

Fallback messaging must not claim that a booking was created unless a confirmed reservation response exists.

## Security and privacy requirements

- No API secrets in GitHub Pages.
- No credentials in repository files, query strings, browser storage, or analytics events.
- No raw payment card data handled by the static frontend.
- Prefer vendor-hosted/tokenized payment or a PCI-appropriate backend design.
- Use HTTPS only.
- Validate and encode all outbound parameters.
- Do not expose internal vendor error payloads to guests.
- Log operational identifiers, not unnecessary PII.
- Define data retention and deletion before storing reservation/customer data.

## Go-live gates for a future provider

- Property master data business-approved.
- All eight room mappings assigned and verified.
- Inventory/rate ownership documented.
- Cancellation/modification rules verified.
- Sandbox/test credentials available server-side where applicable.
- Production credentials stored only in a secure secret store.
- Phone/Zalo/Contact fallback tested.
- Analytics payload reviewed for PII.
- Full `PRODUCTION_QA_CHECKLIST.md` completed.
- Separate implementation PR reviewed and deployed successfully.
