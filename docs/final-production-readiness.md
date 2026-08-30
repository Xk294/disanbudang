# Báo Cáo Sẵn Sàng Production — Di Sản Bù Đăng
> Zero-Trust Final Audit | 2026-08-31 00:22–00:42 +07:00
> Phương pháp: Production HTTP evidence + source code forensics — không tin report cũ

---

## 1. EXECUTIVE SUMMARY

**DiSanBudang.com hiện tại KHÔNG sẵn sàng production theo tiêu chuẩn zero-trust.**

Vấn đề cốt lõi: **75 files uncommitted** chứa toàn bộ các fix quan trọng (SSR, stories, journal, canonical registry) nhưng chưa được commit và deploy. Production đang chạy trên commit `f20304b` — phiên bản cũ còn nhiều lỗi nghiêm trọng.

Ngoài ra có **4 vấn đề về tính xác thực dữ liệu** ảnh hưởng uy tín học thuật.

---

## 2. FINAL VERDICT

```
NOT READY
```

**Lý do:**
- 16/16 heritage pages không có H1 và content trong production HTML (SSR failure)
- /stories/, /journal/, /heritage/ index trả 404 trên production
- Tuyên bố "100% Audio song ngữ" là sai sự thật (chỉ có 2/16 audio, không có English)
- Tuyên bố "AI Trợ Lý" là misleading (thực tế là keyword regex)
- Pilot study stats (SUS 89.2, +41.8%) chưa có bằng chứng gốc công khai

**Thành phần có thể deploy được ngay sau khi fix:**
- Homepage ✅, About ✅, Explore ✅, Map ✅, Study ✅, Contribute ✅

---

## 3. CRITICAL FINDINGS (P0)

### C-001 · SSR Failure: 16 Heritage Pages trống rỗng trên production
- **Evidence:** `curl https://disanbudang.com/heritage/can-cu-nua-lon-bu-dang/` → H1=0, Section=0, hero=absent, body chỉ có nav+footer
- **Root cause:** Deployed file (`f20304b`) vẫn dùng `v-if="!isLoaded"` + `onMounted(() => isLoaded=true)` → SSR render blank spinner
- **Working tree:** Đã fix sang `v-if="heritage"` + synchronous store lookup — nhưng CHƯA COMMIT
- **SEO impact:** Googlebot thấy đúng `<title>` và Schema (server-side) nhưng không thấy H1 và nội dung bài viết → thin content
- **Affected:** ALL 16 heritage pages + 16 QR pages
- **Fix:** Commit và deploy working tree `app/pages/heritage/[slug].vue`

### C-002 · 5 Routes trả 404 trên production
- **Evidence:** HTTP 404 confirmed cho `/stories/`, `/journal/`, `/heritage/`, `/stories/canh-thut-doc-ban-stieng-bu-dang/`, `/journal/event-001/`
- **Root cause:** Pages tồn tại trong working tree (uncommitted) — deployed version không có
- **Impact:** Sitemap không link đến, internal links bị broken, nuxt.config đã cấu hình prerender nhưng chưa deploy
- **Fix:** Commit và deploy working tree

### C-003 · Tuyên bố sai sự thật: "100% Audio Thuyết minh song ngữ"
- **Evidence:** `ls public/audio/` → chỉ 2 files: `khu-bao-ton-soc-bom-bo.mp3`, `trang-co-bu-lach.mp3` (cả 2 tiếng Việt, không có English)
- **Claim location:** `app/pages/explore/index.vue` line 63-64: `"100% Audio"` + `"Thuyết minh song ngữ"`
- **Reality:** 2/16 audio, 0/16 bilingual. Sai 100% về song ngữ.
- **Academic impact:** Giám khảo có thể kiểm tra và phát hiện ngay
- **Fix:** Đổi thành "2 Audio Thuyết minh" hoặc xóa claim song ngữ

