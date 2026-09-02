<template>
  <div class="soundscape-root bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 border border-gold-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/80 relative overflow-hidden">
    
    <!-- Background Ambient Halo -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none" />

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-gold-400" :class="isMasterPlaying ? 'animate-ping' : ''" />
          <span class="text-3xs uppercase tracking-widest font-bold text-gold-400">Không Gian Tương Tác Âm Thanh</span>
        </div>
        <h3 class="font-heading font-bold text-ivory text-xl sm:text-2xl">Bản Giao Hưởng Đại Ngàn Bù Đăng</h3>
        <p class="text-xs text-charcoal-300 mt-0.5">Tự do hòa âm tiếng suối, nhịp chày Bom Bo, cồng chiêng và thanh âm rừng già.</p>
      </div>

      <!-- Master Play / Stop & Preset -->
      <div class="flex items-center gap-2.5 shrink-0">
        <button
          class="px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg select-none"
          :class="isMasterPlaying ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30' : 'btn-primary'"
          @click="toggleMaster"
        >
          <Icon :name="isMasterPlaying ? 'mdi:pause' : 'mdi:play'" class="w-4 h-4" />
          <span>{{ isMasterPlaying ? 'Dừng Hòa Âm' : 'Bắt Đầu Hòa Âm' }}</span>
        </button>
      </div>
    </div>

    <!-- Preset Selection Chips -->
    <div class="flex items-center gap-2 flex-wrap mb-6 relative z-10">
      <span class="text-3xs uppercase font-bold text-charcoal-400 tracking-wider">Cảnh âm thanh mẫu:</span>
      <button
        v-for="preset in presets"
        :key="preset.id"
        class="px-3 py-1.5 rounded-xl text-3xs font-semibold uppercase tracking-wider border transition-all"
        :class="activePreset === preset.id ? 'bg-gold-500/20 text-gold-300 border-gold-500/60 shadow-md' : 'bg-charcoal-900/60 text-charcoal-400 border-charcoal-800 hover:text-ivory hover:border-charcoal-700'"
        @click="applyPreset(preset)"
      >
        {{ preset.name }}
      </button>
    </div>

    <!-- 4 Sound Channels Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
      <div
        v-for="ch in channels"
        :key="ch.id"
        class="p-4 rounded-2xl bg-charcoal-950/80 border transition-all duration-300 flex flex-col justify-between space-y-3"
        :class="ch.volume > 0 && isMasterPlaying ? 'border-gold-500/50 shadow-lg shadow-gold-500/10' : 'border-charcoal-800/80'"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0"
              :class="ch.volume > 0 && isMasterPlaying ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30' : 'bg-charcoal-900 text-charcoal-500 border border-charcoal-800'"
            >
              <Icon :name="ch.icon" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="text-xs font-bold text-ivory leading-snug">{{ ch.name }}</h4>
              <span class="text-3xs text-charcoal-400 block">{{ ch.subtitle }}</span>
            </div>
          </div>

          <button
            class="p-1.5 rounded-lg transition-colors"
            :class="ch.volume > 0 ? 'text-gold-400 hover:text-gold-300' : 'text-charcoal-600 hover:text-charcoal-400'"
            @click="toggleMuteChannel(ch)"
            :title="ch.volume > 0 ? 'Tắt tiếng kênh này' : 'Bật tiếng kênh này'"
          >
            <Icon :name="ch.volume > 0 ? 'mdi:volume-high' : 'mdi:volume-mute'" class="w-4 h-4" />
          </button>
        </div>

        <!-- Volume Slider -->
        <div class="space-y-1.5 pt-1">
          <div class="flex justify-between text-3xs font-mono text-charcoal-400">
            <span>Âm lượng</span>
            <span>{{ Math.round(ch.volume * 100) }}%</span>
          </div>
          <input
            v-model.number="ch.volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            class="w-full h-1.5 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
            @input="onVolumeChange(ch)"
          />
        </div>

        <!-- Active visualizer bar -->
        <div class="h-1 w-full bg-charcoal-900 rounded-full overflow-hidden flex gap-0.5">
          <div
            v-for="b in 12"
            :key="b"
            class="flex-1 bg-gold-400/40 rounded-full transition-all duration-150"
            :style="{
              opacity: ch.volume > 0 && isMasterPlaying ? Math.random() * 0.7 + 0.3 : 0.1,
              transform: ch.volume > 0 && isMasterPlaying ? `scaleY(${Math.min(1, ch.volume * (Math.random() * 0.8 + 0.2))})` : 'scaleY(0.2)'
            }"
          />
        </div>
      </div>
    </div>

    <!-- Cultural quote footer -->
    <div class="mt-6 pt-4 border-t border-charcoal-800/60 flex flex-col sm:flex-row items-center justify-between text-3xs text-charcoal-400 gap-2 relative z-10">
      <span class="italic font-accent text-charcoal-300">"Tiếng chày trên sóc Bom Bo vang vọng cùng tiếng cồng chiêng giữa đại ngàn đất đỏ Bù Đăng."</span>
      <span class="text-gold-400/80 font-bold uppercase tracking-wider">• Không gian văn hóa phi vật thể số hóa</span>
    </div>

  </div>
