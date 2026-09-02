<template>
  <Teleport to="body">
    <Transition name="ar-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/90 backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Trải nghiệm Thực tế Tăng cường WebAR Hiện vật 3D"
        @click.self="close"
      >
        <div class="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-charcoal-900 via-charcoal-950 to-charcoal-950 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 flex flex-col">
          
          <!-- Top Accent Gold Line -->
          <div class="h-1 w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          <!-- Header -->
          <div class="p-4 sm:p-6 border-b border-charcoal-800/80 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Icon name="mdi:cube-scan" class="w-5 h-5" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-3xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">Công Nghệ WebAR 3D</span>
                  <span class="text-3xs text-charcoal-400 hidden sm:inline">• Không cần cài App</span>
                </div>
                <h3 class="font-heading font-bold text-ivory text-base sm:text-lg mt-0.5">{{ currentArtifact.name }}</h3>
              </div>
            </div>

            <!-- Close button -->
            <button
              class="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 hover:text-white flex items-center justify-center transition-colors border border-charcoal-700"
              @click="close"
              aria-label="Đóng bảng WebAR"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
            
            <!-- Left: 3D Interactive Canvas Area (7 cols) -->
            <div class="lg:col-span-7 bg-charcoal-950/70 p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[320px] sm:min-h-[400px] border-b lg:border-b-0 lg:border-r border-charcoal-800/80">
              
              <!-- 3D Interactive Stage -->
              <div
                class="relative w-full h-72 sm:h-84 rounded-2xl bg-gradient-to-b from-charcoal-900/60 to-charcoal-950/80 border border-charcoal-800/80 flex items-center justify-center overflow-hidden group cursor-grab active:cursor-grabbing shadow-inner select-none"
                @mousedown="startDrag"
                @mousemove="onDrag"
                @mouseup="stopDrag"
                @mouseleave="stopDrag"
                @touchstart="startTouch"
                @touchmove="onTouch"
                @touchend="stopDrag"
              >
                <!-- Ambient Stage Glow -->
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

                <!-- 3D Transform Object Container -->
                <div
                  class="relative transition-transform duration-75 flex flex-col items-center justify-center"
                  :style="{
                    transform: `perspective(800px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${zoomLevel})`,
                  }"
                >
                  <img
                    :src="currentArtifact.image"
                    :alt="currentArtifact.name"
                    class="max-w-[220px] sm:max-w-[280px] max-h-[200px] sm:max-h-[240px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-105 pointer-events-none rounded-xl"
                  />
                  <!-- Shadow base under 3D object -->
                  <div class="w-44 sm:w-56 h-6 bg-black/60 rounded-full blur-md -mt-2 transform scale-y-50 pointer-events-none" />
                </div>

                <!-- Interaction Overlay Hint -->
                <div class="absolute bottom-3 left-3 bg-charcoal-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-charcoal-800 text-3xs text-charcoal-300 flex items-center gap-1.5 pointer-events-none">
                  <Icon name="mdi:rotate-3d" class="w-4 h-4 text-gold-400" />
                  <span>Kéo chuột/chạm để xoay 360°</span>
                </div>

                <!-- Sound Tap Button (Interactive Strike) -->
                <button
                  class="absolute top-3 right-3 px-3 py-2 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 text-3xs uppercase font-bold tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95"
                  @click="playArtifactSound"
                  title="Chạm để gõ phát âm thanh hiện vật"
                >
                  <Icon name="mdi:volume-high" class="w-4 h-4 text-gold-400" />
                  <span>Gõ thử âm thanh</span>
                </button>
              </div>

              <!-- Controls bar below stage -->
              <div class="w-full flex items-center justify-between gap-2 mt-4">
                <!-- Zoom controls -->
                <div class="flex items-center gap-1 bg-charcoal-900 p-1 rounded-xl border border-charcoal-800">
                  <button
                    class="p-2 rounded-lg text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors"
                    @click="zoomLevel = Math.max(0.7, zoomLevel - 0.15)"
                    title="Thu nhỏ"
                  >
                    <Icon name="mdi:magnify-minus-outline" class="w-4 h-4" />
                  </button>
                  <span class="text-3xs text-charcoal-400 font-mono px-1">{{ Math.round(zoomLevel * 100) }}%</span>
                  <button
                    class="p-2 rounded-lg text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors"
                    @click="zoomLevel = Math.min(1.6, zoomLevel + 0.15)"
                    title="Phóng to"
                  >
                    <Icon name="mdi:magnify-plus-outline" class="w-4 h-4" />
                  </button>
                  <button
                    class="p-2 rounded-lg text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 transition-colors ml-1 border-l border-charcoal-800 pl-2"
                    @click="resetView"
                    title="Đặt lại góc nhìn"
                  >
                    <Icon name="mdi:refresh" class="w-4 h-4" />
                  </button>
                </div>

                <!-- Launch AR Button (Primary WOW Feature) -->
                <button
                  class="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20"
                  @click="openARView"
                >
                  <Icon name="mdi:camera-metering-spot" class="w-4 h-4" />
                  <span>Chiếu AR Lên Bàn</span>
                </button>
              </div>
            </div>

            <!-- Right: Artifact Details & QR for Mobile AR (5 cols) -->
            <div class="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-charcoal-950/40">
              <div class="space-y-4">
                <div>
                  <span class="text-3xs uppercase font-bold tracking-widest text-gold-400">{{ currentArtifact.category }}</span>
                  <h4 class="font-heading font-bold text-lg text-ivory mt-0.5">{{ currentArtifact.name }}</h4>
                  <p class="text-xs text-charcoal-400 font-accent italic mt-0.5">{{ currentArtifact.subtitle }}</p>
                </div>

                <p class="text-xs text-charcoal-300 leading-relaxed">{{ currentArtifact.description }}</p>

                <!-- Spec Grid -->
                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-charcoal-850">
                  <div class="bg-charcoal-900/60 p-2.5 rounded-xl border border-charcoal-800">
                    <span class="text-3xs text-charcoal-500 uppercase font-bold block">Niên đại</span>
                    <span class="text-xs text-ivory font-semibold truncate block mt-0.5">{{ currentArtifact.period }}</span>
                  </div>
                  <div class="bg-charcoal-900/60 p-2.5 rounded-xl border border-charcoal-800">
                    <span class="text-3xs text-charcoal-500 uppercase font-bold block">Chất liệu</span>
                    <span class="text-xs text-ivory font-semibold truncate block mt-0.5">{{ currentArtifact.material }}</span>
                  </div>
                </div>

                <!-- Artifact Selector Pills -->
                <div class="space-y-1.5 pt-2">
                  <span class="text-3xs uppercase font-bold tracking-widest text-charcoal-400 block">Chọn hiện vật 3D khác:</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      v-for="(art, key) in ARTIFACTS"
                      :key="key"
                      class="px-2.5 py-1 rounded-xl text-3xs font-semibold border transition-all"
                      :class="selectedKey === key ? 'bg-gold-500/20 text-gold-300 border-gold-500/50' : 'bg-charcoal-900 text-charcoal-400 border-charcoal-800 hover:text-ivory'"
                      @click="selectedKey = key"
                    >
                      {{ art.name.split(' (')[0] }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- QR Code Card for Judges Phone AR Experience -->
              <div class="bg-gradient-to-r from-gold-500/10 via-charcoal-900 to-charcoal-900 p-4 rounded-2xl border border-gold-500/30 flex items-center gap-3.5 mt-4">
                <div class="w-14 h-14 rounded-xl bg-white p-1.5 shrink-0 flex items-center justify-center shadow-md">
                  <!-- SVG Mock QR Code -->
                  <svg class="w-full h-full text-charcoal-950" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2m2 2v4h4V4H4m10-2h8v8h-8V2m2 2v4h4V4h-4M2 14h8v8H2v-8m2 2v4h4v-4H4m10 0h2v2h-2v-2m4 0h4v2h-4v-2m-4 4h2v4h-2v-4m4 2h4v2h-4v-2m-6-6h2v2h-2v-2m4 0h2v2h-2v-2m0 4h2v2h-2v-2Z" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <span class="text-3xs uppercase font-bold tracking-widest text-gold-400 block">Dành Cho Giám Khảo</span>
                  <p class="text-xs text-ivory font-semibold leading-tight mt-0.5">Quét QR bằng điện thoại để xem AR thực tế</p>
                  <span class="text-3xs text-charcoal-400 block mt-1">Mở thẳng trên Safari/Chrome, không cần cài app</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ARTIFACTS } from '~/data/artifacts'

