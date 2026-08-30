# Báo Cáo Kiểm Toán Hệ Thống Thiết Kế (Design System Audit) — Di Sản Bù Đăng

> Tài liệu kiểm toán màu sắc, typography, token, CSS variables, components và hiện tượng trôi dạt thiết kế (Design Drift).
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Bảng Token Màu Sắc Chuẩn Hóa (Color Design Tokens)

Hệ thống màu sắc lấy cảm hứng từ sắc màu thổ cẩm và vùng đất đỏ bazan Bù Đăng:

| Nhóm Token | Tên Token | Mã Hex / HSL | Vai trò trong giao diện | Trạng thái Alias trong `tailwind.config.ts` |
|---|---|---|---|---|
| **Accent Chính** | `gold` / `champagne` | `#C7A664` | Nút bấm chính (CTA), viền highlight, icon ánh vàng, gradient tiêu đề | Đồng nhất (`brand`, `forest`, `amber` đều trỏ về `champagne`) |
| **Accent Phụ** | `secondary` | `#8C723F` | Màu vàng đồng sậm cho hover và chi tiết phụ | Chuẩn hóa |
| **Nền Tối (Dark Surface)** | `night-900` / `charcoal-900` | `#0A0C10` / `#161310` | Nền màn hình chính của toàn bộ trang | Có sự xung đột giữa `#0A0C10` và `#221D17` |
| **Bề Mặt Card (Card Surface)** | `charcoal-950` / `surface` | `#1A140F` / `#241C15` | Nền card di sản, modal, thanh navbar | Chuẩn hóa với hiệu ứng Glassmorphism |
| **Chữ Chính (Text Primary)** | `ivory` / `white` | `#F2EDE6` / `#F6F2EA` | Tiêu đề và văn bản đọc trên nền tối | Chuẩn hóa |
| **Chữ Phụ (Text Secondary)** | `charcoal-350` / `charcoal-400` | `#C2B49B` / `#B3A791` | Chú thích, thời gian, tên tác giả | Chuẩn hóa |
| **Trạng Thái Semantic** | `success` / `warning` / `danger` | `#12B981` / `#F59E0B` / `#EF4444` | Trạng thái đúng/sai trong Quiz, thông báo | Chuẩn hóa |

---

## 2. Các Lỗi Trôi Dạt Thiết Kế (Design Drift Defects)

### 🔴 Lỗi 1: Xung đột Màu Nền Cơ Bản (Body Background Flash)
- **File:** `app/assets/css/main.css` (Dòng 67)
  ```css
  body {
    background-color: #F6F2EA; /* Màu kem sáng (Light Paper) */
    color: #221D17;
  }
  ```
- **Thực tế:** Toàn bộ giao diện website (100% các trang) được thiết kế theo phong cách **Dark Mode** với nền tối (`bg-charcoal-900` hoặc `#0A0C10`).
- **Hệ quả:** Khi người dùng chuyển trang hoặc tải trang lần đầu, trình duyệt render nền trắng kem `#F6F2EA` trong một tích tắc trước khi template Nuxt tải xong nền đen `#0A0C10`, tạo cảm giác chớp giật mắt (FOUC / Background Flash).
- **Giải pháp:** Cần đồng bộ màu nền `body` trong `main.css` thành `#0A0C10` hoặc `#161310`.

---

### ⚠️ Lỗi 2: Trộn Lẫn Hệ Thống Font Chữ (Typography Hierarchy)
- **Hệ thống Font chuẩn hóa:**
  1. **Tiêu đề chính (Headings):** `Playfair Display` (Serif cổ điển, trang trọng).
  2. **Nội dung đọc (Body):** `Inter` (Sans-serif rõ ràng, tối ưu hiển thị tiếng Việt).
  3. **Trích dẫn / Danh ngôn (Quotes):** `Cormorant Garamond` (Italic lãng mạn).
- **Vấn đề phát hiện:**
  - Trong `app/pages/study/index.vue` (dòng 1365), xuất hiện layout giấy thi học thuật dùng font `font-serif` mặc định của hệ điều hành thay vì token `font-heading` hoặc `font-accent`.
  - Một số component tự gán style font inline không qua Tailwind class.

---

### ⚠️ Lỗi 3: Kích Thước Vùng Chạm Cảm Ứng (Touch Target Size < 44px)
- Một số nút bấm lọc nhỏ trên mobile (như keyword chip `#Chiến Khu Đ` kích thước chỉ 20px chiều cao) không đạt tiêu chuẩn tiếp cận WCAG 2.1 (yêu cầu tối thiểu 44x44px trên màn hình cảm ứng).

---

## 3. Danh Mục Các Button Classes Quy Chuẩn

Được định nghĩa trong `app/assets/css/main.css`:
- `.btn-primary`: Nền vàng `bg-gold-500`, chữ tối, bo góc lớn, hover chuyển sắc.
- `.btn-secondary`: Nền tối, viền vàng `border-gold-500`, chữ sáng.
- `.btn-ghost`: Nền trong suốt, viền mờ `border-charcoal-800`, hover sáng dần.
- `.btn-outline-gold`: Viền vàng thanh mảnh, chuyên dùng cho card CTA.
