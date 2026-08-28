<template>
  <section ref="sectionRef" class="py-20 lg:py-28 bg-charcoal-950 border-t border-charcoal-800/60 relative overflow-hidden">
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
          v-for="stat in displayStats"
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
</template>

<script setup lang="ts">
interface RawStat {
  icon: string
  label: string
  raw: number
  suffix: string
  iconBg: string
  iconColor: string
}

const props = defineProps<{
  stats: RawStat[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const animated = ref(false)
const animatedValues = ref<number[]>(props.stats.map(() => 0))

const displayStats = computed(() =>
  props.stats.map((s, i) => ({
    ...s,
    displayValue: animated.value ? String(animatedValues.value[i] || s.raw) : '0',
  }))
)

function animateCounters() {
  const targets = props.stats.map(s => s.raw)
  const duration = 1800
  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

    animatedValues.value = targets.map(t => Math.round(eased * t))

    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!import.meta.client) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !animated.value) {
        animated.value = true
        animateCounters()
      }
    },
    { threshold: 0.3 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>
