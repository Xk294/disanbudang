<template>
  <div class="bg-charcoal-950 min-h-screen text-ivory">
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="/images/heritage/danh-thang/bu-lach-lg.webp"
          alt="Trảng cỏ Bù Lạch"
          class="w-full h-full object-cover opacity-25"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/70 to-charcoal-950" />
        <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 to-transparent" />
      </div>

      <!-- Glow decorations -->
      <div class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-forest-500/10 rounded-full blur-3xl pointer-events-none" />

      <div class="container-heritage relative z-10 py-24 lg:py-32">
        <div class="max-w-3xl">
          <span class="eyebrow text-gold-400 mb-4 block">CƠ HỘI PHÁT TRIỂN</span>
          <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-shadow-hero text-balance tracking-normal">
            Đầu Tư Vùng<br/>
            <span class="text-gradient-gold">Cao Nguyên Đồng Nai</span>
          </h1>
          <p class="text-charcoal-300 text-lg max-w-xl leading-relaxed mb-8">
            Khám phá tiềm năng kinh tế, hạ tầng và chính sách ưu đãi dành cho các nhà đầu tư tại vùng cao nguyên đất đỏ bazan giàu bản sắc, viên ngọc thiên nhiên và văn hóa của Thành Phố Đồng Nai.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="mailto:nguyenxuankiet294@gmail.com" class="btn-primary">
              <Icon name="mdi:email-outline" class="w-5 h-5" />
              Liên Hệ Đầu Tư
            </a>
            <NuxtLink to="/contact" class="btn-ghost">
              <Icon name="mdi:information-outline" class="w-5 h-5" />
              Tìm Hiểu Thêm
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Stats -->
    <div class="bg-charcoal-900 border-y border-charcoal-800">
      <div class="container-heritage py-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in keyStats" :key="stat.label" class="text-center">
            <Icon :name="stat.icon" class="w-7 h-7 text-gold-400 mx-auto mb-2" />
            <p class="font-heading font-bold text-2xl text-ivory">{{ stat.value }}</p>
            <p class="text-charcoal-400 text-xs uppercase tracking-wide mt-0.5">{{ stat.label }}</p>
          </div>
        </div>
        <p class="text-charcoal-600 text-[10px] text-center mt-4 italic">
          * Số liệu tham chiếu từ tài liệu địa chí — cần xác minh từ cơ quan chức năng trước khi sử dụng cho mục đích đầu tư.
        </p>
      </div>
    </div>

    <!-- Opportunities -->
    <div class="container-heritage py-20">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="eyebrow text-gold-400 mb-3 block">LĨNH VỰC ƯU TIÊN</span>
        <h2 class="font-heading font-bold text-ivory text-3xl lg:text-4xl mb-4">Cơ Hội Đầu Tư Nổi Bật</h2>
        <p class="text-charcoal-300 text-base leading-relaxed">
          Vùng cao nguyên thuộc Thành Phố Đồng Nai mang lợi thế độc đáo: quỹ đất sạch, hệ sinh thái phong phú, văn hóa bản địa đậm sắc và chính sách ưu đãi rõ ràng.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="opp in opportunities"
          :key="opp.id"
          class="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-7 hover:border-gold-500/40 transition-all duration-500 group relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 w-40 h-40 bg-gold-500/0 group-hover:bg-gold-500/5 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />
          <div class="w-14 h-14 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <Icon :name="getIcon(opp.category)" class="w-7 h-7" />
          </div>
          <h3 class="font-heading font-bold text-ivory text-xl mb-3">{{ opp.title }}</h3>
          <p class="text-charcoal-300 text-sm mb-5 leading-relaxed">{{ opp.description }}</p>
          <div class="bg-charcoal-950/60 p-4 rounded-xl border border-charcoal-800 mb-6">
            <p class="text-xs text-gold-400 font-semibold mb-1.5 uppercase tracking-wider">Tiềm năng cốt lõi:</p>
            <p class="text-charcoal-200 text-sm">{{ opp.potential }}</p>
          </div>
          <a :href="'mailto:' + opp.contactEmail" class="btn-outline-gold w-full justify-center text-sm">
            <Icon name="mdi:email-outline" class="w-4 h-4" />
            Liên hệ hợp tác
          </a>
        </div>
      </div>
    </div>

    <!-- Why Invest -->
    <div class="bg-dark-earth border-t border-charcoal-800">
      <div class="container-heritage py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="eyebrow text-forest-400 mb-3 block">LỢI THẾ ĐỊA PHƯƠNG</span>
            <h2 class="font-heading font-bold text-ivory text-3xl lg:text-4xl mb-5">Tại Sao Chọn Vùng Cao Nguyên Thành Phố Đồng Nai?</h2>
            <p class="text-charcoal-300 text-base leading-relaxed mb-8">
              Khu vực cao nguyên đất đỏ bazan thuộc Thành Phố Đồng Nai hội tụ đầy đủ các yếu tố thuận lợi: vị trí chiến lược, tài nguyên thiên nhiên phong phú, cộng đồng bản địa giàu văn hóa và khung pháp lý minh bạch.
            </p>
            <div class="space-y-4">
              <div v-for="adv in advantages" :key="adv.title" class="flex items-start gap-4">
                <div class="w-9 h-9 bg-forest-500/15 border border-forest-500/25 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Icon :name="adv.icon" class="w-5 h-5 text-forest-400" />
                </div>
                <div>
                  <h4 class="font-heading font-semibold text-ivory text-base mb-0.5">{{ adv.title }}</h4>
                  <p class="text-charcoal-400 text-sm leading-relaxed">{{ adv.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="rounded-3xl overflow-hidden aspect-[4/3] border border-charcoal-800 shadow-2xl">
              <img
                src="/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp"
                alt="Tài nguyên thiên nhiên Thành Phố Đồng Nai"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
              <div class="absolute bottom-6 left-6 right-6">
                <p class="text-ivory font-heading font-bold text-lg">Rừng Nguyên Sinh Đồng Nai</p>
                <p class="text-charcoal-300 text-sm">Tài nguyên sinh thái bảo tồn nguyên vẹn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="container-heritage py-16">
      <div class="bg-gradient-to-br from-charcoal-900 to-charcoal-950 border border-gold-500/20 rounded-3xl p-10 text-center relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
        <div class="relative z-10">
          <Icon name="mdi:handshake-outline" class="w-12 h-12 text-gold-400 mx-auto mb-4" />
          <h3 class="font-heading font-bold text-ivory text-2xl lg:text-3xl mb-3">Sẵn Sàng Hợp Tác?</h3>
          <p class="text-charcoal-300 text-base max-w-lg mx-auto mb-7 leading-relaxed">
            Đội ngũ dự án Di Sản Bù Đăng sẵn sàng kết nối bạn với các cơ quan hữu quan và tư vấn cơ hội đầu tư phù hợp.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink to="/contact" class="btn-primary">
              <Icon name="mdi:message-outline" class="w-5 h-5" />
              Gửi Yêu Cầu
            </NuxtLink>
            <a href="mailto:nguyenxuankiet294@gmail.com" class="btn-ghost">
              <Icon name="mdi:email-outline" class="w-5 h-5" />
              nguyenxuankiet294@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InvestmentOpportunity } from '~/types'

definePageMeta({ layout: 'default' })

useMuseumSeo({
  title: 'Đầu Tư Vùng Cao Nguyên Đồng Nai',
  description: 'Thông tin quy hoạch, hạ tầng và các cơ hội đầu tư phát triển kinh tế tại vùng cao nguyên Thành Phố Đồng Nai.'
})

useHead({
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

const keyStats = [
  { icon: 'mdi:pine-tree', value: '68%', label: 'Độ che phủ rừng' },
  { icon: 'mdi:account-group', value: '130.000+', label: 'Dân số' },
  { icon: 'mdi:leaf', value: '500 ha', label: 'Quỹ đất sạch' },
]

const opportunities: InvestmentOpportunity[] = [
  {
    id: 'inv-1',
    title: 'Nông nghiệp Công nghệ cao',
    category: 'agriculture',
    description: 'Quỹ đất đỏ bazan màu mỡ, phù hợp phát triển vùng trồng cây công nghiệp (điều, tiêu, cao su) và trái cây theo chuẩn VietGAP.',
    potential: 'Sẵn sàng quỹ đất sạch 500ha, hạ tầng tưới tiêu đồng bộ.',
    contactEmail: 'nguyenxuankiet294@gmail.com'
  },
  {
    id: 'inv-2',
    title: 'Du lịch Sinh thái & Văn hoá',
    category: 'tourism',
    description: 'Kết hợp vẻ đẹp hùng vĩ của tự nhiên và không gian văn hoá cồng chiêng S\'tiêng để xây dựng resort, khu nghỉ dưỡng sinh thái.',
    potential: 'Chính sách ưu đãi thuế 5 năm đầu, hỗ trợ giải phóng mặt bằng.',
    contactEmail: 'nguyenxuankiet294@gmail.com'
  }
]

const advantages = [
  { icon: 'mdi:pine-tree', title: 'Tài Nguyên Thiên Nhiên Phong Phú', desc: 'Rừng nguyên sinh, suối thác và hệ sinh thái đa dạng — nền tảng lý tưởng cho du lịch sinh thái.' },
  { icon: 'mdi:account-group-outline', title: 'Cộng Đồng Bản Địa Đặc Sắc', desc: 'Văn hóa S\'tiêng, M\'nông với cồng chiêng và thổ cẩm tạo ra sản phẩm du lịch độc đáo không thể tái tạo.' },
  { icon: 'mdi:file-certificate-outline', title: 'Chính Sách Ưu Đãi Rõ Ràng', desc: 'Miễn giảm thuế, hỗ trợ thủ tục hành chính và đồng hành xuyên suốt quá trình đầu tư.' },
  { icon: 'mdi:road-variant', title: 'Hạ Tầng Đang Mở Rộng', desc: 'Tuyến đường kết nối quốc lộ đang được nâng cấp, rút ngắn thời gian di chuyển từ TP. HCM xuống còn ~3 giờ.' },
]

const getIcon = (category: string) => {
  const icons: Record<string, string> = {
    agriculture: 'mdi:leaf',
    tourism: 'mdi:tent',
    infrastructure: 'mdi:road-variant',
    industry: 'mdi:factory'
  }
  return icons[category] || 'mdi:domain'
}
</script>
