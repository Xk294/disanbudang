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
    question: "Làm sao nghe audio thuyết minh hoặc xem ảnh 360° trên trang này?",
    answer: "Vào trang chi tiết của bất kỳ di sản nào (mục Khám Phá), bạn sẽ thấy nút Phát Audio ngay đầu trang. Ảnh 360° có trong phần Virtual Tour — nhấn nút 'Tour 360°' để trải nghiệm toàn cảnh. Audio chạy ngay trên trình duyệt, không cần tải ứng dụng."
  },
  {
    question: "Giáo viên có thể dùng học liệu này trong lớp như thế nào?",
    answer: "Toàn bộ nội dung trên Di Sản Bù Đăng miễn phí và có thể dùng trong tiết giáo dục địa phương. Mục Học Tập có 30 câu hỏi trắc nghiệm phân theo chủ đề, 24 flashcard thuật ngữ S'tiêng và tài liệu học sinh có thể tải về. Giáo viên có thể chiếu bản đồ tương tác trực tiếp trong lớp."
  },
  {
    question: "Tôi muốn đóng góp tư liệu — cần chuẩn bị gì?",
    answer: "Vào mục Đóng Góp, bạn điền form với thông tin di sản kèm ảnh hoặc mô tả. Chúng tôi xét duyệt trong 3-7 ngày. Tư liệu cần ghi rõ nguồn gốc (ai chụp, khi nào, ở đâu). Ký ức cộng đồng có thể là câu chuyện, hình ảnh hoặc ghi âm — không giới hạn thể loại."
  },
  {
    question: "Đến thăm Sóc Bom Bo thì đi đường nào từ TP.HCM?",
    answer: "Từ TP.HCM đi theo Quốc lộ 13 hướng Bình Dương, qua Bình Long rồi theo QL14 đến xã Bình Minh (huyện Bù Đăng cũ). Sóc Bom Bo thuộc Khu bảo tồn văn hóa dân tộc S'tiêng Sóc Bom Bo — cách TP.HCM khoảng 180 km, đi xe khoảng 3-4 tiếng. Xem bản đồ chi tiết trong mục Bản Đồ Di Sản."
  },
  {
    question: "Vì sao tên là Di Sản Bù Đăng trong khi nay thuộc TP. Đồng Nai?",
    answer: "Tên Di Sản Bù Đăng ghi lại nguồn gốc của dự án — nơi phương pháp số hóa được hình thành và kiểm chứng lần đầu tại Bù Đăng (nay là Xã Bù Đăng, TP. Đồng Nai). Đây là tên thương hiệu học thuật, không phải ranh giới địa lý. Nội dung đang mở rộng dần sang toàn bộ TP. Đồng Nai."
  },
  {
    question: "Ai làm ra website này?",
    answer: "Di Sản Bù Đăng là dự án cá nhân của Nguyễn Xuân Kiệt — học sinh nghiên cứu khoa học, thực hiện từ năm 2025. Dự án ra đời từ 7 tháng khảo sát thực địa tại các buôn sóc S'tiêng và M'nông vùng Bù Đăng. Liên hệ qua email nguyenxuankiet294@gmail.com hoặc số 0355 356 294."
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
