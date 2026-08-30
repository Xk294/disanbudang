# Bản Đồ Trùng Lặp Nội Dung (Content Duplication Map) — Di Sản Bù Đăng

> Tài liệu phân loại và kiểm toán chi tiết các điểm trùng lặp văn bản, tư liệu và cấu trúc trên toàn bộ website.
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Bảng Phân Loại Trùng Lặp (Duplication Categories)

| Nhóm | Loại Trùng Lặp | Mức độ | Định nghĩa |
|---|---|---|---|
| **A** | **Exact Duplicate** (Trùng lặp nguyên văn) | Nghiêm trọng | Nội dung giống nhau 100% từng từ giữa 2 hoặc nhiều file trong repo |
| **B** | **Semantic Duplicate** (Trùng lặp ngữ nghĩa) | Cao | Cùng một nội dung thực tế nhưng diễn đạt lại bằng từ ngữ hơi khác |
| **C** | **Narrative Duplicate** (Trùng lặp mạch tự sự) | Cao | Kể cùng một câu chuyện, cùng góc nhìn trên nhiều trang có chức năng khác nhau |
| **D** | **Structural Duplicate** (Trùng lặp cấu trúc code/UI) | Trung bình | Code giao diện hoặc khối component bị nhân bản lặp lại thay vì tái sử dụng |
| **E** | **Legitimate Repetition** (Lặp lại hợp lệ) | Cho phép | Thông tin thương hiệu, breadcrumb, trích dẫn quy chuẩn |

---

## 2. Chi Tiết Các Điểm Trùng Lặp Phát Hiện Được

### 2.1 Nhóm A: Exact Duplicate (Trùng lặp nguyên văn 100%)

#### ❌ Điểm 1: Tài liệu nghiên cứu học sinh (School Research Papers)
- **Vị trí 1:** `content/school/res-001.md` đến `res-008.md` (8 file Markdown độc lập)
- **Vị trí 2:** `app/data/studyData.ts` (mảng `RESEARCH_PAPERS`, dòng 269–400)
- **Hiện trạng:** Toàn bộ nội dung chương hồi HTML của các bài nghiên cứu học sinh bị copy-paste thủ công nguyên văn vào các chuỗi string trong `studyData.ts`.
- **Hệ quả:**
  - Nuxt Content v3 bị biến thành "xác sống" không được sử dụng.
  - Sửa một bài nghiên cứu phải sửa ở 2 nơi, nguy cơ lệch dữ liệu.
  - Phình to dung lượng bundle TypeScript thêm ~56KB không cần thiết.

#### ❌ Điểm 2: Bài học mẫu Lịch sử & Văn hóa
- **Vị trí 1:** `app/pages/study/lesson/[id].vue` (object `lessons` dòng 108–230)
- **Vị trí 2:** `app/data/studyData.ts` (object `LESSONS_DATA` dòng 1–150)
- **Hiện trạng:** Bài học "Chiến Khu Đ" và "Cồng Chiêng S'tiêng" được định nghĩa giống hệt nhau ở cả 2 file.

---

### 2.2 Nhóm B & C: Semantic & Narrative Duplicate (Trùng lặp Ngữ nghĩa & Tự sự)

#### ❌ Điểm 3: Câu chuyện Sóc Bom Bo giã gạo nuôi quân
Xuất hiện lặp lại tại **6 vị trí độc lập** với cùng một cấu trúc nội dung (nhạc sĩ Xuân Hồng, năm 1965, đuốc lồ ô, nhịp chày đôi chày ba):
1. `app/data/heritages.ts` (`hrt-011` — Khu bảo tồn Sóc Bom Bo)
2. `app/data/posts.ts` (`news-003` — "Huyền Thoại Tiếng Chày Trên Sóc Bom Bo")
3. `app/data/posts.ts` (`post-001` — "Ông nội tôi và những đêm cồng chiêng")
4. `app/data/virtualTours.ts` (Scene `bom-bo-khu-gia-gao` & hotspot intro)
5. `app/utils/aiHeritageEngine.ts` (Entry `soc-bom-bo`)
6. `docs/ref/audio-recording-guide.md` (Kịch bản số 4)

*Khuyến nghị chuẩn hóa:*
- `heritage/[slug]`: Chỉ tập trung vào Hồ sơ di tích khoa học, phân loại, tọa độ, biên niên sử chính thức.
- `news/[slug]`: Chuyên đề báo chí / góc nhìn văn hóa nghệ thuật.
- `explore/[id]`: Ký ức đời thực của người dân bản địa (tiếng nói thứ nhất).
- `virtual-tour`: Dữ liệu chú thích không gian 360°.

#### ❌ Điểm 4: Huyền thoại Căn cứ Nửa Lon Bù Đăng
Xuất hiện lặp lại tại **4 vị trí**:
1. `app/data/heritages.ts` (`hrt-001`)
2. `content/heritage/can-cu-nua-lon-bu-dang.md`
3. `app/data/posts.ts` (`post-002` và `post-003`)
4. `app/utils/aiHeritageEngine.ts` (`can-cu-nua-lon`)

---

### 2.3 Nhóm D: Structural Duplicate (Trùng lặp cấu trúc Code & UI)

#### ❌ Điểm 5: HeroSection.vue — Trùng lặp H1 và 2 phiên bản giao diện Hero
- **Vị trí:** `app/components/home/HeroSection.vue`
- **Hiện trạng:**
  - Phiên bản 1 (Dòng 69): Thẻ `<h1>` nằm trong Royal Scroll Panel (`v-if="!revealed"`).
  - Phiên bản 2 (Dòng 244): Thẻ `<h1>` nằm trong Main Hero Revealed (`v-if="revealed"`).
- **Hệ quả:** Vi phạm nghiêm trọng tiêu chuẩn Semantic HTML (1 thẻ H1 duy nhất trên một URL) và gây nhiễu công cụ thu thập dữ liệu tìm kiếm.

#### ❌ Điểm 6: EmptyState.vue — Trùng lặp toàn bộ màn hình Dashboard
- **Vị trí:** `app/components/study/EmptyState.vue` (dài 518 dòng, 28.4KB)
- **Hiện trạng:** Thay vì chỉ hiển thị một thông báo trống đơn giản, component này xây dựng lại 5 layout song song đầy đủ các nút bấm hành động (Hỏi AI, Mở bản đồ, Starter topics...) trùng lặp với màn hình chính của `study/index.vue`.

---

### 2.4 Nhóm E: Legitimate Repetition (Lặp lại hợp lệ — Giữ nguyên)

Các trường hợp lặp lại sau đây là có chủ đích kỹ thuật và **KHÔNG ĐƯỢC XÓA**:
1. **Tên thương hiệu & Tagline:** "Di Sản Bù Đăng", "Bảo Tàng Số Thành Phố Đồng Nai" trên Navbar, Footer và Meta tags.
2. **Category Slugs & Labels:** `lich-su`, `danh-thang`, `van-hoa-phi-vat-the`, `doi-song-cong-dong`, `giao-duc-truyen-thong`.
3. **Citations & Provenance:** Tên các viện nghiên cứu, trường học khảo sát xuất hiện trong phần chứng minh nguồn tư liệu.
