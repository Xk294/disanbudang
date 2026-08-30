<template>
  <div v-if="event" class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero Header -->
    <div class="bg-dark-earth py-16 md:py-20 relative overflow-hidden border-b border-charcoal-800">
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl" />
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-forest-500/20 rounded-full blur-3xl" />
      </div>

      <div class="container-heritage relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-3xs uppercase font-bold tracking-widest mb-4">
            <Icon name="mdi:calendar-star" class="w-3.5 h-3.5" />
            Sự Kiện Văn Hóa & Lễ Hội
          </div>
          <h1 class="font-heading font-bold text-ivory text-3xl md:text-4xl lg:text-5xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-balance tracking-normal">
            {{ event.title }}
          </h1>

          <div class="flex flex-wrap gap-4 text-xs text-charcoal-350 bg-charcoal-950/40 border border-charcoal-800/60 rounded-full px-4 py-2 w-fit">
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:calendar-range" class="w-4 h-4 text-gold-400" />
              {{ formatDate(event.startDate) }}
            </span>
            <span v-if="event.endDate" class="w-1 h-1 bg-charcoal-700 rounded-full" />
            <span v-if="event.endDate" class="flex items-center gap-1.5">
              <Icon name="mdi:calendar-check" class="w-4 h-4 text-gold-400" />
              Đến {{ formatDate(event.endDate) }}
            </span>
            <span class="w-1 h-1 bg-charcoal-700 rounded-full" />
            <span class="flex items-center gap-1.5">
              <Icon name="mdi:map-marker" class="w-4 h-4 text-forest-400" />
              {{ event.location }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content & Info Layout -->
    <div class="container-heritage py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <article class="lg:col-span-8 bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
          <div>
            <h2 class="font-heading font-bold text-ivory text-xl mb-4 flex items-center gap-2">
              <Icon name="mdi:text-box-search-outline" class="w-5 h-5 text-gold-400" />
              Tổng Quan Hoạt Động
            </h2>
            <p class="text-charcoal-200 text-base md:text-lg leading-relaxed">
              {{ event.description }}
            </p>
          </div>

          <!-- Event Details Box -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-charcoal-900/60 border border-charcoal-800 rounded-2xl p-5">
            <div class="space-y-1">
              <span class="text-charcoal-500 text-3xs uppercase font-bold tracking-wider">Hình thức tổ chức</span>
              <p class="text-ivory text-sm font-semibold flex items-center gap-1.5">
                <Icon name="mdi:account-group" class="w-4 h-4 text-gold-400" />
                {{ event.isOnline ? 'Trực tuyến' : 'Trực tiếp tại thực địa' }}
              </p>
            </div>
            <div class="space-y-1">
              <span class="text-charcoal-500 text-3xs uppercase font-bold tracking-wider">Thời gian diễn ra</span>
              <p class="text-ivory text-sm font-semibold flex items-center gap-1.5">
                <Icon name="mdi:clock-outline" class="w-4 h-4 text-gold-400" />
                {{ formatDate(event.startDate) }}
              </p>
            </div>
          </div>

          <!-- Bottom Navigation -->
          <div class="pt-6 border-t border-charcoal-800 flex justify-between items-center flex-wrap gap-4">
            <NuxtLink to="/journal" class="btn-ghost text-xs py-2.5">
              <Icon name="mdi:arrow-left" class="w-4 h-4" />
              Về Nhật Ký Điền Dã
            </NuxtLink>
            <NuxtLink to="/map" class="btn-outline-gold text-xs py-2.5">
              <Icon name="mdi:map-outline" class="w-4 h-4" />
              Xem Vị Trí Trên Bản Đồ
            </NuxtLink>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-[100px]">
          <div class="bg-charcoal-950 border border-charcoal-850 rounded-3xl p-6 shadow-xl">
            <h3 class="font-heading font-bold text-ivory text-base mb-4 flex items-center gap-2">
              <Icon name="mdi:calendar-month" class="w-5 h-5 text-gold-400" />
              Sự Kiện Khác
            </h3>
            <div class="space-y-4">
              <NuxtLink
                v-for="item in otherEvents"
                :key="item.id"
                :to="'/journal/' + item.id"
                class="group block pb-4 border-b border-charcoal-800/80 last:border-0 last:pb-0"
              >
                <span class="text-gold-400 text-3xs font-semibold uppercase tracking-wider block mb-1">
                  {{ formatDate(item.startDate) }}
                </span>
                <h4 class="font-heading font-semibold text-ivory text-sm leading-snug group-hover:text-gold-300 transition-colors line-clamp-2">
                  {{ item.title }}
                </h4>
                <p class="text-charcoal-400 text-3xs mt-1 truncate">{{ item.location }}</p>
              </NuxtLink>
            </div>
          </div>

          <!-- Contribute Callout -->
          <div class="bg-charcoal-950 border border-gold-500/20 rounded-3xl p-6 shadow-xl text-center">
            <Icon name="mdi:camera-plus-outline" class="w-8 h-8 text-gold-400 mx-auto mb-2" />
            <h4 class="font-heading font-bold text-ivory text-sm mb-1">Bạn Đã Tham Dự Lễ Hội Này?</h4>
            <p class="text-charcoal-400 text-xs mb-4 leading-relaxed">
              Hãy gửi hình ảnh, video hoặc câu chuyện trải nghiệm của bạn để cùng làm giàu kho dữ liệu số.
            </p>
            <NuxtLink to="/contribute" class="btn-primary w-full justify-center text-xs py-2.5">
              Đóng Góp Kỷ Vật / Ảnh
            </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EVENTS } from '~/data/posts'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const event = computed(() => EVENTS.find((e) => e.id === slug.value) ?? null)

if (!event.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Hoạt động/Sự kiện không tồn tại trong hệ thống',
    fatal: true,
  })
}

useBreadcrumb(() => event.value?.title || '')

const otherEvents = computed(() => {
  return EVENTS.filter((e) => e.id !== event.value?.id)
})

watchEffect(() => {
  if (event.value) {
    useMuseumSeo({
      title: event.value.title,
      description: event.value.description,
      path: `/journal/${event.value.id}`,
      type: 'article',
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.value.title,
            description: event.value.description,
            startDate: event.value.startDate,
            endDate: event.value.endDate ?? event.value.startDate,
            eventAttendanceMode: event.value.isOnline
              ? 'https://schema.org/OnlineEventAttendanceMode'
              : 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'Place',
              name: event.value.location,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Thành Phố Đồng Nai',
                addressCountry: 'VN'
              }
            }
          })
        }
      ]
    })
  }
})

function formatDate(str: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(str))
}
</script>
