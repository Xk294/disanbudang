# Ngân Sách Hiệu Năng & Tối Ưu Tải Trang (Performance Budget) — Di Sản Bù Đăng

> Tài liệu kiểm toán tải trọng tài nguyên (Payload, Image Weight, Script Execution, Core Web Vitals).
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Bảng Ngân Sách Hiệu Năng Mục Tiêu (Target Performance Budget)

| Chỉ số / Tài nguyên | Ngân sách Mục tiêu (Budget) | Thực trạng Kiểm toán Hiện tại | Đánh giá |
|---|---|---|---|
| **LCP (Largest Contentful Paint)** | ≤ 2.5s trên 4G Mobile | ~ 3.8s (Do video trailer và ảnh lớn) | 🔴 VƯỢT NGÂN SÁCH |
| **FID / INP (Interaction to Next Paint)** | ≤ 150ms | ~ 90ms | 🟢 ĐẠT |
| **CLS (Cumulative Layout Shift)** | ≤ 0.05 | 0.02 | 🟢 ĐẠT |
| **Tổng Dung Lượng Initial JS** | ≤ 250 KB (gzipped) | ~ 380 KB (gzipped) | 🟡 CẦN GIẢM TẢI |
| **Kích Thước Ảnh Tối Đa (Max Image)** | ≤ 150 KB (WebP/AVIF) | Nhiều ảnh **> 900 KB – 1.13 MB** | 🔴 VƯỢT NGÂN SÁCH GẤP 7 LẦN |
| **Video Background Preload** | `preload="none"` hoặc `metadata` | `preload="auto"` (15MB trailer) | 🔴 LÃNG PHÍ BĂNG THÔNG |

---

## 2. Chi Tiết Các Điểm Nghẽn Hiệu Năng (Performance Bottlenecks)

### 🔴 2.1 Tải Trọng Hình Ảnh Nặng Chưa Được Nén Sang WebP
Trong thư mục `public/images/heritage/`:
- `canh-thut-stieng.png`: **850 KB** (PNG nguyên bản)
- `com-lam-stieng.png`: **983 KB** (PNG nguyên bản)
- `dan-da-stieng.png`: **895 KB** (PNG nguyên bản)
- `det-tho-cam-stieng.png`: **906 KB** (PNG nguyên bản)
- `giang-gao-bombo.png`: **969 KB** (PNG nguyên bản)
- `ruou-can-stieng.png`: **924 KB** (PNG nguyên bản)
- `can-cu-ta-thiet.jpg`: **1.06 MB**
- `nha-giao-truyen-thong-lg.webp`: **1.13 MB**
- `Fouderdisanbudang.jpg`: **409 KB**

*Hệ quả:* Tải một trang tin tức hoặc di sản có thể ngốn tới 3–5MB dữ liệu mạng di động của người dùng.
*Giải pháp:* Chuyển đổi toàn bộ PNG/JPG sang định dạng WebP với mức nén chất lượng 80–85% để đưa kích thước mỗi ảnh về dưới **80–120 KB** (tiết kiệm ~85% băng thông).

---

### 🔴 2.2 Tự Động Tải Video Nền Tại Trang Chủ (`HeroSection.vue`)
- **Dòng 16:** `preload="auto"` trên thẻ `<video src="/video/virtual-tour/bom-bo/bom-bo-trailer.mp4">`.
- **Thực tế:** File trailer video có dung lượng lên tới hơn 15MB. Khi người dùng mở trang chủ trên mạng 3G/4G, trình duyệt ngay lập tức tải 15MB video ngay cả khi người dùng chưa nhấn "Bắt đầu hành trình".
- **Giải pháp:** Đổi thành `preload="none"` hoặc chỉ bắt đầu fetch luồng video khi người dùng tương tác mở Gate.

---

### 🟡 2.3 Phình To Kích Thước File Mã Nguồn (Monolithic Component Bloat)
- `app/pages/study/index.vue`: **151.6 KB (2,471 dòng code)**
  - Tích hợp toàn bộ logic Quiz, Flashcard, PDF viewer, Timeline, Notes, XP badges trong một file Vue duy nhất.
  - Cần tách thành các component con độc lập (Async Component / Lazy Load) để Nuxt chia nhỏ bundle tải theo nhu cầu của từng tab.
- `app/pages/about.vue`: **46.8 KB (906 dòng)**
- `app/pages/map.vue`: **54.4 KB (1,124 dòng)**
- `app/pages/explore/index.vue`: **43.7 KB (839 dòng)**
- `app/data/studyData.ts`: **56.7 KB** chứa HTML raw của 8 bài nghiên cứu.
- `app/data/quizzes.ts`: **113.8 KB** chứa toàn bộ câu hỏi trắc nghiệm.

---

### 🟡 2.4 Payload Serialization Của Pinia Store
- Store `useHeritageStore()` khởi tạo `ref(HERITAGES)` chứa toàn bộ 16 di sản (65KB code văn bản).
- Khi Nuxt thực hiện Server-Side Rendering và serialize state sang `window.__NUXT__` payload JSON, toàn bộ dữ liệu này bị đóng gói vào HTML của mọi trang có sử dụng store, làm tăng kích thước initial HTML payload thêm ~60KB.
