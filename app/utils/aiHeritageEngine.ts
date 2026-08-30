import { HERITAGES } from '~/data/heritages'
import { CATEGORIES } from '~/data/categories'
import { CLUSTERS } from '~/data/clusters'
import { VIRTUAL_TOURS } from '~/data/virtualTours'

export interface AiResponse {
  answer: string
  suggestions: string[]
  relatedLinks?: { title: string; url: string; icon?: string }[]
}

// Helper: Normalize Vietnamese string for robust accent-free matching
export function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Comprehensive offline Knowledge Base
interface KnowledgeEntry {
  id: string
  title: string
  keywords: string[]
  intent: 'heritage' | 'culture' | 'cuisine' | 'investment' | 'travel' | 'tech' | 'history'
  answerTemplate: () => string
  followUps: string[]
  links?: { title: string; url: string; icon?: string }[]
}

export const KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  // --- 1. LỊCH SỬ & CĂN CỨ CÁCH MẠNG ---
  {
    id: 'chien-khu-d',
    title: 'Chiến Khu Đ',
    keywords: ['chien khu d', 'chien khu đ', 'can cu chien khu', 'can cu d', 'khang chien d', 'dau nao cach mang'],
    intent: 'history',
    answerTemplate: () => `🏛️ **Chiến Khu Đ — Căn cứ địa bất khả xâm phạm miền Đông Nam Bộ:**
• **Vị trí & Địa thế:** Nằm giữa lòng rừng già nguyên sinh hiểm trở nối liền Đồng Nai – Bình Dương – Bình Phước, là căn cứ đầu não của Trung ương Cục miền Nam và Bộ Tư lệnh miền Đông.
• **Ý nghĩa lịch sử:** Là biểu tượng của ý chí quật cường *"Đi không dấu, nấu không khói, nói không tiếng"*, gắn liền với phong trào nuôi giấu bộ đội kiên trung của đồng bào S'tiêng, Châu Mạ.
• **Điểm nổi bật:** Địa đạo, bếp Hoàng Cầm, di tích hầm chỉ huy, hệ thống suối tự nhiên che chắn quân đội trong suốt 2 cuộc kháng chiến chống Pháp và chống Mỹ.`,
    followUps: ['Căn cứ Nửa Lon là gì?', 'Sóc Bom Bo có liên quan gì Chiến Khu Đ?', 'Lộ trình tham quan các di tích cách mạng'],
    links: [
      { title: 'Bản đồ di tích lịch sử', url: '/map?filter=lich-su', icon: 'mdi:map-marker-radius' },
      { title: 'Khám phá Di Tích Kháng Chiến', url: '/explore?category=lich-su', icon: 'mdi:shield-cross' }
    ]
  },
  {
    id: 'can-cu-nua-lon',
    title: 'Căn cứ Kháng chiến Nửa Lon Bù Đăng',
    keywords: ['nua lon', 'can cu nua lon', 'nua lon bu dang', 'khau phan nua lon', 'doi nua lon', '1960 1965'],
    intent: 'history',
    answerTemplate: () => `🎖️ **Căn cứ Kháng chiến Nửa Lon Bù Đăng (1960–1965):**
• **Huyền thoại tên gọi:** Vào những năm 1960–1965 gian khổ nhất, đường tiếp tế bị phong tỏa, mỗi cán bộ chiến sĩ và đồng bào chỉ ăn đúng **nửa lon gạo mỗi ngày** để dành lương thực cho bộ đội tiền tuyến.
• **Ý nghĩa:** Biểu tượng sáng ngời cho tinh thần tương thân tương ái, ý chí sắt đá và tình đoàn kết keo sơn quân - dân vùng cao nguyên.
• **Tầm vóc:** Là mắt xích huyết mạch đầu tuyến hành lang chiến lược Bắc - Nam nối liền đường mòn Hồ Chí Minh lịch sử.`,
    followUps: ['Đồng bào S\'tiêng giã gạo như thế nào?', 'Xem vị trí Căn cứ Nửa Lon trên bản đồ', 'Lễ hội Mừng Lúa Mới'],
    links: [
      { title: 'Chi tiết di tích Căn cứ Nửa Lon', url: '/heritage/can-cu-nua-lon-bu-dang', icon: 'mdi:book-open-page-variant' },
      { title: 'Định vị GPS Căn cứ Nửa Lon', url: '/map?target=hrt-001', icon: 'mdi:crosshairs-gps' }
    ]
  },
  {
    id: 'soc-bom-bo',
    title: 'Di tích Lịch sử Sóc Bom Bo',
    keywords: ['soc bom bo', 'bom bo', 'gia gao', 'duoc lo o', 'tieng chay tren soc bom bo', 'dieu len', 'xuan hong', 'dong xoai 1965'],
    intent: 'heritage',
    answerTemplate: () => `🥁 **Sóc Bom Bo — Bản trường ca giã gạo nuôi quân đại ngàn:**
• **Địa danh huyền thoại:** Thuộc xã Bình Minh, Bù Đăng, nơi đồng bào S'tiêng giã gạo thâu đêm dưới ánh đuốc lồ ô tiếp tế lương thực cho chiến dịch Đồng Xoài (1965).
• **Nguồn cảm hứng:** Đi vào lịch sử và âm nhạc bất hủ qua bài hát *"Tiếng chày trên sóc Bom Bo"* của cố nhạc sĩ Xuân Hồng.
• **Trải nghiệm hiện tại:** Khu bảo tồn văn hóa Sóc Bom Bo với Nhà Dài truyền thống, khu biểu diễn cồng chiêng, phục dựng cối giã gạo đôi và thưởng thức rượu cần Đ'rắp S'lung.`,
    followUps: ['Trải nghiệm Tour 360° Sóc Bom Bo', 'Nghệ thuật Cồng chiêng S\'tiêng', 'Ẩm thực Canh thụt & Cơm lam'],
    links: [
      { title: 'Xem Tour 360° Sóc Bom Bo', url: '/explore/virtual-tour', icon: 'mdi:video-360' },
      { title: 'Khám phá văn hóa Sóc Bom Bo', url: '/heritage/soc-bom-bo-huyen-thoai', icon: 'mdi:landmark' }
    ]
  },
  {
    id: 'doc-31-phuoc-thanh',
    title: 'Di tích Dốc 31 & Căn cứ Phước Thành',
    keywords: ['doc 31', 'can cu phuoc thanh', 'tinh uy phuoc thanh', 'chien thang doc 31', 'duong 14'],
    intent: 'history',
    answerTemplate: () => `🚩 **Di tích Lịch sử Dốc 31 & Căn cứ Tỉnh ủy Phước Thành:**
• **Chiến công oanh liệt:** Nằm trên tuyến Quốc lộ 14 huyết mạch, nơi ghi dấu những trận phục kích tiêu diệt đoàn xe quân sự địch, bẻ gãy các cuộc càn quét lớn.
• **Căn cứ Tỉnh ủy Phước Thành:** Nơi lưu giữ cơ quan đầu não chỉ đạo phong trào đấu tranh cách mạng kiên cường của nhân dân các dân tộc vùng Đông Nam Bộ.`,
    followUps: ['Chiến Khu Đ là gì?', 'Tour 1 ngày khám phá di tích lịch sử', 'Các câu hỏi ôn tập lịch sử'],
    links: [
      { title: 'Trắc nghiệm kiến thức lịch sử', url: '/study', icon: 'mdi:school' }
    ]
  },

  // --- 2. DANH THẮNG & THIÊN NHIÊN ---
  {
    id: 'trang-co-bu-lach',
    title: 'Quần thể Trảng Cỏ Bù Lạch',
    keywords: ['trang co', 'bu lach', 'trang co bu lach', 'dong co', 'cam trai bu lach', 'ho bu lach', 'thien nhien bu dang'],
    intent: 'heritage',
    answerTemplate: () => `🌲 **Quần thể Trảng cỏ Bù Lạch — Tuyệt tác thiên nhiên hoang sơ:**
• **Quy mô:** Gần **500 ha** với gần **20 trảng cỏ** xanh mướt tự nhiên bao quanh một hồ nước trong vắt phẳng lặng giữa đại ngàn.
• **Hiện tượng kỳ thú:** Cỏ kim tự nhiên mọc đều như thảm nhung, chỉ có một loài cỏ đơn nhất xanh rì quanh năm xen kẽ rừng nguyên sinh cổ thụ.
• **Trải nghiệm đỉnh cao:** Cắm trại qua đêm ngắm dải ngân hà, chèo SUP trên hồ, đón bình minh sương mờ và thưởng thức gà nướng muối ớt rừng.`,
    followUps: ['Kinh nghiệm cắm trại Trảng cỏ Bù Lạch', 'Thác Đứng có gần Trảng cỏ không?', 'Thời điểm đi Bù Đăng đẹp nhất'],
    links: [
      { title: 'Xem chi tiết Trảng Cỏ Bù Lạch', url: '/heritage/trang-co-bu-lach', icon: 'mdi:pine-tree' },
      { title: 'Chỉ đường GPS tới Trảng Cỏ', url: '/map?target=hrt-005', icon: 'mdi:navigation' }
    ]
  },
  {
    id: 'thac-dung-thac-voi',
    title: 'Hệ thống Thác Đứng & Thác Voi',
    keywords: ['thac dung', 'thac voi', 'thac nuoc', 'thac pan toong', 'thac bu dang', 'thac dung bu dang'],
    intent: 'heritage',
    answerTemplate: () => `🌊 **Hệ thống Danh thắng Thác Đứng & Thác Voi hùng vĩ:**
• **Thác Đứng (xã Đoàn Kết):** Dòng thác đổ thẳng đứng từ độ cao hơn 5m qua tầng đá bazan cổ, tung bọt trắng xóa giữa lòng thung lũng xanh rì.
• **Thác Voi (xã Đồng Nai):** Mang vẻ đẹp hoang sơ gắn liền với truyền thuyết đàn voi thần uống nước, làn nước mát lạnh trong veo.
• **Thác Pan Toong:** Điểm đến yêu thích của phượt thủ khám phá thiên nhiên nguyên sinh bí ẩn.`,
    followUps: ['Trảng cỏ Bù Lạch', 'Gợi ý lịch trình 1 ngày tham quan thác', 'Ẩm thực Tây Nguyên có gì ngon?'],
    links: [
      { title: 'Xem danh sách Thác nước & Danh thắng', url: '/explore?category=danh-thang', icon: 'mdi:image-filter-hdr' }
    ]
  },
  {
    id: 'rung-cat-tien-bu-dang',
    title: 'Vườn Quốc Gia Cát Tiên (Phân khu Bù Đăng)',
    keywords: ['cat tien', 'rung cat tien', 'vuon quoc gia', 'sinh thai cat tien', 'dong vat hoang da', 'rung nguyen sinh'],
    intent: 'heritage',
    answerTemplate: () => `🌿 **Vườn Quốc Gia Cát Tiên — Phân khu sinh thái Bù Đăng:**
• **Đa dạng sinh học:** Khu dự trữ sinh quyển thế giới với thảm thực vật nhiệt đới đa tầng, cây tung cổ thụ hàng trăm năm tuổi.
• **Hệ động thực vật:** Thiên đường của chim công, tê giác một sừng (lịch sử), bò tót, vượn đen má vàng và hàng trăm loài lan rừng quý hiếm.
• **Hoạt động:** Trekking băng rừng, đạp xe ngắm động vật hoang dã ban đêm, bảo tồn thiên nhiên.`,
    followUps: ['Trảng cỏ Bù Lạch', 'Cơ hội đầu tư du lịch sinh thái', 'Chỉ đường trên bản đồ'],
    links: [
      { title: 'Khám phá Thiên nhiên Bù Đăng', url: '/explore', icon: 'mdi:compass' }
    ]
  },
  {
    id: 'ho-thac-mo-ba-ra',
    title: 'Hồ Thác Mơ & Núi Bà Rá',
    keywords: ['thac mo', 'ho thac mo', 'nui ba ra', 'ba ra', 'phuoc long', 'thuy dien thac mo'],
    intent: 'heritage',
    answerTemplate: () => `⛰️ **Hồ Thác Mơ & Núi Bà Rá huyền thoại:**
• **Hồ Thác Mơ:** Mặt nước mênh mông hơn 640 ha tạo thành lá phổi xanh điều hòa khí hậu toàn vùng, bao quanh bởi những hòn đảo nhỏ thơ mộng.
• **Núi Bà Rá (733m):** Ngọn núi cao thứ 3 Nam Bộ, nơi đặt cáp treo ngắm toàn cảnh thị xã và di tích Nhà tù Bà Rá kiên trung.`,
    followUps: ['Sóc Bom Bo', 'Chiến Khu Đ', 'Bản đồ du lịch liên vùng'],
    links: [
      { title: 'Chi tiết Hồ Thác Mơ', url: '/heritage/thac-mo-phuoc-long', icon: 'mdi:waves' }
    ]
  },

  // --- 3. BẢN SẮC VĂN HÓA & LỄ HỘI S'TIÊNG ---
  {
    id: 'van-hoa-cong-chieng',
    title: 'Không gian Văn hóa Cồng Chiêng S\'tiêng',
    keywords: ['cong chieng', 'am nhac s tieng', 'tieng chieng', 'dan chieng', 'nghe thuat cong chieng', 'chiec chieng'],
    intent: 'culture',
    answerTemplate: () => `🎵 **Nghệ thuật & Không gian Cồng Chiêng của người S'tiêng:**
• **Báu vật gia tộc:** Dàn cồng chiêng gồm 5–6 chiếc (bộ ngũ) hoặc 12 chiếc, được trao truyền qua nhiều thế hệ như linh hồn buôn sóc.
• **Ý nghĩa tâm linh:** Cầu nối giữa con người với Thần linh (Yang). Tiếng chiêng vang lên lúc trầm hùng khi mừng lúa mới, lúc réo rắt trong ngày hội sum vầy buôn làng.
• **Gìn giữ di sản:** Di sản văn hóa phi vật thể quốc gia được tôn vinh trong các ngày hội văn hóa thể thao các dân tộc thiểu số.`,
    followUps: ['Lễ hội Mừng Lúa Mới', 'Nghề dệt thổ cẩm S\'tiêng', 'Sóc Bom Bo'],
    links: [
      { title: 'Nghe Audio Guide & Thuyết minh', url: '/explore', icon: 'mdi:headphones' }
    ]
  },
  {
    id: 'le-hoi-mung-lua-moi',
    title: 'Lễ hội Mừng Lúa Mới (Tam-pơt-mơ-nhe)',
    keywords: ['mung lua moi', 'tam pot mo nhe', 'le hoi s tieng', 'le hoi', 'le dam trau', 'ta on than yang', 'ruou can'],
    intent: 'culture',
    answerTemplate: () => `🌾 **Lễ hội Mừng Lúa Mới (Tam-pơt-mơ-nhe):**
• **Thời gian:** Diễn ra rộn ràng vào khoảng tháng 10 đến tháng 12 âm lịch, khi những bông lúa rẫy trĩu hạt đã thu hoạch về kho.
• **Nghi thức thiêng liêng:** Già làng chủ trì lễ cúng dâng hạt gạo mới lên Thần Lúa (Yang Sri), cầu mưa thuận gió hòa, buôn làng ấm no.
• **Phần hội rực rỡ:** Uống rượu cần Đ'rắp S'lung bằng cần trúc, múa xoang quanh cây nêu thần linh, thi giã gạo đôi và diễn tấu cồng chiêng thâu đêm.`,
    followUps: ['Nghề dệt thổ cẩm truyền thống', 'Ẩm thực độc đáo của người S\'tiêng', 'Gợi ý thời điểm đi lễ hội'],
    links: [
      { title: 'Xem các bài viết Văn hóa', url: '/news', icon: 'mdi:newspaper-variant-outline' }
    ]
  },
  {
    id: 'det-tho-cam-stieng',
    title: 'Nghề Dệt Thổ Cẩm S\'tiêng',
    keywords: ['det tho cam', 'tho cam', 'ro let', 'khung det', 'hoa van tho cam', 'trang phuc s tieng', 'vay tho cam'],
    intent: 'culture',
    answerTemplate: () => `🧵 **Nghề dệt thổ cẩm Rơ-let truyền thống:**
• **Sự tinh xảo:** Phụ nữ S'tiêng ngồi bệt dùng chân căng khung dệt thủ công tạo nên những tấm vải dệt họa tiết hình học, hoa lá, muông thú sống động.
• **Màu sắc tự nhiên:** Nhuộm hoàn toàn từ cây cỏ rừng (vỏ tràm, lá chàm, củ nghệ rừng, bùn non), bền màu và mang hương thơm cỏ cây đặc trưng.`,
    followUps: ['Lễ hội mừng lúa mới', 'Sóc Bom Bo', 'Mua quà lưu niệm thổ cẩm ở đâu?'],
    links: [
      { title: 'Khám phá văn hóa bản địa', url: '/explore?category=van-hoa-phi-vat-the', icon: 'mdi:palette' }
    ]
  },

  // --- 4. ẨM THỰC & ĐẶC SẢN ĐỊA PHƯƠNG ---
  {
    id: 'dac-san-am-thuc',
    title: 'Ẩm thực & Đặc sản Bù Đăng — Đồng Nai',
    keywords: ['am thuc', 'dac san', 'mon an', 'an gi', 'canh thut', 'com lam', 'hat dieu', 'ruou can', 'sau rieng', 'dot may', 'ga nuong'],
    intent: 'cuisine',
    answerTemplate: () => `🍲 **Khám phá Tinh hoa Ẩm thực Bản địa Bù Đăng:**
1. **Canh thụt ống nứa:** Món ăn độc bản nấu trong ống tre tươi gồm đọt mây đắng thanh, lá nhíp bùi béo, cá suối nướng và ớt xiêm thơm lừng.
2. **Cơm lam & Gà nướng muối ớt rừng:** Hạt nếp nương dẻo thơm nướng than hồng ăn kèm gà đồi săn chắc chấm muối hột tiêu rừng.
3. **Hạt điều rang muối Bù Đăng (OCOP 5 sao):** Thủ phủ hạt điều chất lượng ngon bậc nhất thế giới, hạt to tròn, giòn rụm, ngọt bùi tự nhiên.
4. **Rượu cần Đ'rắp S'lung:** Ủ men lá rừng truyền thống thơm nồng ấm áp tình nghĩa buôn làng.
5. **Sầu riêng Ri6 & Monthong:** Cơm vàng óng, hạt lép béo ngậy trồng trên đất đỏ bazan màu mỡ.`,
    followUps: ['Cách nấu món canh thụt ống nứa', 'Mua hạt điều Bù Đăng ở đâu uy tín?', 'Lịch trình tour trải nghiệm ẩm thực'],
    links: [
      { title: 'Khám phá nét sống cộng đồng', url: '/explore?category=doi-song-cong-dong', icon: 'mdi:silverware-fork-knife' }
    ]
  },

  // --- 5. ĐẦU TƯ, KINH TẾ & QUY HOẠCH PHÁT TRIỂN ---
  {
    id: 'co-hoi-dau-tu',
    title: 'Tiềm năng & Cơ hội Đầu tư Vùng Cao Nguyên',
    keywords: ['dau tu', 'kinh te', 'co hoi dau tu', 'quy hoach', 'cao toc', 'ha tang', 'nong nghiep cong nghe cao', 'uu dai', 'khu cong nghiep'],
    intent: 'investment',
    answerTemplate: () => `💼 **Cơ hội đầu tư chiến lược tại Thành Phố Đồng Nai (Bù Đăng):**
1. **Nông nghiệp công nghệ cao & Chế biến sâu:**
   • Quỹ đất sạch hơn **500 ha** đất đỏ bazan trù phú.
   • Thích hợp hình thành vùng chuyên canh sầu riêng, hạt điều hữu cơ, cao su xuất khẩu đạt chuẩn GlobalGAP.
2. **Du lịch sinh thái nghỉ dưỡng & Di sản:**
   • Dự án trọng điểm Quần thể Trảng cỏ Bù Lạch (500ha), du lịch văn hóa Sóc Bom Bo và Hồ Thác Mơ.
3. **Hạ tầng giao thông liên kết vùng bứt phá:**
   • Tuyến cao tốc **Gia Nghĩa – Chơn Thành** đi qua Bù Đăng kết nối Tây Nguyên với TP.HCM chỉ ~2.5 giờ.
   • Nâng cấp Quốc lộ 14 và các tuyến đường tỉnh kết nối liên hoàn.
4. **Chính sách ưu đãi vượt trội:**
   • Miễn giảm tiền thuê đất, thuế thu nhập doanh nghiệp ưu đãi cao nhất.
   • Cơ chế "Một cửa điện tử liên thông", hỗ trợ giải phóng mặt bằng nhanh chóng.`,
    followUps: ['Xem chi tiết trang Đầu Tư', 'Liên hệ hợp tác xúc tiến đầu tư', 'Quy hoạch khu công nghiệp Minh Hưng'],
    links: [
      { title: 'Cổng Thông Tin Đầu Tư (/invest)', url: '/invest', icon: 'mdi:chart-timeline-variant-shimmer' },
      { title: 'Liên hệ Hợp tác & Xúc tiến', url: '/contact', icon: 'mdi:handshake' }
    ]
  },

  // --- 6. CẨM NANG DU LỊCH & LỘ TRÌNH THỰC TẾ ---
  {
    id: 'lich-trinh-du-lich',
    title: 'Gợi ý Lịch trình Du lịch & Cẩm nang Di chuyển',
    keywords: ['lich trinh', 'tour', 'du lich', 'di bu dang', 'phuong tien', 'xe gi', 'thoi gian dep', 'cam trai', 'khach san', '1 ngay', '2 ngay 1 dem'],
    intent: 'travel',
    answerTemplate: () => `🗺️ **Cẩm nang & Gợi ý Lịch trình Khám phá Bù Đăng hoàn hảo:**

📌 **Lịch trình 1 Ngày: "Theo Dấu Chân Trường Ca Bom Bo"**
• **07:30 - 08:30:** Di chuyển đến Sóc Bom Bo, thưởng thức bữa sáng bánh mì thịt nướng / xôi nếp nương.
• **08:30 - 11:30:** Thăm Nhà Dài, nghe già làng kể chuyện kháng chiến, xem biểu diễn cồng chiêng và thử giã gạo đôi.
• **11:30 - 13:30:** Dùng bữa trưa đặc sản: Cơm lam gà nướng, canh thụt ống nứa, rượu cần.
• **13:30 - 16:30:** Di chuyển đến Trảng Cỏ Bù Lạch, dạo bước trên thảm cỏ xanh, check-in hồ nước thơ mộng.
• **17:00:** Mua quà đặc sản Hạt điều rang muối và trở về.

📌 **Lịch trình 2 Ngày 1 Đêm: "Đêm Đại Ngàn & Cắm Trại Trảng Cỏ"**
• **Ngày 1:** Sóc Bom Bo ➔ Thác Đứng ➔ Dựng lều cắm trại tại Trảng Cỏ Bù Lạch, tiệc BBQ lửa trại ngắm sao.
• **Ngày 2:** Đón bình minh sương mù ➔ Trekking Vườn Quốc Gia Cát Tiên / Hồ Thác Mơ ➔ Mua sắm lưu niệm.

🚗 **Phương tiện di chuyển từ TP.HCM:**
• Đi ô tô/xe máy theo QL13 ➔ ĐT741 ➔ QL14 (~140-160km, ~3 tiếng).
• Xe khách chất lượng cao xuất bến Miền Đông liên tục mỗi ngày.
☀️ **Mùa lý tưởng nhất:** Tháng 11 đến tháng 4 năm sau (Mùa khô mát mẻ, hoa rừng nở rộ, mùa lễ hội).`,
    followUps: ['Trải nghiệm Tour 360° thực tế ảo', 'Xem Bản đồ dẫn đường GPS', 'Ẩm thực có món gì ngon?'],
    links: [
      { title: 'Bản đồ chỉ đường thông minh GPS', url: '/map', icon: 'mdi:map-marker-path' },
      { title: 'Trải nghiệm Virtual Tour 360°', url: '/explore/virtual-tour', icon: 'mdi:cube-scan' }
    ]
  },

  // --- 7. TÍNH NĂNG NỀN TẢNG BẢO TÀNG SỐ ---
  {
    id: 'tinh-nang-website',
    title: 'Hướng dẫn sử dụng Nền tảng Bảo tàng Số DiSanBudang',
    keywords: ['tinh nang', 'website', 'audio guide', 'thuyet minh', '360', 'vr', 'ho chieu', 'passport', 'dong gop', 'bai hoc', 'tro choi'],
    intent: 'tech',
    answerTemplate: () => `✨ **Nền tảng Bảo tàng Số Di sản Bù Đăng cung cấp các tiện ích:**
1. 🕶️ **Virtual Tour 360°:** Khám phá không gian đa chiều toàn cảnh các điểm di tích như đang có mặt trực tiếp.
2. 🗺️ **Bản đồ Di sản Tương tác GPS:** Định vị lộ trình, bán kính tìm kiếm, dẫn đường vệ tinh trực tiếp.
3. 🎧 **Audio Guide Thuyết minh Đa giọng đọc:** Lắng nghe câu chuyện di sản truyền cảm hứng ngay tại mỗi điểm đến.
4. 📜 **Góc Học Tập & Hộ Chiếu Di Sản:** Tham gia bài học lịch sử, thi trắc nghiệm thử thách nhận huy hiệu số.
5. 🤝 **Cộng đồng Đóng góp Tư liệu:** Chia sẻ hình ảnh, ký ức và hiện vật của địa phương đến cộng đồng.`,
    followUps: ['Mở Tour 360°', 'Mở Bản đồ GPS', 'Làm bài thi Trắc nghiệm Hộ chiếu Di sản'],
    links: [
      { title: 'Trải nghiệm Không gian 360°', url: '/explore/virtual-tour', icon: 'mdi:eye-circle-outline' },
      { title: 'Tham gia Trắc Nghiệm Di Sản', url: '/study', icon: 'mdi:certificate' },
      { title: 'Gửi Đóng Góp Tư Liệu', url: '/contribute', icon: 'mdi:upload' }
    ]
  }
]

