# Báo Cáo Kiểm Tra Dữ Liệu Thực Tế (Data Verification Audit) — Di Sản Bù Đăng

> Tài liệu kiểm toán tính xác thực lịch sử, văn hóa, số liệu thống kê, danh xưng và căn cứ khoa học trên toàn bộ codebase.
> **Quy tắc tuyệt đối:** KHÔNG BỊA — KHÔNG GIẢ DANH CƠ QUAN — TRUTH > BEAUTY.
> Cập nhật: 30/08/2026 — Forensic Audit Phase 0.

---

## 1. Tóm Tắt Tình Trạng Tính Xác Thực (Verification Status Overview)

| Hạng mục | Tổng số kiểm tra | Đã xác minh thực tế | Cần xác minh nhân sự (Human Check) | Sai lệch / Tự tạo (Fabricated/Inflated) |
|---|---|---|---|---|
| **Địa danh & Hành chính** | 24 địa danh | 18 | 4 | **2** (Gán ghép niên hiệu/TPTTTƯ tương lai) |
| **Hồ sơ Di sản (16 records)** | 16 di sản | 14 | 2 | 0 |
| **Nguồn tham chiếu (Sources)** | 48 nguồn | 26 | 14 | **8** (Mã quyết định / cơ quan giả định) |
| **Số liệu thống kê (Stats)** | 12 chỉ số | 4 | 4 | **4** (Phóng đại 100% audio, AI engine) |
| **Số liệu nghiên cứu (Pilot)** | 6 chỉ số | 0 | 6 (Cần xem bảng khảo sát gốc) | 0 |

---

## 2. Các Phát Hiện Chi Tiết Theo Nhóm Rủi Ro

### 2.1 Địa Danh & Định Vị Hành Chính

#### ⚠️ Vấn đề 1: Khái niệm "Thành Phố Đồng Nai — TPTTTƯ thứ 7 từ 30/04/2026"
- **Vị trí xuất hiện:** 
  - `app/components/home/HeroSection.vue` (dòng 151)
  - `CHANGELOG.md` (dòng 79: "Nghị quyết 202/2025/QH15")
  - `nuxt.config.ts` (dòng 165)
- **Kiểm toán thực tế:**
  - Về mặt địa lý lịch sử: Vùng đất Bù Đăng, Sóc Bom Bo, Bù Lạch, Thác Mơ, Núi Bà Rá, Phước Long, Lộc Ninh, Căn cứ Tà Thiết nguyên thuộc tỉnh **Bình Phước** (và thời kháng chiến là tỉnh Phước Long / Thủ Dầu Một / Sông Bé).
  - Về mặt pháp lý: Tuyên bố "Thành Phố Đồng Nai là thành phố trực thuộc trung ương thứ 7 từ 30/04/2026" là một giả định tương lai chưa có hiệu lực pháp lý xác nhận công khai trong dữ liệu địa chí chính thức.
- **Kết luận:** Vi phạm Absolute Rule 1 ("Không được tự tạo sự kiện, lịch sử, ngày tháng"). Phải điều chỉnh câu chữ về đúng định vị: *"Bắt đầu từ Bù Đăng — đang mở rộng"* và không tự bịa đặt ngày tháng hành chính chưa diễn ra.

---

### 2.2 Nguồn Tham Chiếu & Hồ Sơ Lưu Trữ (`app/data/sources.ts`)

#### ❌ Vấn đề 2: Các mã quyết định / Mã hồ sơ có định dạng giả định (Fictional Reference Codes)
- **Phát hiện:**
  - `hrt-002` (Hồ Thác Mơ): `institution: 'Sở Văn hóa, Thể thao và Du lịch Thành phố Đồng Nai'`, `publishedYear: 2021`, `referenceCode: 'QĐ-UBND/TM-BR'`.
    - *Sai lệch:* Năm 2021, Thác Mơ thuộc Thị xã Phước Long, Tỉnh Bình Phước. Mã `QĐ-UBND/TM-BR` không theo định dạng văn bản quy phạm pháp luật chuẩn của Việt Nam (phải là số hiệu dạng `Số: .../QĐ-UBND`).
  - `hrt-009` (Trảng cỏ Bù Lạch): `institution: 'UBND Tỉnh & Sở VHTTDL Đồng Nai'`, `publishedYear: 2014`, `referenceCode: 'QĐ-UBND/2014-BL'`.
    - *Sai lệch:* Trảng cỏ Bù Lạch được UBND tỉnh Bình Phước công nhận danh thắng cấp tỉnh năm 2014.
  - `hrt-006` (Rừng nguyên sinh Bù Đăng): `referenceCode: 'BQL-BGM/2022-DDSH'`.
  - `hrt-001` (Căn cứ Nửa Lon): `referenceCode: 'HS-DTLS/BD-012'`.
