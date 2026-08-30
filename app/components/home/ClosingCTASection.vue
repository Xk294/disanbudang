<template>
  <section class="relative overflow-hidden border-t border-charcoal-800/60" aria-label="Khám phá di sản">

    <!-- Full bg image with strong overlay for readability -->
    <div class="absolute inset-0 z-0">
      <NuxtImg
        src="/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png"
        alt="Lễ hội mừng lúa mới"
        class="w-full h-full object-cover"
        style="object-position: center 30%"
        loading="lazy"
      />
      <!-- Dark base overlay -->
      <div class="absolute inset-0 bg-charcoal-950/85" />
      <!-- Left-to-right gradient: very dark left, semi-dark right -->
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/80 to-charcoal-950/70" />
      <!-- Bottom fade to blend with footer -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal-950 to-transparent" />
    </div>

    <!-- Gold ambient glow top-left -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] z-0 bg-gold-500/6 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative z-10 py-20 lg:py-28">
      <div class="container-heritage">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <!-- Left: Hero text + CTAs -->
          <div class="reveal">
            <div class="flex items-center gap-3 mb-5">
              <span class="w-8 h-px bg-gold-400" />
              <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Bắt Đầu Hành Trình</span>
            </div>
            <h2 class="font-heading font-bold text-ivory text-4xl lg:text-5xl xl:text-6xl leading-[1.38] mb-6">
              Khám Phá<br/>
              <span class="text-gradient-gold">Di Sản Số</span>
            </h2>
            <p class="text-charcoal-300 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
              Từ bản đồ tương tác đến audio thuyết minh — nền tảng số hóa đầy đủ nhất về di sản
              văn hóa khắp Thành Phố Đồng Nai — từ Sóc Bom Bo, Chiến Khu Đ đến núi Bà Rá.
            </p>

            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/map" class="btn-primary text-sm px-7 py-3.5">
                <Icon name="mdi:map-outline" class="w-4.5 h-4.5" />
                Bản Đồ Di Sản
              </NuxtLink>
              <NuxtLink to="/explore" class="btn-ghost text-sm px-7 py-3.5 border border-ivory/20 text-ivory/75 hover:border-gold-400/50 hover:text-gold-300">
                <Icon name="mdi:compass-outline" class="w-4.5 h-4.5" />
                Khám Phá Tất Cả
              </NuxtLink>
            </div>
          </div>

          <!-- Right: quick links panel -->
          <div class="space-y-3 reveal">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="group flex items-center gap-4 p-4 lg:p-5 rounded-2xl border border-white/8 hover:border-gold-500/30 bg-charcoal-900/60 backdrop-blur-md hover:bg-charcoal-900/80 transition-all duration-300"
            >
              <div
                class="w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                :class="link.iconBg"
              >
                <Icon :name="link.icon" class="w-5 h-5" :class="link.iconColor" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-heading font-semibold text-ivory text-sm lg:text-base group-hover:text-gold-200 transition-colors leading-snug">{{ link.title }}</p>
                <p class="text-charcoal-400 text-xs mt-0.5 leading-snug">{{ link.desc }}</p>
              </div>
              <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-400 group-hover:text-gold-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </NuxtLink>
          </div>

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

const audioCount = HERITAGES.filter((h) => h.audio).length
const questionCount = QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)

const quickLinks = [
  {
    to: '/map',
    icon: 'mdi:map-search',
    iconBg: 'bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20',
    iconColor: 'text-gold-400',
    title: 'Bản Đồ Di Sản Tương Tác',
    desc: `Định vị tất cả ${HERITAGES.length} di sản trên bản đồ số tương tác`,
  },
  {
    to: '/study',
    icon: 'mdi:school-outline',
    iconBg: 'bg-forest-500/10 border border-forest-500/20 group-hover:bg-forest-500/20',
    iconColor: 'text-forest-400',
    title: 'Góc Học Tập & Quiz',
    desc: `${questionCount} câu hỏi lịch sử, flashcard thuật ngữ S'tiêng`,
  },
  {
    to: '/explore',
    icon: 'mdi:headphones',
    iconBg: 'bg-earth-500/10 border border-earth-500/20 group-hover:bg-earth-500/20',
    iconColor: 'text-earth-400',
    title: 'Audio Thuyết Minh',
    desc: `${audioCount} track audio guide giọng đọc truyền cảm địa phương`,
  },
  {
    to: '/contribute',
    icon: 'mdi:account-group-outline',
    iconBg: 'bg-brick-500/10 border border-brick-500/20 group-hover:bg-brick-500/20',
    iconColor: 'text-brick-400',
    title: 'Đóng Góp Cộng Đồng',
    desc: 'Chia sẻ ký ức, ảnh và câu chuyện của bạn',
  },
]
</script>
