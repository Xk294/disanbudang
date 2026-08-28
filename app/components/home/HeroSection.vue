<template>
  <section class="hero-root relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero section">

    <!-- ═══ BACKGROUND VIDEO (primary) ═══ -->
    <div class="absolute inset-0 z-0 bg-charcoal-950">
      <!-- Video: Khu Bảo Tồn Sóc Bom Bo — preloads silently behind the entry gate,
           only starts playing once the user clicks "Bắt Đầu Hành Trình" -->
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
      <!-- Fallback image slideshow shown while video loads -->
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

    <!-- ═══ LAYERED OVERLAYS ═══ -->
    <!-- Dark base vignette: calibrated on bottom & center for crisp text legibility -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/65 to-charcoal-950/40" />
    <!-- Center vignette scrim for focused legibility -->
    <div class="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,12,16,0.75)_0%,rgba(10,12,16,0.35)_60%,transparent_100%)]" />
    <!-- Radial ambient breathing gold glow behind center hero content -->
    <div class="absolute inset-0 z-10 hero-ambient-glow pointer-events-none" />
    <!-- Top fade for header -->
    <div class="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-charcoal-950/80 to-transparent" />
    <!-- Amber cinematic tint -->
    <div class="absolute inset-0 z-10 bg-gradient-to-br from-transparent via-transparent to-gold-900/10 pointer-events-none" />

    <!-- ═══ ENTRY GATE — ORNATE ROYAL HERITAGE FRAME ═══ -->
    <Transition name="gate-fade">
      <div
        v-if="!revealed"
        class="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 sm:p-6 bg-charcoal-950/85 backdrop-blur-xl overflow-y-auto"
      >
        <!-- SVG Gradient Definition for Corner Filigrees -->
        <svg class="sr-only" aria-hidden="true">
          <defs>
            <linearGradient id="goldFiligreeGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F5E6C8" />
              <stop offset="0.5" stop-color="#C9A96A" />
              <stop offset="1" stop-color="#8F7138" />
            </linearGradient>
          </defs>
        </svg>

        <template v-if="gateState === 'idle'">
          <div class="w-full max-w-3xl lg:max-w-4xl my-auto">
            <!-- ═══ ORNATE ROYAL HERITAGE PANEL ═══ -->
            <div class="heritage-frame relative px-6 sm:px-12 md:px-16 py-8 sm:py-10 md:py-12 rounded-3xl bg-charcoal-950/85 backdrop-blur-2xl border border-gold-400/40 shadow-[0_0_90px_-15px_rgba(201,169,106,0.35)] flex flex-col items-center text-center">

              <!-- 4 Ornate Filigree Corner SVG Glyphs -->
              <svg class="corner-filigree corner-tl" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 38V14C2 7.37258 7.37258 2 14 2H38" stroke="url(#goldFiligreeGrad)" stroke-width="2" stroke-linecap="round" />
                <path d="M6 34V16C6 10.4772 10.4772 6 16 6H34" stroke="url(#goldFiligreeGrad)" stroke-width="1" stroke-opacity="0.75" stroke-linecap="round" />
                <path d="M14 14L17 11L20 14L17 17Z" fill="url(#goldFiligreeGrad)" />
                <circle cx="8" cy="8" r="2.5" fill="#F3E5C8" />
              </svg>
              <svg class="corner-filigree corner-tr" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 38V14C2 7.37258 7.37258 2 14 2H38" stroke="url(#goldFiligreeGrad)" stroke-width="2" stroke-linecap="round" />
                <path d="M6 34V16C6 10.4772 10.4772 6 16 6H34" stroke="url(#goldFiligreeGrad)" stroke-width="1" stroke-opacity="0.75" stroke-linecap="round" />
                <path d="M14 14L17 11L20 14L17 17Z" fill="url(#goldFiligreeGrad)" />
                <circle cx="8" cy="8" r="2.5" fill="#F3E5C8" />
              </svg>
              <svg class="corner-filigree corner-bl" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 38V14C2 7.37258 7.37258 2 14 2H38" stroke="url(#goldFiligreeGrad)" stroke-width="2" stroke-linecap="round" />
                <path d="M6 34V16C6 10.4772 10.4772 6 16 6H34" stroke="url(#goldFiligreeGrad)" stroke-width="1" stroke-opacity="0.75" stroke-linecap="round" />
                <path d="M14 14L17 11L20 14L17 17Z" fill="url(#goldFiligreeGrad)" />
                <circle cx="8" cy="8" r="2.5" fill="#F3E5C8" />
              </svg>
              <svg class="corner-filigree corner-br" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 38V14C2 7.37258 7.37258 2 14 2H38" stroke="url(#goldFiligreeGrad)" stroke-width="2" stroke-linecap="round" />
                <path d="M6 34V16C6 10.4772 10.4772 6 16 6H34" stroke="url(#goldFiligreeGrad)" stroke-width="1" stroke-opacity="0.75" stroke-linecap="round" />
                <path d="M14 14L17 11L20 14L17 17Z" fill="url(#goldFiligreeGrad)" />
                <circle cx="8" cy="8" r="2.5" fill="#F3E5C8" />
              </svg>

              <!-- Top & Bottom Ambient Light Sweep Glow inside frame -->
              <div class="absolute -top-px inset-x-16 sm:inset-x-28 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-90" />
              <div class="absolute -bottom-px inset-x-16 sm:inset-x-28 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-70" />

              <!-- Eyebrow Badge -->
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 backdrop-blur-md mb-4 shadow-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span class="text-gold-300 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold">
                  Bảo Tàng Số Di Sản Bù Đăng · TP. Đồng Nai
                </span>
              </div>

              <!-- H1 Title: Separated & Elevated with Regal Divider -->
              <div class="flex flex-col items-center mb-4 md:mb-5 text-shadow-hero">
                <h2 class="font-heading font-extrabold text-[clamp(1.75rem,4.2vw,3.2rem)] text-ivory tracking-tight leading-tight">
                  Bảo Tàng Số Di Sản Bù Đăng
                </h2>

                <!-- Elegant Heritage Divider between the 2 lines -->
                <div class="flex items-center justify-center gap-3 my-2.5 w-full max-w-xs opacity-90">
                  <span class="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400 to-gold-400/70" />
                  <span class="text-gold-400 text-xs">❖</span>
                  <span class="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400 to-gold-400/70" />
                </div>

                <!-- Secondary Title Line -->
                <span class="font-heading text-[clamp(1.1rem,2.6vw,1.75rem)] font-bold uppercase tracking-[0.22em] gold-shimmer-text">
                  Thành Phố Đồng Nai
                </span>
              </div>

              <!-- Statement Manifesto Quote with Decorative Heritage Quotes -->
              <div class="relative max-w-2xl mx-auto my-3 px-6 sm:px-10">
                <span class="absolute -top-3 left-0 font-serif text-3xl sm:text-4xl text-gold-400/40 select-none pointer-events-none">“</span>
                <p class="font-accent italic text-ivory/95 text-sm sm:text-base md:text-lg leading-relaxed font-normal text-shadow-sm px-2">
                  Di sản không chỉ thuộc về quá khứ — khi được số hóa, những câu chuyện của Bù Đăng sẽ tiếp tục được nhìn thấy, lắng nghe và trao truyền cho muôn đời sau.
                </p>
                <span class="absolute -bottom-5 right-0 font-serif text-3xl sm:text-4xl text-gold-400/40 select-none pointer-events-none">”</span>
              </div>

              <!-- Description -->
              <p class="text-paper-200/80 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-6 sm:mb-7 font-light">
                Nền tảng bảo tồn và giới thiệu di sản văn hóa Bù Đăng trên không gian số — tư liệu thực địa chuẩn hóa, âm vang tiếng chày Bom Bo và ký ức cộng đồng.
              </p>

              <!-- Royal Jewel CTA Button -->
              <button
                class="royal-cta-btn group relative inline-flex items-center gap-3.5 px-8 sm:px-11 py-4 sm:py-4.5 rounded-full font-bold text-sm sm:text-base cursor-pointer mb-6 sm:mb-8 overflow-hidden"
                @click="startJourney"
              >
                <!-- Specular shimmer sweep -->
                <span class="royal-cta-shimmer" />

                <!-- Outer glow ring -->
                <span class="absolute inset-0 rounded-full border border-gold-200/60 pointer-events-none" />

                <!-- Inner content -->
                <span class="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-charcoal-950/25 border border-charcoal-900/40 flex items-center justify-center text-charcoal-950 shadow-inner group-hover:scale-110 transition-transform">
                  <Icon name="mdi:compass-outline" class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-charcoal-950" />
                </span>
                <span class="relative z-10 text-charcoal-950 uppercase tracking-[0.18em] font-extrabold text-xs sm:text-sm drop-shadow-sm">
                  Bắt Đầu Hành Trình Di Sản
                </span>
                <Icon name="mdi:arrow-right" class="relative z-10 w-4 h-4 text-charcoal-950/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <!-- Integrated Stats Dock (Two modular luxury capsules: 4 stats + 1 location badge) -->
              <div class="w-full pt-5 sm:pt-6 border-t border-gold-400/25 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
                <!-- Platform Stats Capsule -->
                <div class="inline-flex items-center flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full bg-charcoal-900/85 border border-gold-400/25 shadow-lg">
                  <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="flex items-center gap-2 sm:gap-2.5 px-1 py-0.5 cursor-default group flex-shrink-0"
                  >
                    <div class="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-gold-500/10 border border-gold-400/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/25 transition-all">
                      <Icon :name="stat.icon" class="w-3.5 h-3.5 text-gold-400" />
                    </div>
                    <div class="flex flex-col text-left">
                      <span class="font-heading font-bold text-ivory text-xs sm:text-sm leading-tight tabular-nums group-hover:text-gold-300 transition-colors">
                        {{ stat.value }}{{ stat.suffix }}
                      </span>
                      <span class="text-charcoal-300 text-[8px] sm:text-[9px] uppercase tracking-wider leading-none mt-0.5 font-medium whitespace-nowrap">
                        {{ stat.label }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Heritage City Milestone Badge Capsule -->
                <div class="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl sm:rounded-full bg-charcoal-900/85 border border-gold-400/25 shadow-lg cursor-default group">
                  <div class="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-forest-500/20 border border-forest-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-500/30 transition-colors">
                    <Icon name="mdi:city" class="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <div class="flex flex-col text-left whitespace-nowrap">
                    <span class="font-heading font-semibold text-ivory text-xs sm:text-sm leading-tight">Thành Phố Đồng Nai</span>
                    <span class="text-charcoal-300 text-[8px] sm:text-[9px] leading-none mt-0.5">TPTT thứ 7 · Từ 30/04/2026</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </template>

        <template v-else-if="gateState === 'loading'">
          <div class="gate-spinner-lg mb-6" />
          <h2 class="font-heading font-bold text-ivory text-xl md:text-2xl mb-2">
            Đang tải video toàn cảnh...
          </h2>
          <p class="text-charcoal-300 text-sm max-w-xs mb-5">
            Thuyết minh đã bắt đầu — video sẽ hiện ra ngay khi sẵn sàng.
          </p>
          <div class="w-56 h-1 rounded-full bg-charcoal-800 overflow-hidden mb-5">
            <div
              class="h-full bg-gold-400 rounded-full transition-all duration-300"
              :style="{ width: `${Math.max(bufferPercent, 6)}%` }"
            />
          </div>
          <button
            class="text-charcoal-400 text-xs underline underline-offset-4 hover:text-gold-400 transition-colors"
            @click="useFallback"
          >
            Mạng chậm? Dùng ảnh thay thế
          </button>
        </template>
      </div>
    </Transition>

    <!-- ═══ UNMUTE / AUDIO GUIDE BUTTON ═══ -->
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
          class="w-4.5 h-4.5"
        />
        <span class="hero-audio-label">
          {{ isAudioGuideOn ? 'Thuyết Minh ON' : 'Nghe Thuyết Minh' }}
        </span>
      </div>
    </button>

    <!-- ═══ AMBIENT PARTICLES ═══ -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div
        v-for="n in 10"
        :key="`p-${n}`"
        class="hero-particle absolute rounded-full"
        :style="{
          width: `${2 + (n % 3)}px`,
          height: `${2 + (n % 3)}px`,
          left: `${8 + n * 8.5}%`,
          top: `${15 + (n % 5) * 14}%`,
          animationDelay: `${n * 0.6}s`,
          animationDuration: `${6 + n * 0.8}s`,
          opacity: 0.25 + (n % 4) * 0.1,
        }"
      />
    </div>

    <!-- ═══ SLIDE CAPTION — bottom-left overlay ═══ -->
    <Transition name="caption-fade">
      <div
        :key="currentSlide"
        class="hidden lg:block absolute bottom-16 left-10 z-20 pointer-events-none max-w-xs"
      >
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-5 h-px bg-gold-400/80" />
          <p class="text-gold-400 text-[9px] uppercase tracking-[0.3em] font-bold">
            {{ slides[currentSlide]?.label }}
          </p>
        </div>
        <p class="text-ivory/60 text-xs leading-relaxed">
          {{ slides[currentSlide]?.caption }}
        </p>
      </div>
    </Transition>

    <!-- ═══ SLIDE COUNTER — top-right ═══ -->
    <div class="absolute top-24 right-6 lg:right-10 z-20 pointer-events-none hidden lg:flex items-center gap-2">
      <span class="font-heading font-bold text-ivory/80 text-sm tabular-nums">{{ String(currentSlide + 1).padStart(2,'0') }}</span>
      <span class="text-charcoal-400 text-xs">/</span>
      <span class="text-charcoal-500 text-xs tabular-nums">{{ String(slides.length).padStart(2,'0') }}</span>
    </div>

    <!-- ═══ MAIN CONTENT: OPEN CINEMATIC FLYCAM VIEW (NO OBSC Patch/Frame) ═══ -->
    <div class="relative z-20 flex-1 flex flex-col items-center justify-center py-20 lg:py-24 px-4 sm:px-6 text-center">
      <div class="w-full max-w-4xl mx-auto flex flex-col items-center">

        <!-- Eyebrow Badge -->
        <div class="hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-950/60 border border-gold-400/30 backdrop-blur-md mb-4 shadow-sm" style="--delay: 0s">
          <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span class="text-gold-300 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold">
            Bảo Tàng Số Di Sản Bù Đăng · TP. Đồng Nai
          </span>
        </div>

        <!-- H1 Title: Separated & Elevated with Regal Divider -->
        <h1 class="hero-item flex flex-col items-center mb-5 text-shadow-hero" style="--delay: 0.12s">
          <span class="font-heading font-extrabold text-[clamp(2.2rem,5.5vw,4.2rem)] text-ivory tracking-tight leading-tight">
            Bảo Tàng Số Di Sản Bù Đăng
          </span>

          <div class="flex items-center justify-center gap-3 my-2.5 w-full max-w-xs opacity-90">
            <span class="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400 to-gold-400/70" />
            <span class="text-gold-400 text-xs">❖</span>
            <span class="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400 to-gold-400/70" />
          </div>

          <span class="font-heading text-[clamp(1.35rem,3.2vw,2.2rem)] font-bold uppercase tracking-[0.2em] gold-shimmer-text">
            Thành Phố Đồng Nai
          </span>
        </h1>

        <!-- Statement Manifesto Quote -->
        <p class="hero-item font-accent italic text-ivory/95 text-base sm:text-lg md:text-xl lg:text-[1.3rem] leading-relaxed max-w-3xl mx-auto mb-4 sm:mb-5 font-normal text-shadow-hero text-center" style="--delay: 0.22s">
          “Di sản không chỉ thuộc về quá khứ — khi được số hóa, những câu chuyện của Bù Đăng sẽ tiếp tục được nhìn thấy, lắng nghe và trao truyền cho muôn đời sau.”
        </p>

        <!-- Description -->
        <p class="hero-item text-paper-200/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 font-light text-shadow-hero text-center" style="--delay: 0.32s">
          Nền tảng bảo tồn và giới thiệu di sản văn hóa không gian số — tư liệu thực địa chuẩn hóa, âm vang tiếng chày Bom Bo và ký ức cộng đồng.
        </p>

        <!-- Action Row: Clean, Balanced & Floating -->
        <div class="hero-item flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 lg:mb-12" style="--delay: 0.42s">
          <NuxtLink
            to="/explore"
            class="btn-primary text-xs sm:text-sm px-7 sm:px-8 py-3.5 sm:py-4 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 rounded-full font-bold flex-shrink-0 tracking-wide transition-all"
          >
            <Icon name="mdi:compass-outline" class="w-4.5 h-4.5" />
            Khám Phá Di Sản
          </NuxtLink>
          <NuxtLink
            to="/map"
            class="btn-ghost text-xs sm:text-sm px-7 sm:px-8 py-3.5 sm:py-4 border border-ivory/25 bg-charcoal-950/65 backdrop-blur-md text-ivory hover:border-gold-400/60 hover:text-gold-300 hover:bg-gold-500/15 rounded-full font-medium flex-shrink-0 tracking-wide transition-all"
          >
            <Icon name="mdi:map-outline" class="w-4.5 h-4.5" />
            Bản Đồ Di Sản
          </NuxtLink>

          <!-- Audio Guide Pill in Action Row -->
          <button
            type="button"
            class="hero-audio-pill group inline-flex items-center gap-3 pl-2 pr-4 sm:pr-5 py-2 sm:py-2.5 rounded-full border border-gold-400/35 bg-charcoal-950/70 hover:bg-charcoal-900/90 hover:border-gold-400/70 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/40 cursor-pointer text-left flex-shrink-0"
            :title="isAudioGuideOn ? 'Tắt thuyết minh' : 'Nghe thuyết minh Sóc Bom Bo'"
            @click="toggleHeroAudio"
          >
            <div class="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
              <img
                src="/images/tranthiquyen.jpeg"
                alt="Trần Thị Quyên - Giọng đọc thuyết minh"
                class="w-full h-full rounded-full object-cover object-top border border-gold-400/60 shadow-inner group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
              <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-charcoal-950 border border-gold-400/60 flex items-center justify-center">
                <Icon :name="isAudioGuideOn ? 'mdi:volume-high' : 'mdi:headphones'" class="w-2 h-2 text-gold-400" />
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <span class="text-gold-300 text-[11px] font-bold uppercase tracking-wider leading-tight">Audio Thuyết Minh</span>
                <div class="flex items-end gap-[2px] h-3 px-0.5">
                  <span class="w-[2px] bg-gold-400 rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 12px; --bar-delay: 0.1s" />
                  <span class="w-[2px] bg-gold-400 rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 7px; --bar-delay: 0.3s" />
                  <span class="w-[2px] bg-gold-400 rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 13px; --bar-delay: 0s" />
                  <span class="w-[2px] bg-gold-400 rounded-full soundwave-bar" :class="{ 'soundwave-active': isAudioGuideOn }" style="--bar-h: 9px; --bar-delay: 0.2s" />
                </div>
              </div>
              <span class="text-ivory/70 text-[10px] leading-tight mt-0.5">{{ audioCount }} track · Giọng đọc địa phương</span>
            </div>
            <Icon
              :name="isAudioGuideOn ? 'mdi:pause-circle' : 'mdi:play-circle'"
              class="w-4.5 h-4.5 text-gold-400/80 group-hover:text-gold-400 group-hover:scale-110 transition-all ml-0.5"
            />
          </button>
        </div>

        <!-- Floating Stats Dock (Modular Luxury Glass Capsules) -->
        <div class="hero-item w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4" style="--delay: 0.54s">
          <!-- Platform Stats Capsule -->
          <div class="glass-dock inline-flex items-center flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-charcoal-950/80 border border-gold-400/25 backdrop-blur-xl shadow-2xl shadow-black/50">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="flex items-center gap-2 sm:gap-2.5 px-1 py-0.5 cursor-default group flex-shrink-0"
            >
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gold-500/10 border border-gold-400/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/25 group-hover:border-gold-400/40 transition-all shadow-sm">
                <Icon :name="stat.icon" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
              </div>
              <div class="flex flex-col text-left">
                <span class="font-heading font-bold text-ivory text-xs sm:text-sm lg:text-base leading-tight tabular-nums group-hover:text-gold-300 transition-colors">
                  {{ stat.value }}{{ stat.suffix }}
                </span>
                <span class="text-charcoal-300 text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider leading-none mt-0.5 sm:mt-1 font-semibold whitespace-nowrap">
                  {{ stat.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- Heritage City Milestone Badge Capsule -->
          <div class="glass-dock inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-charcoal-950/80 border border-gold-400/25 backdrop-blur-xl shadow-2xl shadow-black/50 cursor-default group">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-forest-500/20 border border-forest-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-500/30 transition-colors shadow-sm">
              <Icon name="mdi:city" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
            </div>
            <div class="flex flex-col text-left whitespace-nowrap">
              <span class="font-heading font-semibold text-ivory text-xs sm:text-sm leading-tight">Thành Phố Đồng Nai</span>
              <span class="text-charcoal-300 text-[8px] sm:text-[9px] lg:text-[10px] leading-none mt-0.5 sm:mt-1 font-medium">TPTT thứ 7 · Từ 30/04/2026</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ═══ SLIDE INDICATORS ═══ -->
    <div class="absolute bottom-[100px] lg:bottom-[56px] right-6 lg:right-10 z-20 flex flex-col gap-2">
      <button
        v-for="(_, i) in slides"
        :key="`dot-${i}`"
        class="rounded-full transition-all duration-500 cursor-pointer"
        :class="currentSlide === i
          ? 'w-1 h-7 bg-gold-400'
          : 'w-1 h-3 bg-ivory/25 hover:bg-ivory/50'"
        :aria-label="`Slide ${i + 1}`"
        :aria-current="currentSlide === i ? 'true' : undefined"
        @click="goToSlide(i)"
      />
    </div>

    <!-- ═══ SCROLL INDICATOR ═══ -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <div class="w-5 h-8 border border-ivory/20 rounded-full flex justify-center pt-1.5 hover:border-gold-400/40 transition-colors">
        <div class="w-1 h-1.5 bg-gold-400/70 rounded-full scroll-dot" />
      </div>
      <span class="text-ivory/30 text-[9px] uppercase tracking-widest">Cuộn xuống</span>
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
const gateState = ref<'idle' | 'loading' | 'ready' | 'fallback'>(isJourneyStarted.value ? 'ready' : 'idle')
const revealed = computed(() => gateState.value === 'ready' || gateState.value === 'fallback')
const bufferPercent = ref(0)
const enableVideo = ref(true)
const isAudioGuideOn = ref(audioStore.isPlaying && audioStore.currentTrack?.id === 'khu-bao-ton-soc-bom-bo')
let fallbackTimer: ReturnType<typeof setTimeout> | undefined
const audioCount = HERITAGES.filter((h) => h.audio).length
const questionCount = QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)

// Animated metric counters on load
const animatedHeritages = ref(0)
const animatedPosts = ref(0)
const animatedAudio = ref(0)
const animatedQuestions = ref(0)

function runCounters() {
  const animateCount = (target: number, setter: (n: number) => void, duration = 1400) => {
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
  coverImage: '/images/tranthiquyen.jpeg',
}

function playHeroAudio() {
  audioStore.loadTrack(bomBoAudio, 'khu-bao-ton-soc-bom-bo')
  audioStore.play()
  isAudioGuideOn.value = true
}

// Toggle Bom Bo audio guide from hero section
function toggleHeroAudio() {
  if (isAudioGuideOn.value) {
    audioStore.pause()
    isAudioGuideOn.value = false
  } else {
    playHeroAudio()
  }
}

// Track real download progress so the loading state feels alive instead of a bare spinner
function onVideoProgress() {
  const v = heroVideoRef.value
  if (!v || !v.duration || !v.buffered.length) return
  try {
    const bufferedEnd = v.buffered.end(v.buffered.length - 1)
    bufferPercent.value = Math.min(100, Math.round((bufferedEnd / v.duration) * 100))
  } catch {
    // buffered range can throw if the video has no data yet — ignore
  }
}

function clearFallbackTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = undefined
  }
}

// Video actually able to play smoothly — this is the only path that shows video
// instead of the fallback slideshow, matching what the visitor expects to see.
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

// Only reached by explicit user choice ("Dùng ảnh thay thế") or the loading timeout —
// never as a silent default when video simply hasn't finished buffering yet.
function useFallback() {
  clearFallbackTimer()
  isJourneyStarted.value = true
  if (gateState.value !== 'ready') gateState.value = 'fallback'
}

// Entry gate: user gesture unlocks autoplay-with-sound in every browser.
// Narration starts immediately; video keeps the gate up (with visible progress)
// until it can actually play, instead of dropping straight to static images.
function startJourney() {
  isJourneyStarted.value = true
  playHeroAudio()

  if (!enableVideo.value) {
    gateState.value = 'fallback'
    return
  }

  // Video may have already finished buffering silently while the gate sat
  // idle (fast connections, or localhost) — its 'canplay' event fired before
  // there was a 'loading' state to resolve. Skip the loading screen entirely.
  if (videoLoaded.value) {
    gateState.value = 'ready'
    nextTick(() => {
      heroVideoRef.value?.play().catch(() => {})
    })
    return
  }

  gateState.value = 'loading'
  nextTick(() => {
    // Calling .play() on the click gesture matters most on iOS Safari, which
    // otherwise throttles preload over cellular regardless of the attribute.
    heroVideoRef.value?.play().catch(() => {})
  })
  fallbackTimer = setTimeout(useFallback, 10000)
}

onMounted(() => {
  runCounters()
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType ?? ''))) {
    enableVideo.value = false
  }

  // With SSR the <video> tag is in the initial HTML and can start buffering —
  // and fire 'canplay' — before Vue finishes hydrating and attaches the
  // template listener. Check readyState directly to catch that missed event.
  nextTick(() => {
    if ((heroVideoRef.value?.readyState ?? 0) >= 3) {
      markVideoReady()
    }
    if (isJourneyStarted.value) {
      heroVideoRef.value?.play().catch(() => {})
    }
  })
})

// Sync button state with global audio store
watch(() => audioStore.isPlaying, (playing) => {
  if (!playing && isAudioGuideOn.value) {
    isAudioGuideOn.value = false
  }
})

onUnmounted(() => {
  heroVideoRef.value?.pause()
  clearFallbackTimer()
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
let slideInterval: ReturnType<typeof setInterval>

function goToSlide(i: number) {
  currentSlide.value = i
  clearInterval(slideInterval)
  startAutoPlay()
}

function startAutoPlay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6500)
}

onMounted(() => startAutoPlay())
onUnmounted(() => clearInterval(slideInterval))

const stats = computed(() => [
  { icon: 'mdi:castle', value: String(animatedHeritages.value || heritageStore.totalCount), suffix: '', label: 'Di sản số hóa' },
  { icon: 'mdi:book-open-variant', value: String(animatedPosts.value || COMMUNITY_POSTS.length), suffix: '', label: 'Ký ức cộng đồng' },
  { icon: 'mdi:headphones', value: String(animatedAudio.value || audioCount), suffix: '', label: 'Audio guide' },
  { icon: 'mdi:help-circle-outline', value: String(animatedQuestions.value || questionCount), suffix: '', label: 'Câu hỏi lịch sử' },
])
</script>

<style scoped>
/* ── Hero video background ── */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease;
  /* Natural, vibrant color grade */
  filter: saturate(1.4) contrast(1.06) brightness(1.04);
}
.hero-video--loaded {
  opacity: 1;
}