// Natural language query processor with dynamic Heritage dataset lookup
export function processAiQuery(rawQuery: string): AiResponse {
  const normQuery = normalizeVietnamese(rawQuery)
  const tokens = normQuery.split(' ').filter(t => t.length > 1)

  if (!rawQuery.trim()) {
    return {
      answer: 'Xin chào! Bạn có thể hỏi tôi bất cứ điều gì về lịch sử, danh thắng, văn hóa S\'tiêng, ẩm thực hoặc cơ hội đầu tư tại Bù Đăng!',
      suggestions: ['⚔️ Chiến Khu Đ là gì?', '🥁 Sóc Bom Bo huyền thoại', '🌲 Trảng cỏ Bù Lạch', '💼 Cơ hội đầu tư']
    }
  }

  // 1. Direct match on HERITAGES dataset by slug, title, tags or description
  const matchedHeritages = HERITAGES.filter(h => {
    const normTitle = normalizeVietnamese(h.title)
    const normSlug = h.slug.replace(/-/g, ' ')
    const normSubtitle = normalizeVietnamese(h.subtitle || '')
    const tagMatches = h.tags?.some(t => normQuery.includes(normalizeVietnamese(t)))

    return normQuery.includes(normTitle) ||
           normTitle.includes(normQuery) ||
           normQuery.includes(normSlug) ||
           normSubtitle.includes(normQuery) ||
           tagMatches
  })

  // 2. Score knowledge entries
  let bestEntry: KnowledgeEntry | null = null
  let highestScore = 0

  for (const entry of KNOWLEDGE_ENTRIES) {
    let score = 0

    // Keyword match
    for (const kw of entry.keywords) {
      const normKw = normalizeVietnamese(kw)
      if (normQuery.includes(normKw)) {
        score += 15
      } else {
        const kwTokens = normKw.split(' ')
        const matchedTokens = kwTokens.filter(t => tokens.includes(t))
        if (matchedTokens.length === kwTokens.length && kwTokens.length > 0) {
          score += 10
        } else if (matchedTokens.length > 0) {
          score += matchedTokens.length * 2
        }
      }
    }

    if (score > highestScore) {
      highestScore = score
      bestEntry = entry
    }
  }

  // If we matched a specific heritage in the official database with high relevance
  const h = matchedHeritages[0]
  if (h && highestScore < 12) {
    const catName = CATEGORIES.find(c => c.id === h.category)?.label || 'Di sản địa phương'
    const clusterName = CLUSTERS.find(c => c.id === h.cluster)?.label || 'Khu vực Bù Đăng'

    const answer = `📍 **${h.title}**
*${h.subtitle}*

• **Phân loại:** ${catName} | **Cụm:** ${clusterName}
• **Tọa độ GPS:** ${h.coordinates.lat.toFixed(4)}, ${h.coordinates.lng.toFixed(4)}
• **Tổng quan:** ${h.shortDescription}

${h.quickFacts && h.quickFacts.length > 0 ? '✨ **Thông tin nổi bật:**\n' + h.quickFacts.map(f => `  - **${f.label}:** ${f.value}`).join('\n') : ''}

👉 Bạn có thể xem chi tiết bài thuyết minh đầy đủ, ảnh chất lượng cao hoặc nghe Audio Guide tại trang riêng của di tích!`

    return {
      answer,
      suggestions: [
        '🗺️ Mở vị trí trên bản đồ GPS',
        '🎧 Nghe thuyết minh Audio Guide',
        '🌲 Tìm các di sản lân cận'
      ],
      relatedLinks: [
        { title: `Xem chi tiết ${h.title}`, url: `/heritage/${h.slug}`, icon: 'mdi:arrow-right-circle' },
        { title: 'Định vị trên Bản Đồ Di Sản', url: `/map?target=${h.id}`, icon: 'mdi:map-marker-radius' }
      ]
    }
  }

  // If a high-confidence knowledge base entry was found
  if (bestEntry && highestScore >= 6) {
    return {
      answer: bestEntry.answerTemplate(),
      suggestions: bestEntry.followUps,
      relatedLinks: bestEntry.links
    }
  }

  // General intelligent fallback based on intent tokens
  if (normQuery.includes('chao') || normQuery.includes('hi') || normQuery.includes('hello') || normQuery.includes('ai day')) {
    return {
      answer: `👋 **Xin chào! Tôi là Trợ Lý AI Bảo Tàng Số Di Sản Bù Đăng.**
Tôi đã được nạp toàn bộ cơ sở dữ liệu về:
• **16+ Di tích & Thắng cảnh:** Căn cứ Nửa Lon, Chiến Khu Đ, Sóc Bom Bo, Trảng cỏ Bù Lạch, Thác Đứng...
• **Văn hóa S'tiêng:** Cồng chiêng, Dệt thổ cẩm, Lễ hội Mừng lúa mới, Rượu cần Đ'rắp S'lung...
• **Ẩm thực bản địa:** Canh thụt, Cơm lam, Gà nướng muối ớt, Hạt điều OCOP 5 sao...
• **Đầu tư & Quy hoạch:** Đất sạch nông nghiệp công nghệ cao, tuyến cao tốc Gia Nghĩa - Chơn Thành...

Hãy chọn một chủ đề bạn quan tâm hoặc nhập câu hỏi trực tiếp nhé!`,
      suggestions: [
        '⚔️ Chiến Khu Đ là gì?',
        '🥁 Kể tôi nghe về Sóc Bom Bo',
        '🍲 Ẩm thực Bù Đăng có gì ngon?',
        '💼 Tiềm năng đầu tư Bù Đăng'
      ]
    }
  }

  // Broad search with all available knowledge synthesis
  return {
    answer: `💡 Cảm ơn câu hỏi của bạn về **"${rawQuery}"**.
Hệ thống Bảo tàng Số Di sản Bù Đăng ghi nhận thông tin liên quan đến vùng đất giàu truyền thống cách mạng và cảnh quan sinh thái nguyên sơ của Bù Đăng — Đồng Nai.

📌 **Một số gợi ý tìm kiếm nhanh bạn có thể thử:**
• **Di tích lịch sử:** *Chiến Khu Đ, Căn cứ Nửa Lon, Sóc Bom Bo, Dốc 31*
• **Danh thắng sinh thái:** *Trảng cỏ Bù Lạch, Thác Đứng, Vườn Quốc Gia Cát Tiên, Hồ Thác Mơ*
• **Bản sắc văn hóa:** *Không gian cồng chiêng, Dệt thổ cẩm, Lễ hội Mừng lúa mới*
• **Đặc sản:** *Hạt điều Bù Đăng, Canh thụt, Cơm lam, Rượu cần*
• **Đầu tư & Du lịch:** *Cơ hội đầu tư nông nghiệp cao, Tour 1 ngày, Bản đồ GPS*`,
    suggestions: [
      '⚔️ Di tích Căn cứ Nửa Lon',
      '🌲 Quần thể Trảng cỏ Bù Lạch',
      '🍲 Canh thụt & Cơm lam ống nứa',
      '🗺️ Lịch trình du lịch 1 ngày'
    ],
    relatedLinks: [
      { title: 'Khám phá tất cả di sản', url: '/explore', icon: 'mdi:compass-outline' },
      { title: 'Mở Bản đồ Di Sản GPS', url: '/map', icon: 'mdi:map-marker' },
      { title: 'Trải nghiệm Tour 360°', url: '/explore/virtual-tour', icon: 'mdi:video-360' }
    ]
  }
}