### C-004 · Misleading feature: "AI Trợ Lý Thông Minh"
- **Evidence:** `app/utils/aiHeritageEngine.ts` — regex/keyword matching tĩnh, không có LLM API call
- **Claim:** UI label "AI Trợ Lý", button "Hỏi AI"
- **Reality:** Deterministic string filter trên static data
- **Impact:** User trust — học sinh/giáo viên kỳ vọng intelligent AI, nhận keyword search
- **Fix:** Rename thành "Tra cứu Di sản" hoặc "Tìm Kiếm Thông Minh" — bỏ từ "AI"

---

## 4. HIGH FINDINGS (P1)

### H-001 · 38 NuxtImg thiếu alt text (Accessibility + SEO)
- **Evidence:** `grep -rn '<NuxtImg' app/ | grep -v ':alt\|alt='` → 38 instances
- **Worst offenders:** `about.vue` (4), `StorytellingIntro.vue` (4), `heritage/[slug].vue` (3), `ThreeDoorsSection.vue` (3)
- **Impact:** WCAG 2.1 Level A violation, screen reader inaccessible, Google image index bị giảm
- **Fix:** Thêm `:alt` cho từng NuxtImg với mô tả có nghĩa

### H-002 · About H1: Missing space — "Giới ThiệuDi Sản Bù Đăng"
- **Evidence:** `curl https://disanbudang.com/about/ | grep h1` → `'Giới ThiệuDi Sản Bù Đăng'`
- **Location:** `app/pages/about.vue` line 71 — H1 có hai span children không có whitespace
- **Impact:** Professional quality, screen reader reads incorrectly
- **Fix:** Add space between span elements in H1

### H-003 · Unverified investment statistics on /invest
- **Claim:** "68% Độ che phủ rừng", "130.000+ Dân số", "500 ha Quỹ đất sạch", "Chính sách ưu đãi thuế 5 năm"
- **Source:** None — hardcoded in `keyStats` array, no attribution
- **Trust risk:** Học sinh không có thẩm quyền công bố chính sách đầu tư
- **Note:** Page đã có `noindex,nofollow` (working tree) — cần verify trên production
- **Fix:** Thêm nguồn cho mỗi số liệu, hoặc reframe thành "Tiềm năng được ghi nhận trong..." với citation

### H-004 · 99 buttons thiếu aria-label (Accessibility)
- **Evidence:** `grep -rn '<button' app/components/ | grep -v 'aria-label\|title='` → 99 instances
- **Impact:** Keyboard/screen reader users không biết button làm gì
- **Fix:** Ưu tiên: close buttons, share buttons, audio controls

### H-005 · Explore page: Heritage cards không có trong initial HTML
- **Evidence:** `curl https://disanbudang.com/explore/` → heritage card count = 0 in HTML
- **Root cause:** Likely client-side filtering/rendering of cards
- **SEO impact:** Search engines không index 16 heritage listings từ explore page
- **Fix:** Ensure heritage cards render server-side in prerendered HTML

---

## 5. MEDIUM FINDINGS (P2)

### M-001 · Pilot Study Stats cần Human Verification
- **Claims:** 168 học sinh, SUS 89.2/100, +41.8% kiến thức, 91.4% hài lòng
- **Status:** NEEDS_HUMAN_VERIFICATION — cần file khảo sát gốc (xem human-verification.md HV-001)
- **Not fabricated:** Methodology được mô tả đúng (Quasi-experimental pre/post test, SUS scale)
- **Action:** Lưu giữ evidence trong hồ sơ dự thi, không cần xóa khỏi website

### M-002 · Reference Codes có định dạng không chuẩn
- **Evidence:** `QĐ-UBND/TM-BR`, `QĐ-UBND/2014-BL` — không theo format `Số: .../QĐ-UBND năm`
- **Impact:** Giám khảo không thể tra cứu tài liệu gốc
- **Fix:** Thêm nhãn `[Mã nội bộ — cần xác minh]` hoặc thay bằng tên đầy đủ của tài liệu

