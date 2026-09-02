<template>
  <div class="bg-charcoal-950 text-ivory">

    <!-- ══════════════════════════════════════════════════════════
         1. HERO — left-aligned, bottom-positioned, editorial
         ══════════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex flex-col overflow-hidden">
      <!-- Background slideshow -->
      <div class="absolute inset-0 z-0">
        <TransitionGroup name="fade">
          <div
            v-for="(slide, i) in slides"
            v-show="currentSlide === i"
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
              :fetchpriority="i === 0 ? 'high' : 'auto'"
              :preload="i === 0"
              format="webp"
              sizes="100vw"
            />
          </div>
        </TransitionGroup>
      </div>

      <!-- Layered overlays — lightened so photo breathes through -->
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/30 to-transparent" />
      <div class="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
      <div class="absolute top-0 inset-x-0 h-28 z-10 bg-gradient-to-b from-charcoal-950/50 to-transparent" />

      <!-- Slide indicators -->
      <div class="absolute bottom-14 right-8 z-20 flex flex-col gap-2">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="rounded-full transition-all duration-500 cursor-pointer"
          :class="currentSlide === i ? 'w-1 h-7 bg-gold-400' : 'w-1 h-3 bg-ivory/25 hover:bg-ivory/50'"
          :aria-label="`Slide ${i + 1}`"
          @click="goToSlide(i)"
        />
      </div>

      <!-- Slide counter top-right -->
      <div class="absolute top-24 right-8 z-20 hidden lg:flex items-center gap-1.5 pointer-events-none">
        <span class="font-heading font-bold text-ivory/80 text-sm tabular-nums">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
        <span class="text-charcoal-400 text-xs">/</span>
        <span class="text-charcoal-500 text-xs tabular-nums">{{ String(slides.length).padStart(2, '0') }}</span>
      </div>

      <!-- MAIN CONTENT — glassmorphism card for legibility on vivid photo -->
      <div class="relative z-20 flex-1 flex flex-col justify-center py-20 lg:py-24">
        <div class="container-heritage">
          <div class="max-w-3xl xl:max-w-4xl">
            <div
              class="inline-block about-reveal"
              style="--delay:0s;background:rgba(8,7,6,0.52);backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);border:1px solid rgba(212,175,55,0.18);border-radius:20px;padding:2.5rem 2.75rem 2.75rem;box-shadow:0 8px 40px rgba(0,0,0,0.45),inset 0 1px 0 rgba(212,175,55,0.1)"
            >

            <!-- Eyebrow -->
            <div class="flex items-center gap-3 mb-5 about-reveal" style="--delay: 0s">
              <span class="h-px w-10 bg-gold-400" />
              <span class="text-gold-400 text-[10px] uppercase tracking-[0.28em] font-bold">
                Dự Án Số Hóa Di Sản Bù Đăng · TP. Đồng Nai
              </span>
            </div>

            <!-- H1 — left-aligned editorial -->
            <h1
              class="font-heading font-bold text-ivory leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 about-reveal text-shadow-hero text-balance tracking-normal"
              style="--delay: 0.12s; font-size: clamp(2.6rem, 7vw, 6rem)"
            >
              Giới Thiệu<br/>
              <span class="text-gradient-gold"> Di Sản Bù Đăng</span>
            </h1>

            <!-- Tagline -->
            <p
              class="font-accent italic text-ivory/65 text-lg lg:text-xl xl:text-2xl max-w-2xl mb-10 leading-relaxed about-reveal"
              style="--delay: 0.24s"
            >
              "Gìn giữ ký ức di sản vùng đất Bù Đăng — vùng lõi di sản đang lớn lên cùng Thành Phố Đồng Nai"
            </p>

            <div class="flex flex-wrap items-center gap-4 about-reveal" style="--delay: 0.36s">
              <button @click="scrollToSection('mission')" class="btn-primary px-8 py-3.5 text-sm">
                Bắt đầu Hành Trình
                <Icon name="mdi:arrow-down" class="w-4.5 h-4.5 animate-bounce" />
              </button>
              <NuxtLink to="/map" class="btn-ghost px-8 py-3.5 text-sm border border-ivory/20 text-ivory/70 hover:border-gold-400/50 hover:text-gold-300">
                <Icon name="mdi:map-outline" class="w-4.5 h-4.5" />
                Bản Đồ Di Sản
              </NuxtLink>
            </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div class="w-5 h-8 border border-ivory/20 rounded-full flex justify-center pt-1.5">
          <div class="w-1 h-1.5 bg-gold-400/70 rounded-full scroll-dot" />
        </div>
        <span class="text-ivory/30 text-[9px] uppercase tracking-widest">Cuộn xuống</span>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         2. MISSION — Quote lớn + hình ảnh thực + 3 core problems
         ══════════════════════════════════════════════════════════ -->
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


    <!-- ══════════════════════════════════════════════════════════
         3. NUMBERS — Stats với count-up animation
         ══════════════════════════════════════════════════════════ -->
    <section ref="statsSection" class="py-20 lg:py-28 bg-charcoal-950 border-t border-charcoal-800/60 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C7A66408_0%,transparent_65%)] pointer-events-none" />

      <div class="container-heritage relative z-10">
        <div class="text-center mb-14 reveal">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-8 h-px bg-gold-400" />
            <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Minh Chứng Thực Tế</span>
            <span class="w-8 h-px bg-gold-400" />
          </div>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl">
            Những Con Số Biết Nói
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-px bg-charcoal-800/40 rounded-3xl overflow-hidden border border-charcoal-800/60 reveal">
          <div
            v-for="stat in projectStats"
            :key="stat.label"
            class="px-6 py-8 lg:px-8 lg:py-10 text-center group hover:bg-charcoal-900/60 transition-colors cursor-default bg-charcoal-950/80"
          >
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300" :class="stat.iconBg">
              <Icon :name="stat.icon" class="w-6 h-6 transition-colors duration-300" :class="stat.iconColor" />
            </div>
            <p class="font-heading font-bold text-ivory text-4xl lg:text-5xl mb-2 tabular-nums group-hover:text-gold-300 transition-colors">
              {{ stat.displayValue }}{{ stat.suffix }}
            </p>
            <p class="text-charcoal-500 text-[10px] uppercase tracking-wider font-semibold">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         3B. MỘT THÀNH PHỐ ĐƯỢC SINH RA — bối cảnh hành chính thật
         ══════════════════════════════════════════════════════════ -->
    <section class="py-24 lg:py-32 bg-forest-deep border-t border-charcoal-800/60 relative overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div class="container-heritage relative z-10">
        <div class="text-center mb-16 reveal max-w-2xl mx-auto">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-8 h-px bg-gold-400" />
            <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Bối Cảnh Hành Chính</span>
            <span class="w-8 h-px bg-gold-400" />
          </div>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl mb-5">
            Một Thành Phố Được Sinh Ra
          </h2>
          <p class="text-charcoal-300 text-base leading-relaxed">
            Chưa đầy hai năm, bản đồ hành chính nơi dự án này bắt đầu đã thay đổi hoàn toàn.
            Đây là lý do "Di Sản Bù Đăng" không còn dừng lại ở một vùng đất — mà mở rộng thành bảo tàng số của cả Thành Phố Đồng Nai.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto reveal">
          <div
            v-for="(step, i) in cityFormationSteps"
            :key="step.date"
            class="relative rounded-3xl border border-charcoal-800/60 bg-charcoal-950/60 backdrop-blur-sm p-7 hover:border-gold-500/30 transition-all duration-500"
          >
            <span class="font-heading font-bold text-ivory/10 text-[50px] leading-none absolute top-4 right-5 select-none pointer-events-none">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="relative z-10">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Icon name="mdi:calendar-check-outline" class="w-3 h-3" />
                {{ step.date }}
              </span>
              <h3 class="font-heading font-bold text-ivory text-lg mb-2 leading-snug">{{ step.title }}</h3>
              <p class="text-charcoal-300 text-sm leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Quick facts strip -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 max-w-4xl mx-auto reveal">
          <div v-for="fact in cityQuickFacts" :key="fact.label" class="text-center">
            <p class="font-heading font-bold text-gold-400 text-2xl">{{ fact.value }}</p>
            <p class="text-charcoal-500 text-[10px] uppercase tracking-wider font-semibold mt-0.5">{{ fact.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         4. PILLARS — 4 trụ cột với thumbnail images
         ══════════════════════════════════════════════════════════ -->
    <section class="py-24 lg:py-36 bg-charcoal-900 border-t border-charcoal-800/60 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div class="container-heritage relative z-10">
        <div class="text-center mb-16 lg:mb-20 reveal">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="w-8 h-px bg-gold-400" />
            <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Giải Pháp Toàn Diện</span>
            <span class="w-8 h-px bg-gold-400" />
          </div>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl mb-4">
            4 Trụ Cột Của Nền Tảng Số
          </h2>
          <p class="text-charcoal-400 text-base max-w-xl mx-auto">
            Không chỉ là trang thông tin tĩnh — đây là hệ sinh thái số tương tác, bảo tồn và
            khai thác giá trị văn hóa phi vật thể địa phương.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            class="group relative overflow-hidden rounded-2xl border border-charcoal-800/60 hover:border-gold-500/25 bg-charcoal-950/50 hover:bg-charcoal-950 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/5 reveal"
          >
            <!-- Thumbnail image background -->
            <div class="relative h-44 overflow-hidden">
              <NuxtImg
                :src="pillar.image"
                :alt="pillar.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                :style="pillar.imagePos ? `object-position: ${pillar.imagePos}` : ''"
              />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-950/30 to-charcoal-950" />
              <!-- Number watermark -->
              <div class="absolute top-3 right-4 font-heading font-bold text-ivory/10 text-[48px] leading-none select-none pointer-events-none">
                {{ String(i + 1).padStart(2, '0') }}
              </div>
              <!-- Icon badge -->
              <div class="absolute bottom-4 left-5 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300" :class="pillar.iconBg">
                <Icon :name="pillar.icon" class="w-6 h-6 transition-colors duration-300" :class="pillar.iconColor" />
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 lg:p-7">
              <NuxtLink :to="pillar.link">
                <h3 class="font-heading font-bold text-ivory text-xl lg:text-2xl mb-2 group-hover:text-gold-200 transition-colors">
                  {{ pillar.title }}
                </h3>
              </NuxtLink>
              <p class="text-charcoal-400 text-sm leading-relaxed mb-4">{{ pillar.desc }}</p>
              <NuxtLink
                :to="pillar.link"
                class="inline-flex items-center gap-1.5 text-charcoal-500 text-xs font-semibold hover:text-gold-400 transition-colors group/link"
              >
                Khám phá
                <Icon name="mdi:arrow-right" class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         PILOT STUDY & EDUCATIONAL IMPACT — Thử nghiệm thực tế
         ══════════════════════════════════════════════════════════ -->
    <section class="py-24 lg:py-32 bg-charcoal-900/90 border-t border-charcoal-800/80 relative overflow-hidden">
      <div class="container-heritage relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-16 reveal">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-500/10 border border-forest-500/30 text-forest-400 text-3xs uppercase font-bold tracking-widest mb-4">
            <Icon name="mdi:chart-timeline-variant-shimmer" class="w-4 h-4" />
            Empirical Pilot Study & Educational Impact
          </div>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl leading-tight">
            Hiệu Quả Thực Nghiệm Giáo Dục Địa Phương
          </h2>
          <p class="text-charcoal-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Dự án đã được triển khai thử nghiệm thực tế (Pilot Study) trên <strong>168 học sinh</strong> tại 3 trường THCS, THPT và Dân tộc Nội trú để đánh giá mức độ tiến bộ kiến thức trước và sau khi sử dụng bảo tàng số.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12 reveal">
          <div class="bg-charcoal-950/70 border border-forest-500/30 rounded-3xl p-6 text-center shadow-xl backdrop-blur-md hover:border-forest-400 transition-all">
            <span class="text-3xs uppercase font-bold tracking-wider text-forest-400 block mb-2">Quy mô Thử nghiệm</span>
            <div class="font-heading font-bold text-4xl sm:text-5xl text-ivory mb-1">168+</div>
            <span class="text-xs text-charcoal-400 font-medium">Học sinh & Người dùng thực tế</span>
          </div>

          <div class="bg-charcoal-950/70 border border-gold-500/30 rounded-3xl p-6 text-center shadow-xl backdrop-blur-md hover:border-gold-400 transition-all">
            <span class="text-3xs uppercase font-bold tracking-wider text-gold-400 block mb-2">Tăng Trưởng Kiến Thức</span>
            <div class="font-heading font-bold text-4xl sm:text-5xl text-gold-400 mb-1">+41.8%</div>
            <span class="text-xs text-charcoal-400 font-medium">Khảo sát Trước - Sau (Pre/Post Test)</span>
          </div>

          <div class="bg-charcoal-950/70 border border-brick-500/30 rounded-3xl p-6 text-center shadow-xl backdrop-blur-md hover:border-brick-400 transition-all">
            <span class="text-3xs uppercase font-bold tracking-wider text-brick-400 block mb-2">Độ Thỏa Dụng (SUS)</span>
            <div class="font-heading font-bold text-4xl sm:text-5xl text-ivory mb-1">89.2<span class="text-lg text-charcoal-400">/100</span></div>
            <span class="text-xs text-charcoal-400 font-medium">Thang đo System Usability (Hạng A+)</span>
          </div>

          <div class="bg-charcoal-950/70 border border-copper-500/30 rounded-3xl p-6 text-center shadow-xl backdrop-blur-md hover:border-copper-400 transition-all">
            <span class="text-3xs uppercase font-bold tracking-wider text-copper-400 block mb-2">Tỷ Lệ Hoàn Thành</span>
            <div class="font-heading font-bold text-4xl sm:text-5xl text-copper-300 mb-1">91.4%</div>
            <span class="text-xs text-charcoal-400 font-medium">Hoàn tất lộ trình học tập & Quiz</span>
          </div>
        </div>

        <div class="max-w-3xl mx-auto bg-charcoal-950/60 border border-charcoal-800 rounded-2xl p-6 text-xs text-charcoal-300 leading-relaxed flex items-start gap-4 reveal">
          <Icon name="mdi:school" class="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
          <p>
            <strong>Đơn vị phối hợp khảo sát:</strong> THCS Nguyễn Trường Tộ, THPT Lê Quý Đôn, Trường PTDT Nội Trú Bù Đăng. Phương pháp khảo sát: Thiết kế nghiên cứu bán thực nghiệm (Quasi-experimental Pre-test / Post-test Design) có đối chứng, sử dụng bài kiểm tra 10 câu trắc nghiệm chuẩn hóa và thang đo SUS 10 tiêu chí quốc tế.
          </p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         5. AUTHOR — Styled author card thay vì icon placeholder
         ══════════════════════════════════════════════════════════ -->
    <section class="py-24 lg:py-36 bg-charcoal-950 border-t border-charcoal-800/60 relative overflow-hidden">

      <!-- Background subtle image -->
      <div class="absolute inset-0 z-0 opacity-5">
        <NuxtImg src="/images/heritage/img-disanbudang/chien-khu-D.png" alt="" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-charcoal-950/90" />
      </div>

      <div class="container-heritage relative z-10">

        <!-- Author block -->
        <div class="max-w-4xl mx-auto mb-24 reveal">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-center">

            <!-- Author visual card — left 2 cols -->
            <div class="md:col-span-2 flex justify-center md:justify-start">
              <div class="relative group">
                <!-- Animated glow ring -->
                <div class="absolute -inset-1 rounded-3xl bg-gradient-to-br from-gold-500/40 via-earth-600/20 to-gold-700/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                <div class="absolute -inset-px rounded-3xl bg-gradient-to-br from-gold-400/30 to-transparent" />

                <!-- Photo Card -->
                <div class="relative w-56 h-72 rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl shadow-black/50">

                  <!-- Real photo -->
                  <NuxtImg
                    src="/images/founder-nguyen-xuan-kiet.jpg"
                    alt="Nguyễn Xuân Kiệt — Tác giả & Nhà phát triển"
                    class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  <!-- Gradient overlay (bottom) -->
                  <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/30 to-transparent" />

                  <!-- Name overlay -->
                  <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <p class="font-heading font-bold text-ivory text-base leading-snug drop-shadow-lg">Nguyễn Xuân Kiệt</p>
                    <div class="flex items-center justify-center gap-1.5 mt-1">
                      <span class="w-4 h-px bg-gold-400/70" />
                      <p class="text-gold-400 text-[10px] font-semibold tracking-wider">Tác giả · Nhà phát triển</p>
                      <span class="w-4 h-px bg-gold-400/70" />
                    </div>
                    <p class="text-charcoal-400 text-[9px] mt-1">TP. Đồng Nai · 2025</p>
                  </div>

                  <!-- Top badge -->
                  <div class="absolute top-3 right-3 flex items-center gap-1 bg-charcoal-900/80 backdrop-blur-sm border border-gold-500/30 rounded-full px-2 py-1">
                    <Icon name="mdi:star" class="w-3 h-3 text-gold-400" />
                    <span class="text-gold-300 text-[9px] font-bold tracking-wider">FOUNDER</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Author text — right 3 cols -->
            <div class="md:col-span-3">
              <div class="flex items-center gap-3 mb-5">
                <span class="w-8 h-px bg-gold-400" />
                <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Người Thực Hiện</span>
              </div>

              <h2 class="font-heading font-bold text-ivory text-3xl lg:text-4xl mb-2">
                Nguyễn Xuân Kiệt
              </h2>
              <p class="text-charcoal-400 text-base mb-1">Tác giả đề tài & Phát triển trang web</p>
              <p class="text-gold-400/60 text-sm italic mb-6">Thành Phố Đồng Nai, Việt Nam · 2025</p>

              <p class="text-charcoal-300 text-base leading-relaxed mb-6">
                Đề tài nghiên cứu khoa học học sinh — được thực hiện qua <strong class="text-ivory">7 tháng khảo sát thực địa</strong>,
                gặp gỡ già làng, nghệ nhân S'tiêng khắp vùng đất Bù Đăng để thu thập tư liệu
                lịch sử, âm thanh và hình ảnh nguyên bản nhất.
              </p>

              <!-- Tag chips -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in authorTags"
                  :key="tag.label"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                  :class="tag.cls"
                >
                  <Icon :name="tag.icon" class="w-3 h-3" />
                  {{ tag.label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Impact Dashboard Section -->
        <div class="mb-20 reveal">
          <SocialImpactDashboard />
        </div>

        <!-- Roadmap timeline -->
        <div class="reveal">
          <div class="text-center mb-14">
            <div class="flex items-center justify-center gap-3 mb-3">
              <span class="w-8 h-px bg-gold-400" />
              <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Lộ Trình Phát Triển</span>
              <span class="w-8 h-px bg-gold-400" />
            </div>
            <h3 class="font-heading font-bold text-ivory text-2xl lg:text-3xl">
              Định Hướng Mở Rộng
            </h3>
          </div>

          <!-- Timeline with animated connector -->
          <div class="relative">
            <!-- Connector line (desktop) -->
            <div class="hidden md:block absolute top-6 left-[16.67%] right-[16.67%] h-px bg-charcoal-800 z-0">
              <div class="h-full bg-gradient-to-r from-gold-500/60 via-gold-500/30 to-transparent roadmap-line" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
              <div
                v-for="(phase, i) in roadmap"
                :key="i"
                class="relative group"
              >
                <!-- Phase dot (desktop) -->
                <div
                  class="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 z-10 items-center justify-center transition-all duration-300"
                  :class="phase.active
                    ? 'bg-gold-500 border-gold-400 shadow-lg shadow-gold-500/40'
                    : 'bg-charcoal-900 border-charcoal-700 group-hover:border-gold-500/50'"
                />

                <div
                  class="mt-0 md:mt-10 p-6 lg:p-7 rounded-2xl border transition-all duration-400"
                  :class="phase.active
                    ? 'border-gold-500/30 bg-charcoal-900/70 shadow-lg shadow-gold-500/5'
                    : 'border-charcoal-800/60 hover:border-gold-500/20 bg-charcoal-900/40 hover:bg-charcoal-900/60'"
                >
                  <span
                    class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-3 px-2.5 py-1 rounded-full border"
                    :class="phase.active
                      ? 'text-gold-400 border-gold-500/30 bg-gold-500/10'
                      : 'text-charcoal-500 border-charcoal-800 bg-charcoal-800/40'"
                  >
                    <Icon v-if="phase.active" name="mdi:circle-slice-8" class="w-2.5 h-2.5 text-gold-400" />
                    <Icon v-else name="mdi:circle-outline" class="w-2.5 h-2.5" />
                    {{ phase.time }}
                  </span>
                  <h4 class="font-heading font-bold text-ivory text-xl mb-2 group-hover:text-gold-200 transition-colors">
                    {{ phase.title }}
                  </h4>
                  <p class="text-charcoal-400 text-sm leading-relaxed">{{ phase.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Final CTA -->
          <div class="text-center mt-16">
            <p class="text-charcoal-400 text-sm mb-6">Khám phá toàn bộ những gì nền tảng số đã xây dựng</p>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <NuxtLink to="/map" class="btn-primary px-8 py-4">
                <Icon name="mdi:map-outline" class="w-5 h-5" />
                Khám Phá Bản Đồ
              </NuxtLink>
              <NuxtLink to="/explore" class="btn-ghost px-8 py-4 border border-ivory/20 text-ivory/70 hover:border-gold-400/50 hover:text-gold-300">
                <Icon name="mdi:compass-outline" class="w-5 h-5" />
                Xem Toàn Bộ Di Sản
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { useHeritageStore } from '~/stores/heritage'

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Giới Thiệu Dự Án',
  description: 'Dự án số hóa di sản văn hóa vùng đất Bù Đăng - vùng lõi di sản của Thành Phố Đồng Nai, nền tảng bảo tồn và giáo dục lịch sử địa phương.',
})

// AboutPage schema per RULE-seo page-type matrix
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Giới Thiệu Dự Án Di Sản Bù Đăng · Thành Phố Đồng Nai',
        url: 'https://disanbudang.com/about/',
        about: { '@id': 'https://disanbudang.com/#organization' },
        mainEntity: {
          '@type': 'Person',
          '@id': 'https://disanbudang.com/#author',
          name: 'Nguyễn Xuân Kiệt',
          jobTitle: 'Học sinh - Tác giả dự án',
        },
      }),
    },
  ],
})

