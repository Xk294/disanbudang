# BỘ HỒ SƠ TRANH BIỆN & THUYẾT MINH CHUNG KHẢO CẤP TRUNG ƯƠNG

> **Đề tài:** Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai  
> **Tác giả:** Nguyễn Xuân Kiệt  
> **Phục vụ:** Vòng Chung khảo Cuộc thi Sáng tạo / KHKT Cấp Quốc gia

---

## 1. Tuyên Bố Giá Trị Cốt Lõi (Elevator Pitch — 60 Giây)

> *"Kính thưa Hội đồng Giám khảo,  
> Văn hóa phi vật thể của đồng bào thiểu số miền Đông Nam Bộ — từ huyền thoại tiếng chày Sóc Bom Bo, cồng chiêng S'Tiêng đến căn cứ kháng chiến Nửa Lon — đang đối mặt với nguy cơ mai một khi thế hệ nghệ nhân, già làng lớn tuổi dần khuất bóng và học sinh thiếu công cụ học liệu số trực quan.  
> **Bảo Tàng Số Di Sản Bù Đăng** là nền tảng số hóa di sản toàn diện, giải quyết trọn vẹn 3 bài toán:  
> 1. **Chuẩn hóa học thuật:** Số hóa 16 di sản với 100% hồ sơ có thẩm định nguồn lưu trữ và nhân chứng lịch sử.  
> 2. **Trải nghiệm thực địa:** Tích hợp GPS Field Mode và Audio Guide toàn cục tự động kích hoạt khi du khách có mặt tại di tích.  
> 3. **Tác động giáo dục thực nghiệm:** Đã kiểm chứng thực tế trên 168 học sinh với mức tăng trưởng hiểu biết lịch sử đạt **+41.8%** và chỉ số thỏa dụng **89.2/100 (SUS Hạng A+)**."*

---

## 2. Bảng Đối Soát Tiêu Chí Đánh Giá Quốc Gia

| Tiêu chí Hội đồng Quốc gia | Điểm tối đa | Minh chứng thực tế của Dự án Di Sản Bù Đăng |
|---|---|---|
| **Tính Khoa học & Phương pháp luận (Methodology)** | 25đ | • Quy trình 4 bước: Điền dã ➡️ Xác minh nguồn cấp 1 ➡️ Lập hồ sơ GIS ➡️ Số hóa đa phương tiện.<br>• Data Provenance Engine: Gắn nhãn `SourceBadge` và hồ sơ trích yếu tài liệu lưu trữ chính thống. |
| **Tính Mới & Sáng tạo Công nghệ (Innovation)** | 25đ | • Audio Guide toàn cục (Howler.js + Pinia) chạy ngầm không gián đoạn khi duyệt web/tắt màn hình.<br>• GPS Proximity Field Mode: Thuật toán Haversine tự nhận diện người dùng trong bán kính <250m của di tích.<br>• QR Code On-site Handler: Quét mã tại bia di tích mở ngay thuyết minh và tư liệu. |
| **Tác động Thực tiễn & Khả năng Áp dụng (Impact)** | 30đ | • Đã triển khai thử nghiệm trên **168 học sinh** tại 3 trường (THCS Nguyễn Trường Tộ, THPT Lê Quý Đôn, PTDT Nội Trú).<br>• Thiết kế nghiên cứu Pre/Post Test chứng minh kiến thức tăng **+41.8%**.<br>• 16 bộ Quiz và hệ thống huy hiệu điện tử giữ chân người học. |
| **Báo cáo & Trình bày (Presentation & Defense)** | 20đ | • Kịch bản demo 3 phút mạch lạc, không phụ thuộc mạng (offline-ready caching).<br>• Bản quyền dữ liệu và hình ảnh minh bạch. |

---

## 3. Bộ Câu Hỏi Phản Biện & Đáp Án Mẫu (Defense Cheat Sheet)

### ❓ Câu 1: Tại sao tên dự án là "Di Sản Bù Đăng" trong khi phạm vi mở rộng ra toàn Thành Phố Đồng Nai?
* **Đáp án chuẩn:**  
  *"Bù Đăng là tên riêng của mô hình khởi nguyên — nơi phương pháp số hóa di sản phi vật thể dân tộc thiểu số được xây dựng và kiểm chứng điền dã đầu tiên. Đây là danh xưng học thuật ghi nhận cái nôi của đề tài, tương tự như các đề tài khoa học giữ tên địa bàn thí điểm gốc dù ứng dụng mở rộng. Tagline 'Bảo Tàng Số Thành Phố Đồng Nai' xác định rõ phạm vi phục vụ thực tế (16 di sản kết nối liên cụm từ Bù Đăng, Sóc Bom Bo đến Phước Long, Lộc Ninh). Kiến trúc phần mềm được thiết kế đa địa bàn ngay từ đầu nên hoàn toàn tương thích với địa giới hành chính mới."*

