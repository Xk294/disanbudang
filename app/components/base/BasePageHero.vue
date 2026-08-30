<template>
  <section class="relative overflow-hidden bg-dark-earth text-ivory">
    <div v-if="image" class="absolute inset-0 opacity-45">
      <NuxtImg :src="image" :alt="title" class="h-full w-full object-cover" sizes="100vw" />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/65 to-charcoal-900/20" />
    </div>
    <div class="noise-overlay" />

    <div class="container-heritage relative z-10 py-20 md:py-28 lg:py-32">
      <div class="max-w-4xl">
        <p v-if="eyebrow" class="eyebrow mb-4 text-gold-300">{{ eyebrow }}</p>
        <h1 class="text-display text-shadow-hero leading-[1.35] md:leading-[1.3] lg:leading-[1.25] text-balance tracking-normal mb-6 md:mb-8">{{ title }}</h1>
        <p v-if="description" class="max-w-2xl text-lg leading-relaxed text-ivory/75 md:text-xl">
          {{ description }}
        </p>
        <div v-if="$slots.default" class="mt-8">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  image?: string
}>()
</script>
