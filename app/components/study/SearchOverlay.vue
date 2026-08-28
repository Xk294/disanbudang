<template>
  <Teleport to="body">
    <Transition name="search-overlay">
      <div
        v-if="open"
        class="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
        @click.self="emit('update:open', false)"
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm toàn trang"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 search-overlay-backdrop" @click="emit('update:open', false)" />

        <!-- Panel -->
        <div class="relative w-full max-w-2xl bg-charcoal-950 border border-charcoal-800 rounded-2xl shadow-2xl overflow-hidden z-10">
          <!-- Search input -->
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-charcoal-800">
            <Icon name="mdi:magnify" class="w-5 h-5 text-gold-400 shrink-0" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Tìm di sản, thuật ngữ, tài liệu, địa danh..."
              class="flex-1 bg-transparent border-none outline-none text-ivory placeholder-charcoal-500 text-base"
              @keydown.escape="emit('update:open', false)"
              @keydown.arrow-down.prevent="moveFocus(1)"
              @keydown.arrow-up.prevent="moveFocus(-1)"
              @keydown.enter="selectActive"
            />
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-3xs text-charcoal-400 border border-charcoal-800 px-1.5 py-0.5 rounded font-mono">ESC</span>
              <button
                class="w-6 h-6 rounded-full flex items-center justify-center text-charcoal-500 hover:text-ivory hover:bg-charcoal-800 transition-all"
                @click="emit('update:open', false)"
                aria-label="Đóng tìm kiếm"
              >
                <Icon name="mdi:close" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Results -->
          <div class="max-h-[60vh] overflow-y-auto scrollbar-none">
            <!-- Empty state -->
            <div v-if="query.trim() && results.length === 0" class="py-12 text-center space-y-2">
              <Icon name="mdi:magnify-remove-outline" class="w-10 h-10 text-charcoal-400 mx-auto" />
              <p class="text-charcoal-500 text-sm">Không tìm thấy kết quả cho "<span class="text-ivory">{{ query }}</span>"</p>
              <p class="text-charcoal-400 text-xs">Thử từ khóa khác: Chiến khu Đ, cồng chiêng, thổ cẩm...</p>
            </div>

            <!-- Default hints (no query) -->
            <div v-else-if="!query.trim()" class="p-4 space-y-3">
              <p class="text-3xs font-bold uppercase tracking-widest text-charcoal-400">GỢI Ý TÌM KIẾM NHANH</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="hint in hints"
                  :key="hint"
                  class="px-3 py-1.5 bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/40 hover:text-gold-400 text-charcoal-300 text-xs rounded-full transition-all duration-200"
                  @click="query = hint"
                >
                  {{ hint }}
                </button>
              </div>
            </div>

            <!-- Results grouped by category -->
            <div v-else class="p-2">
              <div
                v-for="(group, gIdx) in groupedResults"
                :key="gIdx"
                class="mb-4 last:mb-0"
              >
                <div class="px-3 py-1 text-3xs font-bold uppercase tracking-widest text-charcoal-400 flex items-center gap-2">
                  <Icon :name="group.icon" class="w-3.5 h-3.5 text-gold-500" />
                  {{ group.label }}
                  <span class="text-charcoal-400">({{ group.items.length }})</span>
                </div>

                <button
                  v-for="(item, iIdx) in group.items"
                  :key="iIdx"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group"
                  :class="getFlatIndex(gIdx, iIdx) === focusedIndex
                    ? 'bg-gold-500/10 border border-gold-500/20'
                    : 'hover:bg-charcoal-900 border border-transparent'"
                  @click="selectResult(item)"
                  @mouseenter="focusedIndex = getFlatIndex(gIdx, iIdx)"
                >
                  <div class="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-gold-400"
                    :class="getFlatIndex(gIdx, iIdx) === focusedIndex ? 'bg-gold-500/15' : 'bg-charcoal-900'">
                    <Icon :name="group.icon" class="w-4 h-4" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-ivory truncate group-hover:text-gold-300 transition-colors">{{ item.title }}</p>
                    <p v-if="item.subtitle" class="text-3xs text-charcoal-500 truncate">{{ item.subtitle }}</p>
                  </div>
                  <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-400 group-hover:text-gold-400 shrink-0 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          <!-- Footer hint -->
          <div class="border-t border-charcoal-800 px-4 py-2 flex items-center justify-between text-3xs text-charcoal-400">
            <span class="flex items-center gap-2">
              <kbd class="border border-charcoal-700 px-1 rounded font-mono">↑↓</kbd> Điều hướng
              <kbd class="border border-charcoal-700 px-1 rounded font-mono">↵</kbd> Chọn
            </span>
            <span>Tìm kiếm toàn bộ nội dung Di Sản Bù Đăng</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface SearchResult {
  title: string
  subtitle?: string
  category: 'research' | 'glossary' | 'landmark' | 'lesson' | 'media'
  action: () => void
}

