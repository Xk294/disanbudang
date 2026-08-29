// =========================================================
// DATA — BẢO TÀNG SỐ HIỆN VẬT DI SẢN (HERITAGE ARTIFACTS)
// =========================================================

import type { Artifact } from '~/types/virtualTour'

export const ARTIFACTS: Record<string, Artifact> = {
  'dan-da-soc-bom-bo': {
    id: 'dan-da-soc-bom-bo',
    name: 'Đàn Đá Cổ Bù Đăng',
    subtitle: 'Nhạc khí cổ đại nghìn năm tuổi của cư dân tiền sử Đông Nam Bộ',
    category: 'Nhạc khí cổ truyền',
    description: 'Bộ đàn đá gồm các thanh đá rhyolite nguyên khối được ghè đẽo tỉ mỉ với độ dày mỏng khác nhau, phát ra thang âm huyền ảo, vang vọng như tiếng thác đổ và sấm rền giữa đại ngàn Tây Nguyên — Đông Nam Bộ.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    ],
    period: 'Hậu kỳ đồ đá mới — Sơ kỳ đồ đồng (~3.000 năm trước)',
    material: 'Đá phiến sừng tự nhiên (Rhyolite / Hornfels)',
    dimensions: 'Thanh lớn nhất: 112cm x 18cm x 4.5cm, nặng 14.8kg',
    usage: 'Sử dụng trong các nghi lễ hiến tế mẫu hệ, lễ cầu mùa, mừng lúa mới và các sự kiện hệ trọng của cộng đồng buôn sóc.',
    origin: 'Phát hiện tại thung lũng sông Đồng Nai — vùng đất Bù Đăng',
    preservationPlace: 'Nhà Truyền Thống Khu Bảo Tồn Văn Hóa Sóc Bom Bo',
    historicalSignificance: 'Minh chứng cho sự phát triển đỉnh cao về cảm thụ âm nhạc và kỹ nghệ chế tác đá của cư dân cổ bản địa. Đây là một trong những bảo vật văn hóa phi vật thể và vật thể biểu tượng của đồng bào S\'Tiêng.',
    specifications: [
      { label: 'Số lượng thanh', value: '11 thanh đá nguyên bản' },
      { label: 'Thang âm', value: 'Ngũ cung cổ truyền Tây Nguyên' },
      { label: 'Kỹ thuật chế tác', value: 'Ghè đẽo hai mặt, chỉnh âm bằng gõ thử nghiệm' },
      { label: 'Tình trạng', value: 'Bảo tồn nguyên vẹn 100%' },
    ],
    model3dUrl: '', // Sẵn sàng nhận file .glb/.gltf sau này
  },

  'cong-chieng-stieng': {
    id: 'cong-chieng-stieng',
    name: 'Bộ Cồng Chiêng S\'Tiêng 6 Chiếc (Chinh Chiêng)',
    subtitle: 'Linh hồn trong mọi lễ hội và đời sống tâm linh người S\'Tiêng',
    category: 'Nhạc khí đồng',
    description: 'Dàn cồng chiêng cổ gồm 6 chiếc với các kích thước và âm vực phân tầng chặt chẽ từ chiêng mẹ (Mẹ Me) đến chiêng con. Mỗi tiếng chiêng rung lên mang theo thông điệp kết nối giữa con người với thần linh rừng núi.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    ],
    period: 'Thế kỷ XIX — Đầu thế kỷ XX',
    material: 'Hợp kim đồng thau pha thiếc và bạc nguyên chất',
    dimensions: 'Đường kính từ 28cm (chiêng con) đến 62cm (chiêng mẹ)',
    usage: 'Tấu diễn trong Lễ Cầu Mùa, Lễ Đâm Trâu, Lễ Mừng Nhà Dài Mới và ngày hội đại đoàn kết buôn sóc.',
    origin: 'Lưu truyền qua 4 thế hệ nghệ nhân già làng Sóc Bom Bo',
    preservationPlace: 'Khu Trưng Bày Văn Hóa Dân Tộc S\'Tiêng — Bù Đăng',
    historicalSignificance: 'Không gian văn hóa Cồng Chiêng là kiệt tác di sản truyền khẩu và phi vật thể của nhân loại. Bộ chiêng 6 chiếc phản ánh trật tự gia đình mẫu hệ và tín ngưỡng vạn vật hữu linh.',
    specifications: [
      { label: 'Bộ chiêng', value: '6 chiếc (gồm cồng có núm và chiêng bằng)' },
      { label: 'Cách gõ', value: 'Dùng dùi gỗ bọc vải hoặc nắm tay trần' },
      { label: 'Âm sắc', value: 'Trầm vang, ngân dài, giàu độ bồi âm' },
    ],
    model3dUrl: '',
  },

  'coi-chay-doi-bom-bo': {
    id: 'coi-chay-doi-bom-bo',
    name: 'Bộ Cối Chày Đôi Gỗ Lim Nguyên Khối',
    subtitle: 'Chứng tích hào hùng thời kỳ giã gạo nuôi quân thâu đêm',
    category: 'Nông cụ & Hiện vật lịch sử',
    description: 'Bộ cối chày đôi bằng gỗ lim cổ thụ đã cùng các bà, các mẹ người S\'Tiêng thức trọn những đêm không ngủ, nhịp nhàng 2 người 4 tay chày giã từng hạt lúa rẫy phục vụ chiến dịch Đồng Xoài năm 1965.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    period: 'Kháng chiến chống Mỹ (1960 — 1975)',
    material: 'Gỗ lim xẹt nguyên khối đẽo thủ công',
    dimensions: 'Cối cao 75cm, đường kính miệng 45cm; Chày dài 1.65m',
    usage: 'Giã lúa rẫy thành gạo trắng cung cấp lương thực cho bộ đội tiền tuyến.',
    origin: 'Sóc Bom Bo cổ, xã Bom Bo, huyện Bù Đăng',
    preservationPlace: 'Di tích Lịch sử Chiến thắng Sóc Bom Bo',
    historicalSignificance: 'Biểu tượng bất diệt cho lòng quả cảm, thủy chung với cách mạng của đồng bào S\'Tiêng. Hình ảnh tiếng chày trên sóc Bom Bo đã đi vào thi ca và âm nhạc bất hủ của dân tộc.',
    specifications: [
      { label: 'Khối lượng cối', value: '~48 kg' },
      { label: 'Chày giã', value: 'Cặp chày đôi gỗ lõi dẻo dai' },
      { label: 'Năng suất', value: '20 kg lúa/giờ nhịp giã liên hoàn' },
    ],
    model3dUrl: '',
  },

  'gui-tho-cam-ruou-can': {
    id: 'gui-tho-cam-ruou-can',
    name: 'Gùi Thổ Cẩm & Bình Rượu Cần Men Rừng',
    subtitle: 'Vật dụng gắn bó trọn đời người S\'Tiêng từ nương rẫy đến hội làng',
    category: 'Văn hóa sinh hoạt',
    description: 'Chiếc gùi mây tre đan tinh xảo có dây đeo bằng vỏ cây rừng kết hợp với chóe gốm men da lươn ủ rượu cần bằng men lá cây rừng độc đáo, phản ánh đời sống gắn bó chan hòa với thiên nhiên.',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80',
    period: 'Thế kỷ XX',
    material: 'Mây rừng, tre lồ ô, gốm men da lươn cổ, men rễ cây thảo dược',
    dimensions: 'Gùi cao 60cm, Chóe rượu dung tích 15 lít',
    usage: 'Gùi nông sản lên nương; mời rượu cần kết nghĩa anh em và đãi khách quý.',
    origin: 'Cộng đồng buôn làng S\'Tiêng Bù Đăng',
    preservationPlace: 'Không gian văn hóa Sóc Bom Bo',
    historicalSignificance: 'Mỗi họa tiết thổ cẩm dệt trên quai gùi và vị ngọt nồng của men lá rừng là bí quyết truyền đời gìn giữ bản sắc văn hóa thảo nguyên Đông Nam Bộ.',
    specifications: [
      { label: 'Kỹ thuật đan', value: 'Đan lóng ba, lóng năm khít chống nước rỉ' },
      { label: 'Men ủ rượu', value: '18 loại lá và vỏ cây rừng dược liệu' },
    ],
    model3dUrl: '',
  },
}