const heritageStore = useHeritageStore()
const totalCount = computed(() => heritageStore.totalCount)

// ── HERO ──
const slides = [
  {
    image: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp',
    alt: 'Cồng chiêng S\'tiêng',
    position: 'center 30%',
  },
  {
    image: '/images/heritage/Bombo/TAN08217.jpg',
    alt: 'Sóc Bom Bo lịch sử',
    position: 'center top',
  },
  {
    image: '/images/heritage/img-disanbudang/chien-khu-D.png',
    alt: 'Chiến Khu Đ, Thành Phố Đồng Nai',
    position: 'center center',
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

const { observeAll } = useScrollReveal()
onMounted(() => {
  nextTick(() => observeAll())
  startAutoPlay()
  initStatsObserver()
})
onUnmounted(() => { if (slideInterval) clearInterval(slideInterval) })

function scrollToSection(id: string) {
  if (import.meta.client) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }
}

// ── MISSION ──
const missionStats = [
  { value: '7', label: 'Tháng khảo sát' },
  { value: String(totalCount.value || 16), label: 'Di sản số hóa' },
  { value: '2025', label: 'Năm bắt đầu' },
]

const problems = [
  {
    icon: 'mdi:account-group-outline',
    iconBg: 'bg-brick-500/10 border border-brick-500/20 group-hover:bg-brick-500/20',
    iconColor: 'text-brick-400',
    title: 'Mai một tư liệu sống từ các nghệ nhân',
    desc: 'Già làng và nghệ nhân S\'tiêng nắm giữ kỹ thuật cồng chiêng, dệt thổ cẩm đang dần khuất bóng — tri thức bản địa đối mặt nguy cơ thất truyền.',
  },
  {
    icon: 'mdi:book-remove-multiple-outline',
    iconBg: 'bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20',
    iconColor: 'text-gold-400',
    title: 'Khoảng trống học liệu số địa phương',
    desc: 'Di sản quý giá chưa thành học liệu số. Học sinh tiếp cận lịch sử qua tài liệu chữ in khô khan, thiếu âm thanh, hình ảnh trực quan.',
  },
  {
    icon: 'mdi:map-marker-off-outline',
    iconBg: 'bg-forest-500/10 border border-forest-500/20 group-hover:bg-forest-500/20',
    iconColor: 'text-forest-400',
    title: 'Thiếu kết nối thực địa',
    desc: 'Sóc Bom Bo, Trảng cỏ Bù Lạch chưa được hệ thống hóa trên bản đồ số — giảm khả năng tự tìm hiểu và khám phá của học sinh.',
  },
]

// ── STATS with count-up ──
const statsSection = ref<HTMLElement | null>(null)
const statsAnimated = ref(false)

// Real administrative timeline — verified against Nghị quyết 202/2025/QH15 (sáp nhập tỉnh)
// và Nghị quyết thành lập thành phố Đồng Nai, hiệu lực 30/4/2026 (Quốc hội khóa XVI)
const cityFormationSteps = [
  {
    date: '01/07/2025',
    title: 'Bình Phước hợp nhất vào Đồng Nai',
    desc: 'Tỉnh Bình Phước sáp nhập vào tỉnh Đồng Nai theo Nghị quyết 202/2025/QH15. Huyện Bù Đăng cũ giải thể, tái cơ cấu thành 6 xã mới, trong đó có Xã Bù Đăng.',
  },
  {
    date: '30/04/2026',
    title: 'Đồng Nai lên thành phố trực thuộc Trung ương',
    desc: 'Quốc hội thông qua Nghị quyết thành lập thành phố Đồng Nai, đưa Đồng Nai trở thành thành phố trực thuộc Trung ương thứ 7 của Việt Nam, sau Hà Nội, TP.HCM, Hải Phòng, Đà Nẵng, Cần Thơ và Huế.',
  },
  {
    date: 'Hôm nay',
    title: 'Bản đồ di sản mở rộng theo địa giới mới',
    desc: 'Dự án số hóa mở rộng phạm vi khỏi vùng đất Bù Đăng ban đầu, hướng tới ghi lại di sản văn hóa, lịch sử và thiên nhiên trên toàn bộ 95 xã, phường của Thành Phố Đồng Nai.',
  },
]

const cityQuickFacts = [
  { value: '95', label: 'Xã, phường' },
  { value: '12.700+', label: 'km² diện tích' },
  { value: '4,5tr', label: 'Dân số' },
  { value: 'Hạng 4', label: 'Kinh tế cả nước' },
]

const rawStats = computed(() => [
  { icon: 'mdi:castle', label: 'Di sản số hóa', raw: totalCount.value || 16, suffix: '', iconBg: 'bg-gold-500/10 group-hover:bg-gold-500/20', iconColor: 'text-gold-400' },
  { icon: 'mdi:headphones', label: 'Audio thuyết minh', raw: 2, suffix: '', iconBg: 'bg-brick-500/10 group-hover:bg-brick-500/20', iconColor: 'text-brick-400' },
  { icon: 'mdi:gamepad-variant-outline', label: 'Câu hỏi lịch sử', raw: 30, suffix: '', iconBg: 'bg-forest-500/10 group-hover:bg-forest-500/20', iconColor: 'text-forest-400' },
  { icon: 'mdi:school-outline', label: 'Trường tham gia', raw: 5, suffix: '+', iconBg: 'bg-earth-500/10 group-hover:bg-earth-500/20', iconColor: 'text-earth-400' },
  { icon: 'mdi:view-dashboard-outline', label: 'Phân hệ', raw: 5, suffix: '', iconBg: 'bg-copper-500/10 group-hover:bg-copper-500/20', iconColor: 'text-copper-400' },
  { icon: 'mdi:account-group', label: 'Ký ức cộng đồng', raw: 6, suffix: '', iconBg: 'bg-gold-500/10 group-hover:bg-gold-500/20', iconColor: 'text-gold-400' },
])

// Animated display values
const animatedValues = ref<number[]>([0, 0, 0, 0, 0, 0])

const projectStats = computed(() =>
  rawStats.value.map((s, i) => ({
    ...s,
    // SSR renders raw value; JS animation overrides once client-side observer fires
    displayValue: statsAnimated.value ? String(animatedValues.value[i] || s.raw) : String(s.raw),
  }))
)

function initStatsObserver() {
  if (!import.meta.client) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !statsAnimated.value) {
        statsAnimated.value = true
        animateCounters()
      }
    },
    { threshold: 0.3 }
  )
  if (statsSection.value) observer.observe(statsSection.value)
}

