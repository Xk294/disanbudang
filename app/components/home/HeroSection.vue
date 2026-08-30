<template>
  <section class="hero-root relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0C10]" aria-label="Hero section">

    <!-- ═══ BACKGROUND MEDIA (Video & Archival Slideshow) ═══ -->
    <div class="absolute inset-0 z-0 bg-[#0A0C10]">
      <video
        v-if="enableVideo"
        ref="heroVideoRef"
        class="hero-video"
        :class="{ 'hero-video--loaded': videoLoaded && revealed }"
        src="/video/virtual-tour/bom-bo/bom-bo-trailer.mp4"
        poster="/video/virtual-tour/bom-bo/poster.jpg"
        muted
        loop
        playsinline
        preload="auto"
        @canplay="markVideoReady"
        @progress="onVideoProgress"
      />

      <TransitionGroup name="hero-slide">
        <div
          v-for="(slide, i) in slides"
          v-show="(!videoLoaded || !revealed) && currentSlide === i"
          :key="i"
          class="absolute inset-0"
        >
          <NuxtImg
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover"
            :class="currentSlide === i ? 'ken-burns-active' : ''"
            :style="slide.position ? `object-position: ${slide.position}` : ''"
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
        </div>
      </TransitionGroup>
    </div>

    <!-- ═══ CINEMATIC ATMOSPHERIC OVERLAYS ═══ -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/65 to-[#0A0C10]/40 pointer-events-none" />
    <div class="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-[#0A0C10]/85 to-transparent pointer-events-none" />
    <div class="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,12,16,0.65)_0%,rgba(10,12,16,0.3)_65%,transparent_100%)] pointer-events-none" />
    <div class="absolute inset-0 z-10 opacity-[0.025] bg-[radial-gradient(#F2EDE6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

    <!-- ═══ ENTRY GATE — SẮC PHONG HOÀNG GIA REVEAL ═══ -->
    <Transition name="gate-fade">
      <div
        v-if="!revealed"
        class="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#0A0C10]/85 backdrop-blur-xl overflow-y-auto"
      >
        <template v-if="gateState === 'idle'">
          <RoyalScrollReveal class="w-full max-w-3xl lg:max-w-4xl my-auto">
            <!-- ═══ ORNATE SẮC PHONG ROYAL CONTENT PANEL ═══ -->
            <div class="relative px-5 sm:px-10 md:px-14 pt-14 sm:pt-16 md:pt-18 pb-12 sm:pb-14 md:pb-16 flex flex-col items-center text-center">

              <!-- Inner Ambient Golden Glow behind center title -->
              <div class="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(ellipse_at_50%_35%,rgba(212,175,55,0.18)_0%,rgba(199,166,100,0.05)_45%,transparent_75%)]" />

              <!-- 01 Institutional Eyebrow Label -->
              <div class="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1308]/90 border border-[#D4AF37]/50 text-[#F5E6C8] text-[10px] sm:text-[11.5px] uppercase tracking-[0.26em] font-bold backdrop-blur-md mb-4 shadow-[0_2px_14px_rgba(212,175,55,0.2)]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#E5B94C] animate-pulse shadow-[0_0_8px_#E5B94C]" />
                <span>BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG · TP. ĐỒNG NAI</span>
              </div>

              <!-- 02 Main Title + 03 Regal Divider + 04 Subtitle -->
              <div class="relative z-10 flex flex-col items-center mb-4 md:mb-5 w-full">
                <!-- Title: Majestic Royal Luminous Typography -->
                <h1 class="font-heading font-extrabold text-[clamp(1.65rem,3.6vw,3rem)] lg:text-[3.15rem] tracking-tight leading-[1.18] w-full text-center royal-title-gradient drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)]">
                  <span class="sm:inline whitespace-nowrap">Bảo Tàng Số </span><span class="whitespace-nowrap">Di Sản Bù Đăng</span>
                </h1>

                <!-- Elegant Heritage Divider -->
                <div class="flex items-center justify-center gap-3.5 my-3 w-full max-w-xs opacity-90">
                  <span class="h-px flex-1 bg-gradient-to-r from-transparent via-[#E5B94C] to-[#E5B94C]/70" />
                  <span class="text-[#E5B94C] text-xs select-none drop-shadow-[0_0_6px_rgba(229,185,76,0.8)]">❖</span>
                  <span class="h-px flex-1 bg-gradient-to-l from-transparent via-[#E5B94C] to-[#E5B94C]/70" />
                </div>

                <!-- Secondary Subtitle -->
                <span class="font-heading text-[clamp(1.1rem,2.5vw,1.6rem)] font-bold uppercase tracking-[0.24em] text-[#F3DC9B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Thành Phố Đồng Nai
                </span>
              </div>

              <!-- 05 Emotional Manifesto Quote -->
              <div class="relative z-10 max-w-2xl mx-auto my-2 px-6 sm:px-10">
                <span class="absolute -top-2 left-1 font-serif text-3xl sm:text-4xl text-[#E5B94C]/50 select-none pointer-events-none">“</span>
                <p class="font-accent italic text-[#FFFDF7] text-sm sm:text-base md:text-[1.12rem] leading-relaxed font-normal px-2 text-shadow-sm">
                  Di sản không chỉ thuộc về quá khứ — khi được số hóa, những câu chuyện của Bù Đăng sẽ tiếp tục được nhìn thấy, lắng nghe và trao truyền cho muôn đời sau.
                </p>
                <span class="absolute -bottom-5 right-1 font-serif text-3xl sm:text-4xl text-[#E5B94C]/50 select-none pointer-events-none">”</span>
              </div>

              <!-- Supporting Description -->
              <p class="relative z-10 text-[#E0D8C8]/90 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-6 sm:mb-8 font-light">
                Nền tảng bảo tồn và giới thiệu di sản văn hóa trên không gian số — tư liệu thực địa chuẩn hóa, âm vang tiếng chày Bom Bo và ký ức cộng đồng.
              </p>

              <!-- 06 Royal Jewel CTA Button -->
              <button
                class="royal-cta-btn group relative z-10 inline-flex items-center gap-3.5 px-9 sm:px-11 py-4 sm:py-4.5 rounded-full font-extrabold text-xs sm:text-sm cursor-pointer mb-6 sm:mb-8 transition-all duration-300 overflow-hidden"
                @click="startJourney"
              >
                <!-- Specular shimmer sweep -->
                <span class="royal-cta-shimmer" />

                <!-- Outer glow border ring -->
                <span class="absolute inset-0 rounded-full border border-[#FFFDF5]/70 pointer-events-none" />

                <!-- Inner compass icon & label -->
                <span class="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#120B04]/30 border border-[#241504]/40 flex items-center justify-center text-[#120B04] shadow-inner group-hover:scale-110 transition-transform">
                  <Icon name="mdi:compass-outline" class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#120B04]" />
                </span>
                <span class="relative z-10 text-[#120B04] uppercase tracking-[0.2em] font-extrabold text-xs sm:text-sm drop-shadow-sm">
                  Bắt Đầu Hành Trình Di Sản
                </span>
                <Icon name="mdi:arrow-right" class="relative z-10 w-4 h-4 text-[#120B04]/90 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <!-- 07 Integrated Stats & City Badge Dock -->
              <div class="relative z-10 w-full pt-4 sm:pt-5 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
                <!-- Platform Stats Capsule -->
                <div class="inline-flex items-center flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full bg-[#0E1118]/90 border border-[#D4AF37]/30 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                  <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="flex items-center gap-2 px-1 py-0.5 cursor-default group flex-shrink-0"
                  >
                    <div class="w-6.5 h-6.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/30 transition-all">
                      <Icon :name="stat.icon" class="w-3.5 h-3.5 text-[#E5B94C]" />
                    </div>
                    <div class="flex flex-col text-left">
                      <span class="font-heading font-bold text-[#FFFDF7] text-xs sm:text-sm leading-tight tabular-nums group-hover:text-[#F3DC9B] transition-colors">
                        {{ stat.value }}{{ stat.suffix }}
                      </span>
                      <span class="text-[#A89F8E] text-[8px] sm:text-[9px] uppercase tracking-wider leading-none mt-0.5 font-medium whitespace-nowrap">
                        {{ stat.label }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Heritage City Milestone Badge Capsule -->
                <div class="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl sm:rounded-full bg-[#0E1118]/90 border border-[#D4AF37]/30 shadow-[0_8px_24px_rgba(0,0,0,0.6)] cursor-default group">
                  <div class="w-6.5 h-6.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/35 transition-colors">
                    <Icon name="mdi:city" class="w-3.5 h-3.5 text-[#E5B94C]" />
                  </div>
                  <div class="flex flex-col text-left whitespace-nowrap">
                    <span class="font-heading font-semibold text-[#FFFDF7] text-xs sm:text-sm leading-tight">Thành Phố Đồng Nai</span>
                    <span class="text-[#A89F8E] text-[8px] sm:text-[9px] leading-none mt-0.5">TPTTTƯ thứ 7 · Từ 30/04/2026</span>
                  </div>
                </div>
              </div>

            </div>
          </RoyalScrollReveal>
        </template>

        <!-- Loading State for Cinematic Stream -->
        <template v-else-if="gateState === 'loading'">
          <div class="gate-spinner mb-6" />
          <h2 class="font-heading font-bold text-[#FFFDF7] text-xl md:text-2xl mb-2">
            Đang tải video toàn cảnh...
          </h2>
          <p class="text-neutral-300 text-xs sm:text-sm max-w-xs mb-5">
            Thuyết minh đã bắt đầu — video sẽ hiện ra ngay khi sẵn sàng.
          </p>
          <div class="w-52 h-1 rounded-full bg-neutral-800 overflow-hidden mb-5">
            <div
              class="h-full bg-[#D4AF37] rounded-full transition-all duration-300"
              :style="{ width: `${Math.max(bufferPercent, 8)}%` }"
            />
          </div>
          <button
            class="text-neutral-400 text-xs underline underline-offset-4 hover:text-[#D4AF37] transition-colors cursor-pointer"
            @click="useFallback"
          >
            Mạng chậm? Dùng ảnh thay thế
          </button>
        </template>
      </div>
    </Transition>

    <!-- ═══ AUDIO GUIDE FLOATING CONTROL ═══ -->
    <button
      id="hero-unmute-btn"
      class="absolute top-24 right-5 lg:right-8 z-20 hero-audio-btn"
      :class="{ 'is-active': isAudioGuideOn }"
      :title="isAudioGuideOn ? 'Tắt thuyết minh' : 'Nghe thuyết minh Sóc Bom Bo'"
      @click="toggleHeroAudio"
    >
      <div class="hero-audio-btn-inner">
        <Icon
          :name="isAudioGuideOn ? 'mdi:volume-high' : 'mdi:volume-off'"
          class="w-4 h-4 text-[#E5B94C]"
        />
        <span class="hero-audio-label">
          {{ isAudioGuideOn ? 'Thuyết Minh ON' : 'Nghe Thuyết Minh' }}
        </span>
      </div>
    </button>

    <!-- ═══ SLIDE CAPTION (Bottom-Left Archival Label) ═══ -->
    <Transition name="caption-fade">
      <div
        :key="currentSlide"
        class="hidden lg:block absolute bottom-14 left-10 z-20 pointer-events-none max-w-xs"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="w-4 h-px bg-[#D4AF37]/70" />
          <p class="text-[#E5B94C] text-[9px] uppercase tracking-[0.26em] font-semibold">
            {{ slides[currentSlide]?.label }}
          </p>
        </div>
        <p class="text-neutral-300/80 text-xs leading-relaxed font-light">
          {{ slides[currentSlide]?.caption }}
        </p>
      </div>
    </Transition>

    <!-- ═══ SLIDE COUNTER (Top-Right Archival Indicator) ═══ -->
    <div class="absolute top-24 right-6 lg:right-10 z-20 pointer-events-none hidden lg:flex items-center gap-1.5 text-xs text-neutral-400">
      <span class="font-heading font-medium text-[#FFFDF7] tabular-nums">{{ String(currentSlide + 1).padStart(2,'0') }}</span>
      <span class="text-neutral-600">/</span>
      <span class="text-neutral-500 tabular-nums">{{ String(slides.length).padStart(2,'0') }}</span>
    </div>

    <!-- ═══ REVEALED MAIN HERO CONTENT (Open Cinematic View) ═══ -->
    <div
      v-if="revealed"
      class="relative z-20 flex-1 flex flex-col items-center justify-center py-20 lg:py-24 px-4 sm:px-6 text-center"
    >
      <div class="w-full max-w-4xl mx-auto flex flex-col items-center">

        <!-- 01 Eyebrow Badge -->
        <div class="hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0D12]/80 border border-[#D4AF37]/40 text-[#F5E6C8] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold backdrop-blur-md mb-4 shadow-sm" style="--delay: 0s">
          <span class="w-1.5 h-1.5 rounded-full bg-[#E5B94C] animate-pulse" />
          <span>BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG · TP. ĐỒNG NAI</span>
        </div>

        <!-- 02 H1 Title + Divider + Subtitle -->
        <div class="hero-item flex flex-col items-center mb-5 w-full" style="--delay: 0.1s">
          <h1 class="font-heading font-extrabold text-[clamp(1.85rem,4.8vw,3.6rem)] tracking-tight leading-[1.18] w-full text-center royal-title-gradient drop-shadow-lg">
            <span class="sm:inline whitespace-nowrap">Bảo Tàng Số </span><span class="whitespace-nowrap">Di Sản Bù Đăng</span>
          </h1>

          <div class="flex items-center justify-center gap-3.5 my-3 w-full max-w-xs opacity-90">
            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-[#E5B94C] to-[#E5B94C]/70" />
            <span class="text-[#E5B94C] text-xs select-none">❖</span>
            <span class="h-px flex-1 bg-gradient-to-l from-transparent via-[#E5B94C] to-[#E5B94C]/70" />
          </div>

          <span class="font-heading text-[clamp(1.15rem,2.8vw,1.8rem)] font-bold uppercase tracking-[0.22em] text-[#F3DC9B]">
            Thành Phố Đồng Nai
          </span>
        </div>

        <!-- 03 Statement Manifesto Quote -->
        <p class="hero-item font-accent italic text-[#FFFDF7] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-3 font-normal" style="--delay: 0.18s">
          “Di sản không chỉ thuộc về quá khứ — khi được số hóa, những câu chuyện của Bù Đăng sẽ tiếp tục được nhìn thấy, lắng nghe và trao truyền cho muôn đời sau.”
        </p>

        <!-- Description -->
        <p class="hero-item text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 font-light" style="--delay: 0.26s">
          Nền tảng bảo tồn và giới thiệu di sản văn hóa không gian số — tư liệu thực địa chuẩn hóa, âm vang tiếng chày Bom Bo và ký ức cộng đồng.
        </p>

        <!-- 04 Action Row -->
        <div class="hero-item flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-8 sm:mb-10" style="--delay: 0.34s">
          <NuxtLink
            to="/explore"
            class="royal-cta-btn text-xs sm:text-sm px-7 sm:px-8 py-3.5 rounded-full font-bold tracking-wide flex items-center gap-2.5 transition-all duration-300 cursor-pointer shadow-md text-[#0E0B05]"
          >
            <Icon name="mdi:compass-outline" class="w-4.5 h-4.5 text-[#0E0B05]" />
            <span class="text-[#0E0B05] font-bold">Khám Phá Di Sản</span>
          </NuxtLink>

          <NuxtLink
            to="/map"
            class="museum-btn-secondary text-xs sm:text-sm px-7 sm:px-8 py-3.5 rounded-full font-medium tracking-wide flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
          >
            <Icon name="mdi:map-outline" class="w-4.5 h-4.5 text-neutral-300" />
            <span>Bản Đồ Di Sản</span>
          </NuxtLink>

          <!-- Audio Guide Pill -->
          <button
            type="button"
            class="museum-audio-pill group inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-[#D4AF37]/35 bg-[#0B0D12]/80 hover:bg-[#12151C] hover:border-[#D4AF37]/60 transition-all duration-300 backdrop-blur-md cursor-pointer text-left"
            :title="isAudioGuideOn ? 'Tắt thuyết minh' : 'Nghe thuyết minh Sóc Bom Bo'"
            @click="toggleHeroAudio"
          >
            <div class="relative w-8 h-8 flex-shrink-0">
              <NuxtImg
                src="/images/tranthiquyen.webp"
                alt="Trần Thị Quyên - Giọng đọc thuyết minh"
                class="w-full h-full rounded-full object-cover object-top border border-[#D4AF37]/50 group-hover:scale-105 transition-transform duration-300"
                width="32"
                height="32"
                loading="eager"
                @error="(e: any) => { e.target.src = '/images/tranthiquyen.jpg' }"
              />
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#0A0C10] border border-[#D4AF37]/60 flex items-center justify-center">
                <Icon :name="isAudioGuideOn ? 'mdi:volume-high' : 'mdi:headphones'" class="w-2 h-2 text-[#E5B94C]" />
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <span class="text-[#F3DC9B] text-[10.5px] font-bold uppercase tracking-wider leading-tight">Audio Thuyết Minh</span>
                <div class="flex items-end gap-[2px] h-2.5 px-0.5">
                  <span class="w-[2px] bg-[#E5B94C] rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 10px; --bar-delay: 0.1s" />
                  <span class="w-[2px] bg-[#E5B94C] rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 6px; --bar-delay: 0.3s" />
                  <span class="w-[2px] bg-[#E5B94C] rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 11px; --bar-delay: 0s" />
                </div>
              </div>
              <span class="text-neutral-300 text-[9.5px] leading-tight">{{ audioCount }} track · Giọng đọc Bù Đăng</span>
            </div>
            <Icon
              :name="isAudioGuideOn ? 'mdi:pause-circle' : 'mdi:play-circle'"
              class="w-4.5 h-4.5 text-[#E5B94C]/80 group-hover:text-[#F3DC9B] ml-0.5"
            />
          </button>
        </div>

        <!-- 05 Revealed Metadata Bar -->
        <div class="hero-item w-full flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 md:gap-x-6 gap-y-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#0B0D12]/80 border border-[#D4AF37]/30 backdrop-blur-md max-w-3xl shadow-xl" style="--delay: 0.42s">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            class="flex items-center gap-2 cursor-default group flex-shrink-0"
          >
            <Icon :name="stat.icon" class="w-3.5 h-3.5 text-[#E5B94C]" />
            <div class="flex items-baseline gap-1.5 whitespace-nowrap">
              <span class="font-heading font-bold text-[#FFFDF7] text-xs sm:text-sm tabular-nums">
                {{ stat.value }}{{ stat.suffix }}
              </span>
              <span class="text-neutral-400 text-[9.5px] sm:text-[10px] uppercase tracking-wider">
                {{ stat.label }}
              </span>
            </div>
            <span v-if="idx < stats.length - 1" class="hidden sm:inline text-[#D4AF37]/25 ml-2.5 sm:ml-3 select-none">/</span>
          </div>
        </div>

      </div>
    </div>

    <!-- ═══ SLIDE INDICATORS (Vertical dots) ═══ -->
    <div class="absolute bottom-[90px] lg:bottom-[50px] right-6 lg:right-10 z-20 flex flex-col gap-2">
      <button
        v-for="(_, i) in slides"
        :key="`dot-${i}`"
        class="rounded-full transition-all duration-500 cursor-pointer"
        :class="currentSlide === i
          ? 'w-1 h-6 bg-[#E5B94C]'
          : 'w-1 h-2.5 bg-neutral-600 hover:bg-neutral-400'"
        :aria-label="`Slide ${i + 1}`"
        :aria-current="currentSlide === i ? 'true' : undefined"
        @click="goToSlide(i)"
      />
    </div>

    <!-- ═══ SCROLL INDICATOR ═══ -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
      <div class="w-4 h-7 border border-neutral-500/40 rounded-full flex justify-center pt-1">
        <div class="w-0.5 h-1 bg-[#E5B94C]/90 rounded-full scroll-dot" />
      </div>
      <span class="text-neutral-400 text-[8.5px] uppercase tracking-[0.24em]">Cuộn Xuống</span>
    </div>

  </section>
</template>

<script setup lang="ts">
import { useHeritageStore } from '~/stores/heritage'
import { useAudioStore } from '~/stores/audio'
import { HERITAGES } from '~/data/heritages'
import { COMMUNITY_POSTS } from '~/data/posts'
import { QUIZZES } from '~/data/quizzes'
import type { HeritageAudio } from '~/types'

const heritageStore = useHeritageStore()
const audioStore = useAudioStore()
const heroVideoRef = ref<HTMLVideoElement | null>(null)
const videoLoaded = ref(false)
const isJourneyStarted = useState<boolean>('isJourneyStarted', () => false)
const gateState = ref<'idle' | 'loading' | 'ready' | 'fallback'>(
  isJourneyStarted.value ? 'ready' : 'idle'
)
const revealed = computed(() => gateState.value === 'ready' || gateState.value === 'fallback')
const bufferPercent = ref(0)
const enableVideo = ref(true)
const isAudioGuideOn = ref(audioStore.isPlaying && audioStore.currentTrack?.id === 'khu-bao-ton-soc-bom-bo')
let fallbackTimer: ReturnType<typeof setTimeout> | undefined
let slideInterval: ReturnType<typeof setInterval>
const audioCount = HERITAGES.filter((h) => h.audio).length
const questionCount = QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)

// Animated metric counters on load
const animatedHeritages = ref(0)
const animatedPosts = ref(0)
const animatedAudio = ref(0)
const animatedQuestions = ref(0)

function runCounters() {
  const animateCount = (target: number, setter: (n: number) => void, duration = 1200) => {
    if (!target) {
      setter(0)
      return
    }
    const start = 0
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setter(Math.round(start + (target - start) * ease))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }

  animateCount(heritageStore.totalCount, (v) => { animatedHeritages.value = v })
  animateCount(COMMUNITY_POSTS.length, (v) => { animatedPosts.value = v })
  animateCount(audioCount, (v) => { animatedAudio.value = v })
  animateCount(questionCount, (v) => { animatedQuestions.value = v })
}

const bomBoAudio: HeritageAudio = {
  id: 'khu-bao-ton-soc-bom-bo',
  title: 'Thuyết minh: Khu Bảo Tồn Sóc Bom Bo',
  narrator: 'Trần Thị Quyên · Di Sản Bù Đăng',
  duration: 560,
  url: '/audio/khu-bao-ton-soc-bom-bo.mp3',
  coverImage: '/images/tranthiquyen.webp',
}

function playHeroAudio() {
  audioStore.loadTrack(bomBoAudio, 'khu-bao-ton-soc-bom-bo')
  audioStore.play()
  isAudioGuideOn.value = true
}

function toggleHeroAudio() {
  if (isAudioGuideOn.value) {
    audioStore.pause()
    isAudioGuideOn.value = false
  } else {
    playHeroAudio()
  }
}

function onVideoProgress() {
  const v = heroVideoRef.value
  if (!v || !v.duration || !v.buffered.length) return
  try {
    const bufferedEnd = v.buffered.end(v.buffered.length - 1)
    bufferPercent.value = Math.min(100, Math.round((bufferedEnd / v.duration) * 100))
  } catch {
    // buffered range can throw if the video has no data yet
  }
}

function clearFallbackTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = undefined
  }
}

