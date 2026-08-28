import { defineStore } from 'pinia'
import type { HeritageAudio } from '~/types'

export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.8)
  const isMuted = ref(false)
  const currentTrack = ref<HeritageAudio | null>(null)
  const heritageId = ref<string | null>(null)
  const errorMessage = ref('')
  const audioEl = shallowRef<HTMLAudioElement | null>(null)

  const isMiniPlayerVisible = ref(false)
  const isExpanded = ref(false)
  const playbackRate = ref(1.0)

  // Computed
  const progressPercent = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0,
  )

  const formattedCurrentTime = computed(() => formatTime(currentTime.value))
  const formattedDuration = computed(() => formatTime(duration.value))

  // Actions
  function loadTrack(audio: HeritageAudio, hId: string) {
    cleanupAudio()
    currentTrack.value = audio
    heritageId.value = hId
    currentTime.value = 0
    duration.value = audio.duration
    errorMessage.value = ''
    isMiniPlayerVisible.value = true

    if (import.meta.client) {
      const player = new Audio(audio.url)
      player.preload = 'metadata'
      player.volume = isMuted.value ? 0 : volume.value
      player.playbackRate = playbackRate.value

      player.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(player.duration)) duration.value = player.duration
      })
      player.addEventListener('timeupdate', () => {
        currentTime.value = player.currentTime
      })
      player.addEventListener('ended', () => {
        isPlaying.value = false
        currentTime.value = 0
      })
      player.addEventListener('error', () => {
        isPlaying.value = false
        errorMessage.value = 'Không tải được tệp âm thanh. Vui lòng thử lại sau.'
      })

      audioEl.value = player
      setupMediaSession(audio)
    }
  }

  // Lock-screen / headset controls so the guide keeps playing when the phone
  // screen turns off (core requirement of the global audio guide)
  function setupMediaSession(audio: HeritageAudio) {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: audio.title,
      artist: audio.narrator ?? 'Di Sản Bù Đăng',
      album: 'Audio Guide Di Sản Bù Đăng',
      artwork: audio.coverImage ? [{ src: audio.coverImage }] : [],
    })
    navigator.mediaSession.setActionHandler('play', () => play())
    navigator.mediaSession.setActionHandler('pause', () => pause())
    navigator.mediaSession.setActionHandler('seekbackward', () => skip(-15))
    navigator.mediaSession.setActionHandler('seekforward', () => skip(15))
  }

  function play() {
    if (!audioEl.value) return
    isPlaying.value = true
    errorMessage.value = ''
    audioEl.value.play().catch(() => {
      isPlaying.value = false
      errorMessage.value = 'Trình duyệt chưa thể phát audio. Vui lòng thử lại.'
    })
  }

  function pause() {
    isPlaying.value = false
    audioEl.value?.pause()
  }

  function togglePlay() {
    if (isPlaying.value) pause()
    else play()
  }

  function setCurrentTime(time: number) {
    const nextTime = Math.max(0, Math.min(time, duration.value))
    currentTime.value = nextTime
    if (audioEl.value) audioEl.value.currentTime = nextTime
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
    if (v > 0) isMuted.value = false
    if (audioEl.value) audioEl.value.volume = isMuted.value ? 0 : volume.value
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
    if (audioEl.value) audioEl.value.volume = isMuted.value ? 0 : volume.value
  }

  function skip(seconds: number) {
    setCurrentTime(currentTime.value + seconds)
  }

  function closeMiniPlayer() {
    isPlaying.value = false
    cleanupAudio()
    currentTrack.value = null
    heritageId.value = null
    errorMessage.value = ''
    isMiniPlayerVisible.value = false
    isExpanded.value = false
  }

  function toggleExpanded() {
    isExpanded.value = !isExpanded.value
  }

  function setPlaybackRate(rate: number) {
    playbackRate.value = rate
    if (audioEl.value) audioEl.value.playbackRate = rate
  }

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function cleanupAudio() {
    if (!audioEl.value) return
    audioEl.value.pause()
    audioEl.value.src = ''
    audioEl.value.load()
    audioEl.value = null
  }

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    currentTrack,
    heritageId,
    errorMessage,
    isMiniPlayerVisible,
    isExpanded,
    progressPercent,
    formattedCurrentTime,
    formattedDuration,
    playbackRate,
    loadTrack,
    play,
    pause,
    togglePlay,
    setCurrentTime,
    setVolume,
    toggleMute,
    skip,
    closeMiniPlayer,
    toggleExpanded,
    setPlaybackRate,
  }
})
