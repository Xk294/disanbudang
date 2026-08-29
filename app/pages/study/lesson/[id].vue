<template>
  <div class="min-h-screen bg-charcoal-900 text-ivory">
    <!-- 404 state -->
    <div v-if="!lesson" class="container-heritage py-24 text-center space-y-4">
      <Icon name="mdi:book-off-outline" class="w-14 h-14 text-charcoal-400 mx-auto" />
      <h1 class="text-2xl font-heading font-bold text-ivory">Không tìm thấy bài học</h1>
      <p class="text-charcoal-400 text-sm">Bài học này chưa tồn tại hoặc đã được di chuyển.</p>
      <NuxtLink to="/study" class="btn-primary text-sm mt-4">Quay về Góc Học Tập</NuxtLink>
    </div>

    <template v-else>
      <!-- Header hero -->
      <div class="bg-dark-earth border-b border-charcoal-850 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
          <div v-if="lesson.coreKnowledge.images?.[0]" class="absolute inset-0">
            <NuxtImg :src="lesson.coreKnowledge.images[0].url" alt="" class="w-full h-full object-cover opacity-10" />
            <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 to-charcoal-950/60" />
          </div>
        </div>
        <div class="container-heritage relative z-10 py-10">
          <div class="flex flex-col lg:flex-row lg:items-end gap-6">
            <div class="flex-1 space-y-3">
              <div class="flex flex-wrap gap-2">
                <span class="tag-gold text-3xs">{{ lesson.subject }}</span>
                <span class="tag-earth text-3xs flex items-center gap-1">
                  <Icon name="mdi:clock-outline" class="w-3 h-3" />
                  ~{{ lesson.estimatedMinutes ?? 10 }} phút
                </span>
                <span class="tag text-3xs bg-charcoal-800/60 text-charcoal-400 border border-charcoal-700 flex items-center gap-1">
                  <Icon name="mdi:star-outline" class="w-3 h-3 text-gold-400" />
                  +{{ lesson.xpReward }} XP
                </span>
              </div>
              <h1 class="font-heading font-bold text-2xl md:text-3xl text-ivory leading-snug">
                {{ lesson.title }}
              </h1>
            </div>

            <!-- Progress tracker & XP -->
            <div class="lg:shrink-0 flex items-center gap-4">
              <div class="flex items-center gap-2 bg-charcoal-900/70 border border-charcoal-800 rounded-xl px-4 py-2.5">
                <div class="space-y-1">
                  <p class="text-3xs text-charcoal-500 uppercase tracking-wider">Tiến trình đọc</p>
                  <div class="w-32 h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gold-500 rounded-full transition-all duration-500" :style="{ width: readProgress + '%' }" />
                  </div>
                </div>
                <span class="text-sm font-bold text-gold-400 tabular-nums">{{ readProgress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main 2-col layout -->
      <div class="container-heritage py-10">
        <div class="flex flex-col lg:flex-row gap-10">
          <!-- LEFT: TOC sticky sidebar -->
          <aside class="lg:w-56 shrink-0">
            <div class="lg:sticky lg:top-24 space-y-2">
              <p class="text-3xs font-bold uppercase tracking-widest text-charcoal-400 mb-3">Nội dung bài học</p>
              <nav class="space-y-1" aria-label="Mục lục bài học">
                <a
                  v-for="section in toc"
                  :key="section.id"
                  :href="'#' + section.id"
                  class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 group"
                  :class="section.available
                    ? 'text-charcoal-400 hover:text-ivory hover:bg-charcoal-900'
                    : 'text-charcoal-400 cursor-default'"
                >
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="section.available ? 'bg-gold-500/50' : 'bg-charcoal-800'" />
                  {{ section.label }}
                  <Icon v-if="!section.available" name="mdi:lock-outline" class="w-3 h-3 ml-auto text-charcoal-400" />
                </a>
              </nav>

              <!-- Back button -->
              <div class="pt-4 border-t border-charcoal-850">
                <NuxtLink to="/study" class="flex items-center gap-2 text-xs text-charcoal-500 hover:text-gold-400 transition-colors">
                  <Icon name="mdi:arrow-left" class="w-4 h-4" />
                  Về Góc Học Tập
                </NuxtLink>
              </div>
            </div>
          </aside>

          <!-- RIGHT: Lesson content -->
          <main class="flex-1 min-w-0" ref="mainRef">
            <LessonBlock :lesson="lesson" />
          </main>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LessonData } from '~/components/study/LessonBlock.vue'
import { useStudySeo } from '~/composables/useMuseumSeo'

const route = useRoute()
const id = computed(() => route.params.id as string)

// ================================================================
// SAMPLE LESSON DATA — 2 bài mẫu đầy đủ (Content Light demo)
// ================================================================
const lessons: Record<string, LessonData> = {
  'chien-khu-d': {
    id: 'chien-khu-d',
    title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng Huyền Thoại',
    subject: 'Lịch sử địa phương',
    xpReward: 80,
    estimatedMinutes: 12,
    tldr: 'Chiến Khu Đ là hệ thống căn cứ địa cách mạng nằm sâu trong rừng nguyên sinh Thành Phố Đồng Nai, đóng vai trò quan trọng trong cuộc kháng chiến chống Pháp và Mỹ (1945-1975). Đồng bào S\'tiêng cùng bộ đội chủ lực đã kiên cường giữ vững vùng đất này qua nhiều trận càn quét.',
    coreKnowledge: {
      text: `<p>Chiến Khu Đ (hay còn gọi là <strong>Khu chiến Đ</strong>) là hệ thống căn cứ địa cách mạng nằm trải dài trên vùng rừng già Đông Nam Bộ, chủ yếu thuộc địa phận <em>vùng đất Bù Đăng</em>.</p>
      <p>Với địa hình đồi núi trùng điệp, tán rừng già che phủ và hệ thống sông suối tự nhiên, Chiến Khu Đ trở thành "tấm khiên vô hình" bảo vệ lực lượng cách mạng trong suốt 30 năm kháng chiến.</p>
      <blockquote>"Mất Chiến Khu Đ là mất miền Đông Nam Bộ." — Câu nói của các nhà quân sự trong giai đoạn kháng chiến.</blockquote>
      <h3>Ý nghĩa chiến lược</h3>
      <ul>
        <li>Là nơi <strong>che chở và nuôi dưỡng</strong> hàng nghìn cán bộ cốt cán của Đảng và quân đội</li>
        <li>Điều phối toàn bộ hoạt động <strong>tiếp vận lương thực</strong> từ đồng bào S'tiêng cho bộ đội</li>
        <li>Là căn cứ xuất phát của nhiều <strong>chiến dịch quân sự lớn</strong> tại miền Đông Nam Bộ</li>
      </ul>`,
      images: [
        { url: '/images/heritage/lich-su/chien-khu-d-md.webp', caption: 'Rừng già nguyên sinh Bù Đăng — nơi ẩn mình của Chiến Khu Đ huyền thoại' },
        { url: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp', caption: 'Địa hình đồi núi trùng điệp tạo nên lá chắn tự nhiên vững chãi cho căn cứ địa' },
      ],
    },
    timeline: [
      { date: '1945', event: 'Thành lập căn cứ địa kháng chiến Chiến Khu Đ đầu tiên', detail: 'Ngay sau Cách mạng Tháng Tám, các chiến sĩ đã xây dựng hệ thống căn cứ trong rừng già Bù Đăng.' },
      { date: '1950–1954', event: 'Đỉnh cao kháng chiến chống Pháp', detail: 'Chiến Khu Đ trở thành trung tâm chỉ huy của toàn bộ lực lượng kháng chiến miền Đông Nam Bộ.' },
      { date: '1960–1968', event: 'Mở rộng và củng cố trong kháng chiến chống Mỹ', detail: 'Đồng bào S\'tiêng và M\'nông tích cực tham gia giã gạo nuôi quân, trinh sát dẫn đường.' },
      { date: '1975', event: 'Giải phóng hoàn toàn, Chiến Khu Đ hoàn thành sứ mệnh lịch sử', detail: 'Sau 30 năm kiên trì, Chiến Khu Đ đã góp phần quyết định vào thắng lợi của cuộc kháng chiến chống Mỹ.' },
      { date: 'Nay', event: 'Di tích lịch sử cấp quốc gia, trở thành điểm giáo dục truyền thống', detail: 'Chiến Khu Đ hiện là điểm tham quan lịch sử, giáo dục truyền thống cách mạng cho thế hệ trẻ Thành Phố Đồng Nai.' },
    ],
    hotspotImage: {
      url: '/images/heritage/lich-su/chien-khu-d-md.webp',
      alt: 'Bản đồ Chiến Khu Đ và các điểm di tích',
      hotspots: [
        { x: 30, y: 40, label: 'Sóc Bom Bo', desc: 'Địa điểm giã gạo nuôi quân nổi tiếng, được bất hủ hóa qua bài hát "Tiếng Chày Trên Sóc Bom Bo".' },
        { x: 60, y: 25, label: 'Trung tâm chỉ huy', desc: 'Nơi các tướng lĩnh cách mạng lên kế hoạch chiến đấu, ẩn sâu trong lòng rừng già.' },
        { x: 75, y: 65, label: 'Đường mòn tiếp tế', desc: 'Hệ thống đường mòn bí mật vận chuyển lương thực, vũ khí từ đồng bào dân tộc.' },
      ],
    },
    didYouKnow: [
      'Chiến Khu Đ có diện tích lên đến hàng trăm km², rộng lớn bậc nhất trong các khu căn cứ địa cách mạng.',
      'Đồng bào S\'tiêng đã giã gạo thâu đêm suốt sáng để nuôi bộ đội — hành động được bất hủ trong bài hát "Tiếng Chày Trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng.',
      'Địch đã thực hiện hơn 200 trận càn quét vào Chiến Khu Đ nhưng không lần nào thực sự tiêu diệt được căn cứ này.',
    ],
    glossary: [
      { term: 'Chiến Khu Đ', definition: 'Hệ thống căn cứ địa kháng chiến cách mạng tại Đông Nam Bộ, thuộc địa phận Bù Đăng và vùng lân cận.' },
      { term: 'Tiếp vận', definition: 'Hoạt động cung cấp lương thực, vũ khí, thuốc men cho lực lượng chiến đấu tại tiền tuyến.' },
      { term: 'Căn cứ địa', definition: 'Vùng an toàn, được bảo vệ chặt chẽ, làm nơi đứng chân của lực lượng kháng chiến.' },
    ],
    flashcards: [
      { front: 'Chiến Khu Đ tồn tại trong khoảng thời gian nào?', back: 'Từ năm 1945 đến 1975 — suốt 30 năm kháng chiến chống Pháp và chống Mỹ.' },
      { front: 'Đồng bào dân tộc nào đã đóng góp nhiều nhất cho Chiến Khu Đ?', back: 'Đồng bào S\'tiêng và M\'nông — đặc biệt qua hoạt động giã gạo nuôi quân ở Sóc Bom Bo.' },
      { front: 'Bài hát nào được lấy cảm hứng từ Chiến Khu Đ?', back: '"Tiếng Chày Trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng — ca ngợi tinh thần đồng bào giã gạo nuôi quân.' },
    ],
    openQuestions: [
      'Theo bạn, điều gì đã giúp Chiến Khu Đ tồn tại suốt 30 năm mà không bị tiêu diệt hoàn toàn?',
      'Nếu bạn là học sinh Bù Đăng thập niên 1960, bạn sẽ đóng góp cho kháng chiến bằng cách nào?',
      'Bài học nào từ Chiến Khu Đ còn có ý nghĩa cho thế hệ trẻ ngày nay?',
    ],
    quiz: [
      {
        question: 'Chiến Khu Đ đóng vai trò chính là gì trong kháng chiến?',
        options: ['Khu đô thị tản cư', 'Căn cứ địa chiến lược kháng chiến', 'Vùng trồng lúa cung cấp thực phẩm', 'Địa điểm du lịch sinh thái'],
        correct: 1,
        explanation: 'Chiến Khu Đ là hệ thống căn cứ địa chiến lược, nơi điều phối toàn bộ hoạt động kháng chiến miền Đông Nam Bộ.',
      },
      {
        question: 'Bài hát "Tiếng Chày Trên Sóc Bom Bo" do ai sáng tác?',
        options: ['Trịnh Công Sơn', 'Văn Cao', 'Xuân Hồng', 'Phạm Duy'],
        correct: 2,
        explanation: 'Nhạc sĩ Xuân Hồng đã sáng tác bài hát này dựa trên hình ảnh đồng bào S\'tiêng giã gạo nuôi quân trong đêm khuya.',
      },
      {
        question: 'Chiến Khu Đ được thành lập ngay sau sự kiện lịch sử nào?',
        options: ['Cách mạng Tháng Tám 1945', 'Hiệp định Genève 1954', 'Chiến dịch Điện Biên Phủ', 'Chiến dịch Hồ Chí Minh 1975'],
        correct: 0,
        explanation: 'Ngay sau Cách mạng Tháng Tám năm 1945, các chiến sĩ đã bắt đầu xây dựng hệ thống căn cứ Chiến Khu Đ trong rừng già Bù Đăng.',
      },
      {
        question: 'Theo tư liệu, Chiến Khu Đ đã trải qua khoảng bao nhiêu trận càn quét của địch mà không bị tiêu diệt?',
        options: ['Khoảng 50 trận', 'Khoảng 100 trận', 'Hơn 200 trận', 'Hơn 500 trận'],
        correct: 2,
        explanation: 'Địch đã thực hiện hơn 200 trận càn quét vào Chiến Khu Đ nhưng chưa lần nào tiêu diệt được căn cứ này.',
      },
      {
        question: '"Tiếp vận" trong bối cảnh Chiến Khu Đ có nghĩa là gì?',
        options: ['Xây dựng công sự phòng thủ', 'Cung cấp lương thực, vũ khí, thuốc men cho lực lượng chiến đấu', 'Huấn luyện tân binh mới', 'Liên lạc vô tuyến với hậu phương'],
        correct: 1,
        explanation: 'Tiếp vận là hoạt động cung cấp lương thực, vũ khí, thuốc men cho lực lượng chiến đấu tại tiền tuyến — vai trò then chốt của Chiến Khu Đ.',
      },
    ],
    essay: {
      prompt: 'Hãy mô tả ngắn gọn ý nghĩa lịch sử và văn hóa của Chiến Khu Đ đối với Xã Bù Đăng ngày nay (100–200 chữ).',
      hint: 'Hãy nghĩ đến: ý nghĩa với cộng đồng S\'tiêng, vai trò trong giáo dục truyền thống, và tiềm năng phát triển du lịch.',
    },
    relatedPlaces: [
      { name: 'Sóc Bom Bo', desc: 'Địa danh lịch sử gắn với bài hát "Tiếng Chày Trên Sóc Bom Bo"', poiId: 'site-1' },
      { name: 'Rừng nguyên sinh Bù Đăng', desc: 'Rừng già bao phủ và bảo vệ toàn bộ Chiến Khu Đ' },
    ],
    relatedEvents: [
      { name: 'Lễ hội tưởng niệm Chiến Khu Đ', year: 'Hàng năm', desc: 'Lễ hội kỷ niệm được tổ chức mỗi năm để tôn vinh các anh hùng liệt sĩ.' },
    ],
    relatedPeople: [
      { name: 'Điểu Đố', role: 'Cựu chiến binh, Đại đội 31B', desc: 'Người chứng kiến trực tiếp các trận phá càn và hoạt động giã gạo nuôi quân của đồng bào S\'tiêng.' },
    ],
    references: [
      { title: 'Lịch sử kháng chiến miền Đông Nam Bộ', source: 'Nhà xuất bản Quân đội Nhân dân, 2002' },
      { title: 'Di tích lịch sử Chiến Khu Đ', source: 'Bảo tàng Đồng Nai', url: 'https://baotangdongnai.vn' },
    ],
    nextSteps: [
      { title: 'Văn Hóa Cồng Chiêng S\'tiêng', lessonId: 'cong-chieng-stieng', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Đồng Nai', type: 'map' },
      { title: 'Làm bài kiểm tra lịch sử', type: 'quiz' },
    ],
  },

  'cong-chieng-stieng': {
    id: 'cong-chieng-stieng',
    title: 'Cồng Chiêng S\'tiêng — Tiếng Nói Của Đại Ngàn',
    subject: 'Văn hóa dân tộc',
    xpReward: 75,
    estimatedMinutes: 10,
    tldr: 'Cồng chiêng là di sản văn hóa phi vật thể quan trọng nhất của đồng bào S\'tiêng Bù Đăng. Mỗi chiếc chiêng đồng mang trong mình một vị thần linh (Yang Ching), và tiếng chiêng vang lên là cầu nối giữa con người với thần linh — chung cội nguồn với Cồng chiêng Tây Nguyên (UNESCO 2005).',
    coreKnowledge: {
      text: `<p>Cồng chiêng không chỉ là nhạc cụ — đó là <strong>tiếng nói tâm linh thiêng liêng</strong> của đồng bào dân tộc thiểu số S'tiêng tại Xã Bù Đăng. Theo tín ngưỡng truyền thống, mỗi chiếc chiêng đồng đều có vị thần <strong>Yang Ching</strong> ngự trị.</p>
      <p>Dàn nhạc cồng chiêng S'tiêng thường gồm từ <strong>6 đến 12 chiếc chiêng</strong> không núm (gọi là <em>Ching</em>), được phân tầng âm thanh chặt chẽ:</p>
      <ul>
        <li><strong>Ching Mẹ (Ching u):</strong> Chiêng lớn nhất, âm trầm ấm, giữ nhịp nền</li>
        <li><strong>Ching Cha &amp; Ching Con:</strong> Chiêng nhỏ hơn, đi giai điệu chính</li>
        <li><strong>Kơ-gơr:</strong> Trống da bò gõ đệm, tạo không khí hào hùng</li>
      </ul>
      <blockquote>"Tiếng chiêng là hơi thở của đại ngàn, còn vang tiếng chiêng là buôn sóc còn trường tồn." — Cựu binh Điểu Lên, Sóc Bom Bo</blockquote>`,
      images: [
        { url: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp', caption: 'Biểu diễn cồng chiêng truyền thống trong lễ hội mừng lúa mới của người S\'tiêng Bù Đăng' },
      ],
    },
    didYouKnow: [
      'Không gian văn hóa cồng chiêng Tây Nguyên (5 tỉnh Tây Nguyên) được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm 2005. Cồng chiêng S\'tiêng Bù Đăng chung mạch nguồn văn hóa này.',
      'Trong tín ngưỡng S\'tiêng, cồng chiêng là vật thiêng — không ai được tùy tiện đánh chiêng ngoài nghi lễ chính thức.',
      'Một bộ chiêng hoàn chỉnh của người S\'tiêng có thể trị giá cả trâu, bò, lợn — tài sản cả đời của một gia đình.',
    ],
    glossary: [
      { term: 'Yang Ching', definition: 'Linh hồn thần linh ngự trị trong cồng chiêng theo tín ngưỡng của người S\'tiêng. Chiêng là vật thiêng kết nối trời đất.' },
      { term: 'Ching', definition: 'Tên gọi chung của chiêng đồng không núm trong âm nhạc S\'tiêng, khác với chiêng có núm của một số dân tộc khác.' },
      { term: 'Xoang', definition: 'Điệu múa truyền thống của người S\'tiêng thường biểu diễn kết hợp với cồng chiêng trong các nghi lễ cộng đồng.' },
      { term: 'Kơ-gơr', definition: 'Trống da bò truyền thống, nhạc cụ gõ đệm cho dàn cồng chiêng, tạo nhịp điệu hùng hồn cho buổi trình diễn.' },
    ],
    flashcards: [
      { front: 'Yang Ching là gì?', back: 'Linh hồn thần linh ngự trị trong cồng chiêng theo tín ngưỡng S\'tiêng — mỗi chiếc chiêng có một vị thần riêng.' },
      { front: 'UNESCO công nhận không gian cồng chiêng Tây Nguyên vào năm nào?', back: 'Năm 2005 — công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại.' },
      { front: 'Ching Mẹ (Ching u) có vai trò gì?', back: 'Là chiêng lớn nhất, âm trầm ấm nhất, đóng vai trò giữ nhịp nền cho cả dàn nhạc.' },
    ],
    openQuestions: [
      'Tại sao người S\'tiêng lại coi cồng chiêng là "vật thiêng" chứ không chỉ là nhạc cụ?',
      'Làm thế nào để giới trẻ Bù Đăng ngày nay có thể tiếp tục gìn giữ nghệ thuật cồng chiêng?',
    ],
    quiz: [
      {
        question: 'Theo tín ngưỡng S\'tiêng, mỗi chiếc cồng chiêng có gì ở bên trong?',
        options: ['Tinh chất đồng quý hiếm', 'Vị thần linh Yang Ching', 'Bùa hộ mệnh của tổ tiên', 'Tro cốt của chiến binh'],
        correct: 1,
        explanation: 'Yang Ching là vị thần linh ngự trị trong mỗi chiếc chiêng đồng theo tín ngưỡng tâm linh của người S\'tiêng.',
      },
      {
        question: 'Điệu múa truyền thống thường kết hợp với cồng chiêng của người S\'tiêng là gì?',
        options: ['Múa trống Tây Nguyên', 'Điệu Xoang', 'Múa lân truyền thống', 'Vũ điệu lúa mới'],
        correct: 1,
        explanation: 'Điệu Xoang là vũ điệu truyền thống của người S\'tiêng, thường được biểu diễn quanh bếp lửa kết hợp với tiếng cồng chiêng.',
      },
      {
        question: 'Chiếc chiêng lớn nhất, âm trầm ấm nhất, giữ nhịp nền cho cả dàn nhạc được gọi là gì?',
        options: ['Ching Con', 'Ching Mẹ (Ching u)', 'Kơ-gơr', 'Ching Cha'],
        correct: 1,
        explanation: 'Ching Mẹ (Ching u) là chiêng lớn nhất trong dàn nhạc, đóng vai trò giữ nhịp nền trầm ấm cho toàn bộ dàn cồng chiêng.',
      },
      {
        question: 'Kơ-gơr là loại nhạc cụ gì trong dàn nhạc cồng chiêng S\'tiêng?',
        options: ['Sáo trúc thổi hơi', 'Trống da bò gõ đệm', 'Đàn dây kéo cung', 'Chiêng núm nhỏ nhất'],
        correct: 1,
        explanation: 'Kơ-gơr là trống da bò truyền thống, gõ đệm tạo nhịp điệu hùng hồn cho dàn cồng chiêng.',
      },
      {
        question: 'Theo quan niệm truyền thống S\'tiêng, một bộ cồng chiêng hoàn chỉnh có giá trị tương đương với gì?',
        options: ['Vài bao gạo dự trữ', 'Cả trâu, bò, lợn — tài sản cả đời của một gia đình', 'Một mảnh nương rẫy nhỏ', 'Không có giá trị vật chất cụ thể'],
        correct: 1,
        explanation: 'Một bộ chiêng hoàn chỉnh của người S\'tiêng có thể trị giá cả trâu, bò, lợn — tương đương tài sản tích lũy cả đời của một gia đình.',
      },
    ],
    relatedEvents: [
      { name: 'Lễ hội Mừng Lúa Mới', year: 'Tháng 10–12 âm lịch', desc: 'Lễ hội lớn nhất của người S\'tiêng, nơi cồng chiêng giữ vai trò trung tâm trong nghi lễ cúng thần.' },
    ],
    relatedPlaces: [
      { name: 'Sóc Bom Bo', desc: 'Địa điểm bảo tồn nghệ thuật cồng chiêng truyền thống', poiId: 'site-1' },
    ],
    references: [
      { title: 'Không gian văn hóa cồng chiêng Tây Nguyên', source: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org' },
      { title: 'Không gian văn hóa cồng chiêng Tây Nguyên tại Đồng Nai', source: 'Viện Âm nhạc Việt Nam, 2018' },
    ],
    nextSteps: [
      { title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng', lessonId: 'chien-khu-d', type: 'lesson' },
      { title: 'Tìm hiểu thổ cẩm S\'tiêng', type: 'resource' },
      { title: 'Khám phá bản đồ di sản', type: 'map' },
    ],
  },

  'soc-bom-bo': {
    id: 'soc-bom-bo',
    title: 'Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến',
    subject: 'Lịch sử cách mạng',
    xpReward: 90,
    estimatedMinutes: 15,
    tldr: 'Cuối năm 1965, đồng bào S\'tiêng Sóc Bom Bo đã đốt đuốc lồ ô giã gạo thâu đêm suốt sáng để nuôi bộ đội chủ lực phục vụ chiến dịch Phước Long – Đồng Xoài. Câu chuyện trở thành bài ca bất hủ "Tiếng Chày Trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng, và ngày nay được lưu giữ tại Khu bảo tồn văn hóa dân tộc S\'tiêng sóc Bom Bo, xã Bom Bo, Thành Phố Đồng Nai.',
    coreKnowledge: {
      text: `<p>Sóc Bom Bo là địa danh lịch sử gắn liền với một trong những câu chuyện cảm động nhất của cuộc kháng chiến chống Mỹ cứu nước tại miền Đông Nam Bộ. Vào cuối năm 1965, để phục vụ <strong>chiến dịch Phước Long – Đồng Xoài</strong>, bộ đội chủ lực cần một lượng lớn gạo hậu cần trong thời gian gấp rút.</p>
      <p>Không quản ngại hiểm nguy khi máy bay địch ngày đêm oanh tạc, toàn thể già trẻ, gái trai của Sóc Bom Bo đã chuyển sang <strong>giã gạo thâu đêm</strong> dưới ánh đuốc lồ ô. Tiếng chày đôi, chày ba nện xuống cối gỗ đều đặn, hòa cùng tiếng hát, biến nhịp lao động thành nhịp hành khúc kháng chiến.</p>
      <blockquote>"Đuốc lồ ô bập bùng cháy sáng suốt đêm, tiếng chày như thúc giục lòng người." — mô tả trong các tư liệu về đêm giã gạo lịch sử năm 1965.</blockquote>
      <h3>Từ nhịp chày đến bài ca bất hủ</h3>
      <ul>
        <li>Câu chuyện giã gạo nuôi quân trở thành cảm hứng cho ca khúc <strong>"Tiếng Chày Trên Sóc Bom Bo"</strong> của nhạc sĩ Xuân Hồng (1966) — một trong những bài hát cách mạng được yêu thích nhất Việt Nam.</li>
        <li>Ngày nay, <strong>Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo</strong> tại xã Bom Bo (Thành Phố Đồng Nai) phục dựng nhà dài truyền thống, lưu giữ chày cối, gùi tải đạn và tư liệu lịch sử quý báu.</li>
        <li>Khu bảo tồn còn là nơi tổ chức trải nghiệm giã gạo, nghe cồng chiêng, thưởng thức cơm lam và rượu cần cùng đồng bào S'tiêng.</li>
      </ul>`,
      images: [
        { url: '/images/heritage/lich-su/soc-bom-bo-lg.webp', caption: 'Khu di tích lịch sử Sóc Bom Bo tái hiện cảnh giã gạo nuôi quân năm 1965' },
        { url: '/images/heritage/Bombo/TAN08220.jpg', caption: 'Nghệ nhân lớn tuổi truyền dạy nhạc cụ truyền thống cho thế hệ trẻ tại khu bảo tồn' },
      ],
    },
    timeline: [
      { date: '1965', event: 'Đêm giã gạo huyền thoại phục vụ chiến dịch Phước Long – Đồng Xoài', detail: 'Đồng bào S\'tiêng đốt đuốc lồ ô, giã gạo thâu đêm suốt sáng để kịp tiếp tế cho bộ đội chủ lực.' },
      { date: '1966', event: 'Nhạc sĩ Xuân Hồng sáng tác "Tiếng Chày Trên Sóc Bom Bo"', detail: 'Ca khúc lấy cảm hứng trực tiếp từ tinh thần giã gạo nuôi quân, trở thành bài ca cách mạng bất hủ.' },
      { date: '1975', event: 'Góp phần vào ngày toàn thắng', detail: 'Những đóng góp bền bỉ về hậu cần của Sóc Bom Bo được ghi nhận trong thắng lợi chung của cuộc kháng chiến.' },
      { date: '2010', event: 'Khu bảo tồn văn hóa dân tộc S\'tiêng sóc Bom Bo được xây dựng', detail: 'Phục dựng nhà dài truyền thống, trở thành địa chỉ đỏ giáo dục truyền thống cách mạng.' },
      { date: 'Nay', event: 'Điểm du lịch văn hóa – lịch sử tại xã Bom Bo, Thành Phố Đồng Nai', detail: 'Du khách có thể trải nghiệm giã gạo, nghe cồng chiêng và tìm hiểu đời sống S\'tiêng.' },
    ],
    didYouKnow: [
      'Sóc Bom Bo nay thuộc xã Bom Bo (sáp nhập từ xã Bình Minh và xã Bom Bo cũ từ 01/07/2025), Thành Phố Đồng Nai.',
      'Ban ngày giặc lùng sục oanh tạc, bà con Sóc Bom Bo chuyển hẳn sang giã gạo ban đêm để đảm bảo an toàn và kịp tiến độ.',
      'Khu bảo tồn hiện lưu giữ hàng trăm hiện vật: chày cối sứt sẹo, gùi tự chế tải đạn xuyên rừng và nhiều tư liệu lịch sử quý.',
    ],
    glossary: [
      { term: 'Đuốc lồ ô', definition: 'Đuốc làm từ thân cây lồ ô (một loại tre nứa) tẩm dầu, dùng để thắp sáng khi giã gạo ban đêm.' },
      { term: 'Chày đôi, chày ba', definition: 'Cách giã gạo bằng 2-3 người cùng một cối, nhịp chày phối hợp nhanh và đều để tăng năng suất.' },
      { term: 'Hậu cần', definition: 'Công tác đảm bảo lương thực, vũ khí, thuốc men cho lực lượng chiến đấu — vai trò chính của Sóc Bom Bo trong chiến dịch 1965.' },
    ],
    flashcards: [
      { front: 'Sóc Bom Bo giã gạo thâu đêm để phục vụ chiến dịch nào?', back: 'Chiến dịch Phước Long – Đồng Xoài, cuối năm 1965.' },
      { front: 'Ai đã sáng tác bài "Tiếng Chày Trên Sóc Bom Bo"?', back: 'Nhạc sĩ Xuân Hồng, sáng tác năm 1966 lấy cảm hứng từ đêm giã gạo lịch sử.' },
      { front: 'Vì sao đồng bào chuyển sang giã gạo vào ban đêm?', back: 'Vì ban ngày máy bay địch lùng sục oanh tạc, giã gạo ban đêm dưới ánh đuốc lồ ô an toàn hơn.' },
      { front: 'Sóc Bom Bo ngày nay thuộc địa phương nào?', back: 'Xã Bom Bo, Thành Phố Đồng Nai (sáp nhập từ xã Bình Minh và xã Bom Bo cũ, 01/07/2025).' },
    ],
    openQuestions: [
      'Điều gì khiến câu chuyện giã gạo ở Sóc Bom Bo trở thành biểu tượng của tinh thần đoàn kết quân dân?',
      'Nếu là một học sinh Bù Đăng hôm nay, bạn sẽ giới thiệu câu chuyện Sóc Bom Bo cho bạn bè quốc tế như thế nào?',
    ],
    quiz: [
      {
        question: 'Sự kiện giã gạo thâu đêm nổi tiếng của Sóc Bom Bo diễn ra vào năm nào?',
        options: ['1954', '1965', '1975', '1986'],
        correct: 1,
        explanation: 'Cuối năm 1965, đồng bào S\'tiêng giã gạo thâu đêm để phục vụ chiến dịch Phước Long – Đồng Xoài.',
      },
      {
        question: '"Tiếng Chày Trên Sóc Bom Bo" là sáng tác của nhạc sĩ nào?',
        options: ['Văn Cao', 'Xuân Hồng', 'Trịnh Công Sơn', 'Phạm Duy'],
        correct: 1,
        explanation: 'Nhạc sĩ Xuân Hồng sáng tác ca khúc này năm 1966, lấy cảm hứng từ tinh thần giã gạo nuôi quân.',
      },
      {
        question: 'Vì sao bà con Sóc Bom Bo chuyển sang giã gạo vào ban đêm?',
        options: ['Ban đêm gạo dễ giã hơn', 'Vì phong tục truyền thống', 'Ban ngày máy bay địch lùng sục oanh tạc', 'Vì thời tiết ban ngày quá nóng'],
        correct: 2,
        explanation: 'Để tránh bị địch phát hiện và oanh tạc, bà con chuyển hẳn sang giã gạo thâu đêm dưới ánh đuốc lồ ô.',
      },
      {
        question: 'Đuốc dùng để thắp sáng khi giã gạo ban đêm được làm từ vật liệu gì?',
        options: ['Sáp ong rừng', 'Thân cây lồ ô tẩm dầu', 'Vỏ cây cao su', 'Dầu dừa'],
        correct: 1,
        explanation: 'Đuốc lồ ô — làm từ thân cây lồ ô tẩm dầu — là nguồn sáng chính trong những đêm giã gạo lịch sử.',
      },
      {
        question: 'Sóc Bom Bo ngày nay thuộc địa bàn hành chính nào?',
        options: ['Xã Bù Đăng', 'Xã Bom Bo, Thành Phố Đồng Nai', 'Phường Đồng Xoài', 'Xã Phước Long'],
        correct: 1,
        explanation: 'Từ 01/07/2025, xã Bình Minh và xã Bom Bo cũ sáp nhập thành xã Bom Bo, Thành Phố Đồng Nai.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) nêu cảm nhận của bạn về tinh thần "quân dân một lòng" qua câu chuyện giã gạo ở Sóc Bom Bo.',
      hint: 'Gợi ý: liên hệ với tinh thần đoàn kết cộng đồng ngày nay, ý nghĩa của lao động tập thể, và giá trị của ca khúc "Tiếng Chày Trên Sóc Bom Bo" trong việc lưu giữ ký ức lịch sử.',
    },
    relatedPlaces: [
      { name: 'Chiến Khu Đ', desc: 'Hệ thống căn cứ địa cách mạng mà Sóc Bom Bo đã tiếp tế lương thực trong kháng chiến.' },
      { name: 'Trảng Cỏ Bù Lạch', desc: 'Danh thắng thiên nhiên gần đó, điểm đến sinh thái nổi bật của Thành Phố Đồng Nai.' },
    ],
    relatedEvents: [
      { name: 'Chiến dịch Phước Long – Đồng Xoài', year: '1965', desc: 'Chiến dịch quân sự lớn mà đêm giã gạo lịch sử của Sóc Bom Bo trực tiếp phục vụ hậu cần.' },
    ],
    relatedPeople: [
      { name: 'Nhạc sĩ Xuân Hồng', role: 'Tác giả ca khúc "Tiếng Chày Trên Sóc Bom Bo"', desc: 'Sáng tác năm 1966, bất hủ hóa tinh thần giã gạo nuôi quân của đồng bào S\'tiêng Bù Đăng.' },
    ],
    references: [
      { title: 'Kỷ yếu di tích lịch sử Sóc Bom Bo', source: 'Ủy ban nhân dân xã Bom Bo (trước là xã Bình Minh)' },
      { title: '"Tiếng chày trên Sóc Bom Bo" — Lịch sử ra đời ca khúc', source: 'Nhạc sĩ Xuân Hồng, 1966' },
    ],
    nextSteps: [
      { title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng', lessonId: 'chien-khu-d', type: 'lesson' },
      { title: 'Cồng Chiêng S\'tiêng — Tiếng Nói Của Đại Ngàn', lessonId: 'cong-chieng-stieng', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Đồng Nai', type: 'map' },
    ],
  },

  'trang-co-bu-lach': {
    id: 'trang-co-bu-lach',
    title: 'Danh Thắng Trảng Cỏ Bù Lạch — Kỳ Quan Thiên Nhiên',
    subject: 'Địa lý địa phương',
    xpReward: 70,
    estimatedMinutes: 8,
    tldr: 'Trảng cỏ Bù Lạch là thảo nguyên xanh mướt rộng hơn 140 ha ôm trọn một hồ nước ngọt tự nhiên giữa lòng rừng già xã Bù Đăng, Thành Phố Đồng Nai — một trong những danh thắng thiên nhiên độc đáo bậc nhất của địa phương.',
    coreKnowledge: {
      text: `<p>Cách trung tâm xã Bù Đăng khoảng <strong>20 km</strong>, Trảng cỏ Bù Lạch hiện lên như một thảo nguyên hoang sơ kỳ vĩ giữa lòng đại ngàn — sự kết hợp hiếm có giữa rừng nguyên sinh, trảng cỏ xanh mướt và hồ nước ngọt phẳng lặng.</p>
      <p>Danh thắng này rộng <strong>hơn 140 ha</strong>, gồm hơn <strong>20 trảng cỏ lớn nhỏ</strong>. Loại cỏ mọc tự nhiên ở đây là <em>cỏ kim</em> — dai, mịn và giữ màu xanh quanh năm. Bao quanh là những khu rừng nguyên sinh rậm rạp, tạo thành bức tường thành thiên nhiên bảo vệ thảo nguyên nhỏ bé này.</p>
      <blockquote>Người S'tiêng bản địa coi hồ nước Bù Lạch là "gương thần của trời đất" — nguồn sinh khí nuôi dưỡng buôn làng qua bao thế hệ.</blockquote>
      <h3>Vì sao Bù Lạch đặc biệt?</h3>
      <ul>
        <li>Là <strong>một trong số ít</strong> địa điểm ở Nam Bộ có trảng cỏ tự nhiên kết hợp hồ nước ngọt giữa rừng già.</li>
        <li>Hệ sinh thái đa dạng, là nơi lý tưởng để tìm hiểu về địa chất và thảm thực vật bản địa.</li>
        <li>Gắn với đời sống văn hóa và truyền thuyết linh thiêng của đồng bào S'tiêng bản địa.</li>
      </ul>`,
      images: [
        { url: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png', caption: 'Cánh đồng cỏ xanh mướt trải rộng quanh lòng hồ tự nhiên giữa rừng già Bù Đăng' },
      ],
    },
    hotspotImage: {
      url: '/images/heritage/img-disanbudang/Trang-co-Bu-Lach.png',
      alt: 'Toàn cảnh Trảng cỏ Bù Lạch với hồ nước trung tâm',
      hotspots: [
        { x: 50, y: 55, label: 'Hồ nước trung tâm', desc: 'Hồ nước ngọt tự nhiên mà người S\'tiêng gọi là "gương thần của trời đất" — trung tâm của cả quần thể trảng cỏ.' },
        { x: 20, y: 35, label: 'Trảng cỏ kim', desc: 'Thảm cỏ kim tự nhiên, dai và mịn, giữ màu xanh quanh năm trên hơn 140 ha diện tích.' },
        { x: 80, y: 25, label: 'Vành đai rừng nguyên sinh', desc: 'Rừng già rậm rạp bao quanh, tạo bức tường thành thiên nhiên bảo vệ hệ sinh thái trảng cỏ.' },
      ],
    },
    timeline: [
      { date: 'Hàng ngàn năm trước', event: 'Kiến tạo địa chất tự nhiên', detail: 'Trảng cỏ và hồ nước hình thành qua quá trình kiến tạo địa chất kỳ thú của vùng đất đỏ bazan.' },
      { date: '2015', event: 'Quy hoạch bảo tồn danh thắng', detail: 'Trảng cỏ Bù Lạch được quy hoạch và bảo tồn nghiêm ngặt để phát triển du lịch sinh thái bền vững.' },
      { date: 'Nay', event: 'Điểm du lịch sinh thái nổi bật của Thành Phố Đồng Nai', detail: 'Thu hút du khách yêu thiên nhiên hoang sơ, cắm trại dã ngoại và tìm hiểu đời sống bản địa.' },
    ],
    didYouKnow: [
      'Trảng cỏ Bù Lạch rộng hơn 140 ha, gồm hơn 20 trảng cỏ lớn nhỏ nối liền nhau.',
      'Loại cỏ mọc tự nhiên ở đây gọi là "cỏ kim" — dai, mịn, giữ màu xanh mướt quanh năm dù không có ai chăm bón.',
      'Người S\'tiêng bản địa lưu truyền nhiều truyền thuyết linh thiêng, coi hồ nước Bù Lạch là nguồn sinh khí nuôi dưỡng buôn làng.',
    ],
    glossary: [
      { term: 'Trảng cỏ', definition: 'Vùng đất trống có thảm cỏ tự nhiên mọc xen giữa rừng, không do con người trồng hay chăm sóc.' },
      { term: 'Cỏ kim', definition: 'Loại cỏ lá nhỏ, dai và mịn, mọc tự nhiên tại Bù Lạch, giữ màu xanh quanh năm.' },
      { term: 'Đất đỏ bazan', definition: 'Loại đất hình thành từ dung nham núi lửa phong hóa, phổ biến ở vùng Đông Nam Bộ và Tây Nguyên, rất màu mỡ.' },
    ],
    flashcards: [
      { front: 'Trảng cỏ Bù Lạch rộng khoảng bao nhiêu?', back: 'Hơn 140 ha, gồm hơn 20 trảng cỏ lớn nhỏ khác nhau.' },
      { front: 'Loại cỏ đặc trưng ở Bù Lạch tên là gì?', back: 'Cỏ kim — loại cỏ dai, mịn, giữ màu xanh quanh năm.' },
      { front: 'Trảng cỏ Bù Lạch cách trung tâm xã Bù Đăng bao xa?', back: 'Khoảng 20 km.' },
      { front: 'Người S\'tiêng gọi hồ nước Bù Lạch là gì?', back: '"Gương thần của trời đất" — nguồn sinh khí nuôi dưỡng buôn làng theo truyền thuyết bản địa.' },
    ],
    openQuestions: [
      'Vì sao việc bảo tồn hệ sinh thái tự nhiên như Trảng cỏ Bù Lạch lại quan trọng với thế hệ trẻ hôm nay?',
      'Bạn sẽ đề xuất những hoạt động du lịch sinh thái nào để vừa phát triển kinh tế vừa bảo vệ Trảng cỏ Bù Lạch?',
    ],
    quiz: [
      {
        question: 'Trảng cỏ Bù Lạch có diện tích khoảng bao nhiêu?',
        options: ['Khoảng 50 ha', 'Hơn 140 ha', 'Hơn 500 ha', 'Khoảng 10 ha'],
        correct: 1,
        explanation: 'Trảng cỏ Bù Lạch rộng hơn 140 ha, gồm hơn 20 trảng cỏ lớn nhỏ khác nhau.',
      },
      {
        question: 'Loại cỏ đặc trưng mọc tự nhiên tại Trảng cỏ Bù Lạch được gọi là gì?',
        options: ['Cỏ voi', 'Cỏ kim', 'Cỏ lau', 'Cỏ tranh'],
        correct: 1,
        explanation: 'Cỏ kim là loại cỏ dai, mịn, mọc tự nhiên và giữ màu xanh mướt quanh năm tại Bù Lạch.',
      },
      {
        question: 'Trảng cỏ Bù Lạch cách trung tâm xã Bù Đăng khoảng bao xa?',
        options: ['5 km', '20 km', '50 km', '100 km'],
        correct: 1,
        explanation: 'Trảng cỏ Bù Lạch nằm cách trung tâm xã Bù Đăng khoảng 20 km.',
      },
      {
        question: 'Điều gì bao quanh và bảo vệ trảng cỏ khỏi tác động bên ngoài?',
        options: ['Sông lớn', 'Đồi cát', 'Rừng nguyên sinh rậm rạp', 'Vách đá cao'],
        correct: 2,
        explanation: 'Rừng nguyên sinh rậm rạp bao quanh tạo thành bức tường thành thiên nhiên bảo vệ trảng cỏ.',
      },
      {
        question: 'Người S\'tiêng bản địa quan niệm như thế nào về hồ nước Bù Lạch?',
        options: ['Là nơi cấm kỵ không ai lui tới', 'Là "gương thần của trời đất" nuôi dưỡng buôn làng', 'Chỉ là nơi lấy nước sinh hoạt thông thường', 'Là ranh giới giữa các buôn sóc'],
        correct: 1,
        explanation: 'Theo truyền thuyết bản địa, hồ nước Bù Lạch được coi là "gương thần của trời đất", cung cấp sinh khí cho buôn làng.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) đề xuất một cách để bảo tồn và phát triển du lịch sinh thái bền vững tại Trảng cỏ Bù Lạch.',
      hint: 'Gợi ý: cân bằng giữa thu hút du khách và bảo vệ hệ sinh thái tự nhiên, vai trò của cộng đồng S\'tiêng bản địa trong việc gìn giữ danh thắng.',
    },
    relatedPlaces: [
      { name: 'Khu Bảo Tồn Sóc Bom Bo', desc: 'Địa danh lịch sử – văn hóa gần đó, nơi lưu giữ truyền thống của đồng bào S\'tiêng.' },
      { name: 'Thác Đứng Bù Đăng', desc: 'Thắng cảnh thiên nhiên với cấu trúc đá bazan cột lục lăng độc đáo.' },
    ],
    references: [
      { title: 'Cổng thông tin du lịch Bù Lạch', source: 'Sở Văn hóa Thể thao và Du lịch Thành Phố Đồng Nai' },
    ],
    nextSteps: [
      { title: 'Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến', lessonId: 'soc-bom-bo', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
      { title: 'Làm bài kiểm tra hiểu biết di sản', type: 'quiz' },
    ],
  },

  'nui-ba-ra': {
    id: 'nui-ba-ra',
    title: 'Núi Bà Rá — Đỉnh Thiêng & Di Tích Lịch Sử Kháng Chiến',
    subject: 'Lịch sử & Địa lý',
    xpReward: 85,
    estimatedMinutes: 12,
    tldr: 'Núi Bà Rá cao 723m là đỉnh núi cao thứ 3 Nam Bộ, "nóc nhà" tỉnh Bình Phước. Nơi đây từng chứng kiến sự tàn bạo của Nhà tù Bà Rá (1930) và là cứ điểm phòng thủ then chốt bị quân ta tiêu diệt trong Chiến dịch Phước Long 1975.',
    coreKnowledge: {
      text: `<p>Núi Bà Rá vươn cao <strong>723m</strong> so với mực nước biển, sừng sững giữa vùng đồi lượn sóng của miền Đông Nam Bộ. Người S'tiêng bản địa từ ngàn đời nay tôn kính gọi ngọn núi là <em>Bơnom Brah</em> (Núi Thần) — nơi ngự trị của các vị thần linh che chở cho buôn làng.</p>
      <p>Trong thời kỳ kháng Pháp, thực dân Pháp đã xây dựng <strong>Nhà tù Bà Rá</strong> (năm 1930) ngay dưới chân núi nhằm giam cầm, đày ải hàng nghìn chiến sĩ cộng sản và nhân sĩ yêu nước. Nơi đây từng là "địa ngục trần gian" nhưng cũng là trường học cách mạng tôi luyện ý chí kiên cường của các chiến sĩ.</p>
      <p>Trong Chiến dịch Đường 14 – Phước Long, ngày <strong>02/01/1975</strong>, quân giải phóng đã dũng cảm đánh chiếm điểm cao đỉnh núi Bà Rá, phá hủy trận địa pháo và đài quan sát của địch, tạo thế mở toang cánh cửa giải phóng thị xã Phước Long.</p>`,
      images: [
        { url: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png', caption: 'Núi Bà Rá hùng vĩ soi bóng xuống lòng hồ Thác Mơ trong xanh' },
      ],
    },
    timeline: [
      { date: '1930', event: 'Thực dân Pháp xây dựng Nhà tù Bà Rá để lưu đày tù chính trị', detail: 'Hàng nghìn chiến sĩ cách mạng kiên trung bị giam cầm trong điều kiện vô cùng khắc nghiệt giữa rừng thiêng nước độc.' },
      { date: '1960–1975', event: 'Cứ điểm quân sự quan sát chiến lược', detail: 'Quân đội Sài Gòn đặt trận địa pháo và đài quan sát khống chế toàn bộ vùng Đông Nam Bộ.' },
      { date: '02/01/1975', event: 'Quân giải phóng đánh chiếm đỉnh núi Bà Rá', detail: 'Bộ đội ta dũng cảm làm chủ điểm cao, tạo bước ngoặt quyết định giải phóng tỉnh Phước Long.' },
      { date: 'Nay', event: 'Quần thể danh thắng di tích lịch sử quốc gia', detail: 'Điểm du lịch cáp treo tâm linh và nơi tổ chức Giải việt dã leo núi "Chinh phục đỉnh cao Bà Rá" toàn quốc ngày 06/01 hàng năm.' },
    ],
    didYouKnow: [
      'Núi Bà Rá cao 723m, là đỉnh núi cao thứ 3 toàn vùng Nam Bộ sau núi Bà Đen (986m) và núi Chứa Chan (837m).',
      'Người S\'tiêng gọi núi là Bơnom Brah, tương truyền là nơi ngọn gió trời và dòng nước suối thiêng khởi nguồn.',
      'Hàng năm vào ngày 06/01, Giải việt dã leo núi "Chinh phục đỉnh cao Bà Rá" toàn quốc thu hút hàng nghìn vận động viên.',
    ],
    glossary: [
      { term: 'Bơnom Brah', definition: 'Tên gọi Núi Bà Rá trong tiếng S\'tiêng, nghĩa là "Núi Thần" linh thiêng.' },
      { term: 'Nhà tù Bà Rá', definition: 'Nhà lao do thực dân Pháp xây dựng năm 1930 để giam cầm tù chính trị.' },
      { term: 'Điểm cao chiến lược', definition: 'Vị trí địa hình trên cao có tầm nhìn bao quát toàn bộ chiến trường xung quanh.' },
    ],
    flashcards: [
      { front: 'Núi Bà Rá cao bao nhiêu mét và đứng thứ mấy Nam Bộ?', back: 'Cao 723m, đứng thứ 3 toàn Nam Bộ (sau Bà Đen 986m và Chứa Chan 837m).' },
      { front: 'Người S\'tiêng gọi núi Bà Rá là gì?', back: 'Bơnom Brah (nghĩa là Núi Thần).' },
      { front: 'Quân ta đánh chiếm cứ điểm đỉnh núi Bà Rá vào ngày nào?', back: 'Ngày 02/01/1975, mở toang cửa giải phóng Phước Long.' },
    ],
    openQuestions: [
      'Vì sao đỉnh núi Bà Rá lại giữ vị trí quân sự trọng yếu trong Chiến dịch Phước Long 1975?',
      'Giá trị kết hợp giữa danh thắng thiên nhiên và di tích lịch sử tại núi Bà Rá có ý nghĩa thế nào đối với du lịch?',
    ],
    quiz: [
      {
        question: 'Núi Bà Rá có độ cao bao nhiêu mét so với mực nước biển?',
        options: ['450m', '723m', '986m', '1.200m'],
        correct: 1,
        explanation: 'Núi Bà Rá cao 723m, là ngọn núi cao thứ 3 toàn Nam Bộ và là đỉnh núi cao nhất tỉnh Bình Phước.',
      },
      {
        question: 'Người S\'tiêng bản địa gọi ngọn núi Bà Rá là gì?',
        options: ['Dak Brah', 'Bơnom Brah', 'Nhar Brah', 'Yang Brah'],
        correct: 1,
        explanation: '"Bơnom Brah" trong tiếng S\'tiêng có nghĩa là Núi Thần — ngọn núi linh thiêng của buôn sóc.',
      },
      {
        question: 'Công trình lịch sử nào được thực dân Pháp xây dựng dưới chân núi năm 1930?',
        options: ['Nhà tù Côn Đảo', 'Nhà tù Bà Rá', 'Nhà đày Buôn Ma Thuột', 'Trại giam Phú Quốc'],
        correct: 1,
        explanation: 'Năm 1930, thực dân Pháp xây dựng Nhà tù Bà Rá kiên cố để giam cầm các chiến sĩ cách mạng yêu nước.',
      },
      {
        question: 'Cứ điểm phòng thủ trên đỉnh núi Bà Rá bị quân giải phóng đánh chiếm vào ngày nào?',
        options: ['13/12/1974', '02/01/1975', '06/01/1975', '30/04/1975'],
        correct: 1,
        explanation: 'Ngày 02/01/1975, quân ta làm chủ đỉnh núi Bà Rá, tạo thế áp đảo đánh sập tuyến phòng thủ thị xã Phước Long.',
      },
      {
        question: 'Giải thể thao truyền thống leo núi toàn quốc tổ chức định kỳ ngày 06/01 tại đây tên là gì?',
        options: ['Cúp xe đạp truyền hình', 'Giải việt dã leo núi "Chinh phục đỉnh cao Bà Rá"', 'Giải marathon sông Bé', 'Giải bơi vượt hồ Thác Mơ'],
        correct: 1,
        explanation: 'Giải việt dã leo núi "Chinh phục đỉnh cao Bà Rá" tổ chức ngày 6/1 hàng năm nhân kỷ niệm ngày giải phóng Phước Long.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) nêu cảm nghĩ của bạn về ý chí kiên trung của các chiến sĩ cộng sản bị giam cầm tại Nhà tù Bà Rá năm xưa.',
      hint: 'Gợi ý: hoàn cảnh khắc nghiệt của rừng thiêng nước độc, sự tàn bạo của cai ngục, và tinh thần lạc quan cách mạng.',
    },
    relatedPlaces: [
      { name: 'Hồ Thác Mơ', desc: 'Hồ nước nhân tạo thơ mộng dưới chân núi Bà Rá.' },
      { name: 'Bảo Tàng Chiến Dịch Đường 14 – Phước Long', desc: 'Nơi lưu giữ hiện vật về chiến dịch giải phóng Phước Long 1975.' },
    ],
    references: [
      { title: 'Lịch sử Đảng bộ tỉnh Bình Phước', source: 'NXB Chính trị Quốc gia Sự thật' },
    ],
    nextSteps: [
      { title: 'Chiến Thắng Phước Long 1975 — Đòn Trinh Sát Chiến Lược', lessonId: 'chien-thang-phuoc-long', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
    ],
  },

  'can-cu-nua-lon': {
    id: 'can-cu-nua-lon',
    title: 'Căn Cứ Nửa Lon — Biểu Tượng Ý Chí Vượt Gian Khó',
    subject: 'Lịch sử cách mạng',
    xpReward: 80,
    estimatedMinutes: 10,
    tldr: 'Căn cứ Nửa Lon là di tích lịch sử cách mạng hào hùng của huyện Bù Đăng, nơi quân dân chia nhau từng nửa lon gạo mỗi ngày để giữ vững hành lang chiến lược Bắc — Nam qua đường mòn Hồ Chí Minh giai đoạn 1960–1965.',
    coreKnowledge: {
      text: `<p>Nằm sâu trong những cánh rừng già Bù Đăng, di tích <strong>Căn cứ Nửa Lon</strong> là minh chứng sống động cho ý chí sắt đá và tình đoàn kết keo sơn giữa bộ đội và đồng bào dân tộc S'tiêng, M'nông.</p>
      <p>Giai đoạn 1960 - 1965, khi địch phong tỏa gắt gao các ngả đường tiếp tế lương thực, toàn bộ cán bộ, chiến sĩ và du kích căn cứ phải đối mặt với nạn đói khủng khiếp. Để cầm cự bám trụ chiến đấu, mỗi người chỉ được nhận khẩu phần <strong>đúng nửa lon gạo mỗi ngày</strong>, nấu cháo loãng với đọt mây lá nhíp rừng để nhường cơm cho tiền tuyến.</p>
      <p>Căn cứ Nửa Lon giữ vị trí bản lề là <strong>điểm mở đầu hành lang chiến lược Bắc – Nam</strong> nối liền tuyến chi viện đường mòn Hồ Chí Minh vào chiến trường miền Đông Nam Bộ, góp phần to lớn vào thắng lợi chung của cách mạng.</p>`,
      images: [
        { url: '/images/heritage/img-disanbudang/chien-khu-D.png', caption: 'Khu vực rừng già căn cứ kháng chiến Nửa Lon xưa' },
      ],
    },
    timeline: [
      { date: '1960', event: 'Xây dựng căn cứ kháng chiến', detail: 'Thiết lập trạm trung chuyển hành lang chiến lược nối chi viện từ miền Bắc.' },
      { date: '1962', event: 'Thời kỳ khó khăn gian khổ nhất', detail: 'Tên gọi "Căn cứ Nửa Lon" ra đời khi quân dân đồng lòng chia nhau từng nửa lon gạo vượt qua nạn đói.' },
      { date: '1975', event: 'Góp công giải phóng quê hương', detail: 'Căn cứ cung cấp hậu cần và nhân lực giải phóng Bù Đăng và tỉnh Phước Long.' },
      { date: 'Nay', event: 'Địa chỉ đỏ giáo dục truyền thống', detail: 'Điểm về nguồn giáo dục lý tưởng cách mạng và ý chí tự lực tự cường cho thế hệ trẻ.' },
    ],
    didYouKnow: [
      'Khẩu phần "nửa lon gạo/ngày" là biểu tượng cao đẹp của tinh thần nhường cơm sẻ áo giữa quân và dân.',
      'Đồng bào S\'tiêng đã đào hầm bí mật nuôi giấu cán bộ Khu ủy miền Đông an toàn tuyệt đối suốt nhiều năm.',
      'Các anh hùng Điểu Ong, Điểu Kâu là những người con ưu tú của núi rừng Bù Đăng chỉ huy du kích tại đây.',
    ],
    glossary: [
      { term: 'Nửa Lon', definition: 'Tên gọi gắn với khẩu phần ăn nửa lon gạo mỗi ngày của quân dân thời kỳ gian khó 1960-1965.' },
      { term: 'Hành lang chiến lược', definition: 'Tuyến đường bí mật vận chuyển vũ khí, bộ đội và lương thực từ hậu phương lớn miền Bắc vào miền Nam.' },
      { term: 'Du kích buôn sóc', definition: 'Lực lượng vũ trang địa phương người dân tộc thiểu số thông thuộc địa hình rừng núi.' },
    ],
    flashcards: [
      { front: 'Tên gọi "Căn cứ Nửa Lon" bắt nguồn từ sự kiện gì?', back: 'Khẩu phần ăn chỉ nửa lon gạo/ngày để nhường lương thực cho tiền tuyến thời kỳ 1960-1965.' },
      { front: 'Căn cứ Nửa Lon có vai trò gì trên tuyến đường Hồ Chí Minh?', back: 'Điểm mở đầu hành lang chiến lược nối chi viện từ miền Bắc vào chiến trường miền Đông Nam Bộ.' },
      { front: 'Những dân tộc bản địa nào đồng hành cùng bộ đội tại căn cứ?', back: 'Đồng bào S\'tiêng và M\'nông huyện Bù Đăng.' },
    ],
    openQuestions: [
      'Tinh thần "chia nhau nửa lon gạo" để lại bài học gì cho thế hệ trẻ hôm nay?',
      'Tình đoàn kết quân dân đã quyết định sự tồn tại của căn cứ Nửa Lon như thế nào?',
    ],
    quiz: [
      {
        question: 'Tên gọi "Căn cứ Nửa Lon" xuất phát từ sự kiện lịch sử nào?',
        options: ['Chiến sĩ chỉ uống nửa lon nước/ngày', 'Khẩu phần ăn chỉ có nửa lon gạo mỗi ngày để nhường cơm cho tiền tuyến', 'Căn cứ hình chiếc lon', 'Căn cứ nằm cạnh suối Nửa Lon'],
        correct: 1,
        explanation: 'Khẩu phần ăn chỉ nửa lon gạo/ngày thời kỳ khó khăn 1960-1965 đã trở thành tên gọi bất tử của căn cứ.',
      },
      {
        question: 'Căn cứ Nửa Lon đóng vai trò gì trong tuyến đường mòn Hồ Chí Minh?',
        options: ['Trạm kiểm soát lâm nghiệp', 'Điểm mở đầu hành lang chiến lược chi viện từ miền Bắc vào miền Đông Nam Bộ', 'Trường quân sự quốc tế', 'Kho vũ khí hàng không'],
        correct: 1,
        explanation: 'Căn cứ là điểm đầu mối đón nhận các đoàn vận tải chi viện chiến lược từ miền Bắc vào miền Đông.',
      },
      {
        question: 'Đồng bào dân tộc bản địa nào đã kề vai sát cánh cùng cán bộ tại căn cứ?',
        options: ['Người S\'tiêng và M\'nông Bù Đăng', 'Chỉ người Kinh', 'Người Chăm', 'Người Thái'],
        correct: 0,
        explanation: 'Đồng bào S\'tiêng và M\'nông đã nhường cơm sẻ áo, đào hầm nuôi giấu cán bộ suốt những năm tháng kháng chiến.',
      },
      {
        question: 'Hai người anh hùng tiêu biểu người dân tộc S\'tiêng của Bù Đăng là ai?',
        options: ['Anh hùng Điểu Ong và Điểu Kâu', 'Anh hùng Núp', 'Anh hùng La Văn Cầu', 'Anh hùng Kim Đồng'],
        correct: 0,
        explanation: 'Điểu Ong và Điểu Kâu là những người con ưu tú lãnh đạo du kích Bù Đăng lập nhiều chiến công oanh liệt.',
      },
      {
        question: 'Yếu tố địa hình nào giúp căn cứ đứng vững trước các cuộc càn quét?',
        options: ['Vùng đồng bằng thoáng đãng', 'Rừng nguyên sinh rậm rạp, địa hình đồi dốc hiểm trở và mạng lưới suối rừng che chắn', 'Bờ biển dài thuận tiện rút lui', 'Đồi cát sa mạc'],
        correct: 1,
        explanation: 'Địa hình rừng già hiểm trở và sự chở che của buôn làng đã biến căn cứ thành pháo đài bất khả xâm phạm.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) bình luận về câu nói "Tình quân dân là bức tường thành vững chắc nhất" qua di tích Căn cứ Nửa Lon.',
      hint: 'Gợi ý: sự hy sinh nhường cơm sẻ áo của đồng bào dân tộc thiểu số, lòng tin son sắt vào Đảng và Bác Hồ.',
    },
    relatedPlaces: [
      { name: 'Di Tích Lịch Sử Sóc Bom Bo', desc: 'Buôn sóc giã gạo thâu đêm nuôi quân tiếp tế cho căn cứ.' },
      { name: 'Rừng Nguyên Sinh Bù Đăng', desc: 'Lá chắn xanh tự nhiên bao bọc toàn bộ căn cứ cách mạng.' },
    ],
    references: [
      { title: 'Lịch sử Đảng bộ huyện Bù Đăng (1930 - 2015)', source: 'Ban Tuyên giáo Huyện ủy Bù Đăng' },
    ],
    nextSteps: [
      { title: 'Sóc Bom Bo — Tiếng Chày Giã Gạo Kháng Chiến', lessonId: 'soc-bom-bo', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
    ],
  },

  'chien-thang-phuoc-long': {
    id: 'chien-thang-phuoc-long',
    title: 'Chiến Thắng Phước Long 1975 — Đòn Trinh Sát Chiến Lược',
    subject: 'Lịch sử quân sự',
    xpReward: 95,
    estimatedMinutes: 15,
    tldr: 'Chiến dịch Đường 14 – Phước Long kết thúc thắng lợi ngày 06/01/1975, đưa Phước Long trở thành tỉnh đầu tiên ở miền Nam được giải phóng hoàn toàn, tạo cơ sở thực tiễn để Bộ Chính trị hạ quyết tâm mở Tổng tiến công mùa Xuân 1975.',
    coreKnowledge: {
      text: `<p>Chiến dịch Đường 14 – Phước Long (13/12/1974 – 06/01/1975) là một trong những chiến dịch quân sự có ý nghĩa bước ngoặt nhất trong cuộc kháng chiến chống Mỹ cứu nước.</p>
      <p>Sau 25 ngày đêm chiến đấu kiên cường, vượt qua hỏa lực pháo binh và không quân ác liệt của địch, quân và dân ta đã tiêu diệt toàn bộ quân địch cố thủ, đánh chiếm núi Bà Rá và giải phóng hoàn toàn <strong>tỉnh Phước Long vào ngày 06/01/1975</strong>.</p>
      <p>Chiến thắng này được đánh giá là một <strong>"đòn trinh sát chiến lược"</strong> lịch sử: khẳng định quân ngụy Sài Gòn đã suy sụp không thể phản kích chiếm lại, đồng thời chứng minh đế quốc Mỹ hoàn toàn bất lực không thể đưa quân can thiệp trở lại. Đây là căn cứ thực tiễn quyết định để Bộ Chính trị thông qua quyết tâm giải phóng miền Nam ngay trong năm 1975.</p>`,
      images: [
        { url: '/images/heritage/img-disanbudang/tuong-dai-phuoc-long-chien-thang.jpg', caption: 'Tượng đài Chiến thắng Phước Long kiêu hãnh giữa trung tâm thị xã' },
      ],
    },
    timeline: [
      { date: '13/12/1974', event: 'Mở màn Chiến dịch Đường 14 — Phước Long', detail: 'Quân giải phóng đồng loạt tiến công tiêu diệt các chi khu Bù Đốp, Bù Đăng, mở toang cửa ngõ tiến vào thị xã Phước Long.' },
      { date: '02/01/1975', event: 'Quân giải phóng đánh chiếm đỉnh núi Bà Rá', detail: 'Tiêu diệt đài quan sát và trận địa pháo của địch trên điểm cao khống chế.' },
      { date: '06/01/1975', event: 'Giải phóng hoàn toàn tỉnh Phước Long', detail: 'Lá cờ Mặt trận Dân tộc Giải phóng tung bay trên Dinh Tỉnh trưởng Phước Long lúc 17 giờ.' },
      { date: '08/01/1975', event: 'Hội nghị Bộ Chính trị hoàn chỉnh kế hoạch giải phóng miền Nam', detail: 'Củng cố quyết tâm giải phóng miền Nam ngay trong mùa Xuân 1975.' },
    ],
    didYouKnow: [
      'Phước Long là tỉnh lỵ đầu tiên ở miền Nam được giải phóng hoàn toàn trong cuộc kháng chiến chống Mỹ.',
      'Tổng Bí thư Lê Duẩn và Bộ Chính trị theo dõi sát sao từng giờ diễn biến trận đánh Phước Long tại Hà Nội.',
      'Chiến dịch đã phá tan tuyến phòng thủ phía bắc Sài Gòn của quân đội ngụy quyền.',
    ],
    glossary: [
      { term: 'Đòn trinh sát chiến lược', definition: 'Trận đánh quy mô lớn nhằm thăm dò sức mạnh phòng thủ của địch và phản ứng của Mỹ.' },
      { term: 'Đường 14', definition: 'Tuyến quốc lộ huyết mạch nối liền Tây Nguyên với vùng Đông Nam Bộ và Sài Gòn.' },
      { term: 'Tỉnh lỵ giải phóng đầu tiên', definition: 'Danh hiệu lịch sử của Phước Long khi sạch bóng quân thù ngày 06/01/1975.' },
    ],
    flashcards: [
      { front: 'Tỉnh đầu tiên ở miền Nam được giải phóng hoàn toàn là tỉnh nào?', back: 'Tỉnh Phước Long (ngày 06/01/1975).' },
      { front: 'Vì sao Chiến thắng Phước Long được gọi là đòn trinh sát chiến lược?', back: 'Vì chứng minh quân ngụy bất lực và Mỹ không thể can thiệp trở lại, củng cố quyết tâm giải phóng miền Nam.' },
      { front: 'Chiến dịch Đường 14 – Phước Long diễn ra trong bao lâu?', back: 'Từ ngày 13/12/1974 đến ngày 06/01/1975 (25 ngày đêm).' },
    ],
    openQuestions: [
      'Phân tích ý nghĩa của Chiến thắng Phước Long đối với quyết định mở Chiến dịch Hồ Chí Minh?',
      'Yếu tố nào tạo nên thắng lợi thần tốc của quân và dân ta trong chiến dịch?',
    ],
    quiz: [
      {
        question: 'Phước Long được giải phóng hoàn toàn vào ngày tháng năm nào?',
        options: ['13/12/1974', '02/01/1975', '06/01/1975', '30/04/1975'],
        correct: 2,
        explanation: 'Ngày 06/01/1975, Phước Long trở thành tỉnh đầu tiên ở miền Nam được giải phóng hoàn toàn.',
      },
      {
        question: 'Ý nghĩa quân sự chiến lược lớn nhất của Chiến thắng Phước Long là gì?',
        options: ['Thu giữ nhiều vàng bạc', 'Là "đòn trinh sát chiến lược" chứng minh ngụy suy sụp và Mỹ không thể can thiệp trở lại', 'Ký kết ngừng bắn tạm thời', 'Đổi tên thị xã'],
        correct: 1,
        explanation: 'Chiến thắng Phước Long là căn cứ thực tiễn quyết định để Bộ Chính trị hạ quyết tâm mở Tổng tiến công mùa Xuân 1975.',
      },
      {
        question: 'Chiến dịch Đường 14 – Phước Long kéo dài trong bao nhiêu ngày đêm?',
        options: ['7 ngày đêm', '15 ngày đêm', '25 ngày đêm', '60 ngày đêm'],
        correct: 2,
        explanation: 'Chiến dịch diễn ra trong 25 ngày đêm từ 13/12/1974 đến 06/01/1975.',
      },
      {
        question: 'Cứ điểm then chốt trên cao bị quân ta tiêu diệt ngày 02/01/1975 là cứ điểm nào?',
        options: ['Đỉnh núi Bà Rá', 'Cảng Sài Gòn', 'Sân bay Phù Cát', 'Núi Cấm'],
        correct: 0,
        explanation: 'Làm chủ đỉnh núi Bà Rá ngày 02/01/1975 đã giúp quân ta khống chế hỏa lực toàn bộ thị xã Phước Long.',
      },
      {
        question: 'Sau chiến thắng Phước Long, Bộ Chính trị đã đưa ra quyết sách lịch sử nào?',
        options: ['Rút quân về phòng ngự', 'Quyết tâm giải phóng hoàn toàn miền Nam ngay trong năm 1975', 'Đàm phán hòa bình vô điều kiện', 'Chờ đợi viện trợ mới'],
        correct: 1,
        explanation: 'Bộ Chính trị nhận định thời cơ lịch sử đã chín muồi để giải phóng hoàn toàn miền Nam trong năm 1975.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn (100–200 chữ) giải thích vì sao Chiến thắng Phước Long được coi là tiếng pháo mở màn cho Đại thắng mùa Xuân 1975.',
      hint: 'Gợi ý: sự suy sụp của quân ngụy Sài Gòn, phản ứng bất lực của đế quốc Mỹ và sự nhạy bén chớp thời cơ của Trung ương Đảng.',
    },
    relatedPlaces: [
      { name: 'Núi Bà Rá', desc: 'Cứ điểm phòng thủ then chốt của địch bị tiêu diệt trong chiến dịch.' },
      { name: 'Bảo Tàng Chiến Dịch Đường 14 – Phước Long', desc: 'Nơi lưu giữ toàn bộ tư liệu, hiện vật của chiến dịch lịch sử.' },
    ],
    references: [
      { title: 'Chiến dịch Đường 14 – Phước Long: Tầm nhìn và ý nghĩa chiến lược', source: 'Viện Lịch sử Quân sự Việt Nam' },
    ],
    nextSteps: [
      { title: 'Căn Cứ Tà Thiết — Đầu Não Bộ Chỉ Huy Miền', lessonId: 'can-cu-ta-thiet', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
    ],
  },

  'can-cu-ta-thiet': {
    id: 'can-cu-ta-thiet',
    title: 'Căn Cứ Tà Thiết — Đầu Não Bộ Chỉ Huy Miền',
    subject: 'Di tích quốc gia đặc biệt',
    xpReward: 90,
    estimatedMinutes: 14,
    tldr: 'Căn cứ Tà Thiết (xã Lộc Thành, Lộc Ninh) là căn cứ cuối cùng của Bộ Chỉ huy Miền giai đoạn 1973–1975. Nơi đây được mệnh danh là "Rừng Chính phủ", nơi hoạch định và chỉ đạo Chiến dịch Hồ Chí Minh lịch sử.',
    coreKnowledge: {
      text: `<p>Nằm ẩn mình dưới tán rừng già nguyên sinh tại xã Lộc Thành, huyện Lộc Ninh, <strong>Căn cứ Tà Thiết</strong> là Di tích quốc gia đặc biệt, cơ quan đầu não của Bộ Tư lệnh Quân giải phóng miền Nam Việt Nam (Bộ Tư lệnh Miền) từ năm 1973 đến ngày toàn thắng 1975.</p>
      <p>Được cán bộ chiến sĩ gọi bằng cái tên thân mật <em>"Rừng Chính phủ"</em>, Tà Thiết quy tụ các đồng chí lãnh đạo cao cấp như Đại tướng Trần Văn Trà, Bí thư Phạm Hùng, Thượng tướng Trần Nam Trung... Hệ thống công trình được xây dựng theo kiểu <strong>nhà bán âm</strong> nửa chìm nửa nổi lợp lá trung quân, thông suốt với mạng lưới giao thông hào bí mật.</p>
      <p>Chính tại căn cứ Tà Thiết, Bộ Chỉ huy Chiến dịch Giải phóng Sài Gòn – Gia Định (sau được Chủ tịch nước tôn vinh mang tên <strong>Chiến dịch Hồ Chí Minh</strong>) đã được thành lập và hoàn chỉnh kế hoạch tác chiến đưa cuộc kháng chiến đến ngày toàn thắng 30/4/1975.</p>`,
      images: [
        { url: '/images/heritage/img-disanbudang/can-cu-ta-thiet.jpg', caption: 'Nhà làm việc bán âm của Bộ Chỉ huy Miền phục dựng tại Căn cứ Tà Thiết' },
      ],
    },
    timeline: [
      { date: '1973', event: 'Bộ Chỉ huy Miền dời về căn cứ Tà Thiết', detail: 'Sau Hiệp định Paris, Tà Thiết được chọn làm đại bản doanh trung tâm chỉ huy cách mạng miền Nam.' },
      { date: '04/1975', event: 'Thành lập Bộ Chỉ huy Chiến dịch Hồ Chí Minh', detail: 'Đại tướng Văn Tiến Dũng, đồng chí Phạm Hùng, Đại tướng Trần Văn Trà họp bàn kế hoạch tác chiến giải phóng Sài Gòn.' },
      { date: '30/04/1975', event: 'Đại thắng mùa Xuân 1975', detail: 'Mệnh lệnh tổng tiến công phát đi từ căn cứ đưa non sông liền một dải.' },
      { date: 'Nay', event: 'Di tích quốc gia đặc biệt', detail: 'Địa chỉ đỏ đón hàng vạn du khách, cựu chiến binh và thế hệ trẻ hành hương về nguồn.' },
    ],
    didYouKnow: [
      'Lá trung quân dùng lợp mái nhà bán âm có đặc tính kỳ diệu là không bắt lửa bom pháo.',
      'Hệ thống hầm Tà Thiết có hầm hội trường lớn chứa được hàng trăm cán bộ hội họp an toàn dưới bom đạn.',
      'Đại tướng Văn Tiến Dũng đã trực tiếp từ Hà Nội vào Tà Thiết để cùng Bộ Tư lệnh Miền chỉ huy chiến dịch.',
    ],
    glossary: [
      { term: 'Bộ Tư lệnh Miền', definition: 'Cơ quan chỉ huy quân sự tối cao của Quân giải phóng miền Nam Việt Nam.' },
      { term: 'Nhà bán âm', definition: 'Kiểu nhà khoét sâu 1-1.5m dưới lòng đất, nửa trên khung gỗ lợp lá trung quân chống mảnh pháo.' },
      { term: 'Lá trung quân', definition: 'Loại lá cây rừng dẻo dai khó cháy được dùng lợp mái công sự thời kháng chiến.' },
    ],
    flashcards: [
      { front: 'Căn cứ Tà Thiết được cán bộ chiến sĩ gọi bằng tên thân mật gì?', back: '"Rừng Chính phủ".' },
      { front: 'Sự kiện quân sự vĩ đại nào được thành lập và chỉ đạo tại Tà Thiết?', back: 'Bộ Chỉ huy Chiến dịch Hồ Chí Minh lịch sử giải phóng miền Nam năm 1975.' },
      { front: 'Căn cứ Tà Thiết được xếp hạng di tích cấp nào?', back: 'Di tích lịch sử cấp quốc gia đặc biệt.' },
    ],
    openQuestions: [
      'Nghệ thuật ngụy trang và tổ chức căn cứ Tà Thiết thể hiện tài năng quân sự nào của cha anh?',
      'Căn cứ Tà Thiết có ý nghĩa như thế nào trong hệ thống di tích cách mạng miền Đông?',
    ],
    quiz: [
      {
        question: 'Căn cứ Tà Thiết từng giữ vai trò đầu não gì trong giai đoạn 1973 - 1975?',
        options: ['Bộ Tư lệnh Quân giải phóng miền Nam Việt Nam (Bộ Chỉ huy Miền)', 'Trường đào tạo y tế', 'Kho tiếp liệu hải quân', 'Trụ sở ngoại giao quốc tế'],
        correct: 0,
        explanation: 'Tà Thiết là cơ quan đầu não chỉ đạo toàn bộ các hoạt động quân sự, chính trị chiến trường miền Nam giai đoạn 1973-1975.',
      },
      {
        question: 'Tên gọi dân dã của Căn cứ Tà Thiết là gì?',
        options: ['Rừng Cao Su', '"Rừng Chính phủ"', 'Căn cứ Ba Đình', 'Khu Rừng Đỏ'],
        correct: 1,
        explanation: 'Căn cứ được gọi là "Rừng Chính phủ" vì là nơi làm việc của các cơ quan đầu não cách mạng cao nhất ở miền Nam.',
      },
      {
        question: 'Kế hoạch tác chiến của chiến dịch lịch sử nào được hoàn chỉnh tại Tà Thiết?',
        options: ['Chiến dịch Điện Biên Phủ', 'Chiến dịch Hồ Chí Minh lịch sử năm 1975', 'Chiến dịch Biên Giới', 'Chiến dịch Việt Bắc'],
        correct: 1,
        explanation: 'Tại đây, Bộ Chỉ huy Miền đã hoàn thành kế hoạch tác chiến chi tiết của Chiến dịch Hồ Chí Minh giải phóng Sài Gòn.',
      },
      {
        question: 'Căn cứ Tà Thiết được xếp hạng là di tích cấp nào?',
        options: ['Di tích cấp huyện', 'Di tích lịch sử quốc gia đặc biệt', 'Danh thắng cấp tỉnh', 'Công trình kiến trúc hiện đại'],
        correct: 1,
        explanation: 'Căn cứ Tà Thiết đã được Thủ tướng Chính phủ xếp hạng là Di tích lịch sử quốc gia đặc biệt.',
      },
      {
        question: 'Kiến trúc nhà làm việc đặc trưng tại Tà Thiết là kiểu nhà gì?',
        options: ['Nhà bán âm nửa chìm nửa nổi lợp lá trung quân', 'Nhà cao tầng bê tông', 'Nhà sàn gỗ trên suối', 'Hầm đá tự nhiên'],
        correct: 0,
        explanation: 'Kiểu nhà bán âm chìm nửa thân dưới đất, lợp lá trung quân không cháy, đảm bảo bí mật và che chắn pháo kích.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) nêu cảm nghĩ của bạn về trí tuệ và bản lĩnh của Bộ Tư lệnh Miền tại Căn cứ Tà Thiết trong những ngày tháng Tư lịch sử năm 1975.',
      hint: 'Gợi ý: điều kiện sinh hoạt giản dị giữa rừng già nhưng đưa ra những quyết sách mang tầm vóc thời đại giải phóng đất nước.',
    },
    relatedPlaces: [
      { name: 'Nhà Giao Tế Lộc Ninh', desc: 'Trụ sở ngoại giao của Chính phủ Cách mạng lâm thời tại Lộc Ninh.' },
      { name: 'Chiến Khu Đ', desc: 'Hệ thống căn cứ địa cách mạng miền Đông Nam Bộ.' },
    ],
    references: [
      { title: 'Bộ Tư lệnh Miền và Căn cứ Tà Thiết', source: 'NXB Quân đội Nhân dân' },
    ],
    nextSteps: [
      { title: 'Chiến Khu Đ — Căn Cứ Địa Cách Mạng', lessonId: 'chien-khu-d', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
    ],
  },

  'tho-cam-stieng': {
    id: 'tho-cam-stieng',
    title: 'Nghệ Thuật Dệt Thổ Cẩm S\'tiêng — Tinh Hoa Bản Địa',
    subject: 'Văn hóa & Nghệ thuật',
    xpReward: 75,
    estimatedMinutes: 10,
    tldr: 'Dệt thổ cẩm là di sản văn hóa phi vật thể đặc sắc của người S\'tiêng Bù Đăng, nổi bật với kỹ thuật nhuộm màu thảo mộc thiên nhiên và họa tiết hình thoi quả trám Sơk Pơng tượng trưng cho hạt thóc no ấm.',
    coreKnowledge: {
      text: `<p>Nghề dệt thổ cẩm cổ truyền là biểu tượng rực rỡ nhất cho sự khéo léo, cần cù và óc thẩm mỹ của người phụ nữ dân tộc S'tiêng tại huyện Bù Đăng.</p>
      <p>Điểm độc đáo bậc nhất của thổ cẩm S'tiêng nằm ở <strong>nghệ thuật nhuộm màu tự nhiên</strong> hoàn toàn từ thảo mộc: màu đen lấy từ vỏ cây Krông ngâm bùn suối, màu đỏ từ củ nghệ đỏ pha me rừng, màu chàm từ lá chàm ven suối. Khung dệt là loại khung dệt ngang luồn chỉ bằng đai buộc lưng (backstrap loom).</p>
      <p>Họa tiết phổ biến nhất là <strong>Sơk Pơng (hình thoi quả trám)</strong> tượng trưng cho hạt lúa, hạt ngô no ấm, kết hợp hình chim rừng, dòng suối và con người, tạo nên một bản trường ca thị giác đậm chất đại ngàn.</p>`,
      images: [
        { url: '/images/heritage/det-tho-cam-stieng.png', caption: 'Nghệ nhân S\'tiêng miệt mài bên khung dệt thổ cẩm cổ truyền' },
      ],
    },
    timeline: [
      { date: 'Từ xa xưa', event: 'Nghề dệt hình thành và trao truyền', detail: 'Trao truyền từ đời này sang đời khác theo chế độ mẫu hệ mẹ truyền con nối.' },
      { date: 'Thời kháng chiến', event: 'Dệt vải may chăn áo nuôi quân', detail: 'Phụ nữ S\'tiêng dệt chăn ấm, tấm đắp gửi tặng bộ đội chiến sĩ trên chiến trường.' },
      { date: 'Nay', event: 'Phục hồi và bảo tồn di sản', detail: 'Thành lập các hợp tác xã, câu lạc bộ dệt thổ cẩm truyền thống tại Bù Đăng.' },
    ],
    didYouKnow: [
      'Vải dệt thổ cẩm S\'tiêng nhuộm màu tự nhiên có thể giữ màu tươi tắn qua 30-40 năm không phai.',
      'Mỗi cô gái S\'tiêng khi về nhà chồng đều phải tự tay dệt một tấm chăn thổ cẩm tặng mẹ chồng.',
      'Tấm vải dệt thổ cẩm không có mặt trái — hai mặt hoa văn đều tinh xảo như nhau.',
    ],
    glossary: [
      { term: 'Sơk Pơng', definition: 'Họa tiết hình thoi quả trám tượng trưng cho hạt gạo no ấm trên thổ cẩm S\'tiêng.' },
      { term: 'Vỏ cây Krông', definition: 'Loại vỏ cây rừng dùng ngâm bùn tạo ra sắc đen tuyền đặc trưng và bền màu cho chỉ dệt.' },
      { term: 'Khung dệt đai lưng', definition: 'Khung dệt ngang thủ công dùng lực căng cơ thể phụ nữ qua đai quàng ngang hông.' },
    ],
    flashcards: [
      { front: 'Màu đen trên thổ cẩm S\'tiêng được nhuộm từ nguyên liệu gì?', back: 'Vỏ cây Krông ngâm bùn suối tự nhiên.' },
      { front: 'Họa tiết hình thoi Sơk Pơng tượng trưng cho điều gì?', back: 'Hạt thóc, hạt ngô no ấm và ước vọng mùa màng bội thu.' },
      { front: 'Ba gam màu chủ đạo trên thổ cẩm S\'tiêng là gì?', back: 'Màu đen (chàm), màu đỏ và màu vàng đất.' },
    ],
    openQuestions: [
      'Làm thế nào để bảo tồn và thương mại hóa sản phẩm thổ cẩm S\'tiêng giúp bà con nâng cao thu nhập?',
      'Hoa văn thổ cẩm phản ánh mối quan hệ giữa con người với thiên nhiên như thế nào?',
    ],
    quiz: [
      {
        question: 'Nguyên liệu nào được dùng để nhuộm màu đen bền bỉ trên thổ cẩm S\'tiêng?',
        options: ['Phẩm nhuộm hóa học', 'Vỏ cây Krông ngâm bùn suối tự nhiên', 'Mực viết học sinh', 'Sơn dầu'],
        correct: 1,
        explanation: 'Vỏ cây Krông giã nát ngâm bùn suối tạo màu đen tuyền tự nhiên cực kỳ bền màu qua hàng chục năm.',
      },
      {
        question: 'Họa tiết hình thoi quả trám (Sơk Pơng) tượng trưng cho điều gì?',
        options: ['Vệt sét đánh', 'Hạt thóc, hạt bắp no ấm và ước vọng mùa màng bội thu', 'Vảy cá suối', 'Dấu chân chim'],
        correct: 1,
        explanation: 'Sơk Pơng biểu trưng cho hạt thóc no ấm, thể hiện khát vọng muôn đời về cuộc sống ấm no.',
      },
      {
        question: 'Khung dệt thủ công của người S\'tiêng hoạt động theo cơ chế nào?',
        options: ['Khung cửi máy dệt tự động', 'Khung dệt ngang luồn chỉ cố định bằng đai buộc lưng (backstrap loom)', 'Khung dệt quay tay đứng', 'Khung dệt nổi trên nước'],
        correct: 1,
        explanation: 'Nghệ nhân dùng lực kéo căng của cơ thể qua chiếc đai quàng ngang lưng để giữ thăng bằng sợi chỉ khi dệt.',
      },
      {
        question: 'Ba gam màu chủ đạo trên trang phục thổ cẩm S\'tiêng là gì?',
        options: ['Hồng, tím, lục', 'Đen (chàm), đỏ và vàng đất', 'Xanh lam, cam, trắng', 'Xám, nâu, bạc'],
        correct: 1,
        explanation: 'Màu đen tượng trưng cho đất rừng, màu đỏ là ngọn lửa nhiệt huyết và màu vàng là ánh mặt trời.',
      },
      {
        question: 'Ý nghĩa của việc cô dâu tự tay dệt tấm thổ cẩm tặng mẹ chồng trong lễ cưới là gì?',
        options: ['Thể hiện sự giàu có tiền bạc', 'Khẳng định sự khéo léo, siêng năng và phẩm hạnh người phụ nữ', 'Chỉ là thủ tục hành chính', 'Để mẹ chồng bán lấy tiền'],
        correct: 1,
        explanation: 'Tấm chăn thổ cẩm dệt tay là sính lễ quý khẳng định phẩm hạnh, sự siêng năng và bàn tay tài hoa của nàng dâu.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) đề xuất ý tưởng ứng dụng họa tiết thổ cẩm S\'tiêng vào các sản phẩm thời trang và quà lưu niệm du lịch hiện đại.',
      hint: 'Gợi ý: ví, túi xách, khăn quàng, ốp điện thoại kết hợp họa tiết Sơk Pơng tạo nét độc đáo cho du khách.',
    },
    relatedPlaces: [
      { name: 'Khu Bảo Tồn Sóc Bom Bo', desc: 'Địa chỉ trải nghiệm và trưng bày sản phẩm thổ cẩm dệt tay truyền thống.' },
      { name: 'Nhà Dài S\'tiêng Bù Đăng', desc: 'Không gian sinh hoạt nơi phụ nữ S\'tiêng miệt mài bên khung dệt.' },
    ],
    references: [
      { title: 'Văn hóa thổ cẩm các dân tộc thiểu số Bình Phước', source: 'Sở Văn hóa Thể thao và Du lịch' },
    ],
    nextSteps: [
      { title: 'Cồng Chiêng S\'tiêng — Tiếng Nói Của Đại Ngàn', lessonId: 'cong-chieng-stieng', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
    ],
  },

  'thac-dung-dak-wuar': {
    id: 'thac-dung-dak-wuar',
    title: 'Danh Thắng Thác Đứng — Dấu Ấn Địa Chất Cột Bazan',
    subject: 'Địa chất & Danh thắng',
    xpReward: 70,
    estimatedMinutes: 8,
    tldr: 'Thác Đứng trên dòng suối Đăk Wuar (xã Đoàn Kết, Bù Đăng) là kỳ quan địa chất hiếm có với vách đá bazan cột lục lăng thẳng đứng, tạo nên bức tường nước ngoạn mục giữa rừng xanh.',
    coreKnowledge: {
      text: `<p>Tọa lạc tại địa phận xã Đoàn Kết, huyện Bù Đăng, <strong>Thác Đứng</strong> là một trong những danh lam thắng cảnh thiên nhiên độc đáo bậc nhất miền Đông Nam Bộ.</p>
      <p>Thác chắn ngang dòng suối Đăk Wuar trong lành. Điểm đặc sắc tạo nên giá trị khoa học và thẩm mỹ của thác chính là <strong>vách đá bazan dạng cột lục lăng</strong> dựng đứng thẳng tắp — kết quả của quá trình dung nham núi lửa nguội đông co ngót từ hàng triệu năm trước, tương tự kiến tạo Ghềnh Đá Đĩa.</p>
      <p>Vào mùa mưa, dòng nước trải rộng hàng chục mét đổ ầm ào bọt trắng xóa; mùa khô suối trong vắt lộ rõ những phiến đá lục giác xếp tầng kỳ thú dưới bóng mát rừng le xanh rì rào.</p>`,
      images: [
        { url: '/images/heritage/danh-thang/thac-dung-lg.webp', caption: 'Vách đá bazan cột lục lăng kỳ vĩ tại Thác Đứng xã Đoàn Kết' },
      ],
    },
    timeline: [
      { date: 'Hàng triệu năm trước', event: 'Hoạt động núi lửa bazan nguội đông', detail: 'Dung nham núi lửa cổ nguội đông co ngót tạo nên cấu trúc cột lục giác thẳng đứng ngoạn mục.' },
      { date: 'Lâu đời', event: 'Địa danh sinh hoạt của đồng bào bản địa', detail: 'Đồng bào S\'tiêng đặt tên suối Đăk Wuar và gắn liền sinh kế đánh bắt với dòng thác.' },
      { date: 'Nay', event: 'Quy hoạch bảo tồn danh thắng địa chất', detail: 'Điểm du lịch dã ngoại sinh thái nổi bật thu hút các nhà nghiên cứu địa chất và du khách.' },
    ],
    didYouKnow: [
      'Thác Đứng cao khoảng 4-6m nhưng trải rộng hàng chục mét như một bức tường thành nước.',
      'Cấu tạo cột bazan lục giác ở Thác Đứng có cùng nguồn gốc địa chất với các di sản núi lửa Nam Bộ.',
      'Suối Đăk Wuar là nguồn cung cấp nước và thủy sản quan trọng cho các buôn sóc xã Đoàn Kết.',
    ],
    glossary: [
      { term: 'Đá bazan dạng cột', definition: 'Cấu tạo đá mắc-ma nguội đông từ từ tạo thành các cột trụ hình lăng trụ 5-6 cạnh thẳng đứng.' },
      { term: 'Suối Đăk Wuar', definition: 'Dòng suối tự nhiên tại huyện Bù Đăng nơi tạo nên danh thắng Thác Đứng.' },
      { term: 'Thác Đứng', definition: 'Tên gọi xuất phát từ dòng nước đổ vuông góc thẳng đứng từ vách cột đá bazan.' },
    ],
    flashcards: [
      { front: 'Thác Đứng nằm trên dòng suối nào?', back: 'Suối Đăk Wuar (xã Đoàn Kết, huyện Bù Đăng).' },
      { front: 'Cấu tạo địa chất độc đáo của Thác Đứng là gì?', back: 'Vách đá bazan dạng cột lục lăng xếp khít thẳng đứng do núi lửa cổ.' },
      { front: 'Đặc điểm hình thế dòng nước Thác Đứng là gì?', back: 'Thác cao khoảng 4-6m nhưng trải rộng hàng chục mét đổ thẳng đứng vuông góc.' },
    ],
    openQuestions: [
      'Vì sao việc nghiên cứu địa chất tại Thác Đứng lại có ý nghĩa với môn Địa lý địa phương?',
      'Những giải pháp nào giúp giữ gìn vẻ đẹp hoang sơ của Thác Đứng khi đón khách du lịch?',
    ],
    quiz: [
      {
        question: 'Thác Đứng nằm chắn ngang dòng suối tự nhiên nào?',
        options: ['Sông Bé', 'Suối Đăk Wuar', 'Suối Bom Bo', 'Sông Đồng Nai'],
        correct: 1,
        explanation: 'Thác Đứng nằm trên dòng suối Đăk Wuar thuộc địa phận xã Đoàn Kết, huyện Bù Đăng.',
      },
      {
        question: 'Cấu tạo vách đá của Thác Đứng có dạng địa chất đặc biệt nào?',
        options: ['Hang động đá vôi', 'Đá bazan dạng cột lục lăng thẳng đứng do núi lửa nguội đông', 'Đá sa thạch cát kết', 'Đá phiến sét'],
        correct: 1,
        explanation: 'Các cột đá bazan hình lục giác xếp khít nhau tạo thành vách tường đá thẳng đứng kỳ vĩ.',
      },
      {
        question: 'Vì sao thác lại mang tên là "Thác Đứng"?',
        options: ['Vì dòng nước đổ vuông góc thẳng đứng từ vách đá cột sừng sững', 'Vì chỉ được đứng ngắm thác', 'Vì thác ở trên đỉnh núi đứng', 'Theo tên một vị anh hùng'],
        correct: 0,
        explanation: 'Tên gọi Thác Đứng xuất phát từ dòng nước đổ vuông góc thẳng đứng từ vách cột đá bazan dựng đứng.',
      },
      {
        question: 'Chiều cao và bề rộng của Thác Đứng có đặc điểm gì?',
        options: ['Cao 100m, hẹp 1m', 'Cao khoảng 4-6m nhưng trải rộng hàng chục mét như bức tường thành', 'Thác chảy ngầm dưới lòng đất', 'Chỉ có nước vào ban đêm'],
        correct: 1,
        explanation: 'Thác Đứng cao chừng 4-6m nhưng vách thác trải dài hàng chục mét tạo nên màn bọt nước trắng xóa kỳ vĩ.',
      },
      {
        question: 'Vẻ đẹp của Thác Đứng vào mùa khô có nét độc đáo nào?',
        options: ['Suối khô cạn hoàn toàn', 'Nước suối trong vắt nhìn thấu tận đáy, lộ rõ những cột đá bazan xếp tầng tuyệt mỹ', 'Rừng cây héo rụng hết lá', 'Thác bị đóng băng'],
        correct: 1,
        explanation: 'Mùa khô dòng nước êm đềm trong xanh, để lộ toàn bộ cấu trúc đá bazan cột lục giác ngoạn mục.',
      },
    ],
    essay: {
      prompt: 'Hãy viết đoạn văn ngắn (100–200 chữ) miêu tả vẻ đẹp của Thác Đứng và đề xuất các biện pháp bảo vệ dòng suối Đăk Wuar khỏi ô nhiễm rác thải du lịch.',
      hint: 'Gợi ý: cảnh quan thiên nhiên hoang sơ, giá trị địa chất quý báu, quy định không xả rác và dọn vệ sinh sau khi cắm trại.',
    },
    relatedPlaces: [
      { name: 'Trảng Cỏ Bù Lạch', desc: 'Danh thắng thảo nguyên xanh cách Thác Đứng không xa.' },
      { name: 'Rừng Nguyên Sinh Bù Đăng', desc: 'Vành đai sinh thái bao bọc thượng nguồn suối Đăk Wuar.' },
    ],
    references: [
      { title: 'Địa chất và Danh thắng Bình Phước', source: 'Sở Tài nguyên và Môi trường' },
    ],
    nextSteps: [
      { title: 'Danh Thắng Trảng Cỏ Bù Lạch — Kỳ Quan Thiên Nhiên', lessonId: 'trang-co-bu-lach', type: 'lesson' },
      { title: 'Khám phá bản đồ di sản Bù Đăng', type: 'map' },
    ],
  },
}

const lesson = computed(() => lessons[id.value] ?? null)

useBreadcrumb(() => lesson.value?.title || '')

// SEO
watchEffect(() => {
  if (lesson.value) {
    useMuseumSeo({
      title: `${lesson.value.title} - Học Tập`,
      description: lesson.value.tldr,
      path: `/study/lesson/${lesson.value.id}`,
      type: 'article',
    })
  }
})

// Reading progress tracker
const mainRef = ref<HTMLElement | null>(null)
const readProgress = ref(0)

function updateReadProgress() {
  if (!mainRef.value || !import.meta.client) return
  const el = mainRef.value
  const rect = el.getBoundingClientRect()
  const scrolled = Math.max(0, -rect.top)
  const total = el.offsetHeight - window.innerHeight
  readProgress.value = total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 100
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', updateReadProgress, { passive: true })
    updateReadProgress()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('scroll', updateReadProgress)
})

// TOC — sections that exist in the lesson
const toc = computed(() => {
  if (!lesson.value) return []
  const l = lesson.value
  return [
    { id: 'core-heading', label: 'Kiến thức trọng tâm', available: true },
    { id: 'hotspot', label: 'Ảnh chú thích', available: !!l.hotspotImage },
    { id: 'timeline', label: 'Dòng thời gian', available: !!(l.timeline?.length) },
    { id: 'did-you-know', label: 'Bạn có biết?', available: !!(l.didYouKnow?.length) },
    { id: 'glossary', label: 'Thuật ngữ', available: !!(l.glossary?.length) },
    { id: 'flashcards', label: 'Flashcards', available: !!(l.flashcards?.length) },
    { id: 'quiz', label: 'Trắc nghiệm', available: !!(l.quiz?.length) },
    { id: 'essay', label: 'Tự luận', available: !!l.essay },
    { id: 'next-steps', label: 'Bước tiếp theo', available: true },
  ]
})
</script>
