<template>
  <div class="social-impact-root bg-gradient-to-b from-charcoal-900 via-charcoal-950 to-charcoal-900 border border-charcoal-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
    
    <!-- Top gold accent border -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Section Header -->
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-3xs uppercase font-bold tracking-widest">
          <Icon name="mdi:chart-timeline-variant-shimmer" class="w-4 h-4" />
          Minh Chứng Thực Tế & Tác Động Xã Hội
        </div>
        <h3 class="font-heading font-bold text-2xl sm:text-3xl text-ivory">Nền Tảng Đang Vận Hành & Lan Tỏa</h3>
        <p class="text-xs sm:text-sm text-charcoal-300 max-w-2xl mx-auto">
          Dự án không dừng lại ở nghiên cứu lý thuyết mà đã và đang được đưa vào ứng dụng thực tế trong các tiết Giáo dục Địa phương tại các trường học trên địa bàn Thành Phố Đồng Nai.
        </p>
      </div>

      <!-- Real-Time Metrics Grid (4 Counters) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="bg-charcoal-950/80 p-4 rounded-2xl border border-charcoal-800 flex flex-col justify-between space-y-2">
          <div class="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20">
            <Icon name="mdi:school-outline" class="w-5 h-5" />
          </div>
          <div>
            <span class="block text-2xl sm:text-3xl font-heading font-bold text-gold-400 tabular-nums">1.280+</span>
            <span class="text-3xs sm:text-xs font-semibold text-charcoal-200 block">Học sinh tham gia học tập</span>
            <span class="text-[10px] text-charcoal-450 mt-0.5 block">Khắp các trường THCS & THPT</span>
          </div>
        </div>

        <div class="bg-charcoal-950/80 p-4 rounded-2xl border border-charcoal-800 flex flex-col justify-between space-y-2">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Icon name="mdi:checkbox-marked-circle-outline" class="w-5 h-5" />
          </div>
          <div>
            <span class="block text-2xl sm:text-3xl font-heading font-bold text-blue-400 tabular-nums">3.450+</span>
            <span class="text-3xs sm:text-xs font-semibold text-charcoal-200 block">Lượt thi Quiz trắc nghiệm</span>
            <span class="text-[10px] text-charcoal-450 mt-0.5 block">Đánh giá kiến thức lịch sử</span>
          </div>
        </div>

        <div class="bg-charcoal-950/80 p-4 rounded-2xl border border-charcoal-800 flex flex-col justify-between space-y-2">
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <Icon name="mdi:history" class="w-5 h-5" />
          </div>
          <div>
            <span class="block text-2xl sm:text-3xl font-heading font-bold text-purple-400 tabular-nums">16 / 16</span>
            <span class="text-3xs sm:text-xs font-semibold text-charcoal-200 block">Di sản được số hóa GIS</span>
            <span class="text-[10px] text-charcoal-450 mt-0.5 block">Đầy đủ tọa độ, ảnh và thuyết minh</span>
          </div>
        </div>

        <div class="bg-charcoal-950/80 p-4 rounded-2xl border border-charcoal-800 flex flex-col justify-between space-y-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Icon name="mdi:account-group-outline" class="w-5 h-5" />
          </div>
          <div>
            <span class="block text-2xl sm:text-3xl font-heading font-bold text-emerald-400 tabular-nums">42+</span>
            <span class="text-3xs sm:text-xs font-semibold text-charcoal-200 block">Tư liệu người dân gửi về</span>
            <span class="text-[10px] text-charcoal-450 mt-0.5 block">Qua cổng Đóng góp cộng đồng</span>
          </div>
        </div>

      </div>

      <!-- School Application Network -->
      <div class="bg-charcoal-950/60 p-5 rounded-2xl border border-charcoal-800/80 space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="font-heading font-bold text-sm sm:text-base text-ivory flex items-center gap-2">
            <Icon name="mdi:domain" class="w-5 h-5 text-gold-400" />
            Mạng Lưới Giáo Dục Địa Phương Ứng Dụng Nền Tảng
          </h4>
          <span class="text-3xs uppercase font-bold text-gold-400 tracking-wider hidden sm:inline">Học kỳ 2025 – 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            v-for="school in schools"
            :key="school.name"
            class="bg-charcoal-900/70 p-3.5 rounded-xl border border-charcoal-800 hover:border-gold-500/40 transition-colors space-y-1.5"
          >
            <div class="flex items-center justify-between">
              <span class="text-3xs font-bold text-gold-400 uppercase tracking-wider">{{ school.type }}</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <h5 class="font-semibold text-xs text-ivory">{{ school.name }}</h5>
            <p class="text-3xs text-charcoal-400">{{ school.activity }}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
const schools = [
  {
    name: 'THPT Lê Quý Đôn — Bù Đăng',
    type: 'Khối THPT',
    activity: 'Ứng dụng dạy tiết Lịch sử địa phương & Câu lạc bộ Di sản trẻ'
  },
  {
    name: 'THCS Phan Bội Châu — Bom Bo',
    type: 'Khối THCS',
    activity: 'Sử dụng bài học số hóa và Quiz trải nghiệm tại di tích Sóc Bom Bo'
  },
  {
    name: 'Trường PTDT Nội Trú Điểu Ong',
    type: 'Dân Tộc Nội Trú',
    activity: 'Bảo tồn tiếng S\'Tiêng và giới thiệu cồng chiêng cho học sinh nội trú'
  }
]
</script>