const props = defineProps<{
  isOpen: boolean
  initialArtifactKey?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const selectedKey = ref(props.initialArtifactKey || 'dan-da-soc-bom-bo')

watch(() => props.initialArtifactKey, (val) => {
  if (val && ARTIFACTS[val]) {
    selectedKey.value = val
  }
})

const currentArtifact = computed(() => ARTIFACTS[selectedKey.value] || ARTIFACTS['dan-da-soc-bom-bo'])

// 3D rotation & zoom state
const rotationX = ref(10)
const rotationY = ref(-25)
const zoomLevel = ref(1.0)
let isDragging = false
let startX = 0
let startY = 0

function startDrag(e: MouseEvent) {
  isDragging = true
  startX = e.clientX
  startY = e.clientY
}

function onDrag(e: MouseEvent) {
  if (!isDragging) return
  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY
  rotationY.value += deltaX * 0.6
  rotationX.value = Math.max(-45, Math.min(45, rotationX.value - deltaY * 0.6))
  startX = e.clientX
  startY = e.clientY
}

function startTouch(e: TouchEvent) {
  if (e.touches.length === 1 && e.touches[0]) {
    isDragging = true
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
  }
}

function onTouch(e: TouchEvent) {
  if (!isDragging || !e.touches[0]) return
  const deltaX = e.touches[0].clientX - startX
  const deltaY = e.touches[0].clientY - startY
  rotationY.value += deltaX * 0.8
  rotationX.value = Math.max(-45, Math.min(45, rotationX.value - deltaY * 0.8))
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
}

function stopDrag() {
  isDragging = false
}

function resetView() {
  rotationX.value = 10
  rotationY.value = -25
  zoomLevel.value = 1.0
}

function close() {
  emit('close')
}

// Play synth / acoustic sound on strike
function playArtifactSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    // Determine pitch based on artifact
    if (selectedKey.value.includes('dan-da')) {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime) // C5 crystal resonance
      gain.gain.setValueAtTime(0.7, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2)
    } else if (selectedKey.value.includes('cong-chieng')) {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(220, audioCtx.currentTime) // A3 deep bronze gong
      gain.gain.setValueAtTime(0.9, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.0)
    } else {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(330, audioCtx.currentTime) // E4 woody resonance
      gain.gain.setValueAtTime(0.6, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2)
    }

    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + 3.2)
  } catch (err) {
    console.warn('AudioContext notice:', err)
  }
}

function openARView() {
  const swal = useSwal()
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  if (isMobile) {
    swal.fire({
      title: 'Khởi động WebAR',
      text: 'Đang kết nối ống kính camera để đặt hiện vật 3D lên mặt phẳng bàn của bạn.',
      icon: 'info',
      confirmButtonColor: '#C7A664',
      background: '#120B04',
      color: '#FFF0C2'
    })
  } else {
    swal.fire({
      title: 'Trải Nghiệm AR Trên Điện Thoại',
      text: 'Tính năng chiếu AR lên mặt bàn hoạt động tối ưu trên điện thoại (iOS Safari / Android Chrome) qua cảm biến không gian. Hãy dùng điện thoại quét mã QR bên phải!',
      icon: 'info',
      confirmButtonColor: '#C7A664',
      background: '#120B04',
      color: '#FFF0C2'
    })
  }
}
</script>

<style scoped>
.ar-fade-enter-active,
.ar-fade-leave-active {
  transition: opacity 0.3s ease;
}
.ar-fade-enter-from,
.ar-fade-leave-to {
  opacity: 0;
}
</style>