</template>

<script setup lang="ts">
interface SoundChannel {
  id: string
  name: string
  subtitle: string
  icon: string
  volume: number
  lastVolume: number
  audioNode?: any
}

const isMasterPlaying = ref(false)
const activePreset = ref<string>('preset-bom-bo')

let audioContext: AudioContext | null = null
let noiseNode: any = null
let rhythmicOscillator: any = null
let gongInterval: any = null
let birdInterval: any = null

const channels = ref<SoundChannel[]>([
  {
    id: 'ch-stream',
    name: 'Suối Nguồn & Thác Đứng',
    subtitle: 'Âm thanh tự nhiên róc rách',
    icon: 'mdi:waves',
    volume: 0.6,
    lastVolume: 0.6,
  },
  {
    id: 'ch-mortar',
    name: 'Nhịp Chày Bom Bo',
    subtitle: 'Nhịp đôi giã gạo nuôi quân',
    icon: 'mdi:music-clef-treble',
    volume: 0.8,
    lastVolume: 0.8,
  },
  {
    id: 'ch-gong',
    name: 'Cồng Chiêng Tây Nguyên',
    subtitle: 'Thang âm ngân vang đại ngàn',
    icon: 'mdi:bell-ring-outline',
    volume: 0.7,
    lastVolume: 0.7,
  },
  {
    id: 'ch-birds',
    name: 'Chim Rừng Nguyên Sinh',
    subtitle: 'Tiếng hót ban mai Bù Đăng',
    icon: 'mdi:bird',
    volume: 0.5,
    lastVolume: 0.5,
  }
])

const presets = [
  {
    id: 'preset-bom-bo',
    name: '🌙 Đêm Sóc Bom Bo',
    volumes: [0.3, 0.9, 0.6, 0.1]
  },
  {
    id: 'preset-nature',
    name: '🌲 Bình Minh Trảng Cỏ',
    volumes: [0.8, 0.0, 0.2, 0.9]
  },
  {
    id: 'preset-festival',
    name: '🔥 Lễ Hội Mừng Lúa Mới',
    volumes: [0.4, 0.6, 0.95, 0.3]
  }
]

function toggleMaster() {
  if (isMasterPlaying.value) {
    stopAllAudio()
    isMasterPlaying.value = false
  } else {
    initAndStartAudio()
    isMasterPlaying.value = true
  }
}

function initAndStartAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    startGenerators()
  } catch (err) {
    console.warn('[SoundscapeMixer] AudioContext init notice:', err)
  }
}

