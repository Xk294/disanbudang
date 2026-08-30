import type { Heritage } from '~/types'
import { HERITAGE_SOURCES } from '~/data/sources'

export const HERITAGES: Heritage[] = [
  {
    id: 'hrt-001',
    slug: 'can-cu-nua-lon-bu-dang',
    title: 'Căn cứ Kháng chiến Nửa Lon Bù Đăng',
    subtitle: 'Huyền thoại gian lao ấm tình quân dân',
    category: 'lich-su',
    period: 'khang-chien',
    cluster: 'bu-dang',
    archetype: 'historical',
    year: '1960–1965',
    coverImage: '/images/heritage/img-disanbudang/chien-khu-D.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/chien-khu-D.png',
        alt: 'Khu vực di tích Căn cứ Nửa Lon',
        caption: 'Cánh rừng già xưa kia là nơi che giấu căn cứ cách mạng huyền thoại',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8462, lng: 107.1680 },
    shortDescription:
      'Căn cứ Nửa Lon là di tích lịch sử cách mạng nổi bật tại xã Bù Đăng, Thành phố Đồng Nai. Ra đời trong những năm kháng chiến gian khổ (1960–1965), nơi đây gắn liền với tên gọi xúc động khi mỗi cán bộ, chiến sĩ tự nguyện chia khẩu phần đúng nửa lon gạo mỗi ngày để nhường lương thực cho các đoàn quân chi viện và giữ vững hành lang chiến lược Bắc — Nam.',
    longStory: `Nằm sâu trong những cánh rừng già của vùng đất Bù Đăng, di tích Căn cứ Nửa Lon là minh chứng sống động cho ý chí thép và tình đoàn kết keo sơn giữa quân và dân trong cuộc kháng chiến chống Mỹ cứu nước.

Tên gọi "Nửa Lon" thân thương mà oai hùng bắt đầu từ giai đoạn khó khăn nhất của cách mạng miền Nam vào những năm 1960 – 1965. Khi đó, địch phong tỏa gắt gao các tuyến đường mòn, nguồn tiếp tế lương thực từ hậu phương bị đứt đoạn, toàn bộ chiến sĩ và đồng bào dân tộc S'Tiêng tại căn cứ phải đối mặt với nạn đói nghiêm trọng. Để duy trì sức chiến đấu và giữ vững huyết mạch thông tin liên lạc, toàn căn cứ đã thống nhất thực hiện chế độ ăn nghiêm ngặt: mỗi người chỉ dùng đúng nửa lon gạo mỗi ngày, độn thêm củ chụp, củ mài và rau rừng.

Dù trong muôn vàn thiếu thốn, đồng bào dân tộc thiểu số bản địa tại Bù Đăng vẫn một lòng theo Đảng, sẵn sàng nhường từng gùi bắp, giã gạo nuôi quân thâu đêm như tại Sóc Bom Bo để dành những hạt gạo quý giá nhất cho bộ đội chủ lực. Căn cứ Nửa Lon trở thành điểm tựa vững chắc của tuyến hành lang chiến lược nối liền Nam Tây Nguyên với miền Đông Nam Bộ.

Ngày nay, dấu tích chiến khu xưa đã hòa vào màu xanh của những cánh rừng tái sinh và nương rẫy trù phú, nhưng Căn cứ Nửa Lon mãi là địa chỉ đỏ giáo dục truyền thống cách mạng, nhắc nhở thế hệ trẻ về đức hy sinh và lòng kiên trung của cha ông.`,
    contextStory:
      'Trong thế trận liên hoàn của chiến trường miền Đông Nam Bộ giai đoạn 1960–1965, vùng rừng Bù Đăng là cửa ngõ yết hầu tiếp nhận sức người, sức của từ hậu phương miền Bắc và Tây Nguyên chuyển vào Chiến khu Đ. Việc duy trì Căn cứ Nửa Lon trong điều kiện cạn kiệt lương thực đã bảo vệ an toàn cho hàng trăm lượt cán bộ lãnh đạo và đoàn vận tải chiến lược hành quân qua vùng giải phóng.',
    quickFacts: [
      { label: 'Giai đoạn lịch sử', value: '1960–1965', icon: 'mdi:calendar-range' },
      { label: 'Loại hình di tích', value: 'Căn cứ kháng chiến & Trạm giao liên', icon: 'mdi:medal' },
      { label: 'Khẩu phần biểu tượng', value: 'Nửa lon gạo / người / ngày', icon: 'mdi:food-variant' },
      { label: 'Vị trí địa lý', value: 'Vùng rừng đầu nguồn Bù Đăng', icon: 'mdi:map-marker' },
      { label: 'Chủ thể phối hợp', value: 'Bộ đội chủ lực & Đồng bào S\'Tiêng', icon: 'mdi:account-group' },
    ],
    timeline: [
      {
        year: '1960',
        title: 'Thành lập trạm căn cứ',
        description: 'Căn cứ được thiết lập giữa rừng già Bù Đăng làm điểm trung chuyển và bảo vệ đường dây liên lạc chiến lược.',
      },
      {
        year: '1962',
        title: 'Đỉnh điểm gian lao — Ra đời tên "Nửa Lon"',
        description: 'Tuyến tiếp tế bị địch bao vây, cán bộ chiến sĩ thực hiện khẩu phần nửa lon gạo/ngày kết hợp đào củ rừng để duy trì bám trụ.',
      },
      {
        year: '1965',
        title: 'Phục vụ Chiến dịch Đồng Xoài — Phước Long',
        description: 'Căn cứ trở thành hậu phương tiếp tế lương thực, đạn dược và tải thương phục vụ các chiến dịch lớn.',
      },
      {
        year: '1975',
        title: 'Mốc son toàn thắng',
        description: 'Góp phần giữ vững hành lang thông suốt cho các cánh quân tiến vào giải phóng hoàn toàn miền Nam.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-001',
      curriculumTopic: 'Lịch sử Địa phương — Phong trào Kháng chiến miền Đông Nam Bộ',
      targetAudience: 'Học sinh THCS, THPT & Đoàn viên thanh niên',
      reflectionQuestion:
        'Khẩu phần "nửa lon gạo" trong hoàn cảnh chiến tranh khắc nghiệt phản ánh đức tính và tinh thần gì của người lính cách mạng và đồng bào bản địa Bù Đăng?',
      activitySuggestions: [
        'Vẽ bản đồ hành trình các trạm giao liên kháng chiến qua địa bàn Bù Đăng.',
        'Sưu tầm lời kể nhân chứng cựu chiến binh và già làng về giai đoạn đào củ mài nhường gạo nuôi quân.',
      ],
    },
    locationGuide: {
      accessNote: 'Từ trung tâm xã Bù Đăng đi theo đường liên xã vào khu vực rừng phòng hộ khoảng 12 km. Khuyến cáo đi cùng hướng dẫn viên địa phương hoặc cán bộ kiểm lâm.',
      bestTimeToVisit: 'Mùa khô từ tháng 12 đến tháng 4 năm sau (đường rừng khô ráo, thuận tiện đi bộ dã ngoại).',
      facilities: ['Bia tưởng niệm di tích', 'Bảng chỉ dẫn tọa độ lịch sử'],
    },
    conservationStatus: 'Di tích Lịch sử cấp Tỉnh [CẦN XÁC MINH hồ sơ trích lục khoanh vùng]',
    verificationNote: 'Tọa độ khoanh vùng bảo vệ và số quyết định lưu trữ gốc cần đối chiếu với hồ sơ bảo tàng di tích địa phương.',
    relatedIds: ['hrt-005', 'hrt-011'],
    tags: ['cách mạng', 'lịch sử', 'kháng chiến', 'rừng', 'căn cứ địa', 'Bù Đăng', 'hành lang chiến lược'],
    references: [
      'Ban Tuyên giáo Huyện ủy Bù Đăng. Lịch sử Đảng bộ địa phương.',
      'Viện Lịch sử Quân sự Việt Nam (2015). Lịch sử Kháng chiến chống Mỹ cứu nước vùng Đông Nam Bộ.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-01-15',
    viewCount: 3420,
  },
  {
    id: 'hrt-002',
    slug: 'thac-mo-phuoc-long',
    title: 'Hồ Thác Mơ — Phước Long',
    subtitle: 'Viên ngọc xanh soi bóng núi Bà Rá huyền thoại',
    category: 'danh-thang',
    period: 'hien-dai',
    cluster: 'phuoc-long',
    archetype: 'natural',
    year: 'Địa danh lâu đời',
    coverImage: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
        alt: 'Mặt hồ Thác Mơ',
        caption: 'Hồ Thác Mơ lộng gió lung linh dưới ánh trăng, chân núi Bà Rá',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8578, lng: 107.0192 },
    shortDescription:
      'Hồ Thác Mơ là thắng cảnh thiên nhiên nổi bật thuộc phường Phước Long (khu phố Thác Mơ), Thành phố Đồng Nai — hồ thủy điện trên sông Bé trải rộng gần 640 ha, soi bóng chân núi Bà Rá hùng vĩ, là biểu tượng du lịch sinh thái và nguồn nước ngọt trọng yếu của toàn khu vực.',
    longStory: `Ẩn mình dưới chân núi Bà Rá linh thiêng, Hồ Thác Mơ hiện ra như một tấm gương khổng lồ phản chiếu mây trời và rừng núi hùng vĩ. Hồ thủy điện Thác Mơ được hình thành từ việc ngăn dòng sông Bé, thuộc địa bàn khu phố Thác Mơ, phường Phước Long, Thành phố Đồng Nai, với diện tích mặt hồ hơn 640 ha, là một trong những hồ chứa nước lớn và thơ mộng nhất vùng Đông Nam Bộ.

Người S'Tiêng địa phương từ bao đời nay xem vùng đất Thác Mơ là nơi linh thiêng. Theo truyền thuyết dân gian, nàng Mơ — một cô gái S'Tiêng xinh đẹp và giàu lòng vị tha — đã hóa thân thành dòng nước mát lành để giải cứu buôn làng khỏi đợt hạn hán khốc liệt. Tên gọi Thác Mơ (Dak Mơ) ra đời từ niềm tri ân và ước vọng no ấm muôn đời của cư dân bản địa.

Hệ sinh thái quanh Hồ Thác Mơ vô cùng phong phú. Quần thể thắng cảnh Bà Rá – Thác Mơ kết nối mặt nước rộng lớn với những dải rừng tự nhiên chạy dọc triền núi, tạo nên vùng tiểu khí hậu mát mẻ quanh năm, là điểm hẹn lý tưởng cho các hoạt động nghiên cứu sinh thái học và du lịch dã ngoại bền vững.`,
    contextStory:
      'Hồ Thác Mơ không chỉ giữ vai trò cung cấp nguồn năng lượng điện sạch cho lưới điện quốc gia mà còn là lá phổi điều hòa thủy văn cho lưu vực sông Bé và sông Đồng Nai. Không gian mặt hồ hòa quyện cùng rừng tự nhiên tạo nên cảnh quan sơn thủy hữu tình độc đáo tại cửa ngõ Đông Bắc tỉnh.',
    quickFacts: [
      { label: 'Diện tích mặt hồ', value: 'Hơn 640 ha', icon: 'mdi:waves' },
      { label: 'Vị trí hành chính', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Hệ thống thủy văn', value: 'Hồ chứa sông Bé', icon: 'mdi:water-pump' },
      { label: 'Đặc trưng sinh thái', value: 'Mặt nước liên hoàn dưới chân núi Bà Rá (723m)', icon: 'mdi:image-filter-hdr' },
    ],
    timeline: [
      {
        year: 'Hàng thế kỷ trước',
        title: 'Địa danh trong tâm thức bản địa',
        description: 'Người S\'Tiêng gọi vùng đất là "Dak Mơ" — nguồn nước linh thiêng nuôi dưỡng buôn làng.',
      },
      {
        year: '1991–1995',
        title: 'Xây dựng công trình Thủy điện Thác Mơ',
        description: 'Ngăn dòng sông Bé tạo nên lòng hồ rộng lớn phục vụ phát triển kinh tế xã hội.',
      },
      {
        year: '2010 đến nay',
        title: 'Quy hoạch khu du lịch sinh thái',
        description: 'Bảo tồn hệ sinh thái mặt hồ gắn với di tích lịch sử Núi Bà Rá thành cụm danh thắng trọng điểm.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-003',
      curriculumTopic: 'Địa lý & Môi trường — Tài nguyên Thủy năng và Hệ sinh thái Đất ngập nước',
      targetAudience: 'Học sinh THCS, THPT & Sinh viên khảo sát môi trường',
      reflectionQuestion:
        'Sự kết hợp giữa công trình kỹ thuật thủy điện và cảnh quan tự nhiên Thác Mơ mang lại những giá trị kinh tế và môi trường sinh thái như thế nào cho địa phương?',
      activitySuggestions: [
        'Vẽ sơ đồ dòng chảy sông Bé qua hồ chứa Thác Mơ.',
        'Sưu tầm và ghi chép dị bản truyền thuyết Nàng Mơ của đồng bào S\'Tiêng.',
      ],
    },
    locationGuide: {
      accessNote: 'Đường nhựa ô tô tiếp cận trực tiếp bến thuyền và công viên ven hồ thuộc khu phố Thác Mơ, phường Phước Long.',
      bestTimeToVisit: 'Tháng 9 đến tháng 12 (mặt nước dâng đầy, trời trong xanh, hoàng hôn soi bóng núi Bà Rá đẹp nhất).',
      facilities: ['Bến thuyền tham quan', 'Đường dạo bộ ven hồ', 'Điểm ngắm cảnh ngọn hải đăng hồ'],
    },
    conservationStatus: 'Quần thể Danh lam Thắng cảnh cấp Tỉnh [CẦN XÁC MINH mã số quy hoạch hồ sơ]',
    relatedIds: ['hrt-012', 'hrt-006'],
    tags: ['thiên nhiên', 'hồ nước', 'thủy điện', 'sinh thái', 'S\'tiêng', 'Phước Long', 'sông Bé'],
    references: [
      'Sở Văn hóa, Thể thao và Du lịch (2022). Danh mục thắng cảnh và địa danh du lịch.',
      'Hội đồng Khoa học Địa chí (2018). Địa chí Bình Phước — Phần Danh thắng và Địa chất Thủy văn. NXB Chính trị Quốc gia Sự thật.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-02-01',
    viewCount: 2180,
  },
  {
    id: 'hrt-003',
    slug: 'le-hoi-cong-chieng-stieng',
    title: 'Lễ Hội Cồng Chiêng S\'tiêng',
    subtitle: 'Linh hồn âm nhạc của núi rừng Tây Nguyên',
    category: 'van-hoa-phi-vat-the',
    period: 'hien-dai',
    cluster: 'bom-bo',
    archetype: 'cultural',
    year: 'Lâu đời',
    coverImage: '/images/heritage/img-disanbudang/Cong-chieng.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/Cong-chieng.jpg',
        alt: 'Lễ hội cồng chiêng',
        caption: 'Cồng chiêng vang lên trong đêm lễ hội truyền thống',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8382, lng: 107.1960 },
    shortDescription:
      'Lễ hội Cồng Chiêng là linh hồn văn hóa của người S\'Tiêng vùng đất Bù Đăng — một di sản âm nhạc phi vật thể quý báu cùng chung mạch nguồn với Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO vinh danh, phản ánh mối quan hệ thiêng liêng giữa con người và vũ trụ.',
    longStory: `Trong không gian huyền ảo của đêm rừng Bù Đăng, dưới ánh lửa bập bùng và màn sương đêm che phủ đại ngàn, tiếng cồng chiêng vang lên trầm hùng, lách cách rồi ngân xa, lan tỏa khắp núi đồi như tiếng gọi vang vọng của tổ tiên. Đối với đồng bào dân tộc thiểu số S'Tiêng tại xã Bù Đăng, Thành phố Đồng Nai, cồng chiêng không đơn thuần là một loại nhạc cụ gõ bằng đồng, mà là biểu tượng tinh thần thiêng liêng nhất, là ngôn ngữ duy nhất kết nối thế giới thực tại với thần linh (Yang), kết nối con người với thiên nhiên và vũ trụ bao la.

Theo quan niệm tâm linh lâu đời của người S'Tiêng, mỗi chiếc cồng, chiếc chiêng đều có một vị thần (Yang Ching) ngự trị. Dàn cồng chiêng truyền thống của người S'Tiêng thường gồm bộ 6 chiếc (gọi là Ching), không có núm, được đánh bằng dùi bọc vải hoặc bằng mép bàn tay trần. Độ trầm bổng, ngân vang của từng thang âm đòi hỏi kỹ năng thẩm âm tuyệt đối và sự phối hợp nhịp nhàng giữa các thành viên đội chiêng.

Mỗi dịp trọng đại trong vòng đời người S'Tiêng — từ lễ thổi tai cho trẻ sơ sinh, lễ mừng lúa mới (Yang Sri), đến lễ mừng nhà dài mới — tiếng cồng chiêng đều vang lên như người dẫn đường tâm linh. Nhịp chiêng khi khoan thai lúc dồn dập, dẫn dắt các vòng xoang uyển chuyển của những chàng trai cô gái bản địa quanh cây nêu rực rỡ.`,
    contextStory:
      'Năm 2005, Không gian văn hóa Cồng chiêng Tây Nguyên đã được UNESCO vinh danh là Kiệt tác truyền khẩu và Di sản phi vật thể của nhân loại. Cồng chiêng của người S\'Tiêng tại Bù Đăng cùng chung cội nguồn văn hóa cồng chiêng Trường Sơn — Tây Nguyên, mang phong cách diễn tấu mộc mạc, gần gũi với môi trường rừng nhiệt đới Đông Nam Bộ.',
    quickFacts: [
      { label: 'Biểu biên dàn chiêng', value: 'Bộ 6 chiếc chiêng bằng (Ching)', icon: 'mdi:circle-multiple' },
      { label: 'Cội nguồn văn hóa', value: 'Không gian văn hóa Cồng chiêng Tây Nguyên (UNESCO 2005)', icon: 'mdi:earth' },
      { label: 'Chủ thể di sản', value: 'Cộng đồng người S\'Tiêng Bù Đăng', icon: 'mdi:account-group' },
      { label: 'Thời điểm thực hành', value: 'Lễ mừng lúa mới, lễ hội buôn sóc, nghi lễ vòng đời', icon: 'mdi:fire' },
    ],
    timeline: [
      {
        year: 'Thuở hồng hoang',
        title: 'Khởi nguồn tín ngưỡng Yang Ching',
        description: 'Cồng chiêng gắn liền với đời sống tâm linh, lao động nương rẫy của đồng bào S\'Tiêng.',
      },
      {
        year: '2005',
        title: 'UNESCO công nhận Không gian Cồng chiêng',
        description: 'Không gian văn hóa Cồng chiêng Tây Nguyên được vinh danh là Di sản phi vật thể nhân loại — tạo động lực bảo tồn mạnh mẽ tại Bù Đăng.',
      },
      {
        year: 'Hiện nay',
        title: 'Truyền dạy thế hệ trẻ trong trường học',
        description: 'Các câu lạc bộ cồng chiêng thanh thiếu niên được thành lập tại các trường PTDT Nội Trú và nhà văn hóa xã Bom Bo.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-002',
      curriculumTopic: 'Âm nhạc Dân tộc & Giáo dục Văn hóa Bản địa',
      targetAudience: 'Học sinh các cấp, nhà nghiên cứu âm nhạc dân tộc',
      reflectionQuestion:
        'Tại sao trong quan niệm của người S\'Tiêng, cồng chiêng không bao giờ được mua bán tùy tiện mà phải thực hiện các nghi thức xin phép thần linh?',
      activitySuggestions: [
        'Lắng nghe và phân biệt âm sắc của 6 chiếc chiêng trong bài chiêng đón khách.',
        'Gặp gỡ nghệ nhân để tìm hiểu cách thẩm âm và kỹ thuật gõ cồng bằng nắm tay.',
      ],
    },
    locationGuide: {
      accessNote: 'Thực hành tập trung tại Không gian Nhà Dài Khu Bảo Tồn Sóc Bom Bo (xã Bom Bo) và các buôn sóc người S\'Tiêng tại Bù Đăng.',
      bestTimeToVisit: 'Dịp Lễ hội văn hóa truyền thống các dân tộc (cuối năm hoặc các ngày hội văn hóa địa phương).',
      facilities: ['Sân khấu biểu diễn cồng chiêng', 'Không gian nhà dài truyền thống'],
    },
    conservationStatus: 'Di sản Văn hóa Phi vật thể — Không gian cồng chiêng bản địa',
    relatedIds: ['hrt-004', 'hrt-011'],
    tags: ['cồng chiêng', 'âm nhạc', 'S\'tiêng', 'UNESCO', 'phi vật thể', 'lễ hội', 'Bom Bo'],
    references: [
      'UNESCO (2005). Không gian văn hóa cồng chiêng Tây Nguyên — Hồ sơ công nhận UNESCO-ICH-00120.',
      'PGS.TS. Nguyễn Văn Hậu (2019). Văn hóa Âm nhạc Cồng chiêng của người S\'Tiêng miền Đông Nam Bộ. Viện KHXH Vùng Nam Bộ.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-02-15',
    viewCount: 1876,
  },
  {
    id: 'hrt-004',
    slug: 'nha-dai-truyen-thong-stieng',
    title: 'Nhà Dài Truyền Thống S\'tiêng',
    subtitle: 'Kiến trúc cộng đồng độc đáo trên cao nguyên',
    category: 'doi-song-cong-dong',
    period: 'hien-dai',
    cluster: 'bom-bo',
    archetype: 'artifact',
    year: 'Kiến trúc lâu đời',
    coverImage: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
        alt: 'Nhà dài S\'tiêng',
        caption: 'Nhà dài truyền thống — không gian cộng đồng linh thiêng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8368, lng: 107.1948 },
    shortDescription:
      'Nhà dài của người S\'Tiêng ("Nhar") không chỉ là công trình cư trú độc đáo bằng tranh tre nứa lá mà còn là trung tâm sinh hoạt văn hóa, phản ánh sâu sắc thiết chế gia đình mẫu hệ và tinh thần gắn kết keo sơn của toàn buôn sóc.',
    longStory: `Nhà dài của người S'Tiêng — được gọi là "Nhar" trong ngôn ngữ bản địa — là một công trình kiến trúc cổ truyền độc đáo và là biểu tượng của tinh thần gắn kết gia tộc thiêng liêng. Ngôi nhà dài được dựng lên từ những sản vật của đại ngàn như cột gỗ, vách nứa, sàn tre và mái lợp bằng lá mây hay lá tranh dày dặn, có khả năng che mưa chắn gió qua bao mùa giông bão. Một ngôi nhà dài truyền thống của người S'Tiêng có thể kéo dài từ 50 mét đến hơn 100 mét tùy thuộc vào số lượng thành viên trong gia đình.

Triết lý kiến trúc của nhà dài phản ánh sâu sắc cấu trúc xã hội mẫu hệ cổ xưa và sự cố kết cộng đồng keo sơn. Mỗi khi một người con gái trong nhà đi lấy chồng, ngôi nhà lại được nối dài thêm một gian về phía sau để đón chào gia đình mới. Dù được chia thành nhiều gian nhỏ cho từng hộ gia đình tự lập sinh hoạt, ngôi nhà dài vẫn luôn có một không gian sinh hoạt chung rộng lớn chạy suốt chiều dài ngôi nhà, nơi đặt bếp lửa chính luôn đỏ rực và là nơi tiếp khách, bàn bạc công việc của toàn gia tộc.

Bếp lửa giữa nhà dài không chỉ là nơi nấu nướng mà còn là biểu tượng của sự ấm áp, sự sống và sự kế thừa. Hằng đêm, bên ngọn lửa bập bùng, các thế hệ người S'Tiêng lại quây quần bên nhau để nghe người già kể khan, truyền dạy kinh nghiệm đi rừng, săn bắn và hát những bài dân ca cổ truyền. Đó chính là cái nôi nuôi dưỡng tâm hồn và bản sắc văn hóa S'Tiêng truyền đời.`,
    contextStory:
      'Trước những biến đổi nhanh chóng của đời sống kinh tế xã hội, những ngôi nhà dài bằng vật liệu tự nhiên đang đứng trước nguy cơ mai một. Việc phục dựng không gian nhà dài tại Khu Bảo Tồn Văn Hóa Sóc Bom Bo đóng vai trò cốt lõi trong việc bảo tồn không gian sống nguyên bản của đồng bào.',
    quickFacts: [
      { label: 'Chiều dài công trình', value: 'Từ 30m đến hơn 100m', icon: 'mdi:ruler' },
      { label: 'Vật liệu tự nhiên', value: 'Tre, nứa, gỗ rừng, mái lá mây/tranh', icon: 'mdi:leaf' },
      { label: 'Thiết chế xã hội', value: 'Đại gia đình mẫu hệ nhiều thế hệ', icon: 'mdi:home-group' },
      { label: 'Vị trí phục dựng', value: 'Khu Bảo Tồn Văn Hóa Sóc Bom Bo', icon: 'mdi:map-marker' },
    ],
    timeline: [
      {
        year: 'Lâu đời',
        title: 'Hình thành kiến trúc thích ứng tự nhiên',
        description: 'Nhà dài ra đời từ nhu cầu sinh sống tập thể, bảo vệ buôn làng trước thú dữ và thiên tai.',
      },
      {
        year: '2010–2015',
        title: 'Phục dựng tại Sóc Bom Bo',
        description: 'Xây dựng nhà dài quy mô lớn tại khu bảo tồn theo đúng quy chuẩn kiến trúc cổ truyền S\'Tiêng.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-004',
      curriculumTopic: 'Kiến trúc Dân tộc & Văn hóa Dân gian',
      targetAudience: 'Học sinh THCS, THPT & Sinh viên ngành kiến trúc, văn hóa học',
      reflectionQuestion:
        'Cấu trúc "nối dài thêm một gian mỗi khi có con gái lấy chồng" thể hiện điều gì về mối quan hệ gia đình và chế độ mẫu hệ của người S\'Tiêng?',
      activitySuggestions: [
        'Mô hình hóa kết cấu mộng tre nứa của nhà dài bằng bản vẽ 3D hoặc vật liệu tái chế.',
        'Phân tích công năng của các không gian: gian tiếp khách, bếp lửa chung và gian riêng.',
      ],
    },
    locationGuide: {
      accessNote: 'Nằm ngay trong khuôn viên trung tâm Khu Bảo Tồn Sóc Bom Bo, xã Bom Bo, đường nhựa ô tô vào tận nơi.',
      openHours: '07:30 – 17:00 các ngày trong tuần',
      facilities: ['Nhà dài trưng bày hiện vật', 'Khu trải nghiệm văn hóa ẩm thực'],
    },
    conservationStatus: 'Công trình kiến trúc phục dựng bảo tồn di sản cấp Tỉnh',
    relatedIds: ['hrt-003', 'hrt-007', 'hrt-011'],
    tags: ['kiến trúc', 'nhà dài', 'S\'tiêng', 'cộng đồng', 'truyền thống', 'mẫu hệ', 'Bom Bo'],
    references: [
      'TS. KTS. Hoàng Hữu Phê (2018). Kiến trúc Nhà Dài truyền thống và thiết chế xã hội buôn làng S\'Tiêng. Tạp chí Kiến trúc Việt Nam.',
      'Sở Văn hóa Thể thao và Du lịch. Nhà dài S\'tiêng — Di sản kiến trúc bản địa.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-03-01',
    viewCount: 1234,
  },
  {
    id: 'hrt-005',
    slug: 'di-tich-nha-giao-truyen-thong-bu-dang',
    title: 'Di Tích Nhà Giáo Truyền Thống Bù Đăng',
    subtitle: 'Ngôi trường đầu tiên của vùng đất kháng chiến',
    category: 'giao-duc-truyen-thong',
    period: 'khang-chien',
    cluster: 'bu-dang',
    archetype: 'historical',
    year: '1960–1975',
    coverImage: '/images/heritage/lich-su/nha-giao-truyen-thong-lg.webp',
    gallery: [
      {
        src: '/images/heritage/lich-su/nha-giao-truyen-thong-lg.webp',
        alt: 'Di tích nhà giáo truyền thống',
        caption: 'Nơi lưu giữ ký ức về những lớp học xóa mù chữ giữa rừng già kháng chiến',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.7692, lng: 107.2372 },
    shortDescription:
      'Di tích Nhà Giáo Truyền Thống Bù Đăng ghi dấu tinh thần hiếu học phi thường và sự nghiệp giáo dục cách mạng giữa đại ngàn kháng chiến (1960–1975). Nơi các thầy cô giáo chiến khu vượt qua mưa bom bão đạn, dùng than củi lá rừng dạy chữ Quốc ngữ và chữ S\'Tiêng cho thế hệ trẻ.',
    longStory: `Trong những năm tháng kháng chiến chống Mỹ cam go và ác liệt, giữa tiếng bom gầm đạn rú nơi rừng già Bù Đăng, tiếng đánh vần trong trẻo của trẻ thơ vẫn kiên trì vang lên dưới những tán bằng lăng, khộp già. Di tích Nhà Giáo Truyền Thống Bù Đăng là chứng tích xúc động về một thế hệ thầy cô giáo cách mạng mang tinh thần "vừa cầm súng vừa cầm bút", ươm mầm tri thức cho vùng căn cứ địa.

Cơ sở vật chất của các lớp học thời chiến đơn sơ đến nghẹn lòng: lớp học là căn lán tre nửa chìm nửa nổi để tránh mảnh pháo, bàn ghế ghép từ thân gỗ rừng, bảng đen làm từ vỏ cây xát bột than củi, mực viết được pha chế từ bồ hóng trộn nhựa cây. Dẫu thiếu thốn trăm bề, các thầy giáo chiến khu không chỉ dạy chữ Quốc ngữ, toán học cơ bản mà còn dạy chữ viết S'Tiêng, giáo dục lòng yêu nước và ý thức giữ gìn buôn làng cho con em đồng bào dân tộc thiểu số.

Mạng lưới lớp học kháng chiến Bù Đăng đã đào tạo hàng trăm cán bộ, chiến sĩ và thiếu niên bản địa. Nhiều học trò từ những lớp học giữa rừng sau này trở thành cán bộ nòng cốt, thầy cô giáo, y bác sĩ đóng góp to lớn cho sự nghiệp tái thiết quê hương sau ngày giải phóng.`,
    contextStory:
      'Chủ trương phát triển giáo dục cách mạng vùng đồng bào dân tộc thiểu số trong chiến khu là chính sách chiến lược của Đảng và Mặt trận Dân tộc Giải phóng. Việc mở trường lớp ngay tại vùng căn cứ Bù Đăng vừa nâng cao dân trí, vừa củng cố niềm tin vững chắc của đồng bào S\'Tiêng, M\'Nông vào con đường cách mạng.',
    quickFacts: [
      { label: 'Giai đoạn hoạt động', value: '1960 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Loại hình di tích', value: 'Lớp học & Cơ sở giáo dục kháng chiến', icon: 'mdi:school' },
      { label: 'Phương tiện giảng dạy', value: 'Bảng vỏ cây, mực bồ hóng, lán hầm ngụy trang', icon: 'mdi:pencil' },
      { label: 'Đối tượng học tập', value: 'Con em chiến sĩ và đồng bào S\'Tiêng, M\'Nông', icon: 'mdi:account-school' },
    ],
    timeline: [
      {
        year: '1960',
        title: 'Mở lớp bình dân học vụ đầu tiên',
        description: 'Ban Tuyên huấn phát động phong trào xóa mù chữ và dựng lớp học ngụy trang trong rừng Bù Đăng.',
      },
      {
        year: '1965–1970',
        title: 'Đào tạo cán bộ giáo dục cơ sở',
        description: 'Mở các lớp sư phạm ngắn ngày bồi dưỡng thanh niên dân tộc thiểu số trở thành thầy cô giáo buôn sóc.',
      },
      {
        year: '1975',
        title: 'Hòa nhập hệ thống giáo dục quốc dân',
        description: 'Lực lượng giáo viên kháng chiến trở thành nòng cốt xây dựng ngành giáo dục huyện Bù Đăng sau ngày toàn thắng.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-005',
      curriculumTopic: 'Truyền thống Tôn Sư Trọng Đạo & Lịch sử Giáo dục Địa phương',
      targetAudience: 'Học sinh tiểu học, THCS, THPT & Giáo viên toàn ngành',
      reflectionQuestion:
        'Tinh thần vượt khó "vừa cầm súng vừa cầm bút" của thầy trò vùng chiến khu Bù Đăng để lại bài học gì cho học sinh ngày nay trong thời đại số?',
      activitySuggestions: [
        'Tổ chức hoạt động ngoại khóa "Hành trình về nguồn — Tìm hiểu lớp học kháng chiến".',
        'Viết bài cảm tưởng tri ân các thế hệ nhà giáo lão thành vùng căn cứ địa.',
      ],
    },
    locationGuide: {
      accessNote: 'Khu vực ghi dấu di tích nằm trên trục đường liên xã Bù Đăng. Có biển chỉ dẫn lịch sử của ngành giáo dục.',
      bestTimeToVisit: 'Dịp kỷ niệm Ngày Nhà giáo Việt Nam 20/11 hoặc các đợt sinh hoạt truyền thống mùa xuân.',
      facilities: ['Bia tưởng niệm truyền thống nhà giáo'],
    },
    conservationStatus: 'Địa chỉ đỏ Giáo dục Truyền thống cấp Huyện [CẦN XÁC MINH số liệu lưu trữ bảo tàng]',
    verificationNote: 'Cần bổ sung hồ sơ trích lục các khóa đào tạo giáo viên kháng chiến từ lưu trữ Ban Tuyên giáo.',
    relatedIds: ['hrt-001', 'hrt-011'],
    tags: ['giáo dục', 'kháng chiến', 'trường học', 'lịch sử', 'cách mạng', 'Bù Đăng', 'tôn sư trọng đạo'],
    references: [
      'Phòng Giáo dục và Đào tạo Bù Đăng (2016). Kỷ yếu Truyền thống Ngành Giáo dục Bù Đăng.',
      'Viện Khoa học Giáo dục Việt Nam (2014). Lịch sử Giáo dục Cách mạng miền Đông Nam Bộ (1954–1975). NXB Giáo dục.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-03-15',
    viewCount: 876,
  },
  {
    id: 'hrt-006',
    slug: 'rung-nguyen-sinh-bu-dang',
    title: 'Rừng Nguyên Sinh Bù Đăng',
    subtitle: 'Kho báu sinh thái của Đông Nam Bộ',
    category: 'danh-thang',
    period: 'hien-dai',
    cluster: 'bu-dang',
    archetype: 'natural',
    year: 'Hàng triệu năm',
    coverImage: '/images/heritage/img-disanbudang/rung-nguyen-sinh-bu-dang.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/rung-nguyen-sinh-bu-dang.jpg',
        alt: 'Rừng nguyên sinh Bù Đăng',
        caption: 'Những cánh rừng nguyên sinh nhiều tầng tán lưu giữ kho tàng đa dạng sinh học vô giá',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.9000, lng: 107.0850 },
    shortDescription:
      'Rừng nguyên sinh Bù Đăng là một trong những diện tích rừng nhiệt đới ẩm lá rộng thường xanh quý giá nhất vùng Đông Nam Bộ — nơi hội tụ thảm thực vật 4 tầng tán, lưu giữ nhiều loài động thực vật quý hiếm và là vành đai sinh thái phòng hộ đầu nguồn sông Bé.',
    longStory: `Đặt chân vào rừng già Bù Đăng là bước vào một không gian kỳ vĩ của thiên nhiên nguyên sơ — nơi những cây cổ thụ họ Dầu (Dipterocarpaceae), Gõ đỏ, Cẩm lai vươn cao hàng chục mét chạm vào mây trời, tạo nên tán rừng rậm rạp che chắn cho các tầng cây bụi, dương xỉ và thảm phong lan phong phú bên dưới.

Hệ sinh thái rừng nguyên sinh Bù Đăng nằm trong vùng chuyển tiếp sinh thái giữa cao nguyên Nam Tây Nguyên và vùng đồi Đông Nam Bộ. Điều này tạo nên tính đa dạng sinh học đặc biệt cao với hàng trăm loài thực vật bậc cao có mạch và nhiều loài động vật nguy cấp có tên trong Sách đỏ Việt Nam như Vượn đen má hung (*Nomascus gabriellae*), Chà vá chân đen, Khỉ đuôi lợn, Gà tiền mặt đỏ và các loài lưỡng cư, bò sát đặc hữu.

Đối với cộng đồng người S'Tiêng, M'Nông bản địa, cánh rừng già từ ngàn đời nay không chỉ là nguồn che chở trong thời chiến mà còn là "ngân hàng sống" lưu giữ tri thức dược liệu dân gian, nguồn nước ngọt trong lành và không gian thiêng liêng gắn liền với tục thờ thần rừng Yang Bri.`,
    contextStory:
      'Rừng Bù Đăng kết nối trực tiếp với Vườn Quốc Gia Bù Gia Mập, hình thành dải hành lang sinh học tự nhiên liên tục. Việc bảo vệ rừng đầu nguồn nơi đây có ý nghĩa sống còn đối với an ninh nguồn nước của toàn lưu vực sông Bé và vùng kinh tế trọng điểm phía Nam.',
    quickFacts: [
      { label: 'Kiểu rừng sinh thái', value: 'Rừng kín nhiệt đới thường xanh ẩm lá rộng', icon: 'mdi:pine-tree' },
      { label: 'Hệ thực vật ghi nhận', value: 'Hơn 800 loài thực vật bậc cao', icon: 'mdi:leaf' },
      { label: 'Động vật nguy cấp', value: 'Vượn đen má hung, Chà vá chân đen, Gà tiền', icon: 'mdi:paw' },
      { label: 'Chức năng môi trường', value: 'Phòng hộ đầu nguồn lưu vực sông Bé', icon: 'mdi:water' },
    ],
    timeline: [
      {
        year: 'Hàng triệu năm',
        title: 'Tiến hóa sinh thái tự nhiên',
        description: 'Hình thành thảm thực vật rừng nhiệt đới ổn định với cấu trúc tầng tán phức hợp.',
      },
      {
        year: 'Giai đoạn kháng chiến',
        title: 'Rừng che bộ đội, rừng vây quân thù',
        description: 'Địa bàn che giấu các căn cứ cách mạng và tuyến đường vận tải chi viện chiến lược.',
      },
      {
        year: 'Hiện nay',
        title: 'Quy hoạch bảo tồn nghiêm ngặt',
        description: 'Tăng cường tuần tra bảo vệ rừng, phát triển du lịch sinh thái giáo dục môi trường có kiểm soát.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-006',
      curriculumTopic: 'Sinh học & Bảo vệ Đa dạng Sinh học Rừng Nhiệt đới',
      targetAudience: 'Học sinh THCS, THPT, các câu lạc bộ bảo vệ thiên nhiên',
      reflectionQuestion:
        'Cấu trúc rừng 4–5 tầng tán có vai trò như thế nào trong việc giữ nước ngầm và chống xói mòn đất bazan mùa mưa lũ?',
      activitySuggestions: [
        'Lập danh mục 10 loài cây gỗ quý và 5 loài dược liệu bản địa trong rừng Bù Đăng.',
        'Thiết kế infographic tuyên truyền phòng cháy chữa cháy rừng mùa khô.',
      ],
    },
    locationGuide: {
      accessNote: 'Khu vực rừng tự nhiên Bù Đăng giáp ranh Bù Gia Mập. Khách tham quan cần đăng ký và đi cùng cán bộ kiểm lâm theo tuyến đường quy định.',
      bestTimeToVisit: 'Mùa khô từ tháng 11 đến tháng 4 (thuận lợi đi bộ khám phá tuyến đường tuần tra rừng).',
      facilities: ['Trạm kiểm lâm bảo vệ rừng', 'Đường tuần tra sinh thái'],
    },
    conservationStatus: 'Khu vực Rừng phòng hộ đầu nguồn & Vùng đệm VQG [CẦN XÁC MINH ranh giới diện tích mới nhất]',
    verificationNote: 'Cần cập nhật số liệu kiểm kê rừng mới nhất từ Chi cục Kiểm lâm địa phương.',
    relatedIds: ['hrt-002', 'hrt-009'],
    tags: ['rừng nguyên sinh', 'sinh thái', 'đa dạng sinh học', 'bảo tồn', 'thiên nhiên', 'Bù Đăng', 'vượn đen má hung'],
    references: [
      'Chi cục Kiểm lâm (2023). Báo cáo Hiện trạng Đa dạng Sinh học và Rừng phòng hộ Bù Đăng.',
      'Viện Sinh thái học Miền Nam — VAST (2020). Hệ thực vật và tài nguyên dược liệu bản địa vùng Đông Nam Bộ. NXB KHTN&CN.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-04-01',
    viewCount: 1567,
  },
  {
    id: 'hrt-007',
    slug: 'lang-nghe-det-tho-cam-stieng',
    title: 'Làng Nghề Dệt Thổ Cẩm S\'tiêng',
    subtitle: 'Bảo tàng sắc màu dệt bằng tay và trái tim',
    category: 'doi-song-cong-dong',
    period: 'hien-dai',
    cluster: 'bu-dang',
    archetype: 'artifact',
    year: 'Hàng thế kỷ',
    coverImage: '/images/heritage/img-disanbudang/hoa-van-tho-cam-stieng.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/hoa-van-tho-cam-stieng.png',
        alt: 'Thổ cẩm S\'tiêng',
        caption: 'Những tấm thổ cẩm rực rỡ với hoa văn hình học cổ truyền được dệt bằng đôi tay khéo léo của phụ nữ S\'tiêng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.9709, lng: 107.2319 },
    shortDescription:
      'Nghề dệt thổ cẩm của người S\'Tiêng tại Bù Đăng là Di sản văn hóa phi vật thể Quốc gia (QĐ số 3742/QĐ-BVHTTDL). Mỗi tấm thổ cẩm là một bản hòa ca sắc màu của đại ngàn, phản ánh tri thức chế tác thảo mộc và nghệ thuật tạo hình dân gian độc đáo.',
    longStory: `Trong các sóc người S'Tiêng tại xã Đắk Nhau và xã Bù Đăng, tiếng lách cách của thanh cài và sợi chỉ luồn nhịp nhàng là âm thanh gắn bó với bao thế hệ phụ nữ bản địa. Dệt thổ cẩm không chỉ là nghề thủ công thuần túy mà là thước đo sự khéo léo, đảm đang và chuẩn mực thẩm mỹ của người phụ nữ S'Tiêng trước khi lập gia đình.

Điểm đặc sắc bậc nhất của thổ cẩm S'Tiêng là kỹ thuật dệt thắt chỉ không sử dụng khung cửi đứng cồng kềnh mà dùng khung dệt mini buộc quanh lưng và luồn qua chân người ngồi dệt. Điều này cho phép người nghệ nhân điều chỉnh độ căng của sợi dệt bằng chính chuyển động cơ thể. Các màu sắc chủ đạo — đen tuyền, đỏ tươi, vàng nghệ và trắng — được chiết xuất 100% từ vỏ cây trâm, củ nâu, củ nghệ rừng và ngâm bùn suối theo công thức bí truyền.

Hệ thống hoa văn Sơk Pơng (hoa văn hình thoi cách điệu) trên váy áo, khố hoa, khăn địu con mô phỏng tinh tế thế giới tự nhiên: mắt chim công, dấu chân muông thú, ngọn sóng suối, hạt lúa rẫy và hàng rào buôn sóc. Mỗi hoa văn là một ký tự không lời ghi chép lại lịch sử và vũ trụ quan của người S'Tiêng.`,
    contextStory:
      'Ngày 14/12/2020, Bộ Văn hóa, Thể thao và Du lịch đã ban hành Quyết định số 3742/QĐ-BVHTTDL công nhận Nghề dệt thổ cẩm truyền thống của người S\'Tiêng tại Bù Đăng là Di sản văn hóa phi vật thể Quốc gia. Đây là cơ sở pháp lý quan trọng để triển khai các dự án bảo tồn làng nghề gắn với du lịch cộng đồng.',
    quickFacts: [
      { label: 'Danh hiệu di sản', value: 'Di sản văn hóa phi vật thể Quốc gia (2020)', icon: 'mdi:certificate' },
      { label: 'Công cụ dệt', value: 'Khung dệt luồn chân & đai lưng di động', icon: 'mdi:tools' },
      { label: 'Nhuộm màu tự nhiên', value: 'Vỏ cây rừng, củ nâu, nghệ, bùn suối', icon: 'mdi:palette' },
      { label: 'Địa bàn tập trung', value: 'Sóc Đắk Nhau & các buôn làng S\'Tiêng Bù Đăng', icon: 'mdi:map-marker' },
    ],
    timeline: [
      {
        year: 'Từ ngàn xưa',
        title: 'Nghề truyền thống mẹ truyền con nối',
        description: 'Phụ nữ S\'Tiêng tự trồng bông, kéo sợi, hái lá rừng nhuộm màu may trang phục gia đình.',
      },
      {
        year: '2020',
        title: 'Công nhận Di sản Quốc gia',
        description: 'Bộ VHTTDL ban hành Quyết định 3742/QĐ-BVHTTDL vinh danh nghề dệt thổ cẩm S\'Tiêng.',
      },
      {
        year: 'Hiện nay',
        title: 'Bảo tồn & số hóa hoa văn cổ',
        description: 'Mở các lớp truyền dạy hoa văn Sơk Pơng cho thanh thiếu niên tại trường học địa phương.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-007',
      curriculumTopic: 'Mỹ thuật Dân tộc & Nghề Thủ công Truyền thống',
      targetAudience: 'Học sinh THCS, THPT & Những người yêu thích thủ công mỹ nghệ',
      reflectionQuestion:
        'Kỹ thuật nhuộm màu từ thảo mộc tự nhiên của người S\'Tiêng thể hiện tri thức sinh thái học bản địa như thế nào?',
      activitySuggestions: [
        'Vẽ lại 3 mẫu hoa văn hình học thổ cẩm S\'Tiêng và giải thích ý nghĩa biểu tượng.',
        'Trải nghiệm dệt dải thổ cẩm mini cùng nghệ nhân tại lớp học di sản.',
      ],
    },
    locationGuide: {
      accessNote: 'Đến làng nghề tại Sóc Đắk Nhau (xã Đắk Nhau) cách trung tâm Bù Đăng khoảng 15 km theo đường ĐT760.',
      bestTimeToVisit: 'Mùa lễ hội hoặc các ngày cuối tuần khi các nghệ nhân tổ chức dệt tập trung tại nhà văn hóa cộng đồng.',
      facilities: ['Nhà trưng bày sản phẩm thổ cẩm', 'Khu trải nghiệm khung dệt truyền thống'],
    },
    conservationStatus: 'Di sản Văn hóa Phi vật thể Quốc gia (QĐ 3742/QĐ-BVHTTDL)',
    verificationNote: 'Cần xác minh số lượng nghệ nhân ưu tú được phong tặng danh hiệu chính thức tại địa bàn.',
    relatedIds: ['hrt-003', 'hrt-004', 'hrt-011'],
    tags: ['thổ cẩm', 'dệt', 'làng nghề', 'S\'tiêng', 'thủ công', 'phụ nữ', 'di sản quốc gia', 'Đắk Nhau'],
    references: [
      'Bộ Văn hóa, Thể thao và Du lịch (2020). Quyết định số 3742/QĐ-BVHTTDL ngày 14/12/2020 công nhận Di sản văn hóa phi vật thể Quốc gia.',
      'TS. Lê Thị Mai (2021). Nghệ thuật hoa văn thổ cẩm và tri thức bản địa S\'Tiêng. Tạp chí Dân tộc học số 4/2021.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-04-15',
    viewCount: 1023,
  },
  {
    id: 'hrt-008',
    slug: 'le-hoi-mung-lua-moi-mnong',
    title: 'Lễ Hội Mừng Lúa Mới M\'nông',
    subtitle: 'Lời tạ ơn của đất trời và mùa vàng bội thu',
    category: 'van-hoa-phi-vat-the',
    period: 'hien-dai',
    cluster: 'bu-dang',
    archetype: 'cultural',
    year: 'Hàng thế kỷ',
    coverImage: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
        alt: 'Lễ hội mừng lúa mới',
        caption: 'Lễ hội Mừng Lúa Mới (N\'droh Nri) — nghi lễ tạ ơn thần linh và tổ tiên của đồng bào M\'nông',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8500, lng: 107.3200 },
    shortDescription:
      'Lễ hội Mừng Lúa Mới (N\'droh Nri) của người M\'Nông tại xã Bù Đăng là nghi lễ nông nghiệp thiêng liêng bậc nhất trong năm — dịp buôn làng tạ ơn Thần Lúa (Yang Sri), cúng tạ tổ tiên và cùng nhau uống rượu cần, hòa nhịp cồng chiêng mừng mùa vàng no ấm.',
    longStory: `Khi những hạt sương sớm giăng kín triền đồi và những bông lúa nếp trên nương rẫy bắt đầu chín vàng rực rỡ, đồng bào M'Nông sinh sống tại Bù Đăng lại rộn ràng chuẩn bị cho ngày hội thiêng liêng nhất trong năm — Lễ hội Mừng Lúa Mới (tiếng M'Nông gọi là "N'droh Nri" hay "Lễ cúng Yang Lúa").

Lễ hội gồm 3 phần nghi lễ kế tiếp nhau phản ánh thế giới quan nông nghiệp cổ truyền:
1. **Lễ cúng tại chòi rẫy:** Già làng và chủ rẫy làm lễ xin phép thần linh tuốt những bó lúa đầu mùa (Lúa Mẹ) đem về buôn.
2. **Lễ nhập kho và tạ ơn Yang Sri:** Rước hồn lúa về kho thóc buôn làng, thực hiện nghi thức hiến sinh gà rượu và vẩy huyết thiêng cầu mong hạt thóc không bao giờ vơi.
3. **Phần hội buôn sóc:** Toàn thể dân làng quây quần bên đống lửa lớn, cùng thưởng thức rượu cần ủ men lá rừng, tấu cồng chiêng, hát kể sử thi Ot Ndrông và nhảy múa quanh cây nêu (gâng) rực rỡ.

Chén rượu cần mừng lúa mới được chuyền tay nhau bằng một cần trúc dài duy nhất, tượng trưng cho tình đoàn kết không thể chia cắt của buôn làng người M'Nông giữa đại ngàn.`,
    contextStory:
      'Người M\'Nông tại Bù Đăng là một trong những cộng đồng cư dân bản địa lâu đời. Tín ngưỡng Yang Sri thể hiện triết lý tôn trọng thiên nhiên, ứng xử hài hòa với môi trường sinh thái rừng rẫy và giữ gìn các giá trị đạo đức truyền thống trong đời sống buôn làng.',
    quickFacts: [
      { label: 'Tên gọi bản địa', value: 'N\'droh Nri (Lễ cúng Thần Lúa Yang Sri)', icon: 'mdi:grain' },
      { label: 'Thời điểm tổ chức', value: 'Tháng 11 – 12 dương lịch (sau vụ gặt lúa rẫy)', icon: 'mdi:calendar' },
      { label: 'Chủ thể nghi lễ', value: 'Đồng bào dân tộc M\'Nông Bù Đăng', icon: 'mdi:account-group' },
      { label: 'Lễ vật đặc trưng', value: 'Cơm lam nếp mới, rượu cần men lá, gà hiến sinh', icon: 'mdi:food-variant' },
    ],
    timeline: [
      {
        year: 'Thuở xưa',
        title: 'Hình thành từ nền kinh tế nương rẫy',
        description: 'Lễ hội gắn chặt với chu kỳ sinh trưởng của cây lúa rẫy và tín ngưỡng vạn vật hữu linh.',
      },
      {
        year: 'Hiện nay',
        title: 'Bảo tồn lễ hội dân gian truyền thống',
        description: 'Chính quyền và buôn làng duy trì tổ chức lễ hội hàng năm nhằm giữ gìn bản sắc và quảng bá du lịch văn hóa.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-008',
      curriculumTopic: 'Tín ngưỡng Dân gian & Văn hóa Nông nghiệp Tây Nguyên — Đông Nam Bộ',
      targetAudience: 'Học sinh các trường phổ thông, sinh viên ngành dân tộc học',
      reflectionQuestion:
        'Ý nghĩa của nghi thức "uống chung một cần trúc" trong đêm hội mừng lúa mới đối với tinh thần cố kết cộng đồng buôn làng là gì?',
      activitySuggestions: [
        'Tìm hiểu và ghi chép quy trình ủ men rượu cần từ các loại lá cây rừng tự nhiên.',
        'Sưu tầm các câu ca dao, truyện cổ M\'Nông liên quan đến nguồn gốc hạt lúa rẫy.',
      ],
    },
    locationGuide: {
      accessNote: 'Tổ chức luân phiên tại các buôn làng người M\'Nông trên địa bàn xã Bù Đăng.',
      bestTimeToVisit: 'Tháng 11 đến tháng 12 hàng năm (mùa thu hoạch lúa rẫy).',
      facilities: ['Sân sinh hoạt cộng đồng buôn làng', 'Khu vực cây nêu lễ hội'],
    },
    conservationStatus: 'Di sản Văn hóa Phi vật thể Địa phương [CẦN XÁC MINH hồ sơ lập danh mục cấp quốc gia]',
    verificationNote: 'Cần xác minh thời gian tổ chức định kỳ chính thức theo kế hoạch lễ hội của ngành văn hóa.',
    relatedIds: ['hrt-003', 'hrt-007'],
    tags: ['lễ hội', 'M\'nông', 'lúa mới', 'nông nghiệp', 'rượu cần', 'cộng đồng', 'Bù Đăng', 'Yang Sri'],
    references: [
      'Sở Văn hóa Thể thao và Du lịch. Lễ hội dân gian M\'nông.',
      'Viện Nghiên cứu Văn hóa Dân gian (2020). Hệ thống tín ngưỡng nông nghiệp Yang Sri của đồng bào M\'Nông. Tạp chí VHDG số 3/2020.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-05-01',
    viewCount: 987,
  },
  {
    id: 'hrt-009',
    slug: 'trang-co-bu-lach',
    title: 'Trảng Cỏ Bù Lạch',
    subtitle: 'Thảo nguyên xanh mát bên hồ nước huyền thoại',
    category: 'danh-thang',
    period: 'hien-dai',
    cluster: 'bu-dang',
    archetype: 'natural',
    year: 'Thắng cảnh tự nhiên',
    coverImage: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png',
        alt: 'Trảng cỏ Bù Lạch',
        caption: 'Cánh đồng cỏ xanh mướt trải rộng quanh lòng hồ tự nhiên mát rượi',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8064, lng: 107.3552 },
    shortDescription:
      'Trảng cỏ Bù Lạch là danh thắng thiên nhiên độc nhất vô nhị tại xã Đồng Nai (nay thuộc khu vực Bù Đăng, Thành phố Đồng Nai), nổi bật với quần thể gần 140 ha cỏ kim xanh mướt tự nhiên ôm trọn lòng hồ nước ngọt trong veo giữa bốn bề rừng nguyên sinh.',
    longStory: `Nằm cách trung tâm xã Bù Đăng khoảng 20 km, Trảng cỏ Bù Lạch hiện lên như một thảo nguyên hoang sơ kỳ vĩ giữa lòng đại ngàn. Điểm độc đáo hiếm nơi nào có được là sự kết hợp hài hòa giữa rừng nguyên sinh bao bọc, trảng cỏ xanh mướt tự nhiên và hồ nước ngọt phẳng lặng ở trung tâm trảng cỏ.

Trảng cỏ Bù Lạch rộng gần 140 ha, bao gồm cụm 20 trảng cỏ lớn nhỏ xen kẽ nhau. Thảm thực vật chiếm ưu thế tại đây là loài cỏ kim chịu hạn tự nhiên, cọng nhỏ mịn và dai, quanh năm giữ sắc xanh dịu mát. Bao quanh trảng cỏ là những cánh rừng nguyên sinh nhiều tầng tán tạo thành một bức tường thành thiên nhiên kiên cố che chở cho lòng thảo nguyên.

Người dân bản địa S'Tiêng từ ngàn đời nay lưu truyền nhiều truyền thuyết linh thiêng về hồ nước Bù Lạch. Họ coi hồ là tấm gương thần của trời đất soi chiếu lòng người, cung cấp sinh khí và nguồn nước mát nuôi dưỡng muôn loài. Trảng cỏ Bù Lạch là điểm đến lý tưởng cho hoạt động dã ngoại, nghiên cứu địa mạo và trải nghiệm thiên nhiên nguyên sơ.`,
    contextStory:
      'Về mặt địa mạo học, trảng cỏ Bù Lạch là một cấu trúc đất ngập nước nội địa đặc hữu được hình thành trên nền đất bazan phong hóa cổ. Sự tồn tại song song của thảm cỏ kim và hồ nước giữa lòng rừng già là một hiện tượng tự nhiên kỳ thú của vùng Đông Nam Bộ.',
    quickFacts: [
      { label: 'Diện tích trảng cỏ', value: 'Gần 140 ha (cụm 20 trảng)', icon: 'mdi:map-outline' },
      { label: 'Cảnh quan trung tâm', value: 'Hồ nước ngọt tự nhiên', icon: 'mdi:waves' },
      { label: 'Thảm thực vật', value: 'Cỏ kim tự nhiên chịu hạn', icon: 'mdi:grass' },
      { label: 'Khoảng cách trung tâm', value: 'Khoảng 20 km từ thị trấn Bù Đăng', icon: 'mdi:map-marker-distance' },
    ],
    timeline: [
      {
        year: 'Hàng ngàn năm',
        title: 'Kiến tạo địa chất tự nhiên',
        description: 'Quá trình phong hóa đất bazan tạo thành vùng trũng ngập nước và thảm thảo nguyên cỏ kim.',
      },
      {
        year: '2014',
        title: 'Xếp hạng danh thắng',
        description: 'UBND tỉnh ban hành quyết định xếp hạng Danh lam Thắng cảnh cấp Tỉnh để bảo vệ sinh thái.',
      },
    ],
    audio: {
      id: 'aud-009',
      title: 'Thảo Nguyên Xanh Bù Lạch',
      narrator: 'Trần Thị Quyên',
      narratorRole: 'Thuyết minh viên di sản Đồng Nai',
      duration: 728,
      url: '/audio/trang-co-bu-lach.mp3',
      transcript: 'Trảng cỏ Bù Lạch là quần thể thảo nguyên xanh ngát rộng gần 500 ha giữa đại ngàn Bù Đăng, Thành phố Đồng Nai. Nơi đây bao gồm khoảng 20 trảng cỏ tự nhiên xen kẽ những dải rừng nguyên sinh và các bàu nước trong vắt. Theo truyền thuyết của đồng bào S\'tiêng, đây là vùng đất linh thiêng gắn liền với cuộc sống mẫu hệ, săn bắt hái lượm và những lễ hội đón mùa màng. Đến với Trảng cỏ Bù Lạch, du khách và học sinh không chỉ được chiêm ngưỡng cảnh quan thiên nhiên kỳ vĩ mà còn tìm hiểu về hệ sinh thái thực vật độc đáo của vùng đất đỏ miền Đông.',
      coverImage: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png',
    },
    video: {
      title: 'Phim tư liệu Thảo Nguyên Xanh Trảng Cỏ Bù Lạch',
      url: '/video/virtual-tour/trang-co/trang-co-trailer.mp4',
    },
    educationalConnection: {
      lessonUrl: '/study/lesson/les-009',
      curriculumTopic: 'Địa mạo & Hệ sinh thái Thảo nguyên Đất ngập nước',
      targetAudience: 'Học sinh THCS, THPT & Du khách yêu thiên nhiên',
      reflectionQuestion:
        'Cơ chế sinh thái nào giúp thảm cỏ kim tại Bù Lạch giữ được sắc xanh tự nhiên mà không bị cây rừng lấn át qua hàng ngàn năm?',
      activitySuggestions: [
        'Vẽ bản đồ phân bố các trảng cỏ và lòng hồ Bù Lạch.',
        'Thực hiện bộ quy tắc ứng xử "Không để lại rác" khi cắm trại tại thắng cảnh.',
      ],
    },
    locationGuide: {
      accessNote: 'Đường bê tông nông thôn đi từ QL14 vào trảng cỏ khoảng 20 km. Xe máy và ô tô dưới 16 chỗ vào thuận lợi.',
      bestTimeToVisit: 'Tháng 11 đến tháng 3 (trời nắng ráo, cỏ xanh mượt, hồ nước trong xanh).',
      facilities: ['Khu vực bãi đỗ xe dã ngoại', 'Điểm cắm trại ven hồ'],
    },
    conservationStatus: 'Danh lam Thắng cảnh cấp Tỉnh [CẦN XÁC MINH số quyết định lưu trữ]',
    relatedIds: ['hrt-006', 'hrt-002'],
    tags: ['trảng cỏ', 'bù lạch', 'danh thắng', 'cắm trại', 'sinh thái', 'hồ tự nhiên', 'Bù Đăng'],
    references: [
      'UBND Tỉnh & Sở VHTTDL. Quyết định xếp hạng Danh lam Thắng cảnh Trảng Cỏ Bù Lạch.',
      'Khoa Địa lý — Trường ĐH KHXH&NV (2021). Địa mạo và hệ sinh thái thảo nguyên đất ngập nước nội địa Bù Lạch. Tạp chí PT KH&CN.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-05-15',
    viewCount: 2980,
  },
  {
    id: 'hrt-010',
    slug: 'thac-dung-bu-dang',
    title: 'Thác Đứng Bù Đăng',
    subtitle: 'Bản hùng ca nước đổ bên những khối đá kỳ vĩ',
    category: 'danh-thang',
    period: 'hien-dai',
    cluster: 'bu-dang',
    archetype: 'natural',
    year: 'Thắng cảnh thiên nhiên',
    coverImage: '/images/heritage/img-disanbudang/Thac-Dung.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/Thac-Dung.png',
        alt: 'Thác Đứng cuồn cuộn đổ xuống',
        caption: 'Những dòng nước trắng xóa cuồn cuộn đổ qua khối đá bazan hình trụ lục lăng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.7790, lng: 107.2150 },
    shortDescription:
      'Thác Đứng là một thắng cảnh thiên nhiên kỳ thú trên dòng suối Đăk Wuar thuộc xã Đoàn Kết (nay thuộc xã Bù Đăng), Thành phố Đồng Nai — nổi tiếng với bức tường đá bazan dạng cột lục lăng thẳng đứng kỳ vĩ do hoạt động phun trào núi lửa cổ tạo nên.',
    longStory: `Nằm ẩn mình giữa những đồi rẫy trù phú của xã Bù Đăng, Thác Đứng được ví như một kiệt tác kiến trúc của bàn tay tạo hóa. Điểm thu hút nhất của ngọn thác này chính là các khối đá hình trụ lục lăng thẳng đứng xếp khít nhau bên lòng thác — một dạng cấu trúc địa chất bazan cột đặc hữu tương tự như Ghềnh Đá Đĩa Phú Yên hay thác Gành Đá Tây Nguyên.

Vào mùa mưa, dòng suối Đăk Wuar cuồn cuộn đổ nước từ độ cao gần 6 mét qua vách đá đứng, tạo nên những màn sương nước mờ ảo bao phủ khắp thung lũng. Tiếng thác đổ ầm vang từ xa nghe như tiếng gầm oai vệ của núi rừng đại ngàn.

Đến mùa khô, dòng thác trở nên hiền hòa hơn, hé lộ rõ nét những bãi đá cổ hình thù độc đáo dưới lòng suối. Du khách có thể dễ dàng đi bộ trên các khối đá bazan lục lăng, quan sát vết tích dòng dung nham cổ và tận hưởng không khí trong lành, mát mẻ của vùng thác nước.`,
    contextStory:
      'Cấu trúc bazan cột tại Thác Đứng là bằng chứng địa chất sinh động cho các đợt phun trào núi lửa Kỷ Đệ Tứ trên cao nguyên bazan Nam Đông Dương. Thắng cảnh mang giá trị khoa học địa chất và tiềm năng phát triển du lịch địa chất — sinh thái rất lớn.',
    quickFacts: [
      { label: 'Độ cao vách thác', value: 'Khoảng 4 – 6 mét', icon: 'mdi:arrow-up-bold' },
      { label: 'Cấu trúc địa chất', value: 'Bazan dạng cột lục lăng thẳng đứng', icon: 'mdi:terrain' },
      { label: 'Dòng suối nguồn', value: 'Suối Đăk Wuar', icon: 'mdi:water' },
      { label: 'Vị trí', value: 'Xã Bù Đăng (xã Đoàn Kết cũ)', icon: 'mdi:map-marker' },
    ],
    timeline: [
      {
        year: 'Hàng triệu năm trước',
        title: 'Hoạt động phun trào dung nham',
        description: 'Dung nham bazan nguội lạnh và co ngót đẳng hướng tạo thành hệ thống cột đá lục lăng.',
      },
      {
        year: '2013',
        title: 'Công nhận danh thắng cấp Tỉnh',
        description: 'UBND tỉnh ban hành quyết định công nhận Di tích Danh lam thắng cảnh Thác Đứng.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-010',
      curriculumTopic: 'Địa chất Núi lửa & Cảnh quan Địa mạo Bazan',
      targetAudience: 'Học sinh THCS, THPT & Người yêu thích địa chất học',
      reflectionQuestion:
        'Quá trình nguội lạnh của dung nham bazan diễn ra như thế nào để tạo thành các khối đá hình trụ lục lăng thẳng đứng đều đặn?',
      activitySuggestions: [
        'Vẽ sơ đồ lát cắt địa chất vách thác bazan suối Đăk Wuar.',
        'So sánh cấu trúc đá Thác Đứng với Ghềnh Đá Đĩa (Phú Yên).',
      ],
    },
    locationGuide: {
      accessNote: 'Đường giao thông nông thôn rải nhựa đến gần khu vực chân thác, đi bộ bậc tam cấp xuống suối.',
      bestTimeToVisit: 'Tháng 10 đến tháng 3 (nước trong, dòng chảy vừa phải, an toàn dạo bộ trên đá).',
      facilities: ['Lối đi bộ bậc đá xuống chân thác', 'Khu vực dừng chân ngắm cảnh'],
    },
    conservationStatus: 'Di tích Danh lam Thắng cảnh cấp Tỉnh [CẦN XÁC MINH hồ sơ bảo vệ mốc giới]',
    relatedIds: ['hrt-002', 'hrt-006'],
    tags: ['thác đứng', 'thác nước', 'bazan cột', 'danh thắng', 'suối Đăk Wuar', 'địa chất', 'Bù Đăng'],
    references: [
      'Bảo tàng Tỉnh. Hồ sơ di tích Thác Đứng.',
      'Hội Địa chất Việt Nam (2019). Cấu trúc bazan cột lục lăng phun trào núi lửa cổ tại lưu vực suối Đăk Wuar. Tạp chí Địa chất số 350.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-05-20',
    viewCount: 1650,
  },
  {
    id: 'hrt-011',
    slug: 'khu-bao-ton-soc-bom-bo',
    title: 'Khu Bảo Tồn Sóc Bom Bo',
    subtitle: 'Nơi nhịp chày giã gạo đi vào huyền thoại cách mạng',
    category: 'lich-su',
    period: 'khang-chien',
    cluster: 'bom-bo',
    archetype: 'historical',
    year: '1965–1975',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    gallery: [
      {
        src: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
        alt: 'Giã gạo tại Sóc Bom Bo',
        caption: 'Khu di tích lịch sử Sóc Bom Bo tái hiện cảnh giã gạo nuôi quân',
        photographer: 'TBD Production',
      },
      {
        src: '/images/heritage/Bombo/h.jpg',
        alt: 'Lễ công bố di sản tại sóc Bom Bo',
        caption: 'Lễ công bố Quyết định công nhận di sản văn hóa phi vật thể quốc gia tại khu bảo tồn',
        photographer: 'TBD Production',
      },
      {
        src: '/images/heritage/Bombo/TAN08183.jpg',
        alt: 'Trang phục truyền thống S\'tiêng Bù Đăng',
        caption: 'Đồng bào S\'tiêng trong trang phục thổ cẩm truyền thống biểu diễn cồng chiêng',
        photographer: 'TBD Production',
      },
      {
        src: '/images/heritage/Bombo/TAN08194.jpg',
        alt: 'Nghệ thuật cồng chiêng Sóc Bom Bo',
        caption: 'Các thế hệ nghệ nhân S\'tiêng giữ gìn nhịp chiêng cồng truyền thống',
        photographer: 'TBD Production',
      },
      {
        src: '/images/heritage/Bombo/TAN08196.jpg',
        alt: 'Đồng bào S\'tiêng sóc Bom Bo',
        caption: 'Giao lưu văn hóa cồng chiêng và sinh hoạt cộng đồng tại nhà dài',
        photographer: 'TBD Production',
      },
      {
        src: '/images/heritage/Bombo/TAN08217.jpg',
        alt: 'Cộng đồng S\'tiêng tại sóc Bom Bo',
        caption: 'Các hoạt động biểu diễn nhạc cụ truyền thống của đồng bào',
        photographer: 'TBD Production',
      },
      {
        src: '/images/heritage/Bombo/TAN08220.jpg',
        alt: 'Nghệ nhân S\'tiêng truyền dạy cồng chiêng',
        caption: 'Nghệ nhân lớn tuổi hướng dẫn thanh thiếu niên sóc Bom Bo thực hành nhạc cụ dân tộc',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8388, lng: 107.1942 },
    shortDescription:
      'Sóc Bom Bo (xã Bom Bo, Thành phố Đồng Nai) là địa danh lịch sử anh hùng đi vào huyền thoại qua ca khúc "Tiếng chày trên Sóc Bom Bo". Nơi đồng bào S\'Tiêng nổi đuốc lồ ô giã gạo thâu đêm nuôi quân phục vụ Chiến dịch Đồng Xoài 1965, biểu tượng bất diệt cho tình đoàn kết quân dân.',
    longStory: `Nhắc đến Bù Đăng, không ai không nhớ về Sóc Bom Bo — địa danh lịch sử anh hùng đã đi vào thi ca và âm nhạc cách mạng qua bài hát bất hủ "Tiếng chày trên Sóc Bom Bo" của cố nhạc sĩ Xuân Hồng.

Đỉnh cao của tinh thần quả cảm diễn ra vào những ngày cuối năm 1965, phục vụ chiến dịch giải phóng Phước Long — Đồng Xoài. Để kịp thời bảo đảm lương thực cho bộ đội chủ lực ăn no đánh thắng, già trẻ gái trai sóc Bom Bo đã không quản ngày đêm, kiên cường vượt qua mưa bom bão đạn. Ban ngày giặc càn quét, bà con chuyển sang giã gạo thâu đêm dưới ánh đuốc lồ ô rực sáng núi rừng. Tiếng chày đôi, chày ba giã gạo nện xuống cối gỗ rộn ràng hòa cùng tiếng hát kháng chiến hào hùng.

Ngày nay, Khu Bảo Tồn Văn Hóa Dân Tộc S'Tiêng Sóc Bom Bo rộng hơn 113 ha được xây dựng khang trang tại xã Bom Bo, trở thành địa chỉ đỏ giáo dục truyền thống và trung tâm bảo tồn di sản sống động. Nơi đây lưu giữ hàng trăm hiện vật vô giá: chày cối giã gạo thời chiến, gùi tải đạn, dàn cồng chiêng cổ và không gian nhà dài truyền thống.`,
    contextStory:
      'Sóc Bom Bo là biểu tượng tiêu biểu nhất cho khối đại đoàn kết toàn dân tộc trong kháng chiến chống Mỹ cứu nước tại miền Đông Nam Bộ. Sự đóng góp to lớn của đồng bào S\'Tiêng nơi đây đã khẳng định chân lý "Cách mạng là sự nghiệp của quần chúng".',
    quickFacts: [
      { label: 'Sự kiện tiêu biểu', value: 'Đêm giã gạo nuôi quân phục vụ Chiến dịch 1965', icon: 'mdi:fire' },
      { label: 'Chủ thể văn hóa', value: 'Đồng bào S\'Tiêng Sóc Bom Bo', icon: 'mdi:account-group' },
      { label: 'Tác phẩm bất hủ', value: '"Tiếng chày trên Sóc Bom Bo" — Nhạc sĩ Xuân Hồng', icon: 'mdi:music' },
      { label: 'Quy mô khu bảo tồn', value: 'Hơn 113 ha tại xã Bom Bo', icon: 'mdi:domain' },
    ],
    timeline: [
      {
        year: '1965',
        title: 'Đêm giã gạo huyền thoại',
        description: 'Đồng bào S\'Tiêng nổi đuốc lồ ô giã gạo thâu đêm nuôi bộ đội đánh thắng trận Đồng Xoài.',
      },
      {
        year: '1966',
        title: 'Ra đời ca khúc "Tiếng chày trên Sóc Bom Bo"',
        description: 'Nhạc sĩ Xuân Hồng sáng tác bài hát sau chuyến công tác thực tế tại sóc Bom Bo.',
      },
      {
        year: '2010 đến nay',
        title: 'Xây dựng Khu bảo tồn văn hóa',
        description: 'Phục dựng nhà dài, nhà đón tiếp, không gian làng nghề và sân lễ hội cồng chiêng.',
      },
    ],
    audio: {
      id: 'aud-011',
      title: 'Huyền Thoại Nhịp Chày Sóc Bom Bo',
      narrator: 'Trần Thị Quyên',
      narratorRole: 'Thuyết minh viên di sản Đồng Nai',
      duration: 908,
      url: '/audio/khu-bao-ton-soc-bom-bo.mp3',
      transcript: 'Sóc Bom Bo là địa danh lịch sử cách mạng hào hùng gắn liền với cuộc kháng chiến chống Mỹ cứu nước của đồng bào S\'tiêng và nhân dân miền Đông Nam Bộ. Trong những năm tháng ác liệt của chiến dịch Đồng Xoài 1965, dưới ánh đuốc lồ ô bập bùng, già trẻ gái trai Sóc Bom Bo đã giã gạo thâu đêm nuôi quân đánh giặc. Nhịp chày giã gạo nhịp nhàng cùng tinh thần bất khuất của già làng Điểu Lên và đồng bào đã đi vào bài hát bất hủ "Tiếng chày trên sóc Bom Bo" của nhạc sĩ Xuân Hồng, trở thành biểu tượng sống động cho tình đoàn kết quân dân và ý chí quật cường.',
      coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    },
    video: {
      title: 'Phim tư liệu Sóc Bom Bo những năm tháng kháng chiến',
      url: '/video/virtual-tour/bom-bo/bom-bo-trailer.mp4',
    },
    educationalConnection: {
      lessonUrl: '/study/lesson/les-001',
      curriculumTopic: 'Lịch sử & Âm nhạc Cách mạng Việt Nam',
      targetAudience: 'Học sinh toàn cấp, du khách hành hương về nguồn',
      reflectionQuestion:
        'Hình ảnh "ngọn đuốc lồ ô bập bùng" và "tiếng chày giã gạo thâu đêm" trong bài hát mang ý nghĩa biểu tượng lịch sử gì?',
      activitySuggestions: [
        'Trải nghiệm cầm chày giã gạo cùng các nghệ nhân S\'Tiêng tại khu bảo tồn.',
        'Hát và phân tích hoàn cảnh ra đời bài hát "Tiếng chày trên Sóc Bom Bo".',
      ],
    },
    locationGuide: {
      accessNote: 'Đường nhựa ô tô lớn từ QL14 rẽ vào đường ĐT760 khoảng 8 km đến cổng Khu bảo tồn Sóc Bom Bo.',
      openHours: '07:30 – 17:30 tất cả các ngày trong tuần',
      facilities: ['Nhà trưng bày hiện vật', 'Nhà dài truyền thống', 'Nhà hàng ẩm thực cơm lam rượu cần', 'Bãi đỗ xe ô tô'],
    },
    conservationStatus: 'Di tích Lịch sử & Khu Bảo Tồn Văn Hóa cấp Tỉnh',
    relatedIds: ['hrt-003', 'hrt-001', 'hrt-004'],
    tags: ['sóc bom bo', 'giã gạo', 'S\'tiêng', 'kháng chiến', 'di tích lịch sử', 'Bom Bo', 'nhà dài', 'Xuân Hồng'],
    references: [
      'UBND Huyện Bù Đăng & Sở VHTTDL (2016). Kỷ yếu Di tích Lịch sử và Văn hóa Khu Bảo Tồn Sóc Bom Bo.',
      'Hội Khoa học Lịch sử Việt Nam (2017). Phong trào giã gạo nuôi quân và tinh thần bất khuất của người S\'Tiêng Sóc Bom Bo. NXB KHXH.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-05-25',
    viewCount: 4210,
  },
  {
    id: 'hrt-012',
    slug: 'nui-ba-ra-phuoc-long',
    title: 'Núi Bà Rá — Đỉnh Thiêng Đông Nam Bộ',
    subtitle: 'Nóc nhà lịch sử của miền đất anh hùng',
    category: 'danh-thang',
    period: 'khang-chien',
    cluster: 'phuoc-long',
    archetype: 'natural',
    year: 'Lịch sử và tự nhiên',
    coverImage: '/images/heritage/img-disanbudang/nui-ba-ra.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
        alt: 'Núi Bà Rá nhìn từ Hồ Thác Mơ',
        caption: 'Đỉnh Bà Rá sừng sững bên hồ Thác Mơ — biểu tượng của vùng đất Phước Long',
      },
    ],
    coordinates: { lat: 11.8169, lng: 107.0009 },
    shortDescription:
      'Núi Bà Rá (cao 723m) là đỉnh núi cao thứ 3 ở Nam Bộ, tọa lạc tại phường Phước Long, Thành phố Đồng Nai. Không chỉ là danh lam thắng cảnh hùng vĩ soi bóng hồ Thác Mơ, nơi đây còn ghi dấu chứng tích lịch sử Nhà tù Bà Rá và các trận đánh oanh liệt trong hai cuộc kháng chiến.',
    longStory: `Sừng sững giữa vùng đất Phước Long, Núi Bà Rá vươn cao 723 mét so với mực nước biển, là đỉnh núi cao thứ 3 tại Nam Bộ (sau núi Bà Đen và núi Chứa Chan). Với vị thế quân sự hiểm trở khống chế toàn bộ vùng Đông Bắc miền Đông Nam Bộ, ngọn núi đã chứng kiến những trang sử bi hùng của dân tộc.

Từ năm 1930, thực dân Pháp đã xây dựng Nhà tù Bà Rá trên lưng chừng núi — một trong những "địa ngục trần gian" khét tiếng để đày ải, giam cầm các chiến sĩ cộng sản và chí sĩ yêu nước kiên trung. Trong lao tù khắc nghiệt, các chiến sĩ cách mạng vẫn giữ vững khí tiết, biến nhà tù đế quốc thành trường học cách mạng.

Trong kháng chiến chống Mỹ, đỉnh Bà Rá là căn cứ điện đài và pháo binh chiến lược của địch. Quân giải phóng đã nhiều lần tổ chức các trận đánh dũng cảm, đỉnh cao là đợt tiến công tiêu diệt căn cứ địch trên đỉnh núi trong Chiến dịch Đường 14 – Phước Long đầu năm 1975, mở toang cánh cửa giải phóng thị xã.`,
    contextStory:
      'Núi Bà Rá hợp cùng Hồ Thác Mơ tạo thành quần thể di tích - danh thắng độc đáo. Từ đỉnh núi có thể phóng tầm mắt bao quát toàn cảnh lòng hồ thủy điện, rừng xanh đại ngàn và thị xã Phước Long trù phú.',
    quickFacts: [
      { label: 'Độ cao đỉnh núi', value: '723 mét (đỉnh núi cao thứ 3 Nam Bộ)', icon: 'mdi:mountain' },
      { label: 'Vị trí hành chính', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Di tích lịch sử', value: 'Chứng tích Nhà tù Bà Rá (1930–1945)', icon: 'mdi:castle' },
      { label: 'Địa thế quân sự', value: 'Điểm cao chiến lược trong Chiến dịch Phước Long 1975', icon: 'mdi:shield-star' },
    ],
    timeline: [
      {
        year: '1930',
        title: 'Thực dân Pháp lập nhà tù Bà Rá',
        description: 'Xây dựng nhà tù kiên cố để giam cầm tù chính trị và đảng viên cộng sản.',
      },
      {
        year: '06/01/1975',
        title: 'Kéo cờ giải phóng trên đỉnh Bà Rá',
        description: 'Quân giải phóng cắm cờ chiến thắng trên đỉnh núi, giải phóng hoàn toàn tỉnh Phước Long.',
      },
      {
        year: '1995 đến nay',
        title: 'Xây dựng đài tưởng niệm & Cáp treo',
        description: 'Phục hồi di tích Nhà bia tưởng niệm các anh hùng liệt sĩ và đưa hệ thống cáp treo vào phục vụ du khách.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-012',
      curriculumTopic: 'Địa lý & Lịch sử Đấu tranh Cách mạng Phước Long',
      targetAudience: 'Học sinh các cấp, vận động viên leo núi và du khách hành hương',
      reflectionQuestion:
        'Ý nghĩa quân sự của điểm cao Núi Bà Rá trong Chiến dịch Đường 14 – Phước Long mùa xuân năm 1975 là gì?',
      activitySuggestions: [
        'Tham gia giải việt dã leo núi "Chinh phục đỉnh cao Bà Rá" truyền thống.',
        'Dâng hương viếng Nhà bia tưởng niệm các chiến sĩ cách mạng tại chân núi.',
      ],
    },
    locationGuide: {
      accessNote: 'Đường nhựa chân núi thuận tiện. Du khách có thể lên đỉnh bằng hệ thống cáp treo hoặc đi bộ theo tuyến đường bậc đá bộ hành.',
      bestTimeToVisit: 'Tháng 11 đến tháng 4 năm sau (trời trong, không mưa, tầm nhìn từ đỉnh núi rõ nét).',
      facilities: ['Ga cáp treo Núi Bà Rá', 'Nhà bia tưởng niệm', 'Khu viếng đền thờ Bà Rá'],
    },
    conservationStatus: 'Di tích Lịch sử & Danh lam Thắng cảnh cấp Quốc gia [CẦN XÁC MINH số quyết định]',
    relatedIds: ['hrt-002', 'hrt-013'],
    tags: ['núi Bà Rá', 'Phước Long', 'nhà tù', 'danh thắng', 'lịch sử', 'Đông Nam Bộ', 'leo núi'],
    references: [
      'Bộ Văn hóa Thông tin (1994). Hồ sơ Di tích Lịch sử Nhà tù Bà Rá và Thắng cảnh Núi Bà Rá.',
      'Ban Tuyên giáo (2015). Lịch sử Đấu tranh Cách mạng tại Nhà tù Núi Bà Rá (1930–1945). NXB Chính trị Quốc gia Sự thật.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-06-01',
    viewCount: 1820,
  },
  {
    id: 'hrt-013',
    slug: 'chien-thang-phuoc-long-1975',
    title: 'Chiến Thắng Phước Long 06/01/1975',
    subtitle: '"Trận trinh sát chiến lược" mở đường cho Đại thắng Mùa Xuân',
    category: 'lich-su',
    period: 'khang-chien',
    cluster: 'phuoc-long',
    archetype: 'historical',
    year: '1975',
    coverImage: '/images/heritage/img-disanbudang/tuong-dai-phuoc-long-chien-thang.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/tuong-dai-phuoc-long-chien-thang.jpg',
        alt: 'Chiến thắng Phước Long',
        caption: 'Tượng đài Chiến thắng Phước Long — biểu tượng hào hùng của vùng đất',
      },
    ],
    coordinates: { lat: 11.888, lng: 107.001 },
    shortDescription:
      'Chiến thắng Phước Long ngày 06/01/1975 là chiến thắng giải phóng tỉnh lỵ đầu tiên ở miền Nam — một "trận trinh sát chiến lược" mang tầm vóc lịch sử, chứng minh khả năng sụp đổ của quân đội Sài Gòn và Mỹ không thể can thiệp trở lại, mở đường cho Đại thắng Mùa Xuân 1975.',
    longStory: `Ngày 06/01/1975, quân và dân ta hoàn toàn giải phóng tỉnh Phước Long — tỉnh lỵ đầu tiên ở miền Nam được giải phóng hoàn toàn trong cuộc kháng chiến chống Mỹ. Chiến thắng lịch sử này không đơn thuần là một thắng lợi quân sự thông thường, mà là "trận trinh sát chiến lược" có tầm quan trọng đặc biệt đối với cục diện toàn chiến trường.

Bắt đầu từ ngày 13/12/1974, lực lượng Quân đoàn 4 kết hợp cùng bộ đội địa phương và nhân dân Phước Long đã mở đợt tiến công liên hoàn tiêu diệt các cứ điểm then chốt: Bù Đốp, Bù Đăng, Đắk Nhau, chi khu Phước Bình và đỉnh cao là cuộc tiến công dứt điểm tỉnh lỵ Phước Long cùng điểm cao Núi Bà Rá vào ngày 06/01/1975.

Kết quả của chiến dịch Phước Long đã chứng minh một thực tế mang tính bước ngoặt: quân đội Sài Gòn đã suy yếu nghiêm trọng và không còn khả năng phản công tái chiếm, đồng thời Hoa Kỳ đã không thể đưa quân can thiệp trở lại. Đây chính là cơ sở thực tiễn vô giá để Bộ Chính trị Trung ương Đảng họp và hạ quyết tâm chiến lược giải phóng hoàn toàn miền Nam trong năm 1975.`,
    contextStory:
      'Chiến thắng Phước Long là phát súng lệnh mở màn cho chuỗi tiến công bão táp của Chiến dịch Tây Nguyên, Chiến dịch Huế — Đà Nẵng và Chiến dịch Hồ Chí Minh lịch sử, kết thúc trọn vẹn 30 năm chiến tranh giải phóng dân tộc.',
    quickFacts: [
      { label: 'Thời gian chiến dịch', value: '13/12/1974 – 06/01/1975', icon: 'mdi:calendar-star' },
      { label: 'Ý nghĩa chiến lược', value: 'Giải phóng tỉnh đầu tiên ở miền Nam — Đòn trinh sát chiến lược', icon: 'mdi:flag' },
      { label: 'Lực lượng chủ công', value: 'Quân đoàn 4, LLVT địa phương & nhân dân', icon: 'mdi:account-group' },
      { label: 'Công trình tưởng niệm', value: 'Tượng đài Chiến thắng Phước Long', icon: 'mdi:castle' },
    ],
    timeline: [
      {
        year: '13/12/1974',
        title: 'Mở màn chiến dịch Đường 14 – Phước Long',
        description: 'Tiến công tiêu diệt chi khu quân sự Bù Đăng và giải phóng các đoạn đường huyết mạch.',
      },
      {
        year: '06/01/1975',
        title: 'Giải phóng hoàn toàn Phước Long',
        description: 'Cờ chiến thắng tung bay trên đỉnh núi Bà Rá và trung tâm tỉnh lỵ Phước Long.',
      },
      {
        year: '30/04/1975',
        title: 'Đại thắng Mùa Xuân',
        description: 'Chiến dịch Hồ Chí Minh toàn thắng, giải phóng hoàn toàn miền Nam thống nhất đất nước.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-013',
      curriculumTopic: 'Nghệ thuật Quân sự & Cục diện Cuộc Tổng tiến công Mùa Xuân 1975',
      targetAudience: 'Học sinh THPT, sinh viên lịch sử và cán bộ đoàn viên',
      reflectionQuestion:
        'Tại sao chiến thắng Phước Long lại được Bộ Chính trị đánh giá là "trận trinh sát chiến lược" quyết định thời cơ giải phóng miền Nam?',
      activitySuggestions: [
        'Lập bảng niên biểu 26 ngày đêm Chiến dịch Đường 14 – Phước Long.',
        'Thăm viếng và dâng hoa tại Tượng đài Chiến thắng Phước Long.',
      ],
    },
    locationGuide: {
      accessNote: 'Tượng đài Chiến thắng Phước Long tọa lạc tại trung tâm khu phố Thác Mơ, phường Phước Long, giao thông thuận tiện.',
      bestTimeToVisit: 'Dịp kỷ niệm ngày Giải phóng Phước Long 06/01 hàng năm.',
      facilities: ['Quảng trường công viên tượng đài', 'Nhà truyền thống'],
    },
    conservationStatus: 'Di tích Lịch sử cấp Quốc gia',
    relatedIds: ['hrt-012', 'hrt-016'],
    tags: ['chiến thắng Phước Long', 'lịch sử', 'kháng chiến', '1975', 'Đại thắng Mùa Xuân', 'Quân đoàn 4'],
    references: [
      'Viện Lịch sử Quân sự Việt Nam (2020). Chiến dịch Đường 14 — Đòn trinh sát chiến lược mở màn Đại thắng Mùa Xuân. NXB QĐND.',
      'Bộ Tư lệnh Quân khu 7 & Tỉnh ủy (2015). Kỷ yếu Chiến dịch Đường 14 — Phước Long Giải Phóng (06/01/1975).',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-06-10',
    viewCount: 2350,
  },
  {
    id: 'hrt-014',
    slug: 'can-cu-ta-thiet-loc-ninh',
    title: 'Căn Cứ Tà Thiết — Bộ Chỉ Huy Miền',
    subtitle: 'Trái tim chiến lược của cách mạng miền Nam',
    category: 'lich-su',
    period: 'khang-chien',
    cluster: 'loc-ninh',
    archetype: 'historical',
    year: '1973–1975',
    coverImage: '/images/heritage/img-disanbudang/can-cu-ta-thiet.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/can-cu-ta-thiet.jpg',
        alt: 'Căn cứ Tà Thiết',
        caption: 'Rừng già che phủ Căn cứ Tà Thiết — Bộ Chỉ huy Quân giải phóng miền Nam',
      },
    ],
    coordinates: { lat: 11.7540, lng: 106.5124 },
    shortDescription:
      'Căn cứ Tà Thiết (xã Lộc Thành, Thành phố Đồng Nai) là Di tích Quốc gia Đặc biệt — căn cứ đầu não của Bộ Chỉ huy Quân giải phóng miền Nam Việt Nam giai đoạn 1973–1975, nơi vạch kế hoạch và chỉ huy Chiến dịch Hồ Chí Minh lịch sử.',
    longStory: `Ẩn mình dưới tán rừng nguyên sinh rậm rạp của xã Lộc Thành, Căn cứ Tà Thiết được mệnh danh là "Rừng Chính phủ" — trung tâm đầu não chỉ huy toàn bộ cuộc kháng chiến chống Mỹ trên chiến trường miền Nam trong giai đoạn cuối của cuộc chiến.

Sau khi Hiệp định Paris được ký kết năm 1973, Bộ Tư lệnh Miền đã chuyển về đóng sở chỉ huy tại Tà Thiết. Trong điều kiện chiến tranh, căn cứ được xây dựng thành một quần thể cơ quan hoàn chỉnh nhưng ngụy trang tuyệt đối bí mật: hội trường lớn, nhà làm việc của các tướng lĩnh (Thượng tướng Trần Văn Trà, Thiếu tướng Lê Đức Anh...), hầm chỉ huy ngầm, trạm thông tin cơ yếu và bệnh viện dã chiến. Máy bay trinh sát tầm cao của đối phương hoàn toàn không thể phát hiện được hoạt động của cả một trung tâm quân sự khổng lồ.

Chính tại Tà Thiết, Bộ Chỉ huy Chiến dịch Giải phóng Sài Gòn — Gia Định (sau đổi tên thành Chiến dịch Hồ Chí Minh) do Đại tướng Văn Tiến Dũng làm Tư lệnh đã họp bàn, phê chuẩn phương án tác chiến thần tốc của 5 cánh quân tiến vào giải phóng Sài Gòn, kết thúc toàn thắng cuộc kháng chiến cứu nước.`,
    contextStory:
      'Căn cứ Tà Thiết là minh chứng đỉnh cao cho nghệ thuật tổ chức chiến khu và chỉ huy quân sự tài tình của Quân đội Nhân dân Việt Nam, xứng đáng là Di tích Quốc gia Đặc biệt có giá trị lịch sử và giáo dục truyền thống cách mạng sâu sắc.',
    quickFacts: [
      { label: 'Thời gian hoạt động', value: '1973 – 30/04/1975', icon: 'mdi:calendar-range' },
      { label: 'Cấp bậc xếp hạng', value: 'Di tích Quốc gia Đặc biệt (QĐ 2367/QĐ-TTg)', icon: 'mdi:shield-check' },
      { label: 'Diện tích bảo vệ', value: 'Hơn 16 km² rừng căn cứ', icon: 'mdi:map-outline' },
      { label: 'Sự kiện lịch sử', value: 'Nơi vạch kế hoạch Chiến dịch Hồ Chí Minh 1975', icon: 'mdi:star' },
    ],
    timeline: [
      {
        year: '1973',
        title: 'Chuyển căn cứ về Tà Thiết',
        description: 'Bộ Tư lệnh Miền thiết lập sở chỉ huy bí mật dưới tán rừng già Lộc Ninh.',
      },
      {
        year: 'Tháng 4/1975',
        title: 'Chỉ huy Chiến dịch Hồ Chí Minh',
        description: 'Họp thông qua phương án tác chiến 5 cánh quân giải phóng hoàn toàn miền Nam.',
      },
      {
        year: '23/12/2015',
        title: 'Xếp hạng Di tích Quốc gia Đặc biệt',
        description: 'Thủ tướng Chính phủ ký Quyết định số 2367/QĐ-TTg công nhận Di tích Quốc gia Đặc biệt.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-014',
      curriculumTopic: 'Cơ quan Đầu não Kháng chiến & Chiến dịch Hồ Chí Minh',
      targetAudience: 'Học sinh, sinh viên, cán bộ chiến sĩ lực lượng vũ trang',
      reflectionQuestion:
        'Nghệ thuật ngụy trang và bảo mật công sự của Căn cứ Tà Thiết dưới tán rừng già đã đem lại bài học gì cho công tác quốc phòng an ninh?',
      activitySuggestions: [
        'Vẽ sơ đồ phân khu chức năng Căn cứ Tà Thiết (Nhà chỉ huy, Hầm cơ yếu, Hội trường).',
        'Tìm hiểu tiểu sử và chiến công của các tướng lĩnh chỉ huy tại Tà Thiết năm 1975.',
      ],
    },
    locationGuide: {
      accessNote: 'Từ QL13 rẽ vào đường liên xã Lộc Thành khoảng 9 km, đường nhựa lớn xe buýt du lịch vào tận sân đón tiếp.',
      openHours: '07:30 – 17:00 tất cả các ngày trong tuần',
      facilities: ['Nhà trưng bày hiện vật', 'Hệ thống hầm hào phục dựng', 'Khu tưởng niệm Bác Hồ và các tướng lĩnh'],
    },
    conservationStatus: 'Di tích Quốc gia Đặc biệt (Quyết định 2367/QĐ-TTg)',
    relatedIds: ['hrt-015', 'hrt-013'],
    tags: ['căn cứ Tà Thiết', 'Lộc Ninh', 'Bộ Tư lệnh Miền', 'kháng chiến', 'di tích quốc gia đặc biệt', 'Chiến dịch Hồ Chí Minh'],
    references: [
      'Thủ tướng Chính phủ (2015). Quyết định số 2367/QĐ-TTg ngày 23/12/2015 xếp hạng Di tích Quốc gia Đặc biệt Căn cứ Bộ Chỉ huy Miền.',
      'Viện Lịch sử Quân sự Việt Nam (2018). Bộ Chỉ huy Quân giải phóng miền Nam tại Tà Thiết trong cuộc kháng chiến chống Mỹ. NXB QĐND.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-06-15',
    viewCount: 1980,
  },
  {
    id: 'hrt-015',
    slug: 'nha-giao-te-loc-ninh',
    title: 'Nhà Giao Tế Lộc Ninh',
    subtitle: 'Chứng nhân của Hiệp định Paris và ngoại giao cách mạng',
    category: 'lich-su',
    period: 'khang-chien',
    cluster: 'loc-ninh',
    archetype: 'artifact',
    year: '1973–1975',
    coverImage: '/images/heritage/img-disanbudang/nha-giao-te-loc-ninh.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/nha-giao-te-loc-ninh.jpg',
        alt: 'Nhà Giao Tế Lộc Ninh',
        caption: 'Di tích Nhà Giao Tế Lộc Ninh — nơi diễn ra các cuộc họp Ban Liên hợp quân sự bốn bên',
      },
    ],
    coordinates: { lat: 11.843, lng: 106.607 },
    shortDescription:
      'Nhà Giao Tế Lộc Ninh là Di tích Quốc gia Đặc biệt (thuộc cụm di tích Lộc Ninh) — trụ sở của Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam, nơi đón tiếp các đoàn ngoại giao quốc tế và diễn ra các phiên họp của Ban Liên hợp Quân sự bốn bên theo Hiệp định Paris 1973.',
    longStory: `Nhà Giao Tế Lộc Ninh mang trong mình một ý nghĩa đặc biệt trong lịch sử ngoại giao và chính trị của cách mạng Việt Nam. Công trình được thiết kế bởi kiến trúc sư tài hoa Huỳnh Tấn Phát — lúc bấy giờ là Chủ tịch Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam.

Sau khi Lộc Ninh được hoàn toàn giải phóng vào ngày 07/04/1972 và Hiệp định Paris được ký kết ngày 27/01/1973, Lộc Ninh trở thành "thủ đô giải phóng" đầu tiên hoạt động công khai ở miền Nam. Nhà Giao Tế được xây dựng khang trang làm nơi đặt trụ sở làm việc, đón tiếp các đại sứ quán quốc tế, đoàn Ủy ban Quốc tế Kiểm soát và Giám sát Đình chiến (ICCS).

Tại ngôi nhà này, dưới sự chứng kiến của phóng viên báo chí quốc tế, các cuộc đàm phán quân sự căng thẳng về trao trả tù binh, thực hiện ngừng bắn và xác định ranh giới vùng kiểm soát giữa 4 bên đã diễn ra. Nhà Giao Tế Lộc Ninh là biểu tượng sáng ngời cho bản lĩnh ngoại giao kiên định và khát vọng hòa bình của dân tộc Việt Nam.`,
    contextStory:
      'Nhà Giao Tế Lộc Ninh là chứng tích duy nhất phản ánh mặt trận đấu tranh ngoại giao công khai của cách mạng miền Nam ngay trên vùng giải phóng sau Hiệp định Paris 1973, kết hợp nhuần nhuyễn giữa đấu tranh quân sự và pháp lý quốc tế.',
    quickFacts: [
      { label: 'Thời gian hoạt động', value: '1973 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Kiến trúc sư thiết kế', value: 'Huỳnh Tấn Phát (Chủ tịch CP CMLT)', icon: 'mdi:pencil-ruler' },
      { label: 'Cấp bậc di tích', value: 'Di tích Quốc gia Đặc biệt (QĐ 2408/QĐ-TTg)', icon: 'mdi:shield-check' },
      { label: 'Chức năng lịch sử', value: 'Trụ sở ngoại giao & Họp Ban Liên hợp quân sự 4 bên', icon: 'mdi:handshake' },
    ],
    timeline: [
      {
        year: '27/01/1973',
        title: 'Hiệp định Paris được ký kết',
        description: 'Lộc Ninh trở thành trung tâm đón tiếp ngoại giao và giám sát đình chiến.',
      },
      {
        year: '1973–1975',
        title: 'Hội nghị quân sự bốn bên',
        description: 'Diễn ra các cuộc đàm phán trao trả tù binh và thực hiện điều khoản ngừng bắn.',
      },
      {
        year: '31/12/2014',
        title: 'Xếp hạng Di tích Quốc gia Đặc biệt',
        description: 'Thủ tướng Chính phủ ban hành Quyết định số 2408/QĐ-TTg xếp hạng di tích.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-015',
      curriculumTopic: 'Hiệp định Paris 1973 & Ngoại giao Cách mạng Việt Nam',
      targetAudience: 'Học sinh THPT, sinh viên ngành ngoại giao, luật quốc tế',
      reflectionQuestion:
        'Vai trò của mặt trận ngoại giao tại Nhà Giao Tế Lộc Ninh đã hỗ trợ như thế nào cho thắng lợi quân sự trên chiến trường miền Nam?',
      activitySuggestions: [
        'Mô phỏng một phiên làm việc trao trả tù binh của Ban Liên hợp Quân sự bốn bên.',
        'Tìm hiểu cuộc đời và sự nghiệp kiến trúc — cách mạng của KTS. Huỳnh Tấn Phát.',
      ],
    },
    locationGuide: {
      accessNote: 'Tọa lạc tại khu phố Ninh Thịnh, thị trấn Lộc Ninh, ngay mặt tiền đường giao thông lớn.',
      openHours: '07:30 – 17:00 các ngày trong tuần',
      facilities: ['Phòng trưng bày ảnh tư liệu ngoại giao', 'Bàn hội nghị bốn bên phục dựng'],
    },
    conservationStatus: 'Di tích Quốc gia Đặc biệt (Quyết định 2408/QĐ-TTg)',
    relatedIds: ['hrt-014', 'hrt-013'],
    tags: ['Lộc Ninh', 'Nhà Giao Tế', 'Hiệp định Paris', 'ngoại giao', 'di tích quốc gia đặc biệt', 'kháng chiến', 'Huỳnh Tấn Phát'],
    references: [
      'Thủ tướng Chính phủ (2014). Quyết định số 2408/QĐ-TTg ngày 31/12/2014 xếp hạng Di tích Quốc gia Đặc biệt Nhà Giao Tế Lộc Ninh.',
      'TS. Nguyễn Thị Oanh (2017). Ngoại giao Cách mạng tại Lộc Ninh thời kỳ sau Hiệp định Paris 1973. Tạp chí Lịch sử Đảng.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-06-20',
    viewCount: 1120,
  },
  {
    id: 'hrt-016',
    slug: 'bao-tang-chien-dich-duong-14-phuoc-long',
    title: 'Bảo Tàng Chiến Dịch Đường 14 – Phước Long',
    subtitle: 'Kho tàng sống của ký ức kháng chiến',
    category: 'lich-su',
    period: 'khang-chien',
    cluster: 'phuoc-long',
    archetype: 'artifact',
    year: '1975',
    coverImage: '/images/heritage/img-disanbudang/bao-tang-duong-14.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/bao-tang-duong-14.jpg',
        alt: 'Bảo tàng Chiến dịch Đường 14',
        caption: 'Bảo tàng lưu giữ hiện vật, vũ khí và tư liệu quý về Chiến dịch Đường 14 – Phước Long lịch sử',
      },
    ],
    coordinates: { lat: 11.877, lng: 107.014 },
    shortDescription:
      'Bảo Tàng Chiến Dịch Đường 14 – Phước Long (phường Phước Long, Thành phố Đồng Nai) là thiết chế lưu giữ và trưng bày hàng nghìn hiện vật, bản đồ tác chiến, vũ khí và tư liệu hình ảnh sống động về 26 ngày đêm chiến dịch giải phóng Phước Long (12/1974 – 01/1975).',
    longStory: `Bảo tàng Chiến dịch Đường 14 – Phước Long là không gian lưu giữ ký ức hào hùng về một trong những chiến dịch quân sự bản lề mở màn cho cuộc Tổng tiến công và nổi dậy Mùa Xuân 1975.

Hệ thống trưng bày chuyên đề tại bảo tàng tái hiện toàn diện diễn biến chiến dịch qua 4 không gian trọng tâm:
1. **Âm mưu phòng thủ của đối phương:** Bản đồ bố phòng quân sự kiên cố của sư đoàn đối phương dọc trục Quốc lộ 14 và cụm cứ điểm Núi Bà Rá.
2. **Hành lang tiếp vận của quân dân ta:** Hiện vật xe thồ, gùi tải đạn xuyên rừng Bù Đăng, dụng cụ công binh mở đường của bộ đội chủ lực.
3. **26 ngày đêm quyết chiến:** Sa bàn điện tử tái hiện các đợt tiến công hiệp đồng binh chủng tiêu diệt các chi khu Bù Đốp, Bù Đăng và làm chủ thị xã Phước Long ngày 06/01/1975.
4. **Kỷ vật nhân chứng sống:** Những lá thư thời chiến, nhật ký chiến trường, quân trang sờn rách và bức ảnh lá cờ chiến thắng tung bay trên đỉnh Bà Rá.

Bảo tàng là địa chỉ đỏ giáo dục truyền thống cách mạng thiêng liêng, nơi thế hệ trẻ trực tiếp tiếp xúc với những hiện vật lịch sử sống động, thấm thía giá trị của hòa bình và độc lập tự do.`,
    contextStory:
      'Chiến thắng Đường 14 – Phước Long được Bộ Chính trị đánh giá là thắng lợi quân sự có tính bước ngoặt chiến lược. Bảo tàng không chỉ phục vụ tham quan mà còn là trung tâm lưu trữ dữ liệu khoa học lịch sử quân sự của toàn khu vực.',
    quickFacts: [
      { label: 'Vị trí bảo tàng', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Nội dung trưng bày', value: 'Chiến dịch Đường 14 – Phước Long (13/12/1974 – 06/01/1975)', icon: 'mdi:calendar-range' },
      { label: 'Hiện vật tiêu biểu', value: 'Sa bàn điện tử, súng cối 82mm, bản đồ tác chiến gốc', icon: 'mdi:archive' },
      { label: 'Chức năng', value: 'Bảo tàng chuyên đề lịch sử quân sự', icon: 'mdi:museum' },
    ],
    timeline: [
      {
        year: '13/12/1974 – 06/01/1975',
        title: 'Chiến dịch Đường 14 – Phước Long',
        description: '26 ngày đêm tiến công dũng cảm giải phóng hoàn toàn tỉnh Phước Long.',
      },
      {
        year: '1995 đến nay',
        title: 'Thành lập và hiện đại hóa bảo tàng',
        description: 'Sưu tầm hiện vật thực địa, ứng dụng công nghệ thuyết minh số và sa bàn tương tác.',
      },
    ],
    educationalConnection: {
      lessonUrl: '/study/lesson/les-016',
      curriculumTopic: 'Khảo cứu Hiện vật Lịch sử Quân sự & Bảo tàng học',
      targetAudience: 'Học sinh các trường phổ thông, sinh viên lịch sử, du khách',
      reflectionQuestion:
        'Phương pháp khảo cứu hiện vật gốc trong bảo tàng giúp người học hiểu sâu hơn về lịch sử chiến tranh như thế nào so với việc chỉ đọc sách giáo khoa?',
      activitySuggestions: [
        'Chọn một hiện vật tại bảo tàng và viết bài thuyết minh 300 từ về hoàn cảnh lịch sử của hiện vật đó.',
        'Quan sát sa bàn tác chiến và thuật lại diễn biến 3 giai đoạn của chiến dịch.',
      ],
    },
    locationGuide: {
      accessNote: 'Nằm tại trung tâm phường Phước Long, gần chân núi Bà Rá và hồ Thác Mơ.',
      openHours: '08:00 – 11:30 & 13:30 – 16:30 (Thứ Ba đến Chủ Nhật)',
      facilities: ['Phòng trưng bày hiện vật', 'Hội trường chiếu phim tư liệu', 'Bãi đỗ xe tham quan'],
    },
    conservationStatus: 'Thiết chế Bảo tàng Di tích Lịch sử cấp Tỉnh [CẦN XÁC MINH số lượng hiện vật kiểm kê]',
    verificationNote: 'Cần cập nhật danh mục hiện vật số hóa mới nhất từ ban quản lý bảo tàng.',
    relatedIds: ['hrt-013', 'hrt-012'],
    tags: ['bảo tàng', 'Phước Long', 'chiến dịch Đường 14', 'lịch sử', 'kháng chiến', '1975', 'hiện vật'],
    references: [
      'Bảo tàng Chiến dịch Đường 14 – Phước Long. Tổng quan trưng bày hiện vật.',
      'Bảo tàng Lực lượng Vũ trang Miền Đông Nam Bộ (2018). Sưu tập hiện vật và chứng tích lịch sử Chiến dịch Đường 14 – Phước Long. NXB QK7.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-07-01',
    viewCount: 890,
  },
]

HERITAGES.forEach((h) => {
  h.sources = HERITAGE_SOURCES[h.id] || []
})

export const HERITAGE_ITEMS = HERITAGES
export const getFeaturedHeritages = () => HERITAGES.filter((h) => h.featured)
export const getHeritageBySlug = (slug: string) => HERITAGES.find((h) => h.slug === slug)
export const getHeritageById = (id: string) => HERITAGES.find((h) => h.id === id)
export const getHeritagesByCategory = (category: string) =>
  HERITAGES.filter((h) => h.category === category)

