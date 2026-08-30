<template>
  <section id="three-doors" class="section relative bg-[#0C0F14] border-t border-charcoal-800/80 overflow-hidden" aria-label="Ba cánh cửa trải nghiệm di sản">
    <!-- Ambient Heritage Glow -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-forest-500/5 rounded-full blur-[130px] pointer-events-none" />

    <div class="container-heritage relative z-10">

      <!-- ── SECTION HEADER (30-second answer: "Có gì để khám phá?") ── -->
      <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span>Ba Cánh Cửa Trải Nghiệm</span>
        </div>
        <h2 class="font-heading font-extrabold text-ivory text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 tracking-normal">
          Mở Ra Không Gian Di Sản
        </h2>
        <p class="text-charcoal-300 text-sm sm:text-base leading-relaxed">
          Mỗi cánh cửa là một phương thức tiếp cận độc đáo — từ định vị thực địa, trau dồi tri thức đến lắng nghe thanh âm bản địa đại ngàn.
        </p>
      </div>

      <!-- ── THREE DOORS GRID (1 Primary CTA per door) ── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        <!-- ═══ DOOR 1: KHÁM PHÁ (Explore & Map & 360) ═══ -->
        <article class="door-card group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-gradient-to-b from-charcoal-900/90 via-charcoal-950 to-[#0A0C10] border border-charcoal-800 hover:border-gold-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10">
          <!-- Background image with subtle zoom -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            <NuxtImg
              src="/images/heritage/danh-thang/bu-lach-lg.webp"
              alt="Cửa 1: Khám phá di sản Bù Đăng"
              class="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
              format="webp"
              sizes="xs:100vw lg:33vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/80 to-charcoal-950/60" />
          </div>

          <!-- Door Content Top -->
          <div class="relative z-10 p-7 sm:p-8">
            <!-- Icon Badge + Door Index -->
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-300 shadow-md">
                <Icon name="mdi:compass-outline" class="w-6 h-6" />
              </div>
              <span class="font-heading font-bold text-gold-500/30 text-2xl tracking-widest select-none">
                01
              </span>
            </div>

            <!-- Door Tagline -->
            <span class="text-gold-400 text-[10.5px] uppercase tracking-[0.2em] font-bold block mb-1.5">
              Bản Đồ & 360° VR
            </span>
            <!-- Door Title -->
            <h3 class="font-heading font-bold text-ivory text-2xl sm:text-2xl leading-snug mb-3 group-hover:text-gold-200 transition-colors">
              Khám Phá
            </h3>
            <!-- Door Description -->
            <p class="text-charcoal-300 text-xs sm:text-sm leading-relaxed mb-6">
              Tọa độ 16 di sản thực địa trên bản đồ số GIS, 3 tuyến lộ trình văn hóa và chuyến tham quan thực tế ảo 360° tại Sóc Bom Bo, Trảng Cỏ Bù Lạch.
            </p>

            <!-- Key Feature Bullets -->
            <ul class="space-y-2 mb-6 text-xs text-charcoal-400">
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>16 điểm di tích & danh thắng chuẩn hóa</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>Không gian thực tế ảo 360° tương tác</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>Chỉ đường thực địa & bộ lọc chuyên sâu</span>
              </li>
            </ul>
          </div>

          <!-- Door Bottom Single Primary CTA -->
          <div class="relative z-10 p-7 sm:p-8 pt-0">
            <NuxtLink
              to="/explore"
              class="w-full py-3.5 px-6 rounded-2xl bg-charcoal-900 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-300 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-gold-500/20"
            >
              <span>Mở Bản Đồ & Tuyến Điểm</span>
              <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </article>

        <!-- ═══ DOOR 2: HỌC (Study & Knowledge & Quiz) ═══ -->
        <article class="door-card group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-gradient-to-b from-charcoal-900/90 via-charcoal-950 to-[#0A0C10] border border-charcoal-800 hover:border-gold-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10">
          <!-- Background image with subtle zoom -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            <NuxtImg
              src="/images/heritage/lich-su/soc-bom-bo-lg.webp"
              alt="Cửa 2: Học tập di sản Bù Đăng"
              class="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
              format="webp"
              sizes="xs:100vw lg:33vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/80 to-charcoal-950/60" />
          </div>

          <!-- Door Content Top -->
          <div class="relative z-10 p-7 sm:p-8">
            <!-- Icon Badge + Door Index -->
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-300 shadow-md">
                <Icon name="mdi:school-outline" class="w-6 h-6" />
              </div>
              <span class="font-heading font-bold text-gold-500/30 text-2xl tracking-widest select-none">
                02
              </span>
            </div>

            <!-- Door Tagline -->
            <span class="text-gold-400 text-[10.5px] uppercase tracking-[0.2em] font-bold block mb-1.5">
              Góc Học Tập & Tri Thức
            </span>
            <!-- Door Title -->
            <h3 class="font-heading font-bold text-ivory text-2xl sm:text-2xl leading-snug mb-3 group-hover:text-gold-200 transition-colors">
              Học
            </h3>
            <!-- Door Description -->
            <p class="text-charcoal-300 text-xs sm:text-sm leading-relaxed mb-6">
              Kho tài liệu giáo dục địa phương, 16 bộ câu hỏi trắc nghiệm tương tác, 24 flashcard thuật ngữ S'tiêng - M'nông và tư liệu nghiên cứu văn hóa.
            </p>

            <!-- Key Feature Bullets -->
            <ul class="space-y-2 mb-6 text-xs text-charcoal-400">
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>16 bộ trắc nghiệm tương tác có chấm điểm</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>24 thẻ thuật ngữ & phong tục bản địa</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>Học liệu giáo dục mở cho học sinh, giáo viên</span>
              </li>
            </ul>
          </div>

          <!-- Door Bottom Single Primary CTA -->
          <div class="relative z-10 p-7 sm:p-8 pt-0">
            <NuxtLink
              to="/study"
              class="w-full py-3.5 px-6 rounded-2xl bg-charcoal-900 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-300 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-gold-500/20"
            >
              <span>Vào Góc Học Tập</span>
              <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </article>

        <!-- ═══ DOOR 3: NGHE (Audio Guide & Local Voices) ═══ -->
        <article class="door-card group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-gradient-to-b from-charcoal-900/90 via-charcoal-950 to-[#0A0C10] border border-charcoal-800 hover:border-gold-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10">
          <!-- Background image with subtle zoom -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            <NuxtImg
              src="/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp"
              alt="Cửa 3: Nghe thuyết minh di sản Bù Đăng"
              class="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
              format="webp"
              sizes="xs:100vw lg:33vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/80 to-charcoal-950/60" />
          </div>

          <!-- Door Content Top -->
          <div class="relative z-10 p-7 sm:p-8">
            <!-- Icon Badge + Door Index -->
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-300 shadow-md">
                <Icon name="mdi:headphones" class="w-6 h-6" />
              </div>
              <span class="font-heading font-bold text-gold-500/30 text-2xl tracking-widest select-none">
                03
              </span>
            </div>

            <!-- Door Tagline -->
            <span class="text-gold-400 text-[10.5px] uppercase tracking-[0.2em] font-bold block mb-1.5">
              Audio Guide & Thanh Âm Bản Địa
            </span>
            <!-- Door Title -->
            <h3 class="font-heading font-bold text-ivory text-2xl sm:text-2xl leading-snug mb-3 group-hover:text-gold-200 transition-colors">
              Nghe
            </h3>
            <!-- Door Description -->
            <p class="text-charcoal-300 text-xs sm:text-sm leading-relaxed mb-6">
              16 bản audio thuyết minh truyền cảm từ người con Bù Đăng (Trần Thị Quyên), tiếng chày Bom Bo giã gạo nuôi quân và âm vang cồng chiêng đại ngàn.
            </p>

            <!-- Key Feature Bullets -->
            <ul class="space-y-2 mb-6 text-xs text-charcoal-400">
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>16 track thuyết minh giọng đọc bản địa Bù Đăng</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>Âm thanh thực địa tiếng chày & hòa tấu cồng chiêng</span>
              </li>
              <li class="flex items-center gap-2">
                <Icon name="mdi:check-circle-outline" class="w-4 h-4 text-gold-400 shrink-0" />
                <span>Phát trực tiếp trên web không cần cài đặt</span>
              </li>
            </ul>
          </div>

          <!-- Door Bottom Single Primary CTA -->
          <div class="relative z-10 p-7 sm:p-8 pt-0">
            <button
              type="button"
              class="w-full py-3.5 px-6 rounded-2xl bg-charcoal-900 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-300 hover:text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-gold-500/20 cursor-pointer"
              @click="playFeaturedAudio"
            >
              <Icon :name="isAudioPlaying ? 'mdi:pause-circle-outline' : 'mdi:play-circle-outline'" class="w-4 h-4" />
              <span>{{ isAudioPlaying ? 'Tạm Dừng Thuyết Minh' : 'Bật Thuyết Minh Bản Địa' }}</span>
            </button>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useAudioStore } from '~/stores/audio'
import type { HeritageAudio } from '~/types'

const audioStore = useAudioStore()

const bomBoAudio: HeritageAudio = {
  id: 'khu-bao-ton-soc-bom-bo',
  title: 'Thuyết minh: Khu Bảo Tồn Sóc Bom Bo',
  narrator: 'Trần Thị Quyên · Di Sản Bù Đăng',
  duration: 560,
  url: '/audio/khu-bao-ton-soc-bom-bo.mp3',
  coverImage: '/images/tranthiquyen.webp',
}

const isAudioPlaying = computed(() => {
  return audioStore.isPlaying && audioStore.currentTrack?.id === 'khu-bao-ton-soc-bom-bo'
})

function playFeaturedAudio() {
  if (isAudioPlaying.value) {
    audioStore.pause()
  } else {
    audioStore.loadTrack(bomBoAudio, 'khu-bao-ton-soc-bom-bo')
    audioStore.play()
  }
}
</script>
