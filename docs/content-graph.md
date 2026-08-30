# KIẾN TRÚC ĐỒ THỊ NỘI DUNG (CONTENT GRAPH ARCHITECTURE)
**Bảo Tàng Số Di Sản Văn Hóa & Lịch Sử Bù Đăng**
*Phiên bản: 3.0.0 — Kiến trúc nội dung chuẩn hóa & Đồ thị quan hệ đa chiều*

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE DOCTRINE)

1. **Tuyệt đối không bịa đặt nội dung sự thật (Zero Hallucination)**: Mọi sự kiện lịch sử, tên nhân vật, địa danh, niên đại và chi tiết nghi lễ phải bắt nguồn từ tư liệu lưu trữ, văn bản quyết định xếp hạng di tích, kỷ yếu nghiên cứu dân tộc học hoặc lời kể của nghệ nhân/nhân chứng thực tế tại địa phương.
2. **Không giải quyết "Thin Content" bằng "Fake Word Count"**: Không chèn các câu chữ sáo rỗng, lặp từ hoặc đoạn văn cảm thán vô nghĩa để tăng dung lượng. Mật độ thông tin (information density) và độ chính xác chuyên sâu là thước đo chất lượng hàng đầu.
3. **Phân định ranh giới vai trò nội dung rõ ràng**: Một đối tượng di sản (ví dụ: Sóc Bom Bo) xuất hiện ở nhiều góc nhìn khác nhau nhưng mỗi góc nhìn phục vụ một mục đích chuyên biệt, không sao chép nguyên văn khối văn bản.

---

## 2. HỆ THỐNG 11 MÔ HÌNH THỰC THỂ (11 CONTENT ENTITY MODELS)

| Thực thể | File Type / Interface | Vai trò cốt lõi | Dữ liệu định danh |
| :--- | :--- | :--- | :--- |
| **Heritage** | `HeritageEntity` | Hồ sơ pháp lý, danh mục kiểm kê di sản cấp Quốc gia / Tỉnh | `hrt-001` đến `hrt-016` |
| **Story** | `StoryEntity` | Bài viết chuyên đề, bối cảnh lịch sử sâu sắc, tư liệu báo chí | `news-001` đến `news-006` |
| **Lesson** | `LessonEntity` | Giáo trình số, thẻ ghi nhớ (flashcards), trắc nghiệm tương tác | 10 bài học trong `LESSONS_DATA` |
| **Memory** | `MemoryEntity` | Ký ức cộng đồng, hồi ký nhân chứng, lời kể nghệ nhân bản địa | `post-001` đến `post-006` |
| **Journal** | `JournalEntity` | Nhật ký bảo tồn thực địa, sự kiện cộng đồng, tiến độ dự án | `event-001` đến `event-003`, `flog-001` |
| **Person** | `PersonEntity` | Nhân chứng lịch sử, nghệ nhân nhân dân, danh nhân cách mạng | `CANONICAL_PEOPLE` registry |
| **Place** | `PlaceEntity` | Tọa độ địa lý, không gian văn hóa thực địa, địa danh gốc | `CANONICAL_PLACES` registry |
| **Artifact** | `ArtifactEntity` | Hiện vật 3D, công cụ truyền thống, phục dựng bảo tàng | `ARTIFACTS` (`coi-chay-doi`, `cong-chieng`...) |
| **Media** | `MediaEntity` | Ảnh tư liệu, audio phỏng vấn, video 3D WebP/MP4 | Hệ thống Media CDN đã tối ưu hóa |
| **Source** | `SourceEntity` | Thư mục trích dẫn lưu trữ, sách xuất bản, nghị định xếp hạng | `HERITAGE_SOURCES` mapping |
| **Topic** | `TopicEntity` | Miền tri thức chuẩn hóa (Kháng chiến, Ẩm thực, Thổ cẩm...) | `CANONICAL_TOPICS` registry |

---

## 3. 5 VAI TRÒ NỘI DUNG & CÂU HỎI TRỌNG TÂM (5 CONTENT ROLES)

