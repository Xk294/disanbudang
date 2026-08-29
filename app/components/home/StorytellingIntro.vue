<template>
  <section id="intro-story" class="section relative overflow-hidden bg-charcoal-900 border-t border-b border-charcoal-800" aria-label="Storytelling introduction">
    <!-- Subtle textured background -->
    <div class="noise-overlay" />
    <div class="absolute inset-0 bg-dark-earth opacity-40 pointer-events-none" />

    <div class="container-heritage relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text Content -->
        <div class="lg:col-span-7 space-y-6 reveal">
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <span class="section-label">Linh Hồn Đại Ngàn</span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold">
              <Icon name="mdi:map-marker" class="w-3 h-3" />
              Thành Phố Đồng Nai
            </span>
          </div>
          <h2 class="section-title">Nơi Đất Trời Gặp Gỡ Lịch Sử</h2>
          <p class="text-charcoal-300 text-lg leading-relaxed max-w-2xl mb-8 animate-fade-up" style="animation-delay: 0.2s">
            Thành Phố Đồng Nai hôm nay ôm trọn một cõi di sản thiêng liêng trải dài từ đô thị công nghiệp Biên Hòa đến đại ngàn miền Đông Nam Bộ. Từ căn cứ Chiến Khu Đ anh dũng, nhịp chày giã gạo nuôi quân thâu đêm dưới ánh đuốc lồ ô của đồng bào S'tiêng tại Sóc Bom Bo đã đi vào lịch sử cách mạng như một biểu tượng bất khuất. Cùng với danh thắng núi Bà Rá, hồ Thác Mơ, và các di tích cách mạng hào hùng như Căn cứ Tà Thiết hay Nhà Giao tế Lộc Ninh, tất cả đã tạo nên bức tranh văn hóa đa dạng, đặc sắc mà Thành Phố Đồng Nai hôm nay đang tự hào kế thừa, bảo tồn và nâng tầm phát triển cho muôn đời sau.
          </p>
          <div class="animate-fade-up pt-2 pb-4" style="animation-delay: 0.3s">
            <NuxtLink to="/study" class="btn-primary text-sm px-6 py-3.5 inline-flex items-center gap-2 group shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20">
              <Icon name="mdi:compass-outline" class="w-4.5 h-4.5 group-hover:rotate-45 transition-transform duration-300" />
              Bắt đầu hành trình
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-brick-500/20 flex items-center justify-center text-brick-400 shrink-0">
                <Icon name="mdi:shield-outline" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Căn Cứ Cách Mạng</h4>
                <p class="text-charcoal-400 text-sm">Rừng Chiến Khu Đ oai hùng từng là điểm tựa vững chãi của miền Đông Nam Bộ.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-forest-500/20 flex items-center justify-center text-forest-400 shrink-0">
                <Icon name="mdi:pine-tree" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Thiên Nhiên Kỳ Vĩ</h4>
                <p class="text-charcoal-400 text-sm">Hệ sinh thái phong phú với những ngọn thác thơ mộng ẩn mình giữa đại ngàn.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <Icon name="mdi:music-clef-treble" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Âm Nhạc Cồng Chiêng</h4>
                <p class="text-charcoal-400 text-sm">Không gian cồng chiêng S'tiêng kết nối linh thiêng giữa con người và vũ trụ.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-10 h-10 rounded-xl bg-earth-500/20 flex items-center justify-center text-earth-400 shrink-0">
                <Icon name="mdi:home-group" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-heading font-semibold text-ivory text-base mb-1">Đời Sống Bản Địa</h4>
                <p class="text-charcoal-400 text-sm">Những nếp nhà dài trăm mét kể câu chuyện cố kết cộng đồng keo sơn.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Curated Cinematic Graphics Grid -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-4 relative reveal">
          <div class="space-y-4">
            <div class="rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-lg border border-charcoal-700/50 group">
              <NuxtImg
                src="/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp"
                alt="Rừng nguyên sinh Thành Phố Đồng Nai"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="rounded-2xl overflow-hidden aspect-square shadow-warm-lg border border-charcoal-700/50 group">
              <NuxtImg
                src="/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp"
                alt="Lễ hội cồng chiêng"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div class="space-y-4 pt-8">
            <div class="rounded-2xl overflow-hidden aspect-square shadow-warm-lg border border-charcoal-700/50 group">
              <NuxtImg
                src="/images/heritage/danh-thang/thac-dung-lg.webp"
                alt="Thác Mơ, Thành Phố Đồng Nai"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-lg border border-charcoal-700/50 group">
              <NuxtImg
                src="/images/heritage/lich-su/soc-bom-bo-lg.webp"
                alt="Chiến Khu Đ"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <!-- Decorative golden orbit -->
          <div class="absolute -z-10 -bottom-6 -right-6 w-40 h-40 rounded-full border border-gold-500/10 animate-spin-slow pointer-events-none" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))
</script>
