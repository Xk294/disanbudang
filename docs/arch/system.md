# Kiến trúc Hệ thống — Di Sản Bù Đăng V2

> **Đây là tài liệu kỹ thuật gốc (Single Source of Truth) cho toàn bộ dự án.** Mọi thông tin về tech stack, tính năng, data model, design system và quy tắc phát triển đều nằm ở đây. Không tạo docs feature riêng lẻ — cập nhật trực tiếp vào file này.

---

## 1. Tech Stack

| STT | Tên công nghệ | Phiên bản | Chức năng |
|---|---|---|---|
| 1 | **TypeScript** | ^5.8.3 | Ngôn ngữ lập trình — bắt buộc strict mode |
| 2 | **Vue 3** | ^3.5.34 | Framework UI, Composition API |
| 3 | **Nuxt 4** | ^4.4.2 | SSR/SSG framework, file-based routing, module ecosystem |
| 4 | **Tailwind CSS** | ^3.4.17 | Utility-first styling — Dark mode chủ đạo |
| 5 | **GSAP** | (CDN/động) | Animation cinematic (hero, scroll-trigger) |
| 6 | **VueUse Motion** | ^3.0.3 | Directive-based animation cho Vue components |
| 7 | **Leaflet.js** | ^1.9.4 | Bản đồ tương tác tọa độ địa lý |
| 8 | **Howler.js** | (HTMLAudioElement thuần) | Audio Guide toàn cục — hiện dùng native HTML5 Audio qua Pinia store |
| 9 | **Pinia** | ^2.3.0 | State management |
| 10 | **Pinia Persistedstate** | ^1.2.1 | Đồng bộ state vào LocalStorage |
| 11 | **better-sqlite3** | ^12.10.0 | Lưu trữ bộ câu hỏi Quiz phía server (dev) |
| 12 | **Nuxt Content v3** | ^3.14.0 | Quản lý bài viết thuyết minh dưới dạng Markdown |
| 13 | **nuxt-security** | ^2.5.1 | CSP headers, rate limiting |
| 14 | **SweetAlert2** | ^11.26.25 | Dialog xác nhận GPS, thông báo |
| 15 | **@nuxt/image** | ^1.10.0 | Tối ưu hóa ảnh, WebP, responsive |
| 16 | **Firebase** | ^12.16.0 | Client-side Auth (Google Sign-In) — server verify bằng crypto.subtle |
| 17 | **Cloudflare D1** | (runtime) | SQLite trên cloud — persistence cho contributions, visitors, ratings, users |

> **Quy tắc Stack:** Không thêm thư viện mới nếu chức năng tương đương đã có. Mọi đề xuất thư viện mới phải ghi lý do trong `docs/plan/` trước khi thực thi.

---

## 2. Cấu trúc Hệ thống

### 2.1 Cấu trúc thư mục

```
disanbudang/
├── app/
│   ├── pages/          # File-based routing (Nuxt 4)
│   │   ├── index.vue       # Trang chủ
│   │   ├── about.vue       # Giới thiệu dự án
│   │   ├── map.vue         # Bản đồ di sản tương tác
│   │   ├── study/          # Góc học tập & Quiz
│   │   ├── heritage/       # Chi tiết từng di sản [slug]
│   │   ├── explore/        # Khám phá cộng đồng
│   │   ├── contribute/     # Đóng góp cộng đồng
│   │   ├── news/           # Tin tức
│   │   ├── invest.vue      # Cơ hội đầu tư
│   │   ├── contact.vue     # Liên hệ
│   │   ├── admin/          # Admin panel (SPA, ssr: false)
│   │   └── me/             # User profile (SPA, ssr: false)
│   ├── components/     # UI components (pathPrefix: false)
│   ├── composables/    # Shared logic (useAuth, useMuseumSeo, useVisitorTrack...)
│   ├── stores/         # Pinia stores (audio, heritage, quiz, collections)
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Dữ liệu tĩnh (heritages, posts, quizzes, sources, clusters, categories)
│   ├── layouts/        # Nuxt layouts (default, admin)
│   └── assets/css/     # Global CSS, Tailwind config
├── content/            # Bài viết Markdown (Nuxt Content v3)
├── public/             # Static assets (images, audio, video, favicon)
├── server/             # API routes & server utils
│   ├── api/            # Nitro API endpoints
│   └── utils/          # auth.ts, turnstile.ts
├── docs/               # Tài liệu dự án
├── scripts/            # crawl-heritage.js, validate-seo.js
├── schema.sql          # D1 database schema
├── nuxt.config.ts      # Cấu hình Nuxt — nguồn sự thật config
└── wrangler.toml       # Cloudflare Pages config
```

