# Pinewood Hotel Dalat — Local SEO, NAP & Backlink Plan

Internal working document. Do not add this file to public website navigation.

Audit date: 2026-09-07
Production source of truth: https://pinewoodhotel.vn/
Production branch at audit start: `main`
HEAD before implementation: `5171ec346ebb1b8b99ff5e37730c6fb7a6b405ce`

## 1. Verified Pinewood entity data

- Name: Pinewood Hotel Dalat
- Website: https://pinewoodhotel.vn/
- Phone: 0785 098 686
- Telephone URI: +84785098686
- Email: info@pinewoodhotel.vn
- Address VI: 54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam
- Address EN: 54 Vo Truong Toan Street, Lam Vien - Da Lat, Lam Dong, Vietnam
- Coordinates: 11.9611181, 108.4512011
- Check-in: 14:00
- Check-out: 12:00
- Google Maps listing: https://www.google.com/maps/place/Kh%C3%A1ch+s%E1%BA%A1n+Pinewood/@11.9611181,108.4486208,1207m/data=!3m1!1e3!4m11!3m10!1s0x3171130010cadc19:0xdcb299e4322ab577!5m2!4m1!1i2!8m2!3d11.9611181!4d108.4512011!9m1!1b1!16s%2Fg%2F11njdj19vf
- Booking listing: https://www.booking.com/hotel/vn/pinewood-dalat.html
- Official social profiles currently verified in project data: Instagram `@pinewooddalat`, TikTok `@dalat.pinewood`

Do not replace the website source of truth with OTA data when the OTA differs.

## 2. Pre-change technical SEO audit

| Schema / SEO element | Current state before this task | Problem | Recommended change | File | Risk |
|---|---|---|---|---|---|
| Hotel entity | One `Hotel` with `@id=https://pinewoodhotel.vn/#hotel` | Correct architecture; missing `geo`; `hasMap` pointed to a directions URL rather than the supplied listing | Keep the same entity ID; add verified coordinates; use supplied Google Maps listing for `hasMap` | `_layouts/app.html` | Low |
| WebSite | One `WebSite` with `@id=#website`, publisher points to `#hotel` | No material issue | Keep | `_layouts/app.html` | Low |
| WebPage | Canonical page entity points to `#website` and `#hotel` | Primary image always defaulted to room image | Allow page-specific verified OG/primary image without duplicating schema | `_layouts/app.html` | Low |
| BreadcrumbList | Generated for pages with `breadcrumb_name` | Important Rooms, Location, Services and Contact pages already have breadcrumb data | Keep current architecture | `_layouts/app.html` + page front matter | Low |
| HotelRoom | Not present | Eight room types had no structured room entities | Generate 8 `HotelRoom` nodes from existing PagesCMS/Jekyll room data; reuse one stable `@id` per room across VI/EN | `phong/index.html`, `en/rooms/index.html` | Low-Medium |
| Rating/review schema | No `aggregateRating`, `review`, `starRating` | None; this is the safe state | Keep ratings out of Hotel JSON-LD | Project-wide | Low |
| Home FAQ schema | Static home carried FAQ JSON-LD while the rendered homepage did not present a matching FAQ block; runtime JS removed it | Raw HTML and rendered state were inconsistent | Remove the static home FAQ JSON-LD; keep visible Contact FAQ schema where its questions are actually rendered | `index.html`, `en/index.html` | Low |
| Review trust links | Google Maps review link existed; Booking review link was absent from the rendered trust strip | Trust references incomplete | Add a simple Booking.com link beside existing Google/social links, with no score copied into the site | `js/local-seo.js`, home fallbacks | Low |
| Home → Location link | Header did not expose Location on SPA home; home address linked only to Google directions | Local landing page had weaker internal discovery from Home | Add a small existing-style Location link next to the home address | `js/local-seo.js`, static home fallbacks | Low |
| Services social image | Page body used the Pinewood room-comfort image but OG/dynamic SEO and sitemap still referenced breakfast imagery | Metadata/image mismatch | Use current Pinewood Services image for OG/Twitter/WebPage and sitemap | `_layouts/app.html`, Services pages, `js/seo.js`, `sitemap.xml` | Low |

## 3. NAP / external listing consistency audit

Website NAP remains authoritative. External differences are correction tasks for those platforms, not reasons to change Pinewood's website.

