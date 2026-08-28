<template>
  <section id="mission" class="py-24 lg:py-36 bg-charcoal-900 border-t border-charcoal-800/60 relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#C7A664_1px,transparent_1px)] [background-size:32px_32px]" />

    <div class="container-heritage relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

        <!-- Left: Quote + problems -->
        <div class="reveal">
          <div class="flex items-center gap-3 mb-8">
            <span class="w-8 h-px bg-brick-400" />
            <span class="text-brick-400 text-[10px] uppercase tracking-[0.3em] font-bold">Sứ Mệnh</span>
          </div>

          <!-- Big pull-quote -->
          <blockquote class="font-heading font-bold text-ivory text-3xl lg:text-4xl leading-[1.1] mb-6 relative">
            <span class="absolute -top-4 -left-2 text-gold-400/15 font-serif text-[80px] leading-none select-none pointer-events-none">"</span>
            Di sản không phải để nhốt trong bảo tàng —
            <span class="text-gradient-gold"> mà để sống trong lòng người."</span>
          </blockquote>

          <p class="text-charcoal-300 text-base leading-relaxed mb-8">
            Di sản văn hóa phi vật thể của vùng đất Bù Đăng — nay là vùng lõi di sản của
            Thành Phố Đồng Nai — đang đối mặt nguy cơ mai một khi chưa có nền tảng số hóa
            xứng tầm. Dự án ra đời để thay đổi điều đó — biến ký ức thành dữ liệu sống,
            biến lịch sử thành trải nghiệm.
          </p>

          <!-- Mini stats inline -->
          <div class="flex gap-8 mb-10 pb-10 border-b border-charcoal-800/60">
            <div v-for="ms in missionStats" :key="ms.label">
              <p class="font-heading font-bold text-gold-400 text-3xl mb-0.5">{{ ms.value }}</p>
              <p class="text-charcoal-500 text-xs uppercase tracking-wider">{{ ms.label }}</p>
            </div>
          </div>

          <!-- 3 core problems -->
          <div class="space-y-4">
            <div
              v-for="(prob, i) in problems"
              :key="i"
              class="flex gap-4 p-5 rounded-2xl border border-charcoal-800/60 hover:border-charcoal-700 transition-colors group"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                :class="prob.iconBg">
                <Icon :name="prob.icon" class="w-5 h-5 transition-colors duration-300" :class="prob.iconColor" />
              </div>
              <div>
                <h3 class="font-heading font-semibold text-ivory text-base mb-1 group-hover:text-gold-200 transition-colors">
                  {{ prob.title }}
                </h3>
                <p class="text-charcoal-400 text-sm leading-relaxed">{{ prob.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Heritage photo stack -->
        <div class="reveal relative">
          <!-- Main photo -->
          <div class="relative rounded-3xl overflow-hidden h-[420px] lg:h-[520px] border border-charcoal-800/60 shadow-2xl shadow-charcoal-950/50">
            <NuxtImg
              src="/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp"
              alt="Cồng chiêng S'tiêng"
              class="w-full h-full object-cover"
              style="object-position: center 30%"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
            <!-- Photo caption -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-4 h-px bg-gold-400/70" />
                <span class="text-gold-400 text-[9px] uppercase tracking-[0.3em] font-bold">Văn Hóa Phi Vật Thể</span>
              </div>
              <p class="text-ivory/80 text-sm font-medium">Cồng chiêng S'tiêng — Cùng mạch nguồn Cồng chiêng Tây Nguyên (UNESCO 2005)</p>
            </div>
          </div>

          <!-- Floating small card -->
          <div class="absolute -bottom-6 -left-4 lg:-left-8 bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 shadow-xl w-[200px]">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/25 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:calendar-check" class="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <p class="font-heading font-bold text-ivory text-base leading-none">2025</p>
                <p class="text-charcoal-500 text-[10px] mt-0.5">Năm khởi động</p>
              </div>
            </div>
            <div class="w-full h-px bg-charcoal-800 my-2" />
            <p class="text-charcoal-400 text-[10px] leading-relaxed">7 tháng khảo sát thực địa khắp vùng đất Bù Đăng</p>
          </div>

          <!-- Gold accent line -->
          <div class="absolute -top-4 -right-4 w-24 h-24 border border-gold-500/15 rounded-3xl pointer-events-none" />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  missionStats: { value: string; label: string }[]
  problems: { icon: string; iconBg: string; iconColor: string; title: string; desc: string }[]
}>()
</script>
