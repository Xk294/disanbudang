<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero Header -->
    <div class="bg-dark-earth py-12 md:py-16 relative overflow-hidden border-b border-charcoal-850">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-10 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/8 rounded-full blur-3xl" />
        <div class="noise-overlay" />
      </div>
      <div class="container-heritage relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-500/10 border border-forest-500/25 text-forest-400 text-3xs uppercase font-bold tracking-widest mb-4">
            <Icon name="mdi:notebook-edit-outline" class="w-3.5 h-3.5" />
            Nhật Ký Điền Dã & Sự Kiện Thực Địa
          </div>
          <h1 class="font-heading font-bold text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.35] mb-5 text-balance tracking-normal">
            Nhật Ký Dự Án &<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-forest-400 via-gold-300 to-earth-400">Hoạt Động Thực Địa</span>
          </h1>
          <p class="text-charcoal-300 text-sm md:text-base leading-relaxed max-w-2xl font-body">
            Ghi chép hành trình điền dã khảo sát 16 di sản, các sự kiện văn hóa lễ hội thường niên và nhật ký phỏng vấn nghệ nhân, nhân chứng lịch sử tại Thành Phố Đồng Nai.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-heritage py-12 md:py-16">
      <!-- Section: Lễ hội & Sự kiện Văn hóa -->
      <div class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="section-label text-gold-400">Lễ Hội Thường Niên</span>
            <h2 class="font-heading font-bold text-ivory text-2xl lg:text-3xl mt-1">Sự Kiện Văn Hóa Địa Phương</h2>
          </div>
          <span class="text-charcoal-400 text-xs hidden sm:inline">{{ events.length }} sự kiện tiêu biểu</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-6 shadow-xl hover:border-gold-500/30 transition-all duration-300 flex flex-col group"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Icon name="mdi:calendar-star" class="w-5 h-5 text-gold-400" />
              </div>
              <div class="min-w-0">
                <p class="text-gold-400 text-xs font-semibold">{{ formatDate(event.startDate) }}</p>
                <p class="text-charcoal-500 text-3xs">{{ event.endDate ? `Đến ${formatDate(event.endDate)}` : 'Hàng năm' }}</p>
              </div>
            </div>

            <h3 class="font-heading font-bold text-ivory text-lg leading-snug mb-3 group-hover:text-gold-300 transition-colors">
              {{ event.title }}
            </h3>

            <p class="text-charcoal-400 text-xs leading-relaxed mb-5 flex-1">
              {{ event.description }}
            </p>

            <div class="border-t border-charcoal-850 pt-4 flex items-start gap-2 text-xs text-charcoal-400 mb-4">
              <Icon name="mdi:map-marker-outline" class="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span class="leading-tight">{{ event.location }}</span>
            </div>

            <NuxtLink :to="'/journal/' + event.id" class="btn-outline-gold text-xs justify-center w-full py-2.5 mt-auto">
              <Icon name="mdi:information-outline" class="w-4 h-4" />
              Chi Tiết Hoạt Động
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Section: Ghi chép điền dã & Khảo sát -->
      <div>
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="section-label text-forest-400">Tư Liệu Điền Dã</span>
            <h2 class="font-heading font-bold text-ivory text-2xl lg:text-3xl mt-1">Nhật Ký Khảo Sát & Số Hóa</h2>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="log in fieldLogs"
            :key="log.id"
            class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-6 hover:border-forest-500/40 transition-all duration-300"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded-full bg-forest-500/15 border border-forest-500/30 text-forest-400 text-3xs font-bold uppercase tracking-wider">
                  {{ log.phase }}
                </span>
                <h3 class="font-heading font-bold text-ivory text-base md:text-lg">{{ log.title }}</h3>
              </div>
              <span class="text-charcoal-400 text-xs shrink-0 flex items-center gap-1">
                <Icon name="mdi:clock-outline" class="w-3.5 h-3.5 text-forest-400" />
                {{ log.time }}
              </span>
            </div>

            <p class="text-charcoal-300 text-sm leading-relaxed mb-4">{{ log.content }}</p>

            <div class="flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-400 pt-3 border-t border-charcoal-850">
              <span class="flex items-center gap-1.5 text-3xs text-charcoal-400">
                <Icon name="mdi:account-group-outline" class="w-4 h-4 text-forest-400" />
                {{ log.participants }}
              </span>
              <NuxtLink v-if="log.link" :to="log.link" class="text-gold-400 hover:text-gold-300 font-semibold inline-flex items-center gap-1">
                Xem di sản liên quan
                <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTAs -->
      <div class="mt-16 pt-10 border-t border-charcoal-850 text-center">
        <p class="text-charcoal-400 text-sm mb-4">Bạn có tư liệu hoặc muốn cùng tham gia hành trình điền dã?</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink to="/contribute" class="btn-primary text-xs py-3 px-6">
            <Icon name="mdi:hand-heart-outline" class="w-4 h-4" />
            Đóng Góp Tư Liệu
          </NuxtLink>
          <NuxtLink to="/about" class="btn-ghost text-xs py-3 px-6">
            <Icon name="mdi:information-outline" class="w-4 h-4" />
            Về Phương Pháp Nghiên Cứu
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EVENTS } from '~/data/posts'