### 2.2 Định tuyến (Route Map)

| URL | Trang | Ghi chú |
|---|---|---|
| `/` | Trang chủ | Hero, Overview, Featured Heritage |
| `/about` | Giới thiệu | Thông tin dự án, tác giả, impact data |
| `/map` | Bản đồ di sản | Leaflet + GPS + Popups + Cluster filter |
| `/heritage/[slug]` | Chi tiết di sản | Markdown + Gallery + Audio + Timeline + Sources |
| `/study` | Góc học tập | Quiz, Flashcard, Huy hiệu, Lessons |
| `/study/lesson/[id]` | Bài học chi tiết | Nuxt Content v3 |
| `/explore/` | Khám phá | Ký ức cộng đồng, virtual tour |
| `/contribute` | Đóng góp | Form + Turnstile → D1 |
| `/news/[slug]` | Tin tức | Static Vue pages |
| `/invest` | Đầu tư | Cơ hội đầu tư du lịch vùng cao nguyên |
| `/contact` | Liên hệ | mailto |
| `/admin/*` | Admin panel | SPA, ssr: false — contributions, visitors |
| `/me/*` | User profile | SPA, ssr: false |

Redirects (301): `/quiz` → `/#quiz`, `/school` → `/study/`, `/community` → `/explore/`, `/library` → `/heritage/`

### 2.3 State Management (Pinia Stores)

| Store | Chức năng | Persistence |
|---|---|---|
| `audio.ts` | AudioPlayerState toàn cục — chạy ngầm qua page transitions, không bị ngắt | Không |
| `heritage.ts` | Danh sách di sản, trạng thái tải, filter | Không |
| `quiz.ts` | Tiến trình Quiz, điểm số, Huy hiệu đạt được | LocalStorage (persistedstate) |
| `collections.ts` | Bộ sưu tập cá nhân | LocalStorage (persistedstate) |

> **Quy tắc Store:** Mọi shared state giữa các trang phải đi qua Pinia store. Không dùng `reactive()`/`ref()` trực tiếp ở component-level cho dữ liệu cần chia sẻ.

### 2.4 Nguyên tắc Nội dung Số (Content Layer)

- **Bài viết thuyết minh di sản:** Markdown trong `content/`. Nuxt Content v3 biên dịch tự động thành JSON khi build.
- **Dữ liệu câu hỏi Quiz:** SQLite (`better-sqlite3`) phía server dev, D1 production.
- **Dữ liệu di sản (metadata):** TypeScript definitions trong `app/types/`, data trong `app/data/` (16 di sản, 6 bộ sources, 5 categories, 4 clusters).

---

## 3. Dữ liệu Di sản Cốt lõi

### 3.1 Số liệu đã số hóa

- **16 di sản** — tổ chức lưu trữ, lập hồ sơ tọa độ GIS và biên soạn tài liệu khoa học (`app/data/heritages.ts`)
- **6 Ký ức cộng đồng** — câu chuyện truyền miệng từ già làng, nghệ nhân S'Tiêng, M'Nông
- **2 Audio Guide** hoàn thiện chất lượng cao — tệp âm thanh thuyết minh giọng đọc truyền cảm (Sóc Bom Bo & Trảng Cỏ Bù Lạch)
- **16 bộ Quiz kiểm tra kiến thức** tích hợp hệ thống huy hiệu điện tử (`app/data/quizzes.ts`)
- **4 kịch bản thu âm** đã biên soạn cho Chiến Khu Đ, Hồ Thác Mơ, Cồng Chiêng S'tiêng, Sóc Bom Bo (xem `docs/ref/audio-recording-guide.md`)

