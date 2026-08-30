<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    () => {
      return navigateTo('/explore/', { redirectCode: 301 })
    },
  ],
})
</script>
