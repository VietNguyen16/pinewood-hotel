# Pinewood Hotel Dalat — PMS Vendor Evaluation Template

**Purpose:** provider-neutral evaluation framework for future PMS / booking-engine / channel-manager selection. This document does **not** recommend or connect a vendor.

**Repository source snapshot:** `main` at `54bc749ffda26dcacee82e95b84314ed85c0251d`.

## Scoring system

Use the same 0–4 scale for every scored criterion:

| Score | Meaning |
| ---: | --- |
| 0 | Unavailable |
| 1 | Poor |
| 2 | Acceptable |
| 3 | Strong |
| 4 | Excellent |

Rules:

- Leave the score blank until evidence has been reviewed; do not guess.
- Record evidence from vendor documentation, contract, demo, sandbox, or written vendor confirmation.
- For cost criteria, enter the actual quoted amount/structure in **Value / answer**, then score cost transparency and commercial suitability separately using the 0–4 scale.
- For `Vendor lock-in`, a higher score means easier export/migration and lower lock-in risk.
- Do not treat sales claims as equivalent to verified API/documentation capability.

Overall score when evaluation is complete:

`sum of scored criteria / (4 × number of scored criteria) × 100`

The numeric score is a comparison aid only; critical security, operational, contractual, or data-portability failures may disqualify a vendor regardless of total score.

## Vendor record

| Field | Value / answer | Score (0–4) | Evidence / notes |
| --- | --- | ---: | --- |
| Vendor |  |  |  |
| Product |  |  |  |
| Pricing |  |  |  |
| Setup cost |  |  |  |
| Monthly cost |  |  |  |
| Commission |  |  |  |
| Booking engine |  |  |  |
| Widget |  |  |  |
| API |  |  |  |
| Webhooks |  |  |  |
| Availability API |  |  |  |
| Rates API |  |  |  |
| Inventory API |  |  |  |
| Reservation API |  |  |  |
| Modify/cancel API |  |  |  |
| Channel manager |  |  |  |
| Booking.com |  |  |  |
| Agoda |  |  |  |
| Trip.com |  |  |  |
| Traveloka |  |  |  |
| Google Hotel integration |  |  |  |
| Payment support |  |  |  |
| Vietnamese |  |  |  |
| English |  |  |  |
| Mobile UX |  |  |  |
| Support |  |  |  |
| Data export |  |  |  |
| Security |  |  |  |
| Sandbox |  |  |  |
| Documentation quality |  |  |  |
| Vendor lock-in |  |  |  |

## Evidence questions by area

### Commercial

- What is included in setup cost?
- Is monthly pricing per property, per room, per user, or tiered?
- Is there booking-engine commission in addition to payment/acquirer fees?
- Are channel-manager connections included or charged individually?
- Are API, webhooks, sandbox, onboarding, data export, and support included?
- What are contract term, renewal, cancellation, and price-increase conditions?

### Booking engine and widget

- Is there a vendor-hosted booking URL?
- Is an embeddable widget available?
- Can the experience support Vietnamese and English?
- Can check-in/check-out, party size, and room type be prefilled safely?
- Is mobile UX strong at 375/390/430 px?
- What accessibility support is documented?
- Does the vendor inject analytics/cookies, and can Pinewood control consent behavior?

### API and webhooks

Require documentation/evidence for each supported capability:

- Availability lookup.
- Rates lookup.
- Inventory read/write.
- Reservation creation.
- Reservation retrieval.
- Modification.
- Cancellation.
- Webhook event types.
- Webhook signing/verification.
- Idempotency.
- Rate limits.
- Authentication method.
- Versioning/deprecation policy.
- Error model and retry guidance.

Do not place any test/production secret in the Pinewood public repository during evaluation.

### Channel connectivity

For Booking.com, Agoda, Trip.com, Traveloka, and Google Hotel integration, record:

- Native/direct integration or intermediary connection.
- Supported inventory/rate/restriction sync direction.
- Reservation delivery method.
- Modification/cancellation handling.
- Known latency or batching.
- Certification/partner status evidence where applicable.
- Additional cost/commission.

Do not assume a marketplace logo on a vendor website proves full two-way connectivity.

### Payment

- Supported payment gateway/acquirer options in Vietnam.
- Hosted/tokenized checkout availability.
- 3-D Secure support where applicable.
- Refund workflow.
- Deposit/prepayment support.
- Currency support.
- PCI responsibility boundaries.
- Whether Pinewood would ever receive raw card data; preferred answer is no for the GitHub Pages frontend.

### Operations and support

- Vietnamese support availability and hours.
- English support availability and hours.
- Emergency/after-hours escalation.
- SLA and incident communications.
- Onboarding/migration assistance.
- Training resources.
- Role/permission controls.
- Audit logs.

### Data ownership, export, and lock-in

- Can Pinewood export property, room, rate, reservation, guest, invoice, and channel data in standard formats?
- Are exports self-service or vendor-assisted?
- Is there an API for bulk export?
- What happens to data after contract termination?
- Are there exit fees or migration restrictions?
- Can Pinewood keep its own canonical room slugs/mapping table?

### Security

Request evidence for:

- Encryption in transit and at rest.
- Account MFA.
- Role-based access control.
- Audit logging.
- Secret/key rotation.
- Webhook signature validation.
- Security incident process.
- Backup/disaster recovery.
- Data residency/subprocessors where relevant.
- Privacy/data-processing agreement.
- Independent security certifications/reports if offered.

## Pinewood-specific integration checks

Before selecting any vendor, confirm:

- All eight Pinewood room slugs can map explicitly to vendor room IDs.
- No room is mapped solely by similar name text.
- The vendor can represent Pinewood’s business-approved room inventory, capacities, rates, restrictions, and policies.
- Phone, Zalo, and Contact enquiry remain available when the vendor is unavailable.
- API secrets can remain entirely outside GitHub Pages.
- The integration can follow `BOOKING_INTEGRATION_SPEC.md`.
- Analytics can follow `ANALYTICS_EVENT_SPEC.md` without leaking PII.
- A sandbox or equivalent safe test path exists before production integration where technically applicable.

## Decision record

Do not fill this section until evaluation evidence exists.

- Shortlisted vendor: `UNASSIGNED`
- Approved product: `UNASSIGNED`
- Commercial approver: `UNASSIGNED`
- Technical approver: `UNASSIGNED`
- Room mapping approved: `NO`
- Security review complete: `NO`
- Contract review complete: `NO`
- Production integration approved: `NO`

**Current recommendation:** none. Vendor selection is intentionally deferred.
