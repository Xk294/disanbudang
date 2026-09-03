# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `docs/biz/` business backbone (`docs/biz/overview.md`): consolidates brand identity, USP, and the Invest/Tourism monetization model previously scattered across `feat/invest.md`/`feat/tourism.md` with no single anchor doc, per `RULE-docs` §A2 (mandatory business backbone for any project with a business dimension).
- Auth: Support multiple admin accounts (`nguyenxuankiet294@gmail.com`, `vuthanhtnk32@gmail.com`) across backend token verification, runtime config, and client-side guards.

### Fixed

- `docs/index.md` linked to `PROJECT_MASTER.md`, a file already deleted from the repo — the master-doc pointer was dead. Repointed to `docs/arch/system.md` (architecture/tech stack) and the new `docs/biz/overview.md` (business), and renumbered the mục lục to include the Business Backbone section.
- Typography: Fix dark text on dark background in `.prose-heritage` and lesson study core knowledge block by applying `prose-invert` and high-contrast light colors (`text-charcoal-200` / `#E8E1D3`).

## [0.3.2] - 2026-07-09

Full-site UI/UX/content audit: dead features repaired, broken links fixed, accessibility gaps closed, SEO tightened.

### Fixed

- `/study`: the "Bài Học" tab and empty-state CTAs (`open-map`, `explore-map`, `explore-roadmap`) still set `activeTab = 'map'`, a tab removed from `navItems` in an earlier pass — clicking them blanked the page. Now navigates to `/map` directly. Removed the now-fully-dead `activeLandmark` ref along with unused `typeColors`, `resourceFormats`, `teacherUploadedFiles`/`mockUploadDocument`, and `startLandmarkQuiz` leftovers from a removed Teacher tab.
- `/study` lesson catalog listed 4 lessons but `study/lesson/[id].vue` only has content for 2 (`chien-khu-d`, `cong-chieng-stieng`) — clicking "Sóc Bom Bo" or "Trảng Cỏ Bù Lạch" led straight to a 404. Those two cards are now marked `hasContent: false`, rendered as non-clickable "Sắp ra mắt" cards instead of dead links.
- `/heritage/[slug]` gallery thumbnails set `lightboxIndex` but no lightbox modal was ever rendered — clicking a photo did nothing. Implemented the same lightbox pattern already used on `/map` (keyboard-free prev/next, fade transition, caption/photographer credit).
- `/explore` tag chips on community posts (`searchTag()` in `explore/[id].vue`) pushed a `?tag=` query param that `explore/index.vue` never read — filtering silently no-opped. Added real tag filtering against `post.tags` with a clearable "Đang lọc theo thẻ" chip in the UI.
- `/contribute` review-progress timeline used invalid Tailwind classes `top-21`/`top-41` (not in the spacing scale, compiled to nothing) — the step 2/3 dot markers were unpositioned. Replaced with `top-[84px]`/`top-[164px]`.
- Footer "Góc Học Tập Học Sinh" linked to `/#school-corner`, an anchor that doesn't exist anywhere in the codebase. Points to `/study` now.
- `MapContainer` heritage/cluster markers had `tabindex`/`aria-label` plus a `marker.on('keypress', ...)` handler that can never fire — Leaflet only forwards mouse events through its internal bus, not keyboard events. Keyboard users could focus a marker but never activate it. Now binds a native `keydown` listener on `marker.getElement()`.
- `explore/virtual-tour.vue` (a new, previously unreviewed page) used a raw `<Head>` block instead of `useMuseumSeo` — missing canonical URL, OG tags, and breadcrumb JSON-LD, and its title used an em-dash that would fail `validate-seo.js`. Also had no `<h1>` in the DOM until the user pressed play. Migrated to `useMuseumSeo` and added a persistent `sr-only` `<h1>`.
- `/about` meta description was 190 characters against the composable's 155-char cap, truncating mid-word ("... thành phố trự...") in search snippets. Shortened below the limit.
- SSR-default `<title>` in `nuxt.config.ts` didn't match the runtime default set by `useMuseumSeo` ("Bảo Tàng Số Thành Phố Đồng Nai" vs "Bảo Tàng Số Địa Phương") — aligned both.
- `npm run generate` never ran `validate-seo.js`, so title/description/canonical regressions could ship unnoticed. Chained it: `generate` now runs `nuxt generate && npm run validate:seo`.
- `/library` redirected via a client-side `navigateTo()` in a page component while every other legacy redirect (`/community`, `/quiz`, `/school`) is a static `routeRules` entry — moved it into `routeRules` for a crawler-friendly static 301 and deleted the now-unnecessary page.
- `app/data/categories.ts` had stale hardcoded `count` fields (7/4 for `lich-su`/`danh-thang`) that didn't match the actual heritage data (6/5) — corrected.
- Hardcoded untranslated English strings in an otherwise fully Vietnamese UI: `/study` hero badge and timeline entry ("Digital Heritage Learning Hub" → "Cổng Học Tập Di Sản Số"), `/heritage/qr/[slug]` ("QR Experience" → "Trải Nghiệm QR", "Scan & continue" → "Quét mã & tiếp tục").

