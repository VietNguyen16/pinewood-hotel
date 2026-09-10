# Pinewood Hotel Dalat — Production QA Checklist

**Purpose:** reusable release checklist for Pinewood Hotel Dalat. This document does not modify production code.

**Repository source snapshot used to create this checklist:** `main` at `54bc749ffda26dcacee82e95b84314ed85c0251d`.

Use this checklist for every production release. Record the PR, source SHA, merged SHA, deployment run, tester, date, and any exceptions in the release notes.

## 1. Git safety

- [ ] Work is on a dedicated branch, not directly on `main`.
- [ ] Branch was created from the intended current `main` SHA.
- [ ] PR targets `main`.
- [ ] PR head SHA is recorded before merge.
- [ ] Changed files match the approved scope exactly.
- [ ] No unrelated formatting/refactor/content changes are present.
- [ ] No credentials, API keys, tokens, passwords, payment secrets, or private data are committed.
- [ ] No unexpected binary files are changed.
- [ ] `git diff --check` or equivalent whitespace validation passes where available.
- [ ] Required syntax/build checks pass for changed code/templates.
- [ ] Reviewer confirms rollback path and previous known-good production SHA.

## 2. PR review

- [ ] PR title and description state the actual change and scope.
- [ ] Base = `main`.
- [ ] Head = intended release branch.
- [ ] PR is mergeable with no unresolved conflicts.
- [ ] Final diff is reviewed after all commits are present.
- [ ] VI and EN impact is explicitly considered.
- [ ] Mobile and desktop impact is explicitly considered.
- [ ] Booking/contact regressions are considered even when the PR does not intentionally change booking.
- [ ] No fake rating/review schema is introduced.
- [ ] No third-party integration is enabled without explicit approval.

## 3. GitHub Pages deployment

- [ ] Merge method follows the release decision; merged commit SHA is recorded.
- [ ] GitHub Pages workflow triggers for the merged `main` commit.
- [ ] Workflow head SHA equals the merged production commit.
- [ ] Build job completes successfully.
- [ ] Deploy job completes successfully.
- [ ] No failed/retried job is ignored without investigation.
- [ ] Production QA begins only after the correct deployment is successful.

## 4. Commercial routes — HTTP and content

Verify HTTP 200, no unexpected redirect, no 404/5xx, correct language/content, and normal layout for all 12 commercial routes:

- [ ] `https://pinewoodhotel.vn/`
- [ ] `https://pinewoodhotel.vn/en/`
- [ ] `https://pinewoodhotel.vn/phong/`
- [ ] `https://pinewoodhotel.vn/en/rooms/`
- [ ] `https://pinewoodhotel.vn/vi-tri/`
- [ ] `https://pinewoodhotel.vn/en/location/`
- [ ] `https://pinewoodhotel.vn/dich-vu/`
- [ ] `https://pinewoodhotel.vn/en/services/`
- [ ] `https://pinewoodhotel.vn/lien-he/`
- [ ] `https://pinewoodhotel.vn/en/contact/`
- [ ] `https://pinewoodhotel.vn/moi-truong/`
- [ ] `https://pinewoodhotel.vn/en/environment/`

Supporting endpoints:

- [ ] `https://pinewoodhotel.vn/sitemap.xml` returns HTTP 200.
- [ ] `https://pinewoodhotel.vn/robots.txt` returns HTTP 200.

## 5. Responsive matrix

At minimum test representative commercial pages at each viewport:

- [ ] Mobile 375 px.
- [ ] Mobile 390 px.
- [ ] Mobile 430 px.
- [ ] Desktop 1440 px.
- [ ] No horizontal overflow.
- [ ] No clipped controls/text.
- [ ] No CTA overlap.
- [ ] No broken image aspect ratio.
- [ ] No obvious CLS/layout break during load.

Recommended page set for the matrix:

- [ ] Homepage VI and EN.
- [ ] Rooms VI and EN.
- [ ] Services VI and EN.
- [ ] Contact VI and EN.

## 6. Header and navigation