definePageMeta({ layout: 'default' })

useMuseumSeo({
  title: 'Nhật Ký Điền Dã & Sự Kiện',
  description: 'Ghi chép hành trình nghiên cứu thực địa, khảo sát di tích và các lễ hội văn hóa truyền thống tại Thành Phố Đồng Nai.',
  path: '/journal',
})

const events = EVENTS

const fieldLogs = [
  {
    id: 'flog-001',
    phase: 'Điền Dã Thực Địa',
    title: 'Khảo sát và ghi âm lời kể già làng Điểu Minh tại Sóc Bom Bo',
    time: 'Tháng 05/2024 - 2026',
    content: 'Nhóm nghiên cứu đã thực hiện các buổi tiếp xúc trực tiếp với nghệ nhân Điểu Minh (78 tuổi) và bà con S\'tiêng tại buôn sóc, ghi âm các bài chiêng cổ và câu chuyện giã gạo nuôi quân trong kháng chiến chống Mỹ.',
    participants: 'Nhóm nghiên cứu học sinh THPT Lê Quý Đôn & Nghệ nhân bản địa',
    link: '/heritage/khu-bao-ton-soc-bom-bo',
  },
  {
    id: 'flog-002',
    phase: 'Số Hóa Di Sản',
    title: 'Số hóa bản vẽ 3D và không gian kiến trúc Nhà Dài truyền thống',
    time: 'Tháng 08/2024 - 2026',
    content: 'Phối hợp cùng tài liệu Viện Dân tộc học và khảo sát thực địa tại sóc Bom Bo để dựng lại mô hình kiến trúc Nhà Dài S\'tiêng, phục vụ học tập trực quan cho học sinh các trường phổ thông.',
    participants: 'Tác giả dự án & Cố vấn chuyên môn',
    link: '/heritage/nha-dai-truyen-thong-stieng',
  },
  {
    id: 'flog-003',
    phase: 'Nghiên Cứu Điền Dã',
    title: 'Thu thập tri thức chế biến men lá rượu cần và dệt thổ cẩm Đắk Nhau',
    time: 'Tháng 10/2024 - 2026',
    content: 'Ghi chép quy trình ủ men rượu cần Đ\'rắp S\'lung từ vỏ cây Krông và các mẫu hoa văn thổ cẩm Sơk Pơng đang có nguy cơ mai một của đồng bào S\'tiêng tại xã Đắk Nhau.',
    participants: 'Nghệ nhân Thị Rét & Ban biên tập Di Sản Bù Đăng',
    link: '/stories/ruou-can-stieng-bu-dang-men-la-rung',
  },
  {
    id: 'flog-004',
    phase: 'Khảo Sát Thực Địa',
    title: 'Đo đạc trắc địa và ghi nhận cấu trúc đá bazan cột tại Thác Đứng',
    time: 'Tháng 12/2024 - 2026',
    content: 'Khảo sát thực địa lòng suối Đăk Wuar tại xã Đoàn Kết, đo đạc thông số vách đá bazan dạng cột lục lăng thẳng đứng, phục vụ nội dung bài giảng Địa lý địa phương trong cổng học tập.',
    participants: 'Tổ Địa lý - Sinh học THCS Nguyễn Trường Tộ & Nhóm nghiên cứu',
    link: '/heritage/thac-dung-bu-dang',
  },
  {
    id: 'flog-005',
    phase: 'Tư Liệu Nhân Chứng',
    title: 'Phỏng vấn cựu chiến binh Điểu Đố về Căn cứ Nửa Lon',
    time: 'Tháng 02/2025 - 2026',
    content: 'Ghi chép hồi ức sống động của cựu chiến binh Điểu Đố (81 tuổi) về giai đoạn gian khổ 1960–1965, khi quân dân Bù Đăng chia nhau từng nửa lon gạo mỗi ngày giữ vững hành lang chiến lược Bắc — Nam.',
    participants: 'Cựu chiến binh Điểu Đố & Ban biên soạn Di Sản Bù Đăng',
    link: '/heritage/can-cu-nua-lon-bu-dang',
  },
  {
    id: 'flog-006',
    phase: 'Tiến Độ Dự Án',
    title: 'Hoàn thiện bản đồ số GIS 16 tọa độ di sản và hệ thống 160 câu hỏi kiểm tra',
    time: 'Tháng 04/2026',
    content: 'Tích hợp toàn diện tọa độ vệ tinh GPS chính xác cho 16 di tích, danh thắng và không gian văn hóa, đồng thời đóng gói hệ thống 160 câu hỏi trắc nghiệm tương tác phân loại theo độ khó.',
    participants: 'Đội ngũ kỹ thuật & Ban cố vấn giáo dục địa phương',
    link: '/map',
  },
]

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>
