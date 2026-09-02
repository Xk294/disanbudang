import type { SchoolResourceExtended, GlossaryTerm, ImageStory } from '~/types/study'

// ──────────────────────────────────────────────
// TYPE MAPS
// ──────────────────────────────────────────────
export const typeLabels: Record<string, string> = {
  research: 'Nghiên cứu',
  presentation: 'Slide bài giảng',
  artwork: 'Dự án nghệ thuật',
  document: 'Tài liệu giáo án',
  video: 'Video phóng sự'
}

export const typeIcons: Record<string, string> = {
  research: 'mdi:file-document-outline',
  presentation: 'mdi:presentation-play',
  artwork: 'mdi:palette-outline',
  document: 'mdi:folder-open-outline',
  video: 'mdi:video-outline'
}

// ──────────────────────────────────────────────
// FILTER CONFIG
// ──────────────────────────────────────────────
export const glossaryCategories = ['all', 'Tâm Linh', 'Ẩm Thực', 'Địa Danh', 'Vật Dụng']

export const difficultyFilters = [
  { id: 'easy', label: 'Dễ', dot: '●', color: 'text-green-400' },
  { id: 'medium', label: 'Trung bình', dot: '●', color: 'text-gold-400' },
  { id: 'hard', label: 'Nâng cao', dot: '●', color: 'text-red-400' }
]

export const fontSizes = ['14px', '16px', '18px', '20px']

export const mediaSubtabs = [
  { id: 'photos', label: 'Kho Ảnh', icon: 'mdi:image-multiple-outline' },
  { id: 'videos', label: 'Phim Tư Liệu', icon: 'mdi:video' },
  { id: 'audios', label: 'Audio', icon: 'mdi:volume-high' }
]

export const secondaryNavItems = [
  { id: 'passport', label: 'Hộ Chiếu Số', icon: 'mdi:book-account-outline', badge: '✨' },
  { id: 'explore', label: 'Khám Phá', icon: 'mdi:compass-outline' },
  { id: 'lab', label: 'Trải Nghiệm Số', icon: 'mdi:flask-outline', badge: '✨' },
  { id: 'glossary', label: 'Từ Điển', icon: 'mdi:translate' },
  { id: 'media', label: 'Đa Phương Tiện', icon: 'mdi:image-multiple-outline' },
  { id: 'achievements', label: 'Thành Tích', icon: 'mdi:trophy-outline' },
]