interface ResultGroup {
  label: string
  icon: string
  items: SearchResult[]
}

const props = defineProps<{
  open: boolean
  resources?: { id: string; title: string; author: string; school: string; subject: string }[]
  glossary?: { term: string; definition: string; category: string }[]
  landmarks?: { id: string; name: string; desc: string }[]
  lessons?: { id: string; title: string; subject: string }[]
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'select-tab': [tabId: string]
  'select-landmark': [id: string]
  'filter-research': [query: string]
}>()

const query = ref('')
const focusedIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)

const hints = ['Chiến khu Đ', 'Cồng chiêng', 'Thổ cẩm S\'tiêng', 'Trảng cỏ Bù Lạch', 'Thác Mơ', 'Sóc Bom Bo']

// Auto-focus when opened
watch(() => props.open, (val) => {
  if (val) {
    nextTick(() => inputRef.value?.focus())
    query.value = ''
    focusedIndex.value = -1
  }
})

const results = computed<SearchResult[]>(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  const out: SearchResult[] = []

  // Search resources
  props.resources?.forEach(r => {
    if (r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.author.toLowerCase().includes(q)) {
      out.push({
        title: r.title,
        subtitle: `${r.school} • ${r.subject}`,
        category: 'research',
        action: () => {
          emit('filter-research', r.title)
          emit('select-tab', 'research')
          emit('update:open', false)
        }
      })
    }
  })

  // Search glossary
  props.glossary?.forEach(g => {
    if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
      out.push({
        title: g.term,
        subtitle: g.definition.slice(0, 60) + '...',
        category: 'glossary',
        action: () => {
          emit('select-tab', 'glossary')
          emit('update:open', false)
        }
      })
    }
  })

  // Search landmarks
  props.landmarks?.forEach(l => {
    if (l.name.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)) {
      out.push({
        title: l.name,
        subtitle: 'Địa điểm di sản',
        category: 'landmark',
        action: () => {
          emit('select-tab', 'map')
          emit('select-landmark', l.id)
          emit('update:open', false)
        }
      })
    }
  })

  // Search lessons
  props.lessons?.forEach(l => {
    if (l.title.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q)) {
      out.push({
        title: l.title,
        subtitle: l.subject,
        category: 'lesson',
        action: () => {
          emit('update:open', false)
          useRouter().push(`/study/lesson/${l.id}`)
        }
      })
    }
  })

  return out
})

const groupedResults = computed<ResultGroup[]>(() => {
  const categoryMap: Record<string, ResultGroup> = {
    research: { label: 'Tài liệu nghiên cứu', icon: 'mdi:file-document-outline', items: [] },
    glossary: { label: 'Từ điển S\'tiêng', icon: 'mdi:translate', items: [] },
    landmark: { label: 'Địa danh di sản', icon: 'mdi:map-marker', items: [] },
    lesson: { label: 'Bài học', icon: 'mdi:book-open-variant', items: [] },
    media: { label: 'Đa phương tiện', icon: 'mdi:image-multiple-outline', items: [] },
  }
  results.value.forEach(r => {
    const group = categoryMap[r.category]
    if (group) {
      group.items.push(r)
    }
  })
  return Object.values(categoryMap).filter(g => g.items.length > 0)
})

// Flat index mapping for keyboard navigation
function getFlatIndex(gIdx: number, iIdx: number): number {
  let count = 0
  for (let i = 0; i < gIdx; i++) count += (groupedResults.value[i]?.items.length ?? 0)
  return count + iIdx
}

const totalResults = computed(() => results.value.length)

function moveFocus(dir: number) {
  focusedIndex.value = Math.max(0, Math.min(totalResults.value - 1, focusedIndex.value + dir))
}

function selectActive() {
  if (focusedIndex.value < 0) return
  results.value[focusedIndex.value]?.action()
}

function selectResult(item: SearchResult) {
  item.action()
}
</script>

<style scoped>
.search-overlay-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-overlay-leave-active {
  transition: all 0.2s ease;
}
.search-overlay-enter-from,
.search-overlay-leave-to {
  opacity: 0;
}
.search-overlay-enter-from .relative,
.search-overlay-leave-to .relative {
  transform: translateY(-12px) scale(0.97);
}
</style>