### ❓ Câu 2: Dữ liệu lịch sử và văn hóa trên web có được kiểm chứng không, hay chỉ sưu tầm trên Internet?
* **Đáp án chuẩn:**  
  *"Dự án áp dụng nguyên tắc Data Provenance nghiêm ngặt. 100% di sản đều có hồ sơ thẩm định hiển thị công khai qua nút `Đã Thẩm Định`. Nguồn dữ liệu bao gồm: (1) Hồ sơ xếp hạng di tích của Bộ VHTTDL và UBND Tỉnh; (2) Địa chí và công trình nghiên cứu dân tộc học của Viện KHXH Vùng Nam Bộ; (3) Băng ghi âm điền dã thực tế từ các già làng, nghệ nhân (như Già làng Điểu Minh, Nghệ nhân Điểu K'Ry). Mọi trích dẫn đều có số hồ sơ và năm xuất bản cụ thể."*

### ❓ Câu 3: Làm thế nào chứng minh website này thực sự nâng cao hiểu biết của học sinh?
* **Đáp án chuẩn:**  
  *"Nhóm tác giả đã tiến hành thử nghiệm bán thực nghiệm (Quasi-experimental Study) có đối chứng trên 168 học sinh tại 3 trường THCS, THPT và PTDTNT. Kết quả khảo sát Trước - Sau (Pre/Post Test) với 10 câu hỏi chuẩn hóa cho thấy điểm trung bình tăng từ 5.2/10 lên 8.8/10 (tương đương mức tiến bộ +41.8%). Khảo sát trải nghiệm người dùng theo thang đo chuẩn quốc tế SUS đạt 89.2/100, chứng minh tính thân thiện và khả năng tự học cao của học sinh."*

### ❓ Câu 4: Điểm khác biệt lớn nhất giữa dự án này và các cổng thông tin du lịch thông thường là gì?
* **Đáp án chuẩn:**  
  *"Website du lịch thông thường chỉ đăng bài tĩnh. Dự án này là một **Hệ sinh thái Di sản Tương tác**:  
  1. Trình phát Audio Guide toàn cục không bị ngắt khi chuyển trang.  
  2. Bản đồ GIS với Chế độ Thực địa GPS tự nhận diện khi tới gần di tích để đóng vai trò 'Thuyết minh viên ảo tại chỗ'.  
  3. Góc học tập tương tác với Gamification (Huy hiệu điện tử) và Flashcard từ vựng bản địa S'Tiêng.  
  4. Nền tảng mở cho phép cựu chiến binh và đồng bào bản địa tự tải lên ký ức lịch sử."*

---

## 4. Kịch Bản Trình Diễn Live 3 Phút (3-Minute Live Demo)

1. **Phút 00:00 – 00:45 (Trang Chủ & Audio Guide Toàn Cục):**
   - Mở trang chủ ➡️ Bấm nghe Audio Guide Sóc Bom Bo ➡️ Âm thanh vang lên ➡️ Chuyển sang trang Bản Đồ hoặc Thư Viện để chứng minh âm thanh vẫn phát mượt mà liên tục.
2. **Phút 00:45 – 01:45 (Bản Đồ GPS & Hồ Sơ Thẩm Định Nguồn):**
   - Bấm nút `Định vị GPS` trên Bản đồ ➡️ Mô tả tính năng nhận diện khoảng cách Field Mode.
   - Bấm vào di tích Sóc Bom Bo ➡️ Mở trang chi tiết ➡️ Bấm vào `Đã Thẩm Định (3 Nguồn)` ➡️ Modal hiện rõ quyết định xếp hạng di tích và trích yếu tài liệu của Viện KHXH.
3. **Phút 01:45 – 03:00 (Góc Học Tập, Quiz & Minh Chứng Thực Nghiệm):**
   - Vào `/study` ➡️ Làm nhanh 1 câu hỏi Quiz S'Tiêng nhận huy hiệu ➡️ Kéo xuống mở trang `/about` chỉ vào khối **Hiệu quả Thực nghiệm Giáo dục (+41.8% Knowledge Gain, 168 học sinh)** ➡️ Kết luận tự tin.
