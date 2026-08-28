<template>
  <section class="section bg-charcoal-900 relative overflow-hidden border-t border-charcoal-800" aria-label="Những câu hỏi thường gặp">
    <div class="noise-overlay" />
    <div class="container-heritage relative z-10">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="section-label">Giải Đáp</span>
          <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
          <p class="text-charcoal-400 text-base max-w-xl mx-auto mt-4">
            Tìm hiểu thêm về văn hóa S'tiêng, di tích lịch sử Sóc Bom Bo, cồng chiêng và các điểm đến trải nghiệm đặc sắc khắp Thành Phố Đồng Nai.
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="border border-charcoal-800 rounded-2xl bg-charcoal-800/40 overflow-hidden transition-all duration-300 hover:border-gold-500/30"
          >
            <button
              class="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-850 rounded-2xl"
              @click="toggleFaq(index)"
            >
              <span class="font-heading font-semibold text-ivory text-base md:text-lg pr-4">
                {{ faq.question }}
              </span>
              <Icon
                name="mdi:chevron-down"
                class="w-5 h-5 text-gold-400 transition-transform duration-300 shrink-0"
                :class="{ 'rotate-180': openIndex === index }"
              />
            </button>

            <div
              class="transition-all duration-300 ease-in-out overflow-hidden"
              :style="{ maxHeight: openIndex === index ? '2000px' : '0px' }"
            >
              <div class="px-6 py-5 pt-4 text-charcoal-200 text-sm leading-relaxed border-t border-charcoal-800/40 bg-charcoal-900/10">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

const faqs = [
  {
    question: "Thành Phố Đồng Nai là gì và có từ khi nào?",
    answer: "Thành Phố Đồng Nai là thành phố trực thuộc Trung ương thứ 7 của Việt Nam, chính thức hoạt động từ 30/4/2026 trên cơ sở toàn bộ diện tích và dân số của tỉnh Đồng Nai (sau khi hợp nhất với tỉnh Bình Phước cũ ngày 1/7/2025). Thành phố có 95 xã, phường, diện tích hơn 12.700 km² và gần 4,5 triệu dân, đứng thứ 4 cả nước về quy mô kinh tế."
  },
  {
    question: "Di sản nổi bật nhất của Thành Phố Đồng Nai gồm những gì?",
    answer: "Di sản nổi bật nhất của Thành Phố Đồng Nai gồm Chiến Khu Đ huyền thoại, Sóc Bom Bo lịch sử, núi Bà Rá và hồ Thác Mơ, Căn cứ Tà Thiết, không gian văn hóa cồng chiêng và nghề dệt thổ cẩm của đồng bào dân tộc S'tiêng, M'nông, trải dài từ Biên Hòa đến vùng đất Bình Phước cũ."
  },
  {
    question: "Văn hóa S'tiêng có những nét đặc trưng đặc sắc nào?",
    answer: "Văn hóa S'tiêng đặc trưng bởi nghệ thuật diễn xướng cồng chiêng Tây Nguyên (UNESCO công nhận Di sản văn hóa phi vật thể năm 2005), nghề dệt thổ cẩm thủ công, tiếng nói chữ viết riêng, cùng truyền thống sinh hoạt trong những ngôi nhà dài cổ truyền."
  },
  {
    question: "Sóc Bom Bo lịch sử nằm ở đâu và có thể tham quan như thế nào?",
    answer: "Sóc Bom Bo nằm ở khu vực Bình Phước cũ thuộc Thành Phố Đồng Nai hiện nay. Bạn có thể tham quan Khu bảo tồn văn hóa dân tộc S'tiêng Sóc Bom Bo để trải nghiệm giã gạo, nghe tiếng cồng chiêng và giao lưu văn hóa."
  },
  {
    question: "Vì sao dự án số hóa di sản này hướng đến toàn Thành Phố Đồng Nai?",
    answer: "Khi phương pháp số hóa được kiểm chứng tại Bù Đăng, kiến trúc dữ liệu được thiết kế lại theo hướng đa địa bàn — không ràng buộc ranh giới hành chính. Khi Nghị quyết 30/2026/QH16 thành lập TP. Đồng Nai, hệ thống thích ứng mà không mất dữ liệu, vì kiến trúc đã được xây đúng ngay từ đầu."
  },
  {
    question: "Nếu dự án đã mở rộng ra Đồng Nai, vì sao tên vẫn là Di Sản Bù Đăng?",
    answer: "Tên Di Sản Bù Đăng ghi lại nguồn gốc của mô hình — nơi phương pháp số hóa di sản phi vật thể dân tộc thiểu số được hình thành và kiểm chứng lần đầu. Đây là tên của phương pháp và thương hiệu học thuật, không phải ranh giới địa lý. Giống như một nghiên cứu khoa học giữ tên địa danh thí nghiệm đầu tiên dù sau đó được áp dụng rộng hơn. 'Bù Đăng' là bằng chứng về nơi mô hình được kiểm chứng — không phải giới hạn phạm vi."
  },
  {
    question: "Cổng thông tin Di Sản Bù Đăng do ai thực hiện?",
    answer: "Cổng thông tin Di Sản Bù Đăng do Nguyễn Xuân Kiệt thực hiện nhằm mục tiêu số hóa, lưu trữ và quảng bá các giá trị lịch sử, văn hóa và thiên nhiên của Thành Phố Đồng Nai đến với mọi thế hệ."
  }
]

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

// Inject FAQ Schema for SEO optimization
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      })
    }
  ]
})
</script>
