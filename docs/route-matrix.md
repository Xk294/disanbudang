# Ma Trận Định Tuyến Toàn Diện (Route Matrix) — Di Sản Bù Đăng

> Tài liệu kiểm toán toàn bộ định tuyến (Routing & Rendering Strategy) của hệ thống bảo tàng số Di Sản Bù Đăng.
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Bảng Tổng Hợp Ma Trận Tuyến Đường (Route Matrix Table)

| Route URL | Mục đích & Chức năng | Đối tượng phục vụ | Chiến lược Render | Nguồn dữ liệu | SSR | Indexable | Canonical URL | Tiêu đề (<title>) | H1 Heading | Schema.org Entities | Rủi ro chính (Mobile / A11y / Perf) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Cổng trải nghiệm bảo tàng số, tổng quan di sản, video trailer, audio guide, câu chuyện nổi bật | Đại chúng, học sinh, du khách | Prerender / SSG | `app/data/heritages.ts`, `posts.ts`, `quizzes.ts` | Có | Có | `https://disanbudang.com/` | `Di Sản Bù Đăng - Bảo Tàng Số Địa Phương` | 2 thẻ H1 (Gate & Main Hero) [LỖI] | `Organization`, `WebSite`, `WebPage`, `FAQPage` | **Cao:** Video 15MB auto-preload, 2 thẻ H1 xung đột SEO, Gate animation che khuất nội dung |
| `/about` | Giới thiệu dự án, tác giả, phương pháp nghiên cứu, dữ liệu thử nghiệm thực nghiệm (Pilot study) | Ban giám khảo, nhà nghiên cứu, nhà giáo | Prerender / SSG | Static Vue component | Có | Có | `https://disanbudang.com/about/` | `Giới Thiệu Dự Án - Di Sản Bù Đăng` | `Giới Thiệu Di Sản Bù Đăng` | `Organization`, `BreadcrumbList`, `Person` | **Trung bình:** File 46KB, số liệu thực nghiệm cần tài liệu gốc chứng minh |
| `/explore/` | Thư viện toàn bộ 16 di sản, ký ức cộng đồng, bộ lọc đa chiều (Category, Cluster, Period), tìm kiếm | Học sinh, du khách, độc giả | Prerender / SSG | `app/data/heritages.ts`, `posts.ts`, `categories.ts` | Có | Có | `https://disanbudang.com/explore/` | `Khám Phá Di Sản & Ký Ức Bản Địa - Di Sản Bù Đăng` | `Thư Viện Di Sản & Ký Ức Sống Bản Địa` | `CollectionPage`, `BreadcrumbList` | **Trung bình:** Khối lượng thẻ DOM lớn khi render toàn bộ 16 di sản + bài viết |
| `/explore/[id]` | Chi tiết bài viết ký ức cộng đồng, cảm nhận học sinh, tác phẩm nghệ thuật | Độc giả, cộng đồng địa phương | Dynamic SSR | `app/data/posts.ts` (`COMMUNITY_POSTS`) | Có | Có | `https://disanbudang.com/explore/[id]/` | `[Tiêu đề bài viết] - Di Sản Bù Đăng` | `[Tiêu đề bài viết]` | `Article`, `BreadcrumbList` | **Thấp:** Route format dùng `[id]` (`post-001`) thay vì semantic slug |
| `/explore/virtual-tour` | Trải nghiệm không gian ảo 360° (Three.js WebGL) và video trailer cinematic | Du khách từ xa, học sinh | Prerender / ClientOnly | `app/data/virtualTours.ts`, `artifacts.ts` | Không (WebGL) | Có | `https://disanbudang.com/explore/virtual-tour/` | `Không Gian 360° & Tour Di Sản - Di Sản Bù Đăng` | `Khám Phá Không Gian Di Sản 360°` | `BreadcrumbList`, `MediaObject` | **Rất cao:** WebGL nặng trên mobile cũ, panorama dùng ảnh 2D thay vì equirectangular 360 thật |
| `/heritage/[slug]` | Chi tiết học thuật từng di sản: tư liệu gốc, tọa độ GIS, audio guide, biên niên sử, thư viện ảnh | Học sinh, du khách thực địa, nhà nghiên cứu | Dynamic SSR / Prerender | `app/data/heritages.ts`, `sources.ts`, `quizzes.ts` | **HỎNG** (chỉ có spinner) | **BỊ CHẶN** (Googlebot thấy trang trắng) | `https://disanbudang.com/heritage/[slug]/` | `[Tên di sản] - Di Sản Bù Đăng` | `[Tên di sản]` | `TouristAttraction`, `LandmarksOrHistoricalBuildings`, `BreadcrumbList` | **CỰC KỲ NGHIÊM TRỌNG (P0):** `v-if="!isLoaded"` khiến SSR trả về duy nhất spinner, toàn bộ bài viết biến mất khỏi initial HTML |
| `/heritage/qr/[slug]` | Landing page tối giản khi quét mã QR tại cột mốc thực địa hoặc bảo tàng trường học | Khách tham quan thực địa, học sinh tại lớp | Dynamic SSR | `app/data/heritages.ts` | Có | Có | `https://disanbudang.com/heritage/qr/[slug]/` | `[Tên di sản] - Trải Nghiệm QR - Di Sản Bù Đăng` | `[Tên di sản]` | `TouristAttraction`, `BreadcrumbList` | **Thấp:** Cần tối ưu tải nhanh trên mạng 3G/4G thực địa |
| `/study` | Cổng học tập số: Flashcards 3D, 16 bộ Quiz, bài học tương tác, tài liệu nghiên cứu học sinh | Học sinh THCS/THPT, giáo viên Lịch sử | Prerender / SSG | `app/data/studyData.ts`, `quizzes.ts` | Có | Có | `https://disanbudang.com/study/` | `Cổng Học Tập Số Di Sản - Di Sản Bù Đăng` | `Cổng Học Tập Số Di Sản Thành Phố Đồng Nai` (sr-only) | `EducationalOrganization`, `Course`, `BreadcrumbList` | **CỰC CAO (P1):** File khổng lồ 151KB (2,471 dòng), nhồi nhét 5 module vào 1 page duy nhất, rủi ro đơ giật UI |
| `/study/lesson/[id]` | Bài học chuyên sâu đa phương tiện: mục lục, timeline, bản đồ điểm nóng, flashcards | Học sinh tự học, giáo viên giảng dạy | Dynamic SSR | Hardcoded trong component (2 bài) | Có | Có | `https://disanbudang.com/study/lesson/[id]/` | `[Tên bài học] - Di Sản Bù Đăng` | `[Tên bài học]` | `Course`, `LearningResource`, `BreadcrumbList` | **Cao:** Không dùng Nuxt Content, dữ liệu hardcoded trực tiếp trong script Vue (90KB) |
| `/map` | Bản đồ GIS tương tác toàn diện: 16 tọa độ di sản, 3 tuyến lộ trình, GPS dẫn đường, audio preview | Du khách thực địa, học sinh khám phá | Prerender / ClientOnly (Leaflet) | `app/data/heritages.ts`, `clusters.ts` | Không (Leaflet DOM) | Có | `https://disanbudang.com/map/` | `Bản Đồ Di Sản - Di Sản Bù Đăng` | `Bản Đồ Di Sản Thành Phố Đồng Nai` | `Map`, `BreadcrumbList` | **Cao:** Leaflet cần tải tile và tài nguyên bản đồ, GPS cần quyền thiết bị |
| `/news` | Tin tức, sự kiện lễ hội, bài viết chuyên khảo ẩm thực, văn hóa bản địa | Độc giả, du khách | Prerender / SSG | `app/data/posts.ts` (`NEWS_ARTICLES`, `EVENTS`) | Có | Có | `https://disanbudang.com/news/` | `Bài Viết & Blog Di Sản - Di Sản Bù Đăng` | `Bài Viết & Di Sản Bù Đăng` | `Event`, `BreadcrumbList` | **Thấp:** Không có phân trang khi số bài tăng |
| `/news/[slug]` | Chi tiết bài viết tin tức & nghiên cứu văn hóa | Độc giả | Dynamic SSR | `app/data/posts.ts` (`NEWS_ARTICLES`) | Có | Có | `https://disanbudang.com/news/[slug]/` | `[Tiêu đề bài viết] - Di Sản Bù Đăng` | `[Tiêu đề bài viết]` | `NewsArticle`, `BreadcrumbList` | **Thấp:** Layout ổn định |
| `/contribute` | Form hiến tặng tư liệu, hình ảnh, câu chuyện cộng đồng (Turnstile bot protection) | Nhân chứng lịch sử, người dân, học sinh | Prerender / SSG | Form POST -> `/api/contribute` -> D1 | Có | Có | `https://disanbudang.com/contribute/` | `Chung Tay Kiến Tạo Bản Đồ Di Sản - Di Sản Bù Đăng` | `Chung Tay Kiến Tạo Bản Đồ Di Sản` | `BreadcrumbList` | **Trung bình:** Xử lý upload ảnh client-side cần giới hạn kích thước chặt chẽ |
| `/invest` | Thông tin cơ hội đầu tư du lịch & nông nghiệp công nghệ cao | Doanh nghiệp, nhà đầu tư | Prerender / SSG | Static Vue component | Có | Có | `https://disanbudang.com/invest/` | `Cơ Hội Đầu Tư - Di Sản Bù Đăng` | `Đầu Tư Vùng Cao Nguyên Đồng Nai` | `BreadcrumbList` | **NGHIÊM TRỌNG (Về mặt Định vị):** Đề tài học sinh không có thẩm quyền kêu gọi đầu tư kinh tế địa phương |
| `/contact` | Thông tin liên hệ nhóm tác giả | Độc giả, đối tác | Prerender / SSG | Static Vue component | Có | Có | `https://disanbudang.com/contact/` | `Liên Hệ - Di Sản Bù Đăng` | `Liên Hệ Ban Quản Trị` | `ContactPage`, `BreadcrumbList` | **Thấp:** Form dùng `mailto:` tĩnh |
| `/admin/*` | Bảng điều khiển quản trị: duyệt đóng góp, xem thống kê khách truy cập | Quản trị viên (Nguyễn Xuân Kiệt) | SPA (`ssr: false`) | Nitro API -> Cloudflare D1 | Không | Không (`noindex, nofollow`) | N/A | N/A | N/A | N/A | **Thấp:** Đã bảo vệ bằng Firebase ID token + server RS256 verification |
| `/me/*` | Trang cá nhân người dùng, tiến trình học tập, huy hiệu | Người dùng đã đăng nhập | SPA (`ssr: false`) | Firebase Auth Client | Không | Không (`noindex, nofollow`) | N/A | N/A | N/A | N/A | **Thấp:** Đã loại khỏi sitemap và robots |

---

## 2. Danh Sách Tuyến Chuyển Hướng (301 Redirect Rules)

Đã cấu hình trong `nuxt.config.ts` (`routeRules`):
1. `/community` ➔ `/explore/` (301 Permanent Redirect)
2. `/quiz` ➔ `/#quiz` (301 Permanent Redirect)
3. `/school` ➔ `/study/` (301 Permanent Redirect)
4. `/library` ➔ `/explore/` (301 Permanent Redirect)

---

## 3. Các Khoảng Trống Định Tuyến (Routing Gaps vs Master IA)

So sánh với Master Architecture yêu cầu trong Prompt:
- `/stories/[slug]`: Chưa tồn tại dưới dạng route độc lập (hiện đang gộp chung trong `/explore/[id]`).
- `/journal/[slug]`: Chưa tồn tại.
- `/explore/post/[slug]`: Hiện đang dùng format `/explore/[id]` với param ID kiểu `post-001` thay vì semantic slug.
- `/study/lesson/[slug]`: Hiện dùng route param `[id]` và chỉ có 2 bài mẫu hardcoded trong Vue template.
