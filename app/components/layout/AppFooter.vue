<template>
  <footer class="bg-charcoal-900 text-white relative overflow-hidden border-t border-charcoal-800">
    <!-- Background texture -->
    <div class="absolute inset-0 opacity-5 pointer-events-none"
      style='background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22none%22/%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22 fill=%22%23C7A664%22 opacity=%220.5%22/%3E%3C/svg%3E"); background-size: 60px 60px;'
    />

    <!-- Decorative top border -->
    <div class="h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

    <div class="container-heritage py-16 lg:py-20 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        <!-- Brand Column -->
        <div class="lg:col-span-1 space-y-6">
          <div class="flex items-center gap-3">
            <NuxtImg src="/favicon/icon-192.png" alt="Logo Di Sản Thành Phố Đồng Nai" class="h-14 lg:h-16 w-14 lg:w-16 object-contain shrink-0" width="64" height="64" loading="lazy" />
            <div class="flex flex-col justify-center text-left shrink-0 select-none">
              <div class="font-heading font-bold text-base lg:text-lg leading-tight tracking-wide whitespace-nowrap">
                <span class="text-white">Di Sản</span>
                <span class="text-gold-300 ml-1.5">Bù Đăng</span>
              </div>
              <span class="text-[10px] text-charcoal-400 tracking-[0.14em] uppercase font-semibold mt-1 leading-none whitespace-nowrap">
                Bảo Tàng Số Thành Phố Đồng Nai
              </span>
            </div>
          </div>
          <p class="text-ivory/75 text-sm leading-relaxed">
            Dự án bảo tồn và tôn vinh di sản văn hóa, lịch sử và thiên nhiên khắp Thành Phố Đồng Nai —
            từ Biên Hòa, Sóc Bom Bo đến Chiến Khu Đ, núi Bà Rá và Chốt Chỉ Huy Tà Thiết.
          </p>

        </div>

        <!-- Navigation Columns -->
        <div v-for="col in footerLinks" :key="col.title" class="space-y-5">
          <h5 class="eyebrow text-gold-300 text-xs">{{ col.title }}</h5>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-ivory/75 hover:text-white transition-colors duration-200 link-underline"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact / QR Column -->
        <div class="space-y-5">
          <h5 class="eyebrow text-gold-300 text-xs">Liên Hệ</h5>
          <div class="space-y-3 text-sm text-ivory/75">
            <p class="flex items-start gap-2">
              <Icon name="mdi:map-marker-outline" class="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <span class="sr-only">Địa chỉ</span>
              Xã Bù Đăng, Thành phố Đồng Nai
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:phone-outline" class="w-4 h-4 text-gold-400 shrink-0" />
              <span class="sr-only">Số điện thoại:</span>
              <a href="tel:0355356294" class="hover:text-white transition-colors">0355 356 294</a>
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="w-4 h-4 text-gold-400 shrink-0" />
              <span class="sr-only">Email:</span>
              <a href="mailto:nguyenxuankiet294@gmail.com" class="hover:text-white transition-colors">nguyenxuankiet294@gmail.com</a>
            </p>
            <p class="flex items-center gap-2">
              <Icon name="mdi:facebook" class="w-4 h-4 text-gold-400 shrink-0" />
              <span class="sr-only">Facebook:</span>
              <a href="https://www.facebook.com/ngxkiet" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Nguyễn Xuân Kiệt</a>
            </p>
          </div>


        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/70">
        <p>© {{ currentYear }} Nguyễn Xuân Kiệt. Bảo lưu mọi quyền.</p>
        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <div v-if="formattedVisitCount" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-950/60 border border-charcoal-800/80 text-charcoal-400">
            <Icon name="mdi:eye-outline" class="w-3.5 h-3.5 text-gold-400/80" />
            <span class="text-ivory font-medium tabular-nums">{{ formattedVisitCount }}</span>
            <span>lượt ghé thăm</span>
          </div>
          <div class="flex items-center gap-1">
            <span>Người thực hiện:</span>
            <a href="https://www.facebook.com/ngxkiet" target="_blank" rel="noopener noreferrer" class="text-gold-300 hover:text-gold-200 hover:underline transition-colors font-medium mx-1">Nguyễn Xuân Kiệt</a>
            <span>• Cổng di sản số Thành Phố Đồng Nai</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const visitCount = useSiteVisitCount()
const formattedVisitCount = computed(() => {
  if (visitCount.value === null) return null
  return visitCount.value.toLocaleString('vi-VN')
})

const footerLinks = [
  {
    title: 'Khám Phá & Học Tập',
    links: [
      { to: '/explore', label: 'Thư Viện Di Sản' },
      { to: '/map', label: 'Bản Đồ Không Gian' },
      { to: '/study', label: 'Cổng Học Tập Số' },
      { to: '/explore/virtual-tour', label: 'Tour Ảo 360°' },
      { to: '/study?tab=quiz', label: 'Trắc Nghiệm Di Sản' },
    ],
  },
  {
    title: 'Nội Dung & Hoạt Động',
    links: [
      { to: '/stories', label: 'Chuyện Di Sản' },
      { to: '/journal', label: 'Nhật Ký Điền Dã' },
      { to: '/explore?tab=community', label: 'Ký Ức Cộng Đồng' },
      { to: '/about', label: 'Giới Thiệu Dự Án' },
      { to: '/contribute', label: 'Đóng Góp Tư Liệu' },
      { to: '/contact', label: 'Liên Hệ & Hợp Tác' },
    ],
  },
]
</script>