### Changed (accessibility & consistency)

- `QuizPlayModal`: `text-brick-450` was an invalid Tailwind class (the `brick` alias has no `450` shade) — silently rendered no color on the wrong-answer icon. Changed to `text-brick-500`.
- `EmptyState` CTA buttons used `shadow-gold/25 hover:shadow-gold/45` with no base `shadow-*` utility to actually enable `box-shadow` — the color-opacity modifier alone renders nothing. Added `shadow-lg`.
- `MapContainer` locate-me button used `w-13 h-13`, not a valid size in the spacing scale — added `shadow-lg`-sized fix by switching to `w-14 h-14`.
- `AppFooter` decorative background dot pattern used semantic success-green (`#10B981`) instead of the brand's champagne gold (`#C7A664`) used by every other decorative pattern in the app.
- `QuizSection` achievement badges were only inspectable via `:hover`, with no focus-visible/keyboard path and a non-interactive `<div>` wrapper — changed to a real `<button>` with `aria-label` and `group-focus-visible` tooltip reveal.
- `HotspotImage` hotspot pins used `focus:outline-gold-500` (fires on any focus, including mouse clicks) instead of `focus-visible:outline-gold-500`, fighting the app's global `:focus-visible` convention.
- `ArtifactHotspotViewer` hardcoded `alt="Đàn đá Thành Phố Đồng Nai"` regardless of which artifact image was passed in via the `artifactImage` prop — added an `artifactAlt` prop.
- `FAQSection` answer expand animation capped `max-height` at a hardcoded `600px`; long answers on small viewports or larger user font sizes would silently clip. Raised to `2000px`.
- `HeroSection` slide-indicator dots had `aria-label` but no `aria-current` for the active slide — added.
- `news/index.vue`: removed dead `categoryVariant` map and `events` alias that were declared but never referenced in the template.

### Verified (no changes needed)

- Full local audit (3 parallel passes: pages/content, components/design-system, SEO) across every page and component. No missing images, no `console.log`/TODO litter, no `v-for` missing `:key`, sitemap/robots.txt configured correctly, rebrand to "Thành Phố Đồng Nai" consistently applied with no stale "Bình Phước" leftovers (remaining mentions are correctly-scoped historical references).
- `npm run typecheck`, `npm run build`, and `npm run generate` (with the newly chained `validate:seo`) all pass clean; 121 routes prerendered, 38 HTML files validated.

## [0.3.1] - 2026-07-08

Follow-up fixes from a targeted issue review: fake-interactive UI, verified GPS/stats, default OG image, mobile nav color.

### Changed