// ──────────────────────────────────────────────
// LESSON CATALOG
// ──────────────────────────────────────────────
export const lessonCatalogData = [
  { id: 'chien-khu-d', title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng Huyền Thoại', subject: 'Lịch sử địa phương', tldr: 'Hệ thống căn cứ địa cách mạng nằm sâu trong rừng nguyên sinh Bù Đăng, đóng vai trò quyết định trong kháng chiến chống Pháp và Mỹ.', coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp', xpReward: 80, estimatedMinutes: 12, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận', 'Hotspot'], hasContent: true },
  { id: 'cong-chieng-stieng', title: "Cồng Chiêng S'tiêng — Tiếng Nói Của Đại Ngàn", subject: 'Văn hóa dân tộc', tldr: 'Di sản văn hóa phi vật thể cùng cội nguồn UNESCO, cồng chiêng là tiếng nói tâm linh thiêng liêng kết nối buôn sóc với thần linh.', coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp', xpReward: 75, estimatedMinutes: 10, availableBlocks: ['Flashcards', 'Quiz', 'Thuật ngữ', 'Gợi mở'], hasContent: true },
  { id: 'soc-bom-bo', title: "Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến", subject: 'Lịch sử cách mạng', tldr: "Nơi khởi nguồn bài ca bất hủ, ghi dấu sự đồng lòng kiên trung giã gạo thâu đêm nuôi quân của đồng bào S'tiêng năm 1965.", coverImage: '/images/heritage/lich-su/soc-bom-bo-md.webp', xpReward: 90, estimatedMinutes: 15, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận'], hasContent: true },
  { id: 'trang-co-bu-lach', title: 'Danh Thắng Trảng Cỏ Bù Lạch — Kỳ Quan Thiên Nhiên', subject: 'Địa lý địa phương', tldr: 'Khám phá thung lũng trảng cỏ xanh mướt tự nhiên hơn 140 ha bao quanh hồ nước trong veo giữa lòng rừng già Bù Đăng.', coverImage: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png', xpReward: 70, estimatedMinutes: 8, availableBlocks: ['Hotspot', 'Quiz', 'Gallery'], hasContent: true },
  { id: 'nui-ba-ra', title: 'Núi Bà Rá — Đỉnh Thiêng & Di Tích Lịch Sử Kháng Chiến', subject: 'Lịch sử & Địa lý', tldr: 'Đỉnh núi cao 723m đứng thứ 3 toàn Nam Bộ, nơi tọa lạc di tích Nhà tù Bà Rá 1930 và gắn với trận đánh cứ điểm Phước Long 1975.', coverImage: '/images/heritage/img-disanbudang/nui-ba-ra.jpg', xpReward: 85, estimatedMinutes: 12, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận'], hasContent: true },
  { id: 'can-cu-nua-lon', title: 'Căn Cứ Nửa Lon — Biểu Tượng Ý Chí Vượt Gian Khó', subject: 'Lịch sử cách mạng', tldr: 'Địa chỉ đỏ ghi dấu thời kỳ quân dân chia nhau từng nửa lon gạo mỗi ngày giữ vững hành lang chiến lược Bắc — Nam.', coverImage: '/images/heritage/img-disanbudang/chien-khu-D.png', xpReward: 80, estimatedMinutes: 10, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận'], hasContent: true },
  { id: 'chien-thang-phuoc-long', title: 'Chiến Thắng Phước Long 1975 — Đòn Trinh Sát Chiến Lược', subject: 'Lịch sử quân sự', tldr: 'Chiến dịch lịch sử giải phóng tỉnh lỵ đầu tiên ở miền Nam ngày 06/01/1975, mở đường cho cuộc Tổng tiến công mùa Xuân 1975.', coverImage: '/images/heritage/img-disanbudang/tuong-dai-phuoc-long-chien-thang.jpg', xpReward: 95, estimatedMinutes: 15, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận'], hasContent: true },
  { id: 'can-cu-ta-thiet', title: 'Căn Cứ Tà Thiết — Đầu Não Bộ Chỉ Huy Miền', subject: 'Di tích quốc gia đặc biệt', tldr: 'Khám phá "Rừng Chính phủ" — cơ quan đầu não chỉ đạo toàn bộ phong trào cách mạng miền Nam và Chiến dịch Hồ Chí Minh lịch sử.', coverImage: '/images/heritage/img-disanbudang/can-cu-ta-thiet.jpg', xpReward: 90, estimatedMinutes: 14, availableBlocks: ['Timeline', 'Flashcards', 'Quiz', 'Tự luận'], hasContent: true },
  { id: 'tho-cam-stieng', title: "Nghệ Thuật Dệt Thổ Cẩm S'tiêng — Tinh Hoa Bản Địa", subject: 'Văn hóa & Nghệ thuật', tldr: "Tìm hiểu quy trình nhuộm màu tự nhiên từ thảo mộc rừng và kỹ thuật dệt hoa văn hình thoi Sơk Pơng độc đáo của phụ nữ S'tiêng.", coverImage: '/images/heritage/det-tho-cam-stieng.png', xpReward: 75, estimatedMinutes: 10, availableBlocks: ['Flashcards', 'Quiz', 'Gallery'], hasContent: true },
  { id: 'thac-dung-dak-wuar', title: 'Danh Thắng Thác Đứng — Dấu Ấn Địa Chất Cột Bazan', subject: 'Địa chất & Danh thắng', tldr: 'Kỳ quan thiên nhiên bazan cột lục lăng trên dòng suối Đăk Wuar tại xã Đoàn Kết, minh chứng địa chất núi lửa cổ xưa.', coverImage: '/images/heritage/danh-thang/thac-dung-lg.webp', xpReward: 70, estimatedMinutes: 8, availableBlocks: ['Hotspot', 'Quiz', 'Gallery'], hasContent: true }
]

// ──────────────────────────────────────────────
// EXPLORE TAB DATA
// ──────────────────────────────────────────────
export const heritageClusters = [
  {
    id: 'bu-dang',
    name: 'Bù Đăng',
    desc: "Căn cứ kháng chiến, rừng nguyên sinh, làng nghề và lễ hội bản địa người S'tiêng.",
    icon: 'mdi:tree-outline',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400',
    bgGradient: 'bg-gradient-to-br from-green-950/60 to-charcoal-950',
    borderColor: 'border-green-900/50 hover:border-green-600/40',
    tagColor: 'text-green-400',
    tag: '5 di sản'
  },
  {
    id: 'bom-bo',
    name: 'Sóc Bom Bo',
    desc: 'Cồng chiêng, nhà dài, huyền thoại nhịp chày giã gạo nuôi quân kháng chiến.',
    icon: 'mdi:fire',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-400',
    bgGradient: 'bg-gradient-to-br from-orange-950/60 to-charcoal-950',
    borderColor: 'border-orange-900/50 hover:border-orange-600/40',
    tagColor: 'text-orange-400',
    tag: '3 di sản'
  },
  {
    id: 'phuoc-long',
    name: 'Phước Long',
    desc: 'Núi Bà Rá, hồ Thác Mơ, Chiến thắng Phước Long lịch sử 06/01/1975.',
    icon: 'mdi:mountain',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    bgGradient: 'bg-gradient-to-br from-blue-950/60 to-charcoal-950',
    borderColor: 'border-blue-900/50 hover:border-blue-600/40',
    tagColor: 'text-blue-400',
    tag: '2 di sản'
  },
  {
    id: 'loc-ninh',
    name: 'Lộc Ninh',
    desc: 'Căn cứ Tà Thiết, Nhà Giao Tế — cửa ngõ kết nối Chiến khu Đ và vùng biên giới.',
    icon: 'mdi:shield-star-outline',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    bgGradient: 'bg-gradient-to-br from-purple-950/60 to-charcoal-950',
    borderColor: 'border-purple-900/50 hover:border-purple-600/40',
    tagColor: 'text-purple-400',
    tag: '1 di sản'
  }
]

export const heritageSpotlights = [
  {
    slug: 'soc-bom-bo',
    name: "Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến",
    desc: "Địa danh lịch sử hào hùng, nơi đồng bào S'tiêng đốt đuốc giã gạo thâu đêm nuôi quân kháng chiến chống Mỹ.",
    image: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    location: 'Xã Bù Đăng, Thành Phố Đồng Nai',
    tag: 'Lịch sử',
    tagClass: 'bg-red-500/20 border-red-500/40 text-red-300',
    audioGuide: true
  },
  {
    slug: 'trang-co-bu-lach',
    name: 'Trảng Cỏ Bù Lạch — Kỳ Quan Thiên Nhiên',
    desc: 'Đồng cỏ tự nhiên hiếm gặp rộng gần 140 ha nằm giữa rừng già nguyên sinh, hệ sinh thái độc đáo bậc nhất Đông Nam Bộ.',
    image: '/images/heritage/danh-thang/bu-lach-lg.webp',
    location: 'Xã Bù Đăng, Thành Phố Đồng Nai',
    tag: 'Danh thắng',
    tagClass: 'bg-green-500/20 border-green-500/40 text-green-300',
    audioGuide: false
  },
  {
    slug: 'cong-chieng-stieng',
    name: "Cồng Chiêng S'tiêng — Cùng Mạch Nguồn UNESCO",
    desc: "Cồng chiêng S'tiêng Bù Đăng chung cội nguồn với Không gian văn hóa cồng chiêng Tây Nguyên (UNESCO 2005), đang được cộng đồng gìn giữ.",
    image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    location: 'Sóc Bom Bo, Thành Phố Đồng Nai',
    tag: 'Phi vật thể',
    tagClass: 'bg-gold-500/20 border-gold-500/40 text-gold-300',
    audioGuide: true
  }
]

export const communityStoriesExplore = [
  {
    id: 'story-1',
    title: 'Tiếng Chiêng Vang Đêm Mừng Lúa Mới',
    category: "Ký ức S'tiêng",
    excerpt: 'Cứ đến tháng 11 âm lịch, cả buôn sóc thức đêm. Tiếng chiêng vang lên từ nhà già làng, lan ra khắp rừng. Trẻ em không ai ngủ — chúng biết đó là đêm Yang Sri về.',
    narrator: 'Già làng Điểu Lên, 83 tuổi',
    icon: 'mdi:music-note',
    iconBg: 'bg-gold-500/15',
    iconColor: 'text-gold-400'
  },
  {
    id: 'story-2',
    title: 'Đêm Giã Gạo Nuôi Quân Năm 1965',
    category: 'Kháng chiến',
    excerpt: 'Bộ đội thiếu gạo, cả sóc Bom Bo đốt đuốc lồ ô, đứng thành hàng dài giã từ chập tối đến bình minh. Không ai bảo ai — người mệt thì người khác vào thay.',
    narrator: 'Nghệ nhân Thị Bay, 78 tuổi',
    icon: 'mdi:fire',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-400'
  },
  {
    id: 'story-3',
    title: 'Dak Mơ — Nguồn Nước Của Ước Mơ',
    category: 'Huyền thoại',
    excerpt: "Tổ tiên người S'tiêng kể: ngày xưa có cô gái uống nước suối Dak Mơ mà khỏi bệnh. Từ đó dân làng gọi nguồn nước ấy là \"nước của ước mơ\" — Dak Mơ, tên Thác Mơ ngày nay.",
    narrator: 'Nghệ nhân Điểu Nhân, 71 tuổi',
    icon: 'mdi:water',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400'
  },
  {
    id: 'story-4',
    title: 'Bí Quyết Pha Màu Thổ Cẩm Từ Rừng',
    category: 'Làng nghề',
    excerpt: 'Không phải ai cũng biết: màu đen bền nhất phải lấy từ vỏ cây Krông ngâm ba ngày ba đêm. Màu đỏ thì củ nghệ đỏ pha nước chua me rừng. Nghệ nhân già giờ còn lại mấy người.',
    narrator: 'Nghệ nhân Thị Rét, 72 tuổi',
    icon: 'mdi:palette',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-400'
  },
  {
    id: 'story-5',
    title: 'Yang Bri — Thần Rừng Bảo Vệ Buôn Sóc',
    category: 'Tâm linh',
    excerpt: "Trước khi vào rừng già, người S'tiêng phải xin phép Yang Bri. Lấy củi thì chỉ lấy cây khô. Không ai được chặt cây tươi vô cớ — người vi phạm sẽ bị rừng \"phạt\" bằng bệnh tật.",
    narrator: 'Già làng Điểu Nhuôn, 79 tuổi',
    icon: 'mdi:tree',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400'
  },
  {
    id: 'story-6',
    title: 'Đàn Đá — Tiếng Vọng Từ Ngàn Năm',
    category: 'Nhạc cụ cổ',
    excerpt: 'Ông nội tôi tìm được bộ đàn đá trong rừng sâu khi còn nhỏ. Ông gõ thử, âm thanh vang như tiếng trời. Bộ đàn đó đã nằm trong rừng ít nhất vài ngàn năm — ông chưa bao giờ dám bán.',
    narrator: 'Ông Điểu Thắng, 65 tuổi',
    icon: 'mdi:music-box',
    iconBg: 'bg-earth-500/15',
    iconColor: 'text-earth-400'
  },
  {
    id: 'story-7',
    title: 'Ký Ức Căn Cứ Nửa Lon Bù Đăng',
    category: 'Nhân chứng lịch sử',
    excerpt: 'Năm 1962 đói gay gắt, mỗi chiến sĩ đúng nửa lon gạo một ngày nấu cháo loãng với đọt mây lá nhíp rừng. Nhưng hễ có gạo tiếp tế chuyển vào là gom hết gùi ra tiền tuyến.',
    narrator: 'Cựu chiến binh Điểu Đố, 81 tuổi',
    icon: 'mdi:shield-star',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-400'
  },
  {
    id: 'story-8',
    title: 'Chuyện Kể Bên Hồ Trảng Cỏ Bù Lạch',
    category: 'Truyền thuyết bản địa',
    excerpt: 'Người già bảo trảng cỏ Bù Lạch là dấu chân voi thần để lại, hồ nước ở giữa là giọt sương trời đọng lại. Bao đời nay đồng bào chỉ thả trâu bò ăn cỏ, tuyệt đối không xây cất phá vỡ đất thiêng.',
    narrator: 'Cụ Điểu Khen, 76 tuổi',
    icon: 'mdi:leaf',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400'
  }
]

export const heritageFacts = [
  { value: '16', label: 'Di sản số hóa', icon: 'mdi:database-outline', iconBg: 'bg-gold-500/10', iconColor: 'text-gold-400' },
  { value: '160', label: 'Câu hỏi trắc nghiệm', icon: 'mdi:help-circle-outline', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { value: '24', label: 'Flashcard 3D', icon: 'mdi:cards-outline', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400' },
  { value: '10', label: 'Bài học tương tác', icon: 'mdi:book-open-variant', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' }
]

export const heritageLabItems = [
  { id: 'timeline', title: 'Dòng Thời Gian Lịch Sử', desc: 'Hành trình thời gian từ thời kỳ tiền sử đến hiện đại qua các sự kiện quan trọng của Bù Đăng — Bình Phước.', icon: 'mdi:timeline-clock', iconBg: 'bg-gold-500/10', iconColor: 'text-gold-400', gradientBg: 'bg-gold-400', active: true },
  { id: 'storymap', title: 'Bản Đồ Câu Chuyện', desc: 'Bản đồ câu chuyện tích hợp ảnh, văn bản và audio theo từng địa điểm di sản.', icon: 'mdi:map-legend', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', gradientBg: 'bg-blue-400', active: false },
  { id: 'compare', title: 'So Sánh Xưa & Nay', desc: 'So sánh hình ảnh di sản xưa và nay — thấy sự thay đổi qua thời gian.', icon: 'mdi:compare', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', gradientBg: 'bg-purple-400', active: true },
  { id: 'audio', title: 'Lời Kể Nhân Chứng', desc: 'Lời kể của nhân chứng lịch sử — những câu chuyện sống động chưa được viết thành sách.', icon: 'mdi:microphone', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', gradientBg: 'bg-orange-400', active: false },
  { id: 'artifact', title: 'Xem Hiện Vật', desc: 'Xem hiện vật bảo tàng với chú thích học thuật và thông tin phân tích.', icon: 'mdi:museum', iconBg: 'bg-earth-500/10', iconColor: 'text-earth-400', gradientBg: 'bg-earth-400', active: true },
  { id: 'tour', title: 'Tham Quan Ảo', desc: 'Tour tham quan ảo 360° tại các địa điểm di tích lịch sử và danh thắng Bù Đăng.', icon: 'mdi:rotate-3d', iconBg: 'bg-green-500/10', iconColor: 'text-green-400', gradientBg: 'bg-green-400', active: false }
]

export const historyTimeline = [
  { year: 'Thế kỷ 3-4', tag: 'Khảo cổ', tagBg: 'bg-earth-500/10 text-earth-400', title: 'Đàn đá tiền sử Lộc Ninh — Bù Đăng', desc: 'Những bộ đàn đá cổ đại hàng nghìn năm tuổi được phát hiện trong lòng đất đỏ bazan, minh chứng âm nhạc tiền sử vùng Đông Nam Bộ.' },
  { year: '1930', tag: 'Kháng Pháp', tagBg: 'bg-red-500/10 text-red-400', title: 'Thực dân Pháp lập Nhà tù Bà Rá', desc: 'Nhà tù kiên cố xây dựng dưới chân núi Bà Rá để giam cầm các chí sĩ yêu nước và chiến sĩ cộng sản kiên trung.' },
  { year: '1945', tag: 'Cách mạng', tagBg: 'bg-red-500/10 text-red-400', title: 'Thành lập Chiến Khu Đ huyền thoại', desc: 'Hệ thống căn cứ địa cách mạng trong rừng già Bù Đăng ra đời sau Cách mạng Tháng Tám, làm bàn đạp cho toàn miền Đông.' },
  { year: '1960–1965', tag: 'Chi viện', tagBg: 'bg-orange-500/10 text-orange-400', title: 'Căn cứ Nửa Lon mở hành lang chiến lược', desc: 'Quân dân Bù Đăng chia nhau từng nửa lon gạo mỗi ngày, khai thông hành lang chiến lược Bắc — Nam qua đường mòn Hồ Chí Minh.' },
  { year: '1965', tag: 'Kháng chiến', tagBg: 'bg-gold-500/10 text-gold-400', title: 'Đêm giã gạo huyền thoại Sóc Bom Bo', desc: "Đồng bào S'tiêng đốt đuốc lồ ô giã gạo thâu đêm nuôi quân phục vụ Chiến dịch Phước Long — Đồng Xoài; nhạc sĩ Xuân Hồng sáng tác bài ca bất hủ." },
  { year: '1973', tag: 'Ngoại giao', tagBg: 'bg-purple-500/10 text-purple-400', title: 'Nhà Giao Tế Lộc Ninh & Căn cứ Tà Thiết', desc: 'Sau Hiệp định Paris, Lộc Ninh là thủ phủ ngoại giao cách mạng; Căn cứ Tà Thiết trở thành đại bản doanh Bộ Tư lệnh Miền.' },
  { year: '06/01/1975', tag: 'Toàn thắng', tagBg: 'bg-red-500/10 text-red-400', title: 'Chiến thắng Phước Long lịch sử', desc: 'Giải phóng hoàn toàn tỉnh Phước Long — "đòn trinh sát chiến lược" quyết định giúp Bộ Chính trị mở Tổng tiến công mùa Xuân 1975.' },
  { year: '1994', tag: 'Xây dựng', tagBg: 'bg-blue-500/10 text-blue-400', title: 'Khánh thành Thủy điện Thác Mơ', desc: 'Công trình thủy điện trên sông Bé hòa lưới điện quốc gia, hình thành danh thắng hồ Thác Mơ rộng hơn 640 ha.' },
  { year: '2005', tag: 'UNESCO', tagBg: 'bg-blue-500/10 text-blue-400', title: 'Không gian văn hóa Cồng Chiêng được vinh danh', desc: "UNESCO công nhận Không gian văn hóa Cồng chiêng Tây Nguyên là Di sản phi vật thể nhân loại. Cồng chiêng S'tiêng Bù Đăng chung mạch nguồn thiêng liêng này." },
  { year: '2026', tag: 'Số hóa', tagBg: 'bg-green-500/10 text-green-400', title: 'Cổng Học Tập Di Sản Số Bù Đăng ra mắt', desc: 'Bảo tàng số di sản Bù Đăng — Bình Phước ra mắt, số hóa toàn diện 16 di tích, bài học tương tác, 160 câu hỏi quiz và flashcard 3D cho học sinh.' }
]

// ──────────────────────────────────────────────
// RESOURCES (static fallback)
// ──────────────────────────────────────────────
export const staticResources: SchoolResourceExtended[] = [
  {
    id: 'res-001',
    title: 'Lịch Sử Hình Thành Chiến Khu Đ Qua Lời Kể Nhân Chứng Lịch Sử',
    description: 'Nghiên cứu điền dã ghi chép lại câu chuyện chiến đấu kiên cường của các cựu chiến binh Chiến khu Đ năm xưa.',
    type: 'research', subject: 'Lịch sử địa phương', grade: '12',
    school: 'THPT Lê Quý Đôn', author: 'Nhóm học sinh 12A1',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-04-10', featured: true, downloadCount: 234, fileSize: '3.6 MB', difficulty: 3,
    fileUrl: '/tai-lieu/chien-khu-d.pdf',
    motivation: 'Thế hệ cựu chiến binh Chiến khu Đ nay đều đã tuổi cao sức yếu. Chúng em muốn chạy đua với thời gian để lưu giữ lại những câu chuyện hào hùng chân thực nhất từ lời kể của họ.',
    keyFindings: ['Ghi âm và chép lại hơn 30 giờ phỏng vấn trực tiếp từ 12 nhân chứng lịch sử.', 'Phác thảo và số hóa sơ đồ hoạt động quân sự của 3 điểm đóng quân cũ.', 'Sưu tầm hình ảnh tư liệu của 15 loại hiện vật, vũ khí tự chế thời chiến.'],
    quizId: 'quiz-001',
    pages: ['<h2>CHƯƠNG I: BỐI CẢNH LỊCH SỬ</h2><p>Chiến Khu Đ là một trong những hệ thống căn cứ địa quan trọng bậc nhất của lực lượng kháng chiến tại khu vực miền Đông Nam Bộ trong giai đoạn từ năm 1945 đến năm 1975.</p><blockquote>"Nếu không ghi chép lại ngay hôm nay, những trang sử sống động từ lời kể của thế hệ đi trước sẽ vĩnh viễn nằm lại dưới lòng đất mẹ." — Lời mở đầu đề tài nghiên cứu.</blockquote>', '<h2>CHƯƠNG II: PHƯƠNG PHÁP KHẢO CỨU ĐIỀN DÃ</h2><p>Trong quá trình thực hiện từ tháng 9 năm 2023 đến tháng 3 năm 2024, nhóm chúng em đã tiến hành 12 đợt điền dã thực tế vào sâu các buôn sóc bản địa. Nhóm đã phỏng vấn và ghi âm được hơn 30 giờ chia sẻ từ các cựu chiến binh.</p>', '<h2>CHƯƠNG III: ĐỀ XUẤT GIẢI PHÁP BẢO TỒN DI SẢN SỐ</h2><p>Để di sản Chiến Khu Đ mãi trường tồn và tiếp cận gần hơn với thế hệ học sinh Gen Z, nhóm nghiên cứu đề xuất ba giải pháp thực tế:<br/>1. Xây dựng cổng thông tin số di sản<br/>2. Thiết lập tour học tập ảo<br/>3. Lồng ghép giáo dục địa phương</p>']
  },
  {
    id: 'res-002',
    title: "Phân Tích Hoa Văn Thổ Cẩm S'tiêng: Ngôn Ngữ Không Lời",
    description: 'Nghiên cứu 23 mẫu hoa văn thổ cẩm truyền thống, giải mã ý nghĩa biểu tượng hạt gạo, dãy núi và chim rừng.',
    type: 'research', subject: 'Văn hóa dân tộc', grade: '9',
    school: 'THCS Nguyễn Trường Tộ', author: 'Nhóm học sinh 9A',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    publishedAt: '2024-03-20', featured: false, downloadCount: 156, fileSize: '2.8 MB', difficulty: 2,
    fileUrl: '/tai-lieu/soc-bom-bo-dong-nai.pdf',
    motivation: "Khi quan sát những tấm vải dệt của người S'tiêng, chúng em nhận thấy mỗi họa tiết đều đối xứng tuyệt đối và mang sắc màu núi rừng.",
    keyFindings: ['Số hóa 23 mẫu hoa văn thêu tay truyền thống.', 'Giải mã ý nghĩa: Họa tiết hình thoi chéo biểu thị hạt gạo no ấm.', 'Hồ sơ hóa quy trình pha nhuộm màu tự nhiên từ lá cây rừng.'],
    quizId: 'quiz-002',
    pages: ["<h2>CHƯƠNG I: HOA VĂN THỔ CẨM</h2><p>Nghề dệt thổ cẩm cổ truyền là biểu tượng văn hóa rực rỡ nhất thể hiện óc sáng tạo nghệ thuật của đồng bào S'tiêng.</p><blockquote>\"Học hoa văn dệt là học cách người xưa trò chuyện với núi rừng, trời đất.\" — Nghệ nhân Thị Rét.</blockquote>", '<h2>CHƯƠNG II: PHƯƠNG PHÁP VÀ KẾT QUẢ</h2><p>Nhóm thực hiện 3 đợt gặp gỡ nghệ nhân Thị Rét (72 tuổi) và số hóa 23 mẫu hoa văn bằng phương pháp chụp ảnh macro tỉ lệ 1:1. Phát hiện: họa tiết "Sơk Pơng" (hạt gạo bốn mùa) — lời cầu nguyện cho mùa màng bội thu.</p>', '<h2>CHƯƠNG III: QUY TRÌNH NHUỘM MÀU TỰ NHIÊN</h2><p>Màu đen từ vỏ cây Krông, màu đỏ từ củ nghệ đỏ pha me rừng, màu xanh từ lá chàm ven suối. Toàn bộ quy trình được biên soạn thành tài liệu hướng dẫn 8 bước.</p>']
  },
  {
    id: 'res-003',
    title: "Âm Nhạc Cồng Chiêng - Di Sản Sống Của Người S'tiêng",
    description: 'Tài liệu thuyết trình đa phương tiện về lịch sử, ý nghĩa tâm linh và vai trò của cồng chiêng trong đời sống cộng đồng.',
    type: 'presentation', subject: 'Giáo dục địa phương', grade: '11',
    school: 'THPT Lê Quý Đôn', author: 'Vũ Quang Huy',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    publishedAt: '2024-05-01', featured: false, downloadCount: 312, fileSize: '4.8 MB', difficulty: 1,
    fileUrl: '/tai-lieu/dong-nai-nhung-nam-thang-khang-chien.pdf',
    motivation: 'Tiếng cồng chiêng là linh hồn kết nối con người với thế giới thần linh của người bản địa.',
    keyFindings: ['Số hóa 6 bản thu âm cồng chiêng cổ tiêu biểu.', 'Xây dựng sơ đồ bố trí không gian trình diễn cồng chiêng.', 'Tổng hợp 12 tài liệu nghiên cứu chuyên sâu về nhạc cụ đồng.'],
    quizId: 'quiz-002',
    pages: ['<h2>PHẦN I: CỒNG CHIÊNG TRONG ĐỜI SỐNG TÂM LINH</h2><p>Cồng chiêng không đơn thuần là nhạc cụ mà là tiếng nói tâm linh thiêng liêng nhất. Mỗi chiếc chiêng đều có vị thần <strong>Yang Ching</strong> ngự trị.</p><blockquote>"Tiếng chiêng là hơi thở của đại ngàn." — Cựu binh Điểu Lên.</blockquote>', "<h2>PHẦN II: CẤU TRÚC DÀN NHẠC</h2><p>Một bộ cồng chiêng S'tiêng hoàn chỉnh gồm 6-12 chiếc, sắp xếp theo thang âm riêng. Trong trình diễn, người đánh chiêng đứng thành vòng tròn, phụ nữ múa xoang ngược chiều — tượng trưng âm dương đối xứng.</p>", '<h2>PHẦN III: NGUY CƠ MAI MỘT</h2><p>Tại Sóc Bom Bo chỉ còn 4 người đàn ông cao tuổi thành thạo kỹ thuật đánh chiêng truyền thống. Nhóm đề xuất thành lập Câu lạc bộ Cồng chiêng học sinh tại các trường THPT.</p>']
  },
  {
    id: 'res-004',
    title: "Nghi Thức Lễ Hội Mừng Lúa Mới Của Người S'tiêng",
    description: 'Báo cáo điền dã chi tiết về các bước tế lễ thần Yang lúa và cộng đồng trong dịp tết lớn nhất năm của buôn sóc.',
    type: 'document', subject: 'Giáo dục địa phương', grade: '10',
    school: 'THPT Lê Quý Đôn', author: 'Trần Thị Mai',
    coverImage: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    publishedAt: '2024-05-15', featured: false, downloadCount: 198, fileSize: '1.9 MB', difficulty: 1,
    fileUrl: '/tai-lieu/dong-nai-hom-nay-khat-vong-vuon-len.pdf',
    motivation: 'Nhằm xây dựng tài liệu tham khảo giảng dạy chính thống cho phân môn Giáo dục địa phương.',
    keyFindings: ['Hệ thống hóa 5 bước tế lễ chính thức của lễ hội Mừng lúa mới.', "Sưu tầm và biên dịch 3 bài khấn cầu thần Yang lúa.", 'Lập danh mục 8 lễ vật bắt buộc trong mâm cúng cộng đồng.'],
    pages: ["<h2>CHƯƠNG I: Ý NGHĨA TÂM LINH LỄ MỪNG LÚA MỚI</h2><p>Lễ <strong>cúng tạ ơn Yang Sri</strong> là nét đẹp văn hóa tâm linh quan trọng bậc nhất của đồng bào S'tiêng tại Xã Bù Đăng, tổ chức vào tháng 11-12 âm lịch.</p><blockquote>\"Yang Sri về kho lúa thì buôn sóc mới no ấm.\" — Già làng Điểu Nhuôn.</blockquote>", "<h2>CHƯƠNG II: NĂM BƯỚC TẾ LỄ</h2><ol><li>Lễ rước Yang Sri từ ruộng về kho</li><li>Lễ mổ heo, gà cúng Yang</li><li>Đọc bài khấn tiếng S'tiêng</li><li>Uống rượu cần cộng đồng</li><li>Lễ đóng cửa kho lúa</li></ol>", '<h2>CHƯƠNG III: TÀI LIỆU GIẢNG DẠY</h2><p>Bộ tài liệu gồm giáo án 2 tiết, phiếu học tập 12 câu hỏi, 3 bài khấn kèm phiên âm và dịch nghĩa. Đã thí điểm thành công tại THPT Lê Quý Đôn.</p>']
  },
  {
    id: 'res-005',
    title: 'Kỹ Thuật Chế Tác Đàn Đá & Nhạc Cụ Tre Nứa Bản Địa Bù Đăng',
    description: 'Nghiên cứu khảo sát khảo cổ học học sinh về cách chọn đá, ghè đẽo đá tạo âm thanh tự nhiên Đông Nam Bộ.',
    type: 'artwork', subject: 'Nghệ thuật cổ truyền', grade: '11',
    school: 'THPT Chuyên Quang Trung', author: 'Nhóm Vật lý - Lịch sử',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
    publishedAt: '2024-06-10', featured: false, downloadCount: 145, fileSize: '5.2 MB', difficulty: 3,
    fileUrl: '/tai-lieu/can-cu-ta-thiet.pdf',
    motivation: 'Đàn đá là một trong những nhạc cụ cổ xưa nhất của nhân loại được phát hiện tại Việt Nam.',
    keyFindings: ['Khảo sát chi tiết 3 bộ đàn đá cổ được gìn giữ bởi các dòng họ lâu đời.', 'Đo đạc tần số âm thanh của từng thanh đá.', 'Tái dựng quy trình ghè đẽo cân chỉnh âm thanh.'],
    pages: ['<h2>CHƯƠNG I: ĐÀN ĐÁ TỪ LÒNG ĐẤT CỔ XƯA</h2><p>Đàn đá là biểu tượng âm nhạc của cư dân tiền sử sông Đồng Nai. Người xưa biết <strong>lựa chọn đá tự nhiên</strong> có mật độ phù hợp để phát ra âm thanh.</p><blockquote>"Chọn đá đàn là nghệ thuật lắng nghe lòng đá." — Nghệ nhân Điểu Nhân.</blockquote>', '<h2>CHƯƠNG II: PHÂN TÍCH VẬT LÝ ÂM THANH</h2><p>Phân tích bằng Spectroid cho thấy đàn đá tạo thang âm pentatonic đặc trưng Đông Nam Á. Đá sừng (hornfels) cho âm thanh trong nhất.</p>', '<h2>CHƯƠNG III: NHẠC CỤ TRE NỨA VÀ PHỤC DỰNG</h2><p>Ngoài đàn đá, nhóm khảo sát Đinh Tăk Ta, Đinh Pơng và Brô. Đã thực hành tái dựng một chiếc Đinh Tăk Ta hoàn chỉnh trong 4 giờ theo hướng dẫn nghệ nhân.</p>']
  },
  {
    id: 'res-006',
    title: 'Phóng Sự: Nhịp Chày Sóc Bom Bo - Ký Ức Không Ngủ',
    description: 'Phóng sự tài liệu ghi lại hành trình phục dựng cảnh giã gạo nuôi quân bằng ánh đuốc lồ ô tại Sóc Bom Bo.',
    type: 'video', subject: 'Lịch sử địa phương', grade: '10',
    school: 'THPT Chuyên Quang Trung', author: 'CLB Truyền Thông Măng Non',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    publishedAt: '2024-07-02', featured: false, downloadCount: 187, fileSize: '218 MB', difficulty: 2,
    fileUrl: '/tai-lieu/soc-bom-bo-dong-nai.pdf',
    motivation: 'Chúng em muốn ghi hình lại chính xác động tác giã gạo chày tay trước khi thế hệ nghệ nhân cuối cùng không còn nữa.',
    keyFindings: ["Quay và dựng phóng sự dài 12 phút, phục dựng cảnh giã gạo cùng 8 nghệ nhân.", 'Ghi lại nguyên bản giai điệu hò giã gạo cổ truyền.', "Phỏng vấn 3 thế hệ trong một gia đình S'tiêng."],
    quizId: 'quiz-011',
    pages: ["<h2>MỞ ĐẦU: VÌ SAO CHÚNG EM LÀM PHÓNG SỰ NÀY</h2><p>Năm 1965, đồng bào S'tiêng ở sóc Bom Bo đốt đuốc lồ ô, thức trắng đêm giã gạo để tiếp tế cho bộ đội. Câu chuyện ấy đã đi vào âm nhạc Việt Nam nhưng hình ảnh thực tế chưa từng được ghi hình đầy đủ.</p><blockquote>\"Tụi nhỏ quay được cảnh này, bà mừng lắm, vì rồi bà cũng không giã nổi chày nữa.\" — Nghệ nhân Thị Bay, 78 tuổi.</blockquote>", '<h2>PHẦN 1: PHỤC DỰNG ĐÊM GIÃ GẠO</h2><p>Nhóm phục dựng đúng bối cảnh: cối gỗ, chày tay, đuốc lồ ô. Phát hiện thú vị: nhịp chày có nhịp nhanh-chậm xen kẽ để nhiều người thay phiên suốt đêm không kiệt sức.</p>', '<h2>PHẦN 2: BA THẾ HỆ, MỘT KÝ ỨC</h2><p>Phỏng vấn bà (từng giã gạo thời chiến), mẹ (nghe kể lại) và cháu (học qua bài hát). Phóng sự khép lại bằng cảnh ba thế hệ cùng hát "Tiếng chày trên sóc Bom Bo" dưới ánh đuốc phục dựng.</p>']
  },
  {
    id: 'res-007',
    title: 'Trảng Cỏ Bù Lạch - Khảo Sát Hệ Sinh Thái Đồng Cỏ Hiếm Giữa Đại Ngàn',
    description: 'Đề tài nghiên cứu khoa học khảo sát thảm thực vật, hệ động vật và giá trị sinh thái độc đáo của trảng cỏ tự nhiên.',
    type: 'research', subject: 'Sinh học - Địa lý', grade: '12',
    school: 'THPT Chuyên Quang Trung', author: 'Nhóm học sinh 12 Sinh',
    coverImage: '/images/heritage/danh-thang/bu-lach-lg.webp',
    publishedAt: '2024-08-14', featured: false, downloadCount: 141, fileSize: '4.1 MB', difficulty: 3,
    fileUrl: '/tai-lieu/bien-hoa-dong-nai-hanh-trinh-phat-trien.pdf',
    motivation: 'Giữa vùng rừng nhiệt đới, một thảm cỏ tự nhiên rộng hàng trăm hecta tồn tại bất thường.',
    keyFindings: ['Ghi nhận 34 loài thực vật đặc trưng, trong đó 5 loài chưa được định danh.', 'Lý giải nguyên nhân hình thành trảng cỏ dựa trên thổ nhưỡng tầng đất mỏng.', 'Ghi hình bằng bẫy ảnh 6 loài động vật hoang dã.'],
    quizId: 'quiz-009',
    pages: ['<h2>CHƯƠNG I: MỘT ĐỒNG CỎ GIỮA RỪNG GIÀ</h2><p>Trảng cỏ Bù Lạch là quần thể đồng cỏ tự nhiên hiếm gặp giữa rừng nhiệt đới thường xanh Thành Phố Đồng Nai.</p><blockquote>"Đất ở đây mỏng, mùa mưa ngập, mùa khô nứt nẻ — cây to không sống nổi, chỉ có cỏ mới trụ được." — Cán bộ kiểm lâm.</blockquote>', '<h2>CHƯƠNG II: PHƯƠNG PHÁP KHẢO SÁT THỰC ĐỊA</h2><p>Nhóm tiến hành 4 đợt khảo sát theo bốn mùa, lập 12 ô tiêu chuẩn 10mx10m. Tầng đất mặt trung bình chỉ 15-20cm trước khi gặp lớp đá ong.</p>', '<h2>CHƯƠNG III: GIÁ TRỊ BẢO TỒN</h2><p>Đề xuất: khoanh vùng bảo vệ khu lõi, xây tuyến quan sát động vật kiểm soát, đưa nội dung khảo sát vào chương trình giáo dục địa phương.</p>']
  },
  {
    id: 'res-008',
    title: 'Giáo Án Trải Nghiệm: Thác Đứng - Đọc Câu Chuyện Địa Chất Qua Từng Bậc Đá',
    description: 'Tài liệu giáo án tổ chức tiết học trải nghiệm ngoài trời tại Thác Đứng, kết hợp địa lý, địa chất và kỹ năng quan sát.',
    type: 'document', subject: 'Giáo dục địa phương', grade: '9',
    school: 'THCS Nguyễn Trường Tộ', author: 'Tổ Địa Lý - Sinh Học',
    coverImage: '/images/heritage/danh-thang/thac-dung-lg.webp',
    publishedAt: '2024-09-05', featured: false, downloadCount: 176, fileSize: '2.2 MB', difficulty: 1,
    fileUrl: '/tai-lieu/can-cu-u1.pdf',
    motivation: 'Học sinh thường chỉ biết Thác Đứng như điểm chụp ảnh. Giáo án này giúp các em nhìn thấy hàng triệu năm địa chất ẩn sau từng bậc đá.',
    keyFindings: ['Thiết kế 3 trạm quan sát thực địa với phiếu học tập riêng.', 'Xây dựng bộ 10 câu hỏi dẫn dắt học sinh tự suy luận.', 'Tỉ lệ học sinh hứng thú đạt 92% trong lớp thí điểm.'],
    quizId: 'quiz-010',
    pages: ['<h2>PHẦN I: MỤC TIÊU BÀI HỌC</h2><p>Sau tiết học, học sinh mô tả được quá trình hình thành các bậc đá tại Thác Đứng do bào mòn chênh lệch.</p><blockquote>"Một buổi học ngoài trời đúng nghĩa là khi học sinh tự đặt câu hỏi trước khi giáo viên kịp giảng." — Tổ bộ môn.</blockquote>', '<h2>PHẦN II: TỔ CHỨC 3 TRẠM QUAN SÁT</h2><p><strong>Trạm 1 - Chân thác:</strong> Quan sát bậc đá, nhận diện độ cứng các lớp đá.<br/><strong>Trạm 2 - Dòng chảy:</strong> Đo tốc độ dòng chảy, thảo luận mối liên hệ với bào mòn.<br/><strong>Trạm 3 - Thảm thực vật:</strong> Nhận diện cây ưa ẩm, vai trò giữ đất.</p>', '<h2>PHẦN III: PHIẾU ĐÁNH GIÁ VÀ MỞ RỘNG</h2><p>Kết quả thí điểm: học sinh nhớ bài lâu hơn đáng kể. Đặc biệt khái niệm "bào mòn chênh lệch" — trước đó nhiều em cho là khó hình dung khi chỉ học qua sách giáo khoa.</p>']
  },
  {
    id: 'res-009',
    title: 'Biên Hòa — Đồng Nai: Hành Trình Phát Triển',
    description: 'Tài liệu lịch sử toàn diện về hành trình khai phá, xây dựng và phát triển của vùng đất Biên Hòa — Đồng Nai hơn 325 năm lịch sử hào hùng.',
    type: 'document', subject: 'Lịch sử địa phương', grade: 'Tài liệu gốc',
    school: 'Sở VHTTDL Đồng Nai', author: 'Ban Biên soạn Lịch sử Đồng Nai',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-01-01', featured: false, downloadCount: 428, fileSize: '248 KB',
    fileUrl: '/tai-lieu/bien-hoa-dong-nai-hanh-trinh-phat-trien.pdf',
    motivation: 'Tài liệu nguồn chính thống ghi lại các mốc son lịch sử, địa giới hành chính và các bước chuyển mình của Biên Hòa — Đồng Nai.',
    keyFindings: ['Hành trình khai hoang mở cõi từ năm 1698 khi Lễ Thành hầu Nguyễn Hữu Cảnh lập phủ Gia Định.', 'Sự hình thành và phát triển của vùng đất Trấn Biên — Biên Hòa xưa.', 'Tài liệu gốc chuẩn định dạng PDF, hỗ trợ học sinh và giáo viên tải về tham khảo dạy học.'],
    pages: ['<h2>I. VÙNG ĐẤT BIÊN HÒA — ĐỒNG NAI</h2><p>Vùng đất Biên Hòa — Đồng Nai có bề dày lịch sử hơn 325 năm hình thành và phát triển, là một trong những cái nôi văn hóa sớm nhất của Nam Bộ.</p>', '<h2>II. CÁC MỐC SON LỊCH SỬ</h2><p>Năm 1698, Thống suất Nguyễn Hữu Cảnh vào kinh lý phương Nam, lập phủ Gia Định, chính thức đưa vùng đất Đồng Nai vào bản đồ quốc gia Đại Việt.</p>', '<h2>III. ĐỊNH HƯỚNG BẢO TỒN</h2><p>Tài liệu cung cấp nền tảng tư liệu quý báu phục vụ công tác giáo dục truyền thống lịch sử địa phương.</p>']
  },
  {
    id: 'res-010',
    title: 'Căn Cứ U1 — Vang Bóng Một Thời',
    description: 'Tài liệu lịch sử về Căn cứ U1 — một trong những căn cứ bí mật mang ý nghĩa sống còn của Thị ủy Biên Hòa trong thời kỳ kháng chiến chống Mỹ.',
    type: 'document', subject: 'Lịch sử cách mạng', grade: 'Tài liệu gốc',
    school: 'Khu Di Tích Căn Cứ U1', author: 'Ban Quản lý Di tích Lịch sử U1',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-01-01', featured: false, downloadCount: 365, fileSize: '902 KB',
    fileUrl: '/tai-lieu/can-cu-u1.pdf',
    motivation: 'Hồ sơ lịch sử về Căn cứ U1 — nơi ghi dấu sự lãnh đạo kiên cường, mưu trí của các lực lượng vũ trang cách mạng ngay sát nách địch.',
    keyFindings: ['Vị trí chiến lược hiểm yếu và cấu trúc hầm hào ngầm của Căn cứ U1.', 'Phương châm bám đất, bám dân và các trận đánh xuất quỷ nhập thần của lực lượng biệt động.', 'Tài liệu chuẩn xác đã được số hóa sang file PDF để nghiên cứu và tải về phục vụ học tập.'],
    pages: ['<h2>I. BỐI CẢNH RA ĐỜI CĂN CỨ U1</h2><p>Căn cứ U1 được thành lập vào tháng 9-1965 tại khu rừng ngập mặn và rừng chồi ven sông Đồng Nai, là cơ quan đầu não của Thị ủy Biên Hòa.</p>', '<h2>II. HOẠT ĐỘNG KHÁNG CHIẾN</h2><p>Từ căn cứ U1, nhiều trận tập kích tiêu hao sinh lực địch tại Sân bay Biên Hòa, Tổng kho Long Bình đã được chỉ đạo thành công.</p>', '<h2>III. GIÁ TRỊ LỊCH SỬ HÔM NAY</h2><p>Khu di tích U1 nay là địa chỉ đỏ giáo dục truyền thống yêu nước cho các thế hệ học sinh sinh viên.</p>']
  },
  {
    id: 'res-011',
    title: 'Chiến Khu Đ — Căn Cứ Địa Kháng Chiến Hào Hùng',
    description: 'Tài liệu nghiên cứu chuyên sâu về Chiến Khu Đ — biểu tượng bất khuất, "lá chắn thép" của cách mạng miền Nam suốt hai cuộc kháng chiến.',
    type: 'document', subject: 'Lịch sử cách mạng', grade: 'Tài liệu gốc',
    school: 'Di tích Lịch sử Chiến Khu Đ', author: 'Hội Khoa học Lịch sử Đồng Nai',
    coverImage: '/images/heritage/lich-su/chien-khu-d-lg.webp',
    publishedAt: '2024-01-01', featured: false, downloadCount: 512, fileSize: '505 KB',
    fileUrl: '/tai-lieu/chien-khu-d.pdf',
    motivation: 'Hành trình hào hùng của Chiến Khu Đ — từ những ngày đầu kháng chiến gian khổ đến đại thắng mùa xuân 1975.',
    keyFindings: ['Quy mô, địa bàn bao bọc và vai trò chiến lược của Chiến khu Đ trên chiến trường miền Đông.', 'Mối quan hệ gắn bó máu thịt giữa bộ đội Cụ Hồ và đồng bào các dân tộc thiểu số địa phương.', 'Tư liệu PDF số hóa đầy đủ các sơ đồ tác chiến và tư liệu lịch sử quý giá.'],
    pages: ['<h2>I. VỊ TRÍ CHIẾN LƯỢC CHIẾN KHU Đ</h2><p>Chiến khu Đ ra đời từ đầu năm 1946, dựa lưng vào đại ngàn Trường Sơn và rừng già Đông Nam Bộ, nối liền với Nam Tây Nguyên và biên giới Campuchia.</p>', '<h2>II. "CHIẾN KHU Đ CÒN, SÀI GÒN MẤT"</h2><p>Khẩu hiệu khẳng định tầm quan trọng đặc biệt của căn cứ địa trong việc uy hiếp sào huyệt đầu não của địch tại Sài Gòn.</p>', '<h2>III. Ý NGHĨA GIÁO DỤC</h2><p>Tư liệu quý phục vụ nghiên cứu lịch sử địa phương và giáo dục truyền thống cho thế hệ trẻ.</p>']
  },
  {
    id: 'res-012',
    title: 'Căn Cứ Tà Thiết — Bộ Chỉ Huy Miền Lịch Sử',
    description: 'Hồ sơ tư liệu lịch sử toàn diện về Căn cứ Quân ủy và Bộ Chỉ huy Miền (Tà Thiết) — địa chỉ đỏ đặc biệt trong chiến dịch giải phóng Sài Gòn — Gia Định.',
    type: 'document', subject: 'Lịch sử cách mạng', grade: 'Tài liệu gốc',
    school: 'Di tích Quốc gia Đặc biệt Tà Thiết', author: 'Ban Quản lý Khu Di tích Lịch sử Tà Thiết',
    coverImage: '/images/heritage/img-disanbudang/Can-cu-Ta-Thiet.jpg',
    publishedAt: '2024-01-01', featured: false, downloadCount: 478, fileSize: '2.4 MB',
    fileUrl: '/tai-lieu/can-cu-ta-thiet.pdf',
    motivation: 'Căn cứ Tà Thiết — cơ quan đầu não chỉ huy Chiến dịch giải phóng miền Nam, thống nhất đất nước.',
    keyFindings: ['Lịch sử hình thành và quy mô kiến trúc bán ngầm độc đáo của Bộ Chỉ huy Miền.', 'Nơi diễn ra các hội nghị lịch sử thông qua kế hoạch tác chiến Chiến dịch Hồ Chí Minh lịch sử.', 'Tài liệu nghiên cứu nguyên bản có thể tải về trực tiếp phục vụ học tập, thi tìm hiểu lịch sử.'],
    pages: ['<h2>I. ĐẦU NÃO CÁCH MẠNG MIỀN NAM</h2><p>Căn cứ Tà Thiết (huyện Lộc Ninh) là căn cứ cuối cùng của Bộ Chỉ huy Miền, nơi tập trung các tướng lĩnh hàng đầu như Trần Văn Trà, Lê Đức Anh, Phạm Hùng...</p>', '<h2>II. CHIẾN DỊCH HỒ CHÍ MINH</h2><p>Từ căn cứ này, Bộ Tư lệnh Chiến dịch Hồ Chí Minh đã chỉ huy các cánh quân tiến vào giải phóng Sài Gòn, kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước.</p>', '<h2>III. DI TÍCH QUỐC GIA ĐẶC BIỆT</h2><p>Hiện nay căn cứ được phục dựng và bảo tồn nguyên trạng, đón hàng ngàn lượt học sinh, du khách về nguồn mỗi năm.</p>']
  },
  {
    id: 'res-013',
    title: 'Sóc Bom Bo Trong Dòng Chảy Lịch Sử Đồng Nai',
    description: 'Tài liệu lịch sử tái hiện sống động bản sắc, lòng yêu nước kiên trung và huyền thoại "đốt đuốc giã gạo nuôi quân" của đồng bào S\'tiêng Sóc Bom Bo.',
    type: 'document', subject: 'Lịch sử cách mạng', grade: 'Tài liệu gốc',
    school: 'Khu Bảo Tồn Văn Hóa Sóc Bom Bo', author: 'Ban Nghiên cứu Văn hóa — Lịch sử',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    publishedAt: '2024-01-01', featured: false, downloadCount: 689, fileSize: '900 KB',
    fileUrl: '/tai-lieu/soc-bom-bo-dong-nai.pdf',
    motivation: 'Sóc Bom Bo — biểu tượng sáng ngời của tinh thần đoàn kết quân dân và ý chí quật cường của đồng bào dân tộc thiểu số miền Đông Nam Bộ.',
    keyFindings: ['Bối cảnh lịch sử chiến dịch Đồng Xoài năm 1965 và kỳ tích giã gạo nuôi quân thâu đêm.', 'Ý nghĩa văn hóa tiếng chày giã gạo của người S\'tiêng đi vào thơ ca và âm nhạc bất hủ.', 'Hồ sơ tư liệu số hóa định dạng PDF cho phép tải về học tập và nghiên cứu văn hóa dân tộc.'],
    pages: ['<h2>I. ĐÊM BOM BO ĐỐT ĐUỐC LỒ Ô</h2><p>Trong chiến dịch Đồng Xoài năm 1965, già trẻ gái trai Sóc Bom Bo đã thức trắng đêm dưới ánh đuốc lồ ô giã hàng trăm tấn gạo nuôi bộ đội.</p>', '<h2>II. TIẾNG CHÀY ĐI VÀO LỊCH SỬ</h2><p>Nhạc sĩ Xuân Hồng đã sáng tác bài hát "Tiếng chày trên sóc Bom Bo" bất hủ, lan tỏa tinh thần kháng chiến quật cường ra cả nước.</p>', '<h2>III. BẢO TỒN VÀ PHÁT TRIỂN HÔM NAY</h2><p>Sóc Bom Bo nay là điểm du lịch văn hóa lịch sử tiêu biểu của Bù Đăng, thu hút du khách trong và ngoài nước.</p>']
  },
  {
    id: 'res-014',
    title: 'Đồng Nai Hôm Nay Và Khát Vọng Vươn Lên',
    description: 'Tài liệu tổng quan về thành tựu kinh tế — xã hội, diện mạo đô thị công nghiệp sinh thái và tầm nhìn phát triển bứt phá của Thành phố Đồng Nai.',
    type: 'document', subject: 'Kinh tế — Phát triển', grade: 'Tài liệu gốc',
    school: 'UBND Thành Phố Đồng Nai', author: 'Ban Tài liệu Di sản & Quy hoạch',
    coverImage: '/images/heritage/danh-thang/bu-lach-lg.webp',
    publishedAt: '2024-01-01', featured: false, downloadCount: 382, fileSize: '531 KB',
    fileUrl: '/tai-lieu/dong-nai-hom-nay-khat-vong-vuon-len.pdf',
    motivation: 'Khát vọng vươn tầm của Đồng Nai — từ mảnh đất bom cày đạn xới thành trung tâm kinh tế công nghiệp, cảng hàng không quốc tế năng động hàng đầu.',
    keyFindings: ['Các mốc chuyển mình ngoạn mục của kinh tế và hạ tầng giao thông kết nối liên vùng.', 'Chiến lược phát triển bền vững kết hợp công nghệ cao với bảo tồn rừng tự nhiên và di sản.', 'Tài liệu chính thống có thể tải về nghiên cứu địa lý kinh tế địa phương.'],
    pages: ['<h2>I. DIỆN MẠO MỚI CỦA ĐỒNG NAI</h2><p>Từ một vùng đất chịu nhiều đau thương chiến tranh, Đồng Nai đã vươn lên thành trung tâm kinh tế năng động bậc nhất khu vực Đông Nam Bộ.</p>', '<h2>II. HẠ TẦNG KẾT NỐI & TƯƠNG LAI</h2><p>Với các đại dự án hạ tầng như Sân bay Quốc tế Long Thành và mạng lưới cao tốc, Đồng Nai mở ra không gian phát triển đột phá.</p>', '<h2>III. PHÁT TRIỂN GẮN LIỀN VỚI BẢO TỒN</h2><p>Tăng trưởng kinh tế song hành cùng bảo vệ môi trường sinh thái rừng đại ngàn và phát huy di sản văn hóa truyền thống.</p>']
  },
  {
    id: 'res-015',
    title: 'Đồng Nai — Những Năm Tháng Kháng Chiến',
    description: 'Biên niên sử hào hùng ghi lại những trang sử chiến đấu kiên trung, bất khuất của Đảng bộ, quân và dân Đồng Nai qua hai cuộc kháng chiến vệ quốc.',
    type: 'document', subject: 'Lịch sử cách mạng', grade: 'Tài liệu gốc',
    school: 'Bảo Tàng Tỉnh Đồng Nai', author: 'Ban Tuyên giáo — Ban Biên soạn Lịch sử Đảng',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2024-01-01', featured: false, downloadCount: 590, fileSize: '736 KB',
    fileUrl: '/tai-lieu/dong-nai-nhung-nam-thang-khang-chien.pdf',
    motivation: 'Biên niên lịch sử tri ân hàng vạn anh hùng liệt sĩ, đồng bào đã hy sinh xương máu cho nền độc lập tự do của Tổ quốc trên mảnh đất miền Đông.',
    keyFindings: ['Hệ thống hóa các trận đánh tiêu biểu: chiến dịch Đồng Xoài, tiến công sân bay Biên Hòa, tổng kho Long Bình.', 'Sưu tầm và đúc kết những bài học lịch sử vô giá về thế trận lòng dân và nghệ thuật quân sự độc đáo.', 'Bản PDF hoàn chỉnh chất lượng cao sẵn sàng tải về nghiên cứu và giảng dạy.'],
    pages: ['<h2>I. NHỮNG NĂM THÁNG GIAN KHỔ HÀO HÙNG</h2><p>Suốt 30 năm chiến tranh giải phóng, đất và người Đồng Nai đã vượt qua muôn vàn gian khổ, đạn bom khốc liệt, kiên cường giữ vững trận địa.</p>', '<h2>II. NHỮNG CHIẾN CÔNG VANG DỘI</h2><p>Những địa danh như Chiến khu Đ, căn cứ Rừng Sác, Tà Thiết, Bom Bo đã đi vào lịch sử quân sự Việt Nam như những mốc son chói lọi.</p>', '<h2>III. LỜI NHẮC NHỞ CHO MAI SAU</h2><p>Lịch sử là hành trang quý báu để thế hệ hôm nay và mai sau trân trọng hòa bình, nỗ lực học tập và cống hiến cho quê hương.</p>']
  },
  {
    id: 'res-016',
    title: 'Bản Thuyết Minh Đề Tài Toàn Quốc: Bảo Tàng Số Di Sản Bù Đăng',
    description: 'Hồ sơ thuyết minh chính thức mô hình sản phẩm "Bảo tàng số Di sản Bù Đăng và các địa phương thuộc TP. Đồng Nai" tham dự Cuộc thi Sáng tạo Thanh thiếu niên Nhi đồng Toàn quốc lần thứ 22 (2026).',
    type: 'document', subject: 'Hồ sơ thuyết minh dự án', grade: 'Lớp 12',
    school: 'THPT Lê Quý Đôn', author: 'Nguyễn Xuân Kiệt (12A1)',
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    publishedAt: '2026-09-02', featured: true, downloadCount: 852, fileSize: '5.2 MB', difficulty: 1,
    fileUrl: '/tai-lieu/thuyet-minh-thi-toan-quoc.docx',
    motivation: 'Mô hình website bảo tàng số toàn diện hỗ trợ học tập lịch sử địa phương, tích hợp bản đồ GIS, hiện vật 3D WebAR, âm thanh Soundscape, AI Trợ lý và hệ thống Quiz đánh giá năng lực học sinh.',
    keyFindings: ['Số hóa 16 điểm di tích lịch sử, văn hóa phi vật thể và danh thắng thiên nhiên Bù Đăng — Đồng Nai.', 'Ứng dụng công nghệ WebAR không cần cài app, Audio Guide và Trợ lý AI hỏi đáp lịch sử tương tác.', 'Cổng học tập trực tuyến mở: 160 câu hỏi trắc nghiệm, Flashcard 3D thuật ngữ dân tộc và kho tài liệu số tải về miễn phí.'],
    pages: ['<h2>1. TÍNH CẤP THIẾT CỦA ĐỀ TÀI</h2><p>Bù Đăng là vùng đất giàu truyền thống cách mạng và đậm đà bản sắc văn hóa các dân tộc S\'tiêng, M\'nông. Việc số hóa di sản giúp học sinh và người dân tiếp cận tư liệu lịch sử một cách trực quan, sinh động.</p>', '<h2>2. GIẢI PHÁP CÔNG NGHỆ VÀ TÍNH MỚI</h2><p>Website tích hợp bản đồ số GIS, mô hình 3D WebAR, audio thuyết minh song ngữ, phòng thí nghiệm số Lab và hệ thống gamification học tập tích điểm cấp bậc.</p>', '<h2>3. KHẢ NĂNG ỨNG DỤNG THỰC TIỄN</h2><p>Tài liệu và hệ thống phục vụ trực tiếp công tác giảng dạy Giáo dục địa phương và quảng bá du lịch số cho Thành phố Đồng Nai.</p>']
  },
]

// ──────────────────────────────────────────────
// GLOSSARY DATA
// ──────────────────────────────────────────────
export const glossaryData: GlossaryTerm[] = [
  // TÂM LINH
  { term: 'Yang Ching', pronunciation: '/Giàng Chinh/', definition: "Linh hồn thần linh ngự trị trong cồng chiêng theo tâm linh S'tiêng. Cồng chiêng là vật thiêng kết nối đất trời.", category: 'Tâm Linh', isFlipped: false },
  { term: 'Yang Bri', pronunciation: '/Giàng Bri/', definition: 'Thần Rừng vĩ đại, vị thần bảo vệ buôn làng khỏi thiên tai và thú dữ. Luật tục kiêng kỵ phá rừng bắt nguồn từ sự tôn kính này.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Yang Sri', pronunciation: '/Giàng Xri/', definition: 'Nữ thần Lúa cai quản mùa màng, ban phát sự no ấm, sung túc cho buôn làng sau mỗi mùa gặt hái.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Cột Blăng', pronunciation: '/Cột Blăng/', definition: 'Cây nêu thiêng làm từ tre gỗ được điêu khắc hoa văn tỉ mỉ dựng giữa sân lễ hội — chiếc cầu nối mời các vị Yang về ngự.', category: 'Tâm Linh', isFlipped: false },
  { term: 'Bơnom Brah', pronunciation: "/Bơ-nôm B'rah/", definition: "Tên gọi cổ xưa của Núi Bà Rá trong tiếng S'tiêng, có nghĩa là \"Núi Thần\" — ngọn núi linh thiêng của các vị thần che chở.", category: 'Tâm Linh', isFlipped: false },
  { term: 'Hơmon', pronunciation: '/Hơ-mon/', definition: 'Hình thức hát kể sử thi truyền miệng dân gian của đồng bào bản địa được nghệ nhân già xướng lên bên bếp lửa nhà dài suốt đêm.', category: 'Tâm Linh', isFlipped: false },
  // ẨM THỰC
  { term: "Đ'rắp S'lung", pronunciation: '/Đơ-rắp Sơ-lung/', definition: 'Rượu cần truyền thống lên men từ gạo rẫy hoặc ngô hạt cùng các loại men lá rừng thảo mộc tự nhiên thơm nồng.', category: 'Ẩm Thực', isFlipped: false },
  { term: 'Canh Thục', pronunciation: '/Canh Thục/', definition: "Món canh truyền thống của người S'tiêng nấu trong ống nứa tươi gồm đọt mây, lá nhíp, cá suối, ớt hiểm và thụt nhuyễn.", category: 'Ẩm Thực', isFlipped: false },
  { term: 'Cơm Lam', pronunciation: '/Cơm Lam/', definition: 'Gạo nếp nương thơm dẻo lèn chặt trong ống nứa non, nút lá chuối rồi nướng giòn trên bếp than hồng đỏ rực.', category: 'Ẩm Thực', isFlipped: false },
  { term: 'Lá Nhíp', pronunciation: '/Lá Nhíp/', definition: 'Loại rau rừng bản địa giàu đạm và khoáng chất, vị ngọt bùi tự nhiên thường dùng nấu canh thục hoặc xào thịt.', category: 'Ẩm Thực', isFlipped: false },
  { term: 'Đọt Mây Nướng', pronunciation: '/Đọt Mây/', definition: 'Phần non của cây mây rừng nướng than hồng, có vị đắng dịu ban đầu nhưng đọng lại hậu vị ngọt thanh sâu lắng.', category: 'Ẩm Thực', isFlipped: false },
  { term: 'Thịt Gác Bếp', pronunciation: '/Thịt Khô/', definition: 'Thịt tươi ướp muối ớt và gia vị rừng rồi treo trên giàn bếp lửa nhà sàn để khói củi làm khô và bảo quản lâu dài.', category: 'Ẩm Thực', isFlipped: false },
  // ĐỊA DANH
  { term: 'Dak Mơ', pronunciation: '/Đác Mơ/', definition: "Trong ngôn ngữ S'tiêng nghĩa là \"nguồn nước của ước mơ và sự sống\", cội nguồn tên gọi danh thắng Thác Mơ.", category: 'Địa Danh', isFlipped: false },
  { term: 'Sóc Bom Bo', pronunciation: '/Sóc Bom Bo/', definition: 'Địa danh lịch sử hào hùng tại huyện Bù Đăng gắn liền với huyền thoại đồng bào S\'tiêng đốt đuốc giã gạo thâu đêm nuôi quân 1965.', category: 'Địa Danh', isFlipped: false },
  { term: 'Trảng Cỏ Bù Lạch', pronunciation: '/Bù Lạch/', definition: 'Thảo nguyên trảng cỏ tự nhiên rộng hơn 140 ha gồm hơn 20 trảng cỏ ôm trọn lòng hồ nước ngọt giữa rừng già nguyên sinh Bù Đăng.', category: 'Địa Danh', isFlipped: false },
  { term: 'Suối Đăk Wuar', pronunciation: '/Đác Gua/', definition: 'Dòng suối tự nhiên trong mát chảy qua các tầng đá bazan cột lục giác tạo nên vẻ đẹp kỳ vĩ của Thác Đứng xã Đoàn Kết.', category: 'Địa Danh', isFlipped: false },
  { term: 'Căn Cứ Nửa Lon', pronunciation: '/Nửa Lon/', definition: 'Di tích lịch sử cách mạng nơi cán bộ, chiến sĩ và nhân dân chia nhau nửa lon gạo mỗi ngày giữ vững hành lang chiến lược Bắc — Nam.', category: 'Địa Danh', isFlipped: false },
  { term: 'Căn Cứ Tà Thiết', pronunciation: '/Tà Thiết/', definition: '"Rừng Chính phủ" — Căn cứ quốc gia đặc biệt tại Lộc Ninh, cơ quan đầu não của Bộ Chỉ huy Miền chỉ đạo Chiến dịch Hồ Chí Minh 1975.', category: 'Địa Danh', isFlipped: false },
  // VẬT DỤNG
  { term: 'Ching', pronunciation: '/Chinh/', definition: "Tên gọi chiêng bằng đồng không núm trong dàn cồng chiêng nghi lễ của người S'tiêng, sắp xếp từ chiêng mẹ đến chiêng con.", category: 'Vật Dụng', isFlipped: false },
  { term: 'Kơ-gơr', pronunciation: '/Kơ-gơr/', definition: 'Trống bịt da bò hoặc da trâu truyền thống gõ đệm tạo nhịp điệu dồn dập, hào hùng cho dàn cồng chiêng trong lễ hội.', category: 'Vật Dụng', isFlipped: false },
  { term: 'Bro', pronunciation: '/Brô/', definition: 'Đàn tre truyền thống làm từ ống tre khô mắc dây gảy phát ra âm thanh mộc mạc, tha thiết tâm tình của chàng trai bản địa.', category: 'Vật Dụng', isFlipped: false },
  { term: 'Đinh Tăk Ta', pronunciation: '/Đinh Tắc Ta/', definition: 'Khèn bè nhạc cụ truyền thống làm từ quả bầu khô gắn các ống nứa nhỏ thổi ra âm sắc trầm bổng của núi rừng.', category: 'Vật Dụng', isFlipped: false },
  { term: 'Sơk Pơng', pronunciation: '/Xơ-c Pơng/', definition: 'Họa tiết hoa văn hình thoi chéo hoặc quả trám dệt trên thổ cẩm S\'tiêng, biểu trưng cho hạt thóc no ấm và mùa màng bội thu.', category: 'Vật Dụng', isFlipped: false },
  { term: 'Gùi Tải Đạn', pronunciation: '/Gùi/', definition: 'Chiếc gùi đan bằng mây tre rừng dẻo dai từng theo chân đồng bào dân tộc vượt dốc băng rừng tiếp tế hàng nghìn tấn lương thực thời chiến.', category: 'Vật Dụng', isFlipped: false }
]

// ──────────────────────────────────────────────
// MEDIA DATA
// ──────────────────────────────────────────────
export const imageStoriesData: ImageStory[] = [
  { title: 'Thác Mơ Bù Đăng Hùng Vĩ', tag: 'Thiên Nhiên', image: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png', story: "Ngọn thác biểu tượng nằm nép mình giữa rừng già nguyên sinh Bù Đăng. Dòng nước trắng xóa như dải lụa đổ từ trên cao, tạo nên cảnh sắc huyền ảo thơ mộng và gắn liền với thần thoại cội nguồn Dak Mơ xa xưa của người S'tiêng bản địa." },
  { title: 'Trảng Cỏ Bù Lạch Xanh Mướt', tag: 'Thiên Nhiên', image: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png', story: 'Tuyệt tác thiên nhiên hoang sơ rộng gần 140 hecta bao bọc lấy một lòng hồ nước ngọt trong mát quanh năm. Trảng cỏ là không gian sinh hoạt lễ hội cộng đồng độc đáo và là bài học thực địa địa lý sinh động nhất.' },
  { title: 'Cồng Chiêng & Vũ Điệu Xoang', tag: 'Văn Hóa', image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp', story: "Âm thanh cồng chiêng ngân vang kết nối buôn làng, là linh hồn sinh hoạt tâm linh và nghệ thuật biểu diễn của đồng bào S'tiêng Bù Đăng — chung cội nguồn với Cồng chiêng Tây Nguyên (UNESCO 2005)." }
]

export interface StudyVideo {
  title: string
  cat: string
  duration: string
  thumb: string
  videoUrl: string
  description?: string
}

export const featuredVideoData: StudyVideo = {
  title: 'Thác Mơ — Huyền Thoại Dak Mơ & Di Sản Bù Đăng',
  cat: 'Phim Tư Liệu',
  duration: '5:30',
  thumb: '/images/heritage/danh-thang/thac-dung-lg.webp',
  videoUrl: '/video/virtual-tour/trang-co/trang-co-trailer.mp4',
  description: 'Thước phim tư liệu ghi lại vẻ đẹp nguyên sơ của Thác Mơ, sông Đắk R’măng và hệ sinh thái rừng già Bù Đăng — Thành Phố Đồng Nai.'
}

export const mockVideos: StudyVideo[] = [
  {
    title: 'Flycam Trảng Cỏ Bù Lạch Mùa Khô',
    cat: 'Thiên nhiên',
    duration: '3:22',
    thumb: '/images/heritage/danh-thang/bu-lach-lg.webp',
    videoUrl: '/video/virtual-tour/trang-co/trang-co-trailer.mp4',
    description: 'Khung cảnh toàn cảnh trên cao của thung lũng Trảng Cỏ Bù Lạch rộng hơn 140 ha ôm trọn lòng hồ nước ngọt trong veo giữa rừng nhiệt đới.'
  },
  {
    title: 'Khu Bảo Tồn & Nhịp Chày Sóc Bom Bo',
    cat: 'Văn hóa',
    duration: '4:15',
    thumb: '/images/heritage/img-disanbudang/Mung-Lua-Moi.png',
    videoUrl: '/video/virtual-tour/bom-bo/bom-bo-trailer.mp4',
    description: 'Thước phim ghi lại di tích lịch sử Sóc Bom Bo, nhà dài truyền thống, cối chày giã gạo thời kháng chiến và không gian lễ hội cồng chiêng.'
  },
  {
    title: 'Ký Ức Rừng Già & Chiến Khu Đ Huyền Thoại',
    cat: 'Lịch sử',
    duration: '5:10',
    thumb: '/images/heritage/lich-su/chien-khu-d-md.webp',
    videoUrl: '/video/virtual-tour/bom-bo/bom-bo-trailer.mp4',
    description: 'Phim tư liệu điền dã tái hiện căn cứ địa kháng chiến trong đại ngàn Bù Đăng, nơi từng che chở các lực lượng cách mạng miền Đông Nam Bộ.'
  },
  {
    title: 'Nghệ Thuật Cồng Chiêng & Vũ Điệu Xoang',
    cat: 'Phi vật thể',
    duration: '6:10',
    thumb: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    videoUrl: '/video/virtual-tour/trang-co/trang-co-trailer.mp4',
    description: 'Hòa âm cồng chiêng ngân vang bên bếp lửa nhà dài và điệu múa xoang truyền thống của đồng bào S\'tiêng Bù Đăng.'
  }
]

export const mockAudios = [
  { title: 'Tiếng cồng chiêng sóc Bom Bo cổ', cat: 'Âm nhạc bản địa', duration: '3:45', icon: 'mdi:music-note', url: '/audio/khu-bao-ton-soc-bom-bo.mp3' },
  { title: "Phiên âm dạy nói tiếng S'tiêng cơ bản", cat: 'Ngôn ngữ học', duration: '5:20', icon: 'mdi:microphone', url: '/audio/trang-co-bu-lach.mp3' },
  { title: 'Truyền thuyết nguồn nước thần kỳ Dak Mơ', cat: 'Podcast truyện kể', duration: '7:15', icon: 'mdi:headphones', url: '/audio/trang-co-bu-lach.mp3' }
]