- [ ] Pinewood logo is unchanged unless the release explicitly includes a logo update.
- [ ] Header colors/fonts/spacing match the approved design unless intentionally changed.
- [ ] Desktop navigation works.
- [ ] Mobile hamburger opens.
- [ ] Mobile menu closes after navigation.
- [ ] Mobile menu closes when tapping outside where supported.
- [ ] Esc closes the menu/dialog where applicable.
- [ ] Header/menu does not cover or trap page content.

## 7. Language switch

- [ ] VI → EN works from homepage.
- [ ] EN → VI works from homepage.
- [ ] VI → EN works from representative inner page.
- [ ] EN → VI works from representative inner page.
- [ ] Logo navigation preserves the current language.
- [ ] Ordinary navigation does not silently switch language.
- [ ] Deep-linked VI/EN routes retain their intended language.

## 8. Homepage booking/enquiry form

- [ ] Booking/enquiry UI loads on VI homepage.
- [ ] Booking/enquiry UI loads on EN homepage.
- [ ] Check-in input works.
- [ ] Check-out input works.
- [ ] Valid date flow works.
- [ ] Invalid date is blocked.
- [ ] `checkout <= checkin` is blocked/corrected according to approved behavior.
- [ ] Manual date entry followed by immediate click uses the current typed value, not a stale value.
- [ ] Room selector reflects current enabled room types.
- [ ] Guest selector works.
- [ ] VI flow reaches the correct VI contact/enquiry destination.
- [ ] EN flow reaches the correct EN contact/enquiry destination.
- [ ] Phone fallback remains available.
- [ ] Zalo fallback remains available.
- [ ] Contact enquiry fallback remains available.
- [ ] No frontend flow claims confirmed availability/reservation without a real provider confirmation.

## 9. Rooms and gallery

- [ ] `/phong/` loads correctly.
- [ ] `/en/rooms/` loads correctly.
- [ ] Exactly the current 8 enabled room types are represented.
- [ ] VI and EN room names match current YAML.
- [ ] Room area matches current YAML.
- [ ] Bed configuration matches current YAML.
- [ ] Guest capacity matches current YAML.
- [ ] View matches current YAML.
- [ ] Room card lead images load.
- [ ] Room detail panels open/close correctly.
- [ ] Gallery/lightbox opens where images are available.
- [ ] Gallery previous/next controls work where applicable.
- [ ] No broken/404 room image.
- [ ] Internal slug is not displayed as customer-facing room truth when it differs from the current name/view.

## 10. Services

- [ ] `/dich-vu/` loads normally.
- [ ] `/en/services/` loads normally.
- [ ] VI/EN service content is semantically aligned.
- [ ] Breakfast time remains consistent with approved property data.
- [ ] Wi-Fi/service claims remain consistent with approved property data.
- [ ] `https://pinewoodhotel.vn/assets/images/pinewood-services-room.jpg` returns HTTP 200 and is a real JPEG.
- [ ] `https://pinewoodhotel.vn/assets/images/pinewood-services-room-800.webp` returns HTTP 200.
- [ ] `https://pinewoodhotel.vn/assets/images/pinewood-services-room-1600.webp` returns HTTP 200.
- [ ] Services image renders correctly in VI and EN.

## 11. Contact actions

- [ ] VI Contact page shows the approved hotel address.
- [ ] EN Contact page shows the approved hotel address.
- [ ] Display phone is correct.
- [ ] `tel:` target is correct.
- [ ] Email link is correct.
- [ ] Zalo target is correct.
- [ ] Zalo QR resolves to the intended hotel account when QR is changed.
- [ ] Google Maps place/directions link opens the intended Pinewood destination.
- [ ] Footer phone/email/address actions work.

## 12. Canonical and hreflang

For each commercial VI/EN pair:

- [ ] Self-canonical is correct and absolute.
- [ ] VI `hreflang` points to the matching VI route.
- [ ] EN `hreflang` points to the matching EN route.
- [ ] `x-default` points to the approved default route.
- [ ] No canonical points to a redirect/404.
- [ ] No malformed absolute URL is present.

## 13. Hotel structured data

