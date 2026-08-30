<template>
  <div v-if="heritage" class="min-h-screen bg-dark-earth text-ivory">
    <section class="relative flex min-h-screen items-center overflow-hidden py-20">
      <NuxtImg :src="heritage.coverImage" :alt="heritage.title" class="absolute inset-0 h-full w-full object-cover opacity-35" sizes="100vw" />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-charcoal-900/30" />
      <div class="noise-overlay" />

      <div class="container-heritage relative z-10">
        <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p class="eyebrow mb-4 text-gold-300">Trải Nghiệm QR · {{ getCategoryLabel(heritage.category) }}</p>
            <h1 class="text-display text-shadow-hero">{{ heritage.title }}</h1>
            <p class="mt-5 font-accent text-2xl italic text-gold-200">{{ heritage.subtitle }}</p>
            <p class="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{{ heritage.shortDescription }}</p>

            <div class="mt-8 flex flex-wrap gap-3">
              <NuxtLink :to="`/heritage/${heritage.slug}`" class="btn-primary">
                Vào triển lãm số
                <Icon name="mdi:arrow-right" class="h-4 w-4" />
              </NuxtLink>
              <NuxtLink to="/map" class="btn-ghost">
                Xem bản đồ
                <Icon name="mdi:map-outline" class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>

          <div class="rounded-[2rem] border border-gold-500/25 bg-ivory p-6 text-charcoal-900 shadow-warm-xl">
            <div class="rounded-3xl bg-beige-100 p-6 text-center">
              <div class="mx-auto mb-5 grid h-56 w-56 place-items-center rounded-2xl bg-white shadow-inset-warm">
                <Icon name="mdi:qrcode" class="h-36 w-36 text-charcoal-800" />
              </div>
              <p class="eyebrow text-earth-600">Quét mã & tiếp tục</p>
              <h2 class="mt-2 font-heading text-2xl font-bold">Mang di sản theo bạn</h2>
              <p class="mt-3 text-sm leading-relaxed text-charcoal-500">Route QR sạch, SEO-friendly, sẵn sàng in trên bảng chỉ dẫn, bảo tàng trường học hoặc điểm di tích.</p>
            </div>

            <div class="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
              <div class="rounded-2xl bg-white p-3"><strong class="block text-lg text-earth-600">Audio</strong>thuyết minh</div>
              <div class="rounded-2xl bg-white p-3"><strong class="block text-lg text-forest-600">Map</strong>vị trí</div>
              <div class="rounded-2xl bg-white p-3"><strong class="block text-lg text-brick-600">Quiz</strong>học vui</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const store = useHeritageStore()
const { getCategoryLabel } = useHeritage()
const heritage = computed(() => store.getBySlug(route.params.slug as string) ?? null)

if (!heritage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Di sản không tồn tại trong hệ thống',
    fatal: true,
  })
}

useHeritageSeo(heritage)
</script>
