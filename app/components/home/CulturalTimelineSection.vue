<template>
  <section class="section bg-forest-deep relative overflow-hidden text-ivory border-b border-charcoal-800">
    <div class="absolute inset-0 bg-noise opacity-30" />
    <div class="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-transparent to-charcoal-900/50" />

    <div class="container-heritage relative z-10">
      <div class="mb-12 max-w-3xl reveal">
        <span class="section-label text-gold-400">Dòng Thời Gian Văn Hóa</span>
        <h2 class="section-title text-ivory">Dòng Chảy Lịch Sử & Bản Sắc Đồng Nai</h2>
        <p class="section-desc text-charcoal-300">Nhấp chọn từng thời kỳ để khám phá chiều sâu lịch sử, từ thuở sơ khai kiến tạo buôn làng đến kỷ nguyên số hóa di sản.</p>
      </div>

      <!-- Timeline Interactive Navigation with scroll hint -->
      <div class="relative mb-10 reveal">
        <div class="flex flex-nowrap border-b border-charcoal-800 overflow-x-auto scrollbar-none gap-2 pb-1">
          <button
            v-for="(item, index) in timeline"
            :key="item.year"
            class="flex-1 min-w-[180px] text-left px-5 py-5 border-t-2 transition-all duration-300 relative group"
            :class="[
              activeIndex === index
                ? 'border-gold-500 bg-gold-500/5 text-ivory'
                : 'border-transparent text-charcoal-400 hover:text-ivory hover:bg-charcoal-800/20'
            ]"
            @click="activeIndex = index"
          >
            <p class="eyebrow text-2xs mb-1 group-hover:text-gold-300" :class="activeIndex === index ? 'text-gold-400' : 'text-charcoal-400'">Kỷ Nguyên {{ index + 1 }}</p>
            <h4 class="font-heading font-bold text-lg leading-snug mb-1" :class="activeIndex === index ? 'text-gold-400' : 'text-ivory/80'">
              {{ item.year }}
            </h4>
            <p class="text-xs text-charcoal-500 line-clamp-1 mt-1">{{ item.title }}</p>
            <!-- Active indicator dot -->
            <div v-if="activeIndex === index" class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-gold-500 border-2 border-charcoal-900 z-10" />
          </button>
        </div>
        <!-- Scroll hint gradient for mobile -->
        <div class="lg:hidden absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-forest-deep to-transparent pointer-events-none" />
      </div>

      <!-- Active Content Card -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal">
        <!-- Text details -->
        <div class="lg:col-span-7 flex flex-col justify-between p-8 bg-charcoal-900/80 backdrop-blur-xl border border-charcoal-800 rounded-3xl relative overflow-hidden">
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span class="tag tag-gold">Mốc thời gian</span>
              <span class="text-gold-400 font-heading text-lg font-semibold">{{ activeEra.year }}</span>
            </div>
            <h3 class="font-heading font-bold text-2xl lg:text-3xl text-ivory">
              {{ activeEra.title }}
            </h3>
            <p class="text-charcoal-300 leading-relaxed text-base">
              {{ activeEra.description }}
            </p>
            <div class="border-l-2 border-gold-500/50 pl-4 py-1 bg-gold-500/5 rounded-r-xl">
              <p class="font-accent italic text-gold-300 text-lg leading-relaxed">
                "{{ activeEra.quote }}"
              </p>
              <p class="text-xs text-charcoal-500 mt-1.5">— Ký ức địa phương</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-charcoal-800">
            <div>
              <p class="text-2xs text-charcoal-500 uppercase tracking-widest font-semibold">Hiện vật / Sự kiện</p>
              <p class="text-sm font-medium text-ivory mt-1">{{ activeEra.artifact }}</p>
            </div>
            <div>
              <p class="text-2xs text-charcoal-500 uppercase tracking-widest font-semibold">Di sản liên đới</p>
              <p class="text-sm font-medium text-gold-400 mt-1">{{ activeEra.related }}</p>
            </div>
          </div>
        </div>

        <!-- Image preview card -->
        <div class="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[300px] border border-charcoal-800 group">
          <NuxtImg
            :src="activeEra.image"
            :alt="activeEra.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] ease-out-expo scale-105 group-hover:scale-100"
            :key="activeIndex"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
          <div class="absolute bottom-6 left-6 right-6 z-10">
            <p class="eyebrow text-gold-400 text-3xs">Chụp tại Thành Phố Đồng Nai</p>
            <h4 class="font-heading font-bold text-ivory text-lg mt-1">{{ activeEra.imageTitle }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeIndex = ref(0)

const timeline = [
  {
    year: 'Trước 1945',
    title: 'Buôn làng và rừng thiêng',
    description: 'Không gian cư trú lâu đời của đồng bào S\'tiêng, M\'nông hình thành gắn liền với cồng chiêng Tây Nguyên, các nếp nhà dài cổ truyền, lễ hội mừng lúa mới và tri thức khai thác lâm sản tự nhiên bền vững.',
    quote: 'Tiếng cồng chiêng sinh ra từ núi rừng, là tiếng lòng dâng lên Yang cầu mong nương rẫy xanh tốt.',
    artifact: 'Trống cổ & Cồng Chiêng quý',
    related: 'Nhà Dài S\'tiêng, Thác Mơ',
    image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    imageTitle: 'Không gian lễ hội văn hóa cồng chiêng',
  },
  {
    year: '1945–1975',
    title: 'Rừng thành căn cứ oai hùng',
    description: 'Đại ngàn miền Đông Nam Bộ trở thành chiếc nôi che chở lực lượng cách mạng. Ký ức Chiến Khu Đ khắc sâu lòng yêu nước nồng nàn của đồng bào thiểu số, cùng những lớp học kháng chiến dưới tán cây rừng bất khuất.',
    quote: 'Mỗi gốc cây là một người lính, mỗi buôn làng là một pháo đài nuôi giấu bộ đội.',
    artifact: 'Bia di tích Chiến Khu Đ',
    related: 'Chiến Khu Đ, Nhà Giáo Kháng Chiến',
    image: '/images/heritage/danh-thang/rung-nguyen-sinh-md.webp',
    imageTitle: 'Tán rừng nguyên sinh Chiến Khu Đ oai hùng',
  },
  {
    year: '1975–2024',
    title: 'Phục hồi & Trao truyền',
    description: 'Sau ngày hòa bình lập lại, các thế hệ người dân, học sinh địa phương cùng nghệ nhân chung tay gìn giữ cội nguồn. Khôi phục thành công các lễ hội truyền thống, bảo tồn nghề dệt thổ cẩm trứ danh và thúc đẩy phát triển bền vững.',
    quote: 'Khung cửi lách cách vang lên trong nhà dài là dấu chỉ cho thấy bản sắc vẫn luôn tuôn chảy.',
    artifact: 'Khung dệt thổ cẩm thủ công',
    related: 'Làng Dệt Thổ Cẩm S\'tiêng',
    image: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    imageTitle: 'Bàn tay khéo léo của nghệ nhân dệt thổ cẩm',
  },
  {
    year: 'Kỷ nguyên số',
    title: 'Số hóa & Kết nối thế giới',
    description: 'Bản đồ tương tác đa năng, audio guide tự nhiên, mã QR tra cứu di tích và kho lưu trữ số hóa do cộng đồng đóng góp giúp di sản Thành Phố Đồng Nai vươn xa, kết nối thế hệ trẻ trong và ngoài nước.',
    quote: 'Bảo tàng số đưa lịch sử Đồng Nai vượt không gian đến gần hơn với những người con xa xứ và du khách toàn cầu.',
    artifact: 'Bản đồ di sản thông minh',
    related: 'Cổng thông tin Di Sản Bù Đăng',
    image: '/images/heritage/danh-thang/thac-dung-md.webp',
    imageTitle: 'Không gian số hóa danh thắng Thác Mơ',
  },
]

const activeEra = computed(() => (timeline[activeIndex.value] ?? timeline[0])!)

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))
</script>