| Vai trò | Câu hỏi dẫn đường | Định dạng đầu ra | Đối tượng hướng tới |
| :--- | :--- | :--- | :--- |
| **`HERITAGE`** | *"Đây là gì?"* | Hồ sơ di sản, niên đại, căn cứ xếp hạng, bản đồ tọa độ, hình ảnh tổng quan. | Khách tra cứu, cơ quan quản lý, nhà nghiên cứu |
| **`STORY`** | *"Điều gì đáng kể sâu hơn?"* | Bối cảnh ra đời, nguồn gốc ca khúc, kỹ thuật chế tác thảo mộc, phóng sự chuyên sâu. | Độc giả phổ thông, người yêu văn hóa |
| **`LESSON`** | *"Tôi học được gì?"* | Tóm tắt cốt lõi (TL;DR), dòng thời gian, thuật ngữ, flashcards, bài tập trắc nghiệm & tự luận. | Học sinh, sinh viên, giáo viên địa phương |
| **`MEMORY`** | *"Con người nhớ điều này thế nào?"* | Hồi ức cá nhân, ký ức tuổi thơ bên bếp lửa, lời tâm sự của nghệ nhân già. | Cộng đồng bản địa, nhà nhân học |
| **`JOURNAL`** | *"Dự án đang làm gì?"* | Báo cáo điền dã, nhật ký số hóa 3D, sự kiện lễ hội, cập nhật tiến độ bảo tàng. | Nhóm tác giả dự án, cộng đồng theo dõi |

---

## 4. MA TRẬN ĐỒ THỊ QUAN HỆ (RELATION GRAPH MATRIX)

```
                       ┌──────────────┐
                       │    TOPIC     │
                       └──────┬───────┘
                              │
               ┌──────────────┼──────────────┐
               │              │              │
        ┌──────▼──────┐┌──────▼──────┐┌──────▼──────┐
        │  HERITAGE   ││   PERSON    ││    PLACE    │
        └──────┬──────┘└──────┬──────┘└──────┬──────┘
               │              │              │
       ┌───────┼──────────────┼──────────────┼───────┐
       │       │              │              │       │
┌──────▼──┐┌───▼─────┐ ┌──────▼─────┐ ┌──────▼────┐┌─▼────────┐
│  STORY  ││ LESSON  │ │   MEMORY   │ │  ARTIFACT ││ JOURNAL  │
└──────┬──┘└───┬─────┘ └──────┬─────┘ └──────┬────┘└─┬────────┘
       │       │              │              │       │
       └───────┴──────────────┼──────────────┴───────┘
                              │
                       ┌──────▼───────┐
                       │SOURCE & MEDIA│
                       └──────────────┘
```

Mỗi cạnh trong đồ thị (`GraphEdge`) được gán trọng số từ **0 đến 100** và lưu vết hai chiều trong `app/data/contentGraph.ts`.

---

## 5. CANONICAL CONTENT & SOURCE REGISTRY

Tất cả các dữ liệu sự kiện chuẩn được lưu tập trung tại `app/data/canonicalRegistry.ts` với cấu trúc:
- `factId`: Mã sự thật duy nhất (VD: `fact-bombo-1965`, `fact-bara-height`, `fact-phuoclong-liberation`).
- `value`: Giá trị sự thật chính xác.
- `sourceIds`: Danh sách nguồn tài liệu tham chiếu từ `HERITAGE_SOURCES`.
- `verificationStatus`: `archival_confirmed` (Lưu trữ xác nhận) | `verified` (Đã kiểm chứng) | `field_attested` (Nhân chứng thực địa) | `unverified`.
- `conflictStatus`: `none` (Không tranh chấp) | `disputed` (Còn ý kiến khác nhau) | `resolved` (Đã giải quyết theo văn bản mới nhất).

---

## 6. KIỂM TOÁN TRÙNG LẶP NỘI DUNG (CONTENT DUPLICATION AUDIT)

| Cặp thực thể liên quan | Tình trạng trước Phase 3 | Phương án xử lý chuẩn hóa | Kết quả sau xử lý |
| :--- | :--- | :--- | :--- |
| **Sóc Bom Bo** (`hrt-011` vs `news-003` vs `soc-bom-bo` lesson vs `post-001`) | Trùng lặp đoạn văn mô tả cảnh giã gạo nuôi quân 1965 giữa các trang. | **Phân vai chuẩn**: `hrt-011` giữ hồ sơ bảo tồn; `news-003` tập trung phân tích âm nhạc Xuân Hồng; `soc-bom-bo` phục vụ giảng dạy trắc nghiệm; `post-001` giữ cảm xúc hồi ức tiếng chiêng. | Triệt tiêu 100% trùng lặp khối văn bản. |
| **Chiến Khu Đ** (`hrt-005` vs `chien-khu-d` lesson) | Sao chép danh sách mốc thời gian kháng chiến. | **Dời & Tách lớp**: `hrt-005` ghi nhận giá trị di tích cách mạng; `chien-khu-d` chuẩn hóa thành dòng thời gian tương tác và câu hỏi tư duy. | Single source of truth. |
| **Lesson Data Object** (`lesson/[id].vue`) | Nhúng trực tiếp 950 dòng code dữ liệu bài học ngay trong Vue template. | **Tách tầng Data**: Trích xuất toàn bộ sang `app/data/lessons.ts`. | Vue component giảm từ 1213 dòng xuống 140 dòng sạch đẹp, tăng tốc độ render. |

