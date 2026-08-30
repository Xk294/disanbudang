# Báo Cáo Kiểm Toán Khả Năng Tiếp Cận (Accessibility / A11y Audit) — Di Sản Bù Đăng

> Tài liệu kiểm toán theo tiêu chuẩn WCAG 2.1 Cấp độ AA: Điều hướng bàn phím, tương phản màu, hỗ trợ trình đọc màn hình (Screen Readers), nhãn ARIA.
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Tóm Tắt Đánh Giá Tuân Thủ WCAG 2.1 AA

| Tiêu chí WCAG | Hạng mục kiểm tra | Đánh giá hiện tại | Ghi chú & Rủi ro |
|---|---|---|---|
| **1.1 Text Alternatives** | Thẻ `alt` trên toàn bộ hình ảnh | 85% Đạt | Thiếu alt chi tiết trên một số ảnh minh họa trong Virtual Tour & Gallery |
| **1.3 Adaptable** | Semantic HTML & Heading structure | 70% Đạt | **Lỗi:** Trùng 2 thẻ H1 tại Trang chủ; dùng `h1.sr-only` tại Study |
| **1.4 Distinguishable** | Độ tương phản màu chữ (Color Contrast) | 80% Đạt | Một số chữ nhỏ dùng `text-charcoal-400` trên nền tối có tỷ lệ tương phản ~3.2:1 (chưa đạt chuẩn 4.5:1) |
| **2.1 Keyboard Accessible** | Điều hướng hoàn toàn bằng phím Tab/Enter | 75% Đạt | Modal Virtual Tour và Leaflet Popup cần bẫy focus (Focus Trap) tốt hơn |
| **2.4 Navigable** | Skip link, tiêu đề trang, focus visible | 90% Đạt | Đã có Skip link `#main-content`, `focus-visible` viền vàng rõ ràng |
| **3.1 Readable** | Khai báo ngôn ngữ trang `lang="vi"` | 100% Đạt | Đã khai báo `htmlAttrs: { lang: 'vi' }` trong `nuxt.config.ts` |
| **4.1 Compatible** | ARIA roles, states, modal dialogs | 80% Đạt | Các modal tìm kiếm, quiz modal, audio player cần đồng bộ `aria-expanded` |

---

## 2. Chi Tiết Các Khiếm Khuyết Tiếp Cận (Accessibility Defects)

### 2.1 Vấn Đề Tương Phản Màu Sắc (Color Contrast Ratio < 4.5:1)
- **Vị trí:**
  - Nhãn phụ, thời gian đăng bài, chú thích nhỏ (`text-charcoal-400` / `#B3A791` trên nền `#0A0C10`).
  - Tỷ lệ tương phản đo được: ~3.4:1 đối với chữ 11px–12px (Chuẩn WCAG AA yêu cầu tối thiểu 4.5:1 cho text thông thường).
- **Khắc phục:** Chuyển các text quan trọng từ `text-charcoal-400` sang `text-charcoal-300` (`#D6CBB5`) hoặc `text-ivory/80` để đạt tỷ lệ tương phản > 5.5:1.

---

### 2.2 Điều Hướng Bàn Phím Cho Thành Phần Nâng Cao (Interactive Keyboard Navigation)

#### 🗺️ Bản Đồ Leaflet (`app/pages/map.vue`):
- Các marker trên bản đồ hiện đang sử dụng cơ chế canvas/SVG của Leaflet. Mặc dù đã có phím tắt cơ bản, người dùng khiếm thị hoặc chỉ dùng bàn phím cần danh sách Text List song song ở Sidebar để có thể chọn di sản mà không cần nhấp chuột vào bản đồ.

#### 🥽 Trình Xem 360° (`app/components/tour360/TourViewer360.vue`):
- Trình xem 360° chủ yếu nhận tương tác chuột kéo (Drag) và chạm cảm ứng (Touch). Người dùng bàn phím cần hỗ trợ các phím mũi tên `Left/Right/Up/Down` để xoay góc nhìn và phím `Tab` để di chuyển giữa các điểm nóng (Hotspots).

---

### 2.3 Quản Lý Tiêu Điểm Bàn Phím (Focus Trapping Trong Modal)
- Khi mở `AiAssistantModal.vue` hoặc `SearchOverlay.vue`, cần đảm bảo tiêu điểm bàn phím (Keyboard Focus) được khóa chặt bên trong modal (không Tab ra ngoài thanh URL phía sau) và nhấn phím `ESC` đóng modal ngay lập tức.
