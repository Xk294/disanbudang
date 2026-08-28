<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-sources-title"
      @click.self="$emit('close')"
    >
      <div class="relative w-full max-w-2xl bg-charcoal-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-charcoal-950/80 text-ivory max-h-[85vh] flex flex-col overflow-hidden animate-scale-up">
        <!-- Close button -->
        <button
          class="absolute top-5 right-5 p-2 rounded-full bg-charcoal-800 text-charcoal-400 hover:text-ivory hover:bg-charcoal-700 transition-colors cursor-pointer"
          @click="$emit('close')"
          aria-label="Đóng bảng nguồn xác minh"
        >
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>

        <!-- Header -->
        <div class="flex items-center gap-3.5 mb-6 pr-8">
          <div class="w-12 h-12 rounded-2xl bg-forest-500/15 border border-forest-500/30 flex items-center justify-center shrink-0">
            <Icon name="mdi:certificate-outline" class="w-6 h-6 text-forest-400" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-3xs uppercase tracking-widest font-bold text-forest-400">Data Provenance & Scientific Rigor</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-500/20 text-forest-300 border border-forest-500/30">Verified</span>
            </div>
            <h3 id="modal-sources-title" class="font-heading font-bold text-xl sm:text-2xl text-ivory mt-0.5">
              Hồ Sơ Nguồn Tư Liệu Xác Minh
            </h3>
          </div>
        </div>

        <p class="text-charcoal-300 text-xs sm:text-sm leading-relaxed mb-6 bg-charcoal-950/60 p-4 rounded-2xl border border-charcoal-800">
          <strong class="text-gold-400 font-semibold">Tiêu chuẩn học thuật:</strong> Toàn bộ dữ liệu lịch sử, văn hóa và tọa độ di sản của dự án được trích xuất từ các hồ sơ xếp hạng di tích chính thức, công trình nghiên cứu dân tộc học của các viện chuyên ngành và ký ức truyền miệng đã xác minh nhân chứng.
        </p>

        <!-- Sources List -->
        <div class="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          <div
            v-for="(source, index) in sources"
            :key="source.id || index"
            class="bg-charcoal-850/60 hover:bg-charcoal-800/80 border border-charcoal-750 hover:border-gold-500/30 rounded-2xl p-4 sm:p-5 transition-all duration-300"
          >
            <div class="flex items-start justify-between gap-3 mb-2">
              <div class="flex items-center gap-2">
                <span
                  class="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider"
                  :class="getTypeBadgeClass(source.type)"
                >
                  {{ getTypeLabel(source.type) }}
                </span>
                <span v-if="source.publishedYear" class="text-charcoal-400 text-xs font-mono">
                  ({{ source.publishedYear }})
                </span>
              </div>
              <span class="text-3xs font-semibold px-2 py-0.5 rounded bg-charcoal-950 border border-charcoal-700 text-charcoal-400">
                #{{ source.id || `SRC-0${index + 1}` }}
              </span>
            </div>

            <h4 class="font-heading font-semibold text-ivory text-base mb-1.5 leading-snug">
              {{ source.title }}
            </h4>

            <div class="space-y-1 text-xs text-charcoal-300 mb-2">
              <p v-if="source.author" class="flex items-center gap-1.5">
                <Icon name="mdi:account-outline" class="w-3.5 h-3.5 text-gold-400/80" />
                <span class="text-charcoal-400">Tác giả/Nghiên cứu viên:</span> {{ source.author }}
              </p>
              <p v-if="source.institution" class="flex items-center gap-1.5">
                <Icon name="mdi:domain" class="w-3.5 h-3.5 text-gold-400/80" />
                <span class="text-charcoal-400">Cơ quan/Nhà xuất bản:</span> {{ source.institution }}
              </p>
              <p v-if="source.referenceCode" class="flex items-center gap-1.5">
                <Icon name="mdi:file-document-outline" class="w-3.5 h-3.5 text-gold-400/80" />
                <span class="text-charcoal-400">Trích yếu/Số hồ sơ:</span> {{ source.referenceCode }}
              </p>
            </div>

            <p v-if="source.notes" class="text-[11px] text-charcoal-400 italic bg-charcoal-950/40 p-2.5 rounded-xl border border-charcoal-800/80 mt-2">
              💡 {{ source.notes }}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 pt-4 border-t border-charcoal-800 flex items-center justify-between text-xs text-charcoal-400">
          <span>Dữ liệu số hóa bởi Nhóm Tác giả Di Sản Bù Đăng</span>
          <button
            class="btn-ghost text-xs px-4 py-2 border border-charcoal-700 hover:border-gold-500/50 text-ivory rounded-xl"
            @click="$emit('close')"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { HeritageSource } from '~/types'

defineProps<{
  isOpen: boolean
  sources?: HeritageSource[]
}>()

defineEmits<{
  (e: 'close'): void
}>()

function getTypeLabel(type: string): string {
  switch (type) {
    case 'primary': return 'Tư liệu Cấp 1 (Hồ sơ di tích / Quyết định)'
    case 'academic': return 'Công trình Học thuật / Nghiên cứu'
    case 'oral': return 'Nhân chứng Lịch sử / Già Làng'
    case 'fieldwork': return 'Khảo sát Thực địa'
    default: return 'Tài liệu Lưu trữ'
  }
}

function getTypeBadgeClass(type: string): string {
  switch (type) {
    case 'primary': return 'bg-brick-500/20 text-brick-300 border border-brick-500/30'
    case 'academic': return 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
    case 'oral': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    case 'fieldwork': return 'bg-forest-500/20 text-forest-300 border border-forest-500/30'
    default: return 'bg-charcoal-800 text-charcoal-300'
  }
}
</script>

<style scoped>
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