- [ ] Hotel JSON-LD parses.
- [ ] `@id` remains `https://pinewoodhotel.vn/#hotel` unless an approved schema migration changes it.
- [ ] Hotel name is correct.
- [ ] Telephone/email are correct.
- [ ] Address is correct.
- [ ] Coordinates are correct.
- [ ] Check-in/check-out times are correct.
- [ ] `numberOfRooms` matches business-approved inventory before any inventory-related release.
- [ ] No `AggregateRating`, `Review`, or `starRating` is added without verified authoritative data and explicit approval.

## 14. HotelRoom structured data

- [ ] VI Rooms renders 8 `HotelRoom` entries.
- [ ] EN Rooms renders 8 `HotelRoom` entries.
- [ ] Each enabled room has the correct `@id`/URL relationship.
- [ ] Room name/alternateName match current YAML.
- [ ] `floorSize` matches current YAML.
- [ ] `bed` matches current YAML.
- [ ] `occupancy` matches current YAML.
- [ ] Each room image is present when source imagery exists.
- [ ] Each `HotelRoom.image` is absolute: `https://pinewoodhotel.vn/assets/...`.
- [ ] No malformed `https://pinewoodhotel.vnhttps://...` URL.
- [ ] No malformed `https://pinewoodhotel.vn//assets/...` URL.
- [ ] No `undefined...` or `null...` image URL.

## 15. Sitemap and robots

- [ ] Live `sitemap.xml` is valid XML.
- [ ] Sitemap contains 12 commercial page URLs.
- [ ] Sitemap contains 12 unique commercial page URLs.
- [ ] `/gallery/` is absent unless a real approved route is intentionally introduced.
- [ ] Image sitemap namespace is valid.
- [ ] Homepage hero image is included.
- [ ] Current room cover images are included from the room source of truth.
- [ ] Services key image is included.
- [ ] Every `image:loc` is an absolute `https://pinewoodhotel.vn/assets/...` URL.
- [ ] No abnormal duplicate room-image list appears.
- [ ] `robots.txt` allows intended crawling.
- [ ] `robots.txt` references `https://pinewoodhotel.vn/sitemap.xml`.

## 16. Images

- [ ] No broken image on representative desktop pages.
- [ ] No broken image on representative mobile pages.
- [ ] Critical hero image loads.
- [ ] Room lead images load.
- [ ] Room gallery images load.
- [ ] Services responsive image sources load.
- [ ] Logo/favicon load.
- [ ] No unexpected duplicate large image request introduced by the release.

## 17. Console and network

On `/`, `/phong/`, `/en/rooms/`, and `/dich-vu/` at minimum:

- [ ] No fatal JavaScript error.
- [ ] No unhandled promise rejection.
- [ ] No unexpected 404 asset request.
- [ ] No unexpected 403.
- [ ] No 5xx request.
- [ ] No mixed-content warning.
- [ ] No wrong MIME-type failure.
- [ ] No runaway observer/render loop.
- [ ] No release-caused duplicate huge image request.

## 18. 404 and deep links

- [ ] Known commercial deep links load directly without GitHub Pages 404.
- [ ] Known guest-information deep links relevant to the release load directly.
- [ ] Room hash/deep-link behavior works after refresh/direct entry where supported.
- [ ] An intentionally nonexistent test path reaches the expected 404 behavior and does not masquerade as a valid page.
- [ ] Navigation does not create accidental duplicate/trailing-path variants that 404.

## 19. Release decision

- [ ] Critical HTTP checks pass.
- [ ] Booking/contact critical path passes or is explicitly marked not applicable with justification.
- [ ] No production blocker remains.
- [ ] Any unavailable QA capability is reported as `NOT RUN`, never fabricated.
- [ ] Release is marked PASS only when actual required checks pass.

## 20. Rollback

Before release:

- [ ] Record previous known-good `main` SHA.
- [ ] Record current PR/head/merged SHA.

If a production blocker is discovered:

- [ ] Stop further unrelated changes.
- [ ] Document the blocker and affected routes/features.
- [ ] Prefer a dedicated revert/fix branch + PR; do not force-push `main`.
- [ ] Revert only the offending release scope unless a wider rollback is explicitly approved.
- [ ] Wait for GitHub Pages build/deploy success for the rollback commit.
- [ ] Re-run critical production QA after rollback.
- [ ] Preserve incident details and final known-good SHA in release notes.