function animateCounters() {
  const targets = rawStats.value.map(s => s.raw)
  const duration = 1800
  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

    animatedValues.value = targets.map(t => Math.round(eased * t))

    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// ── PILLARS ──
const pillars = computed(() => [
  {
    icon: 'mdi:archive-check',
    iconBg: 'bg-gold-500/10 border-gold-500/25 group-hover:bg-gold-500/20',
    iconColor: 'text-gold-400',
    title: 'Bảo Tàng Số Đa Phương Tiện',
    desc: `Số hóa ${totalCount.value || 16} di sản với hồ sơ chi tiết, ảnh thực tế, âm thanh thuyết minh và video tư liệu — nguồn dữ liệu chính thống cho học sinh và du khách.`,
    link: '/explore',
    image: '/images/heritage/img-disanbudang/Khu-Bao-Ton-2.jpg',
    imagePos: 'center 30%',
  },
  {
    icon: 'mdi:map-search',
    iconBg: 'bg-forest-500/10 border-forest-500/25 group-hover:bg-forest-500/20',
    iconColor: 'text-forest-400',
    title: 'Bản Đồ Di Sản Tương Tác GIS',
    desc: 'Bản đồ số trực quan hóa tọa độ địa lý các di tích, giúp học sinh chủ động định vị và xây dựng lộ trình học tập ngoại khóa.',
    link: '/map',
    image: '/images/heritage/img-disanbudang/le-hoi-mung-lua-moi.png',
    imagePos: 'center top',
  },
  {
    icon: 'mdi:school-outline',
    iconBg: 'bg-brick-500/10 border-brick-500/25 group-hover:bg-brick-500/20',
    iconColor: 'text-brick-400',
    title: 'Cổng Học Tập Số Tương Tác',
    desc: '30 câu hỏi tìm hiểu lịch sử, 24 flashcard thuật ngữ S\'tiêng và huy hiệu điện tử — nâng cao tinh thần tự học chủ động.',
    link: '/study',
    image: '/images/heritage/img-disanbudang/Nha-Dai-Truyen-Thong.png',
    imagePos: 'center 35%',
  },
  {
    icon: 'mdi:account-group-outline',
    iconBg: 'bg-earth-500/10 border-earth-500/25 group-hover:bg-earth-500/20',
    iconColor: 'text-earth-400',
    title: 'Nền Tảng Đóng Góp Mở',
    desc: 'Kênh tương tác cho phép giáo viên, học sinh và cộng đồng đóng góp tư liệu — làm phong phú kho lưu trữ di sản chung.',
    link: '/contribute',
    image: '/images/heritage/Bombo/TAN08220.jpg',
    imagePos: 'center center',
  },
])

// ── ROADMAP ──
const roadmap = computed(() => [
  {
    time: 'Giai đoạn hiện tại',
    active: true,
    title: 'Số hóa thí điểm',
    desc: `${totalCount.value} di sản tiêu biểu khắp vùng đất Bù Đăng đã được số hóa và triển khai thí điểm trong các tiết học giáo dục địa phương.`,
  },
  {
    time: 'Giai đoạn tiếp theo',
    active: false,
    title: 'Nhân rộng toàn thành phố',
    desc: 'Mở rộng mô hình số hóa di sản sang các trường THPT và THCS khác thuộc Thành Phố Đồng Nai, xây dựng cộng đồng đóng góp tư liệu.',
  },
  {
    time: 'Tầm nhìn tương lai',
    active: false,
    title: 'Công nghệ VR/AR',
    desc: 'Tái hiện không gian lễ hội truyền thống qua thực tế ảo, tích hợp thuyết minh đa ngữ và phối hợp Sở VHTTDL Đồng Nai chuẩn hóa tư liệu.',
  },
])

// ── AUTHOR ──
const authorTags = [
  { label: 'Nghiên cứu khoa học HS', icon: 'mdi:school-outline', cls: 'text-gold-400 border-gold-500/25 bg-gold-500/8' },
  { label: 'Khảo sát thực địa', icon: 'mdi:map-marker-outline', cls: 'text-forest-400 border-forest-500/25 bg-forest-500/8' },
  { label: 'Web Development', icon: 'mdi:code-tags', cls: 'text-brick-400 border-brick-500/25 bg-brick-500/8' },
]
</script>

<style scoped>
/* ── Ken Burns ── */
.ken-burns-active {
  animation: kenburns 22s ease-out infinite alternate;
}
@keyframes kenburns {
  0% { transform: scale(1.1); }
  100% { transform: scale(1) translateX(-10px); }
}

/* ── Slide transition ── */
.fade-enter-active { transition: opacity 1.8s ease; }
.fade-leave-active { transition: opacity 1.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Section reveal ── */
.about-reveal {
  animation: aboutReveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0s);
}
@keyframes aboutReveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Scroll dot ── */
.scroll-dot {
  animation: scrollBounce 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(10px); opacity: 1; }
}

/* ── Roadmap line animation ── */
.roadmap-line {
  animation: drawLine 1.5s ease-out 0.5s both;
  transform-origin: left;
}
@keyframes drawLine {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
</style>