/* ── Entry gate ── */
.gate-fade-enter-active { transition: opacity 0.4s ease; }
.gate-fade-leave-active { transition: opacity 0.7s ease; }
.gate-fade-enter-from,
.gate-fade-leave-to { opacity: 0; }
.gate-cta { animation: gatePulse 2.4s ease-in-out infinite; }
@keyframes gatePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 106, 0.35); }
  50% { box-shadow: 0 0 0 10px rgba(201, 169, 106, 0); }
}
.gate-spinner-lg {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 3px solid rgba(201, 169, 106, 0.25);
  border-top-color: rgba(201, 169, 106, 0.95);
  animation: gateSpin 0.9s linear infinite;
}
@keyframes gateSpin {
  to { transform: rotate(360deg); }
}

/* ── Ambient breathing aura ── */
.hero-ambient-glow {
  background: radial-gradient(ellipse at center, rgba(201, 169, 106, 0.18) 0%, rgba(201, 169, 106, 0.04) 45%, transparent 70%);
  animation: ambientBreathe 8s ease-in-out infinite alternate;
}
@keyframes ambientBreathe {
  0% { transform: scale(0.92); opacity: 0.65; }
  100% { transform: scale(1.08); opacity: 1; }
}

/* ── Gold Shimmer text ── */
.gold-shimmer-text {
  background: linear-gradient(
    110deg,
    #c9a96a 0%,
    #e8d3a7 25%,
    #ffffff 45%,
    #e8d3a7 65%,
    #c9a96a 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: goldShimmer 7s ease-in-out infinite;
}
@keyframes goldShimmer {
  0%, 15% { background-position: 200% center; }
  85%, 100% { background-position: -200% center; }
}

/* ── Soundwave animation ── */
.soundwave-bar {
  height: 3px;
  opacity: 0.5;
  transition: all 0.3s ease;
}
.soundwave-active {
  opacity: 1;
  animation: soundwaveJump 0.8s ease-in-out infinite alternate;
  animation-delay: var(--bar-delay, 0s);
}
.hero-audio-pill:hover .soundwave-bar:not(.soundwave-active) {
  opacity: 0.8;
  height: 6px;
}
@keyframes soundwaveJump {
  0% { height: 3px; }
  100% { height: var(--bar-h, 12px); }
}

/* ── Heritage Frame & Ornate Filigree Corners ── */
.heritage-frame {
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(201, 169, 106, 0.35), inset 0 1px 2px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.5s ease;
}
.heritage-frame::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: calc(1.5rem - 8px);
  border: 1px solid rgba(201, 169, 106, 0.2);
  pointer-events: none;
}
.corner-filigree {
  position: absolute;
  width: 38px;
  height: 38px;
  pointer-events: none;
  z-index: 10;
  filter: drop-shadow(0 0 6px rgba(201, 169, 106, 0.5));
}
.corner-tl {
  top: -2px;
  left: -2px;
}
.corner-tr {
  top: -2px;
  right: -2px;
  transform: scaleX(-1);
}
.corner-bl {
  bottom: -2px;
  left: -2px;
  transform: scaleY(-1);
}
.corner-br {
  bottom: -2px;
  right: -2px;
  transform: scale(-1);
}

