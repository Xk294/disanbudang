import type { CommunityPost, NewsArticle, Event } from '~/types'

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-001',
    type: 'story',
    title: 'Ông nội tôi và những đêm cồng chiêng',
    excerpt: 'Mỗi lần nghe tiếng cồng chiêng vang lên, tôi lại nhớ ông nội — người đã nói với tôi rằng mỗi nhịp chiêng là một lời kể về tổ tiên. Ông tôi năm nay 78 tuổi, tóc bạc nhưng tay gõ chiêng vẫn còn rất rắn rỏi.',
    content: `Ông nội tôi — già làng Điểu Minh — năm nay 78 tuổi. Mỗi khi có lễ hội, ông lại lấy chiếc chiêng cổ từ vách nứa xuống và gõ đều. Ông hay bảo: "Chiêng này có linh hồn. Khi tiếng chiêng cất lên, tổ tiên đang lắng nghe."

Tôi nhớ nhất đêm hội Mừng lúa mới năm tôi học lớp 8. Cả buôn quây quần bên lửa, tiếng chiêng vang như sấm rồi chuyển sang nhịp điệu rộn rã. Từ đó tôi hiểu — tiếng chiêng không phải âm nhạc, đó là sợi dây kết nối các thế hệ.`,
    coverImage: '/images/heritage/img-disanbudang/Cong-chieng.jpg',
    author: {
      id: 'author-001',
      name: 'Vũ Quang Huy',
      role: 'Học sinh',
      school: 'THPT Lê Quý Đôn',
      grade: 'Lớp 11',
    },
    heritageId: 'hrt-003',
    tags: ['cồng chiêng', 'ký ức', 'S\'tiêng'],
    viewCount: 234,
    featured: true,
    publishedAt: '2024-05-10',
  },
  {
    id: 'post-002',
    type: 'artwork',
    title: 'Rừng Chiến Khu Nửa Lon trong mắt em',
    excerpt: 'Sau chuyến thực tế tại Căn cứ Nửa Lon Bù Đăng, em Nguyễn Văn Hùng vẽ lại cảnh đoàn quân băng rừng trong đêm. Tác phẩm đạt giải Nhất cuộc thi vẽ "Di sản quê hương em".',
    content: `Sau chuyến đi thực tế đến Căn cứ Nửa Lon Bù Đăng, em muốn vẽ lại một đêm hành quân. Em dùng màu nước, tông xanh lục đậm và đen để tái hiện rừng già Bù Đăng. Điểm nhấn là những tia trăng xuyên tán lá, rọi xuống con đường mòn.

Khi đứng dưới những cây cổ thụ trăm năm tuổi, em cảm nhận được gian khổ của thế hệ cha ông. Bức tranh này là lời cảm ơn của em gửi đến họ.`,
    coverImage: '/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg',
    author: {
      id: 'author-002',
      name: 'Nguyễn Văn Hùng',
      role: 'Học sinh',
      school: 'THCS Nguyễn Trường Tộ',
      grade: 'Lớp 8',
    },
    heritageId: 'hrt-001',
    tags: ['tranh vẽ', 'chiến khu', 'học sinh'],
    viewCount: 189,
    featured: false,
    publishedAt: '2024-05-12',
  },
  {
    id: 'post-003',
    type: 'memory',
    title: 'Ba tôi kể chuyện những ngày tải đạn',
    excerpt: 'Ba tôi 65 tuổi. Năm 15 tuổi ông gùi đạn xuyên rừng Căn cứ Nửa Lon ban đêm, ban ngày trốn trong hầm nứa. Mỗi lần kể, ông lấy chiếc nón tai bèo cũ từ trong tủ ra, nhìn và lại kể.',
    content: `Ba tôi — ông Trần Văn Nam — khi còn 15 tuổi đã tham gia gùi lương thực, tải đạn cho bộ đội qua Căn cứ Nửa Lon Bù Đăng.

"Hồi đó ban ngày nằm hầm, ban đêm mới dám đi. Mỗi đứa gùi trên lưng nặng gần bằng trọng lượng cơ thể mình." Ba tôi kể, mắt hướng về phía rừng già Bù Đăng.

Những câu chuyện đó không có trong sách giáo khoa. Đó là lịch sử sống được viết bằng mồ hôi và lòng can đảm.`,
    coverImage: '/images/heritage/img-disanbudang/chien-khu-D.png',
    author: {
      id: 'author-003',
      name: 'Trần Quốc Toàn',
      role: 'Người dân địa phương',
      school: '',
    },
    heritageId: 'hrt-001',
    tags: ['ký ức', 'kháng chiến', 'gia đình'],
    viewCount: 312,
    featured: false,
    publishedAt: '2024-05-08',
  },
  {
    id: 'post-004',
    type: 'photo',
    title: 'Buổi sáng sương mù ở Thác Mơ',
    excerpt: 'Tôi dậy từ 4h30 sáng để chụp khoảnh khắc sương bảng lảng trên mặt hồ Thác Mơ. Khi ánh bình minh đầu tiên hé lộ, cả thung lũng như chìm trong lụa trắng.',
    content: `Đến Thác Mơ lúc bình minh, trước khi mặt trời lên.

Khoảng 5h15, làn sương từ mặt hồ bốc lên gặp nắng sớm tạo thành những dải màu lấp lánh. Tôi phơi sáng 2 giây để dòng nước trông mềm mại như dải lụa trắng.

Nếu bạn muốn thấy Thác Mơ đẹp nhất, hãy đến sớm nhé.`,
    coverImage: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
    author: {
      id: 'author-004',
      name: 'Lê Minh Tâm',
      role: 'Nhiếp ảnh gia nghiệp dư',
    },
    heritageId: 'hrt-002',
    tags: ['nhiếp ảnh', 'thác mơ', 'thiên nhiên'],
    viewCount: 445,
    featured: false,
    publishedAt: '2024-05-15',
  },
  {
    id: 'post-005',
    type: 'research',
    title: 'Hoa văn thổ cẩm S\'tiêng - Nghiên cứu học sinh lớp 9',
    excerpt: 'Trong 3 tháng, nhóm chúng em đến các buôn làng gặp nghệ nhân, ghi chép hơn 20 mẫu hoa văn. Hình thoi chéo = hạt gạo. Hình răng cưa = dãy núi. Mỗi hoa văn là một câu chuyện.',
    content: `Nhóm học sinh lớp 9A trường THCS Nguyễn Trường Tộ dành 3 tháng cuối tuần đến buôn Bù Bông, Bù Sa để ghi chép hoa văn thổ cẩm S'tiêng.

Phát hiện thú vị:
- Hình thoi chéo = hạt gạo, mong cầu no đủ
- Hình răng cưa = dãy núi bảo vệ buôn làng
- Hình con chim = tự do và hoà hợp thiên nhiên

Các màu sắc đều được chiết xuất từ thực vật tự nhiên trong rừng. Nghề này đang dần mai một — chỉ còn hơn 50 nghệ nhân biết dệt.`,
    coverImage: '/images/heritage/img-disanbudang/hoa-van-tho-cam-stieng.png',
    author: {
      id: 'author-005',
      name: 'Nhóm học sinh Lớp 9A',
      role: 'Học sinh',
      school: 'THCS Nguyễn Trường Tộ',
      grade: 'Lớp 9',
    },
    heritageId: 'hrt-007',
    tags: ['nghiên cứu', 'thổ cẩm', 'hoa văn', 'học sinh'],
    viewCount: 156,
    featured: false,
    publishedAt: '2024-04-20',
  },
  {
    id: 'post-006',
    type: 'story',
    title: 'Mùa lúa mới và tiếng cười buôn làng',
    excerpt: 'Khi lúa nếp chín vàng, cả buôn M\'nông rộn ràng chuẩn bị lễ hội. Tiếng chày giã gạo từ tờ mờ sáng, mùi xôi nếp thơm lừng, rồi đến đêm — cồng chiêng vang và mọi người cùng nhảy múa bên lửa trại.',
    content: `Lễ Mừng Lúa Mới của người M'nông Bù Đăng bắt đầu từ tờ mờ sáng với tiếng chày giã gạo vang khắp buôn.

Tối đến, già làng làm lễ cúng thần lúa rồi tiếng cồng chiêng cất lên. Mọi người cầm tay tạo thành vòng xoang quanh lửa, uống rượu cần và nhảy múa.

Với người M'nông, đây không chỉ là thành quả lao động — đây là lúc cả cộng đồng nhắc nhau về sợi dây gắn kết bền bỉ qua năm tháng.`,
    coverImage: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    author: {
      id: 'author-006',
      name: 'Thị Hoa',
      role: 'Phụ nữ cộng đồng M\'nông',
    },
    heritageId: 'hrt-008',
    tags: ['lúa mới', 'lễ hội', 'M\'nông', 'buôn làng'],
    viewCount: 278,
    featured: false,
    publishedAt: '2024-04-25',
  },
]

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-001',
    slug: 'canh-thut-doc-ban-stieng-bu-dang',
    title: 'Canh Thụt S\'tiêng Bù Đăng: Món Ăn Độc Bản Từ Ống Lồ Ô Đại Ngàn',
    subtitle: 'Khám phá tri thức ẩm thực độc đáo của đồng bào S\'tiêng tại sóc Bom Bo và các xã vùng cao Bù Đăng',
    excerpt: 'Canh thụt là món ăn truyền thống mang tính biểu tượng cao nhất của người S\'tiêng Bù Đăng, được nấu kỳ công trong ống tre lồ ô với sự kết hợp tuyệt vời của đọt mây rừng, lá nhíp, ớt hiểm và cá suối.',
    content: `Nếu có dịp ghé thăm các buôn sóc của người S'tiêng tại vùng đất Bù Đăng như sóc Bom Bo (Bình Minh), sóc Đắk Nhau hay sóc Thọ Sơn, bạn chắc chắn không thể bỏ qua cơ hội thưởng thức món canh thụt (tiếng S'tiêng gọi là "Rơ-bột"). Đây là món ăn truyền thống lâu đời được đúc kết từ tri thức bản địa phong phú của đồng bào vùng cao Bù Đăng, Thành Phố Đồng Nai, thể hiện sự hòa quyện tuyệt đối giữa ẩm thực và thiên nhiên hoang sơ.

**Sự kết hợp tinh tế từ sản vật rừng núi Bù Đăng**

Nguyên liệu chính làm nên món canh thụt trứ danh là những sản vật tự nhiên được thu hái trực tiếp từ các cánh rừng nguyên sinh Bù Đăng. Điển hình là đọt mây (phần lõi non, ngọt đắng nhẹ của cây mây rừng) và lá nhíp (loại lá rừng có vị ngọt thanh, bùi, giàu dinh dưỡng mọc nhiều ở vùng đất đỏ Bom Bo). Bên cạnh đó, người S'tiêng còn thêm vào các nguyên liệu phụ như cá suối, tôm đá hoặc thịt thú rừng hun khói, kèm theo cà pháo rừng, măng tươi, sả, và đặc biệt không thể thiếu rất nhiều ớt hiểm.

**Phương pháp nấu độc bản bằng cách "thụt" trong ống lồ ô**

Điểm làm nên sự khác biệt hoàn toàn của canh thụt so với các món canh thông thường là phương pháp nấu chín bằng cách sử dụng ống tre lồ ô non làm nồi. 
1. Người S'tiêng chọn những ống lồ ô bánh tẻ, còn nguyên nước tre tươi bên trong vách ống, chặt xéo một đầu để cho nguyên liệu vào.
2. Các nguyên liệu sau khi làm sạch được xếp lần lượt vào ống, đổ thêm một chút nước suối sạch.
3. Ống lồ ô được dựng nghiêng khoảng 45 độ trên bếp than hồng đỏ rực từ củi rừng. Người nấu phải quay đều ống tre để hơi nóng phân bổ đều, làm nguyên liệu chín dần bằng hơi nước và nhựa tre tươi tiết ra.
4. Khi thấy khói bốc lên thơm ngát và nước trong ống sôi sùng sục, người ta dùng một chiếc que tre dài, đầu dẹt (gọi là cối thụt) tiến hành "thụt" - tức là giã nhẹ nhàng liên tục vào bên trong ống tre. Hành động này làm các nguyên liệu chín mềm như đọt mây, lá nhíp, cá suối, ớt hiểm hòa lẫn vào nhau tạo nên một hỗn hợp đặc sánh, mịn màng và vô cùng đậm đà.

**Hương vị nhân sinh độc đáo**

Canh thụt có vị đắng dịu của đọt mây rừng, vị bùi béo ngọt hậu của lá nhíp, vị cay nồng xé lưỡi của ớt hiểm Bù Đăng, xen lẫn vị ngọt thơm của cá suối và mùi thơm ngai ngái đặc trưng của ống lồ ô nướng cháy cạnh. Món ăn này không chỉ cung cấp dinh dưỡng, giữ ấm cơ thể trong những đêm rừng lạnh giá mà còn là biểu trưng cho tinh thần kiên cường, sự khéo léo thích ứng với hoàn cảnh sinh tồn của người S'tiêng vùng cao Bù Đăng.`,
    coverImage: '/images/heritage/canh-thut-stieng.png',
    category: 'tin-tuc',
    author: 'Nghệ nhân Điểu Minh (nghệ nhân S\'tiêng)',
    publishedAt: '2026-06-15',
    readTime: 6,
    featured: true,
    tags: ['canh thụt', 'S\'tiêng', 'ẩm thực Bù Đăng', 'sóc Bom Bo', 'đọt mây lá nhíp'],
  },
  {
    id: 'news-002',
    slug: 'ruou-can-stieng-bu-dang-men-la-rung',
    title: 'Rượu Cần Đ\'rắp S\'lung: Tuyệt Kỹ Men Lá Rừng Độc Bản Của Người S\'tiêng Bù Đăng',
    subtitle: 'Tìm hiểu tri thức chế biến rượu cần cổ truyền được ghi danh là Di sản văn hóa phi vật thể quốc gia',
    excerpt: 'Rượu cần S\'tiêng Bù Đăng (Đ\'rắp S\'lung) nổi tiếng khắp cả nước nhờ công thức bánh men ủ từ các loại vỏ cây rừng đặc hữu và quy trình lên men thủ công cực kỳ khắt khe của các nghệ nhân buôn sóc.',
    content: `Quyết định đưa "Kỹ thuật chế biến rượu cần của người S'tiêng vùng đất Bù Đăng" vào Danh mục Di sản văn hóa phi vật thể quốc gia là sự khẳng định giá trị vượt thời gian của thức uống này. Tại Xã Bù Đăng, đặc biệt là vùng Bom Bo và Minh Hưng, rượu cần (Đ'rắp S'lung) được xem là linh vật kết nối con người với thần linh và biểu thị cho lòng hiếu khách tuyệt đối của người bản địa.

**Bí mật nằm ở bánh men làm từ lá rừng cổ truyền**

Khác với rượu của các vùng miền khác, người S'tiêng Bù Đăng hoàn toàn không dùng men công nghiệp. Men rượu cần Đ'rắp S'lung là sự kết hợp kỳ công của tri thức sinh thái học. Nghệ nhân làm rượu phải lặn lội vào sâu trong các khu rừng già Bù Đăng để tìm vỏ cây Krông, củ nghệ rừng, rễ cây Đơn và lá cây rừng đặc hữu. 
- Vỏ và lá cây rừng sau khi mang về được giã nát, vắt lấy nước cốt đậm đặc màu nâu đất.
- Nước cốt này được trộn đều với bột gạo nếp nương tự trồng trên rẫy đỏ Bù Đăng.
- Hỗn hợp bột được nặn thành các bánh men tròn dẹt, xếp trên lớp rơm nếp ấm để ủ men tự nhiên trong vài ngày cho đến khi xuất hiện lớp mốc trắng thơm dịu.
- Bánh men sau đó được treo trên gác bếp củi để khô tự nhiên, hấp thụ hơi ấm và khói bếp hun đúc hàng tháng trời trước khi đem ra sử dụng.

**Quy trình ủ và hương vị rượu cần đại ngàn**

Nguyên liệu chính để ủ rượu thường là gạo nếp rẫy, hạt bo bo hoặc ngô nướng chín. Sau khi nguội, nghệ nhân trộn đều nguyên liệu với bánh men rừng đã được tán mịn, rải thêm một lớp trấu sạch để tạo độ thông thoáng rồi cho tất cả vào ché (bình nung bằng đất sét). Miệng ché được bịt kín bằng lá chuối rừng khô và ủ trong bóng tối ít nhất từ 1 đến 3 tháng. 

Rượu cần S'tiêng khi chín có màu vàng óng như mật ong rừng, tỏa mùi thơm nồng nàn của gỗ và thảo mộc. Khi uống bằng cần trúc, người dùng sẽ cảm nhận rõ rệt vị ngọt dịu, tê cay nhẹ nơi đầu lưỡi và cảm giác ấm nóng lan tỏa khắp cơ thể nhưng hoàn toàn không gây đau đầu.

**Nghi thức uống rượu thắt chặt tình bang giao**

Uống rượu cần là một nghi lễ cộng đồng thiêng liêng. Ché rượu được đặt giữa nhà dài, cắm sẵn những chiếc cần trúc dài cong vút. Khi khách quý tới nhà, già làng sẽ thực hiện nghi thức rót nước lọc vào ché, đo mực nước bằng một cành cây nhỏ khía vạch (gọi là Kê Nhệt Pê). Nghi thức này thể hiện sự công bằng, chân thành, chia ngọt sẻ bùi giữa chủ và khách. Rượu cần Đ'rắp S'lung Bù Đăng không chỉ là ẩm thực, mà là biểu tượng của văn hóa ứng xử đầy tính nhân văn giữa đại ngàn xanh.`,
    coverImage: '/images/heritage/ruou-can-stieng.png',
    category: 'nghien-cuu',
    author: 'Ban biên tập Di Sản Bù Đăng',
    publishedAt: '2026-05-20',
    readTime: 8,
    featured: true,
    tags: ['rượu cần', 'S\'tiêng', 'Bù Đăng', 'men lá rừng', 'di sản phi vật thể'],
  },
  {
    id: 'news-003',
    slug: 'tieng-chay-gia-gao-soc-bom-bo-bu-dang',
    title: 'Huyền Thoại Tiếng Chày Trên Sóc Bom Bo: Biểu Tượng Đoàn Kết Bù Đăng',
    subtitle: 'Hành trình từ nhịp chày giã gạo nuôi quân trong chiến tranh đến không gian bảo tồn di sản văn hóa S\'tiêng',
    excerpt: 'Nhịp chày đôi, chày ba giã gạo nuôi quân thâu đêm dưới ánh đuốc lồ ô của người dân S\'tiêng sóc Bom Bo (Bù Đăng) năm xưa đã đi vào lịch sử oai hùng và âm nhạc cách mạng Việt Nam.',
    content: `Trong những năm tháng kháng chiến chống Mỹ cứu nước ác liệt (giai đoạn 1964 - 1965), phong trào cách mạng miền Nam đòi hỏi nguồn tiếp tế lương thực rất lớn cho chiến dịch Đồng Xoài. Hưởng ứng lời kêu gọi kháng chiến, đồng bào dân tộc S'tiêng tại sóc Bom Bo (nay thuộc xã Bình Minh, Thành phố Đồng Nai) đã có một quyết định lịch sử: huy động toàn bộ người dân ngày đêm giã gạo phục vụ bộ đội giải phóng.

**Cuộc giã gạo thâu đêm dưới ánh đuốc lồ ô**

Vì ban ngày giặc thường xuyên càn quét và ném bom oanh tạc, bà con sóc Bom Bo đã tập trung nổi lửa, đốt những bó đuốc làm từ tre lồ ô để giã gạo suốt đêm. Không phân biệt già trẻ, gái trai, cả buôn làng cùng quây quần bên các cối gỗ lớn. Tiếng chày đôi, chày ba nện đều đặn xuống cối đá, cối gỗ vang vọng khắp núi rừng Bù Đăng. Đồng bào sẵn sàng nhường cơm sẻ áo, đóng góp hàng chục tấn thóc rẫy, bắp ngô gùi xuyên rừng tiếp tế cho bộ đội chủ lực.

Nhạc sĩ Xuân Hồng khi đến thực tế tại đây đã vô cùng xúc động trước khí thế cách mạng cuồn cuộn này. Ông đã sáng tác ca khúc bất hủ "Tiếng chày trên Sóc Bom Bo" vào năm 1965, khắc họa chân thực tinh thần kiên cường, tình nghĩa quân dân thắm thiết của người S'tiêng Bù Đăng.

**Khu bảo tồn văn hóa Bom Bo ngày nay**

Sóc Bom Bo ngày nay đã trở thành Di tích lịch sử cấp Quốc gia và được quy hoạch thành Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo với diện tích rộng hơn 113 ha tại xã Bình Minh, Thành phố Đồng Nai. 

Đến đây, du khách sẽ được tận mắt chiêm ngưỡng những chiếc cối chày gỗ lịch sử, bộ cồng chiêng bằng đồng lớn nhất Việt Nam và hai ngôi nhà dài truyền thống của đồng bào S'tiêng. Đặc biệt vào các dịp lễ hội, du khách có thể trực tiếp tham gia trải nghiệm giã gạo chày tay cùng các nghệ nhân bản địa, lắng nghe nhịp điệu chày tre trầm hùng vang vọng giữa rừng cây lồ ô bạt ngàn, cảm nhận trọn vẹn hào khí lịch sử cách mạng hào hùng của mảnh đất Bù Đăng kiên cường.`,
    coverImage: '/images/heritage/giang-gao-bombo.png',
    category: 'tin-tuc',
    author: 'Ban biên tập Di Sản Bù Đăng',
    publishedAt: '2026-04-10',
    readTime: 7,
    featured: false,
    tags: ['sóc bom bo', 'giã gạo nuôi quân', 'lịch sử Bù Đăng', 'S\'tiêng', 'Xuân Hồng'],
  },
  {
    id: 'news-004',
    slug: 'com-lam-nep-nuong-stieng-bu-dang',
    title: 'Cơm Lam Nếp Nương S\'tiêng Bù Đăng: Hương Thơm Dẻo Ngọt Từ Ống Lồ Ô Tươi',
    subtitle: 'Nét văn hóa ẩm thực rẫy nương giản dị nhưng đầy tinh tế của người dân vùng đất đỏ Bù Đăng, Thành Phố Đồng Nai',
    excerpt: 'Cơm lam nếp nương của người S\'tiêng Bù Đăng mang hương vị đặc biệt nhờ hạt nếp rẫy dẻo thơm nấu chín hoàn toàn bằng nước tre tự nhiên trong các ống lồ ô non nướng trên than củi rừng.',
    content: `Cơm lam (tiếng S'tiêng gọi là "Biêng măn đừng ka") là món ăn vô cùng gần gũi nhưng chứa đựng tri thức ẩm thực độc đáo của đồng bào S'tiêng sinh sống dọc theo hệ thống sông Bé và các triền đồi đất đỏ Bù Đăng. Bắt nguồn từ những chuyến đi rừng dài ngày hay những mùa làm rẫy xa nhà, cơm lam đã trở thành nét văn hóa đặc sắc không thể thiếu trong các mâm cỗ lễ hội mừng lúa mới của người địa phương.

**Lựa chọn hạt nếp nương và ống lồ ô tươi tiêu chuẩn**

Sự tinh tế của món cơm lam S'tiêng Bù Đăng bắt đầu từ khâu lựa chọn nguyên liệu cực kỳ tỉ mỉ của các nghệ nhân:
1. Gạo nấu cơm lam phải là loại gạo nếp nương hạt tròn trịa, trắng trong, gặt từ những rẫy lúa khô trên sườn đồi Bù Đăng. Hạt nếp này khi chín có độ dẻo cực cao và vị ngọt đậm đà khó lẫn.
2. Ống nướng cơm phải là tre lồ ô non (hay tre bánh tẻ) được chặt trực tiếp từ rừng già. Ống phải tươi nguyên, vỏ mướt xanh để khi nướng lớp màng mỏng bên trong ống lồ ô bao bọc lấy hạt cơm, tạo thành một lớp áo mịn màng thơm ngát.

**Quy trình nướng cơm tinh tế**

Gạo nếp rẫy được vo sạch, ngâm trong nước suối khoảng vài tiếng cho mềm rồi cho vào ống lồ ô. Người nấu không đổ đầy gạo mà chừa lại khoảng một gang tay, đổ nước suối ngập mặt gạo rồi dùng lá chuối rừng cuộn chặt bịt kín miệng ống lại.

Quá trình nướng cơm đòi hỏi sự kiên nhẫn và khéo léo cao độ. Ống cơm lam được dựng nghiêng xung quanh bếp lửa than củi rừng hồng rực. Người nấu phải xoay đều ống liên tục để hơi nóng thấm đều qua lớp vỏ tre, làm hạt nếp nở chín mềm nhờ nước tre tươi tiết ra vách ống. Khi vỏ lồ ô chuyển sang màu vàng cháy sém và hương thơm của nếp quyện mùi tre tươi tỏa ra ngào ngạt, đó là lúc cơm đã chín hoàn hảo.

**Cách thưởng thức đậm chất hoang sơ**

Khi ăn, người ta dùng dao tước bỏ lớp vỏ lồ ô cháy bên ngoài, chỉ chừa lại một lớp vỏ mỏng màu trắng ngà ôm chặt lấy phần cơm nếp thon dài. Cắt cơm thành từng khúc nhỏ, chấm cùng muối mè (muối vừng) giã nhỏ với ớt hiểm hoặc ăn kèm thịt gà đồi Bù Đăng nướng than. Cơm lam dẻo quánh, ngọt bùi, đậm đà hương vị mộc mạc của tre rừng đại ngàn Bù Đăng sẽ mang lại một trải nghiệm ẩm thực vô cùng sâu sắc và khó quên cho bất kỳ du khách nào.`,
    coverImage: '/images/heritage/com-lam-stieng.png',
    category: 'tin-tuc',
    author: 'Ban biên tập Di Sản Bù Đăng',
    publishedAt: '2026-03-05',
    readTime: 5,
    featured: false,
    tags: ['cơm lam', 'S\'tiêng Bù Đăng', 'nếp nương', 'lồ ô tươi', 'ẩm thực rẫy nương'],
  },
  {
    id: 'news-005',
    slug: 'det-tho-cam-stieng-net-hoa-van-dai-ngan',
    title: 'Nghề Dệt Thổ Cẩm S\'tiêng Bù Đăng: Bản Họa Đồ Của Rừng Già',
    subtitle: 'Khám phá nghệ thuật dệt tay độc đáo và hệ thống hoa văn giàu ý nghĩa của người phụ nữ S\'tiêng',
    excerpt: 'Nghề dệt thổ cẩm của người S\'tiêng Bù Đăng không chỉ là kỹ thuật xe tơ dệt vải, mà còn là phương thức lưu truyền ký ức dân tộc qua những nét hoa văn tinh tế mô tả hạt lúa, cánh chim và dãy núi.',
    content: `Thổ cẩm S'tiêng Bù Đăng (tiếng địa phương gọi là "Krih") không chỉ là tấm vải che thân, mà là trang sử sống động viết bằng những sắc màu của đại ngàn. Nghệ thuật dệt thổ cẩm của đồng bào S'tiêng tại các buôn sóc xã Đắk Nhau, Bom Bo và Phú Sơn là kết tinh từ đôi bàn tay khéo léo cùng thế giới quan sâu sắc của người phụ nữ bản địa.

**Kỹ thuật nhuộm màu tự nhiên từ thảo mộc rừng**

Quy trình tạo nên một tấm thổ cẩm S'tiêng chuẩn mực vô cùng khắt khe, bắt đầu bằng việc đi tìm chất nhuộm màu thảo dã trong rừng sâu Bù Đăng. Người S'tiêng tuyệt đối không dùng phẩm màu hóa học:
- **Màu đen (chủ đạo):** Được chiết xuất bằng cách ngâm lá cây chàm rừng, phối trộn cùng bùn non giàu khoáng chất để màu bám chắc vào sợi bông.
- **Màu đỏ (tượng trưng cho lửa và sự sống):** Lấy từ vỏ cây Krông dập nát, đun sôi kỹ.
- **Màu vàng (tượng trưng cho ánh mặt trời):** Nhuộm từ củ nghệ rừng mọc hoang quanh dòng suối.

Sợi bông rẫy sau khi nhuộm nhiều lần sẽ được đem phơi khô trên gác bếp để tăng độ dẻo dai và bóng mượt trước khi đưa lên khung dệt gỗ (khung dệt dạng đai lưng vô cùng thô sơ nhưng linh hoạt).

**Hệ hoa văn - ngôn ngữ không lời của người S'tiêng**

Điểm đắt giá nhất trên tấm thổ cẩm S'tiêng Bù Đăng là dải hoa văn trang trí chạy dọc thân vải. Mỗi hoa văn là một biểu tượng văn hóa có ý nghĩa sâu sắc:
- **Hình thoi chéo xếp nối tiếp:** Mô phỏng hạt lúa rẫy - biểu trưng cho sự no ấm, sinh sôi nảy nở.
- **Hình răng cưa lượn sóng:** Tái hiện những dãy núi cao hiểm trở ôm lấy buôn làng và dòng sông Bé uốn lượn.
- **Hình con chim đang bay:** Thể hiện ước mơ tự do và khát vọng sống hòa hợp bền bỉ cùng đất trời.

**Giữ gìn hồn cốt di sản trước dòng chảy thời gian**

Trước làn sóng của vải dệt công nghiệp giá rẻ, nghề dệt thổ cẩm S'tiêng từng đứng trước nguy cơ thất truyền khi lớp trẻ không mặn mà học dệt. Để cứu lấy di sản phi vật thể quý báu này, các nghệ nhân kỳ cựu như nghệ nhân Thị Rét tại sóc Đắk Nhau đã mở nhiều lớp dạy dệt miễn phí cho các em học sinh THCS, THPT tại địa phương. Những tấm thổ cẩm truyền thống nay được biến tấu thành khăn quàng, túi xách thời trang phục vụ du khách tại sóc Bom Bo, góp phần mang lại nguồn thu nhập bền vững giúp giữ lửa cho những chiếc khung dệt cổ truyền vang tiếng kẽo kẹt giữa buôn làng.`,
    coverImage: '/images/heritage/det-tho-cam-stieng.png',
    category: 'tin-tuc',
    author: 'Nghệ nhân Thị Rét',
    publishedAt: '2026-02-18',
    readTime: 7,
    featured: false,
    tags: ['dệt thổ cẩm', 'S\'tiêng Bù Đăng', 'bản sắc văn hóa', 'hoa văn đại ngàn'],
  },
  {
    id: 'news-006',
    slug: 'dan-da-stieng-bu-dang-am-thanh-co-dai',
    title: 'Đàn Đá S\'tiêng Bù Đăng: Tiếng Vọng Ngàn Năm Từ Lòng Đất Mẹ',
    subtitle: 'Hành trình phục dựng và gìn giữ nhạc cụ gõ cổ xưa nhất của đồng bào S\'tiêng bên dòng thác đổ',
    excerpt: 'Đàn đá là nhạc cụ gõ cổ xưa nhất của người S\'tiêng vùng đất Bù Đăng, được tìm thấy trong lòng đất đỏ Thành Phố Đồng Nai. Tiếng đàn đá thanh thót như tiếng suối chảy, trầm hùng như gió ngàn đại ngàn.',
    content: `Trong không gian văn hóa cồng chiêng Tây Nguyên và Đông Nam Bộ, đàn đá (tiếng S'tiêng gọi là "Klong-put" đá hoặc "Goong-lú") được coi là báu vật linh thiêng bậc nhất. Tại Bù Đăng, những thanh đàn đá cổ được phát hiện ẩn sâu trong lòng đất đỏ bazan vùng Đắk Nhau, Bom Bo là minh chứng hùng hồn cho sự hiện diện lâu đời và đời sống tinh thần phong phú của đồng bào S'tiêng từ hàng ngàn năm trước.

**Hành trình tìm kiếm đá hát của tổ tiên**

Không phải loại đá nào cũng có thể phát ra âm nhạc. Để chế tác một bộ đàn đá chuẩn âm, nghệ nhân S'tiêng phải lặn lội dọc các dòng suối sâu quanh chân núi Bù Đăng để tìm kiếm chất liệu đá sừng (andesite hoặc rhyolite) đặc hữu. 
- Nghệ nhân dùng búa gõ nhẹ vào từng phiến đá suối để lắng nghe âm vang. Phiến đá đạt chuẩn phải phát ra tiếng kêu đanh, thanh thoát, trong trẻo như tiếng kim khí chạm nhau.
- Sau khi tìm được đá, quá trình đẽo gọt, ghè đẽo hoàn toàn thủ công bắt đầu. Nghệ nhân dùng đá ghè đá, bóc đi từng lớp vỏ ngoài để tinh chỉnh cao độ của từng thanh đá theo thang âm ngũ cung của nhạc cụ S'tiêng. Bộ đàn đá thường có từ 5 đến 9 thanh với độ dài ngắn, dày mỏng khác nhau, thanh dài phát ra âm trầm (tiếng Mẹ), thanh ngắn phát ra âm cao (tiếng Con).

**Tiếng vang đại ngàn nối liền quá khứ và hiện tại**

Tiếng đàn đá S'tiêng vô cùng kỳ diệu: khi trầm hùng sâu lắng như tiếng sấm gầm vang đầu mùa mưa, khi réo rắt thanh thoát tựa tiếng nước chảy qua khe đá của Thác Đứng. Người S'tiêng cổ xưa thường gõ đàn đá trên nương rẫy để xua đuổi thú dữ bảo vệ mùa màng, hoặc biểu diễn trong các lễ hội ăn trâu mừng nhà mới để mời gọi các đấng thần linh (Giàng) xuống chứng giám.

Hiện nay, phong trào tập luyện diễn tấu đàn đá đang được khôi phục mạnh mẽ thông qua các câu lạc bộ di sản học đường tại Bù Đăng, Thành phố Đồng Nai. Dưới sự truyền dạy của nghệ nhân Điểu K'Giang, thế hệ trẻ S'tiêng đã biết nâng niu những thanh đá thô ráp, gõ lên những giai điệu cách mạng và dân ca rộn rã, giữ cho tiếng vọng ngàn năm của tổ tiên tiếp tục ngân vang thắm thiết giữa nhịp sống hiện đại.`,
    coverImage: '/images/heritage/dan-da-stieng.png',
    category: 'nghien-cuu',
    author: 'Điểu K\'Giang',
    publishedAt: '2026-01-25',
    readTime: 8,
    featured: false,
    tags: ['đàn đá', 'S\'tiêng Bù Đăng', 'nhạc cụ cổ sơ', 'âm nhạc dân tộc'],
  },
]
export const EVENTS: Event[] = [
  {
    id: 'event-001',
    title: 'Lễ Hội “Vang Mãi Tiếng Chày Trên Sóc Bom Bo”',
    description: 'Tôn vinh truyền thống yêu nước của đồng bào S\'tiêng với hội thi giã gạo nuôi quân thâu đêm, biểu diễn đàn đá, cồng chiêng và thưởng thức ẩm thực truyền thống.',
    location: 'Khu Bảo tồn Văn hóa Dân tộc S\'tiêng Sóc Bom Bo (Bình Minh, Bù Đăng)',
    startDate: '2026-11-01',
    endDate: '2026-11-03',
    type: 'su-kien',
    isOnline: false,
  },
  {
    id: 'event-002',
    title: 'Lễ Hội Cầu Bông Miếu Đức Hòa',
    description: 'Di sản văn hóa phi vật thể Quốc gia của cộng đồng người Kinh tại Bù Đăng, dâng hương cầu mưa thuận gió hòa, quốc thái dân an và tri ân các tiền nhân khai hoang.',
    location: 'Di tích Lịch sử - Văn hóa Miếu Đức Hòa (Đức Phong, Bù Đăng)',
    startDate: '2026-10-15',
    endDate: '2026-10-30',
    type: 'su-kien',
    isOnline: false,
  },
  {
    id: 'event-003',
    title: 'Lễ Hội Mừng Lúa Mới Đất Đỏ Bù Đăng',
    description: 'Nghi lễ độc đáo tạ ơn thần lúa (Yang Sri) của người M\'nông và S\'tiêng, tái hiện sinh hoạt cộng đồng cồng chiêng, giã gạo và giao lưu rượu cần.',
    location: 'Nhà dài truyền thống các buôn sóc Bù Đăng',
    startDate: '2026-09-20',
    type: 'su-kien',
    isOnline: false,
  },
]