- **Hành động bắt buộc:** Đánh dấu nhãn `[CẦN XÁC MINH]` cho tất cả các mã hồ sơ nội bộ chưa có văn bản công chứng gốc. Không tự sinh mã hồ sơ theo cảm tính.

---

### 2.3 Thống Kê & Tuyên Bố Tính Năng Website

#### ❌ Vấn đề 3: Tuyên bố "100% Audio Thuyết minh song ngữ"
- **Vị trí:** `app/pages/explore/index.vue` (dòng 63–64)
- **Thực tế kiểm toán:**
  - Thư mục `public/audio/` chỉ có đúng **2 file âm thanh**:
    1. `soc-bom-bo.mp3`
    2. `trang-co-bu-lach.mp3`
  - Cả 2 file đều là giọng đọc Tiếng Việt, hoàn toàn **chưa có phiên bản Song ngữ (English)**.
  - 14/16 di sản còn lại hoàn toàn chưa có file thu âm audio guide.
- **Hệ quả:** Tuyên bố "100% Audio Thuyết minh song ngữ" là phóng đại số liệu thực tế (Fake statistic), gây mất uy tín học thuật khi ban giám khảo hoặc du khách kiểm tra thực tế.

#### ❌ Vấn đề 4: Tuyên bố "Trợ lý AI Thông minh"
- **Vị trí:** `app/components/layout/AiAssistantModal.vue` & `app/utils/aiHeritageEngine.ts`
- **Thực tế kiểm toán:**
  - Không có kết nối tới bất kỳ mô hình ngôn ngữ lớn (LLM) nào (không có Gemini API, OpenAI API hay Cloudflare Workers AI).
  - Bản chất là một bộ lọc từ khóa Regex tĩnh (Deterministic string matching) chạy trên trình duyệt.
  - Nút "Hỏi AI" trên trang Study điều hướng vô nghĩa về `/?ai=true`.
- **Hệ quả:** Gây hiểu lầm cho người dùng về khả năng của hệ thống. Cần định vị lại là: *"Hệ thống Tra cứu Tri thức Số Bản địa"* hoặc tích hợp API có spend-cap rõ ràng.

---

### 2.4 Dữ Liệu Cần Nhân Sự Dự Án Xác Minh Gốc (Human Verification Required)

Các mục sau đây mang tính học thuật cao, thuộc sở hữu của nhóm học sinh nghiên cứu, bắt buộc tác giả (Nguyễn Xuân Kiệt) cung cấp biên bản xác nhận:
1. **Dữ liệu thực nghiệm Pilot Study (About Page):**
   - 168 học sinh tại 3 trường (THCS Nguyễn Trường Tộ, THPT Lê Quý Đôn, PTDT Nội Trú Bù Đăng).
   - Điểm số SUS 89.2/100 và tỷ lệ tăng trưởng kiến thức +41.8%.
   *(Cần lưu giữ file Excel / Google Form khảo sát trong hồ sơ lưu trữ dự thi).*
2. **Lời kể nhân chứng truyền khẩu (Oral History):**
   - Lời kể Già làng Điểu Minh (78 tuổi, Bom Bo) về nghi thức Yang Ching.
   - Lời kể Cựu chiến binh Điểu K'Rút về tuyến đường gùi gạo.
   - Nghệ nhân Thị Rét dạy dệt thổ cẩm tại Đắk Nhau.
   *(Cần có file ghi âm hoặc ảnh chụp điền dã đối chứng).*
3. **Danh mục 8 tài liệu nghiên cứu học sinh:**
   - Các tác giả học sinh: Vũ Quang Huy, Nguyễn Văn Hùng, Trần Quốc Toàn, Lê Minh Tâm... cần xác nhận là nhân vật thật hay tên tác giả tham gia đề tài.
