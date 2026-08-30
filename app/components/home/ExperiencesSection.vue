<template>
  <section class="section bg-white border-t border-stone-100 relative overflow-hidden" aria-label="Trải nghiệm số">

    <!-- Ambient glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/4 rounded-full blur-[120px] pointer-events-none" />

    <div class="container-heritage relative z-10">

      <!-- ── HEADER ── -->
      <div class="text-center mb-14 lg:mb-20 reveal">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-px bg-heritage-500" />
          <span class="text-heritage-600 text-[10px] uppercase tracking-[0.3em] font-bold">Nền Tảng Số</span>
          <span class="w-8 h-px bg-heritage-500" />
        </div>
        <h2 class="font-heading font-bold text-stone-900 text-3xl lg:text-5xl leading-snug mb-4">
          Khám Phá Qua Công Nghệ
        </h2>
        <p class="text-stone-500 text-base max-w-xl mx-auto">
          Bốn cổng trải nghiệm số — mỗi cổng mở ra một chiều sâu khác nhau của di sản Thành Phố Đồng Nai.
        </p>
      </div>

      <!-- ── BENTO GRID ── -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">

        <!-- 1. BẢN ĐỒ — large card top-left -->
        <div class="reveal group">
          <NuxtLink to="/map" class="block">
            <div class="relative h-[340px] lg:h-[420px] rounded-2xl overflow-hidden border border-charcoal-800/60 hover:border-gold-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10 cursor-pointer">
              <!-- Map visual background -->
              <NuxtImg
                src="/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg"
                alt="Bản đồ di sản"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style="object-position: center 40%"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-900/30" />
              <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/50 via-transparent to-transparent" />

              <!-- Floating map pins -->
              <div class="absolute inset-0 pointer-events-none">
                <div
                  v-for="pin in previewPins"
                  :key="pin.id"
                  class="absolute"
                  :style="{ left: `${pin.x}%`, top: `${pin.y}%` }"
                >
                  <div class="relative">
                    <div class="absolute -inset-2 rounded-full animate-ping opacity-25" :style="{ backgroundColor: pin.color }" />
                    <div
                      class="relative w-4 h-4 rounded-full border-2 border-white/70 shadow-lg flex items-center justify-center"
                      :style="{ backgroundColor: pin.color }"
                    >
                      <Icon name="mdi:map-marker" class="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div class="flex items-center gap-2.5 mb-3">
                  <div class="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center">
                    <Icon name="mdi:map-search" class="w-5 h-5 text-gold-400" />
                  </div>
                  <span class="text-gold-400 text-xs font-bold uppercase tracking-wider">Bản Đồ Tương Tác</span>
                </div>
                <h3 class="font-heading font-bold text-ivory text-2xl lg:text-3xl mb-2 leading-snug">
                  Hành Trình Qua Bản Đồ Số
                </h3>
                <p class="text-charcoal-300 text-sm leading-relaxed mb-5">
                  Định vị tất cả {{ totalPins }} di sản trên bản đồ tương tác, lọc theo danh mục và lên lịch hành trình thực địa.
                </p>
                <span class="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold group-hover:text-gold-300 transition-colors">
                  Mở Bản Đồ
                  <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 2. THƯ VIỆN DI SẢN — large card top-right -->
        <div class="reveal group" style="animation-delay: 0.08s">
          <NuxtLink to="/library" class="block">
            <div class="relative h-[340px] lg:h-[420px] rounded-2xl overflow-hidden border border-charcoal-800/60 hover:border-earth-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-earth-500/10 cursor-pointer">
              <NuxtImg
                src="/images/heritage/img-disanbudang/chien-khu-D.png"
                alt="Thư viện di sản"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style="object-position: center 35%"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-900/30" />
              <div class="absolute inset-0 bg-gradient-to-l from-charcoal-950/50 via-transparent to-transparent" />

              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div class="flex items-center gap-2.5 mb-3">
                  <div class="w-9 h-9 rounded-xl bg-earth-500/15 border border-earth-500/25 flex items-center justify-center">
                    <Icon name="mdi:bookshelf" class="w-5 h-5 text-earth-400" />
                  </div>
                  <span class="text-earth-400 text-xs font-bold uppercase tracking-wider">Thư Viện Di Sản</span>
                </div>
                <h3 class="font-heading font-bold text-ivory text-2xl lg:text-3xl mb-2 leading-snug">
                  Kho Lưu Trữ Số Hóa
                </h3>
                <p class="text-charcoal-300 text-sm leading-relaxed mb-5">
                  {{ totalPins }} di sản được số hóa đầy đủ — ảnh, audio, timeline lịch sử và hồ sơ khoa học chi tiết.
                </p>
                <span class="inline-flex items-center gap-2 text-earth-400 text-sm font-semibold group-hover:text-earth-300 transition-colors">
                  Khám Phá Thư Viện
                  <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 3. AUDIO GUIDE — bottom-left enriched -->
        <div class="reveal group" style="animation-delay: 0.16s">
          <NuxtLink to="/explore" class="block">
            <div class="relative h-[280px] rounded-2xl border border-charcoal-800/60 hover:border-gold-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10 bg-charcoal-950 overflow-hidden cursor-pointer">
              <!-- Rich background: subtle audio-themed gradient -->
              <div class="absolute inset-0 bg-gradient-to-br from-gold-900/20 via-charcoal-950 to-charcoal-950" />
              <!-- Subtle dot grid pattern -->
              <div class="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C7A664_1px,transparent_1px)] [background-size:20px_20px]" />

              <!-- Waveform visual — larger and more prominent -->
              <div class="absolute top-7 right-7 flex items-end gap-0.5 h-14 pointer-events-none">
                <div
                  v-for="(h, i) in waveformBars"
                  :key="i"
                  class="w-1.5 rounded-full transition-colors duration-300"
                  :class="i % 3 === 0 ? 'bg-gold-400/50 group-hover:bg-gold-400/80' : 'bg-gold-400/25 group-hover:bg-gold-400/50'"
                  :style="{ height: `${h}px` }"
                />
              </div>

              <!-- Content -->
              <div class="absolute inset-0 flex flex-col p-6 lg:p-8">
                <div class="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center mb-auto">
                  <Icon name="mdi:headphones" class="w-6 h-6 text-gold-400" />
                </div>

                <div>
                  <span class="text-gold-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">Audio Guide</span>
                  <h3 class="font-heading font-bold text-ivory text-xl lg:text-2xl leading-snug mb-2">
                    Nghe Kể Chuyện Di Sản
                  </h3>
                  <p class="text-charcoal-400 text-sm leading-relaxed mb-4">
                    {{ audioHeritages.length }} audio thuyết minh giọng đọc thật, chạy xuyên suốt khi lướt trang.
                  </p>

                  <!-- Audio tracks mini-list -->
                  <div class="flex flex-wrap items-center gap-2 mb-4">
                    <div v-for="track in audioTracks" :key="track" class="flex items-center gap-1.5 bg-gold-500/8 border border-gold-500/15 rounded-full px-2.5 py-1">
                      <Icon name="mdi:music-note" class="w-3 h-3 text-gold-400/70" />
                      <span class="text-gold-300/70 text-[10px] font-medium">{{ track }}</span>
                    </div>
                  </div>

                  <span class="inline-flex items-center gap-1.5 text-gold-400 text-sm font-semibold group-hover:text-gold-300 transition-colors">
                    Khám phá
                    <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 4. GÓC HỌC TẬP — bottom-right enriched -->
        <div class="reveal group" style="animation-delay: 0.24s">
          <NuxtLink to="/study" class="block">
            <div class="relative h-[280px] rounded-2xl border border-charcoal-800/60 hover:border-forest-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-forest-500/10 bg-charcoal-950 overflow-hidden cursor-pointer">
              <!-- Rich background -->
              <div class="absolute inset-0 bg-gradient-to-bl from-forest-900/20 via-charcoal-950 to-charcoal-950" />
              <!-- Triangle pattern -->
              <div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#12B981_1px,transparent_1px)] [background-size:24px_24px]" />

              <!-- Badge icons floating top-right -->
              <div class="absolute top-6 right-6 flex gap-1.5 pointer-events-none">
                <div class="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                  <Icon name="mdi:medal" class="w-4 h-4 text-gold-400" />
                </div>
                <div class="w-8 h-8 rounded-lg bg-brick-500/20 border border-brick-500/30 flex items-center justify-center">
                  <Icon name="mdi:star" class="w-4 h-4 text-brick-400" />
                </div>
                <div class="w-8 h-8 rounded-lg bg-forest-500/20 border border-forest-500/30 flex items-center justify-center">
                  <Icon name="mdi:trophy" class="w-4 h-4 text-forest-400" />
                </div>
              </div>

              <!-- Content -->
              <div class="absolute inset-0 flex flex-col p-6 lg:p-8">
                <div class="w-11 h-11 rounded-xl bg-forest-500/15 border border-forest-500/25 flex items-center justify-center mb-auto">
                  <Icon name="mdi:school-outline" class="w-6 h-6 text-forest-400" />
                </div>

                <div>
                  <span class="text-forest-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">Góc Học Tập</span>
                  <h3 class="font-heading font-bold text-ivory text-xl lg:text-2xl leading-snug mb-2">
                    Quiz & Huy Hiệu
                  </h3>
                  <p class="text-charcoal-400 text-sm leading-relaxed mb-4">
                    {{ questionCount }} câu hỏi lịch sử, flashcard S'tiêng và huy hiệu điện tử cho học sinh.
                  </p>

                  <!-- Quick stats -->
                  <div class="flex items-center gap-4 mb-4">
                    <div class="text-center">
                      <span class="font-heading font-bold text-ivory text-xl block leading-none">{{ questionCount }}</span>
                      <span class="text-charcoal-500 text-[10px] mt-0.5 block">Câu hỏi</span>
                    </div>
                    <div class="w-px h-8 bg-charcoal-800" />
                    <div class="text-center">
                      <span class="font-heading font-bold text-ivory text-xl block leading-none">4</span>
                      <span class="text-charcoal-500 text-[10px] mt-0.5 block">Cấp độ</span>
                    </div>
                    <div class="w-px h-8 bg-charcoal-800" />
                    <div class="text-center">
                      <span class="font-heading font-bold text-gold-400 text-xl block leading-none">∞</span>
                      <span class="text-charcoal-500 text-[10px] mt-0.5 block">Huy hiệu</span>
                    </div>
                  </div>

                  <span class="inline-flex items-center gap-1.5 text-forest-400 text-sm font-semibold group-hover:text-forest-300 transition-colors">
                    Bắt đầu học
                    <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'
import { QUIZZES } from '~/data/quizzes'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const totalPins = computed(() => HERITAGES.length)
const audioHeritages = HERITAGES.filter((h) => h.audio)
const questionCount = QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)

const previewPins = [
  { id: 1, x: 22, y: 32, color: '#F59E0B' },
  { id: 2, x: 48, y: 55, color: '#C7A664' },
  { id: 3, x: 67, y: 28, color: '#12B981' },
  { id: 4, x: 35, y: 68, color: '#C7A664' },
  { id: 5, x: 78, y: 48, color: '#F59E0B' },
]

const waveformBars = Array.from({ length: 18 }, (_, i) => {
  const base = [32, 18, 40, 24, 48, 20, 36, 28, 44, 16, 38, 26, 42, 22, 34, 30, 46, 20]
  return base[i] ?? Math.random() * 32 + 12
})

// Real track names from heritage data — never list tracks that don't exist
const audioTracks = audioHeritages.map((h) => h.audio!.title)
</script>

<style scoped>
.waveform-animated {
  animation: waveAnim 0.8s ease-in-out infinite alternate;
}
@keyframes waveAnim {
  from { transform: scaleY(0.4); }
  to   { transform: scaleY(1.1); }
}
</style>