function markVideoReady() {
  videoLoaded.value = true
  if (gateState.value === 'loading') {
    gateState.value = 'ready'
    clearFallbackTimer()
  }
  if (isJourneyStarted.value) {
    heroVideoRef.value?.play().catch(() => {})
  }
}

function useFallback() {
  clearFallbackTimer()
  isJourneyStarted.value = true
  if (gateState.value !== 'ready') gateState.value = 'fallback'
}

function startJourney() {
  isJourneyStarted.value = true
  playHeroAudio()

  if (!enableVideo.value) {
    gateState.value = 'fallback'
    return
  }

  if (videoLoaded.value) {
    gateState.value = 'ready'
    nextTick(() => {
      heroVideoRef.value?.play().catch(() => {})
    })
    return
  }

  gateState.value = 'loading'
  nextTick(() => {
    heroVideoRef.value?.play().catch(() => {})
  })
  fallbackTimer = setTimeout(useFallback, 8000)
}

function startAutoPlay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6500)
}

function goToSlide(i: number) {
  currentSlide.value = i
  clearInterval(slideInterval)
  startAutoPlay()
}

onMounted(() => {
  runCounters()
  startAutoPlay()

  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType ?? ''))) {
    enableVideo.value = false
  }

  nextTick(() => {
    if ((heroVideoRef.value?.readyState ?? 0) >= 3) {
      markVideoReady()
    }
    if (isJourneyStarted.value) {
      heroVideoRef.value?.play().catch(() => {})
    }
  })
})

