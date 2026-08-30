<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

definePageMeta({
  middleware: [
    (to) => {
      const id = to.params.id as string
      return navigateTo(`/explore/post/${id}/`, { redirectCode: 301 })
    },
  ],
})
</script>
