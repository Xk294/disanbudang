# Kiến trúc Hệ thống

## 1. Tech Stack (Bất biến — Không thay thế nếu không có lý do kỹ thuật cụ thể)

| STT | Tên công nghệ | Phiên bản | Chức năng |
|---|---|---|---|
| 1 | **TypeScript** | ^5.8.3 | Ngôn ngữ lập trình — bắt buộc strict mode |
| 2 | **Vue 3** | ^3.5.34 | Framework UI, Composition API |
| 3 | **Nuxt 4** | ^4.4.2 | SSR/SSG framework, file-based routing, module ecosystem |
| 4 | **Tailwind CSS** | ^3.4.17 | Utility-first styling — Dark mode chủ đạo |
| 5 | **GSAP** | ^3.12.7 | Animation cinematic (hero, scroll-trigger) |
| 6 | **VueUse Motion** | ^3.0.3 | Directive-based animation cho Vue components |
| 7 | **Leaflet.js** | ^1.9.4 | Bản đồ tương tác tọa độ địa lý |
| 8 | **Vue-Leaflet** | ^0.1.0 | Wrapper Vue 3 cho Leaflet |
| 9 | **Howler.js** | ^2.2.4 | Trình phát âm thanh Audio Guide toàn cục |
| 10 | **Pinia** | ^2.3.0 | State management |
| 11 | **Pinia Persistedstate** | ^1.2.1 | Đồng bộ state vào LocalStorage |
| 12 | **better-sqlite3** | ^12.10.0 | Lưu trữ bộ câu hỏi Quiz phía server |
| 13 | **Nuxt Content v3** | ^3.14.0 | Quản lý bài viết thuyết minh dưới dạng Markdown |
| 14 | **nuxt-security** | ^2.5.1 | CSP headers, rate limiting |
| 15 | **SweetAlert2** | ^11.26.25 | Dialog xác nhận GPS, thông báo |
| 16 | **@nuxt/image** | ^1.10.0 | Tối ưu hóa ảnh, WebP, responsive |

> **Quy tắc Stack:** Không thêm thư viện mới nếu chức năng tương đương đã có trong stack hiện tại. Mọi đề xuất thư viện mới phải được ghi lại lý do trong `docs/plan/` trước khi thực thi.

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
│   │   ├── library.vue     # Thư viện di sản
│   │   ├── study.vue       # Góc học tập & Quiz
│   │   ├── study/          # Sub-routes học tập
│   │   ├── heritage/       # Chi tiết từng di sản [slug]
│   │   ├── explore/        # Khám phá (thay /community)
│   │   ├── contribute/     # Đóng góp cộng đồng
│   │   ├── news/           # Tin tức
│   │   ├── invest.vue      # Cơ hội đầu tư
│   │   └── contact.vue     # Liên hệ
│   ├── components/     # UI components (pathPrefix: false)
│   ├── composables/    # Shared logic
│   ├── stores/         # Pinia stores
│   │   ├── audio.ts        # AudioPlayerState toàn cục
│   │   ├── heritage.ts     # Dữ liệu danh sách di sản
│   │   └── quiz.ts         # Tiến trình Quiz & Huy hiệu
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Dữ liệu tĩnh (fallback)
│   ├── layouts/        # Nuxt layouts
│   └── assets/css/     # Global CSS, Tailwind config
├── content/            # Bài viết Markdown (Nuxt Content v3)
├── public/             # Static assets
├── server/             # API routes (Nuxt server)
├── docs/               # Tài liệu dự án
└── nuxt.config.ts      # Cấu hình Nuxt — nguồn sự thật config
```

### 2.2 Định tuyến (Route Map)

| URL | Trang | Ghi chú |
|---|---|---|
| `/` | Trang chủ | Hero, Overview, Featured Heritage |
| `/about` | Giới thiệu | Thông tin dự án, tác giả |
| `/map` | Bản đồ di sản | Leaflet + GPS + Popups |
| `/library` | Thư viện | Danh sách 11 di sản, filter/search |
| `/heritage/[slug]` | Chi tiết di sản | Markdown + Gallery + Audio + Timeline |
| `/study` | Góc học tập | Quiz, Flashcard, Huy hiệu |
| `/study/[id]` | Bài học chi tiết | |
| `/explore/` | Khám phá | Redirect từ `/community` (301) |
| `/contribute` | Đóng góp | Form gửi tư liệu cộng đồng |
| `/news/[slug]` | Tin tức | |
| `/invest` | Đầu tư | Cơ hội đầu tư du lịch |
| `/contact` | Liên hệ | |
| `/quiz` | *(redirect)* | → `/#quiz` (301) |
| `/school` | *(redirect)* | → `/study/` (301) |
| `/community` | *(redirect)* | → `/explore/` (301) |