/* ── Royal Jewel CTA Button ── */
.royal-cta-btn {
  background: linear-gradient(135deg, #F5E6C8 0%, #D4AF37 40%, #C9A96A 70%, #AA8232 100%);
  box-shadow: 0 10px 30px -5px rgba(201, 169, 106, 0.65), inset 0 2px 3px rgba(255, 255, 255, 0.75), inset 0 -2px 3px rgba(0, 0, 0, 0.35);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.royal-cta-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 16px 42px -5px rgba(201, 169, 106, 0.85), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 3px rgba(0, 0, 0, 0.2);
}
.royal-cta-btn:active {
  transform: translateY(1px) scale(0.98);
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

/* ── Glass dock specular hover ── */
.glass-dock {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.glass-dock:hover {
  border-color: rgba(201, 169, 106, 0.25);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(201, 169, 106, 0.2);
}

/* ── Hero audio guide button ── */
.hero-audio-btn {
  cursor: pointer;
}
.hero-audio-btn-inner {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem 0.45rem 0.7rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  white-space: nowrap;
}
.hero-audio-btn:hover .hero-audio-btn-inner {
  background: rgba(201, 169, 106, 0.25);
  border-color: rgba(201, 169, 106, 0.5);
  color: #fff;
}
.hero-audio-btn.is-active .hero-audio-btn-inner {
  background: rgba(201, 169, 106, 0.2);
  border-color: rgba(201, 169, 106, 0.45);
  color: #DEC89D;
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

/* ── Ken Burns ── */
.ken-burns-active {
  animation: kenburns 20s ease-out infinite alternate;
}
@keyframes kenburns {
  0% { transform: scale(1.08) translateX(0px); }
  100% { transform: scale(1) translateX(-12px); }
}

/* ── Caption transition ── */
.caption-fade-enter-active { transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s; }
.caption-fade-leave-active { transition: opacity 0.3s ease; }
.caption-fade-enter-from { opacity: 0; transform: translateY(6px); }
.caption-fade-leave-to { opacity: 0; }

/* ── Hero content items ── */
.hero-item {
  animation: heroFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0s);
}
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Ambient particles ── */
.hero-particle {
  background: radial-gradient(circle, rgba(201, 169, 106, 0.6) 0%, transparent 70%);
  animation: floatParticle var(--dur, 7s) ease-in-out var(--delay, 0s) infinite alternate;
}
@keyframes floatParticle {
  from { transform: translateY(0px) scale(1); opacity: 0.2; }
  to   { transform: translateY(-22px) scale(1.5); opacity: 0.5; }
}

/* ── Scroll dot ── */
.scroll-dot {
  animation: scrollBounce 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(10px); opacity: 1; }
}

/* ── Stat pill hover ── */
.stat-pill { transition: all 0.2s ease; }
</style>