### M-003 · "Thành Phố Đồng Nai TPTTTƯ thứ 7" — cần clarify timeline
- **Source:** `about.vue` line 725 — đề cập Nghị quyết 202/2025/QH15
- **Issue:** Cần ghi rõ ngày hiệu lực, và phân biệt địa danh lịch sử (thuộc Bình Phước) vs. hành chính hiện tại
- **Fix:** Thêm note "theo Nghị quyết có hiệu lực từ [ngày]" và giải thích trong context lịch sử

### M-004 · Image files chưa tối ưu
- **Evidence:** `can-cu-ta-thiet.jpg` 1.06MB, `com-lam-stieng.png` 983KB, `giang-gao-bombo.png` 969KB
- **Impact:** LCP, bandwidth trên 3G/4G thực địa
- **Fix:** Batch convert to WebP, max 200KB cho cover images

### M-005 · tranthiquyen.jpeg + tranthiquyen.jpg — duplicate + unoptimized
- **Evidence:** 2 files cùng nội dung: 543KB `.jpg` + 495KB `.jpeg` trong `public/images/`
- **Fix:** Xóa 1 file, convert to WebP

---

## 6. LOW FINDINGS (P3)

### L-001 · /about H1 cần trailing space (cosmetic)
### L-002 · /news redirect → /stories (working tree) — verify production 308 chain
### L-003 · Sitemap không có stories/journal URLs (sẽ tự fix sau deploy)
### L-004 · Double `x-content-type-options` header (Cloudflare + nuxt-security duplicated)
### L-005 · Explore page filter "Tất cả" nên là default active state — UX

---

## 7. FIXES PERFORMED (trong working tree — chưa deploy)

Theo git diff analysis, các agent trước đã thực hiện trong working tree:
1. Heritage page: SSR fix (v-if="heritage" thay vì isLoaded)
2. Stories/Journal pages: Tạo mới (4 pages)
3. Heritage index page: Tạo mới
4. canonicalRegistry.ts: Tạo mới
5. contentGraph.ts + contentGraphEngine.ts: Tạo mới
6. PWA icons + manifest: Tạo mới
7. robots.txt: Cập nhật
8. SEO composable: Cải thiện

**Tất cả những thứ này chưa deploy** — cần commit + push để có hiệu lực.

---

## 8. REGRESSIONS FOUND

### REG-001 · Stories/Journal: configured in nuxt.config nhưng 404 production
- Được thêm vào prerender routes nhưng pages chưa được commit

### REG-002 · /news/* → cấu hình redirect sang /stories/* trong nuxt.config (working tree)
- Nếu deploy: người dùng bookmark /news/ sẽ được redirect đúng ✅

---

## 9. SSR EVIDENCE

| Page | H1 in HTML | Body Content | Schema | Result |
|---|---|---|---|---|
| / | ✅ 1 | ✅ 333KB | ✅ 2 blocks | PASS |
| /about/ | ⚠️ space bug | ✅ | ✅ | PARTIAL |
| /explore/ | ✅ 1 | ⚠️ No cards | ✅ | PARTIAL |
| /map/ | ✅ 1 | ✅ | ✅ | PASS |
| /study/ | ✅ 1 | ✅ 238KB | ✅ | PASS |
| /heritage/can-cu-nua-lon-bu-dang/ | ❌ 0 | ❌ Empty body | ✅ (in head only) | **FAIL** |

---

## 10. SEO EVIDENCE

| Check | Status | Evidence |
|---|---|---|
| Sitemap accessible | ✅ | `https://disanbudang.com/sitemap.xml` → 47 URLs |
| Heritage in sitemap | ✅ | 16 heritage URLs present |
| Stories in sitemap | ❌ | 0 stories URLs (not deployed) |
| robots.txt | ✅ | Correctly blocks /admin, /me |
| CSP headers | ✅ | Full CSP via nuxt-security + CF |
| Heritage title unique | ✅ | Each page has correct specific title |
| Heritage H1 | ❌ | Missing in production HTML |
| Heritage canonical | ❌ | Not found in head |
| Homepage H1 | ✅ | 1 H1, correct |

