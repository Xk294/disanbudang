<template>
  <Teleport to="body">
    <Transition name="cert-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/90 backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Chứng Chỉ Số Nhà Khám Phá Di Sản Bù Đăng"
        @click.self="close"
      >
        <div class="relative w-full max-w-2xl bg-gradient-to-b from-charcoal-900 via-charcoal-950 to-charcoal-950 border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 p-5 sm:p-7 flex flex-col space-y-6">
          
          <!-- Top Accent Gold Line -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

          <!-- Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center border border-gold-500/40">
                <Icon name="mdi:certificate-outline" class="w-6 h-6" />
              </div>
              <div>
                <span class="text-3xs uppercase font-bold tracking-widest text-gold-400">Vinh Danh Thành Tích</span>
                <h3 class="font-heading font-bold text-lg text-ivory">Chứng Nhận Nhà Khám Phá Di Sản</h3>
              </div>
            </div>

            <button
              class="p-2 rounded-full hover:bg-charcoal-800 text-charcoal-400 hover:text-ivory transition-colors"
              @click="close"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Name Input for Personalization -->
          <div class="bg-charcoal-900/80 p-4 rounded-2xl border border-charcoal-800 space-y-2">
            <label class="block text-3xs uppercase font-bold text-gold-400 tracking-wider">Tên người nhận chứng chỉ (Nhập tên bạn hoặc Giám khảo):</label>
            <div class="flex gap-2">
              <input
                v-model="recipientName"
                type="text"
                placeholder="Ví dụ: Thầy/Cô Ban Giám Khảo, Nguyễn Văn A..."
                class="flex-1 bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2 text-xs text-ivory focus:outline-none focus:border-gold-500"
                @input="renderCertificate"
              />
              <button
                class="btn-primary px-4 py-2 text-xs font-bold shrink-0"
                @click="renderCertificate"
              >
                Cập Nhật
              </button>
            </div>
          </div>

          <!-- Certificate Canvas Preview -->
          <div class="w-full aspect-[16/10] bg-charcoal-950 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl flex items-center justify-center relative">
            <canvas ref="certCanvas" class="w-full h-full object-contain" />
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span class="text-3xs text-charcoal-400 italic">Mã xác thực số: DSB-{{ Math.abs(hashCode(recipientName)).toString(16).toUpperCase() }}</span>
            
            <div class="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                class="flex-1 sm:flex-none btn-ghost py-2.5 px-4 text-xs font-semibold text-charcoal-300 border border-charcoal-700 hover:border-gold-500"
                @click="close"
              >
                Đóng
              </button>
              <button
                class="flex-1 sm:flex-none btn-primary py-2.5 px-5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                @click="downloadCertificate"
              >
                <Icon name="mdi:download" class="w-4 h-4" />
                <span>Tải Chứng Chỉ (PNG)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  defaultName?: string
  quizScore?: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const recipientName = ref(props.defaultName || 'Ban Giám Khảo Cuộc Thi')
const certCanvas = ref<HTMLCanvasElement | null>(null)

watch(() => props.isOpen, (open) => {
  if (open) {
    nextTick(() => {
      renderCertificate()
    })
  }
})

function close() {
  emit('close')
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return hash || 123456
}

function renderCertificate() {
  const canvas = certCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // High-DPI Canvas Resolution (1600 x 1000)
  canvas.width = 1600
  canvas.height = 1000

  // 1. Background deep royal charcoal & gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1000)
  bgGrad.addColorStop(0, '#0F0C08')
  bgGrad.addColorStop(0.5, '#1A140E')
  bgGrad.addColorStop(1, '#0A0806')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 1600, 1000)

  // 2. Ornate Golden Borders (Double Ring)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
  ctx.lineWidth = 12
  ctx.strokeRect(40, 40, 1520, 920)

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)'
  ctx.lineWidth = 3
  ctx.strokeRect(55, 55, 1490, 890)

  // Corner Ornaments
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(40, 0)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 40)
    ctx.stroke()
    ctx.restore()
  }
  drawCorner(70, 70, 0)
  drawCorner(1530, 70, Math.PI / 2)
  drawCorner(1530, 930, Math.PI)
  drawCorner(70, 930, -Math.PI / 2)

  // 3. Top Organization & Emblem
  ctx.fillStyle = '#D4AF37'
  ctx.font = 'bold 26px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG — THÀNH PHỐ ĐỒNG NAI', 800, 140)

  // 4. Main Certificate Title
  ctx.fillStyle = '#F5F1EA'
  ctx.font = 'bold 64px serif'
  ctx.fillText('CHỨNG NHẬN VINH DANH', 800, 240)

  ctx.fillStyle = '#D4AF37'
  ctx.font = 'italic 30px serif'
  ctx.fillText('Nhà Khám Phá & Bảo Tồn Di Sản Văn Hóa Bù Đăng', 800, 300)

  // 5. Recipient Name
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 56px serif'
  ctx.fillText(recipientName.value || 'Bạn Yêu Di Sản', 800, 430)

  // Underline for name
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(500, 460)
  ctx.lineTo(1100, 460)
  ctx.stroke()

  // 6. Commendation text
  ctx.fillStyle = '#CFC8BA'
  ctx.font = '30px sans-serif'
  ctx.fillText('Đã hoàn thành xuất sắc chuyến trải nghiệm không gian số hóa', 800, 530)
  ctx.fillText('16 Di sản Văn hóa, Lịch sử và Thiên nhiên vùng đất Bù Đăng — Đồng Nai', 800, 580)

  // 7. Badge & Score Box
  ctx.fillStyle = 'rgba(212, 175, 55, 0.12)'
  ctx.fillRect(600, 640, 400, 90)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
  ctx.strokeRect(600, 640, 400, 90)

  ctx.fillStyle = '#D4AF37'
  ctx.font = 'bold 28px sans-serif'
  ctx.fillText(`Hạng: Đại Sứ Di Sản Xuất Sắc`, 800, 695)

  // 8. Signatures & Dates
  const now = new Date()
  const dateStr = `Ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`
  ctx.fillStyle = '#8C806E'
  ctx.font = 'italic 24px sans-serif'
  ctx.fillText(dateStr, 800, 810)

  ctx.fillStyle = '#D4AF37'
  ctx.font = 'bold 22px sans-serif'
  ctx.fillText('BAN DỰ ÁN SỐ HÓA DI SẢN BÙ ĐĂNG', 800, 860)

  // 9. Small verification code
  const code = `MÃ XÁC THỰC: DSB-${Math.abs(hashCode(recipientName.value)).toString(16).toUpperCase()}`
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.font = '18px monospace'
  ctx.fillText(code, 800, 915)
}

function downloadCertificate() {
  const canvas = certCanvas.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = `Chung_Nhan_Di_San_Bu_Dang_${recipientName.value.replace(/\s+/g, '_')}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.cert-fade-enter-active,
.cert-fade-leave-active {
  transition: opacity 0.3s ease;
}
.cert-fade-enter-from,
.cert-fade-leave-to {
  opacity: 0;
}
</style>