- Default OG/share image replaced: the old `op-og-preview.png` (3.4MB, and displayed a large "DISANBUDANG.COM" text banner that contradicted the Đồng Nai rebrand) is no longer referenced. New default is `public/images/og-default.jpg` (52KB, 1200x630, the existing brand mark on its dark-earth background, no old-domain text) generated from `favicon/icon-512-maskable.png`. The old file is still on disk but unused; delete it once you've confirmed the new one reads well on your target platforms, or replace it with real designed artwork later.
- Heritage Lab "coming soon" cards (Story Map, Oral History, Virtual Tour on `/study`) no longer show `cursor-pointer` and hover-lift animation — they looked exactly as clickable as the working cards (Timeline, Before/After, Artifact Viewer) even though clicking did nothing. Inactive cards are now visually flatter (`opacity-70`, `cursor-default`) and their trailing arrow icon is hidden.
- `AppTopNav` mobile dropdown background changed from flat `bg-charcoal-900` to the same `bg-dark-earth` gradient used on the desktop bar, so opening the hamburger menu doesn't visually jump to a different, flatter black.

### Verified (no code changes needed)

- Spot-checked 6 of 16 heritage GPS coordinates against OpenStreetMap Nominatim: Núi Bà Rá, Xã Bom Bo/Sóc Bom Bo, Hồ Thác Mơ, and Thác Đứng all match within a few hundred meters. Accurate.
- `/invest` area and population figures (1,500 km², 130,000+) checked against public sources for the former Bù Đăng district: real figures are 1,503 km² and 139,009 (2019 census). The site's numbers are accurate, just slightly rounded.

### Known issue (flagged, not changed)

- `hrt-014` (Căn Cứ Tà Thiết) coordinates (11.8300, 106.6800) sit roughly 20km from the single OSM place node found for "Tà Thiết" (11.7540, 106.5124). One data point isn't enough to confidently overwrite a heritage record's coordinates, so this needs a manual check (e.g. search "Tà Thiết" directly in Google Maps and compare) before correcting.
- Domain `disanbudang.com` still doesn't match the new "Di Sản Đồng Nai" brand. Confirmed this repo has no `wrangler.toml` or Cloudflare preset wiring the domain, so there is nothing to change in code; retiring/changing the domain is a DNS and hosting-account decision outside this repo.

## [0.3.0] - 2026-07-08

Rebrand from "Bù Đăng" to Thành Phố Đồng Nai (verified against Nghị quyết 202/2025/QH15 and the 30/4/2026 city-formation resolution), nav/typography fixes, and a new fact-based "city formation" narrative on the About page.

### Changed

- **Rebrand**: site brand, nav logo, footer, meta titles/descriptions, schema.org `Organization`/`WebSite`/`WebPage`/`EducationalOrganization` entities, and all homepage/about/contact/invest/news/study marketing copy now frame the project around Thành Phố Đồng Nai instead of Bù Đăng. `SITE_NAME` changed `'Di Sản Bù Đăng'` → `'Di Sản Đồng Nai'`. Specific heritage items (Xã Bù Đăng, Sóc Bom Bo, núi Bà Rá, Căn cứ Tà Thiết...) keep their real place names since those are accurate specific locations, not the site's identity.
- `/invest` reframed from "Đầu Tư Bù Đăng" to "Đầu Tư Vùng Cao Nguyên Đồng Nai" — kept its real agriculture/eco-tourism investment thesis (accurate to the highland region) instead of misapplying citywide industrial stats to it.
- Homepage/schema `geo.position` moved from Bù Đăng coordinates to Thành Phố Đồng Nai's administrative center; `Organization.knowsAbout` and `alternateName` expanded to cover the wider city.
- Study hub AI-assistant canned answers and hero label no longer imply the whole site is about one xã.
- Fixed one outdated administrative reference: "huyện Bù Đăng" (the huyện was dissolved 1/7/2025) corrected to "Xã Bù Đăng" in heritage copy.
- `AppTopNav` background changed from flat `bg-charcoal-950` to the branded `bg-dark-earth` gradient (was reported as an unappealing flat black bar).
- `AppTopNav`'s "Đóng Góp" button changed from a bordered `rounded-full` pill to a solid gold `rounded-lg` button — the bordered pill shape around short text was creating a visual "( Đóng Góp )" bracket illusion, reported as a UI bug.
- Nav logo and footer brand lockup now use `whitespace-nowrap` + `shrink-0` so the two-line "Di Sản / Đồng Nai" lockup never wraps or collides with the icon at narrow widths.
- Added `line-clamp-2` to unclamped dynamic heritage/post/news titles rendered inside fixed-height, absolute-positioned overlay cards (`HeritageCard`, `FeaturedHeritage` hero + secondary cards, `CommunityStoriesSection`, `NewsSection`, map desktop detail panel) — long titles could previously grow past the card bounds and overlap badges/icons positioned above them.
- "Xem Bản Đồ Vệ Tinh" (heritage detail) and the map loading message no longer claim satellite imagery; the map uses CartoDB Dark Matter vector tiles, not satellite photos.
- `/explore` no longer shows an artificial 300ms+ loading skeleton before displaying locally-imported static data changed to instant render (continuation of the earlier removal, reconfirmed here).

