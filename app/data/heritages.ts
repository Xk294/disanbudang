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
    coordinates: { lat: 11.8462, lng: 107.1680 }, // Vùng rừng Bù Đăng — khu vực di tích căn cứ
    shortDescription:
      'Căn cứ Nửa Lon là di tích lịch sử cách mạng nổi bật tại Xã Bù Đăng, Thành Phố Đồng Nai. Ra đời trong những năm kháng chiến chống Mỹ gian khổ (1960-1965), nơi đây gắn liền với tên gọi đầy xúc động khi mỗi cán bộ, chiến sĩ chỉ được chia khẩu phần ăn nửa lon gạo mỗi ngày để nhường cơm cho đồng bào và tiền tuyến, trở thành biểu tượng kiên cường của tinh thần vượt khó và tình quân dân thắm thiết.',
    longStory: `Nằm sâu trong những cánh rừng già của vùng đất Bù Đăng, di tích Căn cứ Nửa Lon là minh chứng sống động cho ý chí thép và tình đoàn kết keo sơn giữa quân và dân trong cuộc kháng chiến chống Mỹ cứu nước.

Tên gọi "Nửa Lon" thân thương mà oai hùng bắt đầu từ giai đoạn khó khăn nhất của cách mạng miền Nam vào những năm 1960 - 1965. Khi đó, nguồn tiếp tế lương thực bị cắt đứt, toàn bộ chiến sĩ và đồng bào dân tộc S'tiêng tại căn cứ phải đối mặt với nạn đói trầm trọng. Để duy trì sự sống và tiếp tục chiến đấu, mỗi người chỉ được phân chia khẩu phần ăn đúng nửa lon gạo mỗi ngày. Thế nhưng, trong gian khổ ấy, người dân Bù Đăng vẫn sẵn lòng nhường cơm sẻ áo, giã gạo nuôi quân thâu đêm như tại sóc Bom Bo để dành những hạt gạo quý giá nhất cho bộ đội chủ lực.

Căn cứ Nửa Lon không chỉ là nơi sinh hoạt, huấn luyện mà còn là điểm mở đầu quan trọng của tuyến hành lang chiến lược nối liền hậu phương lớn miền Bắc với tiền tuyến miền Nam, góp phần hình thành nên tuyến đường mòn Hồ Chí Minh huyền thoại. Đây cũng là nơi tập kết của hàng vạn cán bộ, chiến sĩ trước khi tiến vào các chiến trường ác liệt.

Ngày nay, dấu tích chiến khu xưa đã hòa vào những rẫy điều, vườn cao su xanh tốt, nhưng Căn cứ Nửa Lon mãi mãi là địa chỉ đỏ giáo dục truyền thống cách mạng, nhắc nhở thế hệ trẻ về tinh thần vượt gian khổ và lòng yêu nước sắt son của cha ông.`,
    quickFacts: [
      { label: 'Giai đoạn lịch sử', value: '1960–1965', icon: 'mdi:calendar-range' },
      { label: 'Loại hình di tích', value: 'Căn cứ kháng chiến', icon: 'mdi:medal' },
      { label: 'Khẩu phần biểu tượng', value: 'Nửa lon gạo / ngày', icon: 'mdi:food-variant' },
      { label: 'Tầm quan trọng', value: 'Đầu tuyến hành lang chiến lược', icon: 'mdi:routes' },
    ],
    timeline: [
      {
        year: '1960',
        title: 'Hình thành căn cứ',
        description: 'Căn cứ được xây dựng giữa rừng già Bù Đăng để làm trạm trung chuyển hành lang chiến lược.',
      },
      {
        year: '1962',
        title: 'Thời kỳ gian khổ',
        description: 'Tên gọi "Nửa Lon" ra đời khi quân dân đồng lòng chia nhau từng nửa lon gạo vượt qua nạn đói.',
      },
      {
        year: '1975',
        title: 'Góp công giải phóng',
        description: 'Căn cứ đóng vai trò đầu mối tiếp nhận quân nhu vững chắc giúp giải phóng Bù Đăng và tỉnh Phước Long.',
      },
    ],

    relatedIds: ['hrt-005', 'hrt-006'],
    tags: ['cách mạng', 'lịch sử', 'kháng chiến', 'rừng', 'căn cứ địa', 'Bù Đăng'],
    references: [
      'Ban Tuyên giáo Huyện ủy Bù Đăng. Lịch sử Đảng bộ địa phương.',
      'Viện Lịch sử Quân sự Việt Nam. Các di tích lịch sử kháng chiến miền Đông Nam Bộ.',
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
      'Hồ Thác Mơ là thắng cảnh thiên nhiên nổi bật thuộc phường Phước Long (khu phố Thác Mơ), Thành phố Đồng Nai — hồ thủy điện trên sông Bé trải rộng gần 640 ha, soi bóng chân núi Bà Rá hùng vĩ, là biểu tượng du lịch sinh thái của vùng đất Phước Long.',
    longStory: `Ẩn mình dưới chân núi Bà Rá linh thiêng, Hồ Thác Mơ hiện ra như một tấm gương khổng lồ phản chiếu mây trời và rừng núi hùng vĩ. Hồ thủy điện Thác Mơ được xây dựng trên dòng sông Bé, thuộc địa bàn khu phố Thác Mơ, phường Phước Long, Thành phố Đồng Nai, với diện tích mặt hồ hơn 640 ha, là một trong những hồ chứa nước lớn và thơ mộng nhất vùng Đông Nam Bộ.

Người S'tiêng địa phương từ bao đời nay xem vùng đất Thác Mơ là nơi linh thiêng. Theo truyền thuyết, nàng Mơ — một cô gái S'tiêng xinh đẹp và tài giỏi — đã hóa thành dòng nước để bảo vệ buôn làng khỏi thiên tai. Chính vì vậy, trước mỗi mùa vụ, người dân thường tổ chức lễ cúng cầu mưa thuận gió hòa, mùa màng bội thu.

Hệ sinh thái quanh Hồ Thác Mơ vô cùng phong phú. Khu du lịch sinh thái Bà Rá – Thác Mơ nằm trải dài từ mặt hồ lên đến đỉnh núi Bà Rá, là điểm đến kết hợp hoàn hảo giữa thiên nhiên hoang sơ và di tích lịch sử. Những cánh rừng già bao quanh là nơi trú ngụ của nhiều loài động thực vật quý hiếm.`,
    quickFacts: [
      { label: 'Diện tích mặt hồ', value: 'Hơn 640 ha', icon: 'mdi:waves' },
      { label: 'Vị trí', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Loại công trình', value: 'Hồ thủy điện trên sông Bé', icon: 'mdi:water-pump' },
      { label: 'Thời điểm đẹp nhất', value: 'Tháng 6 – tháng 11', icon: 'mdi:weather-rainy' },
    ],
    timeline: [
      {
        year: 'Hàng thế kỷ trước',
        title: 'Địa danh của người S\'tiêng',
        description: 'Người S\'tiêng gọi vùng đất là "Dak Mơ" — nguồn nước của ước mơ và sự sống.',
      },
      {
        year: '1994',
        title: 'Khởi công xây dựng',
        description: 'Công trình thủy điện Thác Mơ được khởi công, tạo thành hồ chứa lớn trên sông Bé.',
      },
      {
        year: '2010',
        title: 'Khu du lịch sinh thái',
        description: 'Khu du lịch sinh thái Bà Rá – Thác Mơ được đầu tư bảo tồn, trở thành điểm du lịch hấp dẫn.',
      },
    ],

    relatedIds: ['hrt-012', 'hrt-006'],
    tags: ['thiên nhiên', 'hồ nước', 'rừng nguyên sinh', 'sinh thái', 'S\'tiêng', 'Phước Long'],
    references: [
      'Sở Văn hóa, Thể thao và Du lịch Thành phố Đồng Nai (2022). Danh thắng địa phương.',
      'Tổng Công ty Điện lực Thác Mơ. Thủy điện Thác Mơ — Lịch sử hình thành.',
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
    coordinates: { lat: 11.8382, lng: 107.1960 }, // Khu Bảo Tồn Sóc Bom Bo — địa điểm tổ chức lễ hội cồng chiêng
    shortDescription:
      'Lễ hội Cồng Chiêng là linh hồn văn hóa của người S\'tiêng vùng đất Bù Đăng — một di sản âm nhạc phi vật thể quý báu, cùng chung mạch nguồn với Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO vinh danh, phản ánh mối quan hệ thiêng liêng giữa con người và vũ trụ.',
    longStory: `Trong không gian huyền ảo của đêm rừng Bù Đăng, dưới ánh lửa bập bùng và màn sương đêm che phủ đại ngàn, tiếng cồng chiêng vang lên trầm hùng, lách cách rồi ngân xa, lan tỏa khắp núi đồi như tiếng gọi vang vọng của tổ tiên. Đối với đồng bào dân tộc thiểu số S'tiêng tại xã Bù Đăng, Thành phố Đồng Nai, cồng chiêng không đơn thuần là một loại nhạc cụ gõ bằng đồng, mà là biểu tượng tinh thần thiêng liêng nhất, là ngôn ngữ duy nhất kết nối thế giới thực tại với thần linh (Yang), kết nối con người với thiên nhiên và vũ trụ bao la.

Theo quan niệm tâm linh lâu đời của người S'tiêng, mỗi chiếc cồng, chiếc chiêng đều có một vị thần (gọi là Yang Ching) ngự trị. Tuổi đời của chiêng càng cao, tiếng chiêng càng trầm ấm thì sức mạnh của vị thần ngự trị càng lớn. Bộ cồng chiêng được xem là tài sản vô giá của gia đình và dòng tộc, truyền qua nhiều thế hệ và tuyệt đối không được mua bán hay mang ra khỏi buôn sóc khi chưa được sự cho phép của thần linh qua các nghi lễ xin keo.

Mỗi dịp trọng đại trong vòng đời người S'tiêng — từ lễ thổi tai cho trẻ sơ sinh, lễ trưởng thành, lễ cưới hỏi, đến lễ bỏ mả tiễn biệt người đã khuất, và đặc biệt là nghi lễ nông nghiệp như Lễ mừng lúa mới — tiếng cồng chiêng đều vang lên như người dẫn đường tâm linh. Nhịp chiêng khi khoan thai lúc dồn dập, dẫn dắt các vòng xoang uyển chuyển của những chàng trai cô gái bản địa quanh đống lửa hồng.

Vào năm 2005, Không gian văn hóa Cồng chiêng Tây Nguyên — trải rộng qua 5 tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng — đã được UNESCO vinh danh là Kiệt tác truyền khẩu và Di sản văn hóa phi vật thể của nhân loại. Vùng đất Bù Đăng tuy nằm ngoài phạm vi hồ sơ công nhận này, nhưng cồng chiêng của người S'tiêng nơi đây vẫn mang chung cội nguồn văn hóa cồng chiêng Trường Sơn - Tây Nguyên, và đang được địa phương gìn giữ, số hóa như một di sản phi vật thể riêng biệt, quý giá của cộng đồng.`,
    quickFacts: [
      { label: 'Số chiêng trong một bộ', value: '6–12 chiếc', icon: 'mdi:circle-multiple' },
      { label: 'Cội nguồn văn hóa', value: 'Chung mạch cồng chiêng Trường Sơn - Tây Nguyên', icon: 'mdi:earth' },
      { label: 'Người biểu diễn', value: 'Cộng đồng S\'tiêng', icon: 'mdi:account-group' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Ra đời', description: 'Cồng chiêng gắn liền với đời sống tâm linh người S\'tiêng từ thuở hồng hoang.' },
      { year: '2005', title: 'UNESCO vinh danh Cồng chiêng Tây Nguyên', description: 'Không gian văn hóa cồng chiêng Tây Nguyên (5 tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng) được UNESCO công nhận là Di sản phi vật thể nhân loại — nguồn cảm hứng cho công tác bảo tồn cồng chiêng S\'tiêng tại Bù Đăng.' },
    ],

    relatedIds: ['hrt-004', 'hrt-007'],
    tags: ['cồng chiêng', 'âm nhạc', 'S\'tiêng', 'UNESCO', 'phi vật thể', 'lễ hội'],
    references: [
      'UNESCO (2005). Không gian văn hóa cồng chiêng Tây Nguyên — Hồ sơ công nhận (5 tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng).',
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Cồng chiêng S\'tiêng Bù Đăng — Di sản văn hóa phi vật thể địa phương.',
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
    coordinates: { lat: 11.8368, lng: 107.1948 }, // Khu Bảo Tồn Sóc Bom Bo — cạnh lễ hội cồng chiêng
    shortDescription:
      'Nhà dài của người S\'tiêng không chỉ là nơi cư trú mà còn là trung tâm sinh hoạt văn hóa cộng đồng, nơi diễn ra các nghi lễ quan trọng và lưu giữ truyền thống của cả một dòng tộc.',
    longStory: `Nhà dài của người S'tiêng — được gọi là "Nhar" trong ngôn ngữ bản địa — là một công trình kiến trúc cổ truyền độc đáo và là biểu tượng của tinh thần gắn kết gia tộc thiêng liêng. Ngôi nhà dài được dựng lên từ những sản vật của đại ngàn như cột gỗ, vách nứa, sàn tre và mái lợp bằng lá mây hay lá tranh dày dặn, có khả năng che mưa chắn gió qua bao mùa giông bão. Một ngôi nhà dài truyền thống của người S'tiêng có thể kéo dài từ 50 mét đến hơn 100 mét tùy thuộc vào số lượng thành viên trong gia đình.

Triết lý kiến trúc của nhà dài phản ánh sâu sắc cấu trúc xã hội mẫu hệ cổ xưa và sự cố kết cộng đồng keo sơn. Mỗi khi một người con gái trong nhà đi lấy chồng, ngôi nhà lại được nối dài thêm một gian về phía sau để đón chào gia đình mới. Dù được chia thành nhiều gian nhỏ cho từng hộ gia đình tự lập sinh hoạt, ngôi nhà dài vẫn luôn có một không gian sinh hoạt chung rộng lớn chạy suốt chiều dài ngôi nhà, nơi đặt bếp lửa chính luôn đỏ rực và là nơi tiếp khách, bàn bạc công việc của toàn gia tộc.

Bếp lửa giữa nhà dài không chỉ là nơi nấu nướng mà còn là biểu tượng của sự ấm áp, sự sống và sự kế thừa. Hằng đêm, bên ngọn lửa bập bùng, các thế hệ người S'tiêng lại quây quần bên nhau để nghe người già kể khan, truyền dạy kinh nghiệm đi rừng, săn bắn và hát những bài dân ca cổ truyền. Đó chính là cái nôi nuôi dưỡng tâm hồn và bản sắc văn hóa S'tiêng truyền đời.

Ngày nay, dưới tác động của lối sống hiện đại, những ngôi nhà dài trăm mét bằng tranh tre nứa lá dần vắng bóng. Do đó, việc bảo tồn, phục dựng kiến trúc nhà dài tại Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo không chỉ lưu giữ một di sản vật thể độc đáo mà còn là nơi giáo dục thế hệ trẻ về cội nguồn và tinh thần đoàn kết keo sơn của dân tộc.`,
    quickFacts: [
      { label: 'Chiều dài tối đa', value: 'Lên đến 100 mét', icon: 'mdi:ruler' },
      { label: 'Vật liệu', value: 'Tre, nứa, lá cọ, gỗ rừng', icon: 'mdi:leaf' },
      { label: 'Số hộ gia đình', value: '5–15 hộ', icon: 'mdi:home-group' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành', description: 'Kiến trúc nhà dài ra đời từ nhu cầu cộng đồng sinh sống tập thể.' },
      { year: 'Hiện tại', title: 'Bảo tồn', description: 'Chính quyền và cộng đồng nỗ lực bảo tồn và phục dựng nhà dài truyền thống.' },
    ],
    relatedIds: ['hrt-003', 'hrt-007'],
    tags: ['kiến trúc', 'nhà dài', 'S\'tiêng', 'cộng đồng', 'truyền thống'],
    references: [
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Nhà dài S\'tiêng — Di sản kiến trúc bản địa.',
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
    year: '1950–1975',
    coverImage: '/images/heritage/lich-su/nha-giao-truyen-thong-lg.webp',
    gallery: [
      {
        src: '/images/heritage/lich-su/nha-giao-truyen-thong-lg.webp',
        alt: 'Di tích nhà giáo',
        caption: 'Nơi lưu giữ ký ức về những lớp học giữa rừng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.7692, lng: 107.2372 },
    shortDescription:
      'Trong những năm tháng kháng chiến gian khổ, giữa đại ngàn Bù Đăng vẫn vang lên tiếng đánh vần của trẻ em. Những lớp học giữa rừng là minh chứng cho ý chí sắt đá của một thế hệ "vừa cầm súng vừa cầm bút".',
    longStory: `Giữa bom đạn và gian khổ của chiến tranh, những người thầy cách mạng đã không để con chữ tắt lịm. Các lớp học giữa rừng Bù Đăng — đôi khi chỉ là một mảnh lán tre, tấm bảng đen ghép từ vỏ cây — đã đào tạo cả một thế hệ trẻ em mang trong mình vừa kiến thức, vừa lý tưởng cách mạng.

Học sinh thời ấy ban ngày học chữ, ban đêm có thể phải di chuyển tránh giặc. Sách giáo khoa là những tờ giấy viết tay, dụng cụ học tập đơn sơ đến mức... mực viết đôi khi được chiết xuất từ than củi. Thế nhưng, tỷ lệ biết chữ trong vùng căn cứ luôn tăng, chứng minh một triết lý giáo dục cách mạng: tri thức là vũ khí sắc bén nhất.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: '1950 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Loại hình di tích', value: 'Lớp học kháng chiến', icon: 'mdi:school' },
      { label: 'Học sinh đào tạo', value: 'Hàng nghìn em', icon: 'mdi:account-school' },
    ],
    timeline: [
      { year: '1950', title: 'Lớp học đầu tiên', description: 'Những lớp học đầu tiên được mở giữa rừng Bù Đăng.' },
      { year: '1975', title: 'Kết thúc kháng chiến', description: 'Học sinh trường kháng chiến trở thành nòng cốt xây dựng quê hương.' },
    ],
    relatedIds: ['hrt-001'],
    tags: ['giáo dục', 'kháng chiến', 'trường học', 'lịch sử', 'cách mạng'],
    references: [
      'Phòng Giáo dục và Đào tạo xã Bù Đăng. Kỷ yếu truyền thống giáo dục Bù Đăng.',
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
    year: 'Hàng triệu năm',
    coverImage: '/images/heritage/img-disanbudang/rung-nguyen-sinh-bu-dang.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/rung-nguyen-sinh-bu-dang.jpg',
        alt: 'Rừng nguyên sinh Bù Đăng',
        caption: 'Những cánh rừng nguyên sinh hàng triệu năm tuổi của Bù Đăng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.9000, lng: 107.0850 },
    shortDescription:
      'Xã Bù Đăng sở hữu một trong những diện tích rừng nguyên sinh lớn nhất còn sót lại ở Đông Nam Bộ — kho báu đa dạng sinh học vô giá với hàng trăm loài động thực vật quý hiếm.',
    longStory: `Đặt chân vào rừng già Bù Đăng là bước vào một thế giới khác — nơi ánh mặt trời lọc qua tán lá tạo thành những vệt sáng huyền ảo, nơi tiếng chim hót và tiếng suối chảy là âm thanh duy nhất, nơi không khí trong lành đến mức từng hơi thở như được gột rửa.

Hệ sinh thái rừng nguyên sinh Bù Đăng được các nhà khoa học đánh giá là một trong những "hot spot" đa dạng sinh học của khu vực. Hàng trăm loài cây gỗ quý, từ gỗ Lim, Sến, Táu đến những loài thực vật đặc hữu chỉ tìm thấy ở Đông Nam Bộ. Các loài động vật như Vượn đen má hung, Khỉ đuôi lợn, Gà tiền mặt đỏ... đang được bảo vệ trong vùng lõi rừng này.`,
    quickFacts: [
      { label: 'Diện tích rừng', value: 'Hơn 50.000 ha', icon: 'mdi:pine-tree' },
      { label: 'Loài thực vật', value: 'Hơn 800 loài', icon: 'mdi:leaf' },
      { label: 'Loài động vật', value: 'Hơn 300 loài', icon: 'mdi:paw' },
    ],
    timeline: [
      { year: 'Triệu năm', title: 'Hình thành', description: 'Rừng nhiệt đới hình thành qua hàng triệu năm tiến hóa.' },
      { year: '2000', title: 'Khu bảo tồn', description: 'Vùng rừng nguyên sinh được quy hoạch bảo tồn nghiêm ngặt.' },
    ],
    relatedIds: ['hrt-002', 'hrt-009'],
    tags: ['rừng nguyên sinh', 'sinh thái', 'đa dạng sinh học', 'bảo tồn', 'thiên nhiên'],
    references: [
      'Sở Nông nghiệp và Phát triển nông thôn Thành phố Đồng Nai. Quy hoạch rừng phòng hộ Bù Đăng.',
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
    year: 'Hàng thế kỷ',
    coverImage: '/images/heritage/img-disanbudang/hoa-van-tho-cam-stieng.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/hoa-van-tho-cam-stieng.png',
        alt: 'Thổ cẩm S\'tiêng',
        caption: 'Những tấm thổ cẩm rực rỡ được dệt bằng đôi tay khéo léo của phụ nữ S\'tiêng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.9709, lng: 107.2319 },
    shortDescription:
      'Nghề dệt thổ cẩm của người phụ nữ S\'tiêng là Di sản văn hóa phi vật thể quốc gia — mỗi tấm vải là một tác phẩm nghệ thuật độc đáo, kể chuyện về cuộc sống, thiên nhiên và tâm hồn người bản địa.',
    longStory: `Trong làng S'tiêng ở xã Bù Đăng, tiếng khung cửi lách cách từ sáng đến chiều là âm thanh thân thuộc nhất. Những người phụ nữ, từ lúc còn nhỏ đã được bà, được mẹ dạy cách cầm kim, cách chọn chỉ, cách tạo ra những hoa văn độc đáo trên tấm vải thổ cẩm.

Mỗi hoa văn trên thổ cẩm S'tiêng đều mang ý nghĩa riêng: hình rồng tượng trưng cho sức mạnh, hình chim ngụ ý tự do, hình cây rừng là biểu tượng của sự sống và trường tồn. Màu sắc chủ đạo — đỏ, đen, vàng — được chiết xuất từ thực vật tự nhiên trong rừng.`,
    quickFacts: [
      { label: 'Nghệ nhân truyền nghề', value: 'Hơn 50 người', icon: 'mdi:account-star' },
      { label: 'Thời gian dệt', value: '2–4 tuần / tấm', icon: 'mdi:clock-outline' },
      { label: 'Hoa văn cổ truyền', value: 'Hơn 20 mẫu', icon: 'mdi:palette' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành nghề', description: 'Nghề dệt thổ cẩm hình thành từ nhu cầu may trang phục và trao đổi hàng hóa.' },
      { year: '2023', title: 'Di sản quốc gia', description: 'Nghề dệt thổ cẩm S\'tiêng được công nhận là Di sản văn hóa phi vật thể quốc gia.' },
    ],
    relatedIds: ['hrt-003', 'hrt-004'],
    tags: ['thổ cẩm', 'dệt', 'làng nghề', 'S\'tiêng', 'thủ công', 'phụ nữ', 'di sản quốc gia'],
    references: [
      'Bộ Văn hóa Thể thao và Du lịch (2023). Danh mục Di sản văn hóa phi vật thể quốc gia — Nghề dệt thổ cẩm S\'tiêng.',
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
    year: 'Hàng thế kỷ',
    coverImage: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
        alt: 'Lễ hội mừng lúa mới',
        caption: 'Lễ hội Mừng Lúa Mới — nghi lễ tạ ơn thần linh và tổ tiên',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.8500, lng: 107.3200 },
    shortDescription:
      'Lễ hội Mừng Lúa Mới của người M\'nông vùng xã Bù Đăng, Thành phố Đồng Nai là nghi lễ nông nghiệp thiêng liêng nhất trong năm — dịp cộng đồng tụ họp, dâng cúng thần linh, tạ ơn đất trời và cầu mong mùa màng tươi tốt.',
    longStory: `Khi những bông lúa nếp đầu tiên bắt đầu ngả vàng trên nương rẫy, người M'nông vùng đất Bù Đăng bắt đầu chuẩn bị cho một trong những lễ hội quan trọng nhất trong năm — Lễ Mừng Lúa Mới, hay "N'droh Nri" trong tiếng M'nông.

Lễ hội kéo dài từ 3 đến 7 ngày, tùy theo điều kiện của từng buôn làng. Nghi thức bắt đầu bằng lễ cúng thần lúa tại rẫy, do già làng và thầy cúng thực hiện. Tiếp theo là lễ rước lúa về nhà kho — một đoàn rước đầy màu sắc với tiếng cồng chiêng vang lừng, trang phục truyền thống rực rỡ.

Phần hội là không gian văn hóa sôi động: các điệu múa truyền thống, thi đấu thể thao dân gian, trình diễn nhạc cụ, và đặc biệt là cùng nhau thưởng thức rượu cần — loại rượu ủ từ gạo nếp theo công thức bí truyền, được uống chung bằng những chiếc cần trúc dài trong không khí ấm áp tình thân.`,
    quickFacts: [
      { label: 'Thời điểm tổ chức', value: 'Tháng 10 – 12 hàng năm', icon: 'mdi:calendar' },
      { label: 'Thời gian lễ', value: '3 – 7 ngày', icon: 'mdi:clock-check' },
      { label: 'Dân tộc chủ thể', value: 'Người M\'nông', icon: 'mdi:account-group' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành', description: 'Lễ hội gắn với nền kinh tế nông nghiệp nương rẫy của người M\'nông.' },
      { year: 'Hiện tại', title: 'Bảo tồn và phát huy', description: 'Lễ hội được đưa vào danh mục Di sản văn hóa phi vật thể địa phương.' },
    ],
    relatedIds: ['hrt-003', 'hrt-007'],
    tags: ['lễ hội', 'M\'nông', 'lúa mới', 'nông nghiệp', 'rượu cần', 'cộng đồng'],
    references: [
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Lễ hội dân gian M\'nông.',
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
      'Trảng cỏ Bù Lạch là một danh thắng thiên nhiên độc đáo bậc nhất xã Bù Đăng, Thành phố Đồng Nai, nổi bật với trảng cỏ xanh mướt rộng gần 140 ha ôm trọn lòng hồ nước ngọt trong lành giữa rừng già.',
    longStory: `Nằm cách trung tâm xã Bù Đăng khoảng 20 km, Trảng cỏ Bù Lạch hiện lên như một thảo nguyên hoang sơ kỳ vĩ giữa lòng đại ngàn. Điểm độc đáo hiếm nơi nào có được là sự kết hợp hài hòa giữa rừng nguyên sinh bao bọc, trảng cỏ xanh mướt tự nhiên và hồ nước ngọt phẳng lặng ở trung tâm trảng cỏ.

Trảng cỏ Bù Lạch rộng hơn 140 ha, bao gồm hơn 20 trảng cỏ lớn nhỏ khác nhau. Cỏ ở đây là loại cỏ kim mọc tự nhiên, dai và mịn, quanh năm giữ một màu xanh mướt dịu mắt. Bao quanh trảng cỏ là những khu rừng nguyên sinh rậm rạp với thảm thực vật đa dạng, tạo nên một bức tường thành thiên nhiên kiên cố bảo vệ thảo nguyên nhỏ bé này.

Người dân bản địa S'tiêng từ ngàn đời nay lưu truyền nhiều truyền thuyết linh thiêng về hồ nước Bù Lạch. Họ coi hồ là gương thần của trời đất, cung cấp sinh khí và nguồn nước mát nuôi dưỡng buôn làng. Trảng cỏ Bù Lạch ngày nay là điểm đến lý tưởng cho những ai yêu thiên nhiên hoang sơ, muốn cắm trại dã ngoại và tìm hiểu cuộc sống mộc mạc của đồng bào dân tộc thiểu số địa phương.`,
    quickFacts: [
      { label: 'Diện tích trảng cỏ', value: 'Hơn 140 ha', icon: 'mdi:map-outline' },
      { label: 'Điểm nhấn cảnh quan', value: 'Hồ nước ngọt tự nhiên', icon: 'mdi:waves' },
      { label: 'Hệ sinh thái', value: 'Bao quanh bởi rừng già nguyên sinh', icon: 'mdi:tree' },
      { label: 'Khoảng cách trung tâm', value: 'Khoảng 20 km', icon: 'mdi:map-marker-distance' },
    ],
    timeline: [
      { year: 'Hàng ngàn năm', title: 'Kiến tạo tự nhiên', description: 'Trảng cỏ và hồ nước hình thành do quá trình kiến tạo địa chất kỳ thú.' },
      { year: '2015', title: 'Xếp hạng danh thắng', description: 'Được quy hoạch và bảo tồn nghiêm ngặt để phát triển du lịch sinh thái bền vững.' },
    ],
    audio: {
      id: 'aud-009',
      title: 'Thảo Nguyên Xanh Bù Lạch',
      narrator: 'Trần Thị Quyên',
      narratorRole: 'Thuyết minh viên di sản Đồng Nai',
      duration: 728,
      url: '/audio/trang-co-bu-lach.mp3',
      coverImage: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png',
    },
    video: {
      title: 'Phim tư liệu Thảo Nguyên Xanh Trảng Cỏ Bù Lạch',
      url: '/video/virtual-tour/trang-co/trang-co-trailer.mp4',
    },
    relatedIds: ['hrt-006', 'hrt-002'],
    tags: ['trảng cỏ', 'bù lạch', 'danh thắng', 'cắm trại', 'sinh thái', 'hồ tự nhiên'],
    references: [
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Cổng thông tin du lịch Bù Lạch.',
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
    year: 'Thắng cảnh thiên nhiên',
    coverImage: '/images/heritage/img-disanbudang/Thac-Dung.png',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/Thac-Dung.png',
        alt: 'Thác Đứng cuồn cuộn đổ xuống',
        caption: 'Những dòng nước trắng xóa cuồn cuộn đổ qua khối đá hình trụ lục lăng',
        photographer: 'TBD Production',
      },
    ],
    coordinates: { lat: 11.7790, lng: 107.2150 },
    shortDescription:
      'Thác Đứng là một thắng cảnh thiên nhiên kỳ thú nằm trên dòng suối Đăk Wuar thuộc xã Đoàn Kết (nay sáp nhập vào xã Bù Đăng), Thành phố Đồng Nai, nổi tiếng với bức tường đá bazan cột lục lăng thẳng đứng và dòng nước đổ cuồn cuộn đầy oai hùng.',
    longStory: `Nằm ẩn mình giữa những đồi bơ và rẫy điều của xã Đoàn Kết (nay sáp nhập vào xã Bù Đăng, Thành phố Đồng Nai), Thác Đứng được ví như một kiệt tác kiến trúc của bàn tay tạo hóa. Điểm thu hút nhất của ngọn thác này chính là các khối đá hình trụ lục lăng thẳng đứng xếp khít nhau bên lòng thác — một dạng địa chất bazan cột tương tự như Ghềnh Đá Đĩa Phú Yên hay thác Gành Đá ở Tây Nguyên.

Vào mùa mưa, dòng suối Đăk Wuar cuồn cuộn đổ nước từ độ cao gần 6 mét qua vách đá đứng, tạo nên những màn sương nước mờ ảo bao phủ khắp thung lũng. Tiếng thác đổ ầm vang từ xa nghe như tiếng gầm oai vệ của núi rừng đại ngàn.

Đến mùa khô, dòng thác trở nên hiền hòa hơn, hé lộ rõ nét những bãi đá cổ hình thù độc đáo dưới lòng suối. Du khách có thể dễ dàng đi bộ trên các tảng đá khổng lồ, ngắm nhìn dòng nước len lỏi qua từng kẽ đá và tận hưởng không khí dịu mát, trong lành của thiên nhiên hoang sơ. Thác Đứng là một di sản thiên nhiên quý báu đang được địa phương gìn giữ và phát triển du lịch thân thiện với môi trường.`,
    quickFacts: [
      { label: 'Độ cao vách thác', value: 'Khoảng 4 - 6 mét', icon: 'mdi:arrow-up-bold' },
      { label: 'Cấu trúc địa chất', value: 'Bazalt dạng cột lục lăng đứng', icon: 'mdi:terrain' },
      { label: 'Dòng suối nguồn', value: 'Dòng Đăk Wuar', icon: 'mdi:water' },
    ],
    timeline: [
      { year: 'Triệu năm trước', title: 'Hoạt động phun trào', description: 'Các dòng dung nham bazan nguội đi tạo thành cấu trúc cột độc đáo.' },
      { year: '2013', title: 'Công nhận di tích', description: 'Được công nhận là Di tích Danh lam thắng cảnh cấp Thành phố Đồng Nai.' },
    ],
    relatedIds: ['hrt-002', 'hrt-006'],
    tags: ['thác đứng', 'thác nước', 'bazan cột', 'danh thắng', 'suối Đăk Wuar'],
    references: [
      'Bảo tàng Thành phố Đồng Nai. Hồ sơ di tích Thác Đứng.',
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
    coordinates: { lat: 11.8388, lng: 107.1942 }, // Xác minh qua OSM: trùng khu vực Sóc Bom Bo thật (khớp 2 điểm "Cồng Chiêng" và "Nhà Dài" cùng cụm) — tọa độ cũ (11.87, 107.15) lệch ~6km về phía tây bắc
    shortDescription:
      'Sóc Bom Bo (nay thuộc xã Bom Bo, Thành phố Đồng Nai — xã Bình Minh và xã Bom Bo cũ sáp nhập từ 01/07/2025) là địa danh lịch sử nổi tiếng, biểu tượng cho lòng yêu nước của đồng bào S\'tiêng nuôi quân thâu đêm. Khu bảo tồn lưu giữ nhà dài truyền thống — không gian sống cộng đồng đặc trưng nhất của người S\'tiêng.',
    longStory: `Nhắc đến xã Bù Đăng, không ai không biết đến Sóc Bom Bo — địa danh lịch sử anh hùng đã đi vào huyền thoại cách mạng và tâm thức của triệu triệu người Việt Nam qua ca khúc bất hủ "Tiếng chày trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng. Trong những năm tháng kháng chiến chống Mỹ cứu nước gian lao và anh dũng nhất, đồng bào S'tiêng nơi đây đã biểu thị lòng yêu nước nồng nàn và tinh thần cách mạng quật khởi, một lòng sắt son theo Đảng, theo Bác Hồ.

Đỉnh cao của tinh thần ấy diễn ra vào những ngày cuối năm 1965, phục vụ chiến dịch Phước Long - Đồng Xoài. Để đảm bảo lương thực cho bộ đội chủ lực ăn no đánh thắng, toàn thể già trẻ, gái trai của Sóc Bom Bo đã không quản ngại gian khổ, hiểm nguy, ngày đêm nổi lửa giã gạo. Ban ngày giặc lùng sục oanh tạc, bà con chuyển sang giã gạo thâu đêm dưới ánh đuốc lồ ô bập bùng cháy sáng khắp núi rừng. Tiếng chày đôi, chày ba giã gạo nện xuống cối gỗ đều đặn, rộn ràng hòa cùng tiếng hát vang lên như một lời thề chiến thắng, biến nhịp lao động sản xuất thành nhịp hành khúc kháng chiến oai hùng.

Ngày nay, Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo được xây dựng khang trang trên địa bàn xã Bình Minh, Thành phố Đồng Nai, trở thành địa chỉ đỏ giáo dục truyền thống cách mạng và là điểm du lịch văn hóa độc đáo. Khu bảo tồn lưu giữ sống động hàng trăm hiện vật vô giá: những bộ chày cối sứt sẹo vì giã gạo thâu đêm, những chiếc gùi tự chế tải đạn xuyên rừng, cùng các tư liệu lịch sử quý báu.

Không chỉ là nơi trưng bày tĩnh, khu bảo tồn thường xuyên tổ chức các hoạt động trải nghiệm thực tế sinh động. Du khách đến đây có thể trực tiếp cầm chày giã gạo cùng các nghệ nhân S'tiêng, lắng nghe tiếng cồng chiêng trầm hùng ngân vang bên bếp lửa nhà dài, thưởng thức cơm lam dẻo thơm nấu ống lồ ô và nhấp chén rượu cần đượm vị men lá rừng nồng nàn, cảm nhận sâu sắc lòng hiếu khách và hào khí cách mạng của người dân Sóc Bom Bo huyền thoại.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: 'Chiến dịch kháng chiến (1965)', icon: 'mdi:calendar-star' },
      { label: 'Dân tộc chủ thể', value: 'Đồng bào S\'tiêng Bù Đăng', icon: 'mdi:account-group' },
      { label: 'Vị trí hiện tại', value: 'Xã Bom Bo (Bình Minh + Bom Bo cũ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Đặc sản di sản', value: 'Văn hóa ẩm thực rượu cần, cơm lam', icon: 'mdi:food-variant' },
    ],
    timeline: [
      { year: '1965', title: 'Đêm giã gạo huyền thoại', description: 'Đồng bào S\'tiêng nổi lửa giã gạo xuyên đêm phục vụ chiến dịch lớn.' },
      { year: '1975', title: 'Góp phần giải phóng', description: 'Ghi nhận những đóng góp to lớn của sóc Bom Bo trong ngày toàn thắng.' },
      { year: '2010', title: 'Xây dựng khu bảo tồn', description: 'Khu bảo tồn văn hóa chính thức được phục dựng và đưa vào đón khách tham quan.' },
    ],
    audio: {
      id: 'aud-011',
      title: 'Huyền Thoại Nhịp Chày Sóc Bom Bo',
      narrator: 'Trần Thị Quyên',
      narratorRole: 'Thuyết minh viên di sản Đồng Nai',
      duration: 908,
      url: '/audio/khu-bao-ton-soc-bom-bo.mp3',
      coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    },
    video: {
      title: 'Phim tư liệu Sóc Bom Bo những năm tháng kháng chiến',
      url: '/video/virtual-tour/bom-bo/bom-bo-trailer.mp4',
    },
    relatedIds: ['hrt-003', 'hrt-001'],
    tags: ['sóc bom bo', 'giã gạo', 'S\'tiêng', 'kháng chiến', 'di tích lịch sử', 'xã Bom Bo', 'nhà dài'],
    references: [
      'Ủy ban nhân dân xã Bom Bo (trước là xã Bình Minh). Kỷ yếu di tích lịch sử Sóc Bom Bo.',
      'Nhạc sĩ Xuân Hồng (1966). "Tiếng chày trên Sóc Bom Bo" — Lịch sử ra đời ca khúc.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-05-25',
    viewCount: 4210,
  },

  // =========================================================
  // DI SẢN PHƯỚC LONG & LỘC NINH (THÀNH PHỐ ĐỒNG NAI)
  // =========================================================

  {
    id: 'hrt-012',
    slug: 'nui-ba-ra-phuoc-long',
    title: 'Núi Bà Rá — Đỉnh Thiêng Đông Nam Bộ',
    subtitle: 'Nóc nhà lịch sử của miền đất anh hùng',
    category: 'danh-thang',
    period: 'khang-chien',
    cluster: 'phuoc-long',
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
      'Núi Bà Rá (723m) — một trong ba đỉnh núi cao nhất Đông Nam Bộ, đứng thứ 3 Nam Bộ, tại Thành phố Đồng Nai — nay thuộc phường Phước Long (khu phố Thác Mơ), Thành phố Đồng Nai. Nơi đây ghi dấu tội ác của thực dân Pháp qua nhà tù Bà Rá và là điểm tựa tinh thần bất khuất của người dân trong hai cuộc kháng chiến.',
    longStory: `Sừng sững giữa vùng đất Phước Long, Núi Bà Rá vươn cao 723 mét so với mực nước biển, là một trong ba đỉnh núi cao nhất khu vực Đông Nam Bộ và đứng thứ 3 toàn Nam Bộ. Không chỉ là danh thắng thiên nhiên hùng vĩ, Bà Rá còn là nhân chứng lịch sử đau thương và bất khuất của cả dân tộc.

Thực dân Pháp đã biến Bà Rá thành địa ngục trần gian với nhà tù kiên cố xây dựng từ năm 1930 trên lưng núi. Hàng nghìn chiến sĩ cách mạng, chí sĩ yêu nước bị giam cầm, tra tấn và đày ải trong điều kiện vô cùng khắc nghiệt. Những người tù vĩ đại như Trần Phú, Lê Hồng Phong... đã từng bị giam giữ hoặc chuyển qua nơi đây. Chính trong gian lao đó, tinh thần cách mạng không những không tắt mà còn bùng cháy mãnh liệt hơn.

Ngày nay, khu di tích lịch sử Nhà tù Bà Rá kết hợp với Khu du lịch sinh thái Bà Rá – Thác Mơ đã trở thành điểm đến hấp dẫn của Thành phố Đồng Nai. Từ đỉnh Bà Rá, du khách có thể chiêm ngưỡng toàn cảnh hồ Thác Mơ xanh biếc, rừng núi trùng điệp và cảm nhận khí thiêng sông núi nơi đây.`,
    quickFacts: [
      { label: 'Độ cao', value: '723 mét (đỉnh núi cao thứ 3 Nam Bộ tại Thành phố Đồng Nai)', icon: 'mdi:mountain' },
      { label: 'Vị trí', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Di tích lịch sử', value: 'Nhà tù Bà Rá (1930)', icon: 'mdi:castle' },
      { label: 'Đặc điểm', value: 'Một trong 3 đỉnh núi cao nhất Đông Nam Bộ', icon: 'mdi:flag' },
    ],
    timeline: [
      { year: '1930', title: 'Thực dân Pháp xây nhà tù', description: 'Pháp xây dựng nhà tù Bà Rá để giam cầm các chiến sĩ cách mạng.' },
      { year: '1945', title: 'Tù nhân vượt ngục', description: 'Nhiều chiến sĩ cách mạng vượt ngục thành công, tham gia khởi nghĩa Tháng Tám.' },
      { year: '1975', title: 'Giải phóng', description: 'Núi Bà Rá được giải phóng, nhà tù trở thành di tích lịch sử.' },
      { year: '2000s', title: 'Khu du lịch sinh thái', description: 'Khu du lịch Bà Rá – Thác Mơ được xây dựng, phát triển du lịch sinh thái kết hợp lịch sử.' },
    ],
    relatedIds: ['hrt-002', 'hrt-013'],
    tags: ['núi Bà Rá', 'Phước Long', 'nhà tù', 'danh thắng', 'lịch sử', 'Đông Nam Bộ'],
    references: [
      'Bảo tàng Thành phố Đồng Nai. Hồ sơ di tích Nhà tù Bà Rá.',
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Núi Bà Rá — Di tích và danh thắng.',
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
      'Chiến thắng Phước Long ngày 06/01/1975 là chiến thắng giải phóng tỉnh lỵ đầu tiên ở miền Nam — một "trận trinh sát chiến lược" chứng minh Mỹ không thể can thiệp trở lại, mở đường cho Chiến dịch Hồ Chí Minh toàn thắng. Tượng đài Chiến thắng Phước Long nay tọa lạc tại phường Phước Long (khu phố Thác Mơ), Thành phố Đồng Nai.',
    longStory: `Ngày 06/01/1975, quân và dân ta hoàn toàn giải phóng tỉnh Phước Long — tỉnh đầu tiên ở miền Nam được giải phóng hoàn toàn. Chiến thắng lịch sử này không đơn thuần là một thắng lợi quân sự thông thường, mà là "trận trinh sát chiến lược" có tầm quan trọng đặc biệt, thể hiện sự sáng suốt thiên tài trong nghệ thuật quân sự của Bộ Chính trị và Quân ủy Trung ương.

Kết quả của trận đánh đã chứng minh một thực tế quan trọng: quân đội Sài Gòn không còn khả năng phản công tái chiếm, và quan trọng hơn — Hoa Kỳ đã không và sẽ không can thiệp quân sự trở lại. Đây là cơ sở thực tiễn vô cùng quý giá để Bộ Chính trị quyết định phát động cuộc Tổng tiến công và nổi dậy Mùa Xuân 1975.

Tượng đài Chiến thắng Phước Long tọa lạc tại trung tâm xã Thác Mơ (phường Long Thủy cũ), Thành phố Đồng Nai — là biểu tượng thiêng liêng khắc ghi công ơn của bao thế hệ anh hùng liệt sĩ đã ngã xuống để làm nên chiến thắng vẻ vang này.`,
    quickFacts: [
      { label: 'Ngày giải phóng', value: '06/01/1975', icon: 'mdi:calendar-star' },
      { label: 'Ý nghĩa chiến lược', value: 'Tỉnh đầu tiên được giải phóng ở miền Nam', icon: 'mdi:flag' },
      { label: 'Vị trí', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Di tích', value: 'Tượng đài Chiến thắng Phước Long', icon: 'mdi:castle' },
    ],
    timeline: [
      { year: '13/12/1974', title: 'Chiến dịch bắt đầu', description: 'Quân giải phóng mở đầu chiến dịch tiến công vào Phước Long.' },
      { year: '06/01/1975', title: 'Toàn thắng', description: 'Phước Long hoàn toàn được giải phóng — tỉnh đầu tiên ở miền Nam thoát khỏi ách chiếm đóng.' },
      { year: '30/4/1975', title: 'Đại thắng Mùa Xuân', description: 'Chiến thắng Phước Long là tiền đề trực tiếp cho Chiến dịch Hồ Chí Minh toàn thắng.' },
    ],
    relatedIds: ['hrt-012', 'hrt-016'],
    tags: ['chiến thắng Phước Long', 'lịch sử', 'kháng chiến', '1975', 'Đại thắng Mùa Xuân'],
    references: [
      'Viện Lịch sử Quân sự Việt Nam (2015). Chiến dịch Đường 14 – Phước Long.',
      'Bộ Tư lệnh Quân khu 7. Lịch sử Chiến dịch Phước Long.',
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
    year: '1973–1975',
    coverImage: '/images/heritage/img-disanbudang/can-cu-ta-thiet.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/can-cu-ta-thiet.jpg',
        alt: 'Căn cứ Tà Thiết',
        caption: 'Rừng già che phủ Căn cứ Tà Thiết — Bộ Chỉ huy Quân giải phóng miền Nam',
      },
    ],
    coordinates: { lat: 11.7540, lng: 106.5124 }, // Xác minh qua OSM/Nominatim: làng Tà Thiết, xã Lộc Thành, Lộc Ninh — tọa độ cũ (11.83, 106.68) lệch ~20km về phía đông, rơi vào rừng trồng không có đường vào
    shortDescription:
      'Căn cứ Tà Thiết (xã Lộc Thành, Thành phố Đồng Nai) là Di tích Quốc gia đặc biệt — từng là Bộ Chỉ huy Quân giải phóng miền Nam Việt Nam và là nơi hoạch định Chiến dịch Hồ Chí Minh lịch sử năm 1975.',
    longStory: `Trong lòng rừng già xã Lộc Thành, có một vùng đất mà lịch sử cách mạng Việt Nam gọi là "Rừng Chính phủ" — Căn cứ Tà Thiết. Từ năm 1973 đến tháng 4/1975, đây là trụ sở của Bộ Tư lệnh Miền, nơi đặt cơ quan đầu não điều hành toàn bộ cuộc kháng chiến chống Mỹ trên chiến trường miền Nam.

Trong điều kiện chiến tranh ác liệt, Tà Thiết vẫn hoạt động như một thủ đô chiến khu hoàn chỉnh: có hội trường, nhà làm việc, khu ở, bệnh xá, nhà bếp... tất cả được ngụy trang khéo léo dưới tán rừng già nhiều tầng tán. Không ảnh trinh sát của Mỹ không thể phát hiện được sự tồn tại của cả một trung tâm chỉ huy khổng lồ này.

Chính tại Tà Thiết, những quyết định lịch sử quan trọng nhất của giai đoạn cuối kháng chiến đã được thảo luận và thông qua. Kế hoạch Chiến dịch Hồ Chí Minh — chiến dịch kết thúc chiến tranh — được lên kế hoạch chi tiết tại nơi đây. Căn cứ Tà Thiết xứng đáng là Di tích Quốc gia đặc biệt, niềm tự hào của toàn dân tộc.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: '1973 – 4/1975', icon: 'mdi:calendar-range' },
      { label: 'Tình trạng bảo tồn', value: 'Di tích Quốc gia đặc biệt', icon: 'mdi:shield-check' },
      { label: 'Vị trí', value: 'Xã Lộc Thành, Thành phố Đồng Nai', icon: 'mdi:map-marker' },
      { label: 'Diện tích căn cứ', value: 'Khoảng 16 km²', icon: 'mdi:map-outline' },
    ],
    timeline: [
      { year: '1973', title: 'Thiết lập căn cứ', description: 'Sau Hiệp định Paris, Bộ Tư lệnh Miền chuyển về Tà Thiết hoạt động công khai hơn.' },
      { year: '1975', title: 'Hoạch định Chiến dịch HCM', description: 'Kế hoạch Chiến dịch Hồ Chí Minh được vạch ra tại đây.' },
      { year: '30/4/1975', title: 'Hoàn thành sứ mệnh', description: 'Sau ngày Giải phóng, căn cứ được bảo tồn như chứng tích lịch sử hào hùng.' },
    ],
    relatedIds: ['hrt-015', 'hrt-013'],
    tags: ['căn cứ Tà Thiết', 'Lộc Ninh', 'Bộ Tư lệnh Miền', 'kháng chiến', 'di tích quốc gia đặc biệt'],
    references: [
      'Bộ Văn hóa Thể thao và Du lịch. Hồ sơ Di tích Quốc gia đặc biệt Căn cứ Tà Thiết.',
      'Viện Lịch sử Quân sự Việt Nam. Bộ Chỉ huy Quân giải phóng miền Nam tại Tà Thiết.',
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
    year: '1973–1975',
    coverImage: '/images/heritage/img-disanbudang/nha-giao-te-loc-ninh.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/nha-giao-te-loc-ninh.jpg',
        alt: 'Nhà Giao Tế Lộc Ninh',
        caption: 'Di tích Nhà Giao Tế Lộc Ninh — nơi diễn ra hội nghị bốn bên lịch sử',
      },
    ],
    coordinates: { lat: 11.843, lng: 106.607 },
    shortDescription:
      'Nhà Giao Tế Lộc Ninh (phường Lộc Ninh, Thành phố Đồng Nai) là Di tích Quốc gia — trụ sở của Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam, nơi diễn ra các hội nghị quân sự bốn bên theo Hiệp định Paris 1973.',
    longStory: `Nhà Giao Tế Lộc Ninh mang trong mình một ý nghĩa đặc biệt trong lịch sử ngoại giao của cách mạng Việt Nam. Được thiết kế bởi kiến trúc sư Huỳnh Tấn Phát — sau này là Thủ tướng Chính phủ Cách mạng lâm thời — công trình là biểu tượng của chủ quyền và quyết tâm độc lập của nhân dân miền Nam.

Sau khi Hiệp định Paris được ký kết ngày 27/01/1973, Lộc Ninh trở thành vùng đất được giải phóng đầu tiên hoạt động công khai. Nhà Giao Tế Lộc Ninh trở thành địa điểm tổ chức các phiên họp của Ban Liên hợp quân sự bốn bên (Việt Nam Dân chủ Cộng hòa, Chính phủ Cách mạng lâm thời, Hoa Kỳ, Việt Nam Cộng hòa) nhằm thi hành các điều khoản của Hiệp định Paris.

Tại đây, dưới sự chứng kiến của đại diện quốc tế, những cuộc thương lượng về trao trả tù binh, xác định vùng kiểm soát và giám sát ngừng bắn đã diễn ra. Nhà Giao Tế Lộc Ninh là minh chứng cho trình độ ngoại giao sắc bén và ý chí độc lập của cách mạng Việt Nam trên mặt trận đàm phán quốc tế.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: '1973 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Tình trạng bảo tồn', value: 'Di tích Quốc gia', icon: 'mdi:shield-check' },
      { label: 'Vị trí', value: 'Phường Lộc Ninh, Thành phố Đồng Nai', icon: 'mdi:map-marker' },
      { label: 'Kiến trúc sư', value: 'Huỳnh Tấn Phát', icon: 'mdi:pencil-ruler' },
    ],
    timeline: [
      { year: '27/01/1973', title: 'Hiệp định Paris ký kết', description: 'Hiệp định Paris được ký kết, Lộc Ninh trở thành trung tâm ngoại giao cách mạng.' },
      { year: '1973–1975', title: 'Hội nghị bốn bên', description: 'Các phiên họp của Ban Liên hợp quân sự bốn bên diễn ra tại Nhà Giao Tế Lộc Ninh.' },
      { year: '1975', title: 'Bảo tồn di tích', description: 'Công trình được bảo tồn nguyên vẹn như chứng nhân lịch sử đặc biệt.' },
    ],
    relatedIds: ['hrt-014', 'hrt-013'],
    tags: ['Lộc Ninh', 'Nhà Giao Tế', 'Hiệp định Paris', 'ngoại giao', 'di tích quốc gia', 'kháng chiến'],
    references: [
      'Bộ Văn hóa Thể thao và Du lịch. Hồ sơ Di tích Quốc gia Nhà Giao Tế Lộc Ninh.',
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Lộc Ninh — Vùng đất anh hùng.',
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
    year: '1975',
    coverImage: '/images/heritage/img-disanbudang/bao-tang-duong-14.jpg',
    gallery: [
      {
        src: '/images/heritage/img-disanbudang/bao-tang-duong-14.jpg',
        alt: 'Bảo tàng Chiến dịch Đường 14',
        caption: 'Bảo tàng lưu giữ hiện vật, tư liệu quý về Chiến dịch Đường 14 – Phước Long',
      },
    ],
    coordinates: { lat: 11.877, lng: 107.014 },
    shortDescription:
      'Bảo tàng Chiến dịch Đường 14 – Phước Long tọa lạc tại phường Phước Long (khu phố Thác Mơ), Thành phố Đồng Nai — lưu giữ hàng nghìn hiện vật, hình ảnh và tư liệu quý về chiến dịch giải phóng Phước Long tháng 12/1974 – 01/1975.',
    longStory: `Bảo tàng Chiến dịch Đường 14 – Phước Long là nơi lưu giữ ký ức sống động về một trong những chiến thắng quân sự quan trọng nhất trước ngày Giải phóng hoàn toàn miền Nam. Đặt tại vị trí mang tính lịch sử, bảo tàng tái hiện toàn bộ diễn biến Chiến dịch Đường 14 – Phước Long (từ 13/12/1974 đến 06/01/1975) qua hệ thống trưng bày phong phú.

Bộ sưu tập hiện vật bao gồm vũ khí, trang phục, trang thiết bị quân sự của cả hai phía; bản đồ tác chiến gốc; hàng nghìn bức ảnh tư liệu và đặc biệt là nhiều câu chuyện của nhân chứng lịch sử — những người lính, những người dân đã trực tiếp tham gia hoặc chứng kiến chiến thắng hào hùng đó.

Bảo tàng là điểm giáo dục truyền thống cách mạng quan trọng, thường xuyên đón các đoàn học sinh, sinh viên và du khách từ khắp cả nước đến tham quan, nghiên cứu và cảm nhận tinh thần yêu nước bất khuất của các thế hệ đi trước.`,
    quickFacts: [
      { label: 'Vị trí', value: 'Phường Phước Long (khu phố Thác Mơ), TPĐN', icon: 'mdi:map-marker' },
      { label: 'Số hiện vật', value: 'Hàng nghìn hiện vật', icon: 'mdi:archive' },
      { label: 'Sự kiện tái hiện', value: 'Chiến dịch 13/12/1974 – 06/01/1975', icon: 'mdi:calendar-range' },
      { label: 'Loại hình', value: 'Bảo tàng lịch sử cách mạng', icon: 'mdi:museum' },
    ],
    timeline: [
      { year: '1975', title: 'Sự kiện lịch sử', description: 'Chiến dịch Đường 14 – Phước Long kết thúc thắng lợi ngày 06/01/1975.' },
      { year: '1990s', title: 'Thành lập bảo tàng', description: 'Bảo tàng được thành lập để bảo tồn và trưng bày hiện vật lịch sử.' },
      { year: 'Hiện tại', title: 'Giáo dục truyền thống', description: 'Bảo tàng là địa chỉ đỏ giáo dục truyền thống cách mạng cho thế hệ trẻ.' },
    ],
    relatedIds: ['hrt-013', 'hrt-012'],
    tags: ['bảo tàng', 'Phước Long', 'chiến dịch Đường 14', 'lịch sử', 'kháng chiến', '1975'],
    references: [
      'Bảo tàng Chiến dịch Đường 14 – Phước Long. Tổng quan trưng bày.',
      'Sở Văn hóa Thể thao và Du lịch Thành phố Đồng Nai. Di sản lịch sử Phước Long.',
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

export const getFeaturedHeritages = () => HERITAGES.filter((h) => h.featured)
export const getHeritageBySlug = (slug: string) => HERITAGES.find((h) => h.slug === slug)
export const getHeritageById = (id: string) => HERITAGES.find((h) => h.id === id)
export const getHeritagesByCategory = (category: string) =>
  HERITAGES.filter((h) => h.category === category)