---

## 7. THUẬT TOÁN NỘI DUNG LIÊN QUAN TỰ NHIÊN (DETERMINISTIC RELATED CONTENT)

Thuật toán `getDeterministicRelatedContent(entityId, entityType, options)` tính toán điểm trọng số theo quy tắc:
1. **Đường nối trực tiếp trong đồ thị (`GRAPH_ADJACENCY`)**: `+40 * (weight / 100)` điểm.
2. **Cùng Cụm di sản trực tiếp (`heritageId`)**: `+35` điểm.
3. **Cùng Không gian địa lý / Tuyến du lịch (`clusterId`)**: `+25` điểm.
4. **Cùng Miền tri thức / Chủ đề kiến thức (`topicId`)**: `+20` điểm.
5. **Cùng Nhân vật lịch sử / Địa danh liên quan**: `+20` điểm.
6. **Cùng Phân loại di sản / Thể loại bài viết**: `+15` điểm.
7. **Cùng Nguồn tài liệu tham khảo (`sourceId`)**: `+10` điểm.

*Quy tắc giải quyết hòa điểm (Tie-breaking)*: Sắp xếp theo `Score` giảm dần, nếu bằng điểm sắp xếp theo `ID` theo thứ tự chữ cái đảm bảo tính ổn định tuyệt đối (deterministic) không phụ thuộc thời gian hay ngẫu nhiên.

---

## 8. THANG ĐIỂM CHẤT LƯỢNG NỘI DUNG 8 VÉC-TƠ (CONTENT QUALITY SCORE)

Thang đo chất lượng nội dung toàn diện (`ContentQualityScore`) đánh giá từng thực thể dựa trên 8 tiêu chí chuẩn mực:

$$\text{Composite Score} = 0.20E + 0.15U + 0.15S + 0.10F + 0.15D + 0.10M + 0.05R + 0.10C$$

1. **`evidence` (Bằng chứng & Nguồn xác thực - Trọng số 20%)**: Số lượng tài liệu lưu trữ, sách xuất bản và nhân chứng được đối chiếu trong `CANONICAL_FACTS`.
2. **`uniqueness` (Tính độc bản & Góc nhìn riêng - Trọng số 15%)**: Không trùng lặp câu chữ với thực thể khác; chứa góc nhìn văn hóa bản địa riêng biệt.
3. **`specificity` (Độ chi tiết cụ thể - Trọng số 15%)**: Tên riêng tiếng S'tiêng/M'nông, số liệu diện tích, chiều cao, mốc thời gian chính xác (thay vì nói chung chung "từ rất lâu").
4. **`usefulness` (Giá trị thực tế & Giáo dục - Trọng số 10%)**: Cung cấp kiến thức học tập rõ ràng, câu hỏi ôn tập, flashcards, chỉ dẫn tham quan thực tế.
5. **`depth` (Độ sâu bối cảnh - Trọng số 15%)**: Đầy đủ 3 lớp: Nguồn gốc lịch sử, Không gian văn hóa truyền thống và Hiện trạng bảo tồn đương đại.
6. **`media` (Chất lượng tư liệu đa phương tiện - Trọng số 10%)**: Hình ảnh sắc nét đúng thực tế, định dạng WebP, chú thích ảnh rõ ràng, có bản đồ/hiện vật 3D.
7. **`relationship` (Độ kết nối mạng lưới - Trọng số 5%)**: Số lượng liên kết chặt chẽ tới các bài học, địa danh, nhân vật và hiện vật trong đồ thị.
8. **`credibility` (Độ tin cậy & Giải quyết tranh chấp - Trọng số 10%)**: Không chứa phán đoán cảm tính, các tranh chấp niên đại/tên gọi đã được đối chiếu văn bản quy phạm.

### Bảng phân cấp chất lượng (Tier Grading)
- **Diamond Tier ($\ge 90$)**: Nội dung mẫu mực, đầy đủ tư liệu lưu trữ, đa phương tiện chất lượng cao và câu hỏi tương tác.
- **Gold Tier ($80 - 89$)**: Nội dung hoàn chỉnh, nguồn dẫn rõ ràng, kết nối đồ thị đầy đủ.
- **Silver Tier ($70 - 79$)**: Đạt chuẩn hiển thị, có nguồn cơ bản, cần bổ sung thêm hiện vật hoặc ảnh thực địa.
- **Bronze Tier ($< 70$)**: Cần tiếp tục điền dã bổ sung thêm dữ liệu và liên kết.