### 2.3 State Management (Pinia Stores)

```
stores/
├── audio.ts     — AudioPlayerState: isPlaying, currentTrack, currentTime
│                  Chạy ngầm qua page transitions, không bị ngắt
├── heritage.ts  — Danh sách di sản, trạng thái tải, filter hiện tại
└── quiz.ts      — Tiến trình Quiz, điểm số, Huy hiệu đạt được
                   → Persisted vào LocalStorage qua Pinia Persistedstate
```

> **Quy tắc Store:** Không dùng `reactive()` hay `ref()` trực tiếp ở component-level cho dữ liệu cần chia sẻ giữa các trang. Mọi shared state phải đi qua Pinia store.

### 2.4 Nguyên tắc Nội dung Số (Content Layer)

- **Bài viết thuyết minh di sản:** Lưu dưới dạng Markdown trong `content/`. Nuxt Content v3 biên dịch tự động thành JSON khi build.
- **Dữ liệu câu hỏi Quiz:** Lưu trong SQLite (`better-sqlite3`) phía server, truy vấn qua API route.
- **Dữ liệu di sản (metadata):** TypeScript type definitions trong `app/types/`, data trong `app/data/` làm fallback.

---

## 3. Dữ liệu Di sản Cốt lõi

### 3.1 Số liệu đã số hóa

- **16 di sản** được tổ chức lưu trữ, lập hồ sơ tọa độ và biên soạn tài liệu khoa học
- **6 Ký ức cộng đồng** — câu chuyện truyền miệng từ già làng, nghệ nhân S'Tiêng, M'Nông
- **2 Audio Guide** hoàn thiện chất lượng cao — tệp âm thanh thuyết minh giọng đọc truyền cảm (Sóc Bom Bo & Trảng Cỏ Bù Lạch)
- **16 bộ Quiz kiểm tra kiến thức** tích hợp hệ thống huy hiệu điện tử

### 3.2 Phân loại Di sản (`HeritageCategory`)

| Slug | Tên hiển thị |
|---|---|
| `lich-su` | Lịch sử |
| `danh-thang` | Danh thắng |
| `van-hoa-phi-vat-the` | Văn hoá phi vật thể |
| `doi-song-cong-dong` | Đời sống cộng đồng |
| `giao-duc-truyen-thong` | Giáo dục truyền thống |

### 3.3 Phân loại theo Thời kỳ (`HeritagePeriod`)

`Tiền sử` → `Phong kiến` → `Pháp thuộc` → `Kháng chiến` → `Hiện đại`

### 3.4 Phân loại theo Cụm Di sản (`HeritageCluster`)

Kết nối di sản khởi nguồn Bù Đăng ra toàn Thành Phố Đồng Nai — dùng cho filter trên `/map` và `/explore`, gợi ý hành trình tham quan liên xã (không phải ranh giới hành chính):

| Slug | Tên hiển thị | Ghi chú |
|---|---|---|
| `bu-dang` | Bù Đăng | Căn cứ kháng chiến, rừng nguyên sinh, làng nghề, lễ hội bản địa |
| `bom-bo` | Sóc Bom Bo | Cồng chiêng, nhà dài, huyền thoại nhịp chày giã gạo |
| `phuoc-long` | Phước Long | Núi Bà Rá, hồ Thác Mơ, Chiến thắng Phước Long 06/01/1975 |
| `loc-ninh` | Lộc Ninh | Căn cứ Tà Thiết, Nhà Giao Tế |

Nguồn dữ liệu: `app/data/clusters.ts`.

### 3.5 Cấu trúc dữ liệu mỗi Di sản

Mỗi điểm di sản bắt buộc có đầy đủ các trường:

```typescript
{
  id: string           // Unique identifier
  slug: string         // URL slug
  name: string         // Tên di sản
  category: HeritageCategory
  period: HeritagePeriod
  coordinates: { lat: number; lng: number }  // Bắt buộc cho bản đồ
  gallery: string[]    // Mảng URL ảnh
  longStory: string    // Markdown content path
  quickFacts: QuickFact[]
  timeline: TimelineEvent[]
  audioGuideUrl?: string  // URL tệp âm thanh (nếu có)
}
```

---

## 4. Tính năng Chính — Đặc tả Kỹ thuật

### 4.1 Bản đồ Di sản Tương tác (`/map`)

- **Thư viện:** Leaflet.js + vue-leaflet
- **Tile layer:** OpenStreetMap / CartoCDN (đã whitelist trong CSP)
- **Tính năng bắt buộc:**
  - Marker phân màu theo `HeritageCategory`
  - Marker clustering khi thu nhỏ bản đồ
  - Custom Popup hiển thị ảnh + tên + tóm tắt di sản
  - Bộ lọc theo Category và Period
  - Tìm kiếm theo tên/từ khóa
  - **GPS Locate Me** — HTML5 Geolocation API, hiện vị trí thực của người dùng
  - Xác nhận GPS qua SweetAlert2 trước khi truy cập location

### 4.2 Audio Guide Toàn cục

- **Thư viện:** Howler.js
- **State:** `stores/audio.ts` — chạy độc lập với luồng UI
- **Yêu cầu cốt lõi:** Audio KHÔNG được ngắt khi người dùng chuyển trang, tắt màn hình điện thoại
- **Tích hợp:** Mỗi trang chi tiết di sản inject `heritageId` vào audioStore để load đúng track
- **Transcript:** Tuỳ chọn hiển thị văn bản thuyết minh chạy song song

### 4.3 Góc Học Tập & Gamification (`/study`)

- **Quiz Engine:** Câu hỏi từ SQLite, phân loại theo di sản cụ thể
- **Huy hiệu (Badges):**

  | Cấp độ | Điều kiện |
  |---|---|
  | Common | Hoàn thành bài cơ bản |
  | Rare | Điểm số cao |
  | Epic | Hoàn thành liên tiếp nhiều bài khó |
  | Legendary | Am hiểu toàn diện về Di sản Thành Phố Đồng Nai |

- **Persistence:** Điểm số + Huy hiệu lưu vào LocalStorage qua `pinia-plugin-persistedstate`
- **Flashcard:** Widget lật thẻ 3D — từ vựng bản địa S'tiêng (Yang Ching, Đ'rắp S'lung, Dak Mơ...)

### 4.4 Thư viện Di sản (`/library`)

- Danh sách đầy đủ 11 di sản với filter và search
- Card-based layout với lazy-loading ảnh
- Link sang trang chi tiết `/heritage/[slug]`

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
- **VueUse Motion:** Directive-based micro-animations trên components (`v-motion`)
- **Nuxt Page Transition:** `out-in` mode cho page-level transitions
- **View Transitions API:** `experimental.viewTransition: true` bật trong nuxt.config

### 5.3 Responsive

- Breakpoints: `xs:320` / `sm:640` / `md:768` / `lg:1024` / `xl:1280` / `xxl:1536`
- Mobile-first design — Bản đồ và Quiz tối ưu trên điện thoại

---

## 6. Security & Performance

### 6.1 Security (nuxt-security)

- **CSP img-src whitelist:** `self`, `data:`, `images.unsplash.com`, `*.tile.openstreetmap.org`, `*.basemaps.cartocdn.com`
- **Rate Limiter:** 150 tokens/hour
- **CORS:** GET + POST từ mọi origin (phù hợp với API public)

### 6.2 Hình ảnh

- Format ưu tiên: WebP → JPG
- Quality: 85%
- Domain whitelist: `images.unsplash.com`
- Xử lý qua `@nuxt/image` — bắt buộc dùng `<NuxtImg>` thay cho `<img>` raw

---

## 7. Quy tắc Phát triển (Development Rules)

> Những quy tắc này là bất biến. Mọi AI agent và developer đều phải tuân theo.

### 7.1 Nguyên tắc chung