---

## 11. CONTENT EVIDENCE

### Content Differentiation Assessment

| Content Type | Job | Source Data | Differentiated? |
|---|---|---|---|
| Heritage | "What is it?" — academic fact sheet | `heritages.ts` | ✅ Unique per entity |
| Stories (NEWS_ARTICLES) | "Deep cultural essay" — narrative | `posts.ts` | ✅ Different from heritage |
| Study/Lesson | "What to learn?" — educational | `studyData.ts` | ✅ Quiz/structured |
| Journal | "What did the project do?" — field notes | `posts.ts (EVENTS)` | ✅ Project diary |
| Explore Community | "How people remember?" — memory | `posts.ts (COMMUNITY_POSTS)` | ✅ Personal voice |

**Verdict:** Phân tầng content architecture đúng hướng. Stories về canh thụt, rượu cần, dệt thổ cẩm là editorial content khác với heritage infobox. Không có semantic duplication nghiêm trọng.

### Content Depth Scores (Sample)

| Heritage | Evidence | Specificity | Media | Educational | Score |
|---|---|---|---|---|---|
| Căn cứ Nửa Lon | sources cited | high | 1 audio | quiz present | 4/5 |
| Thác Mơ | sources cited | high | 0 audio | quiz present | 3/5 |
| Cồng Chiêng S'tiêng | sources cited | high | 1 audio | quiz present | 4/5 |
| Trống Đồng | NOT IN DATA | — | — | — | N/A — slug not found |

---

## 12. ACCESSIBILITY

| Area | Status | Evidence |
|---|---|---|
| Skip nav link | ✅ | `href="#main-content"` present in HTML |
| H1 on all pages | ⚠️ | Missing on heritage (SSR bug), space bug on about |
| Image alt texts | ❌ | 38 NuxtImg missing :alt |
| Button labels | ❌ | 99 buttons missing aria-label |
| Keyboard focus | ✅ (partial) | focus-visible:ring present |
| Color contrast | ⚠️ | text-charcoal-400 may be low contrast |
| ARIA dialogs | ⚠️ | UNVERIFIED — needs keyboard test |

---

## 13. PERFORMANCE (SOURCE-BASED — not measured)

| Asset | Size | Risk |
|---|---|---|
| can-cu-ta-thiet.jpg | 1.06MB | HIGH — uncompressed cover image |
| com-lam-stieng.png | 983KB | HIGH |
| giang-gao-bombo.png | 969KB | HIGH |
| Audio files | 2.9MB + 3.5MB | MEDIUM — lazy loaded |
| JS bundle | NOT MEASURED | UNVERIFIED |

---

## 14. SECURITY

| Check | Status | Evidence |
|---|---|---|
| CSP headers | ✅ | Full policy in production headers |
| HSTS | ✅ | max-age=15552000 |
| X-Frame-Options | ✅ | SAMEORIGIN |
| Turnstile on contribute | ✅ | `requireClient()` in server/api/contribute.post.ts |
| Honeypot field | ✅ | `_hp` check present |
| Rate limiting | ✅ | 5 submissions/hour/IP |
| Input validation | ✅ | Type-checked, length-bounded |
| Firebase token verify | ✅ | RS256 via crypto.subtle (no firebase-admin) |
| No secrets in source | ✅ | All via runtimeConfig / env vars |
| Admin route guard | ✅ | requireAdmin() on all admin endpoints |

---

## 15. TRUST & ACADEMIC INTEGRITY