### Added

- New "Một Thành Phố Được Sinh Ra" section on `/about`: a 3-step real timeline (1/7/2025 Bình Phước sáp nhập vào Đồng Nai → 30/4/2026 Đồng Nai lên thành phố trực thuộc Trung ương thứ 7 → today's expanded digitization scope) plus a real quick-facts strip (95 xã/phường, 12,700+ km², 4.5 triệu dân, hạng 4 kinh tế cả nước). All figures verified via web search against Cổng thông tin Chính phủ and Quốc hội resolution coverage.
- GPS locate-me on `/map` now asks for explicit consent via `useSwal()` before requesting the browser's geolocation permission (PROJECT_MASTER 6.1 requirement, was missing).
- `docs/PROJECT_MASTER.md` §1 and §9.5 updated with an explicit scope note and place-name policy (city-level name for brand, xã-level names only for specific heritage descriptions) so this decision doesn't get silently reverted later.

### Fixed

- `/news` event `Place` schema hardcoded `addressLocality: 'Xã Bù Đăng'` for every single event regardless of its real location; corrected to the accurate city-level locality.

## [0.2.0] - 2026-07-08

Site-wide SEO, UI/UX, and content overhaul focused on the homepage, map, study hub, and audio guide.

### Added

- Homepage now surfaces the previously orphaned key sections: `StorytellingIntro` (emotional context after the hero), `CulturalTimelineSection` (interactive era timeline), `AudioGuideSection` (working inline player), `QuizSection` (real quizzes + badge showcase), and `NewsSection`, woven into the existing hero/featured/experiences/community/FAQ/CTA flow.
- GPS locate on the map asks for consent via SweetAlert2 before requesting browser geolocation (PROJECT_MASTER 6.1).
- Media Session API support in the audio store: lock-screen/headset play, pause, and ±15s seek while the guide plays in the background.
- Mini audio player: ±15s skip buttons and the track title now links to its heritage detail page.
- "Di Sản Liên Quan" (related heritages) section on heritage detail pages.
- Schema.org coverage per page-type matrix: `CollectionPage`+`ItemList` on `/explore`, `AboutPage` on `/about`, `ContactPage` on `/contact`, and heritage details upgraded from `LandmarkFeature` to `TouristAttraction`+`LandmarksOrHistoricalBuildings` with `hasMap`, `touristType`, `isAccessibleForFree`.

### Changed

- All OG/schema image URLs are now absolute (`toAbsoluteUrl`); relative og:image was invalid for social crawlers.
- Breadcrumb JSON-LD segment labels cover all routes (explore, study, heritage, contribute, contact, invest, lesson).
- Homepage/hero/experience/CTA stats (heritage, audio, quiz-question, community counts) derive from real data instead of hardcoded numbers; removed nonexistent audio track names.
- Study hub gamification (XP, level, badges, learning path, challenge progress, dashboard) now derives from persisted quiz progress in `quizStore`; removed fabricated rank, streak, user name, and "realtime" labels.
- Map "Tuyến Lộ Trình" tab regained its padding; route cards get proper card padding.
- Map search no longer flies to a marker on every keystroke; auto-selects only when exactly one result remains.
- Heritage detail quiz opens the global quiz modal in place instead of navigating to `/explore`.
- Explore page loads instantly (removed artificial 500ms skeleton delay) and its meta title/description fit SEO limits.
- Copy fixes: coordinates labeled as GPS/WGS84 (was incorrectly "VN2000"), honest audio error message, FAQ answers without em dashes, study hero no longer claims "national" scope.

### Fixed

- Duplicate `FAQPage` schema on the homepage (composable copy removed; `FAQSection` owns it).
- `useHeritageSeo` was called twice on heritage detail pages, duplicating meta and schema.
- Homepage `WebPage` schema name was unaccented ("Bao Tang So Dia Phuong").
- Study hub buttons pointing to the removed `teacher` tab now link to `/contribute`.
- `QuizSection` used a light-theme background (`bg-warm-paper`, `#FDFAF3`) that broke dark-mode identity when placed on the otherwise all-dark homepage; retheme to dark to match `PROJECT_MASTER.md` 7.1 ("Dark mode là mặc định và chủ đạo").

### Removed

- Five dead/duplicate homepage components never wired into any page: `MapPreviewSection` (fake static map, superseded by `ExperiencesSection`'s real `/map` bento card), `HeritageCategoriesSection` (duplicates `/explore` category filters), `VisionRoadmapSection` (duplicates the roadmap already in `about.vue`), `ContributionCTA` (duplicates `/contribute`'s own hero and two other homepage contribute CTAs), `SchoolCornerSection` (877 lines duplicating the "Thư Viện" tab already built, more completely, in `study.vue`).

## [0.1.0] - 2026-07-08

First tracked version. Consolidates all work to date into a single baseline.

### Added

- Digital heritage museum site on Nuxt 4: home, heritage library and detail pages, interactive Leaflet map, audio guide with mini player, quiz/gamification, study section (lessons via @nuxt/content), news, contribute, invest, about, and contact pages.
- SEO composable `useMuseumSeo` with title/description limits, trailing-slash canonical, Organization/WebSite/Article schema, and breadcrumb schema builder.
- Layout chrome: single `Breadcrumb` in default layout, `ScrollToTop`, page loading indicator, global quiz modal.
- Favicon set, web manifest, robots.txt, and sitemap via `@nuxtjs/sitemap`.
- Docs tree under `docs/` (feat/arch/plan) with master index.

### Changed

- Replaced low-quality heritage images with high-resolution originals under `public/images/heritage/img-disanbudang/` across the heritage library, community posts, and home hero slideshow (previously tracked in `docs/CHANGELOG_IMAGES_UI.md`, now merged here).
- Restyled the library sort dropdown for dark-theme consistency; added contribute form draft auto-save.
- Contact and contribute forms now compose a prefilled email (`mailto:`) instead of posting to server endpoints that stored nothing; success messages state honestly that the user's email client was opened.
- Renamed layout chrome components to canonical names: `TheHeader.vue` → `AppTopNav.vue`, `TheFooter.vue` → `AppFooter.vue`.
- Renamed data modules to reflect their role as real content: `mockHeritages.ts` → `heritages.ts`, `mockPosts.ts` → `posts.ts`, `mockQuiz.ts` → `quizzes.ts` (exports lost the `MOCK_` prefix; `MOCK_NEWS` → `NEWS_ARTICLES`).
- Restructured docs: `Docs MASTER.md` → `PROJECT_MASTER.md`, `README_AUDIO.md` → `docs/ref/audio-recording-guide.md`, completed plan moved to `docs/plan/done/`.
- Shortened the default meta description and removed the em dash from it.

### Fixed

- Heritage detail pages (`/heritage/[slug]`) now emit full SEO meta, canonical URL, BreadcrumbList and LandmarkFeature schema via `useHeritageSeo` (previously no SEO tags at all).
- Broken `PROJECT_MASTER.md` link in `docs/index.md`.

### Removed

- Fake-success API endpoints `server/api/contact.post.ts` and `server/api/contribute.post.ts` (accepted submissions but discarded them).
- Unused dependencies: `gsap`, `howler`, `@types/howler`, `vue-leaflet`.