- **Scope discipline:** Làm đúng và đủ những gì được yêu cầu. Không tự ý thêm tính năng, refactor hay cleanup nếu không được yêu cầu.
- **YAGNI:** Không xây dựng những gì "có thể cần trong tương lai" — chỉ xây dựng những gì cần ngay bây giờ.
- **Source of truth:** Code thực tế > Docs này > Memory. Luôn đọc file nguồn trước khi chỉnh sửa.

### 7.2 Quy tắc Code

- **Ngôn ngữ code & comment:** Tiếng Anh
- **TypeScript:** Strict mode bắt buộc (`strict: true` trong tsconfig)
- **Component naming:** PascalCase, đặt theo chức năng rõ ràng
- **Không dùng `any`** trừ khi có lý do kỹ thuật được document rõ
- **Result pattern** cho mọi external call:
  ```typescript
  type Result<T> = { ok: true; data: T } | { ok: false; error: string }
  ```

### 7.3 Quy tắc Commit

- Commit message: Tiếng Anh, imperative style (`Add`, `Fix`, `Update`, không phải `Added`, `Fixed`)
- **Không** thêm co-author signatures của AI vào commit message

### 7.4 Quy tắc Docs

- Tài liệu feature: `docs/feat/<tên>.md`
- Tài liệu kiến trúc: `docs/arch/<tên>.md`
- Kế hoạch triển khai: `docs/plan/<PLAN-XXX-tên>.md`
- Khi hoàn thành plan: chuyển vào `docs/plan/done/`
- **Luôn cập nhật `docs/index.md`** khi thêm file doc mới
- Không tạo top-level thư mục mới trong `docs/` trừ khi thực sự cần thiết

### 7.5 Quy tắc Nội dung (Content)

- Tên thuật ngữ dân tộc phải nhất quán: **S'Tiêng**, **M'Nông**
- Tên thương hiệu ngắn (logo, UI, SEO site name): **Di Sản Bù Đăng** — dùng như tên riêng/khởi nguyên, không phải khẳng định ranh giới hành chính.
- Tagline/subtitle mô tả phạm vi phục vụ: **Bảo Tàng Số Thành Phố Đồng Nai** — luôn đi kèm brand ngắn để làm rõ phạm vi thực tế.
- Tên sản phẩm đầy đủ: **Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai** (viết hoa đầy đủ).
- Địa danh cấp thành phố (khung phạm vi phục vụ): **Thành Phố Đồng Nai** — dùng trong mô tả tổng quát, SEO, metadata phạm vi.
- Địa danh cụ thể (khi mô tả một di sản/sự kiện cụ thể): **Xã Bù Đăng**, **Sóc Bom Bo**, núi Bà Rá, Căn cứ Tà Thiết, Lộc Ninh... Các cụm này được kết nối với nhau qua khái niệm "cụm/tuyến di sản", không dùng brand để gộp chúng.

---

## 8. Khả năng Mở rộng (Roadmap)

### Giai đoạn hiện tại (Đã hoàn thành)
- [x] 16 di sản số hóa toàn diện kèm tọa độ GIS
- [x] Bản đồ tương tác + GPS Geolocation
- [x] Audio Guide toàn cục (2 track hoàn thiện Sóc Bom Bo & Bù Lạch)
- [x] Góc Học Tập với 16 bộ Quiz + 4 cấp bậc Huy hiệu
- [x] Flashcard thuật ngữ S'tiêng tương tác 3D
- [x] 6 ký ức cộng đồng thu âm & biên soạn tư liệu

### Giai đoạn tiếp theo (Ưu tiên cao)
- [ ] Thêm audio guide cho các di sản còn lại
- [ ] Tích hợp VR 360° Panorama cho các điểm lõi
- [ ] Hệ thống thẩm định nguồn khoa học (Data Provenance) & Thẻ thực địa On-site Mode

### Tương lai (Sau khi có đủ nguồn lực)
- [ ] VR 360° cho các điểm di tích
- [ ] AI Chatbot hỗ trợ giải đáp thắc mắc du khách
- [ ] Mở rộng mô hình sang các phường/xã khác của TP. Đồng Nai
- [ ] Phiên bản đa ngôn ngữ (Anh, Khmer)
