# Di Sản Thành Phố Đồng Nai — Bảo Tàng Số Địa Phương

Một không gian số hiện đại nhằm lưu trữ, tôn vinh và lan tỏa các giá trị di sản văn hóa, lịch sử và thiên nhiên của Thành Phố Đồng Nai (Bù Đăng, Phước Long, Lộc Ninh, Bom Bo...).

## 🎯 Mục tiêu cốt lõi
Website có **hai vai trò song hành**, không thể tách rời:
1. **Công cụ giáo dục lịch sử địa phương** — Hỗ trợ học sinh tiếp cận tài liệu lịch sử, di sản văn hóa Thành Phố Đồng Nai theo cách tương tác và trực quan, thay thế sách giáo khoa truyền thống.
2. **Cổng thông tin du lịch thông minh** — Giúp du khách tự túc khám phá, định hướng và tìm hiểu các điểm di sản khắp Thành Phố Đồng Nai.

## 💡 Vấn đề được giải quyết
Các hạn chế của các giải pháp hiện tại mà dự án này khắc phục triệt để:
| Vấn đề | Giải pháp của dự án |
|---|---|
| Thiếu bản đồ di sản tương tác | Bản đồ Leaflet.js + GPS Geolocation (`/map`) |
| Thiếu hệ thống trắc nghiệm sinh động | Góc Học Tập với Quiz + Huy hiệu điện tử (`/study`) |
| Không có hướng dẫn bằng âm thanh | Audio Guide toàn cục chạy ngầm (HTML5 Audio + Pinia) |
| Nội dung rời rạc, không hệ thống | 16 di sản số hóa đầy đủ qua Nuxt Content v3 |
| Giao diện truyền thống, thiếu tương tác | Dark mode nghệ thuật, animation GSAP/VueUse Motion |

## 📖 Báo Cáo Công Nghệ và Xây Dựng Sản Phẩm

Dự án được xây dựng trong **6 tháng** với các nguyên vật liệu và công nghệ chính:

| Tên công nghệ / Nguyên liệu | Chức năng trong sản phẩm |
| :--- | :--- |
| **TypeScript, Vue 3, Nuxt 4** | Xây dựng cấu trúc ứng dụng tối ưu, tự động hóa định tuyến (routing) và kết xuất giao diện đáp ứng (responsive). |
| **Tailwind CSS, GSAP, VueUse Motion** | Tối ưu hóa bố cục giao diện Dark Mode nghệ thuật; tạo các hiệu ứng chuyển động cinematic và lật thẻ 3D tương tác. |
| **Leaflet.js, Howler.js** | Xử lý lớp bản đồ tương tác, định vị GPS thực tế và quản lý phát âm thanh thuyết minh (Audio Guide). |
| **SQLite (D1), Pinia** | Lưu trữ cơ sở dữ liệu di sản (đặc biệt tính năng Đóng Góp); quản lý và đồng bộ tiến trình của người dùng. |
| **Nuxt Content v3** | Quản lý, biên soạn và kết xuất trực tiếp các bài viết thuyết minh chi tiết. |
| **Tư liệu lịch sử địa phương** | Thu thập từ Sách giáo khoa, tư liệu lưu trữ của Bảo tàng Thành phố Đồng Nai và phỏng vấn các nghệ nhân, già làng. |

---

## 🏗 Kiến trúc & Phạm Vi Hệ Thống

### 1. Nguyên Tắc Thiết Kế Cốt Lõi (Core Principles)
- **Aesthetic First (Ưu tiên thẩm mỹ):** Giao diện phải mang đậm bản sắc văn hóa S'tiêng (tone màu ấm nóng, họa tiết thổ cẩm).
- **Gamification (Trò chơi hóa):** Biến việc học/đọc di sản thành hành trình khám phá có thưởng.
- **Offline-First / Edge-First:** Sử dụng Cloudflare Pages (Edge) cho tốc độ tải cực nhanh. Phần lớn dữ liệu là tĩnh (local JSON/Markdown).
- **SRP & Rule-based:** Tuân thủ nghiêm ngặt các quy tắc trong `~/.aki/claudedoc/`.

### 2. Thuật Ngữ (Glossary)
- **Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai**: Tên sản phẩm đầy đủ.
- **Thành Phố Đồng Nai**: Địa danh cấp thành phố (khung phạm vi phục vụ).
- **Xã Bù Đăng, Sóc Bom Bo...**: Địa danh cụ thể khi mô tả di sản.

---

## 🗺️ Khả năng Mở rộng (Roadmap)

### Giai đoạn hiện tại (Đã hoàn thành — V1)
- [x] 16 di sản số hóa toàn diện kèm tọa độ GIS
- [x] Bản đồ tương tác + GPS Geolocation
- [x] Audio Guide toàn cục (2 track hoàn thiện: Sóc Bom Bo & Trảng Cỏ Bù Lạch)
- [x] Góc Học Tập với 16 bộ Quiz + 4 cấp bậc Huy hiệu
- [x] Flashcard thuật ngữ S'tiêng tương tác 3D
- [x] 6 ký ức cộng đồng thu âm & biên soạn
- [x] Backend: D1, Firebase Auth, Turnstile, Admin panel

### Giai đoạn V2 (Đang thực hiện)
Xem chi tiết: [`docs/plan/PLAN-disanbudangv2.md`](./docs/plan/PLAN-disanbudangv2.md)
- [ ] Heritage Data Core — structured DB với data provenance
- [ ] Impact Measurement — pre/post test trên 50+ học sinh
- [ ] Living Heritage Archive — living community archive
- [ ] Heritage Explorer V2 — GPS on-site mode, QR codes, 360°
- [ ] Education Engine — learning paths, teacher dashboard
- [ ] AI Heritage Guide — RAG-based chatbot

## ⏳ Giai đoạn Phát triển
Dự án được xây dựng trong **6 tháng**:
| Giai đoạn | Thời gian | Nội dung |
|---|---|---|
| **1 — Thu thập tư liệu** | Tháng 1–2 | Khảo sát địa bàn, thu thập tư liệu lịch sử, ảnh di sản thực tế, thu âm giọng đọc mẫu |
| **2 — Thiết kế UI/UX** | Tháng 3 | Thiết kế giao diện trên Figma — gam màu ấm nóng cảm hứng thổ cẩm S'tiêng |
| **3 — Lập trình** | Tháng 4–5 | Nuxt 4 + Leaflet + Audio Guide (Howler.js + Pinia) + GSAP |
| **4 — Số hóa & kiểm thử** | Tháng 6 | Nuxt Content v3, kết nối SQLite, kiểm thử, đóng gói |

## 🚀 Bắt đầu (Setup)

### Yêu cầu hệ thống
- Node.js (phiên bản mới nhất LTS)
- npm, pnpm hoặc yarn

### Cài đặt
1. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
2. Chạy môi trường phát triển:
   ```bash
   npm run dev
   ```
3. Xây dựng phiên bản sản xuất:
   ```bash
   npm run build
   ```

---

## 📝 Giấy phép & Bản quyền

Dự án này được bảo hộ bản quyền bởi **Nguyễn Xuân Kiệt**.
- Mã nguồn được công khai cho mục đích tham khảo và học tập.
- **Mọi hành động sửa đổi, phân phối lại hoặc sử dụng thương mại** đều phải được sự đồng ý trước bằng văn bản của tác giả.

Vui lòng xem chi tiết tại tệp [LICENSE](./LICENSE) hoặc liên hệ:
- **Email:** nguyenxuankiet294@gmail.com
- **SĐT:** 0355 356 294
