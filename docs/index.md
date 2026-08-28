# Tài Liệu Dự Án: Di Sản Bù Đăng

> **[Kiến Trúc Hệ Thống](./arch/system.md)** và **[Tech Stack Overview](./arch/tech-stack.md)** — đọc trước tiên để nắm tech stack, cấu trúc thư mục và quy tắc phát triển.
> Mục tiêu/roadmap kinh doanh: xem [Business Backbone](./biz/overview.md).

Hệ thống tài liệu này được cấu trúc theo chuẩn **Aki-RULE**, chia thành các phân hệ chính để dễ dàng tra cứu và bảo trì.

## 🎯 Mục lục

### 0. Master Document (Đọc Trước)
- [**Kiến Trúc Hệ Thống**](./arch/system.md): Tech stack, cấu trúc thư mục, quy tắc phát triển.

### 1. Định vị Kinh doanh (Business Backbone)
Xương sống định vị, mô hình kinh doanh và hướng monetize — mọi doc `feat/`, `arch/`, `plan/` đụng tới sản phẩm/tiền đều phải tham chiếu về đây.
- [**Business Overview**](./biz/overview.md): Định vị thương hiệu, đối tượng, các luồng monetize (Invest, Tourism), roadmap kinh doanh.

### 2. Tính năng (Features)
Mô tả về các tính năng nghiệp vụ, logic và các hệ thống cốt lõi tương tác với người dùng.
- **Core Features:** Các tài liệu mô tả chi tiết từng tính năng của hệ thống.
  - [Di Sản (Heritage Models)](./feat/heritage.md)
  - [Bản đồ Tương tác & GPS](./feat/map.md)
  - [Audio Guide](./feat/audio-guide.md)
  - [Trò chơi hoá (Gamification)](./feat/gamification.md)
  - [Triển Lãm Ảnh Số (Gallery)](./feat/gallery.md)
  - [Dịch Vụ Du Lịch (Tourism MVP)](./feat/tourism.md)
  - [Cơ Hội Đầu Tư (Invest MVP)](./feat/invest.md)
  - [Góc Học Đường](./feat/school.md)
  - [Tin Tức (News)](./feat/news.md)
  - [Đóng Góp Cộng Đồng](./feat/contribute.md)

### 3. Kiến trúc (Architecture)
Mô tả các quyết định kỹ thuật, stack công nghệ, quản lý trạng thái và cấu trúc mã nguồn.
- [Tech Stack Overview](./arch/tech-stack.md): Tổng quan về Nuxt 4, Pinia, và các quyết định kiến trúc khác.
- [**Backend — Vận Hành & Tìm Hiểu**](./arch/backend-operations.md): Luồng request đầy đủ (contribute, admin review, visitor tracking), cách đọc D1 bằng wrangler CLI, mô hình bảo mật, schema bảng, checklist setup production.

### 4. Kế hoạch (Plans)
Nơi lưu trữ các kế hoạch triển khai đã chốt hoặc đang thực hiện.
- [Standardize Docs Plan (đã hoàn thành)](./plan/done/PLAN-001-standardize-docs.md): Kế hoạch chuẩn hoá tài liệu đợt 1.
- [Refactor theo Aki-RULE đợt 1 (đã hoàn thành)](./plan/done/PLAN-JUL08-refactor-akirule-first.md): Kết quả rà soát toàn dự án theo bộ rule Aki-RULE và kế hoạch refactor ưu tiên P0/P1/P2.
- [Init DB & Docs Refactor (đã hoàn thành)](./plan/done/PLAN-JUL12-init-db.md): Khởi tạo D1 DB cho tính năng đóng góp và Firebase Auth.
- [**DisanBudang V2 — Nâng cấp Cạnh tranh Cấp Quốc gia**](./plan/PLAN-disanbudangv2.md): Kế hoạch 6-phase nâng cấp toàn diện — Heritage Data Core, Source Provenance, Impact Measurement, Living Archive, Explorer V2, Education Engine, AI Guide.

### 5. Báo cáo (Reports)
- [Báo Cáo Nghiên Cứu Dự Án](./ref/bao-cao-du-an.md): Bản báo cáo nghiên cứu dự án chi tiết, chính thức và chuẩn xác về mặt công nghệ và tính năng.

### 6. Nghiên cứu & Quyết định (Research)
- [Repo visibility khi tích hợp backend (2026-07-12)](./research/2026-07-12-repo-visibility-akithink.md): Decision record — giữ repo public kèm điều kiện hardening bắt buộc trước khi ship endpoint backend (giai đoạn 2).

### 7. Hướng dẫn & Tài liệu phụ trợ (References)
- [**Hồ Sơ Tranh Biện & Thuyết Minh Chung Khảo Quốc Gia**](./ref/NATIONAL_COMPETITION_DEFENSE_PACK.md): Tuyên bố giá trị 60s, ma trận tiêu chí đánh giá, cheat sheet phản biện giám khảo và kịch bản demo 3 phút.
- [Kịch Bản Thu Âm Audio Guide](./ref/audio-recording-guide.md): Hướng dẫn thuyết minh & kịch bản thu âm giọng đọc thực tế cho các điểm di sản (thay thế giọng AI hiện tại).

---
> **Lưu ý cho Developer/AI:** Mọi thay đổi về tính năng lớn hoặc kiến trúc mới đều phải được cập nhật tương ứng vào thư mục `docs/feat/` hoặc `docs/arch/`. Không tạo thêm các top-level directory trừ khi các thư mục hiện tại (`biz`, `feat`, `arch`, `plan`, `ref`, `research`) không còn phù hợp.
