<template>
  <section class="py-20 lg:py-28 bg-charcoal-950 border-t border-charcoal-800/80 relative overflow-hidden" aria-label="Cơ hội đầu tư">
    <!-- Ambient gold and forest glows -->
    <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="container-heritage relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left: Narrative & Key Features (7 cols) -->
        <div class="lg:col-span-7 reveal">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-[10px] uppercase font-bold tracking-widest mb-4">
            <Icon name="mdi:chart-line" class="w-3.5 h-3.5 text-gold-400" />
            <span>Tiềm Năng & Phát Triển Bền Vững</span>
          </div>

          <h2 class="font-heading font-bold text-ivory text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
            Cơ Hội Đầu Tư Vùng<br />
            <span class="text-gradient-gold">Cao Nguyên Đồng Nai</span>
          </h2>

          <p class="text-charcoal-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
            Song hành cùng việc gìn giữ di sản lịch sử, vùng cao nguyên đất đỏ bazan mở ra không gian phát triển đầy triển vọng với quỹ đất sạch, chính sách ưu đãi vượt trội và hạ tầng giao thông kết nối liên vùng hiện đại.
          </p>

          <!-- Key highlights grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div class="p-4 rounded-2xl bg-charcoal-900/70 border border-charcoal-800/80 hover:border-gold-500/30 transition-colors">
              <div class="w-9 h-9 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center mb-3">
                <Icon name="mdi:leaf" class="w-5 h-5" />
              </div>
              <h3 class="font-heading font-bold text-ivory text-base mb-1">Nông Nghiệp Công Nghệ Cao</h3>
              <p class="text-charcoal-400 text-xs leading-relaxed">
                Đất đỏ bazan màu mỡ, thích hợp vùng chuyên canh sầu riêng, hạt điều, ca cao chuẩn VietGAP và chuỗi chế biến sâu.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-charcoal-900/70 border border-charcoal-800/80 hover:border-gold-500/30 transition-colors">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                <Icon name="mdi:tent" class="w-5 h-5" />
              </div>
              <h3 class="font-heading font-bold text-ivory text-base mb-1">Du Lịch Sinh Thái & Di Sản</h3>
              <p class="text-charcoal-400 text-xs leading-relaxed">
                Khai thác quần thể Trảng cỏ Bù Lạch, thác nước hùng vĩ và không gian văn hóa cồng chiêng bản địa độc bản.
              </p>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center gap-3.5">
            <NuxtLink to="/invest" class="btn-primary text-sm px-6 py-3 shadow-[0_0_20px_rgba(199,166,100,0.25)]">
              <Icon name="mdi:briefcase-outline" class="w-4.5 h-4.5" />
              <span>Khám Phá Cơ Hội Đầu Tư</span>
            </NuxtLink>

            <NuxtLink to="/contact" class="btn-ghost text-sm px-5 py-3 border border-charcoal-700 hover:border-gold-500/40 text-charcoal-300 hover:text-ivory">
              <Icon name="mdi:message-outline" class="w-4.5 h-4.5" />
              <span>Liên Hệ Hợp Tác</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Stats & Visual Card (5 cols) -->
        <div class="lg:col-span-5 reveal">
          <div class="relative rounded-3xl overflow-hidden border border-gold-500/25 bg-gradient-to-b from-charcoal-900/90 to-charcoal-950 p-6 sm:p-7 shadow-2xl">
            <!-- Background Image overlay -->
            <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <NuxtImg
                src="/images/heritage/danh-thang/bu-lach-lg.webp"
                alt="Trảng cỏ Bù Lạch"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-charcoal-950/60" />
            </div>

            <div class="relative z-10">
              <div class="flex items-center justify-between border-b border-charcoal-800/80 pb-4 mb-5">
                <span class="text-xs uppercase font-bold tracking-wider text-gold-400">Chỉ Số Trọng Điểm</span>
                <span class="text-2xs px-2 py-0.5 rounded-full bg-charcoal-800 text-charcoal-300 font-mono">Đồng Nai 2026</span>
              </div>

              <!-- Stats grid -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-charcoal-950/80 border border-charcoal-800/80 rounded-2xl p-3.5 text-center">
                  <p class="font-heading font-bold text-2xl sm:text-3xl text-gold-400">68%</p>
                  <p class="text-charcoal-400 text-2xs uppercase tracking-wider mt-1">Độ che phủ rừng</p>
                </div>

                <div class="bg-charcoal-950/80 border border-charcoal-800/80 rounded-2xl p-3.5 text-center">
                  <p class="font-heading font-bold text-2xl sm:text-3xl text-ivory">500+ <span class="text-sm font-normal text-gold-400">ha</span></p>
                  <p class="text-charcoal-400 text-2xs uppercase tracking-wider mt-1">Quỹ đất sạch ưu đãi</p>
                </div>

                <div class="bg-charcoal-950/80 border border-charcoal-800/80 rounded-2xl p-3.5 text-center">
                  <p class="font-heading font-bold text-2xl sm:text-3xl text-ivory">1.500 <span class="text-sm font-normal text-gold-400">km²</span></p>
                  <p class="text-charcoal-400 text-2xs uppercase tracking-wider mt-1">Diện tích tự nhiên</p>
                </div>

                <div class="bg-charcoal-950/80 border border-charcoal-800/80 rounded-2xl p-3.5 text-center">
                  <p class="font-heading font-bold text-2xl sm:text-3xl text-emerald-400">~3 <span class="text-sm font-normal text-emerald-300">giờ</span></p>
                  <p class="text-charcoal-400 text-2xs uppercase tracking-wider mt-1">Kết nối TP. Hồ Chí Minh</p>
                </div>
              </div>

              <!-- Note card -->
              <div class="bg-gold-500/10 border border-gold-500/20 rounded-xl p-3.5 flex items-start gap-3">
                <Icon name="mdi:shield-check-outline" class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <p class="text-xs text-charcoal-300 leading-relaxed">
                  Đồng hành cùng nhà đầu tư: hỗ trợ miễn giảm thuế, tạo điều kiện mặt bằng và thủ tục hành chính thông thoáng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))
</script>