### 3.2 Phân loại Di sản

**HeritageCategory** — phân loại theo loại hình:

| Slug | Tên hiển thị |
|---|---|
| `lich-su` | Lịch sử |
| `danh-thang` | Danh thắng |
| `van-hoa-phi-vat-the` | Văn hoá phi vật thể |
| `doi-song-cong-dong` | Đời sống cộng đồng |
| `giao-duc-truyen-thong` | Giáo dục truyền thống |

**HeritagePeriod** — phân loại theo thời kỳ: `Tiền sử` → `Phong kiến` → `Pháp thuộc` → `Kháng chiến` → `Hiện đại`

**HeritageCluster** — cụm địa lý (kết nối di sản khởi nguồn Bù Đăng ra toàn Thành Phố Đồng Nai, dùng cho filter `/map` và `/explore`):

| Slug | Tên hiển thị | Ghi chú |
|---|---|---|
| `bu-dang` | Bù Đăng | Căn cứ kháng chiến, rừng nguyên sinh, làng nghề, lễ hội bản địa |
| `bom-bo` | Sóc Bom Bo | Cồng chiêng, nhà dài, huyền thoại nhịp chày giã gạo |
| `phuoc-long` | Phước Long | Núi Bà Rá, hồ Thác Mơ, Chiến thắng Phước Long 06/01/1975 |
| `loc-ninh` | Lộc Ninh | Căn cứ Tà Thiết, Nhà Giao Tế |

Nguồn dữ liệu: `app/data/clusters.ts`.

### 3.3 Cấu trúc dữ liệu mỗi Di sản

```typescript
{
  id: string           // Unique identifier (hrt-001..hrt-016)
  slug: string         // URL slug
  name: string         // Tên di sản
  category: HeritageCategory
  period: HeritagePeriod
  cluster?: HeritageCluster
  coordinates: { lat: number; lng: number }  // Bắt buộc cho bản đồ
  gallery: string[]    // Mảng URL ảnh
  longStory: string    // Markdown content path
  quickFacts: QuickFact[]
  timeline: TimelineEvent[]
  audioGuideUrl?: string  // URL tệp âm thanh (nếu có)
  sources?: Source[]   // Nguồn tham chiếu xác minh
}
```

---

## 4. Tính năng Chính

### 4.1 Bản đồ Di sản Tương tác (`/map`)

- **Thư viện:** Leaflet.js (trực tiếp, không qua vue-leaflet wrapper)
- **Tile layer:** CartoDB Dark Matter (đã whitelist trong CSP)
- **Tính năng:**
  - Marker phân màu theo `HeritageCategory`, clustering khi thu nhỏ
  - Custom Popup: ảnh + tên + tóm tắt di sản
  - Bộ lọc: Category, Period, Cluster (sidebar + chip)
  - Tìm kiếm theo tên/từ khóa (auto-select khi 1 kết quả)
  - **GPS Locate Me** — HTML5 Geolocation, xác nhận qua SweetAlert2
  - **Tuyến lộ trình** — 3 tuyến heritage routes trên bản đồ
  - Keyboard accessibility cho markers (native `keydown` listener)

### 4.2 Audio Guide Toàn cục

- **Engine:** Native HTML5 Audio API qua Pinia store (`stores/audio.ts`)
- **Yêu cầu cốt lõi:** Audio KHÔNG được ngắt khi người dùng chuyển trang hoặc tắt màn hình
- **Tích hợp:** Mỗi heritage detail page inject `heritageId` vào audioStore để load đúng track
- **Media Session API:** Lock-screen/headset play, pause, ±15s seek
- **Mini player:** ±15s skip, track title link về heritage page
- **Transcript:** Tuỳ chọn hiển thị văn bản song song

### 4.3 Góc Học Tập & Gamification (`/study`)

