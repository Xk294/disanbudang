// =========================================================
// COMPOSABLE — USE VIRTUAL TOUR (360° HERITAGE EXPERIENCE)
// =========================================================

import { defineStore } from 'pinia'
import type {
  VirtualHeritageTour,
  TourScene,
  Hotspot,
  Artifact,
} from '~/types/virtualTour'
import { VIRTUAL_TOURS, getVirtualTourByHeritageId } from '~/data/virtualTours'
import { ARTIFACTS } from '~/data/artifacts'
import { useAudioStore } from '~/stores/audio'

export const useVirtualTourStore = defineStore('virtualTour', () => {
  // ─── State ───
  const activeTourId = ref<string>('khu-bao-ton-soc-bom-bo')
  const activeSceneId = ref<string>('bom-bo-cong')
  const isTransitioning = ref(false)
  const transitionTargetSceneId = ref<string | null>(null)
  const isFullscreen = ref(false)

  // Hotspot modals & drawers
  const selectedInfoHotspot = ref<Hotspot | null>(null)
  const isInfoPanelOpen = ref(false)

  const selectedArtifact = ref<Artifact | null>(null)
  const isArtifactModalOpen = ref(false)

  const isSceneDrawerOpen = ref(false)
  const areHotspotsVisible = ref(true)
  const isAutoRotateActive = ref(false)
  const isHelpModalOpen = ref(false)

  const audioStore = useAudioStore()

  // ─── Getters ───
  const currentTour = computed<VirtualHeritageTour | null>(() => {
    return VIRTUAL_TOURS[activeTourId.value] || getVirtualTourByHeritageId(activeTourId.value) || null
  })

  const currentScene = computed<TourScene | null>(() => {
    if (!currentTour.value) return null
    return (
      currentTour.value.scenes.find(s => s.id === activeSceneId.value) ||
      currentTour.value.scenes[0] ||
      null
    )
  })

  const sceneIndex = computed(() => {
    if (!currentTour.value || !currentScene.value) return 0
    return currentTour.value.scenes.findIndex(s => s.id === currentScene.value!.id)
  })

  const totalScenes = computed(() => {
    return currentTour.value?.scenes.length || 0
  })

  // ─── Actions ───
  function setTour(tourIdOrSlug: string, targetSceneId?: string) {
    let tour = VIRTUAL_TOURS[tourIdOrSlug] || getVirtualTourByHeritageId(tourIdOrSlug)
    if (!tour) {
      // Fallback to first available tour
      tour = Object.values(VIRTUAL_TOURS)[0]
    }
    if (!tour) return

    activeTourId.value = tour.id
    const sceneToSet = targetSceneId && tour.scenes.some(s => s.id === targetSceneId)
      ? targetSceneId
      : tour.initialSceneId || tour.scenes[0]?.id || ''
    activeSceneId.value = sceneToSet

    // Close any open overlays
    closeInfoPanel()
    closeArtifactModal()
    isSceneDrawerOpen.value = false
  }

  async function switchScene(sceneId: string): Promise<boolean> {
    if (!currentTour.value || isTransitioning.value) return false
    const targetScene = currentTour.value.scenes.find(s => s.id === sceneId)
    if (!targetScene || targetScene.id === activeSceneId.value) return false

    isTransitioning.value = true
    transitionTargetSceneId.value = sceneId

    // Close open panels during transition
    closeInfoPanel()
    closeArtifactModal()

    // Smooth delay for visual crossfade
    await new Promise(r => setTimeout(r, 450))

    activeSceneId.value = sceneId
    isTransitioning.value = false
    transitionTargetSceneId.value = null

    return true
  }

  function handleHotspotClick(hotspot: Hotspot) {
    if (hotspot.type === 'navigation' && hotspot.targetSceneId) {
      switchScene(hotspot.targetSceneId)
    }
    else if (hotspot.type === 'info') {
      selectedInfoHotspot.value = hotspot
      isInfoPanelOpen.value = true
    }
    else if (hotspot.type === 'artifact' && hotspot.artifactId) {
      const artifact = ARTIFACTS[hotspot.artifactId]
      if (artifact) {
        selectedArtifact.value = artifact
        isArtifactModalOpen.value = true
      }
      else if (hotspot.metadata?.artifact) {
        selectedArtifact.value = hotspot.metadata.artifact
        isArtifactModalOpen.value = true
      }
    }
    else if (hotspot.type === 'audio') {
      const track = hotspot.audioTrack || {
        id: hotspot.audioId || `audio-${hotspot.id}`,
        title: hotspot.title,
        narrator: 'Người kể chuyện Di Sản Bù Đăng',
        duration: 240,
        url: hotspot.metadata?.audioUrl || '/audio/khu-bao-ton-soc-bom-bo.mp3',
        coverImage: hotspot.metadata?.coverImage,
      }
      audioStore.loadTrack(track, hotspot.audioId || currentTour.value?.heritageId || '')
      audioStore.play()
    }
  }

  function openArtifactById(artifactId: string) {
    const artifact = ARTIFACTS[artifactId]
    if (artifact) {
      selectedArtifact.value = artifact
      isArtifactModalOpen.value = true
    }
  }

  function closeInfoPanel() {
    isInfoPanelOpen.value = false
    selectedInfoHotspot.value = null
  }

  function closeArtifactModal() {
    isArtifactModalOpen.value = false
    selectedArtifact.value = null
  }

  function toggleSceneDrawer() {
    isSceneDrawerOpen.value = !isSceneDrawerOpen.value
  }

  function toggleHotspots() {
    areHotspotsVisible.value = !areHotspotsVisible.value
  }

  function toggleAutoRotate() {
    isAutoRotateActive.value = !isAutoRotateActive.value
  }

  function toggleFullscreen(containerEl?: HTMLElement | null) {
    if (typeof document === 'undefined') return

    if (!document.fullscreenElement) {
      const target = containerEl || document.documentElement
      target.requestFullscreen().then(() => {
        isFullscreen.value = true
      }).catch(() => {})
    }
    else {
      document.exitFullscreen().then(() => {
        isFullscreen.value = false
      }).catch(() => {})
    }
  }

  return {
    // State
    activeTourId,
    activeSceneId,
    isTransitioning,
    transitionTargetSceneId,
    isFullscreen,
    selectedInfoHotspot,
    isInfoPanelOpen,
    selectedArtifact,
    isArtifactModalOpen,
    isSceneDrawerOpen,
    areHotspotsVisible,
    isAutoRotateActive,
    isHelpModalOpen,

    // Getters
    currentTour,
    currentScene,
    sceneIndex,
    totalScenes,

    // Actions
    setTour,
    switchScene,
    handleHotspotClick,
    openArtifactById,
    closeInfoPanel,
    closeArtifactModal,
    toggleSceneDrawer,
    toggleHotspots,
    toggleAutoRotate,
    toggleFullscreen,
  }
})
