import { defineStore } from 'pinia'
import type { Heritage, MapFilter } from '~/types'
import { HERITAGES } from '~/data/heritages'

export const useHeritageStore = defineStore('heritage', () => {
  // Static data as computed getter (not serialized into Pinia state / SSR payload)
  const heritages = computed<Heritage[]>(() => HERITAGES)
  const selectedHeritage = ref<Heritage | null>(null)
  const isLoading = ref(false)
  const searchQuery = ref('')
  const activeCategory = ref<string>('')
  const activePeriod = ref<string>('')
  const activeCluster = ref<string>('')
  const mapGesturesEnabled = ref(true)

  // Helper for accent-insensitive search
  function stripDiacritics(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase()
      .trim()
  }

  // Getters
  const filteredHeritages = computed(() => {
    let result = heritages.value

    if (searchQuery.value) {
      const rawQ = searchQuery.value.toLowerCase().trim()
      const normalizedQ = stripDiacritics(searchQuery.value)
      result = result.filter((h) => {
        const titleMatch = h.title.toLowerCase().includes(rawQ) || stripDiacritics(h.title).includes(normalizedQ)
        const subMatch = Boolean(h.subtitle && (h.subtitle.toLowerCase().includes(rawQ) || stripDiacritics(h.subtitle).includes(normalizedQ)))
        const descMatch = Boolean(h.shortDescription && (h.shortDescription.toLowerCase().includes(rawQ) || stripDiacritics(h.shortDescription).includes(normalizedQ)))
        const tagMatch = h.tags.some((t) => t.toLowerCase().includes(rawQ) || stripDiacritics(t).includes(normalizedQ))
        const quickFactMatch = Boolean(h.quickFacts?.some((f) => f.value.toLowerCase().includes(rawQ) || stripDiacritics(f.value).includes(normalizedQ)))
        return titleMatch || subMatch || descMatch || tagMatch || quickFactMatch
      })
    }

    if (activeCategory.value) {
      result = result.filter((h) => h.category === activeCategory.value)
    }

    if (activePeriod.value) {
      result = result.filter((h) => h.period === activePeriod.value)
    }

    if (activeCluster.value) {
      result = result.filter((h) => h.cluster === activeCluster.value)
    }

    return result
  })

  const featuredHeritages = computed(() =>
    heritages.value.filter((h) => h.featured && h.status === 'published'),
  )

  const publishedHeritages = computed(() =>
    heritages.value.filter((h) => h.status === 'published'),
  )

  const heritagesByCategory = computed(() => {
    const map: Record<string, Heritage[]> = {}
    heritages.value.forEach((h) => {
      if (!map[h.category]) map[h.category] = []
      map[h.category]!.push(h)
    })
    return map
  })

  const totalCount = computed(() => heritages.value.length)

  // Actions
  function selectHeritage(heritage: Heritage | null) {
    selectedHeritage.value = heritage
  }

  function getBySlug(slug: string): Heritage | undefined {
    return heritages.value.find((h) => h.slug === slug)
  }

  function getById(id: string): Heritage | undefined {
    return heritages.value.find((h) => h.id === id)
  }

  function getRelated(heritage: Heritage): Heritage[] {
    return heritage.relatedIds
      .map((id) => heritages.value.find((h) => h.id === id))
      .filter(Boolean) as Heritage[]
  }

  function setSearch(query: string) {
    searchQuery.value = query
  }

  function setCategory(category: string) {
    activeCategory.value = category
  }

  function setPeriod(period: string) {
    activePeriod.value = period
  }

  function setCluster(cluster: string) {
    activeCluster.value = cluster
  }

  function clearFilters() {
    searchQuery.value = ''
    activeCategory.value = ''
    activePeriod.value = ''
    activeCluster.value = ''
  }

  return {
    heritages,
    selectedHeritage,
    isLoading,
    searchQuery,
    activeCategory,
    activePeriod,
    activeCluster,
    mapGesturesEnabled,
    filteredHeritages,
    featuredHeritages,
    publishedHeritages,
    heritagesByCategory,
    totalCount,
    selectHeritage,
    getBySlug,
    getById,
    getRelated,
    setSearch,
    setCategory,
    setPeriod,
    setCluster,
    clearFilters,
  }
})