- **Quiz Engine:** 16 bộ câu hỏi phân loại theo di sản
- **Learning Paths:** Bài học chi tiết qua Nuxt Content v3 (`/study/lesson/[id]`)
- **Huy hiệu (Badges):** Common → Rare → Epic → Legendary
- **Persistence:** Điểm số + Huy hiệu lưu LocalStorage qua `pinia-plugin-persistedstate`
- **Flashcard:** Widget lật thẻ 3D — từ vựng bản địa S'tiêng (Yang Ching, Đ'rắp S'lung, Dak Mơ...)
- **Heritage Lab:** Timeline explorer, Before/After comparison, Artifact Viewer, Virtual Tour

### 4.4 Góc Học Đường (School Resources)

- **Khối trường học:** Phân loại tài nguyên theo trường THPT/THCS địa phương
- **Interactive Document Reader:** Đọc trực tiếp bài nghiên cứu đa trang với giao diện giả lập PDF
- **Liên kết Trắc Nghiệm:** Từ document reader → Quiz store trực tiếp

### 4.5 Triển Lãm Ảnh Số (Gallery)

- **Lưới Masonry:** Ảnh nghệ thuật giữ nguyên tỷ lệ, lazy-loading
- **Lightbox:** Toàn màn hình, backdrop-blur, prev/next, caption/photographer credit
- **Bộ lọc:** Category + tìm kiếm theo tiêu đề/vị trí
- **Tối ưu hình ảnh:** `<NuxtImg>` bắt buộc, WebP ưu tiên, quality 85%

### 4.6 Đóng Góp Cộng Đồng (`/contribute`)

- **Form 3 bước** → Turnstile verification → POST `/api/contribute` → D1
- **Types:** story, photo, document, memory, artwork, research
- **Validation:** title 5–200 chars, content 20–10000 chars
- **Status flow:** pending → approved/rejected (qua admin panel)
- Chi tiết luồng: xem `docs/arch/backend-operations.md`

### 4.7 Tin Tức (`/news`)

- Kiến trúc tĩnh: Static Vue pages trong `app/pages/news/`
- Không phụ thuộc DB hay CMS — code trực tiếp nội dung

### 4.8 Đầu Tư & Du Lịch (`/invest`)

- **Invest:** Nông nghiệp công nghệ cao, du lịch sinh thái, hạ tầng, công nghiệp vùng cao nguyên Đồng Nai
- **Tourism:** Danh bạ điện tử — lưu trú, ẩm thực, đặc sản, tour cộng đồng
- Định hướng MVP: thông tin cô đọng + liên hệ nhanh, không giao dịch/thanh toán

---

## 5. Thiết kế & UX

### 5.1 Bảng màu & Nhận diện thương hiệu