| Platform | Name observed | Address observed | Phone / email observed | Conflict | Recommended action | Priority |
|---|---|---|---|---|---|---|
| Pinewood website | Pinewood Hotel Dalat | 54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam | 0785 098 686 / info@pinewoodhotel.vn | Source of truth | Keep | P0 baseline |
| Google Maps | Exact listing URL and coordinates supplied by owner | Public text not reliably retrievable in this audit environment | Not reliably retrievable | Full NAP not independently checked | Owner: open Google Business Profile and confirm name, primary category, exact address, phone, website URL, map pin and hours/contact details | P0 |
| Booking.com | Pinewood Dalat | `54 Đường Võ Trường Toản 50, 670000 Ấp Ða Thiên, Vietnam` in current crawl | Phone hidden publicly | Name and address formatting conflict with official website | Correct property name/address through Booking extranet/support; do not change website | P0 |
| Trip.com | PINEWOOD DALAT | `54 Đường Võ Trường Toản, Lâm Viên - Đà Lạt, Lâm Đồng, Việt Nam` | Current crawl exposes `+84-987643968` and `dgm@pinewoodhotel.vn` | Phone/email conflict with official website; listing also shows inconsistent room-count text | Correct phone/email and verify room inventory/profile via Trip.com partner channel | P0 |
| Traveloka | Pinewood Dalat | `54 Vo Truong Toan, Pinewood Dalat Hotel, Ward 8, Da Lat, Lam Dong, Vietnam, 670000` | Not confirmed in public crawl | Name/address formatting differs from official NAP | Normalize name/address in partner portal while keeping platform-required locality fields | P1 |
| Agoda | Exact Pinewood listing not verified in this audit | Not verified | Not verified | Unknown | Manually locate/claim listing, then compare NAP against website | P1 |

### Review data note

Booking review counts/scores are volatile and crawls disagree across language/cache snapshots. A recent English crawl showed 10/10 with 2 reviews and Location 8.7, while another recent Vietnamese crawl showed 1 review. The user-supplied snapshot recorded 10/10, 2 reviews and Location 8.8. Therefore no score, count, category score or `aggregateRating` is copied into Pinewood's production schema or static website content.

## 4. Backlink and citation opportunities

Priorities:
- **P0**: authoritative local/entity accuracy or existing listing correction.
- **P1**: strong industry/local relevance with realistic acquisition path.
- **P2**: editorial outreach that should be earned, not bought.

| Domain | Organization | Type | Relevance | Authority / reputation | Current Pinewood mention? | Current link? | Recommended action | Contact / page URL | Anchor recommendation | Priority | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| dalat.vn | Da Lat tourism portal | Official / tourism directory | Very high local accommodation relevance | Official destination portal | Not found in current exact-name search | Not confirmed | Request/add a complete accommodation profile using official NAP, website, phone, verified photos and room information | https://dalat.vn/en/hotels | Pinewood Hotel Dalat | P0 | Outreach / listing submission |
| visitlamdong.vn | Lam Dong tourism portal / Tourism Promotion Center | Official / tourism directory | Very high provincial relevance | Portal identifies itself as managed by Lam Dong tourism authorities/promotion center | Not found in current exact-name search | Not confirmed | Ask the Tourism Promotion Center how to create/claim an accommodation profile and use exact Pinewood NAP | https://visitlamdong.vn/vi/ | Pinewood Hotel Dalat | P0 | Outreach / listing submission |
| lta.com.vn | Lam Dong Tourism Association (LTA) | Industry association | Very high local hospitality relevance | Provincial tourism association with Hotel–Resort member group | Not found in current exact-name search | Not confirmed | Contact LTA about hotel/resort membership or member listing; provide official website and NAP | https://lta.com.vn/lien-he/ ; info@lta.com.vn | Pinewood Hotel Dalat | P1 | Membership enquiry |
| booking.com | Booking.com | OTA / travel | High commercial/entity relevance | Major OTA; Pinewood listing exists | Yes | Platform listing points to property, website link not confirmed | Correct NAP first; maintain accurate photos, room names and policies. Do not request artificial SEO anchor text | https://www.booking.com/hotel/vn/pinewood-dalat.html | Pinewood Hotel Dalat | P0 | Existing listing — correction required |
| trip.com | Trip.com | OTA / travel | High commercial/entity relevance | Major OTA; Pinewood listing exists | Yes | Website link not confirmed | Fix conflicting phone/email and verify room count/content in partner portal | https://vn.trip.com/hotels/dalat-hotel-detail-135386765/pinewood-dalat/ | Pinewood Hotel Dalat | P0 | Existing listing — correction required |
| traveloka.com | Traveloka | OTA / travel | High regional travel relevance | Major Southeast Asia OTA; Pinewood listing exists | Yes | Website link not confirmed | Normalize property name/address and verify official phone/site if partner tools allow | https://www.traveloka.com/en-en/hotel/vietnam/pinewood-dalat-9000008488490 | Pinewood Hotel Dalat | P1 | Existing listing — review metadata |
| vietnamhotel.org.vn | Vietnam Hotel Association (VHA) | National industry association | High hospitality relevance | National hotel association; publishes members | Not found in current member search | Not confirmed | Consider membership only after owner verifies eligibility and any official hotel classification required for fees/application. Do not infer a star rating from OTAs | https://www.vietnamhotel.org.vn/vn/content/261/Thu-tuc-dang-ki-hoi-vien.vha | Pinewood Hotel Dalat | P2 | Conditional membership |
| vietnam.travel | Viet Nam National Authority of Tourism destination site | Official / editorial | High destination authority; lower direct acquisition likelihood | Official national tourism website | No property-specific mention found | No | Pitch only genuine, locally useful story/photo contributions or hospitality information if an editorial/industry submission channel is available; do not ask for a paid link | https://www.vietnam.travel/places-to-go/central-vietnam/dalat | Pinewood Hotel Dalat | P2 | Editorial relationship |
| rustycompass.com | Rusty Compass | Independent travel editorial | Strong relevance to Da Lat accommodation research | Independent handpicked hotel guide | No Pinewood mention found in current guide search | No | Send a concise factual property update/invitation for independent consideration. No payment, no demanded anchor, no fabricated review claims | https://www.rustycompass.com/vietnam-travel-guide-233/dalat-33/hotels-15/historic-25 | Pinewood Hotel Dalat | P2 | Earned editorial outreach |
| vietnamcoracle.com | Vietnam Coracle | Independent Vietnam travel resource | Strong independent-traveller / Da Lat relevance | Long-running independent travel resource; states no sponsored content | Not confirmed | Not confirmed | Only send a useful factual update or invitation for independent research; respect its no-sponsored-content policy | https://www.vietnamcoracle.com/contact/ | Pinewood Hotel Dalat | P2 | Earned editorial outreach |

