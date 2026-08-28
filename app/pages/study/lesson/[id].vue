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
      { title: 'Khám phá bản đồ di sản Đồng Nai', type: 'map' },
      { title: 'Làm bài kiểm tra hiểu biết di sản', type: 'quiz' },
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
