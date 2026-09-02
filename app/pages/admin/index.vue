<template>
  <div class="min-h-screen bg-stone-950 flex items-center justify-center">
    <Icon name="mdi:loading" class="w-6 h-6 text-amber-500 animate-spin" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'admin',
})

// /admin always redirects to /admin/contributions
onMounted(() => {
  navigateTo('/admin/contributions')
})
</script>