function startGenerators() {
  if (!audioContext) return

  // 1. Water stream generator (Pink noise + lowpass filter)
  const bufferSize = audioContext.sampleRate * 2
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  let lastOut = 0.0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    output[i] = (lastOut + (0.02 * white)) / 1.02
    lastOut = output[i] || 0
    output[i] = (output[i] ?? 0) * 3.5
  }

  const whiteNoise = audioContext.createBufferSource()
  whiteNoise.buffer = noiseBuffer
  whiteNoise.loop = true

  const filter = audioContext.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(450, audioContext.currentTime)

  const waterGain = audioContext.createGain()
  const chStream = channels.value.find(c => c.id === 'ch-stream')
  waterGain.gain.setValueAtTime((chStream?.volume ?? 0.5) * 0.4, audioContext.currentTime)

  whiteNoise.connect(filter)
  filter.connect(waterGain)
  waterGain.connect(audioContext.destination)
  whiteNoise.start()
  noiseNode = { source: whiteNoise, gain: waterGain }

  // 2. Mortar strike loop (Sóc Bom Bo rhythm ~ 120 bpm, double beat)
  let mortarStep = 0
  const mortarCh = channels.value.find(c => c.id === 'ch-mortar')
  rhythmicOscillator = setInterval(() => {
    if (!isMasterPlaying.value || !audioContext || (mortarCh?.volume ?? 0) <= 0) return
    mortarStep++
    playWoodThud(audioContext, (mortarCh?.volume ?? 0.8) * (mortarStep % 2 === 0 ? 0.9 : 0.7))
  }, 480)

  // 3. Gong resonance loop (every 3.8 seconds)
  const gongCh = channels.value.find(c => c.id === 'ch-gong')
  gongInterval = setInterval(() => {
    if (!isMasterPlaying.value || !audioContext || (gongCh?.volume ?? 0) <= 0) return
    playGongNote(audioContext, gongCh?.volume ?? 0.7)
  }, 3800)

  // 4. Forest Birds chirp loop (random interval)
  const birdCh = channels.value.find(c => c.id === 'ch-birds')
  birdInterval = setInterval(() => {
    if (!isMasterPlaying.value || !audioContext || (birdCh?.volume ?? 0) <= 0) return
    if (Math.random() > 0.4) {
      playBirdChirp(audioContext, birdCh?.volume ?? 0.5)
    }
  }, 2200)
}

function playWoodThud(ctx: AudioContext, vol: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(140, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12)

  gain.gain.setValueAtTime(vol * 0.8, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.2)
}

function playGongNote(ctx: AudioContext, vol: number) {
  const freqs = [220, 277.18, 329.63, 440]
  const freq = freqs[Math.floor(Math.random() * freqs.length)] || 220
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, ctx.currentTime)
  gain.gain.setValueAtTime(vol * 0.5, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 3.0)
}

function playBirdChirp(ctx: AudioContext, vol: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const startF = 2400 + Math.random() * 800
  osc.type = 'sine'
  osc.frequency.setValueAtTime(startF, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(startF + 600, ctx.currentTime + 0.08)
  osc.frequency.linearRampToValueAtTime(startF - 200, ctx.currentTime + 0.15)

  gain.gain.setValueAtTime(vol * 0.15, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.2)
}

function stopAllAudio() {
  if (noiseNode) {
    try {
      noiseNode.source.stop()
      noiseNode.source.disconnect()
    } catch {}
    noiseNode = null
  }
  if (rhythmicOscillator) clearInterval(rhythmicOscillator)
  if (gongInterval) clearInterval(gongInterval)
  if (birdInterval) clearInterval(birdInterval)
}

function applyPreset(preset: any) {
  activePreset.value = preset.id
  preset.volumes.forEach((vol: number, idx: number) => {
    if (channels.value[idx]) {
      channels.value[idx].volume = vol
      onVolumeChange(channels.value[idx])
    }
  })
  if (!isMasterPlaying.value) {
    toggleMaster()
  }
}

function onVolumeChange(ch: SoundChannel) {
  if (ch.id === 'ch-stream' && noiseNode?.gain && audioContext) {
    noiseNode.gain.gain.setValueAtTime(ch.volume * 0.4, audioContext.currentTime)
  }
}

function toggleMuteChannel(ch: SoundChannel) {
  if (ch.volume > 0) {
    ch.lastVolume = ch.volume
    ch.volume = 0
  } else {
    ch.volume = ch.lastVolume || 0.6
  }
  onVolumeChange(ch)
}

onUnmounted(() => {
  stopAllAudio()
})
</script>