- **Màu chủ đạo:** `#e18c1b` (amber/ấm nóng — cảm hứng thổ cẩm S'tiêng)
- **Theme:** Dark mode là mặc định và chủ đạo
- **Typography:**
  - **Playfair Display** — Tiêu đề chính, serif uy nghiêm
  - **Inter** — Body text, sans-serif hiện đại
  - **Cormorant Garamond** — Quote, caption, italic

### 5.2 Animation

- **GSAP:** Hero sections, scroll-triggered reveals, complex timelines
- **VueUse Motion:** Directive-based micro-animations (`v-motion`)
- **Nuxt Page Transition:** `out-in` mode
- **View Transitions API:** `experimental.viewTransition: true`

### 5.3 Responsive

- Breakpoints: `xs:320` / `sm:640` / `md:768` / `lg:1024` / `xl:1280` / `xxl:1536`
- Mobile-first — bản đồ và quiz tối ưu trên điện thoại

---

## 6. Security & Performance

### 6.1 Security (nuxt-security + custom guards)

- **CSP img-src whitelist:** `self`, `data:`, `images.unsplash.com`, `*.tile.openstreetmap.org`, `*.basemaps.cartocdn.com`
- **Rate Limiter:** 150 tokens/hour
- **Write endpoints:** `requireClient()` — Origin check + Cloudflare Turnstile
- **Admin endpoints:** `requireAdmin()` — Firebase ID Token verify (RSA256 via `crypto.subtle`, offline, không gọi Firebase)
- **Admin email:** `nguyenxuankiet294@gmail.com` — hardcoded trong `server/utils/auth.ts`

### 6.2 Hình ảnh

- Format ưu tiên: WebP → JPG, quality 85%
- Domain whitelist: `images.unsplash.com`
- Bắt buộc dùng `<NuxtImg>` thay cho `<img>` raw

---

## 7. Quy tắc Phát triển

### 7.0 Quyết định kiến trúc — Repo PUBLIC (ABSOLUTE)

Repo `disanbudang` là public GitHub repo. **Mọi backend code phải viết như thể ai cũng đọc được.** Trước khi ship endpoint mới:
1. **Spend cap** — AI/paid API calls phải có quota enforce
2. **Turnstile + rate-limit** — mọi write endpoint
3. **Auth chuẩn** — provider-based, không tự chế
4. **Blast radius nhỏ** — D1 backup, user data tách static content

### 7.1 Nguyên tắc chung

- **Scope discipline:** Làm đúng và đủ những gì được yêu cầu
- **YAGNI:** Không xây dựng "có thể cần trong tương lai"
- **Source of truth:** Code thực tế > Docs này > Memory

### 7.2 Quy tắc Code

- **Ngôn ngữ code & comment:** Tiếng Anh
- **TypeScript:** Strict mode bắt buộc (`strict: true`)
- **Component naming:** PascalCase
- **Không dùng `any`** trừ khi có lý do document rõ
- **Result pattern** cho mọi external call: `type Result<T> = { ok: true; data: T } | { ok: false; error: string }`

### 7.3 Quy tắc Commit

- Tiếng Anh, imperative style (`Add`, `Fix`, `Update`)
- **Không** thêm co-author signatures của AI

### 7.4 Quy tắc Docs

- Tài liệu kỹ thuật → cập nhật trực tiếp file `docs/arch/system.md` này
- Backend operations → `docs/arch/backend-operations.md`
- Business backbone → `docs/biz/overview.md`
- Kế hoạch triển khai → `docs/plan/PLAN-XXX-tên.md`, khi xong move vào `docs/plan/done/`
- Tài liệu tham chiếu → `docs/ref/`
- **Luôn cập nhật `docs/index.md`** khi thêm file doc mới

### 7.5 Quy tắc Nội dung

- Tên thuật ngữ dân tộc phải nhất quán: **S'Tiêng**, **M'Nông**
- Tên thương hiệu ngắn: **Di Sản Bù Đăng** — tên riêng/khởi nguyên
- Tagline: **Bảo Tàng Số Thành Phố Đồng Nai** — phạm vi phục vụ
- Tên đầy đủ: **Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai**
- Địa danh cấp thành phố: **Thành Phố Đồng Nai** — mô tả tổng quát, SEO
- Địa danh cụ thể: **Xã Bù Đăng**, **Sóc Bom Bo**, núi Bà Rá, Căn cứ Tà Thiết...

---

## 8. Khả năng Mở rộng (Roadmap)

### Giai đoạn hiện tại (Đã hoàn thành — V1)

- [x] 16 di sản số hóa toàn diện kèm tọa độ GIS
- [x] Bản đồ tương tác + GPS Geolocation
- [x] Audio Guide toàn cục (2 track hoàn thiện Sóc Bom Bo & Bù Lạch)
- [x] Góc Học Tập với 16 bộ Quiz + 4 cấp bậc Huy hiệu
- [x] Flashcard thuật ngữ S'tiêng tương tác 3D
- [x] 6 ký ức cộng đồng thu âm & biên soạn
- [x] Backend: D1 (contributions, visitors, ratings, users), Firebase Auth, Turnstile
- [x] Admin panel: duyệt bài đóng góp, thống kê lượt truy cập

### Giai đoạn V2 (Đang thực hiện — xem `docs/plan/PLAN-disanbudangv2.md`)

- [ ] Heritage Data Core — chuyển heritage data sang structured DB với provenance
- [ ] Impact Measurement — pre/post test, learning sessions tracking
- [ ] Living Heritage Archive — nâng cấp contribute thành living archive
- [ ] Heritage Explorer V2 — GPS on-site mode, QR codes, 360° photos
- [ ] Education Engine — learning paths, teacher dashboard
- [ ] AI Heritage Guide — RAG-based chatbot
