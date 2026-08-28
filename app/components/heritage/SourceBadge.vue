<template>
  <div v-if="sources && sources.length > 0" class="inline-flex items-center">
    <button
      type="button"
      class="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-500/10 hover:bg-forest-500/20 border border-forest-500/30 hover:border-forest-500/60 transition-all duration-300 shadow-sm cursor-pointer"
      @click="$emit('open')"
      title="Xem danh mục tài liệu và nguồn kiểm chứng khoa học"
    >
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75" />
        <span class="relative inline-flex rounded-full h-2 w-2 bg-forest-500" />
      </span>
      <Icon name="mdi:shield-check" class="w-4 h-4 text-forest-400 group-hover:scale-110 transition-transform" />
      <span class="text-forest-300 text-xs font-semibold tracking-wide">
        Đã Thẩm Định ({{ sources.length }} Nguồn)
      </span>
      <Icon name="mdi:chevron-right" class="w-3.5 h-3.5 text-forest-400/60 group-hover:text-forest-300 group-hover:translate-x-0.5 transition-all" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { HeritageSource } from '~/types'

defineProps<{
  sources?: HeritageSource[]
}>()

defineEmits<{
  (e: 'open'): void
}>()
</script>