watch(() => audioStore.isPlaying, (playing) => {
  if (!playing && isAudioGuideOn.value) {
    isAudioGuideOn.value = false
  }
})

onUnmounted(() => {
  heroVideoRef.value?.pause()
  clearFallbackTimer()
  clearInterval(slideInterval)
})

const slides = [
  {
    image: '/images/heritage/Bombo/TAN08220.jpg',
    alt: 'Sóc Bom Bo — tiếng chày giã gạo nuôi quân',
    label: 'SÓC BOM BO',
    caption: 'Nhịp chày giã gạo vang vọng đại ngàn — biểu tượng bất khuất của miền Đông Nam Bộ',
    position: 'center top',
  },
  {
    image: '/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg',
    alt: 'Rừng nguyên sinh Thành Phố Đồng Nai',
    label: 'RỪNG NGUYÊN SINH ĐỒNG NAI',
    caption: 'Kho báu đa dạng sinh học của Đông Nam Bộ còn nguyên vẹn qua hàng thế kỷ',
    position: 'center center',
  },
  {
    image: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
    alt: 'Nhà dài truyền thống S\'tiêng',
    label: 'NHÀ DÀI TRUYỀN THỐNG',
    caption: 'Kiến trúc cộng đồng độc đáo trên cao nguyên đất đỏ — linh hồn văn hóa S\'tiêng',
    position: 'center 30%',
  },
  {
    image: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    alt: 'Lễ hội mừng lúa mới M\'nông',
    label: 'LỄ HỘI MỪNG LÚA MỚI',
    caption: 'Lời tạ ơn của đất trời và mùa vàng bội thu — nghi lễ thiêng liêng ngàn đời',
    position: 'center center',
  },
  {
    image: '/images/heritage/img-disanbudang/thac-mo-dong-nai.png',
    alt: 'Hồ Thác Mơ — Phước Long',
    label: 'HỒ THÁC MƠ — PHƯỚC LONG',
    caption: 'Viên ngọc xanh soi bóng núi Bà Rá huyền thoại — điểm đến khó quên',
    position: 'center 40%',
  },
]