## 5. Local partner opportunities

Do not mass-email or exchange links. Build a small set of real guest-service partnerships and only request a citation when there is a genuine public relationship.

Potential partner categories:

1. Airport transfer operators serving Lien Khuong Airport.
2. Reputable car/motorbike rental partners used by Pinewood guests.
3. Licensed local tour operators with Da Lat itineraries.
4. Nearby restaurants/cafes where Pinewood genuinely refers guests.
5. Wedding/event planners if Pinewood actually supports group stays or events.
6. Local attractions or activity providers with reciprocal guest information pages.

For each partner, the preferred citation is the brand name `Pinewood Hotel Dalat` or the naked domain `pinewoodhotel.vn`, not an exact-match commercial keyword.

## 6. Anchor text policy

Preferred natural anchors:

- Pinewood Hotel Dalat
- Pinewood Hotel
- pinewoodhotel.vn
- Pinewood Hotel tại Đà Lạt
- Pinewood Hotel on Vo Truong Toan Street

Avoid repeated exact-match anchors such as `khách sạn Đà Lạt giá rẻ` and do not describe Pinewood with positioning that the hotel has not approved.

## 7. 90-day execution sequence

### Weeks 1–2 — entity accuracy (P0)

- Audit Google Business Profile while logged in; correct only verified owner-controlled fields.
- Correct Booking NAP discrepancy.
- Correct Trip.com phone/email discrepancy.
- Verify Traveloka and Agoda partner records.
- Prepare a single NAP sheet for staff/partners to reuse.

### Weeks 2–4 — official local citations

- Submit/claim Pinewood on `dalat.vn` if their accommodation onboarding permits it.
- Contact the Lam Dong Tourism Promotion Center / `visitlamdong.vn` about an official lodging profile.
- Contact LTA about appropriate hotel/resort membership/listing.

### Month 2 — local partnerships

- Select 3–5 real guest-service partners.
- Exchange accurate operational information, not SEO link swaps.
- Where useful to travellers, request a normal brand citation/link from the partner's genuine resources page.

### Month 3 — editorial outreach

- Prepare a small media kit: official name/NAP, website, 5–10 approved images, concise room facts, location context, owner-approved story angles.
- Pitch only publications that actually cover Da Lat accommodation/travel.
- Do not buy placements disguised as editorial links.

## 8. Content opportunities — strategy only, not published in this task

Only create these when Pinewood can contribute first-hand local value:

- Một buổi sáng ở Đà Lạt từ Pinewood
- Gợi ý hành trình quanh khu Võ Trường Toản
- Những điểm dễ kết hợp khi lưu trú tại Pinewood
- Kinh nghiệm chuẩn bị cho kỳ nghỉ Đà Lạt
- Pinewood Stories

Avoid generic AI-written destination pages and doorway pages.

## 9. Manual owner actions

1. Google Business Profile: confirm primary category, NAP, website, pin, contact/hours information and photos while logged into the owner account.
2. Booking partner portal: normalize property name/address; review current room inventory and policies.
3. Trip.com partner portal: replace conflicting phone/email with official Pinewood contact data if the listing is owner-controlled.
4. Traveloka/Agoda: locate and claim/verify the exact property records.
5. Decide whether LTA/VHA membership is commercially appropriate; do not add any hotel star classification to schema unless Pinewood has an official classification from the competent authority.
6. Re-audit citations quarterly because OTA profile data and guest-review counts change over time.
