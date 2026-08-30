# Báo Cáo Kiểm Toán SEO Kỹ Thuật (Technical SEO Audit) — Di Sản Bù Đăng

> Tài liệu phân tích toàn diện SSR, Indexability, Meta Tags, Schema.org, Sitemap, Robots và Canonical URLs.
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Điểm Yếu Cốt Tử: Lỗi SSR / Indexability Trên Tuyến Di Sản (`/heritage/[slug]`)

### 🔴 LỖI BLOCKING P0: Initial HTML Chỉ Chứa Spinner, Nội Dung Bài Viết Biến Mất

- **File nguồn:** `app/pages/heritage/[slug].vue`
- **Đoạn mã gây lỗi (Dòng 1–7 & 521, 605):**
  ```vue
  <template>
    <div>
      <div v-if="!isLoaded" class="min-h-screen flex items-center justify-center bg-charcoal-900">
        <div class="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <div v-else-if="heritage" class="bg-charcoal-900 min-h-screen text-ivory">
        <!-- TOÀN BỘ NỘI DUNG DI SẢN, H1, THUYẾT MINH, ẢNH NẰM Ở ĐÂY -->
      </div>
    </div>
  </template>

  <script setup lang="ts">
  const isLoaded = ref(false)
  onMounted(async () => {
    isLoaded.value = true
  })
  </script>
  ```
- **Cơ chế lỗi:**
  1. Trong môi trường SSR (hoặc `nuxt generate` prerendering), `ref(false)` được khởi tạo ở server.
  2. Lifecycle hook `onMounted()` **CHỈ CHẠY TRÊN CLIENT-SIDE (Browser)**, hoàn toàn KHÔNG CHẠY ở Server.
  3. Server render ra HTML tĩnh với `!isLoaded === true`, tức là render ra đúng một thẻ `<div>` chứa spinner quay tròn.
  4. Googlebot, Bingbot, Zalo/Facebook crawlers khi fetch URL `/heritage/[slug]` sẽ nhận về mã HTML rỗng không có chữ, không có H1, không có nội dung thuyết minh.
- **Hệ quả:** 16 trang di sản quý giá nhất của dự án hoàn toàn bị coi là "Thin Content" / "Empty Page" đối với các công cụ tìm kiếm.

---

## 2. Kiểm Toán Toàn Diện Các Tiêu Chuẩn SEO Kỹ Thuật

### 2.1 Tiêu Đề (<title>) & Mô Tả (<meta name="description">)
- **Cơ chế xử lý:** `useMuseumSeo.ts` tự động cắt gọt và chuẩn hóa:
  - Loại bỏ ký tự gạch ngang dài (`—` và `–`) thành `-` để vượt qua `scripts/validate-seo.js`.
  - Giới hạn tiêu đề: Tối đa 60 ký tự cho trang thường, tối đa 80 ký tự cho trang bài viết (`/heritage/`, `/news/`, `/study/lesson/`).
  - Giới hạn mô tả: Tối đa 155 ký tự.
- **Đánh giá:** Logic xử lý trong `useMuseumSeo.ts` hoạt động tốt và tuân thủ chặt chẽ.

### 2.2 Thẻ Canonical & Trailing Slash
- **Quy tắc:** Mọi URL canonical bắt buộc kết thúc bằng dấu gạch chéo `/` (`ensureTrailingSlash`).
- **Cấu hình site:** `nuxt.config.ts` đã bật `trailingSlash: true`.
- **Trạng thái:** Đạt chuẩn 100%.

### 2.3 Semantic Heading Hierarchy (Cấu Trúc Thẻ Tiêu Đề H1–H6)
- **❌ Lỗi nghiêm trọng tại Trang Chủ (`app/pages/index.vue` / `HeroSection.vue`):**
  - Có tới **2 thẻ `<h1>`** cùng tồn tại trong DOM:
    1. Dòng 69 trong `RoyalScrollReveal`: `<h1>Bảo Tàng Số Di Sản Bù Đăng</h1>`
    2. Dòng 244 trong `revealed` view: `<h1>Bảo Tàng Số Di Sản Bù Đăng</h1>`
  - Vi phạm quy tắc vàng của SEO: Mỗi trang chỉ được phép có duy nhất 1 thẻ `<h1>` đại diện cho chủ đề chính.
- **⚠️ Trang Góc Học Tập (`app/pages/study/index.vue`):**
  - Dùng thẻ ẩn `<h1>` (`sr-only`): `<h1 class="sr-only">Cổng Học Tập Số Di Sản Thành Phố Đồng Nai</h1>`.
  - Cần đưa H1 hiển thị trực quan thay vì ẩn giấu.

### 2.4 Cấu Trúc Dữ Liệu Schema.org (JSON-LD)
Đã triển khai hệ thống Schema phong phú:
- **Trang chủ (`/`):** `Organization`, `WebSite`, `WebPage`, `FAQPage`
- **Di sản (`/heritage/[slug]`):** `TouristAttraction`, `LandmarksOrHistoricalBuildings`, `BreadcrumbList`
- **Tin tức (`/news/[slug]`):** `NewsArticle`, `BreadcrumbList`
- **Góc học tập (`/study`):** `EducationalOrganization`, `Course`, `BreadcrumbList`
- **Sự kiện (`/news`):** `Event`
- **❌ Lỗi tọa độ Geo Schema tại Trang Chủ:**
  - `geo.position` trong `useMuseumSeo.ts` đang gán tọa độ Biên Hòa (`10.9447;106.8243`) thay vì tọa độ Bù Đăng (`11.7589;107.1325`), gây sai lệch định vị thực thể Google Knowledge Graph.

### 2.5 Sitemap & Robots.txt
- **Robots.txt:** Đã cấu hình chặn đúng `/admin` và `/me`, trỏ đúng `Sitemap: https://disanbudang.com/sitemap.xml`.
- **Sitemap Generator (`@nuxtjs/sitemap`):**
  - Cần đảm bảo khi prerender / generate, sitemap thu thập đầy đủ toàn bộ 16 route `/heritage/[slug]` và các bài viết tin tức.