const currentSlide = ref(0)

const stats = computed(() => [
  { icon: 'mdi:bank-outline', value: String(animatedHeritages.value || heritageStore.totalCount), suffix: '', label: 'Di sản số hóa' },
  { icon: 'mdi:book-open-outline', value: String(animatedPosts.value || COMMUNITY_POSTS.length), suffix: '', label: 'Ký ức cộng đồng' },
  { icon: 'mdi:headphones', value: String(animatedAudio.value || audioCount), suffix: '', label: 'Audio guide' },
  { icon: 'mdi:help-circle-outline', value: String(animatedQuestions.value || questionCount), suffix: '', label: 'Câu hỏi lịch sử' },
])
</script>

<style scoped>
/* ── Hero video ── */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease;
  filter: contrast(1.05) brightness(0.95);
}
.hero-video--loaded {
  opacity: 1;
}

/* ── Royal Luminous Gradient Title ── */
.royal-title-gradient {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFF4D6 55%, #F0D598 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Gate transitions ── */
.gate-fade-enter-active { transition: opacity 0.5s ease; }
.gate-fade-leave-active { transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.gate-fade-enter-from,
.gate-fade-leave-to { opacity: 0; }

.gate-spinner {
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  border: 2px solid rgba(212, 175, 55, 0.2);
  border-top-color: #D4AF37;
  animation: gateSpin 0.9s linear infinite;
}
@keyframes gateSpin {
  to { transform: rotate(360deg); }
}

/* ── Royal Jewel CTA Button ── */
.royal-cta-btn {
  background: linear-gradient(135deg, #E5B94C 0%, #D4AF37 50%, #B8860B 100%);
  color: #0E0B05;
  box-shadow: 0 4px 18px -2px rgba(212, 175, 55, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.royal-cta-btn:hover {
  background: linear-gradient(135deg, #ECC562 0%, #DEBA47 50%, #C49216 100%);
  color: #0A0804;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -2px rgba(212, 175, 55, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.6);
}
.royal-cta-btn:active {
  transform: translateY(0) scale(0.99);
}

.royal-cta-shimmer {
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);
  transform: skewX(-25deg);
  animation: ctaShimmer 4s ease-in-out infinite;
}
@keyframes ctaShimmer {
  0%, 25% { left: -150%; }
  65%, 100% { left: 200%; }
}

.museum-btn-secondary {
  background: rgba(11, 13, 18, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #EDE6DB;
  backdrop-filter: blur(10px);
}
.museum-btn-secondary:hover {
  background: rgba(20, 24, 32, 0.9);
  border-color: rgba(212, 175, 55, 0.5);
  color: #FFFFFF;
}

/* ── Soundwave animation ── */
.soundwave-bar {
  height: 2px;
  opacity: 0.5;
  transition: all 0.3s ease;
}
.soundwave-active {
  opacity: 1;
  animation: soundwaveJump 0.8s ease-in-out infinite alternate;
  animation-delay: var(--bar-delay, 0s);
}
@keyframes soundwaveJump {
  0% { height: 2px; }
  100% { height: var(--bar-h, 10px); }
}

/* ── Hero audio button ── */
.hero-audio-btn {
  cursor: pointer;
}
.hero-audio-btn-inner {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  background: rgba(11, 13, 18, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(212, 175, 55, 0.35);
  color: #EDE6DB;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
}
.hero-audio-btn:hover .hero-audio-btn-inner {
  background: rgba(18, 21, 28, 0.9);
  border-color: rgba(212, 175, 55, 0.6);
  color: #FFFFFF;
}
.hero-audio-btn.is-active .hero-audio-btn-inner {
  background: rgba(20, 24, 32, 0.85);
  border-color: rgba(212, 175, 55, 0.75);
  color: #E5B94C;
}
.hero-audio-label {
  display: none;
}
@media (min-width: 640px) {
  .hero-audio-label { display: inline; }
}

/* ── Slideshow transition ── */
.hero-slide-enter-active { transition: opacity 1.8s ease; }
.hero-slide-leave-active { transition: opacity 1.8s ease; }
.hero-slide-enter-from,
.hero-slide-leave-to { opacity: 0; }

.ken-burns-active {
  animation: kenburns 22s ease-out infinite alternate;
}
@keyframes kenburns {
  0% { transform: scale(1.05) translateX(0px); }
  100% { transform: scale(1) translateX(-8px); }
}

/* ── Caption transition ── */
.caption-fade-enter-active { transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s; }
.caption-fade-leave-active { transition: opacity 0.3s ease; }
.caption-fade-enter-from { opacity: 0; transform: translateY(4px); }
.caption-fade-leave-to { opacity: 0; }

/* ── Hero content entrance ── */
.hero-item {
  animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0s);
}
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Scroll dot ── */
.scroll-dot {
  animation: scrollBounce 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50%       { transform: translateY(8px); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-item, .scroll-dot, .ken-burns-active, .soundwave-active {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
