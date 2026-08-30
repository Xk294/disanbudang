# Danh Sách Yêu Cầu Xác Minh Nhân Sự — Di Sản Bù Đăng
> Zero-Trust Final Audit | 2026-08-31
> Những mục này KHÔNG thể tự giải quyết bằng code — yêu cầu tác giả/nhân chứng xác nhận

---

## MỨC ĐỘ: BẮT BUỘC TRƯỚC KHI DỰ THI

### HV-001 · Dữ liệu Pilot Study
- **Claim:** 168 học sinh, 3 trường (THCS Nguyễn Trường Tộ, THPT Lê Quý Đôn, PTDT Nội Trú Bù Đăng)
- **Claim:** SUS score 89.2/100
- **Claim:** Tăng trưởng kiến thức +41.8%, tỷ lệ hài lòng 91.4%
- **Yêu cầu:** File Google Form / Excel khảo sát gốc, biên bản tham gia của 3 trường
- **Rủi ro nếu thiếu:** Giám khảo hỏi số liệu — không có bằng chứng gốc = mất điểm nghiêm trọng

### HV-002 · Nhân chứng Oral History
- **Claim:** Lời kể Già làng Điểu Minh (78 tuổi, Bom Bo) về nghi thức Yang Ching
- **Claim:** Lời kể Cựu chiến binh Điểu K'Rút về tuyến đường gùi gạo
- **Claim:** Nghệ nhân Thị Rét dạy dệt thổ cẩm tại Đắk Nhau
- **Yêu cầu:** File ghi âm hoặc ảnh chụp trong buổi phỏng vấn điền dã
- **Rủi ro:** Tên người thật — cần xác nhận đồng ý sử dụng thông tin

### HV-003 · Reference Codes trong sources.ts
- **Claim:** Các mã hồ sơ như `QĐ-UBND/TM-BR`, `QĐ-UBND/2014-BL`, `BQL-BGM/2022-DDSH`, `HS-DTLS/BD-012`
- **Vấn đề:** Định dạng không theo chuẩn văn bản quy phạm pháp luật Việt Nam
- **Yêu cầu:** Số hiệu văn bản gốc chính thức, hoặc đánh dấu [CẦN XÁC MINH] rõ ràng trên UI

### HV-004 · Tác giả tài liệu nghiên cứu học sinh
- **Claim:** Vũ Quang Huy, Nguyễn Văn Hùng, Trần Quốc Toàn, Lê Minh Tâm (trong study data)
- **Yêu cầu:** Xác nhận đây là tên thật của học sinh đã tham gia nghiên cứu và đã đồng ý được ghi tên

---

## MỨC ĐỘ: NÊN XỬ LÝ

### HV-005 · "Thành Phố Đồng Nai" — Hành chính
- **Claim trong about.vue:** "Quốc hội thông qua Nghị quyết thành lập thành phố Đồng Nai, đưa Đồng Nai trở thành thành phố trực thuộc Trung ương thứ 7"
- **Claim:** "Tỉnh Bình Phước sáp nhập vào tỉnh Đồng Nai theo Nghị quyết 202/2025/QH15"
- **Yêu cầu:** Xác nhận hiệu lực pháp lý chính thức của Nghị quyết 202/2025/QH15, ngày có hiệu lực thực tế
- **Lưu ý:** Nếu địa danh Bù Đăng/Bình Phước trước sáp nhập cần được ghi chú rõ trong nội dung lịch sử

### HV-006 · Quyền sử dụng hình ảnh
- **Files cần kiểm tra:** `public/images/heritage/Bombo/TAN08217.jpg`, `TAN08220.jpg` (tên file gợi ý ảnh chuyên nghiệp)
- **Yêu cầu:** Xác nhận giấy phép / quyền sử dụng từ nhiếp ảnh gia hoặc nguồn gốc ảnh

### HV-007 · Quyền sử dụng âm thanh
- **Files:** `public/audio/khu-bao-ton-soc-bom-bo.mp3`, `public/audio/trang-co-bu-lach.mp3`
- **Yêu cầu:** Xác nhận giọng đọc / quyền phát sóng public domain hoặc tự thu âm

### HV-008 · Số liệu đầu tư trên /invest
- **Claim:** "68% Độ che phủ rừng", "130.000+ Dân số", "500 ha Quỹ đất sạch"
- **Claim:** "Chính sách ưu đãi thuế 5 năm đầu, hỗ trợ giải phóng mặt bằng"
- **Yêu cầu:** Nguồn dữ liệu chính thức hoặc xóa/làm mờ section này