| Claim | Status | Action Required |
|---|---|---|
| "168 học sinh Pilot Study" | NEEDS_HUMAN_VERIFICATION | Keep file evidence ready |
| "SUS 89.2/100" | NEEDS_HUMAN_VERIFICATION | Keep survey data |
| "+41.8% kiến thức" | NEEDS_HUMAN_VERIFICATION | Keep pre/post test |
| "100% Audio song ngữ" | ❌ FALSE | MUST FIX before deploy |
| "AI Trợ Lý Thông Minh" | ❌ MISLEADING | MUST FIX label |
| Reference codes QĐ-UBND/TM-BR | ❌ NON-STANDARD | Add [Cần xác minh] label |
| "Thành Phố Đồng Nai TPTTTƯ" | UNVERIFIED timeline | Clarify date in context |
| Investment stats on /invest | UNVERIFIED | Add source or remove |
| Heritage historical facts | ✅ Plausible | Cross-ref with sources.ts |
| Oral history sources cited | ✅ With caveats | Named sources present |

---

## 16. MOBILE (UNVERIFIED — not measured via browser)

- NOT MEASURED via real device
- Source code uses mobile-first Tailwind classes
- Map (Leaflet) and 360 tour (Three.js) may have issues on low-end devices
- RECOMMEND: Test on actual 375px viewport before demo/competition

---

## 17. MAINTAINABILITY

| Area | Status | Notes |
|---|---|---|
| Content location | ✅ Clear | heritages.ts, posts.ts, studyData.ts |
| Route rendering | ✅ Documented | route-matrix.md |
| New heritage creation | ✅ | Add to HERITAGES array + prerender routes |
| SEO generation | ✅ | useMuseumSeo() / useHeritageSeo() |
| Relationship modeling | ✅ | contentGraph.ts (working tree) |
| Duplication prevention | ✅ | Documented in content-graph.md |
| Schema | ✅ | Auto-generated from heritage data |

---

## 18. REMAINING RISKS (sau khi fix critical)

1. **Explore page:** Heritage cards không render SSR — cần investigate
2. **Mobile:** Chưa test thực tế trên điện thoại
3. **WebGL 360:** Fallback chưa được kiểm tra khi WebGL không available
4. **Audio:** 14/16 heritage không có audio — OK nếu không claim "100%"
5. **Pilot data:** Cần có trong hồ sơ vật lý khi trình bày giám khảo

---

## 19. FUTURE ROADMAP (sau competition)

1. Commit + deploy working tree ngay
2. Batch compress images → WebP (mục tiêu: < 200KB mỗi cover)
3. Fix 38 missing alt texts
4. Fix 99 button aria-labels
5. Add English audio guide (nếu muốn bilingual)
6. Integrate real AI API với spend cap (Cloudflare AI Gateway)
7. Fix explore page SSR for heritage cards
8. Mobile testing trên 375px real device

---

## 20. FINAL SCORES

| Area | Score | Notes |
|---|---|---|
| Technical | 55/100 | SSR failure on production heritage pages |
| SSR | 40/100 | 16/21 main routes OK, but heritage (core product) fail |
| Routing | 60/100 | 5 routes 404 on production |
| SEO | 65/100 | Title/schema OK, H1 missing on heritage, no canonical |
| Content | 75/100 | Good architecture, audio/AI claims need fix |
| UX | 70/100 | Good flow, some dead ends |
| UI | 80/100 | Premium design, minor H1 space bug |
| Accessibility | 40/100 | 38 missing alt, 99 missing aria-label |
| Performance | 55/100 | Large uncompressed images, not measured |
| Security | 90/100 | Strong fundamentals |
| Trust | 50/100 | False audio/AI claims block this |
| Academic Integrity | 65/100 | Pilot data pending, reference codes questionable |
| Maintainability | 80/100 | Clear architecture, good docs |

**Weighted Average: ~63/100**

> ⚠️ Average score is overridden by Critical blockers.
> C-001 (SSR) + C-003 (false audio claim) + C-004 (misleading AI) = **NOT READY**

